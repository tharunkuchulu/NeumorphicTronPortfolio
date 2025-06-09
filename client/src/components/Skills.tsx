export default function Skills() {
  const skills = [
    { name: "Python", level: 90, icon: "fab fa-python", category: "Programming" },
    { name: "JavaScript", level: 85, icon: "fab fa-js-square", category: "Programming" },
    { name: "FastAPI", level: 88, icon: "fas fa-bolt", category: "Backend" },
    { name: "React.js", level: 82, icon: "fab fa-react", category: "Frontend" },
    { name: "Redux", level: 75, icon: "fas fa-layer-group", category: "Frontend" },
    { name: "AWS", level: 80, icon: "fab fa-aws", category: "Cloud" },
    { name: "Git", level: 85, icon: "fab fa-git-alt", category: "Tools" },
    { name: "HTML5", level: 90, icon: "fab fa-html5", category: "Frontend" },
    { name: "CSS3", level: 85, icon: "fab fa-css3-alt", category: "Frontend" },
    { name: "Pandas", level: 78, icon: "fas fa-table", category: "Data" },
    { name: "Docker", level: 70, icon: "fab fa-docker", category: "DevOps" },
    { name: "Machine Learning", level: 75, icon: "fas fa-brain", category: "AI/ML" }
  ];

  const developmentTools = [
    { name: "VS Code", icon: "fas fa-code", description: "Primary IDE" },
    { name: "Postman", icon: "fas fa-paper-plane", description: "API Testing" },
    { name: "GitHub", icon: "fab fa-github", description: "Version Control" },
    { name: "Figma", icon: "fab fa-figma", description: "Design Tool" }
  ];

  const categories = [...new Set(skills.map(skill => skill.category))];

  return (
    <section id="skills" className="py-20 bg-dark text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-4 text-tron">
            Technical Skills
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive expertise across full-stack development, cloud technologies, and AI/ML
          </p>
        </div>

        {/* Skills Grid */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="bg-dark-card/50 p-6 rounded-xl border border-gray-800/50 hover:border-tron/50 transition-all duration-300 group hover:scale-105"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-tron/20 to-cyan-500/20 flex items-center justify-center mb-2">
                      <i className={`${skill.icon} text-2xl text-tron`}></i>
                    </div>
                    
                    {/* Progress Ring */}
                    <svg className="absolute inset-0 w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        fill="none"
                        stroke="rgba(75, 85, 99, 0.3)"
                        strokeWidth="4"
                      />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        fill="none"
                        stroke="#00ffff"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray={`${skill.level * 1.76} ${176 - skill.level * 1.76}`}
                        className="transition-all duration-1000 group-hover:stroke-cyan-400"
                      />
                    </svg>
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-bold text-tron">{skill.level}%</span>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-white mb-1 group-hover:text-tron transition-colors duration-300">
                    {skill.name}
                  </h3>
                  <span className="text-xs text-gray-400">{skill.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Development Tools */}
        <div className="max-w-4xl mx-auto">
          <h3 className="font-orbitron text-2xl font-semibold text-center mb-8 text-tron">
            Development Tools
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {developmentTools.map((tool) => (
              <div
                key={tool.name}
                className="bg-dark-card/50 p-6 rounded-xl border border-gray-800/50 hover:border-tron/50 transition-all duration-300 text-center group hover:scale-105"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-tron/20 to-cyan-500/20 flex items-center justify-center mx-auto mb-4">
                  <i className={`${tool.icon} text-xl text-tron`}></i>
                </div>
                <h4 className="font-semibold text-white mb-2 group-hover:text-tron transition-colors duration-300">
                  {tool.name}
                </h4>
                <p className="text-sm text-gray-400">{tool.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Summary */}
        <div className="mt-16 text-center">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-dark-card/50 to-dark-card/30 p-8 rounded-2xl border border-gray-800/50">
            <h3 className="font-orbitron text-xl font-semibold mb-4 text-tron">Expertise Overview</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-tron mb-2">5+</div>
                <div className="text-gray-400">Programming Languages</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-tron mb-2">10+</div>
                <div className="text-gray-400">Frameworks & Libraries</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-tron mb-2">3+</div>
                <div className="text-gray-400">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}