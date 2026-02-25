import { useRef, useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import ServicesGallery from './components/ServicesGallery';
import ImportantNotes from './components/ImportantNotes';
import Reviews from './components/Reviews';
import ProductCatalog from './components/ProductCatalog';
import Appointment from './components/Appointment';
import Footer from './components/Footer';
import WishlistPanel from './components/WishlistPanel';
import CrystalOfTheDay from './components/CrystalOfTheDay';
import CrystalQuiz from './components/CrystalQuiz';
import CustomerGallery from './components/CustomerGallery';
import NewsletterSignup from './components/NewsletterSignup';

function App() {
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);
  const [selectedServicePrice, setSelectedServicePrice] = useState<number | undefined>(undefined);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [showNewsletterModal, setShowNewsletterModal] = useState(false);
  const appointmentRef = useRef<HTMLDivElement>(null);

  // Show newsletter modal after 15 seconds if not already subscribed
  useEffect(() => {
    const alreadySubscribed = localStorage.getItem('newsletterSubscribed');
    if (alreadySubscribed) return;

    const timer = setTimeout(() => {
      setShowNewsletterModal(true);
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  const handleBookNow = useCallback((serviceName: string, servicePrice: string) => {
    setSelectedService(serviceName);
    const parsed = parseInt(servicePrice.replace(/[^\d]/g, ''), 10);
    setSelectedServicePrice(isNaN(parsed) ? undefined : parsed);
    setTimeout(() => {
      const el = document.getElementById('appointment');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  }, []);

  const handleScrollToAppointment = useCallback(() => {
    const el = document.getElementById('appointment');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleClearService = useCallback(() => {
    setSelectedService(undefined);
    setSelectedServicePrice(undefined);
  }, []);

  const handleOpenWishlist = useCallback(() => {
    setIsWishlistOpen(true);
  }, []);

  const handleCloseWishlist = useCallback(() => {
    setIsWishlistOpen(false);
  }, []);

  const handleCloseNewsletterModal = useCallback(() => {
    setShowNewsletterModal(false);
  }, []);

  return (
    <div className="min-h-screen bg-crystal-gradient">
      {/* Subtle decorative background pattern */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Top-left moon glow */}
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, oklch(52% 0.12 230), transparent 70%)' }}
        />
        {/* Bottom-right crystal glow */}
        <div
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-8"
          style={{ background: 'radial-gradient(circle, oklch(78% 0.08 30), transparent 70%)' }}
        />
        {/* Center subtle shimmer */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, oklch(52% 0.12 230), transparent 60%)' }}
        />
      </div>

      <div className="relative z-10">
        <Header onOpenWishlist={handleOpenWishlist} />
        <main>
          <Hero />
          {/* Crystal of the Day — daily featured crystal */}
          <CrystalOfTheDay />
          {/* Crystal Quiz — find your perfect crystal */}
          <CrystalQuiz />
          <About />
          <Services onBookNow={handleBookNow} />
          <ServicesGallery />
          <div ref={appointmentRef}>
            <Appointment
              selectedService={selectedService}
              selectedServicePrice={selectedServicePrice}
              onClearService={handleClearService}
            />
          </div>
          <ImportantNotes />
          <Reviews />
          {/* Customer Gallery — Instagram-style unboxing photos */}
          <CustomerGallery />
          <ProductCatalog />
          {/* Newsletter Signup Banner */}
          <NewsletterSignup />
        </main>
        <Footer onBookReading={handleScrollToAppointment} />
      </div>

      {/* Wishlist Panel (rendered at root level to overlay everything) */}
      <WishlistPanel isOpen={isWishlistOpen} onClose={handleCloseWishlist} />

      {/* Newsletter Modal (timed, 15s after load) */}
      {showNewsletterModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'oklch(20% 0.05 230 / 0.65)', backdropFilter: 'blur(4px)' }}
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCloseNewsletterModal();
          }}
        >
          <div
            className="relative w-full max-w-md rounded-2xl p-8"
            style={{
              background: 'oklch(99% 0.005 80)',
              boxShadow: '0 20px 60px oklch(20% 0.05 230 / 0.4)',
              border: '1px solid oklch(72% 0.1 230 / 0.2)',
            }}
          >
            <NewsletterSignup isModal onClose={handleCloseNewsletterModal} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
