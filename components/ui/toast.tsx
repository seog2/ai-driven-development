"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { X, CheckCircle, AlertCircle, Info } from "lucide-react"

export interface ToastProps {
  id: string
  title?: string
  description?: string
  type?: 'success' | 'error' | 'info' | 'warning'
  duration?: number
  onClose: (id: string) => void
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ id, title, description, type = 'info', duration = 4000, onClose }, ref) => {
    React.useEffect(() => {
      const timer = setTimeout(() => {
        onClose(id)
      }, duration)

      return () => clearTimeout(timer)
    }, [id, duration, onClose])

    const getIcon = () => {
      switch (type) {
        case 'success':
          return <CheckCircle className="h-5 w-5 text-green-500" />
        case 'error':
          return <AlertCircle className="h-5 w-5 text-red-500" />
        case 'warning':
          return <AlertCircle className="h-5 w-5 text-yellow-500" />
        default:
          return <Info className="h-5 w-5 text-blue-500" />
      }
    }

    const getStyles = () => {
      switch (type) {
        case 'success':
          return 'border-green-200 bg-green-50'
        case 'error':
          return 'border-red-200 bg-red-50'
        case 'warning':
          return 'border-yellow-200 bg-yellow-50'
        default:
          return 'border-blue-200 bg-blue-50'
      }
    }

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex w-full max-w-sm items-start gap-3 rounded-lg border p-4 shadow-lg transition-all duration-300 ease-in-out",
          getStyles()
        )}
      >
        {getIcon()}
        <div className="flex-1">
          {title && (
            <div className="text-sm font-medium text-gray-900">{title}</div>
          )}
          {description && (
            <div className="text-sm text-gray-600 mt-1">{description}</div>
          )}
        </div>
        <button
          onClick={() => onClose(id)}
          className="flex-shrink-0 rounded-md p-1 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          <X className="h-4 w-4 text-gray-500" />
        </button>
      </div>
    )
  }
)
Toast.displayName = "Toast"

export { Toast } 