import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Comment } from "@/lib/types";
import { mockComments } from "@/lib/mockData";

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
  postUserName: string;
}

export function CommentModal({ isOpen, onClose, postId, postUserName }: CommentModalProps) {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Comment[]>(
    mockComments.filter(comment => comment.postId === postId)
  );

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      postId,
      content: newComment,
      userName: "현재사용자", // 실제로는 로그인한 사용자 정보
      createdAt: new Date().toISOString(),
    };

    setComments([...comments, comment]);
    setNewComment("");
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            {postUserName}님의 게시물 댓글
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto space-y-4 py-4">
          {comments.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              아직 댓글이 없습니다. 첫 번째 댓글을 작성해보세요!
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-medium">
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
                  <p className="text-sm text-gray-700 break-words">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t pt-4 space-y-3">
          <Textarea
            placeholder="댓글을 작성해보세요..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[80px] resize-none"
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              닫기
            </Button>
            <Button 
              onClick={handleAddComment}
              disabled={!newComment.trim()}
            >
              댓글 작성
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 