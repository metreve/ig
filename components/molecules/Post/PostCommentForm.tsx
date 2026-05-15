type PostCommentFormProps = {
  commentText: string;
  submittingComment: boolean;
  onCommentTextChange: (value: string) => void;
  onCommentSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function PostCommentForm({
  commentText,
  submittingComment,
  onCommentTextChange,
  onCommentSubmit,
}: PostCommentFormProps) {
  return (
    <form onSubmit={onCommentSubmit} className="mt-3 flex items-center gap-2">
      <input
        value={commentText}
        onChange={(e) => onCommentTextChange(e.target.value)}
        placeholder="Add a comment..."
        className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
      />

      {commentText.trim() && (
        <button
          disabled={submittingComment}
          className="text-sm font-semibold text-[#1877f2] disabled:opacity-50"
        >
          {submittingComment ? "Posting..." : "Post"}
        </button>
      )}
    </form>
  );
}