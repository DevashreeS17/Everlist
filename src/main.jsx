// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import AppEntry from "./AppEntry.jsx"; // ✅ updated import
import "./style.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AppEntry />
    </React.StrictMode>
);