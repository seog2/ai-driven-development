"use client"

import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { IGenerateHeaderProps } from '@/types'

export default function GenerateHeader({ onBack }: IGenerateHeaderProps) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            뒤로가기
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Artify</h1>
        </div>
      </div>
    </header>
  )
} 