// available:false items were marked missing in the client's OASIS checklist.
// Later: load this list from Supabase so staff can upload documents themselves.
const docs: { name: string; available: boolean; href?: string }[] = [
  { name: "Curriculum", available: true },
  { name: "Prescribed books", available: true },
  { name: "School Managing Committee", available: true },
  { name: "Annual report", available: true, href: "/annual-report" },
  { name: "Teacher details and qualifications", available: true },
  { name: "Infrastructure", available: true },
  { name: "Class-wise student strength", available: true },
  { name: "School contact details", available: true },
  { name: "Self affidavit", available: true },
  { name: "Transfer certificate sample", available: false },
  { name: "School circulars", available: false },
  { name: "Fee structure", available: false },
  { name: "Affiliation status and period", available: false },
  { name: "Academic calendar", available: false },
];

export default function Disclosure() {
  return (
    <section id="disclosure" className="mx-auto max-w-6xl px-5 py-20">
      <h2 className="text-4xl font-semibold text-forest md:text-5xl">Mandatory public disclosure</h2>
      <p className="mt-4 max-w-xl text-lg">Information every CBSE school must publish. Documents marked pending will be added soon.</p>
      <ul className="mt-10 grid gap-x-12 md:grid-cols-2">
        {docs.map((d) => (
          <li key={d.name} className="flex items-center justify-between border-b border-board/15 py-4">
            <span className="font-display font-medium">{d.name}</span>
            {d.available ? (
              <a href={d.href ?? "#"} className="font-display text-sm font-semibold text-leaf underline underline-offset-4">View</a>
            ) : (
              <span className="text-sm text-board/60">Pending</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}