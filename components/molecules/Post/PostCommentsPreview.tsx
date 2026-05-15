import type { Comment } from "@/types/comment";

type PostCommentsPreviewProps = {
  comments: Comment[];
  onOpenComments: () => void;
};

export default function PostCommentsPreview({
  comments,
  onOpenComments,
}: PostCommentsPreviewProps) {
  return (
    <>
      {comments.length > 0 && (
        <button
          onClick={onOpenComments}
          className="mt-2 text-sm text-zinc-500"
        >
          View all {comments.length} comments
        </button>
      )}

      <div className="mt-2 space-y-1">
        {comments.slice(0, 2).map((comment) => (
          <div key={comment.id} className="text-sm">
            <span className="mr-2 font-semibold">{comment.username}</span>
            <span>{comment.text}</span>
          </div>
        ))}
      </div>
    </>
  );
}