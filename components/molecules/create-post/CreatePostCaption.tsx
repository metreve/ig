type CreatePostCaptionProps = {
  caption: string;
  onCaptionChange: (value: string) => void;
};

export default function CreatePostCaption({
  caption,
  onCaptionChange,
}: CreatePostCaptionProps) {
  return (
    <div className="mt-5">
      <label className="mb-2 block text-sm font-semibold">Caption</label>

      <textarea
        value={caption}
        onChange={(e) => onCaptionChange(e.target.value)}
        placeholder="Write a caption..."
        maxLength={2200}
        className="min-h-[120px] w-full resize-none rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm outline-none transition placeholder:text-zinc-500 focus:border-zinc-500 dark:border-zinc-700 dark:bg-[#0c1014]"
      />

      <div className="mt-1 text-right text-xs text-zinc-500">
        {caption.length}/2200
      </div>
    </div>
  );
}