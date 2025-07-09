import { Post, Comment } from './types';

export const mockPosts: Post[] = [
  {
    postId: '1',
    imageURL: 'https://picsum.photos/400/400?random=1',
    userName: '창작자123',
    likes: 150,
    comments: 23,
    createdAt: '2024-03-20T10:00:00Z',
    isLiked: false
  },
  {
    postId: '2',
    imageURL: 'https://picsum.photos/400/400?random=2',
    userName: 'AI아티스트',
    likes: 89,
    comments: 12,
    createdAt: '2024-03-20T09:30:00Z',
    isLiked: true
  },
  {
    postId: '3',
    imageURL: 'https://picsum.photos/400/400?random=3',
    userName: '디자이너Kim',
    likes: 234,
    comments: 45,
    createdAt: '2024-03-20T09:00:00Z',
    isLiked: false
  },
  {
    postId: '4',
    imageURL: 'https://picsum.photos/400/400?random=4',
    userName: 'ArtLover',
    likes: 67,
    comments: 8,
    createdAt: '2024-03-20T08:30:00Z',
    isLiked: false
  },
  {
    postId: '5',
    imageURL: 'https://picsum.photos/400/400?random=5',
    userName: '픽셀마법사',
    likes: 312,
    comments: 67,
    createdAt: '2024-03-20T08:00:00Z',
    isLiked: true
  },
  {
    postId: '6',
    imageURL: 'https://picsum.photos/400/400?random=6',
    userName: '미래화가',
    likes: 178,
    comments: 34,
    createdAt: '2024-03-20T07:45:00Z',
    isLiked: false
  },
  {
    postId: '7',
    imageURL: 'https://picsum.photos/400/400?random=7',
    userName: '컬러드림',
    likes: 95,
    comments: 19,
    createdAt: '2024-03-20T07:15:00Z',
    isLiked: false
  },
  {
    postId: '8',
    imageURL: 'https://picsum.photos/400/400?random=8',
    userName: '상상공작소',
    likes: 421,
    comments: 89,
    createdAt: '2024-03-20T06:30:00Z',
    isLiked: true
  },
  {
    postId: '9',
    imageURL: 'https://picsum.photos/400/400?random=9',
    userName: '비주얼스토리',
    likes: 256,
    comments: 52,
    createdAt: '2024-03-20T06:00:00Z',
    isLiked: false
  },
  {
    postId: '10',
    imageURL: 'https://picsum.photos/400/400?random=10',
    userName: '아트젠',
    likes: 134,
    comments: 28,
    createdAt: '2024-03-20T05:30:00Z',
    isLiked: false
  }
];

export const mockComments: Comment[] = [
  // 게시물 1의 댓글
  {
    id: '1',
    postId: '1',
    content: '정말 멋진 이미지네요! 어떤 프롬프트를 사용하셨나요?',
    userName: '사용자1',
    createdAt: '2024-03-20T10:30:00Z'
  },
  {
    id: '2',
    postId: '1',
    content: '색감이 정말 좋습니다. 저도 비슷한 스타일로 만들어보고 싶어요!',
    userName: '아티스트99',
    createdAt: '2024-03-20T11:00:00Z'
  },
  {
    id: '3',
    postId: '1',
    content: 'AI 기술의 발전이 정말 놀랍네요 👍',
    userName: '테크러버',
    createdAt: '2024-03-20T11:15:00Z'
  },
  // 게시물 2의 댓글
  {
    id: '4',
    postId: '2',
    content: '와 이런 스타일 너무 좋아해요!',
    userName: '디자인팬',
    createdAt: '2024-03-20T09:45:00Z'
  },
  {
    id: '5',
    postId: '2',
    content: '프롬프트 공유 부탁드려요 🙏',
    userName: '초보창작자',
    createdAt: '2024-03-20T10:00:00Z'
  },
  // 게시물 3의 댓글
  {
    id: '6',
    postId: '3',
    content: '디테일이 정말 살아있네요!',
    userName: '예술감상가',
    createdAt: '2024-03-20T09:30:00Z'
  },
  {
    id: '7',
    postId: '3',
    content: '이런 퀄리티면 전시회에 내도 될 것 같아요',
    userName: '갤러리스트',
    createdAt: '2024-03-20T10:45:00Z'
  },
  // 게시물 4의 댓글
  {
    id: '8',
    postId: '4',
    content: '분위기가 정말 몽환적이에요 ✨',
    userName: '무드메이커',
    createdAt: '2024-03-20T08:45:00Z'
  }
]; 