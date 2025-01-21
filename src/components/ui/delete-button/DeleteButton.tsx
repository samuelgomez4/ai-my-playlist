'use client';
import { useCallback, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { DeleteModal } from './DeleteModal';

interface Props {
  title: string;
}
export function DeleteButton({ title }: Props) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const closeModal = useCallback(() => {
    setShowDeleteModal(false);
  }, []);
  return (
    <>
      <button
        onClick={() => setShowDeleteModal(true)}
        title="delete"
        className="p-3 bg-red-600/80 text-white rounded-lg hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-red-500/30">
        <FaTrash className="text-sm" />
      </button>
      {showDeleteModal && (
        <DeleteModal
          closeModal={closeModal}
          title={title}
        />
      )}
    </>
  );
}
