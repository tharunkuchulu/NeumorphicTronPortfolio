import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import useScrollAnimation from "@/hooks/useScrollAnimation";

export default function Skills() {
  const { ref, controls } = useScrollAnimation();
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [radarView, setRadarView] = useState(false);

  const skillOrbs = [
    // Core Programming Languages
    { name: "Python", level: 90, x: 20, y: 15, size: 120, icon: "fab fa-python", color: "from-yellow-400 to-blue-500", category: "Languages", badge: "Expert" },
    { name: "JavaScript", level: 85, x: 75, y: 25, size: 110, icon: "fab fa-js-square", color: "from-yellow-300 to-yellow-600", category: "Languages", badge: "Advanced" },
    
    // Frameworks
    { name: "FastAPI", level: 88, x: 15, y: 70, size: 115, icon: "fas fa-bolt", color: "from-green-400 to-emerald-500", category: "Frameworks", badge: "Expert" },
    { name: "React.js", level: 85, x: 65, y: 75, size: 110, icon: "fab fa-react", color: "from-blue-400 to-cyan-500", category: "Frameworks", badge: "Advanced" },
    
    // Cloud & DevOps
    { name: "AWS", level: 88, x: 45, y: 10, size: 115, icon: "fab fa-aws", color: "from-orange-400 to-yellow-500", category: "Cloud", badge: "Expert" },
    { name: "Docker", level: 80, x: 85, y: 60, size: 105, icon: "fab fa-docker", color: "from-blue-500 to-blue-700", category: "DevOps", badge: "Advanced" },
    
    // Databases
    { name: "MySQL", level: 85, x: 10, y: 45, size: 108, icon: "fas fa-database", color: "from-blue-600 to-indigo-600", category: "Databases", badge: "Advanced" },
    { name: "MongoDB", level: 80, x: 80, y: 85, size: 105, icon: "fas fa-leaf", color: "from-green-500 to-green-700", category: "Databases", badge: "Advanced" },
    
    // Additional Skills
    { name: "Redux", level: 80, x: 50, y: 85, size: 105, icon: "fas fa-layer-group", color: "from-purple-500 to-purple-700", category: "State Management", badge: "Advanced" },
    { name: "HTML/CSS", level: 92, x: 30, y: 50, size: 125, icon: "fab fa-html5", color: "from-orange-500 to-red-500", category: "Frontend", badge: "Master" },
    { name: "CI/CD", level: 85, x: 70, y: 45, size: 108, icon: "fas fa-sync-alt", color: "from-teal-400 to-teal-600", category: "DevOps", badge: "Advanced" },
    { name: "Git", level: 90, x: 25, y: 85, size: 120, icon: "fab fa-git-alt", color: "from-red-500 to-pink-500", category: "Version Control", badge: "Expert" }
  ];

  const radarSkills = [
    { name: "Frontend", value: 88, max: 100 },
    { name: "Backend", value: 90, max: 100 },
    { name: "Cloud", value: 85, max: 100 },
    { name: "Database", value: 83, max: 100 },
    { name: "DevOps", value: 82, max: 100 },
    { name: "AI/ML", value: 75, max: 100 }
  ];

  const generateRadarPath = () => {
    const center = { x: 150, y: 150 };
    const radius = 120;
    const angleStep = (2 * Math.PI) / radarSkills.length;
    
    let path = "";
    radarSkills.forEach((skill, index) => {
      const angle = index * angleStep - Math.PI / 2;
      const skillRadius = (skill.value / skill.max) * radius;
      const x = center.x + Math.cos(angle) * skillRadius;
      const y = center.y + Math.sin(angle) * skillRadius;
      
      if (index === 0) {
        path += `M ${x} ${y}`;
      } else {
        path += ` L ${x} ${y}`;
      }
    });
    path += " Z";
    return path;
  };

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-dark-card to-dark-bg relative overflow-hidden">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.h2 
          className="font-orbitron text-4xl font-bold text-center mb-16 text-tron"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          transition={{ duration: 0.8 }}
        >
          Technical Skills Nexus
        </motion.h2>

        {/* View Toggle Controls */}
        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={controls}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="glass-card p-2 rounded-full border border-tron/30">
            <motion.button
              onClick={() => setRadarView(false)}
              className={`px-6 py-3 rounded-full transition-all duration-300 ${
                !radarView ? 'bg-tron text-black' : 'text-tron hover:bg-tron/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fas fa-sphere mr-2"></i>
              Constellation View
            </motion.button>
            <motion.button
              onClick={() => setRadarView(true)}
              className={`px-6 py-3 rounded-full transition-all duration-300 ${
                radarView ? 'bg-tron text-black' : 'text-tron hover:bg-tron/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fas fa-radar mr-2"></i>
              Radar Chart
            </motion.button>
          </div>
        </motion.div>

        {/* Constellation View */}
        {!radarView && (
          <motion.div 
            className="relative h-[700px] w-full max-w-7xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Enhanced Cyberpunk Grid */}
            <div className="absolute inset-0 opacity-15">
              <div className="grid grid-cols-12 grid-rows-10 h-full w-full">
                {Array.from({ length: 120 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="border border-tron/20 relative"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: [0, 0.6, 0],
                      borderColor: [
                        'rgba(0, 255, 255, 0.2)',
                        'rgba(0, 255, 255, 0.6)',
                        'rgba(0, 255, 255, 0.2)'
                      ]
                    }}
                    transition={{ 
                      duration: 4, 
                      delay: i * 0.02, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {i % 12 === 0 && (
                      <motion.div
                        className="absolute inset-0 bg-tron/10"
                        animate={{ opacity: [0, 0.3, 0] }}
                        transition={{ duration: 6, repeat: Infinity, delay: i * 0.1 }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Enhanced Particle Field */}
            {Array.from({ length: 40 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-tron"
                style={{
                  width: `${Math.random() * 4 + 1}px`,
                  height: `${Math.random() * 4 + 1}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
                animate={{
                  y: [0, -100, 0],
                  x: [0, Math.random() * 50 - 25, 0],
                  opacity: [0.2, 1, 0.2],
                  scale: [0.5, 2, 0.5]
                }}
                transition={{
                  duration: 5 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "easeInOut"
                }}
              />
            ))}

            {/* Advanced Skill Orbs */}
            {skillOrbs.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="absolute cursor-pointer group"
                style={{
                  left: `${skill.x}%`,
                  top: `${skill.y}%`,
                  width: `${skill.size}px`,
                  height: `${skill.size}px`,
                  perspective: '1200px'
                }}
                initial={{ opacity: 0, scale: 0, rotateY: 180, z: -200 }}
                animate={controls}
                transition={{
                  duration: 1.2,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 120
                }}
                whileHover={{ 
                  scale: 1.4, 
                  z: 150,
                  rotateY: 360,
                  transition: { duration: 0.8 }
                }}
                onHoverStart={() => setHoveredSkill(skill.name)}
                onHoverEnd={() => setHoveredSkill(null)}
                onClick={() => setSelectedSkill(selectedSkill === skill.name ? null : skill.name)}
              >
                {/* Enhanced 3D Orb with Multiple Layers */}
                <motion.div
                  className="relative w-full h-full"
                  style={{ transformStyle: 'preserve-3d' }}
                  animate={{
                    rotateY: [0, 360],
                    rotateX: [0, 10, -10, 0]
                  }}
                  transition={{
                    rotateY: { duration: 12, repeat: Infinity, ease: "linear" },
                    rotateX: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  {/* Outer Holographic Shell */}
                  <motion.div
                    className={`absolute inset-0 rounded-full bg-gradient-to-br ${skill.color} shadow-2xl border-2 border-white/30 overflow-hidden`}
                    animate={{
                      boxShadow: [
                        `0 0 30px rgba(0, 255, 255, 0.4), 0 0 60px rgba(0, 255, 255, 0.2)`,
                        `0 0 50px rgba(0, 255, 255, 0.8), 0 0 100px rgba(0, 255, 255, 0.4)`,
                        `0 0 30px rgba(0, 255, 255, 0.4), 0 0 60px rgba(0, 255, 255, 0.2)`
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {/* Holographic Scan Lines */}
                    <motion.div
                      className="absolute inset-0 opacity-30"
                      style={{
                        background: `repeating-linear-gradient(
                          0deg,
                          transparent,
                          transparent 2px,
                          rgba(0, 255, 255, 0.1) 2px,
                          rgba(0, 255, 255, 0.1) 4px
                        )`
                      }}
                      animate={{ y: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Inner Energy Core */}
                    <motion.div 
                      className="absolute inset-4 rounded-full bg-gradient-to-br from-white/30 to-transparent"
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.7, 0.3]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>

                  {/* Skill Icon with Advanced Effects */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <motion.i
                      className={`${skill.icon} text-white relative`}
                      style={{ 
                        fontSize: `${skill.size * 0.35}px`,
                        filter: 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.8))'
                      }}
                      animate={{ 
                        rotateY: [0, -360],
                        textShadow: [
                          '0 0 20px rgba(0, 255, 255, 0.8)',
                          '0 0 40px rgba(0, 255, 255, 1)',
                          '0 0 20px rgba(0, 255, 255, 0.8)'
                        ]
                      }}
                      transition={{ 
                        rotateY: { duration: 12, repeat: Infinity, ease: "linear" },
                        textShadow: { duration: 2, repeat: Infinity }
                      }}
                    />
                  </div>

                  {/* Advanced Skill Level Visualization */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `conic-gradient(from 0deg, 
                        rgba(0, 255, 255, 0.9) 0deg,
                        rgba(0, 255, 255, 0.9) ${skill.level * 3.6}deg,
                        transparent ${skill.level * 3.6}deg,
                        transparent 360deg
                      )`,
                      mask: 'radial-gradient(circle, transparent 85%, black 85%)'
                    }}
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  />

                  {/* Orbiting Particles */}
                  {Array.from({ length: 6 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-3 h-3 bg-tron rounded-full"
                      style={{
                        left: '50%',
                        top: '50%',
                        transformOrigin: `${skill.size * 0.7}px 0px`
                      }}
                      animate={{ 
                        rotate: 360,
                        scale: [0.5, 1.5, 0.5],
                        opacity: [0.3, 1, 0.3]
                      }}
                      transition={{
                        rotate: { duration: 4 + i, repeat: Infinity, ease: "linear" },
                        scale: { duration: 2, repeat: Infinity, delay: i * 0.3 },
                        opacity: { duration: 2, repeat: Infinity, delay: i * 0.3 }
                      }}
                    />
                  ))}
                </motion.div>

                {/* Enhanced Achievement Badge */}
                <motion.div
                  className="absolute -top-2 -right-2 z-20"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ 
                    scale: hoveredSkill === skill.name ? 1.2 : 1,
                    rotate: 0
                  }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <motion.div
                    className={`glass-card px-3 py-1 rounded-full border-2 text-xs font-bold ${
                      skill.badge === 'Master' ? 'border-yellow-400 text-yellow-400' :
                      skill.badge === 'Expert' ? 'border-tron text-tron' :
                      'border-purple-400 text-purple-400'
                    }`}
                    animate={{
                      boxShadow: [
                        '0 0 10px rgba(0, 255, 255, 0.3)',
                        '0 0 20px rgba(0, 255, 255, 0.6)',
                        '0 0 10px rgba(0, 255, 255, 0.3)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <motion.i 
                      className={`fas ${
                        skill.badge === 'Master' ? 'fa-crown' :
                        skill.badge === 'Expert' ? 'fa-star' :
                        'fa-medal'
                      } mr-1`}
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 8, repeat: Infinity }}
                    />
                    {skill.badge}
                  </motion.div>
                </motion.div>

                {/* Cyberpunk Tooltip */}
                <motion.div
                  className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 z-30"
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{
                    opacity: hoveredSkill === skill.name ? 1 : 0,
                    y: hoveredSkill === skill.name ? 0 : 10,
                    scale: hoveredSkill === skill.name ? 1 : 0.8
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="glass-card p-4 rounded-lg border-2 border-tron/70 backdrop-blur-lg min-w-max bg-black/90">
                    <div className="font-orbitron text-tron font-bold text-lg mb-1" style={{ textShadow: '0 0 10px rgba(0, 255, 255, 0.8)' }}>
                      {skill.name}
                    </div>
                    <div className="text-white text-sm mb-2" style={{ textShadow: '0 0 5px rgba(255, 255, 255, 0.5)' }}>
                      Category: <span className="text-cyan-300">{skill.category}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="text-xs text-cyan-200">Proficiency:</div>
                      <div className="flex-1 bg-gray-800 rounded-full h-2 relative overflow-hidden border border-tron/30">
                        <motion.div
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-tron to-cyan-400 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </div>
                      <div className="text-tron font-bold text-sm" style={{ textShadow: '0 0 8px rgba(0, 255, 255, 0.8)' }}>
                        {skill.level}%
                      </div>
                    </div>
                    <div className="text-xs text-cyan-300 border-t border-tron/30 pt-2" style={{ textShadow: '0 0 3px rgba(0, 255, 255, 0.5)' }}>
                      Click to select • Hover to explore
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}

            {/* Enhanced Connection Network */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {skillOrbs.map((skill, index) => 
                skillOrbs.slice(index + 1).map((otherSkill, otherIndex) => {
                  const distance = Math.sqrt(
                    Math.pow(skill.x - otherSkill.x, 2) + Math.pow(skill.y - otherSkill.y, 2)
                  );
                  if (distance < 35) {
                    return (
                      <motion.line
                        key={`${index}-${otherIndex}`}
                        x1={`${skill.x}%`}
                        y1={`${skill.y}%`}
                        x2={`${otherSkill.x}%`}
                        y2={`${otherSkill.y}%`}
                        stroke="url(#connectionGradient)"
                        strokeWidth="2"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ 
                          pathLength: 1, 
                          opacity: [0.3, 0.8, 0.3],
                          strokeWidth: [1, 3, 1]
                        }}
                        transition={{ 
                          pathLength: { duration: 2, delay: index * 0.1 },
                          opacity: { duration: 4, repeat: Infinity },
                          strokeWidth: { duration: 4, repeat: Infinity }
                        }}
                      />
                    );
                  }
                  return null;
                })
              )}
              <defs>
                <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(0, 255, 255, 0.8)" />
                  <stop offset="50%" stopColor="rgba(0, 255, 255, 0.4)" />
                  <stop offset="100%" stopColor="rgba(0, 255, 255, 0.8)" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        )}

        {/* Animated Radar Chart View */}
        {radarView && (
          <motion.div 
            className="flex justify-center items-center h-[600px]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-96 h-96">
              <svg viewBox="0 0 300 300" className="w-full h-full">
                {/* Radar Grid */}
                {[1, 2, 3, 4, 5].map((ring) => (
                  <motion.circle
                    key={ring}
                    cx="150"
                    cy="150"
                    r={ring * 24}
                    fill="none"
                    stroke="rgba(0, 255, 255, 0.3)"
                    strokeWidth="1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    transition={{ duration: 1, delay: ring * 0.2 }}
                  />
                ))}

                {/* Radar Axes */}
                {radarSkills.map((_, index) => {
                  const angle = (index * 60 - 90) * (Math.PI / 180);
                  const x2 = 150 + Math.cos(angle) * 120;
                  const y2 = 150 + Math.sin(angle) * 120;
                  return (
                    <motion.line
                      key={index}
                      x1="150"
                      y1="150"
                      x2={x2}
                      y2={y2}
                      stroke="rgba(0, 255, 255, 0.4)"
                      strokeWidth="1"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  );
                })}

                {/* Skill Data Path */}
                <motion.path
                  d={generateRadarPath()}
                  fill="rgba(0, 255, 255, 0.2)"
                  stroke="rgba(0, 255, 255, 0.8)"
                  strokeWidth="3"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2, delay: 1 }}
                />

                {/* Skill Points */}
                {radarSkills.map((skill, index) => {
                  const angle = (index * 60 - 90) * (Math.PI / 180);
                  const radius = (skill.value / skill.max) * 120;
                  const x = 150 + Math.cos(angle) * radius;
                  const y = 150 + Math.sin(angle) * radius;
                  
                  return (
                    <motion.g key={skill.name}>
                      <motion.circle
                        cx={x}
                        cy={y}
                        r="6"
                        fill="rgba(0, 255, 255, 0.8)"
                        stroke="white"
                        strokeWidth="2"
                        initial={{ scale: 0 }}
                        animate={{ 
                          scale: [1, 1.3, 1],
                          opacity: [0.8, 1, 0.8]
                        }}
                        transition={{ 
                          scale: { duration: 2, repeat: Infinity, delay: index * 0.3 },
                          opacity: { duration: 2, repeat: Infinity, delay: index * 0.3 }
                        }}
                      />
                      
                      {/* Skill Labels */}
                      <motion.text
                        x={150 + Math.cos(angle) * 140}
                        y={150 + Math.sin(angle) * 140}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="rgba(0, 255, 255, 1)"
                        className="font-orbitron text-sm font-bold"
                        style={{ filter: 'drop-shadow(0 0 4px rgba(0, 255, 255, 0.8))' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 1.5 + index * 0.1 }}
                      >
                        {skill.name}
                      </motion.text>
                      
                      <motion.text
                        x={150 + Math.cos(angle) * 155}
                        y={150 + Math.sin(angle) * 155}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="rgba(255, 255, 255, 1)"
                        className="font-mono text-xs"
                        style={{ filter: 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.8))' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 1.7 + index * 0.1 }}
                      >
                        {skill.value}%
                      </motion.text>
                    </motion.g>
                  );
                })}
              </svg>

              {/* Rotating Scanner */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <div 
                  className="w-full h-full"
                  style={{
                    background: `conic-gradient(
                      from 0deg,
                      transparent 0deg,
                      rgba(0, 255, 255, 0.3) 30deg,
                      transparent 60deg
                    )`
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Enhanced Stats Panel */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          {[
            { label: "Technologies", count: "12+", icon: "fas fa-microchip", color: "from-blue-500 to-cyan-500" },
            { label: "Frameworks", count: "8+", icon: "fas fa-layer-group", color: "from-purple-500 to-pink-500" },
            { label: "Cloud Services", count: "6+", icon: "fas fa-cloud", color: "from-orange-500 to-red-500" },
            { label: "Proficiency", count: "86%", icon: "fas fa-chart-line", color: "from-green-500 to-teal-500" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="glass-card p-6 rounded-xl text-center border border-tron/30 hover:border-tron transition-all duration-300 relative overflow-hidden group"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
              />
              <motion.i
                className={`${stat.icon} text-tron text-4xl mb-3 block relative z-10`}
                animate={{ 
                  rotateY: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotateY: { duration: 4, repeat: Infinity, delay: index * 0.5 },
                  scale: { duration: 2, repeat: Infinity, delay: index * 0.3 }
                }}
              />
              <div className="font-orbitron text-3xl font-bold text-white mb-2 relative z-10">
                {stat.count}
              </div>
              <div className="text-gray-400 text-sm relative z-10">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
