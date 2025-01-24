import type { ButtonHTMLAttributes } from 'react';
import { FaTimes } from 'react-icons/fa';

export function CancelButton({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <>
      <button
        {...props}
        className={`text-gray-400  hover:text-white transition-colors  ${className}`}>
        <FaTimes className="text-xl" />
      </button>
    </>
  );
}
