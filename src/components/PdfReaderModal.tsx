import React, { useState, useEffect } from 'react';
import {
  X,
  BookOpen,
  CheckCircle2,
  Circle,
  Save,
  Volume2,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  FileText,
  Sparkles,
  Layers,
  RotateCw,
  Eye,
  EyeOff,
  Check,
  Award,
  Flame,
  Bookmark,
  Clock,
  HelpCircle,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { StudyMaterial, StudyCategory } from '../types';
import { speakJapanese, sound } from '../utils/audio';
import { VOCABULARY_DATABASE, VocabItem } from '../data/vocabularyDatabase';
import { KANJI_DATABASE, KanjiDetail } from '../data/kanjiDatabase';

interface PdfReaderModalProps {
  material: StudyMaterial;
  onClose: () => void;
  onUpdateMaterial: (updated: StudyMaterial) => void;
}

export const PdfReaderModal: React.FC<PdfReaderModalProps> = ({
  material,
  onClose,
  onUpdateMaterial
}) => {
  const [activeTab, setActiveTab] = useState<'textbook' | 'flashcards' | 'notes'>('textbook');
  const [personalNotes, setPersonalNotes] = useState<string>(material.personalNotes || '');
  const [isSaved, setIsSaved] = useState(false);
  const [motivationalMessage, setMotivationalMessage] = useState<string | null>(null);
  const [isFocusMode, setIsFocusMode] = useState(false);

  // Flashcard state
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState<Set<string>>(new Set());

  // Kanji hidden states
  const [hiddenMeanings, setHiddenMeanings] = useState<Record<number, boolean>>({});
  const [learnedKanji, setLearnedKanji] = useState<Set<number>>(new Set());

  // Handle Escape key to exit focus mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFocusMode) {
        setIsFocusMode(false);
        sound.playClick();
        showToast('Exited Focus Mode');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFocusMode]);

  // Save current material as last read on mount
  useEffect(() => {
    try {
      localStorage.setItem('jlpt_last_read_material_id', material.id);
    } catch {
      // ignore
    }
  }, [material.id]);

  // Match vocabulary and kanji from databases for this material's week/lesson
  const matchingVocab: VocabItem[] = VOCABULARY_DATABASE.filter(
    v => v.week === material.assignedWeek || (material.category === 'Vocabulary' && v.week <= material.assignedWeek)
  ).slice(0, 16);

  const matchingKanji: KanjiDetail[] = KANJI_DATABASE.filter(
    k => k.week === material.assignedWeek || (material.category === 'Kanji' && k.week <= material.assignedWeek)
  ).slice(0, 8);

  const totalSections = material.sections ? material.sections.length : 0;
  const completedSections = material.sections ? material.sections.filter(s => s.completed).length : 0;
  const progressPercent = totalSections > 0
    ? Math.round((completedSections / totalSections) * 100)
    : material.status === 'Completed' ? 100 : 40;

  const showToast = (msg: string) => {
    setMotivationalMessage(msg);
    setTimeout(() => setMotivationalMessage(null), 2500);
  };

  const handleToggleSection = (sectionId: string) => {
    if (!material.sections) return;

    const updatedSections = material.sections.map(sec => {
      if (sec.id === sectionId) {
        const nextState = !sec.completed;
        if (nextState) {
          sound.playCorrect();
          showToast('Good job. Progress saved.');
        }
        return { ...sec, completed: nextState };
      }
      return sec;
    });

    const allDone = updatedSections.every(s => s.completed);
    if (allDone) {
      sound.playLevelUp();
      showToast("Today's target completed. Keep going.");
    }

    onUpdateMaterial({
      ...material,
      sections: updatedSections,
      status: allDone ? 'Completed' : 'In Progress'
    });
  };

  const handleSaveNotes = () => {
    onUpdateMaterial({
      ...material,
      personalNotes
    });
    sound.playCorrect();
    setIsSaved(true);
    showToast('Personal notes saved.');
    setTimeout(() => setIsSaved(false), 2000);
  };

  // Flashcard items list (combines vocab and kanji)
  const flashcardDeck = matchingVocab.length > 0
    ? matchingVocab.map(v => ({
        id: v.id,
        front: v.japanese,
        reading: v.romaji,
        meaning: v.meaningEnglish,
        meaningBangla: v.meaningBangla,
        example: v.exampleSentence?.japanese,
        exampleMeaning: v.exampleSentence?.english,
        type: 'vocab'
      }))
    : [
        {
          id: 'card-1',
          front: '学生',
          reading: 'がくせい (gakusei)',
          meaning: 'Student',
          meaningBangla: 'ছাত্র / ছাত্রী',
          example: '私は学生です。',
          exampleMeaning: 'I am a student.',
          type: 'vocab'
        },
        {
          id: 'card-2',
          front: '食べる',
          reading: 'たべる (taberu)',
          meaning: 'To eat',
          meaningBangla: 'খাওয়া',
          example: 'ご飯を食べます。',
          exampleMeaning: 'I eat rice/meal.',
          type: 'vocab'
        },
        {
          id: 'card-3',
          front: '本',
          reading: 'ほん (hon)',
          meaning: 'Book',
          meaningBangla: 'বই',
          example: 'これは本です。',
          exampleMeaning: 'This is a book.',
          type: 'vocab'
        }
      ];

  const currentCard = flashcardDeck[flashcardIndex] || flashcardDeck[0];

  const handleNextCard = () => {
    setIsFlipped(false);
    setFlashcardIndex(prev => (prev + 1) % flashcardDeck.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setFlashcardIndex(prev => (prev - 1 + flashcardDeck.length) % flashcardDeck.length);
  };

  const handleMarkCardKnown = () => {
    setKnownCards(prev => new Set(prev).add(currentCard.id));
    sound.playCorrect();
    showToast('Marked known. Keep going.');
    handleNextCard();
  };

  const handleMarkNeedReview = () => {
    setKnownCards(prev => {
      const next = new Set(prev);
      next.delete(currentCard.id);
      return next;
    });
    sound.playClick();
    showToast('Added to revision queue.');
    handleNextCard();
  };

  const toggleKanjiMeaning = (id: number) => {
    setHiddenMeanings(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleLearnedKanji = (id: number) => {
    setLearnedKanji(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        sound.playCorrect();
        showToast('Kanji marked learned.');
      }
      return next;
    });
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-all animate-fadeIn ${
      isFocusMode ? 'p-0 bg-white' : 'p-2 sm:p-4 md:p-6 bg-black/40 backdrop-blur-xs'
    }`}>
      <div className={`bg-white flex flex-col overflow-hidden text-[#222222] transition-all ${
        isFocusMode
          ? 'w-full h-full rounded-none border-none shadow-none'
          : 'border border-[#E5E7EB] rounded-2xl w-full max-w-5xl h-[92vh] shadow-2xl'
      }`}>
        
        {/* Header: Focus Mode Bar vs Standard Top Header */}
        {isFocusMode ? (
          <div className="px-4 sm:px-8 py-2.5 bg-white/95 backdrop-blur-md border-b border-[#E5E7EB] flex items-center justify-between gap-3 shrink-0 z-10 sticky top-0">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#1677B8]">Focus Mode</span>
              </div>
              <span className="text-xs text-[#D1D5DB]">•</span>
              <span className="text-xs font-semibold text-[#111827] truncate max-w-xs sm:max-w-md">
                {material.name}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Minimal Mode Switcher Tabs */}
              <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-[#E5E7EB] text-xs">
                <button
                  onClick={() => setActiveTab('textbook')}
                  className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                    activeTab === 'textbook'
                      ? 'bg-white text-[#1677B8] shadow-2xs'
                      : 'text-[#6B7280] hover:text-[#111827]'
                  }`}
                >
                  📖 Textbook
                </button>
                <button
                  onClick={() => setActiveTab('flashcards')}
                  className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                    activeTab === 'flashcards'
                      ? 'bg-white text-[#1677B8] shadow-2xs'
                      : 'text-[#6B7280] hover:text-[#111827]'
                  }`}
                >
                  📇 Flashcards
                </button>
                <button
                  onClick={() => setActiveTab('notes')}
                  className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                    activeTab === 'notes'
                      ? 'bg-white text-[#1677B8] shadow-2xs'
                      : 'text-[#6B7280] hover:text-[#111827]'
                  }`}
                >
                  📝 Notes
                </button>
              </div>

              <button
                onClick={() => {
                  setIsFocusMode(false);
                  sound.playClick();
                  showToast('Exited Focus Mode');
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#222222] hover:text-[#111827] text-xs font-semibold border border-[#E5E7EB] flex items-center gap-1.5 transition-all cursor-pointer"
                title="Exit Focus Mode (Esc)"
              >
                <Minimize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Exit Focus (Esc)</span>
              </button>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-[#6B7280] hover:text-[#111827] border border-[#E5E7EB] transition-colors cursor-pointer"
                title="Close Reader"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="px-4 sm:px-6 py-3 bg-white border-b border-[#E5E7EB] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#1677B8] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-2xs">
                <BookOpen className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#1677B8] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {material.category}
                  </span>
                  <span className="text-xs font-mono text-[#6B7280]">
                    Week {material.assignedWeek}
                  </span>
                  <span className="text-xs text-[#9CA3AF]">•</span>
                  <span className="text-xs text-[#6B7280] font-mono">
                    {material.pageRange || 'Reference'}
                  </span>
                </div>
                <h2 className="text-sm sm:text-base font-bold text-[#111827] truncate mt-0.5">
                  {material.name}
                </h2>
              </div>
            </div>

            {/* Unobtrusive Progress Bar, Focus Mode Button & Tab Navigation */}
            <div className="flex items-center gap-3">
              <div className="hidden md:flex flex-col items-end gap-1 text-right">
                <div className="text-[11px] font-mono text-[#6B7280]">
                  {completedSections}/{totalSections || 1} sections • <strong className="text-[#111827]">{progressPercent}%</strong>
                </div>
                <div className="w-28 bg-[#E5E7EB] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#1677B8] h-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Focus Mode Button */}
              <button
                onClick={() => {
                  setIsFocusMode(true);
                  sound.playClick();
                  showToast('Focus Mode enabled: distractions hidden');
                }}
                className="px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#1677B8] text-xs font-bold border border-blue-200 flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                title="Enter Focus Mode (Distraction-Free Reading)"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Focus Mode</span>
              </button>

              {/* Mode Switcher Tabs */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-[#E5E7EB]">
                <button
                  onClick={() => setActiveTab('textbook')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'textbook'
                      ? 'bg-white text-[#1677B8] shadow-2xs'
                      : 'text-[#6B7280] hover:text-[#111827]'
                  }`}
                >
                  📖 Textbook
                </button>
                <button
                  onClick={() => setActiveTab('flashcards')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'flashcards'
                      ? 'bg-white text-[#1677B8] shadow-2xs'
                      : 'text-[#6B7280] hover:text-[#111827]'
                  }`}
                >
                  📇 Flashcards
                </button>
                <button
                  onClick={() => setActiveTab('notes')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'notes'
                      ? 'bg-white text-[#1677B8] shadow-2xs'
                      : 'text-[#6B7280] hover:text-[#111827]'
                  }`}
                >
                  📝 Notes
                </button>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-[#6B7280] hover:text-[#111827] border border-[#E5E7EB] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Motivational Toast Notification (Requirement 13) */}
        {motivationalMessage && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-4 py-1.5 text-center text-xs font-medium text-emerald-800 flex items-center justify-center gap-1.5 animate-fadeIn">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>{motivationalMessage}</span>
          </div>
        )}

        {/* Modal Main Content Canvas */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Main Reading Screen (Pure White Background, Distraction-Free Digital Textbook) */}
          <div className="flex-1 p-5 sm:p-8 overflow-y-auto bg-white space-y-6 max-w-4xl mx-auto w-full">
            
            {/* TAB 1: Structured Digital Textbook Reading View */}
            {activeTab === 'textbook' && (
              <div className="space-y-6 animate-fadeIn pb-8">
                
                {/* Chapter Title & Overview */}
                <div className="border-b border-[#E5E7EB] pb-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1677B8]">
                      {material.chapterLesson || 'Lesson Content'}
                    </span>
                    <button
                      onClick={() => speakJapanese(material.title || material.name)}
                      className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-[#222222] border border-[#E5E7EB] flex items-center gap-1 text-xs cursor-pointer"
                      title="Pronounce title in Japanese"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-[#1677B8]" />
                      <span>Audio Pronounce</span>
                    </button>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight">
                    {material.title}
                  </h1>
                  <p className="text-sm text-[#4B5563] leading-relaxed">
                    {material.summary}
                  </p>
                </div>

                {/* Structured Grammar Explanation Section (Requirement 7) */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1677B8]">
                    <span>📖 Structured Grammar Point & Rules</span>
                  </div>

                  <div className="border border-[#E5E7EB] rounded-2xl p-5 bg-white space-y-4 shadow-2xs">
                    {/* Grammar point title & meaning */}
                    <div className="flex items-start justify-between gap-3 border-b border-[#E5E7EB] pb-3">
                      <div>
                        <div className="font-japanese text-xl font-bold text-[#111827]">
                          {material.category === 'Grammar'
                            ? (material.chapterLesson?.split(' ')[0] || '〜は〜です')
                            : '〜は (Topic Marker) / です (Copula)'}
                        </div>
                        <div className="text-xs text-[#6B7280] font-medium mt-0.5">
                          Meaning: <span className="font-semibold text-[#111827]">"is / am / are" (Polite Affirmative Predicate)</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-[#1677B8] border border-blue-200">
                        N5 Core Rule
                      </span>
                    </div>

                    {/* Grammar Sentence Formula / Structure */}
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-[#E5E7EB] space-y-1">
                      <div className="text-[10px] font-bold uppercase text-[#6B7280] tracking-wider">Structure Formula</div>
                      <div className="font-japanese text-sm font-bold text-[#1677B8]">
                        [ Noun 1 (Subject / Topic) ] は [ Noun 2 (Identity / State) ] です。
                      </div>
                    </div>

                    {/* Example Sentences */}
                    <div className="space-y-2.5">
                      <div className="text-[10px] font-bold uppercase text-[#6B7280] tracking-wider">Example Sentences & Usage</div>
                      <div className="space-y-2">
                        <div className="p-3 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#1677B8] transition-colors flex items-center justify-between gap-3">
                          <div className="space-y-0.5">
                            <div className="font-japanese text-base font-bold text-[#111827]">
                              わたしは がくせい です。
                            </div>
                            <div className="text-xs text-[#6B7280]">
                              I am a student. (আমি একজন ছাত্র।)
                            </div>
                          </div>
                          <button
                            onClick={() => speakJapanese('わたしはがくせいです')}
                            className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-[#1677B8] border border-[#E5E7EB] cursor-pointer"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="p-3 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#1677B8] transition-colors flex items-center justify-between gap-3">
                          <div className="space-y-0.5">
                            <div className="font-japanese text-base font-bold text-[#111827]">
                              これは にほんごの ほんです。
                            </div>
                            <div className="text-xs text-[#6B7280]">
                              This is a Japanese book. (এটি একটি জাপানি ভাষার বই।)
                            </div>
                          </div>
                          <button
                            onClick={() => speakJapanese('これはにほんごのほんです')}
                            className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-[#1677B8] border border-[#E5E7EB] cursor-pointer"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Common Mistake Alert */}
                    <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs space-y-1">
                      <div className="font-bold text-amber-900 flex items-center gap-1.5">
                        <span>⚠️ Common JLPT Mistake:</span>
                      </div>
                      <p className="text-amber-800 leading-relaxed">
                        Do not attach です to verbs ending in 〜ます (e.g. 食べますです is incorrect!). です is only used with nouns and adjectives.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Structured Vocabulary Section (Requirement 4 & 5) */}
                {matchingVocab.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1677B8]">
                        <span>📚 Key Vocabulary ({matchingVocab.length} Words)</span>
                      </div>
                      <button
                        onClick={() => setActiveTab('flashcards')}
                        className="text-xs font-bold text-[#1677B8] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>Practice with Flashcards</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {matchingVocab.map((vocab) => (
                        <div
                          key={vocab.id}
                          className="p-4 rounded-xl border border-[#E5E7EB] bg-white hover:border-[#1677B8] transition-all space-y-2 group shadow-2xs"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="font-japanese text-lg font-bold text-[#111827]">
                                {vocab.japanese}
                              </div>
                              <div className="text-xs font-mono text-[#6B7280]">
                                {vocab.romaji}
                              </div>
                            </div>
                            <button
                              onClick={() => speakJapanese(vocab.japanese)}
                              className="p-1.5 rounded-lg bg-slate-50 group-hover:bg-blue-50 text-[#1677B8] border border-[#E5E7EB] cursor-pointer"
                              title="Listen"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="text-xs font-semibold text-[#222222]">
                            {vocab.meaningEnglish}
                          </div>
                          <div className="text-xs text-emerald-700 font-medium">
                            বাংলা: {vocab.meaningBangla}
                          </div>

                          {vocab.exampleSentence && (
                            <div className="pt-2 border-t border-slate-100 text-[11px] space-y-0.5">
                              <div className="font-japanese text-[#111827] font-medium">
                                {vocab.exampleSentence.japanese}
                              </div>
                              <div className="text-[#6B7280]">
                                {vocab.exampleSentence.english}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Structured Kanji Study Cards Section (Requirement 8) */}
                {matchingKanji.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1677B8]">
                        <span>漢 Target Kanji ({matchingKanji.length} Characters)</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {matchingKanji.map((kanji) => {
                        const isMeaningHidden = hiddenMeanings[kanji.id];
                        const isLearned = learnedKanji.has(kanji.id);

                        return (
                          <div
                            key={kanji.id}
                            className="p-4 rounded-xl border border-[#E5E7EB] bg-white hover:border-[#1677B8] transition-all space-y-3 shadow-2xs"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-[#E5E7EB] font-japanese text-2xl font-bold text-[#111827] flex items-center justify-center">
                                  {kanji.kanji}
                                </div>
                                <div>
                                  <div className="text-xs font-mono text-[#6B7280]">
                                    {kanji.strokes} strokes
                                  </div>
                                  <div className="text-xs font-japanese text-[#111827] font-semibold">
                                    {kanji.onyomi.join('・')} / {kanji.kunyomi.join('・')}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={() => toggleKanjiMeaning(kanji.id)}
                                  className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-[#6B7280] border border-[#E5E7EB] cursor-pointer"
                                  title="Show / Hide Meaning"
                                >
                                  {isMeaningHidden ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                </button>
                                <button
                                  onClick={() => toggleLearnedKanji(kanji.id)}
                                  className={`p-1.5 rounded-lg border text-xs font-bold cursor-pointer transition-colors ${
                                    isLearned
                                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                                      : 'bg-slate-50 text-[#6B7280] border-[#E5E7EB] hover:text-[#111827]'
                                  }`}
                                  title="Mark as Learned"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            {!isMeaningHidden ? (
                              <div className="space-y-1 text-xs">
                                <div className="font-semibold text-[#111827]">
                                  Meaning: {kanji.meaningEnglish}
                                </div>
                                <div className="text-emerald-700">
                                  বাংলা: {kanji.meaningBangla}
                                </div>
                              </div>
                            ) : (
                              <div className="text-xs italic text-[#9CA3AF] py-1">
                                [ Meaning hidden for recall practice ]
                              </div>
                            )}

                            {/* Kanji Compounds */}
                            <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-2">
                              {kanji.examples.slice(0, 2).map((ex, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-0.5 rounded bg-slate-50 border border-[#E5E7EB] text-[11px] font-japanese text-[#222222]"
                                >
                                  <strong>{ex.word}</strong> ({ex.reading}): {ex.meaningEnglish}
                                </span>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Raw Content Snippet & Reference */}
                {material.contentSnippet && (
                  <div className="space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
                      <span>Source Lesson Notes & Detailed Tables</span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-[#E5E7EB] text-xs font-japanese whitespace-pre-wrap leading-relaxed text-[#222222]">
                      {material.contentSnippet}
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* TAB 2: Interactive Flashcard Study Deck (Requirement 6) */}
            {activeTab === 'flashcards' && (
              <div className="space-y-6 animate-fadeIn max-w-xl mx-auto py-4">
                <div className="flex items-center justify-between text-xs text-[#6B7280]">
                  <span>Flashcard {flashcardIndex + 1} of {flashcardDeck.length}</span>
                  <span className="font-mono text-emerald-700 font-bold">
                    {knownCards.size} Mastered
                  </span>
                </div>

                {/* 3D Flipcard Container */}
                <div
                  onClick={() => setIsFlipped(f => !f)}
                  className="perspective-1000 w-full h-80 cursor-pointer select-none"
                >
                  <div
                    className={`relative w-full h-full rounded-2xl border border-[#E5E7EB] transition-transform duration-300 transform-style-3d shadow-md ${
                      isFlipped ? 'rotate-y-180' : ''
                    } bg-white`}
                  >
                    {/* Front of Card */}
                    <div className="absolute inset-0 p-8 flex flex-col items-center justify-between backface-hidden bg-white rounded-2xl">
                      <div className="w-full flex items-center justify-between text-xs text-[#9CA3AF]">
                        <span className="uppercase font-bold tracking-wider">Japanese Prompt</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            speakJapanese(currentCard.front);
                          }}
                          className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-[#1677B8] border border-[#E5E7EB]"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-center space-y-3">
                        <div className="font-japanese text-4xl sm:text-5xl font-bold text-[#111827] tracking-wider">
                          {currentCard.front}
                        </div>
                        <div className="text-xs text-[#9CA3AF]">
                          Click anywhere to flip card
                        </div>
                      </div>

                      <div className="text-[11px] text-[#1677B8] font-semibold flex items-center gap-1">
                        <RotateCw className="w-3.5 h-3.5" />
                        <span>Tap to reveal reading & meaning</span>
                      </div>
                    </div>

                    {/* Back of Card */}
                    <div className="absolute inset-0 p-8 flex flex-col items-center justify-between rotate-y-180 backface-hidden bg-slate-50 rounded-2xl border border-[#E5E7EB]">
                      <div className="w-full flex items-center justify-between text-xs text-[#6B7280]">
                        <span className="uppercase font-bold tracking-wider">Meaning & Reading</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            speakJapanese(currentCard.front);
                          }}
                          className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-[#1677B8] border border-[#E5E7EB]"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-center space-y-2">
                        <div className="font-japanese text-2xl font-bold text-[#1677B8]">
                          {currentCard.reading}
                        </div>
                        <div className="text-xl font-bold text-[#111827]">
                          {currentCard.meaning}
                        </div>
                        <div className="text-sm font-medium text-emerald-700">
                          {currentCard.meaningBangla}
                        </div>
                        {currentCard.example && (
                          <div className="pt-3 border-t border-[#E5E7EB] text-xs text-[#4B5563] font-japanese">
                            {currentCard.example} ({currentCard.exampleMeaning})
                          </div>
                        )}
                      </div>

                      <div className="text-[11px] text-[#6B7280]">
                        Click to flip back
                      </div>
                    </div>
                  </div>
                </div>

                {/* Controls Bar: Prev, Flip, Next, I Know, Need Review */}
                <div className="flex items-center justify-between gap-3 pt-2">
                  <button
                    onClick={handlePrevCard}
                    className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#222222] text-xs font-semibold flex items-center gap-1 border border-[#E5E7EB] cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleMarkNeedReview}
                      className="px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold border border-rose-200 flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>Need Review</span>
                    </button>

                    <button
                      onClick={handleMarkCardKnown}
                      className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>I Know</span>
                    </button>
                  </div>

                  <button
                    onClick={handleNextCard}
                    className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#222222] text-xs font-semibold flex items-center gap-1 border border-[#E5E7EB] cursor-pointer"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: Personal Notes & Study Log (Requirement 15) */}
            {activeTab === 'notes' && (
              <div className="space-y-5 animate-fadeIn max-w-2xl mx-auto py-2">
                <div className="border-b border-[#E5E7EB] pb-3">
                  <h3 className="text-base font-bold text-[#111827]">
                    Personal Study Notes & Reflections
                  </h3>
                  <p className="text-xs text-[#6B7280]">
                    Jot down tricky particle nuances, confusing Kanji mnemonics, or key points for Week {material.assignedWeek}.
                  </p>
                </div>

                <div className="space-y-3">
                  <textarea
                    rows={8}
                    value={personalNotes}
                    onChange={(e) => setPersonalNotes(e.target.value)}
                    placeholder="Write your custom notes for this lesson here (e.g., difference between は and が, counters to memorize, etc.)..."
                    className="w-full p-4 rounded-2xl bg-white border border-[#E5E7EB] text-xs text-[#222222] placeholder-[#9CA3AF] focus:outline-none focus:border-[#1677B8] resize-none leading-relaxed shadow-2xs"
                  />
                  <button
                    onClick={handleSaveNotes}
                    className="w-full py-2.5 rounded-xl bg-[#1677B8] hover:bg-[#136298] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Notes to Notebook</span>
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Right Sidebar: Chapter Sections Checklist (Hidden in Focus Mode) */}
          {!isFocusMode && (
            <div className="w-full md:w-80 p-5 bg-slate-50 border-t md:border-t-0 md:border-l border-[#E5E7EB] flex flex-col justify-between overflow-y-auto space-y-5">
              
              {/* Sections Progress Checklist */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-[#6B7280] uppercase tracking-wider">
                  <span>Chapter Sections</span>
                  <span className="text-emerald-700 font-mono text-[11px]">
                    {completedSections}/{totalSections || 1} Done
                  </span>
                </div>

                {material.sections && material.sections.length > 0 ? (
                  <div className="space-y-2">
                    {material.sections.map((sec) => (
                      <div
                        key={sec.id}
                        onClick={() => handleToggleSection(sec.id)}
                        className={`p-3 rounded-xl border flex items-center justify-between gap-2.5 cursor-pointer transition-all ${
                          sec.completed
                            ? 'bg-white border-emerald-200 text-[#9CA3AF]'
                            : 'bg-white border-[#E5E7EB] text-[#222222] hover:border-[#1677B8]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {sec.completed ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          ) : (
                            <Circle className="w-4 h-4 text-[#9CA3AF] shrink-0" />
                          )}
                          <span className={`text-xs truncate ${sec.completed ? 'line-through text-[#9CA3AF]' : 'text-[#111827] font-medium'}`}>
                            {sec.title}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-[#9CA3AF] shrink-0">
                          p.{sec.page}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 bg-white rounded-xl border border-[#E5E7EB] text-xs text-[#6B7280]">
                    Core reference document. Read through topics to master the lesson points.
                  </div>
                )}
              </div>

              {/* Material Study Plan & Next Revision Info */}
              <div className="p-4 rounded-xl bg-white border border-[#E5E7EB] space-y-2 text-xs">
                <div className="font-bold text-[#111827] flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-[#1677B8]" />
                  <span>Study Summary</span>
                </div>
                <div className="text-[11px] text-[#6B7280] space-y-1">
                  <div>• Assigned: <strong>Week {material.assignedWeek}</strong></div>
                  <div>• Source: <strong>{material.sourceFile}</strong></div>
                  <div>• Next Revision: <strong>Scheduled via SRS</strong></div>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

