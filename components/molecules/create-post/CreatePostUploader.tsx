import { ImagePlus, X } from "lucide-react";

type CreatePostUploaderProps = {
  previewUrl: string | null;
  onImageChange: (file?: File) => void;
  onImageRemove: () => void;
};

export default function CreatePostUploader({
  previewUrl,
  onImageChange,
  onImageRemove,
}: CreatePostUploaderProps) {
  if (!previewUrl) {
    return (
      <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-zinc-50 text-center transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-[#0c1014] dark:hover:bg-[#161b22]">
        <ImagePlus size={42} className="mb-3 text-zinc-500" />

        <span className="text-sm font-semibold">Select from computer</span>

        <span className="mt-1 text-xs text-zinc-500">
          PNG, JPG, JPEG, WEBP
        </span>

        <input
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="hidden"
          onChange={(e) => onImageChange(e.target.files?.[0])}
        />
      </label>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-xl bg-black">
      <img
        src={previewUrl}
        alt="Preview"
        className="aspect-square w-full object-cover"
      />

      <button
        type="button"
        onClick={onImageRemove}
        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-black"
      >
        <X size={20} />
      </button>
    </div>
  );
}