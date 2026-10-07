"use client";
import { useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { Plus } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

// TODO: all copy below is SAMPLE text. Replace with the school's own wording and class structure.
const approach = [
  { title: "Understand before memorising", text: "Teachers begin with questions and examples so children grasp an idea before they learn its definition." },
  { title: "Learn by doing", text: "Experiments, projects and group work sit beside textbook lessons in every subject." },
  { title: "Every child is known", text: "Small, attentive classrooms let teachers notice who needs support and who is ready for more." },
  { title: "Character alongside marks", text: "Values, teamwork and responsibility are taught on purpose, not left to chance." },
];

const stages = [
  { name: "Foundational", classes: "Nursery to Class 2", focus: "Play-based learning that builds language, number sense and curiosity.", subjects: "English, Hindi, Mathematics, Environmental awareness, Art, Rhymes and movement" },
  { name: "Preparatory", classes: "Classes 3 to 5", focus: "Strong reading, writing and arithmetic, with a first look at science and the world around us.", subjects: "English, Hindi, Mathematics, EVS, Computer basics, Art, Physical education" },
  { name: "Middle", classes: "Classes 6 to 8", focus: "Subject-wise teaching, laboratory work and the habit of independent study.", subjects: "English, Hindi, Mathematics, Science, Social Science, Sanskrit or another language, Computer science" },
  { name: "Secondary", classes: "Classes 9 and 10", focus: "Preparation for the CBSE board examination, with guidance on choosing a stream.", subjects: "English, Hindi, Mathematics, Science, Social Science, Information Technology" },
];

const beyond = [
  { label: "Science club" }, { label: "Sports and athletics" }, { label: "Art and craft" }, { label: "Music and dance" }, { label: "Reading circle" },
];

// Set `photo` to an image in /public (for example "/curriculum/lab.jpg") to replace the placeholder.
function Photo({ photo, label, className }: { photo?: string; label: string; className: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`relative overflow-hidden bg-cover bg-center ${className}`}
      style={{
        backgroundImage: photo
          ? `url(${photo})`
          : "repeating-radial-gradient(circle at 50% 100%, rgba(251,252,250,.10) 0 2px, transparent 2px 26px), linear-gradient(165deg, #2f7d57, #0f3d2e)",
      }}
    >
      {!photo && <span className="absolute bottom-3 left-4 text-sm text-chalk/80">{label}</span>}
    </div>
  );
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ clipPath: "inset(100% 0 0 0)" }}
      whileInView={{ clipPath: "inset(0% 0 0 0)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.1, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function CurriculumView() {
  const [open, setOpen] = useState(0);

  return (
    <MotionConfig reducedMotion="user">
      {/* Intro with photo collage */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-20 pt-16 md:pt-24 lg:grid-cols-2">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
            className="text-6xl font-semibold leading-[0.98] text-forest md:text-8xl"
          >
            Our curriculum
          </motion.h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed">
            Panchvati follows the CBSE curriculum, taught in English. It gives every child a strong base in language, mathematics and science, and room to discover what they love.
          </p>
          <a href="/academics/books" className="mt-8 inline-block rounded-full bg-forest px-7 py-3.5 font-semibold text-chalk transition hover:bg-marigold hover:text-board">
            See prescribed books
          </a>
        </div>
        <div className="grid h-[28rem] grid-cols-5 grid-rows-5 gap-3 md:h-[34rem]">
          <Reveal className="col-span-3 row-span-5"><Photo label="Classroom learning" className="h-full w-full rounded-t-full" /></Reveal>
          <Reveal delay={0.2} className="col-span-2 row-span-2"><Photo label="Science laboratory" className="h-full w-full rounded-2xl" /></Reveal>
          <Reveal delay={0.4} className="col-span-2 row-span-3"><Photo label="Library" className="h-full w-full rounded-2xl" /></Reveal>
        </div>
      </section>

      {/* Approach */}
      <section className="bg-mist">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1fr_1.6fr]">
          <h2 className="text-5xl font-semibold text-forest md:text-6xl lg:sticky lg:top-28 lg:self-start">Our approach</h2>
          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
            {approach.map((a, i) => (
              <div key={a.title}>
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: i * 0.12, ease }}
                  className="mb-5 h-0.5 origin-left bg-marigold"
                />
                <h3 className="text-3xl font-bold leading-tight text-forest">{a.title}</h3>
                <p className="mt-3 text-lg leading-relaxed text-board/80">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stages */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <h2 className="text-5xl font-semibold text-forest md:text-6xl">A child&apos;s journey</h2>
        <p className="mt-4 text-lg">Four stages, each building on the last.</p>
        <div className="mt-10 border-t border-board/15">
          {stages.map((s, i) => (
            <div key={s.name} className="border-b border-board/15">
              <button
                aria-expanded={open === i}
                onClick={() => setOpen(open === i ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 py-6 text-left"
              >
                <span>
                  <span className="block font-serif text-3xl font-bold text-forest md:text-4xl">{s.name}</span>
                  <span className="mt-1 block text-leaf">{s.classes}</span>
                </span>
                <Plus aria-hidden className={`shrink-0 text-forest transition-transform duration-300 ${open === i ? "rotate-45" : ""}`} />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease }}
                    className="overflow-hidden"
                  >
                    <div className="max-w-2xl pb-7">
                      <p className="text-lg leading-relaxed">{s.focus}</p>
                      <p className="mt-3 text-board/70"><span className="font-semibold text-board">Subjects: </span>{s.subjects}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* Beyond the textbook */}
      <section className="bg-forest text-chalk">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="text-5xl font-semibold md:text-6xl">Beyond the textbook</h2>
          <p className="mt-4 max-w-xl text-lg text-chalk/80">Learning continues in clubs, on the sports field and in the studio.</p>
        </div>
        <div className="flex snap-x gap-5 overflow-x-auto px-6 pb-20 [scrollbar-width:thin]">
          {beyond.map((b) => (
            <Photo key={b.label} label={b.label} className="h-80 w-64 shrink-0 snap-start rounded-t-full md:h-96 md:w-72" />
          ))}
        </div>
      </section>

      {/* Assessment + CTA */}
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2">
        <div>
          <h2 className="text-5xl font-semibold text-forest md:text-6xl">How we assess</h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed">
            Progress is measured through the year, not only at the end. Class work, projects, periodic tests and examinations together show what each child understands and where they need help. Parents receive clear feedback they can act on.
          </p>
        </div>
        <div className="self-center rounded-3xl bg-mist p-10">
          <h3 className="text-3xl font-bold text-forest">Ready to join us?</h3>
          <p className="mt-3 text-lg">Start with an enquiry and the school office will guide you through admission.</p>
          <a href="/#admissions" className="mt-6 inline-block rounded-full bg-marigold px-7 py-3.5 font-semibold text-board transition hover:brightness-95">Apply for admission</a>
        </div>
      </section>
    </MotionConfig>
  );
}