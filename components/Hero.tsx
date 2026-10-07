"use client";
import { useRef } from "react";
import { motion, MotionConfig, useScroll, useTransform } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;
const lines = ["Where curiosity", "becomes confidence."];
const facts = ["CBSE curriculum", "English medium", "Igatpuri, Nashik district"];

// Set `photo` to an image in /public (for example "/campus.jpg") to replace the placeholder pattern.
function Arch({ photo, delay, className }: { photo?: string; delay: number; className: string }) {
  return (
    <motion.div
      initial={{ clipPath: "inset(100% 0 0 0)" }}
      animate={{ clipPath: "inset(0% 0 0 0)" }}
      transition={{ duration: 1.3, delay, ease }}
      className={`rounded-t-full bg-cover bg-center ${className}`}
      style={{
        backgroundImage: photo
          ? `url(${photo})`
          : "repeating-radial-gradient(circle at 50% 100%, rgba(251,252,250,.10) 0 2px, transparent 2px 26px), linear-gradient(165deg, #2f7d57, #0f3d2e)",
      }}
    />
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBig = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const ySmall = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <MotionConfig reducedMotion="user">
      <section id="top" ref={ref} className="relative overflow-hidden bg-forest text-chalk">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 pt-16 md:pt-24 lg:grid-cols-12">
          <div className="self-center pb-8 lg:col-span-7">
            <p className="inline-flex items-center gap-2 rounded-full border border-chalk/25 px-4 py-1.5 text-sm">
              <span className="h-2 w-2 rounded-full bg-marigold" aria-hidden /> Admissions open
            </p>
            <h1 className="mt-8 text-6xl font-semibold leading-[0.95] sm:text-7xl lg:text-[7.5rem]">
              {lines.map((l, i) => (
                <span key={l} className="block overflow-hidden pb-[0.12em]">
                  <motion.span
                    className="block"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, delay: 0.2 + i * 0.15, ease }}
                  >
                    {l}
                  </motion.span>
                </span>
              ))}
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-chalk/80">
              A CBSE school in the Sahyadri hills of Igatpuri, helping children learn well, grow in character and lead with confidence.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="/#admissions" className="rounded-full bg-marigold px-7 py-3.5 font-semibold text-board transition hover:brightness-95">Apply for admission</a>
              <a href="/school/teachers" className="rounded-full border border-chalk/40 px-7 py-3.5 font-semibold transition hover:bg-chalk hover:text-forest">Meet our teachers</a>
            </div>
          </div>

          <div className="relative h-[28rem] sm:h-[34rem] lg:col-span-5 lg:h-[40rem]">
            <motion.div style={{ y: yBig }} className="absolute bottom-0 right-0 h-full w-[68%]">
              <Arch delay={0.3} className="h-full w-full" />
            </motion.div>
            <motion.div style={{ y: ySmall }} className="absolute bottom-0 left-0 h-[56%] w-[46%]">
              <Arch delay={0.6} className="h-full w-full border-[6px] border-b-0 border-forest" photo="" />
            </motion.div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6">
          <ul className="flex flex-wrap gap-x-10 gap-y-2 border-t border-chalk/15 py-6 text-sm text-chalk/70">
            {facts.map((f) => <li key={f}>{f}</li>)}
          </ul>
        </div>
      </section>
    </MotionConfig>
  );
}