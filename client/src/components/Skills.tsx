import { motion } from "framer-motion";
import { useState } from "react";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import CircularProgress from "@/components/ui/CircularProgress";

export default function Skills() {
  const { ref, controls } = useScrollAnimation();
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'radar'>('grid');

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

  // Technical Skills Data - Only technologies from your resume
  const skillCategories = [
    {
      title: "Languages & Frameworks",
      skills: [
        { name: "Python", level: 92, icon: "fab fa-python", color: "#3776ab" },
        { name: "JavaScript", level: 88, icon: "fab fa-js-square", color: "#f7df1e" },
        { name: "FastAPI", level: 90, icon: "fas fa-bolt", color: "#009688" },
        { name: "React.js", level: 88, icon: "fab fa-react", color: "#61dafb" },
        { name: "Redux", level: 85, icon: "fas fa-layer-group", color: "#764abc" }
      ]
    },
    {
      title: "Frontend & UI/UX",
      skills: [
        { name: "HTML", level: 90, icon: "fab fa-html5", color: "#e34f26" },
        { name: "CSS", level: 88, icon: "fab fa-css3-alt", color: "#1572b6" },
        { name: "Figma", level: 75, icon: "fab fa-figma", color: "#F24E1E" }
      ]
    },
    {
      title: "Databases",
      skills: [
        { name: "MySQL", level: 85, icon: "fas fa-database", color: "#4479A1" },
        { name: "MongoDB", level: 82, icon: "fas fa-leaf", color: "#47A248" }
      ]
    },
    {
      title: "Cloud & DevOps",
      skills: [
        { name: "AWS EC2", level: 85, icon: "fab fa-aws", color: "#FF9900" },
        { name: "AWS S3", level: 88, icon: "fas fa-cloud", color: "#FF9900" },
        { name: "Docker", level: 80, icon: "fab fa-docker", color: "#2496ED" },
        { name: "GitHub Actions", level: 82, icon: "fab fa-github", color: "#00D4AA" },
        { name: "Git", level: 90, icon: "fab fa-git-alt", color: "#F05032" }
      ]
    },
    {
      title: "AI & APIs",
      skills: [
        { name: "OpenAI", level: 88, icon: "fas fa-robot", color: "#412991" },
        { name: "LangChain", level: 85, icon: "fas fa-link", color: "#00ffff" },
        { name: "Pinecone", level: 82, icon: "fas fa-tree", color: "#00D4AA" },
        { name: "REST APIs", level: 90, icon: "fas fa-exchange-alt", color: "#61dafb" },
        { name: "RAG", level: 85, icon: "fas fa-brain", color: "#E91E63" }
      ]
    },
    {
      title: "Development Tools",
      skills: [
        { name: "VS Code", level: 90, icon: "fas fa-code", color: "#007ACC" },
        { name: "Postman", level: 85, icon: "fas fa-paper-plane", color: "#FF6C37" },
        { name: "Data Structures", level: 88, icon: "fas fa-project-diagram", color: "#ffd700" },
        { name: "Algorithms", level: 85, icon: "fas fa-code-branch", color: "#32cd32" },
        { name: "OOP", level: 90, icon: "fas fa-cube", color: "#ff6347" },
        { name: "Pytest", level: 82, icon: "fas fa-vial", color: "#0052cc" }
      ]
    }
  ];

  // Radar Skills for chart view based on your actual experience
  const radarSkills = [
    { name: "Python/FastAPI", value: 91, color: "#3776ab" },
    { name: "Frontend", value: 88, color: "#61dafb" },
    { name: "Databases", value: 84, color: "#4479A1" },
    { name: "Cloud/AWS", value: 86, color: "#FF9900" },
    { name: "AI/APIs", value: 87, color: "#412991" },
    { name: "DevOps/Git", value: 85, color: "#F05032" }
  ];

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-dark-bg to-dark-card">
      <div className="container mx-auto px-6" ref={ref}>
        {/* Header Section */}
        <motion.div className="text-center mb-16">
          <motion.h2 
            className="font-orbitron text-4xl font-bold mb-6 text-tron"
            initial={{ opacity: 0, y: 30 }}
            animate={controls}
            variants={{
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.8 }
              }
            }}
          >
            Technical Skills
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
                  animate={{ opacity: 1, scale: 1 }}
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
                        className="group cursor-pointer relative"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          duration: 0.5, 
                          delay: categoryIndex * 0.1 + skillIndex * 0.05,
                          type: "spring",
                          stiffness: 200
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
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {/* Futuristic Circular Progress */}
                        <div className="relative flex flex-col items-center">
                          {/* Outer Glow Ring */}
                          <div 
                            className="absolute w-20 h-20 rounded-full opacity-30 animate-pulse"
                            style={{
                              background: `conic-gradient(from 0deg, transparent, ${skill.color}, transparent)`,
                              filter: `blur(4px)`
                            }}
                          />
                          
                          {/* Main Skill Circle */}
                          <div 
                            className="relative w-16 h-16 rounded-full border-2 flex items-center justify-center backdrop-blur-sm"
                            style={{
                              borderColor: skill.color,
                              background: `linear-gradient(135deg, ${skill.color}15, rgba(0,0,0,0.8), ${skill.color}10)`,
                              boxShadow: `
                                0 0 20px ${skill.color}60,
                                inset 0 0 10px ${skill.color}20,
                                0 0 0 1px ${skill.color}40
                              `
                            }}
                          >
                            {/* Inner Glow */}
                            <div 
                              className="absolute inset-1 rounded-full opacity-20"
                              style={{
                                background: `radial-gradient(circle at 30% 30%, ${skill.color}60, transparent 70%)`
                              }}
                            />
                            
                            {/* Skill Icon */}
                            <i 
                              className={`${skill.icon} text-lg relative z-10`}
                              style={{ 
                                color: skill.color,
                                filter: `drop-shadow(0 0 6px ${skill.color}80)`
                              }}
                            />
                            
                            {/* Percentage Badge */}
                            <div 
                              className="absolute -top-2 -right-2 text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center border-2"
                              style={{
                                background: `linear-gradient(135deg, ${skill.color}, ${skill.color}CC)`,
                                color: skill.color === '#ffffff' ? '#000000' : '#000000',
                                borderColor: '#00ffff',
                                boxShadow: `
                                  0 0 12px ${skill.color}80,
                                  0 0 4px #00ffff60,
                                  inset 0 0 4px rgba(255,255,255,0.2)
                                `
                              }}
                            >
                              {skill.level}
                            </div>
                            
                            {/* Rotating Border Effect */}
                            <div 
                              className="absolute inset-0 rounded-full opacity-50 animate-spin"
                              style={{
                                background: `conic-gradient(from 0deg, transparent 0deg, ${skill.color}60 ${skill.level * 3.6}deg, transparent ${skill.level * 3.6}deg)`,
                                maskImage: 'radial-gradient(circle, transparent 70%, black 72%, black 74%, transparent 76%)'
                              }}
                            />
                          </div>
                          
                          {/* Skill Name with Glow */}
                          <span 
                            className="text-xs font-semibold mt-3 text-center relative"
                            style={{ 
                              color: skill.color,
                              textShadow: `0 0 8px ${skill.color}60, 0 0 4px ${skill.color}40`
                            }}
                          >
                            {skill.name}
                            {/* Text Underline Glow */}
                            <div 
                              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 w-0 group-hover:w-full transition-all duration-300"
                              style={{
                                backgroundColor: skill.color,
                                boxShadow: `0 0 4px ${skill.color}80`
                              }}
                            />
                          </span>
                        </div>

                        {/* Glow effect on hover */}
                        <motion.div
                          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
                          style={{
                            background: `radial-gradient(circle, ${skill.color}20, transparent)`,
                            filter: 'blur(8px)'
                          }}
                          animate={{
                            scale: hoveredSkill === skill.name ? [1, 1.2, 1] : 1,
                            opacity: hoveredSkill === skill.name ? [0.5, 0.8, 0.5] : 0
                          }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Floating Skill Particles */}
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-tron/60 rounded-full pointer-events-none"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${20 + Math.random() * 60}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.3, 1, 0.3],
                  scale: [0.5, 1.5, 0.5]
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

                {/* Skill Area */}
                <motion.polygon
                  points={radarSkills.map((skill, index) => {
                    const angle = (index * 2 * Math.PI) / radarSkills.length - Math.PI / 2;
                    const distance = (skill.value / 100) * 180;
                    const x = 300 + distance * Math.cos(angle);
                    const y = 300 + distance * Math.sin(angle);
                    return `${x},${y}`;
                  }).join(' ')}
                  fill="rgba(0, 255, 255, 0.1)"
                  stroke="rgba(0, 255, 255, 0.8)"
                  strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2, delay: 0.5 }}
                />

                {/* Skill Points */}
                {radarSkills.map((skill, index) => {
                  const angle = (index * 2 * Math.PI) / radarSkills.length - Math.PI / 2;
                  const distance = (skill.value / 100) * 180;
                  const x = 300 + distance * Math.cos(angle);
                  const y = 300 + distance * Math.sin(angle);
                  
                  return (
                    <motion.circle
                      key={`point-${skill.name}`}
                      cx={x}
                      cy={y}
                      r="6"
                      fill={skill.color}
                      stroke="white"
                      strokeWidth="2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                      whileHover={{ scale: 1.5 }}
                    />
                  );
                })}

                {/* Skill Labels */}
                {radarSkills.map((skill, index) => {
                  const angle = (index * 2 * Math.PI) / radarSkills.length - Math.PI / 2;
                  const labelDistance = 200;
                  const x = 300 + labelDistance * Math.cos(angle);
                  const y = 300 + labelDistance * Math.sin(angle);
                  
                  return (
                    <motion.text
                      key={`label-${skill.name}`}
                      x={x}
                      y={y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="fill-white font-semibold text-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                    >
                      {skill.name}
                      <tspan x={x} dy="15" className="text-xs fill-tron">
                        {skill.value}%
                      </tspan>
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