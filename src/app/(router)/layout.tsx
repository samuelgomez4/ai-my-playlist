import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { AboutSection } from '@/components/about-section/AboutSection';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <main className="bg-gradient-to-b from-gray-900 to-gray-800 pt-12 pb-12 border-b border-gray-700/25 shadow-lg mb-4">
        <div className="max-w-6xl mx-auto">
          {children}
          <section className="pt-20">
            <AboutSection />
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
