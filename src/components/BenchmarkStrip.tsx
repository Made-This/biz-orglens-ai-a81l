"use client";

import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, duration = 1200) {
  const [value, setValue] = useState(0);
  const [triggered, setTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!triggered) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (startTime === null) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setValue(Math.round(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [triggered, target, duration]);

  return { value, ref };
}

const STATS = [
  {
    id: 30,
    value: 30,
    suffix: "%",
    body: "of first-year salary can be the cost of a bad hire",
  },
  {
    id: 50,
    value: 50,
    suffix: "%",
    body: "of salary may be at risk for managerial mis-hires",
  },
  {
    id: 70,
    value: 70,
    suffix: "%",
    body: "of team engagement variance is tied to managers",
  },
  {
    id: 23,
    value: 23,
    suffix: "%",
    body: "higher profitability with highly engaged teams",
  },
];

function StatCard({ stat }: { stat: (typeof STATS)[0] }) {
  const { value, ref } = useCountUp(stat.value);
  return (
    <div
      ref={ref}
      className="rounded-xl border border-[#1E1E24] bg-[#12121A] p-6 transition-all hover:-translate-y-0.5 hover:border-indigo-400/40 hover:bg-[#15151F]"
    >
      <p className="text-5xl font-bold tracking-tight text-indigo-300 tabular-nums">
        {value}
        {stat.suffix}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-zinc-400">{stat.body}</p>
    </div>
  );
}

export default function BenchmarkStrip() {
  return (
    <section className="border-y border-[#1E1E24] bg-[#0B0B0F] py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-400">
            What the research says
          </p>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            People decisions carry real financial risk.
          </h2>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 lg:grid-cols-4">
          {STATS.map((s) => (
            <StatCard key={s.id} stat={s} />
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-relaxed text-zinc-600">
          Benchmarks from public workplace and hiring research. Used for
          context, not guaranteed outcomes.
        </p>
      </div>
    </section>
  );
}
