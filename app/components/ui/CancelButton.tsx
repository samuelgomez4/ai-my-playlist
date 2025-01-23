import { FaTimes } from 'react-icons/fa';

interface Props {
  className?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function CancelButton({ className, onClick }: Props) {
  return (
    <>
      <button
        onClick={onClick}
        className={`text-gray-400 hover:text-white transition-colors  ${className}`}>
        <FaTimes className="text-xl" />
      </button>
    </>
  );
}
