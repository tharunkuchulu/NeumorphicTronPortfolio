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
        
        {/* Enhanced 3D Holographic Carousel */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative h-[500px] overflow-hidden">
            {/* Holographic Grid Background */}
            <div className="absolute inset-0 opacity-20">
              <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
                {Array.from({ length: 96 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="border border-tron/10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.5, 0] }}
                    transition={{ 
                      duration: 4, 
                      delay: i * 0.05, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Floating Particle Field */}
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-tron rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
                animate={{
                  y: [0, -50, 0],
                  opacity: [0.3, 1, 0.3],
                  scale: [0.5, 1.5, 0.5]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-96 h-96" style={{ perspective: '1200px' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    className="absolute inset-0"
                    initial={{ 
                      rotateY: 90, 
                      opacity: 0, 
                      scale: 0.8,
                      z: -200
                    }}
                    animate={{ 
                      rotateY: 0, 
                      opacity: 1, 
                      scale: 1,
                      z: 0
                    }}
                    exit={{ 
                      rotateY: -90, 
                      opacity: 0, 
                      scale: 0.8,
                      z: -200
                    }}
                    transition={{ 
                      duration: 0.8, 
                      ease: "easeInOut",
                      type: "spring",
                      stiffness: 100
                    }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <motion.div 
                      className="relative w-full h-full"
                      animate={{
                        rotateY: [0, 5, -5, 0],
                        rotateX: [0, 2, -2, 0]
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {/* Main Holographic Card */}
                      <div className="glass-card p-8 rounded-3xl h-full flex flex-col justify-center items-center text-center relative overflow-hidden border-2 border-tron/50 backdrop-blur-lg">
                        {/* Holographic Shimmer Effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-tron/20 to-transparent"
                          animate={{ x: ['-100%', '200%'] }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          style={{ transform: 'skewX(-20deg)' }}
                        />

                        {/* Dynamic Background Gradient */}
                        <motion.div 
                          className="absolute inset-0 opacity-30"
                          animate={{
                            background: [
                              'radial-gradient(circle at 30% 40%, rgba(0, 255, 255, 0.3) 0%, transparent 50%)',
                              'radial-gradient(circle at 70% 60%, rgba(0, 255, 255, 0.3) 0%, transparent 50%)',
                              'radial-gradient(circle at 30% 40%, rgba(0, 255, 255, 0.3) 0%, transparent 50%)'
                            ]
                          }}
                          transition={{ duration: 4, repeat: Infinity }}
                        />
                        
                        {/* Orbiting Elements */}
                        {Array.from({ length: 6 }).map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-tron rounded-full"
                            style={{
                              left: '50%',
                              top: '50%',
                              transformOrigin: `${80 + i * 20}px 0px`
                            }}
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 8 + i * 2,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                          />
                        ))}

                        <div className="relative z-10">
                          {/* Enhanced Icon with Particle Effects */}
                          <motion.div
                            className="mb-8 relative"
                            whileHover={{ 
                              scale: 1.2, 
                              rotateY: 180,
                              z: 50
                            }}
                            transition={{ duration: 0.6 }}
                          >
                            {/* Icon Glow Ring */}
                            <motion.div
                              className="absolute inset-0 rounded-full border-2 border-tron"
                              animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 1, 0.5]
                              }}
                              transition={{ duration: 2, repeat: Infinity }}
                              style={{ padding: '20px' }}
                            />
                            
                            <motion.i
                              className={`${carouselProjects[currentSlide].icon} text-tron text-7xl relative z-10`}
                              animate={{ 
                                rotateZ: [0, 360],
                                filter: [
                                  'drop-shadow(0 0 10px rgba(0, 255, 255, 0.5))',
                                  'drop-shadow(0 0 20px rgba(0, 255, 255, 0.8))',
                                  'drop-shadow(0 0 10px rgba(0, 255, 255, 0.5))'
                                ]
                              }}
                              transition={{ 
                                rotateZ: { duration: 8, repeat: Infinity, ease: "linear" },
                                filter: { duration: 2, repeat: Infinity }
                              }}
                            />
                          </motion.div>
                          
                          {/* Enhanced Text with Glitch Effect */}
                          <motion.h3 
                            className="font-orbitron text-3xl font-bold text-white mb-3"
                            animate={{
                              textShadow: [
                                '0 0 10px rgba(0, 255, 255, 0.5)',
                                '0 0 20px rgba(0, 255, 255, 0.8)',
                                '0 0 10px rgba(0, 255, 255, 0.5)'
                              ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            {carouselProjects[currentSlide].title}
                          </motion.h3>
                          
                          <motion.p 
                            className="text-tron text-xl mb-6"
                            initial={{ opacity: 0.7 }}
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          >
                            {carouselProjects[currentSlide].subtitle}
                          </motion.p>
                          
                          {/* Enhanced Category Tags */}
                          <div className="flex justify-center gap-4 text-sm">
                            <motion.span 
                              className="bg-tron/30 border border-tron px-4 py-2 rounded-full backdrop-blur-sm"
                              whileHover={{ 
                                scale: 1.05,
                                boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)'
                              }}
                            >
                              {carouselProjects[currentSlide].category}
                            </motion.span>
                            <motion.span 
                              className="bg-tron/30 border border-tron px-4 py-2 rounded-full backdrop-blur-sm"
                              whileHover={{ 
                                scale: 1.05,
                                boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)'
                              }}
                            >
                              {carouselProjects[currentSlide].year}
                            </motion.span>
                          </div>
                        </div>

                        {/* Holographic Edge Lines */}
                        <div className="absolute inset-2 border border-tron/30 rounded-2xl pointer-events-none">
                          <motion.div
                            className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-tron"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <motion.div
                            className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-tron"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                          />
                          <motion.div
                            className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-tron"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                          />
                          <motion.div
                            className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-tron"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            
            {/* Enhanced Carousel Indicators */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
              {carouselProjects.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`relative w-4 h-4 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-tron' : 'bg-gray-600'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {index === currentSlide && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-tron"
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Navigation Arrows */}
            <motion.button
              className="absolute left-8 top-1/2 transform -translate-y-1/2 glass-card p-3 rounded-full border border-tron/30 hover:border-tron transition-all duration-300"
              onClick={() => setCurrentSlide((prev) => (prev - 1 + carouselProjects.length) % carouselProjects.length)}
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className="fas fa-chevron-left text-tron"></i>
            </motion.button>

            <motion.button
              className="absolute right-8 top-1/2 transform -translate-y-1/2 glass-card p-3 rounded-full border border-tron/30 hover:border-tron transition-all duration-300"
              onClick={() => setCurrentSlide((prev) => (prev + 1) % carouselProjects.length)}
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className="fas fa-chevron-right text-tron"></i>
            </motion.button>
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
                      className="flex-1 text-center bg-gray-600 text-gray-300 px-4 py-2 text-sm font-semibold rounded-lg cursor-not-allowed hover:bg-gray-500 transition-all duration-300"
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
