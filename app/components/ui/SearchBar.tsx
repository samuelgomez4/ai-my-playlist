import { FaSearch } from 'react-icons/fa';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  className?: string;
}
export function SearchBar({ placeholder, className, ...props }: Props) {
  return (
    <div className={`relative  ${className}`}>
      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        {...props}
        type="text"
        placeholder={placeholder}
        className="w-full bg-gray-800 text-white pl-10 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
    </div>
  );
}
