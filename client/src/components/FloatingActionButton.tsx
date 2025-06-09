import { motion, AnimatePresence } from "framer-motion";
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
    <div 
      className="fixed z-[9999]" 
      style={{ 
        position: 'fixed', 
        bottom: '20px', 
        right: '20px',
        zIndex: 9999
      }}
    >
      {/* Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-16 right-0 flex flex-col gap-3"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {navigationItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="flex items-center gap-3 bg-dark-card/90 backdrop-blur-sm text-white px-4 py-3 rounded-full border border-tron/30 hover:border-tron transition-all duration-300 group"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)' 
                }}
                whileTap={{ scale: 0.95 }}
              >
                <i className={`${item.icon} text-tron group-hover:scale-110 transition-transform`} />
                <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-r from-tron to-blue-500 text-white rounded-full shadow-lg flex items-center justify-center relative overflow-hidden"
        whileHover={{ 
          scale: 1.1,
          boxShadow: '0 0 30px rgba(0, 255, 255, 0.5)'
        }}
        whileTap={{ scale: 0.95 }}
        animate={{
          rotate: isOpen ? 45 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Rotating background effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{ rotate: 360 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <i className="fas fa-bars text-lg relative z-10" />
        
        {/* Pulse effect */}
        <motion.div
          className="absolute inset-0 bg-tron/30 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.button>
    </div>
  );
}