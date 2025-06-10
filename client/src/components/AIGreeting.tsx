import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GreetingData {
  greeting: string;
  context: string;
  timestamp: string;
}

export default function AIGreeting() {
  const [greeting, setGreeting] = useState<GreetingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const generateFallbackGreeting = () => {
    const hour = new Date().getHours();
    const timeContext = hour < 6 ? "night" : hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening";
    
    const greetings = {
      morning: [
        "Neural networks online. Good morning, innovator.",
        "Systems initialized. Ready to explore groundbreaking solutions?",
        "AI interface active. Morning protocols engaged.",
        "Dawn brings new algorithms. Welcome to the future."
      ],
      afternoon: [
        "Quantum processors running. Afternoon, visionary.",
        "Data streams optimized. Ready for innovative breakthroughs?",
        "Cybernetic interface loaded. Afternoon protocols active.",
        "Advanced systems online. Welcome to digital evolution."
      ],
      evening: [
        "Evening subroutines activated. Welcome, tech pioneer.",
        "Neon circuits glowing. Ready to explore next-gen solutions?",
        "Twilight algorithms engaged. Evening interface ready.",
        "Digital horizons await. Welcome to the neural network."
      ],
      night: [
        "Midnight protocols active. Welcome, code architect.",
        "Night vision enhanced. Ready for futuristic exploration?",
        "Nocturnal systems online. Welcome to the matrix.",
        "Stars align with circuits. Welcome to digital infinity."
      ]
    };

    const contextGreetings = greetings[timeContext as keyof typeof greetings];
    const randomGreeting = contextGreetings[Math.floor(Math.random() * contextGreetings.length)];
    
    return {
      greeting: randomGreeting,
      context: timeContext,
      timestamp: new Date().toISOString()
    };
  };

  const generateGreeting = async () => {
    setIsLoading(true);
    
    // Simulate AI processing time for authentic feel
    setTimeout(() => {
      const fallbackGreeting = generateFallbackGreeting();
      setGreeting(fallbackGreeting);
      if (!isVisible) {
        setIsVisible(true);
      }
      setIsLoading(false);
    }, 1200);
  };

  useEffect(() => {
    // Generate greeting on component mount
    generateGreeting();
  }, []);

  const getGreetingIcon = () => {
    const hour = new Date().getHours();
    if (hour < 6) return "🌙";
    if (hour < 12) return "🌅";
    if (hour < 18) return "☀️";
    return "🌃";
  };

  const getGreetingClass = () => {
    const hour = new Date().getHours();
    if (hour < 6) return "text-purple-300";
    if (hour < 12) return "text-orange-300";
    if (hour < 18) return "text-yellow-300";
    return "text-blue-300";
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {isVisible && greeting && (
          <motion.div
            className="fixed top-6 right-6 z-50 w-80"
            initial={{ opacity: 0, x: 400, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              x: 0, 
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 400,
                damping: 30,
                delay: 2
              }
            }}
            exit={{ 
              opacity: 0, 
              x: 400, 
              scale: 0.8,
              transition: { duration: 0.4 }
            }}
          >
            <motion.div
              className="relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(0,50,100,0.9) 50%, rgba(0,0,0,0.95) 100%)',
                border: '2px solid transparent',
                borderRadius: '16px',
                padding: '20px',
                boxShadow: '0 20px 40px rgba(0, 255, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              {/* Animated border effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-75"
                style={{
                  background: 'linear-gradient(45deg, transparent, rgba(0, 255, 255, 0.3), transparent)',
                  backgroundSize: '400% 400%'
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              />

              {/* Futuristic header */}
              <motion.div 
                className="relative flex items-center justify-between mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 2.2 } }}
              >
                <div className="flex items-center gap-2">
                  <motion.div 
                    className="w-3 h-3 bg-tron rounded-full"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-xs text-tron font-mono uppercase tracking-wider font-bold">
                    ARIA NEURAL INTERFACE
                  </span>
                  <motion.div 
                    className="w-3 h-3 bg-tron rounded-full"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <motion.button
                  onClick={() => setIsVisible(false)}
                  className="text-tron/60 hover:text-tron transition-colors duration-200 text-lg"
                  whileHover={{ scale: 1.2, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ✕
                </motion.button>
              </motion.div>

              {/* Main greeting */}
              <motion.div
                className="relative text-center mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 2.4 } }}
              >
                <motion.div 
                  className={`text-3xl mb-3 ${getGreetingClass()}`}
                  animate={{ 
                    textShadow: [
                      '0 0 10px rgba(0, 255, 255, 0.5)',
                      '0 0 20px rgba(0, 255, 255, 0.8)',
                      '0 0 10px rgba(0, 255, 255, 0.5)',
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {getGreetingIcon()}
                </motion.div>
                <motion.p 
                  className="text-white font-orbitron text-base leading-relaxed px-2"
                  style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.3)' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 2.6 } }}
                >
                  {greeting.greeting}
                </motion.p>
              </motion.div>

              {/* Control panel */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 2.8 } }}
              >
                {/* Status bar */}
                <div className="flex justify-between items-center mb-3 text-xs text-tron/70 font-mono">
                  <span>{new Date().toLocaleTimeString()}</span>
                  <span>ONLINE</span>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2">
                  <motion.button
                    onClick={() => generateGreeting()}
                    disabled={isLoading}
                    className="flex-1 py-2 px-4 bg-tron/10 border border-tron/30 rounded-lg text-xs text-tron font-mono hover:bg-tron/20 transition-all duration-200 disabled:opacity-50"
                    whileHover={{ scale: 1.02, boxShadow: '0 0 15px rgba(0, 255, 255, 0.3)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isLoading ? 'PROCESSING...' : 'REGENERATE'}
                  </motion.button>
                  <motion.button
                    onClick={() => setIsVisible(false)}
                    className="py-2 px-4 bg-red-500/10 border border-red-500/30 rounded-lg text-xs text-red-400 font-mono hover:bg-red-500/20 transition-all duration-200"
                    whileHover={{ scale: 1.02, boxShadow: '0 0 15px rgba(255, 0, 0, 0.3)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    DISMISS
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}