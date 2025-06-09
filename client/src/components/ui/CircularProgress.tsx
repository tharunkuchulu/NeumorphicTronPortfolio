import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  bgColor?: string;
  icon?: string;
  label?: string;
  delay?: number;
  animate?: boolean;
}

export default function CircularProgress({
  value,
  size = 120,
  strokeWidth = 8,
  color = "#00ffff",
  bgColor = "rgba(255, 255, 255, 0.1)",
  icon,
  label,
  delay = 0,
  animate = true
}: CircularProgressProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentValue, setCurrentValue] = useState(0);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (currentValue / 100) * circumference;

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        // Animate the value gradually
        const animationDuration = 2000;
        const steps = 60;
        const increment = value / steps;
        let current = 0;
        
        const interval = setInterval(() => {
          current += increment;
          if (current >= value) {
            current = value;
            clearInterval(interval);
          }
          setCurrentValue(current);
        }, animationDuration / steps);

        return () => clearInterval(interval);
      }, delay);

      return () => clearTimeout(timer);
    } else {
      setCurrentValue(value);
      setIsVisible(true);
    }
  }, [value, delay, animate]);

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center hardware-accelerated"
      style={{ width: size, height: size }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        scale: isVisible ? 1 : 0.8 
      }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      whileHover={{ scale: 1.05 }}
    >
      {/* Background Circle */}
      <svg
        width={size}
        height={size}
        className="absolute transform -rotate-90"
        style={{ filter: 'drop-shadow(0 0 15px rgba(0, 255, 255, 0.3))' }}
      >
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        
        {/* Subtle inner glow track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={strokeWidth / 2}
          fill="transparent"
        />
        
        {/* Progress Circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          style={{
            filter: `drop-shadow(0 0 12px ${color}90) drop-shadow(0 0 4px ${color}60)`,
          }}
          transition={{
            strokeDashoffset: {
              duration: 2,
              ease: [0.25, 0.1, 0.25, 1]
            }
          }}
        />
        
        {/* Outer glow effect */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius + 2}
          stroke={color}
          strokeWidth={1}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          opacity={0.3}
          style={{
            filter: `blur(2px)`,
          }}
          transition={{
            strokeDashoffset: {
              duration: 2,
              ease: [0.25, 0.1, 0.25, 1]
            }
          }}
        />
      </svg>

      {/* Content - Clean icon-only design */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        {icon && (
          <motion.i
            className={`${icon} text-2xl`}
            style={{ 
              color: 'white',
              filter: `drop-shadow(0 0 8px ${color}80)`
            }}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ 
              scale: isVisible ? 1 : 0, 
              rotate: isVisible ? 0 : -180 
            }}
            transition={{ 
              delay: delay + 0.3, 
              duration: 0.8,
              type: "spring",
              stiffness: 200 
            }}
          />
        )}
      </div>

      {/* Percentage badge - positioned outside circle */}
      <motion.div
        className="absolute -top-1 -right-1 bg-black/80 backdrop-blur-sm rounded-full px-1.5 py-0.5 border"
        style={{ 
          borderColor: color,
          boxShadow: `0 0 8px ${color}40`
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: isVisible ? 1 : 0,
          opacity: isVisible ? 1 : 0
        }}
        transition={{ delay: delay + 0.8, duration: 0.4 }}
      >
        <span 
          className="text-xs font-bold"
          style={{ color }}
        >
          {Math.round(currentValue)}
        </span>
      </motion.div>

      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
}