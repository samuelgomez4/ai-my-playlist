import { list } from '@vercel/blob';

interface Props {
  videoFileName: string;
  title: string;
  height?: number;
  width?: number;
}

export async function FeatureVideo({ videoFileName, title, height, width }: Props) {
  try {
    const { blobs } = await list({
      prefix: videoFileName,
      limit: 1,
    });
    const { url } = blobs[0];

    return (
      <video
        autoPlay
        loop
        muted
        preload="none"
        aria-label={title + ' video'}
        width={width}
        height={height}>
        <source
          src={url}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    );
  } catch {
    return (
      <div
        className="bg-gray-800 slate-200 flex items-center justify-center aspect-video"
        style={{ height, width }}>
        <p className="text-white text-lg">Video not found</p>
      </div>
    );
  }
}
