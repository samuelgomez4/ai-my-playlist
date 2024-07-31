import { useToken } from '../hooks/useToken'
import type { TokenReqBody } from '../types'
import { PlaylistContent } from './PlaylistContent'
import { PlaylistsSection } from './PlaylistsSection'
import { PromptForm } from './PromptForm'
import { SideBar } from './SideBar'
import { useCurrentPlaylist } from '@/hooks/useCurrentPlaylist'

interface Props {
  tokenReqBody: TokenReqBody
}
export function Dashboard({ tokenReqBody }: Props) {
  const token = useToken(tokenReqBody)
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
            <PromptForm
              token={token}
              currentPlaylistId={currentPlaylistDetails?.id}
            />
          </section>
          <section className="flex-1 rounded-lg border border-input bg-background p-4 overflow-auto">
            <PlaylistsSection
              token={token}
              currentPlaylistDetails={currentPlaylistDetails}
              updateCurrentPlaylistDetails={updateCurrentPlaylistDetails}
            />
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
