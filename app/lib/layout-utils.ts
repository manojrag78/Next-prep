import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { BRAND_CONFIG, FONT_CONFIG } from './constants';

export const geistSans = Geist({
  variable: FONT_CONFIG.variable,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subsets: FONT_CONFIG.subsets as any,
});

export const createMetadata = (overrides: Partial<Metadata> = {}): Metadata => ({
  title: BRAND_CONFIG.title,
  description: BRAND_CONFIG.description,
  icons: { icon: BRAND_CONFIG.icon },
  ...overrides,
});

export const createBodyClassName = (...classes: string[]) =>
  `${geistSans.variable} antialiased ${classes.join(' ')}`;
