"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-height-screen bg-charcoal flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Mandala */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-10">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="w-[800px] h-[800px] border border-gold rounded-full flex items-center justify-center"
        >
          <div className="w-[600px] h-[600px] border border-gold rounded-full flex items-center justify-center">
            <div className="w-[400px] h-[400px] border border-gold rounded-full" />
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 text-center max-w-2xl">
        {/* Animated 404 */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-[120px] md:text-[200px] font-heading leading-none text-gold/20 select-none"
        >
          404
        </motion.h1>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-[-40px] md:mt-[-80px]"
        >
          <h2 className="text-h2 md:text-h1 font-heading text-textPrimary mb-4">
            Pattern Lost in Time
          </h2>
          <p className="text-textSecondary text-body-lg mb-10 max-w-md mx-auto">
            The design you are looking for has vanished into the intricate swirls. 
            Let us help you find your way back to the canvas.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="group flex items-center gap-2 bg-gold hover:bg-gold/90 text-charcoal px-8 py-4 rounded-full font-bold transition-all duration-300 transform hover:scale-105"
            >
              <Home size={20} />
              Return Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="group flex items-center gap-2 border border-white/10 hover:border-gold/50 text-textPrimary px-8 py-4 rounded-full font-medium transition-all duration-300"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              Go Back
            </button>
          </div>
        </motion.div>
      </div>

      {/* Footer Branding */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 text-center"
      >
        <p className="text-[10px] tracking-[0.5em] uppercase text-gold">Mehndi Nest</p>
      </motion.div>
    </div>
  );
}
