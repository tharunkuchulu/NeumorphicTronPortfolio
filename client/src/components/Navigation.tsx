import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSmartNavigation } from "./GlobalTransitionManager";

export default function Navigation() {
  const { navigateToSection } = useSmartNavigation();
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
    const sectionId = href.replace('#', '');
    navigateToSection(sectionId);
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

      {/* Redesigned Mobile Navigation Panel */}
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
          >
            <motion.div 
              className="fixed right-0 top-0 h-full w-80"
              style={{
                background: 'linear-gradient(145deg, rgba(0, 0, 0, 0.98) 0%, rgba(17, 24, 39, 0.98) 30%, rgba(31, 41, 55, 0.98) 70%, rgba(0, 0, 0, 0.98) 100%)',
                borderLeft: '2px solid #00ffff',
                boxShadow: '0 0 50px rgba(0, 255, 255, 0.4), inset 0 0 30px rgba(0, 255, 255, 0.15)',
                backdropFilter: 'blur(25px)',
                transform: `translateX(${dragOffset}px)`
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
              {/* Animated Circuit Background Pattern */}
              <div className="absolute inset-0 opacity-15">
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
                  ].map((item, index) => (
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
