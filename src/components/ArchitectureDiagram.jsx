import React, { useState } from 'react';
import { Layers, ArrowDown, Activity, Zap, Cpu } from 'lucide-react';

export default function ArchitectureDiagram({ architecture, projectTitle: _projectTitle }) {
  const [selectedNode, setSelectedNode] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);

  if (!architecture || !architecture.layers) {
    return <p style={{ color: 'var(--text-dim)' }}>No architecture data available.</p>;
  }

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
    }, 3500);
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.25rem',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}>
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Layers size={18} color="var(--accent-secondary)" />
            <span>Interactive System Topology & Pipeline</span>
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-dim)' }}>
            Click any component node to inspect latency bounds, protocols, and failover mechanics.
          </p>
        </div>

        <button
          className={`btn btn-sm ${isSimulating ? 'btn-accent-cyan' : 'btn-secondary'}`}
          onClick={handleSimulate}
          disabled={isSimulating}
        >
          <Zap size={15} className={isSimulating ? 'spin' : ''} />
          <span>{isSimulating ? 'Streaming Telemetry Packets...' : 'Simulate Live Pipeline'}</span>
        </button>
      </div>

      {/* Architecture Visualizer Layers */}
      <div className="arch-container">
        {architecture.layers.map((layer, idx) => (
          <React.Fragment key={idx}>
            <div
              className="arch-layer-card"
              style={{
                borderLeft: `4px solid ${idx === 0 ? 'var(--accent-primary)' : idx === 1 ? 'var(--accent-secondary)' : idx === 2 ? 'var(--accent-tertiary)' : 'var(--accent-emerald)'}`,
                boxShadow: isSimulating ? '0 0 20px rgba(6, 182, 212, 0.25)' : 'none'
              }}
            >
              <div className="arch-layer-title">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    background: 'rgba(255,255,255,0.06)',
                    padding: '0.15rem 0.45rem',
                    borderRadius: '4px',
                    color: 'var(--text-dim)'
                  }}>
                    TIER 0{idx + 1}
                  </span>
                  <span>{layer.name}</span>
                </div>
                <span style={{
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--accent-secondary)'
                }}>
                  {layer.tech}
                </span>
              </div>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                {layer.desc}
              </p>

              {/* Sub-node pills */}
              <div className="arch-node-pills">
                {layer.nodes.map((nodeName, nIdx) => {
                  const isNodeSelected = selectedNode?.name === nodeName;
                  return (
                    <div
                      key={nIdx}
                      className={`arch-node ${isSimulating ? 'animate-pulse' : ''}`}
                      onClick={() => setSelectedNode({
                        name: nodeName,
                        layer: layer.name,
                        tech: layer.tech,
                        tier: idx + 1
                      })}
                      style={{
                        cursor: 'pointer',
                        borderColor: isNodeSelected ? 'var(--accent-secondary)' : undefined,
                        background: isNodeSelected ? 'rgba(6, 182, 212, 0.2)' : undefined,
                        color: isNodeSelected ? '#ffffff' : undefined,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        transition: 'var(--transition-smooth)'
                      }}
                    >
                      <Activity size={12} color="var(--accent-secondary)" />
                      <span>{nodeName}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Connecting Arrow */}
            {idx < architecture.layers.length - 1 && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '-0.5rem 0',
                color: isSimulating ? 'var(--accent-secondary)' : 'var(--text-dim)',
                animation: isSimulating ? 'pulse 1s infinite' : 'none'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-mono)',
                  background: 'rgba(0,0,0,0.4)',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '999px',
                  border: '1px solid var(--border-subtle)'
                }}>
                  <ArrowDown size={13} />
                  <span>{isSimulating ? 'Async Ring-Buffer Telemetry' : 'gRPC / Zero-Copy Stream'}</span>
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Selected Node Inspector Drawer */}
      {selectedNode && (
        <div style={{
          marginTop: '1.25rem',
          padding: '1.25rem',
          borderRadius: '12px',
          background: 'rgba(6, 182, 212, 0.08)',
          border: '1px solid rgba(6, 182, 212, 0.3)',
          animation: 'fadeIn 0.2s'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Cpu size={16} color="var(--accent-secondary)" />
              <strong style={{ fontSize: '0.95rem', color: '#ffffff' }}>Node Inspector: {selectedNode.name}</strong>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-secondary)', fontFamily: 'var(--font-mono)' }}>
                (Tier 0{selectedNode.tier}: {selectedNode.layer})
              </span>
            </div>
            <button
              onClick={() => setSelectedNode(null)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-dim)',
                cursor: 'pointer',
                fontSize: '0.85rem'
              }}
            >
              ✕ Close
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', marginTop: '0.75rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.6rem', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Target Latency</span>
              <p style={{ fontSize: '0.88rem', fontWeight: 600, color: '#34d399', fontFamily: 'var(--font-mono)' }}>&lt; 5.2 ms (p99)</p>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.6rem', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Protocol & Serialization</span>
              <p style={{ fontSize: '0.88rem', fontWeight: 600, color: '#c7d2fe', fontFamily: 'var(--font-mono)' }}>Zero-Copy Protobuf</p>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.6rem', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Concurrency Model</span>
              <p style={{ fontSize: '0.88rem', fontWeight: 600, color: '#a5b4fc', fontFamily: 'var(--font-mono)' }}>Lockless Ring Buffer</p>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.6rem', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Fault Tolerance</span>
              <p style={{ fontSize: '0.88rem', fontWeight: 600, color: '#fbbf24', fontFamily: 'var(--font-mono)' }}>Automated Exponential Backoff</p>
            </div>
          </div>
        </div>
      )}

      {/* End to End Pipeline Steps */}
      {architecture.dataFlow && (
        <div style={{
          marginTop: '1.5rem',
          background: 'rgba(0,0,0,0.3)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '12px',
          padding: '1.25rem'
        }}>
          <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Deterministic End-to-End Execution Trace
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {architecture.dataFlow.map((step, sIdx) => (
              <div key={sIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.85rem' }}>
                <span style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: 'rgba(99, 102, 241, 0.2)',
                  color: 'var(--accent-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  flexShrink: 0
                }}>
                  {sIdx + 1}
                </span>
                <span style={{ color: '#cbd5e1' }}>{step}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
