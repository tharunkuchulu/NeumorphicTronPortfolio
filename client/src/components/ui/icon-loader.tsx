import { lazy, Suspense } from 'react';
import type { LucideProps } from 'lucide-react';

// Dynamic icon imports to reduce bundle size
const iconComponents = {
  ChevronDown: lazy(() => import('lucide-react').then(mod => ({ default: mod.ChevronDown }))),
  ChevronRight: lazy(() => import('lucide-react').then(mod => ({ default: mod.ChevronRight }))),
  ChevronLeft: lazy(() => import('lucide-react').then(mod => ({ default: mod.ChevronLeft }))),
  ChevronUp: lazy(() => import('lucide-react').then(mod => ({ default: mod.ChevronUp }))),
  MoreHorizontal: lazy(() => import('lucide-react').then(mod => ({ default: mod.MoreHorizontal }))),
  ArrowLeft: lazy(() => import('lucide-react').then(mod => ({ default: mod.ArrowLeft }))),
  ArrowRight: lazy(() => import('lucide-react').then(mod => ({ default: mod.ArrowRight }))),
  Check: lazy(() => import('lucide-react').then(mod => ({ default: mod.Check }))),
  Circle: lazy(() => import('lucide-react').then(mod => ({ default: mod.Circle }))),
  X: lazy(() => import('lucide-react').then(mod => ({ default: mod.X }))),
  Dot: lazy(() => import('lucide-react').then(mod => ({ default: mod.Dot }))),
  Search: lazy(() => import('lucide-react').then(mod => ({ default: mod.Search }))),
  GripVertical: lazy(() => import('lucide-react').then(mod => ({ default: mod.GripVertical }))),
  PanelLeft: lazy(() => import('lucide-react').then(mod => ({ default: mod.PanelLeft }))),
  AlertCircle: lazy(() => import('lucide-react').then(mod => ({ default: mod.AlertCircle }))),
};

interface IconProps extends LucideProps {
  name: keyof typeof iconComponents;
}

export function Icon({ name, ...props }: IconProps) {
  const IconComponent = iconComponents[name];
  
  return (
    <Suspense fallback={<div style={{ width: '1em', height: '1em' }} />}>
      <IconComponent {...props} />
    </Suspense>
  );
}