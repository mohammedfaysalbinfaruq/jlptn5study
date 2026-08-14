import React, { useState } from 'react';
import {
  AlertOctagon,
  Search,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Volume2,
  Sparkles,
  Filter,
  Trash2,
  BookOpen,
  Award
} from 'lucide-react';
import { AppState, MistakeItem } from '../types';
import { speakJapanese, sound } from '../utils/audio';

interface MistakeNotebookViewProps {
  state: AppState;
  onUpdateState: (updater: (prev: AppState) => AppState) => void;
  onOpenExam: () => void;
}

export const MistakeNotebookView: React.FC<MistakeNotebookViewProps> = ({
  state,
  onUpdateState,
  onOpenExam
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filterMastered, setFilterMastered] = useState<'unmastered' | 'all' | 'mastered'>('unmastered');

  // Re-test mini quiz modal state
  const [retestItem, setRetestItem] = useState<MistakeItem | null>(null);
  const [retestAnswer, setRetestAnswer] = useState<string>('');
  const [retestResult, setRetestResult] = useState<'correct' | 'wrong' | null>(null);

  const categories = ['All', 'Grammar', 'Vocabulary', 'Kanji', 'Reading'];

  const filteredMistakes = state.mistakes.filter(item => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      item.questionText.toLowerCase().includes(term) ||
      item.correctAnswer.toLowerCase().includes(term) ||
      item.explanation.toLowerCase().includes(term) ||
      (item.explanationBangla && item.explanationBangla.includes(term));

    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;

    let matchesMastery = true;
    if (filterMastered === 'unmastered') matchesMastery = !item.mastered;
    if (filterMastered === 'mastered') matchesMastery = item.mastered;

    return matchesSearch && matchesCategory && matchesMastery;
  });

  const handleToggleMastered = (mistakeId: string) => {
    onUpdateState(prev => ({
      ...prev,
      mistakes: prev.mistakes.map(m => {
        if (m.id === mistakeId) {
          const nextMastered = !m.mastered;
          if (nextMastered) sound.playSuccessChime();
          return { ...m, mastered: nextMastered };
        }
        return m;
      })
    }));
  };

  const handleDeleteMistake = (mistakeId: string) => {
    onUpdateState(prev => ({
      ...prev,
      mistakes: prev.mistakes.filter(m => m.id !== mistakeId)
    }));
  };

  const handleStartRetest = (item: MistakeItem) => {
    setRetestItem(item);
    setRetestAnswer('');
    setRetestResult(null);
  };

  const handleSubmitRetest = () => {
    if (!retestItem || !retestAnswer.trim()) return;

    const isCorrect = retestAnswer.trim().toLowerCase() === retestItem.correctAnswer.trim().toLowerCase();
    if (isCorrect) {
      sound.playCorrect();
      setRetestResult('correct');
      // Mark mastered
      onUpdateState(prev => ({
        ...prev,
        mistakes: prev.mistakes.map(m => m.id === retestItem.id ? { ...m, mastered: true } : m)
      }));
    } else {
      sound.playIncorrect();
      setRetestResult('wrong');
    }
  };

  const unmasteredCount = state.mistakes.filter(m => !m.mastered).length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#6B7280] mb-1">
              <AlertOctagon className="w-3.5 h-3.5 text-[#E53935]" />
              <span>Smart Error Tracking & Remediation</span>
              <span>•</span>
              <span className="font-mono text-[#E53935] font-semibold">{unmasteredCount} Active Errors to Fix</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight">
              Mistake Notebook (ভুলের খাতা)
            </h1>
            <p className="text-xs text-[#6B7280] mt-1">
              Every incorrect question from daily short exams and mock papers is recorded here for targeted re-testing until 100% mastery.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white p-0.5 rounded-lg border border-[#E5E7EB] self-start md:self-auto">
            <button
              onClick={() => setFilterMastered('unmastered')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                filterMastered === 'unmastered' ? 'bg-[#E53935] text-white shadow-2xs' : 'text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              Unmastered ({unmasteredCount})
            </button>
            <button
              onClick={() => setFilterMastered('mastered')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                filterMastered === 'mastered' ? 'bg-emerald-600 text-white shadow-2xs' : 'text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              Mastered ({state.mistakes.filter(m => m.mastered).length})
            </button>
            <button
              onClick={() => setFilterMastered('all')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                filterMastered === 'all' ? 'bg-[#1677B8] text-white shadow-2xs' : 'text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              All ({state.mistakes.length})
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-4 pt-4 border-t border-[#E5E7EB] flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search mistake question text, particle, explanation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-white border border-[#E5E7EB] text-xs text-[#222222] placeholder-[#9CA3AF] focus:outline-none focus:border-[#1677B8]"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#1677B8] text-white font-semibold shadow-2xs'
                    : 'bg-slate-100 text-[#4B5563] hover:bg-slate-200 hover:text-[#111827]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mistake Cards List */}
      <div className="space-y-3">
        {filteredMistakes.length > 0 ? (
          filteredMistakes.map((item) => (
            <div
              key={item.id}
              className={`p-5 rounded-xl border transition-all ${
                item.mastered
                  ? 'bg-white border-[#E5E7EB] opacity-75'
                  : 'bg-white border-[#E5E7EB] shadow-2xs'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-2 flex-1 min-w-0">
                  
                  {/* Meta tags */}
                  <div className="flex items-center gap-2 flex-wrap text-[11px]">
                    <span className="px-2 py-0.5 rounded bg-slate-100 border border-[#E5E7EB] text-[#4B5563] font-semibold">
                      {item.category}
                    </span>
                    <span className="text-[#6B7280]">
                      Added: {item.dateAdded}
                    </span>
                    <span>•</span>
                    <span className="text-[#E53935] font-mono font-medium">
                      Mistake Freq: {item.frequency}x
                    </span>
                    {item.frequency > 1 && !item.mastered && (
                      <span className="px-2 py-0.5 rounded bg-red-50 text-[#E53935] font-bold border border-red-200 text-[10px] flex items-center gap-1">
                        <AlertOctagon className="w-3 h-3 text-[#E53935]" />
                        <span>HIGH PRIORITY REVISION ({item.frequency}x Repeated)</span>
                      </span>
                    )}
                    {item.mastered && (
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 text-[10px]">
                        MASTERED ✓
                      </span>
                    )}
                  </div>

                  {/* Question text */}
                  <div className="flex items-start gap-2">
                    <div className="font-japanese font-bold text-base sm:text-lg text-[#111827] leading-relaxed">
                      {item.questionText}
                    </div>
                    <button
                      onClick={() => speakJapanese(item.questionText)}
                      className="p-1 text-[#6B7280] hover:text-[#1677B8] shrink-0"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Answers Comparison */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                    <div className="p-2.5 rounded-lg bg-red-50/70 border border-red-200 text-red-900">
                      <span className="text-[10px] uppercase font-bold text-[#E53935] block">Your Wrong Choice:</span>
                      <span className="font-japanese font-semibold">{item.userWrongAnswer}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-200 text-emerald-900">
                      <span className="text-[10px] uppercase font-bold text-emerald-700 block">Correct Answer:</span>
                      <span className="font-japanese font-semibold">{item.correctAnswer}</span>
                    </div>
                  </div>

                  {/* Explanations */}
                  <div className="p-3.5 rounded-xl bg-slate-50/70 border border-[#E5E7EB] text-xs space-y-1.5">
                    <div className="text-[#222222] leading-relaxed">
                      <span className="font-bold text-[#1677B8]">Explanation: </span>
                      {item.explanation}
                    </div>
                    {item.explanationBangla && (
                      <div className="text-[#1677B8] leading-relaxed font-medium">
                        <span className="font-bold">বাংলা: </span>
                        {item.explanationBangla}
                      </div>
                    )}
                  </div>

                </div>

                {/* Actions */}
                <div className="flex sm:flex-col gap-2 shrink-0 self-end sm:self-start">
                  <button
                    onClick={() => handleStartRetest(item)}
                    className="px-3 py-1.5 rounded-lg bg-[#1677B8] hover:bg-[#136298] text-white text-xs font-semibold flex items-center gap-1 transition-colors shadow-2xs"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Re-Test</span>
                  </button>
                  <button
                    onClick={() => handleToggleMastered(item.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors flex items-center gap-1 ${
                      item.mastered
                        ? 'bg-slate-100 text-[#4B5563] border-[#E5E7EB] hover:bg-slate-200'
                        : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{item.mastered ? 'Unmark' : 'Mark Mastered'}</span>
                  </button>
                  <button
                    onClick={() => handleDeleteMistake(item.id)}
                    className="p-1.5 text-[#9CA3AF] hover:text-[#E53935] rounded-lg transition-colors self-center"
                    title="Delete mistake item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center bg-white border border-[#E5E7EB] rounded-xl space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 mx-auto flex items-center justify-center text-xl border border-emerald-200">
              ✨
            </div>
            <h3 className="font-bold text-[#111827] text-sm">No Active Mistakes in this Category!</h3>
            <p className="text-xs text-[#6B7280] max-w-sm mx-auto">
              Take the Daily Adaptive Exam or Full Mock Tests to test your knowledge and track areas for refinement.
            </p>
          </div>
        )}
      </div>

      {/* Retest Modal Drawer */}
      {retestItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white border border-[#E5E7EB] rounded-xl w-full max-w-lg p-6 shadow-xl space-y-4 text-[#222222]">
            <div className="flex items-center justify-between">
              <div className="font-bold text-sm text-[#111827] flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-[#1677B8]" />
                <span>Re-Test Mistake Item</span>
              </div>
              <button
                onClick={() => setRetestItem(null)}
                className="p-1 text-[#6B7280] hover:text-[#111827]"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-[#E5E7EB] font-japanese font-bold text-base text-[#111827]">
              {retestItem.questionText}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#6B7280] block">
                Type the correct Japanese answer / particle / reading:
              </label>
              <input
                type="text"
                value={retestAnswer}
                onChange={(e) => setRetestAnswer(e.target.value)}
                placeholder="e.g. の, いきます, に, が..."
                className="w-full px-4 py-2.5 rounded-lg bg-white border border-[#E5E7EB] text-sm text-[#111827] font-japanese focus:outline-none focus:border-[#1677B8]"
                autoFocus
              />
            </div>

            {retestResult && (
              <div className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                retestResult === 'correct'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-red-50 text-[#E53935] border border-red-200'
              }`}>
                {retestResult === 'correct' ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>Correct! This question has been marked Mastered ✓</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-[#E53935]" />
                    <span>Incorrect. The right answer is &ldquo;{retestItem.correctAnswer}&rdquo;. Try again!</span>
                  </>
                )}
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setRetestItem(null)}
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#4B5563] text-xs font-semibold"
              >
                Close
              </button>
              <button
                onClick={handleSubmitRetest}
                className="px-5 py-2 rounded-lg bg-[#1677B8] hover:bg-[#136298] text-white text-xs font-bold shadow-2xs"
              >
                Check Answer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
