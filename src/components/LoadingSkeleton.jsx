export default function LoadingSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 animate-pulse"
        >
          <div className="flex items-start gap-3 mb-4">
            <div className="w-11 h-11 rounded-full bg-slate-200 dark:bg-slate-700" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
            </div>
            <div className="h-5 w-16 bg-slate-200 dark:bg-slate-700 rounded-full" />
          </div>
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-2/3 mb-3" />
          <div className="flex gap-1.5 mb-3">
            <div className="h-6 w-14 bg-slate-200 dark:bg-slate-700 rounded-md" />
            <div className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded-md" />
            <div className="h-6 w-12 bg-slate-200 dark:bg-slate-700 rounded-md" />
          </div>
          <div className="pt-2 border-t border-slate-100 dark:border-slate-700">
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
