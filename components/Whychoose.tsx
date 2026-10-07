"use client";
import { motion } from "framer-motion";
import { BookOpen, HeartHandshake, Laptop, Mountain, ShieldCheck, Trophy } from "lucide-react";

// TODO: sample copy. Keep only the claims the school can stand behind.
const reasons = [
  { icon: BookOpen, title: "CBSE curriculum", text: "A nationally recognised syllabus taught in English, with a clear path to board examinations." },
  { icon: HeartHandshake, title: "Caring teachers", text: "Qualified teachers who know their students and give time to every child." },
  { icon: Mountain, title: "A calm hill campus", text: "Fresh air and open space in the Sahyadri hills, away from city noise." },
  { icon: Trophy, title: "Beyond the classroom", text: "Sports, art, music and clubs sit alongside academics." },
  { icon: Laptop, title: "Technology that helps", text: "Digital tools used where they improve learning, never to replace teachers." },
  { icon: ShieldCheck, title: "Values first", text: "Discipline, honesty and respect are taught as seriously as mathematics." },
];

export default function WhyChoose() {
  return (
    <section id="why" className="bg-mist">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <h2 className="max-w-3xl text-5xl font-semibold leading-[1.02] text-forest md:text-7xl">Why choose Panchvati</h2>
        <ul className="mt-16 grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <motion.li
              key={r.title}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              <span className="grid h-14 w-14 place-items-center rounded-full bg-forest text-marigold transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-6">
                <r.icon aria-hidden />
              </span>
              <h3 className="mt-5 text-3xl font-bold text-forest">{r.title}</h3>
              <p className="mt-2 text-lg leading-relaxed text-board/80">{r.text}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}