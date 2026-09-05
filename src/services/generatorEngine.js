// ============================================================
//  NOVACAPSTONE – Skill-Aware Procedural Generator Engine
//  Every part of the blueprint adapts to the selected skills
// ============================================================

// ------------------------------------------------------------------
// 1. SKILL → TECH DNA LOOKUP
//    Each skill maps to its canonical ecosystem choices
// ------------------------------------------------------------------
const SKILL_DNA = {
  Python: {
    backendFramework:  'FastAPI (async ASGI)',
    testingLib:        'pytest + hypothesis',
    packageManager:    'uv / Poetry',
    webServer:         'Uvicorn + Gunicorn',
    taskQueue:         'Celery + Redis',
    containerBase:     'python:3.12-slim',
    vivaComplexity:    'GIL implications under CPU-bound workloads',
    archNode:          'Python Async Worker Pool',
    alternativeOf:     'Node.js / Java Spring Boot',
    rationaleSuffix:   'Rich scientific and ML ecosystem (numpy, pandas, torch) with async ASGI for streaming endpoints.'
  },
  React: {
    backendFramework:  'Vite + React 18 (SPA)',
    testingLib:        'Vitest + Playwright',
    packageManager:    'pnpm',
    webServer:         'Nginx (static) + API proxy',
    taskQueue:         'React Query / SWR for server state',
    containerBase:     'node:20-alpine',
    vivaComplexity:    'Virtual DOM reconciliation and fiber scheduler time complexity',
    archNode:          'React 18 SPA + WebSockets',
    alternativeOf:     'Vue.js / Angular',
    rationaleSuffix:   'Concurrent rendering, Suspense boundaries, and real-time WebSocket hooks for live dashboards.'
  },
  TypeScript: {
    backendFramework:  'TypeScript 5.4 + NestJS / Fastify',
    testingLib:        'Vitest + Supertest',
    packageManager:    'pnpm',
    webServer:         'Node.js 20 / Fastify (TypeScript)',
    taskQueue:         'BullMQ (Redis-backed)',
    containerBase:     'node:20-slim',
    vivaComplexity:    'TypeScript structural typing vs nominal typing, conditional mapped types, and zero-runtime type erasure',
    archNode:          'TypeScript 5.4 API Gateway',
    alternativeOf:     'Plain JavaScript (untyped runtime errors)',
    rationaleSuffix:   'End-to-end compile-time contract safety between client and server eliminates an entire class of runtime payload bugs.'
  },
  'Node.js': {
    backendFramework:  'Fastify v4 (Node.js)',
    testingLib:        'Jest + Supertest',
    packageManager:    'pnpm',
    webServer:         'Node HTTP / Nginx reverse-proxy',
    taskQueue:         'BullMQ',
    containerBase:     'node:20-alpine',
    vivaComplexity:    'Event loop saturation and libuv thread pool exhaustion under CPU-intensive tasks',
    archNode:          'Fastify Node.js API',
    alternativeOf:     'Python FastAPI',
    rationaleSuffix:   'Single event loop handles thousands of concurrent I/O operations without thread overhead.'
  },
  Go: {
    backendFramework:  'Go (net/http) + Chi Router',
    testingLib:        'Go testing + testify',
    packageManager:    'Go modules (go.mod)',
    webServer:         'Go standard library HTTP server',
    taskQueue:         'Asynq (Redis) / Go routines + channels',
    containerBase:     'golang:1.22-alpine → scratch',
    vivaComplexity:    'Goroutine scheduler (GOMAXPROCS) and channel blocking characteristics',
    archNode:          'Go Concurrent Service',
    alternativeOf:     'Python FastAPI / Java Spring Boot',
    rationaleSuffix:   'Compiled binary with true OS-thread parallelism; no GIL, no JVM warm-up. Binaries <10MB.'
  },
  Rust: {
    backendFramework:  'Axum (Tokio async Rust)',
    testingLib:        'cargo test + criterion benchmarks',
    packageManager:    'Cargo (crates.io)',
    webServer:         'Hyper / Axum',
    taskQueue:         'Tokio channels + RabbitMQ AMQP',
    containerBase:     'rust:1.78-slim → scratch',
    vivaComplexity:    'Ownership model, borrow checker, and zero-cost abstraction guarantees at compile time',
    archNode:          'Rust Axum Microservice',
    alternativeOf:     'C++ / Go',
    rationaleSuffix:   'Memory-safe systems code with zero GC pauses. Compile-time elimination of data races and use-after-free bugs.'
  },
  PyTorch: {
    backendFramework:  'PyTorch 2.x (torch.compile) + CUDA',
    testingLib:        'pytest + torchmetrics',
    packageManager:    'uv / conda',
    webServer:         'Triton Inference Server / BentoML',
    taskQueue:         'Ray Distributed / Celery GPU workers',
    containerBase:     'pytorch/pytorch:2.2-cuda12',
    vivaComplexity:    'Autograd computation graph, backward pass memory footprint, and mixed-precision (AMP) implications',
    archNode:          'PyTorch Model Inference Engine',
    alternativeOf:     'TensorFlow / JAX',
    rationaleSuffix:   'Dynamic computation graphs enable rapid research iteration; torch.compile JIT for production-grade throughput.'
  },
  TensorFlow: {
    backendFramework:  'TensorFlow 2.x + Keras + TFServing',
    testingLib:        'pytest + tf.test',
    packageManager:    'pip / conda',
    webServer:         'TensorFlow Serving (gRPC)',
    taskQueue:         'Apache Beam / Kubeflow Pipelines',
    containerBase:     'tensorflow/tensorflow:2.16-gpu',
    vivaComplexity:    'TensorFlow graph execution vs eager mode and XLA compilation trade-offs',
    archNode:          'TF Serving Model Server',
    alternativeOf:     'PyTorch',
    rationaleSuffix:   'Production-grade model serialization (SavedModel), mobile export (TFLite), and TPU-native training.'
  },
  FastAPI: {
    backendFramework:  'FastAPI + Pydantic v2 + Uvicorn',
    testingLib:        'pytest + httpx',
    packageManager:    'uv',
    webServer:         'Uvicorn (ASGI) / Gunicorn multi-process',
    taskQueue:         'FastAPI Background Tasks + Celery',
    containerBase:     'python:3.12-slim',
    vivaComplexity:    'Pydantic v2 Rust-core validation speed vs marshmallow and impact on p99 latency',
    archNode:          'FastAPI ASGI Gateway',
    alternativeOf:     'Flask / Django REST Framework',
    rationaleSuffix:   'Auto-generated OpenAPI docs, async streaming endpoints, and sub-millisecond Pydantic v2 validation.'
  },
  Docker: {
    backendFramework:  'Docker Compose v3 + multi-stage builds',
    testingLib:        'Testcontainers + Docker Scout',
    packageManager:    'Docker Hub / GHCR',
    webServer:         'Nginx Alpine reverse proxy',
    taskQueue:         'Docker Swarm / Compose services',
    containerBase:     'alpine:3.19 (multi-stage)',
    vivaComplexity:    'Union filesystem layers and copy-on-write semantics under concurrent container reads',
    archNode:          'Docker Containerized Stack',
    alternativeOf:     'Manual VM deployment / Podman',
    rationaleSuffix:   'Reproducible hermetic builds across all environments; image layers cached for 70% faster CI builds.'
  },
  Kubernetes: {
    backendFramework:  'Kubernetes (k8s) + Helm Charts',
    testingLib:        'k6 load tests + Chaos Monkey',
    packageManager:    'Helm / Kustomize',
    webServer:         'Ingress-NGINX + cert-manager',
    taskQueue:         'KEDA (event-driven autoscaling)',
    containerBase:     'distroless/base-nossl',
    vivaComplexity:    'kube-scheduler bin-packing algorithm and pod preemption priority under resource pressure',
    archNode:          'K8s Cluster Orchestrator',
    alternativeOf:     'Docker Swarm / Nomad',
    rationaleSuffix:   'Automated rolling deployments, self-healing pod restarts, and horizontal pod autoscaling under load spikes.'
  },
  Kafka: {
    backendFramework:  'Apache Kafka (KRaft mode) + Kafka Streams',
    testingLib:        'Testcontainers + KafkaJS tests',
    packageManager:    'Confluent Hub',
    webServer:         'Kafka Connect REST API',
    taskQueue:         'Kafka Consumer Groups (native)',
    containerBase:     'confluentinc/cp-kafka:7.6',
    vivaComplexity:    'Log compaction, partition rebalancing, and exactly-once semantics (EOS) guarantees under node failures',
    archNode:          'Kafka Event Bus',
    alternativeOf:     'RabbitMQ / Redis Pub-Sub',
    rationaleSuffix:   'Persistent, replayable, ordered event log with 1M+ messages/sec throughput and at-least-once delivery guarantees.'
  },
  PostgreSQL: {
    backendFramework:  'PostgreSQL 16 + pgvector extension',
    testingLib:        'pgTAP + EXPLAIN ANALYZE audits',
    packageManager:    'Alembic (migrations) / Flyway',
    webServer:         'PgBouncer connection pooler',
    taskQueue:         'pg_cron scheduled jobs',
    containerBase:     'postgres:16-alpine',
    vivaComplexity:    'MVCC isolation levels, vacuum autoclean impact on IOPS, and index bloat under high-write workloads',
    archNode:          'PostgreSQL + pgvector Store',
    alternativeOf:     'MySQL / MongoDB',
    rationaleSuffix:   'ACID transactions, JSONB semi-structured storage, and pgvector for native embedding similarity search in a single DB.'
  },
  MongoDB: {
    backendFramework:  'MongoDB 7 (Atlas) + Mongoose',
    testingLib:        'Jest + mongodb-memory-server',
    packageManager:    'npm / pip motor',
    webServer:         'MongoDB Atlas Data API',
    taskQueue:         'MongoDB Change Streams',
    containerBase:     'mongo:7-jammy',
    vivaComplexity:    'WiredTiger storage engine MVCC concurrency and document-level locking vs row-level locking in RDBMS',
    archNode:          'MongoDB Document Store',
    alternativeOf:     'PostgreSQL / CouchDB',
    rationaleSuffix:   'Schemaless document model supports evolving data shapes; Change Streams enable reactive real-time pipelines.'
  },
  'Qdrant / Pinecone': {
    backendFramework:  'Qdrant (self-hosted) / Pinecone (SaaS)',
    testingLib:        'pytest + qdrant-client tests',
    packageManager:    'pip qdrant-client',
    webServer:         'Qdrant REST + gRPC APIs',
    taskQueue:         'Async embedding workers',
    containerBase:     'qdrant/qdrant:v1.9',
    vivaComplexity:    'HNSW graph construction complexity O(N log N) vs flat index O(N) and recall/speed trade-off at query time',
    archNode:          'Qdrant Vector Index',
    alternativeOf:     'FAISS (in-memory) / Weaviate',
    rationaleSuffix:   'Persistent HNSW vector index with payload filtering; sub-10ms semantic search over millions of embeddings.'
  },
  'C++': {
    backendFramework:  'C++20 (Clang / GCC) + CMake',
    testingLib:        'Google Test (gtest) + Catch2',
    packageManager:    'vcpkg / Conan',
    webServer:         'Crow / Drogon async HTTP',
    taskQueue:         'Boost.Asio thread pool',
    containerBase:     'ubuntu:22.04-minimal',
    vivaComplexity:    'Cache-line alignment, false sharing in NUMA multi-socket architectures, and RAII resource ownership semantics',
    archNode:          'C++20 High-Performance Core',
    alternativeOf:     'Rust / C',
    rationaleSuffix:   'Zero-overhead abstractions, deterministic RAII memory management, and SIMD intrinsics for compute-intensive kernels.'
  },
  Java: {
    backendFramework:  'Spring Boot 3.3 + Virtual Threads (Java 21)',
    testingLib:        'JUnit 5 + Mockito + Testcontainers',
    packageManager:    'Maven / Gradle',
    webServer:         'Embedded Tomcat (Virtual Threads) / Netty',
    taskQueue:         'Spring TaskExecutor / Kafka Consumer Groups',
    containerBase:     'eclipse-temurin:21-jre-alpine',
    vivaComplexity:    'JVM Garbage Collector (ZGC / G1) pause times and Virtual Threads pinned carrier thread implications under synchronized blocks',
    archNode:          'Java 21 Spring Boot Microservice',
    alternativeOf:     'Node.js / Python Flask',
    rationaleSuffix:   'Enterprise resilience, GraalVM native AOT compilation for 20ms cold starts, and Java 21 Virtual Threads sustaining 100,000+ concurrent connections.'
  },
  'Spring Boot': {
    backendFramework:  'Spring Boot 3.3 + Spring Cloud',
    testingLib:        'JUnit 5 + Mockito + Testcontainers',
    packageManager:    'Maven / Gradle',
    webServer:         'Embedded Tomcat (Virtual Threads)',
    taskQueue:         'Spring Cloud Stream + Kafka',
    containerBase:     'eclipse-temurin:21-jre-alpine',
    vivaComplexity:    'Spring IoC container lifecycle, AOP proxy overhead, and Virtual Thread execution model',
    archNode:          'Spring Boot 3 Core Service',
    alternativeOf:     'NestJS / Django',
    rationaleSuffix:   'Production battle-tested dependency injection, Spring Security, and enterprise cloud native microservices.'
  },
  'C#': {
    backendFramework:  'ASP.NET Core 8 Minimal APIs',
    testingLib:        'xUnit + Moq + FluentAssertions',
    packageManager:    'NuGet / dotnet CLI',
    webServer:         'Kestrel (HTTP/3 native)',
    taskQueue:         'MassTransit + RabbitMQ / Channels',
    containerBase:     'mcr.microsoft.com/dotnet/aspnet:8.0-alpine',
    vivaComplexity:    'Memory<T> / Span<T> zero-allocation memory slicing and ValueTask vs Task allocations under sustained high IOPS',
    archNode:          'ASP.NET Core 8 Microservice',
    alternativeOf:     'Java Spring Boot / Go',
    rationaleSuffix:   'Extreme throughput with Kestrel, zero-allocation memory pipelines with Span<T>, and modern C# 12 pattern matching.'
  },
  Kotlin: {
    backendFramework:  'Ktor 2.3 / Spring Boot 3 Kotlin',
    testingLib:        'Kotest + MockK',
    packageManager:    'Gradle (Kotlin DSL)',
    webServer:         'Netty / Ktor Engine',
    taskQueue:         'Kotlin Coroutine Channels / Flow',
    containerBase:     'eclipse-temurin:21-jre-alpine',
    vivaComplexity:    'Structured concurrency, CoroutineScope cancellation propagation, and Dispatchers.IO context-switching overhead',
    archNode:          'Kotlin Coroutine Worker Node',
    alternativeOf:     'Java / Go',
    rationaleSuffix:   'Concise null-safe syntax, native coroutines for reactive non-blocking execution, and seamless Java interop.'
  },
  Swift: {
    backendFramework:  'Vapor 4 (Swift 5.10) + SwiftNIO',
    testingLib:        'Swift Testing + XCTest',
    packageManager:    'Swift Package Manager (SPM)',
    webServer:         'SwiftNIO EventLoop',
    taskQueue:         'Swift AsyncChannel / TaskGroup',
    containerBase:     'swift:5.10-slim',
    vivaComplexity:    'Actor reentrancy, structured concurrency Sendable conformance, and automatic reference counting (ARC) cycles',
    archNode:          'Swift Vapor Async Service',
    alternativeOf:     'Go / Rust',
    rationaleSuffix:   'Compile-time data race elimination, high-performance SwiftNIO event loops, and type-safe async/await actors.'
  },
  PHP: {
    backendFramework:  'Laravel 11 + Swoole / Octane',
    testingLib:        'Pest PHP + PHPUnit',
    packageManager:    'Composer',
    webServer:         'Swoole / FrankenPHP / Nginx',
    taskQueue:         'Laravel Horizon + Redis',
    containerBase:     'php:8.3-cli-alpine',
    vivaComplexity:    'Swoole coroutine memory persistence, OPcache JIT compilation optimizations, and long-running worker memory leaks',
    archNode:          'PHP 8.3 Swoole Async Worker',
    alternativeOf:     'Node.js / Python',
    rationaleSuffix:   'Modern typed PHP with Swoole coroutines executing 50,000+ requests/sec without traditional CGI process spin-up.'
  },
  JavaScript: {
    backendFramework:  'Node.js 20 / Bun + Express / Hono',
    testingLib:        'Vitest + Supertest',
    packageManager:    'pnpm / npm',
    webServer:         'Bun / Node HTTP',
    taskQueue:         'BullMQ + Redis',
    containerBase:     'node:20-alpine',
    vivaComplexity:    'V8 event loop microtask vs macrotask execution order and garbage collection heap fragmentation',
    archNode:          'Node.js / Bun API Service',
    alternativeOf:     'Python / Go',
    rationaleSuffix:   'Non-blocking asynchronous I/O with universal JavaScript sharing across frontend and backend.'
  },
  OpenCV: {
    backendFramework:  'OpenCV 4.x + MediaPipe',
    testingLib:        'pytest + imgcompare',
    packageManager:    'pip / conda',
    webServer:         'FastAPI + WebRTC video relay',
    taskQueue:         'GStreamer pipeline',
    containerBase:     'python:3.12-slim + libopencv',
    vivaComplexity:    'Blob detection O(N) vs template matching O(W×H×T) and SIFT descriptor extraction complexity',
    archNode:          'OpenCV Vision Pipeline',
    alternativeOf:     'PIL / Scikit-image',
    rationaleSuffix:   'Optimized SIMD-accelerated image matrix operations with GPU acceleration via CUDA-OpenCV backend.'
  },
  Solidity: {
    backendFramework:  'Solidity 0.8 + Hardhat + ethers.js',
    testingLib:        'Hardhat tests + Slither static analysis',
    packageManager:    'npm + hardhat',
    webServer:         'Infura / Alchemy JSON-RPC node',
    taskQueue:         'Chainlink Automation (Keepers)',
    containerBase:     'node:20-alpine + hardhat',
    vivaComplexity:    'EVM gas cost model, storage slot packing, and reentrancy vulnerability patterns in smart contracts',
    archNode:          'Solidity Smart Contract',
    alternativeOf:     'Vyper / Rust (Anchor)',
    rationaleSuffix:   'The dominant EVM language with the largest audited library ecosystem (OpenZeppelin) and toolchain support.'
  },
  'Next.js': {
    backendFramework:  'Next.js 14 (App Router + RSC)',
    testingLib:        'Playwright E2E + Jest unit',
    packageManager:    'pnpm',
    webServer:         'Vercel Edge Runtime / Node.js standalone',
    taskQueue:         'Next.js Route Handlers + BullMQ',
    containerBase:     'node:20-alpine',
    vivaComplexity:    'React Server Components streaming and selective hydration vs full-page hydration cost',
    archNode:          'Next.js Full-Stack App',
    alternativeOf:     'Nuxt.js / SvelteKit',
    rationaleSuffix:   'Partial prerendering, streaming SSR, and App Router collocate frontend + backend in a single deployable unit.'
  },
  TailwindCSS: {
    backendFramework:  'TailwindCSS v3 + shadcn/ui',
    testingLib:        'Storybook + Chromatic visual regression',
    packageManager:    'pnpm',
    webServer:         'Vite / Next.js bundler',
    taskQueue:         'CSS-only; N/A for backend queues',
    containerBase:     'node:20-alpine',
    vivaComplexity:    'JIT compilation tree-shaking algorithm and critical CSS extraction for LCP optimization',
    archNode:          'Tailwind CSS Design System',
    alternativeOf:     'Bootstrap / Material UI',
    rationaleSuffix:   'Utility-first atomic CSS with zero dead code in production builds, enabling consistent design tokens across all components.'
  }
};

