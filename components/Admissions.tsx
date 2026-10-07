const steps = [
  { title: "Enquiry", text: "Call or write to the school office." },
  { title: "Eligibility", text: "Check the age and class requirements." },
  { title: "Application", text: "Fill in and submit the admission form." },
  { title: "Documents", text: "Submit the required certificates for verification." },
  { title: "Admission", text: "Confirm the seat and pay the fees." },
];

export default function Admissions() {
  return (
    <section id="admissions" className="bg-forest text-chalk">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="text-4xl font-semibold md:text-5xl">Admissions</h2>
        <ol className="mt-10 grid gap-6 md:grid-cols-5">
          {steps.map((s, i) => (
            <li key={s.title} className="border-t-2 border-marigold pt-4">
              <span className="font-display text-sm text-marigold">Step {i + 1}</span>
              <h3 className="mt-1 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-chalk/80">{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-wrap gap-3">
          <a href="#" className="rounded-full bg-marigold px-6 py-3 font-display font-semibold text-board">Download admission form</a>
          <a href="#contact" className="rounded-full border border-chalk/40 px-6 py-3 font-display font-semibold">Contact the school office</a>
        </div>
      </div>
    </section>
  );
}