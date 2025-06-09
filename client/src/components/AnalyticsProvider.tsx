import { useEffect } from 'react';
import { useLocation } from 'wouter';

interface AnalyticsEvent {
  event: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
}

class AnalyticsManager {
  private events: AnalyticsEvent[] = [];
  private isEnabled = false;

  constructor() {
    this.isEnabled = typeof window !== 'undefined' && 
                     !window.location.hostname.includes('localhost') &&
                     !window.location.hostname.includes('127.0.0.1');
  }

  track(event: AnalyticsEvent) {
    if (!this.isEnabled) {
      console.log('📊 Analytics Event (Dev):', event);
      return;
    }

    this.events.push(event);
    
    // Send to Google Analytics if available
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
      });
    }

    // Send to other analytics services
    this.sendToAnalytics(event);
  }

  trackPageView(path: string) {
    this.track({
      event: 'page_view',
      category: 'navigation',
      action: 'page_view',
      label: path,
    });
  }

  trackInteraction(element: string, action: string) {
    this.track({
      event: 'interaction',
      category: 'user_engagement',
      action,
      label: element,
    });
  }

  trackPerformance(metric: string, value: number) {
    this.track({
      event: 'performance',
      category: 'web_vitals',
      action: metric,
      value,
    });
  }

  private sendToAnalytics(event: AnalyticsEvent) {
    // In a real application, you might send to:
    // - Google Analytics
    // - Mixpanel
    // - Amplitude
    // - Custom analytics endpoint
    
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to custom endpoint
      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      }).catch(err => console.warn('Analytics failed:', err));
    }
  }

  getEvents() {
    return this.events;
  }

  clearEvents() {
    this.events = [];
  }
}

export const analytics = new AnalyticsManager();

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

export default function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const [location] = useLocation();

  useEffect(() => {
    // Track page views
    analytics.trackPageView(location);
  }, [location]);

  useEffect(() => {
    // Track performance metrics
    const trackWebVitals = () => {
      // Largest Contentful Paint
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'largest-contentful-paint') {
            analytics.trackPerformance('LCP', entry.startTime);
          }
          if (entry.entryType === 'first-input') {
            analytics.trackPerformance('FID', (entry as any).processingStart - entry.startTime);
          }
        });
      });

      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });

      // Cumulative Layout Shift
      let cumulativeLayoutShift = 0;
      const clsObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (!(entry as any).hadRecentInput) {
            cumulativeLayoutShift += (entry as any).value;
          }
        });
      });

      clsObserver.observe({ entryTypes: ['layout-shift'] });

      // Send CLS when page is hidden
      const sendCLS = () => {
        analytics.trackPerformance('CLS', cumulativeLayoutShift);
      };

      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          sendCLS();
        }
      });
    };

    trackWebVitals();

    // Track user interactions
    const trackClicks = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A') {
        analytics.trackInteraction(
          target.textContent?.trim() || target.tagName.toLowerCase(),
          'click'
        );
      }
    };

    document.addEventListener('click', trackClicks);

    return () => {
      document.removeEventListener('click', trackClicks);
    };
  }, []);

  return <>{children}</>;
}