// ------------------------------------------------------------------
// 2. SKILL → DOMAIN BEST-FIT SCORING
// ------------------------------------------------------------------
const _DOMAIN_SKILL_WEIGHTS = {
  'ai-genai':           { Python: 10, PyTorch: 10, TensorFlow: 8, FastAPI: 7, 'Qdrant / Pinecone': 9, Docker: 5 },
  'cybersec-zerotrust': { Rust: 10, Go: 9, 'C++': 7, Python: 5, Docker: 6, Kubernetes: 6 },
  'medtech-bio':        { Python: 10, TensorFlow: 8, PyTorch: 8, FastAPI: 6, PostgreSQL: 6, OpenCV: 7 },
  'cloud-distributed':  { Go: 10, Rust: 9, Java: 8, 'C#': 8, Kafka: 10, Kubernetes: 10, Docker: 8, PostgreSQL: 6 },
  'iot-robotics':       { 'C++': 10, Python: 8, OpenCV: 7, TensorFlow: 5, PyTorch: 5, Docker: 4 },
  'fintech-web3':       { Solidity: 10, Rust: 9, Java: 8, Go: 8, 'C#': 8, PostgreSQL: 7, Docker: 6 },
  'cleantech-sustain':  { Python: 9, Go: 8, Java: 7, Kafka: 7, PostgreSQL: 8, FastAPI: 7, Docker: 6 },
  'edtech-accessibility': { TypeScript: 10, JavaScript: 9, Python: 8, React: 9, 'Next.js': 9, FastAPI: 6, PostgreSQL: 5 }
};

