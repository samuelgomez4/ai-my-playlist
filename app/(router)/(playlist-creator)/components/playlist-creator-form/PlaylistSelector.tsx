import { CancelButton } from '@/components/ui/CancelButton';
import { useSelectedPlaylist } from '@/hooks/useSelectedPlaylist';
import clsx from 'clsx';
import { Link } from 'next-view-transitions';

export function PlaylistSelector({}) {
  const { selectedPlaylist, selectPlaylist } = useSelectedPlaylist();
  const handleUnSelectPlaylist = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    selectPlaylist(undefined);
  };
  return (
    <Link
      {...register(
        'playlist' /* , {
            required: true,
            validate: {
              isPlaylistSelected: () =>
                Boolean(getValues('playlist')) || 'You must select a playlist',
            },
          } */
      )}
      href="./playlists"
      className={clsx(
        'flex-1 bg-gray-800 text-white rounded-lg p-3 transition-colors duration-300 overflow-hidden',
        {
          'hover:bg-gray-600': !selectedPlaylist,
        }
      )}>
      {selectedPlaylist ? (
        <div className="flex  justify-between">
          <div className="flex gap-2 items-center overflow-hidden">
            <img
              src={selectedPlaylist.image}
              alt={selectedPlaylist.name}
              className="w-8 h-8 rounded object-cover"
            />
            <span className="overflow-hidden text-nowrap text-ellipsis">
              {selectedPlaylist.name}
            </span>
          </div>
          <CancelButton onClick={(e) => handleUnSelectPlaylist(e)} />
        </div>
      ) : (
        <span>Select a playlist</span>
      )}
    </Link>
  );
}
