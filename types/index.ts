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

// 이미지 생성 페이지 관련 타입
export interface IGeneratePageState {
  prompt: string;
  styleOptions: IStyleOptions;
  isGenerating: boolean;
  generatedImage: string | null;
  isShareModalOpen: boolean;
  isSaving: boolean;
  isDownloading: boolean;
  promptError: string;
}

export interface IPresetConfig {
  colorTone: IStyleOptions['colorTone'];
}

export interface IPresetConfigs {
  realistic: IPresetConfig;
  abstract: IPresetConfig;
  cartoon: IPresetConfig;
}

// 유틸리티 함수 타입
export interface IDownloadOptions {
  filename?: string;
  quality?: number;
}

export interface IValidationResult {
  isValid: boolean;
  error?: string;
} 