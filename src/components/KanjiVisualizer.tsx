import React, { useState } from 'react';
import {
  Volume2,
  Sparkles,
  Layers,
  RefreshCw,
  X,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  HelpCircle,
  CheckCircle2,
  Share2,
  Atom,
  Eye,
  Maximize2
} from 'lucide-react';
import { AppState, SrsReviewItem } from '../types';
import { KanjiDetail } from '../data/kanjiDatabase';
import { speakJapanese, sound } from '../utils/audio';

interface KanjiVisualizerProps {
  kanji: KanjiDetail;
  allKanjiList: KanjiDetail[];
  state: AppState;
  onClose?: () => void;
  onSelectKanji: (kanji: KanjiDetail) => void;
  onUpdateState: (updater: (prev: AppState) => AppState) => void;
  isModal?: boolean;
  onOpenExpandedModal?: () => void;
}

export const KanjiVisualizer: React.FC<KanjiVisualizerProps> = ({
  kanji,
  allKanjiList,
  state,
  onClose,
  onSelectKanji,
  onUpdateState,
  isModal = false,
  onOpenExpandedModal
}) => {
  const [activeTab, setActiveTab] = useState<'breakdown' | 'etymology' | 'compounds' | 'quiz'>('breakdown');
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Find index in list for Next / Prev navigation
  const currentIndex = allKanjiList.findIndex(k => k.id === kanji.id);
  const prevKanji = currentIndex > 0 ? allKanjiList[currentIndex - 1] : allKanjiList[allKanjiList.length - 1];
  const nextKanji = currentIndex < allKanjiList.length - 1 ? allKanjiList[currentIndex + 1] : allKanjiList[0];

  const handleAddToSrs = () => {
    const existing = state.srsQueue.find(s => s.title.includes(kanji.kanji));
    if (existing) {
      alert(`Kanji "${kanji.kanji}" is already in your SRS Spaced Repetition queue!`);
      return;
    }

    const newItem: SrsReviewItem = {
      id: `srs-k-${kanji.id}-${Date.now()}`,
      title: `Kanji: ${kanji.kanji} (${kanji.meaningEnglish})`,
      category: 'Kanji',
      stage: 1,
      lastReviewed: state.simulatedCurrentDate,
      nextReviewDate: state.simulatedCurrentDate,
      intervalDays: 1,
      consecutiveCorrect: 0,
      sourceMaterial: `N5 Kanji Lesson ${kanji.lesson}`
    };

    onUpdateState(prev => ({
      ...prev,
      srsQueue: [...prev.srsQueue, newItem]
    }));

    sound.playSuccessChime();
  };

  const handleCopyKanji = () => {
    navigator.clipboard?.writeText(kanji.kanji);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  const content = (
    <div className="space-y-6 text-[#222222]">
      {/* Top Banner Navigation & Quick Switcher */}
      <div className="flex items-center justify-between gap-3 pb-4 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-blue-50 border border-blue-200 text-[#1677B8]">
            <Atom className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1677B8]">
                Kanji Structural Visualizer
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-[#4B5563] border border-[#E5E7EB]">
                #{kanji.id} of {allKanjiList.length}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-[#111827] flex items-center gap-2">
              <span>{kanji.meaningEnglish}</span>
              <span className="text-sm font-normal text-[#6B7280] font-japanese">({kanji.meaningBangla})</span>
            </h2>
          </div>
        </div>

        {/* Action Controls & Modal Close */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white rounded-lg border border-[#E5E7EB] p-0.5">
            <button
              onClick={() => {
                onSelectKanji(prevKanji);
                setQuizAnswer(null);
              }}
              className="p-1.5 rounded-md text-[#6B7280] hover:text-[#111827] hover:bg-slate-100 transition-colors"
              title="Previous Kanji"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                onSelectKanji(nextKanji);
                setQuizAnswer(null);
              }}
              className="p-1.5 rounded-md text-[#6B7280] hover:text-[#111827] hover:bg-slate-100 transition-colors"
              title="Next Kanji"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleCopyKanji}
            className="p-2 rounded-lg bg-white border border-[#E5E7EB] text-[#6B7280] hover:text-[#111827] hover:bg-slate-50 transition-colors text-xs flex items-center gap-1 cursor-pointer"
            title="Copy Kanji character"
          >
            <Share2 className="w-3.5 h-3.5" />
            {copiedNotification && <span className="text-[10px] text-emerald-600 font-semibold">Copied!</span>}
          </button>

          {!isModal && onOpenExpandedModal && (
            <button
              onClick={onOpenExpandedModal}
              className="p-2 rounded-lg bg-white border border-[#E5E7EB] text-[#1677B8] hover:bg-blue-50 transition-colors text-xs flex items-center gap-1 cursor-pointer"
              title="Open in Expanded View Modal"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px] font-semibold">Expand</span>
            </button>
          )}

          {isModal && onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white border border-[#E5E7EB] text-[#6B7280] hover:text-[#111827] hover:bg-slate-100 transition-colors cursor-pointer"
              title="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Visual Dissection Hero */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Left: Large Calligraphic Grid + Audio & SRS */}
        <div className="md:col-span-4 bg-white border border-[#E5E7EB] rounded-xl p-6 flex flex-col items-center justify-between text-center relative overflow-hidden group shadow-2xs">
          {/* Subtle background calligraphy watermarks */}
          <div className="absolute -bottom-8 -right-8 text-9xl font-black font-japanese text-slate-200/50 select-none pointer-events-none">
            {kanji.kanji}
          </div>

          {/* Stroke & Lesson Badges */}
          <div className="w-full flex items-center justify-between text-xs mb-4">
            <span className="px-2.5 py-1 rounded-full bg-blue-50 text-[#1677B8] font-semibold border border-blue-200">
              {kanji.strokes} Strokes (画)
            </span>
            <span className="px-2.5 py-1 rounded-full bg-slate-100 text-[#4B5563] border border-[#E5E7EB]">
              Week {kanji.week} • L{kanji.lesson}
            </span>
          </div>

          {/* 2x2 Grid Kanji Character Display Box (Traditional calligraphy guide) */}
          <div className="relative my-2">
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl bg-white border-2 border-[#1677B8]/40 flex items-center justify-center text-7xl sm:text-8xl font-black font-japanese text-[#111827] shadow-xs relative select-none">
              {/* Traditional 4-quadrant cross guide lines */}
              <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-[#1677B8]/20 pointer-events-none" />
              <div className="absolute inset-y-0 left-1/2 border-l border-dashed border-[#1677B8]/20 pointer-events-none" />
              
              <span className="relative z-10">{kanji.kanji}</span>
            </div>

            <button
              onClick={() => speakJapanese(kanji.kanji)}
              className="absolute -bottom-2 -right-2 p-3 rounded-xl bg-[#1677B8] hover:bg-[#125F94] text-white shadow-xs transition-transform hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer"
              title="Listen to Japanese pronunciation"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

          {/* Primary Details */}
          <div className="mt-4 space-y-1 w-full">
            <div className="text-xl font-bold text-[#111827] tracking-tight">
              {kanji.meaningEnglish}
            </div>
            <div className="text-sm font-semibold text-[#1677B8]">
              {kanji.meaningBangla}
            </div>
          </div>

          {/* Quick Action Button */}
          <button
            onClick={handleAddToSrs}
            className="mt-5 w-full py-2.5 px-4 rounded-lg bg-[#1677B8] hover:bg-[#125F94] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-2xs transition-all active:scale-98"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Add to Spaced Repetition (SRS)</span>
          </button>
        </div>

        {/* Right: Readings & Constituent Structural Breakdown */}
        <div className="md:col-span-8 space-y-4">
          {/* Readings Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-white border border-[#E5E7EB] space-y-1.5 shadow-2xs">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#1677B8] flex items-center justify-between">
                <span>Onyomi (音読み - Chinese Origin)</span>
                <span className="text-[10px] text-[#6B7280] font-normal">Katakana</span>
              </div>
              <div className="font-japanese font-bold text-lg text-[#111827] flex items-center gap-2">
                <span>{kanji.onyomi.length > 0 ? kanji.onyomi.join('、 ') : '—'}</span>
                {kanji.onyomi.length > 0 && (
                  <button
                    onClick={() => speakJapanese(kanji.onyomi[0])}
                    className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-[#1677B8] text-xs"
                    title="Audio"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-[#1677B8]" />
                  </button>
                )}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#E5E7EB] space-y-1.5 shadow-2xs">
              <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 flex items-center justify-between">
                <span>Kunyomi (訓読み - Native Japanese)</span>
                <span className="text-[10px] text-[#6B7280] font-normal">Hiragana</span>
              </div>
              <div className="font-japanese font-bold text-lg text-[#111827] flex items-center gap-2">
                <span>{kanji.kunyomi.length > 0 ? kanji.kunyomi.join('、 ') : '—'}</span>
                {kanji.kunyomi.length > 0 && (
                  <button
                    onClick={() => speakJapanese(kanji.kunyomi[0])}
                    className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-emerald-700 text-xs"
                    title="Audio"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-emerald-700" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Sub-tab Navigation */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-[#E5E7EB] overflow-x-auto">
            <button
              onClick={() => setActiveTab('breakdown')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === 'breakdown'
                  ? 'bg-white text-[#1677B8] shadow-2xs font-bold'
                  : 'text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Radical & Phonetic Anatomy</span>
            </button>

            <button
              onClick={() => setActiveTab('etymology')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === 'etymology'
                  ? 'bg-white text-[#1677B8] shadow-2xs font-bold'
                  : 'text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Etymology & Memory Logic</span>
            </button>

            <button
              onClick={() => setActiveTab('compounds')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === 'compounds'
                  ? 'bg-white text-[#1677B8] shadow-2xs font-bold'
                  : 'text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Compounds (熟語) ({kanji.examples?.length || 0})</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === 'quiz'
                  ? 'bg-white text-[#1677B8] shadow-2xs font-bold'
                  : 'text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Instant Recall Quiz</span>
            </button>
          </div>

          {/* Sub-tab 1: Radical & Phonetic Breakdown */}
          {activeTab === 'breakdown' && (
            <div className="space-y-3.5 animate-fadeIn">
              {/* Constituent Radical Dissection */}
              {kanji.radical && (
                <div className="p-4 rounded-xl bg-white border border-[#E5E7EB] space-y-3 shadow-2xs">
                  <div className="flex items-center justify-between text-xs font-bold text-[#111827] uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-amber-600" />
                      <span>Constituent Radical (部首 Bushu)</span>
                    </div>
                    <span className="text-[10px] text-amber-700 font-mono font-semibold">Semantic Foundation</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50/70 border border-[#E5E7EB] flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-amber-50 border border-amber-300 flex items-center justify-center font-japanese text-3xl font-black text-amber-800 shrink-0">
                      {kanji.radical.character}
                    </div>
                    <div className="space-y-1 min-w-0">
                      <div className="text-sm font-bold text-[#111827] flex items-center gap-2">
                        <span>{kanji.radical.name}</span>
                      </div>
                      <div className="text-xs text-[#4B5563]">
                        Meaning: <span className="text-amber-800 font-semibold">{kanji.radical.meaning}</span>
                      </div>
                      <div className="text-[11px] text-[#6B7280]">
                        The primary semantic building block governing this character's classification in Japanese dictionaries.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Phonetic Component Box */}
              {kanji.phoneticElement ? (
                <div className="p-4 rounded-xl bg-white border border-[#E5E7EB] space-y-2 shadow-2xs">
                  <div className="flex items-center justify-between text-xs font-bold text-[#111827] uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <Volume2 className="w-4 h-4 text-purple-600" />
                      <span>Phonetic Element (音符 Onpu)</span>
                    </div>
                    <span className="text-[10px] text-purple-700 font-mono font-semibold">Sound-Bearing Core</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50/70 border border-[#E5E7EB] flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center font-japanese text-2xl font-black text-purple-700 shrink-0">
                      {kanji.phoneticElement.element}
                    </div>
                    <div className="space-y-0.5 text-xs">
                      <div className="font-bold text-[#111827] flex items-center gap-2">
                        <span>Sound:</span>
                        <span className="font-mono text-purple-700 font-semibold">{kanji.phoneticElement.sound}</span>
                      </div>
                      <p className="text-[#4B5563] text-[11px] leading-relaxed">
                        {kanji.phoneticElement.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-white border border-[#E5E7EB] text-xs text-[#6B7280] space-y-1 shadow-2xs">
                  <div className="font-bold text-[#111827] flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#1677B8]" />
                    <span>Pure Ideograph / Pictographic Structure</span>
                  </div>
                  <p className="text-[11px]">
                    This character is a direct pictograph (象形文字) or associative compound (会意文字) representing its meaning directly without a separate phonetic sound-borrowing element.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Sub-tab 2: Etymology Narrative */}
          {activeTab === 'etymology' && (
            <div className="p-4 rounded-xl bg-white border border-[#E5E7EB] space-y-3 animate-fadeIn shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-bold text-[#111827] uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>Historical Etymological Origin & Memory Story (字源)</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50/70 border border-[#E5E7EB] text-[#222222] text-xs sm:text-sm leading-relaxed space-y-2">
                <p>{kanji.etymology}</p>
                <div className="pt-2 border-t border-[#E5E7EB] text-[11px] text-[#6B7280] flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Memory Tip: Visualize the ancient origin shapes to effortlessly retain stroke structure during exam conditions.</span>
                </div>
              </div>
            </div>
          )}

          {/* Sub-tab 3: Compounds & Example Words */}
          {activeTab === 'compounds' && (
            <div className="space-y-2 animate-fadeIn max-h-[300px] overflow-y-auto pr-1">
              {kanji.examples && kanji.examples.length > 0 ? (
                kanji.examples.map((ex, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#1677B8] flex items-center justify-between gap-3 text-xs transition-colors shadow-2xs"
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => speakJapanese(ex.word)}
                        className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#1677B8] transition-colors shrink-0"
                        title="Pronounce"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="font-japanese font-bold text-[#111827] text-base">
                            {ex.word}
                          </span>
                          <span className="font-japanese text-xs text-[#1677B8] font-medium">
                            【{ex.reading}】
                          </span>
                        </div>
                        <div className="text-[11px] text-[#6B7280]">
                          {ex.meaningEnglish} • <span className="text-emerald-700 font-medium">{ex.meaningBangla}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 rounded-xl bg-white border border-[#E5E7EB] text-xs text-[#6B7280] text-center">
                  No compound entries registered for this character yet.
                </div>
              )}
            </div>
          )}

          {/* Sub-tab 4: Instant Recall Quiz */}
          {activeTab === 'quiz' && (
            <div className="p-4 rounded-xl bg-white border border-[#E5E7EB] space-y-4 animate-fadeIn shadow-2xs">
              <div className="text-xs font-bold text-[#111827] uppercase tracking-wider flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-600" />
                <span>Test your reading recall for:</span>
                <span className="font-japanese font-black text-lg text-[#111827]">{kanji.kanji}</span>
              </div>

              <div className="space-y-2">
                <div className="text-xs text-[#6B7280]">
                  Select the primary English meaning for <span className="font-japanese text-[#111827] font-bold">{kanji.kanji}</span>:
                </div>

                {/* Generate 3 options (1 correct + 2 distractors from allKanjiList) */}
                {(() => {
                  const distractors = allKanjiList
                    .filter(k => k.id !== kanji.id)
                    .slice(0, 3)
                    .map(k => k.meaningEnglish);
                  const options = Array.from(new Set([kanji.meaningEnglish, ...distractors])).slice(0, 4);

                  return (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {options.map((opt, i) => {
                        const isCorrect = opt === kanji.meaningEnglish;
                        const isSelected = quizAnswer === opt;

                        let btnStyle = 'bg-white border-[#E5E7EB] text-[#222222] hover:bg-slate-50';
                        if (quizAnswer) {
                          if (isCorrect) {
                            btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold';
                          } else if (isSelected) {
                            btnStyle = 'bg-red-50 border-red-500 text-red-800';
                          }
                        }

                        return (
                          <button
                            key={i}
                            onClick={() => {
                              setQuizAnswer(opt);
                              if (isCorrect) {
                                sound.playCorrect();
                              } else {
                                sound.playIncorrect();
                              }
                            }}
                            className={`p-3 rounded-xl border text-xs text-left transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                          >
                            <span>{opt}</span>
                            {quizAnswer && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  );
                })()}

                {quizAnswer && (
                  <div className="pt-2 text-xs text-[#222222]">
                    {quizAnswer === kanji.meaningEnglish ? (
                      <span className="text-emerald-700 font-semibold">Correct! Well done.</span>
                    ) : (
                      <span className="text-red-700 font-medium">
                        Incorrect. The correct meaning is <strong>{kanji.meaningEnglish}</strong> ({kanji.meaningBangla}).
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
        <div className="bg-white border border-[#E5E7EB] rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-5 sm:p-7 shadow-xl my-auto">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 sm:p-7 shadow-2xs">
      {content}
    </div>
  );
};
