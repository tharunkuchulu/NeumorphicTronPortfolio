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
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Floating 3D Elements */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-20 h-20 border-2 border-tron rounded-full opacity-20"
        animate={{ 
          y: [-10, 10, -10],
          rotate: [0, 180, 360]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-16 h-16 border-2 border-tron opacity-30"
        animate={{ 
          y: [10, -10, 10],
          rotate: [0, -180, -360]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.h1 
            className="font-orbitron text-5xl md:text-7xl font-bold mb-6 text-glow"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Tharun Vankayala
          </motion.h1>
          
          <div className="text-xl md:text-2xl mb-8 text-gray-300 h-12 flex items-center justify-center">
            <motion.span 
              className="inline-block text-tron font-semibold"
              animate={{
                textShadow: [
                  '0 0 10px rgba(0, 255, 255, 0.5)',
                  '0 0 20px rgba(0, 255, 255, 0.8)',
                  '0 0 10px rgba(0, 255, 255, 0.5)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {displayText}
              {showCursor && (
                <motion.span 
                  className="border-r-2 border-tron ml-1"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  |
                </motion.span>
              )}
            </motion.span>
          </div>
          
          <motion.p 
            className="text-lg md:text-xl mb-12 max-w-3xl mx-auto text-gray-400 leading-relaxed"
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