// ------------------------------------------------------------------
// 3. DOMAIN-SPECIFIC SYNTHESIS PATTERNS (skill-aware placeholders)
// ------------------------------------------------------------------
const SYNTHESIS_PATTERNS = {
  'ai-genai': [
    {
      prefix: 'Synapse',
      core: 'Multi-Agent Autonomous Protocol',
      focuses: ['Self-Verifying Code Synthesis', 'Hierarchical Speculative Decoding', 'Multimodal Fact-Checking with Symbolic Knowledge Graph', 'Edge-Quantized Latency Optimization'],
      cliches: ['Standard ChatGPT prompt wrapper or chatbot clone', 'Basic PDF Q&A using generic LangChain template'],
      noveltyPivots: ['Consensus-based multi-agent debate with formal logic verification and localized vector memory graph', 'Speculative execution across fine-tuned SLMs and cloud LLMs to slash API costs by 80%']
    },
    {
      prefix: 'Cogni',
      core: 'Continual Learning & Concept Drift Sentinel',
      focuses: ['Elastic Weight Consolidation', 'Dynamic LoRA Adapter Routing', 'Autonomous Anomaly Detection in High-Dimensional Streams'],
      cliches: ['Static ML model trained once on offline CSV dataset', 'Basic linear regression accuracy dashboard'],
      noveltyPivots: ['Continuously updates neural weights on live data streams without catastrophic forgetting using episodic replay buffers', 'Applies dynamic low-rank adaptation on edge hardware to adapt to shifting user behavioral patterns in real time']
    }
  ],
  'cybersec-zerotrust': [
    {
      prefix: 'Vanguard',
      core: 'Autonomous Zero-Trust Micro-Segmentation',
      focuses: ['eBPF Packet Telemetry', 'Post-Quantum Kyber Key Exchange', 'Identity-Aware Dynamic Firewalling', 'Supply-Chain Attestation Ledger'],
      cliches: ['Basic firewall using IP tables or Nmap port scanner', 'MD5 antivirus file scanner'],
      noveltyPivots: ['Continuous cryptographic verification at the socket layer with sub-millisecond post-quantum session re-keying', 'Kernel-level eBPF probes that map application network topologies and terminate unverified RPC calls in 300μs']
    },
    {
      prefix: 'Cipher',
      core: 'Zero-Knowledge Proof Authentication Engine',
      focuses: ['ZK-SNARK Login Without Password Exposure', 'Homomorphic Encrypted Search Index', 'Automated Exploit Triage Pipeline'],
      cliches: ['Basic JWT authentication with email/password', 'Simple bcrypt hashed password storage'],
      noveltyPivots: ['Proves user identity to the server without transmitting any secret using ZK-SNARK witness generation', 'Searches encrypted data server-side without ever decrypting the index using fully homomorphic encryption']
    }
  ],
  'medtech-bio': [
    {
      prefix: 'Aura',
      core: 'Federated Clinical Diagnostic Hub',
      focuses: ['Privacy-Preserving CT/MRI Segmentation', 'Differential Privacy for Genomic Data', 'Synthetic Biomarker Imputation'],
      cliches: ['Simple CNN on Kaggle chest X-ray images with 80% accuracy', 'Basic hospital appointment booking portal'],
      noveltyPivots: ['Federated multi-institutional model training where hospital servers exchange encrypted model gradients with differential privacy ε < 0.8', 'Self-attention vision transformer that highlights anatomical uncertainty regions to assist radiologists']
    },
    {
      prefix: 'Vitalis',
      core: 'Non-Invasive Biomarker Continuous Tracker',
      focuses: ['Photoplethysmography Heart Rate Variability', 'Gait Pattern Parkinson\'s Pre-screening', 'Wearable Glucose Estimation'],
      cliches: ['Basic step counter mobile app using accelerometer', 'Simple heart rate monitor dashboard'],
      noveltyPivots: ['Uses rPPG (remote photoplethysmography) from standard webcam to measure heart rate without contact sensors', 'Gait analysis via smartphone IMU with an LSTM detecting Parkinson\'s motor biomarkers pre-symptom']
    }
  ],
  'cloud-distributed': [
    {
      prefix: 'Nexus',
      core: 'Fault-Tolerant Edge Consensus Engine',
      focuses: ['Raft Consensus on Micro-Controllers', 'Conflict-Free Replicated Data Types (CRDTs)', 'WASM-Based Serverless Orchestration'],
      cliches: ['Basic Docker Compose file with standard Nginx reverse proxy', 'Generic Redis cache demo'],
      noveltyPivots: ['Implements decentralized Byzantine-fault-tolerant state synchronization across edge mesh nodes with zero central coordinator', 'State-machine replication utilizing state-based CRDTs for collaborative real-time sync under network partitions']
    },
    {
      prefix: 'Hydra',
      core: 'Self-Healing Observability Mesh',
      focuses: ['eBPF-Based Zero-Instrumentation Tracing', 'Anomaly-Driven Auto-Scaling', 'Chaos Engineering Automation'],
      cliches: ['Basic Prometheus + Grafana dashboard with default metrics', 'Simple log file tailing script'],
      noveltyPivots: ['eBPF probes automatically instrument every system call and network packet without modifying application code', 'Feedback-controlled HPA that uses ML anomaly scores as the scaling signal instead of CPU%']
    }
  ],
  'iot-robotics': [
    {
      prefix: 'Cortex',
      core: 'TinyML Autonomous Sensor Fusion Engine',
      focuses: ['On-Device Gesture Neural Inference', 'ROS2 SLAM Autonomous Navigation', 'Edge Vision Defect Inspection'],
      cliches: ['Basic temperature sensor reading to cloud dashboard', 'Simple LED blinking Arduino project'],
      noveltyPivots: ['Runs quantized INT8 neural network directly on ESP32 microcontroller with 98% gesture accuracy at 200μW power', 'Multi-robot swarm coordination using ROS2 DDS middleware with decentralized consensus on SLAM maps']
    }
  ],
  'fintech-web3': [
    {
      prefix: 'Aegis',
      core: 'Real-Time Fraud Graph Neural Network',
      focuses: ['Transaction Graph Anomaly Detection', 'Zero-Knowledge Compliance Audit', 'Algorithmic High-Frequency Risk Engine'],
      cliches: ['Basic rule-based fraud flag (amount > threshold)', 'Simple crypto price tracker dashboard'],
      noveltyPivots: ['Graph Neural Network over transaction bipartite graph detects money-laundering rings with 99.7% precision in real-time', 'ZK-SNARK compliance proof verifies regulatory requirements without exposing transaction amounts to the auditor']
    }
  ],
  'cleantech-sustain': [
    {
      prefix: 'Terra',
      core: 'Adaptive Smart Microgrid Optimizer',
      focuses: ['Reinforcement Learning Energy Load Balancing', 'Carbon Footprint Lifecycle Tracking', 'Smart Agricultural Hydrology Sensing'],
      cliches: ['Basic solar panel monitoring dashboard', 'Simple carbon calculator web form'],
      noveltyPivots: ['Deep reinforcement learning agent trained in simulation continuously optimizes grid load shifting to cut energy costs by 34%', 'Digital twin of the campus power grid that simulates failure cascades and recommends preventive load shedding']
    }
  ],
  'edtech-accessibility': [
    {
      prefix: 'Lumina',
      core: 'Adaptive Neural Curriculum Engine',
      focuses: ['Real-Time Sign Language Translation', 'Neurodiversity-Aware Adaptive Learning Path', 'Multimodal Dyslexia Accommodation Engine'],
      cliches: ['Basic quiz app with multiple choice questions', 'Simple YouTube-like video lecture platform'],
      noveltyPivots: ['MediaPipe hand landmark tracking + custom LSTM translates ASL/ISL sign language to text+speech in real-time at 30fps', 'Knowledge graph of student cognitive state continuously adapts lesson difficulty, format, and pace per learner']
    }
  ]
};

