

import { AlertCircle } from "lucide-react"
import { Component, type ErrorInfo, type ReactNode } from "react"

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error caught by ErrorBoundary:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="p-4 border border-red-200 bg-red-50 rounded-md text-red-800 flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          <div>
            <h3 className="font-medium">Something went wrong</h3>
            <p className="text-sm">{this.state.error?.message || "An error occurred while rendering this component"}</p>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

