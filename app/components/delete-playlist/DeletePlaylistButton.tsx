import type { Id } from '@/types/playlist';
import { DeleteButton } from '../ui/delete-button/DeleteButton';
import { usePlaylistsStore } from '@/store/playlists-store';
import { useSelectedPlaylist } from '@/hooks/useSelectedPlaylist';

interface Props {
  id: Id;
  itemName: string;
}

export function DeletePlaylistButton({ id, itemName }: Props) {
  const { selectedPlaylist, selectPlaylist } = useSelectedPlaylist();
  const deletePlaylist = usePlaylistsStore((state) => state.deletePlaylist);

  const deleteItem = () => {
    if (selectedPlaylist?.id === id) selectPlaylist(undefined);
    deletePlaylist(id);
  };
  return (
    <>
      <DeleteButton
        itemName={itemName}
        deleteItem={deleteItem}
      />
    </>
  );
}
