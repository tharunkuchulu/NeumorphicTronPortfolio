import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing");

  const loadingSteps = [
    { text: "Initializing", duration: 300 },
    { text: "Loading Assets", duration: 500 },
    { text: "Preparing Experience", duration: 400 },
    { text: "Optimizing Performance", duration: 300 },
    { text: "Ready", duration: 200 }
  ];

  useEffect(() => {
    let currentStep = 0;
    let currentProgress = 0;

    const interval = setInterval(() => {
      if (currentStep < loadingSteps.length) {
        setLoadingText(loadingSteps[currentStep].text);
        
        const stepProgress = 100 / loadingSteps.length;
        const targetProgress = (currentStep + 1) * stepProgress;
        
        const progressInterval = setInterval(() => {
          currentProgress += 2;
          setProgress(Math.min(currentProgress, targetProgress));
          
          if (currentProgress >= targetProgress) {
            clearInterval(progressInterval);
            currentStep++;
            
            if (currentStep >= loadingSteps.length) {
              setTimeout(() => {
                onLoadingComplete();
              }, 500);
            }
          }
        }, 20);
        
      } else {
        clearInterval(interval);
      }
    }, loadingSteps[currentStep]?.duration || 300);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-dark-bg z-50 flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
          {Array.from({ length: 96 }).map((_, i) => (
            <motion.div
              key={i}
              className="border border-tron/20"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.6, 0],
                scale: [1, 1.02, 1]
              }}
              transition={{
                duration: 2,
                delay: i * 0.01,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
        </div>
      </div>

      {/* Central Loading Content */}
      <div className="text-center z-10">
        {/* Logo/Brand */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 200 }}
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-tron to-blue-500 flex items-center justify-center">
            <motion.i
              className="fas fa-code text-2xl text-white"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.h2
          className="text-2xl font-bold text-white mb-2"
          key={loadingText}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {loadingText}
        </motion.h2>

        {/* Progress Bar */}
        <div className="w-80 max-w-sm mx-auto mb-4">
          <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-tron to-blue-500"
              style={{ 
                width: `${progress}%`,
                boxShadow: '0 0 10px rgba(0, 255, 255, 0.6)'
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
          <div className="text-sm text-gray-400 mt-2">
            {Math.round(progress)}%
          </div>
        </div>

        {/* Floating Particles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-tron rounded-full"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1.5, 0.5]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Subtitle */}
        <motion.p
          className="text-gray-400 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Crafting Digital Experiences
        </motion.p>
      </div>

      {/* Corner decorations */}
      {[
        { position: "top-4 left-4", rotate: 0 },
        { position: "top-4 right-4", rotate: 90 },
        { position: "bottom-4 left-4", rotate: 270 },
        { position: "bottom-4 right-4", rotate: 180 }
      ].map((corner, i) => (
        <motion.div
          key={i}
          className={`absolute ${corner.position} w-8 h-8`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ delay: i * 0.2, duration: 0.5 }}
          style={{ rotate: corner.rotate }}
        >
          <div className="w-full h-0.5 bg-tron" />
          <div className="w-0.5 h-full bg-tron absolute top-0 left-0" />
        </motion.div>
      ))}
    </motion.div>
  );
}