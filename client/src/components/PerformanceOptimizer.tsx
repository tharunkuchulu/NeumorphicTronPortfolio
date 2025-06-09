import { useEffect } from "react";

interface PerformanceOptimizerProps {
  children: React.ReactNode;
}

export default function PerformanceOptimizer({ children }: PerformanceOptimizerProps) {
  useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      // Preload fonts
      const fontUrls = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Orbitron:wght@400;500;700;900&display=swap',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
      ];

      fontUrls.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = url;
        document.head.appendChild(link);
      });
    };

    // Optimize animations for lower-end devices
    const optimizeForDevice = () => {
      const isLowEndDevice = () => {
        // Check for reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          return true;
        }
        
        // Check device memory (if available)
        const deviceMemory = (navigator as any).deviceMemory;
        if (deviceMemory && deviceMemory < 4) {
          return true;
        }
        
        // Check hardware concurrency (CPU cores)
        if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
          return true;
        }
        
        return false;
      };

      if (isLowEndDevice()) {
        document.documentElement.classList.add('reduce-animations');
        console.log('🚀 Reduced animations for lower-end device');
      }
    };

    // Enable hardware acceleration for smooth animations
    const enableHardwareAcceleration = () => {
      const animatedElements = document.querySelectorAll(
        '.motion-element, .glass-card, [data-animate], .floating-particle'
      );
      
      animatedElements.forEach(element => {
        (element as HTMLElement).style.willChange = 'transform, opacity';
        (element as HTMLElement).style.transform = 'translateZ(0)';
      });
    };

    // Optimize images with lazy loading
    const optimizeImages = () => {
      const images = document.querySelectorAll('img[data-src]');
      
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              img.src = img.dataset.src || '';
              img.classList.remove('lazy');
              imageObserver.unobserve(img);
            }
          });
        });

        images.forEach(img => imageObserver.observe(img));
      }
    };

    // Monitor performance and adjust
    const monitorPerformance = () => {
      if ('web-vital' in window) {
        // If web-vitals library is available, monitor core web vitals
        return;
      }

      // Basic performance monitoring
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime);
          }
          if (entry.entryType === 'first-input') {
            console.log('FID:', (entry as any).processingStart - entry.startTime);
          }
        });
      });

      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });
    };

    // Initialize optimizations
    preloadCriticalResources();
    optimizeForDevice();
    enableHardwareAcceleration();
    optimizeImages();
    monitorPerformance();

    // Cleanup function
    return () => {
      // Clean up observers if needed
    };
  }, []);

  return <>{children}</>;
}