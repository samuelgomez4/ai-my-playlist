import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function KeyInput({ updateKey }: { updateKey: (key: string) => void }) {
  const keyInput = useRef<HTMLInputElement>(null)
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const key = keyInput.current?.value
    if (!key) return
    updateKey(key)
  }
  return (
    <form
      className="flex w-full max-w-md items-center space-x-2"
      onSubmit={onSubmit}>
      <Input
        className="w-full"
        ref={keyInput}
        type="text"
        placeholder="Your Google API Key"
      />
      <Button type="submit">Save</Button>
    </form>
  )
}
