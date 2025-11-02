import React from "react";

function CircularProgress({ percent }) {
  const r = 36;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;
  return (
    <svg className="circular" width="92" height="92" viewBox="0 0 92 92">
      <circle className="bg" cx="46" cy="46" r={r} strokeWidth="8" fill="none" />
      <circle
        className="fg"
        cx="46"
        cy="46"
        r={r}
        strokeWidth="8"
        fill="none"
        strokeDasharray={c}
        strokeDashoffset={offset}
        transform="rotate(-90 46 46)"
      />
      <text x="46" y="50" textAnchor="middle" className="circle-text">
        {percent}%
      </text>
    </svg>
  );
}

export default function Dashboard({ goals, openView, openAdd, setConfirm }) {
  const completed = goals.filter(g => g.progress >= 100).length;
  const total = goals.length || 1;
  const overallPercent = Math.round(
    (goals.reduce((s, g) => s + g.progress, 0) / (total * 100)) * 100
  );

  const inspirationalGoals = goals.filter(g => g.image);

  return (
    <main className="dashboard">
      <header className="dash-header">
        <h2>The best time for new beginnings is now.</h2>
        <div className="progress-summary">
          <div className="progress-left">
            <p className="sub">You've completed</p>
            <p className="big">
              {completed} of {total} goals
            </p>
          </div>
          <CircularProgress percent={overallPercent} />
        </div>
      </header>

      <section className="goal-list">
        {goals.map(goal => (
          <div className="goal-card" key={goal.id}>
            <div className="goal-main">
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                {goal.image ? (
                  <img
                    src={goal.image}
                    alt=""
                    style={{
                      width: 56,
                      height: 40,
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: 56,
                      height: 40,
                      background: "#e9eefc",
                      borderRadius: 8,
                    }}
                  />
                )}
                <div>
                  <p className="goal-name">{goal.name}</p>
                  <p className="goal-cat">{goal.category}</p>
                </div>
              </div>

              <div className="goal-actions" style={{ display: "flex", gap: 8 }}>
                <button className="view-btn" onClick={() => openView(goal)}>
                  VIEW
                </button>
                <button className="btn ghost" onClick={() => setConfirm(goal.id)}>
                  Delete
                </button>
              </div>
            </div>

            <div className="goal-progress">
              <div className="bar-bg">
                <div className="bar-fg" style={{ width: `${goal.progress}%` }} />
              </div>
              <span className="percent">{goal.progress}%</span>
            </div>
          </div>
        ))}
      </section>

      <div className="add-floating">
        <button className="add-btn" onClick={openAdd}>
          Add Goal
        </button>
      </div>
    </main>
  );
}