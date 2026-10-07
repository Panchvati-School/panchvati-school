"use client";
import { useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";

type Book = { title: string; subject: string; description: string; image?: string };

// TODO: SAMPLE data. Replace every class and book with the school's real prescribed list.
// Add `image: "/books/class-5-maths.jpg"` (file in /public/books) to show a real cover.
const classes: Record<string, Book[]> = {
  Nursery: [
    { title: "My First Alphabet Book", subject: "English", description: "Letters, sounds and simple words through large pictures and rhymes.", image: "/books/mfa.jpg" },
    { title: "Numbers Recognition Fun", subject: "Maths", description: "Counting from one to twenty with games and colourful illustrations.", image: "/books/nrf.jpg" },
    { title: "My First Shapes and Colors", subject: "General awareness", description: "Learning to recognise colours, shapes and everyday objects.", image: "/books/mfsc.jpg" },
  ],
  "Class 1": [
    { title: "Marigold 1", subject: "English", description: "Stories and poems that build early reading, listening and speaking skills." },
    { title: "Joyful Mathematics 1", subject: "Maths", description: "Numbers, shapes and patterns taught through activities and play." },
    { title: "Rimjhim 1", subject: "Hindi", description: "Simple Hindi stories and poems to build reading and writing." },
    { title: "My World", subject: "EVS", description: "An introduction to family, plants, animals and the world around us." },
  ],
  "Class 3": [
    { title: "Marigold 3", subject: "English", description: "Short stories and poems with exercises for vocabulary and comprehension." },
    { title: "Math-Magic 3", subject: "Maths", description: "Addition, subtraction, multiplication, time and money in everyday settings." },
    { title: "Rimjhim 3", subject: "Hindi", description: "Hindi reading, grammar and creative writing practice." },
    { title: "Looking Around", subject: "EVS", description: "Environmental studies built on observation, questions and local examples." },
  ],
  "Class 5": [
    { title: "Marigold 5", subject: "English", description: "Longer stories, poems and writing tasks that grow confident readers." },
    { title: "Math-Magic 5", subject: "Maths", description: "Fractions, area, measurement and data handling with real-life problems." },
    { title: "Rimjhim 5", subject: "Hindi", description: "Hindi prose, poetry and grammar for fluent reading and expression." },
    { title: "Looking Around 5", subject: "EVS", description: "Water, food, travel and community, explored through stories and activities." },
  ],
  "Class 8": [
    { title: "Honeydew", subject: "English", description: "Prose and poetry for the middle years, with a companion reader." },
    { title: "Mathematics 8", subject: "Maths", description: "Algebra, mensuration, data handling and the first steps in proofs." },
    { title: "Science 8", subject: "Science", description: "Physics, chemistry and biology with experiments and everyday examples." },
    { title: "Our Pasts III", subject: "Social Science", description: "Modern Indian history from the arrival of the British to independence." },
  ],
  "Class 10": [
    { title: "First Flight", subject: "English", description: "Literature textbook for the CBSE board course, with a supplementary reader." },
    { title: "Mathematics 10", subject: "Maths", description: "Algebra, geometry, trigonometry and statistics for the board examination." },
    { title: "Science 10", subject: "Science", description: "Chemical reactions, life processes, electricity and the environment." },
    { title: "Contemporary India II", subject: "Social Science", description: "Resources, agriculture, industry and the economy of India." },
  ],
};

const tones: Record<string, string> = {
  English: "bg-forest text-chalk",
  Maths: "bg-leaf text-chalk",
  Science: "bg-board text-chalk",
  "Social Science": "bg-marigold text-board",
  Hindi: "bg-mist text-board ring-1 ring-board/15",
};
const tone = (s: string) => tones[s] ?? "bg-forest/90 text-chalk";
const ease = [0.22, 1, 0.36, 1] as const;

function Cover({ book }: { book: Book }) {
  return (
    <div className="[perspective:900px]">
      <motion.div
        whileHover={{ rotateY: -16, y: -8 }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative aspect-[3/4] overflow-hidden rounded-l-sm rounded-r-md shadow-xl shadow-board/25"
      >
        {book.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={book.image} alt={`Cover of ${book.title}`} className="h-full w-full object-cover" />
        ) : (
          <div className={`flex h-full flex-col justify-between p-5 pl-7 ${tone(book.subject)}`}>
            <p className="text-sm font-medium opacity-80">{book.subject}</p>
            <h3 className="font-serif text-3xl font-bold leading-[1.05]">{book.title}</h3>
            <div aria-hidden className="mx-auto h-16 w-12 rounded-t-full border-2 border-current opacity-40" />
          </div>
        )}
        <span aria-hidden className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/35 to-transparent" />
      </motion.div>
    </div>
  );
}

export default function BooksView() {
  const names = Object.keys(classes);
  const [cls, setCls] = useState(names[0]);
  const books = classes[cls];

  return (
    <MotionConfig reducedMotion="user">
      <section className="bg-forest text-chalk">
        <div className="mx-auto max-w-6xl px-6 pb-12 pt-16 md:pt-24">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
            className="max-w-3xl text-5xl font-semibold leading-[1.02] md:text-7xl"
          >
            List of books prescribed in various classes
          </motion.h1>
          <div role="tablist" aria-label="Class" className="mt-10 flex gap-2 overflow-x-auto pb-2">
            {names.map((n) => (
              <button
                key={n}
                role="tab"
                aria-selected={cls === n}
                onClick={() => setCls(n)}
                className="relative shrink-0 rounded-full px-5 py-2 font-semibold"
              >
                {cls === n && <motion.span layoutId="class-pill" className="absolute inset-0 rounded-full bg-marigold" />}
                <span className={`relative ${cls === n ? "text-board" : "text-chalk"}`}>{n}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <AnimatePresence mode="wait">
          <motion.div key={cls} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-4xl font-semibold text-forest md:text-5xl">{cls}</h2>
              <p className="text-board/60">{books.length} books</p>
            </div>

            <ul className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
              {books.map((b, i) => (
                <motion.li
                  key={b.title}
                  initial={{ opacity: 0, y: 48 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease }}
                >
                  <div className="mx-auto max-w-[14rem] sm:max-w-none">
                    <Cover book={b} />
                  </div>
                  <h3 className="mt-6 text-2xl font-bold text-forest">{b.title}</h3>
                  <p className="mt-1 text-sm font-medium text-leaf">{b.subject}</p>
                  <p className="mt-2 leading-relaxed text-board/80">{b.description}</p>
                </motion.li>
              ))}
            </ul>
            <div aria-hidden className="mt-4 h-3 rounded-full bg-board/10" />
          </motion.div>
        </AnimatePresence>
      </section>
    </MotionConfig>
  );
}