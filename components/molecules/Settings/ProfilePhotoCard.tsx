type ProfilePhotoCardProps = {
  username: string;
  displayName: string;
  previewUrl: string;
  onImageChange: (file?: File) => void;
};

export default function ProfilePhotoCard({
  username,
  displayName,
  previewUrl,
  onImageChange,
}: ProfilePhotoCardProps) {
  return (
    <div className="mb-8 flex items-center justify-between gap-3 rounded-2xl bg-zinc-100 p-4 dark:bg-[#262a2f]">
      <div className="flex min-w-0 items-center gap-4">
        <label className="group relative shrink-0 cursor-pointer">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Profile preview"
              className="h-16 w-16 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-300 text-2xl font-semibold text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200">
              {username.charAt(0).toUpperCase() || "U"}
            </div>
          )}

          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={(e) => onImageChange(e.target.files?.[0])}
          />
        </label>

        <div className="min-w-0">
          <div className="truncate font-bold">{username || "username"}</div>
          <div className="truncate text-sm text-zinc-500">
            {displayName || "Name"}
          </div>
        </div>
      </div>

      <label className="shrink-0 cursor-pointer rounded-lg bg-[#1877f2] px-3 py-2 text-xs font-bold text-white transition hover:bg-[#2d8cff] md:px-5 md:text-sm">
        Change photo
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="hidden"
          onChange={(e) => onImageChange(e.target.files?.[0])}
        />
      </label>
    </div>
  );
}