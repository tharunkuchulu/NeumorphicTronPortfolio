import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  className?: string;
  variant?: 'default' | 'circular' | 'text' | 'card' | 'hero' | 'project' | 'skill';
  lines?: number;
  width?: string;
  height?: string;
  animate?: boolean;
}

export default function LoadingSkeleton({
  className,
  variant = 'default',
  lines = 1,
  width = 'w-full',
  height = 'h-4',
  animate = true
}: LoadingSkeletonProps) {
  const baseClasses = "bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded-lg";
  
  const shimmerAnimation = {
    backgroundPosition: ['200% 0', '-200% 0'],
    backgroundSize: '200% 100%'
  };

  const pulseAnimation = {
    opacity: [0.4, 0.8, 0.4],
    scale: [1, 1.01, 1]
  };

  const SkeletonBase = ({ children, customClasses }: { children?: React.ReactNode; customClasses?: string }) => (
    <motion.div
      className={cn(baseClasses, customClasses, className)}
      animate={animate ? { ...shimmerAnimation, ...pulseAnimation } : {}}
      transition={{
        backgroundPosition: { duration: 2, repeat: Infinity, ease: "linear" },
        opacity: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
        scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
      }}
      style={{
        background: animate 
          ? 'linear-gradient(90deg, #374151 25%, #4B5563 50%, #374151 75%)'
          : '#374151'
      }}
    >
      {children}
    </motion.div>
  );

  switch (variant) {
    case 'circular':
      return <SkeletonBase customClasses={cn('rounded-full', width, height)} />;
    
    case 'text':
      return (
        <div className="space-y-2">
          {Array.from({ length: lines }).map((_, i) => (
            <SkeletonBase
              key={i}
              customClasses={cn(
                height,
                i === lines - 1 ? 'w-3/4' : width
              )}
            />
          ))}
        </div>
      );
    
    case 'card':
      return (
        <div className="space-y-4 p-6 border border-gray-700 rounded-lg bg-gray-900/50">
          <SkeletonBase customClasses="w-12 h-12 rounded-full" />
          <div className="space-y-2">
            <SkeletonBase customClasses="h-6 w-3/4" />
            <SkeletonBase customClasses="h-4 w-full" />
            <SkeletonBase customClasses="h-4 w-5/6" />
          </div>
          <div className="flex gap-2">
            <SkeletonBase customClasses="h-8 w-20 rounded-full" />
            <SkeletonBase customClasses="h-8 w-24 rounded-full" />
          </div>
        </div>
      );
    
    case 'hero':
      return (
        <div className="space-y-8 text-center">
          <SkeletonBase customClasses="w-32 h-32 rounded-full mx-auto" />
          <div className="space-y-4">
            <SkeletonBase customClasses="h-12 w-96 mx-auto" />
            <SkeletonBase customClasses="h-6 w-80 mx-auto" />
            <SkeletonBase customClasses="h-4 w-full max-w-2xl mx-auto" />
            <SkeletonBase customClasses="h-4 w-3/4 max-w-xl mx-auto" />
          </div>
          <div className="flex gap-4 justify-center">
            <SkeletonBase customClasses="h-12 w-40 rounded-lg" />
            <SkeletonBase customClasses="h-12 w-32 rounded-lg" />
          </div>
        </div>
      );
    
    case 'project':
      return (
        <div className="glass-card p-6 space-y-6">
          <div className="flex gap-6">
            <div className="space-y-4">
              <SkeletonBase customClasses="w-20 h-20 rounded-full" />
              <SkeletonBase customClasses="h-8 w-48" />
              <SkeletonBase customClasses="h-6 w-24 rounded-full" />
            </div>
            <div className="flex-1 space-y-4">
              <SkeletonBase customClasses="h-6 w-32" />
              <div className="space-y-2">
                <SkeletonBase customClasses="h-4 w-full" />
                <SkeletonBase customClasses="h-4 w-full" />
                <SkeletonBase customClasses="h-4 w-3/4" />
              </div>
              <div className="flex gap-2 flex-wrap">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonBase key={i} customClasses="h-6 w-16 rounded-full" />
                ))}
              </div>
              <div className="flex gap-4">
                <SkeletonBase customClasses="h-10 w-32 rounded-lg" />
                <SkeletonBase customClasses="h-10 w-28 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      );
    
    case 'skill':
      return (
        <div className="space-y-4">
          <SkeletonBase customClasses="w-16 h-16 rounded-full mx-auto" />
          <div className="text-center space-y-2">
            <SkeletonBase customClasses="h-5 w-24 mx-auto" />
            <SkeletonBase customClasses="h-3 w-16 mx-auto" />
          </div>
          <SkeletonBase customClasses="h-2 w-full rounded-full" />
        </div>
      );
    
    default:
      return <SkeletonBase customClasses={cn(width, height)} />;
  }
}

// Specialized skeleton components for different sections
export const HeroSkeleton = () => <LoadingSkeleton variant="hero" />;
export const ProjectSkeleton = () => <LoadingSkeleton variant="project" />;
export const SkillSkeleton = () => <LoadingSkeleton variant="skill" />;
export const CardSkeleton = () => <LoadingSkeleton variant="card" />;