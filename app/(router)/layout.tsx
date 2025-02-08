import { NavBar } from '@/components/layout/NavBar';
import { Footer } from '@/components/layout/Footer';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <main className="bg-gradient-to-b from-gray-900 to-gray-800 pt-12 pb-12 border-b border-gray-700/25 shadow-lg mb-4  min-h-dvh">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
      <Footer />
    </>
  );
}
