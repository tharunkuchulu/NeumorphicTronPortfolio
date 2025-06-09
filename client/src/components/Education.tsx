import { motion } from "framer-motion";
import useScrollAnimation from "@/hooks/useScrollAnimation";

export default function Education() {
  const { ref, controls } = useScrollAnimation();

  return (
    <section id="education" className="py-20 bg-gradient-to-br from-dark-card to-dark-bg">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.h2 
          className="font-orbitron text-4xl font-bold text-center mb-16 text-tron"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          transition={{ duration: 0.8 }}
        >
          Education
        </motion.h2>
        
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-card p-8 rounded-2xl"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex-1">
                <motion.div
                  className="flex items-center mb-4"
                  initial={{ opacity: 0, x: -30 }}
                  animate={controls}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <motion.i 
                    className="fas fa-graduation-cap text-tron text-3xl mr-4"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                  ></motion.i>
                  <div>
                    <h3 className="font-orbitron text-2xl font-semibold text-white">
                      B.Tech in Computer Science and Engineering
                    </h3>
                  </div>
                </motion.div>
                
                <motion.div
                  className="border-l-4 border-tron pl-6 ml-8"
                  initial={{ opacity: 0, x: -20 }}
                  animate={controls}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <p className="text-tron font-semibold text-xl mb-2">SRM University AP</p>
                  <p className="text-gray-400 mb-3 text-lg">Sept 2020 – Jun 2024</p>
                  <div className="flex items-center">
                    <span className="text-gray-300 mr-2">CGPA:</span>
                    <motion.span 
                      className="text-tron font-bold text-lg"
                      whileHover={{ scale: 1.1 }}
                    >
                      7.85
                    </motion.span>
                  </div>
                </motion.div>
              </div>
              
              <motion.div
                className="mt-6 md:mt-0 md:ml-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={controls}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <motion.div 
                  className="glass-card p-4 rounded-xl text-center min-w-[120px]"
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 5,
                    boxShadow: "0 20px 40px rgba(0, 255, 255, 0.2)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.i 
                    className="fas fa-award text-tron text-2xl mb-2 block"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  ></motion.i>
                  <span className="text-white font-semibold">Graduated</span>
                </motion.div>
              </motion.div>
            </div>
            
            <motion.div
              className="mt-8 pt-6 border-t border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <h4 className="text-tron font-semibold mb-4 text-lg">
                <i className="fas fa-code mr-2"></i>
                Relevant Coursework
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  "Data Structures",
                  "Algorithms",
                  "Database Systems",
                  "Web Development",
                  "Software Engineering",
                  "Computer Networks",
                  "Operating Systems",
                  "Machine Learning"
                ].map((course, index) => (
                  <motion.div
                    key={course}
                    className="bg-gradient-to-r from-tron/10 to-cyan-500/10 px-3 py-2 rounded-lg text-center text-sm text-gray-300 border border-tron/20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={controls}
                    transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: "rgba(0, 255, 255, 0.1)",
                      color: "#00ffff"
                    }}
                  >
                    {course}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}