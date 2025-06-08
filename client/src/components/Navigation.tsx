import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav 
      className={`fixed top-0 w-full z-50 glass-card rounded-none border-x-0 border-t-0 transition-all duration-300 ${
        isScrolled ? 'backdrop-blur-lg bg-opacity-90' : ''
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <motion.div 
            className="font-orbitron text-xl font-bold text-tron"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Tharun Vankayala
          </motion.div>
          
          <div className="hidden md:flex space-x-8">
            {['#home', '#about', '#projects', '#skills', '#experience', '#contact'].map((href, index) => (
              <motion.a
                key={href}
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className="hover:text-tron transition-colors duration-300 capitalize"
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {href.slice(1)}
              </motion.a>
            ))}
          </div>
          
          <button 
            className="md:hidden text-tron"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden mt-4 space-y-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {['#home', '#about', '#projects', '#skills', '#experience', '#contact'].map((href) => (
              <a
                key={href}
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className="block hover:text-tron transition-colors duration-300 capitalize py-2"
              >
                {href.slice(1)}
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
