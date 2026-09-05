import React, { useState, useEffect } from 'react';
import { Sparkles, Award, Search, Bookmark, Layout, X, Code, Check } from 'lucide-react';
import Navbar from './components/Navbar.jsx';
import IdeaGenerator from './components/IdeaGenerator.jsx';
import ProjectCard from './components/ProjectCard.jsx';
import BlueprintModal from './components/BlueprintModal.jsx';
import MentorChat from './components/MentorChat.jsx';
import ApiKeyModal from './components/ApiKeyModal.jsx';
import MatrixRain from './components/MatrixRain.jsx';
import Footer from './components/Footer.jsx';
import { CURATED_PROJECTS } from './data/curatedProjects.js';
import { PROGRAMMING_LANGUAGES } from './data/domains.js';
import { generateProjectBlueprint, generateWithGeminiAPI } from './services/generatorEngine.js';

/* ── Skeleton card shown during generation ─────────────── */
function SkeletonCard() {
  return (
    <div className="generating-card" aria-busy="true" aria-label="Generating blueprint…">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="skeleton" style={{ width: '90px', height: '20px' }} />
        <div className="skeleton" style={{ width: '60px', height: '20px' }} />
      </div>
      <div className="skeleton" style={{ width: '80%', height: '22px', marginTop: '4px' }} />
      <div className="skeleton" style={{ width: '60%', height: '16px' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', padding: '12px', background: 'var(--bg-overlay)', borderRadius: '10px' }}>
        <div className="skeleton" style={{ width: '100%', height: '13px' }} />
        <div className="skeleton" style={{ width: '85%', height: '13px' }} />
      </div>
      <div style={{ display: 'flex', gap: '6px' }}>
        {[70, 55, 65].map((w, i) => (
          <div key={i} className="skeleton" style={{ width: `${w}px`, height: '22px', borderRadius: '4px' }} />
        ))}
      </div>
      <div style={{ display: 'flex', gap: '8px', paddingTop: '12px', borderTop: '1px solid var(--border-muted)' }}>
        <div className="skeleton" style={{ flex: 1, height: '32px', borderRadius: '8px' }} />
        <div className="skeleton" style={{ width: '80px', height: '32px', borderRadius: '8px' }} />
      </div>
    </div>
  );
}

export default function App() {
  /* ── Persistence ─────────────────────────── */
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem('novacapstone_projects_v2');
      return saved ? JSON.parse(saved) : CURATED_PROJECTS;
    } catch { return CURATED_PROJECTS; }
  });

  const [savedProjectIds, setSavedProjectIds] = useState(() => {
    try {
      const saved = localStorage.getItem('novacapstone_saved_ids');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const [apiKey, setApiKey] = useState(() =>
    localStorage.getItem('novacapstone_gemini_key') || ''
  );

  /* ── UI state ────────────────────────────── */
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalTab, setModalTab] = useState('architecture');
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguageFilters, setSelectedLanguageFilters] = useState(['all']);
  const [generateError, setGenerateError] = useState(null);

  /* ── Generator params ────────────────────── */
  const [selectedDomain, setSelectedDomain] = useState('ai-genai');
  const [selectedSkills, setSelectedSkills] = useState(['Python', 'PyTorch', 'FastAPI']);
  const [ambition, setAmbition] = useState('hackathon');
  const [noveltyBias, setNoveltyBias] = useState(88);
  const [teamSize, setTeamSize] = useState('Duo / Team (2–3)');
  const [timeframe, setTimeframe] = useState('3 Months (Standard Semester Project)');
  const [customPrompt, setCustomPrompt] = useState('');

  /* ── Sync localStorage ────────────────────── */
  useEffect(() => {
    localStorage.setItem('novacapstone_projects_v2', JSON.stringify(projects));
  }, [projects]);
  useEffect(() => {
    localStorage.setItem('novacapstone_saved_ids', JSON.stringify(savedProjectIds));
  }, [savedProjectIds]);

  /* ── Handlers ─────────────────────────────── */
  const handleSaveApiKey = (key) => {
    setApiKey(key);
    localStorage.setItem('novacapstone_gemini_key', key);
  };

  const toggleSaveProject = (project) => {
    setSavedProjectIds(prev =>
      prev.includes(project.id)
        ? prev.filter(id => id !== project.id)
        : [...prev, project.id]
    );
  };

  const handleGenerate = async (params) => {
    setIsGenerating(true);
    setGenerateError(null);
    try {
      let newBlueprint;
      if (apiKey) {
        try {
          newBlueprint = await generateWithGeminiAPI(apiKey, params);
        } catch (apiErr) {
          console.warn('Gemini API failed, using procedural engine:', apiErr);
          await new Promise(r => setTimeout(r, 700));
          newBlueprint = generateProjectBlueprint(params);
        }
      } else {
        await new Promise(r => setTimeout(r, 850));
        newBlueprint = generateProjectBlueprint(params);
      }
      setProjects(prev => [newBlueprint, ...prev]);
      setSelectedProject(newBlueprint);
      setModalTab('architecture');
      if (newBlueprint.primaryLanguages && newBlueprint.primaryLanguages.length > 0) {
        setSelectedLanguageFilters(newBlueprint.primaryLanguages);
      } else if (newBlueprint.primaryLanguage) {
        setSelectedLanguageFilters([newBlueprint.primaryLanguage]);
      }
    } catch (err) {
      console.error('Generation error:', err);
      setGenerateError('Blueprint generation failed. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleOpenModal = (project, tab = 'architecture') => {
    setSelectedProject(project);
    setModalTab(tab);
  };

  const scrollToGenerator = () => {
    document.getElementById('generator-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  /* ── Multi-Language filter toggler ────────── */
  const handleToggleLanguageFilter = (langId) => {
    if (langId === 'all') {
      setSelectedLanguageFilters(['all']);
      return;
    }

    const withoutAll = selectedLanguageFilters.filter(l => l !== 'all');
    if (withoutAll.includes(langId)) {
      const remaining = withoutAll.filter(l => l !== langId);
      setSelectedLanguageFilters(remaining.length === 0 ? ['all'] : remaining);
    } else {
      setSelectedLanguageFilters([...withoutAll, langId]);
    }
  };

  /* ── Multi-Language filtering helper ──────── */
  const projectMatchesLanguages = (project, langFilters) => {
    if (!langFilters || langFilters.includes('all') || langFilters.length === 0) return true;
    
    return langFilters.some(lang => {
      const langLower = lang.toLowerCase();
      if (project.primaryLanguage && project.primaryLanguage.toLowerCase().includes(langLower)) return true;
      if (Array.isArray(project.primaryLanguages) && project.primaryLanguages.some(pl => pl.toLowerCase() === langLower)) return true;
      
      const inTitle = project.title.toLowerCase().includes(langLower);
      const inTagline = project.tagline?.toLowerCase().includes(langLower);
      const inStack = (project.techStack || []).some(t => t.tech.toLowerCase().includes(langLower) || t.rationale?.toLowerCase().includes(langLower));
      return inTitle || inTagline || inStack;
    });
  };

  /* ── Filtering ────────────────────────────── */
  const filteredProjects = projects.filter(p => {
    if (showSavedOnly && !savedProjectIds.includes(p.id)) return false;
    
    if (!projectMatchesLanguages(p, selectedLanguageFilters)) {
      return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.domain.toLowerCase().includes(q) ||
        p.tagline?.toLowerCase().includes(q) ||
        (p.techStack || []).some(t => t.tech.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div>
      <MatrixRain />
      <Navbar
        savedCount={savedProjectIds.length}
        onOpenSaved={() => setShowSavedOnly(!showSavedOnly)}
        onOpenApiKeyModal={() => setShowApiKeyModal(true)}
        hasApiKey={Boolean(apiKey)}
        onScrollToGenerator={scrollToGenerator}
      />

      <main className="app-container" id="main-content">
        {/* ── Hero ─────────────────────────────── */}
        <section className="hero-section" aria-label="Hero">
          <div className="hero-pill" aria-hidden="true">
            <Sparkles size={13} />
            <span>Final-Year Capstone Architect & AI Viva Examiner</span>
          </div>

          <h1 className="hero-title">
            Turn any idea into an<br />
            <span className="hero-gradient-text">Award-Winning Blueprint</span>
          </h1>

          <p className="hero-desc">
            Synthesize language-tailored project blueprints, interactive architecture diagrams,
            12-week sprint roadmaps, college-ready synopses, and practice with an AI examiner committee.
          </p>

          <div className="hero-cta-row">
            <button className="btn btn-primary btn-lg" onClick={scrollToGenerator} id="hero-cta-btn">
              <Sparkles size={18} aria-hidden="true" />
              <span>Synthesize a Project</span>
            </button>
            <button
              className="btn btn-secondary btn-lg"
              onClick={() => {
                const first = projects[0] || CURATED_PROJECTS[0];
                handleOpenModal(first, 'viva');
              }}
              id="hero-viva-btn"
            >
              <Award size={18} aria-hidden="true" />
              <span>Mock Viva Simulator</span>
            </button>
          </div>

          {/* Metrics */}
          <div className="hero-metrics" role="list" aria-label="Key statistics">
            {[
              { value: '96.8%', label: 'Avg Novelty Score' },
              { value: '12 Wks', label: 'Sprint Roadmap' },
              { value: '3 AI', label: 'Examiner Personas' },
              { value: 'IEEE', label: 'Synopsis Export' }
            ].map(m => (
              <div key={m.label} className="metric-card" role="listitem">
                <div className="metric-value">{m.value}</div>
                <div className="metric-label">{m.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Generator ──────────────────────── */}
        <IdeaGenerator
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
          selectedDomain={selectedDomain} setSelectedDomain={setSelectedDomain}
          selectedSkills={selectedSkills} setSelectedSkills={setSelectedSkills}
          ambition={ambition} setAmbition={setAmbition}
          noveltyBias={noveltyBias} setNoveltyBias={setNoveltyBias}
          teamSize={teamSize} setTeamSize={setTeamSize}
          timeframe={timeframe} setTimeframe={setTimeframe}
          customPrompt={customPrompt} setCustomPrompt={setCustomPrompt}
        />

        {/* ── Error State ───────────────────── */}
        {generateError && (
          <div
            className="callout callout-error"
            role="alert"
            style={{ marginBottom: 'var(--space-6)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <span>{generateError}</span>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => setGenerateError(null)}
              aria-label="Dismiss error"
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* ── Section Header ────────────────── */}
        <div className="section-header" role="search" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 'var(--space-3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
            <div className="section-title">
              <Layout size={16} color="var(--text-low)" aria-hidden="true" />
              <span>{showSavedOnly ? 'Saved Blueprints' : 'Project Blueprints'}</span>
              <span className="section-count" aria-label={`${filteredProjects.length} projects`}>
                {filteredProjects.length}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              {showSavedOnly && (
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => setShowSavedOnly(false)}
                  aria-label="Show all projects"
                >
                  <X size={13} aria-hidden="true" />
                  <span>Clear saved filter</span>
                </button>
              )}
              <div className="search-bar-wrapper">
                <span className="search-icon" aria-hidden="true">
                  <Search size={14} />
                </span>
                <input
                  type="search"
                  className="search-input"
                  placeholder="Search by tech or keyword…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search projects"
                  id="project-search"
                />
              </div>
            </div>
          </div>

          {/* ── Language Quick Filter Bar (Multi-Select) ─────────────── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap', paddingTop: 'var(--space-1)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-low)', textTransform: 'uppercase', letterSpacing: '0.05em', marginRight: '0.25rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Code size={13} />
              <span>Languages:</span>
            </span>

            <button
              type="button"
              className={`btn btn-sm ${selectedLanguageFilters.includes('all') ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => handleToggleLanguageFilter('all')}
              style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
            >
              <span>All ({projects.length})</span>
            </button>

            {PROGRAMMING_LANGUAGES.map(lang => {
              const isActive = selectedLanguageFilters.includes(lang.id);
              const count = projects.filter(p => projectMatchesLanguages(p, [lang.id])).length;
              return (
                <button
                  key={lang.id}
                  type="button"
                  aria-pressed={isActive}
                  className={`btn btn-sm ${isActive ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => handleToggleLanguageFilter(lang.id)}
                  style={{
                    padding: '0.35rem 0.65rem',
                    fontSize: '0.78rem',
                    borderColor: isActive ? 'var(--cyan-400)' : undefined
                  }}
                  title={`Toggle filter for ${lang.name}`}
                >
                  <span>{lang.icon}</span>
                  <span>{lang.name}</span>
                  {count > 0 && (
                    <span style={{
                      opacity: 0.75,
                      fontSize: '0.7rem',
                      background: isActive ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)',
                      padding: '0.05rem 0.35rem',
                      borderRadius: '10px',
                      marginLeft: '2px'
                    }}>
                      {count}
                    </span>
                  )}
                  {isActive && (
                    <Check size={11} color="#ffffff" style={{ marginLeft: '2px' }} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Filter notice */}
          {!selectedLanguageFilters.includes('all') && selectedLanguageFilters.length > 0 && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.45rem 0.75rem',
              background: 'rgba(6, 182, 212, 0.08)',
              border: '1px solid rgba(6, 182, 212, 0.25)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.8rem',
              color: 'var(--cyan-400)'
            }}>
              <span>
                Showing project ideas matching <strong>{selectedLanguageFilters.join(', ')}</strong> ({filteredProjects.length} found).
              </span>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => setSelectedLanguageFilters(['all'])}
                style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', color: 'var(--text-medium)' }}
              >
                Reset to All
              </button>
            </div>
          )}
        </div>

        {/* ── Projects Grid ─────────────────── */}
        <section className="projects-grid" aria-label="Project blueprints" aria-live="polite">
          {/* Generating skeleton */}
          {isGenerating && <SkeletonCard />}

          {/* Project cards */}
          {filteredProjects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenBlueprint={(p) => handleOpenModal(p, 'architecture')}
              onOpenViva={(p) => handleOpenModal(p, 'viva')}
              onOpenSynopsis={(p) => handleOpenModal(p, 'synopsis')}
              isSaved={savedProjectIds.includes(project.id)}
              onToggleSave={toggleSaveProject}
            />
          ))}

          {/* Empty state */}
          {!isGenerating && filteredProjects.length === 0 && (
            <div className="state-container" role="status">
              <div className="state-icon" aria-hidden="true">
                <Bookmark size={22} />
              </div>
              <p className="state-title">
                {showSavedOnly
                  ? 'No saved blueprints yet'
                  : !selectedLanguageFilters.includes('all')
                  ? `No ${selectedLanguageFilters.join(' + ')} blueprints in gallery yet`
                  : 'No projects match your search'}
              </p>
              <p className="state-body">
                {!selectedLanguageFilters.includes('all')
                  ? `Synthesize a fresh, award-winning project blueprint specifically architected in ${selectedLanguageFilters.join(' + ')} right now.`
                  : showSavedOnly
                  ? 'Bookmark projects you like by clicking the bookmark icon on any card.'
                  : 'Try a different keyword, or generate a new blueprint above.'}
              </p>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  if (!selectedLanguageFilters.includes('all')) {
                    setSelectedSkills(selectedLanguageFilters);
                  }
                  setShowSavedOnly(false);
                  setSearchQuery('');
                  scrollToGenerator();
                }}
              >
                <Sparkles size={14} aria-hidden="true" />
                <span>{!selectedLanguageFilters.includes('all') ? `Synthesize ${selectedLanguageFilters.join(' + ')} Blueprint` : 'Generate a Blueprint'}</span>
              </button>
            </div>
          )}
        </section>
      </main>

      {/* ── Founder & 3D Follow Us Footer ── */}
      <Footer />

      {/* ── Blueprint Modal ───────────────── */}
      {selectedProject && (
        <BlueprintModal
          project={selectedProject}
          activeTab={modalTab}
          onTabChange={setModalTab}
          onClose={() => setSelectedProject(null)}
          isSaved={savedProjectIds.includes(selectedProject.id)}
          onToggleSave={toggleSaveProject}
        />
      )}

      {/* ── API Key Modal ─────────────────── */}
      {showApiKeyModal && (
        <ApiKeyModal
          isOpen={showApiKeyModal}
          currentKey={apiKey}
          onSaveKey={handleSaveApiKey}
          onClose={() => setShowApiKeyModal(false)}
        />
      )}

      {/* ── Floating AI Mentor Chat ───────── */}
      <MentorChat activeProject={selectedProject || projects[0]} />
    </div>
  );
}
