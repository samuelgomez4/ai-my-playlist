import type { PlaylistItems } from '@/types'
import { SongRow } from './SongRow'
import { Table, TableHeader, TableRow, TableHead, TableBody } from './ui/table'
import { ScrollArea } from './ui/scroll-area'

interface Props {
  currentPlaylistSongs: PlaylistItems | null
}
export function Songs({ currentPlaylistSongs }: Props) {
  // TODO: render something when user has no playlists
  return (
    <div className="flex-1 rounded-lg border border-input bg-background">
      <ScrollArea className="h-96">
        <Table className="table-fixed">
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/3">Title</TableHead>
              <TableHead className="w-1/">Album</TableHead>
              <TableHead>Release Date</TableHead>
              <TableHead className="w-1/6">Added On</TableHead>
              <TableHead className="w-24">Duration</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentPlaylistSongs &&
              currentPlaylistSongs.map((song, index) => {
                return (
                  <SongRow
                    // eslint-disable-next-line react/no-array-index-key
                    key={`${song.id}-${index}`}
                    song={song}
                  />
                )
              })}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  )
}
