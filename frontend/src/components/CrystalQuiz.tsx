import React, { useState } from 'react';
import { Sparkles, X, RotateCcw, ChevronRight, ChevronLeft } from 'lucide-react';
import { products } from '../data/products';
import { ProductType } from '../backend';
import { formatPrice, calculateHoliPrice, HOLI_PROMO_ACTIVE } from '../utils/pricing';
import { useLoyaltyPoints } from '../hooks/useLoyaltyPoints';

interface QuizQuestion {
  id: string;
  question: string;
  options: { label: string; value: string; emoji: string }[];
}

const QUESTIONS: QuizQuestion[] = [
  {
    id: 'zodiac',
    question: 'What is your zodiac sign?',
    options: [
      { label: 'Aries', value: 'aries', emoji: '♈' },
      { label: 'Taurus', value: 'taurus', emoji: '♉' },
      { label: 'Gemini', value: 'gemini', emoji: '♊' },
      { label: 'Cancer', value: 'cancer', emoji: '♋' },
      { label: 'Leo', value: 'leo', emoji: '♌' },
      { label: 'Virgo', value: 'virgo', emoji: '♍' },
      { label: 'Libra', value: 'libra', emoji: '♎' },
      { label: 'Scorpio', value: 'scorpio', emoji: '♏' },
      { label: 'Sagittarius', value: 'sagittarius', emoji: '♐' },
      { label: 'Capricorn', value: 'capricorn', emoji: '♑' },
      { label: 'Aquarius', value: 'aquarius', emoji: '♒' },
      { label: 'Pisces', value: 'pisces', emoji: '♓' },
    ],
  },
  {
    id: 'mood',
    question: 'How are you feeling right now?',
    options: [
      { label: 'Peaceful', value: 'peaceful', emoji: '🕊️' },
      { label: 'Energized', value: 'energized', emoji: '⚡' },
      { label: 'Stressed', value: 'stressed', emoji: '😮‍💨' },
      { label: 'Loving', value: 'loving', emoji: '💕' },
      { label: 'Focused', value: 'focused', emoji: '🎯' },
    ],
  },
  {
    id: 'intention',
    question: 'What do you seek most right now?',
    options: [
      { label: 'Healing', value: 'healing', emoji: '🌿' },
      { label: 'Love', value: 'love', emoji: '💖' },
      { label: 'Protection', value: 'protection', emoji: '🛡️' },
      { label: 'Abundance', value: 'abundance', emoji: '✨' },
      { label: 'Clarity', value: 'clarity', emoji: '🔮' },
    ],
  },
];

// Scoring map: maps answer values to crystal IDs with scores
const CRYSTAL_SCORES: Record<string, Record<string, number>> = {
  // Zodiac
  aries: { 'carnelian-bracelet': 3, 'tiger-eye-bracelet': 3, 'clear-quartz-point': 2 },
  taurus: { 'rose-quartz-tumbled': 3, 'green-aventurine': 3, 'labradorite': 2 },
  gemini: { 'clear-quartz-point': 3, 'fluorite-raw': 3, 'labradorite': 2 },
  cancer: { 'moonstone-bracelet': 3, 'rose-quartz-tumbled': 3, 'selenite-wand': 2 },
  leo: { 'citrine-cluster': 3, 'carnelian-bracelet': 3, 'tiger-eye-bracelet': 2 },
  virgo: { 'fluorite-raw': 3, 'clear-quartz-point': 3, 'green-aventurine': 2 },
  libra: { 'rose-quartz-tumbled': 3, 'labradorite': 3, 'lapis-lazuli': 2 },
  scorpio: { 'labradorite': 3, 'black-tourmaline': 3, 'amethyst-cluster': 2 },
  sagittarius: { 'labradorite': 3, 'citrine-cluster': 3, 'clear-quartz-point': 2 },
  capricorn: { 'black-tourmaline': 3, 'green-aventurine': 3, 'citrine-cluster': 2 },
  aquarius: { 'amethyst-cluster': 3, 'labradorite': 3, 'clear-quartz-point': 2 },
  pisces: { 'amethyst-cluster': 3, 'moonstone-bracelet': 3, 'selenite-wand': 2 },
  // Mood
  peaceful: { 'amethyst-cluster': 3, 'selenite-wand': 3, 'rose-quartz-tumbled': 2 },
  energized: { 'carnelian-bracelet': 3, 'citrine-cluster': 3, 'tiger-eye-bracelet': 2 },
  stressed: { 'black-tourmaline': 3, 'amethyst-cluster': 3, 'selenite-wand': 2 },
  loving: { 'rose-quartz-tumbled': 3, 'moonstone-bracelet': 3, 'labradorite': 2 },
  focused: { 'clear-quartz-point': 3, 'fluorite-raw': 3, 'lapis-lazuli': 2 },
  // Intention
  healing: { 'clear-quartz-point': 3, 'amethyst-cluster': 3, 'selenite-wand': 2 },
  love: { 'rose-quartz-tumbled': 3, 'moonstone-bracelet': 3, 'labradorite': 2 },
  protection: { 'black-tourmaline': 3, 'black-onyx-bracelet': 3, 'labradorite': 2 },
  abundance: { 'citrine-cluster': 3, 'green-aventurine': 3, 'tiger-eye-bracelet': 2 },
  clarity: { 'clear-quartz-point': 3, 'lapis-lazuli': 3, 'fluorite-raw': 2 },
};

