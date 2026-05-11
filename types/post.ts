export type Post = {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  caption: string;
  imageUrl: string;
  likesCount: number;
  commentsCount: number;
  savesCount: number;
  createdAt: Date | null;
};