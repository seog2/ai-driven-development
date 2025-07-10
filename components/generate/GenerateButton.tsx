"use client"

import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { IGenerateButtonProps } from '@/types'

export default function GenerateButton({ 
  isGenerating, 
  isDisabled, 
  onClick 
}: IGenerateButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={isGenerating || isDisabled}
      className="w-full h-12 text-lg"
    >
      {isGenerating ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          이미지 생성 중... (약 10-30초)
        </>
      ) : (
        '이미지 생성하기'
      )}
    </Button>
  )
} 