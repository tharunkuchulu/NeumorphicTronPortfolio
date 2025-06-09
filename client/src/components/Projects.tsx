import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import useScrollAnimation from "@/hooks/useScrollAnimation";

export default function Projects() {
  const { ref, controls } = useScrollAnimation();
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselProjects = [
    {
      title: "MovieFlix",
      subtitle: "Movie Rating Platform",
      icon: "fas fa-film",
      category: "Full-Stack Web App",
      year: "2024"
    },
    {
      title: "Cloud Automation",
      subtitle: "AWS Resource Manager",
      icon: "fab fa-aws",
      category: "Cloud Infrastructure",
      year: "2024"
    },
    {
      title: "ATS Scanner",
      subtitle: "AI Resume Analyzer",
      icon: "fas fa-robot",
      category: "AI/ML Application",
      year: "2024"
    },
    {
      title: "Social Video Downloader",
      subtitle: "Bulk Media Processor",
      icon: "fas fa-download",
      category: "Full-Stack Tool",
      year: "2024"
    }
  ];

  const projectTiles = [
    {
      title: "MovieFlix - Movie Rating App",
      description: "Comprehensive movie discovery platform with user ratings, reviews, and personalized recommendations. Features real-time data from TMDB API with Redux state management.",
      icon: "fas fa-film",
      technologies: ["React.js", "Redux", "TMDB API", "CSS3"],
      github: "https://github.com/tharunkuchulu/MovieFlix",
      demo: null
    },
    {
      title: "AWS S3 Bucket Management",
      description: "Automated cloud infrastructure deployment using boto3. Streamlined S3 bucket creation, configuration, and management with enhanced security protocols.",
      icon: "fab fa-aws",
      technologies: ["Python", "AWS SDK", "boto3", "S3"],
      github: "https://github.com/tharunkuchulu/AWS-S3-Bucket-creation",
      demo: null
    },
    {
      title: "Advanced ATS Scanner",
      description: "Intelligent resume screening system powered by AI. Uses RAG technology for precise job-resume matching with detailed compatibility analysis.",
      icon: "fas fa-robot",
      technologies: ["FastAPI", "OpenAI", "Pinecone", "Python"],
      github: "https://github.com/tharunkuchulu/Advanced-ATS-Scanner",
      demo: null
    },
    {
      title: "Social Video Downloader",
      description: "Bulk video processing application for Instagram, YouTube, and Twitter. Excel-based batch processing with secure cookie authentication and yt-dlp integration.",
      icon: "fas fa-download",
      technologies: ["React.js", "FastAPI", "yt-dlp", "Pandas"],
      github: "https://github.com/tharunkuchulu/Social-Video-Downloader",
      demo: "https://social-video-downloader-1.onrender.com/"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselProjects.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [carouselProjects.length]);

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.h2 
          className="font-orbitron text-4xl font-bold text-center mb-16 text-tron"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          transition={{ duration: 0.8 }}
        >
          Featured Projects
        </motion.h2>
        
        {/* 3D Carousel */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative h-96 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-80 h-80" style={{ perspective: '1000px' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    className="absolute inset-0"
                    initial={{ rotateY: 90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    exit={{ rotateY: -90, opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div className="glass-card p-8 rounded-3xl h-full flex flex-col justify-center items-center text-center relative overflow-hidden border-2 border-tron/30">
                      {/* Background gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-tron/10 via-transparent to-cyan-500/10"></div>
                      
                      {/* Floating elements */}
                      <motion.div
                        className="absolute top-4 right-4 text-tron/30"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      >
                        <i className="fas fa-code text-lg"></i>
                      </motion.div>
                      
                      <motion.div
                        className="absolute bottom-4 left-4 text-tron/30"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <i className="fas fa-star text-sm"></i>
                      </motion.div>

                      <div className="relative z-10">
                        <motion.div
                          className="mb-6"
                          whileHover={{ scale: 1.1, rotate: 10 }}
                          transition={{ duration: 0.3 }}
                        >
                          <i className={`${carouselProjects[currentSlide].icon} text-tron text-6xl`}></i>
                        </motion.div>
                        
                        <h3 className="font-orbitron text-2xl font-bold text-white mb-2">
                          {carouselProjects[currentSlide].title}
                        </h3>
                        
                        <p className="text-tron text-lg mb-4">
                          {carouselProjects[currentSlide].subtitle}
                        </p>
                        
                        <div className="flex justify-center gap-4 text-sm text-gray-400">
                          <span className="bg-tron/20 px-3 py-1 rounded-full">
                            {carouselProjects[currentSlide].category}
                          </span>
                          <span className="bg-tron/20 px-3 py-1 rounded-full">
                            {carouselProjects[currentSlide].year}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            
            {/* Carousel indicators */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {carouselProjects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-tron' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Project Tiles */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="font-orbitron text-2xl font-semibold text-center mb-12 text-white">
            Project Portfolio
          </h3>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {projectTiles.map((project, index) => (
            <motion.div 
              key={project.title}
              className="glass-card p-8 rounded-2xl relative overflow-hidden group border border-tron/20 hover:border-tron/50 transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={controls}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.02, rotateX: 2, rotateY: 2 }}
            >
              {/* Background overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-tron/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <motion.div
                    className="text-tron text-3xl"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <i className={project.icon}></i>
                  </motion.div>
                  <div className="text-right">
                    <span className="text-xs text-gray-400 bg-tron/10 px-2 py-1 rounded-full">
                      2024
                    </span>
                  </div>
                </div>
                
                <h3 className="font-orbitron text-xl font-semibold mb-4 text-white group-hover:text-tron transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <motion.span 
                      key={tech}
                      className="bg-tron/20 text-tron px-3 py-1 rounded-full text-xs border border-tron/30"
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(0, 255, 255, 0.3)" }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  <motion.a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 text-center border border-tron px-4 py-2 bg-transparent text-tron text-sm font-semibold rounded-lg hover:bg-tron hover:text-black transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <i className="fab fa-github mr-2"></i>View Code
                  </motion.a>
                  
                  {project.demo ? (
                    <motion.a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 text-center bg-tron text-black px-4 py-2 text-sm font-semibold rounded-lg hover:bg-cyan-400 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <i className="fas fa-external-link-alt mr-2"></i>Live Demo
                    </motion.a>
                  ) : (
                    <motion.div 
                      className="flex-1 text-center bg-gray-600 text-gray-300 px-4 py-2 text-sm font-semibold rounded-lg cursor-not-allowed"
                      whileHover={{ scale: 1.02 }}
                    >
                      <i className="fas fa-clock mr-2"></i>Demo Soon
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
