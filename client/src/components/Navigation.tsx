import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [rippleEffect, setRippleEffect] = useState<{ x: number; y: number } | null>(null);

  const createRipple = (e: React.MouseEvent | React.TouchEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    setRippleEffect({ x, y });
    setTimeout(() => setRippleEffect(null), 600);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
      document.body.style.height = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
      document.body.style.height = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <motion.div
          className="text-2xl font-bold text-tron font-orbitron"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          Tharun
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {[
            { href: '#hero', label: 'Home' },
            { href: '#about', label: 'About' },
            { href: '#projects', label: 'Projects' },
            { href: '#skills', label: 'Skills' },
            { href: '#experience', label: 'Experience' },
            { href: '#contact', label: 'Contact' }
          ].map((item, index) => (
            <motion.a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-white hover:text-tron transition-colors duration-300 font-medium"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {item.label}
            </motion.a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden w-10 h-10 rounded-full bg-tron/20 border border-tron/30 flex items-center justify-center text-tron relative overflow-hidden"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            className="w-5 h-5 flex flex-col justify-center items-center"
            animate={isMobileMenuOpen ? "open" : "closed"}
          >
            <motion.span
              className="w-5 h-0.5 bg-tron block mb-1"
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: 45, y: 2 }
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="w-5 h-0.5 bg-tron block mb-1"
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 }
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="w-5 h-0.5 bg-tron block"
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: -45, y: -2 }
              }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
            />
          </motion.div>
        </motion.button>
      </div>

      {/* Mobile Navigation Panel with Enhanced Scroll Prevention */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-[9998] md:hidden"
            style={{ 
              background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.85) 0%, rgba(17, 24, 39, 0.9) 50%, rgba(0, 0, 0, 0.85) 100%)',
              backdropFilter: 'blur(15px)'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            onTouchMove={(e) => e.preventDefault()}
          >
            <motion.div 
              className="fixed right-0 top-0 h-full w-80"
              style={{
                background: 'linear-gradient(145deg, rgba(0, 0, 0, 0.98) 0%, rgba(17, 24, 39, 0.98) 30%, rgba(31, 41, 55, 0.98) 70%, rgba(0, 0, 0, 0.98) 100%)',
                borderLeft: '2px solid #00ffff',
                boxShadow: '0 0 50px rgba(0, 255, 255, 0.4), inset 0 0 30px rgba(0, 255, 255, 0.15)',
                backdropFilter: 'blur(25px)',
                overflowY: 'auto',
                overscrollBehavior: 'contain'
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
              onClick={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              {/* Animated Circuit Background Pattern */}
              <div className="absolute inset-0 opacity-15 pointer-events-none">
                {Array.from({ length: 3 }).map((_, i) => (
                  <motion.div
                    key={`circuit-${i}`}
                    className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-tron/80 to-transparent"
                    style={{ top: `${(i + 1) * 25}%` }}
                    animate={{
                      opacity: [0.3, 0.9, 0.3],
                      scaleX: [0.8, 1, 0.8]
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                ))}
                {Array.from({ length: 4 }).map((_, i) => (
                  <motion.div
                    key={`node-${i}`}
                    className="absolute w-2 h-2 rounded-full bg-tron/80"
                    style={{
                      left: `${20 + (i % 2) * 60}%`,
                      top: `${30 + Math.floor(i / 2) * 40}%`,
                      boxShadow: '0 0 12px rgba(0, 255, 255, 0.9)'
                    }}
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.3,
                      repeat: Infinity
                    }}
                  />
                ))}
              </div>

              {/* Header Section */}
              <div className="p-6 border-b border-tron/30 relative z-10">
                <motion.div 
                  className="flex justify-between items-center"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: 0.2, duration: 0.4 }
                  }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div>
                    <motion.h3 
                      className="text-tron font-orbitron text-xl font-bold mb-1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ 
                        opacity: 1, 
                        x: 0,
                        transition: { delay: 0.3, duration: 0.4 }
                      }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      Navigation
                    </motion.h3>
                    <motion.p 
                      className="text-xs text-gray-400"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ 
                        opacity: 1, 
                        x: 0,
                        transition: { delay: 0.4, duration: 0.4 }
                      }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      Portfolio Sections
                    </motion.p>
                  </div>
                  <motion.button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-tron relative overflow-hidden"
                    style={{
                      background: 'rgba(0, 255, 255, 0.1)',
                      border: '2px solid rgba(0, 255, 255, 0.3)',
                      boxShadow: '0 0 20px rgba(0, 255, 255, 0.2)'
                    }}
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: 90,
                      boxShadow: '0 0 30px rgba(0, 255, 255, 0.4)'
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <i className="fas fa-times text-sm relative z-10"></i>
                    <motion.div
                      className="absolute inset-0 bg-tron/20 rounded-full"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.button>
                </motion.div>
              </div>

              {/* Navigation Links */}
              <div className="p-6 relative z-10">
                <motion.div 
                  className="space-y-3"
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
                  ].map((item) => (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      onTouchStart={createRipple}
                      onMouseDown={createRipple}
                      className="flex items-center gap-4 py-4 px-4 rounded-xl transition-all duration-300 group relative overflow-hidden cursor-pointer"
                      style={{
                        background: hoveredItem === item.href 
                          ? 'linear-gradient(135deg, rgba(0, 255, 255, 0.15) 0%, rgba(34, 211, 238, 0.1) 100%)'
                          : 'linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(17, 24, 39, 0.4) 100%)',
                        border: hoveredItem === item.href 
                          ? '1px solid rgba(0, 255, 255, 0.3)' 
                          : '1px solid rgba(75, 85, 99, 0.3)',
                        boxShadow: hoveredItem === item.href 
                          ? '0 0 20px rgba(0, 255, 255, 0.2), inset 0 0 20px rgba(0, 255, 255, 0.1)' 
                          : '0 4px 10px rgba(0, 0, 0, 0.3)',
                        backdropFilter: 'blur(10px)'
                      }}
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
                        transition: { duration: 0.1 }
                      }}
                    >
                      <motion.div
                        className="w-10 h-10 rounded-full flex items-center justify-center relative"
                        style={{
                          background: hoveredItem === item.href 
                            ? 'linear-gradient(135deg, rgba(0, 255, 255, 0.2) 0%, rgba(34, 211, 238, 0.2) 100%)'
                            : 'rgba(0, 255, 255, 0.1)',
                          border: '1px solid rgba(0, 255, 255, 0.3)'
                        }}
                        animate={{
                          rotate: hoveredItem === item.href ? 5 : 0,
                          scale: hoveredItem === item.href ? 1.1 : 1
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.i 
                          className={`${item.icon} text-tron`}
                          animate={{
                            scale: hoveredItem === item.href ? 1.1 : 1
                          }}
                          transition={{ duration: 0.2 }}
                        />
                      </motion.div>
                      
                      <motion.span
                        className="font-medium text-white flex-1"
                        animate={{
                          color: hoveredItem === item.href ? '#00ffff' : '#ffffff',
                          x: hoveredItem === item.href ? 4 : 0
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.label}
                      </motion.span>

                      <motion.i
                        className="fas fa-chevron-right text-xs text-gray-500"
                        animate={{
                          x: hoveredItem === item.href ? 4 : 0,
                          color: hoveredItem === item.href ? '#00ffff' : '#6b7280'
                        }}
                        transition={{ duration: 0.2 }}
                      />
                      
                      {/* Enhanced Ripple Effect */}
                      <AnimatePresence>
                        {rippleEffect && (
                          <motion.div
                            className="absolute pointer-events-none rounded-full"
                            style={{
                              left: rippleEffect.x - 30,
                              top: rippleEffect.y - 30,
                              width: 60,
                              height: 60,
                              background: 'radial-gradient(circle, rgba(0, 255, 255, 0.4) 0%, rgba(0, 255, 255, 0) 70%)',
                              border: '1px solid rgba(0, 255, 255, 0.6)'
                            }}
                            initial={{ scale: 0, opacity: 1 }}
                            animate={{ 
                              scale: [0, 0.3, 0.6, 1.2], 
                              opacity: [1, 0.8, 0.4, 0]
                            }}
                            exit={{ scale: 1.5, opacity: 0 }}
                            transition={{ 
                              duration: 0.6,
                              ease: [0.4, 0, 0.2, 1]
                            }}
                          />
                        )}
                      </AnimatePresence>
                    </motion.a>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}