import { useState, useEffect } from "react";

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
      if (displayText.length < currentTitle.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentTitle.substring(0, displayText.length + 1));
        }, 150);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentTitle.substring(0, displayText.length - 1));
        }, 100);
      } else {
        setIsDeleting(false);
        setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
        return;
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
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 md:pt-0">
      {/* Simplified Static Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-tron/40 to-transparent top-1/4" />
        <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-tron/40 to-transparent top-2/4" />
        <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-tron/40 to-transparent top-3/4" />
        <div className="absolute h-full w-0.5 bg-gradient-to-b from-transparent via-tron/40 to-transparent left-1/4" />
        <div className="absolute h-full w-0.5 bg-gradient-to-b from-transparent via-tron/40 to-transparent left-3/4" />
      </div>

      {/* Static Decorative Elements */}
      <div className="absolute top-20 left-16 w-16 h-16 border-2 border-tron/40" />
      <div className="absolute top-32 right-20 w-12 h-12 border-2 border-tron/30 rotate-45" />
      <div className="absolute bottom-32 left-20 w-20 h-20 border border-tron/25 rounded-full" />
      <div className="absolute bottom-40 right-16 w-14 h-14 border-2 border-tron/35 transform rotate-45">
        <div className="w-6 h-6 border border-tron/50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
      </div>
      <div className="absolute top-1/2 left-8 w-10 h-10 border border-tron/40 transform rotate-45"></div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="animate-fadeIn">
          {/* Optimized Title */}
          <h1 className="font-orbitron text-5xl md:text-7xl font-bold mb-6 text-white">
            <span className="relative inline-block text-tron" style={{ textShadow: '0 0 20px rgba(0, 255, 255, 0.6)' }}>
              Tharun Vankayala
            </span>
          </h1>
          
          <div className="text-xl md:text-2xl mb-8 text-gray-300 h-12 flex items-center justify-center">
            <span className="inline-block text-tron font-semibold relative">
              <span className="text-gray-500 font-mono mr-2">$</span>
              <span className="relative">{displayText}</span>
              <span 
                className={`inline-block w-3 h-6 bg-tron ml-1 transition-opacity duration-300 ${showCursor ? 'opacity-100' : 'opacity-0'}`}
              />
            </span>
          </div>
          
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-gray-400 leading-relaxed">
            Building scalable web applications with FastAPI, React.js, and AWS. 
            Passionate about AI-driven development and cloud computing solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button 
              onClick={handleDownloadResume}
              className="px-8 py-4 text-tron font-semibold rounded-lg border border-tron/30 hover:border-tron hover:text-white hover:bg-tron/10 transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center">
                <i className="fas fa-download mr-2"></i>
                Download Resume
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-tron/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            
            <button 
              onClick={handleViewProjects}
              className="px-8 py-4 text-white font-semibold rounded-lg border border-gray-600/30 hover:border-tron hover:text-tron hover:bg-tron/10 transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center">
                <i className="fas fa-rocket mr-2"></i>
                View Projects
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-tron/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}