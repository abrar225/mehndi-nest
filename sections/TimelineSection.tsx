"use client";

import React from "react";
import { motion } from "framer-motion";
import { Palette, PenTool, Clock, Sparkles } from "lucide-react";
import { SECTION_IDS, TIMELINE_STAGES } from "@/lib/constants";
import Container from "@/components/layout/Container";
import SectionWrapper from "@/components/layout/SectionWrapper";

const ICONS: Record<string, React.ReactNode> = {
    palette: <Palette size={28} strokeWidth={1.5} />,
    "pen-tool": <PenTool size={28} strokeWidth={1.5} />,
    clock: <Clock size={28} strokeWidth={1.5} />,
    sparkles: <Sparkles size={28} strokeWidth={1.5} />,
};

export default function TimelineSection() {
    return (
        <SectionWrapper id={SECTION_IDS.timeline}>
            <Container>
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-3xl"
                >
                    <p className="text-gold text-caption tracking-[0.2em] uppercase mb-md">
                        The Journey
                    </p>
                    <h2 className="font-heading text-h2 text-textPrimary">
                        Ceremony <span className="text-gold italic">Timeline</span>
                    </h2>
                </motion.div>

                {/* Vertical Timeline */}
                <div className="relative max-w-4xl mx-auto pl-12 lg:pl-0">
                    {/* Left Line (desktop: centered) */}
                    <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px bg-gold/20 lg:-translate-x-px" />

                    <div className="flex flex-col gap-2xl">
                        {TIMELINE_STAGES.map((stage, index) => {
                            const isLeft = index % 2 === 0;
                            return (
                                <motion.div
                                    key={stage.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.5 }}
                                    transition={{
                                        duration: 0.6,
                                        delay: index * 0.1,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className={`relative flex flex-col lg:flex-row items-start lg:items-center ${isLeft ? "lg:flex-row-reverse" : ""
                                        }`}
                                >
                                    {/* Content Area */}
                                    <div className={`flex-1 w-full lg:w-1/2 ${isLeft ? "lg:pl-20" : "lg:pr-20"
                                        } pb-4 lg:pb-0`}>
                                        <div className={`bg-cardDark/40 p-xl rounded-card border border-gold/10 hover:border-gold/30 transition-colors duration-component ${isLeft ? "lg:text-left" : "lg:text-right"}`}>
                                            <span className="text-gold text-caption tracking-[0.15em] uppercase font-medium">
                                                Stage {stage.id}
                                            </span>
                                            <h3 className="font-heading text-h3 text-textPrimary mt-sm mb-md">
                                                {stage.title}
                                            </h3>
                                            <p className="text-textSecondary text-body-base leading-relaxed">
                                                {stage.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Spacer for the other side on desktop */}
                                    <div className="hidden lg:block lg:flex-1" />

                                    {/* Icon Marker */}
                                    <div className="absolute left-[-24px] lg:left-1/2 lg:-translate-x-1/2 top-0 lg:top-auto flex items-center justify-center w-12 h-12 rounded-full bg-charcoal border-2 border-gold text-gold z-10 shadow-lg shadow-gold/10">
                                        {ICONS[stage.icon]}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </Container>
        </SectionWrapper>
    );
}
