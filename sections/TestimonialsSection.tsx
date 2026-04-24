"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, Quote } from "lucide-react";
import { SECTION_IDS, TESTIMONIALS } from "@/lib/constants";
import Container from "@/components/layout/Container";
import SectionWrapper from "@/components/layout/SectionWrapper";
import Card from "@/components/ui/Card";
import Modal from "@/components/ui/Modal";
import VideoPlayer from "@/components/ui/VideoPlayer";

export default function TestimonialsSection() {
    const [activeVideo, setActiveVideo] = useState<string | null>(null);

    return (
        <SectionWrapper id={SECTION_IDS.testimonials} className="bg-cardDark/30">
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
                        Reviews
                    </p>
                    <h2 className="font-heading text-h2 text-textPrimary">
                        Bride <span className="text-gold italic">Stories</span>
                    </h2>
                </motion.div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
                    {TESTIMONIALS.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.1,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >
                            <Card variant="testimonial" className="h-full">
                                {/* Thumbnail / Video Trigger */}
                                {testimonial.thumbnail && (
                                    <div
                                        className="relative aspect-video rounded-card overflow-hidden mb-lg cursor-pointer group"
                                        onClick={() =>
                                            testimonial.videoSrc && setActiveVideo(testimonial.videoSrc)
                                        }
                                    >
                                        <Image
                                            src={testimonial.thumbnail}
                                            alt={`${testimonial.name} testimonial`}
                                            fill
                                            className="object-cover transition-transform duration-component ease-elegant group-hover:scale-[1.03]"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        />
                                        {testimonial.videoSrc && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-charcoal/30 opacity-0 group-hover:opacity-100 transition-opacity duration-component">
                                                <div className="w-14 h-14 rounded-full bg-gold/90 flex items-center justify-center">
                                                    <Play
                                                        size={24}
                                                        className="text-charcoal ml-1"
                                                        fill="currentColor"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Quote */}
                                <div className="flex gap-md">
                                    <Quote
                                        size={24}
                                        className="text-gold/40 flex-shrink-0 mt-1"
                                        strokeWidth={1.5}
                                    />
                                    <p className="text-textSecondary text-body-base italic leading-relaxed">
                                        {testimonial.quote}
                                    </p>
                                </div>

                                {/* Name */}
                                <p className="text-gold font-heading text-body-lg mt-lg">
                                    {testimonial.name}
                                </p>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </Container>

            {/* Video Modal */}
            <Modal
                isOpen={!!activeVideo}
                onClose={() => setActiveVideo(null)}
                className="max-w-4xl w-full p-0 bg-transparent"
            >
                {activeVideo && <VideoPlayer src={activeVideo} />}
            </Modal>
        </SectionWrapper>
    );
}
