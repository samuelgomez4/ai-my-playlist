import type { Song } from '@/types'
import { TableRow, TableCell } from './ui/table'

interface Props {
  song: Song
}
export function SongRow({ song }: Props) {
  const artists = song.artists.map((artist) => artist.name).join(', ')
  return (
    <TableRow>
      <TableCell className="flex gap-4">
        <img
          src={song.album.imageUrl}
          alt="Song Album Thumbnail"
          width={48}
          height={48}
        />
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
