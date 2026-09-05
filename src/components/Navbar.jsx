import React from 'react';
import { Sparkles, Bookmark, Key, Zap } from 'lucide-react';

export default function Navbar({
  savedCount = 0,
  onOpenSaved,
  onOpenApiKeyModal,
  hasApiKey = false,
  onScrollToGenerator
}) {
  return (
    <header className="navbar" role="banner">
      <div
        className="nav-brand"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        role="link"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="NovaCapstone AI — go to top"
      >
        <div className="brand-icon-wrapper" aria-hidden="true">
          <Sparkles size={18} color="#ffffff" />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span className="brand-title">NovaCapstone</span>
            <span className="brand-tag">AI</span>
          </div>
        </div>
      </div>

      <nav className="nav-actions" aria-label="Main navigation">
        <button
          className="btn btn-ghost btn-sm"
          onClick={onOpenSaved}
          aria-label={`View ${savedCount} saved projects`}
          id="nav-saved-btn"
        >
          <Bookmark size={15} />
          <span className="hide-sm">Saved</span>
          {savedCount > 0 && (
            <span
              style={{
                background: 'var(--cyan-500)',
                color: '#000',
                fontWeight: 800,
                fontSize: '0.68rem',
                padding: '0.1rem 0.4rem',
                borderRadius: 'var(--radius-full)',
                lineHeight: 1,
                minWidth: '18px',
                textAlign: 'center'
              }}
              aria-label={`${savedCount} saved`}
            >
              {savedCount}
            </span>
          )}
        </button>

        <button
          className="btn btn-ghost btn-sm"
          onClick={onOpenApiKeyModal}
          aria-label={hasApiKey ? 'Gemini API key active — configure' : 'Add Gemini API key'}
          id="nav-apikey-btn"
        >
          <Key size={15} color={hasApiKey ? 'var(--emerald-400)' : undefined} />
          <span className="hide-sm">{hasApiKey ? 'Gemini Active' : 'API Key'}</span>
        </button>

        <button
          className="btn btn-ghost btn-sm"
          onClick={() => document.getElementById('founder-section')?.scrollIntoView({ behavior: 'smooth' })}
          aria-label="Jump to founder section"
          id="nav-founder-btn"
        >
          <span className="hide-sm">Founder</span>
        </button>

        <button
          className="btn btn-primary btn-sm"
          onClick={onScrollToGenerator}
          id="nav-generate-btn"
          aria-label="Jump to project generator"
        >
          <Zap size={14} />
          <span>Generate</span>
        </button>
      </nav>
    </header>
  );
}
