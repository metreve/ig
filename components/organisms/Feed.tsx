import StoriesTray from "../molecules/StoriesTray";
import Post from "../molecules/Post";
import { posts } from "../../lib/mockData";

export default function Feed() {
  return (
    <main className="flex w-full justify-center pb-20 md:pb-0 md:pl-20">
      <div className="flex w-full flex-col items-center">
        <div className="w-full max-w-[630px]">
          <StoriesTray />
        </div>

        <div className="flex w-full max-w-[470px] flex-col gap-6 px-0">
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
    </main>
  );
}