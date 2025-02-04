'use client';
import { DeleteButton } from '@/components/ui/delete-button/DeleteButton';
import { usePlaylists } from '@/hooks/usePlaylists';
import { usePlaylistsStore } from '@/store/playlists';
import type { Id } from '@/types/playlist';
import { IoTimeOutline } from 'react-icons/io5';

export function PlaylistTable({ id }: { id: Id }) {
  const { playlists } = usePlaylists();
  const currentPlaylistInfo = playlists[id];
  const deleteSongsFromPlaylist = usePlaylistsStore((state) => state.deleteSongsFromPlaylist);
  return (
    <div className="overflow-x-auto [transform:rotateX(180deg)]">
      <table className="w-full table-fixed min-w-[736px] [transform:rotateX(180deg)]">
        <thead className="text-gray-400 text-sm">
          <tr className="border-b border-gray-800">
            <th className="text-left py-3 w-1/4">TITLE</th>
            <th className="text-left py-3 w-1/5">ALBUM</th>
            <th className="text-center py-3 w-1/5">RELEASE DATE</th>
            <th className="text-center py-3 w-1/5">ADDED ON</th>
            <th className="py-3 text-xl flex justify-center">
              <IoTimeOutline />
            </th>
            <th className="text-center py-3" />
          </tr>
        </thead>
        <tbody>
          {currentPlaylistInfo?.songs?.map((song, index) => (
            <tr
              key={`${song.id}${index}`}
              className=" group hover:bg-gray-800/50 border-b border-gray-800/50">
              <td className="py-3 pr-4">
                <div className="flex items-center gap-3">
                  <img
                    src={song.image}
                    alt={song.title}
                    className="w-10 h-10 rounded object-cover"
                  />
                  <div className="overflow-hidden">
                    <div
                      title={song.title}
                      className="text-white font-medium text-nowrap overflow-hidden text-ellipsis">
                      {song.title}
                    </div>
                    <div
                      title={song.artists.join(', ')}
                      className="text-gray-400 text-sm text-nowrap overflow-hidden text-ellipsis">
                      {song.artists.join(', ')}
                    </div>
                  </div>
                </div>
              </td>
              <td
                title={song.album}
                className="py-3 pr-4 text-gray-400 text-nowrap overflow-hidden text-ellipsis">
                {song.album}
              </td>
              <td className="py-3 text-gray-400 text-center">{song.releaseDate}</td>
              <td className="py-3 text-gray-400 text-center">{song.addedOn}</td>
              <td className="py-3 text-gray-400 text-center">{song.duration}</td>
              <td className="py-3 text-gray-400 text-center ">
                <div className="hidden group-hover:block">
                  <DeleteButton
                    itemName={song.title}
                    deleteItem={() => deleteSongsFromPlaylist(id, [song.id])}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
