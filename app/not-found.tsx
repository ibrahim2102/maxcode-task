import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl rounded-3xl border border-black/10 bg-white p-8 text-center shadow-sm dark:border-white/10 dark:bg-zinc-950">
      <div className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">Not found</div>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
        The page you’re looking for doesn’t exist.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center justify-center rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-black/[.03] dark:border-white/10 dark:text-zinc-50 dark:hover:bg-white/[.06]"
      >
        Go back home
      </Link>
    </div>
  );
}

