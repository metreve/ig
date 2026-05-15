import { Loader2 } from "lucide-react";

import CreatePostUploader from "./CreatePostUploader";
import CreatePostCaption from "./CreatePostCaption";

type CreatePostFormProps = {
  caption: string;
  previewUrl: string | null;
  loading: boolean;
  error: string;
  onCaptionChange: (value: string) => void;
  onImageChange: (file?: File) => void;
  onImageRemove: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function CreatePostForm({
  caption,
  previewUrl,
  loading,
  error,
  onCaptionChange,
  onImageChange,
  onImageRemove,
  onSubmit,
}: CreatePostFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-[#111820]"
    >
      <div className="border-b border-zinc-200 px-5 py-4 dark:border-zinc-800">
        <h2 className="text-sm font-semibold">Post details</h2>
      </div>

      <div className="p-5">
        <CreatePostUploader
          previewUrl={previewUrl}
          onImageChange={onImageChange}
          onImageRemove={onImageRemove}
        />

        <CreatePostCaption
          caption={caption}
          onCaptionChange={onCaptionChange}
        />

        {error && (
          <p className="mt-4 text-center text-sm font-semibold text-red-500">
            {error}
          </p>
        )}

        <button
          disabled={loading}
          className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#1877f2] text-sm font-bold text-white transition hover:bg-[#2d8cff] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading && <Loader2 size={18} className="animate-spin" />}
          {loading ? "Sharing..." : "Share"}
        </button>
      </div>
    </form>
  );
}