export default function AboutLoading() {
  return (
    <div className="min-h-screen bg-black">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="h-4 w-48 animate-pulse rounded bg-white/10" />
        <div className="mt-6 h-12 w-2/3 max-w-lg animate-pulse rounded bg-white/10" />
        <div className="mt-4 h-20 w-full max-w-xl animate-pulse rounded bg-white/[0.06]" />
        <div className="mt-10 aspect-[16/11] w-full animate-pulse rounded-[32px] bg-white/[0.06] md:w-1/2 md:ml-auto" />
      </div>
    </div>
  );
}
