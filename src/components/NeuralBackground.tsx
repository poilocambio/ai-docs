// "use client" indica a Next.js che questo componente deve essere eseguito nel browser (lato client), non sul server
"use client";

// Importiamo due hook di React:
// useEffect → serve per eseguire codice dopo che il componente è stato renderizzato
// useRef → serve per creare un riferimento a un elemento HTML (qui un canvas)
import { useEffect, useRef } from "react";

// Definiamo il componente React chiamato NeuralBackground
export default function NeuralBackground() {

  // Creiamo un riferimento al canvas HTML
  // In pratica "canvasRef" punterà al nostro <canvas> nella pagina
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // useEffect con array vuoto [] significa che il codice dentro verrà eseguito **una sola volta**, quando il componente viene montato
  useEffect(() => {

    // "canvas" è il nostro elemento canvas reale, preso dal riferimento
    const canvas = canvasRef.current!;

    // "ctx" è il contesto 2D del canvas, cioè dove possiamo disegnare
    const ctx = canvas.getContext("2d")!;

    // Otteniamo larghezza e altezza della finestra del browser
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Impostiamo il canvas alla stessa dimensione della finestra
    canvas.width = width;
    canvas.height = height;

    // Creiamo un array di "nodi" (puntini) con posizione casuale e velocità casuale
    // Array.from({ length: 40 }) → crea un array di 40 elementi
    const nodes = Array.from({ length: 40 }).map(() => ({
      x: Math.random() * width,  // posizione x casuale
      y: Math.random() * height, // posizione y casuale
      vx: (Math.random() - 0.5) * 0.4, // velocità x casuale tra -0.2 e 0.2
      vy: (Math.random() - 0.5) * 0.4, // velocità y casuale tra -0.2 e 0.2
    }));

    // Inizializziamo la posizione del mouse al centro della finestra
    let mouse = { x: width / 2, y: height / 2 };

    // Aggiorniamo la posizione del mouse ogni volta che si muove
    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    // Funzione principale per disegnare tutto sul canvas
    function draw() {

      // Puliamo il canvas ad ogni frame
      ctx.clearRect(0, 0, width, height);

      // Aggiorniamo la posizione dei nodi e li disegniamo
      nodes.forEach((n) => {
        n.x += n.vx; // muoviamo il nodo in x
        n.y += n.vy; // muoviamo il nodo in y

        // Se il nodo tocca il bordo, invertiamo la direzione
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        // Disegniamo il nodo come un piccolo cerchio
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2, 0, Math.PI * 2); // cerchio di raggio 2
        ctx.fillStyle = "#999"; // colore grigio
        ctx.fill();
      });

      // Colleghiamo i nodi vicini con linee
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x; // differenza x
          const dy = nodes[i].y - nodes[j].y; // differenza y
          const dist = Math.sqrt(dx * dx + dy * dy); // distanza tra nodi

          // Se i nodi sono abbastanza vicini (<120px), disegniamo una linea
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);

            // L'opacità della linea diminuisce con la distanza
            ctx.strokeStyle = `rgba(150,150,150,${1 - dist / 120})`;
            ctx.stroke();
          }
        }
      }

      // Colleghiamo i nodi vicini al mouse con linee leggere
      nodes.forEach((n) => {
        const dx = n.x - mouse.x;
        const dy = n.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Se il nodo è abbastanza vicino al mouse (<150px)
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = "rgba(120,120,120,0.2)"; // linea molto trasparente
          ctx.stroke();
        }
      });

      // Chiediamo al browser di chiamare draw di nuovo al prossimo frame (animazione continua)
      requestAnimationFrame(draw);
    }

    // Avviamo il ciclo di disegno
    draw();
  }, []); // array vuoto significa "esegui solo una volta all'inizio"

  // Ritorniamo il canvas, posizionato in modo assoluto e ignorando eventi del mouse
  return (
    <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
  );
}