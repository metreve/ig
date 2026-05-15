import { Loader2 } from "lucide-react";

import ProfilePhotoCard from "./ProfilePhotoCard";

type EditProfileFormProps = {
  username: string;
  displayName: string;
  bio: string;
  previewUrl: string;
  saving: boolean;
  error: string;
  onUsernameChange: (value: string) => void;
  onDisplayNameChange: (value: string) => void;
  onBioChange: (value: string) => void;
  onImageChange: (file?: File) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function EditProfileForm({
  username,
  displayName,
  bio,
  previewUrl,
  saving,
  error,
  onUsernameChange,
  onDisplayNameChange,
  onBioChange,
  onImageChange,
  onSubmit,
}: EditProfileFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <ProfilePhotoCard
        username={username}
        displayName={displayName}
        previewUrl={previewUrl}
        onImageChange={onImageChange}
      />

      <div className="mb-6">
        <label className="mb-2 block text-base font-bold">Name</label>
        <input
          value={displayName}
          onChange={(e) => onDisplayNameChange(e.target.value)}
          placeholder="Name"
          className="h-12 w-full rounded-xl border border-zinc-300 bg-transparent px-4 text-sm outline-none focus:border-zinc-500 dark:border-zinc-700"
        />
      </div>

      <div className="mb-6">
        <label className="mb-2 block text-base font-bold">Username</label>
        <input
          value={username}
          onChange={(e) => onUsernameChange(e.target.value)}
          placeholder="Username"
          className="h-12 w-full rounded-xl border border-zinc-300 bg-transparent px-4 text-sm outline-none focus:border-zinc-500 dark:border-zinc-700"
        />
      </div>

      <div className="mb-6">
        <label className="mb-2 block text-base font-bold">Website</label>
        <input
          disabled
          placeholder="Website"
          className="h-12 w-full cursor-not-allowed rounded-xl border border-zinc-300 bg-zinc-100 px-4 text-sm text-zinc-500 outline-none dark:border-zinc-700 dark:bg-[#262a2f]"
        />
        <p className="mt-2 text-xs text-zinc-500">
          Editing your links is only available on mobile. Visit the Instagram
          app and edit your profile to change the websites in your bio.
        </p>
      </div>

      <div className="mb-6">
        <label className="mb-2 block text-base font-bold">Bio</label>
        <div className="relative">
          <textarea
            value={bio}
            onChange={(e) => onBioChange(e.target.value)}
            placeholder="Bio"
            maxLength={150}
            className="min-h-[90px] w-full resize-none rounded-xl border border-zinc-300 bg-transparent px-4 py-3 text-sm outline-none focus:border-zinc-500 dark:border-zinc-700"
          />

          <div className="absolute bottom-3 right-4 text-xs text-zinc-500">
            {bio.length}/150
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label className="mb-2 block text-base font-bold">
          Show Threads badge
        </label>

        <div className="flex h-14 items-center justify-between rounded-xl border border-zinc-300 px-4 dark:border-zinc-700">
          <span>Show Threads badge</span>
          <div className="flex h-6 w-11 items-center rounded-full bg-zinc-300 p-1 dark:bg-zinc-700">
            <div className="h-4 w-4 rounded-full bg-white" />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label className="mb-2 block text-base font-bold">Gender</label>
        <select className="h-12 w-full rounded-xl border border-zinc-300 bg-transparent px-4 text-sm outline-none dark:border-zinc-700">
          <option>Prefer not to say</option>
          <option>Male</option>
          <option>Female</option>
        </select>
        <p className="mt-2 text-xs text-zinc-500">
          This won&apos;t be part of your public profile.
        </p>
      </div>

      <div className="mb-8">
        <label className="mb-2 block text-base font-bold">
          Show account suggestions on profiles
        </label>

        <div className="flex items-center justify-between rounded-xl border border-zinc-300 px-4 py-4 dark:border-zinc-700">
          <div>
            <div>Show account suggestions on profiles</div>
            <p className="mt-1 text-xs text-zinc-500">
              Choose whether people can see similar account suggestions on your
              profile, and whether your account can be suggested on other
              profiles.
            </p>
          </div>

          <div className="flex h-6 w-11 shrink-0 items-center justify-end rounded-full bg-white p-1 dark:bg-zinc-100">
            <div className="h-4 w-4 rounded-full bg-black" />
          </div>
        </div>
      </div>

      <p className="mb-8 text-xs text-zinc-500">
        Certain profile info, like your name, bio and links, is visible to
        everyone.{" "}
        <span className="text-[#1877f2]">
          See what profile info is visible
        </span>
      </p>

      {error && (
        <p className="mb-5 text-sm font-semibold text-red-500">{error}</p>
      )}

      <div className="flex justify-end">
        <button
          disabled={saving}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#1877f2] text-sm font-bold text-white transition hover:bg-[#2d8cff] disabled:cursor-not-allowed disabled:opacity-60 md:w-[260px]"
        >
          {saving && <Loader2 size={16} className="animate-spin" />}
          {saving ? "Saving..." : "Submit"}
        </button>
      </div>

      <footer className="mt-14 pb-10 text-center text-xs text-zinc-500">
        Meta&nbsp;&nbsp; About&nbsp;&nbsp; Blog&nbsp;&nbsp; Jobs&nbsp;&nbsp;
        Help&nbsp;&nbsp; API&nbsp;&nbsp; Privacy&nbsp;&nbsp; Terms&nbsp;&nbsp;
        Locations&nbsp;&nbsp; Instagram Lite&nbsp;&nbsp; Meta AI&nbsp;&nbsp;
        Threads
        <div className="mt-5">© 2026 Instagram from Meta</div>
      </footer>
    </form>
  );
}