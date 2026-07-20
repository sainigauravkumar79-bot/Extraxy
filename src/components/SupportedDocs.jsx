const docs = [
  "Invoices",
  "Receipts",
  "Bank Statements",
  "Purchase Orders",
  "Contracts",
  "Forms",
  "Shipping Labels",
  "Resumes",
  "Identity Cards",
  "Bills",
  "Scanned PDFs",
  "Images",
];

export default function SupportedDocs() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Supported Documents
        </h2>
        <p className="mt-4 text-slate-600">
          Extraxy works with common business and identity documents in scanned and digital formats.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {docs.map((doc) => (
          <div
            key={doc}
            className="rounded-3xl border border-slate-100 bg-white p-5 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            {doc}
          </div>
        ))}
      </div>
    </section>
  );
}
