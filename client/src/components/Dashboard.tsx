import type { TokenReqBody } from '../types'
import { PlaylistContent } from './PlaylistContent'
import { PlaylistsSection } from './PlaylistsSection'
import { AISection } from './AISection'
import { SideBar } from './SideBar'
import { useCurrentPlaylist } from '@/hooks/useCurrentPlaylist'
import { useToken } from '@/hooks/useToken'
import { usePlaylists } from '@/hooks/usePlaylists'
import { ScrollArea } from './ui/scroll-area'

export function Dashboard({ authCode, authState, refreshToken }: TokenReqBody) {
  const token = useToken({ authCode, authState, refreshToken })
  const { playlists, updatePlaylists } = usePlaylists(token)
  const {
    currentPlaylistDetails,
    currentPlaylistSongs,
    updateCurrentPlaylistDetails,
  } = useCurrentPlaylist(token)
  // TODO fix scrolls
  return (
    <div className="flex w-full">
      <SideBar />
      <main className="flex-1 grid grid-cols-[1fr_2fr] gap-6 p-6 max-h-dvh">
        <div className="flex flex-col gap-6 pb-4">
          <section>
            <AISection
              token={token}
              currentPlaylistId={currentPlaylistDetails?.id}
              updatePlaylists={updatePlaylists}
            />
          </section>
          <section className="flex-1 rounded-lg border border-input bg-background p-4 overflow-auto">
            <ScrollArea className="h-80">
              <PlaylistsSection
                playlists={playlists}
                currentPlaylistDetails={currentPlaylistDetails}
                updateCurrentPlaylistDetails={updateCurrentPlaylistDetails}
              />
            </ScrollArea>
          </section>
        </div>
        <section className="pb-4">
          <PlaylistContent
            currentPlaylistDetails={currentPlaylistDetails}
            currentPlaylistSongs={currentPlaylistSongs}
          />
        </section>
      </main>
    </div>
  )
}
