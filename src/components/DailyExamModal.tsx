import React, { useState, useEffect } from 'react';
import {
  X,
  GraduationCap,
  Clock,
  CheckCircle2,
  XCircle,
  Volume2,
  ChevronRight,
  AlertTriangle,
  Sparkles,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Check,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AppState, DailyExamResult, ExamQuestion, MistakeItem } from '../types';
import { getAdaptiveExamQuestions } from '../data/questionsDatabase';
import { sound, speakJapanese } from '../utils/audio';

interface DailyExamModalProps {
  state: AppState;
  onClose: () => void;
  onSaveResult: (result: DailyExamResult, newMistakes: MistakeItem[]) => void;
}

export const DailyExamModal: React.FC<DailyExamModalProps> = ({
  state,
  onClose,
  onSaveResult
}) => {
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState<Record<number, boolean>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [examResultSummary, setExamResultSummary] = useState<{
    correctCount: number;
    wrongCount: number;
    scorePercentage: number;
    weakTopics: string[];
    wrongQuestions: {
      question: ExamQuestion;
      userAnswer: string;
      correctAnswer: string;
    }[];
  } | null>(null);

  // Initialize adaptive questions on load
  useEffect(() => {
    const unmasteredMistakeIds = state.mistakes.filter(m => !m.mastered).map(m => m.questionId);
    const generated = getAdaptiveExamQuestions(
      state.currentWeekNumber,
      unmasteredMistakeIds,
      state.settings.dailyQuestionCount || 10
    );
    setQuestions(generated);
  }, [state.currentWeekNumber, state.mistakes, state.settings.dailyQuestionCount]);

  // Timer tick
  useEffect(() => {
    if (isFinished) return;
    const interval = setInterval(() => {
      setSecondsElapsed(s => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isFinished]);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (optionIndex: number) => {
    if (selectedAnswers[currentIndex] !== undefined) return; // already answered

    const isCorrect = optionIndex === currentQ.correctIndex;
    if (isCorrect) {
      if (state.settings.soundEnabled) sound.playCorrect();
    } else {
      if (state.settings.soundEnabled) sound.playIncorrect();
    }

    setSelectedAnswers(prev => ({
      ...prev,
      [currentIndex]: optionIndex
    }));

    setShowExplanation(prev => ({
      ...prev,
      [currentIndex]: true
    }));
  };

  const handleFinishExam = () => {
    setIsFinished(true);

    let correctCount = 0;
    const categoryBreakdown: Record<string, { correct: number; total: number }> = {};
    const newMistakes: MistakeItem[] = [];
    const mistakeQuestionIds: string[] = [];
    const wrongQuestionsList: {
      question: ExamQuestion;
      userAnswer: string;
      correctAnswer: string;
    }[] = [];

    questions.forEach((q, idx) => {
      const userChoice = selectedAnswers[idx];
      const isCorrect = userChoice === q.correctIndex;

      // Category breakdown
      if (!categoryBreakdown[q.category]) {
        categoryBreakdown[q.category] = { correct: 0, total: 0 };
      }
      categoryBreakdown[q.category].total += 1;

      if (isCorrect) {
        correctCount += 1;
        categoryBreakdown[q.category].correct += 1;
      } else {
        mistakeQuestionIds.push(q.id);
        const wrongAnswerStr = userChoice !== undefined ? q.options[userChoice] : 'Unanswered';
        const correctAnswerStr = q.options[q.correctIndex];

        wrongQuestionsList.push({
          question: q,
          userAnswer: wrongAnswerStr,
          correctAnswer: correctAnswerStr
        });

        // Record or increment mistake
        const existingMistake = state.mistakes.find(m => m.questionId === q.id);
        const mistakeItem: MistakeItem = {
          id: existingMistake ? existingMistake.id : `mst-${Date.now()}-${idx}`,
          questionId: q.id,
          questionText: q.questionText,
          category: q.category,
          userWrongAnswer: wrongAnswerStr,
          correctAnswer: correctAnswerStr,
          explanation: q.explanation,
          explanationBangla: q.explanationBangla,
          dateAdded: existingMistake ? existingMistake.dateAdded : state.simulatedCurrentDate,
          frequency: existingMistake ? existingMistake.frequency + 1 : 1,
          mastered: false,
          lastTested: state.simulatedCurrentDate
        };
        newMistakes.push(mistakeItem);
      }
    });

    const wrongCount = questions.length - correctCount;
    const scorePercentage = Math.round((correctCount / questions.length) * 100);

    // Identify weak topics
    const weakTopics: string[] = [];
    Object.entries(categoryBreakdown).forEach(([cat, data]) => {
      if (data.total > 0 && (data.correct / data.total) < 0.7) {
        weakTopics.push(`${cat} (${data.correct}/${data.total} correct)`);
      }
    });

    setExamResultSummary({
      correctCount,
      wrongCount,
      scorePercentage,
      weakTopics,
      wrongQuestions: wrongQuestionsList
    });

    if (scorePercentage >= 80) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
      if (state.settings.soundEnabled) sound.playSuccessChime();
    }

    const examResult: DailyExamResult = {
      id: `exam-${Date.now()}`,
      date: state.simulatedCurrentDate,
      week: state.currentWeekNumber,
      totalQuestions: questions.length,
      correctCount,
      scorePercentage,
      timeTakenSeconds: secondsElapsed,
      categoryBreakdown,
      mistakeQuestionIds
    };

    onSaveResult(examResult, newMistakes);
  };

  const handleRetakeExam = () => {
    setIsFinished(false);
    setCurrentIndex(0);
    setSelectedAnswers({});
    setShowExplanation({});
    setSecondsElapsed(0);
    setExamResultSummary(null);

    const unmasteredMistakeIds = state.mistakes.filter(m => !m.mastered).map(m => m.questionId);
    const generated = getAdaptiveExamQuestions(
      state.currentWeekNumber,
      unmasteredMistakeIds,
      state.settings.dailyQuestionCount || 10
    );
    setQuestions(generated);
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/40 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white border border-[#E5E7EB] rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-[#222222]">
        
        {/* Top Header */}
        <div className="px-5 py-3.5 bg-slate-50 border-b border-[#E5E7EB] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#1677B8] text-white flex items-center justify-center font-bold text-sm shadow-2xs">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-[#111827]">
                Daily Adaptive Short Exam ({questions.length} Questions)
              </h2>
              <div className="text-xs text-[#6B7280]">
                Week {state.currentWeekNumber} Content • Auto-Mistake Recording • Instant Explanations
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-[#E5E7EB] text-xs font-mono text-[#222222]">
              <Clock className="w-3.5 h-3.5 text-[#1677B8]" />
              <span>{formatTimer(secondsElapsed)}</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-[#6B7280] hover:text-[#111827] border border-[#E5E7EB] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        {!isFinished ? (
          <div className="p-5 sm:p-6 flex-1 overflow-y-auto flex flex-col justify-between space-y-5">
            {currentQ && (
              <div className="space-y-4">
                
                {/* Question Progress bar & Meta */}
                <div className="flex items-center justify-between text-xs text-[#6B7280]">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#1677B8]">Question {currentIndex + 1} of {questions.length}</span>
                    <span>•</span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 border border-[#E5E7EB] text-[#222222] text-[10px]">
                      {currentQ.category}
                    </span>
                  </div>
                  {currentQ.sourceMaterial && (
                    <span className="text-[11px] text-[#9CA3AF] font-mono hidden sm:inline">
                      {currentQ.sourceMaterial}
                    </span>
                  )}
                </div>

                {/* Progress bar line */}
                <div className="w-full bg-[#E5E7EB] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#1677B8] h-full transition-all duration-300"
                    style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                  />
                </div>

                {/* Question Prompt */}
                <div className="p-5 rounded-xl bg-slate-50 border border-[#E5E7EB] space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="font-japanese text-base sm:text-lg font-bold text-[#111827] leading-relaxed">
                      {currentQ.questionText}
                    </div>
                    <button
                      onClick={() => speakJapanese(currentQ.questionText)}
                      className="p-2 rounded-lg bg-white hover:bg-slate-100 border border-[#E5E7EB] text-[#1677B8] shrink-0 cursor-pointer"
                      title="Listen audio"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  {currentQ.passageText && (
                    <div className="p-3.5 rounded-lg bg-white border border-[#E5E7EB] text-xs font-japanese leading-relaxed text-[#222222] whitespace-pre-wrap">
                      {currentQ.passageText}
                    </div>
                  )}
                </div>

                {/* Options List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {currentQ.options.map((opt, optIdx) => {
                    const isAnswered = selectedAnswers[currentIndex] !== undefined;
                    const isUserPick = selectedAnswers[currentIndex] === optIdx;
                    const isCorrect = optIdx === currentQ.correctIndex;

                    let btnStyle = 'bg-white border-[#E5E7EB] text-[#222222] hover:border-[#1677B8] hover:bg-slate-50';
                    if (isAnswered) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-800 font-bold';
                      } else if (isUserPick) {
                        btnStyle = 'bg-rose-50 border-rose-400 text-rose-800 font-bold';
                      } else {
                        btnStyle = 'bg-slate-50 border-[#E5E7EB] text-[#9CA3AF] opacity-60';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={isAnswered}
                        onClick={() => handleSelectOption(optIdx)}
                        className={`p-3.5 rounded-xl border text-left font-japanese text-sm flex items-center justify-between gap-3 transition-all cursor-pointer ${btnStyle}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-slate-100 border border-[#E5E7EB] text-xs flex items-center justify-center text-[#6B7280] font-sans font-bold">
                            {optIdx + 1}
                          </span>
                          <span>{opt}</span>
                        </div>
                        {isAnswered && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                        {isAnswered && isUserPick && !isCorrect && (
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Immediate Explanation Drawer */}
                {showExplanation[currentIndex] && (
                  <div className="p-4 rounded-xl bg-slate-50 border border-[#E5E7EB] space-y-2 text-xs animate-fadeIn">
                    <div className="flex items-center gap-1.5 text-[#1677B8] font-bold uppercase text-[10px] tracking-wider">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Answer Explanation & Grammar Point</span>
                    </div>
                    <p className="text-[#222222] leading-relaxed">
                      {currentQ.explanation}
                    </p>
                    {currentQ.explanationBangla && (
                      <p className="text-emerald-700 leading-relaxed font-medium">
                        বাংলা ব্যাখ্যা: {currentQ.explanationBangla}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Bottom Nav Bar */}
            <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
              <button
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex(c => c - 1)}
                className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#222222] text-xs disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer border border-[#E5E7EB]"
              >
                Previous
              </button>

              {currentIndex < questions.length - 1 ? (
                <button
                  disabled={selectedAnswers[currentIndex] === undefined}
                  onClick={() => setCurrentIndex(c => c + 1)}
                  className="px-4 py-2 rounded-lg bg-[#1677B8] hover:bg-[#136298] text-white text-xs font-bold disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <span>Next Question</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  disabled={selectedAnswers[currentIndex] === undefined}
                  onClick={handleFinishExam}
                  className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold disabled:opacity-40 disabled:pointer-events-none transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Finish & Grade Exam</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Rich Results View */
          <div className="p-6 sm:p-8 flex-1 overflow-y-auto space-y-6">
            <div className="text-center space-y-2 max-w-md mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 text-[#1677B8] mx-auto flex items-center justify-center text-2xl shadow-2xs">
                🏆
              </div>
              <h3 className="text-xl font-extrabold text-[#111827]">
                Exam Graded Successfully!
              </h3>
              <p className="text-xs text-[#6B7280]">
                Completed in {formatTimer(secondsElapsed)}. Errors were automatically synchronized to your Mistake Notebook.
              </p>
            </div>

            {/* Score & Key Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-xl bg-slate-50 border border-[#E5E7EB] text-center">
                <span className="text-[10px] font-bold uppercase text-[#6B7280]">Score</span>
                <div className="text-3xl font-black font-mono text-[#111827] mt-1">
                  {examResultSummary?.scorePercentage}%
                </div>
                <span className="text-[10px] text-[#6B7280]">Composite</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-[#E5E7EB] text-center">
                <span className="text-[10px] font-bold uppercase text-[#6B7280]">Correct</span>
                <div className="text-3xl font-black font-mono text-emerald-700 mt-1">
                  {examResultSummary?.correctCount}
                </div>
                <span className="text-[10px] text-[#6B7280]">Answers</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-[#E5E7EB] text-center">
                <span className="text-[10px] font-bold uppercase text-[#6B7280]">Wrong</span>
                <div className="text-3xl font-black font-mono text-[#E53935] mt-1">
                  {examResultSummary?.wrongCount}
                </div>
                <span className="text-[10px] text-[#6B7280]">Added to Notebook</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-[#E5E7EB] text-center">
                <span className="text-[10px] font-bold uppercase text-[#6B7280]">Time</span>
                <div className="text-3xl font-black font-mono text-[#1677B8] mt-1">
                  {formatTimer(secondsElapsed)}
                </div>
                <span className="text-[10px] text-[#6B7280]">Duration</span>
              </div>
            </div>

            {/* Identified Weak Topics */}
            {examResultSummary && examResultSummary.weakTopics.length > 0 && (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-2">
                <div className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Identified Weak Topics to Revisit</span>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {examResultSummary.weakTopics.map((topic, i) => (
                    <span key={i} className="px-3 py-1 rounded-lg bg-white border border-amber-300 text-amber-900 text-xs font-semibold">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Wrong Answers Detailed Review List */}
            {examResultSummary && examResultSummary.wrongQuestions.length > 0 && (
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase text-[#E53935] tracking-wider flex items-center gap-1.5">
                  <XCircle className="w-4 h-4" />
                  <span>Review Incorrect Questions & Explanations</span>
                </div>

                <div className="space-y-3">
                  {examResultSummary.wrongQuestions.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-rose-200 space-y-2 text-xs">
                      <div className="font-japanese text-sm font-bold text-[#111827]">
                        {item.question.questionText}
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-[11px]">
                        <span className="text-rose-700">Your answer: <strong className="font-japanese">{item.userAnswer}</strong></span>
                        <span className="text-emerald-700">Correct answer: <strong className="font-japanese">{item.correctAnswer}</strong></span>
                      </div>
                      <p className="text-[#222222] leading-relaxed pt-1">
                        {item.question.explanation}
                      </p>
                      {item.question.explanationBangla && (
                        <p className="text-emerald-700 font-medium">
                          বাংলা: {item.question.explanationBangla}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleRetakeExam}
                className="flex-1 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#222222] text-xs font-semibold flex items-center justify-center gap-2 border border-[#E5E7EB] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Drill</span>
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-lg bg-[#1677B8] hover:bg-[#136298] text-white text-xs font-bold transition-colors shadow-2xs cursor-pointer text-center"
              >
                Return to Today Dashboard
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
