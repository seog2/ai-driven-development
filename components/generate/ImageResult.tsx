"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Download, Share2, RefreshCw, Save, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { IImageResultProps } from '@/types'

export default function ImageResult({
  isGenerating,
  generatedImage,
  isSaving,
  isDownloading,
  onSaveToGallery,
  onShare,
  onDownload,
  onRegenerate
}: IImageResultProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>생성된 이미지</CardTitle>
      </CardHeader>
      <CardContent>
        {isGenerating ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] bg-gray-100 rounded-lg">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
            <p className="text-gray-600">AI가 창의적인 이미지를 만들고 있습니다...</p>
          </div>
        ) : generatedImage ? (
          <div className="space-y-4">
            {/* 이미지 표시 */}
            <div className="relative aspect-square w-full max-w-lg mx-auto">
              <Image
                src={generatedImage}
                alt="생성된 이미지"
                fill
                className="object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                sizes="(max-width: 768px) 100vw, 50vw"
                onClick={() => window.open(generatedImage, '_blank')}
              />
            </div>

            {/* 액션 버튼 그룹 */}
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                onClick={onSaveToGallery}
                disabled={isSaving}
                variant="outline"
                className="flex items-center gap-2"
              >
                {isSaving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save size={16} />
                )}
                갤러리 저장
              </Button>
              
              <Button
                onClick={onShare}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Share2 size={16} />
                커뮤니티 공유
              </Button>
              
              <Button
                onClick={onDownload}
                disabled={isDownloading}
                variant="outline"
                className="flex items-center gap-2"
              >
                {isDownloading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Download size={16} />
                )}
                {isDownloading ? '다운로드 중...' : '다운로드'}
              </Button>
              
              <Button
                onClick={onRegenerate}
                variant="outline"
                className="flex items-center gap-2"
              >
                <RefreshCw size={16} />
                다시 생성
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[400px] bg-gray-100 rounded-lg">
            <p className="text-gray-600">프롬프트를 입력하고 이미지를 생성해보세요!</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 