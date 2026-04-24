import { create } from "zustand";

interface UIState {
    // Navigation
    isNavOpen: boolean;
    openNav: () => void;
    closeNav: () => void;
    toggleNav: () => void;

    // Booking Modal
    isBookingOpen: boolean;
    openBooking: () => void;
    closeBooking: () => void;

    // Image Preview Modal
    isImagePreviewOpen: boolean;
    previewImageIndex: number;
    openImagePreview: (index: number) => void;
    closeImagePreview: () => void;
    setPreviewImageIndex: (index: number) => void;

    // Video Modal
    isVideoModalOpen: boolean;
    activeVideoSrc: string | null;
    openVideoModal: (src: string) => void;
    closeVideoModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
    // Navigation
    isNavOpen: false,
    openNav: () => set({ isNavOpen: true }),
    closeNav: () => set({ isNavOpen: false }),
    toggleNav: () => set((state) => ({ isNavOpen: !state.isNavOpen })),

    // Booking Modal
    isBookingOpen: false,
    openBooking: () => set({ isBookingOpen: true }),
    closeBooking: () => set({ isBookingOpen: false }),

    // Image Preview Modal
    isImagePreviewOpen: false,
    previewImageIndex: 0,
    openImagePreview: (index: number) =>
        set({ isImagePreviewOpen: true, previewImageIndex: index }),
    closeImagePreview: () =>
        set({ isImagePreviewOpen: false, previewImageIndex: 0 }),
    setPreviewImageIndex: (index: number) =>
        set({ previewImageIndex: index }),

    // Video Modal
    isVideoModalOpen: false,
    activeVideoSrc: null,
    openVideoModal: (src: string) =>
        set({ isVideoModalOpen: true, activeVideoSrc: src }),
    closeVideoModal: () =>
        set({ isVideoModalOpen: false, activeVideoSrc: null }),
}));
