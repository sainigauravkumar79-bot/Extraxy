import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SupportedDocs from "./components/SupportedDocs";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import DashboardPreview from "./components/DashboardPreview";
import TemplateBuilder from "./components/TemplateBuilder";
import SearchFilter from "./components/SearchFilter";
import Security from "./components/Security";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <main>
        <Hero />
        <SupportedDocs />
        <Features />
        <HowItWorks />
        <DashboardPreview />
        <TemplateBuilder />
        <SearchFilter />
        <Security />
        <Pricing />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
