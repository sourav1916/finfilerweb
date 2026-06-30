export function ServiceCardSkeleton() {
  return (
    <article className="flex flex-col h-full bg-white rounded-2xl shadow-sm border border-slate-100 p-6 animate-pulse">
      <div className="w-12 h-12 bg-slate-200 rounded-xl mb-5" />
      <div className="w-3/4 h-5 bg-slate-200 rounded-md mb-3" />
      <div className="w-full h-4 bg-slate-100 rounded-md mb-2" />
      <div className="w-5/6 h-4 bg-slate-100 rounded-md mb-6" />
      <div className="mt-auto pt-4 border-t border-slate-100 flex justify-between">
        <div className="w-20 h-6 bg-slate-200 rounded-md" />
        <div className="w-24 h-5 bg-slate-100 rounded-md" />
      </div>
    </article>
  );
}

export function ServiceDetailSkeleton() {
  return (
    <div className="animate-pulse flex flex-col gap-6 w-full max-w-4xl mx-auto p-6 md:p-12">
      <div className="w-24 h-5 bg-slate-200 rounded-md" />
      <div className="w-3/4 h-10 bg-slate-200 rounded-xl" />
      <div className="w-1/2 h-6 bg-slate-100 rounded-md" />
      <div className="w-32 h-12 bg-slate-200 rounded-xl mt-4" />
      <div className="flex flex-col gap-3 mt-8 border-t border-slate-100 pt-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="w-full h-16 bg-slate-50 rounded-xl" />
        ))}
      </div>
      <div className="w-full max-w-xs h-12 bg-slate-200 rounded-xl mt-6" />
    </div>
  );
}
