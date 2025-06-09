export default function SoftSkills() {
  const softSkills = [
    {
      title: "Problem Solving",
      icon: "fas fa-lightbulb",
      description: "Analytical thinking and creative solutions",
      color: "from-yellow-500/20 to-orange-500/20",
      borderColor: "border-yellow-500/30"
    },
    {
      title: "Team Collaboration",
      icon: "fas fa-users",
      description: "Effective teamwork and communication",
      color: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30"
    },
    {
      title: "Adaptability",
      icon: "fas fa-sync-alt",
      description: "Quick learning and flexibility",
      color: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30"
    },
    {
      title: "Communication",
      icon: "fas fa-comments",
      description: "Clear and effective communication",
      color: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30"
    },
    {
      title: "Attention to Detail",
      icon: "fas fa-search",
      description: "Precision and quality focus",
      color: "from-tron/20 to-cyan-500/20",
      borderColor: "border-tron/30"
    },
    {
      title: "Self-Learning",
      icon: "fas fa-graduation-cap",
      description: "Continuous improvement mindset",
      color: "from-red-500/20 to-pink-500/20",
      borderColor: "border-red-500/30"
    }
  ];

  return (
    <section id="soft-skills" className="py-20 bg-gradient-to-br from-dark-card to-dark-bg">
      <div className="container mx-auto px-6">
        <h2 className="font-orbitron text-4xl font-bold text-center mb-16 text-tron">
          Soft Skills
        </h2>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {softSkills.map((skill) => (
              <div 
                key={skill.title}
                className={`bg-dark-card/50 p-8 rounded-2xl text-center border-2 ${skill.borderColor} transition-all duration-300 hover:scale-105 hover:border-opacity-80 group`}
              >
                {/* Background gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`} />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-6 relative">
                    <i className={`${skill.icon} text-tron text-5xl transition-all duration-300 group-hover:scale-110`}></i>
                  </div>
                  
                  {/* Title */}
                  <h3 className="font-orbitron text-xl font-semibold text-white mb-3 group-hover:text-tron transition-colors duration-300">
                    {skill.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                    {skill.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Bottom decorative element */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-4 bg-dark-card/50 p-6 rounded-2xl border border-gray-800/50">
              <i className="fas fa-rocket text-tron text-2xl" />
              <p className="text-gray-300 text-lg">
                <span className="text-tron font-semibold">Soft skills</span> drive technical excellence
              </p>
              <i className="fas fa-heart text-red-400 text-xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}