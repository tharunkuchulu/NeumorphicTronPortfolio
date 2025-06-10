import { useMemo } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
}

export default function FloatingParticles() {
  // Reduced particles for better performance
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 4 }, (_, i) => ({
      id: i,
      x: 20 + (i * 20), // Fixed positions to reduce calculations
      y: 20 + (i * 15),
      delay: i * 1.2,
      duration: 8 + (i % 2)
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 reduce-paint">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-tron rounded-full opacity-50 continuous-animation"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [-15, -25, -15],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
