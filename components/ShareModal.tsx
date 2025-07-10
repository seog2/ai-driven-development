"use client"

import { useState } from 'react'
import { IShareModalProps, ISharePostData } from '../types'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'

export default function ShareModal({ isOpen, onClose, imageUrl, prompt, styleOptions, onShare }: IShareModalProps) {
  const [shareData, setShareData] = useState<ISharePostData>({
    title: '',
    description: '',
    tags: [],
    isPublic: true
  })
  const [tagInput, setTagInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleTagAdd = () => {
    if (tagInput.trim() && !shareData.tags.includes(tagInput.trim())) {
      setShareData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }))
      setTagInput('')
    }
  }

  const handleTagRemove = (tagToRemove: string) => {
    setShareData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleShare = async () => {
    if (!shareData.title.trim()) {
      return // 부모 컴포넌트에서 검증 처리
    }

    setIsLoading(true)
    try {
      await onShare(shareData)
      onClose()
      // 폼 초기화
      setShareData({
        title: '',
        description: '',
        tags: [],
        isPublic: true
      })
      setTagInput('')
    } catch (error) {
      console.error('공유 실패:', error)
      // 에러는 부모 컴포넌트에서 처리
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleTagAdd()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>커뮤니티에 공유하기</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* 이미지 미리보기 */}
          <div className="flex justify-center">
            <img 
              src={imageUrl} 
              alt="생성된 이미지" 
              className="max-w-full max-h-48 object-contain rounded-lg border"
            />
          </div>

          {/* 사용된 프롬프트 표시 */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">사용된 프롬프트:</p>
            <p className="text-sm font-medium">{prompt}</p>
          </div>

          {/* 제목 입력 */}
          <div className="space-y-2">
            <label className="text-sm font-medium">제목 *</label>
            <Input
              value={shareData.title}
              onChange={(e) => setShareData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="게시물 제목을 입력하세요"
              maxLength={100}
            />
          </div>

          {/* 설명 입력 */}
          <div className="space-y-2">
            <label className="text-sm font-medium">설명</label>
            <Textarea
              value={shareData.description}
              onChange={(e) => setShareData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="이미지에 대한 설명을 입력하세요"
              rows={4}
              maxLength={500}
            />
          </div>

          {/* 태그 입력 */}
          <div className="space-y-2">
            <label className="text-sm font-medium">태그</label>
            <div className="flex gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="태그 입력 후 Enter"
                className="flex-1"
              />
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleTagAdd}
                disabled={!tagInput.trim()}
              >
                추가
              </Button>
            </div>
            {shareData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {shareData.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    #{tag}
                    <button
                      onClick={() => handleTagRemove(tag)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* 공개 설정 */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isPublic"
              checked={shareData.isPublic}
              onChange={(e) => setShareData(prev => ({ ...prev, isPublic: e.target.checked }))}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="isPublic" className="text-sm font-medium">
              공개 게시물로 설정
            </label>
          </div>

          {/* 버튼 그룹 */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              취소
            </Button>
            <Button onClick={handleShare} disabled={isLoading}>
              {isLoading ? '공유 중...' : '공유하기'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 