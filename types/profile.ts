export type ProfileUser = {
  uid: string;
  email: string;
  username: string;
  displayName: string;
  bio: string;
  photoURL: string;
  createdAt: Date | null;
};

export type ProfileTab = "posts" | "saved" | "reposts" | "tagged";