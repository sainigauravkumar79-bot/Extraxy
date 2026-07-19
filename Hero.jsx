export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(14,124,102,0.12),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(34,197,94,0.12),_transparent_30%)]" />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 md:px-6 lg:grid-cols-2 lg:py-28">
        <div className="relative z-10 flex flex-col justify-center">
          <span className="mb-5 inline-flex w-fit items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
            OCR + Rules + Templates + Regex
          </span>
          <h1 className="max-w-2xl text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
            Extract Data From Documents in Seconds
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Upload invoices, receipts, PDFs, bank statements, forms, contracts, resumes, emails, and scanned documents. Extraxy extracts structured data using OCR and rule-based document parsing without AI.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button className="rounded-full bg-gradient-to-r from-[#0E7C66] to-[#22C55E] px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-200 transition hover:scale-[1.02]">
              Start Free
            </button>
            <button className="rounded-full border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:border-[#0E7C66] hover:text-[#0E7C66]">
              Book Demo
            </button>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-2 gap-4 text-sm text-slate-600 md:grid-cols-5">
            {["Upload", "OCR", "Extract Fields", "Excel", "CSV / JSON / XML"].map((item, i) => (
              <div key={item} className="rounded-2xl border border-white bg-white/80 p-4 shadow-sm">
                <div className="font-semibold text-slate-900">{item}</div>
                <div className="mt-1 text-xs text-slate-500">{i < 3 ? "Step" : "Export"}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <div className="rounded-[28px] border border-white bg-white/80 p-5 shadow-2xl shadow-slate-200 backdrop-blur">
            <div className="rounded-[24px] bg-slate-900 p-5 text-white">
              <div className="mb-4 flex items-center justify-between">
                <div className="text-sm font-semibold text-slate-300">Document Pipeline</div>
                <div className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs text-emerald-300">Live</div>
              </div>
              <div className="grid gap-4 md:grid-cols-4">
                {["Upload", "OCR", "Rules", "Export"].map((step) => (
                  <div key={step} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-sm font-semibold">{step}</div>
                    <div className="mt-2 h-2 rounded-full bg-white/10">
                      <div className="h-2 rounded-full bg-gradient-to-r from-[#0E7C66] to-[#22C55E]" style={{ width: "70%" }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-2xl bg-slate-950 p-4 text-xs text-slate-300">
                Invoice Number: INV-20481<br />
                Vendor: Northstar Traders<br />
                Customer: Orion Retail<br />
                Grand Total: ₹48,250.00
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
