export const EXAMINER_PERSONAS = [
  {
    id: 'dr-rigor',
    name: 'Dr. Arthur Rigor',
    title: 'Senior Algorithms Professor & Viva Chair',
    avatar: '👨‍🏫',
    specialty: 'Time/Space Complexity, Data Integrity & Algorithmic Rigor',
    tagline: '"If you cannot mathematically prove your bounds, it is merely conjecture."',
    voiceConfig: { pitch: 0.9, rate: 0.95 },
    vibeColor: '#ef4444',
    badge: 'Hardest Critic',
    rubrics: ['Mathematical Justification', 'Big-O Analysis', 'Edge-Case Resilience'],
    sampleGreeting: "Welcome to your capstone defense. I have reviewed your synopsis. I will not be swayed by slick UI—I want to see the computational integrity under the hood. Let us begin."
  },
  {
    id: 'prof-vance',
    name: 'Prof. Elena Vance',
    title: 'Industry Systems Architect & Cloud Faculty',
    avatar: '👩‍💻',
    specialty: 'System Resilience, High Concurrency & Production Scalability',
    tagline: '"Localhost is a fantasy. What happens when your message queue fills up at 3 AM?"',
    voiceConfig: { pitch: 1.1, rate: 1.0 },
    vibeColor: '#38bdf8',
    badge: 'Production Stickler',
    rubrics: ['Distributed Architecture', 'Latency & Throughput', 'Security & Failure Modes'],
    sampleGreeting: "Good morning. Your project proposal looks ambitious on paper, but I want to evaluate if you built a toy or an engineering feat ready for real-world traffic. Defend your infrastructure."
  },
  {
    id: 'dr-eureka',
    name: 'Dr. Kaelen Eureka',
    title: 'Dean of Research & Patent Evaluation Committee',
    avatar: '🔬',
    specialty: 'Research Novelty, Literature Survey & Ablation Studies',
    tagline: '"Thousands of students build this every year. Convince me why yours deserves a patent."',
    voiceConfig: { pitch: 1.0, rate: 0.98 },
    vibeColor: '#a855f7',
    badge: 'Novelty Investigator',
    rubrics: ['State-of-the-Art Gap', 'Ablation & Benchmarking', 'Academic Novelty'],
    sampleGreeting: "Greetings. Final-year committees are flooded with duplicate ideas. I am examining your work specifically for scholarly contribution and novelty. Prove your intellectual divergence."
  }
];

export const GENERAL_VIVA_RUBRIC = {
  categories: [
    { key: 'technicalDepth', label: 'Technical Depth', max: 30, desc: 'Understanding of core algorithms, frameworks, and state management' },
    { key: 'architecturalRationale', label: 'Architectural Rationale', max: 30, desc: 'Ability to justify stack choices against alternatives' },
    { key: 'defenseConfidence', label: 'Defense & Communication', max: 25, desc: 'Clarity, conciseness, and academic composure under pressure' },
    { key: 'noveltyViability', label: 'Novelty & Practical Feasibility', max: 15, desc: 'Evidence of originality beyond standard college tutorials' }
  ],
  verdicts: [
    { minScore: 85, label: 'Accepted with Highest Honors (Grade A+)', color: '#10b981', badge: 'Honors Pass 🏆' },
    { minScore: 70, label: 'Accepted with Minor Revisions (Grade A)', color: '#06b6d4', badge: 'Solid Pass ✨' },
    { minScore: 50, label: 'Conditional Acceptance (Requires Defense Retest)', color: '#f59e0b', badge: 'Revision Required ⚠️' },
    { minScore: 0, label: 'Re-examination Recommended', color: '#ef4444', badge: 'Unsatisfactory ❌' }
  ]
};
