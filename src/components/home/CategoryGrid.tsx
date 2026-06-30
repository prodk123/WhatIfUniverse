'use client';

import Link from 'next/link';
import React from 'react';
import { categories } from '@/config/categories';
import { Icons } from '@/components/ui/Icons';
import { motion, Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function CategoryGrid() {
  return (
    <section
      id="categories"
      style={{
        padding: '80px 0',
        backgroundColor: '#f9fafb',
        borderTop: '1px solid #f3f4f6',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#111827', marginBottom: '16px' }}>
            Explore by Category
          </h2>
          <p style={{ fontSize: '1.125rem', color: '#6b7280', maxWidth: '42rem', margin: '0 auto' }}>
            Choose an area of your life to start simulating alternate futures.
          </p>
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}
        >
          {categories.map((category) => {
            const Icon = Icons[category.icon as keyof typeof Icons];

            return (
              <motion.div key={category.slug} variants={itemVariants}>
                <Link href={`/category/${category.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                  <div
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '12px',
                      border: '1px solid #e5e7eb',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                      padding: '32px',
                      position: 'relative',
                      overflow: 'hidden',
                      minHeight: '200px',
                      display: 'flex',
                      flexDirection: 'column',
                      cursor: 'pointer',
                    }}
                  >
                    {/* Colored icon circle */}
                    <div
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '16px',
                        backgroundColor: category.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '24px',
                        boxShadow: `0 4px 20px ${category.color}40`,
                        flexShrink: 0,
                      }}
                    >
                      {Icon && <Icon style={{ width: '28px', height: '28px', color: 'white' }} />}
                    </div>

                    {/* Text content */}
                    <div style={{ flex: 1, zIndex: 1, position: 'relative' }}>
                      <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', marginBottom: '12px' }}>
                        {category.name}
                      </h3>
                      <p style={{ color: '#6b7280', fontSize: '1rem', lineHeight: 1.6, marginBottom: '24px' }}>
                        {category.description}
                      </p>
                      <div style={{ color: category.color, fontWeight: 600, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        Explore Simulators
                        <svg style={{ width: '20px', height: '20px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>

                    {/* Caricature image - constrained absolutely */}
                    <div
                      style={{
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        width: '130px',
                        height: '130px',
                        overflow: 'hidden',
                        opacity: 0.4,
                        pointerEvents: 'none',
                        zIndex: 0,
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/images/${category.slug}.png`}
                        alt=""
                        style={{ width: '130px', height: '130px', objectFit: 'contain', display: 'block' }}
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
