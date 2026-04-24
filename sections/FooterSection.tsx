"use client";

import React from "react";
import { motion } from "framer-motion";
import { Instagram, Youtube, Mail, ArrowUp } from "lucide-react";
import { SECTION_IDS, SOCIAL_LINKS, CONTACT_EMAIL } from "@/lib/constants";
import { useUIStore } from "@/lib/store";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";

export default function FooterSection() {
    const { openBooking } = useUIStore();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const iconMap: Record<string, React.ReactNode> = {
        instagram: <Instagram size={22} strokeWidth={1.5} />,
        youtube: <Youtube size={22} strokeWidth={1.5} />,
        pin: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C8.13401 2 5 5.13401 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13401 15.866 2 12 2Z" />
                <circle cx="12" cy="9" r="3" />
            </svg>
        ),
    };

    return (
        <footer id={SECTION_IDS.footer} className="border-t border-borderSubtle">
            <Container>
                <div className="py-3xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2xl items-center">
                        {/* Brand */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="mb-md">
                                <img
                                    src="/all logo/primary-logo.webp"
                                    alt="Mehndi Nest Logo"
                                    className="h-16 w-auto"
                                />
                            </div>
                            <p className="text-textSecondary text-body-base">
                                Premium mehndi artistry for your most cherished moments.
                            </p>
                        </motion.div>

                        {/* Quick Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="flex flex-col items-center gap-lg"
                        >
                            <Button variant="secondary" onClick={openBooking}>
                                Quick Book
                            </Button>
                            <a
                                href={`mailto:${CONTACT_EMAIL}`}
                                className="flex items-center gap-sm text-textSecondary hover:text-gold transition-colors text-body-base"
                            >
                                <Mail size={18} strokeWidth={1.5} />
                                {CONTACT_EMAIL}
                            </a>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex items-center justify-end gap-lg"
                        >
                            {SOCIAL_LINKS.map((link) => (
                                <a
                                    key={link.platform}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 rounded-full border border-borderSubtle flex items-center justify-center text-gold hover:bg-gold hover:text-charcoal transition-all duration-component"
                                    aria-label={link.platform}
                                >
                                    {iconMap[link.icon]}
                                </a>
                            ))}
                        </motion.div>
                    </div>

                    {/* Bottom Row */}
                    <div className="flex flex-col md:flex-row items-center justify-between mt-2xl pt-xl border-t border-borderSubtle gap-lg">
                        <p className="text-textSecondary text-caption order-2 md:order-1">
                            © {new Date().getFullYear()} Mehndi Nest. All rights reserved.
                        </p>
                        
                        <div className="flex items-center gap-sm font-body text-caption text-textSecondary/50 order-1 md:order-2">
                            <span className="w-8 h-[1px] bg-borderSubtle hidden md:block" />
                            <span>Designed, Developed & Hosted by</span>
                            <a 
                                href="https://firehox.in" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-gold hover:text-textPrimary transition-colors duration-elegant font-medium italic"
                            >
                                firehox
                            </a>
                            <span className="w-8 h-[1px] bg-borderSubtle hidden md:block" />
                        </div>

                        <button
                            onClick={scrollToTop}
                            className="text-textSecondary hover:text-gold transition-colors p-sm order-3"
                            aria-label="Scroll to top"
                        >
                            <ArrowUp size={20} strokeWidth={1.5} />
                        </button>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
