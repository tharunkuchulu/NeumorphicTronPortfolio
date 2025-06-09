import { motion } from "framer-motion";
import useScrollAnimation from "@/hooks/useScrollAnimation";

export default function About() {
  const { ref, controls } = useScrollAnimation();

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-dark-bg to-dark-card">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.h2 
          className="font-orbitron text-4xl font-bold text-center mb-16 text-tron"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          transition={{ duration: 0.8 }}
        >
          About Me
        </motion.h2>
        
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="glass-card card-hover p-8 rounded-2xl text-center performance-optimized">
              <h3 className="font-orbitron text-2xl font-semibold mb-6 text-tron">
                <i className="fas fa-user-astronaut mr-3"></i>
                Profile Summary
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6 text-lg">
                Proficient in developing scalable web applications as a Python Full Stack Developer, 
                leveraging FastAPI, React.js, and AWS for efficient software solutions.
              </p>
              <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                Skilled in API integration, cloud computing, and AI-driven development, ensuring 
                high-performance systems and secure user experiences.
              </p>
              <div className="flex justify-center gap-6">
                <motion.a 
                  href="mailto:tharunvankayala@gmail.com" 
                  className="text-tron hover:text-white transition-colors p-3 glass-card rounded-full"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  aria-label="Email"
                >
                  <i className="fas fa-envelope text-2xl"></i>
                </motion.a>
                <motion.a 
                  href="https://github.com/tharunkuchulu" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-tron hover:text-white transition-colors p-3 glass-card rounded-full"
                  whileHover={{ scale: 1.2, rotate: -10 }}
                  aria-label="GitHub"
                >
                  <i className="fab fa-github text-2xl"></i>
                </motion.a>
                <motion.a 
                  href="https://linkedin.com/in/tharun-vankayala" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-tron hover:text-white transition-colors p-3 glass-card rounded-full"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  aria-label="LinkedIn"
                >
                  <i className="fab fa-linkedin text-xl"></i>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
