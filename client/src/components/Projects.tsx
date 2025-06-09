import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

const projects = [
  {
    id: 1,
    title: "MovieFlix",
    shortDesc: "Movie Rating Platform",
    overview: "Comprehensive movie discovery platform with user ratings, reviews, and personalized recommendations. Features real-time data from TMDB API with Redux state management and advanced filtering capabilities.",
    tech: ["React.js", "Redux", "TMDB API", "CSS3", "JavaScript", "Node.js"],
    projectType: "Full-Stack Web Application",
    expertise: "Advanced",
    status: "Completed",
    duration: "3 months",
    icon: "fas fa-film",
    github: "https://github.com/tharunkuchulu/MovieFlix",
    demo: null,
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 2,
    title: "AWS S3 Bucket Management",
    shortDesc: "Cloud Infrastructure",
    overview: "Automated cloud infrastructure deployment using boto3. Streamlined S3 bucket creation, configuration, and management with enhanced security protocols and monitoring capabilities.",
    tech: ["Python", "AWS SDK", "boto3", "S3", "CloudFormation", "IAM"],
    projectType: "Cloud Infrastructure Tool",
    expertise: "Expert",
    status: "Completed",
    duration: "2 months",
    icon: "fab fa-aws",
    github: "https://github.com/tharunkuchulu/AWS-S3-Bucket-creation",
    demo: null,
    color: "from-orange-500 to-red-500"
  },
  {
    id: 3,
    title: "Advanced ATS Scanner",
    shortDesc: "AI Resume Analyzer",
    overview: "Intelligent resume screening system powered by AI. Uses RAG technology for precise job-resume matching with detailed compatibility analysis and automated scoring algorithms.",
    tech: ["FastAPI", "OpenAI", "Pinecone", "Python", "RAG", "NLP"],
    projectType: "AI/ML Application",
    expertise: "Expert",
    status: "In Development",
    duration: "4 months",
    icon: "fas fa-robot",
    github: "https://github.com/tharunkuchulu/Advanced-ATS-Scanner",
    demo: null,
    color: "from-green-500 to-teal-500"
  },
  {
    id: 4,
    title: "Social Video Downloader",
    shortDesc: "Bulk Media Processor",
    overview: "Bulk video processing application for Instagram, YouTube, and Twitter. Excel-based batch processing with secure cookie authentication and yt-dlp integration for seamless downloads.",
    tech: ["React.js", "FastAPI", "yt-dlp", "Pandas", "Excel", "Python"],
    projectType: "Full-Stack Tool",
    expertise: "Advanced",
    status: "Completed",
    duration: "2 months",
    icon: "fas fa-download",
    github: "https://github.com/tharunkuchulu/Social-Video-Downloader",
    demo: "https://social-video-downloader-1.onrender.com/",
    color: "from-blue-500 to-cyan-500"
  }
];

