'use client';

import { useCallback } from 'react';

interface Props {
  closeModal: () => void;
  title: string;
}
export function DeleteModal({ closeModal, title }: Props) {
  const handleDelete = useCallback(() => {
    // delete();
    closeModal();
  }, [closeModal]);
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-gray-900 rounded-xl p-6 max-w-md w-full mx-4">
          <h3 className="text-xl font-bold text-white mb-4">Delete Playlist?</h3>
          <p className="text-gray-300 mb-6">
            Are you sure you want to delete "{title}"? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-4">
            <button
              onClick={() => {
                closeModal();
              }}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors">
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
