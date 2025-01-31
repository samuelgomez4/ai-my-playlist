import type { Id } from '@/types/playlist';
import { PlaylistHeader } from './components/PlaylistHeader';
import { PlaylistTable } from './components/PlaylistTable';

interface Props {
  params: {
    id: Id;
  };
}

export default async function PlaylistPage({ params }: Props) {
  const { id } = await params;
  return (
    <>
      <section className="p-6 max-w-5xl mx-auto">
        <PlaylistHeader id={id} />
        <div className="overflow-y-auto max-h-[50vh]">
          <PlaylistTable id={id} />
        </div>
      </section>
    </>
  );
}
