import { useEffect, useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
  type: 'dot' | 'line' | 'pulse';
}

interface FloatingParticlesProps {
  count?: number;
  maxParticles?: number;
  enabled?: boolean;
}

export default function FloatingParticles({ 
  count = 8, 
  maxParticles = 12, 
  enabled = true 
}: FloatingParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  const createParticle = useCallback((): Particle => {
    const types: Particle['type'][] = ['dot', 'line', 'pulse'];
    return {
      id: Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 4 + Math.random() * 6,
      size: 0.5 + Math.random() * 2,
      opacity: 0.3 + Math.random() * 0.5,
      type: types[Math.floor(Math.random() * types.length)]
    };
  }, []);

  const initialParticles = useMemo(() => 
    enabled ? Array.from({ length: count }, createParticle) : [],
    [count, createParticle, enabled]
  );

  useEffect(() => {
    if (!enabled) {
      setParticles([]);
      return;
    }

    setParticles(initialParticles);

    // Add new particles with intelligent spawning
    const interval = setInterval(() => {
      setParticles(prev => {
        if (prev.length >= maxParticles) return prev;
        
        // Only add particle if there's space and random chance
        if (Math.random() > 0.7) {
          return [...prev, createParticle()];
        }
        return prev;
      });
    }, 2000);

    // Cleanup old particles more efficiently
    const cleanupInterval = setInterval(() => {
      setParticles(prev => {
        if (prev.length > maxParticles) {
          return prev.slice(-Math.floor(maxParticles * 0.8));
        }
        return prev;
      });
    }, 10000);

    return () => {
      clearInterval(interval);
      clearInterval(cleanupInterval);
    };
  }, [enabled, initialParticles, maxParticles, createParticle]);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 particle-system">
      {particles.map((particle) => {
        const baseClass = "absolute bg-tron rounded-full floating-particle";
        const sizeClass = particle.type === 'line' 
          ? `w-8 h-0.5` 
          : `w-${Math.ceil(particle.size)} h-${Math.ceil(particle.size)}`;
        
        return (
          <motion.div
            key={particle.id}
            className={`${baseClass} ${sizeClass}`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: particle.opacity,
            }}
            animate={particle.type === 'pulse' ? {
              scale: [1, 2, 1],
              opacity: [particle.opacity, particle.opacity * 0.3, particle.opacity],
            } : particle.type === 'line' ? {
              rotate: [0, 360],
              x: [-20, 20, -20],
              y: [-30, -50, -30],
            } : {
              y: [-20, -40, -20],
              x: [-10, 10, -10],
              scale: [1, 1.5, 1],
              opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: particle.type === 'pulse' ? "easeInOut" : "linear",
            }}
          />
        );
      })}
    </div>
  );
}
