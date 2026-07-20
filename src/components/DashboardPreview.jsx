export default function DashboardPreview() {
  return (
    <section id="dashboard" className="mx-auto max-w-7xl px-4 py-20 md:px-6">
      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-[28px] border border-white bg-white p-5 shadow-sm">
          <div className="text-sm font-semibold text-slate-500">Sidebar</div>
          <div className="mt-4 space-y-2 text-sm">
            {["Dashboard", "Documents", "Templates", "Extraction Rules", "Exports", "API", "Analytics", "Billing", "Settings"].map((item) => (
              <div key={item} className="rounded-2xl px-4 py-3 text-slate-700 transition hover:bg-emerald-50 hover:text-[#0E7C66]">
                {item}
              </div>
            ))}
          </div>
        </aside>

        <div className="rounded-[28px] border border-white bg-white p-6 shadow-sm">
          <h2 className="text-3xl font-bold tracking-tight">Main Dashboard</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {[
              ["Recent Documents", "128"],
              ["Processing Queue", "19"],
              ["Storage Usage", "68%"],
              ["Recent Exports", "42"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-3xl bg-slate-50 p-5">
                <div className="text-sm text-slate-500">{label}</div>
                <div className="mt-3 text-3xl font-black text-slate-900">{value}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className="rounded-3xl bg-slate-50 p-5">
              <div className="font-semibold">Processing Queue</div>
              <div className="mt-4 space-y-3">
                {["Invoice_0987.pdf", "Receipt_2024.png", "BankStatement_Aug.pdf"].map((doc) => (
                  <div key={doc} className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm">
                    <span>{doc}</span>
                    <span className="text-emerald-600">Done</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <div className="font-semibold">Recent Exports</div>
              <div className="mt-4 space-y-3">
                {["invoices.csv", "vendors.xlsx", "payments.json"].map((file) => (
                  <div key={file} className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm">
                    <span>{file}</span>
                    <button className="text-[#0E7C66]">Download</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
