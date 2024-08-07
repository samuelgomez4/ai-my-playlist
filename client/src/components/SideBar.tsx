import { KeyRound, LogOut } from 'lucide-react'
import { Button } from './ui/button'

export function SideBar() {
  return (
    <aside className="flex flex-col border-r bg-background py-8 px-2">
      <Button
        title="Remove Gemini API Key"
        variant="ghost"
        size="icon"
        className="rounded-full"
        onClick={() => {
          window.localStorage.removeItem('key')
          window.location.reload()
        }}>
        <KeyRound className="h-5 w-5" />
        <span className="sr-only">Remove Key</span>
      </Button>
      <Button
        title="Log Out"
        variant="ghost"
        size="icon"
        className="rounded-full mt-auto"
        onClick={() => {
          window.localStorage.removeItem('refreshToken')
          window.location.reload()
        }}>
        <LogOut className="h-5 w-5" />
        <span className="sr-only">Settings</span>
      </Button>
    </aside>
  )
}
