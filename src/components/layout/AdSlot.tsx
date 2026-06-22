'use client';

import React, { useEffect, useRef } from 'react';
import { siteConfig } from '@/config/site';

interface AdSlotProps {
  position: 'hero' | 'mid' | 'bottom';
  className?: string;
}

export function AdSlot({ position, className = '' }: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null);
  const clientId = siteConfig.adsenseClient;
  
  let slotId = '';
  switch (position) {
    case 'hero':
      slotId = siteConfig.adsenseSlots.hero;
      break;
    case 'mid':
      slotId = siteConfig.adsenseSlots.mid;
      break;
    case 'bottom':
      slotId = siteConfig.adsenseSlots.bottom;
      break;
  }

  useEffect(() => {
    // Only attempt to load if we have client and slot IDs
    if (!clientId || !slotId) return;

    try {
      // @ts-expect-error - Google AdSense window variable
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, [clientId, slotId]);

  if (!clientId || !slotId) {
    // Development fallback or placeholder when no IDs are configured
    if (process.env.NODE_ENV === 'development') {
      return (
        <div className={`w-full bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-sm py-8 ${className}`}>
          Ad Placeholder ({position})
        </div>
      );
    }
    return null;
  }

  return (
    <div className={`w-full overflow-hidden flex justify-center my-8 ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', minWidth: '300px', minHeight: '100px' }}
        data-ad-client={clientId}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
