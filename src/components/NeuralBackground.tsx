"use client";

import { useEffect, useRef } from "react";

export default function NeuralBackground() {

const canvasRef = useRef<HTMLCanvasElement>(null);

useEffect(() => {

const canvas = canvasRef.current!;
const ctx = canvas.getContext("2d")!;

// ============================================================
// -da chatGPT-
// Detect mobile device
// ============================================================

const isMobile = window.innerWidth < 768;

// ============================================================
// -da chatGPT-
// Adaptive configuration
// ============================================================

const NODE_COUNT = isMobile ? 20 : 50;
const CONNECT_DISTANCE = isMobile ? 80 : 120;
const CONNECT_DISTANCE_SQ = CONNECT_DISTANCE * CONNECT_DISTANCE; // -da chatGPT- squared distance optimization
const NODE_SIZE = isMobile ? 1.5 : 2;
const LINE_OPACITY_MULTIPLIER = isMobile ? 0.25 : 1;
const MOUSE_DISTANCE = isMobile ? 0 : 150;

let width = window.innerWidth;
let height = window.innerHeight;

// ============================================================
// -da chatGPT-
// FPS limit to reduce battery usage on mobile
// ============================================================

const FPS = isMobile ? 30 : 60;
const FRAME_DELAY = 1000 / FPS;
let lastFrameTime = 0;

// ============================================================
// -da chatGPT-
// Retina / HiDPI support
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

if (!isMobile) {
window.addEventListener("mousemove", mouseMoveHandler);
}

// ============================================================
// -da chatGPT-
// Detect avoid areas
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

// -da chatGPT-
// Delay detection to ensure all components rendered

setTimeout(() => {
avoidAreas = getAvoidAreas();
}, 300);

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

avoidAreas = getAvoidAreas();

};

window.addEventListener("resize", resizeHandler);

// ============================================================
// -da chatGPT-
// Spatial grid optimization
// ============================================================

const CELL_SIZE = CONNECT_DISTANCE;

function buildSpatialGrid() {

const grid = new Map<string, typeof nodes>();

nodes.forEach((node) => {

const cellX = Math.floor(node.x / CELL_SIZE);
const cellY = Math.floor(node.y / CELL_SIZE);

const key = `${cellX},${cellY}`;

if (!grid.has(key)) {
grid.set(key, []);
}

grid.get(key)!.push(node);

});

return grid;
}

// ============================================================
// Animation loop
// ============================================================

let animationId: number;

function draw(timestamp = 0) {

if (timestamp - lastFrameTime < FRAME_DELAY) {
animationId = requestAnimationFrame(draw);
return;
}

lastFrameTime = timestamp;

ctx.clearRect(0, 0, width, height);

// ============================================================
// Update nodes
// ============================================================

nodes.forEach((n) => {

n.x += n.vx;
n.y += n.vy;

if (n.x < 0 || n.x > width) n.vx *= -1;
if (n.y < 0 || n.y > height) n.vy *= -1;

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
// -da chatGPT-
// Build spatial grid
// ============================================================

const grid = buildSpatialGrid();

// ============================================================
// -da chatGPT-
// Draw connections using spatial grid
// ============================================================

nodes.forEach((node) => {

const cellX = Math.floor(node.x / CELL_SIZE);
const cellY = Math.floor(node.y / CELL_SIZE);

for (let x = -1; x <= 1; x++) {
for (let y = -1; y <= 1; y++) {

const key = `${cellX + x},${cellY + y}`;
const cell = grid.get(key);

if (!cell) continue;

cell.forEach((other) => {

if (node === other) return;

const dx = node.x - other.x;
const dy = node.y - other.y;

const distSq = dx * dx + dy * dy;

if (distSq < CONNECT_DISTANCE_SQ) {

ctx.beginPath();
ctx.moveTo(node.x, node.y);
ctx.lineTo(other.x, other.y);

const dist = Math.sqrt(distSq);

const opacity =
(1 - dist / CONNECT_DISTANCE) *
LINE_OPACITY_MULTIPLIER;

ctx.strokeStyle = `rgba(150,150,150,${opacity})`;
ctx.stroke();

}

});

}
}

});

// ============================================================
// Mouse interaction
// ============================================================

if (!isMobile && MOUSE_DISTANCE > 0) {

const mouseDistSq = MOUSE_DISTANCE * MOUSE_DISTANCE;

nodes.forEach((n) => {

const dx = n.x - mouse.x;
const dy = n.y - mouse.y;

const distSq = dx * dx + dy * dy;

if (distSq < mouseDistSq) {

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

return () => {

cancelAnimationFrame(animationId);

window.removeEventListener("resize", resizeHandler);
window.removeEventListener("mousemove", mouseMoveHandler);

};

}, []);

return (

<canvas
ref={canvasRef}
className="absolute inset-0 pointer-events-none z-0"
/>

);

}
