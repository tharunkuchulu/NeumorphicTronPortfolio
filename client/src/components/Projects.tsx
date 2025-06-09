import { useState } from 'react';

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
  const [activeProject, setActiveProject] = useState(0);

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

  const currentProject = projects[activeProject];

  return (
    <section id="projects" className="py-20 bg-dark text-white relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-4 text-tron">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Innovative solutions showcasing expertise in full-stack development, AI/ML, and cloud technologies
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Project Display */}
          <div className="relative bg-dark-card/50 rounded-xl p-8 border border-gray-800/50 transition-all duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
              <div className="flex items-center mb-4 md:mb-0">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${currentProject.color} flex items-center justify-center mr-4 transition-all duration-500`}>
                  <i className={`${currentProject.icon} text-2xl text-white`}></i>
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{currentProject.title}</h3>
                  <p className="text-tron font-medium">{currentProject.shortDesc}</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <span className={`px-3 py-1 rounded-full border text-sm font-medium ${getExpertiseColor(currentProject.expertise)}`}>
                  {currentProject.expertise}
                </span>
                <span className={`px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(currentProject.status)}`}>
                  {currentProject.status}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold mb-4 text-tron">Project Overview</h4>
                <p className="text-gray-300 leading-relaxed mb-6">{currentProject.overview}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <span className="text-sm text-gray-400">Type</span>
                    <p className="text-white font-medium">{currentProject.projectType}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-400">Duration</span>
                    <p className="text-white font-medium">{currentProject.duration}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-4 text-tron">Technologies Used</h4>
                <div className="flex flex-wrap gap-2 mb-6">
                  {currentProject.tech.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-tron/10 border border-tron/30 rounded-full text-sm text-tron font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href={currentProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-300"
                  >
                    <i className="fab fa-github"></i>
                    <span>View Code</span>
                  </a>
                  {currentProject.demo && (
                    <a
                      href={currentProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-tron/20 hover:bg-tron/30 border border-tron/50 rounded-lg transition-colors duration-300"
                    >
                      <i className="fas fa-external-link-alt"></i>
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center mt-8 gap-4">
            <button
              onClick={prevProject}
              className="w-12 h-12 rounded-full border border-tron/50 hover:border-tron hover:bg-tron/10 transition-all duration-300 flex items-center justify-center"
            >
              <i className="fas fa-chevron-left text-tron"></i>
            </button>

            <div className="flex gap-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveProject(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeProject ? 'bg-tron scale-125' : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextProject}
              className="w-12 h-12 rounded-full border border-tron/50 hover:border-tron hover:bg-tron/10 transition-all duration-300 flex items-center justify-center"
            >
              <i className="fas fa-chevron-right text-tron"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}