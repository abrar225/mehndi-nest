"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Prevent scrolling while loading
        document.body.style.overflow = "hidden";

        const timer = setTimeout(() => {
            setLoading(false);
            document.body.style.overflow = "auto";
        }, 3500); // 3.5 seconds duration

        return () => {
            document.body.style.overflow = "auto";
            clearTimeout(timer);
        };
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ 
                        opacity: 0, 
                        transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } 
                    }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-charcoal"
                >
                    {/* Artistic Background Elements */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <motion.div
                            animate={{ 
                                rotate: 360,
                                scale: [1, 1.1, 1]
                            }}
                            transition={{ 
                                rotate: { duration: 60, repeat: Infinity, ease: "linear" },
                                scale: { duration: 20, repeat: Infinity, ease: "easeInOut" }
                            }}
                            className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%] border-[0.5px] border-gold/10 rounded-full"
                        />
                        {/* Sparkles */}
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0 }}
                                animate={{ 
                                    opacity: [0, 1, 0],
                                    scale: [0, 1, 0],
                                    x: Math.random() * 400 - 200,
                                    y: Math.random() * 400 - 200
                                }}
                                transition={{ 
                                    duration: 2 + Math.random() * 3,
                                    repeat: Infinity,
                                    delay: Math.random() * 5
                                }}
                                className="absolute top-1/2 left-1/2 w-1 h-1 bg-gold rounded-full blur-[1px]"
                            />
                        ))}
                    </div>

                    <div className="relative flex flex-col items-center">
                        {/* Premium Mandala Loader */}
                        <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
                            {/* Layer 1 - Outer Decorative Ring */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 text-gold/20"
                            >
                                <svg viewBox="0 0 100 100" className="w-full h-full">
                                    <defs>
                                        <path id="leaf" d="M50,50 Q65,30 50,5 L35,30 Q50,50 50,50" />
                                    </defs>
                                    {[...Array(16)].map((_, i) => (
                                        <use key={i} href="#leaf" transform={`rotate(${i * 22.5} 50 50)`} fill="none" stroke="currentColor" strokeWidth="0.5" />
                                    ))}
                                </svg>
                            </motion.div>

                            {/* Layer 2 - Middle Pattern */}
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-6 text-gold/40"
                            >
                                <svg viewBox="0 0 100 100" className="w-full h-full">
                                    {[...Array(24)].map((_, i) => (
                                        <circle key={i} cx="50" cy="12" r="1.5" fill="currentColor" transform={`rotate(${i * 15} 50 50)`} />
                                    ))}
                                    <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="0.2" strokeDasharray="1 3" />
                                </svg>
                            </motion.div>

                            {/* Logo Container */}
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                                className="relative z-10 w-28 h-28 md:w-36 md:h-36"
                            >
                                <div className="w-full h-full rounded-full p-2 bg-white/10 backdrop-blur-sm border-2 border-gold shadow-[0_0_60px_rgba(200,169,106,0.3)] overflow-hidden">
                                    <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center">
                                        <img
                                            src="/all logo/favicon-logo.webp"
                                            alt="Mehndi Nest"
                                            className="w-full h-full object-cover scale-[1.02]"
                                        />
                                    </div>
                                </div>
                                {/* Elegant Rotating Border for Logo */}
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                    className="absolute -inset-1 border border-dashed border-gold/40 rounded-full"
                                />
                                {/* Pulsing Aura */}
                                <motion.div
                                    animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0, 0.2] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -inset-4 bg-gold/10 rounded-full blur-xl"
                                />
                            </motion.div>
                        </div>

                        {/* Text Content */}
                        <div className="mt-16 text-center">
                            <motion.div
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6, duration: 1 }}
                            >
                                <p className="text-gold/60 font-body tracking-[0.4em] uppercase text-[9px] md:text-xs mb-4">
                                    Designed, Developed & Hosted by
                                </p>
                                <a 
                                    href="https://firehox.in" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="group relative inline-block py-2"
                                >
                                    <span className="text-h2 md:text-h1 font-heading text-textPrimary group-hover:text-gold transition-colors duration-700">
                                        firehox
                                    </span>
                                    <motion.span 
                                        className="absolute bottom-0 left-0 w-full h-[1px] bg-gold origin-left"
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ delay: 1.2, duration: 1.5, ease: "easeInOut" }}
                                    />
                                </a>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 2, duration: 1 }}
                                    className="mt-8 flex flex-col items-center gap-4"
                                >
                                    <p className="text-textSecondary/40 text-caption italic tracking-[0.2em]">
                                        A perfect shoutout for firehox
                                    </p>
                                    {/* Decorative Divider */}
                                    <div className="flex items-center gap-4 opacity-20">
                                        <div className="w-12 h-[1px] bg-gold" />
                                        <div className="w-2 h-2 rotate-45 border border-gold" />
                                        <div className="w-12 h-[1px] bg-gold" />
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Progress Loader at Bottom */}
                    <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-64 h-[2px] bg-white/5 overflow-hidden rounded-full">
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: "0%" }}
                            transition={{ duration: 3.5, ease: "linear" }}
                            className="w-full h-full bg-gradient-to-r from-gold/50 via-gold to-gold/50"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
