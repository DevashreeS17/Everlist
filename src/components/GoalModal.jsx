import React, { useState } from "react";

export default function GoalModal({ onClose, onAdd }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [progress, setProgress] = useState(0);
  const [imageData, setImageData] = useState(""); // base64 data url
  const [error, setError] = useState("");

  function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }
    if (file.size > 1024 * 1024) { // 1MB
      setError("Image too large. Please upload under 1MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImageData(reader.result);
      setError("");
    };
    reader.readAsDataURL(file);
  }

  function submit(e) {
    e.preventDefault();
    if (!name.trim()) return setError("Name is required.");

    try {
      if (imageData && !imageData.startsWith("data:image")) {
        return setError("Invalid image format.");
      }
      onAdd({
        id: Date.now(),
        name: name.trim(),
        category: category || "General",
        progress: Number(progress) || 0,
        image: imageData || ""
      });
      onClose();
    } catch (err) {
      console.error("Error adding goal:", err);
      setError("Something went wrong while adding your goal.");
    }
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h4>Add Goal</h4>
        <form onSubmit={submit} className="goal-form">
          <label>
            Name
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
          </label>

          <label>
            Category
            <input value={category} onChange={e => setCategory(e.target.value)} placeholder="Category" />
          </label>

          <label>
            Progress
            <input type="number" min="0" max="100" value={progress} onChange={e => setProgress(e.target.value)} />
          </label>

          <label>
            Image
            <input type="file" accept="image/*" onChange={handleFile} />
          </label>

          {imageData && (
            <div style={{ marginBottom: 8 }}>
              <img src={imageData} alt="preview" style={{ width: 120, height: 80, objectFit: "cover", borderRadius: 8 }} />
            </div>
          )}

          {error && <div style={{ color: "var(--danger)", marginBottom: 6 }}>{error}</div>}

          <div className="modal-actions">
            <button type="button" className="btn ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn primary">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
}