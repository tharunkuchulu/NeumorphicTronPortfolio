import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const titles = [
    "Python Full Stack Developer",
    "AI Enthusiast", 
    "Problem Solver"
  ];

  useEffect(() => {
    const currentTitle = titles[currentTitleIndex];
    let timeout: NodeJS.Timeout | undefined;

    if (!isDeleting) {
      // Typing effect
      if (displayText.length < currentTitle.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentTitle.substring(0, displayText.length + 1));
        }, 150);
      } else {
        // Pause before starting to delete
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    } else {
      // Deleting effect
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentTitle.substring(0, displayText.length - 1));
        }, 100);
      } else {
        // Move to next title
        setIsDeleting(false);
        setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
        return; // No timeout to clear
      }
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [displayText, isDeleting, currentTitleIndex, titles]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  const handleDownloadResume = () => {
    // Create a temporary link element to download the resume
    const link = document.createElement('a');
    link.href = '/api/download-resume';
    link.download = 'Tharun_Vankayala_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewProjects = () => {
    const projectsSection = document.querySelector('#projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden performance-optimized">
      {/* Optimized Circuit Board Background */}
      <div className="absolute inset-0 opacity-20 circuit-board">
        {/* Static Circuit Lines */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-tron/60 to-transparent"
            style={{ top: `${(i + 1) * 20}%` }}
          />
        ))}
        
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute h-full w-0.5 bg-gradient-to-b from-transparent via-tron/60 to-transparent"
            style={{ left: `${(i + 1) * 25}%` }}
          />
        ))}

        {/* Static Circuit Nodes */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={`node-${i}`}
            className="absolute w-2 h-2 rounded-full bg-tron/70"
            style={{
              left: `${20 + (i % 3) * 30}%`,
              top: `${30 + Math.floor(i / 3) * 40}%`,
              boxShadow: '0 0 6px rgba(0, 255, 255, 0.6)'
            }}
          />
        ))}
      </div>

      {/* Simplified Geometric Shapes */}
      <motion.div 
        className="absolute top-20 left-16 w-16 h-16 border-2 border-tron/40"
        animate={{ 
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="absolute top-32 right-20 w-12 h-12 border-2 border-tron/30 rotate-45" />

      <motion.div 
        className="absolute bottom-32 left-20 w-20 h-20 border border-tron/25 rounded-full"
        animate={{ 
          opacity: [0.25, 0.5, 0.25]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      <motion.div 
        className="absolute bottom-40 right-16"
        animate={{ 
          y: [-8, 8, -8],
          rotate: [0, -360]
        }}
        transition={{ 
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5
        }}
      >
        <div className="w-14 h-14 border-2 border-tron/35 transform rotate-45">
          <div className="w-6 h-6 border border-tron/50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
        </div>
      </motion.div>

      {/* Floating Hexagons */}
      <motion.div 
        className="absolute top-1/2 left-8"
        animate={{ 
          y: [-12, 12, -12],
          rotate: [0, 120, 240, 360]
        }}
        transition={{ 
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-10 h-10 border border-tron/40 transform rotate-45 clip-path-hexagon"></div>
      </motion.div>
      
      {/* Optimized Floating Data Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none particle-system">
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full floating-particle"
            style={{
              left: `${20 + i * 20}%`,
              top: `100%`,
              width: `2px`,
              height: `2px`,
              background: `#00ffff`,
              boxShadow: `0 0 6px rgba(0, 255, 255, 0.5)`
            }}
            animate={{
              y: [0, -500],
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration: 6,
              delay: i * 1.5,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 3
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Enhanced Title with Holographic Effect */}
          <motion.h1 
            className="font-orbitron text-5xl md:text-7xl font-bold mb-6 text-glow relative"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.span
              className="relative inline-block"
              animate={{
                textShadow: [
                  '0 0 30px rgba(0, 255, 255, 0.5)',
                  '0 0 50px rgba(0, 255, 255, 0.8)',
                  '0 0 30px rgba(0, 255, 255, 0.5)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Tharun Vankayala
              
              {/* Holographic Scan Line */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-tron/20 to-transparent"
                animate={{
                  x: ['-100%', '200%']
                }}
                transition={{
                  duration: 4,
                  delay: 2,
                  repeat: Infinity,
                  repeatDelay: 8
                }}
              />
            </motion.span>
          </motion.h1>
          
          <div className="text-xl md:text-2xl mb-8 text-gray-300 h-12 flex items-center justify-center">
            <motion.span 
              className="inline-block text-tron font-semibold relative"
              animate={{
                textShadow: [
                  '0 0 10px rgba(0, 255, 255, 0.5)',
                  '0 0 20px rgba(0, 255, 255, 0.8)',
                  '0 0 10px rgba(0, 255, 255, 0.5)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {/* Terminal Prompt */}
              <span className="text-gray-500 font-mono mr-2">$</span>
              
              {/* Glitch Effect Container */}
              <motion.span
                className="relative"
                animate={{
                  x: [0, 1, -1, 0],
                  textShadow: [
                    '0 0 0 rgba(255, 0, 0, 0)',
                    '2px 0 0 rgba(255, 0, 0, 0.1)',
                    '-2px 0 0 rgba(0, 255, 0, 0.1)',
                    '0 0 0 rgba(255, 0, 0, 0)'
                  ]
                }}
                transition={{
                  duration: 0.1,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut"
                }}
              >
                {displayText}
              </motion.span>
              
              {/* Enhanced Terminal Cursor */}
              <motion.span 
                className="inline-block w-3 h-6 bg-tron ml-1 relative"
                animate={{ 
                  opacity: [1, 1, 0, 0],
                  scaleY: [1, 1, 0.1, 1]
                }}
                transition={{ 
                  duration: 1.2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-tron"
                  animate={{
                    boxShadow: [
                      '0 0 5px rgba(0, 255, 255, 0.5)',
                      '0 0 15px rgba(0, 255, 255, 1)',
                      '0 0 5px rgba(0, 255, 255, 0.5)'
                    ]
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </motion.span>
            </motion.span>
          </div>
          
          <motion.p 
            className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-gray-400 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            Building scalable web applications with FastAPI, React.js, and AWS. 
            Passionate about AI-driven development and cloud computing solutions.
          </motion.p>


          
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.8 }}
          >
            <motion.button 
              onClick={handleDownloadResume}
              className="glass-card px-8 py-4 text-tron font-semibold rounded-lg border border-tron/30 hover:border-tron hover:text-white hover:bg-tron/10 transition-all duration-300 relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center">
                <i className="fas fa-download mr-2"></i>
                Download Resume
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-tron/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </motion.button>
            
            <motion.button 
              onClick={handleViewProjects}
              className="glass-card px-8 py-4 text-white font-semibold rounded-lg border border-gray-600/30 hover:border-tron hover:text-tron hover:bg-tron/10 transition-all duration-300 relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center">
                <i className="fas fa-rocket mr-2"></i>
                View Projects
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-tron/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
