"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { mockPosts, mockComments } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageCircle, Bookmark, ArrowLeft, Share2 } from "lucide-react";
import Image from "next/image";
import { Post, Comment } from "@/lib/types";

export default function PostDetail() {
  const params = useParams();
  const router = useRouter();
  const postId = params.postId as string;
  
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isScrapped, setIsScrapped] = useState(false);

  useEffect(() => {
    // 게시물 데이터 로드
    const foundPost = mockPosts.find(p => p.postId === postId);
    if (foundPost) {
      setPost(foundPost);
      setIsLiked(foundPost.isLiked || false);
      setLikeCount(foundPost.likes);
    }

    // 댓글 데이터 로드
    const postComments = mockComments.filter(comment => comment.postId === postId);
    setComments(postComments);
  }, [postId]);

  const handleLikeClick = () => {
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    setLikeCount(prev => newIsLiked ? prev + 1 : prev - 1);
  };

  const handleScrapClick = () => {
    setIsScrapped(!isScrapped);
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      postId,
      content: newComment,
      userName: "현재사용자",
      createdAt: new Date().toISOString(),
    };

    setComments([...comments, comment]);
    setNewComment("");
  };

  const handleShare = () => {
    // 공유 기능 (실제로는 Web Share API 또는 URL 복사)
    if (navigator.share) {
      navigator.share({
        title: `${post?.userName}님의 AI 생성 이미지`,
        text: 'Artify에서 생성된 멋진 이미지를 확인해보세요!',
        url: window.location.href,
      });
    } else {
      // 폴백: URL 복사
      navigator.clipboard.writeText(window.location.href);
      alert('링크가 복사되었습니다!');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes}분 전`;
    } else if (hours < 24) {
      return `${hours}시간 전`;
    } else {
      return `${days}일 전`;
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            게시물을 찾을 수 없습니다
          </h1>
          <Button onClick={() => router.push("/")}>
            홈으로 돌아가기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
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
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="flex items-center gap-2"
            >
              <Share2 size={16} />
              공유
            </Button>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* 이미지 섹션 */}
          <div className="relative aspect-square max-w-2xl mx-auto bg-gray-100">
            <Image
              src={post.imageURL}
              alt={`${post.userName}의 생성 이미지`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          
          {/* 정보 섹션 */}
          <div className="p-6">
            {/* 작성자 정보 */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-lg font-medium">
                    {post.userName.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{post.userName}</p>
                  <p className="text-sm text-gray-500">
                    {formatDate(post.createdAt)}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                팔로우
              </Button>
            </div>
            
            {/* 상호작용 버튼 */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b">
              <div className="flex items-center gap-6">
                <button
                  onClick={handleLikeClick}
                  className={`flex items-center gap-2 text-lg transition-colors ${
                    isLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
                  }`}
                >
                  <Heart 
                    size={24} 
                    fill={isLiked ? 'currentColor' : 'none'}
                    className="transition-all"
                  />
                  <span className="font-medium">{likeCount}</span>
                </button>
                
                <div className="flex items-center gap-2 text-lg text-gray-600">
                  <MessageCircle size={24} />
                  <span className="font-medium">{comments.length}</span>
                </div>
                
                <button
                  onClick={handleScrapClick}
                  className={`flex items-center gap-2 text-lg transition-colors ${
                    isScrapped ? 'text-blue-500' : 'text-gray-600 hover:text-blue-500'
                  }`}
                >
                  <Bookmark 
                    size={24} 
                    fill={isScrapped ? 'currentColor' : 'none'}
                    className="transition-all"
                  />
                  <span className="font-medium">스크랩</span>
                </button>
              </div>
            </div>
            
            {/* 프롬프트 정보 */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                생성 프롬프트
              </h3>
              <p className="text-gray-700 leading-relaxed">
                "석양이 지는 바다 위의 외로운 등대, 드라마틱한 구름과 황금빛 햇살, 사실적인 디지털 아트 스타일"
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  #풍경
                </span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  #석양
                </span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  #바다
                </span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  #등대
                </span>
              </div>
            </div>
            
            {/* 댓글 섹션 */}
            <div>
              <h3 className="font-medium text-gray-900 mb-4 text-lg">
                댓글 {comments.length}개
              </h3>
              
              {/* 댓글 작성 */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <Textarea
                  placeholder="댓글을 작성해보세요..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="mb-3 bg-white"
                  rows={3}
                />
                <div className="flex justify-end">
                  <Button 
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                    size="sm"
                  >
                    댓글 작성
                  </Button>
                </div>
              </div>
              
              {/* 댓글 목록 */}
              <div className="space-y-4">
                {comments.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    아직 댓글이 없습니다. 첫 번째 댓글을 작성해보세요!
                  </div>
                ) : (
                  comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-medium">
                          {comment.userName.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{comment.userName}</span>
                          <span className="text-xs text-gray-500">
                            {formatDate(comment.createdAt)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 break-words leading-relaxed">
                          {comment.content}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <button className="text-xs text-gray-500 hover:text-blue-500 transition-colors">
                            답글
                          </button>
                          <button className="text-xs text-gray-500 hover:text-red-500 transition-colors">
                            좋아요
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 