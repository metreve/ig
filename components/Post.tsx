"use client";
import { useState } from "react";

type PostData = {
  id: number;
  username: string;
  avatar: string;
  timeAgo: string;
  image: string;
  likes: number;
  caption: string;
  comments: number;
};

export default function Post({ post }: { post: PostData }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likes, setLikes] = useState(post.likes);

  const handleLike = () => {
    setLiked((v) => !v);
    setLikes((v) => (liked ? v - 1 : v + 1));
  };

  return (
    <article className="post">
      {/* Header */}
      <div className="post-header">
        <div className="post-user">
          <div className="post-avatar-ring">
            <img src={post.avatar} alt={post.username} width={32} height={32} className="post-avatar" />
          </div>
          <div>
            <span className="post-username">{post.username}</span>
            <span className="post-dot">•</span>
            <span className="post-time">{post.timeAgo}</span>
          </div>
        </div>
        <button className="post-more" aria-label="More options">
          <svg aria-label="More options" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>More options</title><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
        </button>
      </div>

      {/* Image */}
      <div className="post-image-wrap">
        <img src={post.image} alt="post" className="post-image" onDoubleClick={handleLike} />
      </div>

      {/* Actions */}
      <div className="post-actions">
        <div className="post-actions-left">
          <button className={`post-btn${liked ? " liked" : ""}`} onClick={handleLike} aria-label="Like">
            {liked ? (
             <svg aria-label="Unlike" fill="currentColor" height="24" role="img" viewBox="0 0 48 48" width="24"><title>Unlike</title><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
            ) : (
             <svg aria-label="Like" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Like</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg> )}
          </button>
          <button className="post-btn" aria-label="Comment">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22z"/></svg>
          </button>
          <button className="post-btn" aria-label="Share">
           <svg aria-label="Share" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Share</title><path d="M13.973 20.046 21.77 6.928C22.8 5.195 21.55 3 19.535 3H4.466C2.138 3 .984 5.825 2.646 7.456l4.842 4.752 1.723 7.121c.548 2.266 3.571 2.721 4.762.717Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="7.488" x2="15.515" y1="12.208" y2="7.641"></line></svg> </button>
        </div>
        <button className={`post-btn${saved ? " saved" : ""}`} onClick={() => setSaved((v) => !v)} aria-label="Save">
          {saved ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="20 21 12 13.44 4 21 4 3 20 3"/></svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="20 21 12 13.44 4 21 4 3 20 3"/></svg>
          )}
        </button>
      </div>

      {/* Likes */}
      <div className="post-likes">{likes.toLocaleString()} likes</div>

      {/* Caption */}
      <div className="post-caption">
        <span className="post-username">{post.username}</span> {post.caption}
      </div>

    </article>
  );
}