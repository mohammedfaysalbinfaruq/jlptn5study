import React from 'react';
import {
  Calendar,
  CheckCircle2,
  Circle,
  Play,
  Flame,
  Clock,
  BookOpen,
  AlertTriangle,
  RefreshCw,
  Target,
  Trophy,
  ArrowRight,
  Sparkles,
  ChevronRight,
  CheckSquare,
  GraduationCap
} from 'lucide-react';
import { AppState, DailyChecklistItem, StudyMaterial } from '../types';
import {
  getDaysRemaining,
  calculateReadiness,
  calculateDailyPerformanceScore,
  calculateTotalStudyMinutes,
  formatTotalStudyTime,
  getTodayStudyMinutes
} from '../utils/storage';
import { ROADMAP_WEEKS } from '../data/roadmapData';
import { sound } from '../utils/audio';

interface DashboardViewProps {
  state: AppState;
  onUpdateState: (updater: (prev: AppState) => AppState) => void;
  onNavigateToTab: (tabId: string) => void;
  onOpenExam: () => void;
  onOpenPdf: (material: StudyMaterial) => void;
  onOpenTimer: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  state,
  onUpdateState,
  onNavigateToTab,
  onOpenExam,
  onOpenPdf,
  onOpenTimer
}) => {
  const daysLeft = getDaysRemaining(state.examDate, state.simulatedCurrentDate);
  const isExamDay = daysLeft === 0;

  const currentWeekData = ROADMAP_WEEKS.find(w => w.weekNumber === state.currentWeekNumber) || ROADMAP_WEEKS[0];

  const readiness = calculateReadiness(state);

  const totalStudiedMinutes = calculateTotalStudyMinutes(state);
  const totalStudyTime = formatTotalStudyTime(totalStudiedMinutes);
  const todayStudyMinutes = getTodayStudyMinutes(state);
  const todayStudyTime = formatTotalStudyTime(todayStudyMinutes);
  const completedSessionsCount = state.studyLogs.length;
  const todaySessionsCount = state.studyLogs.filter(l => l.date === state.simulatedCurrentDate).length;

  const todayList: DailyChecklistItem[] = state.checklists[state.simulatedCurrentDate] || [];
  const completedCount = todayList.filter(t => t.completed).length;
  const checklistPercentage = todayList.length > 0 ? Math.round((completedCount / todayList.length) * 100) : 0;

  const todayExam = state.examResults.find(e => e.date === state.simulatedCurrentDate);
  const dailyScore = calculateDailyPerformanceScore(todayList, todayExam);

  const dueSrsItems = state.srsQueue.filter(s => s.nextReviewDate <= state.simulatedCurrentDate);
  const unmasteredMistakes = state.mistakes.filter(m => !m.mastered);

  // Toggle checklist item completion
  const handleToggleTask = (taskId: string) => {
    onUpdateState(prev => {
      const currentList = prev.checklists[prev.simulatedCurrentDate] || [];
      const updatedList = currentList.map(item => {
        if (item.id === taskId) {
          const nextCompleted = !item.completed;
          if (nextCompleted && prev.settings.soundEnabled) {
            sound.playCorrect();
          }
          return { ...item, completed: nextCompleted };
        }
        return item;
      });

      return {
        ...prev,
        checklists: {
          ...prev.checklists,
          [prev.simulatedCurrentDate]: updatedList
        }
      };
    });
  };

  const getReadinessColor = (label: string) => {
    if (label === 'Strong') return 'text-emerald-800 border-emerald-200 bg-emerald-50';
    if (label === 'Improving') return 'text-amber-800 border-amber-200 bg-amber-50';
    return 'text-red-700 border-red-200 bg-red-50';
  };

  return (
    <div className="space-y-5 pb-8 max-w-7xl mx-auto text-[#222222]">
      {/* Top Banner Alert if Exam is near */}
      {daysLeft <= 30 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between gap-4 text-[#222222] shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#E53935] flex items-center justify-center font-bold text-lg text-white shadow-2xs">
              ⏳
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#E53935]">Final Countdown Phase Active</h3>
              <p className="text-xs text-[#6B7280]">
                Less than a month until 6 December 2026. Focus heavily on full-length mock exams and mistake notebook revisions.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigateToTab('mocks')}
            className="px-3.5 py-1.5 rounded-lg bg-[#E53935] hover:bg-red-700 text-white text-xs font-semibold shrink-0 transition-colors shadow-2xs cursor-pointer"
          >
            Open Mock Tests
          </button>
        </div>
      )}

      {/* Main Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        
        {/* Bento 1: Master Countdown & Week Info (Large 2 cols on Desktop) */}
        <div className="md:col-span-2 bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-2xs relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#1677B8]" />
                Target Exam Date: 6 December 2026
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-[#111827] border border-[#E5E7EB]">
                Week {state.currentWeekNumber} of 12
              </span>
            </div>

            <div className="flex items-baseline gap-3 my-2">
              <h1 className="text-4xl sm:text-5xl font-black text-[#111827] tracking-tight font-mono">
                {daysLeft}
              </h1>
              <div>
                <div className="text-lg font-bold text-[#E53935]">
                  {isExamDay ? 'Exam Day! 🇯🇵' : 'Days Left'}
                </div>
                <div className="text-xs text-[#6B7280]">
                  Current Date: <span className="font-mono text-[#222222] font-medium">{state.simulatedCurrentDate}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-[#E5E7EB]">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-[#111827]">
                  {currentWeekData.title}
                </span>
                <span className="text-[#1677B8] font-mono text-[11px] font-semibold">
                  {currentWeekData.minnaLessons}
                </span>
              </div>
              <p className="text-xs text-[#6B7280] line-clamp-1">
                {currentWeekData.focusTopic}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#E5E7EB] flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1.5 text-[#6B7280]">
                <span>Today&apos;s Score:</span>
                <span className={`font-bold font-mono px-2 py-0.5 rounded ${
                  dailyScore >= 80 ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-amber-50 text-amber-800 border border-amber-200'
                }`}>
                  {dailyScore}%
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[#6B7280]">
                <Clock className="w-3.5 h-3.5 text-[#1677B8]" />
                <span>Total Studied:</span>
                <span className="font-bold font-mono text-[#111827] bg-slate-100 border border-[#E5E7EB] px-2 py-0.5 rounded">
                  {totalStudyTime.formatted}
                </span>
              </div>
            </div>
            <button
              onClick={() => onNavigateToTab('roadmap')}
              className="text-[#1677B8] hover:text-[#136298] font-medium flex items-center gap-1 group cursor-pointer"
            >
              <span>View Full 12-Week Roadmap</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Bento 2: N5 Preparation Readiness */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-[#1677B8]" />
                N5 Readiness
              </span>
              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${getReadinessColor(readiness.statusLabel)}`}>
                {readiness.statusLabel}
              </span>
            </div>

            <div className="flex items-center gap-3 my-2">
              <div className="text-4xl font-black text-[#111827] font-mono">
                {readiness.overallScore}%
              </div>
              <div className="text-xs text-[#6B7280] leading-tight">
                Weighted composite score across 5 study metrics
              </div>
            </div>

            <div className="space-y-2 mt-3 text-xs">
              <div>
                <div className="flex justify-between text-[11px] text-[#6B7280] mb-0.5">
                  <span>Daily Exams (30%)</span>
                  <span className="font-mono text-[#111827] font-medium">{readiness.components.dailyExams}%</span>
                </div>
                <div className="w-full bg-[#E5E7EB] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#1677B8] h-full rounded-full transition-all duration-500"
                    style={{ width: `${readiness.components.dailyExams}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-[#6B7280] mb-0.5">
                  <span>Syllabus Completion (15%)</span>
                  <span className="font-mono text-[#111827] font-medium">{readiness.components.syllabusMastery}%</span>
                </div>
                <div className="w-full bg-[#E5E7EB] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#1677B8] h-full rounded-full transition-all duration-500"
                    style={{ width: `${readiness.components.syllabusMastery}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigateToTab('readiness')}
            className="mt-4 w-full py-2 rounded-lg bg-white hover:bg-slate-50 text-xs font-semibold text-[#111827] border border-[#E5E7EB] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <span>Deep Diagnostic Breakdown</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Bento 3: Daily Short Exam Launcher */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-[#1677B8]" />
                Daily Short Exam
              </span>
              <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 text-[#1677B8] border border-[#E5E7EB] font-semibold">
                10 Qs Adaptive
              </span>
            </div>

            <p className="text-xs text-[#6B7280] mb-3">
              Adaptive drill testing Kanji readings, grammar particles, star arrangements, and reading passages.
            </p>

            {todayExam ? (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-emerald-800 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Completed Today
                  </span>
                  <span className="font-bold font-mono text-emerald-900 text-sm">
                    {todayExam.scorePercentage}%
                  </span>
                </div>
                <p className="text-[11px] text-emerald-700">
                  {todayExam.correctCount} of {todayExam.totalQuestions} correct in {Math.round(todayExam.timeTakenSeconds / 60)} min
                </p>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs">
                <div className="text-amber-800 font-semibold mb-0.5">
                  Today&apos;s Exam Pending
                </div>
                <p className="text-[11px] text-amber-700">
                  Take your 10-question daily test to maintain your score and log mistakes.
                </p>
              </div>
            )}
          </div>

          <button
            onClick={onOpenExam}
            className="mt-4 w-full py-2.5 rounded-lg bg-[#1677B8] hover:bg-[#136298] text-white text-xs font-bold shadow-2xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>{todayExam ? 'Retake / Practice Exam' : 'Start Today\'s Short Exam'}</span>
          </button>
        </div>

        {/* Bento 4: Today's Checklist (2 cols on large screen) */}
        <div className="md:col-span-2 bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-emerald-600" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280]">
                  Today&apos;s Study Checklist ({completedCount}/{todayList.length})
                </span>
              </div>
              <span className="text-xs font-mono text-emerald-700 font-bold">
                {checklistPercentage}% Done
              </span>
            </div>

            {/* Checklist progress bar */}
            <div className="w-full bg-[#E5E7EB] h-2 rounded-full overflow-hidden mb-3.5">
              <div
                className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${checklistPercentage}%` }}
              />
            </div>

            {/* Checklist tasks */}
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {todayList.slice(0, 4).map((task) => (
                <div
                  key={task.id}
                  onClick={() => handleToggleTask(task.id)}
                  className={`p-2.5 rounded-xl border flex items-start gap-2.5 cursor-pointer transition-all ${
                    task.completed
                      ? 'bg-slate-50 border-[#E5E7EB] text-[#9CA3AF]'
                      : 'bg-white border-[#E5E7EB] text-[#222222] hover:border-[#1677B8]'
                  }`}
                >
                  <button
                    type="button"
                    className="mt-0.5 text-[#9CA3AF] hover:text-emerald-600 transition-colors shrink-0 cursor-pointer"
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Circle className="w-4 h-4" />
                    )}
                  </button>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium truncate ${task.completed ? 'line-through text-[#9CA3AF]' : 'text-[#222222]'}`}>
                        {task.taskDescription}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5 text-[11px] text-[#6B7280]">
                      <span className="px-1.5 py-0.2 rounded bg-slate-100 border border-[#E5E7EB] text-[10px] text-[#1677B8]">
                        {task.subject}
                      </span>
                      <span>•</span>
                      <span>{task.durationMinutes} min</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#E5E7EB] flex items-center justify-between text-xs">
            <button
              onClick={onOpenTimer}
              className="text-[#1677B8] hover:text-[#136298] font-medium flex items-center gap-1.5 cursor-pointer"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Launch 25m Pomodoro Study Timer</span>
            </button>
            <button
              onClick={() => onNavigateToTab('today')}
              className="text-[#6B7280] hover:text-[#111827] font-medium flex items-center gap-1 cursor-pointer"
            >
              <span>Full Plan & 10 Questions</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bento 5: Spaced Repetition (SRS) Queue */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 text-[#1677B8]" />
                Spaced Revision
              </span>
              <span className="text-xs px-2 py-0.5 rounded-md bg-blue-50 text-[#1677B8] border border-blue-200 font-semibold">
                {dueSrsItems.length} Due Today
              </span>
            </div>

            <p className="text-xs text-[#6B7280] mb-3">
              Intervals (1d, 3d, 7d, 14d) keep previous grammar rules and vocabulary fresh in long-term memory.
            </p>

            <div className="space-y-1.5">
              {dueSrsItems.length > 0 ? (
                dueSrsItems.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    className="p-2 rounded-lg bg-slate-50 border border-[#E5E7EB] text-xs flex items-center justify-between text-[#222222]"
                  >
                    <span className="truncate text-[#222222]">{item.title}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-[#1677B8] shrink-0 ml-1 font-medium">
                      Stage {item.stage}
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-3 rounded-xl bg-slate-50 border border-[#E5E7EB] text-center text-xs text-[#6B7280]">
                  🎉 All spaced revisions for today are completed!
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => onNavigateToTab('revision')}
            className="mt-4 w-full py-2 rounded-lg bg-white hover:bg-slate-50 text-xs font-semibold text-[#111827] border border-[#E5E7EB] transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-2xs"
          >
            <span>Open Spaced Repetition Queue</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* Bento 6: Mistake Notebook Alert */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-[#E53935]" />
                Mistake Notebook
              </span>
              <span className="text-xs px-2 py-0.5 rounded-md bg-red-50 text-red-700 border border-red-200 font-semibold">
                {unmasteredMistakes.length} Active
              </span>
            </div>

            <p className="text-xs text-[#6B7280] mb-3">
              Auto-logged errors from daily exams and mock tests ready for targeted re-testing.
            </p>

            {unmasteredMistakes.length > 0 ? (
              <div className="space-y-1.5">
                {unmasteredMistakes.slice(0, 2).map((m) => (
                  <div
                    key={m.id}
                    className="p-2 rounded-lg bg-red-50/50 border border-red-200 text-xs"
                  >
                    <div className="font-japanese text-[#222222] font-medium truncate">{m.questionText}</div>
                    <div className="text-[10px] text-red-700 mt-0.5">
                      Correct: <span className="font-semibold">{m.correctAnswer}</span> (Mistake freq: {m.frequency})
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-slate-50 border border-[#E5E7EB] text-center text-xs text-[#6B7280]">
                ✨ Zero unmastered mistakes logged!
              </div>
            )}
          </div>

          <button
            onClick={() => onNavigateToTab('mistakes')}
            className="mt-4 w-full py-2 rounded-lg bg-red-50 hover:bg-red-100 text-xs font-semibold text-red-700 border border-red-200 transition-colors flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>Re-Test Mistakes ({unmasteredMistakes.length})</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* Bento 7: Total Time Studied & Focus Logger (2 cols on large screen) */}
        <div className="md:col-span-2 bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#1677B8]" />
                Total Time Studied
              </span>
              <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 text-[#111827] border border-[#E5E7EB] font-semibold">
                {completedSessionsCount} Sessions Logged
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 my-2">
              <div className="flex items-baseline gap-3">
                <h2 className="text-3xl sm:text-4xl font-black text-[#111827] tracking-tight font-mono">
                  {totalStudyTime.formatted}
                </h2>
                <span className="text-xs text-[#6B7280] font-mono">
                  ({totalStudiedMinutes} mins total)
                </span>
              </div>

              <div className="text-xs text-emerald-800 font-medium flex items-center gap-1 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg w-fit">
                <Flame className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                <span>{todayStudyMinutes}m studied today ({todaySessionsCount} {todaySessionsCount === 1 ? 'session' : 'sessions'})</span>
              </div>
            </div>

            {/* N5 Roadmap 150h Target Progress */}
            <div className="mt-4 space-y-1.5 text-xs">
              <div className="flex justify-between text-[11px] text-[#6B7280]">
                <span>N5 Preparation Target (150h Recommended)</span>
                <span className="font-mono text-[#111827] font-semibold">
                  {((totalStudiedMinutes / (150 * 60)) * 100).toFixed(1)}% ({totalStudyTime.formatted} / 150h)
                </span>
              </div>
              <div className="w-full bg-[#E5E7EB] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#1677B8] h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.max(2, (totalStudiedMinutes / (150 * 60)) * 100))}%` }}
                />
              </div>
            </div>

            {/* Category breakdown pills */}
            <div className="mt-3.5 flex flex-wrap gap-1.5">
              {(['Grammar', 'Vocabulary', 'Kanji', 'Hiragana', 'Reading', 'Listening'] as const).map(cat => {
                const catMins = state.studyLogs
                  .filter(l => l.category === cat)
                  .reduce((sum, l) => sum + (l.durationMinutes || 0), 0);
                if (catMins === 0) return null;
                return (
                  <span
                    key={cat}
                    className="px-2 py-0.5 rounded-lg bg-slate-50 border border-[#E5E7EB] text-[11px] text-[#222222] flex items-center gap-1"
                  >
                    <span className="text-[#6B7280]">{cat}:</span>
                    <span className="font-mono text-[#1677B8] font-semibold">{catMins}m</span>
                  </span>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#E5E7EB] flex items-center justify-between text-xs">
            <button
              onClick={onOpenTimer}
              className="text-[#1677B8] hover:text-[#136298] font-medium flex items-center gap-1.5 cursor-pointer"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Launch Focus Timer & Log Session</span>
            </button>
            <button
              onClick={() => onNavigateToTab('readiness')}
              className="text-[#6B7280] hover:text-[#111827] font-medium flex items-center gap-1 cursor-pointer"
            >
              <span>View Detailed Progress Analytics</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Quick Study Material Shortcuts Section */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#1677B8]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#111827]">
              Primary Study Materials Assigned for Week {state.currentWeekNumber}
            </h3>
          </div>
          <button
            onClick={() => onNavigateToTab('materials')}
            className="text-xs text-[#1677B8] hover:text-[#136298] font-medium flex items-center gap-1 cursor-pointer"
          >
            <span>View All Materials Library</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {state.materials
            .filter(m => m.assignedWeek === state.currentWeekNumber || m.id === 'mat-hiragana-sheet' || m.id === 'mat-kanji-part1')
            .slice(0, 4)
            .map((mat) => (
              <div
                key={mat.id}
                onClick={() => onOpenPdf(mat)}
                className="p-3.5 rounded-xl bg-slate-50 hover:bg-white border border-[#E5E7EB] hover:border-[#1677B8] cursor-pointer transition-all group flex flex-col justify-between shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] text-[#6B7280] mb-1.5">
                    <span className="px-1.5 py-0.5 rounded bg-white text-[#1677B8] border border-[#E5E7EB] font-medium text-[10px]">
                      {mat.category}
                    </span>
                    <span className="font-mono text-[10px] text-[#6B7280]">{mat.pageRange}</span>
                  </div>
                  <h4 className="font-semibold text-xs text-[#111827] group-hover:text-[#1677B8] transition-colors line-clamp-2">
                    {mat.name}
                  </h4>
                  <p className="text-[11px] text-[#6B7280] line-clamp-2 mt-1">
                    {mat.title}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-[#E5E7EB] flex items-center justify-between text-[11px] text-[#1677B8] font-medium">
                  <span>Open Interactive Reader</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
