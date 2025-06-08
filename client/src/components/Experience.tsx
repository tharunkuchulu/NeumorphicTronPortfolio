import { motion } from "framer-motion";
import useScrollAnimation from "@/hooks/useScrollAnimation";

export default function Experience() {
  const { ref, controls } = useScrollAnimation();

  const certifications = [
    {
      title: "Full Stack Development",
      subtitle: "Python - Codeacad",
      icon: "fas fa-certificate"
    },
    {
      title: "Python Programming",
      subtitle: "HackerRank",
      icon: "fab fa-python"
    },
    {
      title: "AI Tools & Prompt Engineering",
      subtitle: "be10X",
      icon: "fas fa-robot"
    }
  ];

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.h2 
          className="font-orbitron text-4xl font-bold text-center mb-16 text-tron"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          transition={{ duration: 0.8 }}
        >
          Work Experience
        </motion.h2>
        
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="glass-card p-8 rounded-2xl"
            initial={{ opacity: 0, x: -50 }}
            animate={controls}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h3 className="font-orbitron text-2xl font-semibold text-white mb-2">Developer Intern</h3>
                <p className="text-tron font-medium text-lg">AcademixEdu (Violetearnx Private Limited)</p>
                <p className="text-gray-400">Hyderabad</p>
              </div>
              <div className="text-right mt-4 md:mt-0">
                <p className="text-tron font-semibold">Oct 2024 – Jan 2025</p>
              </div>
            </div>
            <div className="space-y-4 text-gray-300">
              <motion.div 
                className="flex items-start"
                initial={{ opacity: 0, x: -20 }}
                animate={controls}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <i className="fas fa-chevron-right text-tron mt-1 mr-3 flex-shrink-0"></i>
                <p>Managed development of backend APIs using FastAPI and integrated React.js frontends, optimizing CI/CD pipelines with GitHub Actions, reducing deployment time by 30%.</p>
              </motion.div>
              <motion.div 
                className="flex items-start"
                initial={{ opacity: 0, x: -20 }}
                animate={controls}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <i className="fas fa-chevron-right text-tron mt-1 mr-3 flex-shrink-0"></i>
                <p>Implemented unit tests using pytest and collaborated in agile sprints, improving code coverage by 20% and meeting 100% of sprint deadlines.</p>
              </motion.div>
              <motion.div 
                className="flex items-start"
                initial={{ opacity: 0, x: -20 }}
                animate={controls}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <i className="fas fa-chevron-right text-tron mt-1 mr-3 flex-shrink-0"></i>
                <p>Oversaw secure data handling and project confidentiality, ensuring compliance with organizational standards.</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Certifications */}
          <div className="mt-12">
            <motion.h3 
              className="font-orbitron text-2xl font-bold text-center mb-8 text-tron"
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              transition={{ duration: 0.8, delay: 1 }}
            >
              Certifications
            </motion.h3>
            <div className="grid md:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <motion.div 
                  key={cert.title}
                  className="glass-card p-6 rounded-2xl text-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={controls}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.2 }}
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 5,
                    rotateX: 5
                  }}
                >
                  <motion.i 
                    className={`${cert.icon} text-tron text-3xl mb-4`}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  ></motion.i>
                  <h4 className="font-semibold text-white mb-2">{cert.title}</h4>
                  <p className="text-gray-400 text-sm">{cert.subtitle}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
