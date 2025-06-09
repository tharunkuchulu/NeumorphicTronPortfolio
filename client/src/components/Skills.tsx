import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import CircularProgress from "@/components/ui/CircularProgress";

export default function Skills() {
  const { ref, controls } = useScrollAnimation();
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [radarView, setRadarView] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Sound effects for skill interactions
  const playHoverSound = () => {
    if (!soundEnabled) return;
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  const playClickSound = () => {
    if (!soundEnabled) return;
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(1200, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.15);
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.15);
  };

  // Calculate connection strength between skills
  const getConnectionStrength = (skill1: any, skill2: any) => {
    const categoryMatch = skill1.category === skill2.category ? 0.4 : 0;
    const levelSimilarity = 1 - Math.abs(skill1.level - skill2.level) / 100;
    const levelBonus = levelSimilarity * 0.3;
    const distance = Math.sqrt(Math.pow(skill1.x - skill2.x, 2) + Math.pow(skill1.y - skill2.y, 2));
    const proximityBonus = distance < 30 ? 0.3 : distance < 50 ? 0.2 : 0;
    
    return Math.min(categoryMatch + levelBonus + proximityBonus, 1);
  };

  const skillCategories = [
    {
      title: "Programming Languages",
      skills: [
        { name: "Python", level: 90, icon: "fab fa-python", color: "#3776ab" },
        { name: "JavaScript", level: 85, icon: "fab fa-js-square", color: "#f7df1e" },
        { name: "TypeScript", level: 80, icon: "fab fa-js-square", color: "#3178c6" },
      ]
    },
    {
      title: "Frameworks & Libraries",
      skills: [
        { name: "FastAPI", level: 88, icon: "fas fa-bolt", color: "#009688" },
        { name: "React.js", level: 85, icon: "fab fa-react", color: "#61dafb" },
        { name: "Redux", level: 80, icon: "fas fa-layer-group", color: "#764abc" },
      ]
    },
    {
      title: "Cloud & DevOps",
      skills: [
        { name: "AWS", level: 88, icon: "fab fa-aws", color: "#ff9900" },
        { name: "Docker", level: 80, icon: "fab fa-docker", color: "#2496ed" },
        { name: "CI/CD", level: 85, icon: "fas fa-sync-alt", color: "#326ce5" },
      ]
    },
    {
      title: "Databases",
      skills: [
        { name: "MySQL", level: 85, icon: "fas fa-database", color: "#00758f" },
        { name: "MongoDB", level: 80, icon: "fas fa-leaf", color: "#47a248" },
        { name: "PostgreSQL", level: 78, icon: "fas fa-database", color: "#336791" },
      ]
    }
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
    const center = { x: 200, y: 200 };
    const radius = 150;
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

        {/* Enhanced Controls Panel */}
        <motion.div 
          className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={controls}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* View Toggle */}
          <div className="glass-card p-2 rounded-full border border-tron/30 backdrop-blur-lg">
            <motion.button
              onClick={() => setRadarView(false)}
              className={`px-4 sm:px-6 py-3 rounded-full transition-all duration-300 relative overflow-hidden text-sm sm:text-base ${
                !radarView 
                  ? 'text-black font-bold border-2 border-tron' 
                  : 'text-tron hover:bg-tron/20 border-2 border-transparent'
              }`}
              style={{
                background: !radarView 
                  ? 'linear-gradient(45deg, rgba(0, 255, 255, 0.9), rgba(0, 255, 255, 1))'
                  : 'transparent',
                boxShadow: !radarView 
                  ? '0 0 20px rgba(0, 255, 255, 0.6), inset 0 0 20px rgba(0, 255, 255, 0.2)'
                  : 'none'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={!radarView ? {
                boxShadow: [
                  '0 0 20px rgba(0, 255, 255, 0.6), inset 0 0 20px rgba(0, 255, 255, 0.2)',
                  '0 0 30px rgba(0, 255, 255, 0.8), inset 0 0 30px rgba(0, 255, 255, 0.4)',
                  '0 0 20px rgba(0, 255, 255, 0.6), inset 0 0 20px rgba(0, 255, 255, 0.2)'
                ]
              } : {}}
              transition={!radarView ? { duration: 2, repeat: Infinity } : {}}
            >
              {!radarView && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transform: 'skewX(-20deg)' }}
                />
              )}
              <motion.i 
                className="fas fa-sphere mr-2 relative z-10"
                animate={!radarView ? { rotate: [0, 360] } : {}}
                transition={!radarView ? { duration: 4, repeat: Infinity } : {}}
              />
              <span className="relative z-10 hidden sm:inline">Constellation View</span>
              <span className="relative z-10 sm:hidden">Constellation</span>
            </motion.button>
            <motion.button
              onClick={() => setRadarView(true)}
              className={`px-4 sm:px-6 py-3 rounded-full transition-all duration-300 relative overflow-hidden text-sm sm:text-base ${
                radarView 
                  ? 'text-black font-bold border-2 border-tron' 
                  : 'text-tron hover:bg-tron/20 border-2 border-transparent'
              }`}
              style={{
                background: radarView 
                  ? 'linear-gradient(45deg, rgba(0, 255, 255, 0.9), rgba(0, 255, 255, 1))'
                  : 'transparent',
                boxShadow: radarView 
                  ? '0 0 20px rgba(0, 255, 255, 0.6), inset 0 0 20px rgba(0, 255, 255, 0.2)'
                  : 'none'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={radarView ? {
                boxShadow: [
                  '0 0 20px rgba(0, 255, 255, 0.6), inset 0 0 20px rgba(0, 255, 255, 0.2)',
                  '0 0 30px rgba(0, 255, 255, 0.8), inset 0 0 30px rgba(0, 255, 255, 0.4)',
                  '0 0 20px rgba(0, 255, 255, 0.6), inset 0 0 20px rgba(0, 255, 255, 0.2)'
                ]
              } : {}}
              transition={radarView ? { duration: 2, repeat: Infinity } : {}}
            >
              {radarView && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transform: 'skewX(-20deg)' }}
                />
              )}
              <motion.i 
                className="fas fa-radar mr-2 relative z-10"
                animate={radarView ? { rotate: [0, 360] } : {}}
                transition={radarView ? { duration: 3, repeat: Infinity } : {}}
              />
              <span className="relative z-10 hidden sm:inline">Radar Chart</span>
              <span className="relative z-10 sm:hidden">Radar</span>
            </motion.button>
          </div>

          {/* Sound Control */}
          <motion.button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`glass-card px-4 py-3 rounded-full border transition-all duration-300 ${
              soundEnabled 
                ? 'border-tron text-tron bg-tron/10' 
                : 'border-gray-600 text-gray-400 hover:border-tron/50'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.i 
              className={`fas ${soundEnabled ? 'fa-volume-up' : 'fa-volume-mute'} mr-2`}
              animate={soundEnabled ? { scale: [1, 1.2, 1] } : {}}
              transition={soundEnabled ? { duration: 2, repeat: Infinity } : {}}
            />
            <span className="hidden sm:inline">
              {soundEnabled ? 'Sound On' : 'Sound Off'}
            </span>
          </motion.button>
        </motion.div>

        {/* Interactive Skills Grid */}
        {!radarView && (
          <motion.div 
            className="w-full max-w-6xl mx-auto px-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                className="mb-12"
                initial={{ opacity: 0, x: -50 }}
                animate={controls}
                transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              >
                {/* Category Header */}
                <motion.h3 
                  className="text-2xl font-bold text-tron mb-8 text-center sm:text-left"
                  whileHover={{ scale: 1.05 }}
                >
                  {category.title}
                </motion.h3>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      className="flex flex-col items-center space-y-4 hardware-accelerated"
                      onMouseEnter={() => {
                        setHoveredSkill(skill.name);
                        playHoverSound();
                      }}
                      onMouseLeave={() => setHoveredSkill(null)}
                      onClick={() => {
                        setSelectedSkill(selectedSkill === skill.name ? null : skill.name);
                        playClickSound();
                      }}
                      whileHover={{ y: -10 }}
                    >
                      <CircularProgress
                        value={skill.level}
                        size={140}
                        strokeWidth={8}
                        color={skill.color}
                        icon={skill.icon}
                        label={skill.name}
                        delay={categoryIndex * 0.3 + skillIndex * 0.1}
                        animate={true}
                      />
                      
                      {/* Skill Details */}
                      <motion.div
                        className="text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: categoryIndex * 0.3 + skillIndex * 0.1 + 1.2 }}
                      >
                        <h4 className="text-lg font-semibold text-white mb-1">{skill.name}</h4>
                        <p className="text-sm text-gray-400">
                          {skill.level >= 90 ? 'Expert' : skill.level >= 80 ? 'Advanced' : 'Intermediate'}
                        </p>
                      </motion.div>

                      {/* Hover Glow Effect */}
                      {hoveredSkill === skill.name && (
                        <motion.div
                          className="absolute inset-0 rounded-full pointer-events-none"
                          style={{
                            background: `radial-gradient(circle, ${skill.color}30 0%, transparent 70%)`,
                            filter: `blur(20px)`
                          }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1.2 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Background Particles */}
            {Array.from({ length: 15 }).map((_, i) => (
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
                onHoverStart={() => {
                  setHoveredSkill(skill.name);
                  playHoverSound();
                }}
                onHoverEnd={() => setHoveredSkill(null)}
                onClick={() => {
                  setSelectedSkill(selectedSkill === skill.name ? null : skill.name);
                  playClickSound();
                }}
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

            {/* Advanced Connection Strength Network */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {skillOrbs.map((skill, index) => 
                skillOrbs.slice(index + 1).map((otherSkill, otherIndex) => {
                  const distance = Math.sqrt(
                    Math.pow(skill.x - otherSkill.x, 2) + Math.pow(skill.y - otherSkill.y, 2)
                  );
                  const connectionStrength = getConnectionStrength(skill, otherSkill);
                  
                  if (distance < 50 && connectionStrength > 0.2) {
                    const lineId = `connection-${index}-${otherIndex}`;
                    const isHighlighted = hoveredSkill === skill.name || hoveredSkill === otherSkill.name;
                    const strokeWidth = Math.max(1, connectionStrength * 4);
                    const opacity = Math.max(0.2, connectionStrength * 0.8);
                    
                    return (
                      <motion.g key={lineId}>
                        <motion.line
                          x1={`${skill.x}%`}
                          y1={`${skill.y}%`}
                          x2={`${otherSkill.x}%`}
                          y2={`${otherSkill.y}%`}
                          stroke={`url(#connectionGradient-${Math.floor(connectionStrength * 10)})`}
                          strokeWidth={strokeWidth}
                          strokeDasharray={connectionStrength > 0.7 ? "none" : "5,5"}
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ 
                            pathLength: 1, 
                            opacity: isHighlighted ? opacity * 1.5 : opacity,
                            strokeWidth: isHighlighted ? strokeWidth * 1.5 : strokeWidth,
                            filter: isHighlighted 
                              ? `drop-shadow(0 0 ${strokeWidth * 2}px rgba(0, 255, 255, 0.8))`
                              : 'none'
                          }}
                          transition={{ 
                            pathLength: { duration: 2, delay: index * 0.1 },
                            opacity: { duration: 0.3 },
                            strokeWidth: { duration: 0.3 },
                            filter: { duration: 0.3 }
                          }}
                        />
                        
                        {/* Connection Strength Indicator */}
                        {connectionStrength > 0.6 && (
                          <motion.circle
                            cx={`${(skill.x + otherSkill.x) / 2}%`}
                            cy={`${(skill.y + otherSkill.y) / 2}%`}
                            r="3"
                            fill="rgba(0, 255, 255, 0.8)"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ 
                              scale: [0.8, 1.2, 0.8],
                              opacity: [0.6, 1, 0.6]
                            }}
                            transition={{ 
                              duration: 2,
                              repeat: Infinity,
                              delay: connectionStrength * 2
                            }}
                          />
                        )}
                      </motion.g>
                    );
                  }
                  return null;
                })
              )}
              <defs>
                {/* Multiple gradients for different connection strengths */}
                {Array.from({ length: 11 }).map((_, i) => {
                  const intensity = i / 10;
                  return (
                    <linearGradient key={i} id={`connectionGradient-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor={`rgba(0, 255, 255, ${0.4 + intensity * 0.4})`} />
                      <stop offset="50%" stopColor={`rgba(${intensity * 100}, 255, 255, ${0.2 + intensity * 0.6})`} />
                      <stop offset="100%" stopColor={`rgba(0, 255, 255, ${0.4 + intensity * 0.4})`} />
                    </linearGradient>
                  );
                })}
              </defs>
            </svg>
          </motion.div>
        )}

        {/* Animated Radar Chart View */}
        {radarView && (
          <motion.div 
            className="flex justify-center items-center h-[700px] py-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-[500px] h-[500px]">
              <svg viewBox="0 0 400 400" className="w-full h-full">
                {/* Radar Grid */}
                {[1, 2, 3, 4, 5].map((ring) => (
                  <motion.circle
                    key={ring}
                    cx="200"
                    cy="200"
                    r={ring * 30}
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
                  const x2 = 200 + Math.cos(angle) * 150;
                  const y2 = 200 + Math.sin(angle) * 150;
                  return (
                    <motion.line
                      key={index}
                      x1="200"
                      y1="200"
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
                  const radius = (skill.value / skill.max) * 150;
                  const x = 200 + Math.cos(angle) * radius;
                  const y = 200 + Math.sin(angle) * radius;
                  
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
                        x={200 + Math.cos(angle) * 175}
                        y={200 + Math.sin(angle) * 175 - 8}
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
                        x={200 + Math.cos(angle) * 175}
                        y={200 + Math.sin(angle) * 175 + 8}
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
