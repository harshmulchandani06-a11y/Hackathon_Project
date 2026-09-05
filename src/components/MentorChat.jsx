import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, Send, Sparkles, Code, Database, ShieldAlert } from 'lucide-react';

export default function MentorChat({ activeProject }) {
  const [isOpen, setIsOpen] = useState(false);
  const initialGreeting = (proj) => [
    {
      role: 'assistant',
      content: `👋 Hello! I am your Autonomous Capstone AI Mentor.\n\nI can help you design database schemas, generate API routes, optimize your architecture, or prepare for tough viva committee questions${proj ? ` for **${proj.title}**` : ''}.\n\nWhat are we tackling today?`
    }
  ];

  const [messages, setMessages] = useState(() => initialGreeting(activeProject));
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const prevProjectIdRef = useRef(activeProject?.id);

  // Update welcome message when active project changes
  useEffect(() => {
    if (prevProjectIdRef.current !== activeProject?.id) {
      prevProjectIdRef.current = activeProject?.id;
      setMessages(initialGreeting(activeProject));
    }
  }, [activeProject]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const generateBotReply = (textToSend) => {
    const lower = textToSend.toLowerCase();

    if (lower.includes('schema') || lower.includes('database') || lower.includes('sql') || lower.includes('prisma')) {
      return `Here is an optimized Prisma schema for ${activeProject?.title?.split(':')[0] || 'your system'}:

\`\`\`prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model ProjectTelemetry {
  id          String   @id @default(uuid())
  timestamp   DateTime @default(now())
  metricType  String
  payload     Json
  latencyMs   Float
  anomalyFlag Boolean  @default(false)
  signature   Bytes?

  @@index([timestamp(sort: Desc)])
  @@index([metricType, anomalyFlag])
}
\`\`\`
💡 **Viva Tip:** The compound index on [metricType, anomalyFlag] guarantees O(log N) filtered scans — cite this to Dr. Rigor.`;
    }

    if (lower.includes('api') || lower.includes('route') || lower.includes('fastapi') || lower.includes('endpoint')) {
      return `Here is an async FastAPI route with validation:

\`\`\`python
from fastapi import FastAPI, status
from pydantic import BaseModel
import time

app = FastAPI(title="${activeProject?.title?.split(':')[0] || 'CapstoneEngine'} API")

class IngestionPayload(BaseModel):
    client_id: str
    telemetry_vector: list[float]
    timestamp: float

@app.post("/v1/ingest", status_code=status.HTTP_202_ACCEPTED)
async def ingest(data: IngestionPayload):
    start = time.perf_counter()
    # Lockless ring-buffer push (implement here)
    latency_ms = (time.perf_counter() - start) * 1000
    return {"status": "buffered", "latency_ms": latency_ms}
\`\`\`
💡 **Viva Tip:** For Prof. Vance — mention that async routes avoid thread pool exhaustion under 10k concurrent requests.`;
    }

    if (lower.includes('viva') || lower.includes('question') || lower.includes('examiner') || lower.includes('defense') || lower.includes('exam')) {
      return `Top 5 critical defense questions examiners will probe you on:

1. 🔴 **Complexity:** *"What is the exact Big-O time and space complexity of your primary processing algorithm?"*
2. 🔴 **Failure Recovery:** *"If your main process is killed (SIGKILL), how does the system guarantee zero data loss?"*
3. 🟡 **Concurrency:** *"What happens when 10 threads simultaneously write to your shared buffer?"*
4. 🟡 **Novelty:** *"Name 3 published papers that are most similar to your work and explain your architectural divergence."*
5. 🟢 **Scale:** *"How does your design handle 1 million users/day vs 1,000/day? What changes?"*

Practice answering each in under 90 seconds with concrete numbers!`;
    }

    if (lower.includes('docker') || lower.includes('deploy') || lower.includes('container')) {
      return `Here is a production-ready Dockerfile for your capstone:

\`\`\`dockerfile
# Multi-stage build for minimal image size
FROM python:3.11-slim AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

FROM python:3.11-slim AS runtime
WORKDIR /app
COPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY . .

EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4"]
\`\`\`
💡 Multi-stage builds reduce image size by ~70%. Mention this to Prof. Vance as a production optimization.`;
    }

    if (lower.includes('redis') || lower.includes('cache') || lower.includes('caching')) {
      return `Caching strategy for low-latency responses:

\`\`\`python
import redis.asyncio as redis
import json, hashlib

cache = redis.from_url("redis://localhost:6379", decode_responses=True)

async def get_cached_or_compute(key_data: dict, compute_fn):
    cache_key = "nova:" + hashlib.md5(json.dumps(key_data, sort_keys=True).encode()).hexdigest()
    cached = await cache.get(cache_key)
    if cached:
        return json.loads(cached)
    result = await compute_fn()
    await cache.setex(cache_key, 300, json.dumps(result))  # 5-min TTL
    return result
\`\`\`
💡 **Viva Tip:** Justify TTL=300s based on your data staleness requirements (cite CAP theorem if relevant).`;
    }

    // General fallback
    return `Great question about ${activeProject?.title?.split(':')[0] || 'your project'}!

From an evaluation standpoint, university committees and hackathon judges value:
- ✅ **Verifiable benchmarks** — cite exact p99 latency numbers (e.g., "< 8.4ms under 5k req/sec")
- ✅ **System boundary clarity** — define exactly where your data pipeline starts and ends
- ✅ **Failure mode analysis** — explain every SPOF and your mitigation strategy
- ✅ **Literature alignment** — name 2-3 related works and what you improve upon

Try asking me for: **DB Schema**, **API Route**, **Docker Config**, or **Viva Questions** for more specific help!`;
  };

  const handleSendMessage = (textToSend = inputText) => {
    if (!textToSend.trim()) return;

    const newMessages = [...messages, { role: 'user', content: textToSend }];
    setMessages(newMessages);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const botReply = generateBotReply(textToSend);
      setMessages([...newMessages, { role: 'assistant', content: botReply }]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="mentor-drawer no-print">
      {/* Trigger Button */}
      <button
        className="mentor-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        title="Open AI Mentor Copilot"
        aria-label="Toggle AI Mentor chat"
      >
        {isOpen ? <X size={24} /> : <Bot size={26} />}
      </button>

      {/* Mentor Chat Window */}
      {isOpen && (
        <div className="mentor-window">
          <div className="mentor-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Sparkles size={16} color="#ffffff" />
              </div>
              <div>
                <strong style={{ fontSize: '0.9rem', color: '#ffffff' }}>AI Capstone Mentor</strong>
                <span style={{ fontSize: '0.72rem', color: 'var(--accent-secondary)', display: 'block' }}>
                  {activeProject ? activeProject.title.substring(0, 26) + '...' : 'General Project Advisor'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-dim)',
                cursor: 'pointer',
                fontSize: '1.1rem',
                lineHeight: 1,
                padding: '0.2rem'
              }}
              title="Close Mentor"
            >
              ✕
            </button>
          </div>

          {/* Quick Prompt Suggestions */}
          <div style={{
            display: 'flex',
            gap: '0.4rem',
            padding: '0.5rem 0.75rem',
            background: 'rgba(0,0,0,0.2)',
            borderBottom: '1px solid var(--border-subtle)',
            overflowX: 'auto',
            flexShrink: 0
          }}>
            {[
              { label: 'DB Schema', prompt: 'Generate PostgreSQL / Prisma Schema', Icon: Database },
              { label: 'API Routes', prompt: 'Generate FastAPI Route Snippet', Icon: Code },
              { label: 'Viva Prep', prompt: 'Suggest hard viva defense questions', Icon: ShieldAlert },
              { label: 'Docker', prompt: 'Create a production Dockerfile for my project', Icon: null }
            ].map(({ label, prompt, Icon }) => (
              <button
                key={label}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '0.72rem', padding: '0.2rem 0.5rem', whiteSpace: 'nowrap', flexShrink: 0 }}
                onClick={() => handleSendMessage(prompt)}
              >
                {Icon && <Icon size={12} />}
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* Chat Messages Body */}
          <div className="mentor-body">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`mentor-bubble ${m.role}`}
                style={{
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  fontFamily: m.content.includes('```') ? 'var(--font-mono)' : 'var(--font-main)',
                  fontSize: m.content.includes('```') ? '0.78rem' : '0.86rem',
                  lineHeight: 1.55
                }}
              >
                {m.content}
              </div>
            ))}
            {isTyping && (
              <div className="mentor-bubble assistant" style={{ color: 'var(--text-dim)' }}>
                <span className="animate-pulse">Generating...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Row */}
          <div className="mentor-input-row">
            <input
              type="text"
              className="custom-input"
              style={{ padding: '0.5rem 0.85rem', fontSize: '0.85rem' }}
              placeholder="Ask for schema, API, Docker, or viva advice..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <button
              className="btn btn-primary btn-sm btn-icon-only"
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim() || isTyping}
              title="Send Message"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
