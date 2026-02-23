import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Reviews from './components/Reviews';
import ProductCatalog from './components/ProductCatalog';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-mystic-cream to-white dark:from-gray-900 dark:to-gray-800">
      <Hero />
      <About />
      <Services />
      <Reviews />
      <ProductCatalog />
      <Footer />
    </div>
  );
}

export default App;
