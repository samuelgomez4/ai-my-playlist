import { CancelButton } from '@/components/ui/CancelButton';
import { useSelectedPlaylist } from '@/hooks/useSelectedPlaylist';
import clsx from 'clsx';
import Link from 'next/link';
import { useEffect } from 'react';

interface Props {
  className?: string;
  disabled: boolean;
}

export function PlaylistSelector({ className, disabled }: Props) {
  const { selectedPlaylist, selectPlaylist } = useSelectedPlaylist();

  useEffect(() => {
    if (disabled) selectPlaylist(undefined);
  }, [disabled, selectPlaylist]);

  const handleUnSelectPlaylist = () => {
    selectPlaylist(undefined);
  };

  return (
    <div
      className={clsx(
        `flex items-center bg-gray-800  rounded-lg  px-3 transition-colors duration-300 overflow-hidden min-h-14 ${className}`,
        {
          ' hover:bg-gray-600': !selectedPlaylist,
          'opacity-50 pointer-events-none': disabled,
        }
      )}>
      <Link
        href="./playlists"
        className="flex-1 text-white overflow-hidden py-3">
        {selectedPlaylist ? (
          <div className="flex gap-3 items-center">
            <img
              src={selectedPlaylist.image}
              alt={selectedPlaylist.name}
              className="w-8 h-8 rounded object-cover"
            />
            <span className="overflow-hidden text-nowrap text-ellipsis">
              {selectedPlaylist.name}
            </span>
          </div>
        ) : (
          <span>Select a playlist</span>
        )}
      </Link>
      {selectedPlaylist && <CancelButton onClick={() => handleUnSelectPlaylist()} />}
    </div>
  );
}
