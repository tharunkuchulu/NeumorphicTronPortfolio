import { motion } from "framer-motion";
import { useState } from "react";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import CircularProgress from "@/components/ui/CircularProgress";

export default function Skills() {
  const { ref, controls } = useScrollAnimation();
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'constellation' | 'radar'>('grid');

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

  const skillCategories = [
    {
      title: "💻 Programming Languages",
      skills: [
        { name: "Python", level: 90, icon: "fab fa-python", color: "#3776ab" },
        { name: "JavaScript", level: 85, icon: "fab fa-js-square", color: "#f7df1e" },
      ]
    },
    {
      title: "🌐 Frontend & Backend",
      skills: [
        { name: "React.js", level: 85, icon: "fab fa-react", color: "#61dafb" },
        { name: "HTML", level: 90, icon: "fab fa-html5", color: "#e34f26" },
        { name: "CSS", level: 88, icon: "fab fa-css3", color: "#1572b6" },
        { name: "Redux", level: 80, icon: "fas fa-layer-group", color: "#764abc" },
        { name: "FastAPI", level: 88, icon: "fas fa-bolt", color: "#009688" },
        { name: "RESTful APIs", level: 85, icon: "fas fa-exchange-alt", color: "#ff6b6b" },
      ]
    },
    {
      title: "🗄️ Databases",
      skills: [
        { name: "MySQL", level: 85, icon: "fas fa-database", color: "#00758f" },
        { name: "MongoDB", level: 80, icon: "fas fa-leaf", color: "#47a248" },
      ]
    },
    {
      title: "☁️ Cloud & DevOps",
      skills: [
        { name: "AWS EC2", level: 85, icon: "fab fa-aws", color: "#ff9900" },
        { name: "AWS S3", level: 88, icon: "fab fa-aws", color: "#ff9900" },
        { name: "Docker", level: 80, icon: "fab fa-docker", color: "#2496ed" },
        { name: "CI/CD", level: 82, icon: "fas fa-sync-alt", color: "#326ce5" },
      ]
    },
    {
      title: "🧠 AI & ML",
      skills: [
        { name: "UX Pilot AI", level: 75, icon: "fas fa-robot", color: "#ff6b35" },
        { name: "NLP", level: 78, icon: "fas fa-brain", color: "#4ecdc4" },
        { name: "LangChain", level: 72, icon: "fas fa-link", color: "#45b7d1" },
      ]
    },
    {
      title: "🔧 Tools & Others",
      skills: [
        { name: "Git", level: 90, icon: "fab fa-git-alt", color: "#f05032" },
        { name: "GitHub", level: 88, icon: "fab fa-github", color: "#333" },
        { name: "Figma", level: 82, icon: "fab fa-figma", color: "#f24e1e" },
        { name: "Framer", level: 78, icon: "fas fa-cube", color: "#0099ff" },
      ]
    }
  ];

  // Radar chart data for skill overview
  const radarSkills = [
    { name: "Frontend", value: 87, max: 100 },
    { name: "Backend", value: 86, max: 100 },
    { name: "Cloud", value: 84, max: 100 },
    { name: "Database", value: 83, max: 100 },
    { name: "AI/ML", value: 75, max: 100 },
    { name: "Tools", value: 85, max: 100 }
  ];

  // Generate constellation positions for skills
  const constellationSkills = skillCategories.flatMap((category, categoryIndex) =>
    category.skills.map((skill, skillIndex) => ({
      ...skill,
      x: 15 + (categoryIndex * 25) + (skillIndex * 8) % 70,
      y: 20 + (skillIndex * 15) + (categoryIndex * 12) % 60,
      size: skill.level + 20,
      category: category.title
    }))
  );

  // Generate radar chart path
  const generateRadarPath = (customRadius?: number) => {
    const center = { x: 200, y: 200 };
    const defaultRadius = 150;
    
    return radarSkills.map((skill, index) => {
      const angle = (index * 2 * Math.PI) / radarSkills.length - Math.PI / 2;
      const radius = customRadius || (skill.value / skill.max) * defaultRadius;
      const x = center.x + radius * Math.cos(angle);
      const y = center.y + radius * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');
  };

  return (
    <section 
      ref={ref} 
      id="skills" 
      className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-dark-bg via-dark-card to-dark-bg"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-8 gap-4 h-full">
          {Array.from({ length: 64 }).map((_, i) => (
            <motion.div
              key={i}
              className="border border-tron/20"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.3, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 3,
                delay: i * 0.02,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={controls}
          variants={{
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.8 }
            }
          }}
        >
          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-6 text-tron"
            style={{ 
              textShadow: '0 0 20px rgba(0, 255, 255, 0.5), 0 0 40px rgba(0, 255, 255, 0.3)'
            }}
          >
            Technical Skills Nexus
          </motion.h2>
          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-transparent via-tron to-transparent mx-auto mb-8"
            initial={{ scaleX: 0 }}
            animate={controls}
            variants={{
              visible: { 
                scaleX: 1,
                transition: { duration: 1, delay: 0.5 }
              }
            }}
          />
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={controls}
            variants={{
              visible: { 
                opacity: 1,
                transition: { duration: 0.8, delay: 0.3 }
              }
            }}
          >
            Interactive visualization of my technical expertise across various domains and technologies.
          </motion.p>

          {/* View Mode Controls */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {/* Sound Toggle */}
            <motion.button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`px-4 py-2 rounded-full border-2 transition-all duration-300 ${
                soundEnabled 
                  ? 'border-tron text-tron bg-tron/10' 
                  : 'border-gray-600 text-gray-400 hover:border-tron hover:text-tron'
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

            {/* View Mode Buttons */}
            <div className="flex gap-2">
              {[
                { mode: 'grid', icon: 'fas fa-th', label: 'Grid' },
                { mode: 'constellation', icon: 'fas fa-project-diagram', label: 'Constellation' },
                { mode: 'radar', icon: 'fas fa-chart-line', label: 'Radar' }
              ].map((view) => (
                <motion.button
                  key={view.mode}
                  onClick={() => setViewMode(view.mode as any)}
                  className={`px-4 py-2 rounded-full border-2 transition-all duration-300 ${
                    viewMode === view.mode
                      ? 'border-tron text-tron bg-tron/10' 
                      : 'border-gray-600 text-gray-400 hover:border-tron hover:text-tron'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className={`${view.icon} mr-2`} />
                  <span className="hidden sm:inline">{view.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Grid View */}
        {viewMode === 'grid' && (
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
                  className="text-xl font-bold text-tron mb-6 text-center sm:text-left"
                  whileHover={{ scale: 1.05 }}
                >
                  {category.title}
                </motion.h3>

                {/* Skills Grid - More compact with smaller circles */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-items-center">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      className="flex flex-col items-center space-y-2 hardware-accelerated relative"
                      onMouseEnter={() => {
                        setHoveredSkill(skill.name);
                        playHoverSound();
                      }}
                      onMouseLeave={() => setHoveredSkill(null)}
                      onClick={() => {
                        setSelectedSkill(selectedSkill === skill.name ? null : skill.name);
                        playClickSound();
                      }}
                      whileHover={{ y: -5 }}
                    >
                      <CircularProgress
                        value={skill.level}
                        size={100}
                        strokeWidth={6}
                        color={skill.color}
                        icon={skill.icon}
                        delay={categoryIndex * 0.2 + skillIndex * 0.05}
                        animate={true}
                      />
                      
                      {/* Skill Details */}
                      <motion.div
                        className="text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: categoryIndex * 0.2 + skillIndex * 0.05 + 0.8 }}
                      >
                        <h4 className="text-sm font-semibold text-white mb-0.5">{skill.name}</h4>
                        <p className="text-xs text-gray-400">
                          {skill.level >= 90 ? 'Expert' : skill.level >= 80 ? 'Advanced' : 'Intermediate'}
                        </p>
                      </motion.div>

                      {/* Hover Glow Effect */}
                      {hoveredSkill === skill.name && (
                        <motion.div
                          className="absolute inset-0 rounded-full pointer-events-none"
                          style={{
                            background: `radial-gradient(circle, ${skill.color}30 0%, transparent 70%)`,
                            filter: `blur(15px)`
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
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute rounded-full bg-tron/30 pointer-events-none"
                style={{
                  width: `${Math.random() * 3 + 1}px`,
                  height: `${Math.random() * 3 + 1}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
                animate={{
                  y: [0, -50, 0],
                  opacity: [0.3, 1, 0.3],
                  scale: [0.5, 1.5, 0.5]
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        )}

        {/* Constellation View */}
        {viewMode === 'constellation' && (
          <motion.div 
            className="relative w-full mx-auto px-4"
            style={{ 
              height: 'clamp(600px, 80vh, 900px)',
              maxWidth: 'min(100vw - 2rem, 1400px)'
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Cyberpunk Grid Background */}
            <div className="absolute inset-0 opacity-10">
              <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
                {Array.from({ length: 96 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="border border-tron/20"
                    animate={{ 
                      opacity: [0, 0.4, 0],
                      borderColor: [
                        'rgba(0, 255, 255, 0.1)',
                        'rgba(0, 255, 255, 0.4)',
                        'rgba(0, 255, 255, 0.1)'
                      ]
                    }}
                    transition={{ 
                      duration: 4, 
                      delay: i * 0.01, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Constellation Skills */}
            {constellationSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="absolute cursor-pointer group"
                style={{
                  left: `${skill.x}%`,
                  top: `${skill.y}%`,
                  width: `${skill.size}px`,
                  height: `${skill.size}px`,
                }}
                initial={{ opacity: 0, scale: 0, rotateY: 180 }}
                animate={controls}
                transition={{
                  duration: 1.2,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 120
                }}
                onMouseEnter={() => {
                  setHoveredSkill(skill.name);
                  playHoverSound();
                }}
                onMouseLeave={() => setHoveredSkill(null)}
                onClick={() => {
                  setSelectedSkill(selectedSkill === skill.name ? null : skill.name);
                  playClickSound();
                }}
                whileHover={{ scale: 1.2, z: 50 }}
              >
                {/* Skill Orb */}
                <motion.div
                  className="w-full h-full rounded-full relative overflow-hidden"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${skill.color}40, ${skill.color}80)`,
                    boxShadow: `0 0 20px ${skill.color}60, inset 0 0 20px ${skill.color}40`,
                  }}
                  animate={{
                    boxShadow: [
                      `0 0 20px ${skill.color}60, inset 0 0 20px ${skill.color}40`,
                      `0 0 30px ${skill.color}80, inset 0 0 30px ${skill.color}60`,
                      `0 0 20px ${skill.color}60, inset 0 0 20px ${skill.color}40`
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {/* Skill Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <i 
                      className={`${skill.icon} text-white text-lg`}
                      style={{ filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.8))' }}
                    />
                  </div>

                  {/* Skill Level Indicator */}
                  <div className="absolute bottom-1 right-1 bg-black/60 rounded-full px-1.5 py-0.5 text-xs text-white font-bold">
                    {skill.level}%
                  </div>
                </motion.div>

                {/* Skill Label */}
                <motion.div
                  className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredSkill === skill.name ? 1 : 0.7 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-sm font-semibold text-white whitespace-nowrap">
                    {skill.name}
                  </div>
                  <div className="text-xs text-gray-400">
                    {skill.category.replace(/[💻🌐🗄️☁️🧠🔧]/g, '').trim()}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Radar Chart View */}
        {viewMode === 'radar' && (
          <motion.div 
            className="flex justify-center items-center"
            style={{ height: '700px' }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <svg width="500" height="500" className="drop-shadow-2xl">
                {/* Radar Grid Circles */}
                {[...Array(5)].map((_, i) => (
                  <motion.circle
                    key={i}
                    cx="250"
                    cy="250"
                    r={(i + 1) * 30}
                    fill="none"
                    stroke="rgba(0, 255, 255, 0.2)"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: i * 0.2 }}
                  />
                ))}
                
                {/* Radar Lines */}
                {radarSkills.map((_, index) => {
                  const angle = (index * 2 * Math.PI) / radarSkills.length - Math.PI / 2;
                  const x = 250 + 150 * Math.cos(angle);
                  const y = 250 + 150 * Math.sin(angle);
                  return (
                    <motion.line
                      key={index}
                      x1="250"
                      y1="250"
                      x2={x}
                      y2={y}
                      stroke="rgba(0, 255, 255, 0.3)"
                      strokeWidth="1"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, delay: index * 0.1 }}
                    />
                  );
                })}

                {/* Skill Data Polygon */}
                <motion.polygon
                  points={generateRadarPath()}
                  fill="rgba(0, 255, 255, 0.2)"
                  stroke="#00ffff"
                  strokeWidth="3"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 2, delay: 1 }}
                />

                {/* Skill Points */}
                {radarSkills.map((skill, index) => {
                  const angle = (index * 2 * Math.PI) / radarSkills.length - Math.PI / 2;
                  const radius = (skill.value / skill.max) * 150;
                  const x = 250 + radius * Math.cos(angle);
                  const y = 250 + radius * Math.sin(angle);
                  return (
                    <motion.circle
                      key={skill.name}
                      cx={x}
                      cy={y}
                      r="6"
                      fill="#00ffff"
                      stroke="#ffffff"
                      strokeWidth="2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 1.5 + index * 0.1 }}
                      style={{ filter: 'drop-shadow(0 0 5px #00ffff)' }}
                    />
                  );
                })}

                {/* Skill Labels */}
                {radarSkills.map((skill, index) => {
                  const angle = (index * 2 * Math.PI) / radarSkills.length - Math.PI / 2;
                  const x = 250 + 180 * Math.cos(angle);
                  const y = 250 + 180 * Math.sin(angle);
                  return (
                    <motion.text
                      key={skill.name}
                      x={x}
                      y={y}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="white"
                      fontSize="14"
                      fontWeight="bold"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 2 + index * 0.1 }}
                      style={{ filter: 'drop-shadow(0 0 3px rgba(0,0,0,0.8))' }}
                    >
                      {skill.name}
                    </motion.text>
                  );
                })}

                {/* Skill Values */}
                {radarSkills.map((skill, index) => {
                  const angle = (index * 2 * Math.PI) / radarSkills.length - Math.PI / 2;
                  const x = 250 + 200 * Math.cos(angle);
                  const y = 250 + 200 * Math.sin(angle);
                  return (
                    <motion.text
                      key={`${skill.name}-value`}
                      x={x}
                      y={y + 15}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="#00ffff"
                      fontSize="12"
                      fontWeight="bold"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 2.5 + index * 0.1 }}
                    >
                      {skill.value}%
                    </motion.text>
                  );
                })}
              </svg>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}