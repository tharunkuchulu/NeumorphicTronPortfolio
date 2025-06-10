import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TransitionContextType {
  isTransitioning: boolean;
  currentSection: string;
  setCurrentSection: (section: string) => void;
  triggerTransition: (targetSection: string) => void;
  registerSection: (sectionId: string, loadingDuration?: number) => void;
  sectionLoadingStates: Record<string, boolean>;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export const useTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error('useTransition must be used within TransitionProvider');
  }
  return context;
};

interface TransitionProviderProps {
  children: ReactNode;
}

export function TransitionProvider({ children }: TransitionProviderProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentSection, setCurrentSection] = useState('hero');
  const [sectionLoadingStates, setSectionLoadingStates] = useState<Record<string, boolean>>({});
  const [registeredSections, setRegisteredSections] = useState<Record<string, number>>({});

  const registerSection = (sectionId: string, loadingDuration = 1000) => {
    setRegisteredSections(prev => ({ ...prev, [sectionId]: loadingDuration }));
    setSectionLoadingStates(prev => ({ ...prev, [sectionId]: true }));
    
    // Auto-complete loading after duration
    setTimeout(() => {
      setSectionLoadingStates(prev => ({ ...prev, [sectionId]: false }));
    }, loadingDuration);
  };

  const triggerTransition = async (targetSection: string) => {
    if (isTransitioning || currentSection === targetSection) return;
    
    setIsTransitioning(true);
    
    // Set target section as loading
    setSectionLoadingStates(prev => ({ ...prev, [targetSection]: true }));
    
    // Short delay for smooth transition
    await new Promise(resolve => setTimeout(resolve, 200));
    
    setCurrentSection(targetSection);
    
    // Simulate loading for target section
    const loadingDuration = registeredSections[targetSection] || 800;
    setTimeout(() => {
      setSectionLoadingStates(prev => ({ ...prev, [targetSection]: false }));
      setIsTransitioning(false);
    }, loadingDuration);
  };

  // Initialize sections on mount
  useEffect(() => {
    const sections = ['hero', 'about', 'projects', 'skills', 'experience', 'education', 'certifications', 'contact'];
    sections.forEach(section => {
      registerSection(section, section === 'hero' ? 1200 : 800);
    });
  }, []);

  // Intersection Observer for automatic section detection
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !isTransitioning) {
          const sectionId = entry.target.id;
          if (sectionId && sectionId !== currentSection) {
            setCurrentSection(sectionId);
          }
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, [currentSection, isTransitioning]);

  const value = {
    isTransitioning,
    currentSection,
    setCurrentSection,
    triggerTransition,
    registerSection,
    sectionLoadingStates
  };

  return (
    <TransitionContext.Provider value={value}>
      {children}
      <GlobalTransitionOverlay />
    </TransitionContext.Provider>
  );
}

// Global transition overlay for seamless page-wide transitions
function GlobalTransitionOverlay() {
  const { isTransitioning, currentSection } = useTransition();

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          className="fixed inset-0 z-[9998] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Scanning line effect */}
          <motion.div
            className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-tron to-transparent"
            initial={{ y: -4 }}
            animate={{ y: window.innerHeight }}
            transition={{ 
              duration: 0.8,
              ease: "easeInOut",
              repeat: 1,
              repeatType: "reverse"
            }}
          />
          
          {/* Pulse effect */}
          <motion.div
            className="absolute inset-0 bg-black/10 backdrop-blur-[1px]"
            animate={{
              opacity: [0, 0.3, 0]
            }}
            transition={{ duration: 0.6 }}
          />
          
          {/* Loading indicator */}
          <div className="absolute bottom-8 right-8 flex items-center gap-3 text-tron">
            <motion.div
              className="w-2 h-2 bg-tron rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
            <span className="text-sm font-mono">
              Loading {currentSection}...
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Enhanced Navigation Hook with transition management
export function useSmartNavigation() {
  const { triggerTransition } = useTransition();

  const navigateToSection = (sectionId: string, smooth = true) => {
    const element = document.querySelector(`#${sectionId}`);
    if (!element) return;

    if (smooth) {
      triggerTransition(sectionId);
      setTimeout(() => {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 300);
    } else {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return { navigateToSection };
}