import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [rippleEffect, setRippleEffect] = useState<{ x: number; y: number; id: number } | null>(null);

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

  // Touch gesture handlers for swipe-to-close
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = Math.abs(touch.clientY - touchStart.y);
    
    // Only allow horizontal swipe if it's primarily horizontal movement
    if (deltaY < 50 && deltaX > 0) {
      setDragOffset(Math.min(deltaX, 320)); // Limit to menu width
    }
  };

  const handleTouchEnd = () => {
    if (!touchStart) return;
    
    // Close menu if dragged more than 1/3 of the way
    if (dragOffset > 106) {
      setIsMobileMenuOpen(false);
    }
    
    setTouchStart(null);
    setDragOffset(0);
  };

  // Ripple effect for touch feedback
  const createRipple = (e: React.TouchEvent | React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = ('touches' in e ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = ('touches' in e ? e.touches[0].clientY : e.clientY) - rect.top;
    
    const rippleId = Date.now();
    setRippleEffect({ x, y, id: rippleId });
    
    // Clear ripple after animation
    setTimeout(() => setRippleEffect(null), 600);
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
                  style={{ width: '100%', backgroundSize: '200% 100%' }}
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

      {/* Mobile Menu Button - Enhanced with Intelligent Animations */}
      <motion.button 
        className="md:hidden fixed bottom-2.5 right-5 z-[9999] w-12 h-12 bg-black/80 border-2 border-tron rounded-lg flex items-center justify-center backdrop-blur-sm focus:outline-none overflow-hidden"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        onTouchStart={createRipple}
        aria-label="Toggle mobile menu"
        whileHover={{
          scale: 1.1,
          backgroundColor: 'rgba(0, 255, 255, 0.1)',
          borderColor: '#00ffff',
          boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
          transition: { duration: 0.2 }
        }}
        whileTap={{
          scale: 0.85,
          backgroundColor: 'rgba(0, 255, 255, 0.3)',
          transition: { duration: 0.1, type: "spring", stiffness: 500 }
        }}
        animate={{
          rotate: isMobileMenuOpen ? 180 : 0,
          backgroundColor: isMobileMenuOpen ? 'rgba(0, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.8)',
          transition: { duration: 0.3, type: "spring", stiffness: 200 }
        }}
      >
        <motion.i 
          className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-lg text-tron`}
          animate={{
            rotate: isMobileMenuOpen ? 90 : 0,
            scale: isMobileMenuOpen ? 1.1 : 1
          }}
          transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
        />
      </motion.button>

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
              className="fixed right-0 top-0 h-full w-80 border-l-2 border-tron p-6 shadow-2xl mobile-menu-panel"
              style={{
                transform: `translateX(${dragOffset}px)`,
                zIndex: 1000
              }}
              initial={{ x: '100%', opacity: 0 }}
              animate={{ 
                x: 0, 
                opacity: 1,
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 40,
                  mass: 1,
                  opacity: { duration: 0.3 }
                }
              }}
              exit={{ 
                x: '100%', 
                opacity: 0,
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 40,
                  opacity: { duration: 0.2 }
                }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 320 }}
              dragElastic={0.2}
              onDragStart={() => setTouchStart({ x: 0, y: 0 })}
              onDrag={(event, info) => {
                if (info.offset.x > 0) {
                  setDragOffset(info.offset.x);
                }
              }}
              onDragEnd={(event, info) => {
                if (info.offset.x > 106) {
                  setIsMobileMenuOpen(false);
                }
                setDragOffset(0);
                setTouchStart(null);
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div 
                className="flex justify-between items-center mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 0.2, duration: 0.4 }
                }}
                exit={{ opacity: 0, y: -20 }}
              >
                <motion.h3 
                  className="text-tron font-orbitron text-xl font-bold"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    transition: { delay: 0.3, duration: 0.4 }
                  }}
                >
                  Navigation
                </motion.h3>
                <motion.button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-400 hover:text-tron transition-colors duration-300"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ 
                    opacity: 1, 
                    rotate: 0,
                    transition: { delay: 0.4, duration: 0.3 }
                  }}
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 90,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <i className="fas fa-times text-xl"></i>
                </motion.button>
              </motion.div>
              
              <motion.div 
                className="space-y-4"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.5
                    }
                  },
                  hidden: {
                    transition: {
                      staggerChildren: 0.05,
                      staggerDirection: -1
                    }
                  }
                }}
              >
                {[
                  { href: '#hero', label: 'Home', icon: 'fas fa-home' },
                  { href: '#about', label: 'About', icon: 'fas fa-user' },
                  { href: '#projects', label: 'Projects', icon: 'fas fa-code' },
                  { href: '#skills', label: 'Skills', icon: 'fas fa-cog' },
                  { href: '#experience', label: 'Experience', icon: 'fas fa-briefcase' },
                  { href: '#education', label: 'Education', icon: 'fas fa-graduation-cap' },
                  { href: '#certifications', label: 'Certifications', icon: 'fas fa-certificate' },
                  { href: '#contact', label: 'Contact', icon: 'fas fa-envelope' }
                ].map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    onTouchStart={createRipple}
                    onMouseDown={createRipple}
                    className="flex items-center gap-4 py-3 px-4 rounded-lg bg-black/80 transition-all duration-300 group relative overflow-hidden cursor-pointer"
                    onMouseEnter={() => setHoveredItem(item.href)}
                    onMouseLeave={() => setHoveredItem(null)}
                    variants={{
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: {
                          type: "spring",
                          stiffness: 400,
                          damping: 25,
                          mass: 0.8
                        }
                      },
                      hidden: {
                        opacity: 0,
                        x: -50
                      }
                    }}
                    whileHover={{
                      scale: 1.02,
                      x: 8,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{
                      scale: 0.96,
                      backgroundColor: 'rgba(0, 255, 255, 0.2)',
                      transition: { duration: 0.1 }
                    }}
                    style={{
                      backgroundColor: hoveredItem === item.href ? 'rgba(0, 255, 255, 0.1)' : 'transparent',
                      borderLeft: hoveredItem === item.href ? '3px solid #00ffff' : '3px solid transparent'
                    }}
                  >
                    <motion.i 
                      className={`${item.icon} text-tron`}
                      animate={{
                        scale: hoveredItem === item.href ? 1.15 : 1,
                        rotate: hoveredItem === item.href ? 10 : 0
                      }}
                      transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                    />
                    <motion.span 
                      className="text-white font-medium"
                      animate={{
                        color: hoveredItem === item.href ? '#00ffff' : '#ffffff',
                        x: hoveredItem === item.href ? 4 : 0
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.label}
                    </motion.span>
                    
                    {/* Subtle glow effect on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-tron/20 to-cyan-500/20 opacity-0"
                      animate={{
                        opacity: hoveredItem === item.href ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Ripple Effect for Touch Feedback */}
                    <AnimatePresence>
                      {rippleEffect && (
                        <motion.div
                          className="absolute pointer-events-none rounded-full"
                          style={{
                            left: rippleEffect.x - 25,
                            top: rippleEffect.y - 25,
                            width: 50,
                            height: 50,
                            backgroundColor: 'rgba(0, 255, 255, 0.4)',
                            border: '1px solid rgba(0, 255, 255, 0.8)'
                          }}
                          initial={{ scale: 0, opacity: 1 }}
                          animate={{ 
                            scale: [0, 0.5, 1, 1.8], 
                            opacity: [1, 0.8, 0.4, 0],
                            backgroundColor: [
                              'rgba(0, 255, 255, 0.4)',
                              'rgba(0, 255, 255, 0.3)',
                              'rgba(0, 255, 255, 0.1)',
                              'rgba(0, 255, 255, 0)'
                            ]
                          }}
                          exit={{ scale: 2.5, opacity: 0 }}
                          transition={{ 
                            duration: 0.6,
                            ease: [0.4, 0, 0.2, 1],
                            times: [0, 0.3, 0.7, 1]
                          }}
                        />
                      )}
                    </AnimatePresence>
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
