import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CheckoutCanceledPage() {
  return (
    <div className="dark min-h-screen bg-[#0A0A0B] text-zinc-100">
      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-16 text-center">
        <div className="pointer-events-none absolute inset-0 -z-0">
          <div className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/[0.06] blur-[140px]" />
        </div>

        <div className="relative w-full max-w-xl">
          <p className="text-xs font-medium uppercase tracking-widest text-indigo-400">
            Checkout
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Checkout canceled.
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm text-zinc-400">
            No payment was taken. Your analysis preview is still available
            whenever you&rsquo;re ready to unlock the full report.
          </p>

          <Link
            href="/app"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-indigo-500 px-7 py-3.5 text-sm font-medium text-white shadow-[0_0_40px_-5px_rgba(99,102,241,0.6)] transition-all hover:bg-indigo-400"
          >
            Return to Analysis
            <ArrowRight className="h-4 w-4" />
          </Link>

          <p className="mt-8 text-[10px] uppercase tracking-widest text-zinc-600">
            Built with MadeThis
          </p>
        </div>
      </div>
    </div>
  );
}
