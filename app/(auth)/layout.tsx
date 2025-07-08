import AuthLayoutDesign from "./_components/AuthLayoutDesign";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative h-full w-full">
      <AuthLayoutDesign />
      <main className="absolute inset-0 z-10 flex items-center justify-center overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
