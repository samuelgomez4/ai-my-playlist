import type { TokenReqBody } from '../types'
import { PlaylistContent } from './PlaylistContent'
import { PlaylistsSection } from './PlaylistsSection'
import { AISection } from './AISection'
import { SideBar } from './SideBar'
import { useCurrentPlaylist } from '@/hooks/useCurrentPlaylist'
import { useToken } from '@/hooks/useToken'
import { usePlaylists } from '@/hooks/usePlaylists'
import { ScrollArea } from './ui/scroll-area'
import { Button } from './ui/button'

export function Dashboard({ authCode, authState, refreshToken }: TokenReqBody) {
  const token = useToken({ authCode, authState, refreshToken })
  const {
    playlists,
    nextEndpoint: nextEndpointPlaylist,
    updatePlaylists,
    fetchPlaylistsForUser,
  } = usePlaylists(token)
  const {
    currentPlaylistDetails,
    currentPlaylistSongs,
    updateCurrentPlaylistDetails,
    nextEndpoint,
    fetchSongsForCurrentPlaylist,
  } = useCurrentPlaylist(token)
  return (
    <div className="flex w-full h-dvh">
      <SideBar />
      <main className="flex-1 grid grid-cols-[1fr_2fr] gap-6 px-6">
        <div className="flex flex-col gap-6 h-dvh  py-6">
          <section className=" flex items-center justify-center">
            <AISection
              token={token}
              currentPlaylistDetails={currentPlaylistDetails}
              updatePlaylists={updatePlaylists}
            />
          </section>
          <section className="flex flex-col  gap-4 rounded-lg h-full border border-input bg-background overflow-auto py-4">
            <h2 className="text-2xl pl-4">Your Playlists</h2>
            <ScrollArea className="h-full px-4">
              <PlaylistsSection
                playlists={playlists}
                currentPlaylistDetails={currentPlaylistDetails}
                updateCurrentPlaylistDetails={updateCurrentPlaylistDetails}
              />
              {nextEndpointPlaylist && (
                <div className="flex justify-center mt-4 mb-4">
                  <Button onClick={() => fetchPlaylistsForUser()}>
                    Load More Playlists
                  </Button>
                </div>
              )}
            </ScrollArea>
          </section>
        </div>
        <PlaylistContent
          currentPlaylistDetails={currentPlaylistDetails}
          currentPlaylistSongs={currentPlaylistSongs}
          nextEndpoint={nextEndpoint}
          fetchSongsForCurrentPlaylist={fetchSongsForCurrentPlaylist}
        />
      </main>
    </div>
  )
}
