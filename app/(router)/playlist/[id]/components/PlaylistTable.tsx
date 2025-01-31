'use client';
import { usePlaylists } from '@/hooks/usePlaylists';
import type { Id } from '@/types/playlist';

export function PlaylistTable({ id }: { id: Id }) {
  const playlists = usePlaylists();
  const currentPlaylistInfo = playlists[id];
  return (
    <table className="w-full">
      <thead className="text-gray-400 text-sm">
        <tr className="border-b border-gray-800">
          <th className="text-left py-3 pl-4">#</th>
          <th className="text-left py-3">TITLE</th>
          <th className="text-left py-3">ALBUM</th>
          <th className="text-left py-3">RELEASE DATE</th>
          <th className="text-left py-3">ADDED ON</th>
          <th className="text-left py-3 pr-4">DURATION</th>
        </tr>
      </thead>
      <tbody>
        {currentPlaylistInfo?.songs?.map((song, index) => (
          <tr
            key={song.id}
            className="group hover:bg-gray-800/50 border-b border-gray-800/50">
            <td className="py-3 pl-4 text-gray-400">{index + 1}</td>
            <td className="py-3">
              <div className="flex items-center gap-3">
                <img
                  src={song.image}
                  alt={song.title}
                  className="w-10 h-10 rounded object-cover"
                />
                <div>
                  <div className="text-white font-medium">{song.title}</div>
                  <div className="text-gray-400 text-sm">{song.artists.join(', ')}</div>
                </div>
              </div>
            </td>
            <td className="py-3 text-gray-400">{song.album}</td>
            <td className="py-3 text-gray-400">{song.releaseDate}</td>
            <td className="py-3 text-gray-400">{song.addedOn}</td>
            <td className="py-3 pr-4 text-gray-400">{song.duration}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
