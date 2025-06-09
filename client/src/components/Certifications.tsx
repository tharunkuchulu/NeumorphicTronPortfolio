import { motion } from "framer-motion";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import codecademyCertPdf from "@assets/Tharun Vankayala_Program Certificate_AcadmixEdu_1749450725065.pdf";
import be10xCertPdf from "@assets/AI Tools Workshop by Be10x_1749450701093.pdf";

export default function Certifications() {
  const { ref, controls } = useScrollAnimation();

  const certifications = [
    {
      title: "Full Stack Development",
      subtitle: "Python - Codecademy",
      icon: "fas fa-certificate",
      color: "from-blue-500/20 to-purple-500/20",
      borderColor: "border-blue-500/30",
      link: codecademyCertPdf
    },
    {
      title: "Python Programming (Basic)",
      subtitle: "HackerRank",
      icon: "fab fa-python",
      color: "from-green-500/20 to-teal-500/20",
      borderColor: "border-green-500/30",
      link: "https://www.hackerrank.com/certificates/iframe/4bd4e565d7a7"
    },
    {
      title: "Python Programming (Intermediate)",
      subtitle: "HackerRank",
      icon: "fab fa-python",
      color: "from-green-500/20 to-teal-500/20",
      borderColor: "border-green-500/30",
      link: "https://www.hackerrank.com/certificates/iframe/b938cc2dd9e2"
    },
    {
      title: "SQL",
      subtitle: "HackerRank",
      icon: "fas fa-database",
      color: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30",
      link: "https://www.hackerrank.com/certificates/iframe/e491d7f0c348"
    },
    {
      title: "AI Tools & Prompt Engineering",
      subtitle: "be10X",
      icon: "fas fa-robot",
      color: "from-tron/20 to-cyan-500/20",
      borderColor: "border-tron/30",
      link: be10xCertPdf
    }
  ];

  return (
    <section id="certifications" className="py-20">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.h2 
          className="font-orbitron text-4xl font-bold text-center mb-16 text-tron"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          transition={{ duration: 0.8 }}
        >
          Certifications & Achievements
        </motion.h2>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {certifications.map((cert, index) => (
              <motion.div 
                key={cert.title}
                className={`glass-card card-hover performance-optimized p-8 rounded-2xl text-center relative overflow-hidden group ${cert.borderColor} border-2`}
                initial={{ opacity: 0, y: 50 }}
                animate={controls}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  rotateX: 5,
                  boxShadow: "0 25px 50px rgba(0, 255, 255, 0.3)"
                }}
              >
                {/* Background gradient overlay */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />
                
                {/* Content */}
                <div className="relative z-10">
                  <motion.div
                    className="mb-6"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <i className={`${cert.icon} text-tron text-5xl mb-4 block`}></i>
                  </motion.div>
                  
                  <motion.h3 
                    className="font-orbitron text-xl font-semibold text-white mb-3"
                    initial={{ opacity: 0 }}
                    animate={controls}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
                  >
                    {cert.title}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-gray-400 text-sm mb-6"
                    initial={{ opacity: 0 }}
                    animate={controls}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                  >
                    {cert.subtitle}
                  </motion.p>
                  
                  <motion.div
                    className="flex justify-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={controls}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                  >
                    {cert.link ? (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-tron/20 text-tron px-4 py-2 rounded-full border border-tron/30 text-xs font-semibold hover:bg-tron hover:text-black hover:scale-105 transition-all duration-300 cursor-pointer active:scale-95"
                        style={{ pointerEvents: 'auto', display: 'inline-block' }}
                      >
                        <i className="fas fa-external-link-alt mr-1"></i>
                        View Certificate
                      </a>
                    ) : (
                      <div 
                        className="bg-tron/10 px-4 py-2 rounded-full border border-tron/30 cursor-pointer hover:bg-tron/20 hover:border-tron/60 hover:scale-105 transition-all duration-300"
                        style={{ pointerEvents: 'auto', display: 'inline-block' }}
                      >
                        <span className="text-tron text-xs font-semibold">VERIFIED</span>
                      </div>
                    )}
                  </motion.div>
                </div>
                
                {/* Floating elements */}
                <motion.div
                  className="absolute top-4 right-4 text-tron/30"
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity }
                  }}
                >
                  <i className="fas fa-star text-sm"></i>
                </motion.div>
              </motion.div>
            ))}
          </div>
          
          {/* Additional info section */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={controls}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.div 
              className="glass-card p-6 rounded-2xl inline-block"
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-gray-300 text-lg mb-4">
                <i className="fas fa-trophy text-tron mr-2"></i>
                Continuously learning and expanding expertise in emerging technologies
              </p>
              <motion.div 
                className="flex justify-center gap-4 text-sm text-gray-400"
                initial={{ opacity: 0 }}
                animate={controls}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <span>🎯 Goal-oriented learning</span>
                <span>•</span>
                <span>📚 Industry-relevant skills</span>
                <span>•</span>
                <span>🚀 Future-ready expertise</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}