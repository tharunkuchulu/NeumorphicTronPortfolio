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
        style={{ filter: 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.2))' }}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={bgColor}
          strokeWidth={strokeWidth}
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
            filter: `drop-shadow(0 0 8px ${color}80)`,
          }}
          transition={{
            strokeDashoffset: {
              duration: 2,
              ease: [0.25, 0.1, 0.25, 1]
            }
          }}
        />
      </svg>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
        {icon && (
          <motion.i
            className={`${icon} text-xl mb-2`}
            style={{ color }}
            initial={{ scale: 0 }}
            animate={{ scale: isVisible ? 1 : 0 }}
            transition={{ delay: delay + 0.5, duration: 0.5 }}
          />
        )}
        
        <motion.div
          className="text-2xl font-bold text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ delay: delay + 0.8, duration: 0.5 }}
        >
          {Math.round(currentValue)}%
        </motion.div>
        
        {label && (
          <motion.div
            className="text-xs text-gray-400 mt-1 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ delay: delay + 1, duration: 0.5 }}
          >
            {label}
          </motion.div>
        )}
      </div>

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