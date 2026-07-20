const testimonials = [
  {
    name: "Aarav Mehta",
    role: "Finance Manager",
    text: "Extraxy cut our invoice processing time by more than half and made exports easy.",
  },
  {
    name: "Priya Sharma",
    role: "Operations Lead",
    text: "The template builder and regex rules are exactly what we needed for our documents.",
  },
  {
    name: "Daniel Ross",
    role: "Founder",
    text: "Clean UI, fast uploads, and structured outputs. Great for internal workflows.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Testimonials
          </h2>
          <p className="mt-4 text-slate-600">
            What teams say after using Extraxy for rule-based document extraction.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {testimonials.map((item) => (
            <div key={item.name} className="rounded-[28px] border border-slate-100 bg-white p-6 shadow-sm">
              <div className="text-slate-700">“{item.text}”</div>
              <div className="mt-6 font-semibold text-slate-900">{item.name}</div>
              <div className="text-sm text-slate-500">{item.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
