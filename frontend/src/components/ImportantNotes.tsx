export default function ImportantNotes() {
  const notes = [
    {
      emoji: '⏳',
      title: 'Delivery Time',
      description: 'Delivery within 24–48 hours of booking confirmation.',
    },
    {
      emoji: '🎧',
      title: 'Format',
      description: 'Voice note or written reading — as per your chosen package.',
    },
    {
      emoji: '❌',
      title: 'Restrictions',
      description: 'No health, legal, or pregnancy predictions are offered.',
    },
    {
      emoji: '🔒',
      title: 'Confidentiality',
      description: '100% confidential & intuitive reading — your privacy is sacred.',
    },
  ];

  return (
    <section className="py-20 md:py-28"
      style={{ background: 'linear-gradient(180deg, oklch(97% 0.008 80) 0%, oklch(94% 0.02 220) 100%)' }}>
      <div className="max-w-5xl mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-16" style={{ background: 'oklch(52% 0.12 230 / 0.4)' }} />
            <span className="font-body text-sm tracking-widest uppercase" style={{ color: 'oklch(52% 0.12 230)' }}>
              ✦ Please Note ✦
            </span>
            <div className="h-px w-16" style={{ background: 'oklch(52% 0.12 230 / 0.4)' }} />
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold" style={{ color: 'oklch(52% 0.12 230)' }}>
            📌 Important Notes
          </h2>
        </div>

        {/* Notes grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {notes.map((note) => (
            <div
              key={note.title}
              className="rounded-2xl p-6 text-center crystal-card transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-4xl mb-4">{note.emoji}</div>
              <h3 className="font-display text-base font-bold mb-2" style={{ color: 'oklch(52% 0.12 230)' }}>
                {note.title}
              </h3>
              <p className="font-body text-base leading-relaxed" style={{ color: 'oklch(35% 0.06 240)' }}>
                {note.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
