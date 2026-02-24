import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import ServicesGallery from './components/ServicesGallery';
import ImportantNotes from './components/ImportantNotes';
import Reviews from './components/Reviews';
import ProductCatalog from './components/ProductCatalog';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-crystal-gradient">
      {/* Subtle decorative background pattern */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Top-left moon glow */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, oklch(52% 0.12 230), transparent 70%)' }} />
        {/* Bottom-right crystal glow */}
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-8"
          style={{ background: 'radial-gradient(circle, oklch(78% 0.08 30), transparent 70%)' }} />
        {/* Center subtle shimmer */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, oklch(52% 0.12 230), transparent 60%)' }} />
      </div>

      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <About />
          <Services />
          <ServicesGallery />
          <ImportantNotes />
          <Reviews />
          <ProductCatalog />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
