const items = ["AES-256 Encryption", "Secure Cloud Storage", "Role-Based Access", "Automatic Backup", "Audit Logs", "API Security"];

export default function Security() {
  return (
    <section id="contact" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <h2 className="text-3xl font-bold tracking-tight">Security</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item} className="rounded-3xl border border-slate-100 bg-slate-50 p-5 shadow-sm">{item}</div>
          ))}
        </div>
      </div>
    </section>
  );
}
