import { Instagram } from 'lucide-react';
import { serviceGalleryImages } from '../data/serviceGalleryImages';

export default function ServicesGallery() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-mystic-cream/30 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-mystic-purple dark:text-mystic-rose mb-4 font-serif">
            Services Gallery
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore our complete range of tarot reading services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {serviceGalleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white dark:bg-gray-800"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={image.imagePath}
                  alt={`${image.category} - ${image.label}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2 font-serif">{image.category}</h3>
                  <p className="text-sm opacity-90">{image.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
            Ready to book your reading?
          </p>
          <a
            href="https://instagram.com/MysticMoonWithIshita"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-mystic-purple to-mystic-rose text-white rounded-full hover:shadow-xl hover:shadow-mystic-purple/40 transition-all duration-300 font-semibold text-lg transform hover:scale-105"
          >
            <Instagram className="w-6 h-6" />
            Schedule Your Reading
          </a>
        </div>
      </div>
    </section>
  );
}
