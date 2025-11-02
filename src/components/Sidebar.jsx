import React from "react";

export default function Sidebar({ active, setActive, theme, toggleTheme }) {
  return (
    <aside className={`sidebar ${theme}`}>
      <div className="brand">
        <h1>BucketList</h1>
      </div>

      <nav className="nav">
        <button
          className={`nav-btn ${active === "dashboard" ? "active" : ""}`}
          onClick={() => setActive("dashboard")}
        >
          Dashboard
        </button>
        <button
          className={`nav-btn ${active === "gallery" ? "active" : ""}`}
          onClick={() => setActive("gallery")}
        >
          Gallery
        </button>
        <button
          className={`nav-btn ${active === "settings" ? "active" : ""}`}
          onClick={() => setActive("settings")}
        >
          Settings
        </button>
      </nav>

      <div className="sidebar-footer">
        <label className="theme-toggle">
          <span>Toggle Theme</span>
          <input type="checkbox" checked={theme === "dark"} onChange={toggleTheme} />
          <span className="slider" />
        </label>
      </div>
    </aside>
  );
}
