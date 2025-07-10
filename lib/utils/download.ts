/**
 * 이미지 URL에서 파일을 다운로드하는 유틸리티 함수
 * @param imageUrl - 다운로드할 이미지 URL
 * @param filename - 저장할 파일명 (확장자 포함)
 * @returns Promise<boolean> - 성공 여부
 */
export async function downloadImage(imageUrl: string, filename?: string): Promise<boolean> {
  try {
    // CORS 문제를 해결하기 위해 프록시 모드로 fetch
    const response = await fetch(imageUrl, {
      mode: 'cors',
      headers: {
        'Origin': window.location.origin
      }
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const blob = await response.blob()
    
    // 파일명이 없으면 기본값 생성
    const defaultFilename = `artify-image-${Date.now()}.jpg`
    const finalFilename = filename || defaultFilename
    
    // Blob URL 생성
    const blobUrl = window.URL.createObjectURL(blob)
    
    // 다운로드 링크 생성
    const link = document.createElement('a')
    link.href = blobUrl
    link.download = finalFilename
    link.style.display = 'none'
    
    // DOM에 추가 후 클릭
    document.body.appendChild(link)
    link.click()
    
    // 정리 작업
    document.body.removeChild(link)
    window.URL.revokeObjectURL(blobUrl)
    
    return true
  } catch (error) {
    console.error('Download failed:', error)
    return false
  }
}

/**
 * Canvas를 이미지로 다운로드하는 함수
 * @param canvas - HTMLCanvasElement
 * @param filename - 저장할 파일명
 * @param quality - JPEG 품질 (0-1)
 * @returns Promise<boolean> - 성공 여부
 */
export async function downloadCanvas(
  canvas: HTMLCanvasElement, 
  filename?: string, 
  quality: number = 0.9
): Promise<boolean> {
  try {
    const defaultFilename = `artify-canvas-${Date.now()}.jpg`
    const finalFilename = filename || defaultFilename
    
    // Canvas를 Blob으로 변환
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          resolve(false)
          return
        }
        
        const blobUrl = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = blobUrl
        link.download = finalFilename
        link.style.display = 'none'
        
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(blobUrl)
        
        resolve(true)
      }, 'image/jpeg', quality)
    })
  } catch (error) {
    console.error('Canvas download failed:', error)
    return false
  }
}

/**
 * 파일명에서 확장자를 추출하는 함수
 * @param url - 이미지 URL
 * @returns 확장자 (jpg, png, gif 등)
 */
export function getImageExtension(url: string): string {
  const pathname = new URL(url).pathname
  const extension = pathname.split('.').pop()?.toLowerCase()
  
  // 지원되는 확장자만 반환, 기본값은 jpg
  const supportedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp']
  return supportedExtensions.includes(extension || '') ? extension! : 'jpg'
}

/**
 * 안전한 파일명 생성 함수
 * @param prompt - 사용자 프롬프트
 * @param extension - 파일 확장자
 * @returns 안전한 파일명
 */
export function generateSafeFilename(prompt: string, extension: string = 'jpg'): string {
  // 특수문자 제거 및 공백을 하이픈으로 변경
  const safePrompt = prompt
    .replace(/[^a-zA-Z0-9가-힣\s]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50) // 최대 50자
  
  const timestamp = Date.now()
  return `artify-${safePrompt}-${timestamp}.${extension}`
} 