const plans = [
  {
    name: "Starter",
    inr: 1499,
    usd: 18,
    features: ["100 documents/month", "CSV export", "Email support"],
  },
  {
    name: "Professional",
    inr: 4999,
    usd: 59,
    features: ["1,000 documents/month", "All exports", "Templates", "API access"],
    popular: true,
  },
  {
    name: "Business",
    inr: 12999,
    usd: 149,
    features: ["10,000 documents/month", "Webhook support", "Priority support"],
  },
  {
    name: "Enterprise",
    inr: null,
    usd: null,
    features: ["Unlimited scale", "Dedicated onboarding", "SLA", "Advanced security"],
  },
];

function formatPrice(value, currency) {
  if (value === null) return "Custom";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export default function Pricing() {
  return (
    <section id="pricing" className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Pricing
          </h2>
          <p className="mt-4 text-slate-600">
            Choose a plan that fits your team. Prices are shown in both INR and USD for easy comparison.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-[28px] border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${
                plan.popular ? "border-[#0E7C66]" : "border-slate-100"
              }`}
            >
              {plan.popular && (
                <div className="mb-4 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-[#0E7C66]">
                  Most Popular
                </div>
              )}

              <div className="text-lg font-bold text-slate-900">{plan.name}</div>

              <div className="mt-4 space-y-1">
                <div className="text-3xl font-black text-[#0E7C66]">
                  {formatPrice(plan.inr, "INR")}
                </div>
                <div className="text-sm text-slate-500">
                  {plan.usd ? `${formatPrice(plan.usd, "USD")} / month` : "Custom quote"}
                </div>
              </div>

              <ul className="mt-5 space-y-3 text-sm text-slate-600">
                {plan.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>

              <button className="mt-6 w-full rounded-full bg-gradient-to-r from-[#0E7C66] to-[#22C55E] px-4 py-3 font-semibold text-white shadow-lg shadow-emerald-200 transition hover:scale-[1.02]">
                {plan.name === "Enterprise" ? "Contact Sales" : "Choose Plan"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