// ------------------------------------------------------------------
// 4. SKILL-AWARE TECH STACK BUILDER
//    Builds the correct tech stack cards based on selected skills
// ------------------------------------------------------------------
function buildSkillAwareTechStack(skills, domain, pattern) {
  const stack = [];
  const usedCategories = new Set();

  // Priority 1: User's explicitly selected skills → use their DNA
  for (const skill of skills.slice(0, 5)) {
    const dna = SKILL_DNA[skill];
    if (!dna) continue;

    const category = deriveCategoryForSkill(skill, domain);
    if (usedCategories.has(category)) continue;
    usedCategories.add(category);

    stack.push({
      category,
      tech: dna.backendFramework,
      rationale: dna.rationaleSuffix,
      alternative: dna.alternativeOf,
      testing: dna.testingLib
    });
  }

  // Priority 2: Fill essential gaps from domain pattern tech
  for (const t of (pattern.tech || [])) {
    if (stack.length >= 6) break;
    if (!usedCategories.has(t.category)) {
      usedCategories.add(t.category);
      stack.push(t);
    }
  }

  // Priority 3: Always include containerization + CI if not already there
  if (!usedCategories.has('Containerization & CI')) {
    const hasDocker = skills.includes('Docker');
    const hasK8s = skills.includes('Kubernetes');
    stack.push({
      category: 'Containerization & CI',
      tech: hasK8s ? 'Docker + Kubernetes (Helm) + GitHub Actions' : hasDocker ? 'Docker multi-stage + GitHub Actions + GHCR' : 'Docker Compose + GitHub Actions',
      rationale: hasK8s
        ? 'Zero-downtime rolling deployments with Helm chart versioning and KEDA autoscaling.'
        : 'Reproducible hermetic builds across all environments; image layers cached for 70% faster CI builds.',
      alternative: 'Manual VM deployment / Heroku'
    });
  }

  return stack;
}

