import Link from 'next/link';
import { ActionCard } from './components/ActionCard';
import { ACTIONS_CARDS } from './utils/constants';

export const metadata = {
  title: 'Home Page',
  description: 'This is the Home page',
};

export default function HomePage() {
  return (
    <>
      <section className="grid mb-10 [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))] justify-items-center items-center gap-4">
        <h1 className="text-5xl mb-10 text-balance">Create a playlist for every moment</h1>
        <video
          src="istockphoto-2106242658-640_adpp_is.mp4"
          muted
          loop
          autoPlay
        />
      </section>
      <div className="flex justify-center gap-10 mb-10">
        <Link
          className="text-xl rounded-3xl border bg-white bg-opacity-25 p-2"
          href={'/demo'}>
          Try Demo
        </Link>
        <Link
          className="text-xl rounded-3xl border bg-white bg-opacity-25 p-2"
          href={'/login'}>
          Get Started
        </Link>
      </div>
      <section className="flex flex-col gap-6">
        {ACTIONS_CARDS.map(({ action, description, videoSrc }) => {
          return (
            <ActionCard
              key={action}
              action={action}
              description={description}
              videoSrc={videoSrc}
            />
          );
        })}
      </section>
    </>
  );
}
