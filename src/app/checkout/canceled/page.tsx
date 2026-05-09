import Link from "next/link";

export default function CheckoutCanceledPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-6 py-12 text-center">
      <h1 className="text-2xl font-bold text-[#111827] md:text-3xl">
        No worries — your analysis is waiting.
      </h1>
      <p className="mt-2 text-sm text-gray-500">
        You can unlock the full analysis any time from your dashboard.
      </p>

      <Link
        href="/app"
        className="mt-8 inline-flex w-full max-w-md items-center justify-center rounded-md bg-[#4F46E5] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#4338CA]"
      >
        Back to Dashboard
      </Link>

      <p className="mt-6 text-[11px] uppercase tracking-wider text-gray-400">
        Built with MadeThis
      </p>
    </div>
  );
}
