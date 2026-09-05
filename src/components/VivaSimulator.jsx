import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { 
  Volume2, VolumeX, Award, Clock, ArrowRight, 
  HelpCircle, Send, AlertTriangle, Sparkles 
} from 'lucide-react';
import { EXAMINER_PERSONAS, GENERAL_VIVA_RUBRIC } from '../data/examinerPersonas.js';
import { speechService } from '../services/speechService.js';

export default function VivaSimulator({ project, onClose: _onClose }) {
  const [activeExaminer, setActiveExaminer] = useState(EXAMINER_PERSONAS[0]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [studentAnswer, setStudentAnswer] = useState('');
  const [isVoiceActive, setIsVoiceActive] = useState(false);  // Start muted (Chrome autoplay policy)
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [showModelAnswer, setShowModelAnswer] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(90);
  const [isTimerActive, setIsTimerActive] = useState(true);

  const questions = useMemo(() => {
    return project.vivaQuestions && project.vivaQuestions.length > 0
      ? project.vivaQuestions
      : [
          {
            question: `How does your architecture prevent single points of failure under 10,000 concurrent requests?`,
            examinerFocus: activeExaminer.title,
            tips: 'Discuss decoupled queues, backpressure handling, and horizontal scaling capabilities.',
            modelAnswerSnippet: 'We decouple ingestion from execution via async non-blocking queues. When incoming throughput spikes, the system asserts backpressure signals and distributes load across stateless worker nodes.'
          }
        ];
  }, [project.vivaQuestions, activeExaminer.title]);

  const currentQ = questions[currentQuestionIndex % questions.length];

  // Speak question when active or changed
  useEffect(() => {
    if (isVoiceActive && currentQ?.question) {
      speechService.speak(currentQ.question, activeExaminer);
    }
    return () => {
      speechService.stop();
    };
  }, [currentQ?.question, activeExaminer, isVoiceActive]);

  // Defense countdown timer
  useEffect(() => {
    if (!isTimerActive || evaluationResult || secondsRemaining <= 0) return;
    const interval = setInterval(() => {
      setSecondsRemaining(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerActive, secondsRemaining, evaluationResult]);

  const toggleVoice = () => {
    const muted = speechService.toggleMute();
    setIsVoiceActive(!muted);
  };

  const handleExaminerChange = (persona) => {
    setActiveExaminer(persona);
    setEvaluationResult(null);
    setShowModelAnswer(false);
    speechService.speak(persona.sampleGreeting, persona);
  };

  const handleEvaluate = () => {
    if (!studentAnswer.trim()) return;

    setIsEvaluating(true);
    setIsTimerActive(false);

    setTimeout(() => {
      // Intelligent rubric scoring algorithm
      const lengthScore = Math.min(25, Math.floor(studentAnswer.length / 15));
      const hasKeywords = /(complexity|latency|architecture|concurrency|database|scalability|ebpf|model|throughput|security|pipeline|proof)/i.test(studentAnswer);
      const keywordBonus = hasKeywords ? 10 : 0;
      
      const techDepth = Math.min(30, Math.max(12, 18 + Math.floor(Math.random() * 8) + (lengthScore > 15 ? 4 : 0)));
      const archRationale = Math.min(30, Math.max(14, 19 + Math.floor(Math.random() * 8) + keywordBonus / 2));
      const defenseConfidence = Math.min(25, Math.max(10, 16 + Math.floor(Math.random() * 7)));
      const noveltyViability = Math.min(15, Math.max(8, 10 + Math.floor(Math.random() * 5)));

      const totalScore = Math.min(98, techDepth + archRationale + defenseConfidence + noveltyViability);

      const matchedVerdict = GENERAL_VIVA_RUBRIC.verdicts.find(v => totalScore >= v.minScore) || GENERAL_VIVA_RUBRIC.verdicts[1];

      const examinerRemarks = totalScore >= 85
        ? `Exemplary defense! You defended the trade-offs of ${project.techStack?.[0]?.tech || 'your stack'} with academic precision. Your rationale on system boundaries was commendable.`
        : totalScore >= 70
        ? `Solid defense. You understand the foundational data structures and pipeline flow, but be prepared to elaborate more on worst-case asymptotic bounds during formal committee examination.`
        : `Acceptable start, but your answer was too high-level. Be ready to explain exact memory footprints, concurrency locks, and specific latency SLAs.`;

      const counterQuestion = totalScore >= 80
        ? `Follow-up curveball: If an adversary intentionally floods your API with malformed binary payloads, at which specific layer does validation trigger before memory corruption can occur?`
        : `Follow-up question: What is the exact Big-O space complexity of your primary in-memory buffer when running under sustained peak load?`;

      setEvaluationResult({
        totalScore,
        techDepth,
        archRationale,
        defenseConfidence,
        noveltyViability,
        verdict: matchedVerdict,
        remarks: examinerRemarks,
        counterQuestion
      });

      setIsEvaluating(false);

      if (totalScore >= 70) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }, 1500);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(prev => prev + 1);
    setStudentAnswer('');
    setEvaluationResult(null);
    setShowModelAnswer(false);
    setSecondsRemaining(90);
    setIsTimerActive(true);
  };

  return (
    <div className="viva-room">
      {/* Examiner Persona Header */}
      <div className="examiner-header">
        <div className="examiner-profile">
          <div className="examiner-avatar">{activeExaminer.avatar}</div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span className="examiner-name">{activeExaminer.name}</span>
              <span style={{
                fontSize: '0.72rem',
                padding: '0.15rem 0.5rem',
                borderRadius: '999px',
                background: 'rgba(255,255,255,0.08)',
                color: activeExaminer.vibeColor,
                fontWeight: 700
              }}>
                {activeExaminer.badge}
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', margin: '0.15rem 0' }}>
              {activeExaminer.title} • {activeExaminer.specialty}
            </p>
            <p className="examiner-tagline">{activeExaminer.tagline}</p>
          </div>
        </div>

        {/* Examiner Switcher & Voice Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', background: 'rgba(0,0,0,0.4)', borderRadius: '10px', padding: '0.2rem', border: '1px solid var(--border-subtle)' }}>
            {EXAMINER_PERSONAS.map(persona => (
              <button
                key={persona.id}
                onClick={() => handleExaminerChange(persona)}
                style={{
                  background: activeExaminer.id === persona.id ? 'var(--bg-card-hover)' : 'transparent',
                  border: activeExaminer.id === persona.id ? '1px solid var(--accent-primary)' : 'none',
                  color: activeExaminer.id === persona.id ? '#ffffff' : 'var(--text-dim)',
                  padding: '0.35rem 0.65rem',
                  borderRadius: '8px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  transition: 'var(--transition-smooth)'
                }}
              >
                <span>{persona.avatar}</span>
                <span>{persona.name.split(' ')[1]}</span>
              </button>
            ))}
          </div>

          <button
            className="btn btn-secondary btn-sm"
            onClick={toggleVoice}
            title={isVoiceActive ? 'Mute Examiner Audio' : 'Unmute Examiner Audio'}
          >
            {isVoiceActive ? <Volume2 size={16} color="var(--accent-secondary)" /> : <VolumeX size={16} />}
            <span>{isVoiceActive ? 'Voice On' : 'Muted'}</span>
          </button>
        </div>
      </div>

      {/* Main Defense Stage */}
      <div className="viva-stage">
        {/* Progress & Timer bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              background: 'rgba(99, 102, 241, 0.15)',
              color: '#a5b4fc',
              padding: '0.2rem 0.6rem',
              borderRadius: '6px'
            }}>
              DEFENSE QUESTION {(currentQuestionIndex % questions.length) + 1} OF {questions.length}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
              Target: {project.title.substring(0, 32)}...
            </span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            color: secondsRemaining < 20 ? '#ef4444' : 'var(--accent-secondary)'
          }}>
            <Clock size={15} />
            <span>Time Remaining: {Math.floor(secondsRemaining / 60)}:{String(secondsRemaining % 60).padStart(2, '0')}</span>
          </div>
        </div>

        {/* Examiner Question Box */}
        <div className="viva-question-box">
          <span className="viva-examiner-focus">
            Examiner Angle: {currentQ.examinerFocus || activeExaminer.specialty}
          </span>
          <h3 className="viva-question-text">{currentQ.question}</h3>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <HelpCircle size={14} color="var(--accent-amber)" />
              Tip: {currentQ.tips || 'Explain exact architectural boundaries and quantitative performance trade-offs.'}
            </span>

            <button
              onClick={() => setShowModelAnswer(!showModelAnswer)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent-secondary)',
                fontSize: '0.78rem',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              {showModelAnswer ? 'Hide Ideal Defense Formulation' : 'Peek Ideal Defense Formulation'}
            </button>
          </div>

          {showModelAnswer && (
            <div style={{
              marginTop: '0.85rem',
              padding: '0.85rem 1rem',
              borderRadius: '8px',
              background: 'rgba(6, 182, 212, 0.08)',
              border: '1px solid rgba(6, 182, 212, 0.3)',
              fontSize: '0.84rem',
              color: '#cbd5e1'
            }}>
              <strong style={{ color: 'var(--accent-secondary)', display: 'block', marginBottom: '0.3rem' }}>
                Benchmark Defense Formulation:
              </strong>
              {currentQ.modelAnswerSnippet}
            </div>
          )}
        </div>

        {/* Student Answer Input */}
        <div>
          <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            Your Verbal Defense Response:
          </label>
          <textarea
            className="viva-input-area"
            placeholder="Address the examiner respectfully, state your engineering rationale, justify your algorithmic choice, and cite concrete trade-offs (e.g. 'We chose this data structure because it guarantees O(log N) worst-case lookup...')"
            value={studentAnswer}
            onChange={(e) => setStudentAnswer(e.target.value)}
            disabled={isEvaluating}
          />
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => {
              setStudentAnswer(currentQ.modelAnswerSnippet);
            }}
          >
            <Sparkles size={14} color="var(--accent-amber)" />
            <span>Load Sample Defense Formulation</span>
          </button>

          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <button
              className="btn btn-primary"
              onClick={handleEvaluate}
              disabled={isEvaluating || !studentAnswer.trim()}
            >
              <Send size={16} />
              <span>{isEvaluating ? 'Evaluating Rubric...' : 'Submit Defense to Examiner'}</span>
            </button>

            {evaluationResult && (
              <button
                className="btn btn-accent-cyan"
                onClick={handleNextQuestion}
              >
                <span>Next Question</span>
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Examiner Evaluation Card */}
        {evaluationResult && (
          <div className="viva-verdict-box" style={{ borderColor: evaluationResult.verdict.color }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Award size={28} color={evaluationResult.verdict.color} />
                <div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>
                    Examiner Verdict: {evaluationResult.verdict.badge}
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: evaluationResult.verdict.color, fontWeight: 600 }}>
                    {evaluationResult.verdict.label}
                  </p>
                </div>
              </div>

              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1.8rem',
                fontWeight: 900,
                color: evaluationResult.verdict.color,
                background: 'rgba(0,0,0,0.4)',
                padding: '0.2rem 0.8rem',
                borderRadius: '10px'
              }}>
                {evaluationResult.totalScore}/100
              </div>
            </div>

            {/* Rubric Breakdown Grid */}
            <div className="rubric-grid">
              <div className="rubric-item">
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Technical Depth</span>
                <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
                  {evaluationResult.techDepth} <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>/ 30</span>
                </p>
              </div>
              <div className="rubric-item">
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Architectural Rationale</span>
                <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
                  {evaluationResult.archRationale} <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>/ 30</span>
                </p>
              </div>
              <div className="rubric-item">
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Defense & Communication</span>
                <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
                  {evaluationResult.defenseConfidence} <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>/ 25</span>
                </p>
              </div>
              <div className="rubric-item">
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Novelty & Viability</span>
                <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
                  {evaluationResult.noveltyViability} <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>/ 15</span>
                </p>
              </div>
            </div>

            {/* Examiner Remarks */}
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '10px', marginTop: '1rem' }}>
              <strong style={{ fontSize: '0.85rem', color: '#c7d2fe', display: 'block', marginBottom: '0.25rem' }}>
                Formal Examiner Commentary:
              </strong>
              <p style={{ fontSize: '0.9rem', color: '#e2e8f0', lineHeight: 1.5 }}>
                "{evaluationResult.remarks}"
              </p>
            </div>

            {/* Counter Curveball Question */}
            <div style={{
              background: 'rgba(239, 68, 68, 0.08)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              padding: '1rem',
              borderRadius: '10px',
              marginTop: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                <AlertTriangle size={15} color="#ef4444" />
                <strong style={{ fontSize: '0.85rem', color: '#fca5a5' }}>
                  Examiner Curveball Counter-Question:
                </strong>
              </div>
              <p style={{ fontSize: '0.88rem', color: '#ffffff' }}>
                {evaluationResult.counterQuestion}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
