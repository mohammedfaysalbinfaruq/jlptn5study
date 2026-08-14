import React, { useState } from 'react';
import {
  Layers,
  Search,
  Volume2,
  RotateCw
} from 'lucide-react';
import { AppState, VocabItem } from '../types';
import { VOCABULARY_DATABASE, calculateNextReview } from '../data/vocabularyDatabase';
import { speakJapanese, sound } from '../utils/audio';

interface VocabSrsViewProps {
  state: AppState;
  onUpdateState: (updater: (prev: AppState) => AppState) => void;
}

export const VocabSrsView: React.FC<VocabSrsViewProps> = ({
  state,
  onUpdateState
}) => {
  const [vocabList, setVocabList] = useState<VocabItem[]>(VOCABULARY_DATABASE);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWeek, setSelectedWeek] = useState<number | 'All'>('All');
  const [activeTab, setActiveTab] = useState<'flashcard' | 'table'>('flashcard');

  // Flashcard state
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const weeks = ['All', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const filteredVocab = vocabList.filter(item => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      item.japanese.toLowerCase().includes(term) ||
      (item.kanji && item.kanji.toLowerCase().includes(term)) ||
      item.romaji.toLowerCase().includes(term) ||
      item.meaningEnglish.toLowerCase().includes(term) ||
      (item.meaningBangla && item.meaningBangla.includes(term));

    const matchesWeek = selectedWeek === 'All' || item.week === selectedWeek;
    return matchesSearch && matchesWeek;
  });

  const currentCard = filteredVocab[cardIndex] || filteredVocab[0];

  const handleRateCard = (quality: 'again' | 'hard' | 'good' | 'easy') => {
    if (!currentCard) return;

    let isCorrect = false;
    let nextStage = currentCard.srsStage;

    if (quality === 'again') {
      isCorrect = false;
      nextStage = 1;
      sound.playIncorrect();
    } else if (quality === 'hard') {
      isCorrect = true;
      nextStage = Math.max(1, currentCard.srsStage);
      sound.playCorrect();
    } else if (quality === 'good') {
      isCorrect = true;
      nextStage = Math.min(5, currentCard.srsStage + 1);
      sound.playCorrect();
    } else if (quality === 'easy') {
      isCorrect = true;
      nextStage = Math.min(5, currentCard.srsStage + 2);
      sound.playSuccessChime();
    }

    const { intervalDays, nextDueDate } = calculateNextReview(
      nextStage,
      isCorrect
    );

    const updatedCard: VocabItem = {
      ...currentCard,
      srsStage: nextStage,
      nextReviewDate: nextDueDate,
      intervalDays,
      correctCount: isCorrect ? currentCard.correctCount + 1 : currentCard.correctCount,
      incorrectCount: !isCorrect ? currentCard.incorrectCount + 1 : currentCard.incorrectCount
    };

    setVocabList(prev => prev.map(v => v.id === updatedCard.id ? updatedCard : v));

    // Also update main AppState streak & study hours
    onUpdateState(prev => ({
      ...prev,
      streaks: {
        ...prev.streaks,
        totalStudyDays: Math.max(prev.streaks.totalStudyDays, prev.streaks.totalStudyDays)
      }
    }));

    setIsFlipped(false);
    if (cardIndex < filteredVocab.length - 1) {
      setCardIndex(cardIndex + 1);
    } else {
      setCardIndex(0);
    }
  };

  const stageColors: Record<number, string> = {
    0: 'bg-slate-100 text-slate-700 border-slate-200',
    1: 'bg-blue-50 text-blue-700 border-blue-200',
    2: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    3: 'bg-purple-50 text-purple-700 border-purple-200',
    4: 'bg-amber-50 text-amber-800 border-amber-200',
    5: 'bg-emerald-50 text-emerald-800 border-emerald-200'
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#6B7280] mb-1">
              <Layers className="w-3.5 h-3.5 text-[#1677B8]" />
              <span>JLPT N5 Spaced Repetition Flashcard Engine</span>
              <span>•</span>
              <span className="font-mono text-[#1677B8] font-semibold">{vocabList.length} Active Vocabulary Items</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight">
              Vocabulary Flashcards & Spaced Repetition (SRS)
            </h1>
            <p className="text-xs text-[#6B7280] mt-1">
              Scientifically spaced intervals (1 day, 3 days, 7 days, 14 days, 30 days) ensuring zero vocabulary loss before the 6 December 2026 exam.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white p-0.5 rounded-lg border border-[#E5E7EB] self-start md:self-auto">
            <button
              onClick={() => setActiveTab('flashcard')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                activeTab === 'flashcard' ? 'bg-[#1677B8] text-white shadow-2xs' : 'text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              Flashcard Mode
            </button>
            <button
              onClick={() => setActiveTab('table')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                activeTab === 'table' ? 'bg-[#1677B8] text-white shadow-2xs' : 'text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              Full Vocab Table
            </button>
          </div>
        </div>

        {/* Filter Row */}
        <div className="mt-4 pt-4 border-t border-[#E5E7EB] flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search vocabulary by Kanji, Hiragana, English, or Bangla meaning..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCardIndex(0);
              }}
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-white border border-[#E5E7EB] text-xs text-[#222222] placeholder-[#9CA3AF] focus:outline-none focus:border-[#1677B8]"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            <span className="text-[11px] text-[#6B7280] font-semibold mr-1">Week:</span>
            {weeks.map((w) => (
              <button
                key={w.toString()}
                onClick={() => {
                  setSelectedWeek(w);
                  setCardIndex(0);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedWeek === w
                    ? 'bg-[#1677B8] text-white font-semibold shadow-2xs'
                    : 'bg-slate-100 text-[#4B5563] hover:bg-slate-200 hover:text-[#111827]'
                }`}
              >
                {w === 'All' ? 'All Weeks' : `Week ${w}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mode 1: Interactive Flashcard */}
      {activeTab === 'flashcard' && currentCard && (
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="flex items-center justify-between text-xs text-[#6B7280] px-2">
            <span>Card {cardIndex + 1} of {filteredVocab.length}</span>
            <span className={`px-2 py-0.5 rounded border text-[10px] uppercase font-bold ${stageColors[currentCard.srsStage]}`}>
              SRS Stage {currentCard.srsStage} ({currentCard.intervalDays || 1}d interval)
            </span>
          </div>

          {/* Flashcard Box */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full min-h-[320px] bg-white border border-[#E5E7EB] hover:border-[#1677B8] rounded-2xl p-8 flex flex-col justify-between items-center text-center cursor-pointer shadow-xs transition-all relative select-none"
          >
            {/* Top info */}
            <div className="w-full flex items-center justify-between text-xs text-[#6B7280]">
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-[#4B5563] text-[11px] border border-[#E5E7EB]">
                {currentCard.category} • Week {currentCard.week}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  speakJapanese(currentCard.japanese);
                }}
                className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#1677B8] transition-colors"
                title="Voice pronunciation"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {/* Front or Back View */}
            {!isFlipped ? (
              <div className="py-6 space-y-3">
                <div className="text-4xl sm:text-5xl font-black text-[#111827] font-japanese">
                  {currentCard.kanji || currentCard.japanese}
                </div>
                {currentCard.kanji && (
                  <div className="text-lg text-[#1677B8] font-japanese">
                    【{currentCard.japanese}】
                  </div>
                )}
                <div className="text-xs text-[#6B7280] italic">
                  {currentCard.romaji}
                </div>
                <div className="pt-4 text-xs text-[#9CA3AF] flex items-center justify-center gap-1">
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Click anywhere to reveal English & Bangla meaning</span>
                </div>
              </div>
            ) : (
              <div className="py-4 space-y-3 animate-fadeIn">
                <div className="text-2xl font-bold text-[#111827]">
                  {currentCard.meaningEnglish}
                </div>
                <div className="text-base font-semibold text-[#1677B8]">
                  {currentCard.meaningBangla}
                </div>
                {currentCard.exampleSentence && (
                  <div className="mt-4 p-3.5 rounded-xl bg-slate-50/70 border border-[#E5E7EB] text-left text-xs space-y-1">
                    <div className="text-[#6B7280] font-bold text-[10px] uppercase">Example Sentence:</div>
                    <div className="font-japanese text-[#111827] text-sm">{currentCard.exampleSentence.japanese}</div>
                    <div className="text-[#4B5563]">{currentCard.exampleSentence.english}</div>
                    <div className="text-[#1677B8] text-[11px] font-medium">{currentCard.exampleSentence.bangla}</div>
                  </div>
                )}
              </div>
            )}

            {/* Bottom clue */}
            <div className="text-[11px] text-[#9CA3AF]">
              Next Review: {currentCard.nextReviewDate || 'Today'}
            </div>
          </div>

          {/* Rating Controls (SRS Algorithm Triggers) */}
          <div className="grid grid-cols-4 gap-2 pt-2">
            <button
              onClick={() => handleRateCard('again')}
              className="p-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-800 border border-red-200 text-xs font-bold transition-all flex flex-col items-center gap-1 cursor-pointer"
            >
              <span>Again (1d)</span>
              <span className="text-[10px] text-red-600 font-normal">Reset Stage</span>
            </button>
            <button
              onClick={() => handleRateCard('hard')}
              className="p-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold transition-all flex flex-col items-center gap-1 cursor-pointer"
            >
              <span>Hard (1d)</span>
              <span className="text-[10px] text-amber-700 font-normal">Keep Stage</span>
            </button>
            <button
              onClick={() => handleRateCard('good')}
              className="p-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#1677B8] border border-blue-200 text-xs font-bold transition-all flex flex-col items-center gap-1 cursor-pointer"
            >
              <span>Good (+1)</span>
              <span className="text-[10px] text-[#1677B8] font-normal">Next Interval</span>
            </button>
            <button
              onClick={() => handleRateCard('easy')}
              className="p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition-all flex flex-col items-center gap-1 cursor-pointer"
            >
              <span>Easy (+2)</span>
              <span className="text-[10px] text-emerald-700 font-normal">Fast-Track</span>
            </button>
          </div>
        </div>
      )}

      {/* Mode 2: Full Vocabulary Table */}
      {activeTab === 'table' && (
        <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#222222]">
              <thead className="bg-slate-50 text-[#6B7280] uppercase font-bold text-[10px] tracking-wider border-b border-[#E5E7EB]">
                <tr>
                  <th className="py-3 px-4">Word / Japanese</th>
                  <th className="py-3 px-4">Romaji</th>
                  <th className="py-3 px-4">English Meaning</th>
                  <th className="py-3 px-4">Bangla Meaning</th>
                  <th className="py-3 px-4">Week</th>
                  <th className="py-3 px-4">SRS Stage</th>
                  <th className="py-3 px-4">Next Review</th>
                  <th className="py-3 px-4 text-center">Audio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {filteredVocab.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-japanese font-bold text-[#111827] text-sm">
                      {item.kanji ? `${item.kanji} (${item.japanese})` : item.japanese}
                    </td>
                    <td className="py-3 px-4 text-[#1677B8] italic font-medium">
                      {item.romaji}
                    </td>
                    <td className="py-3 px-4 text-[#222222] font-medium">
                      {item.meaningEnglish}
                    </td>
                    <td className="py-3 px-4 text-[#1677B8]">
                      {item.meaningBangla}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-[#4B5563] text-[10px] border border-[#E5E7EB]">
                        Week {item.week}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${stageColors[item.srsStage]}`}>
                        Stage {item.srsStage}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-[#6B7280] text-[11px]">
                      {item.nextReviewDate || 'Today'}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => speakJapanese(item.japanese)}
                        className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#1677B8] transition-colors"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
