// src/AppEntry.jsx
import React, { useState } from "react";
import WelcomePage from "./WelcomePage";
import App from "./App";

export default function AppEntry() {
    const [entered, setEntered] = useState(false);

    return (
        <>
            {!entered ? (
                <WelcomePage onEnter={() => setEntered(true)} />
            ) : (
                <App />
            )}
        </>
    );
}

