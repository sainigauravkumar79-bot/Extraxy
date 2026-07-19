const faqs = [
  ["Supported file formats", "PDF, JPG, PNG, JPEG, and scanned document images."],
  ["OCR accuracy", "Accuracy depends on scan quality, templates, and field rules."],
  ["Export formats", "CSV, Excel, JSON, XML, Google Sheets, API."],
  ["API usage", "REST API and webhooks for workflow integration."],
  ["Security", "Encryption, access control, backups, and audit logs."],
  ["Pricing", "Monthly plans plus enterprise custom pricing."],
];

export default function FAQ() {
  return (
    <section id="faq" className="mx-auto max-w-7xl px-4 py-20 md:px-6">
      <h2 className="text-3xl font-bold tracking-tight">FAQ</h2>
      <div className="mt-8 space-y-4">
        {faqs.map(([q, a]) => (
          <div key={q} className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="font-semibold">{q}</div>
            <div className="mt-2 text-slate-600">{a}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
