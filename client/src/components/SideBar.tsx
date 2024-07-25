import { Music2Icon, SettingsIcon } from './icons/icons'
import { Button } from './ui/button'

export function SideBar() {
  return (
    <aside className="flex flex-col border-r bg-background py-4 px-2">
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full">
        <Music2Icon className="h-5 w-5" />
        <span className="sr-only">Playlists</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full mt-auto">
        <SettingsIcon className="h-5 w-5" />
        <span className="sr-only">Settings</span>
      </Button>
    </aside>
  )
}
