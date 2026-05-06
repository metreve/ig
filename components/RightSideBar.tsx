import { suggestions } from "../../lib/mockData";

const footerLinks = ["About","Help","Press","API","Jobs","Privacy","Terms","Locations","Language"];

export default function RightSidebar() {
  return (
    <aside className="right-sidebar">
      {/* Logged in user */}
      <div className="rs-user">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img src="https://i.pravatar.cc/44?img=1" alt="you" width={44} height={44} className="rs-avatar" />
          <div>
            <p className="rs-username">yourname</p>
            <p className="rs-name">Your Name</p>
          </div>
        </div>
        <button className="rs-switch">Switch</button>
      </div>

      {/* Suggestions */}
      <div className="rs-suggestions-header">
        <span className="rs-section-label">Suggested for you</span>
        <button className="rs-see-all">See all</button>
      </div>

      {suggestions.map((s) => (
        <div key={s.id} className="rs-suggestion">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src={s.avatar} alt={s.username} width={32} height={32} className="rs-avatar-sm" />
            <div>
              <p className="rs-sug-username">{s.username}</p>
              <p className="rs-sug-reason">{s.reason}</p>
            </div>
          </div>
          <button className="rs-follow">Follow</button>
        </div>
      ))}

      {/* Footer */}
      <div className="rs-footer">
        {footerLinks.map((l, i) => (
          <span key={l}>
            <a href="#" className="rs-footer-link">{l}</a>
            {i < footerLinks.length - 1 && <span className="rs-footer-dot"> · </span>}
          </span>
        ))}
        <p className="rs-copyright">© 2024 INSTAGRAM FROM META</p>
      </div>
    </aside>
  );
}