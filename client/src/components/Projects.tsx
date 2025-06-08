import { motion } from "framer-motion";
import useScrollAnimation from "@/hooks/useScrollAnimation";

export default function Projects() {
  const { ref, controls } = useScrollAnimation();

  const projects = [
    {
      title: "Movie Rating Website",
      description: "Full-stack platform for movie ratings with third-party API integration, achieving 99% uptime. Implemented comprehensive unit testing with 95% test coverage.",
      icon: "fas fa-film",
      technologies: ["React.js", "Redux", "TMDB API"],
      github: "https://github.com/tharunkuchulu"
    },
    {
      title: "AWS Automation with boto3",
      description: "Automated cloud resource management using Python and boto3, cutting provisioning time by 50% and enhancing security compliance by 100% with IAM roles.",
      icon: "fab fa-aws",
      technologies: ["Python", "AWS SDK", "EC2", "S3"],
      github: "https://github.com/tharunkuchulu"
    },
    {
      title: "Advanced ATS Scanner",
      description: "AI-powered ATS scanner with Retrieval-Augmented Generation, improving resume matching accuracy by 35% and reducing screening time by 45%.",
      icon: "fas fa-robot",
      technologies: ["FastAPI", "OpenAI", "Pinecone"],
      github: "https://github.com/tharunkuchulu"
    }
  ];

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
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={project.title}
              className="perspective-card"
              initial={{ opacity: 0, y: 50 }}
              animate={controls}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className="glass-card p-6 rounded-2xl card-inner">
                <div className="text-tron text-3xl mb-4">
                  <i className={project.icon}></i>
                </div>
                <h3 className="font-orbitron text-xl font-semibold mb-4 text-white">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech}
                      className="bg-tron bg-opacity-20 text-tron px-3 py-1 rounded-full text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <motion.a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="neon-border px-4 py-2 bg-transparent text-tron text-sm font-semibold rounded-lg hover:bg-tron hover:text-black transition-all duration-300 inline-block"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="fab fa-github mr-2"></i>View Code
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
