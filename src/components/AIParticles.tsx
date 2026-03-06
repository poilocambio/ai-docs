"use client";

import { useEffect, useRef } from "react";

export default function AIParticles() {

  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {

    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 80 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      v: Math.random() * 0.3 + 0.1
    }));

    function animate() {

      ctx.clearRect(0,0,canvas.width,canvas.height);

      particles.forEach(p => {

        p.y -= p.v;

        if (p.y < 0) p.y = canvas.height;

        ctx.beginPath();
        ctx.arc(p.x,p.y,1.5,0,Math.PI*2);
        ctx.fillStyle="rgba(150,150,150,0.4)";
        ctx.fill();

      });

      requestAnimationFrame(animate);

    }

    animate();

  }, []);

  return <canvas ref={ref} className="absolute inset-0 pointer-events-none"/>;
}