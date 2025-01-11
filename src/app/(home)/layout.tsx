import { AboutSection } from './components/about-section/AboutSection';
import { Footer } from './components/Footer';
import { NavBar } from './components/NavBar';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <main className="bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {children}
          <section
            className="pt-20"
            id="info">
            <AboutSection />
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
