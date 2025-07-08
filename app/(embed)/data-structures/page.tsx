'use client';

export default function EmbedPage() {
  return (
    <div className="h-screen w-full">
      <iframe
        src="https://angular-dsa.vercel.app/"
        className="w-full h-full border-none"
        allowFullScreen
      />
    </div>
  );
}
