import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import ReduxProvider from "./store/ReduxProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Personal Learning Hub",
  description: "It's My Personal Learning Hub",
  icons: {
    icon: "/manoj_myself.jpeg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} antialiased h-full overflow-hidden`}
      >
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
