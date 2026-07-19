const features = [
  "OCR Text Recognition",
  "Rule-Based Field Extraction",
  "Template Builder",
  "Custom Extraction Rules",
  "Regex-Based Extraction",
  "Drag & Drop Upload",
  "Bulk Upload",
  "Email Parsing",
  "Batch Processing",
  "Barcode Reader",
  "QR Code Reader",
  "CSV Export",
  "Excel Export",
  "JSON Export",
  "XML Export",
  "Google Sheets Export",
  "REST API",
  "Webhook Support",
  "Search Documents",
  "Filter Documents",
  "Download Results",
];

export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-4 py-20 md:px-6">
      <div className="mb-10 max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">Built for structured extraction</h2>
        <p className="mt-4 text-slate-600">
          Everything in Extraxy is designed around deterministic document processing: OCR, templates, rules, regex, and exports.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {features.map((item) => (
          <div key={item} className="rounded-3xl border border-white bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
            <div className="h-10 w-10 rounded-2xl bg-emerald-50" />
            <div className="mt-4 font-semibold text-slate-900">{item}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
