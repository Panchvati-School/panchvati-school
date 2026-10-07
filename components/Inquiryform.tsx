"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

type Petal = { id: number; x: number; size: number; delay: number; dur: number; rot: number; color: string; drift: number };
const colors = ["#f0ae1c", "#f28fb1", "#ffffff", "#e8603c", "#f7c948"];
// TODO: confirm the real class list.
const classes = ["Nursery", ...Array.from({ length: 10 }, (_, i) => `Class ${i + 1}`)];

const burst = (): Petal[] =>
  Array.from({ length: 36 }, (_, i) => ({
    id: i, x: Math.random() * 100, size: 22 + Math.random() * 26, delay: Math.random() * 0.9,
    dur: 3 + Math.random() * 2.5, rot: Math.random() * 360, color: colors[i % colors.length], drift: (Math.random() - 0.5) * 160,
  }));

function Flower({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="-20 -20 40 40">
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx="0" cy="-9" rx="6" ry="10" fill={color} stroke="rgba(0,0,0,.12)" transform={`rotate(${a})`} />
      ))}
      <circle r="5" fill="#7a4b12" />
    </svg>
  );
}

const field = "mt-2 w-full rounded-xl border border-board/20 bg-chalk px-4 py-3 text-base outline-none transition focus:border-forest focus:ring-2 focus:ring-marigold";

export default function InquiryForm() {
  const [sent, setSent] = useState(false);
  const [petals, setPetals] = useState<Petal[]>([]);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const reduce = useReducedMotion();
  useEffect(() => () => clearTimeout(timer.current), []);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: send new FormData(e.currentTarget) to Supabase or an API route before showing success.
    setSent(true);
    if (!reduce) {
      setPetals(burst());
      timer.current = setTimeout(() => setPetals([]), 6500);
    }
  }

  return (
    <section id="enquiry" className="bg-mist">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 py-24 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <h2 className="text-5xl font-semibold leading-[1.02] text-forest md:text-7xl">Start a conversation</h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed">
            Tell us a little about your child and what you are looking for. The school office will contact you to answer your questions and guide you through admission.
          </p>
        </div>

        <div className="rounded-3xl bg-chalk p-8 shadow-xl shadow-board/5 md:p-10">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div key="thanks" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} role="status" className="py-10 text-center">
                <CheckCircle2 size={56} aria-hidden className="mx-auto text-leaf" />
                <h3 className="mt-5 text-5xl font-semibold text-forest">Thank you!</h3>
                <p className="mx-auto mt-3 max-w-sm text-lg">We have received your enquiry and will be in touch soon.</p>
                <button onClick={() => setSent(false)} className="mt-8 rounded-full border border-forest px-6 py-2.5 font-semibold text-forest transition hover:bg-forest hover:text-chalk">
                  Send another enquiry
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={onSubmit} exit={{ opacity: 0 }} className="grid gap-5 sm:grid-cols-2">
                <label className="block font-medium">Parent or guardian name
                  <input name="parent" required autoComplete="name" className={field} />
                </label>
                <label className="block font-medium">Phone number
                  <input name="phone" type="tel" required autoComplete="tel" className={field} />
                </label>
                <label className="block font-medium">Email
                  <input name="email" type="email" autoComplete="email" className={field} />
                </label>
                <label className="block font-medium">Child&apos;s name
                  <input name="child" className={field} />
                </label>
                <label className="block font-medium sm:col-span-2">Class applying for
                  <select name="class" required defaultValue="" className={field}>
                    <option value="" disabled>Select a class</option>
                    {classes.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </label>
                <label className="block font-medium sm:col-span-2">Message
                  <textarea name="message" rows={4} className={field} />
                </label>
                <button type="submit" className="rounded-full bg-marigold px-8 py-3.5 font-semibold text-board transition hover:brightness-95 sm:col-span-2 sm:justify-self-start">
                  Send enquiry
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div aria-hidden className="pointer-events-none fixed inset-0 z-[70] overflow-hidden">
        {petals.map((p) => (
          <motion.div
            key={p.id}
            className="absolute top-0"
            style={{ left: `${p.x}%` }}
            initial={{ y: -80, x: 0, rotate: p.rot, opacity: 1 }}
            animate={{ y: "110vh", x: p.drift, rotate: p.rot + 360, opacity: [1, 1, 0.8] }}
            transition={{ duration: p.dur, delay: p.delay, ease: "easeIn" }}
          >
            <Flower color={p.color} size={p.size} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}