"use client"

import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { IPromptInputProps } from '@/types'

export default function PromptInput({ 
  prompt, 
  promptError, 
  onPromptChange, 
  onValidate 
}: IPromptInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    onPromptChange(value)
    onValidate(value)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>프롬프트 입력</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Input
            value={prompt}
            onChange={handleChange}
            placeholder="생성하고 싶은 이미지를 설명해주세요..."
            className={promptError ? 'border-red-500' : ''}
          />
          {promptError && (
            <p className="text-sm text-red-500 mt-1">{promptError}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            프롬프트 작성 팁: 구체적이고 명확한 설명을 사용하세요. (예: "석양을 배경으로 한 고양이")
          </p>
        </div>
      </CardContent>
    </Card>
  )
} 