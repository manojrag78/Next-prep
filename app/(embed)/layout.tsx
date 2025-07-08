import Link from "next/link";

export default function EmbedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full w-full flex flex-col">
      <div className="p-2 bg-white shadow-sm z-10">
        <Link
          href="/"
          className="text-indigo-600 hover:text-indigo-800 font-small underline"
        >
          ← Back to Dashboard
        </Link>
      </div>

      <div className="flex-1 overflow-hidden">
        <main className="w-full h-full overflow-hidden">{children}</main>
      </div>
    </div>
  );
}
