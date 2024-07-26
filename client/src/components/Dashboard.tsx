import { usePlaylists } from '../hooks/usePlaylists'
import { useToken } from '../hooks/useToken'
import type { TokenReqBody } from '../types'
import { PlaylistContent } from './PlaylistContent'
import { PlaylistsSection } from './PlaylistsSection'
import { PromptForm } from './PromptForm'
import { SideBar } from './SideBar'

interface Props {
  tokenReqBody: TokenReqBody
}
export function Dashboard({ tokenReqBody }: Props) {
  const token = useToken(tokenReqBody)
  return (
    <div className="flex min-h-screen w-full">
      <SideBar />
      <main className="flex-1 grid grid-cols-[1fr_2fr] gap-6 p-6">
        <div className="flex flex-col gap-6">
          <section>
            <PromptForm />
          </section>
          <section className="flex-1 overflow-auto rounded-lg border border-input bg-background p-4">
            <PlaylistsSection token={token} />
          </section>
        </div>
        <section>
          <PlaylistContent />
        </section>
      </main>
    </div>
  )
}
