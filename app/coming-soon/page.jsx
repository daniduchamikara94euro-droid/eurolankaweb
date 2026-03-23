'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

// Dynamic import — canvas must be client-only, no SSR
const Scene3D = dynamic(() => import('./Scene3D'), { ssr: false });

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
};

const glowPulse = {
  animate: {
    textShadow: [
      '0 0 10px #0ea5e9',
      '0 0 30px #0ea5e9, 0 0 60px #1e40af',
      '0 0 10px #0ea5e9',
    ],
    transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
  },
};

export default function ComingSoon() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050d1a] flex items-center justify-center">

      {/* 3D background canvas */}
      <div className="absolute inset-0 z-0">
        <Scene3D />
      </div>

      {/* Radial gradient overlay — keeps text readable */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(5,13,26,0.5) 0%, rgba(5,13,26,0.85) 70%)',
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-20 text-center max-w-2xl px-6"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {/* Brand name */}
        <motion.div variants={fadeUp} className="mb-6">
          <motion.span
            className="text-5xl md:text-6xl font-black tracking-tight"
            {...glowPulse}
          >
            <span className="text-white">Euro</span>
            <span className="text-[#0ea5e9]">Lanka</span>
            <span className="text-white"> Web</span>
          </motion.span>
        </motion.div>

        {/* Badge */}
        <motion.div variants={fadeUp} className="mb-8 flex justify-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0ea5e9]/40 bg-[#0ea5e9]/10 text-[#0ea5e9] text-sm font-medium backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-[#0ea5e9] animate-pulse" />
            Under Construction
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={fadeUp}
          className="text-4xl md:text-5xl font-bold mb-5 text-white leading-tight"
        >
          Something{' '}
          <span className="text-[#0ea5e9]">Extraordinary</span>
          <br />is Coming
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={fadeUp}
          className="text-gray-400 text-lg mb-10 leading-relaxed"
        >
          We're crafting a premium experience for furniture accessories.
          Stay tuned — it'll be worth the wait.
        </motion.p>

        {/* Divider */}
        <motion.div
          variants={fadeUp}
          className="w-32 h-px mx-auto mb-10"
          style={{
            background: 'linear-gradient(90deg, transparent, #0ea5e9, transparent)',
          }}
        />

        {/* Contact */}
        <motion.p variants={fadeUp} className="text-gray-500 text-sm">
          Inquiries:{' '}
          <a
            href="mailto:info@eurolankaweb.com"
            className="text-[#0ea5e9] hover:text-white transition-colors duration-200"
          >
            info@eurolankaweb.com
          </a>
        </motion.p>
      </motion.div>

      {/* Corner glow accents */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.08) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(30,64,175,0.1) 0%, transparent 70%)' }} />
    </div>
  );
}
