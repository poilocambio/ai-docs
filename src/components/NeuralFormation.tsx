"use client";

import { useEffect, useRef, useCallback } from "react";

const CHAOS_DURATION  = 1800;
const FORM_DURATION   = 1600;
const SETTLE_DURATION =  600;
const LABEL_DURATION  =  400;

type Phase = "chaos" | "forming" | "settling" | "done";

export default function NeuralFormation({ onComplete }: { onComplete: () => void }) {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const phaseRef   = useRef<Phase>("chaos");
  const phaseStart = useRef(0);
  const rafId      = useRef(0);
  const completed  = useRef(false);

  const triggerComplete = useCallback(() => {
    if (!completed.current) {
      completed.current = true;
      onComplete();
    }
  }, [onComplete]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext("2d")!;
    const dpr    = window.devicePixelRatio || 1;

    function getSize() {
      const rect = canvas.parentElement!.getBoundingClientRect();
      return { W: Math.floor(rect.width), H: Math.floor(rect.height) };
    }

    let { W, H } = getSize();
    const isMobile = W < 640;

    function applySize() {
      ({ W, H } = getSize());
      canvas.width        = Math.round(W * dpr);
      canvas.height       = Math.round(H * dpr);
      canvas.style.width  = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    applySize();

    // ── Layers — leggermente più piccoli ──────────────────────────────
    const layers = isMobile
      ? [
          { name: "Input",    count: 4 },
          { name: "Hidden 1", count: 5 },
          { name: "Hidden 2", count: 5 },
          { name: "Output",   count: 3 },
        ]
      : [
          { name: "Input",    count: 6 },
          { name: "Hidden 1", count: 7 },
          { name: "Hidden 2", count: 7 },
          { name: "Hidden 3", count: 7 },
          { name: "Output",   count: 3 },
        ];

    const totalNodes = layers.reduce((s, l) => s + l.count, 0);

    // ── Layout — rete occupa il 70% centrale del canvas ───────────────
    const LABEL_SPACE = isMobile ? 26 : 32;
    const BOT_PAD     = isMobile ? 24 : 32;

    // Padding orizzontale generoso per centrare bene la rete
    const SIDE_PAD = isMobile ? W * 0.10 : W * 0.18;

    const drawH   = H - LABEL_SPACE - BOT_PAD;
    const drawTop = LABEL_SPACE;
    const usableW = W - SIDE_PAD * 2;

    const maxCount   = Math.max(...layers.map(l => l.count));
    const maxNodeSize = isMobile ? 4 : 6;
    const minGap      = isMobile ? 10 : 14;
    const autoSize    = Math.min(maxNodeSize, Math.floor((drawH / maxCount - minGap) / 2));
    const NODE_SIZE   = Math.max(3, autoSize);

    // Ogni layer centra i nodi verticalmente in modo indipendente
    function buildTargets() {
      const t: { x: number; y: number }[] = [];
      layers.forEach((layer, li) => {
        const tx      = SIDE_PAD + (usableW * li) / (layers.length - 1);
        const spacing = drawH / (layer.count + 1);
        for (let ni = 0; ni < layer.count; ni++) {
          t.push({ x: tx, y: drawTop + spacing * (ni + 1) });
        }
      });
      return t;
    }

    const targets = buildTargets();

    const chaos = targets.map(() => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - 0.5) * (isMobile ? 1.0 : 1.5),
      vy: (Math.random() - 0.5) * (isMobile ? 1.0 : 1.5),
    }));

    const pos = chaos.map(c => ({ x: c.x, y: c.y }));

    function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
    function easeInOutCubic(t: number) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    phaseStart.current = performance.now();

    function draw(now: number) {
      const phase   = phaseRef.current;
      const elapsed = now - phaseStart.current;

      ctx.clearRect(0, 0, W, H);

      if (phase === "chaos") {
        chaos.forEach((c, i) => {
          c.x += c.vx; c.y += c.vy;
          if (c.x < 0 || c.x > W) c.vx *= -1;
          if (c.y < 0 || c.y > H) c.vy *= -1;
          pos[i].x = c.x; pos[i].y = c.y;
        });
        if (elapsed > CHAOS_DURATION) { phaseRef.current = "forming"; phaseStart.current = now; }
      }

      if (phase === "forming") {
        const t = Math.min(1, elapsed / FORM_DURATION);
        const e = easeInOutCubic(t);
        for (let i = 0; i < totalNodes; i++) {
          pos[i].x = lerp(chaos[i].x, targets[i].x, e);
          pos[i].y = lerp(chaos[i].y, targets[i].y, e);
        }
        if (t >= 1) { phaseRef.current = "settling"; phaseStart.current = now; }
      }

      if (phase === "settling" || phase === "done") {
        for (let i = 0; i < totalNodes; i++) {
          pos[i].x = targets[i].x; pos[i].y = targets[i].y;
        }
        if (phase === "settling" && elapsed > SETTLE_DURATION) {
          phaseRef.current = "done"; phaseStart.current = now;
        }
      }

      // Connessioni
      const connAlpha =
        phase === "chaos" || phase === "forming" ? 0
        : phase === "settling" ? Math.min(1, elapsed / SETTLE_DURATION) : 1;

      if (connAlpha > 0) {
        ctx.lineWidth = 0.7;
        let ni = 0;
        layers.forEach((layer, li) => {
          if (li === layers.length - 1) return;
          const next = layers[li + 1];
          for (let i = 0; i < layer.count; i++) {
            for (let j = 0; j < next.count; j++) {
              const a = pos[ni + i];
              const b = pos[ni + layer.count + j];
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = `rgba(160,160,160,${connAlpha * 0.28})`;
              ctx.stroke();
            }
          }
          ni += layer.count;
        });
      }

      // Nodi
      const currentNodeSize =
        phase === "chaos" ? 2
        : phase === "forming"
          ? lerp(2, NODE_SIZE, easeInOutCubic(Math.min(1, elapsed / FORM_DURATION)))
          : NODE_SIZE;

      pos.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentNodeSize, 0, Math.PI * 2);
        ctx.fillStyle = "#1a1a1a";
        ctx.fill();
      });

      // Etichette
      const lblAlpha = phase === "done" ? Math.min(1, elapsed / LABEL_DURATION) : 0;
      if (lblAlpha > 0) {
        ctx.fillStyle = `rgba(120,120,120,${lblAlpha})`;
        ctx.textAlign = "center";
        ctx.font = `${isMobile ? 9 : 10}px ui-monospace, monospace`;
        let ni = 0;
        layers.forEach(layer => {
          ctx.fillText(layer.name, targets[ni].x, LABEL_SPACE - 8);
          ni += layer.count;
        });
        if (lblAlpha >= 1) triggerComplete();
      }

      rafId.current = requestAnimationFrame(draw);
    }

    rafId.current = requestAnimationFrame(draw);

    const ro = new ResizeObserver(applySize);
    ro.observe(canvas.parentElement!);

    return () => {
      cancelAnimationFrame(rafId.current);
      ro.disconnect();
    };
  }, [triggerComplete]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}