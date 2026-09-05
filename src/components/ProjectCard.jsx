import React from 'react';
import { Sparkles, Bookmark, Layers, MessageSquare, FileText } from 'lucide-react';

const LANG_ICONS = {
  Python: { icon: '🐍', color: '#60a5fa', bg: 'rgba(96, 165, 250, 0.12)' },
  Java: { icon: '☕', color: '#f97316', bg: 'rgba(249, 115, 22, 0.12)' },
  Rust: { icon: '⚡', color: '#fb923c', bg: 'rgba(251, 146, 60, 0.12)' },
  Go: { icon: '🐹', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.12)' },
  'C++': { icon: '⚙️', color: '#a855f7', bg: 'rgba(168, 85, 247, 0.12)' },
  TypeScript: { icon: '🔷', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.12)' },
  JavaScript: { icon: '🟨', color: '#facc15', bg: 'rgba(250, 204, 21, 0.12)' },
  Solidity: { icon: '💎', color: '#c084fc', bg: 'rgba(192, 132, 252, 0.12)' },
  'C#': { icon: '🟣', color: '#c084fc', bg: 'rgba(192, 132, 252, 0.12)' },
  Kotlin: { icon: '🎯', color: '#ec4899', bg: 'rgba(236, 72, 153, 0.12)' },
  Swift: { icon: '🐦', color: '#fb7185', bg: 'rgba(251, 113, 133, 0.12)' },
  PHP: { icon: '🐘', color: '#818cf8', bg: 'rgba(129, 140, 248, 0.12)' }
};

export default function ProjectCard({
  project,
  onOpenBlueprint,
  onOpenViva,
  onOpenSynopsis,
  isSaved = false,
  onToggleSave
}) {
  const extractedLangs = Array.isArray(project.primaryLanguages) && project.primaryLanguages.length > 0
    ? project.primaryLanguages
    : project.primaryLanguage
    ? project.primaryLanguage.split(/[,+&/]/).map(s => s.trim()).filter(s => Object.keys(LANG_ICONS).includes(s))
    : [];

  const displayLangs = extractedLangs.length > 0
    ? extractedLangs
    : (
      project.techStack?.find(t => Object.keys(LANG_ICONS).some(k => t.tech.toLowerCase().includes(k.toLowerCase())))
        ? [Object.keys(LANG_ICONS).find(k => project.techStack.some(t => t.tech.toLowerCase().includes(k.toLowerCase())))]
        : []
    );

  return (
    <article className="project-card" aria-label={project.title}>
      {/* Top row */}
      <div className="card-top-row">
        <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <span className="domain-badge">{project.domain}</span>
          {displayLangs.map(lang => {
            const langConfig = LANG_ICONS[lang] || { icon: '💻', color: 'var(--cyan-400)', bg: 'rgba(6,182,212,0.1)' };
            return (
              <span
                key={lang}
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                  padding: '0.15rem 0.5rem',
                  borderRadius: 'var(--radius-full)',
                  background: langConfig.bg,
                  color: langConfig.color,
                  border: `1px solid ${langConfig.color}40`,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}
              >
                <span>{langConfig.icon}</span>
                <span>{lang}</span>
              </span>
            );
          })}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
          <span className="novelty-badge">
            <Sparkles size={10} aria-hidden="true" />
            <span>{project.noveltyScore}%</span>
          </span>
          <button
            onClick={() => onToggleSave(project)}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: isSaved ? 'var(--cyan-500)' : 'var(--text-low)',
              padding: '0.2rem',
              display: 'flex',
              alignItems: 'center',
              borderRadius: 'var(--radius-sm)',
              transition: 'var(--transition-smooth)'
            }}
            aria-label={isSaved ? `Remove "${project.title}" from saved` : `Save "${project.title}"`}
            aria-pressed={isSaved}
          >
            <Bookmark size={16} fill={isSaved ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>

      {/* Title + tagline */}
      <h3 className="card-title">{project.title}</h3>
      <p className="card-tagline">{project.tagline}</p>

      {/* Cliché vs Novelty */}
      <div className="pivot-box" role="region" aria-label="Novelty comparison">
        <div className="pivot-cliche">
          <span aria-hidden="true">✕</span>
          <span><strong style={{ color: 'inherit' }}>Cliché: </strong>{project.clicheVsNovelty?.clicheIdea}</span>
        </div>
        <div className="pivot-novel">
          <span aria-hidden="true">✓</span>
          <span><strong style={{ color: 'inherit' }}>Pivot: </strong>{project.clicheVsNovelty?.noveltyPivot}</span>
        </div>
      </div>

      {/* Tech stack pills */}
      <div className="card-stack" aria-label="Tech stack">
        {(project.techStack || []).slice(0, 4).map((t, idx) => (
          <span key={idx} className="stack-pill">{t.tech.split(' ')[0]}</span>
        ))}
        {(project.techStack || []).length > 4 && (
          <span className="stack-pill" style={{ color: 'var(--cyan-400)' }}>
            +{(project.techStack || []).length - 4}
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="card-actions">
        <button
          className="btn btn-primary btn-sm"
          onClick={() => onOpenBlueprint(project)}
          style={{ flex: 1 }}
          id={`blueprint-btn-${project.id}`}
          aria-label={`Open full blueprint for ${project.title}`}
        >
          <Layers size={13} aria-hidden="true" />
          <span>View Blueprint</span>
        </button>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => onOpenViva(project)}
          aria-label={`Practice viva for ${project.title}`}
        >
          <MessageSquare size={13} aria-hidden="true" />
          <span>Viva Prep</span>
        </button>
        <button
          className="btn btn-ghost btn-sm btn-icon-only"
          onClick={() => onOpenSynopsis(project)}
          aria-label={`View synopsis for ${project.title}`}
          title="View College Synopsis"
        >
          <FileText size={14} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}
