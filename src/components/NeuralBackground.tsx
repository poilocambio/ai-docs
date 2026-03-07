"use client";

import { useEffect, useRef } from "react";

export default function NeuralBackground() {

const canvasRef = useRef<HTMLCanvasElement>(null);

useEffect(() => {


const canvas = canvasRef.current!;
const ctx = canvas.getContext("2d")!;

// ============================================================
// -da chatGPT-
// Detect mobile device to reduce visual noise and CPU usage
// ============================================================

const isMobile = window.innerWidth < 768;

// ============================================================
// -da chatGPT-
// Adaptive configuration depending on device
// Fewer nodes + smaller distances on mobile for readability
// ============================================================

const NODE_COUNT = isMobile ? 18 : 40;
const CONNECT_DISTANCE = isMobile ? 80 : 120;
const NODE_SIZE = isMobile ? 1.5 : 2;
const LINE_OPACITY_MULTIPLIER = isMobile ? 0.25 : 1;
const MOUSE_DISTANCE = isMobile ? 0 : 150; // disable mouse interaction on mobile

let width = window.innerWidth;
let height = window.innerHeight;

// ============================================================
// -da chatGPT-
// Retina / HiDPI support
// Prevents blurry canvas on mobile and modern displays
// ============================================================

const dpr = window.devicePixelRatio || 1;

function setupCanvas() {
  canvas.width = width * dpr;
  canvas.height = height * dpr;

  canvas.style.width = width + "px";
  canvas.style.height = height + "px";

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpr, dpr);
}

setupCanvas();

// ============================================================
// Create nodes
// ============================================================

const nodes = Array.from({ length: NODE_COUNT }).map(() => ({
  x: Math.random() * width,
  y: Math.random() * height,
  vx: (Math.random() - 0.5) * 0.4,
  vy: (Math.random() - 0.5) * 0.4,
}));

// ============================================================
// Mouse interaction
// ============================================================

let mouse = { x: width / 2, y: height / 2 };

const mouseMoveHandler = (e: MouseEvent) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
};

// -da chatGPT-
// Only enable mouse interaction on non-mobile devices
if (!isMobile) {
  window.addEventListener("mousemove", mouseMoveHandler);
}

// ============================================================
// -da chatGPT-
// Detect areas that should NOT contain nodes (text areas)
// Developers can add class "avoid-canvas" to any element
// ============================================================

function getAvoidAreas() {
  const elements = document.querySelectorAll(".avoid-canvas");

  return Array.from(elements).map((el) => {
    const rect = el.getBoundingClientRect();

    return {
      left: rect.left,
      right: rect.right,
      top: rect.top,
      bottom: rect.bottom,
    };
  });
}

let avoidAreas = getAvoidAreas();

function isInsideAvoidArea(x: number, y: number) {
  return avoidAreas.some(
    (rect) =>
      x > rect.left &&
      x < rect.right &&
      y > rect.top &&
      y < rect.bottom
  );
}

// ============================================================
// Resize handling
// ============================================================

const resizeHandler = () => {

  width = window.innerWidth;
  height = window.innerHeight;

  setupCanvas();

  // -da chatGPT-
  // recalculate avoid areas because layout changed
  avoidAreas = getAvoidAreas();
};

window.addEventListener("resize", resizeHandler);

// ============================================================
// Animation loop
// ============================================================

// -da chatGPT-
// Save animation frame id to properly cancel on unmount
let animationId: number;

function draw() {

  ctx.clearRect(0, 0, width, height);

  // ============================================================
  // Update and draw nodes
  // ============================================================

  nodes.forEach((n) => {

    n.x += n.vx;
    n.y += n.vy;

    if (n.x < 0 || n.x > width) n.vx *= -1;
    if (n.y < 0 || n.y > height) n.vy *= -1;

    // -da chatGPT-
    // Prevent nodes from entering text areas
    if (isInsideAvoidArea(n.x, n.y)) {
      n.vx *= -1;
      n.vy *= -1;
      n.x += n.vx * 2;
      n.y += n.vy * 2;
    }

    ctx.beginPath();
    ctx.arc(n.x, n.y, NODE_SIZE, 0, Math.PI * 2);
    ctx.fillStyle = "#999";
    ctx.fill();
  });

  // ============================================================
  // Draw node connections
  // ============================================================

  for (let i = 0; i < nodes.length; i++) {

    for (let j = i + 1; j < nodes.length; j++) {

      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;

      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < CONNECT_DISTANCE) {

        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);

        const opacity =
          (1 - dist / CONNECT_DISTANCE) * LINE_OPACITY_MULTIPLIER;

        ctx.strokeStyle = `rgba(150,150,150,${opacity})`;
        ctx.stroke();
      }
    }
  }

  // ============================================================
  // Mouse interaction lines
  // ============================================================

  if (!isMobile && MOUSE_DISTANCE > 0) {

    nodes.forEach((n) => {

      const dx = n.x - mouse.x;
      const dy = n.y - mouse.y;

      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < MOUSE_DISTANCE) {

        ctx.beginPath();
        ctx.moveTo(n.x, n.y);
        ctx.lineTo(mouse.x, mouse.y);

        ctx.strokeStyle = "rgba(120,120,120,0.2)";
        ctx.stroke();
      }
    });
  }

  animationId = requestAnimationFrame(draw);
}

draw();

// ============================================================
// React cleanup
// ============================================================

// -da chatGPT-
// Prevent memory leaks when component unmounts
return () => {

  cancelAnimationFrame(animationId);

  window.removeEventListener("resize", resizeHandler);
  window.removeEventListener("mousemove", mouseMoveHandler);
};


}, []);

return (
<canvas ref={canvasRef}className="absolute inset-0 pointer-events-none z-0"/>


  // -da chatGPT-
  // Tailwind classes:
  // absolute inset-0 -> full screen background
  // pointer-events-none -> canvas does not block clicks
  // z-0 -> ensure it stays behind UI elements
  

);
}
