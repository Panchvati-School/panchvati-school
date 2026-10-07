"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { ImageOff, Play, X } from "lucide-react";

type Item = { type: "photo" | "video" | "sphere"; title: string; src?: string; url?: string; thumb?: string };

// TODO: SAMPLE data. Photos: add `src: "/gallery/annual-day.jpg"` (file in /public/gallery).
// Videos: add entries like
//   { type: "video", title: "Annual day 2025", url: "https://www.youtube.com/watch?v=XXXXXXXXXXX" }
//   { type: "video", title: "Sports meet", url: "/gallery/sports.mp4", thumb: "/gallery/sports.jpg" }
// 360 views (Google Maps photo sphere): in Google Maps open the sphere, click Share, then "Embed a map",
// and paste either the whole <iframe ...> code or just its src URL:
//   { type: "sphere", title: "School ground 360", url: "https://www.google.com/maps/embed?pb=!4v..." }
// YouTube links (watch, youtu.be, embed, shorts) open in the dialog; any other link plays as a video file.
const items: Item[] = [
  {
    type: "video",
    title: "Panchvati English Medium School",
    url: "https://www.youtube.com/watch?v=6s4XsiVwFjY",
  },
  {
    type: "video",
    title: "Annual Day 2023 part 1",
    url: "https://www.youtube.com/watch?v=OZH3WaOfAys",
  },
  {
    type: "video",
    title: "Annual Day 2023 Part 2",
    url: "https://www.youtube.com/watch?v=iIUYhOwyW54",
  },
  {
    type: "video",
    title: "Christmas Celebration 2022",
    url: "https://www.youtube.com/watch?v=2RNB-8v9XHo",
  },
  {
    type: "video",
    title: "ANNUAL SPORTS MEET 2022-23",
    url: "https://www.youtube.com/watch?v=-yWMAM0Wgdg",
  },
  {
    type: "video",
    title: "Ashadi Ekadashi 2022-23",
    url: "https://www.youtube.com/watch?v=p7L1kytZ3JE",
  },
  {
    type: "video",
    title: "Annual Day 2020",
    url: "https://www.youtube.com/watch?v=NuZ08XEG7EI",
  },

  { type: "photo", title: "Sports Day - Tug Of War", src: "/gallery/1.jpg" },
  { type: "photo", title: "Children's Ground", src: "/gallery/2.jpg" },
  { type: "photo", title: "Chemistry Lab", src: "/gallery/3.jpg" },
  { type: "photo", title: "Assembly Hall", src: "/gallery/4.webp" },
  { type: "photo", title: "Sports Day", src: "/gallery/5.jpg" },

  { type: "sphere", title: "School ground 360", url: "https://www.google.com/maps/embed?pb=!4v1791375388989!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJRHE1Zlg0NkFF!2m2!1d19.70241856276674!2d73.6079071441194!3f91.41875741045139!4f-5.874876620905653!5f0.7820865974627469" },
  { type: "sphere", title: "Main gate 360", url: "https://www.google.com/maps/embed?pb=!4v1791375521221!6m8!1m7!1siDQdsiqnU0wHw5Gug-jfGg!2m2!1d19.70249363904566!2d73.60765369607535!3f155.8832316684116!4f-16.71087624895759!5f0.7820865974627469" },
  { type: "sphere", title: "Staff Room 360", url: "https://www.google.com/maps/embed?pb=!4v1791375632462!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJRHE1Zlg0MkFF!2m2!1d19.70223837440318!2d73.6081178264999!3f1.0581809158057354!4f-15.455726520225554!5f1.3027868818248576" },
];

const ease = [0.22, 1, 0.36, 1] as const;
const tabs = [
  { id: "all", label: "All" },
  { id: "photo", label: "Photos" },
  { id: "video", label: "Videos" },
  { id: "sphere", label: "360° views" },
] as const;
type Tab = (typeof tabs)[number]["id"];

const placeholder =
  "repeating-radial-gradient(circle at 50% 100%, rgba(251,252,250,.10) 0 2px, transparent 2px 26px), linear-gradient(165deg, #2f7d57, #0f3d2e)";

function parseVideo(url?: string) {
  if (!url) return null;
  const yt = url.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
  if (yt) return { kind: "youtube" as const, id: yt[1] };
  if (/^https?:\/\/.+/i.test(url) || url.startsWith("/")) return { kind: "file" as const, url };
  return null;
}

// Accepts a full <iframe> snippet or a Google Maps embed URL. Anything else is rejected.
function parseSphere(input?: string) {
  if (!input) return null;
  const src = input.match(/src=["']([^"']+)["']/)?.[1] ?? input.trim();
  return /^https:\/\/www\.google\.com\/maps\/embed/.test(src) ? src.replace(/&amp;/g, "&") : null;
}

function thumbOf(item: Item) {
  if (item.type === "photo") return item.src;
  if (item.thumb) return item.thumb;
  const v = parseVideo(item.url);
  return v?.kind === "youtube" ? `https://img.youtube.com/vi/${v.id}/hqdefault.jpg` : undefined;
}

