import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <motion.nav 
      className={`sticky top-0 w-full z-50 glass-card rounded-none border-x-0 border-t-0 transition-all duration-300 ${
        isScrolled ? 'backdrop-blur-lg bg-opacity-90' : ''
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <motion.a 
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="font-orbitron text-xl font-bold text-tron cursor-pointer hover:text-white transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Tharun Vankayala
          </motion.a>
          
          <div className="hidden md:flex space-x-8">
            {['#about', '#projects', '#skills', '#experience', '#certifications', '#contact'].map((href, index) => (
              <motion.a
                key={href}
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className="relative py-2 px-4 hover:text-tron transition-all duration-300 capitalize group overflow-hidden"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="relative z-10">{href.slice(1)}</span>
                
                {/* Glowing underline effect */}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-tron via-cyan-400 to-tron origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                  style={{ 
                    width: '100%',
                    boxShadow: '0 0 8px rgba(0, 255, 255, 0.6), 0 0 16px rgba(0, 255, 255, 0.4)'
                  }}
                />
                
                {/* Glow effect on hover */}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-tron opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500"
                  style={{ width: '100%' }}
                />
                
                {/* Shimmer effect */}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100"
                  style={{ width: '100%' }}
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ 
                    duration: 1.5, 
                    delay: 0.2,
                    ease: "easeInOut"
                  }}
                />
              </motion.a>
            ))}
          </div>
          
        </div>
      </div>
    </motion.nav>
  );
}
