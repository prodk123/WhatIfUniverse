'use client';

import Link from 'next/link';
import React from 'react';
import { categories } from '@/config/categories';
import { Icons } from '@/components/ui/Icons';
import { Card } from '@/components/ui/Card';
import { motion, Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 1, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
};

export function CategoryGrid() {
  return (
    <section id="categories" className="py-20 bg-gray-50 dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 relative overflow-hidden transition-colors duration-300">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent opacity-5 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary opacity-5 blur-[120px] rounded-full"></div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Explore by Category</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
            Choose an area of your life to start simulating alternate futures.
          </p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categories.map((category) => {
            const Icon = Icons[category.icon as keyof typeof Icons];
            
            return (
              <motion.div key={category.slug} variants={itemVariants}>
                <Link href={`/category/${category.slug}`}>
                  <Card className="h-full p-8 flex flex-col items-start transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] border border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800 group overflow-hidden relative" style={{ minHeight: '220px', maxHeight: '400px', position: 'relative', overflow: 'hidden' }}>
                    {/* Hover gradient effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300" style={{ backgroundImage: `linear-gradient(135deg, ${category.color}, transparent)` }}></div>
                    
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm transform group-hover:scale-110 transition-transform duration-300 z-10 relative"
                      style={{ backgroundColor: category.color, color: 'white', boxShadow: `0 4px 20px ${category.color}40` }}
                    >
                      {Icon && <Icon className="w-7 h-7" style={{ width: '28px', height: '28px', flexShrink: 0 }} />}
                    </div>
                    <div className="w-[70%] flex flex-col flex-grow z-10 relative">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{category.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-base flex-grow leading-relaxed">{category.description}</p>
                      <div 
                        className="mt-8 font-semibold text-sm flex items-center group-hover:opacity-80 transition-opacity"
                        style={{ color: category.color }}
                      >
                        Explore Simulators
                        <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Caricature Image */}
                    <div style={{ position: 'absolute', right: 0, bottom: 0, width: '160px', height: '160px', overflow: 'hidden', opacity: 0.5, pointerEvents: 'none', zIndex: 0 }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`/images/${category.slug}.png`} alt={category.name} style={{ width: '160px', height: '160px', objectFit: 'contain', display: 'block' }} />
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
