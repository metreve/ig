type PostModalCommentFormProps = {
  commentText: string;
  submittingComment: boolean;
  onCommentTextChange: (value: string) => void;
  onCommentSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function PostModalCommentForm({
  commentText,
  submittingComment,
  onCommentTextChange,
  onCommentSubmit,
}: PostModalCommentFormProps) {
  return (
    <form
      onSubmit={onCommentSubmit}
      className="flex items-center gap-3 border-t border-[#2f3336] px-4 py-4"
    >
      <input
        value={commentText}
        onChange={(e) => onCommentTextChange(e.target.value)}
        placeholder="Add a comment..."
        className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
      />

      {commentText.trim() && (
        <button
          disabled={submittingComment}
          className="text-sm font-bold text-[#1877f2] disabled:opacity-50"
        >
          {submittingComment ? "Posting..." : "Post"}
        </button>
      )}
    </form>
  );
}