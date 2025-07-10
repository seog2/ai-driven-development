// 게시물 관련 타입
export interface Post {
  postId: string;
  userName: string;
  imageURL: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  createdAt: string;
}

// 댓글 관련 타입
export interface Comment {
  id: string;
  postId: string;
  content: string;
  userName: string;
  createdAt: string;
}

// 이미지 생성 관련 타입
export interface IStyleOptions {
  colorTone: 'warm' | 'cool' | 'monochrome' | 'neutral';
  textureStrength: number; // 0-100
  mood: 'bright' | 'dark' | 'neutral';
  stylePreset: 'realistic' | 'abstract' | 'cartoon';
}

export interface IGeneratedImage {
  id: string;
  imageUrl: string;
  prompt: string;
  styleOptions: IStyleOptions;
  createdAt: string;
}

export interface ISharePostData {
  title: string;
  description: string;
  tags: string[];
  isPublic: boolean;
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

export interface IShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  prompt: string;
  styleOptions: IStyleOptions;
  onShare: (shareData: ISharePostData) => void;
} 