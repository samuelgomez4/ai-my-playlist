import { CustomImage } from '@/components/ui/CustomImage';
import Link from 'next/link';
import { LoginButton } from './components/LoginButton';

export const metadata = {
  title: 'AIMyPlaylist - Login',
  description: 'Sing in or sign up to AIMyPlaylist to start your personalized music journey',
};

export default function LoginPage() {
  return (
    <>
      <div className=" flex flex-col lg:flex-row gap-8 px-4 sm:px-8 items-center">
        <div className="flex flex-col gap-8 items-center">
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 animate-fade-in text-center text-balance md:text-wrap">
            <span className="text-white">Transform Your Music </span>Experience with AI
          </h1>
          <p className="text-lg md:text-xl text-gray-300 text-center text-pretty max-w-prose">
            Let AI curate the perfect soundtrack for any occasion. Sign in to start your
            personalized music journey.
          </p>
          <div className="flex flex-col gap-4 w-full max-w-md items-center">
            <LoginButton />
            <div className="mt-6 text-center">
              <p className="text-gray-400 mb-2">Not sure about signing up yet?</p>
              <p>
                <Link
                  href="/"
                  className="text-purple-400 hover:text-purple-300 font-semibold">
                  Try our demo
                </Link>
                <span className="text-white mx-4"> or </span>
                <Link
                  href="/about"
                  className="text-purple-400 hover:text-purple-300 font-semibold">
                  Learn more
                </Link>
              </p>
            </div>
            {/* END: Updated Code (Line 57) */}
          </div>
        </div>
        <div className="aspect-video rounded-xl overflow-hidden shadow-2xl max-w-md lg:max-w-lg">
          <CustomImage
            src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Music visualization"
          />
        </div>
      </div>
    </>
  );
}
