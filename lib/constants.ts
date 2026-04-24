// ── Section IDs (used for navigation scroll-to) ──
export const SECTION_IDS = {
    hero: "hero",
    artist: "artist",
    portfolio: "portfolio",
    simulator: "simulator",
    timeline: "timeline",
    testimonials: "testimonials",
    booking: "booking",
    footer: "footer",
} as const;

// ── Navigation Items ──
export const NAV_ITEMS = [
    { label: "About the Artist", sectionId: SECTION_IDS.artist },
    { label: "Portfolio", sectionId: SECTION_IDS.portfolio },
    { label: "Styles", sectionId: SECTION_IDS.simulator },
    { label: "Reviews", sectionId: SECTION_IDS.testimonials },
    { label: "Book Artist", sectionId: SECTION_IDS.booking },
] as const;

// ── Design Simulator Data ──
export interface SimulatorStyle {
    id: string;
    label: string;
    description: string;
    timeEstimate: string;
    startingPrice: string;
    image: string;
}

export const SIMULATOR_STYLES: SimulatorStyle[] = [
    {
        id: "minimal",
        label: "Minimal",
        description: "Delicate patterns with clean lines and negative space. Perfect for a subtle, modern look.",
        timeEstimate: "30–60 mins",
        startingPrice: "₹3,000",
        image: "/images/simulator/ALvmHD2DBtq1cIR_kyA2d5m_od_PH7_F3zsQkAyKD81B5ISJOvqLil4wvV255j9wq1Bqk4VY_IJs7MFTY0n8wKFDIMdzPgBBS7wj9iSVj2Y.webp",
    },
    {
        id: "arabic",
        label: "Arabic",
        description: "Flowing floral patterns with bold outlines. A beautiful balance of coverage and elegance.",
        timeEstimate: "1–2 hours",
        startingPrice: "₹5,000",
        image: "/images/simulator/P73ASQss9AWwh-235deUh_ZZhFjB5RnV6ltWun4zgY40__FV-pPBVUIWPyCbcff2Tuo109tPtuqLRSCW8tbAxGaEfnk8D0qEQZV9mDS-PNI.webp",
    },
    {
        id: "bridal",
        label: "Bridal",
        description: "Full coverage intricate patterns from fingertips to elbows. The ultimate bridal experience.",
        timeEstimate: "3–5 hours",
        startingPrice: "₹15,000",
        image: "/images/simulator/dZeZM1U8Rqmt8aWQoqGdqKbKMHIr1MivNO6Dco3lfbx5hGydnXPpr5ZOTVqrhAWO8oQARyJWbipaT6pbWR7HTwjDsDvfaULeAdMkJXM2khg.webp",
    },
];

// ── Timeline Stages ──
export interface TimelineStage {
    id: number;
    title: string;
    description: string;
    icon: string;
}

export const TIMELINE_STAGES: TimelineStage[] = [
    {
        id: 1,
        title: "Design Selection",
        description: "Choose your mehndi style, discuss placement, and personalize the design to match your vision.",
        icon: "palette",
    },
    {
        id: 2,
        title: "Application",
        description: "Watch as the henna paste is carefully applied by hand, creating intricate patterns on your skin.",
        icon: "pen-tool",
    },
    {
        id: 3,
        title: "Drying Process",
        description: "Let the henna dry naturally for 4–6 hours. The longer you keep it, the darker the stain.",
        icon: "clock",
    },
    {
        id: 4,
        title: "Final Stain Reveal",
        description: "Scrape off the dried paste to reveal a rich, deep stain that darkens over the next 48 hours.",
        icon: "sparkles",
    },
];

// ── Testimonials Data ──
export interface Testimonial {
    id: string;
    name: string;
    quote: string;
    videoSrc?: string;
    thumbnail?: string;
}

export const TESTIMONIALS: Testimonial[] = [
    {
        id: "t1",
        name: "Priya S.",
        quote: "The most beautiful mehndi I've ever had. Every detail was perfect for my wedding day.",
        thumbnail: "/images/testimonials/-Y8x6UliqE6fCR1xiSIL1WiTjfDOq5s5qqw9NpbjqyZL09s59a5LWCRiruE53gLEcUKmSDyWv8OPkOy_Qttp4m2J9E16_tPHQLPGpT2bQVU.webp",
    },
    {
        id: "t2",
        name: "Aisha K.",
        quote: "She understood exactly what I wanted. The design was stunning and the stain lasted weeks!",
        thumbnail: "/images/testimonials/D_CNaGq_6CPReWpAFeKPcsujLdOK47B2WnkuyMytA4LUC76Aq9nU5eaqQl7nYYtNEvV67NFO9eBBf_SH3uj_jJwLJqHM9yTm1bJUBtg41HA.webp",
    },
    {
        id: "t3",
        name: "Neha M.",
        quote: "An artist in the truest sense. My bridal mehndi was the highlight of my ceremony.",
        thumbnail: "/images/testimonials/F2d7aXDcEjJb-jSkV7MEUTH0BEaw7M0GGv9rK4ImsXXO8X8AguVTpA8zYXPo_59d9Mvjco1lAJ00SiU6zlsvjeFeRv3JS92VJPT8V8WEKlM.webp",
    },
];

// ── Social Links ──
export const SOCIAL_LINKS = [
    { platform: "Instagram", url: "#", icon: "instagram" },
    { platform: "Pinterest", url: "#", icon: "pin" },
    { platform: "YouTube", url: "#", icon: "youtube" },
] as const;

// ── Contact ──
export const CONTACT_EMAIL = "hello@mehdinest.com";
