import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SkipNavigation() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-tron text-black px-4 py-2 rounded-lg font-semibold z-50 focus:z-50"
    >
      Skip to main content
    </a>
  );
}

export function KeyboardNavigation() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Focus management for modal dialogs
      if (e.key === 'Escape') {
        const openModal = document.querySelector('[role="dialog"][aria-hidden="false"]');
        if (openModal) {
          const closeButton = openModal.querySelector('[aria-label*="close"]') as HTMLElement;
          closeButton?.click();
        }
      }

      // Quick navigation with keyboard shortcuts
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case '1':
            e.preventDefault();
            document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
            break;
          case '2':
            e.preventDefault();
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            break;
          case '3':
            e.preventDefault();
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            break;
          case '4':
            e.preventDefault();
            document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
            break;
          case '5':
            e.preventDefault();
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return null;
}

export function FocusIndicator() {
  const [focusedElement, setFocusedElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const handleFocus = (e: FocusEvent) => {
      setFocusedElement(e.target as HTMLElement);
    };

    const handleBlur = () => {
      setFocusedElement(null);
    };

    document.addEventListener('focusin', handleFocus);
    document.addEventListener('focusout', handleBlur);

    return () => {
      document.removeEventListener('focusin', handleFocus);
      document.removeEventListener('focusout', handleBlur);
    };
  }, []);

  if (!focusedElement) return null;

  const rect = focusedElement.getBoundingClientRect();

  return (
    <motion.div
      className="fixed pointer-events-none z-50 border-2 border-tron rounded-lg shadow-lg shadow-tron/50"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        x: rect.left - 4,
        y: rect.top - 4,
        width: rect.width + 8,
        height: rect.height + 8,
      }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
    />
  );
}

export function ReducedMotionProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = () => {
      if (mediaQuery.matches) {
        document.documentElement.classList.add('reduce-motion');
      } else {
        document.documentElement.classList.remove('reduce-motion');
      }
    };

    handleChange();
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return <>{children}</>;
}

export function LiveAnnouncer() {
  const [announcements, setAnnouncements] = useState<string[]>([]);

  useEffect(() => {
    const announce = (message: string) => {
      setAnnouncements(prev => [...prev, message]);
      setTimeout(() => {
        setAnnouncements(prev => prev.slice(1));
      }, 3000);
    };

    // Listen for custom announcement events
    const handleAnnouncement = (e: CustomEvent) => {
      announce(e.detail.message);
    };

    document.addEventListener('announce', handleAnnouncement as EventListener);
    
    return () => {
      document.removeEventListener('announce', handleAnnouncement as EventListener);
    };
  }, []);

  return (
    <div aria-live="polite" className="sr-only">
      <AnimatePresence>
        {announcements.map((announcement, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {announcement}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// Utility function to announce messages
export function announce(message: string) {
  const event = new CustomEvent('announce', { detail: { message } });
  document.dispatchEvent(event);
}