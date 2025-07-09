import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Post, CommunityFeedCardProps } from "@/types";
import Image from "next/image";
import { Heart, MessageCircle } from "lucide-react";
import { CommentModal } from "./CommentModal";

export function CommunityFeedCard({ post, onClick, onLikeChange }: CommunityFeedCardProps) {
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 카드 클릭 이벤트 방지
    
    const newIsLiked = !post.isLiked;
    const newLikeCount = newIsLiked ? post.likes + 1 : post.likes - 1;
    
    onLikeChange(post.postId, newIsLiked, newLikeCount);
  };

  const handleCommentClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 카드 클릭 이벤트 방지
    setIsCommentModalOpen(true);
  };

  return (
    <>
      <Card 
        className="overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02]"
        onClick={() => onClick(post.postId)}
      >
        <CardContent className="p-0 relative aspect-square">
          <Image
            src={post.imageURL}
            alt={`${post.userName}의 생성 이미지`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </CardContent>
        <CardFooter className="flex justify-between items-center p-4">
          <span className="font-medium text-sm">{post.userName}</span>
          <div className="flex gap-3 text-sm text-gray-600">
            <button
              onClick={handleLikeClick}
              className={`flex items-center gap-1 hover:text-red-500 transition-colors ${
                post.isLiked ? 'text-red-500' : ''
              }`}
            >
              <Heart 
                size={16} 
                fill={post.isLiked ? 'currentColor' : 'none'}
                className="transition-all"
              />
              <span>{post.likes}</span>
            </button>
            <button
              onClick={handleCommentClick}
              className="flex items-center gap-1 hover:text-blue-500 transition-colors"
            >
              <MessageCircle size={16} />
              <span>{post.comments}</span>
            </button>
          </div>
        </CardFooter>
      </Card>

      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        postId={post.postId}
        postUserName={post.userName}
      />
    </>
  );
} 