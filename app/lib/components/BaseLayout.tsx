"use client";
import React from 'react';
import { createBodyClassName } from '../layout-utils';

interface BaseLayoutProps {
  children: React.ReactNode;
  htmlClassName?: string;
  additionalBodyClasses?: string[];
}

export default function BaseLayout({
  children,
  htmlClassName = 'h-full',
  additionalBodyClasses = [],
}: BaseLayoutProps) {
  const finalBodyClassName = createBodyClassName(...additionalBodyClasses);

  return (
    <html lang="en" className={htmlClassName}>
      <body className={finalBodyClassName}>{children}</body>
    </html>
  );
}