const steps = [
  {
    title: "Upload Document",
    points: ["PDF", "JPG", "PNG", "JPEG"],
  },
  {
    title: "OCR + Parsing",
    points: ["Invoice Number", "Date", "Vendor", "Customer", "Address", "Items", "Tax", "Subtotal", "Grand Total", "Phone", "Email"],
  },
  {
    title: "Export Data",
    points: ["Excel", "CSV", "JSON", "XML", "Google Sheets", "API"],
  },
];

export default function HowItWorks() {
  return (
    <section id="solutions" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">How it works</h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {steps.map((step, idx) => (
            <div key={step.title} className="rounded-[28px] border border-slate-100 bg-slate-50 p-6 shadow-sm">
              <div className="text-sm font-semibold text-[#0E7C66]">Step {idx + 1}</div>
              <h3 className="mt-2 text-xl font-bold text-slate-900">{step.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {step.points.map((point) => (
                  <span key={point} className="rounded-full bg-white px-3 py-1 text-sm text-slate-600 shadow-sm">
                    {point}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
