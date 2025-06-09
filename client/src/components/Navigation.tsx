import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

      {/* Mobile Menu Button - Simple Tron Style */}
      <button 
        className="md:hidden fixed bottom-2.5 right-5 z-[9999] w-12 h-12 bg-black/80 border-2 border-tron rounded-lg flex items-center justify-center backdrop-blur-sm hover:bg-tron/10 transition-all duration-300 focus:outline-none"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle mobile menu"
      >
        <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-lg text-tron transition-all duration-300`}></i>
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-40 md:hidden"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div 
              className="fixed right-0 top-0 h-full w-80 border-l-2 border-tron p-6 shadow-2xl"
              style={{
                backgroundColor: '#000000',
                background: '#000000',
                opacity: 1
              }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-tron font-orbitron text-xl font-bold">Navigation</h3>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-400 hover:text-tron"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>
              
              <div className="space-y-4">
                {[
                  { href: '#hero', label: 'Home', icon: 'fas fa-home' },
                  { href: '#about', label: 'About', icon: 'fas fa-user' },
                  { href: '#projects', label: 'Projects', icon: 'fas fa-code' },
                  { href: '#skills', label: 'Skills', icon: 'fas fa-cog' },
                  { href: '#experience', label: 'Experience', icon: 'fas fa-briefcase' },
                  { href: '#education', label: 'Education', icon: 'fas fa-graduation-cap' },
                  { href: '#certifications', label: 'Certifications', icon: 'fas fa-certificate' },
                  { href: '#contact', label: 'Contact', icon: 'fas fa-envelope' }
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="flex items-center gap-4 py-3 px-4 rounded-lg hover:bg-tron/10 hover:text-tron transition-all duration-300 group"
                  >
                    <i className={`${item.icon} text-tron group-hover:scale-110 transition-transform`}></i>
                    <span className="text-white group-hover:text-tron font-medium">{item.label}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
