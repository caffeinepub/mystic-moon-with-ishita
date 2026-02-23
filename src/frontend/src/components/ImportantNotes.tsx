import { Card, CardContent } from './ui/card';

export default function ImportantNotes() {
  const notes = [
    {
      emoji: '⏳',
      text: 'Delivery within 24-48 hours',
    },
    {
      emoji: '🎧',
      secondEmoji: '📄',
      text: 'Voice / Written (as per package)',
    },
    {
      emoji: '❌',
      text: 'No health, legal, pregnancy predictions',
    },
    {
      emoji: '🔒',
      text: '100% confidential & intuitive reading',
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-mystic-cream/30 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-3xl transform rotate-45">📌</span>
            <h2 className="text-3xl font-bold text-mystic-purple dark:text-mystic-rose font-serif">
              Important Notes
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {notes.map((note, index) => (
            <Card
              key={index}
              className="border-mystic-purple/20 hover:border-mystic-purple/40 transition-all duration-300 hover:shadow-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 text-3xl">
                    {note.secondEmoji ? (
                      <div className="flex items-center gap-1">
                        <span>{note.emoji}</span>
                        <span className="text-gray-400 text-xl">/</span>
                        <span>{note.secondEmoji}</span>
                      </div>
                    ) : (
                      <span>{note.emoji}</span>
                    )}
                  </div>
                  <p className="text-gray-700 dark:text-gray-200 text-base leading-relaxed pt-1">
                    {note.text}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 italic">
            All readings are delivered with care and respect for your privacy
          </p>
        </div>
      </div>
    </section>
  );
}
