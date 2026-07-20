const menu = ["Home", "Features", "Solutions", "Pricing", "API", "Resources", "FAQ", "Contact"];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/50 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0E7C66] to-[#22C55E] text-white shadow-lg shadow-emerald-200">
            <span className="text-xl font-black">X</span>
          </div>
          <div>
            <div className="text-lg font-bold tracking-tight">Extraxy</div>
            <div className="text-xs text-slate-500">Smart Document Data Extraction</div>
          </div>
        </div>

        <nav className="hidden items-center gap-6 text-sm text-slate-600 lg:flex">
          {menu.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="transition hover:text-[#0E7C66]">
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-[#0E7C66] hover:text-[#0E7C66]">
            Sign In
          </button>
          <button className="rounded-full bg-gradient-to-r from-[#0E7C66] to-[#22C55E] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition hover:scale-[1.02]">
            Start Free
          </button>
        </div>
      </div>
    </header>
  );
}
