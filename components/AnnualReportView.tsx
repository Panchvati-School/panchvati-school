"use client";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence, MotionConfig, animate, motion, useInView, useReducedMotion, useScroll,
} from "framer-motion";
import { Download } from "lucide-react";

// TODO: every number and highlight below is SAMPLE data. Replace with the school's real figures,
// and point `pdf` at the real file in /public. Later this can come from Supabase.
const reports = {
  "2024-25": {
    pdf: "#",
    figures: [
      { label: "Students", value: 850, suffix: "" },
      { label: "Teachers", value: 42, suffix: "" },
      { label: "Board pass rate", value: 98, suffix: "%" },
      { label: "Events and activities", value: 36, suffix: "" },
    ],
    results: [
      { label: "Distinction (75% and above)", value: 38 },
      { label: "First class (60 to 74%)", value: 41 },
      { label: "Second class (45 to 59%)", value: 19 },
    ],
    highlights: [
      { when: "April 2024", title: "New session begins", text: "Admissions closed with every class at full strength." },
      { when: "August 2024", title: "Independence Day and sports meet", text: "Students from all classes took part in track and field events." },
      { when: "December 2024", title: "Annual day", text: "Cultural programme and prize distribution for the year." },
      { when: "March 2025", title: "Board examinations", text: "Class X students completed their CBSE board exams." },
    ],
  },
  "2023-24": {
    pdf: "#",
    figures: [
      { label: "Students", value: 812, suffix: "" },
      { label: "Teachers", value: 40, suffix: "" },
      { label: "Board pass rate", value: 96, suffix: "%" },
      { label: "Events and activities", value: 31, suffix: "" },
    ],
    results: [
      { label: "Distinction (75% and above)", value: 33 },
      { label: "First class (60 to 74%)", value: 44 },
      { label: "Second class (45 to 59%)", value: 21 },
    ],
    highlights: [
      { when: "April 2023", title: "New session begins", text: "Welcome programme for new students and parents." },
      { when: "October 2023", title: "Science exhibition", text: "Student projects displayed to parents and visitors." },
      { when: "January 2024", title: "Republic Day", text: "Parade and cultural performances on campus." },
      { when: "March 2024", title: "Board examinations", text: "Class X students completed their CBSE board exams." },
    ],
  },
};
type Year = keyof typeof reports;

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (reduce) { setN(to); return; }
    const c = animate(0, to, { duration: 1.6, ease: "easeOut", onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, to, reduce]);
  return <span ref={ref}>{n}{suffix}</span>;
}

function Timeline({ items }: { items: { when: string; title: string; text: string }[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  return (
    <ol ref={ref} className="relative mt-10 space-y-10 border-l border-board/15 pl-8">
      <motion.span
        aria-hidden
        style={{ scaleY: scrollYProgress }}
        className="absolute -left-px top-0 h-full w-0.5 origin-top bg-marigold"
      />
      {items.map((h) => (
        <li key={h.title}>
          <p className="font-display text-sm text-leaf">{h.when}</p>
          <h3 className="mt-1 text-2xl font-semibold text-forest">{h.title}</h3>
          <p className="mt-2 max-w-xl text-lg leading-relaxed">{h.text}</p>
        </li>
      ))}
    </ol>
  );
}

export default function AnnualReportView() {
  const [year, setYear] = useState<Year>("2024-25");
  const data = reports[year];

  return (
    <MotionConfig reducedMotion="user">
      <section className="bg-forest text-chalk">
        <div className="mx-auto max-w-6xl px-5 pb-14 pt-16 md:pt-24">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl font-semibold md:text-7xl"
          >
            Annual report
          </motion.h1>
          <div role="tablist" aria-label="Academic year" className="mt-8 flex flex-wrap gap-2">
            {(Object.keys(reports) as Year[]).map((y) => (
              <button
                key={y}
                role="tab"
                aria-selected={year === y}
                onClick={() => setYear(y)}
                className="relative rounded-full px-5 py-2 font-display font-semibold"
              >
                {year === y && (
                  <motion.span layoutId="year-pill" className="absolute inset-0 rounded-full bg-marigold" />
                )}
                <span className={`relative ${year === y ? "text-board" : "text-chalk"}`}>{y}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence mode="wait">
        <motion.div
          key={year}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
        >
          <section className="mx-auto max-w-6xl px-5 py-16">
            <h2 className="text-3xl font-semibold text-forest md:text-4xl">The year in figures</h2>
            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
              {data.figures.map((f) => (
                <div key={f.label} className="border-t-2 border-forest pt-4">
                  <dd className="font-display text-5xl font-semibold text-forest md:text-6xl">
                    <Counter to={f.value} suffix={f.suffix} />
                  </dd>
                  <dt className="mt-2 text-lg">{f.label}</dt>
                </div>
              ))}
            </dl>
          </section>

          <section className="bg-mist">
            <div className="mx-auto max-w-6xl px-5 py-16">
              <h2 className="text-3xl font-semibold text-forest md:text-4xl">Board results</h2>
              <p className="mt-3 text-lg">Share of Class X students in each grade band.</p>
              <div className="mt-10 max-w-3xl space-y-7">
                {data.results.map((r, i) => (
                  <div key={r.label}>
                    <div className="flex justify-between font-display font-medium">
                      <span>{r.label}</span><span>{r.value}%</span>
                    </div>
                    <div className="mt-2 h-4 overflow-hidden rounded-full bg-chalk">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${r.value}%` }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 1.1, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full rounded-full bg-leaf"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-5 py-16">
            <h2 className="text-3xl font-semibold text-forest md:text-4xl">Highlights of the year</h2>
            <Timeline items={data.highlights} />
          </section>

          <section className="bg-board text-chalk">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-5 py-14">
              <h2 className="text-3xl font-semibold">Read the full report for {year}</h2>
              <a
                href={data.pdf}
                download
                className="inline-flex items-center gap-2 rounded-full bg-marigold px-6 py-3 font-display font-semibold text-board transition hover:brightness-95"
              >
                <Download size={18} aria-hidden /> Download PDF
              </a>
            </div>
          </section>
        </motion.div>
      </AnimatePresence>
    </MotionConfig>
  );
}