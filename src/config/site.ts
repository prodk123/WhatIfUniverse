// Site-wide configuration

export const siteConfig = {
  name: 'What If Universe',
  tagline: 'Explore Alternate Futures Before Making Decisions',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://what-if-universe.com',
  description:
    'Explore alternate outcomes for money, career, health, education, and life decisions with free interactive simulators. No signup required.',
  adsenseClient: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || 'ca-pub-3493391110338853',
  adsenseSlots: {
    hero: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HERO || '',
    mid: process.env.NEXT_PUBLIC_ADSENSE_SLOT_MID || '',
    bottom: process.env.NEXT_PUBLIC_ADSENSE_SLOT_BOTTOM || '',
  },
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '',
  social: {
    twitter: '@whatifuniverse',
  },
} as const;
