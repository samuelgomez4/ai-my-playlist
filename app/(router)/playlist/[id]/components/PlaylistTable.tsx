'use client';
import { DeleteButton } from '@/components/ui/delete-button/DeleteButton';
import { usePlaylistsStore } from '@/store/playlists-store';
import type { Id } from '@/types/playlist';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { IoTimeOutline } from 'react-icons/io5';
import { useFilteredSongs } from '../hooks/useFilteredSongs';
import { notFound } from 'next/navigation';

interface Props {
  id: Id;
}

export function PlaylistTable({ id }: Props) {
  const deleteSongsFromPlaylist = usePlaylistsStore((state) => state.deleteSongsFromPlaylist);
  const [parent] = useAutoAnimate({ duration: 200, easing: 'ease-in' });
  const { filteredSongs, isLoading } = useFilteredSongs(id);
  if (!filteredSongs && !isLoading) notFound();
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
        <tbody ref={parent}>
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <tr key={index}>
                  <td
                    className="py-3 "
                    colSpan={6}>
                    <div className="flex gap-2">
                      <div className="w-10 h-10 bg-gray-300 animate-pulse rounded" />
                      <div className="h-10 bg-gray-300 animate-pulse rounded flex-1" />
                    </div>
                  </td>
                </tr>
              ))
            : filteredSongs().map((song, index) => (
                <tr
                  key={`${song.id}${index}`}
                  className=" group hover:bg-gray-800/50 border-b border-gray-800/50">
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-3">
                      <img
                        loading="lazy"
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
