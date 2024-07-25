import { SongRow } from './SongRow'
import { Table, TableHeader, TableRow, TableHead, TableBody } from './ui/table'

export function Songs() {
  return (
    <div className="flex-1 overflow-auto rounded-lg border border-input bg-background p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Album</TableHead>
            <TableHead>Release Date</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Added At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <SongRow />
          <SongRow />
          <SongRow />
        </TableBody>
      </Table>
    </div>
  )
}
