import React from 'react';
import {
  Sparkles, Sliders, BrainCircuit, ShieldCheck, Activity,
  Server, Cpu, Coins, Leaf, GraduationCap, Check, Zap, Code
} from 'lucide-react';
import {
  DOMAINS, PROGRAMMING_LANGUAGES, FRAMEWORK_PRESETS,
  LANGUAGE_FRAMEWORKS, AMBITION_TARGETS, TIMEFRAMES, TEAM_SIZES
} from '../data/domains.js';

const DOMAIN_ICONS = {
  BrainCircuit, ShieldCheck, Activity, Server, Cpu, Coins, Leaf, GraduationCap
};

export default function IdeaGenerator({
  onGenerate, isGenerating = false,
  selectedDomain, setSelectedDomain,
  selectedSkills, setSelectedSkills,
  ambition, setAmbition,
  noveltyBias, setNoveltyBias,
  teamSize, setTeamSize,
  timeframe, setTimeframe,
  customPrompt, setCustomPrompt
}) {
  // Find all currently selected programming languages
  const activeLanguages = PROGRAMMING_LANGUAGES.filter(l => selectedSkills.includes(l.id));
  const currentLanguages = activeLanguages.length > 0 ? activeLanguages : [PROGRAMMING_LANGUAGES[0]];
  const primaryLanguage = currentLanguages[0];

  const handleToggleLanguage = (langId) => {
    const isCurrentlySelected = selectedSkills.includes(langId);
    const langIds = PROGRAMMING_LANGUAGES.map(l => l.id);
    const currentLangSkills = selectedSkills.filter(s => langIds.includes(s));

    if (isCurrentlySelected) {
      // Don't allow deselecting if it's the only language left
      if (currentLangSkills.length <= 1) return;
      
      const newSkills = selectedSkills.filter(s => s !== langId);
      setSelectedSkills(newSkills);
    } else {
      // Add new language and a complementary framework
      const newLangList = [...currentLangSkills, langId];
      const nonLangSkills = selectedSkills.filter(s => !langIds.includes(s));
      const newDefaults = (LANGUAGE_FRAMEWORKS[langId] || []).slice(0, 2);
      setSelectedSkills([...newLangList, ...new Set([...nonLangSkills, ...newDefaults])]);
    }
  };

  const toggleFramework = (fw) => {
    if (selectedSkills.includes(fw)) {
      if (selectedSkills.length > 1) setSelectedSkills(selectedSkills.filter(s => s !== fw));
    } else {
      setSelectedSkills([...selectedSkills, fw]);
    }
  };

  const handleSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    onGenerate({ domain: selectedDomain, skills: selectedSkills, ambition, noveltyBias, teamSize, timeframe, customPrompt });
  };

  // Aggregate frameworks from all active languages
  const activeFrameworkList = Array.from(
    new Set(currentLanguages.flatMap(l => LANGUAGE_FRAMEWORKS[l.id] || []))
  );
  const displayFrameworks = activeFrameworkList.length > 0 ? activeFrameworkList : FRAMEWORK_PRESETS;

  const langLabel = currentLanguages.map(l => l.name).join(' + ');

  return (
    <section
      className="generator-deck"
      id="generator-section"
      aria-label="Project generator configuration"
    >
      {/* Top bar */}
      <div className="deck-topbar">
        <div>
          <div className="deck-title">
            <Sliders size={16} color="var(--indigo-400)" aria-hidden="true" />
            <span>Configure your Blueprint</span>
          </div>
          <p className="deck-subtitle">Select one or multiple programming languages, domain, and ambition to synthesize a tailored project.</p>
        </div>
        <button
          type="button"
          className={`btn btn-primary ${isGenerating ? 'btn-loading' : ''}`}
          onClick={handleSubmit}
          disabled={isGenerating}
          aria-busy={isGenerating}
          id="main-generate-btn"
        >
          <Sparkles size={15} className={isGenerating ? 'spin btn-icon' : 'btn-icon'} aria-hidden="true" />
          <span>{isGenerating ? `Synthesizing ${langLabel}…` : `Generate ${langLabel} Blueprint`}</span>
        </button>
      </div>

      {/* Body */}
      <div className="deck-body">
        <div className="deck-grid">
          {/* ── Left column: Programming Languages & Domain ── */}
          <div>
            {/* 1. Primary & Polyglot Programming Languages */}
            <div className="control-group">
              <div className="control-label">
                <span className="control-label-text" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Code size={14} color="var(--cyan-400)" />
                  <span>1 · Programming Languages (Multi-Select)</span>
                </span>
                <span className="control-subtext" style={{ color: 'var(--cyan-400)', fontWeight: 600 }}>
                  {currentLanguages.length === 1
                    ? `Active: ${primaryLanguage.icon} ${primaryLanguage.name}`
                    : `Active (${currentLanguages.length}): ${currentLanguages.map(l => `${l.icon} ${l.name}`).join(' + ')}`}
                </span>
              </div>
              <div className="domain-grid" role="group" aria-label="Target Programming Languages" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))' }}>
                {PROGRAMMING_LANGUAGES.map(lang => {
                  const isActive = selectedSkills.includes(lang.id);
                  return (
                    <button
                      key={lang.id}
                      type="button"
                      aria-pressed={isActive}
                      className={`domain-pill${isActive ? ' active' : ''}`}
                      onClick={() => handleToggleLanguage(lang.id)}
                      title={`${lang.desc} (Click to toggle)`}
                      style={{
                        padding: '0.45rem 0.65rem',
                        fontSize: '0.8rem',
                        justifyContent: 'flex-start',
                        borderColor: isActive ? 'var(--cyan-400)' : undefined
                      }}
                    >
                      <span style={{ fontSize: '1rem' }}>{lang.icon}</span>
                      <span style={{ fontWeight: isActive ? 700 : 500 }}>{lang.name}</span>
                      {isActive && (
                        <Check size={12} color="var(--cyan-400)" style={{ marginLeft: 'auto' }} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Technical Domain */}
            <div className="control-group">
              <div className="control-label">
                <span className="control-label-text">2 · Domain</span>
                <span className="control-subtext">Choose target area</span>
              </div>
              <div className="domain-grid" role="radiogroup" aria-label="Technical domain">
                {DOMAINS.map(dom => {
                  const IconComponent = DOMAIN_ICONS[dom.icon] || BrainCircuit;
                  const isActive = selectedDomain === dom.id;
                  return (
                    <button
                      key={dom.id}
                      type="button"
                      role="radio"
                      aria-checked={isActive}
                      className={`domain-pill${isActive ? ' active' : ''}`}
                      onClick={() => setSelectedDomain(dom.id)}
                    >
                      <IconComponent
                        size={15}
                        color={isActive ? 'var(--indigo-400)' : dom.color}
                        aria-hidden="true"
                      />
                      <span>{dom.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Frameworks & Infrastructure */}
            <div className="control-group">
              <div className="control-label">
                <span className="control-label-text">3 · {langLabel} Stack & Ecosystem</span>
                <span className="control-subtext">{selectedSkills.length} active</span>
              </div>
              <div className="tags-cloud" role="group" aria-label={`Select ${langLabel} frameworks and tools`}>
                {displayFrameworks.map(skill => {
                  const isActive = selectedSkills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      className={`skill-tag${isActive ? ' active' : ''}`}
                      onClick={() => toggleFramework(skill)}
                      aria-pressed={isActive}
                    >
                      {isActive && <Check size={10} aria-hidden="true" style={{ display: 'inline', marginRight: '2px' }} />}
                      {skill}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Right column: Ambition + Novelty + Custom ── */}
          <div>
            {/* Ambition */}
            <div className="control-group">
              <div className="control-label">
                <span className="control-label-text">4 · Ambition Target</span>
                <span className="control-subtext">Shapes evaluation angle</span>
              </div>
              <div className="ambition-grid" role="radiogroup" aria-label="Project ambition target">
                {AMBITION_TARGETS.map(target => {
                  const isActive = ambition === target.id;
                  return (
                    <div
                      key={target.id}
                      role="radio"
                      aria-checked={isActive}
                      className={`ambition-card${isActive ? ' active' : ''}`}
                      onClick={() => setAmbition(target.id)}
                      tabIndex={0}
                      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setAmbition(target.id)}
                    >
                      <div className="ambition-title">{target.label}</div>
                      <p className="ambition-desc">{target.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Novelty Slider */}
            <div className="control-group">
              <div className="control-label">
                <span className="control-label-text">5 · Innovation Dial</span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    color: 'var(--cyan-400)',
                    fontWeight: 700
                  }}
                >
                  {noveltyBias}%
                </span>
              </div>
              <div className="slider-container">
                <input
                  type="range"
                  min="75"
                  max="98"
                  value={noveltyBias}
                  onChange={(e) => setNoveltyBias(Number(e.target.value))}
                  className="novelty-slider"
                  aria-label={`Novelty bias: ${noveltyBias}%`}
                  aria-valuemin={75}
                  aria-valuemax={98}
                  aria-valuenow={noveltyBias}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="t-caption t-dim">Safe / Academic</span>
                  <span className="t-caption t-dim">Breakthrough</span>
                </div>
              </div>
            </div>

            {/* 6. Team Size & Timeline */}
            <div className="control-group">
              <div className="control-label">
                <span className="control-label-text">6 · Team & Timeline</span>
                <span className="control-subtext">Calibrate scope</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                <select
                  className="custom-input"
                  style={{ padding: '0.45rem 0.6rem', fontSize: '0.8rem', cursor: 'pointer' }}
                  value={teamSize}
                  onChange={(e) => setTeamSize(e.target.value)}
                  aria-label="Select team size"
                >
                  {TEAM_SIZES.map(t => (
                    <option key={t.id} value={t.label} style={{ background: '#0a0e22', color: '#fff' }}>
                      {t.label}
                    </option>
                  ))}
                </select>

                <select
                  className="custom-input"
                  style={{ padding: '0.45rem 0.6rem', fontSize: '0.8rem', cursor: 'pointer' }}
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  aria-label="Select project timeline"
                >
                  {TIMEFRAMES.map(tf => (
                    <option key={tf.id} value={tf.label} style={{ background: '#0a0e22', color: '#fff' }}>
                      {tf.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Custom prompt */}
            <div className="control-group" style={{ marginBottom: 0 }}>
              <label className="control-label" htmlFor="custom-prompt-input">
                <span className="control-label-text">7 · Focus Keyword</span>
                <span className="control-subtext">optional</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="custom-prompt-input"
                  type="text"
                  className="custom-input"
                  placeholder={`e.g. "${primaryLanguage.name} event streaming", "SIMD optimization", "ZK proof"`}
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                  autoComplete="off"
                />
                {customPrompt && (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isGenerating}
                    aria-label="Submit with this focus"
                    style={{
                      position: 'absolute',
                      right: '8px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'var(--indigo-500)',
                      border: 'none',
                      borderRadius: 'var(--radius-sm)',
                      color: '#fff',
                      padding: '0.3rem 0.55rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Zap size={14} aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer bar: context info */}
      <div className="deck-footer">
        <p className="t-small t-dim">
          Synthesizing blueprint tailored for <strong style={{ color: 'var(--cyan-400)' }}>{primaryLanguage.icon} {langLabel}</strong>.
          {selectedSkills.length > 0 && (
            <> Stack: <span style={{ color: 'var(--text-medium)', fontFamily: 'var(--font-mono)' }}>
              {selectedSkills.slice(0, 4).join(' · ')}{selectedSkills.length > 4 ? ` +${selectedSkills.length - 4}` : ''}
            </span></>
          )}
        </p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={isGenerating}
          aria-busy={isGenerating}
        >
          <Sparkles size={15} className={isGenerating ? 'spin' : ''} aria-hidden="true" />
          <span>{isGenerating ? 'Synthesizing…' : `Generate ${langLabel} Blueprint`}</span>
        </button>
      </div>
    </section>
  );
}