function deriveCategoryForSkill(skill, _domain) {
  const cats = {
    Python: 'Backend / ML Engine',
    FastAPI: 'API Gateway',
    Go: 'Backend Service',
    Rust: 'Systems Core',
    'Node.js': 'Backend API',
    TypeScript: 'Backend / Frontend',
    React: 'Frontend UI',
    'Next.js': 'Full-Stack Framework',
    TailwindCSS: 'UI Design System',
    PyTorch: 'AI/ML Framework',
    TensorFlow: 'AI/ML Framework',
    'Qdrant / Pinecone': 'Vector Store',
    Kafka: 'Event Streaming',
    PostgreSQL: 'Relational Database',
    MongoDB: 'Document Database',
    Docker: 'Containerization',
    Kubernetes: 'Orchestration',
    'C++': 'High-Performance Core',
    OpenCV: 'Computer Vision',
    Solidity: 'Smart Contracts'
  };
  return cats[skill] || 'Platform Component';
}

function getLanguageValidatorText(primarySkill, skills) {
  if (primarySkill === 'Python' || skills.includes('FastAPI')) return 'Pydantic v2 schemas and strict Python type annotations';
  if (primarySkill === 'Java' || skills.includes('Spring Boot')) return 'Bean Validation (JSR 380) annotations';
  if (primarySkill === 'Rust') return 'Serde zero-copy deserializers and compile-time type safety';
  if (primarySkill === 'Go') return 'Go struct validation tags and Protobuf binary schemas';
  if (primarySkill === 'C++') return 'C++20 Concepts and strict compile-time binary constraints';
  if (primarySkill === 'TypeScript') return 'Zod schemas and TypeScript type guards';
  if (primarySkill === 'JavaScript') return 'Joi / Ajv JSON Schema validation rules';
  if (primarySkill === 'Solidity') return 'Solidity ABI encodings and require/revert guards';
  if (primarySkill === 'C#') return 'FluentValidation and C# 12 Record contracts';
  if (primarySkill === 'Kotlin') return 'Kotlinx.serialization and Valiktor validation rules';
  if (primarySkill === 'Swift') return 'Swift Codable protocols and Sendable concurrency constraints';
  if (primarySkill === 'PHP') return 'Laravel FormRequests and typed PHP 8.3 attributes';
  return 'strict schema validators';
}

function buildArchitectureLayers(skills, domain, primarySkill, secondarySkill) {
  const pdna = SKILL_DNA[primarySkill] || SKILL_DNA['Python'];
  const _sdna = SKILL_DNA[secondarySkill] || SKILL_DNA['Docker'];

  const hasKafka    = skills.includes('Kafka');
  const hasK8s      = skills.includes('Kubernetes');
  const hasVector   = skills.some(s => s.includes('Qdrant') || s.includes('Pinecone'));
  const hasMongo    = skills.includes('MongoDB');
  const hasPostgres = skills.includes('PostgreSQL');
  const hasSolidity = skills.includes('Solidity');
  const hasOpenCV   = skills.includes('OpenCV');
  const hasPyTorch  = skills.includes('PyTorch') || skills.includes('TensorFlow');

  const ingestionNode = hasKafka
    ? `Kafka Topic (${primarySkill} Producer)`
    : pdna.archNode;

  const storageNode = hasMongo
    ? 'MongoDB Document Store + Change Streams'
    : hasPostgres && hasVector
    ? 'PostgreSQL 16 + pgvector Hybrid Store'
    : hasPostgres
    ? 'PostgreSQL 16 (ACID) + PgBouncer Pool'
    : hasSolidity
    ? 'On-Chain State (EVM) + Off-Chain PostgreSQL'
    : 'Hybrid Relational + Cache Store';

  const frontendNode = skills.includes('Next.js')
    ? 'Next.js 14 RSC (App Router + Server Actions)'
    : skills.includes('React')
    ? 'React 18 SPA (WebSocket + React Query)'
    : skills.includes('TailwindCSS')
    ? 'Responsive Web UI (TailwindCSS + shadcn/ui)'
    : primarySkill === 'Java'
    ? 'JavaFX / Thymeleaf / Microservice Web Client'
    : primarySkill === 'C++'
    ? 'Qt6 / ImGui Hardware HUD'
    : primarySkill === 'Rust'
    ? 'Yew / Leptos WASM Frontend UI'
    : primarySkill === 'Go'
    ? 'Go HTMX + Templ Web UI'
    : primarySkill === 'C#'
    ? 'Blazor WebAssembly / WPF Client'
    : primarySkill === 'Swift'
    ? 'SwiftUI / Native macOS Client'
    : 'Real-Time Observability Dashboard';

  const validatorSnippet = getLanguageValidatorText(primarySkill, skills);

  return {
    layers: [
      {
        name: 'Ingestion & Event Layer',
        tech: hasKafka ? 'Apache Kafka (KRaft) + Schema Registry' : `${primarySkill} Async Event Consumer`,
        desc: hasKafka
          ? 'Partitioned topic-per-event-type with exactly-once semantics and dead-letter queue.'
          : `High-velocity non-blocking ${primarySkill} event consumer with rate limiting, backpressure, and schema validation.`,
        nodes: [ingestionNode, 'Schema Validator / Deserializer', hasKafka ? 'Dead-Letter Topic' : 'Rate-Limited Buffer Queue']
      },
      {
        name: 'Core Processing & Intelligence Engine',
        tech: hasPyTorch
          ? `${primarySkill} + PyTorch/CUDA Inference Pipeline`
          : hasOpenCV
          ? `${primarySkill} + OpenCV Vision Pipeline`
          : `${primarySkill} Service (${pdna.backendFramework})`,
        desc: hasPyTorch
          ? 'Batched GPU inference with mixed-precision (AMP) and CUDA stream parallelism.'
          : `Core ${primarySkill} algorithmic execution and state coordination with async worker pools.`,
        nodes: [
          pdna.archNode,
          hasPyTorch ? 'Model Inference Engine (AMP)' : 'Business Logic Orchestrator',
          hasK8s ? 'K8s HPA Autoscaled Workers' : 'Thread/Worker Pool'
        ]
      },
      {
        name: 'Storage & Persistence Tier',
        tech: storageNode,
        desc: hasSolidity
          ? 'Immutable on-chain ledger for provenance; off-chain relational DB for queryable state.'
          : 'ACID-compliant persistence with optimized indexes, write-ahead logging, and connection pooling.',
        nodes: [
          storageNode.split('+')[0].trim(),
          hasVector ? 'HNSW Vector Index (sub-10ms search)' : 'Indexed Relational Schema',
          hasMongo ? 'Change Stream Real-Time Trigger' : 'WAL Crash Recovery + PgBouncer'
        ]
      },
      {
        name: 'Presentation & Observability Layer',
        tech: `${frontendNode} + Prometheus / Grafana`,
        desc: 'Sub-50ms reactive UI with live telemetry feeds, structured audit logs, and performance metrics.',
        nodes: [
          frontendNode,
          hasK8s ? 'Prometheus + Grafana (K8s ServiceMonitor)' : 'Prometheus Metrics + Grafana Dashboard',
          'Structured Audit Log Exporter (JSON)'
        ]
      }
    ],
    dataFlow: [
      `Client requests arrive via authenticated ${skills.includes('Next.js') ? 'Next.js Server Actions / REST' : skills.includes('Solidity') ? 'ethers.js / JSON-RPC' : 'WebSocket / gRPC'} connections.`,
      `The ingestion layer validates incoming payloads using ${validatorSnippet} and queues work items.`,
      `The ${pdna.archNode} processes requests ${hasPyTorch ? 'through GPU-accelerated inference batches' : 'through concurrent worker pools'} and coordinates state transitions.`,
      `Results are atomically committed to ${storageNode.split('+')[0].trim()} with WAL durability guarantees.`,
      `Live telemetry streams to the ${frontendNode} via ${hasKafka ? 'Kafka-backed WebSockets' : 'WebSocket push'} for real-time observability.`
    ]
  };
}

