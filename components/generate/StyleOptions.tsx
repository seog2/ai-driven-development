"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { IStyleOptionsProps } from '@/types'

export default function StyleOptions({ 
  styleOptions, 
  onStyleOptionChange, 
  onPresetChange 
}: IStyleOptionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>스타일 옵션</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 스타일 프리셋 */}
        <div>
          <label className="text-sm font-medium mb-2 block">스타일 프리셋</label>
          <div className="grid grid-cols-3 gap-2">
            {(['realistic', 'abstract', 'cartoon'] as const).map((preset) => (
              <Button
                key={preset}
                variant={styleOptions.stylePreset === preset ? 'default' : 'outline'}
                size="sm"
                onClick={() => onPresetChange(preset)}
                className="text-xs"
              >
                {preset === 'realistic' && '사실적'}
                {preset === 'abstract' && '추상적'}
                {preset === 'cartoon' && '만화적'}
              </Button>
            ))}
          </div>
        </div>

        {/* 색감 선택 */}
        <div>
          <label className="text-sm font-medium mb-2 block">색감</label>
          <div className="grid grid-cols-2 gap-2">
            {(['warm', 'cool', 'monochrome', 'neutral'] as const).map((tone) => (
              <Button
                key={tone}
                variant={styleOptions.colorTone === tone ? 'default' : 'outline'}
                size="sm"
                onClick={() => onStyleOptionChange('colorTone', tone)}
                className="text-xs"
              >
                {tone === 'warm' && '따뜻한'}
                {tone === 'cool' && '차가운'}
                {tone === 'monochrome' && '모노톤'}
                {tone === 'neutral' && '중립적'}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 