// TODO: replace placeholder copy with the school's own vision, mission and philosophy.
export default function About() {
  return (
    <section id="about" className="bg-mist">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-2">
        <h2 className="text-4xl font-semibold text-forest md:text-5xl">A school rooted in its hills.</h2>
        <dl className="space-y-8 text-lg leading-relaxed">
          <div>
            <dt className="font-display text-xl font-semibold">Vision</dt>
            <dd className="mt-1">Inspiring young minds and shaping better futures. Replace with the school&apos;s vision statement.</dd>
          </div>
          <div>
            <dt className="font-display text-xl font-semibold">Mission</dt>
            <dd className="mt-1">Replace with the school&apos;s mission statement and educational philosophy.</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}