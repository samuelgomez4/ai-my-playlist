export function PlaylistCardSkeleton() {
  return (
    <article className="w-56 relative z-0 shadow-xl animate-pulse">
      <div className="absolute inset-0 -z-10 rounded-xl overflow-hidden bg-gray-700" />
      <div className="h-full rounded-xl overflow-hidden backdrop-blur-2xl bg-black/50 border border-gray-700/50">
        <div className="w-full h-48 bg-gray-600" />
        <div className="px-4 pt-4 pb-6">
          <div className="h-6 bg-gray-600 mb-1 rounded" />
          <div className="h-4 bg-gray-600 mb-4 rounded" />
          <div className="flex flex-col gap-2">
            <div className="h-10 bg-gray-600 rounded" />
            <div className="flex items-center gap-2">
              <div className="h-10 flex-1 bg-gray-600 rounded" />
              <div className="h-10 w-10 bg-gray-600 rounded" />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
