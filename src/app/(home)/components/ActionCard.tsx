interface Props {
  action: string;
  description: string;
  videoSrc: string;
}
export function ActionCard({ action, description, videoSrc }: Props) {
  return (
    <article className="rounded-3xl border border-gray-500 p-4 border-opacity-50">
      <h2 className="mb-4 text-2xl">{action}</h2>
      <p className="mb-4">{description}</p>
      <video
        src={videoSrc}
        muted
        loop
        autoPlay
      />
    </article>
  );
}
