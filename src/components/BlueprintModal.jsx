import React, { useState, useEffect } from 'react';
import {
  X, Layers, Cpu, Calendar, CheckSquare,
  MessageSquare, FileText, Bookmark, Sparkles
} from 'lucide-react';
import ArchitectureDiagram from './ArchitectureDiagram.jsx';
import VivaSimulator from './VivaSimulator.jsx';
import DocumentPreview from './DocumentPreview.jsx';

const TABS = [
  { id: 'architecture', label: 'Architecture',    Icon: Layers },
  { id: 'tech-stack',   label: 'Tech Rationale',  Icon: Cpu },
  { id: 'roadmap',      label: '12-Week Plan',    Icon: Calendar },
  { id: 'features',     label: 'Feature Scope',   Icon: CheckSquare },
  { id: 'viva',         label: 'Viva Prep',       Icon: MessageSquare, accent: 'var(--pink-400)' },
  { id: 'synopsis',     label: 'Synopsis / SRS',  Icon: FileText },
];

export default function BlueprintModal({
  project,
  onClose,
  isSaved = false,
  onToggleSave,
  initialTab = 'architecture',
  activeTab: controlledActiveTab,
  onTabChange
}) {
  const [uncontrolledTab, setUncontrolledTab] = useState(initialTab);
  const activeTab = controlledActiveTab !== undefined ? controlledActiveTab : uncontrolledTab;

  const handleTabChange = (newTab) => {
    setUncontrolledTab(newTab);
    if (onTabChange) {
      onTabChange(newTab);
    }
  };

  // Trap focus and keyboard close
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Blueprint: ${project.title}`}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* ── Header ── */}
        <div className="modal-header">
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
              <span className="domain-badge">{project.domain}</span>
              <span className="novelty-badge">
                <Sparkles size={10} aria-hidden="true" />
                <span>{project.noveltyScore}% Novelty</span>
              </span>
              {project.targetAmbition && (
                <span className="badge badge-neutral" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {project.targetAmbition}
                </span>
              )}
            </div>
            <h2 className="modal-title" style={{ wordBreak: 'break-word' }}>{project.title}</h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
            <button
              className={`btn btn-sm ${isSaved ? 'btn-accent-cyan' : 'btn-secondary'}`}
              onClick={() => onToggleSave(project)}
              aria-pressed={isSaved}
              aria-label={isSaved ? 'Remove from saved' : 'Save blueprint'}
            >
              <Bookmark size={14} fill={isSaved ? 'currentColor' : 'none'} aria-hidden="true" />
              <span className="hide-sm">{isSaved ? 'Saved' : 'Save'}</span>
            </button>
            <button
              className="btn btn-ghost btn-sm btn-icon-only"
              onClick={onClose}
              aria-label="Close blueprint"
            >
              <X size={17} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* ── Tab Navigation ── */}
        <div className="tab-list" role="tablist" aria-label="Blueprint sections">
          {TABS.map(({ id, label, Icon, accent }) => (
            <button
              key={id}
              role="tab"
              aria-selected={activeTab === id}
              aria-controls={`tabpanel-${id}`}
              id={`tab-${id}`}
              className={`tab-btn${activeTab === id ? ' active' : ''}`}
              onClick={() => handleTabChange(id)}
              style={accent ? { color: activeTab === id ? accent : undefined } : undefined}
            >
              <Icon size={14} aria-hidden="true" color={accent && activeTab !== id ? accent : undefined} />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* ── Body ── */}
        <div className="modal-body" id={`tabpanel-${activeTab}`} role="tabpanel" aria-labelledby={`tab-${activeTab}`}>

          {/* TAB: Architecture */}
          {activeTab === 'architecture' && (
            <div>
              {/* Project summary callout */}
              <div className="callout callout-info" style={{ marginBottom: 'var(--space-6)' }}>
                <div>
                  <p className="t-label" style={{ marginBottom: '0.25rem' }}>Project Essence</p>
                  <p style={{ fontSize: '0.875rem', color: 'inherit', lineHeight: 1.65 }}>{project.summary}</p>
                </div>
              </div>

              <ArchitectureDiagram architecture={project.architecture} projectTitle={project.title} />

              {/* CTA to Viva */}
              <div
                style={{
                  marginTop: 'var(--space-6)',
                  padding: 'var(--space-5)',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--bg-raised)',
                  border: '1px solid var(--border-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 'var(--space-4)',
                  flexWrap: 'wrap'
                }}
              >
                <div>
                  <p style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-high)' }}>Ready to defend this architecture?</p>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-low)', marginTop: '2px' }}>
                    Face our AI examiner who will probe your design decisions, complexity bounds, and trade-offs.
                  </p>
                </div>
                <button className="btn btn-primary btn-sm" onClick={() => handleTabChange('viva')}>
                  <MessageSquare size={14} aria-hidden="true" />
                  <span>Start Mock Viva</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB: Tech Stack */}
          {activeTab === 'tech-stack' && (
            <div>
              <p className="t-small t-muted" style={{ marginBottom: 'var(--space-5)', lineHeight: 1.6 }}>
                Examiners always ask: <em>"Why this technology over the standard alternative?"</em> These are your engineered justifications.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {(project.techStack || []).map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'var(--bg-raised)',
                      border: '1px solid var(--border-muted)',
                      borderRadius: 'var(--radius-lg)',
                      padding: 'var(--space-4) var(--space-5)',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: 'var(--space-4)'
                    }}
                  >
                    <div>
                      <p className="t-label" style={{ marginBottom: '0.35rem' }}>{item.category}</p>
                      <p style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--cyan-400)', fontFamily: 'var(--font-mono)' }}>
                        {item.tech}
                      </p>
                    </div>
                    <div>
                      <p className="t-label" style={{ marginBottom: '0.35rem' }}>Rationale</p>
                      <p style={{ fontSize: '0.8375rem', color: 'var(--text-medium)', lineHeight: 1.55 }}>{item.rationale}</p>
                    </div>
                    <div>
                      <p className="t-label" style={{ marginBottom: '0.35rem' }}>Rejected Alternative</p>
                      <p style={{ fontSize: '0.8125rem', color: 'var(--rose-400)', lineHeight: 1.55 }}>
                        ✕ {item.alternative}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: 12-Week Roadmap */}
          {activeTab === 'roadmap' && (
            <div>
              <p className="t-small t-muted" style={{ marginBottom: 'var(--space-5)', lineHeight: 1.6 }}>
                Week-by-week execution plan structured for university semester checkpoints and demo milestones.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                {(project.weeklyRoadmap || []).map((step, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 'var(--space-4)',
                      padding: 'var(--space-4) var(--space-5)',
                      background: 'var(--bg-raised)',
                      border: '1px solid var(--border-muted)',
                      borderRadius: 'var(--radius-lg)',
                      borderLeft: '3px solid var(--indigo-500)'
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: 'var(--cyan-400)',
                        background: 'rgba(6,182,212,0.1)',
                        padding: '0.2rem 0.55rem',
                        borderRadius: 'var(--radius-sm)',
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                        marginTop: '1px'
                      }}
                    >
                      {step.week}
                    </span>
                    <div>
                      <p style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-high)', marginBottom: '0.25rem' }}>{step.focus}</p>
                      <p style={{ fontSize: '0.8125rem', color: 'var(--text-low)', lineHeight: 1.55 }}>
                        <strong style={{ color: 'var(--text-medium)' }}>Deliverable: </strong>{step.milestone}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: Features */}
          {activeTab === 'features' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--space-4)' }}>
              {/* MVP */}
              <FeatureList
                phase="Phase 1"
                title="Core MVP"
                items={project.featureMatrix?.mvp}
                accent="var(--indigo-400)"
                bg="rgba(99,102,241,0.06)"
                border="rgba(99,102,241,0.2)"
                symbol="✓"
                symbolColor="var(--indigo-400)"
              />
              {/* Advanced */}
              <FeatureList
                phase="Phase 2"
                title="Differentiators"
                items={project.featureMatrix?.advanced}
                accent="var(--cyan-400)"
                bg="rgba(6,182,212,0.05)"
                border="rgba(6,182,212,0.18)"
                symbol="⚡"
                symbolColor="var(--cyan-400)"
              />
              {/* Wow Factor */}
              <FeatureList
                phase="Phase 3"
                title="Hackathon Wow Factor"
                items={project.featureMatrix?.wowFactor}
                accent="var(--pink-400)"
                bg="rgba(236,72,153,0.05)"
                border="rgba(236,72,153,0.2)"
                symbol="★"
                symbolColor="var(--pink-400)"
              />
            </div>
          )}

          {/* TAB: Viva Simulator */}
          {activeTab === 'viva' && (
            <VivaSimulator project={project} onClose={onClose} />
          )}

          {/* TAB: Synopsis */}
          {activeTab === 'synopsis' && (
            <DocumentPreview project={project} onClose={onClose} />
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Feature list sub-component ── */
function FeatureList({ phase, title, items = [], accent, bg, border, symbol, symbolColor }) {
  return (
    <div
      style={{
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-5)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: 'var(--space-4)' }}>
        <span
          style={{
            fontSize: '0.68rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: accent,
            background: `${accent}22`,
            border: `1px solid ${accent}44`,
            padding: '0.18rem 0.5rem',
            borderRadius: 'var(--radius-full)'
          }}
        >
          {phase}
        </span>
        <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-high)' }}>{title}</h4>
      </div>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {items.map((feat, idx) => (
          <li key={idx} style={{ fontSize: '0.8375rem', color: 'var(--text-medium)', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', lineHeight: 1.5 }}>
            <span style={{ color: symbolColor, flexShrink: 0, marginTop: '1px' }}>{symbol}</span>
            <span>{feat}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
