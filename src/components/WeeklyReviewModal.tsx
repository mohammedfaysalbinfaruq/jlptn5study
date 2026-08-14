import React, { useState } from 'react';
import {
  X,
  BarChart3,
  CheckCircle2,
  Clock,
  Sparkles,
  Calendar,
  Save,
  Trophy
} from 'lucide-react';
import { AppState, WeeklyReviewNote } from '../types';
import { ROADMAP_WEEKS } from '../data/roadmapData';
import { sound } from '../utils/audio';

interface WeeklyReviewModalProps {
  state: AppState;
  onClose: () => void;
  onUpdateState: (updater: (prev: AppState) => AppState) => void;
}

export const WeeklyReviewModal: React.FC<WeeklyReviewModalProps> = ({
  state,
  onClose,
  onUpdateState
}) => {
  const currentWeek = state.currentWeekNumber;
  const weekData = ROADMAP_WEEKS.find(w => w.weekNumber === currentWeek) || ROADMAP_WEEKS[0];

  const existingReview = state.weeklyReviews.find(w => w.weekNumber === currentWeek);
  const [retroNotes, setRetroNotes] = useState(existingReview?.retroNotes || '');
  const [confidenceScore, setConfidenceScore] = useState(existingReview?.confidenceScore || 4);
  const [isSaved, setIsSaved] = useState(false);

  // Compute weekly statistics
  const weeklyExams = state.examResults.filter(e => e.week === currentWeek);
  const avgExamScore = weeklyExams.length > 0
    ? Math.round(weeklyExams.reduce((acc, e) => acc + e.scorePercentage, 0) / weeklyExams.length)
    : 80;

  const totalWeeklyHours = state.studyLogs
    .filter(l => l.date >= '2026-08-16') // current week window
    .reduce((acc, l) => acc + l.durationMinutes / 60, 0);

  const handleSaveRetro = (e: React.FormEvent) => {
    e.preventDefault();

    const reviewItem: WeeklyReviewNote = {
      weekNumber: currentWeek,
      dateCompleted: state.simulatedCurrentDate,
      hoursStudied: Number(totalWeeklyHours.toFixed(1)),
      questionsAnswered: weeklyExams.reduce((acc, e) => acc + e.totalQuestions, 0),
      avgDailyScore: avgExamScore,
      retroNotes: retroNotes.trim(),
      confidenceScore
    };

    onUpdateState(prev => ({
      ...prev,
      weeklyReviews: [
        ...prev.weeklyReviews.filter(w => w.weekNumber !== currentWeek),
        reviewItem
      ]
    }));

    sound.playSuccessChime();
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white border border-[#E5E7EB] rounded-2xl w-full max-w-lg p-6 shadow-xl space-y-5 text-[#222222]">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1677B8] text-white flex items-center justify-center shadow-2xs">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#111827]">
                Week {currentWeek} Retrospective Review
              </h2>
              <span className="text-xs text-[#6B7280]">
                {weekData.title}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-[#6B7280] hover:text-[#111827] border border-[#E5E7EB] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Weekly Stats Grid */}
        <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-[#E5E7EB]">
            <div className="text-[10px] text-[#6B7280] uppercase font-bold">Study Time</div>
            <div className="text-lg font-black text-[#1677B8] font-mono mt-0.5">
              {totalWeeklyHours > 0 ? `${totalWeeklyHours.toFixed(1)}h` : `${state.streaks.totalStudyHours.toFixed(1)}h`}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-[#E5E7EB]">
            <div className="text-[10px] text-[#6B7280] uppercase font-bold">Avg Exam Score</div>
            <div className="text-lg font-black text-emerald-700 font-mono mt-0.5">
              {avgExamScore}%
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-[#E5E7EB]">
            <div className="text-[10px] text-[#6B7280] uppercase font-bold">Active Streak</div>
            <div className="text-lg font-black text-amber-600 font-mono mt-0.5">
              {state.streaks.currentStreak} Days
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSaveRetro} className="space-y-4 text-xs">
          <div>
            <label className="text-[#111827] font-bold block mb-1.5">
              Confidence Level for Week {currentWeek} Syllabus (1 to 5):
            </label>
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setConfidenceScore(lvl)}
                  className={`py-2 rounded-lg font-bold border transition-all cursor-pointer ${
                    confidenceScore === lvl
                      ? 'bg-[#1677B8] text-white border-[#1677B8] shadow-2xs'
                      : 'bg-white text-[#222222] border-[#E5E7EB] hover:bg-slate-50'
                  }`}
                >
                  {lvl} ★
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[#111827] font-bold block mb-1.5">
              Weekly Retrospective Notes & Lessons Learned:
            </label>
            <textarea
              rows={4}
              value={retroNotes}
              onChange={(e) => setRetroNotes(e.target.value)}
              placeholder="What went well this week? Which particle or kanji needs extra flashcard drill? What is the priority for next week?"
              className="w-full p-3 rounded-xl bg-slate-50 border border-[#E5E7EB] text-[#222222] placeholder-[#9CA3AF] text-xs focus:outline-none focus:border-[#1677B8] resize-none leading-relaxed"
              required
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-[#1677B8] hover:bg-[#136298] text-white font-bold text-xs shadow-2xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{isSaved ? 'Retrospective Saved ✓' : 'Save Week Retrospective'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
