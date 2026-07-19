export default function TemplateBuilder() {
  return (
    <section id="resources" className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Template Builder</h2>
            <p className="mt-4 text-slate-600">
              Create reusable extraction templates for invoices, receipts, bank statements, forms, and other document types.
            </p>
            <div className="mt-6 space-y-3">
              {["Select field", "Draw field area", "Save template", "Reuse template"].map((item, i) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-sm font-bold text-[#0E7C66]">{i + 1}</div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[28px] border border-white bg-white p-6 shadow-sm">
            <div className="rounded-[24px] bg-slate-100 p-5">
              <div className="rounded-2xl border-2 border-dashed border-[#0E7C66] bg-white p-5">
                <div className="text-sm font-semibold text-[#0E7C66]">Invoice Template</div>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {["Invoice Number", "Date", "Vendor", "Customer", "Subtotal", "Tax", "Total", "Email"].map((field) => (
                    <div key={field} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                      {field}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