// ------------------------------------------------------------------
// 6. SKILL-AWARE VIVA QUESTIONS
// ------------------------------------------------------------------
function buildVivaQuestions(skills, domain, primarySkill) {
  const pdna = SKILL_DNA[primarySkill] || SKILL_DNA['Python'];
  const questions = [];

  // Q1: Language / framework specific complexity question
  questions.push({
    question: `Explain the ${pdna.vivaComplexity}. How does this affect your project's performance under sustained load?`,
    examinerFocus: 'Dr. Arthur Rigor (Algorithmic Rigor & Complexity)',
    tips: `Cite specific benchmarks: e.g., measured p99 latency, memory footprint under N concurrent users. Mention you profiled with a real tool.`,
    modelAnswerSnippet: `In ${primarySkill}, ${pdna.vivaComplexity}. We addressed this by [specific mitigation strategy matching the skill]. Under our load tests of 5,000 concurrent requests, p99 latency remained below 8.4ms because we [specific optimization].`
  });

  // Q2: Architecture resilience question (skill-specific)
  const hasKafka = skills.includes('Kafka');
  const hasK8s = skills.includes('Kubernetes');
  questions.push({
    question: hasK8s
      ? `If a Kubernetes node fails mid-transaction, how does your system guarantee no data loss and automatic pod rescheduling?`
      : hasKafka
      ? `If a Kafka broker crashes during message consumption, what guarantees does your consumer group provide to prevent duplicate processing or data loss?`
      : `How does your ${primarySkill} service recover state if the process is killed via SIGKILL without any cleanup hooks?`,
    examinerFocus: 'Prof. Elena Vance (Resilience & System Design)',
    tips: 'Discuss specific failure boundaries, idempotency keys, and your recovery proof.',
    modelAnswerSnippet: hasK8s
      ? 'Our PodDisruptionBudget ensures at least 2 replicas are always available. StatefulSet pods have PersistentVolumeClaims that survive node failures, and liveness probes trigger automatic rescheduling within 30 seconds.'
      : hasKafka
      ? 'We use consumer group offset commits only after successful idempotent processing. Each message has a unique idempotency key stored in Redis, so replayed messages are detected and deduplicated at the handler level.'
      : `We use write-ahead logging to a durable store before any in-memory state mutation. On restart, the WAL replay brings state back to the last consistent checkpoint without requiring user-visible retries.`
  });

  // Q3: Skill-specific novelty question
  const hasPyTorch = skills.includes('PyTorch') || skills.includes('TensorFlow');
  const hasSolidity = skills.includes('Solidity');
  questions.push({
    question: hasPyTorch
      ? `How did you validate that your model generalizes beyond the training set? What is the mathematical proof against overfitting?`
      : hasSolidity
      ? `What specific smart contract vulnerability (reentrancy, integer overflow, front-running) is your design most susceptible to, and how have you mitigated it?`
      : `Name 2 published research papers your architecture is inspired by, and quantify exactly where your implementation improves upon their baseline.`,
    examinerFocus: 'Dr. Kaelen Eureka (Research Novelty & Validation)',
    tips: 'Always have quantitative comparisons ready — exact percentages, standard benchmark datasets, and confidence intervals.',
    modelAnswerSnippet: hasPyTorch
      ? 'We used k-fold cross-validation (k=5) and compared train/validation loss curves to detect overfitting early. We applied weight decay (L2 regularization λ=1e-4) and dropout (p=0.3) which reduced our validation loss gap from 18% to under 4%.'
      : hasSolidity
      ? 'Our primary risk is reentrancy in the withdrawal function. We follow the Checks-Effects-Interactions pattern: state is updated before any external call, and we use a reentrancy guard mutex. Slither static analysis confirmed zero reentrancy warnings.'
      : 'We benchmarked against the standard baseline under identical hardware. Our system achieved 42% lower p99 latency and 35% lower memory overhead, validated over 10,000 synthetic load test runs.'
  });

  return questions;
}

// ------------------------------------------------------------------
// 7. SKILL-AWARE FEATURE MATRIX
// ------------------------------------------------------------------
function buildFeatureMatrix(skills, primarySkill, _domain) {
  const hasReact = skills.includes('React') || skills.includes('Next.js');
  const hasDocker = skills.includes('Docker') || skills.includes('Kubernetes');
  const hasPyTorch = skills.includes('PyTorch') || skills.includes('TensorFlow');
  const hasKafka = skills.includes('Kafka');
  const hasPostgres = skills.includes('PostgreSQL');
  const hasSolidity = skills.includes('Solidity');
  const hasOpenCV = skills.includes('OpenCV');

  return {
    mvp: [
      `Core ${primarySkill} service with structured request/response API and input validation`,
      hasReact
        ? 'Interactive real-time dashboard with live data polling and error boundaries'
        : 'Command-line interface with rich terminal output and progress indicators',
      hasPostgres
        ? 'PostgreSQL schema with Alembic/Flyway migrations and seeded test data'
        : 'Configured persistence layer with automated seeding and integration tests',
      hasDocker
        ? 'Dockerized multi-container stack with health checks and compose networking'
        : 'Automated setup script with environment-validated dependency installer',
      `End-to-end integration test suite covering the core ${primarySkill} pipeline`
    ],
    advanced: [
      hasKafka
        ? 'Kafka consumer group with exactly-once semantics and dead-letter queue monitoring'
        : 'Async task queue with priority scheduling and exponential backoff retry',
      hasPyTorch
        ? 'Model versioning with MLflow tracking, A/B test routing, and shadow deployment'
        : hasOpenCV
        ? 'Real-time video inference pipeline with frame-rate adaptive processing'
        : 'Role-based access control (RBAC) with JWT refresh rotation and audit trail',
      hasSolidity
        ? 'Smart contract upgrade proxy (EIP-1967 UUPS) with multi-sig governance'
        : 'Cryptographic audit logging with HMAC-chained records for tamper detection',
      'Prometheus metrics endpoints + Grafana dashboard with p50/p95/p99 latency panels',
      'Load benchmark suite (k6/wrk) reporting throughput and error rates under peak load'
    ],
    wowFactor: [
      hasReact
        ? 'Live interactive system graph visualizer showing real-time data flow between components with Canvas/WebGL'
        : 'Rich TUI terminal dashboard with live streaming metrics and color-coded anomaly alerts',
      hasPyTorch
        ? 'Live model confidence heatmap overlay streamed to the UI — explainable AI in real time'
        : hasSolidity
        ? 'Live on-chain event feed with decoded event logs and wallet activity graph visualization'
        : hasOpenCV
        ? 'Real-time annotated video feed overlaying detection bounding boxes streamed to browser via WebRTC'
        : 'One-click chaos engineering mode: triggers random service failure and demonstrates self-healing recovery live',
      'IEEE-compliant academic synopsis generator that exports a complete SRS document with one click'
    ]
  };
}

// ------------------------------------------------------------------
// 8. SKILL-AWARE SUMMARY AND PROBLEM STATEMENT
// ------------------------------------------------------------------
function buildSummary(projectTitle, skills, domain, ambition, _pattern) {
  const skillList = skills.slice(0, 4).join(', ');
  const isResearch  = ambition === 'research';
  const isHackathon = ambition === 'hackathon';
  const isSaaS      = ambition === 'saas';

  const target = isResearch  ? 'IEEE/Springer conference paper submission'
               : isHackathon ? 'hackathon grand-prize live demonstration'
               : isSaaS      ? 'production SaaS deployment with paying users'
               :               'university capstone committee defense';

  return `${projectTitle} addresses critical engineering challenges in the ${domain} space by leveraging the power of ${skillList}. The system implements a production-grade multi-tier architecture — from a high-throughput ingestion layer to an intelligent processing engine and an interactive observability dashboard. By deliberately choosing ${skills[0]} for its ${(SKILL_DNA[skills[0]] || {}).rationaleSuffix || 'performance characteristics'}, the architecture achieves verifiable benchmarks, zero-trust security posture, and clear algorithmic novelty designed to stand out in a ${target}.`;
}

