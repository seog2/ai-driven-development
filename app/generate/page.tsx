"use client"

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Download, Share2, RefreshCw, Save, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { IStyleOptions, ISharePostData } from '@/types'
import { 
  mockStyleOptions, 
  simulateImageGeneration, 
  simulateGallerySave, 
  simulateCommunityShare 
} from '@/lib/mockData'
import ShareModal from '@/components/ShareModal'

export default function GeneratePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialPrompt = searchParams.get('prompt') || ''
  
  // 상태 관리
  const [prompt, setPrompt] = useState(initialPrompt)
  const [styleOptions, setStyleOptions] = useState<IStyleOptions>(mockStyleOptions)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [promptError, setPromptError] = useState('')

  // 프롬프트 유효성 검사
  const validatePrompt = (value: string) => {
    if (!value.trim()) {
      setPromptError('프롬프트를 입력해 주세요')
      return false
    }
    if (value.length > 500) {
      setPromptError('프롬프트는 500자 이내로 입력해 주세요')
      return false
    }
    setPromptError('')
    return true
  }

  // 스타일 옵션 업데이트 함수
  const updateStyleOption = <K extends keyof IStyleOptions>(
    key: K,
    value: IStyleOptions[K]
  ) => {
    setStyleOptions(prev => ({ ...prev, [key]: value }))
  }

  // 프리셋 선택 시 관련 옵션 자동 조정
  const handlePresetChange = (preset: IStyleOptions['stylePreset']) => {
    const presetConfigs = {
      realistic: { colorTone: 'neutral' as const },
      abstract: { colorTone: 'cool' as const },
      cartoon: { colorTone: 'warm' as const }
    }
    
    const config = presetConfigs[preset]
    setStyleOptions(prev => ({
      ...prev,
      stylePreset: preset,
      ...config
    }))
  }

  // 이미지 생성 함수
  const handleGenerateImage = async () => {
    if (!validatePrompt(prompt)) return

    setIsGenerating(true)
    try {
      const imageUrl = await simulateImageGeneration(prompt, styleOptions)
      setGeneratedImage(imageUrl)
    } catch (error) {
      console.error('이미지 생성 실패:', error)
      alert('이미지 생성에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setIsGenerating(false)
    }
  }

  // 갤러리 저장 함수
  const handleSaveToGallery = async () => {
    if (!generatedImage) return

    setIsSaving(true)
    try {
      await simulateGallerySave(generatedImage, prompt, styleOptions)
      alert('갤러리에 저장되었습니다!')
    } catch (error) {
      console.error('갤러리 저장 실패:', error)
      alert('갤러리 저장에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setIsSaving(false)
    }
  }

  // 커뮤니티 공유 함수
  const handleShare = async (shareData: ISharePostData) => {
    if (!generatedImage) return

    try {
      const postId = await simulateCommunityShare({
        ...shareData,
        imageUrl: generatedImage,
        prompt,
        styleOptions
      })
      alert('커뮤니티에 공유되었습니다!')
      console.log('새 게시물 ID:', postId)
    } catch (error) {
      console.error('공유 실패:', error)
      throw error
    }
  }

  // 다운로드 함수
  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a')
      link.href = generatedImage
      link.download = `artify-generated-${Date.now()}.jpg`
      link.click()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              뒤로가기
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Artify</h1>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 왼쪽: 설정 패널 */}
          <div className="space-y-6">
            {/* 프롬프트 입력 섹션 */}
            <Card>
              <CardHeader>
                <CardTitle>프롬프트 입력</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Input
                    value={prompt}
                    onChange={(e) => {
                      setPrompt(e.target.value)
                      validatePrompt(e.target.value)
                    }}
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

            {/* 스타일 옵션 선택 섹션 */}
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
                        onClick={() => handlePresetChange(preset)}
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
                         onClick={() => updateStyleOption('colorTone', tone)}
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

            {/* 이미지 생성 버튼 */}
            <Button
              onClick={handleGenerateImage}
              disabled={isGenerating || !prompt.trim()}
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
          </div>

          {/* 오른쪽: 결과 이미지 */}
          <div className="space-y-6">
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
                        onClick={handleSaveToGallery}
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
                        onClick={() => setIsShareModalOpen(true)}
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <Share2 size={16} />
                        커뮤니티 공유
                      </Button>
                      
                      <Button
                        onClick={handleDownload}
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <Download size={16} />
                        다운로드
                      </Button>
                      
                      <Button
                        onClick={handleGenerateImage}
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
          </div>
        </div>
      </main>

      {/* 공유 모달 */}
      {generatedImage && (
        <ShareModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          imageUrl={generatedImage}
          prompt={prompt}
          styleOptions={styleOptions}
          onShare={handleShare}
        />
      )}
    </div>
  )
} 