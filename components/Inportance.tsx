"use client";
import { motion } from "framer-motion";

// TODO: sample copy. Edit to match the school's own voice.
const points = [
  { title: "It builds a way of thinking", text: "A good education teaches children to ask questions, reason carefully and solve problems, not only to remember answers." },
  { title: "It shapes character", text: "Honesty, discipline and kindness are formed early, in classrooms, on playgrounds and in everyday habits." },
  { title: "It opens doors", text: "Strong foundations in language, mathematics and science keep every path open, whether college, a career or a business." },
  { title: "It prepares for change", text: "Children who learn how to learn can adapt to whatever work and technology come next." },
];

export default function Importance() {
  return (
    <section id="education" className="mx-auto grid max-w-7xl gap-14 px-6 py-24 lg:grid-cols-2">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <h2 className="text-5xl font-semibold leading-[1.02] text-forest md:text-7xl">Why a good education matters</h2>
        <p className="mt-6 max-w-md text-lg leading-relaxed">
          The years in school decide how a child thinks, behaves and dreams. We take that responsibility seriously, in every lesson and every day.
        </p>
      </div>
      <ul className="space-y-10">
        {points.map((p, i) => (
          <li key={p.title}>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mb-5 h-0.5 origin-left bg-marigold"
            />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.05 }}
            >
              <h3 className="text-3xl font-bold text-forest md:text-4xl">{p.title}</h3>
              <p className="mt-3 max-w-lg text-lg leading-relaxed text-board/80">{p.text}</p>
            </motion.div>
          </li>
        ))}
      </ul>
    </section>
  );
}