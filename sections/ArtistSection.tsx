"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SECTION_IDS } from "@/lib/constants";
import Container from "@/components/layout/Container";
import SectionWrapper from "@/components/layout/SectionWrapper";

export default function ArtistSection() {
    return (
        <SectionWrapper id={SECTION_IDS.artist}>
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3xl items-center">
                    {/* Portrait */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="relative"
                    >
                        <div className="relative aspect-[3/4] w-full max-w-md mx-auto lg:mx-0 overflow-hidden rounded-card">
                            <Image
                                src="/images/testimonials/bhZ7dCVo737g1oKfW3OFh1SY0NuFZn50yAHM3ZCN8t0CHTjwhziy3M2gElP3pbMb12jQu4m8YP33-Qjc0FH67X0PtKUy3c59KjNyWzsa0OQ.webp"
                                alt="Mehndi artist portrait"
                                fill
                                className="object-cover brightness-[1.1] saturate-[1.1] md:brightness-100 md:saturate-100 transition-all duration-reveal"
                                sizes="(max-width: 1024px) 80vw, 40vw"
                            />
                        </div>
                        {/* Decorative gold line */}
                        <div className="absolute -bottom-lg -right-lg w-32 h-32 border-2 border-gold/30 rounded-card hidden lg:block" />
                    </motion.div>

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col gap-xl"
                    >
                        <p className="text-gold text-caption tracking-[0.2em] uppercase">
                            The Artist
                        </p>

                        <h2 className="font-heading text-h2 text-textPrimary">
                            Crafting Stories
                            <br />
                            <span className="text-gold italic">on Skin</span>
                        </h2>

                        <p className="text-textSecondary text-body-lg leading-relaxed max-w-lg">
                            With over a decade of experience in bridal mehndi artistry, each
                            design tells a unique story. Every stroke is a reflection of the
                            bride&apos;s personality, cultural heritage, and the love that
                            inspires the ceremony.
                        </p>

                        <p className="text-textSecondary text-body-base leading-relaxed max-w-lg">
                            Specializing in intricate bridal designs that blend traditional
                            Mughal patterns with contemporary aesthetics, creating timeless
                            art that becomes a part of your most precious memories.
                        </p>

                        {/* Signature */}
                        <div className="mt-lg">
                            <p className="font-heading text-h4 text-gold italic">
                                — Mehndi Nest
                            </p>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </SectionWrapper>
    );
}
