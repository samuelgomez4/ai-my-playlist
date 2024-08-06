import type { Song } from '@/types'
import { TableRow, TableCell } from './ui/table'
import { Music2Icon } from './icons/icons'

interface Props {
  song: Song
}
export function SongRow({ song }: Props) {
  const artists = song.artists.map((artist) => artist.name).join(', ')
  return (
    <TableRow>
      <TableCell className="flex gap-4">
        {song.album.imageUrl ? (
          <img
            src={song.album.imageUrl}
            alt="Song Album Thumbnail"
            width={48}
            height={48}
          />
        ) : (
          <div className="w-12 h-12 bg-zinc-900 flex justify-center items-center">
            <Music2Icon className="w-6 h-6" />
          </div>
        )}
        <div className="overflow-hidden flex flex-col justify-center">
          <p
            title={song.name}
            className="font-medium overflow-hidden text-ellipsis">
            {song.name}
          </p>
          <p
            title={artists}
            className="text-xs text-muted-foreground overflow-hidden text-ellipsis">
            {artists}
          </p>
        </div>
      </TableCell>
      <TableCell title={song.album.name}>{song.album.name}</TableCell>
      <TableCell>{song.releaseDate}</TableCell>
      <TableCell>{song.addedByUserAt}</TableCell>
      <TableCell>{song.duration}</TableCell>
    </TableRow>
  )
}
