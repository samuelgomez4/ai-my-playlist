import { ACTIONS, AI_ACTIONS } from '@/constants'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

interface Props {
  currentPlaylistId: string | undefined
  name: string
}
export function AIActionSelect({ currentPlaylistId, name }: Props) {
  return (
    <Select name={name}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="What do you want to do?" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(AI_ACTIONS).map(([action, description]) => {
          if (!currentPlaylistId && action !== ACTIONS.createFromScratch)
            return null
          return (
            <SelectItem
              key={action}
              value={action}>
              {description}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}
