import { motion } from "framer-motion";
import { useState } from "react";
import useScrollAnimation from "@/hooks/useScrollAnimation";

export default function Skills() {
  const { ref, controls } = useScrollAnimation();
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const skillOrbs = [
    // Core Programming Languages
    { name: "Python", level: 90, x: 20, y: 15, size: 120, icon: "fab fa-python", color: "from-yellow-400 to-blue-500" },
    { name: "JavaScript", level: 85, x: 75, y: 25, size: 110, icon: "fab fa-js-square", color: "from-yellow-300 to-yellow-600" },
    
    // Frameworks
    { name: "FastAPI", level: 88, x: 15, y: 70, size: 115, icon: "fas fa-bolt", color: "from-green-400 to-emerald-500" },
    { name: "React.js", level: 85, x: 65, y: 75, size: 110, icon: "fab fa-react", color: "from-blue-400 to-cyan-500" },
    
    // Cloud & DevOps
    { name: "AWS", level: 88, x: 45, y: 10, size: 115, icon: "fab fa-aws", color: "from-orange-400 to-yellow-500" },
    { name: "Docker", level: 80, x: 85, y: 60, size: 105, icon: "fab fa-docker", color: "from-blue-500 to-blue-700" },
    
    // Databases
    { name: "MySQL", level: 85, x: 10, y: 45, size: 108, icon: "fas fa-database", color: "from-blue-600 to-indigo-600" },
    { name: "MongoDB", level: 80, x: 80, y: 85, size: 105, icon: "fas fa-leaf", color: "from-green-500 to-green-700" },
    
    // Additional Skills
    { name: "Redux", level: 80, x: 50, y: 85, size: 105, icon: "fas fa-layer-group", color: "from-purple-500 to-purple-700" },
    { name: "HTML/CSS", level: 92, x: 30, y: 50, size: 125, icon: "fab fa-html5", color: "from-orange-500 to-red-500" },
    { name: "CI/CD", level: 85, x: 70, y: 45, size: 108, icon: "fas fa-sync-alt", color: "from-teal-400 to-teal-600" },
    { name: "Git", level: 90, x: 25, y: 85, size: 120, icon: "fab fa-git-alt", color: "from-red-500 to-pink-500" }
  ];

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-dark-card to-dark-bg relative overflow-hidden">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.h2 
          className="font-orbitron text-4xl font-bold text-center mb-16 text-tron"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          transition={{ duration: 0.8 }}
        >
          Technical Skills Constellation
        </motion.h2>
        
        {/* 3D Skill Orbs Container */}
        <div className="relative h-[600px] w-full max-w-6xl mx-auto">
          {/* Background Grid */}
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
              {Array.from({ length: 48 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="border border-tron/20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.3, 0] }}
                  transition={{ duration: 3, delay: i * 0.1, repeat: Infinity }}
                />
              ))}
            </div>
          </div>

          {/* Floating Skill Orbs */}
          {skillOrbs.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="absolute cursor-pointer group"
              style={{
                left: `${skill.x}%`,
                top: `${skill.y}%`,
                width: `${skill.size}px`,
                height: `${skill.size}px`,
                perspective: '1000px'
              }}
              initial={{ opacity: 0, scale: 0, rotateY: 180 }}
              animate={controls}
              transition={{
                duration: 1,
                delay: index * 0.15,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.3, 
                z: 100,
                rotateY: 360,
                transition: { duration: 0.6 }
              }}
              onHoverStart={() => setHoveredSkill(skill.name)}
              onHoverEnd={() => setHoveredSkill(null)}
            >
              {/* 3D Orb */}
              <motion.div
                className={`relative w-full h-full rounded-full bg-gradient-to-br ${skill.color} shadow-2xl border-2 border-white/20 overflow-hidden`}
                style={{ transformStyle: 'preserve-3d' }}
                animate={{
                  rotateY: [0, 360],
                  boxShadow: [
                    `0 0 20px rgba(0, 255, 255, 0.3)`,
                    `0 0 40px rgba(0, 255, 255, 0.6)`,
                    `0 0 20px rgba(0, 255, 255, 0.3)`
                  ]
                }}
                transition={{
                  rotateY: { duration: 8, repeat: Infinity, ease: "linear" },
                  boxShadow: { duration: 2, repeat: Infinity }
                }}
              >
                {/* Inner Glow */}
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
                
                {/* Skill Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.i
                    className={`${skill.icon} text-white`}
                    style={{ fontSize: `${skill.size * 0.3}px` }}
                    animate={{ rotateY: [0, -360] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />
                </div>

                {/* Skill Level Ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-tron"
                  style={{
                    background: `conic-gradient(from 0deg, rgba(0, 255, 255, 0.8) ${skill.level * 3.6}deg, transparent ${skill.level * 3.6}deg)`
                  }}
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />

                {/* Floating Particles */}
                {Array.from({ length: 3 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-tron rounded-full"
                    style={{
                      left: `${20 + i * 30}%`,
                      top: `${20 + i * 20}%`
                    }}
                    animate={{
                      y: [-10, 10, -10],
                      opacity: [0.3, 1, 0.3],
                      scale: [0.5, 1.2, 0.5]
                    }}
                    transition={{
                      duration: 2 + i * 0.5,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  />
                ))}
              </motion.div>

              {/* Skill Info Tooltip */}
              <motion.div
                className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-black/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-tron/50 text-center min-w-max"
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{
                  opacity: hoveredSkill === skill.name ? 1 : 0,
                  y: hoveredSkill === skill.name ? 0 : 10,
                  scale: hoveredSkill === skill.name ? 1 : 0.8
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="font-orbitron text-tron font-semibold text-sm">
                  {skill.name}
                </div>
                <div className="text-white text-xs">
                  Proficiency: {skill.level}%
                </div>
              </motion.div>
            </motion.div>
          ))}

          {/* Connecting Lines Between Orbs */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {skillOrbs.map((skill, index) => 
              skillOrbs.slice(index + 1).map((otherSkill, otherIndex) => {
                const distance = Math.sqrt(
                  Math.pow(skill.x - otherSkill.x, 2) + Math.pow(skill.y - otherSkill.y, 2)
                );
                if (distance < 40) {
                  return (
                    <motion.line
                      key={`${index}-${otherIndex}`}
                      x1={`${skill.x}%`}
                      y1={`${skill.y}%`}
                      x2={`${otherSkill.x}%`}
                      y2={`${otherSkill.y}%`}
                      stroke="rgba(0, 255, 255, 0.3)"
                      strokeWidth="1"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.5 }}
                      transition={{ duration: 2, delay: index * 0.1 }}
                    />
                  );
                }
                return null;
              })
            )}
          </svg>
        </div>

        {/* Stats Panel */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {[
            { label: "Languages", count: "4+", icon: "fas fa-code" },
            { label: "Frameworks", count: "6+", icon: "fas fa-layer-group" },
            { label: "Cloud Services", count: "5+", icon: "fas fa-cloud" },
            { label: "Years Experience", count: "2+", icon: "fas fa-calendar-alt" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="glass-card p-6 rounded-xl text-center border border-tron/30 hover:border-tron transition-all duration-300"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <motion.i
                className={`${stat.icon} text-tron text-3xl mb-3 block`}
                animate={{ rotateY: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
              />
              <div className="font-orbitron text-2xl font-bold text-white mb-1">
                {stat.count}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
