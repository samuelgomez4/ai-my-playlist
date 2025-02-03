import type { Id } from '@/types/playlist';
import { DeleteButton } from '../ui/delete-button/DeleteButton';
import { DeleteModal } from '../ui/delete-button/DeleteModal';
import { useState } from 'react';
import { usePlaylistsStore } from '@/store/playlists';

interface Props {
  id: Id;
  itemName: string;
}

export function DeletePlaylistButton({ id, itemName }: Props) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const deletePlaylist = usePlaylistsStore((state) => state.deletePlaylist);

  const closeModal = () => {
    setShowDeleteModal(false);
  };
  const deleteItem = () => {
    deletePlaylist(id);
  };
  return (
    <>
      <DeleteButton
        onClick={() => setShowDeleteModal(true)}
        title={`delete ${itemName}`}
      />
      {showDeleteModal && (
        <DeleteModal
          closeModal={closeModal}
          deleteItem={deleteItem}
          itemName={itemName}
        />
      )}
    </>
  );
}
