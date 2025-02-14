import Link from 'next/link';
import { LoginButton } from './components/LoginButton';
import { features } from '@/utils/constants/features';
import { FeatureVideo } from '@/components/ui/video/FeatureVideo';
import { Suspense } from 'react';
import { connection } from 'next/server';

export const metadata = {
  title: 'AIMyPlaylist - Login',
  description: 'Sing in or sign up to AIMyPlaylist to start your personalized music journey',
};

export default async function LoginPage() {
  // force dynamic page
  await connection();
  const randomFeature = features[Math.floor(Math.random() * features.length)];
  return (
    <>
      <div className=" flex flex-col lg:flex-row gap-8 px-4 sm:px-8 items-center">
        <div className="flex flex-col gap-8 items-center">
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 animate-fade-in text-center sm:text-balance md:text-wrap">
            <span className="text-white">Transform Your Music </span>Experience with AI
          </h1>
          <p className="text-lg md:text-xl text-gray-300 text-center text-pretty max-w-prose">
            A smart music management tool to customize your playlists in seconds with a single
            prompt. Sign in to start your personalized music journey.
          </p>
          <div className="flex flex-col gap-4 w-full max-w-md items-center">
            <LoginButton />
            <div className="mt-6 text-center">
              <p className="text-gray-400 mb-2">Not sure about signing up yet?</p>
              <p>
                <Link
                  href="/demo"
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
          </div>
        </div>
        <div className="rounded-xl overflow-hidden shadow-2xl w-full max-w-md sm:max-w-xl lg:max-w-lg">
          <Suspense fallback={<div className="animate-pulse w-full h-full bg-slate-200" />}>
            <FeatureVideo
              videoFileName={randomFeature.videoFileName}
              title={randomFeature.title}
            />
          </Suspense>
        </div>
      </div>
    </>
  );
}
