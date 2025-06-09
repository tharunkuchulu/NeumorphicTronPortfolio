import { motion } from "framer-motion";
import { useState } from "react";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import CircularProgress from "@/components/ui/CircularProgress";

export default function Skills() {
  const { ref, controls } = useScrollAnimation();
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
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

          {/* Sound Toggle */}
          <motion.button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`mt-8 px-6 py-3 rounded-full border-2 transition-all duration-300 ${
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
        </motion.div>

        {/* Interactive Skills Grid */}
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
                    className="flex flex-col items-center space-y-4 hardware-accelerated relative"
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
      </div>
    </section>
  );
}