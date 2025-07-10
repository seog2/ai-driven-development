"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CommunityFeedCard } from "@/components/CommunityFeedCard";
import { mockPosts } from "@/lib/mockData";
import { useRouter } from "next/navigation";
import { Post } from "@/types";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const router = useRouter();

  const handleGenerateImage = async () => {
    if (!prompt.trim()) {
      alert("프롬프트를 입력해 주세요");
      return;
    }

    setIsLoading(true);
    
    // 목업 API 호출 시뮬레이션
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // 2초 대기
      
      // 실제로는 이미지 생성 페이지로 이동
      router.push(`/generate?prompt=${encodeURIComponent(prompt)}`);
    } catch (error) {
      console.error("이미지 생성 중 오류 발생:", error);
      alert("이미지 생성에 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardClick = (postId: string) => {
    router.push(`/post/${postId}`);
  };

  const handleLikeChange = (postId: string, isLiked: boolean, newLikeCount: number) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.postId === postId 
          ? { ...post, isLiked, likes: newLikeCount }
          : post
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Artify</h1>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 프롬프트 입력 섹션 */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            AI로 창의적인 이미지를 생성해보세요
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            간단한 텍스트로 놀라운 이미지를 만들어보세요
          </p>
          
          <div className="max-w-2xl mx-auto">
            <div className="flex gap-4">
              <Input
                type="text"
                placeholder="예: 석양이 지는 바다 위의 외로운 등대"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="flex-1 h-12 text-base"
                disabled={isLoading}
              />
              <Button
                onClick={handleGenerateImage}
                disabled={!prompt.trim() || isLoading}
                className="h-12 px-8 bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? "생성 중..." : "이미지 생성"}
              </Button>
            </div>
          </div>
        </div>

        {/* 커뮤니티 피드 섹션 */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            커뮤니티 피드
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {posts.map((post) => (
              <CommunityFeedCard
                key={post.postId}
                post={post}
                onClick={handleCardClick}
                onLikeChange={handleLikeChange}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
