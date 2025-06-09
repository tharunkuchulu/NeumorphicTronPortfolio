import { motion } from "framer-motion";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import offerLetterPdf from "@assets/Internship Offer Letter_Tharun Vankayala_1749450701092.pdf";

export default function Experience() {
  const { ref, controls } = useScrollAnimation();

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
            
            {/* View Offer Letter Button */}
            <motion.div
              className="mt-8 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <motion.a
                href={offerLetterPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-tron/20 text-tron px-6 py-3 rounded-lg border border-tron/30 text-sm font-semibold hover:bg-tron hover:text-black transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="fas fa-file-pdf"></i>
                View Offer Letter
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
