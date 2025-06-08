import { motion } from "framer-motion";
import useScrollAnimation from "@/hooks/useScrollAnimation";

export default function Skills() {
  const { ref, controls } = useScrollAnimation();

  const skillCategories = [
    {
      title: "Languages & Frameworks",
      icon: "fas fa-code",
      skills: [
        { name: "Python", level: 90 },
        { name: "JavaScript", level: 85 },
        { name: "FastAPI", level: 88 },
        { name: "React.js", level: 85 }
      ]
    },
    {
      title: "Frontend & UI/UX",
      icon: "fas fa-palette",
      skills: [
        { name: "HTML/CSS", level: 92 },
        { name: "Redux", level: 80 },
        { name: "Figma", level: 75 }
      ]
    },
    {
      title: "Databases",
      icon: "fas fa-database",
      skills: [
        { name: "MySQL", level: 85 },
        { name: "MongoDB", level: 80 }
      ]
    },
    {
      title: "Cloud & DevOps",
      icon: "fas fa-cloud",
      skills: [
        { name: "AWS", level: 88 },
        { name: "Docker", level: 80 },
        { name: "CI/CD", level: 85 }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-dark-card to-dark-bg">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.h2 
          className="font-orbitron text-4xl font-bold text-center mb-16 text-tron"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          transition={{ duration: 0.8 }}
        >
          Technical Skills
        </motion.h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div 
              key={category.title}
              className="glass-card p-6 rounded-2xl"
              initial={{ opacity: 0, y: 50 }}
              animate={controls}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
            >
              <h3 className="font-orbitron text-lg font-semibold mb-6 text-tron flex items-center">
                <i className={`${category.icon} mr-3`}></i>
                {category.title}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name} className="skill-item">
                    <div className="flex justify-between mb-2">
                      <span className="text-white">{skill.name}</span>
                      <span className="text-tron">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 relative overflow-hidden">
                      <motion.div 
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-tron to-blue-400 rounded-full"
                        initial={{ width: 0 }}
                        animate={controls}
                        transition={{ 
                          duration: 1.5, 
                          delay: categoryIndex * 0.2 + skillIndex * 0.1,
                          ease: "easeOut"
                        }}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
