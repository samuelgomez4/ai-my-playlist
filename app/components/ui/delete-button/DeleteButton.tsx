import { useState, type ButtonHTMLAttributes } from 'react';
import { FaTrash } from 'react-icons/fa';
import { DeleteModal } from './DeleteModal';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  itemName: string;
  deleteItem: () => void;
}

export function DeleteButton({ itemName, deleteItem, ...props }: Props) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const closeModal = () => {
    setShowDeleteModal(false);
  };
  return (
    <>
      <button
        {...props}
        onClick={() => setShowDeleteModal(true)}
        title={`delete ${itemName}}`}
        className="p-3 bg-red-700 text-white rounded-lg hover:bg-red-600 transition-all duration-300 shadow-lg">
        <FaTrash className="text-sm" />
      </button>
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