// ------------------------------------------------------------------
// 9. MAIN GENERATOR ENTRY POINT
// ------------------------------------------------------------------
export function generateProjectBlueprint(options = {}) {
  const {
    domain       = 'ai-genai',
    skills       = ['Python', 'React'],
    ambition     = 'hackathon',
    noveltyBias  = 85,
    teamSize     = 'Duo / Team (2–3)',
    timeframe    = '3 Months',
    customPrompt = ''
  } = options;

  // Pick synthesis pattern for the domain
  const domainPatterns = SYNTHESIS_PATTERNS[domain] || SYNTHESIS_PATTERNS['ai-genai'];
  const pattern        = domainPatterns[Math.floor(Math.random() * domainPatterns.length)];
  const focus          = pattern.focuses[Math.floor(Math.random() * pattern.focuses.length)];

  // Identify all selected programming languages from skills
  const recognizedLanguages = ['Python', 'Java', 'Rust', 'Go', 'C++', 'TypeScript', 'JavaScript', 'Solidity', 'C#', 'Kotlin', 'Swift', 'PHP'];
  const selectedLanguages = skills.filter(s => recognizedLanguages.includes(s));
  const isPolyglot = selectedLanguages.length > 1;
  const chosenLang = selectedLanguages[0] || skills[0] || 'Python';
  const primarySkill = chosenLang;
  const secondaryLang = isPolyglot ? selectedLanguages[1] : null;

  const nonLangSkills = skills.filter(s => !recognizedLanguages.includes(s));
  const secondarySkill = secondaryLang || nonLangSkills[0] || (
    primarySkill === 'Java' ? 'Spring Boot' :
    primarySkill === 'Python' ? 'FastAPI' :
    primarySkill === 'Go' ? 'Kubernetes' :
    primarySkill === 'Rust' ? 'Docker' :
    primarySkill === 'C++' ? 'OpenCV' :
    primarySkill === 'TypeScript' ? 'React' :
    primarySkill === 'JavaScript' ? 'React' :
    primarySkill === 'Solidity' ? 'PostgreSQL' :
    primarySkill === 'C#' ? 'Docker' :
    primarySkill === 'Kotlin' ? 'Spring Boot' :
    primarySkill === 'Swift' ? 'Docker' :
    'PostgreSQL'
  );

  const fullLanguageLabel = selectedLanguages.length > 0 ? selectedLanguages.join(' + ') : primarySkill;

  // Build language-tailored project title
  const titlePrefix = pattern.prefix;
  const langTitlePivots = {
    Java: `${titlePrefix}Core: Enterprise Distributed ${focus} Engine (Java 21 & Spring Boot)`,
    Rust: `${titlePrefix}Guard: Memory-Safe Zero-Cost ${focus} System (Rust & Tokio)`,
    Go: `${titlePrefix}Mesh: High-Concurrency Distributed ${focus} Fabric (Go 1.22)`,
    'C++': `${titlePrefix}SIMD: Real-Time Hardware-Accelerated ${focus} Core (C++20)`,
    Python: `${titlePrefix}Agent: Autonomous Neural ${focus} Pipeline (Python & PyTorch)`,
    TypeScript: `${titlePrefix}Sync: End-to-End Type-Safe ${focus} Platform (TypeScript & React)`,
    JavaScript: `${titlePrefix}Flow: Event-Driven Real-Time ${focus} Engine (Node.js & Bun)`,
    Solidity: `${titlePrefix}Vault: Verifiable On-Chain ${focus} Protocol (Solidity & ZK-Rollups)`,
    'C#': `${titlePrefix}Stream: Ultra-Low-Latency CQRS ${focus} Pipeline (.NET 8)`,
    Kotlin: `${titlePrefix}Flow: Reactive Coroutine-Native ${focus} Service (Kotlin)`,
    Swift: `${titlePrefix}Actor: Actor-Isolated Concurrent ${focus} Architecture (Swift 5.10)`,
    PHP: `${titlePrefix}Async: High-Throughput Coroutine ${focus} Gateway (PHP 8.3 & Swoole)`
  };

  const projectTitle = customPrompt
    ? `${titlePrefix}: ${capitalizeWords(customPrompt.trim())} via ${pattern.core} [${fullLanguageLabel}]`
    : isPolyglot
    ? `${titlePrefix}Mesh: High-Performance Polyglot ${focus} Fabric (${selectedLanguages.join(' & ')})`
    : langTitlePivots[primarySkill] || `${titlePrefix}: ${focus} using ${pattern.core} (${primarySkill})`;

  const generatedNovelty = Math.min(99, Math.max(88, Math.floor(noveltyBias + Math.random() * 8)));

  // Build all skill-aware subsections
  const techStack   = buildSkillAwareTechStack(skills, domain, pattern);
  const architecture = buildArchitectureLayers(skills, domain, primarySkill, secondarySkill);
  const vivaQuestions = buildVivaQuestions(skills, domain, primarySkill);

  // If polyglot, inject cross-language integration defense question
  if (isPolyglot) {
    vivaQuestions.unshift({
      question: `How does your polyglot architecture handle zero-copy data interchange and boundary safety between ${selectedLanguages[0]} and ${selectedLanguages[1]}?`,
      examinerFocus: 'Dr. Arthur Rigor (Systems Boundary & Memory Safety)',
      tips: `Discuss serialization formats (Protobuf/FlatBuffers), foreign function interface (FFI) bindings, and avoiding GC serialization penalties.`,
      modelAnswerSnippet: `We decouple the ${selectedLanguages[0]} application logic from the ${selectedLanguages[1]} compute core using high-speed shared memory ring buffers and Protobuf schemas. This bypasses JSON parsing overhead, keeping cross-language latency under 65 microseconds with strict memory safety boundaries.`
    });
  }

  const featureMatrix  = buildFeatureMatrix(skills, primarySkill, domain);
  const summary        = buildSummary(projectTitle, skills, domain, ambition, pattern);

  const ambitionLabel = ambition === 'hackathon' ? 'Hackathon Grand Prize'
    : ambition === 'research' ? 'IEEE Research Paper'
    : ambition === 'saas'    ? 'SaaS Product MVP'
    : 'University Grade A+';

  return {
    id:           `synth-${Date.now()}-${Math.floor(Math.random() * 9999)}`,
    title:        projectTitle,
    domain:       domain,
    primaryLanguage: fullLanguageLabel,
    primaryLanguages: selectedLanguages.length > 0 ? selectedLanguages : [primarySkill],
    tagline: isPolyglot
      ? `Polyglot architecture fusing ${selectedLanguages[0]} (${(SKILL_DNA[selectedLanguages[0]] || {}).backendFramework || selectedLanguages[0]}) with ${selectedLanguages[1]} (${(SKILL_DNA[selectedLanguages[1]] || {}).backendFramework || selectedLanguages[1]}) for low-latency ${focus.toLowerCase()}.`
      : `High-performance ${focus.toLowerCase()} system engineered with ${primarySkill} and ${secondarySkill} — tailored for ${primarySkill} ecosystem.`,
    noveltyScore: generatedNovelty,
    targetAmbition: ambition,
    teamSize,
    timeframe,
    clicheVsNovelty: {
      clicheIdea:   pattern.cliches[Math.floor(Math.random() * pattern.cliches.length)],
      noveltyPivot: pattern.noveltyPivots[Math.floor(Math.random() * pattern.noveltyPivots.length)]
    },
    summary,
    problemStatement: isPolyglot
      ? `Single-language monolithic designs in ${domain} face severe trade-offs between developer ergonomics and bare-metal execution speed. ${projectTitle} solves this through a heterogeneous polyglot architecture combining ${selectedLanguages.join(' and ')} to maximize throughput and maintainability.`
      : `Modern implementations in ${domain} remain limited by rigid single-stack architectures and shallow proof-of-concept prototypes. Specifically, developers relying on ${primarySkill} without a rigorous distributed design face severe scalability ceilings, concurrency bottlenecks, and poor academic differentiation. ${projectTitle} leverages the cutting-edge strengths of ${primarySkill} (${(SKILL_DNA[primarySkill] || {}).backendFramework || primarySkill}) to directly solve these engineering bottlenecks.`,
    academicValue: `Demonstrates advanced ${fullLanguageLabel} systems programming with quantified algorithmic complexity, distributed state synchronization proofs, and empirical ablation benchmarks against baseline systems — aligned with ${ambitionLabel} evaluation criteria.`,
    industryRelevance: `Bridges the talent gap in ${domain} engineering. The skill combination of ${skills.slice(0, 3).join(' + ')} used with production-grade tooling mirrors real hiring bar expectations at FAANG and deep-tech companies.`,
    architecture,
    techStack,
    featureMatrix,
    weeklyRoadmap: [
      { week: 'Week 1–2',  focus: `${primarySkill} Architecture Spec & Ingestion Prototype`,  milestone: `Design data schema and wire initial ${(SKILL_DNA[primarySkill] || {}).backendFramework || primarySkill} API endpoints with health checks.` },
      { week: 'Week 3–4',  focus: `${isPolyglot ? `${selectedLanguages[1]} Core & IPC Bridge` : 'Core Algorithm & Processing Pipeline'}`, milestone: `Implement ${isPolyglot ? `the ${selectedLanguages[1]} high-throughput kernel and cross-language bindings` : `the primary ${primarySkill} processing logic`} and measure baseline throughput with profiler.` },
      { week: 'Week 5–6',  focus: `${secondarySkill} Persistence & Storage Tier`,              milestone: `Integrate ${skills.includes('PostgreSQL') ? 'PostgreSQL with Alembic/Flyway migrations' : skills.includes('MongoDB') ? 'MongoDB with indexed schemas' : 'database layer'} and validate ACID guarantees.` },
      { week: 'Week 7–8',  focus: 'Fault Tolerance & Resilience Engineering',                   milestone: `Add ${skills.includes('Kafka') ? 'Kafka dead-letter queues and consumer group rebalancing' : 'self-healing retry with exponential backoff and circuit breaker'}.` },
      { week: 'Week 9–10', focus: `${secondarySkill} Dashboard & Observability`,                milestone: `Build ${skills.includes('React') || skills.includes('Next.js') ? 'React/Next.js real-time dashboard' : `${primarySkill} observability client`} with live Prometheus metrics streaming.` },
      { week: 'Week 11–12', focus: 'Benchmarking, Viva Defense Prep & IEEE Synopsis',          milestone: 'Run k6/wrk load tests, finalize documentation, and complete 3 full mock viva defense sessions.' }
    ],
    vivaQuestions,
    synopsis: {
      title:         projectTitle,
      domain,
      abstract:      `${projectTitle} introduces a modern ${domain} engineering system built with ${skills.slice(0, 3).join(', ')}. By implementing a ${architecture.layers[0].name} backed by ${architecture.layers[1].tech}, the project provides a scalable, secure, and academically novel platform designed for both production deployment and peer-reviewed evaluation.`,
      hardwareSpecs: 'Standard quad-core x86_64 or Apple Silicon, 16 GB RAM, SSD.',
      softwareSpecs: `${skills.slice(0, 4).join(', ')}, Docker, modern UNIX/Linux or WSL2 environment.`
    }
  };
}

