import { motion } from "framer-motion";
import useScrollAnimation from "@/hooks/useScrollAnimation";

export default function SoftSkills() {
  const { ref, controls } = useScrollAnimation();

  const softSkills = [
    {
      title: "Problem Solving",
      icon: "fas fa-lightbulb",
      description: "Analytical thinking and creative solutions",
      color: "from-yellow-500/20 to-orange-500/20",
      borderColor: "border-yellow-500/30",
      shadowColor: "shadow-yellow-500/30"
    },
    {
      title: "Team Collaboration",
      icon: "fas fa-users",
      description: "Effective teamwork and communication",
      color: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30",
      shadowColor: "shadow-blue-500/30"
    },
    {
      title: "Adaptability",
      icon: "fas fa-sync-alt",
      description: "Quick learning and flexibility",
      color: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30",
      shadowColor: "shadow-green-500/30"
    },
    {
      title: "Communication",
      icon: "fas fa-comments",
      description: "Clear and effective communication",
      color: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30",
      shadowColor: "shadow-purple-500/30"
    },
    {
      title: "Attention to Detail",
      icon: "fas fa-search",
      description: "Precision and quality focus",
      color: "from-tron/20 to-cyan-500/20",
      borderColor: "border-tron/30",
      shadowColor: "shadow-tron/30"
    },
    {
      title: "Self-Learning",
      icon: "fas fa-graduation-cap",
      description: "Continuous improvement mindset",
      color: "from-red-500/20 to-pink-500/20",
      borderColor: "border-red-500/30",
      shadowColor: "shadow-red-500/30"
    }
  ];

  return (
    <section id="soft-skills" className="py-20 bg-gradient-to-br from-dark-card to-dark-bg">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.h2 
          className="font-orbitron text-4xl font-bold text-center mb-16 text-tron"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          transition={{ duration: 0.8 }}
        >
          Soft Skills
        </motion.h2>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {softSkills.map((skill, index) => (
              <motion.div 
                key={skill.title}
                className={`relative group cursor-pointer`}
                initial={{ opacity: 0, y: 50 }}
                animate={controls}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                whileHover={{ y: -10 }}
                style={{ perspective: '1000px' }}
              >
                <motion.div
                  className={`glass-card card-hover performance-optimized p-8 rounded-2xl text-center relative overflow-hidden border-2 ${skill.borderColor} transition-all duration-500 group-hover:border-opacity-80`}
                  whileHover={{ 
                    rotateX: 5,
                    rotateY: 5,
                    scale: 1.05,
                    boxShadow: `0 25px 50px rgba(0, 255, 255, 0.3)`
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 20 
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Background gradient overlay */}
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                  
                  {/* Glowing border effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(45deg, transparent, rgba(0, 255, 255, 0.1), transparent)`,
                      filter: 'blur(1px)'
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon with 3D effect */}
                    <motion.div
                      className="mb-6 relative"
                      whileHover={{ 
                        scale: 1.3,
                        rotateY: 360,
                        z: 50
                      }}
                      transition={{ 
                        duration: 0.8,
                        type: "spring",
                        stiffness: 200
                      }}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-tron/20 rounded-full blur-lg opacity-0 group-hover:opacity-100"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <i className={`${skill.icon} text-tron text-5xl relative z-10`}></i>
                    </motion.div>
                    
                    {/* Title with depth */}
                    <motion.h3 
                      className="font-orbitron text-xl font-semibold text-white mb-3 group-hover:text-tron transition-colors duration-300"
                      whileHover={{ scale: 1.05, z: 30 }}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {skill.title}
                    </motion.h3>
                    
                    {/* Description */}
                    <motion.p 
                      className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300"
                      whileHover={{ scale: 1.02, z: 20 }}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {skill.description}
                    </motion.p>
                  </div>
                  
                  {/* Floating particles */}
                  <motion.div
                    className="absolute top-4 right-4 text-tron/20 group-hover:text-tron/60"
                    animate={{ 
                      rotate: 360,
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                      scale: { duration: 3, repeat: Infinity }
                    }}
                  >
                    <i className="fas fa-star text-xs"></i>
                  </motion.div>
                  
                  <motion.div
                    className="absolute bottom-4 left-4 text-tron/20 group-hover:text-tron/60"
                    animate={{ 
                      y: [-5, 5, -5],
                      opacity: [0.3, 0.8, 0.3]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <i className="fas fa-circle text-xs"></i>
                  </motion.div>

                  {/* Reflection effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 skew-x-12 transition-opacity duration-700"
                    style={{ backgroundSize: '200% 100%' }}
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ 
                      duration: 1.5, 
                      delay: 0.2,
                      repeat: Infinity,
                      repeatDelay: 3
                    }}
                  />
                </motion.div>

                {/* 3D shadow effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br from-transparent to-black/20 rounded-2xl transform translate-y-2 translate-x-2 opacity-30 group-hover:opacity-60 transition-opacity duration-500 -z-10`}
                  whileHover={{ 
                    scale: 1.05,
                    translateY: 8,
                    translateX: 8
                  }}
                />
              </motion.div>
            ))}
          </div>
          
          {/* Bottom decorative element */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={controls}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.div 
              className="inline-flex items-center gap-4 glass-card p-6 rounded-2xl"
              whileHover={{ scale: 1.02 }}
            >
              <motion.i 
                className="fas fa-rocket text-tron text-2xl"
                animate={{ 
                  y: [-2, 2, -2],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <p className="text-gray-300 text-lg">
                <span className="text-tron font-semibold">Soft skills</span> drive technical excellence
              </p>
              <motion.i 
                className="fas fa-heart text-red-400 text-xl"
                animate={{ 
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}