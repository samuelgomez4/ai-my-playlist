'use client';
import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { type Blendy, createBlendy } from 'blendy';
import { FeatureModal } from './FeatureModal';
import clsx from 'clsx';

interface Props {
  feature: {
    Icon: ReactNode;
    title: string;
    description: string;
    videoUrl: string;
  };
}
export function FeatureCard({ feature }: Props) {
  const { Icon, title } = feature;
  const blendySelector = title.replaceAll(' ', '-').toLowerCase();

  const blendy = useRef<Blendy | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  const onOpenModal = () => {
    setShowBackground(true);
    setShowModal(true);
    blendy.current?.toggle(blendySelector);
  };

  const onCloseModal = () => {
    setShowBackground(false);
    blendy.current?.untoggle(blendySelector, () => {
      setShowModal(false);
    });
  };

  useEffect(() => {
    blendy.current = createBlendy({ animation: 'dynamic' });
  }, []);
  return (
    <>
      <div
        className={clsx(
          'w-full h-full fixed inset-0 flex items-center justify-center  bg-black duration-500 transition-opacity',
          {
            'z-50 opacity-100  bg-opacity-75 backdrop-blur-sm': showBackground,
            '-z-10 opacity-0 backdrop-blur-0': !showBackground,
          }
        )}>
        {showModal && (
          <FeatureModal
            blendySelector={blendySelector}
            onCloseModal={onCloseModal}
          />
        )}
      </div>
      <button
        data-blendy-from={blendySelector}
        onClick={onOpenModal}
        className="bg-gray-700 rounded-xl py-5 px-9 shadow-xl border border-gray-700 max-w-80 min-h-40 w-full cursor-pointer">
        <div className="flex flex-col items-center">
          {Icon}
          <h3 className="text-xl font-semibold text-white mt-4 text-balance text-center">
            {title}
          </h3>
        </div>
      </button>
    </>
  );
}
