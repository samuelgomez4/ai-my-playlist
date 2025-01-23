import { SearchBar } from '@/components/ui/SearchBar';
import { playlists } from '@/types/playlist-info';
import { notFound } from 'next/navigation';
import { FaTimes } from 'react-icons/fa';

interface Props {
  params: {
    id: string;
  };
}

const getPlaylistInfo = async (id: string) => {
  try {
    const playlistInfo = playlists.find((playlist) => playlist.id === id);
    return playlistInfo;
  } catch {
    notFound();
  }
};

export default async function PlaylistPage({ params }: Props) {
  const { id } = params;
  const selectedPlaylistDetails = await getPlaylistInfo(id);
  return (
    <>
      <section className="p-6 max-w-5xl mx-auto">
        <header className="flex gap-6 mb-12">
          <img
            src={selectedPlaylistDetails?.image ?? ''}
            alt={selectedPlaylistDetails?.name ?? ''}
            className={`w-48 h-48 object-cover rounded-lg [view-transition-name:playlist-image-${id}]`}
          />
          <div className="grid grid-cols-[10fr,1fr] gap-6 flex-1">
            <div className="overflow-hidden self-center">
              <h2
                className={`text-4xl font-bold text-white pb-4 [view-transition-name:playlist-image-${id}] text-nowrap overflow-hidden text-ellipsis`}>
                {selectedPlaylistDetails?.name}
              </h2>
              <p className="text-gray-400">{selectedPlaylistDetails?.songCount ?? 0} songs</p>
            </div>
            <button className="text-gray-400 hover:text-white transition-colors justify-self-end self-start">
              <FaTimes className="text-xl" />
            </button>
            <SearchBar
              placeholder="Search in playlist..."
              className="col-start-1 col-end-3 self-center"
            />
          </div>
        </header>

        <div className="overflow-y-auto max-h-[50vh]">
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
              {selectedPlaylistDetails?.songs?.map((song, index) => (
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
                        <div className="text-gray-400 text-sm">{song.artist}</div>
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
        </div>
      </section>
    </>
  );
}
