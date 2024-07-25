import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'

export default function Component() {
  return (
    <div className="flex min-h-screen w-full">
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
      <div className="flex-1 grid grid-cols-[1fr_2fr] gap-6 p-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <Textarea
              placeholder="Enter a prompt to generate a playlist..."
              className="resize-none rounded-lg border border-input bg-background p-4 text-sm"
              rows={3}
            />
            <Button>Generate Playlist</Button>
          </div>
          <div className="flex-1 overflow-auto rounded-lg border border-input bg-background p-4">
            <div className="grid gap-4">
            <div className="flex items-center gap-4 rounded-lg bg-muted/50 p-4 transition-colors hover:bg-muted">
                <img
                  src="/placeholder.svg"
                  alt="Playlist Thumbnail"
                  width={64}
                  height={64}
                  className="rounded-lg"
                />
                <div className="flex-1">
                  <div className="font-medium">Workout Playlist</div>
                  <div className="text-xs text-muted-foreground">30 songs</div>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-lg bg-muted/50 p-4 transition-colors hover:bg-muted">
                <img
                  src="/placeholder.svg"
                  alt="Playlist Thumbnail"
                  width={64}
                  height={64}
                  className="rounded-lg"
                />
                <div className="flex-1">
                  <div className="font-medium">Workout Playlist</div>
                  <div className="text-xs text-muted-foreground">30 songs</div>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-lg bg-muted/50 p-4 transition-colors hover:bg-muted">
                <img
                  src="/placeholder.svg"
                  alt="Playlist Thumbnail"
                  width={64}
                  height={64}
                  className="rounded-lg"
                />
                <div className="flex-1">
                  <div className="font-medium">Workout Playlist</div>
                  <div className="text-xs text-muted-foreground">30 songs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex items-start gap-4 rounded-lg border border-input bg-background p-4">
            <img
              src="/placeholder.svg"
              alt="Playlist Thumbnail"
              width={120}
              height={120}
              className="rounded-lg"
            />
            <div className="flex-1">
              <div className="font-medium">Chill Beats</div>
              <div className="text-xs text-muted-foreground">20 songs</div>
              <div className="mt-4 flex gap-2">
                <Button
                  variant="outline"
                  size="sm">
                  Play
                </Button>
                <Button
                  variant="outline"
                  size="sm">
                  Add to Library
                </Button>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-auto rounded-lg border border-input bg-background p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Artist</TableHead>
                  <TableHead>Album</TableHead>
                  <TableHead>Release Date</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Added At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Chill Beats</div>
                    <div className="text-xs text-muted-foreground">
                      Lofi Hip Hop
                    </div>
                  </TableCell>
                  <TableCell>Chillhop Music</TableCell>
                  <TableCell>Chill Beats Vol. 1</TableCell>
                  <TableCell>2022-06-15</TableCell>
                  <TableCell>3:45</TableCell>
                  <TableCell>2023-04-01</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Peaceful Piano</div>
                    <div className="text-xs text-muted-foreground">
                      Relaxing Piano
                    </div>
                  </TableCell>
                  <TableCell>Peaceful Piano</TableCell>
                  <TableCell>Soothing Melodies</TableCell>
                  <TableCell>2021-09-20</TableCell>
                  <TableCell>4:12</TableCell>
                  <TableCell>2023-05-12</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Rainy Day</div>
                    <div className="text-xs text-muted-foreground">
                      Ambient Sounds
                    </div>
                  </TableCell>
                  <TableCell>Ambient Sounds</TableCell>
                  <TableCell>Nature Sounds</TableCell>
                  <TableCell>2020-11-01</TableCell>
                  <TableCell>5:30</TableCell>
                  <TableCell>2023-06-30</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Acoustic Melodies</div>
                    <div className="text-xs text-muted-foreground">
                      Acoustic Guitar
                    </div>
                  </TableCell>
                  <TableCell>Acoustic Guitar</TableCell>
                  <TableCell>Acoustic Sessions</TableCell>
                  <TableCell>2023-02-28</TableCell>
                  <TableCell>3:55</TableCell>
                  <TableCell>2023-07-10</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Indie Vibes</div>
                    <div className="text-xs text-muted-foreground">
                      Indie Rock
                    </div>
                  </TableCell>
                  <TableCell>Indie Rock Band</TableCell>
                  <TableCell>Indie Anthems</TableCell>
                  <TableCell>2022-09-01</TableCell>
                  <TableCell>4:20</TableCell>
                  <TableCell>2023-08-01</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}

function Music2Icon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle
        cx="8"
        cy="18"
        r="4"
      />
      <path d="M12 18V2l7 4" />
    </svg>
  )
}

function SettingsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle
        cx="12"
        cy="12"
        r="3"
      />
    </svg>
  )
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
