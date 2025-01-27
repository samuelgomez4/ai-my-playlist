import { Link } from 'next-view-transitions';

interface Props {
  children: React.ReactNode;
  className?: string;
  playlistId: string;
}

export function ViewSongsButton({ children, className, playlistId }: Props) {
  return (
    <Link
      href={`/playlist/${playlistId}`}
      className={`px-3 py-2 bg-gray-700/80 text-white rounded-lg hover:bg-gray-600 transition-all duration-300 shadow-lg ${className}`}>
      {children}
    </Link>
  );
}
