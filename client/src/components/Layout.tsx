import { SideBar } from './SideBar'
import { PromptForm } from './PromptForm'
import { PlaylistsSection } from './PlaylistsSection'
import { PlaylistContent } from './PlaylistContent'

export function Layout() {
  return (
    <div className="flex min-h-screen w-full">
      <SideBar />
      <main className="flex-1 grid grid-cols-[1fr_2fr] gap-6 p-6">
        <div className="flex flex-col gap-6">
          <section>
            <PromptForm />
          </section>
          <section className="flex-1 overflow-auto rounded-lg border border-input bg-background p-4">
            <PlaylistsSection />
          </section>
        </div>
        <section>
          <PlaylistContent />
        </section>
      </main>
    </div>
  )
}
