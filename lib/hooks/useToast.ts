"use client"

import { useState, useCallback } from 'react'
import { ToastData } from '@/components/ui/toast-container'

export function useToast() {
  const [toasts, setToasts] = useState<ToastData[]>([])

  const addToast = useCallback((toast: Omit<ToastData, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast: ToastData = {
      id,
      duration: 4000,
      ...toast
    }
    
    setToasts(prev => [...prev, newToast])
    return id
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  const toast = {
    success: (title: string, description?: string) => 
      addToast({ title, description, type: 'success' }),
    error: (title: string, description?: string) => 
      addToast({ title, description, type: 'error' }),
    info: (title: string, description?: string) => 
      addToast({ title, description, type: 'info' }),
    warning: (title: string, description?: string) => 
      addToast({ title, description, type: 'warning' })
  }

  return {
    toasts,
    toast,
    removeToast
  }
} 