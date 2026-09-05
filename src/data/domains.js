export const DOMAINS = [
  {
    id: 'ai-genai',
    name: 'AI, GenAI & LLMs',
    icon: 'BrainCircuit',
    badge: 'Trending 🔥',
    description: 'Autonomous multi-agent systems, multimodal reasoning, RAG pipelines, fine-tuning, and neural synthesis.',
    color: '#818cf8',
    gradient: 'from-indigo-500 to-purple-600',
    popularTech: ['Python', 'PyTorch', 'LangChain', 'LlamaIndex', 'FastAPI', 'Qdrant', 'Hugging Face']
  },
  {
    id: 'cybersec-zerotrust',
    name: 'Cybersecurity & Zero-Trust',
    icon: 'ShieldCheck',
    badge: 'High Demand',
    description: 'Post-quantum cryptography, automated exploit triage, zero-knowledge proofs, edge threat telemetry, and supply-chain audit.',
    color: '#34d399',
    gradient: 'from-emerald-500 to-teal-600',
    popularTech: ['Rust', 'Go', 'eBPF', 'Wasm', 'Docker', 'Python', 'Wireshark']
  },
  {
    id: 'medtech-bio',
    name: 'Healthcare & MedTech',
    icon: 'Activity',
    badge: 'Research Favorite',
    description: 'Federated learning on EHR, medical image segmentation, non-invasive biomarker tracking, and automated triage assistants.',
    color: '#f43f5e',
    gradient: 'from-rose-500 to-pink-600',
    popularTech: ['Python', 'TensorFlow', 'FastAPI', 'React', 'DICOM', 'OpenCV', 'Scikit-learn']
  },
  {
    id: 'cloud-distributed',
    name: 'Distributed Systems & Cloud',
    icon: 'Server',
    badge: 'Enterprise Grade',
    description: 'High-throughput event streaming, serverless edge orchestration, fault-tolerant consensus, and observability meshes.',
    color: '#38bdf8',
    gradient: 'from-sky-500 to-cyan-600',
    popularTech: ['Go', 'Rust', 'Kafka', 'Kubernetes', 'gRPC', 'PostgreSQL', 'Redis']
  },
  {
    id: 'iot-robotics',
    name: 'IoT, Robotics & Edge AI',
    icon: 'Cpu',
    badge: 'Hardware & Edge',
    description: 'TinyML on microcontrollers, ROS2 autonomous navigation, smart sensory grids, and edge vision inference.',
    color: '#fbbf24',
    gradient: 'from-amber-500 to-orange-600',
    popularTech: ['C++', 'Python', 'ROS2', 'ESP32', 'Raspberry Pi', 'MQTT', 'TensorFlow Lite']
  },
  {
    id: 'fintech-web3',
    name: 'FinTech & Zero-Knowledge',
    icon: 'Coins',
    badge: 'Novel Architecture',
    description: 'Algorithmic fraud detection, decentralized identity, automated compliance auditing, and high-frequency risk modeling.',
    color: '#a855f7',
    gradient: 'from-purple-500 to-indigo-600',
    popularTech: ['Solidity', 'Rust', 'TypeScript', 'Node.js', 'PostgreSQL', 'Ethers.js']
  },
  {
    id: 'cleantech-sustain',
    name: 'CleanTech & Sustainability',
    icon: 'Leaf',
    badge: 'Global Impact',
    description: 'Microgrid energy load balancing, carbon footprint lifecycle tracking, smart agricultural hydrology, and EV telemetry.',
    color: '#10b981',
    gradient: 'from-green-500 to-emerald-600',
    popularTech: ['Python', 'TimescaleDB', 'React', 'MQTT', 'FastAPI', 'GIS']
  },
  {
    id: 'edtech-accessibility',
    name: 'EdTech & Neurodiversity',
    icon: 'GraduationCap',
    badge: 'Social Impact',
    description: 'Adaptive dynamic curricula, multimodal accessibility tools for neurodivergent learners, and real-time sign language neural translation.',
    color: '#06b6d4',
    gradient: 'from-cyan-500 to-blue-600',
    popularTech: ['React', 'WebRTC', 'MediaPipe', 'FastAPI', 'Python', 'Tailwind']
  }
];

