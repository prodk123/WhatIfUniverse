'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

const headlineOptions = [
  "Before Making a Decision?",
  "Before Quitting Your Job?",
  "Before Buying a House?",
  "Before Starting a Business?",
  "Before Moving Abroad?",
  "Before Retiring Early?"
];

const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full"
          initial={{
            left: `${(i * 13) % 100}%`,
            top: `${(i * 17) % 100}%`,
            opacity: ((i * 23) % 30) / 100 + 0.1,
            scale: ((i * 31) % 50) / 100 + 0.5,
          }}
          animate={{
            y: [0, -100],
            opacity: [0.1, 0.5, 0.1]
          }}
          transition={{
            duration: ((i * 19) % 15) + 15,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            width: `${(i % 3) + 1}px`,
            height: `${(i % 3) + 1}px`,
          }}
        />
      ))}
    </div>
  );
};

function useTypewriter(texts: string[], typingSpeed: number = 50, deletingSpeed: number = 30, pauseDuration: number = 2500) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleType = () => {
      const currentText = texts[index % texts.length];
      setText(isDeleting ? currentText.substring(0, text.length - 1) : currentText.substring(0, text.length + 1));

      if (!isDeleting && text === currentText) {
        setTimeout(() => setIsDeleting(true), pauseDuration);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setIndex((prev) => prev + 1);
      }
    };

    const timer = setTimeout(handleType, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, index, texts, typingSpeed, deletingSpeed, pauseDuration]);

  return text;
}

export function Hero() {
  const headlineText = useTypewriter(headlineOptions);

  return (
    <section className="relative py-24 md:py-32 text-center px-4 overflow-hidden bg-mesh-dark">
      <ParticleBackground />
      
      {/* Subtle metallic glow centered */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-64 bg-white opacity-[0.03] blur-[120px] rounded-full pointer-events-none"></div>
      
      <motion.div 
        initial={{ opacity: 1, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center"
      >
        <motion.h1 
          initial={{ opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6 text-gray-200 drop-shadow-lg min-h-[120px] md:min-h-[140px] lg:min-h-[180px] flex flex-col justify-end pb-4"
        >
          <span>What If You Could See the Future <br className="hidden md:block" /></span>
          <span className="block mt-2 font-light italic text-gray-400">
            <span className="text-white">
              {headlineText}
            </span>
            <span className="animate-pulse border-r-2 border-gray-400 ml-1 inline-block h-[40px] md:h-[50px] lg:h-[70px] align-middle -mt-2">&nbsp;</span>
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl leading-relaxed"
        >
          Explore alternate outcomes for money, career, health, education, and life decisions instantly. No signup required.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 1, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-6 items-center"
        >
          <Link href="#categories">
            <Button size="lg" className="w-full sm:w-auto !bg-[#050505] border border-white/20 !hover:bg-[#111111] shadow-[0_15px_30px_rgba(255,255,255,0.05)] transition-all transform hover:-translate-y-1 !text-white px-8 py-6 text-lg rounded-xl flex items-center gap-2">
              Explore Simulators
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
            </Button>
          </Link>
          <Link href="/category/money">
            <Button variant="outline" size="lg" className="w-full sm:w-auto text-gray-400 hover:text-white border-gray-800 hover:border-gray-700 transition-all">
              Try Financial Scenarios
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
