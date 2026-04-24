"use client";

import React from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/navigation/Navbar";
import NavOverlay from "@/components/navigation/NavOverlay";
import HeroSection from "@/sections/HeroSection";
import ArtistSection from "@/sections/ArtistSection";
import PortfolioSection from "@/sections/PortfolioSection";
import SimulatorSection from "@/sections/SimulatorSection";
import TimelineSection from "@/sections/TimelineSection";
import TestimonialsSection from "@/sections/TestimonialsSection";
import BookingSection from "@/sections/BookingSection";
import FooterSection from "@/sections/FooterSection";

// Lazy load non-critical components
const CustomCursor = dynamic(
  () => import("@/components/ui/CustomCursor"),
  { ssr: false }
);

const LenisProvider = dynamic(
  () => import("@/hooks/useLenis").then((mod) => mod.LenisProvider),
  { ssr: false }
);

export default function Home() {
  return (
    <LenisProvider>
      <Navbar />
      <NavOverlay />
      <main>
        <HeroSection />
        <ArtistSection />
        <PortfolioSection />
        <SimulatorSection />
        <TimelineSection />
        <TestimonialsSection />
        <BookingSection />
      </main>
      <FooterSection />
    </LenisProvider>
  );
}
