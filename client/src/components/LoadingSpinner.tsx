import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: string;
  className?: string;
}

export function LoadingSpinner({ 
  size = "md", 
  color = "tron", 
  className = "" 
}: LoadingSpinnerProps) {
  const sizeMap = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        className={`${sizeMap[size]} border-2 border-gray-600 border-t-${color} rounded-full`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
}

interface LoadingStateProps {
  message?: string;
  fullScreen?: boolean;
}

export function LoadingState({ 
  message = "Loading...", 
  fullScreen = false 
}: LoadingStateProps) {
  const containerClass = fullScreen 
    ? "fixed inset-0 bg-dark-bg/80 backdrop-blur-sm z-50" 
    : "w-full py-12";

  return (
    <div className={`${containerClass} flex flex-col items-center justify-center`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-8 rounded-2xl"
      >
        <LoadingSpinner size="lg" />
        <motion.p
          className="text-gray-300 mt-4 font-orbitron"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {message}
        </motion.p>
      </motion.div>
    </div>
  );
}