"use client"

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { IStyleOptions, ISharePostData, IPresetConfigs, IValidationResult } from '@/types'
import { 
  mockStyleOptions, 
  simulateImageGeneration, 
  simulateGallerySave, 
  simulateCommunityShare 
} from '@/lib/mockData'
import ShareModal from '@/components/ShareModal'
import { ToastContainer } from '@/components/ui/toast-container'
import { useToast } from '@/lib/hooks/useToast'
import { downloadImage, generateSafeFilename, getImageExtension } from '@/lib/utils/download'

// Generate 관련 컴포넌트들
import GenerateHeader from '@/components/generate/GenerateHeader'
import PromptInput from '@/components/generate/PromptInput'
import StyleOptions from '@/components/generate/StyleOptions'
import GenerateButton from '@/components/generate/GenerateButton'
import ImageResult from '@/components/generate/ImageResult'

export default function GeneratePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialPrompt = searchParams.get('prompt') || ''
  const { toasts, toast, removeToast } = useToast()
  
  // 상태 관리
  const [prompt, setPrompt] = useState(initialPrompt)
  const [styleOptions, setStyleOptions] = useState<IStyleOptions>(mockStyleOptions)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [promptError, setPromptError] = useState('')

  // 프롬프트 유효성 검사
  const validatePrompt = (value: string): IValidationResult => {
    if (!value.trim()) {
      const error = '프롬프트를 입력해 주세요'
      setPromptError(error)
      return { isValid: false, error }
    }
    if (value.length > 500) {
      const error = '프롬프트는 500자 이내로 입력해 주세요'
      setPromptError(error)
      return { isValid: false, error }
    }
    setPromptError('')
    return { isValid: true }
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
    const presetConfigs: IPresetConfigs = {
      realistic: { colorTone: 'neutral' },
      abstract: { colorTone: 'cool' },
      cartoon: { colorTone: 'warm' }
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
    const validation = validatePrompt(prompt)
    if (!validation.isValid) return

    setIsGenerating(true)
    try {
      const imageUrl = await simulateImageGeneration(prompt, styleOptions)
      setGeneratedImage(imageUrl)
    } catch (error) {
      console.error('이미지 생성 실패:', error)
      toast.error('이미지 생성 실패', '다시 시도해주세요.')
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
      toast.success('갤러리 저장 완료', '이미지가 갤러리에 저장되었습니다!')
    } catch (error) {
      console.error('갤러리 저장 실패:', error)
      toast.error('갤러리 저장 실패', '다시 시도해주세요.')
    } finally {
      setIsSaving(false)
    }
  }

  // 커뮤니티 공유 함수
  const handleShare = async (shareData: ISharePostData) => {
    if (!generatedImage) return

    try {
      // 제목 검증
      if (!shareData.title.trim()) {
        toast.warning('제목 필수', '제목을 입력해주세요.')
        return
      }

      const postId = await simulateCommunityShare({
        ...shareData,
        imageUrl: generatedImage,
        prompt,
        styleOptions
      })
      toast.success('커뮤니티 공유 완료', '이미지가 커뮤니티에 공유되었습니다!')
      console.log('새 게시물 ID:', postId)
    } catch (error) {
      console.error('공유 실패:', error)
      const errorMessage = error instanceof Error ? error.message : '다시 시도해주세요.'
      if (errorMessage === '제목을 입력해주세요.') {
        toast.warning('제목 필수', '제목을 입력해주세요.')
      } else {
        toast.error('공유 실패', errorMessage)
      }
      throw error
    }
  }

  // 다운로드 함수
  const handleDownload = async () => {
    if (!generatedImage) return

    setIsDownloading(true)
    try {
      // 프롬프트 기반으로 안전한 파일명 생성
      const extension = getImageExtension(generatedImage)
      const filename = generateSafeFilename(prompt, extension)
      
      // 다운로드 실행
      const success = await downloadImage(generatedImage, filename)
      
      if (success) {
        toast.success('다운로드 완료', '이미지가 성공적으로 다운로드되었습니다!')
      } else {
        throw new Error('다운로드 실패')
      }
    } catch (error) {
      console.error('다운로드 실패:', error)
      toast.error('다운로드 실패', '이미지 다운로드에 실패했습니다.')
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <GenerateHeader onBack={() => router.back()} />

      {/* 메인 콘텐츠 */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 왼쪽: 설정 패널 */}
          <div className="space-y-6">
            {/* 프롬프트 입력 섹션 */}
            <PromptInput
              prompt={prompt}
              promptError={promptError}
              onPromptChange={setPrompt}
              onValidate={validatePrompt}
            />

            {/* 스타일 옵션 선택 섹션 */}
            <StyleOptions
              styleOptions={styleOptions}
              onStyleOptionChange={updateStyleOption}
              onPresetChange={handlePresetChange}
            />

            {/* 이미지 생성 버튼 */}
            <GenerateButton
              isGenerating={isGenerating}
              isDisabled={!prompt.trim()}
              onClick={handleGenerateImage}
            />
          </div>

          {/* 오른쪽: 결과 이미지 */}
          <div className="space-y-6">
            <ImageResult
              isGenerating={isGenerating}
              generatedImage={generatedImage}
              isSaving={isSaving}
              isDownloading={isDownloading}
              onSaveToGallery={handleSaveToGallery}
              onShare={() => setIsShareModalOpen(true)}
              onDownload={handleDownload}
              onRegenerate={handleGenerateImage}
            />
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

      {/* 토스트 컨테이너 */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  )
} 