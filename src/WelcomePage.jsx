// src/WelcomePage.jsx
import React from "react";
import { motion } from "framer-motion";
import "./WelcomePage.css"; // optional external CSS for styling

const WelcomePage = ({ onEnter }) => {
    return (
        <div className="welcome-container">
            {/* Background animation */}
            <motion.div
                className="welcome-bg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
            />

            {/* Main content */}
            <motion.div
                className="welcome-content"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <h1 className="welcome-title">✨ Welcome to Your BucketList ✨</h1>
                <p className="welcome-subtitle">
                    The best time for new beginnings is now.
                    Let’s make your dreams happen!
                </p>

                <motion.button
                    className="welcome-btn"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onEnter}
                >
                    Enter Dashboard 🚀
                </motion.button>
            </motion.div>
        </div>
    );
};

export default WelcomePage;