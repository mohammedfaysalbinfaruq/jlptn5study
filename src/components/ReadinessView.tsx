import React from 'react';
import {
  Target,
  CheckCircle2,
  AlertTriangle,
  Award,
  TrendingUp,
  ShieldCheck,
  Zap,
  BarChart3,
  Calendar,
  BookOpen,
  Sparkles,
  Flame,
  Clock,
  CheckSquare,
  RefreshCw,
  Layers,
  GraduationCap
} from 'lucide-react';
import { AppState } from '../types';
import {
  calculateReadiness,
  getDaysRemaining,
  calculateCategoryBreakdownProgress
} from '../utils/storage';

interface ReadinessViewProps {
  state: AppState;
  onNavigateToTab: (tabId: string) => void;
}

export const ReadinessView: React.FC<ReadinessViewProps> = ({
  state,
  onNavigateToTab
}) => {
  const readiness = calculateReadiness(state);
  const daysLeft = getDaysRemaining(state.examDate, state.simulatedCurrentDate);
  const catProgress = calculateCategoryBreakdownProgress(state);

  const getStatusBadge = (score: number) => {
    if (score >= 80) return 'text-emerald-700 bg-emerald-50 border-emerald-200';
    if (score >= 60) return 'text-amber-800 bg-amber-50 border-amber-200';
    return 'text-red-700 bg-red-50 border-red-200';
  };

  const estimatedPassProbability = Math.min(99, Math.max(25, Math.round(readiness.overallScore * 0.95 + (state.streaks.currentStreak > 3 ? 5 : 0))));

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#6B7280] mb-1">
              <Target className="w-3.5 h-3.5 text-[#1677B8]" />
              <span>Diagnostic Readiness & Progress Engine</span>
              <span>•</span>
              <span className="font-mono text-[#1677B8] font-semibold">Target Score: 140+ / 180 (Pass Benchmark: 80/180)</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight">
              JLPT N5 Preparation Readiness Analytics
            </h1>
            <p className="text-xs text-[#6B7280] mt-1">
              Comprehensive evaluation of your mastery across Vocabulary, Grammar, Kanji, Reading, Listening, Spaced Memory Retention, and Consistency.
            </p>
          </div>
        </div>
      </div>

      {/* Main Hero Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Overall Readiness Card */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 flex flex-col justify-between shadow-2xs">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-2">
              Overall Preparation Readiness
            </div>
            <div className="flex items-baseline gap-3 my-2">
              <span className="text-5xl font-black text-[#111827] font-mono">{readiness.overallScore}%</span>
              <span className={`text-xs px-2.5 py-1 rounded-md font-bold border uppercase ${getStatusBadge(readiness.overallScore)}`}>
                {readiness.statusLabel}
              </span>
            </div>
            <p className="text-xs text-[#6B7280] mt-2">
              Weighted composite evaluating your ability to clear the official 80/180 benchmark and reach the 140+ target.
            </p>
          </div>
        </div>

        {/* Estimated Passing Probability */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 flex flex-col justify-between shadow-2xs">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-2">
              Estimated Passing Probability
            </div>
            <div className="flex items-baseline gap-3 my-2">
              <span className="text-5xl font-black text-[#1677B8] font-mono">{estimatedPassProbability}%</span>
              <span className="text-xs text-[#6B7280] font-mono">{daysLeft} days to prepare</span>
            </div>
            <p className="text-xs text-[#6B7280] mt-2">
              Based on historical quiz accuracy, error frequency in the mistake notebook, and active daily streak ({state.streaks.currentStreak}d).
            </p>
          </div>
        </div>

        {/* Consistency & Time */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 flex flex-col justify-between shadow-2xs">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-2">
              Total Study Logged
            </div>
            <div className="flex items-baseline gap-3 my-2">
              <span className="text-5xl font-black text-[#111827] font-mono">{state.streaks.totalStudyHours.toFixed(1)}h</span>
              <span className="text-xs text-[#6B7280] font-mono">{state.streaks.totalStudyDays} active days</span>
            </div>
            <p className="text-xs text-[#6B7280] mt-2">
              Recommended for N5: 150 hours total. Consistency beats cramming!
            </p>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 5-SUBJECT GRANULAR PROGRESS BREAKDOWN                         */}
      {/* ============================================================ */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 space-y-4 shadow-2xs">
        <div className="flex items-center justify-between">
          <div className="text-xs font-bold uppercase tracking-wider text-[#6B7280] flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#1677B8]" />
            <span>Subject-by-Subject Mastery Breakdown</span>
          </div>
          <span className="text-xs text-[#6B7280]">Targeting JLPT N5 Official Syllabus</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
          {/* 1. Vocabulary */}
          <div className="p-4 rounded-xl bg-slate-50 border border-[#E5E7EB] flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between text-xs text-[#6B7280] font-semibold mb-1">
                <span>Vocabulary (語彙)</span>
                <span className="font-mono text-[#1677B8] font-bold">{catProgress.vocabulary.percentage}%</span>
              </div>
              <div className="text-lg font-black text-[#111827] font-mono">
                {catProgress.vocabulary.completed} / {catProgress.vocabulary.target}
              </div>
              <span className="text-[11px] text-[#6B7280]">Words Mastered</span>
            </div>
            <div className="w-full bg-[#E5E7EB] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#1677B8] h-full rounded-full transition-all duration-500"
                style={{ width: `${catProgress.vocabulary.percentage}%` }}
              />
            </div>
          </div>

          {/* 2. Grammar */}
          <div className="p-4 rounded-xl bg-slate-50 border border-[#E5E7EB] flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between text-xs text-[#6B7280] font-semibold mb-1">
                <span>Grammar (文法)</span>
                <span className="font-mono text-[#1677B8] font-bold">{catProgress.grammar.percentage}%</span>
              </div>
              <div className="text-lg font-black text-[#111827] font-mono">
                {catProgress.grammar.completed} / {catProgress.grammar.target}
              </div>
              <span className="text-[11px] text-[#6B7280]">Minna Lessons</span>
            </div>
            <div className="w-full bg-[#E5E7EB] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#1677B8] h-full rounded-full transition-all duration-500"
                style={{ width: `${catProgress.grammar.percentage}%` }}
              />
            </div>
          </div>

          {/* 3. Kanji */}
          <div className="p-4 rounded-xl bg-slate-50 border border-[#E5E7EB] flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between text-xs text-[#6B7280] font-semibold mb-1">
                <span>Kanji (漢字)</span>
                <span className="font-mono text-[#1677B8] font-bold">{catProgress.kanji.percentage}%</span>
              </div>
              <div className="text-lg font-black text-[#111827] font-mono">
                {catProgress.kanji.completed} / {catProgress.kanji.target}
              </div>
              <span className="text-[11px] text-[#6B7280]">Characters & Radicals</span>
            </div>
            <div className="w-full bg-[#E5E7EB] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#1677B8] h-full rounded-full transition-all duration-500"
                style={{ width: `${catProgress.kanji.percentage}%` }}
              />
            </div>
          </div>

          {/* 4. Reading */}
          <div className="p-4 rounded-xl bg-slate-50 border border-[#E5E7EB] flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between text-xs text-[#6B7280] font-semibold mb-1">
                <span>Reading (読解)</span>
                <span className="font-mono text-[#1677B8] font-bold">{catProgress.reading.percentage}%</span>
              </div>
              <div className="text-lg font-black text-[#111827] font-mono">
                {catProgress.reading.percentage}%
              </div>
              <span className="text-[11px] text-[#6B7280]">Passage Accuracy</span>
            </div>
            <div className="w-full bg-[#E5E7EB] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#1677B8] h-full rounded-full transition-all duration-500"
                style={{ width: `${catProgress.reading.percentage}%` }}
              />
            </div>
          </div>

          {/* 5. Listening */}
          <div className="p-4 rounded-xl bg-slate-50 border border-[#E5E7EB] flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between text-xs text-[#6B7280] font-semibold mb-1">
                <span>Listening (聴解)</span>
                <span className="font-mono text-[#1677B8] font-bold">{catProgress.listening.percentage}%</span>
              </div>
              <div className="text-lg font-black text-[#111827] font-mono">
                {catProgress.listening.percentage}%
              </div>
              <span className="text-[11px] text-[#6B7280]">Dialogue Drills</span>
            </div>
            <div className="w-full bg-[#E5E7EB] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#1677B8] h-full rounded-full transition-all duration-500"
                style={{ width: `${catProgress.listening.percentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* PERFORMANCE & STUDY DISCIPLINE METRICS                       */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Study Consistency */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-[#6B7280] font-bold uppercase">
            <span>Study Consistency</span>
            <Flame className="w-4 h-4 text-[#1677B8]" />
          </div>
          <div className="text-3xl font-black text-[#111827] font-mono">
            {catProgress.consistency}%
          </div>
          <span className="text-xs text-[#6B7280]">Active study days on track</span>
        </div>

        {/* Average Daily Exam Score */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-[#6B7280] font-bold uppercase">
            <span>Avg Daily Exam</span>
            <GraduationCap className="w-4 h-4 text-[#1677B8]" />
          </div>
          <div className="text-3xl font-black text-[#111827] font-mono">
            {catProgress.averageExamScore}%
          </div>
          <span className="text-xs text-[#6B7280]">Accuracy on 10-question drills</span>
        </div>

        {/* Revision Completion */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-[#6B7280] font-bold uppercase">
            <span>Revision Completion</span>
            <RefreshCw className="w-4 h-4 text-[#1677B8]" />
          </div>
          <div className="text-3xl font-black text-[#111827] font-mono">
            {catProgress.revisionCompletionRate}%
          </div>
          <span className="text-xs text-[#6B7280]">Spaced repetition retention rate</span>
        </div>

        {/* Mock Test Performance */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-[#6B7280] font-bold uppercase">
            <span>Mock Test Perf.</span>
            <Award className="w-4 h-4 text-[#1677B8]" />
          </div>
          <div className="text-3xl font-black text-[#111827] font-mono">
            {catProgress.mockPerformance}%
          </div>
          <span className="text-xs text-[#6B7280]">Projected JLPT N5 mock score</span>
        </div>
      </div>

      {/* Strengths & Weaknesses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Identified Strengths */}
        <div className="p-5 rounded-xl bg-white border border-[#E5E7EB] space-y-3 shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Identified Strong Points</span>
          </div>
          <ul className="space-y-2 text-xs text-[#222222]">
            {readiness.strengths.map((str, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Identified Weaknesses */}
        <div className="p-5 rounded-xl bg-white border border-[#E5E7EB] space-y-3 shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-bold text-red-700 uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4" />
            <span>Areas Requiring Focus</span>
          </div>
          <ul className="space-y-2 text-xs text-[#222222]">
            {readiness.weaknesses.map((weak, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{weak}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
