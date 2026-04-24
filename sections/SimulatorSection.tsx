"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SECTION_IDS, SIMULATOR_STYLES } from "@/lib/constants";
import Container from "@/components/layout/Container";
import SectionWrapper from "@/components/layout/SectionWrapper";
import Slider from "@/components/ui/Slider";

export default function SimulatorSection() {
    const [selectedIndex, setSelectedIndex] = useState(1); // Start on "Arabic"
    const current = SIMULATOR_STYLES[selectedIndex];

    return (
        <SectionWrapper id={SECTION_IDS.simulator} className="relative overflow-hidden bg-charcoal">
            {/* Artistic Background Elements */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />
            </div>

            <Container>
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-4xl relative z-10"
                >
                    <div className="flex items-center justify-center gap-4 mb-md">
                        <div className="w-12 h-[1px] bg-gold/40" />
                        <p className="text-gold text-caption tracking-[0.3em] uppercase">
                            Explore Styles
                        </p>
                        <div className="w-12 h-[1px] bg-gold/40" />
                    </div>
                    <h2 className="font-heading text-h2 md:text-[64px] text-textPrimary leading-tight">
                        Design <span className="text-gold italic">Complexity</span>
                    </h2>
                    <p className="text-textSecondary text-body-lg mt-lg max-w-2xl mx-auto font-light">
                        Discover the artistic depth of our signatures. Drag the slider to witness how 
                        intricacy transforms time and value.
                    </p>
                </motion.div>

                <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-xl lg:gap-3xl items-center bg-cardDark/40 backdrop-blur-sm p-lg md:p-3xl rounded-[32px] border border-white/5 shadow-2xl">
                    {/* Preview Image Column */}
                    <div className="lg:col-span-5 relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10"
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={current.id}
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.6, ease: "easeInOut" }}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src={current.image}
                                        alt={`${current.label} mehndi style`}
                                        fill
                                        className="object-cover brightness-[1.1] saturate-[1.05]"
                                        sizes="(max-width: 1024px) 100vw, 40vw"
                                    />
                                    {/* Subtle Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>
                        
                        {/* Decorative Badge on Image */}
                        <motion.div 
                            key={`badge-${current.id}`}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="absolute -top-4 -right-4 bg-gold text-charcoal px-6 py-2 rounded-full font-heading text-body-base italic shadow-xl z-20"
                        >
                            {current.label}
                        </motion.div>
                    </div>

                    {/* Controls & Details Column */}
                    <div className="lg:col-span-7 flex flex-col gap-2xl">
                        {/* Slider Selection */}
                        <div className="bg-charcoal/40 p-xl rounded-2xl border border-white/5">
                            <p className="text-textSecondary text-caption uppercase tracking-widest mb-xl opacity-60">
                                Select Intricacy Level
                            </p>
                            <Slider
                                min={0}
                                max={2}
                                value={selectedIndex}
                                onChange={setSelectedIndex}
                                labels={SIMULATOR_STYLES.map((s) => s.label)}
                            />
                        </div>

                        {/* Content & Stats */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={current.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4 }}
                                className="flex flex-col gap-xl"
                            >
                                <div>
                                    <h3 className="font-heading text-h3 md:text-h2 text-gold mb-md">
                                        {current.label} <span className="text-textPrimary text-caption font-body uppercase tracking-[0.2em] italic align-middle ml-4">Style</span>
                                    </h3>
                                    <p className="text-textSecondary text-body-lg leading-relaxed max-w-xl">
                                        {current.description}
                                    </p>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-lg mt-4">
                                    <div className="group relative bg-[#1A1A1A] p-xl rounded-2xl border border-white/5 hover:border-gold/30 transition-all duration-500 overflow-hidden">
                                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-gold">
                                              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                                            </svg>
                                        </div>
                                        <p className="text-textSecondary text-caption mb-sm tracking-widest uppercase">
                                            Application Time
                                        </p>
                                        <p className="text-gold font-heading text-h3">
                                            {current.timeEstimate}
                                        </p>
                                        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                                    </div>

                                    <div className="group relative bg-[#1A1A1A] p-xl rounded-2xl border border-white/5 hover:border-gold/30 transition-all duration-500 overflow-hidden">
                                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-gold">
                                              <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
                                            </svg>
                                        </div>
                                        <p className="text-textSecondary text-caption mb-sm tracking-widest uppercase">
                                            Investment
                                        </p>
                                        <p className="text-gold font-heading text-h3">
                                            {current.startingPrice}
                                        </p>
                                        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                                    </div>
                                </div>
                                
                                <p className="text-textSecondary/40 text-[11px] uppercase tracking-widest italic mt-4">
                                    * Prices may vary based on specific bridal requirements and travel
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </Container>
        </SectionWrapper>
    );
}
