// 게시물 관련 타입
export interface Post {
  postId: string;
  userName: string;
  imageURL: string;
  likes: number;
  comments: number;
  isLiked: boolean;
}

// 댓글 관련 타입
export interface Comment {
  id: string;
  postId: string;
  content: string;
  userName: string;
  createdAt: string;
}

// 컴포넌트 Props 타입
export interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
  postUserName: string;
}

export interface CommunityFeedCardProps {
  post: Post;
  onClick: (postId: string) => void;
  onLikeChange: (postId: string, isLiked: boolean, newLikeCount: number) => void;
} 