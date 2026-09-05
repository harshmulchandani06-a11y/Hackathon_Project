import React from 'react';
import { Sparkles, Code2, Terminal, Cpu, Heart, ExternalLink } from 'lucide-react';

/* ── Custom SVGs for pixel-perfect branding & 3D styling ── */
const InstagramIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function Footer() {
  const socialLinks = [
    {
      name: 'Instagram',
      handle: '@harshmulchandani4',
      url: 'https://www.instagram.com/harshmulchandani4/',
      icon: InstagramIcon,
      className: 'btn-3d-instagram',
      color: '#e1306c'
    },
    {
      name: 'LinkedIn',
      handle: 'harsh-mulchandani',
      url: 'https://www.linkedin.com/in/harsh-mulchandani-379ab737a',
      icon: LinkedinIcon,
      className: 'btn-3d-linkedin',
      color: '#0a66c2'
    },
    {
      name: 'GitHub',
      handle: 'harshmulchandani',
      url: 'https://share.google/zGNuxEwjPv2ar0MNp',
      icon: GithubIcon,
      className: 'btn-3d-github',
      color: '#38bdf8'
    }
  ];

  return (
    <footer className="app-footer" id="founder-section" aria-label="Founder & Community">
      <div className="footer-container">
        {/* ── Founder Card ── */}
        <div className="founder-card" tabIndex={0}>
          <div className="founder-badge-row">
            <span className="founder-tag">
              <Sparkles size={13} aria-hidden="true" />
              <span>Project Architect & Founder</span>
            </span>
            <span className="founder-status-live">
              <span className="live-dot" />
              <span>Lead Developer</span>
            </span>
          </div>

          <div className="founder-profile">
            <div className="founder-avatar-wrapper">
              <div className="founder-avatar-3d">
                <span className="founder-initials">HM</span>
              </div>
              <div className="founder-tech-badge" title="AI Architect">
                <Cpu size={12} />
              </div>
            </div>

            <div className="founder-info">
              <h2 className="founder-name">Harsh Mulchandani</h2>
              <p className="founder-role">Founder · Lead Software & AI Architect</p>
              <p className="founder-bio">
                Building AI-driven engineering platforms and autonomous synthesis architectures that empower final-year engineering students to turn ambitious concepts into award-winning, production-grade capstone projects.
              </p>
            </div>
          </div>

          <div className="founder-highlights">
            <div className="founder-pill">
              <Code2 size={13} color="var(--cyan-400)" />
              <span>Full-Stack AI Architecture</span>
            </div>
            <div className="founder-pill">
              <Terminal size={13} color="var(--indigo-400)" />
              <span>Distributed Systems</span>
            </div>
            <div className="founder-pill">
              <Sparkles size={13} color="var(--purple-400)" />
              <span>Hackathon Winner Engine</span>
            </div>
          </div>
        </div>

        {/* ── Follow Us & Social 3D Section ── */}
        <div className="follow-section">
          <div className="follow-header">
            <div className="follow-pill">
              <Heart size={13} color="var(--rose-400)" fill="var(--rose-400)" aria-hidden="true" />
              <span>Follow & Connect</span>
            </div>
            <h3 className="follow-title">Follow Us & Join the Community</h3>
            <p className="follow-subtitle">
              Connect with <strong>Harsh Mulchandani</strong> across social platforms for project updates, capstone mentorship, and tech insights.
            </p>
          </div>

          <div className="social-3d-grid" role="list" aria-label="Social media channels">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn-3d-social ${social.className}`}
                  role="listitem"
                  aria-label={`Follow Harsh Mulchandani on ${social.name}`}
                >
                  <div className="btn-3d-inner">
                    <span className="social-icon-wrapper">
                      <Icon />
                    </span>
                    <div className="social-text-block">
                      <span className="social-platform-name">{social.name}</span>
                      <span className="social-handle">{social.handle}</span>
                    </div>
                    <ExternalLink size={15} className="social-external-arrow" aria-hidden="true" />
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* ── Footer Bottom Credit ── */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            © {new Date().getFullYear()} <strong>NovaCapstone AI</strong> · Designed & Built by <strong>Harsh Mulchandani</strong>.
          </p>
          <div className="footer-links">
            <span className="footer-badge-mini">⚡ AI Capstone Engine</span>
            <span className="footer-badge-mini">🛡️ IEEE Synopsis Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
