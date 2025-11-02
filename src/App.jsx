import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Gallery from "./components/Gallery";
import GoalModal from "./components/GoalModal";
import ConfirmModal from "./components/ConfirmModal";

import {
  getCurrentUser,
  signup,
  login,
  logout,
  updateUserGoals
} from "./utils/auth";

export default function App() {
  const [active, setActive] = useState("dashboard");
  const [goals, setGoals] = useState([]);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [showAdd, setShowAdd] = useState(false);
  const [viewGoal, setViewGoal] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [user, setUser] = useState(() => getCurrentUser());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (!user) {
      const saved = localStorage.getItem("goals");
      setGoals(saved ? JSON.parse(saved) : []);
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      localStorage.setItem("goals", JSON.stringify(goals));
    }
  }, [goals, user]);

  function toggleTheme() {
    setTheme(t => (t === "light" ? "dark" : "light"));
  }

  function handleSignup() {
    const result = signup(email, password);
    if (result.error) return alert(result.error);
    setUser(result.user);
    setGoals([]);
  }

  function handleLogin() {
    const result = login(email, password);
    if (result.error) return alert(result.error);
    setUser(result.user);
    setGoals(result.goals);
  }

  function handleLogout() {
    logout();
    setUser(null);
    setGoals([]);
  }

  function addGoal(goal) {
    const updatedGoals = [goal, ...goals];
    setGoals(updatedGoals);
    if (user) updateUserGoals(user, updatedGoals);
  }

  function updateProgress(id, newProgress) {
    const updatedGoals = goals.map(g =>
      g.id === id ? { ...g, progress: newProgress } : g
    );
    setGoals(updatedGoals);
    setViewGoal(g => g && g.id === id ? { ...g, progress: newProgress } : g);

    if (user) {
      updateUserGoals(user, updatedGoals);
    } else {
      localStorage.setItem("goals", JSON.stringify(updatedGoals));
    }
  }

  function removeGoal(id) {
    const updatedGoals = goals.filter(x => x.id !== id);
    setGoals(updatedGoals);
    setViewGoal(null);
    if (user) updateUserGoals(user, updatedGoals);
  }

  function openView(goal) {
    setViewGoal(goal);
    setConfirm(null);
    setShowAdd(false);
  }

  const galleryItems = goals.slice(0, 4).map(g => ({ caption: g.name, image: g.image }));

  return (
    <div className="app-shell">
      <Sidebar active={active} setActive={setActive} theme={theme} toggleTheme={toggleTheme} />

      <div className="main-area">
        {active === "dashboard" && <Dashboard goals={goals} openView={openView} openAdd={() => setShowAdd(true)} />}
        {active === "gallery" && <Gallery galleryItems={galleryItems} openAdd={() => setShowAdd(true)} />}
        {active === "settings" && (
          <section className="settings">
            <h3>Settings</h3>
            <p>Theme: <strong>{theme}</strong></p>
            {user ? (
              <>
                <p>Logged in as: <strong>{user}</strong></p>
                <button className="btn ghost" onClick={handleLogout}>Log Out</button>
              </>
            ) : (
              <>
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                <button className="btn ghost" onClick={handleSignup}>Sign Up</button>
                <button className="btn ghost" onClick={handleLogin}>Log In</button>
              </>
            )}
          </section>
        )}
      </div>

      <aside className="right-column">
        <h4>Inspiration</h4>
        {goals.filter(g => g.image).length === 0 ? (
          <p className="caption">No inspirational goals yet.</p>
        ) : (
          goals
            .filter(g => g.image)
            .map(g => (
              <div key={g.id} className="right-card">
                <img src={g.image} alt={g.name} />
                <p className="caption">{g.name}</p>
                <button className="btn ghost small" onClick={() => setConfirm(g.id)}>
                  Delete
                </button>
              </div>
            ))
        )}
      </aside>

      {showAdd && <GoalModal onClose={() => setShowAdd(false)} onAdd={addGoal} />}

      {viewGoal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h4>{viewGoal.name}</h4>
            <p>Category: {viewGoal.category}</p>
            <label>Progress:</label>
            <input
              type="range"
              min="0"
              max="100"
              value={viewGoal.progress}
              onChange={e => updateProgress(viewGoal.id, Number(e.target.value))}
            />
            <p>{viewGoal.progress}% completed</p>
            {viewGoal.progress === 100 && (
              <p className="completed-badge">🎉 Completed!</p>
            )}
            <div className="modal-actions">
              <button className="btn ghost" onClick={() => setViewGoal(null)}>Close</button>
              <button className="btn danger" onClick={() => setConfirm(viewGoal.id)}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {confirm && (
        <ConfirmModal
          message="Delete this goal?"
          onClose={() => setConfirm(null)}
          onConfirm={() => removeGoal(confirm)}
        />
      )}
    </div>
  );
}
