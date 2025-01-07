import { Footer } from './components/Footer';
import { NavBar } from './components/NavBar';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <main className="max-w-4xl mx-auto p-6">{children}</main>
      <Footer />
    </>
  );
}