function NotFound({ message }: { message: string }) {
  return (
    <div role="status" className="flex flex-col items-center rounded-3xl bg-mist px-6 py-20 text-center">
      <ImageOff size={40} aria-hidden className="text-leaf" />
      <h2 className="mt-4 text-3xl font-bold text-forest">Not found</h2>
      <p className="mt-2 max-w-sm text-board/70">{message}</p>
    </div>
  );
}

function Dialog({ item, onClose }: { item: Item; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [failed, setFailed] = useState(false);
  const video = item.type === "video" ? parseVideo(item.url) : null;
  const sphere = item.type === "sphere" ? parseSphere(item.url) : null;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-board/90 p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.92, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.35, ease }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl"
      >
        <button ref={closeRef} onClick={onClose} aria-label="Close" className="absolute -top-12 right-0 rounded-full p-2 text-chalk hover:bg-chalk/15">
          <X />
        </button>
        <div className="aspect-video overflow-hidden rounded-2xl bg-board">
          {item.type === "photo" ? (
            item.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.src} alt={item.title} className="h-full w-full object-contain" />
            ) : (
              <div className="h-full w-full" style={{ backgroundImage: placeholder }} />
            )
          ) : item.type === "sphere" ? (
            sphere ? (
              <iframe className="h-full w-full" src={sphere} title={item.title} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" />
            ) : (
              <div className="grid h-full place-items-center bg-mist"><NotFound message="This 360° view is not available right now." /></div>
            )
          ) : !video || failed ? (
            <div className="grid h-full place-items-center bg-mist"><NotFound message="This video is not available right now." /></div>
          ) : video.kind === "youtube" ? (
            <iframe
              className="h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
              title={item.title}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          ) : (
            <video className="h-full w-full" src={video.url} controls autoPlay onError={() => setFailed(true)} />
          )}
        </div>
        <p className="mt-4 font-serif text-2xl font-semibold text-chalk">{item.title}</p>
      </motion.div>
    </motion.div>
  );
}

export default function GalleryView() {
  const [tab, setTab] = useState<Tab>("all");
  const [active, setActive] = useState<Item | null>(null);
  const shown = tab === "all" ? items : items.filter((i) => i.type === tab);
  const count = (id: Tab) => (id === "all" ? items.length : items.filter((i) => i.type === id).length);
  const ratios = ["aspect-[4/5]", "aspect-square", "aspect-[4/3]"];

  return (
    <MotionConfig reducedMotion="user">
      <section className="mx-auto max-w-7xl px-6 pb-24 pt-16 md:pt-24">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
          className="text-6xl font-semibold leading-[0.98] text-forest md:text-8xl"
        >
          Our gallery
        </motion.h1>
        <p className="mt-5 max-w-lg text-lg">Moments from classrooms, sports fields and celebrations at Panchvati.</p>

        <div role="tablist" aria-label="Gallery filter" className="mt-10 flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className="relative rounded-full px-6 py-2.5 font-semibold"
            >
              {tab === t.id && <motion.span layoutId="gallery-pill" className="absolute inset-0 rounded-full bg-forest" />}
              <span className={`relative ${tab === t.id ? "text-chalk" : "text-board"}`}>
                {t.label} <span className="opacity-60">{count(t.id)}</span>
              </span>
            </button>
          ))}
        </div>

        <div className="mt-12">
          <AnimatePresence mode="wait">
            <motion.div key={tab} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              {shown.length === 0 ? (
                <NotFound message={tab === "video" ? "No videos have been added yet. Please check back soon." : tab === "sphere" ? "No 360° views have been added yet. Please check back soon." : "Nothing has been added yet. Please check back soon."} />
              ) : (
                <ul className="columns-1 gap-5 sm:columns-2 lg:columns-3">
                  {shown.map((it, i) => {
                    const thumb = thumbOf(it);
                    return (
                      <motion.li
                        key={`${it.type}-${it.title}`}
                        initial={{ opacity: 0, scale: 0.94, y: 24 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: i * 0.06, ease }}
                        className="mb-5 break-inside-avoid"
                      >
                        <button onClick={() => setActive(it)} aria-label={`Open ${it.type}: ${it.title}`} className="group relative block w-full overflow-hidden rounded-2xl text-left">
                          <div
                            className={`w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105 ${it.type !== "photo" ? "aspect-video" : ratios[i % 3]}`}
                            style={{ backgroundImage: thumb ? `url(${thumb})` : placeholder }}
                          />
                          {it.type !== "photo" && (
                            <span className="absolute inset-0 grid place-items-center">
                              <span className="grid h-16 w-16 place-items-center rounded-full bg-marigold text-board shadow-lg transition group-hover:scale-110">
                                {it.type === "video" ? <Play fill="currentColor" aria-hidden /> : <span className="font-bold">360°</span>}
                              </span>
                            </span>
                          )}
                          <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-board/80 to-transparent p-4 pt-12 font-serif text-xl font-semibold text-chalk">
                            {it.title}
                          </span>
                        </button>
                      </motion.li>
                    );
                  })}
                </ul>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <AnimatePresence>{active && <Dialog item={active} onClose={() => setActive(null)} />}</AnimatePresence>
    </MotionConfig>
  );
}