import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, ReactNode } from 'react';
import LoadingSkeleton, { HeroSkeleton, ProjectSkeleton, SkillSkeleton, CardSkeleton } from './ui/LoadingSkeleton';

interface PageTransitionProps {
  children: ReactNode;
  isLoading?: boolean;
  skeletonType?: 'hero' | 'projects' | 'skills' | 'experience' | 'about' | 'contact' | 'default';
  delay?: number;
  className?: string;
}

export default function PageTransition({ 
  children, 
  isLoading = false, 
  skeletonType = 'default',
  delay = 0,
  className = ''
}: PageTransitionProps) {
  const [showContent, setShowContent] = useState(!isLoading);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!isLoading && delay > 0) {
      const timer = setTimeout(() => setShowContent(true), delay);
      return () => clearTimeout(timer);
    } else if (!isLoading) {
      setShowContent(true);
    }
  }, [isLoading, delay]);

  const renderSkeleton = () => {
    switch (skeletonType) {
      case 'hero':
        return <HeroSkeleton />;
      case 'projects':
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <LoadingSkeleton variant="text" lines={1} height="h-12" width="w-96 mx-auto" />
              <LoadingSkeleton variant="text" lines={2} height="h-4" width="w-full max-w-2xl mx-auto" />
            </div>
            <ProjectSkeleton />
            <div className="flex gap-4 justify-center">
              {Array.from({ length: 4 }).map((_, i) => (
                <LoadingSkeleton key={i} variant="card" className="w-48" />
              ))}
            </div>
          </div>
        );
      case 'skills':
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <LoadingSkeleton variant="text" lines={1} height="h-12" width="w-64 mx-auto" />
              <LoadingSkeleton variant="text" lines={2} height="h-4" width="w-full max-w-xl mx-auto" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <SkillSkeleton key={i} />
              ))}
            </div>
          </div>
        );
      case 'experience':
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <LoadingSkeleton variant="text" lines={1} height="h-12" width="w-80 mx-auto" />
              <LoadingSkeleton variant="text" lines={2} height="h-4" width="w-full max-w-2xl mx-auto" />
            </div>
            <div className="space-y-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="glass-card p-6 space-y-4">
                  <div className="flex gap-4">
                    <LoadingSkeleton variant="circular" width="w-16" height="h-16" />
                    <div className="flex-1 space-y-2">
                      <LoadingSkeleton variant="text" lines={1} height="h-6" width="w-64" />
                      <LoadingSkeleton variant="text" lines={1} height="h-4" width="w-48" />
                      <LoadingSkeleton variant="text" lines={1} height="h-3" width="w-32" />
                    </div>
                  </div>
                  <LoadingSkeleton variant="text" lines={3} height="h-4" />
                  <div className="flex gap-2">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <LoadingSkeleton key={j} variant="default" width="w-16" height="h-6" className="rounded-full" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'about':
        return (
          <div className="space-y-8">
            <div className="text-center space-y-6">
              <LoadingSkeleton variant="circular" width="w-48" height="h-48" className="mx-auto" />
              <div className="space-y-4">
                <LoadingSkeleton variant="text" lines={1} height="h-12" width="w-96 mx-auto" />
                <LoadingSkeleton variant="text" lines={1} height="h-6" width="w-80 mx-auto" />
                <LoadingSkeleton variant="text" lines={4} height="h-4" width="w-full max-w-3xl mx-auto" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="space-y-8 max-w-2xl mx-auto">
            <div className="text-center space-y-4">
              <LoadingSkeleton variant="text" lines={1} height="h-12" width="w-64 mx-auto" />
              <LoadingSkeleton variant="text" lines={2} height="h-4" width="w-full" />
            </div>
            <div className="glass-card p-8 space-y-6">
              <div className="space-y-4">
                <LoadingSkeleton variant="text" lines={1} height="h-4" width="w-24" />
                <LoadingSkeleton variant="default" height="h-12" className="rounded-lg" />
              </div>
              <div className="space-y-4">
                <LoadingSkeleton variant="text" lines={1} height="h-4" width="w-20" />
                <LoadingSkeleton variant="default" height="h-12" className="rounded-lg" />
              </div>
              <div className="space-y-4">
                <LoadingSkeleton variant="text" lines={1} height="h-4" width="w-24" />
                <LoadingSkeleton variant="default" height="h-32" className="rounded-lg" />
              </div>
              <LoadingSkeleton variant="default" height="h-12" width="w-32" className="rounded-lg" />
            </div>
          </div>
        );
      default:
        return <LoadingSkeleton variant="card" />;
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        {!showContent ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderSkeleton()}
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ 
              duration: 0.6,
              ease: [0.4, 0, 0.2, 1],
              delay: 0.1
            }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Higher-order component for easy section wrapping
export function withPageTransition<T extends object>(
  Component: React.ComponentType<T>,
  skeletonType: PageTransitionProps['skeletonType'] = 'default',
  loadingDuration = 800
) {
  return function WrappedComponent(props: T) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => setIsLoading(false), loadingDuration);
      return () => clearTimeout(timer);
    }, []);

    return (
      <PageTransition isLoading={isLoading} skeletonType={skeletonType}>
        <Component {...props} />
      </PageTransition>
    );
  };
}