export function SmallPlaylistCardSkeleton() {
  return (
    <article className="relative z-0 max-w-[350px] shadow-xl">
      <div className="flex rounded-xl overflow-hidden border border-gray-700 bg-gray-800 animate-pulse">
        <div className="object-cover min-w-[60px] w-32 aspect-square bg-gray-700" />
        <div className="px-4 py-6 max-w-60 backdrop-blur-2xl bg-black/50">
          <div className="h-6 bg-gray-700 rounded mb-3 w-3/4" />
          <div className="flex gap-2">
            <div className="w-20 h-8 bg-gray-700 rounded" />
            <div className="w-20 h-8 bg-gray-700 rounded" />
            <div className="w-20 h-8 bg-gray-700 rounded" />
          </div>
        </div>
      </div>
    </article>
  );
}
