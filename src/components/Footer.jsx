export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:px-6 lg:grid-cols-4">
        <div>
          <div className="text-xl font-black">Extraxy</div>
          <p className="mt-3 text-sm text-slate-600">Smart Document Data Extraction</p>
        </div>
        {["Product", "Solutions", "Company", "Support"].map((title) => (
          <div key={title}>
            <div className="font-semibold">{title}</div>
            <div className="mt-3 space-y-2 text-sm text-slate-600">
              <div>Pricing</div>
              <div>API</div>
              <div>Privacy Policy</div>
              <div>Terms of Service</div>
              <div>Cookie Policy</div>
            </div>
          </div>
        ))}
      </div>
    </footer>
  );
}
