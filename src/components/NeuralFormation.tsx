"use client";

import { useEffect, useRef } from "react";

export default function NeuralFormation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const isMobile = width < 768;

    // =====================================================
    // Margini e dimensioni utilizzabili
    // =====================================================
    const marginX = isMobile ? width * 0.08 : width / 4;
    const marginY = isMobile ? height * 0.05 : height / 8;
    const usableWidth = isMobile ? width * 0.7 : width - 2 * marginX;
    const usableHeight = isMobile ? height * 0.4 : height - 4 * marginY;

    const networkOffsetX = 0;
    const networkOffsetY = isMobile ? 40 : 100;

    // nodi
    const NODE_BASE_SIZE = isMobile ? 1.2 : 2;
    const NODE_SIZE_MULT = 6;

    const layers = [
      { name: "Input Layer", count: 8 },
      { name: "Hidden Layer 1", count: 9 },
      { name: "Hidden Layer 2", count: 9 },
      { name: "Hidden Layer 3", count: 9 },
      { name: "Output Layer", count: 4 },
    ];
    const layerCount = layers.length;

    // =====================================================
    // Calcolo posizioni X dei layer
    // =====================================================
    const layerXPositions = layers.map(
      (_, i) => marginX + (usableWidth * i) / (layerCount - 1)
    );

    const layerYOffsets = [
      marginY + (isMobile ? 10 : 40),
      marginY,
      marginY,
      marginY,
      marginY - (isMobile ? 5 : 20),
    ];

    const layerVerticalSpacing = layers.map((layer, i) =>
      i === 0
        ? (usableHeight * 0.8) / layer.count
        : usableHeight / layer.count
    );

    // =====================================================
    // Crea nodi
    // =====================================================
    type Node = {
      startX: number;
      startY: number;
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      size: number;
      layerIndex: number;
    };

    const nodes: Node[] = [];

    layers.forEach((layer, l) => {
      for (let n = 0; n < layer.count; n++) {
        nodes.push({
          startX: Math.random() * width,
          startY: Math.random() * height,
          x: 0,
          y: 0,
          targetX: layerXPositions[l] + networkOffsetX,
          targetY: layerYOffsets[l] + layerVerticalSpacing[l] * (n + 1) + networkOffsetY,
          size: NODE_BASE_SIZE,
          layerIndex: l,
        });
      }
    });

    // =====================================================
    // Scroll progress
    // =====================================================
    let scrollProgress = 0;
    const updateScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      scrollProgress = Math.min(1, scrollTop / maxScroll);
    };
    window.addEventListener("scroll", updateScroll);

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    // =====================================================
    // Draw
    // =====================================================
    function draw() {
      ctx.clearRect(0, 0, width, height);

      // aggiorna posizioni e dimensioni
      nodes.forEach((n) => {
        n.x = lerp(n.startX, n.targetX, scrollProgress);
        n.y = lerp(n.startY, n.targetY, scrollProgress);
        n.size = lerp(NODE_BASE_SIZE, NODE_BASE_SIZE * NODE_SIZE_MULT, scrollProgress);
      });

      // connessioni tra layer adiacenti
      let startIdx = 0;
      for (let l = 0; l < layerCount - 1; l++) {
        const neuronsA = layers[l].count;
        const neuronsB = layers[l + 1].count;

        for (let i = 0; i < neuronsA; i++) {
          const a = nodes[startIdx + i];
          for (let j = 0; j < neuronsB; j++) {
            const b = nodes[startIdx + neuronsA + j];
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(200,200,200,${scrollProgress})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
        startIdx += neuronsA;
      }

      // nodi
      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
        ctx.fillStyle = "#444";
        ctx.fill();
      });

      // etichette layer
      let idx = 0;
      layers.forEach((layer, l) => {
        const firstNode = nodes[idx];
        const lastNode = nodes[idx + layer.count - 1];
        const centerY = firstNode.targetY - (isMobile ? 20 : 40);
        ctx.font = `${isMobile ? 10 : 12}px sans-serif`;
        ctx.fillStyle = "#000";
        ctx.textAlign = "center";
        ctx.fillText(layer.name, firstNode.targetX, centerY);
        idx += layer.count;
      });

      // frecce output
      const outputLayer = layers[layers.length - 1];
      const outputStartIdx = nodes.length - outputLayer.count;
      for (let i = 0; i < outputLayer.count; i++) {
        const n = nodes[outputStartIdx + i];
        const arrowLength = isMobile ? 20 : 30;
        ctx.beginPath();
        ctx.moveTo(n.x + n.size, n.y);
        ctx.lineTo(n.x + n.size + arrowLength, n.y);
        ctx.lineTo(
          n.x + n.size + arrowLength - (isMobile ? 3 : 5),
          n.y - (isMobile ? 3 : 5)
        );
        ctx.moveTo(n.x + n.size + arrowLength, n.y);
        ctx.lineTo(
          n.x + n.size + arrowLength - (isMobile ? 3 : 5),
          n.y + (isMobile ? 3 : 5)
        );
        ctx.strokeStyle = "#444";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      requestAnimationFrame(draw);
    }

    draw();

    // =====================================================
    // Resize
    // =====================================================
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}