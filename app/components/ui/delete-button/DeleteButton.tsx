'use client';
import type { ButtonHTMLAttributes } from 'react';
import { FaTrash } from 'react-icons/fa';

export function DeleteButton({ ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <>
      <button
        {...props}
        className="p-3 bg-red-700 text-white rounded-lg hover:bg-red-600 transition-all duration-300 shadow-lg">
        <FaTrash className="text-sm" />
      </button>
    </>
  );
}
