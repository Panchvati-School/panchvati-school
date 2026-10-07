"use client";
import { useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";

type Teacher = { name: string; position: string; qualification: string; department: string; photo?: string; featured?: boolean };

// TODO: SAMPLE names and details. Replace every entry with the school's real staff list.
// Add `photo: "/teachers/name.jpg"` (file in /public/teachers) to show a real portrait.
const teachers: Teacher[] = [
  { name: "Mr. Ashishkumar Khule", position: "Principal", qualification: "M.A., M.Ed.", department: "Administration", featured: true, photo: "/teachers/ashishkumar-khule.png" },
  { name: "Ms. Sarthaki Jain", position: "Teacher", qualification: "M.Sc., B.Ed.", department: "Primary", photo: "/teachers/sarthaki-jain.png" },
  { name: "Ms. Dipika Sonawane", position: "Teacher", qualification: "B.A., D.Ed.", department: "Primary", photo: "/teachers/dipika-sonawane.png" },
  { name: "Ms. xyz name", position: "Class Teacher, Class 2", qualification: "B.Sc., B.Ed.", department: "Primary" },
];

const ease = [0.22, 1, 0.36, 1] as const;
const departments = ["All", ...Array.from(new Set(teachers.filter((t) => !t.featured).map((t) => t.department)))];
const initials = (n: string) => n.replace(/^(Mr|Mrs|Ms|Dr)\.?\s+/i, "").split(/\s+/).map((w) => w[0]).slice(0, 2).join("");

function Portrait({ t, className }: { t: Teacher; className: string }) {
  return (
    <motion.div
      initial={{ clipPath: "inset(100% 0 0 0)" }}
      whileInView={{ clipPath: "inset(0% 0 0 0)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 1, ease }}
      role="img"
      aria-label={`Portrait of ${t.name}`}
      className={`grid place-items-center overflow-hidden rounded-t-full bg-cover bg-center ${className}`}
      style={{
        backgroundImage: t.photo
          ? `url(${t.photo})`
          : "repeating-radial-gradient(circle at 50% 100%, rgba(251,252,250,.10) 0 2px, transparent 2px 26px), linear-gradient(165deg, #2f7d57, #0f3d2e)",
      }}
    >
      {!t.photo && <span className="font-serif text-6xl font-bold text-marigold">{initials(t.name)}</span>}
    </motion.div>
  );
}

export default function TeachersView() {
  const [dept, setDept] = useState("All");
  const lead = teachers.find((t) => t.featured);
  const staff = teachers.filter((t) => !t.featured && (dept === "All" || t.department === dept));

  return (
    <MotionConfig reducedMotion="user">
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-16 md:pt-24">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
          className="text-6xl font-semibold leading-[0.98] text-forest md:text-8xl"
        >
          Meet our teachers
        </motion.h1>
        <p className="mt-5 max-w-xl text-lg">The people who teach, guide and look after our students every day.</p>

        {lead && (
          <div className="mt-14 grid items-center gap-10 rounded-3xl bg-forest p-8 text-chalk md:grid-cols-[18rem_1fr] md:p-12">
            <Portrait t={lead} className="mx-auto aspect-[3/4] w-56 md:w-full" />
            <div>
              <p className="font-semibold text-marigold">{lead.position}</p>
              <h2 className="mt-2 text-5xl font-semibold md:text-6xl">{lead.name}</h2>
              <p className="mt-4 text-lg text-chalk/80">{lead.qualification}</p>
            </div>
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div role="tablist" aria-label="Department" className="flex gap-2 overflow-x-auto pb-2">
          {departments.map((d) => (
            <button
              key={d}
              role="tab"
              aria-selected={dept === d}
              onClick={() => setDept(d)}
              className="relative shrink-0 rounded-full px-5 py-2 font-semibold"
            >
              {dept === d && <motion.span layoutId="dept-pill" className="absolute inset-0 rounded-full bg-marigold" />}
              <span className="relative text-board">{d}</span>
            </button>
          ))}
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {staff.map((t) => (
              <motion.li
                key={t.name}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.4, ease }}
              >
                <Portrait t={t} className="aspect-[3/4] w-full" />
                <h3 className="mt-5 text-2xl font-bold leading-tight text-forest">{t.name}</h3>
                <p className="mt-1 font-medium text-leaf">{t.position}</p>
                <p className="mt-3 border-t border-board/15 pt-3 text-board/75">{t.qualification}</p>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </section>
    </MotionConfig>
  );
}