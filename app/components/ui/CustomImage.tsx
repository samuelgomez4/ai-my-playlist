import { DEFAULT_IMAGE_SRC } from '@/utils/constants/constants';

interface CustomImageProps {
  src?: string;
  alt: string;
  className?: string;
}

export function CustomImage({ src, alt, className }: CustomImageProps) {
  return (
    <img
      src={src || DEFAULT_IMAGE_SRC}
      alt={alt}
      className={className}
    />
  );
}
