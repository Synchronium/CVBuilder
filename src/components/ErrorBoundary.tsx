import { Component, type ErrorInfo, type ReactNode } from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  error: Error | null;
};

/**
 * Catches render-time errors (e.g. schema validation failing in resolveCv on
 * malformed CV data) and shows a readable message instead of a blank screen.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("CVBuilder render error:", error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <main className="app">
          <div className="app-error" role="alert">
            <h1>Something went wrong</h1>
            <p>The CV could not be rendered. This usually means the CV data did not match the expected schema.</p>
            <pre className="app-error__detail">{this.state.error.message}</pre>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}