export default function Projects() {
  const controls = useAnimation();
  const { ref } = useScrollAnimation();
  const [activeProject, setActiveProject] = useState(0);

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  const nextProject = () => {
    setActiveProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setActiveProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const getExpertiseColor = (expertise: string) => {
    switch (expertise) {
      case 'Beginner': return 'text-green-400 border-green-400 bg-green-400/10';
      case 'Intermediate': return 'text-yellow-400 border-yellow-400 bg-yellow-400/10';
      case 'Advanced': return 'text-orange-400 border-orange-400 bg-orange-400/10';
      case 'Expert': return 'text-red-400 border-red-400 bg-red-400/10';
      default: return 'text-gray-400 border-gray-400 bg-gray-400/10';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'text-green-400 bg-green-400/20 border-green-400/30';
      case 'In Development': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      case 'Planning': return 'text-blue-400 bg-blue-400/20 border-blue-400/30';
      default: return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
    }
  };

  return (
    <section ref={ref} id="projects" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 gap-4 h-full">
          {Array.from({ length: 144 }).map((_, i) => (
            <motion.div
              key={i}
              className="border border-tron/20"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.3, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 3,
                delay: i * 0.02,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={controls}
          variants={{
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.8 }
            }
          }}
        >
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-tron px-4 relative z-10"
            style={{ 
              textShadow: '0 0 20px rgba(0, 255, 255, 0.5), 0 0 40px rgba(0, 255, 255, 0.3)'
            }}
          >
            Featured Projects
          </motion.h2>
          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-transparent via-tron to-transparent mx-auto mb-8"
            initial={{ scaleX: 0 }}
            animate={controls}
            variants={{
              visible: { 
                scaleX: 1,
                transition: { duration: 1, delay: 0.5 }
              }
            }}
          />
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={controls}
            variants={{
              visible: { 
                opacity: 1,
                transition: { duration: 0.8, delay: 0.3 }
              }
            }}
          >
            Explore my innovative projects showcasing cutting-edge technologies and creative solutions across various domains.
          </motion.p>
        </motion.div>

        {/* Enhanced Big Card Carousel Container */}
        <div className="relative h-[700px] mb-12 bg-gradient-to-br from-gray-900/50 via-black/30 to-gray-800/50 rounded-3xl border border-tron/20 backdrop-blur-sm overflow-hidden">
          {/* Floating Particles Background */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-tron/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.3, 1, 0.3],
                  scale: [0.5, 1.2, 0.5]
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>

          {/* Main Featured Project Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`project-${activeProject}`}
              className="absolute inset-4 glass-card overflow-hidden"
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <div className="h-full p-8 flex flex-col lg:flex-row gap-8 performance-optimized">
              {/* Left: Project Icon & Meta */}
              <div className="lg:w-1/3 flex flex-col items-center justify-center relative">
                {/* Project Icon Container with Fixed Circles */}
                <div className="relative flex items-center justify-center mb-6">
                  {/* Rotating Rings - Positioned around the icon */}
                  <motion.div
                    className="absolute w-40 h-40 rounded-full border-2 border-tron/20"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute w-32 h-32 rounded-full border border-tron/40"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />

                  {/* Project Icon */}
                  <motion.div
                    className={`w-28 h-28 rounded-full bg-gradient-to-br ${projects[activeProject].color} flex items-center justify-center relative z-10 shadow-2xl`}
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    transition={{ duration: 0.4 }}
                  >
                    <i className={`${projects[activeProject].icon} text-4xl text-white`}></i>
                  </motion.div>
                </div>
                
                <motion.h3 
                  className="text-3xl font-bold text-white mb-3 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {projects[activeProject].title}
                </motion.h3>
                
                <motion.div
                  className={`px-4 py-2 rounded-full border text-sm font-semibold ${getExpertiseColor(projects[activeProject].expertise)}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {projects[activeProject].expertise} Level
                </motion.div>
              </div>

              {/* Right: Project Details */}
              <div className="lg:w-2/3 flex flex-col justify-center">
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h4 className="text-sm font-semibold text-tron mb-3 tracking-wider">PROJECT OVERVIEW</h4>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {projects[activeProject].overview}
                  </p>
                </motion.div>

                {/* Project Meta Grid */}
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-tron/20">
                    <h5 className="text-xs font-semibold text-tron mb-2 tracking-wider">PROJECT TYPE</h5>
                    <p className="text-white text-sm">{projects[activeProject].projectType}</p>
                  </div>
                  <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-tron/20">
                    <h5 className="text-xs font-semibold text-tron mb-2 tracking-wider">STATUS</h5>
                    <span className={`text-xs px-3 py-1 rounded-full border ${getStatusColor(projects[activeProject].status)}`}>
                      {projects[activeProject].status}
                    </span>
                  </div>
                  <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-tron/20">
                    <h5 className="text-xs font-semibold text-tron mb-2 tracking-wider">DURATION</h5>
                    <p className="text-white text-sm">{projects[activeProject].duration}</p>
                  </div>
                </motion.div>

                {/* Tech Stack */}
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <h4 className="text-sm font-semibold text-tron mb-3 tracking-wider">TECH STACK</h4>
                  <div className="flex flex-wrap gap-2">
                    {projects[activeProject].tech.map((tech, index) => (
                      <motion.span
                        key={index}
                        className="px-3 py-2 bg-tron/20 text-tron text-sm rounded-lg border border-tron/30 hover:bg-tron/30 hover:scale-105 transition-all duration-300"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + index * 0.05 }}
                        whileHover={{ y: -2 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  className="flex flex-col xs:flex-row gap-2 xs:gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <a 
                    href={projects[activeProject].github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 text-center border-2 border-tron px-3 xs:px-4 sm:px-6 py-2 xs:py-2.5 sm:py-3 bg-transparent text-tron font-semibold rounded-lg xs:rounded-xl hover:bg-tron hover:text-black hover:scale-105 transition-all duration-300 transform hover:shadow-2xl hover:shadow-tron/60 hover:border-cyan-300 text-xs xs:text-sm sm:text-base min-w-0"
                    style={{ 
                      transition: 'all 0.3s ease',
                      boxShadow: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 255, 247, 0.6), 0 0 60px rgba(0, 255, 247, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <i className="fab fa-github mr-2"></i>View Code
                  </a>
                  
                  {projects[activeProject].demo ? (
                    <a 
                      href={projects[activeProject].demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 text-center bg-gradient-to-r from-tron to-cyan-400 text-black px-3 xs:px-4 sm:px-6 py-2 xs:py-2.5 sm:py-3 font-semibold rounded-lg xs:rounded-xl hover:from-cyan-300 hover:to-blue-400 hover:scale-110 transition-all duration-300 transform hover:shadow-2xl hover:shadow-cyan-400/80 border border-tron/30 hover:border-cyan-300 text-xs xs:text-sm sm:text-base min-w-0"
                      style={{ 
                        transition: 'all 0.3s ease',
                        boxShadow: '0 0 15px rgba(0, 255, 247, 0.3)',
                        textShadow: '0 0 10px rgba(0, 0, 0, 0.5)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 0 40px rgba(0, 255, 247, 1), 0 0 80px rgba(0, 255, 247, 0.7), 0 0 120px rgba(0, 255, 247, 0.4)';
                        e.currentTarget.style.transform = 'scale(1.1) translateY(-2px)';
                        e.currentTarget.style.background = 'linear-gradient(45deg, #00ffff, #0099ff)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 255, 247, 0.3)';
                        e.currentTarget.style.transform = 'scale(1) translateY(0px)';
                        e.currentTarget.style.background = 'linear-gradient(to right, #00ffff, #22d3ee)';
                      }}
                    >
                      <i className="fas fa-external-link-alt mr-2"></i>Live Demo
                    </a>
                  ) : (
                    <div className="flex-1 text-center bg-gray-700 text-gray-400 px-3 xs:px-4 sm:px-6 py-2 xs:py-2.5 sm:py-3 font-semibold rounded-lg xs:rounded-xl cursor-not-allowed opacity-60 text-xs xs:text-sm sm:text-base min-w-0">
                      <i className="fas fa-clock mr-1 xs:mr-2"></i>Demo Soon
                    </div>
                  )}
                </motion.div>
              </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Small Cards Navigation with Arrows */}
        <div className="relative flex items-center justify-center gap-6 pb-6">
          {/* Previous Arrow */}
          <motion.button
            onClick={prevProject}
            className="w-12 h-12 rounded-full bg-tron/20 border border-tron/30 flex items-center justify-center text-tron hover:bg-tron hover:text-black transition-all duration-300 hover:shadow-lg hover:shadow-tron/50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fas fa-chevron-left text-lg"></i>
          </motion.button>

          {/* Small Cards Container */}
          <div className="flex gap-3 sm:gap-4 overflow-x-auto sm:overflow-hidden px-4 sm:px-0 scrollbar-hide">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className={`w-[180px] sm:w-[220px] h-24 sm:h-28 glass-card cursor-pointer relative overflow-hidden group transition-all duration-500 ${
                  index === activeProject ? 'ring-2 ring-tron shadow-xl shadow-tron/30 scale-105' : 'hover:scale-102'
                }`}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveProject(index)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  scale: index === activeProject ? 1.05 : 1
                }}
                transition={{ 
                  delay: index * 0.1,
                  duration: 0.5,
                  ease: "easeOut"
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
                <div className="relative z-10 p-3 sm:p-4 h-full flex items-center gap-3 sm:gap-4">
                  <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br ${project.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    <i className={`${project.icon} text-white text-sm sm:text-lg`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-white text-xs sm:text-sm truncate group-hover:text-tron transition-colors duration-300">
                      {project.title}
                    </h4>
                    <p className="text-gray-400 text-xs truncate hidden sm:block">{project.shortDesc}</p>
                    <div className={`text-xs px-2 py-0.5 sm:py-1 rounded-full border mt-1 inline-block ${getExpertiseColor(project.expertise)}`}>
                      {project.expertise}
                    </div>
                  </div>
                </div>
                
                {/* Active Indicator */}
                {index === activeProject && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-tron to-cyan-400"
                    layoutId="activeIndicator"
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Next Arrow */}
          <motion.button
            onClick={nextProject}
            className="w-12 h-12 rounded-full bg-tron/20 border border-tron/30 flex items-center justify-center text-tron hover:bg-tron hover:text-black transition-all duration-300 hover:shadow-lg hover:shadow-tron/50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fas fa-chevron-right text-lg"></i>
          </motion.button>
        </div>

        {/* View All Projects Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.8, delay: 1 }
            }
          }}
        >
          <motion.a
            href="https://github.com/tharunkuchulu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-tron to-cyan-400 text-black font-bold rounded-full hover:from-cyan-400 hover:to-tron transition-all duration-300 shadow-xl hover:shadow-tron/50 transform hover:scale-105 border-2 border-tron/50 hover:border-cyan-300 text-sm sm:text-base"
            style={{
              background: 'linear-gradient(45deg, #00ffff, #22d3ee)',
              boxShadow: '0 0 20px rgba(0, 255, 255, 0.6), 0 4px 15px rgba(0, 0, 0, 0.3)',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)'
            }}
            whileHover={{ 
              boxShadow: "0 20px 40px rgba(0, 255, 247, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fab fa-github mr-2 sm:mr-3"></i>
            <span className="hidden sm:inline">View All Projects on GitHub</span>
            <span className="sm:hidden">GitHub Projects</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}