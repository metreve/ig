import { stories } from "../../lib/mockData";

export default function StoriesTray() {
  return (
    <div className="stories-tray">
      {stories.map((s) => (
        <div key={s.id} className="story-item">
          <div className={`story-ring${s.isYou ? " story-ring--you" : ""}`}>
            <img src={s.avatar} alt={s.username} width={56} height={56} className="story-avatar" />
          </div>
          {s.isYou && <div className="story-add">+</div>}
          <span className="story-username">{s.isYou ? "Your story" : s.username}</span>
        </div>
      ))}
    </div>
  );
}