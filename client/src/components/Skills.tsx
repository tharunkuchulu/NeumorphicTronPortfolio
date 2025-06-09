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
      x: 10 + (categoryIndex * 15) + (skillIndex * 12) % 80,
      y: 15 + (skillIndex * 12) + (categoryIndex * 15) % 70,
      size: 60 + (skill.level * 0.4),
      category: category.title
    }))
  );

  // Generate radar chart path
  const generateRadarPath = (customRadius?: number) => {
    const center = { x: 250, y: 250 };
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

        {/* Grid View - Optimized Layout */}
        {viewMode === 'grid' && (
          <motion.div 
            className="w-full max-w-7xl mx-auto px-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Compact Category Layout - 2x3 Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {skillCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.title}
                  className="bg-dark-card/30 backdrop-blur-sm rounded-xl p-6 border border-tron/20"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={controls}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                  whileHover={{ 
                    scale: 1.02,
                    borderColor: 'rgba(0, 255, 255, 0.4)',
                    boxShadow: '0 0 20px rgba(0, 255, 255, 0.2)'
                  }}
                >
                  {/* Category Header */}
                  <motion.h3 
                    className="text-lg font-bold text-tron mb-4 text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    {category.title}
                  </motion.h3>

                  {/* Skills in Compact Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        className="flex flex-col items-center space-y-1 hardware-accelerated relative"
                        onMouseEnter={() => {
                          setHoveredSkill(skill.name);
                          playHoverSound();
                        }}
                        onMouseLeave={() => setHoveredSkill(null)}
                        onClick={() => {
                          setSelectedSkill(selectedSkill === skill.name ? null : skill.name);
                          playClickSound();
                        }}
                        whileHover={{ y: -3, scale: 1.05 }}
                      >
                        <CircularProgress
                          value={skill.level}
                          size={75}
                          strokeWidth={4}
                          color={skill.color}
                          icon={skill.icon}
                          delay={categoryIndex * 0.1 + skillIndex * 0.03}
                          animate={true}
                        />
                        
                        {/* Skill Name Only */}
                        <motion.div
                          className="text-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.03 + 0.5 }}
                        >
                          <h4 className="text-xs font-semibold text-white leading-tight">{skill.name}</h4>
                        </motion.div>

                        {/* Hover Glow Effect */}
                        {hoveredSkill === skill.name && (
                          <motion.div
                            className="absolute inset-0 rounded-full pointer-events-none"
                            style={{
                              background: `radial-gradient(circle, ${skill.color}30 0%, transparent 70%)`,
                              filter: `blur(10px)`
                            }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1.3 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Skills Summary Stats */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {[
                { label: 'Total Skills', value: skillCategories.reduce((sum, cat) => sum + cat.skills.length, 0), icon: 'fas fa-code' },
                { label: 'Expert Level', value: skillCategories.flatMap(cat => cat.skills).filter(skill => skill.level >= 90).length, icon: 'fas fa-star' },
                { label: 'Advanced', value: skillCategories.flatMap(cat => cat.skills).filter(skill => skill.level >= 80 && skill.level < 90).length, icon: 'fas fa-trophy' },
                { label: 'Categories', value: skillCategories.length, icon: 'fas fa-layer-group' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="bg-dark-card/40 rounded-lg p-4 text-center border border-tron/10"
                  whileHover={{ scale: 1.05, borderColor: 'rgba(0, 255, 255, 0.3)' }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                >
                  <i className={`${stat.icon} text-tron text-xl mb-2`} />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Subtle Background Particles */}
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute rounded-full bg-tron/20 pointer-events-none"
                style={{
                  width: `${Math.random() * 2 + 1}px`,
                  height: `${Math.random() * 2 + 1}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.2, 0.8, 0.2],
                  scale: [0.5, 1.2, 0.5]
                }}
                transition={{
                  duration: 6 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        )}

        {/* Constellation View */}
        {viewMode === 'constellation' && (
          <motion.div 
            className="relative w-full max-w-6xl mx-auto px-4"
            style={{ height: '700px' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-5">
              <div className="grid grid-cols-10 grid-rows-6 h-full w-full">
                {Array.from({ length: 60 }).map((_, i) => (
                  <div key={i} className="border border-tron/30" />
                ))}
              </div>
            </div>

            {/* Skills as Constellation Orbs */}
            {skillCategories.map((category, categoryIndex) =>
              category.skills.map((skill, skillIndex) => {
                const totalSkillIndex = skillCategories.slice(0, categoryIndex).reduce((sum, cat) => sum + cat.skills.length, 0) + skillIndex;
                const xPos = 10 + (totalSkillIndex * 8) % 80;
                const yPos = 15 + Math.floor(totalSkillIndex / 10) * 20 + (categoryIndex * 5);
                
                return (
                  <motion.div
                    key={`orb-${skill.name}`}
                    className="absolute cursor-pointer"
                    style={{
                      left: `${xPos}%`,
                      top: `${Math.min(yPos, 75)}%`,
                      width: '80px',
                      height: '80px',
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: totalSkillIndex * 0.1 }}
                    whileHover={{ scale: 1.2 }}
                    onMouseEnter={() => {
                      setHoveredSkill(skill.name);
                      playHoverSound();
                    }}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    {/* Skill Orb */}
                    <div
                      className="w-full h-full rounded-full relative flex items-center justify-center"
                      style={{
                        background: `radial-gradient(circle at 30% 30%, ${skill.color}60, ${skill.color}90)`,
                        boxShadow: `0 0 20px ${skill.color}80`,
                        border: `2px solid ${skill.color}`,
                      }}
                    >
                      {/* Icon */}
                      <i 
                        className={`${skill.icon} text-white text-xl`}
                        style={{ filter: 'drop-shadow(0 0 5px rgba(0,0,0,0.8))' }}
                      />
                      
                      {/* Level Badge */}
                      <div className="absolute -top-2 -right-2 bg-tron text-black text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                        {skill.level}
                      </div>
                    </div>

                    {/* Skill Name */}
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-center">
                      <div className="text-xs font-semibold text-white whitespace-nowrap">
                        {skill.name}
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
            
            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
              {skillCategories.map((category, categoryIndex) =>
                category.skills.map((skill, skillIndex) => {
                  if (skillIndex === 0) return null;
                  const totalSkillIndex = skillCategories.slice(0, categoryIndex).reduce((sum, cat) => sum + cat.skills.length, 0) + skillIndex;
                  const prevIndex = totalSkillIndex - 1;
                  
                  const x1 = (10 + (prevIndex * 8) % 80) / 100;
                  const y1 = (15 + Math.floor(prevIndex / 10) * 20 + (categoryIndex * 5)) / 100;
                  const x2 = (10 + (totalSkillIndex * 8) % 80) / 100;
                  const y2 = (15 + Math.floor(totalSkillIndex / 10) * 20 + (categoryIndex * 5)) / 100;
                  
                  return (
                    <motion.line
                      key={`line-${skill.name}`}
                      x1={`${x1 * 100}%`}
                      y1={`${Math.min(y1 * 100, 75)}%`}
                      x2={`${x2 * 100}%`}
                      y2={`${Math.min(y2 * 100, 75)}%`}
                      stroke="rgba(0, 255, 255, 0.3)"
                      strokeWidth="1"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: totalSkillIndex * 0.1 + 0.5 }}
                    />
                  );
                })
              )}
            </svg>
          </motion.div>
        )}

        {/* Radar Chart View */}
        {viewMode === 'radar' && (
          <motion.div 
            className="flex justify-center items-center w-full max-w-4xl mx-auto"
            style={{ height: '700px' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <svg width="600" height="600" className="drop-shadow-2xl">
                {/* Background Circles */}
                {[20, 40, 60, 80, 100].map((percentage, i) => (
                  <circle
                    key={i}
                    cx="300"
                    cy="300"
                    r={(percentage / 100) * 180}
                    fill="none"
                    stroke="rgba(0, 255, 255, 0.2)"
                    strokeWidth="1"
                  />
                ))}
                
                {/* Axis Lines */}
                {radarSkills.map((_, index) => {
                  const angle = (index * 2 * Math.PI) / radarSkills.length - Math.PI / 2;
                  const x = 300 + 180 * Math.cos(angle);
                  const y = 300 + 180 * Math.sin(angle);
                  return (
                    <line
                      key={`axis-${index}`}
                      x1="300"
                      y1="300"
                      x2={x}
                      y2={y}
                      stroke="rgba(0, 255, 255, 0.3)"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Data Polygon */}
                <motion.polygon
                  points={radarSkills.map((skill, index) => {
                    const angle = (index * 2 * Math.PI) / radarSkills.length - Math.PI / 2;
                    const radius = (skill.value / 100) * 180;
                    const x = 300 + radius * Math.cos(angle);
                    const y = 300 + radius * Math.sin(angle);
                    return `${x},${y}`;
                  }).join(' ')}
                  fill="rgba(0, 255, 255, 0.2)"
                  stroke="#00ffff"
                  strokeWidth="3"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />

                {/* Data Points */}
                {radarSkills.map((skill, index) => {
                  const angle = (index * 2 * Math.PI) / radarSkills.length - Math.PI / 2;
                  const radius = (skill.value / 100) * 180;
                  const x = 300 + radius * Math.cos(angle);
                  const y = 300 + radius * Math.sin(angle);
                  return (
                    <motion.circle
                      key={`point-${skill.name}`}
                      cx={x}
                      cy={y}
                      r="6"
                      fill="#00ffff"
                      stroke="#ffffff"
                      strokeWidth="2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                      style={{ filter: 'drop-shadow(0 0 8px #00ffff)' }}
                    />
                  );
                })}

                {/* Labels */}
                {radarSkills.map((skill, index) => {
                  const angle = (index * 2 * Math.PI) / radarSkills.length - Math.PI / 2;
                  const labelRadius = 220;
                  const x = 300 + labelRadius * Math.cos(angle);
                  const y = 300 + labelRadius * Math.sin(angle);
                  return (
                    <motion.text
                      key={`label-${skill.name}`}
                      x={x}
                      y={y}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="white"
                      fontSize="16"
                      fontWeight="bold"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1.5 + index * 0.1 }}
                      style={{ filter: 'drop-shadow(0 0 3px rgba(0,0,0,0.8))' }}
                    >
                      {skill.name}
                    </motion.text>
                  );
                })}

                {/* Values */}
                {radarSkills.map((skill, index) => {
                  const angle = (index * 2 * Math.PI) / radarSkills.length - Math.PI / 2;
                  const valueRadius = 250;
                  const x = 300 + valueRadius * Math.cos(angle);
                  const y = 300 + valueRadius * Math.sin(angle);
                  return (
                    <motion.text
                      key={`value-${skill.name}`}
                      x={x}
                      y={y}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="#00ffff"
                      fontSize="14"
                      fontWeight="bold"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 2 + index * 0.1 }}
                    >
                      {skill.value}%
                    </motion.text>
                  );
                })}

                {/* Percentage Labels */}
                {[20, 40, 60, 80, 100].map((percentage, i) => (
                  <text
                    key={`percentage-${percentage}`}
                    x="305"
                    y={300 - (percentage / 100) * 180}
                    fill="rgba(255, 255, 255, 0.6)"
                    fontSize="12"
                  >
                    {percentage}%
                  </text>
                ))}
              </svg>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}