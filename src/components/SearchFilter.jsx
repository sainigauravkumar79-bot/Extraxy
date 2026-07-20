const filters = ["Invoice Number", "Customer", "Vendor", "Date", "Amount", "File Name", "Document Type"];

export default function SearchFilter() {
  return (
    <section id="api" className="mx-auto max-w-7xl px-4 py-20 md:px-6">
      <div className="rounded-[28px] bg-slate-900 p-8 text-white md:p-10">
        <h2 className="text-3xl font-bold tracking-tight">Search & Filter</h2>
        <p className="mt-3 max-w-2xl text-slate-300">Find any document instantly using structured fields, names, dates, or document type.</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {filters.map((item) => (
            <span key={item} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