export const PROGRAMMING_LANGUAGES = [
  { id: 'Python', name: 'Python', icon: '🐍', tag: 'Python 3.12', desc: 'AI, ML, Data Science & Fast Async APIs' },
  { id: 'Java', name: 'Java', icon: '☕', tag: 'Java 21 / Spring Boot 3', desc: 'Enterprise, Virtual Threads & High-Throughput Microservices' },
  { id: 'Rust', name: 'Rust', icon: '⚡', tag: 'Rust 1.80+ (Tokio/Axum)', desc: 'Zero-Cost Abstractions, Memory Safety & Systems Programming' },
  { id: 'Go', name: 'Go', icon: '🐹', tag: 'Go 1.22 (Goroutines)', desc: 'High-Concurrency Distributed Cloud & Networking' },
  { id: 'C++', name: 'C++', icon: '⚙️', tag: 'C++20 / SIMD / DSP', desc: 'Hardware, Embedded Robotics, Real-Time Audio/Video & HFT' },
  { id: 'TypeScript', name: 'TypeScript', icon: '🔷', tag: 'TypeScript 5.x', desc: 'End-to-End Type Safety, Full-Stack & Modern Web' },
  { id: 'JavaScript', name: 'JavaScript', icon: '🟨', tag: 'JavaScript / Node / Bun', desc: 'Event-Driven Async Services & Universal Apps' },
  { id: 'Solidity', name: 'Solidity', icon: '💎', tag: 'Solidity 0.8+ (EVM)', desc: 'Smart Contracts, DeFi, Zero-Knowledge & Web3 Rollups' },
  { id: 'C#', name: 'C# / .NET', icon: '🟣', tag: 'C# 12 / .NET 8', desc: 'High-Performance Enterprise Microservices & Game Engines' },
  { id: 'Kotlin', name: 'Kotlin', icon: '🎯', tag: 'Kotlin (Coroutines)', desc: 'Modern JVM, Android & Multiplatform Microservices' },
  { id: 'Swift', name: 'Swift', icon: '🐦', tag: 'Swift 5.10 (Vapor)', desc: 'Apple Ecosystem, Actor Concurrency & Systems Dev' },
  { id: 'PHP', name: 'PHP', icon: '🐘', tag: 'PHP 8.3 / Swoole', desc: 'Modern Async Web, Laravel & Octane Microservices' }
];

export const LANGUAGE_FRAMEWORKS = {
  Python: ['FastAPI', 'PyTorch', 'TensorFlow', 'PostgreSQL', 'Docker', 'Qdrant / Pinecone', 'OpenCV'],
  Java: ['Spring Boot', 'Kafka', 'PostgreSQL', 'Docker', 'Kubernetes'],
  Rust: ['Docker', 'Kafka', 'PostgreSQL', 'Kubernetes'],
  Go: ['Docker', 'Kubernetes', 'Kafka', 'PostgreSQL'],
  'C++': ['OpenCV', 'Docker', 'PostgreSQL'],
  TypeScript: ['React', 'Next.js', 'PostgreSQL', 'MongoDB', 'TailwindCSS', 'Docker'],
  JavaScript: ['React', 'Next.js', 'MongoDB', 'PostgreSQL', 'Docker', 'TailwindCSS'],
  Solidity: ['React', 'Next.js', 'PostgreSQL', 'Docker'],
  'C#': ['Docker', 'Kubernetes', 'PostgreSQL', 'Kafka'],
  Kotlin: ['Spring Boot', 'Kafka', 'PostgreSQL', 'Docker'],
  Swift: ['Docker', 'PostgreSQL'],
  PHP: ['PostgreSQL', 'Docker', 'TailwindCSS']
};

export const FRAMEWORK_PRESETS = [
  'React', 'Next.js', 'FastAPI', 'Spring Boot', 'PyTorch', 
  'TensorFlow', 'Docker', 'Kubernetes', 'Kafka', 'PostgreSQL', 
  'MongoDB', 'Qdrant / Pinecone', 'OpenCV', 'TailwindCSS'
];

export const SKILL_PRESETS = [
  'Python', 'Java', 'Rust', 'Go', 'C++', 'TypeScript', 'JavaScript', 'Solidity', 
  'C#', 'Kotlin', 'Swift', 'PHP', 'React', 'Next.js', 'FastAPI', 'Spring Boot', 
  'PyTorch', 'TensorFlow', 'Docker', 'Kubernetes', 'Kafka', 'PostgreSQL', 
  'MongoDB', 'Qdrant / Pinecone', 'OpenCV', 'TailwindCSS'
];

export const AMBITION_TARGETS = [
  {
    id: 'hackathon',
    label: 'Hackathon Grand Prize',
    icon: 'Trophy',
    desc: 'Cutting-edge wow factor, live working demo, unique visual appeal, and disruptive product angle.'
  },
  {
    id: 'research',
    label: 'IEEE / Springer Paper',
    icon: 'BookOpen',
    desc: 'Rigorous algorithmic depth, novel benchmark comparisons, mathematical foundation, and literature review readiness.'
  },
  {
    id: 'saas',
    label: 'Real SaaS / Startup MVP',
    icon: 'Rocket',
    desc: 'Production-ready architecture, clear monetization/utility, user auth, scalability, and robust security.'
  },
  {
    id: 'academic',
    label: 'University Grade A+ (Viva Proof)',
    icon: 'Award',
    desc: 'Rock-solid defense preparation, complete IEEE synopsis, foolproof architecture diagrams, and high examiner praise.'
  }
];

export const TIMEFRAMES = [
  { id: '1-month', label: '1 Month (Rapid Sprint / Hackathon)' },
  { id: '3-months', label: '3 Months (Standard Semester Project)' },
  { id: '6-months', label: '6 Months (Full Final-Year Capstone)' }
];

export const TEAM_SIZES = [
  { id: 'solo', label: 'Solo (1 Developer)' },
  { id: 'duo', label: 'Duo (2 Developers)' },
  { id: 'team', label: 'Team (3–4 Developers)' }
];
