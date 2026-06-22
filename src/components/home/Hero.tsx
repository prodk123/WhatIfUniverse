'use client';

import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="relative py-24 md:py-32 text-center px-4 overflow-hidden bg-mesh-dark">
      {/* Animated glowing orbs behind text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-96 bg-[var(--color-primary)] opacity-20 blur-[100px] rounded-full animate-pulse-slow"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center"
      >
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 text-white drop-shadow-2xl"
        >
          What If You Could See the Future <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2dd4bf] via-[#7c3aed] to-[#f472b6] animate-gradient-x text-glow">
            Before Making a Decision?
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl leading-relaxed"
        >
          Explore alternate outcomes for money, career, health, education, and life decisions instantly. No signup required.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="#categories">
            <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all transform hover:-translate-y-1 text-white border-0">
              Explore Simulators
            </Button>
          </Link>
          <Link href="/category/money">
            <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent border-gray-400 text-white hover:bg-white/10 hover:text-white transition-all backdrop-blur-md">
              Try Financial Scenarios
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
