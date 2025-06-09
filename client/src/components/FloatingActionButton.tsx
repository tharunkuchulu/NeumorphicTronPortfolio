import { useState } from "react";

export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { id: "hero", label: "Home", icon: "fas fa-home" },
    { id: "about", label: "About", icon: "fas fa-user" },
    { id: "projects", label: "Projects", icon: "fas fa-code" },
    { id: "skills", label: "Skills", icon: "fas fa-cog" },
    { id: "experience", label: "Experience", icon: "fas fa-briefcase" },
    { id: "contact", label: "Contact", icon: "fas fa-envelope" },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50" style={{ position: 'fixed', bottom: '24px', right: '24px' }}>
      {/* Navigation Menu */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 flex flex-col gap-3 animate-fadeIn">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="flex items-center gap-3 bg-dark-card/95 text-white px-4 py-3 rounded-full border border-tron/30 hover:border-tron transition-all duration-300 group hover:scale-105"
            >
              <i className={`${item.icon} text-tron`} />
              <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Main FAB Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 bg-gradient-to-r from-tron to-blue-500 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${
          isOpen ? 'rotate-45' : ''
        }`}
        style={{
          boxShadow: '0 4px 20px rgba(0, 255, 255, 0.3)'
        }}
      >
        <i className="fas fa-bars text-lg" />
      </button>
    </div>
  );
}