"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SECTION_IDS } from "@/lib/constants";
import Container from "@/components/layout/Container";
import SectionWrapper from "@/components/layout/SectionWrapper";
import Card from "@/components/ui/Card";
import ImagePreview from "@/components/ui/ImagePreview";

const PORTFOLIO_IMAGES = [
    { src: "/images/portfolio/3bgQGsa48Fsp4Hae3NRBlNXTnl9quW9a31hnvcyDBHGtNWng6osxy0vy6N54JBqGLMcjEwWKBGOEszE1bdDgkFA0qFwLz_2-YPEjmifmS5U.webp", alt: "Bridal mehndi full hand" },
    { src: "/images/portfolio/fU2R-5EVZswqTHeybnolRTXCwo9yqcnytfOEM30aVnbIcXS9ODdCIJitkJl3GoSTgo5XqcHiU0nIl7zk56U7z4dzwLLjqmO14BRK3ahS0e8.webp", alt: "Arabic mehndi pattern" },
    { src: "/images/portfolio/xNzJkv9dZbix1ZzmFAgaQaZTRBfMxVow0vNQtU7IAQhMxvFmBooxPwk5UwBJVm-ZNtH5Dh4dTVzcNv6E_4xbHsBqY1KsQPjkI2R1NeW2vmI.webp", alt: "Minimal mehndi design" },
    { src: "/images/portfolio/z20qUPdZqAAEJthpQK6Z7FcfdLx2bE7_Kba0jeJ47_ECVFTK5fb0HyhMFjARyEzSINA-Jfc6m5ZlEKKy3PoKgd9nykIeUUN8N8RRoGa5aNA.webp", alt: "Detailed bridal mehndi" },
];

export default function PortfolioSection() {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const openPreview = (index: number) => {
        setCurrentIndex(index);
        setPreviewOpen(true);
    };

    return (
        <SectionWrapper id={SECTION_IDS.portfolio}>
            <Container large>
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-3xl"
                >
                    <p className="text-gold text-caption tracking-[0.2em] uppercase mb-md">
                        Portfolio
                    </p>
                    <h2 className="font-heading text-h2 text-textPrimary">
                        A Canvas of <span className="text-gold italic">Art</span>
                    </h2>
                </motion.div>

                {/* Gallery Grid — scattered layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-lg">
                    {PORTFOLIO_IMAGES.map((img, index) => (
                        <motion.div
                            key={img.src}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.1,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className={`${index === 0 || index === 3 ? "sm:row-span-2" : ""
                                }`}
                        >
                            <Card
                                variant="portfolio"
                                imageSrc={img.src}
                                imageAlt={img.alt}
                                onClick={() => openPreview(index)}
                            />
                        </motion.div>
                    ))}
                </div>
            </Container>

            {/* Fullscreen Preview */}
            <ImagePreview
                images={PORTFOLIO_IMAGES}
                currentIndex={currentIndex}
                isOpen={previewOpen}
                onClose={() => setPreviewOpen(false)}
                onNavigate={setCurrentIndex}
            />
        </SectionWrapper>
    );
}
