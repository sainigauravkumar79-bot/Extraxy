const plans = [
  { name: "Starter", price: "₹1,499", features: ["100 documents/month", "CSV export", "Email support"] },
  { name: "Professional", price: "₹4,999", features: ["1,000 documents/month", "All exports", "Templates", "API access"] },
  { name: "Business", price: "₹12,999", features: ["10,000 documents/month", "Webhook support", "Priority support"] },
  { name: "Enterprise", price: "Custom", features: ["Unlimited scale", "Dedicated onboarding", "SLA", "Advanced security"] },
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <h2 className="text-3xl font-bold tracking-tight">Pricing</h2>
        <div className="mt-8 grid gap-5 lg:grid-cols-4">
          {plans.map((plan) => (
            <div key={plan.name} className="rounded-[28px] border border-white bg-white p-6 shadow-sm">
              <div className="text-lg font-bold">{plan.name}</div>
              <div className="mt-3 text-3xl font-black text-[#0E7C66]">{plan.price}</div>
              <ul className="mt-5 space-y-3 text-sm text-slate-600">
                {plan.features.map((f) => <li key={f}>• {f}</li>)}
              </ul>
              <button className="mt-6 w-full rounded-full bg-slate-900 px-4 py-3 font-semibold text-white">
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
