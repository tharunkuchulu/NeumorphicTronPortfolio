import { createContext, useContext, ReactNode } from 'react';

interface AnalyticsContextType {
  trackEvent: (eventName: string, properties?: Record<string, any>) => void;
  trackPageView: (pageName: string) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | null>(null);

interface AnalyticsProviderProps {
  children: ReactNode;
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    // Analytics tracking implementation
    if (typeof window !== 'undefined') {
      console.log('Analytics Event:', eventName, properties);
    }
  };

  const trackPageView = (pageName: string) => {
    // Page view tracking implementation
    if (typeof window !== 'undefined') {
      console.log('Analytics Page View:', pageName);
    }
  };

  return (
    <AnalyticsContext.Provider value={{ trackEvent, trackPageView }}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
}

// Named export for compatibility
export const analytics = {
  trackEvent: (eventName: string, properties?: Record<string, any>) => {
    if (typeof window !== 'undefined') {
      console.log('Analytics Event:', eventName, properties);
    }
  },
  trackPageView: (pageName: string) => {
    if (typeof window !== 'undefined') {
      console.log('Analytics Page View:', pageName);
    }
  }
};