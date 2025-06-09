import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen bg-dark-bg text-white flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-tron mb-4">Something went wrong</h2>
            <p className="text-gray-400 mb-6">Please refresh the page to continue</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-tron/20 border border-tron/30 rounded-lg text-tron hover:bg-tron/30 transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}