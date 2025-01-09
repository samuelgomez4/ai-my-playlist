import { Footer } from './components/Footer';
import { NavBar } from './components/NavBar';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <main className="bg-gradient-to-b from-gray-900 to-gray-800 pt-10 px-4 pb-6">{children}</main>
      <Footer />
    </>
  );
}
