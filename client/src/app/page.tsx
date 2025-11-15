"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-green-100 via-emerald-200 to-lime-100 p-6">

      {/* Floating Gradient Blobs */}
      <div className="absolute inset-0">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-green-400 opacity-30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 -right-10 w-96 h-96 bg-emerald-500 opacity-20 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl rounded-3xl px-10 py-14 max-w-2xl text-center"
      >
        <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="text-5xl md:text-6xl font-extrabold mb-4 text-green-900 drop-shadow-sm text-center"
      >
          AgriAssist
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-lg md:text-xl text-gray-700 font-medium mb-10 leading-relaxed"
        >
          Empowering farmers with smart insights.<br />
          Get real-time weather, market prices, crop recommendations, and more.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            href="/dashboard"
            className="px-8 py-4 text-lg font-semibold rounded-xl
              bg-gradient-to-r from-green-600 to-emerald-500 text-white 
              shadow-lg shadow-green-300/50
              hover:scale-105 hover:shadow-green-400/70
              transition-all duration-200 ease-out"
          >
            Go to Dashboard →
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
