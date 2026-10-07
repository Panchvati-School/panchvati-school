"use client";
import { useState } from "react";

// TODO: replace levels and text with the school's actual classes and curriculum.
const levels = [
  { name: "Pre-primary", text: "Play-based learning that builds language, number sense and confidence." },
  { name: "Primary", text: "CBSE curriculum with a focus on reading, mathematics and environment studies." },
  { name: "Middle", text: "Subject-wise teaching with labs, projects and co-curricular activities." },
  { name: "Secondary", text: "Board examination preparation with academic and career guidance." },
];

export default function Academics() {
  const [active, setActive] = useState(0);
  return (
    <section id="academics" className="mx-auto max-w-6xl px-5 py-20">
      <h2 className="text-4xl font-semibold text-forest md:text-5xl">Academics</h2>
      <div role="tablist" aria-label="School levels" className="mt-8 flex flex-wrap gap-2">
        {levels.map((l, i) => (
          <button
            key={l.name}
            role="tab"
            id={`tab-${i}`}
            aria-selected={active === i}
            aria-controls="level-panel"
            onClick={() => setActive(i)}
            className={`rounded-full px-5 py-2 font-display font-semibold transition ${
              active === i ? "bg-forest text-chalk" : "border border-board/20 hover:border-forest"
            }`}
          >
            {l.name}
          </button>
        ))}
      </div>
      <div id="level-panel" role="tabpanel" aria-labelledby={`tab-${active}`} className="mt-8 max-w-xl">
        <p className="text-lg leading-relaxed">{levels[active].text}</p>
        <a href="#" className="mt-4 inline-block font-display font-semibold text-leaf underline underline-offset-4">
          Prescribed books for {levels[active].name} (PDF)
        </a>
      </div>
    </section>
  );
}