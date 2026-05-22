import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState(0);

  // Minimal matrix rain background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = "01アイウエオカキクケコサシスセソタチツテト";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(0);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = characters[Math.floor(Math.random() * characters.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 80);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Typewriter animation
  useEffect(() => {
    const texts = ["know if your project will land", "with", "Resonance"];
    const currentText = texts[phase];
    let index = 0;

    if (phase < 3) {
      const timer = setInterval(() => {
        setDisplayText(currentText.slice(0, index + 1));
        index++;

        if (index > currentText.length) {
          clearInterval(timer);
          setTimeout(() => {
            if (phase < 2) {
              setPhase(phase + 1);
              setDisplayText("");
            }
          }, 800);
        }
      }, 80);

      return () => clearInterval(timer);
    }
  }, [phase]);

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col items-center justify-center">
      {/* Matrix rain background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-100"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
        {phase < 2 ? (
          <h1 className="text-6xl md:text-7xl font-light tracking-tight text-white min-h-32">
            {displayText}
            <span className="animate-pulse">|</span>
          </h1>
        ) : (
          <h1 className="text-6xl md:text-7xl font-light tracking-tight min-h-32">
            {displayText}
            <span className="animate-pulse">|</span>
            <style>{`
              .gradient-text {
                background: linear-gradient(90deg, #ffffff 0%, #808080 50%, #ffffff 100%);
                background-size: 200% auto;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
              }
            `}</style>
            <span className="gradient-text">{displayText}</span>
          </h1>
        )}

        {phase === 2 && (
          <div className="mt-8 flex gap-4 animate-fadeIn">
            <button
              onClick={() => navigate("/task-a")}
              className="px-8 py-3 bg-white text-black text-sm font-medium rounded-lg hover:bg-white/70 cursor-pointer transition duration-200"
            >
              Predict Rating
            </button>
            <button
              onClick={() => navigate("/task-b")}
              className="px-8 py-3 border border-white text-white text-sm font-medium rounded-lg cursor-pointer hover:bg-white/5 transition duration-200"
            >
              Find Audience
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