function capitalizeWords(str) {
  return str.replace(/\b\w/g, l => l.toUpperCase());
}

// ------------------------------------------------------------------
// 10. GEMINI API LIVE GENERATOR (if API key provided)
// ------------------------------------------------------------------
export async function generateWithGeminiAPI(apiKey, promptData) {
  const recognizedLanguages = ['Python', 'Java', 'Rust', 'Go', 'C++', 'TypeScript', 'JavaScript', 'Solidity', 'C#', 'Kotlin', 'Swift', 'PHP'];
  const chosenLangs = promptData.skills?.filter(s => recognizedLanguages.includes(s)) || [];
  const primaryLang = chosenLangs.length > 0 ? chosenLangs.join(' + ') : (promptData.skills?.[0] || 'Python');

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const prompt = `You are an elite Computer Science Capstone Professor and Hackathon Judge. Generate an award-winning, highly innovative Final-Year Project blueprint.

Domain: ${promptData.domain}
Primary Programming Language(s): ${primaryLang}
Selected Skills & Tools: ${promptData.skills?.join(', ')}
Target Ambition: ${promptData.ambition}
Custom Request: ${promptData.customPrompt || 'Create a unique, cutting-edge project'}
Team Size: ${promptData.teamSize}

CRITICAL RULES:
1. The project must be purely designed using the selected programming languages (${primaryLang}).
2. Do NOT mention or substitute other languages unless explicitly chosen by the student in the Selected Skills.
3. The tech stack MUST strictly feature ${primaryLang} frameworks and libraries.
4. Architecture node names should explicitly reference ${primaryLang} technologies.
5. Viva questions must probe ${primaryLang}'s runtime, memory, and concurrency characteristics.

Respond ONLY with valid JSON matching this structure:
{
  "title": "Project Title",
  "primaryLanguage": "${primaryLang}",
  "tagline": "1-sentence summary referencing ${primaryLang} specifically",
  "noveltyScore": 96,
  "clicheVsNovelty": { "clicheIdea": "...", "noveltyPivot": "..." },
  "summary": "Detailed paragraph mentioning ${primaryLang} and core frameworks",
  "problemStatement": "Academic problem statement focused on ${primaryLang}",
  "academicValue": "Scholarly depth",
  "industryRelevance": "Real-world utility",
  "architecture": {
    "layers": [{ "name": "...", "tech": "...", "desc": "...", "nodes": ["Node 1", "Node 2", "Node 3"] }],
    "dataFlow": ["Step 1 mentioning ${primaryLang}", "Step 2", "Step 3", "Step 4"]
  },
  "techStack": [{ "category": "...", "tech": "Specific version of ${primaryLang} tech", "rationale": "Why this over alternatives", "alternative": "Alternative evaluated and rejected" }],
  "featureMatrix": { "mvp": ["..."], "advanced": ["..."], "wowFactor": ["..."] },
  "weeklyRoadmap": [{ "week": "Week 1-2", "focus": "...", "milestone": "Specific deliverable in ${primaryLang}" }],
  "vivaQuestions": [{ "question": "Question specifically about ${primaryLang}'s concurrency or memory model", "examinerFocus": "Dr. Arthur Rigor", "tips": "...", "modelAnswerSnippet": "..." }]
}`;

  const response = await fetch(url, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: 'application/json' }
    })
  });

  if (!response.ok) throw new Error(`Gemini API returned status ${response.status}`);

  const json   = await response.json();
  const text   = json.candidates?.[0]?.content?.parts?.[0]?.text;
  const parsed = JSON.parse(text);

  return {
    ...parsed,
    id:             `gemini-${Date.now()}`,
    domain:         promptData.domain,
    targetAmbition: promptData.ambition,
    teamSize:       promptData.teamSize || 'Duo (2 Developers)',
    timeframe:      promptData.timeframe || '3 Months',
    synopsis: {
      title:         parsed.title,
      domain:        promptData.domain,
      abstract:      parsed.summary,
      hardwareSpecs: 'Standard multi-core machine with 16 GB RAM.',
      softwareSpecs: `${promptData.skills?.join(', ')}, Docker, modern development toolchain.`
    }
  };
}
