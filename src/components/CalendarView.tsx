import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  GraduationCap,
  Sparkles,
  Flame
} from 'lucide-react';
import { AppState } from '../types';
import { EXAM_DATE, STUDY_START_DATE, getDaysRemaining } from '../utils/storage';

interface CalendarViewProps {
  state: AppState;
  onUpdateState: (updater: (prev: AppState) => AppState) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  state,
  onUpdateState
}) => {
  // Calendar month state (default to August 2026 or current simulated month)
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(7); // 0-indexed: 7 is August

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(y => y - 1);
    } else {
      setCurrentMonth(m => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(y => y + 1);
    } else {
      setCurrentMonth(m => m + 1);
    }
  };

  // Generate days for the grid
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay(); // 0 is Sunday

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptySlots = Array.from({ length: firstDayOfWeek }, (_, i) => i);

  const daysLeft = getDaysRemaining(EXAM_DATE, state.simulatedCurrentDate);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Top Header Card */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#6B7280] mb-1">
              <CalendarIcon className="w-3.5 h-3.5 text-[#1677B8]" />
              <span>Target Exam Date: 6 December 2026</span>
              <span>•</span>
              <span className="font-mono text-[#E53935] font-bold">{daysLeft} Days Remaining</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight">
              Study Calendar & Examination Timeline
            </h1>
            <p className="text-xs text-[#6B7280] mt-1">
              Visual roadmap mapping your study start on 16 August 2026 to the official examination on 6 December 2026.
            </p>
          </div>
        </div>
      </div>

      {/* Calendar Component Box */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-2xs space-y-4">
        {/* Calendar Nav */}
        <div className="flex items-center justify-between">
          <div className="text-base font-bold text-[#111827] flex items-center gap-2">
            <span>{monthNames[currentMonth]} {currentYear}</span>
            {currentYear === 2026 && currentMonth === 7 && (
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                START MONTH (16 Aug)
              </span>
            )}
            {currentYear === 2026 && currentMonth === 11 && (
              <span className="px-2 py-0.5 rounded bg-red-50 text-red-800 text-[10px] font-bold border border-red-200">
                🇯🇵 EXAM MONTH (6 Dec)
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevMonth}
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 border border-[#E5E7EB] text-[#222222] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextMonth}
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 border border-[#E5E7EB] text-[#222222] transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Days of Week Header */}
        <div className="grid grid-cols-7 gap-2 text-center text-[11px] font-bold uppercase tracking-wider text-[#6B7280]">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-2">
          {emptySlots.map(slot => (
            <div key={`empty-${slot}`} className="h-20 sm:h-24 rounded-xl bg-slate-50/50 border border-transparent" />
          ))}

          {daysArray.map(day => {
            const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isToday = dateString === state.simulatedCurrentDate;
            const isExamDay = dateString === EXAM_DATE;
            const isStartDay = dateString === STUDY_START_DATE;

            // Check if user completed exams or checklists on this date
            const examOnDay = state.examResults.find(e => e.date === dateString);
            const checklistOnDay = state.checklists[dateString];
            const tasksCompleted = checklistOnDay ? checklistOnDay.filter(t => t.completed).length : 0;

            let borderStyle = 'border-[#E5E7EB] hover:border-[#1677B8]';
            let bgStyle = 'bg-slate-50 hover:bg-white';

            if (isExamDay) {
              bgStyle = 'bg-red-50';
              borderStyle = 'border-red-400 ring-2 ring-red-200 shadow-2xs';
            } else if (isToday) {
              bgStyle = 'bg-blue-50/40';
              borderStyle = 'border-[#1677B8] ring-2 ring-blue-100';
            } else if (isStartDay) {
              bgStyle = 'bg-emerald-50';
              borderStyle = 'border-emerald-400';
            }

            return (
              <div
                key={day}
                onClick={() => {
                  onUpdateState(prev => ({
                    ...prev,
                    simulatedCurrentDate: dateString
                  }));
                }}
                className={`h-20 sm:h-24 p-2 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${bgStyle} ${borderStyle}`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-mono font-bold ${
                    isToday ? 'text-[#1677B8] font-extrabold' : isExamDay ? 'text-red-700 font-extrabold' : 'text-[#222222]'
                  }`}>
                    {day}
                  </span>
                  {isExamDay && <span className="text-sm">🇯🇵</span>}
                  {isStartDay && <span className="text-xs">🚀</span>}
                </div>

                <div className="space-y-1">
                  {isExamDay && (
                    <div className="text-[9px] font-bold text-red-700 uppercase truncate">
                      EXAM DAY
                    </div>
                  )}
                  {isStartDay && (
                    <div className="text-[9px] font-bold text-emerald-800 uppercase truncate">
                      STUDY START
                    </div>
                  )}
                  {examOnDay && (
                    <div className="text-[9px] px-1 py-0.5 rounded bg-blue-50 text-[#1677B8] border border-blue-200 font-mono font-bold truncate">
                      Exam: {examOnDay.scorePercentage}%
                    </div>
                  )}
                  {tasksCompleted > 0 && (
                    <div className="text-[9px] text-emerald-700 font-mono flex items-center gap-0.5">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      <span>{tasksCompleted} tasks</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
