import Sidebar from "../components/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full">
      <Sidebar />
      <main className="flex-1 ml-0 bg-gray-50 h-screen overflow-y-auto pt-8 md:pt-0">
        {children}
      </main>
    </div>
  );
}
