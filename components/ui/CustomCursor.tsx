"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleMouse = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const handleEnter = () => setIsVisible(true);
        const handleLeave = () => setIsVisible(false);

        // Only show custom cursor in portfolio section
        const portfolioEl = document.getElementById("portfolio");
        if (portfolioEl) {
            portfolioEl.addEventListener("mouseenter", handleEnter);
            portfolioEl.addEventListener("mouseleave", handleLeave);
        }

        window.addEventListener("mousemove", handleMouse);

        return () => {
            window.removeEventListener("mousemove", handleMouse);
            if (portfolioEl) {
                portfolioEl.removeEventListener("mouseenter", handleEnter);
                portfolioEl.removeEventListener("mouseleave", handleLeave);
            }
        };
    }, []);

    // Don't render on touch devices
    if (typeof window !== "undefined" && "ontouchstart" in window) {
        return null;
    }

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
            animate={{
                x: position.x - 8,
                y: position.y - 8,
                opacity: isVisible ? 1 : 0,
                scale: isVisible ? 1 : 0.5,
            }}
            transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
        >
            <div className="w-4 h-4 rounded-full bg-gold" />
        </motion.div>
    );
}
