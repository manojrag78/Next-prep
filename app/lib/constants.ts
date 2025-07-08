export const BRAND_CONFIG = {
  title: 'Personal Learning Hub',
  description: 'It\'s My Personal Learning Hub',
  icon: '/icon.png',
} as const;

export const FONT_CONFIG = {
  variable: '--font-geist-sans',
  subsets: ['latin'],
} as const;

export const LAYOUT_CLASSES = {
  html: { base: 'h-full' },
  body: {
    fullHeight: 'h-full',
    noOverflow: 'overflow-hidden',
    noMargin: 'm-0',
    relative: 'relative',
  },
} as const;
