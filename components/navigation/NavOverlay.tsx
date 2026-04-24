"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useUIStore } from "@/lib/store";
import { NAV_ITEMS } from "@/lib/constants";

export default function NavOverlay() {
    const { isNavOpen, closeNav, openBooking } = useUIStore();

    const handleNavClick = (sectionId: string) => {
        closeNav();
        const el = document.getElementById(sectionId);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleBookClick = () => {
        closeNav();
        openBooking();
    };

    return (
        <AnimatePresence>
            {isNavOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="fixed inset-0 z-50 bg-charcoal/95 backdrop-modal flex flex-col items-center justify-center"
                >
                    {/* Close Button */}
                    <button
                        onClick={closeNav}
                        className="absolute top-lg right-lg text-textSecondary hover:text-gold transition-colors p-sm"
                        aria-label="Close menu"
                    >
                        <X size={32} strokeWidth={1.5} />
                    </button>

                    {/* Logo in Overlay */}
                    <div className="mb-3xl">
                        <img
                            src="/all logo/primary-logo.webp"
                            alt="Mehndi Nest Logo"
                            className="h-24 w-auto"
                        />
                    </div>

                    {/* Nav Links */}
                    <nav className="flex flex-col items-center gap-xl">
                        {NAV_ITEMS.map((item, i) => (
                            <motion.button
                                key={item.sectionId}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: 0.1 + i * 0.08,
                                    duration: 0.5,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                onClick={() =>
                                    item.sectionId === "booking"
                                        ? handleBookClick()
                                        : handleNavClick(item.sectionId)
                                }
                                className="font-heading text-h3 text-textPrimary hover:text-gold transition-colors duration-component"
                            >
                                {item.label}
                            </motion.button>
                        ))}
                    </nav>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
