// TODO: replace the placeholders with the school's real address, phone and email.
export default function Footer() {
  return (
    <footer id="contact" className="bg-board text-chalk">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-semibold">Panchvati English Medium School</h2>
          <p className="mt-3 text-chalk/70">Igatpuri, Nashik district, Maharashtra</p>
        </div>
        <dl className="space-y-4">
          <div><dt className="text-sm text-chalk/60">Address</dt><dd> <a href="https://maps.app.goo.gl/YA67HiW1TLNERb9d7" target="_blank" rel="noopener noreferrer">
            Take-ghoti, Tal. Igatpuri, Dist. Nashik, Maharashtra Mumbai - Nashik, National Highway, beside Shagun Hotel, Igatpuri, Maharashtra 422402
          </a></dd></div>
          <div><dt className="text-sm text-chalk/60">Phone</dt><dd><a href="tel:+919421114666">+91 94211 14666</a></dd></div>
          <div><dt className="text-sm text-chalk/60">Email</dt><dd><a href="mailto:office@panchvatischool.com">office@panchvatischool.com</a></dd></div>
          <div><dt className="text-sm text-chalk/60">Office hours</dt><dd>Monday to Saturday, 9:00 am to 4:00 pm</dd></div>
        </dl>
      </div>
    </footer>
  );
}