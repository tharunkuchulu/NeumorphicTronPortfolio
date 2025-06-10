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

  const generateGreeting = async () => {
    try {
      setIsLoading(true);
      
      const requestBody = {
        timeOfDay: new Date().getHours(),
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
      };

      const response = await fetch('/api/greeting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        setGreeting(data);
        setIsVisible(true);
      } else {
        throw new Error('Failed to generate greeting');
      }
    } catch (error) {
      console.error('Failed to generate AI greeting:', error);
      // Fallback greeting
      setGreeting({
        greeting: "Welcome to the future of development",
        context: "futuristic_fallback",
        timestamp: new Date().toISOString()
      });
      setIsVisible(true);
    } finally {
      setIsLoading(false);
    }
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
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40 max-w-md"
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
                delay: 1.5
              }
            }}
            exit={{ 
              opacity: 0, 
              y: -30, 
              scale: 0.95,
              transition: { duration: 0.3 }
            }}
          >
            <motion.div
              className="bg-black/80 backdrop-blur-md border border-tron/30 rounded-lg p-4 shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(0,40,70,0.8) 100%)',
                boxShadow: '0 0 30px rgba(0, 255, 255, 0.3)',
              }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 0 40px rgba(0, 255, 255, 0.4)',
                transition: { duration: 0.2 }
              }}
            >
              {/* Futuristic header */}
              <motion.div 
                className="flex items-center gap-2 mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 2 } }}
              >
                <div className="w-2 h-2 bg-tron rounded-full animate-pulse"></div>
                <span className="text-xs text-tron font-mono uppercase tracking-wider">
                  AI NEURAL INTERFACE
                </span>
                <div className="w-2 h-2 bg-tron rounded-full animate-pulse"></div>
              </motion.div>

              {/* Main greeting */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 2.2 } }}
              >
                <div className={`text-2xl mb-1 ${getGreetingClass()}`}>
                  {getGreetingIcon()}
                </div>
                <p className="text-white font-orbitron text-sm leading-relaxed">
                  {greeting.greeting}
                </p>
              </motion.div>

              {/* Futuristic elements */}
              <motion.div 
                className="flex justify-between items-center mt-3 pt-2 border-t border-tron/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 2.4 } }}
              >
                <span className="text-xs text-gray-400 font-mono">
                  {new Date().toLocaleTimeString()}
                </span>
                <button
                  onClick={() => setIsVisible(false)}
                  className="text-xs text-tron hover:text-white transition-colors duration-200 font-mono"
                >
                  [DISMISS]
                </button>
              </motion.div>

              {/* Regenerate button */}
              <motion.button
                onClick={generateGreeting}
                disabled={isLoading}
                className="w-full mt-2 py-1 text-xs text-tron border border-tron/30 rounded hover:bg-tron/10 transition-all duration-200 font-mono disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 2.6 } }}
              >
                {isLoading ? '[PROCESSING...]' : '[REGENERATE]'}
              </motion.button>

              {/* Animated border effect */}
              <motion.div
                className="absolute inset-0 rounded-lg border border-tron/20 pointer-events-none"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(0, 255, 255, 0.3)',
                    '0 0 30px rgba(0, 255, 255, 0.5)',
                    '0 0 20px rgba(0, 255, 255, 0.3)',
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}