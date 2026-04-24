"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SECTION_IDS } from "@/lib/constants";

export default function HeroSection() {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.75;
        }
    }, []);

    const scrollToArtist = () => {
        const el = document.getElementById(SECTION_IDS.artist);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section
            id={SECTION_IDS.hero}
            className="relative w-full h-screen overflow-hidden flex items-center justify-center"
        >
            {/* Video Background */}
            <div className="absolute inset-0 z-0">
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src="/videos/Mehndi_artist_applying_henna_design_delpmaspu_.mp4" type="video/mp4" />
                </video>
                {/* Dark overlay — deeper gradient for better text legibility */}
                <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/40 to-charcoal/90" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-lg max-w-4xl">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-gold font-body text-body-lg tracking-[0.3em] uppercase mb-lg drop-shadow-md"
                >
                    Premium Mehndi Artistry
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="font-heading text-h1 text-textPrimary mb-xl leading-tight drop-shadow-lg"
                >
                    Where Tradition
                    <br />
                    <span className="text-gold italic">Meets Artistry</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-textSecondary text-body-lg max-w-xl mx-auto drop-shadow-sm font-light"
                >
                    Exquisite hand-crafted mehndi designs for your most cherished moments
                </motion.p>
            </div>

            {/* Scroll Indicator */}
            <motion.button
                onClick={scrollToArtist}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-sm text-textSecondary hover:text-gold transition-colors"
                aria-label="Scroll down"
            >
                <span className="text-caption tracking-[0.15em] uppercase">Explore</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                    <ChevronDown size={24} strokeWidth={1.5} />
                </motion.div>
            </motion.button>
        </section>
    );
}
