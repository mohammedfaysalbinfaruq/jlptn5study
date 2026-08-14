import React, { useState } from 'react';
import {
  CheckSquare,
  Clock,
  BookOpen,
  RefreshCw,
  GraduationCap,
  AlertTriangle,
  Target,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  Circle,
  Play,
  HelpCircle,
  Flame,
  FileText,
  Calendar,
  Sparkles,
  Award,
  Layers,
  ChevronRight,
  TrendingUp,
  ExternalLink,
  RotateCcw,
  Check
} from 'lucide-react';
import { AppState, DailyChecklistItem, StudyCategory, StudyMaterial } from '../types';
import {
  getDaysRemaining,
  calculateReadiness,
  calculateDailyPerformanceScore,
  generateDefaultChecklist,
  isDayFullStudyDay,
  calculateCategoryBreakdownProgress
} from '../utils/storage';
import { ROADMAP_WEEKS } from '../data/roadmapData';
import { sound } from '../utils/audio';

interface TodayViewProps {
  state: AppState;
  onUpdateState: (updater: (prev: AppState) => AppState) => void;
  onOpenExam: () => void;
  onOpenPdf: (material: StudyMaterial) => void;
  onOpenTimer: () => void;
  onNavigateToTab: (tabId: string) => void;
}

export const TodayView: React.FC<TodayViewProps> = ({
  state,
  onUpdateState,
  onOpenExam,
  onOpenPdf,
  onOpenTimer,
  onNavigateToTab
}) => {
  // Add task state
  const [showAddTask, setShowAddTask] = useState(false);
  const [newSubject, setNewSubject] = useState<StudyCategory>('Grammar');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newDuration, setNewDuration] = useState(25);
  const [newPriority, setNewPriority] = useState<'High' | 'Medium' | 'Low'>('High');

  // Edit task state
  const [editingTask, setEditingTask] = useState<DailyChecklistItem | null>(null);
  const [editDesc, setEditDesc] = useState('');
  const [editSubject, setEditSubject] = useState<StudyCategory>('Grammar');
  const [editDuration, setEditDuration] = useState(25);
  const [editPriority, setEditPriority] = useState<'High' | 'Medium' | 'Low'>('High');

  const daysLeft = getDaysRemaining(state.examDate, state.simulatedCurrentDate);
  const currentWeek = state.currentWeekNumber;
  const weekData = ROADMAP_WEEKS.find(w => w.weekNumber === currentWeek) || ROADMAP_WEEKS[0];

  const todayList: DailyChecklistItem[] = state.checklists[state.simulatedCurrentDate] || [];
  const completedTasks = todayList.filter(t => t.completed).length;
  const totalTasks = todayList.length;
  const checklistPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const todayExam = state.examResults.find(e => e.date === state.simulatedCurrentDate);
  const readiness = calculateReadiness(state);
  const dayScore = calculateDailyPerformanceScore(todayList, todayExam);

  const dueSrsItems = state.srsQueue.filter(s => s.nextReviewDate <= state.simulatedCurrentDate);
  const unmasteredMistakes = state.mistakes.filter(m => !m.mastered);
  const isFullStudyDayAchieved = isDayFullStudyDay(todayList, todayExam);

  // Find assigned material for this week
  const assignedMaterial = state.materials.find(m => m.assignedWeek === currentWeek) || state.materials[0];

  // Toggle task completion (Complete / Undo)
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

  // Add custom task
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskDesc.trim()) return;

    const newTask: DailyChecklistItem = {
      id: `custom-${Date.now()}`,
      date: state.simulatedCurrentDate,
      subject: newSubject,
      taskDescription: newTaskDesc.trim(),
      durationMinutes: Number(newDuration),
      priority: newPriority,
      completed: false
    };

    onUpdateState(prev => {
      const currentList = prev.checklists[prev.simulatedCurrentDate] || [];
      return {
        ...prev,
        checklists: {
          ...prev.checklists,
          [prev.simulatedCurrentDate]: [...currentList, newTask]
        }
      };
    });

    setNewTaskDesc('');
    setShowAddTask(false);
    if (state.settings.soundEnabled) sound.playSuccessChime();
  };

  // Start editing task
  const handleStartEdit = (task: DailyChecklistItem) => {
    setEditingTask(task);
    setEditDesc(task.taskDescription);
    setEditSubject(task.subject as StudyCategory);
    setEditDuration(task.durationMinutes);
    setEditPriority(task.priority);
  };

  // Save edited task
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTask || !editDesc.trim()) return;

    onUpdateState(prev => {
      const currentList = prev.checklists[prev.simulatedCurrentDate] || [];
      const updatedList = currentList.map(item => {
        if (item.id === editingTask.id) {
          return {
            ...item,
            taskDescription: editDesc.trim(),
            subject: editSubject,
            durationMinutes: Number(editDuration),
            priority: editPriority
          };
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

    setEditingTask(null);
    if (state.settings.soundEnabled) sound.playCorrect();
  };

  // Delete task
  const handleDeleteTask = (taskId: string) => {
    onUpdateState(prev => {
      const currentList = prev.checklists[prev.simulatedCurrentDate] || [];
      return {
        ...prev,
        checklists: {
          ...prev.checklists,
          [prev.simulatedCurrentDate]: currentList.filter(t => t.id !== taskId)
        }
      };
    });
  };

  // Reset checklist to default template
  const handleResetChecklist = () => {
    const defaultList = generateDefaultChecklist(currentWeek, state.simulatedCurrentDate);
    onUpdateState(prev => ({
      ...prev,
      checklists: {
        ...prev.checklists,
        [prev.simulatedCurrentDate]: defaultList
      }
    }));
  };

  const getPhaseName = () => {
    if (currentWeek >= 13) return 'Revision + Full Mock Test Phase (Exam Prep)';
    if (currentWeek === 4 || currentWeek === 8 || currentWeek === 11 || currentWeek === 12) {
      return 'Consolidation Phase';
    }
    return 'Core Learning Phase';
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 text-[#222222]">
      {/* ============================================================ */}
      {/* 1. TOP ESSENTIAL 8 METRICS BAR                               */}
      {/* ============================================================ */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#E5E7EB]">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#6B7280] mb-1">
              <Calendar className="w-3.5 h-3.5 text-[#1677B8]" />
              <span>Today&apos;s Command Hub</span>
              <span>•</span>
              <span className="font-mono text-[#1677B8] font-semibold">{state.simulatedCurrentDate}</span>
              <span>•</span>
              <span className="text-[#6B7280] font-medium">{getPhaseName()}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight">
              Today&apos;s Study Target & Action Command
            </h1>
            <p className="text-xs text-[#6B7280] mt-1">
              Everything you need for today: exact PDF lesson, structured checklist, daily 10-question short exam, and spaced reviews.
            </p>
          </div>

          {/* Full Study Day Badge */}
          <div className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border self-start lg:self-auto ${
            isFullStudyDayAchieved
              ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
              : 'bg-slate-50 border-[#E5E7EB] text-[#6B7280]'
          }`}>
            <div className="text-2xl">
              {isFullStudyDayAchieved ? '⭐' : '⏳'}
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider">
                {isFullStudyDayAchieved ? 'Full Study Day Completed!' : 'Daily Goal Pending'}
              </div>
              <div className="text-xs font-semibold text-[#111827]">
                {isFullStudyDayAchieved
                  ? 'Checklist 100% + Daily Exam Taken'
                  : `${completedTasks}/${totalTasks} Tasks • ${todayExam ? 'Exam Done' : 'Exam Pending'}`}
              </div>
            </div>
          </div>
        </div>

        {/* The 8 Key Today Metrics Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 mt-4">
          {/* 1. Days Remaining */}
          <div className="bg-slate-50 p-3 rounded-xl border border-[#E5E7EB] flex flex-col justify-between">
            <span className="text-[10px] font-bold uppercase text-[#6B7280]">1. Days Left</span>
            <div className="text-xl font-extrabold font-mono text-[#E53935] mt-1">{daysLeft}d</div>
            <span className="text-[10px] text-[#9CA3AF]">Exam: 6 Dec</span>
          </div>

          {/* 2. Current Week */}
          <div className="bg-slate-50 p-3 rounded-xl border border-[#E5E7EB] flex flex-col justify-between">
            <span className="text-[10px] font-bold uppercase text-[#6B7280]">2. Week</span>
            <div className="text-xl font-extrabold font-mono text-[#1677B8] mt-1">
              {currentWeek >= 13 ? 'Final' : `W${currentWeek}`}
            </div>
            <span className="text-[10px] text-[#9CA3AF]">of 12 Weeks</span>
          </div>

          {/* 3. Today's Target */}
          <div className="col-span-2 bg-slate-50 p-3 rounded-xl border border-[#E5E7EB] flex flex-col justify-between">
            <span className="text-[10px] font-bold uppercase text-[#6B7280]">3. Today&apos;s Target</span>
            <div className="text-xs font-bold text-[#111827] mt-1 line-clamp-1">{weekData.focusTopic}</div>
            <span className="text-[10px] text-[#1677B8] font-japanese truncate">{weekData.minnaLessons}</span>
          </div>

          {/* 4. Checklist Progress */}
          <div className="bg-slate-50 p-3 rounded-xl border border-[#E5E7EB] flex flex-col justify-between">
            <span className="text-[10px] font-bold uppercase text-[#6B7280]">4. Checklist</span>
            <div className="text-xl font-extrabold font-mono text-emerald-700 mt-1">{checklistPercentage}%</div>
            <span className="text-[10px] text-[#9CA3AF]">{completedTasks}/{totalTasks} Done</span>
          </div>

          {/* 5. Short Exam Status */}
          <div className="bg-slate-50 p-3 rounded-xl border border-[#E5E7EB] flex flex-col justify-between">
            <span className="text-[10px] font-bold uppercase text-[#6B7280]">5. Short Exam</span>
            <div className={`text-xs font-extrabold mt-1 truncate ${todayExam ? 'text-emerald-700' : 'text-amber-700'}`}>
              {todayExam ? 'Completed' : 'Pending 10 Qs'}
            </div>
            <span className="text-[10px] text-[#9CA3AF]">{todayExam ? `${todayExam.correctCount}/10 Correct` : 'Daily Drill'}</span>
          </div>

          {/* 6. Today's Score */}
          <div className="bg-slate-50 p-3 rounded-xl border border-[#E5E7EB] flex flex-col justify-between">
            <span className="text-[10px] font-bold uppercase text-[#6B7280]">6. Day Score</span>
            <div className="text-xl font-extrabold font-mono text-[#1677B8] mt-1">{dayScore}%</div>
            <span className="text-[10px] text-[#9CA3AF]">50% Chk+50% Ex</span>
          </div>

          {/* 7. Revision Due */}
          <div className="bg-slate-50 p-3 rounded-xl border border-[#E5E7EB] flex flex-col justify-between">
            <span className="text-[10px] font-bold uppercase text-[#6B7280]">7. Revision</span>
            <div className="text-xl font-extrabold font-mono text-amber-700 mt-1">{dueSrsItems.length}</div>
            <span className="text-[10px] text-[#9CA3AF]">Items Due</span>
          </div>

          {/* 8. Current Streak */}
          <div className="bg-slate-50 p-3 rounded-xl border border-[#E5E7EB] flex flex-col justify-between">
            <span className="text-[10px] font-bold uppercase text-[#6B7280]">8. Streak</span>
            <div className="text-xl font-extrabold font-mono text-[#111827] mt-1 flex items-center gap-1">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500 inline" />
              <span>{state.streaks.currentStreak}d</span>
            </div>
            <span className="text-[10px] text-[#9CA3AF]">{state.streaks.totalStudyHours.toFixed(1)}h Total</span>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. GUIDED DAILY STUDY FLOW (Requirement 12)                  */}
      {/* ============================================================ */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-2xs space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E5E7EB] pb-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#1677B8] animate-pulse" />
            <h2 className="text-sm font-bold text-[#111827] uppercase tracking-wider">
              Today&apos;s Guided Study Flow
            </h2>
            <span className="text-xs text-[#6B7280]">
              (Step-by-Step Daily Sequence)
            </span>
          </div>
          <div className="text-xs font-mono text-[#6B7280]">
            {[
              todayTasks.some(t => t.subject === 'Vocabulary' && t.completed),
              todayTasks.some(t => t.subject === 'Grammar' && t.completed),
              todayTasks.some(t => t.subject === 'Kanji' && t.completed),
              todayTasks.some(t => (t.subject === 'Listening' || t.subject === 'Reading') && t.completed),
              dueSrsItems.length === 0,
              !!todayExam
            ].filter(Boolean).length}/6 Steps Completed
          </div>
        </div>

        {/* 6 Guided Steps Flow */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {/* Step 1: Vocabulary */}
          {(() => {
            const isDone = todayTasks.some(t => t.subject === 'Vocabulary' && t.completed);
            return (
              <div
                onClick={() => {
                  const vocabMat = state.materials.find(m => m.category === 'Vocabulary' && m.assignedWeek === currentWeek) || assignedMaterial;
                  onOpenPdf(vocabMat);
                }}
                className={`p-3 rounded-xl border transition-all cursor-pointer group flex flex-col justify-between ${
                  isDone
                    ? 'bg-emerald-50/70 border-emerald-300 text-emerald-900'
                    : 'bg-slate-50 border-[#E5E7EB] hover:border-[#1677B8] hover:bg-white text-[#222222]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold ${isDone ? 'text-emerald-700' : 'text-[#6B7280]'}`}>
                    01
                  </span>
                  {isDone ? (
                    <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-0.5 bg-emerald-100/80 px-1.5 py-0.5 rounded">
                      <Check className="w-3 h-3" /> Done
                    </span>
                  ) : (
                    <span className="text-[10px] text-[#9CA3AF] font-mono">20m</span>
                  )}
                </div>
                <div className="my-2">
                  <div className="text-base mb-0.5">📘</div>
                  <div className="text-xs font-bold truncate">Vocabulary</div>
                  <div className="text-[10px] text-[#6B7280] truncate">Core N5 Words</div>
                </div>
                <div className={`text-[10px] font-semibold mt-1 flex items-center gap-1 ${isDone ? 'text-emerald-700' : 'text-[#1677B8]'}`}>
                  <span>{isDone ? '✓ Completed' : 'Start Words →'}</span>
                </div>
              </div>
            );
          })()}

          {/* Step 2: Grammar */}
          {(() => {
            const isDone = todayTasks.some(t => t.subject === 'Grammar' && t.completed);
            return (
              <div
                onClick={() => onOpenPdf(assignedMaterial)}
                className={`p-3 rounded-xl border transition-all cursor-pointer group flex flex-col justify-between ${
                  isDone
                    ? 'bg-emerald-50/70 border-emerald-300 text-emerald-900'
                    : 'bg-slate-50 border-[#E5E7EB] hover:border-[#1677B8] hover:bg-white text-[#222222]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold ${isDone ? 'text-emerald-700' : 'text-[#6B7280]'}`}>
                    02
                  </span>
                  {isDone ? (
                    <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-0.5 bg-emerald-100/80 px-1.5 py-0.5 rounded">
                      <Check className="w-3 h-3" /> Done
                    </span>
                  ) : (
                    <span className="text-[10px] text-[#9CA3AF] font-mono">30m</span>
                  )}
                </div>
                <div className="my-2">
                  <div className="text-base mb-0.5">📖</div>
                  <div className="text-xs font-bold truncate">Grammar</div>
                  <div className="text-[10px] text-[#6B7280] truncate">{weekData.focusTopic || 'Rules & Patterns'}</div>
                </div>
                <div className={`text-[10px] font-semibold mt-1 flex items-center gap-1 ${isDone ? 'text-emerald-700' : 'text-[#1677B8]'}`}>
                  <span>{isDone ? '✓ Completed' : 'Read Lesson →'}</span>
                </div>
              </div>
            );
          })()}

          {/* Step 3: Kanji */}
          {(() => {
            const isDone = todayTasks.some(t => t.subject === 'Kanji' && t.completed);
            return (
              <div
                onClick={() => {
                  const kanjiMat = state.materials.find(m => m.category === 'Kanji' && m.assignedWeek === currentWeek) || assignedMaterial;
                  onOpenPdf(kanjiMat);
                }}
                className={`p-3 rounded-xl border transition-all cursor-pointer group flex flex-col justify-between ${
                  isDone
                    ? 'bg-emerald-50/70 border-emerald-300 text-emerald-900'
                    : 'bg-slate-50 border-[#E5E7EB] hover:border-[#1677B8] hover:bg-white text-[#222222]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold ${isDone ? 'text-emerald-700' : 'text-[#6B7280]'}`}>
                    03
                  </span>
                  {isDone ? (
                    <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-0.5 bg-emerald-100/80 px-1.5 py-0.5 rounded">
                      <Check className="w-3 h-3" /> Done
                    </span>
                  ) : (
                    <span className="text-[10px] text-[#9CA3AF] font-mono">20m</span>
                  )}
                </div>
                <div className="my-2">
                  <div className="text-base mb-0.5">漢</div>
                  <div className="text-xs font-bold truncate">Kanji</div>
                  <div className="text-[10px] text-[#6B7280] truncate">Strokes & Readings</div>
                </div>
                <div className={`text-[10px] font-semibold mt-1 flex items-center gap-1 ${isDone ? 'text-emerald-700' : 'text-[#1677B8]'}`}>
                  <span>{isDone ? '✓ Completed' : 'Study Kanji →'}</span>
                </div>
              </div>
            );
          })()}

          {/* Step 4: Listening / Reading */}
          {(() => {
            const isDone = todayTasks.some(t => (t.subject === 'Listening' || t.subject === 'Reading') && t.completed);
            return (
              <div
                onClick={() => {
                  const listenMat = state.materials.find(m => m.category === 'Listening' || m.category === 'Reading') || assignedMaterial;
                  onOpenPdf(listenMat);
                }}
                className={`p-3 rounded-xl border transition-all cursor-pointer group flex flex-col justify-between ${
                  isDone
                    ? 'bg-emerald-50/70 border-emerald-300 text-emerald-900'
                    : 'bg-slate-50 border-[#E5E7EB] hover:border-[#1677B8] hover:bg-white text-[#222222]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold ${isDone ? 'text-emerald-700' : 'text-[#6B7280]'}`}>
                    04
                  </span>
                  {isDone ? (
                    <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-0.5 bg-emerald-100/80 px-1.5 py-0.5 rounded">
                      <Check className="w-3 h-3" /> Done
                    </span>
                  ) : (
                    <span className="text-[10px] text-[#9CA3AF] font-mono">20m</span>
                  )}
                </div>
                <div className="my-2">
                  <div className="text-base mb-0.5">🎧</div>
                  <div className="text-xs font-bold truncate">Listening</div>
                  <div className="text-[10px] text-[#6B7280] truncate">Dialogues & Audio</div>
                </div>
                <div className={`text-[10px] font-semibold mt-1 flex items-center gap-1 ${isDone ? 'text-emerald-700' : 'text-[#1677B8]'}`}>
                  <span>{isDone ? '✓ Completed' : 'Practice →'}</span>
                </div>
              </div>
            );
          })()}

          {/* Step 5: Revision (SRS) */}
          {(() => {
            const isDone = dueSrsItems.length === 0;
            return (
              <div
                onClick={() => onNavigateToTab('revision')}
                className={`p-3 rounded-xl border transition-all cursor-pointer group flex flex-col justify-between ${
                  isDone
                    ? 'bg-emerald-50/70 border-emerald-300 text-emerald-900'
                    : 'bg-slate-50 border-[#E5E7EB] hover:border-[#1677B8] hover:bg-white text-[#222222]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold ${isDone ? 'text-emerald-700' : 'text-[#6B7280]'}`}>
                    05
                  </span>
                  {isDone ? (
                    <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-0.5 bg-emerald-100/80 px-1.5 py-0.5 rounded">
                      <Check className="w-3 h-3" /> Done
                    </span>
                  ) : (
                    <span className="text-[10px] text-amber-700 font-mono font-bold">{dueSrsItems.length} Due</span>
                  )}
                </div>
                <div className="my-2">
                  <div className="text-base mb-0.5">🔄</div>
                  <div className="text-xs font-bold truncate">Revision</div>
                  <div className="text-[10px] text-[#6B7280] truncate">Spaced Memory Cards</div>
                </div>
                <div className={`text-[10px] font-semibold mt-1 flex items-center gap-1 ${isDone ? 'text-emerald-700' : 'text-amber-700'}`}>
                  <span>{isDone ? '✓ All Caught Up' : 'Review Cards →'}</span>
                </div>
              </div>
            );
          })()}

          {/* Step 6: Daily Exam */}
          {(() => {
            const isDone = !!todayExam;
            return (
              <div
                onClick={onOpenExam}
                className={`p-3 rounded-xl border transition-all cursor-pointer group flex flex-col justify-between ${
                  isDone
                    ? 'bg-emerald-50/70 border-emerald-300 text-emerald-900'
                    : 'bg-slate-50 border-[#E5E7EB] hover:border-[#1677B8] hover:bg-white text-[#222222]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold ${isDone ? 'text-emerald-700' : 'text-[#6B7280]'}`}>
                    06
                  </span>
                  {isDone ? (
                    <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-0.5 bg-emerald-100/80 px-1.5 py-0.5 rounded">
                      <Check className="w-3 h-3" /> {todayExam.scorePercentage}%
                    </span>
                  ) : (
                    <span className="text-[10px] text-[#E53935] font-mono font-bold">10 Qs</span>
                  )}
                </div>
                <div className="my-2">
                  <div className="text-base mb-0.5">📝</div>
                  <div className="text-xs font-bold truncate">Daily Exam</div>
                  <div className="text-[10px] text-[#6B7280] truncate">Score Drill</div>
                </div>
                <div className={`text-[10px] font-semibold mt-1 flex items-center gap-1 ${isDone ? 'text-emerald-700' : 'text-[#1677B8]'}`}>
                  <span>{isDone ? '✓ Completed' : 'Take Exam →'}</span>
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. THE 5-SECOND CLARITY ACTION HUB                           */}
      {/* ============================================================ */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-xs font-bold uppercase tracking-wider text-[#6B7280] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#1677B8]" />
            <span>5-Second Instant Study Guidance (আজকে কী পড়তে হবে?)</span>
          </div>
          <span className="text-[11px] text-[#9CA3AF]">Click any card to start immediately</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 pt-1">
          {/* 1. আজকে কী পড়ব? */}
          <div
            onClick={() => onNavigateToTab('roadmap')}
            className="p-4 rounded-xl bg-slate-50 border border-[#E5E7EB] hover:border-[#1677B8] hover:bg-white transition-all cursor-pointer group flex flex-col justify-between shadow-2xs"
          >
            <div>
              <div className="text-[11px] font-bold text-[#E53935] mb-1">
                ১. আজকে কী পড়ব?
              </div>
              <div className="text-xs font-bold text-[#111827] group-hover:text-[#1677B8] line-clamp-2">
                {weekData.title}
              </div>
              <div className="text-[11px] text-[#6B7280] mt-1 line-clamp-2">
                {weekData.focusTopic}
              </div>
            </div>
            <div className="text-[10px] text-[#1677B8] font-semibold mt-3 flex items-center gap-1">
              <span>View Full Roadmap</span>
              <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 2. কোন PDF খুলব? */}
          <div
            onClick={() => onOpenPdf(assignedMaterial)}
            className="p-4 rounded-xl bg-slate-50 border border-[#E5E7EB] hover:border-[#1677B8] hover:bg-white transition-all cursor-pointer group flex flex-col justify-between shadow-2xs"
          >
            <div>
              <div className="text-[11px] font-bold text-[#1677B8] mb-1">
                ২. কোন PDF খুলব?
              </div>
              <div className="text-xs font-bold text-[#111827] group-hover:text-[#1677B8] line-clamp-2">
                {assignedMaterial.name}
              </div>
              <div className="text-[11px] text-[#6B7280] mt-1">
                {assignedMaterial.pageRange || 'Section 1-5'} • {assignedMaterial.chapterLesson}
              </div>
            </div>
            <div className="text-[10px] text-[#1677B8] font-semibold mt-3 flex items-center gap-1">
              <BookOpen className="w-3 h-3" />
              <span>Open PDF Reader</span>
            </div>
          </div>

          {/* 3. কী revise করব? */}
          <div
            onClick={() => onNavigateToTab('revision')}
            className="p-4 rounded-xl bg-slate-50 border border-[#E5E7EB] hover:border-[#1677B8] hover:bg-white transition-all cursor-pointer group flex flex-col justify-between shadow-2xs"
          >
            <div>
              <div className="text-[11px] font-bold text-amber-700 mb-1">
                ৩. কী revise করব?
              </div>
              <div className="text-xs font-bold text-[#111827] group-hover:text-[#1677B8]">
                {dueSrsItems.length > 0 ? `${dueSrsItems.length} Spaced SRS Cards` : 'All SRS Caught Up!'}
              </div>
              <div className="text-[11px] text-[#6B7280] mt-1">
                {dueSrsItems.length > 0 ? `${dueSrsItems[0]?.title} + others` : '1d, 3d, 7d, 14d cycle'}
              </div>
            </div>
            <div className="text-[10px] text-amber-700 font-semibold mt-3 flex items-center gap-1">
              <RefreshCw className="w-3 h-3" />
              <span>Start Review Queue</span>
            </div>
          </div>

          {/* 4. আজকের test কোথায়? */}
          <div
            onClick={onOpenExam}
            className="p-4 rounded-xl bg-slate-50 border border-[#E5E7EB] hover:border-[#1677B8] hover:bg-white transition-all cursor-pointer group flex flex-col justify-between shadow-2xs"
          >
            <div>
              <div className="text-[11px] font-bold text-[#1677B8] mb-1">
                ৪. আজকের test কোথায়?
              </div>
              <div className="text-xs font-bold text-[#111827] group-hover:text-[#1677B8]">
                {todayExam ? `Score: ${todayExam.scorePercentage}%` : 'Daily 10-Question Drill'}
              </div>
              <div className="text-[11px] text-[#6B7280] mt-1">
                {todayExam ? 'Completed today • Click to retake' : 'Grammar, Vocab, Kanji & Reading'}
              </div>
            </div>
            <div className="text-[10px] text-[#1677B8] font-semibold mt-3 flex items-center gap-1">
              <Play className="w-3 h-3 fill-[#1677B8]" />
              <span>{todayExam ? 'Retake Exam' : 'Launch Daily Exam'}</span>
            </div>
          </div>

          {/* 5. আমি কতটা এগিয়েছি? */}
          <div
            onClick={() => onNavigateToTab('readiness')}
            className="p-4 rounded-xl bg-slate-50 border border-[#E5E7EB] hover:border-[#1677B8] hover:bg-white transition-all cursor-pointer group flex flex-col justify-between shadow-2xs"
          >
            <div>
              <div className="text-[11px] font-bold text-emerald-700 mb-1">
                ৫. আমি কতটা এগিয়েছি?
              </div>
              <div className="text-xs font-bold text-[#111827] group-hover:text-emerald-700">
                {readiness.overallScore}% Preparation Readiness
              </div>
              <div className="text-[11px] text-[#6B7280] mt-1">
                Status: <span className="text-emerald-700 font-medium">{readiness.statusLabel}</span> (Target 140+)
              </div>
            </div>
            <div className="text-[10px] text-emerald-700 font-semibold mt-3 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>Deep Analytics</span>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. PERSISTENT DAILY CHECKLIST                                */}
      {/* ============================================================ */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E5E7EB]">
          <div>
            <div className="flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600" />
              <h2 className="text-base font-bold text-[#111827]">
                Today&apos;s Structured Study Checklist
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-mono font-bold border border-emerald-200">
                {checklistPercentage}% Completed
              </span>
            </div>
            <p className="text-xs text-[#6B7280] mt-0.5">
              Click any item to complete or undo. Add custom tasks, edit, or reset to syllabus anytime.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setShowAddTask(!showAddTask)}
              className="px-3 py-1.5 rounded-lg bg-[#1677B8] hover:bg-[#136298] text-white text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Custom Task</span>
            </button>
            <button
              onClick={handleResetChecklist}
              className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#222222] text-xs font-medium border border-[#E5E7EB] transition-colors cursor-pointer"
              title="Reset checklist to week template"
            >
              <RotateCcw className="w-3 h-3 inline mr-1" />
              <span>Reset to Syllabus</span>
            </button>
            <button
              onClick={onOpenTimer}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#222222] text-xs font-semibold flex items-center gap-1 transition-colors border border-[#E5E7EB] cursor-pointer"
            >
              <Clock className="w-3.5 h-3.5 text-[#1677B8]" />
              <span>Pomodoro Timer</span>
            </button>
          </div>
        </div>

        {/* Progress bar visual */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-[#6B7280] font-mono">
            <span>Progress: {completedTasks} of {totalTasks} tasks finished</span>
            <span className="font-bold text-[#1677B8]">{checklistPercentage}%</span>
          </div>
          <div className="w-full bg-[#E5E7EB] h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${checklistPercentage}%` }}
            />
          </div>
        </div>

        {/* Add Task Form Drawer */}
        {showAddTask && (
          <form onSubmit={handleAddTask} className="p-4 rounded-xl bg-slate-50 border border-[#E5E7EB] space-y-3">
            <div className="font-semibold text-xs text-[#111827]">Add New Daily Task</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <input
                  type="text"
                  placeholder="Task description (e.g., Memorize 15 counters, study Lesson 3 dialog)"
                  value={newTaskDesc}
                  onChange={e => setNewTaskDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#E5E7EB] text-xs text-[#222222] placeholder-[#9CA3AF] focus:outline-none focus:border-[#1677B8]"
                  required
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <select
                  value={newSubject}
                  onChange={e => setNewSubject(e.target.value as StudyCategory)}
                  className="px-2 py-2 rounded-lg bg-white border border-[#E5E7EB] text-xs text-[#222222] focus:outline-none"
                >
                  <option value="Grammar">Grammar</option>
                  <option value="Vocabulary">Vocabulary</option>
                  <option value="Kanji">Kanji</option>
                  <option value="Reading">Reading</option>
                  <option value="Listening">Listening</option>
                  <option value="Hiragana">Hiragana</option>
                  <option value="Katakana">Katakana</option>
                </select>

                <input
                  type="number"
                  min="5"
                  max="180"
                  value={newDuration}
                  onChange={e => setNewDuration(Number(e.target.value))}
                  className="px-2 py-2 rounded-lg bg-white border border-[#E5E7EB] text-xs text-[#222222] text-center focus:outline-none"
                  title="Duration in minutes"
                />

                <select
                  value={newPriority}
                  onChange={e => setNewPriority(e.target.value as 'High' | 'Medium' | 'Low')}
                  className="px-2 py-2 rounded-lg bg-white border border-[#E5E7EB] text-xs text-[#222222] focus:outline-none"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowAddTask(false)}
                className="px-3 py-1.5 rounded-lg bg-transparent text-[#6B7280] hover:text-[#111827] text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-[#1677B8] hover:bg-[#136298] text-white text-xs font-semibold cursor-pointer shadow-2xs"
              >
                Save Task
              </button>
            </div>
          </form>
        )}

        {/* Edit Task Modal / Drawer */}
        {editingTask && (
          <form onSubmit={handleSaveEdit} className="p-4 rounded-xl bg-slate-50 border border-[#1677B8] space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-[#1677B8]">
              <span>Edit Task</span>
              <span className="text-[10px] text-[#6B7280]">ID: {editingTask.id}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <input
                  type="text"
                  value={editDesc}
                  onChange={e => setEditDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#E5E7EB] text-xs text-[#222222] focus:outline-none focus:border-[#1677B8]"
                  required
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <select
                  value={editSubject}
                  onChange={e => setEditSubject(e.target.value as StudyCategory)}
                  className="px-2 py-2 rounded-lg bg-white border border-[#E5E7EB] text-xs text-[#222222] focus:outline-none"
                >
                  <option value="Grammar">Grammar</option>
                  <option value="Vocabulary">Vocabulary</option>
                  <option value="Kanji">Kanji</option>
                  <option value="Reading">Reading</option>
                  <option value="Listening">Listening</option>
                  <option value="Hiragana">Hiragana</option>
                  <option value="Katakana">Katakana</option>
                </select>

                <input
                  type="number"
                  min="5"
                  max="180"
                  value={editDuration}
                  onChange={e => setEditDuration(Number(e.target.value))}
                  className="px-2 py-2 rounded-lg bg-white border border-[#E5E7EB] text-xs text-[#222222] text-center focus:outline-none"
                />

                <select
                  value={editPriority}
                  onChange={e => setEditPriority(e.target.value as 'High' | 'Medium' | 'Low')}
                  className="px-2 py-2 rounded-lg bg-white border border-[#E5E7EB] text-xs text-[#222222] focus:outline-none"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setEditingTask(null)}
                className="px-3 py-1.5 rounded-lg bg-transparent text-[#6B7280] hover:text-[#111827] text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-[#1677B8] hover:bg-[#136298] text-white text-xs font-semibold cursor-pointer shadow-2xs"
              >
                Update Task
              </button>
            </div>
          </form>
        )}

        {/* Checklist Items List */}
        <div className="space-y-2.5">
          {todayList.map((task) => {
            const linkedMaterial = task.materialId
              ? state.materials.find(m => m.id === task.materialId)
              : undefined;

            return (
              <div
                key={task.id}
                className={`p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                  task.completed
                    ? 'bg-slate-50 border-[#E5E7EB] text-[#9CA3AF]'
                    : 'bg-white border-[#E5E7EB] text-[#222222] hover:border-[#1677B8]'
                }`}
              >
                {/* Complete / Undo click */}
                <div
                  onClick={() => handleToggleTask(task.id)}
                  className="flex items-start gap-3 cursor-pointer flex-1 min-w-0"
                >
                  <button
                    type="button"
                    className="mt-0.5 text-[#9CA3AF] hover:text-emerald-600 transition-colors shrink-0 cursor-pointer"
                    title={task.completed ? 'Mark as Incomplete (Undo)' : 'Mark as Completed'}
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </button>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-xs font-semibold ${task.completed ? 'line-through text-[#9CA3AF]' : 'text-[#111827]'}`}>
                        {task.taskDescription}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        task.priority === 'High'
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : task.priority === 'Medium'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-slate-100 text-[#6B7280]'
                      }`}>
                        {task.priority}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mt-1.5 text-[11px] text-[#6B7280] flex-wrap">
                      <span className="px-2 py-0.5 rounded bg-slate-100 border border-[#E5E7EB] text-[#222222]">
                        {task.subject}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#9CA3AF]" />
                        {task.durationMinutes} min
                      </span>
                      {linkedMaterial && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenPdf(linkedMaterial);
                          }}
                          className="text-[#1677B8] hover:text-[#136298] flex items-center gap-1 font-medium underline cursor-pointer"
                        >
                          <BookOpen className="w-3 h-3" />
                          <span>Open {linkedMaterial.name.split('—')[0]}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Edit & Delete Action Buttons */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => handleStartEdit(task)}
                    className="p-1.5 text-[#9CA3AF] hover:text-[#1677B8] rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                    title="Edit task"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="p-1.5 text-[#9CA3AF] hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                    title="Delete task"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 4. DAILY SHORT EXAM & SPACED REVISION LAUNCHPAD              */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Daily Short Exam Box */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#1677B8]" />
                <h3 className="text-sm font-bold text-[#111827]">Daily Short Exam (10 Questions)</h3>
              </div>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-[#1677B8] border border-[#E5E7EB] font-mono">
                Week {currentWeek} Adaptive
              </span>
            </div>

            <p className="text-xs text-[#6B7280] mb-3">
              Questions strictly derived from syllabus material studied up to Week {currentWeek}: Kanji, Particles (は, が, に, で), Star word ordering (★), and reading snippets.
            </p>

            {todayExam ? (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs flex items-center justify-between">
                <div>
                  <div className="text-emerald-800 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Exam Completed Today</span>
                  </div>
                  <div className="text-[#6B7280] mt-0.5">{todayExam.correctCount} of {todayExam.totalQuestions} Correct Answers</div>
                </div>
                <div className="text-2xl font-black font-mono text-[#111827]">
                  {todayExam.scorePercentage}%
                </div>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Today&apos;s exam is not taken yet. Complete it to achieve your Full Study Day.</span>
              </div>
            )}
          </div>

          <button
            onClick={onOpenExam}
            className="mt-4 w-full py-2.5 rounded-lg bg-[#1677B8] hover:bg-[#136298] text-white text-xs font-bold shadow-2xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>{todayExam ? 'Retake Exam (Practice Drills)' : 'Start Today\'s 10-Question Exam'}</span>
          </button>
        </div>

        {/* Spaced Revision & Mistakes Box */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-[#1677B8]" />
                <h3 className="text-sm font-bold text-[#111827]">Spaced Repetition & Mistake Notebook</h3>
              </div>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-[#1677B8] border border-[#E5E7EB] font-mono">
                1-3-7-14d SRS
              </span>
            </div>

            <p className="text-xs text-[#6B7280] mb-3">
              Review past grammar rules, kanji, and vocabulary on spaced memory intervals to guarantee 100% recall retention on exam day.
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-[#E5E7EB]">
                <div className="text-[#6B7280] text-[11px]">Due for Revision</div>
                <div className="text-lg font-bold text-amber-700 font-mono">{dueSrsItems.length} Items</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-[#E5E7EB]">
                <div className="text-[#6B7280] text-[11px]">Active Mistakes</div>
                <div className="text-lg font-bold text-red-700 font-mono">{unmasteredMistakes.length} Errors</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            <button
              onClick={() => onNavigateToTab('revision')}
              className="py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-[#222222] border border-[#E5E7EB] transition-colors cursor-pointer text-center"
            >
              Review Due Items ({dueSrsItems.length})
            </button>
            <button
              onClick={() => onNavigateToTab('mistakes')}
              className="py-2.5 rounded-lg bg-red-50 hover:bg-red-100 text-xs font-semibold text-red-700 border border-red-200 transition-colors cursor-pointer text-center"
            >
              Mistake Notebook ({unmasteredMistakes.length})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
