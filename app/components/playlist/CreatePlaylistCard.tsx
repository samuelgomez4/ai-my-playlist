'use client';
import { useRouter } from 'next/navigation';
import { FaPlusCircle } from 'react-icons/fa';

interface Props {
  className: string;
}

export function CreatePlaylistCard({ className }: Props) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.replace('/?create-from-scracth=true')}
      title="create playlist from scratch"
      className={`bg-gray-900 rounded-xl overflow-hidden flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-all duration-300 border-2 border-dashed border-gray-700 hover:border-purple-500 h-full ${className}`}>
      <FaPlusCircle className="text-4xl text-purple-500 hover:text-purple-400 transition-colors duration-300" />
    </div>
  );
}
