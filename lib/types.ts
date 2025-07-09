export interface Post {
  postId: string;
  imageURL: string;
  userName: string;
  likes: number;
  comments: number;
  createdAt: string;
  isLiked?: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  content: string;
  userName: string;
  createdAt: string;
  parentId?: string;
}

export interface GenerateImageResponse {
  success: boolean;
  imageURL: string;
} 