"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Mail, Menu, Phone, X } from "lucide-react";

type Item = { label: string; href: string; note: string; sub?: { label: string; href: string }[] };
type MenuDef = { label: string; heading?: string; items: Item[] };

// Pages other than /annual-report and the homepage anchors are still to be built.
const menus: MenuDef[] = [
  { label: "About us", items: [
    { label: "Leadership", href: "/about/leadership", note: "The people guiding the school" },
    { label: "Mission & values", href: "/about/mission-values", note: "What we stand for" },
    { label: "School overview", href: "/about/overview", note: "Our story and campus" },
    { label: "Committee", href: "/about/committee", note: "School Managing Committee" },
  ]},
  { label: "Academics", items: [
    { label: "Academics", href: "/#academics", note: "Classes and how we teach" },
    { label: "Curriculum", href: "/academics/curriculum", note: "CBSE syllabus by class", sub: [{ label: "Books", href: "/academics/books" }] },
    { label: "Annual report", href: "/annual-report", note: "Results and highlights" },
  ]},
  { label: "School", heading: "PEMS", items: [
    { label: "Overview", href: "/school/overview", note: "Campus and facilities" },
    { label: "Meet our teachers", href: "/school/teachers", note: "Faculty and qualifications" },
  ]},
  { label: "Life at PEMS", items: [
    { label: "School life", href: "/life/school-life", note: "Events, clubs and celebrations" },
    { label: "Sports", href: "/life/sports", note: "Teams, grounds and meets" },
    { label: "Our gallery", href: "/life/gallery", note: "Photos and videos from school" },
  ]},
  { label: "Contact", items: [
    { label: "FAQ", href: "/contact/faq", note: "Answers for parents" },
    { label: "Contact us", href: "/contact", note: "Address, phone and enquiries" },
  ]},
];

function Panel({ menu }: { menu: MenuDef }) {
  return (
    <div className="w-80 rounded-2xl border border-board/10 bg-chalk p-3 shadow-2xl shadow-board/10">
      {menu.heading && <p className="px-3 pb-1 pt-2 font-serif text-xl font-semibold text-leaf">{menu.heading}</p>}
      {menu.items.map((it) => (
        <div key={it.label}>
          <a href={it.href} className="block rounded-xl px-3 py-2.5 transition hover:bg-mist">
            <span className="block font-semibold text-forest">{it.label}</span>
            <span className="block text-sm text-board/60">{it.note}</span>
          </a>
          {it.sub?.map((s) => (
            <a key={s.label} href={s.href} className="ml-6 mt-0.5 block rounded-lg border-l-2 border-marigold px-3 py-1.5 text-sm font-medium text-board hover:bg-mist">
              {s.label}
            </a>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Header() {
  const [open, setOpen] = useState<number | null>(null);
  const [mobile, setMobile] = useState(false);
  const [acc, setAcc] = useState<number | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const away = (e: MouseEvent) => { if (!navRef.current?.contains(e.target as Node)) setOpen(null); };
    document.addEventListener("mousedown", away);
    return () => document.removeEventListener("mousedown", away);
  }, []);

  return (
    <>
      {/* TODO: replace phone and email with the school's real details */}
      <div className="hidden bg-forest text-xs text-chalk/80 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
          <span>Igatpuri, Nashik district, Maharashtra</span>
          <div className="flex items-center gap-6">
            <a href="tel:+919421114666" className="flex items-center gap-1.5 hover:text-chalk"><Phone size={12} aria-hidden /> +91 94211 14666</a>
            <a href="mailto:office@panchvatischool.com" className="flex items-center gap-1.5 hover:text-chalk"><Mail size={12} aria-hidden /> office@panchvatischool.com</a>
            <a href="/#disclosure" className="hover:text-chalk">Mandatory disclosure</a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-board/10 bg-chalk/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
          {/* TODO: swap the monogram for the school logo */}
          <a href="/" className="flex items-center gap-3">
            {/* <span className="grid h-11 w-11 place-items-center rounded-full bg-forest font-serif text-2xl font-bold text-marigold">P</span> */}
            <img src="/logo.jpg" alt="Panchvati English Medium School logo" width={44} height={44} className="h-11 w-11 rounded-full object-cover" />
            <span className="font-serif text-xl font-bold leading-none text-forest md:text-2xl">
              Panchvati English Medium School
              <span className="mt-1 block font-sans text-[11px] font-medium tracking-wide text-board/60">Igatpuri</span>
            </span>
          </a>

          <nav ref={navRef} aria-label="Main" className="hidden items-center gap-1 lg:flex" onMouseLeave={() => setOpen(null)} onKeyDown={(e) => e.key === "Escape" && setOpen(null)}>
            {menus.map((m, i) => (
              <div key={m.label} className="relative" onMouseEnter={() => setOpen(i)}>
                <button
                  aria-expanded={open === i}
                  aria-haspopup="true"
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex items-center gap-1 rounded-full px-4 py-2 text-[15px] font-medium transition hover:bg-mist"
                >
                  {m.label}
                  <ChevronDown size={15} aria-hidden className={`transition-transform ${open === i ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-0 top-full pt-3"
                    >
                      <Panel menu={m} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            <a href="/#admissions" className="ml-3 rounded-full bg-forest px-6 py-2.5 text-[15px] font-semibold text-chalk transition hover:bg-marigold hover:text-board">
              Admissions
            </a>
          </nav>

          <button className="lg:hidden" aria-label={mobile ? "Close menu" : "Open menu"} aria-expanded={mobile} onClick={() => setMobile(!mobile)}>
            {mobile ? <X /> : <Menu />}
          </button>
        </div>

        <AnimatePresence>
          {mobile && (
            <motion.nav
              aria-label="Mobile"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="max-h-[calc(100vh-4.5rem)] overflow-y-auto border-t border-board/10 bg-chalk px-6 pb-6 lg:hidden"
            >
              {menus.map((m, i) => (
                <div key={m.label} className="border-b border-board/10">
                  <button aria-expanded={acc === i} onClick={() => setAcc(acc === i ? null : i)} className="flex w-full items-center justify-between py-4 text-lg font-medium">
                    {m.label}
                    <ChevronDown size={18} aria-hidden className={`transition-transform ${acc === i ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {acc === i && (
                      <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                        <div className="pb-3 pl-3">
                          {m.heading && <p className="pb-1 font-serif text-lg font-semibold text-leaf">{m.heading}</p>}
                          {m.items.map((it) => (
                            <div key={it.label}>
                              <a href={it.href} onClick={() => setMobile(false)} className="block py-2 text-board/80">{it.label}</a>
                              {it.sub?.map((s) => (
                                <a key={s.label} href={s.href} onClick={() => setMobile(false)} className="ml-4 block border-l-2 border-marigold py-1.5 pl-3 text-sm text-board/70">{s.label}</a>
                              ))}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              <a href="/#admissions" onClick={() => setMobile(false)} className="mt-5 block rounded-full bg-forest py-3 text-center font-semibold text-chalk">Admissions</a>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}