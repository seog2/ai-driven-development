"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Share2 } from "lucide-react";
import Image from "next/image";

export default function GeneratePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prompt = searchParams.get('prompt') || '';
  
  const [isGenerating, setIsGenerating] = useState(true);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  useEffect(() => {
    // 이미지 생성 시뮬레이션
    const generateImage = async () => {
      setIsGenerating(true);
      
      // 3초 후 목업 이미지 생성
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // 랜덤 이미지 URL 생성
      const randomId = Math.floor(Math.random() * 1000);
      setGeneratedImage(`https://picsum.photos/512/512?random=${randomId}`);
      setIsGenerating(false);
    };

    generateImage();
  }, []);

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `artify-generated-${Date.now()}.jpg`;
      link.click();
    }
  };

  const handleShare = () => {
    // 실제로는 커뮤니티 공유 기능 구현
    alert('커뮤니티 공유 기능은 추후 구현됩니다.');
  };

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
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            AI 이미지 생성
          </h2>
          <p className="text-gray-600">
            프롬프트: &quot;{prompt}&quot;
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          {isGenerating ? (
            // 로딩 상태
            <div className="flex flex-col items-center justify-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                이미지 생성 중...
              </h3>
              <p className="text-gray-600">
                AI가 창의적인 이미지를 만들고 있습니다.
              </p>
            </div>
          ) : (
            // 생성 완료 상태
            <div className="space-y-6">
              {/* 생성된 이미지 */}
              <div className="flex justify-center">
                <div className="relative max-w-lg w-full aspect-square">
                  <Image
                    src={generatedImage!}
                    alt="생성된 이미지"
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>

              {/* 액션 버튼 */}
              <div className="flex justify-center gap-4">
                <Button
                  onClick={handleDownload}
                  className="flex items-center gap-2"
                >
                  <Download size={16} />
                  다운로드
                </Button>
                <Button
                  onClick={handleShare}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Share2 size={16} />
                  커뮤니티에 공유
                </Button>
              </div>

              {/* 새로운 이미지 생성 */}
              <div className="text-center pt-4 border-t">
                <Button
                  onClick={() => router.push('/')}
                  variant="outline"
                  className="w-full max-w-md"
                >
                  새로운 이미지 생성하기
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 