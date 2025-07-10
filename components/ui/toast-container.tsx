"use client"

import * as React from "react"
import { Toast, ToastProps } from "./toast"

export interface ToastData {
  id: string
  title?: string
  description?: string
  type?: 'success' | 'error' | 'info' | 'warning'
  duration?: number
}

interface ToastContainerProps {
  toasts: ToastData[]
  onRemove: (id: string) => void
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          title={toast.title}
          description={toast.description}
          type={toast.type}
          duration={toast.duration}
          onClose={onRemove}
        />
      ))}
    </div>
  )
} 