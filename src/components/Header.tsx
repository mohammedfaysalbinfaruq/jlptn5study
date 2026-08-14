import React from 'react';
import {
  Flame,
  Clock,
  BookOpen,
  Calendar,
  Volume2,
  VolumeX,
  Bell,
  BarChart3,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { AppState } from '../types';
import { getDaysRemaining } from '../utils/storage';

interface HeaderProps {
  state: AppState;
  onUpdateState: (updater: (prev: AppState) => AppState) => void;
  onOpenTimer: () => void;
  onOpenReminders: () => void;
  onOpenWeeklyReview: () => void;
  onNavigateToTab: (tabId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  state,
  onUpdateState,
  onOpenTimer,
  onOpenReminders,
  onOpenWeeklyReview,
  onNavigateToTab
}) => {
  const daysLeft = getDaysRemaining(state.examDate, state.simulatedCurrentDate);
  const isExamDay = daysLeft === 0;

  const handleDateChange = (newDate: string) => {
    onUpdateState(prev => ({
      ...prev,
      simulatedCurrentDate: newDate
    }));
  };

  const advanceOneDay = () => {
    const current = new Date(state.simulatedCurrentDate);
    current.setDate(current.getDate() + 1);
    const nextStr = current.toISOString().split('T')[0];
    handleDateChange(nextStr);
  };

  const toggleSound = () => {
    onUpdateState(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        soundEnabled: !prev.settings.soundEnabled
      }
    }));
  };

  return (
    <header className="bg-white border-b border-[#E5E7EB] text-[#222222] px-4 lg:px-6 py-3 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Left: App Title & Countdown Badge */}
        <div className="flex items-center gap-3.5 flex-wrap">
          <button
            onClick={() => onNavigateToTab('dashboard')}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-[#1677B8] flex items-center justify-center text-white font-bold text-xs shadow-xs">
              N5
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm sm:text-base tracking-tight text-[#111827] group-hover:text-[#1677B8] transition-colors">
                  JLPT N5 Study Desk
                </span>
                <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-slate-100 text-[#6B7280] border border-[#E5E7EB]">
                  Academic
                </span>
              </div>
              <p className="text-[11px] text-[#6B7280]">
                6 December 2026 • Target: 140+/180
              </p>
            </div>
          </button>

          {/* Dynamic Countdown Banner */}
          <div className={`px-3 py-1 rounded-lg border flex items-center gap-2 ${
            isExamDay
              ? 'bg-red-50 text-[#E53935] border-red-200 animate-pulse font-bold'
              : 'bg-white border-[#E5E7EB] text-[#222222]'
          }`}>
            <span className="text-xs">🇯🇵</span>
            {isExamDay ? (
              <span className="text-xs font-bold tracking-wider text-[#E53935]">
                JLPT N5 — EXAM TODAY
              </span>
            ) : (
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-[#6B7280] font-medium">JLPT N5</span>
                <span className="text-slate-300">•</span>
                <span className="font-bold text-[#E53935] font-mono">
                  {daysLeft} DAYS LEFT
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Date Simulation & Quick Controls */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Simulated Date Controller */}
          <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg border border-[#E5E7EB]">
            <Calendar className="w-3.5 h-3.5 text-[#6B7280]" />
            <input
              type="date"
              value={state.simulatedCurrentDate}
              onChange={(e) => handleDateChange(e.target.value)}
              className="bg-transparent text-xs text-[#222222] font-mono focus:outline-none cursor-pointer"
              title="Change Current Study Date"
            />
            <button
              onClick={advanceOneDay}
              className="text-[11px] bg-slate-50 hover:bg-slate-100 text-[#1677B8] border border-[#E5E7EB] px-1.5 py-0.5 rounded flex items-center gap-0.5 transition-colors cursor-pointer"
              title="Advance Date by 1 Day"
            >
              <span>+1d</span>
              <ChevronRight className="w-2.5 h-2.5" />
            </button>
          </div>

          {/* Streaks & Time Counters */}
          <div className="flex items-center gap-2 bg-white px-2.5 py-1 rounded-lg border border-[#E5E7EB] text-xs">
            <div className="flex items-center gap-1 text-amber-700 font-medium" title="Current Daily Streak">
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
              <span>{state.streaks.currentStreak}d</span>
            </div>
            <span className="text-slate-200">|</span>
            <div className="flex items-center gap-1 text-[#1677B8] font-medium" title="Total Study Hours">
              <Clock className="w-3.5 h-3.5 text-[#1677B8]" />
              <span>{state.streaks.totalStudyHours.toFixed(1)}h</span>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-1.5">
            {/* Pomodoro Timer */}
            <button
              onClick={onOpenTimer}
              className="p-1.5 rounded-lg bg-white hover:bg-slate-50 text-[#1677B8] border border-[#E5E7EB] transition-colors relative cursor-pointer"
              title="Open Study Focus Timer"
            >
              <Clock className="w-4 h-4 text-[#1677B8]" />
              <span className="sr-only">Timer</span>
            </button>

            {/* Weekly Review Modal */}
            <button
              onClick={onOpenWeeklyReview}
              className="p-1.5 rounded-lg bg-white hover:bg-slate-50 text-[#6B7280] hover:text-[#111827] border border-[#E5E7EB] transition-colors cursor-pointer"
              title="Weekly Review & Retro"
            >
              <BarChart3 className="w-4 h-4 text-[#6B7280]" />
            </button>

            {/* Reminders Modal */}
            <button
              onClick={onOpenReminders}
              className="p-1.5 rounded-lg bg-white hover:bg-slate-50 text-[#6B7280] hover:text-[#111827] border border-[#E5E7EB] transition-colors relative cursor-pointer"
              title="Daily Study Reminders"
            >
              <Bell className="w-4 h-4 text-[#6B7280]" />
              {state.settings.remindersEnabled && (
                <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#E53935] rounded-full" />
              )}
            </button>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className="p-1.5 rounded-lg bg-white hover:bg-slate-50 text-[#6B7280] hover:text-[#111827] border border-[#E5E7EB] transition-colors cursor-pointer"
              title={state.settings.soundEnabled ? 'Sound Effects Enabled' : 'Sound Effects Muted'}
            >
              {state.settings.soundEnabled ? (
                <Volume2 className="w-4 h-4 text-[#1677B8]" />
              ) : (
                <VolumeX className="w-4 h-4 text-[#9CA3AF]" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
