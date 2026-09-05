import React, { useEffect, useRef } from 'react';

export default function MatrixRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const FONT_SIZE = 14;
    const CHARS = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ∑∆πΩ≠≈∫<>{}[]//\\#@!?';

    let cols = Math.floor(canvas.width / FONT_SIZE);
    let drops = Array(cols).fill(1).map(() => Math.floor(Math.random() * -100));

    const draw = () => {
      // Fade trail
      ctx.fillStyle = 'rgba(0, 0, 0, 0.045)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${FONT_SIZE}px 'JetBrains Mono', monospace`;

      cols = Math.floor(canvas.width / FONT_SIZE);
      while (drops.length < cols) drops.push(Math.floor(Math.random() * -100));

      for (let i = 0; i < cols; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const y = drops[i] * FONT_SIZE;
        const x = i * FONT_SIZE;

        // Head glyph — bright white/cyan
        const isHead = drops[i] > 0 && Math.random() > 0.85;
        if (isHead) {
          ctx.fillStyle = '#e0ffff';
          ctx.shadowColor = '#00ffcc';
          ctx.shadowBlur = 12;
        } else {
          // Gradient: bright green near head, dim below
          const brightness = Math.max(0, 1 - (drops[i] * FONT_SIZE) / canvas.height * 0.5);
          const g = Math.floor(180 + brightness * 75);
          ctx.fillStyle = `rgba(0, ${g}, 80, ${0.55 + brightness * 0.45})`;
          ctx.shadowColor = '#00ff41';
          ctx.shadowBlur = 4;
        }

        ctx.fillText(char, x, y);
        ctx.shadowBlur = 0;

        // Reset column
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 45);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%',
        height: '100%',
        zIndex: -2,
        pointerEvents: 'none',
        opacity: 0.55,
      }}
      aria-hidden="true"
    />
  );
}
