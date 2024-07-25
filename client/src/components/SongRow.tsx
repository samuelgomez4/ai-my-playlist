import { TableRow, TableCell } from './ui/table'

export function SongRow() {
  return (
    <TableRow>
      <TableCell>
        <div className="font-medium">Quemando calorias</div>
        <div className="text-xs text-muted-foreground">Feid</div>
      </TableCell>
      <TableCell>Chill Beats Vol. 1</TableCell>
      <TableCell>2022-06-15</TableCell>
      <TableCell>3:45</TableCell>
      <TableCell>2023-04-01</TableCell>
    </TableRow>
  )
}
