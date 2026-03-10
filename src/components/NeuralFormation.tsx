"use client";

import { useEffect, useRef } from "react";

export default function NeuralFormation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext("2d")!;
    const dpr    = window.devicePixelRatio || 1;

    // Variabili mutabili aggiornate su resize
    let width        = window.innerWidth;
    let height       = window.innerHeight;
    let isMobile     = width < 768;
    // Mobile: il canvas occupa solo il 45% superiore del viewport
    let canvasHeight = isMobile ? Math.round(height * 0.45) : height;

    function applyCanvasSize() {
      canvas.width        = Math.round(width        * dpr);
      canvas.height       = Math.round(canvasHeight * dpr);
      canvas.style.width  = `${width}px`;
      canvas.style.height = `${canvasHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    applyCanvasSize();

    // ─── Layout (calcolato una volta al mount) ───────────────────────
    const networkAreaX     = isMobile ? 0      : width / 2;
    const networkAreaWidth = isMobile ? width   : width / 2;

    const marginX = networkAreaX + networkAreaWidth * (isMobile ? 0.08 : 0.10);
    const marginY = isMobile ? canvasHeight * 0.08 : height / 8;

    const usableWidth  = networkAreaWidth * (isMobile ? 0.82 : 0.80);
    const usableHeight = isMobile
      ? canvasHeight * 0.80
      : height - 4 * marginY;

    const networkOffsetX = 0;
    const networkOffsetY = isMobile ? 8 : 100;

    const NODE_BASE = isMobile ? 1.5 : 1;
    const NODE_MULT = isMobile ? 7   : 14; // raggio max mobile: 10.5px — non sovrappone i nodi

    // ─── Layers ──────────────────────────────────────────────────────
    const layers = [
      { name: isMobile ? "Input"    : "Input Layer",    count: 8 },
      { name: isMobile ? "Hidden 1" : "Hidden Layer 1", count: 9 },
      { name: isMobile ? "Hidden 2" : "Hidden Layer 2", count: 9 },
      { name: isMobile ? "Hidden 3" : "Hidden Layer 3", count: 9 },
      { name: isMobile ? "Output"   : "Output Layer",   count: 4 },
    ];
    const layerCount = layers.length;

    const layerXPositions = layers.map(
      (_, i) => marginX + (usableWidth * i) / (layerCount - 1)
    );

    // Piccoli offset verticali per layer input/output (fedele all'originale)
    const layerYOffsets = [
      marginY + (isMobile ? 8  : 40),
      marginY,
      marginY,
      marginY,
      marginY - (isMobile ? 4  : 20),
    ];

    const layerVerticalSpacing = layers.map((layer, i) =>
      i === 0
        ? (usableHeight * 0.8) / layer.count
        : usableHeight / layer.count
    );

    // ─── Nodi ────────────────────────────────────────────────────────
    type Node = {
      startX: number; startY: number;
      x: number; y: number;
      targetX: number; targetY: number;
      size: number;
    };

    const nodes: Node[] = [];

    layers.forEach((layer, l) => {
      for (let n = 0; n < layer.count; n++) {
        nodes.push({
          startX:  Math.random() * width,
          startY:  Math.random() * canvasHeight, // chaos dentro l'area canvas
          x: 0, y: 0,
          targetX: layerXPositions[l] + networkOffsetX,
          targetY: layerYOffsets[l] + layerVerticalSpacing[l] * (n + 1) + networkOffsetY,
          size:    NODE_BASE,
        });
      }
    });

    // ─── Scroll ──────────────────────────────────────────────────────
    let progress = 0;

    function onScroll() {
      const max = document.body.scrollHeight - window.innerHeight;
      progress  = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    }

    window.addEventListener("scroll", onScroll, { passive: true });

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    // ─── Draw loop ───────────────────────────────────────────────────
    let rafId: number;

    function draw() {
      ctx.clearRect(0, 0, width, canvasHeight);

      nodes.forEach((n) => {
        n.x    = lerp(n.startX, n.targetX, progress);
        n.y    = lerp(n.startY, n.targetY, progress);
        n.size = lerp(NODE_BASE, NODE_BASE * NODE_MULT, progress);
      });

      // Connessioni
      const connAlpha = Math.max(0, (progress - 0.4) * 2);
      if (connAlpha > 0) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(180,180,180,${connAlpha})`;
        ctx.lineWidth   = 1 / dpr;

        let idx = 0;
        for (let l = 0; l < layerCount - 1; l++) {
          const nA = layers[l].count;
          const nB = layers[l + 1].count;
          for (let i = 0; i < nA; i++) {
            const a = nodes[idx + i];
            for (let j = 0; j < nB; j++) {
              const b = nodes[idx + nA + j];
              ctx.moveTo(Math.round(a.x) + 0.5, Math.round(a.y) + 0.5);
              ctx.lineTo(Math.round(b.x) + 0.5, Math.round(b.y) + 0.5);
            }
          }
          idx += nA;
        }
        ctx.stroke();
      }

      // Nodi
      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
        ctx.fillStyle = "#222";
        ctx.fill();
      });

      // Etichette
      const lblAlpha = Math.min(1, Math.max(0, (progress - 0.75) * 4));
      if (lblAlpha > 0) {
        ctx.fillStyle = `rgba(0,0,0,${lblAlpha})`;
        ctx.textAlign = "center";
        ctx.font      = `${isMobile ? 9 : 12}px sans-serif`;

        let idx = 0;
        layers.forEach((layer) => {
          const n = nodes[idx];
          ctx.fillText(layer.name, n.targetX, n.targetY - (isMobile ? 10 : 40));
          idx += layer.count;
        });
      }

      rafId = requestAnimationFrame(draw);
    }

    draw();

    // ─── Resize ──────────────────────────────────────────────────────
    function onResize() {
      width        = window.innerWidth;
      height       = window.innerHeight;
      isMobile     = width < 768;
      canvasHeight = isMobile ? Math.round(height * 0.45) : height;
      applyCanvasSize();
      // Le posizioni target dei nodi restano invariate per evitare salti visivi
    }

    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId); // fix memory leak: originale mancava cancel
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    // Rimosso inset-0: width e height sono gestiti interamente da JS
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 z-0 pointer-events-none"
    />
  );
}