function getRecommendations(answers: Record<string, string>): string[] {
  const scores: Record<string, number> = {};

  Object.values(answers).forEach((answer) => {
    const crystalScores = CRYSTAL_SCORES[answer] || {};
    Object.entries(crystalScores).forEach(([crystalId, score]) => {
      scores[crystalId] = (scores[crystalId] || 0) + score;
    });
  });

  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([id]) => id);
}

export default function CrystalQuiz() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const { awardQuizPoints } = useLoyaltyPoints();

  const currentQuestion = QUESTIONS[step];
  const totalSteps = QUESTIONS.length;

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      setShowResults(true);
      awardQuizPoints();
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleReset = () => {
    setStep(0);
    setAnswers({});
    setShowResults(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setStep(0);
      setAnswers({});
      setShowResults(false);
    }, 300);
  };

  const recommendedIds = showResults ? getRecommendations(answers) : [];
  const recommendedCrystals = recommendedIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as typeof products;

  const handleShopCrystal = (productId: string) => {
    handleClose();
    setTimeout(() => {
      const el = document.getElementById(`product-${productId}`);
      if (el) {
        const headerOffset = 100;
        const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top, behavior: 'smooth' });
      } else {
        const shopEl = document.getElementById('shop');
        if (shopEl) shopEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 350);
  };

  return (
    <>
      {/* Entry Point Section */}
      <section className="py-14 px-4 bg-background">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-2">
            <Sparkles size={16} style={{ color: 'oklch(72% 0.18 55)' }} />
            <p className="text-primary font-medium tracking-widest uppercase text-sm">
              Crystal Guidance
            </p>
            <Sparkles size={16} style={{ color: 'oklch(72% 0.18 55)' }} />
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
            Find Your Perfect Crystal
          </h2>
          <p className="text-muted-foreground font-body text-base leading-relaxed mb-8 max-w-xl mx-auto">
            Answer 3 simple questions about your zodiac, mood, and intention — and we'll reveal the crystals that are calling to you. ✨
          </p>
          <button
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg font-display text-base"
            style={{
              background: 'linear-gradient(135deg, oklch(52% 0.12 230), oklch(65% 0.14 220), oklch(72% 0.18 55))',
              boxShadow: '0 4px 24px oklch(52% 0.12 230 / 0.3)',
            }}
          >
            <Sparkles size={18} />
            Start the Quiz
          </button>
        </div>
      </section>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'oklch(20% 0.05 230 / 0.7)', backdropFilter: 'blur(4px)' }}
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          <div
            className="relative w-full max-w-lg rounded-2xl overflow-hidden"
            style={{
              background: 'oklch(99% 0.005 80)',
              boxShadow: '0 20px 60px oklch(20% 0.05 230 / 0.4)',
              border: '1px solid oklch(72% 0.1 230 / 0.2)',
            }}
          >
            {/* Modal Header */}
            <div
              className="px-6 py-4 flex items-center justify-between"
              style={{
                background: 'linear-gradient(135deg, oklch(52% 0.12 230 / 0.08), oklch(72% 0.18 55 / 0.08))',
                borderBottom: '1px solid oklch(72% 0.1 230 / 0.15)',
              }}
            >
              <div className="flex items-center gap-2">
                <Sparkles size={18} style={{ color: 'oklch(72% 0.18 55)' }} />
                <h3 className="font-display text-lg text-foreground">Find Your Crystal</h3>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
              >
                <X size={16} className="text-muted-foreground" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {!showResults ? (
                <>
                  {/* Progress */}
                  <div className="flex items-center gap-2 mb-6">
                    {QUESTIONS.map((_, i) => (
                      <div
                        key={i}
                        className="flex-1 h-1.5 rounded-full transition-all duration-300"
                        style={{
                          background:
                            i <= step
                              ? 'linear-gradient(90deg, oklch(52% 0.12 230), oklch(72% 0.18 55))'
                              : 'oklch(90% 0.01 230)',
                        }}
                      />
                    ))}
                  </div>

                  <p className="text-xs text-muted-foreground font-body mb-1">
                    Question {step + 1} of {totalSteps}
                  </p>
                  <h4 className="font-display text-xl text-foreground mb-5">
                    {currentQuestion.question}
                  </h4>

                  {/* Options */}
                  <div
                    className={`grid gap-2 ${
                      currentQuestion.options.length > 6 ? 'grid-cols-3' : 'grid-cols-1'
                    }`}
                  >
                    {currentQuestion.options.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleAnswer(option.value)}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-left transition-all duration-200 hover:scale-[1.02] font-body text-sm"
                        style={{
                          border: '1px solid oklch(72% 0.1 230 / 0.25)',
                          background:
                            answers[currentQuestion.id] === option.value
                              ? 'oklch(52% 0.12 230 / 0.1)'
                              : 'oklch(99% 0.005 80)',
                          color: 'oklch(30% 0.05 230)',
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.background =
                            'oklch(52% 0.12 230 / 0.08)';
                          (e.currentTarget as HTMLButtonElement).style.borderColor =
                            'oklch(52% 0.12 230 / 0.5)';
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.background =
                            answers[currentQuestion.id] === option.value
                              ? 'oklch(52% 0.12 230 / 0.1)'
                              : 'oklch(99% 0.005 80)';
                          (e.currentTarget as HTMLButtonElement).style.borderColor =
                            'oklch(72% 0.1 230 / 0.25)';
                        }}
                      >
                        <span className="text-base">{option.emoji}</span>
                        <span>{option.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Back button */}
                  {step > 0 && (
                    <button
                      onClick={handleBack}
                      className="mt-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors font-body"
                    >
                      <ChevronLeft size={14} />
                      Back
                    </button>
                  )}
                </>
              ) : (
                /* Results */
                <div>
                  <div className="text-center mb-6">
                    <div className="text-3xl mb-2">✨</div>
                    <h4 className="font-display text-xl text-foreground mb-1">
                      Your Crystals Are Calling!
                    </h4>
                    <p className="text-sm text-muted-foreground font-body">
                      Based on your energy, these crystals are aligned with you right now:
                    </p>
                  </div>

                  <div className="space-y-3 mb-6">
                    {recommendedCrystals.map((crystal) => {
                      const price = HOLI_PROMO_ACTIVE
                        ? calculateHoliPrice(crystal.price)
                        : crystal.price;
                      return (
                        <div
                          key={crystal.id}
                          className="flex items-center gap-3 p-3 rounded-xl"
                          style={{
                            background: 'linear-gradient(135deg, oklch(93% 0.02 220), oklch(97% 0.008 80))',
                            border: '1px solid oklch(72% 0.1 230 / 0.2)',
                          }}
                        >
                          <img
                            src={crystal.imageUrl}
                            alt={crystal.name}
                            className="w-14 h-14 object-cover rounded-lg flex-shrink-0"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).style.display = 'none';
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <h5 className="font-display text-sm font-semibold text-foreground">
                              {crystal.name}
                            </h5>
                            <p className="text-xs text-muted-foreground font-body line-clamp-2 mt-0.5">
                              {crystal.description}
                            </p>
                            <span
                              className="text-sm font-bold font-display mt-1 block"
                              style={{ color: 'oklch(52% 0.12 230)' }}
                            >
                              {formatPrice(price)}
                            </span>
                          </div>
                          <button
                            onClick={() => handleShopCrystal(crystal.id)}
                            className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium text-white font-display"
                            style={{
                              background:
                                'linear-gradient(135deg, oklch(52% 0.12 230), oklch(45% 0.14 260))',
                            }}
                          >
                            Shop ✨
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleReset}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-medium font-body transition-colors hover:bg-muted"
                      style={{ border: '1px solid oklch(72% 0.1 230 / 0.3)', color: 'oklch(40% 0.12 230)' }}
                    >
                      <RotateCcw size={14} />
                      Retake Quiz
                    </button>
                    <button
                      onClick={handleClose}
                      className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white font-display"
                      style={{
                        background: 'linear-gradient(135deg, oklch(52% 0.12 230), oklch(45% 0.14 260))',
                      }}
                    >
                      Browse Shop
                    </button>
                  </div>

                  <p className="text-center text-xs text-muted-foreground font-body mt-3">
                    🌟 +10 Moonlight Points awarded for completing the quiz!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
