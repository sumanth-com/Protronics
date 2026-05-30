export default function ContactLoading() {
  return (
    <div className="min-h-screen bg-black">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mx-auto h-8 w-64 animate-pulse rounded bg-white/10" />
        <div className="mx-auto mt-3 h-4 w-full max-w-md animate-pulse rounded bg-white/[0.06]" />
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <div className="min-h-[280px] animate-pulse rounded-3xl bg-white/[0.06] lg:min-h-[420px]" />
          <div className="min-h-[360px] animate-pulse rounded-3xl bg-white/[0.06]" />
        </div>
      </div>
    </div>
  );
}
