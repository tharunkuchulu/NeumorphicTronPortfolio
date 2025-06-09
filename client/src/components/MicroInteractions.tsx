import { motion } from "framer-motion";
import { useState } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function InteractiveButton({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '',
  ...props 
}: ButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const baseClasses = "relative overflow-hidden font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-tron focus:ring-offset-2 focus:ring-offset-background";
  
  const variants = {
    primary: "bg-tron text-black hover:bg-tron/90 shadow-lg shadow-tron/25",
    secondary: "bg-gray-800 text-white hover:bg-gray-700 border border-gray-600",
    ghost: "bg-transparent text-tron hover:bg-tron/10 border border-tron/30"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-xl",
    lg: "px-8 py-4 text-lg rounded-2xl"
  };

  return (
    <motion.button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      whileHover={{ 
        scale: 1.02,
        boxShadow: variant === 'primary' ? "0 0 30px rgba(0, 255, 255, 0.4)" : undefined
      }}
      whileTap={{ scale: 0.98 }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      {...props}
    >
      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 bg-white/20 rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        animate={isPressed ? { scale: 4, opacity: [0, 1, 0] } : {}}
        transition={{ duration: 0.6 }}
      />
      
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
        animate={{ x: ['-200%', '200%'] }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          repeatDelay: 3,
          ease: "linear"
        }}
      />
      
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover3D?: boolean;
}

export function InteractiveCard({ children, className = '', hover3D = true }: CardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hover3D) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    setMousePosition({
      x: (e.clientX - centerX) / rect.width,
      y: (e.clientY - centerY) / rect.height
    });
  };

  const resetPosition = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      className={`glass-card perspective-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetPosition}
      whileHover={{ y: -8 }}
      style={{
        transform: hover3D ? `
          perspective(1000px) 
          rotateX(${mousePosition.y * 10}deg) 
          rotateY(${mousePosition.x * 10}deg)
        ` : undefined,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <motion.div
        className="card-inner relative z-10"
        style={{
          transform: hover3D ? `translateZ(50px)` : undefined,
        }}
      >
        {children}
      </motion.div>
      
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-inherit bg-gradient-to-r from-tron/0 via-tron/10 to-tron/0 opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  animated?: boolean;
  color?: string;
}

export function AnimatedProgressBar({ 
  value, 
  max = 100, 
  className = '', 
  animated = true,
  color = 'tron'
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={`w-full bg-gray-800 rounded-full h-2 overflow-hidden ${className}`}>
      <motion.div
        className={`h-full bg-${color} rounded-full relative`}
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        {animated && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: "linear",
              repeatDelay: 2
            }}
          />
        )}
      </motion.div>
    </div>
  );
}