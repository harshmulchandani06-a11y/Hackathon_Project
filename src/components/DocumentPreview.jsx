import React, { useState, useMemo } from 'react';
import { FileText, Download, Printer, Copy, Check, School } from 'lucide-react';
import { generateSynopsisMarkdown, downloadMarkdownFile, printDocument } from '../services/exportService.js';

export default function DocumentPreview({ project, onClose: _onClose }) {
  const [candidateInfo, setCandidateInfo] = useState({
    studentName: 'Alex Mercer',
    rollNumber: 'CS-2026-FYP-042',
    department: 'Department of Computer Science & Engineering',
    institution: 'National Institute of Technology & Engineering',
    advisor: 'Dr. Katherine Sanders'
  });

  const [copied, setCopied] = useState(false);

  // Recompute markdown whenever candidateInfo OR project changes
  const markdownContent = useMemo(
    () => generateSynopsisMarkdown(project, candidateInfo),
    [project, candidateInfo]
  );

  const handleCopy = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(markdownContent)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(() => {
          // Fallback: select text from a temp element
          const el = document.createElement('textarea');
          el.value = markdownContent;
          document.body.appendChild(el);
          el.select();
          document.execCommand('copy');
          document.body.removeChild(el);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
    }
  };

  const handleDownload = () => {
    downloadMarkdownFile(project.title, markdownContent);
  };

  return (
    <div style={{ padding: '0.5rem 0' }}>
      {/* Action Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileText size={20} color="var(--accent-secondary)" />
            <span>Academic Project Synopsis & SRS Generator</span>
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-dim)' }}>
            Conforms to university engineering committee & IEEE capstone formatting standards.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          <button className="btn btn-secondary btn-sm" onClick={handleCopy}>
            {copied ? <Check size={15} color="var(--accent-emerald)" /> : <Copy size={15} />}
            <span>{copied ? 'Copied to Clipboard' : 'Copy Markdown'}</span>
          </button>
          <button className="btn btn-secondary btn-sm" onClick={printDocument}>
            <Printer size={15} />
            <span>Print / Save PDF</span>
          </button>
          <button className="btn btn-primary btn-sm" onClick={handleDownload}>
            <Download size={15} />
            <span>Download .md</span>
          </button>
        </div>
      </div>

      {/* Candidate Customization Box */}
      <div style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '12px',
        padding: '1.25rem',
        marginBottom: '1.5rem'
      }}>
        <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <School size={15} color="var(--accent-primary)" />
          <span>Candidate & University Information (Embed in Document)</span>
        </h4>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
          <div>
            <label style={{ fontSize: '0.72rem', color: 'var(--text-dim)', display: 'block', marginBottom: '0.2rem' }}>Candidate Name(s)</label>
            <input
              type="text"
              className="custom-input"
              style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
              value={candidateInfo.studentName}
              onChange={(e) => setCandidateInfo({ ...candidateInfo, studentName: e.target.value })}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.72rem', color: 'var(--text-dim)', display: 'block', marginBottom: '0.2rem' }}>Roll / Registration ID</label>
            <input
              type="text"
              className="custom-input"
              style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
              value={candidateInfo.rollNumber}
              onChange={(e) => setCandidateInfo({ ...candidateInfo, rollNumber: e.target.value })}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.72rem', color: 'var(--text-dim)', display: 'block', marginBottom: '0.2rem' }}>Department</label>
            <input
              type="text"
              className="custom-input"
              style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
              value={candidateInfo.department}
              onChange={(e) => setCandidateInfo({ ...candidateInfo, department: e.target.value })}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.72rem', color: 'var(--text-dim)', display: 'block', marginBottom: '0.2rem' }}>Institution / College</label>
            <input
              type="text"
              className="custom-input"
              style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
              value={candidateInfo.institution}
              onChange={(e) => setCandidateInfo({ ...candidateInfo, institution: e.target.value })}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.72rem', color: 'var(--text-dim)', display: 'block', marginBottom: '0.2rem' }}>Faculty Project Guide</label>
            <input
              type="text"
              className="custom-input"
              style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
              value={candidateInfo.advisor}
              onChange={(e) => setCandidateInfo({ ...candidateInfo, advisor: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Document Paper Preview */}
      <div style={{
        background: '#0a0e22',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '14px',
        padding: '2.5rem',
        boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)'
      }}>
        <div style={{ maxWidth: '820px', margin: '0 auto', fontFamily: 'var(--font-main)' }}>
          <div style={{ textAlign: 'center', borderBottom: '2px solid rgba(255,255,255,0.15)', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
            <span style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent-secondary)', fontWeight: 700 }}>
              Official Capstone Project Synopsis & SRS
            </span>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', marginTop: '0.5rem', lineHeight: 1.3 }}>
              {project.title}
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
              Academic Session 2025–2026 • {candidateInfo.department} • {candidateInfo.institution}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', color: '#cbd5e1', fontSize: '0.92rem', lineHeight: 1.7 }}>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.3rem', marginBottom: '0.5rem' }}>
                1. Abstract & Scientific Motivation
              </h4>
              <p>{project.synopsis?.abstract || project.summary}</p>
            </div>

            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.3rem', marginBottom: '0.5rem' }}>
                2. Problem Statement & Cliché-Busting Pivot
              </h4>
              <p>{project.problemStatement}</p>
              <div style={{ marginTop: '0.6rem', background: 'rgba(0,0,0,0.3)', padding: '0.75rem 1rem', borderRadius: '8px', fontSize: '0.86rem' }}>
                <p><strong style={{ color: '#f87171' }}>Average Approach:</strong> {project.clicheVsNovelty?.clicheIdea}</p>
                <p style={{ marginTop: '0.3rem' }}><strong style={{ color: '#34d399' }}>Proposed Novelty Pivot:</strong> {project.clicheVsNovelty?.noveltyPivot} (Novelty Score: {project.noveltyScore}%)</p>
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.3rem', marginBottom: '0.5rem' }}>
                3. System Architecture Layers
              </h4>
              <ul style={{ paddingLeft: '1.25rem' }}>
                {(project.architecture?.layers || []).map((layer, idx) => (
                  <li key={idx} style={{ marginBottom: '0.4rem' }}>
                    <strong style={{ color: '#ffffff' }}>{layer.name} ({layer.tech}):</strong> {layer.desc}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.3rem', marginBottom: '0.5rem' }}>
                4. Hardware & Software Specifications
              </h4>
              <p><strong style={{ color: '#ffffff' }}>Hardware Requirements:</strong> {project.synopsis?.hardwareSpecs || 'Standard multi-core workstation with 16GB RAM.'}</p>
              <p><strong style={{ color: '#ffffff' }}>Software Toolchain:</strong> {project.synopsis?.softwareSpecs || 'UNIX/Linux, Docker, modern compilers, and WebSockets.'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
