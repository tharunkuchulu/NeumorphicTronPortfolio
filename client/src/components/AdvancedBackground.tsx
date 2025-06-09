import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface AdvancedBackgroundProps {
  intensity?: 'low' | 'medium' | 'high';
  theme?: 'tron' | 'matrix' | 'circuit';
}

export default function AdvancedBackground({ 
  intensity = 'medium',
  theme = 'tron'
}: AdvancedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Circuit board pattern
    const drawCircuitBoard = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Grid lines
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      
      const gridSize = intensity === 'high' ? 30 : intensity === 'medium' ? 50 : 80;
      
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Circuit nodes
      ctx.fillStyle = 'rgba(0, 255, 255, 0.3)';
      for (let x = gridSize; x < canvas.width; x += gridSize * 2) {
        for (let y = gridSize; y < canvas.height; y += gridSize * 2) {
          if (Math.random() > 0.7) {
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    };

    // Matrix rain effect
    const drawMatrixRain = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const columns = Math.floor(canvas.width / 20);
      const drops: number[] = new Array(columns).fill(1);

      ctx.fillStyle = 'rgba(0, 255, 255, 0.8)';
      ctx.font = '15px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = String.fromCharCode(Math.random() * 128);
        ctx.fillText(text, i * 20, drops[i] * 20);

        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    let animationFrame: number;
    
    if (theme === 'circuit') {
      drawCircuitBoard();
    } else if (theme === 'matrix') {
      const animate = () => {
        drawMatrixRain();
        animationFrame = requestAnimationFrame(animate);
      };
      animate();
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [intensity, theme]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ mixBlendMode: 'screen' }}
      />
      
      {/* Gradient overlays */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-tron/10 via-transparent to-transparent"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Scanning lines */}
        <motion.div
          className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-tron/60 to-transparent"
          animate={{
            y: [-10, window.innerHeight + 10],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    </>
  );
}