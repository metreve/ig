import StoriesTray from "./StoriesTray";
import Post from "./Post";
import { posts } from "../../lib/mockData";

export default function Feed() {
  return (
    <main className="feed">
      <StoriesTray />
      <div className="posts">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}