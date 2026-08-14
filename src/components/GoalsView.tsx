import React, { useState } from 'react';
import {
  Sparkles,
  Plus,
  CheckCircle2,
  Circle,
  Target,
  Trophy,
  Edit3,
  Trash2
} from 'lucide-react';
import { AppState, UserGoal } from '../types';
import { sound } from '../utils/audio';

interface GoalsViewProps {
  state: AppState;
  onUpdateState: (updater: (prev: AppState) => AppState) => void;
}

export const GoalsView: React.FC<GoalsViewProps> = ({
  state,
  onUpdateState
}) => {
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Grammar');
  const [newTarget, setNewTarget] = useState(100);
  const [newUnit, setNewUnit] = useState('Items');

  const handleUpdateProgress = (goalId: string, delta: number) => {
    onUpdateState(prev => ({
      ...prev,
      goals: prev.goals.map(g => {
        if (g.id === goalId) {
          const next = Math.max(0, Math.min(g.targetProgress, g.currentProgress + delta));
          const completed = next >= g.targetProgress;
          if (completed && !g.completed && prev.settings.soundEnabled) {
            sound.playSuccessChime();
          }
          return { ...g, currentProgress: next, completed };
        }
        return g;
      })
    }));
  };

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newGoal: UserGoal = {
      id: `goal-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      currentProgress: 0,
      targetProgress: Number(newTarget),
      unit: newUnit.trim(),
      completed: false
    };

    onUpdateState(prev => ({
      ...prev,
      goals: [...prev.goals, newGoal]
    }));

    setNewTitle('');
    setShowAddGoal(false);
    sound.playCorrect();
  };

  const handleDeleteGoal = (goalId: string) => {
    onUpdateState(prev => ({
      ...prev,
      goals: prev.goals.filter(g => g.id !== goalId)
    }));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Top Header Card */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#6B7280] mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#1677B8]" />
              <span>Main Examination Goals & Milestones</span>
              <span>•</span>
              <span className="font-mono text-[#1677B8] font-semibold">Target: 140+ / 180 (Exam: 6 Dec 2026)</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight">
              JLPT N5 Goals & Subgoal Tracker
            </h1>
            <p className="text-xs text-[#6B7280] mt-1">
              Track progress on your overarching exam target and subgoals: Hiragana/Katakana, 700+ Vocab, 25 Minna Lessons, 110 Kanji, and 3 Mock Exams.
            </p>
          </div>

          <button
            onClick={() => setShowAddGoal(!showAddGoal)}
            className="px-4 py-2 rounded-lg bg-[#1677B8] hover:bg-[#136298] text-white text-xs font-bold shadow-2xs flex items-center gap-1.5 self-start md:self-auto transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Custom Goal</span>
          </button>
        </div>
      </div>

      {/* Add Custom Goal Modal Drawer */}
      {showAddGoal && (
        <form onSubmit={handleAddGoal} className="p-5 rounded-xl bg-slate-50 border border-[#E5E7EB] space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-[#111827]">Create New Study Goal</div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <div className="sm:col-span-2">
              <label className="text-[#6B7280] block mb-1">Goal Description:</label>
              <input
                type="text"
                placeholder="e.g. Master all 10 counters (つ, 人, 本, 枚...)"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white border border-[#E5E7EB] text-[#222222] focus:outline-none focus:border-[#1677B8]"
                required
              />
            </div>
            <div>
              <label className="text-[#6B7280] block mb-1">Target Quantity:</label>
              <input
                type="number"
                min="1"
                value={newTarget}
                onChange={e => setNewTarget(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-white border border-[#E5E7EB] text-[#222222] focus:outline-none focus:border-[#1677B8]"
                required
              />
            </div>
            <div>
              <label className="text-[#6B7280] block mb-1">Unit:</label>
              <input
                type="text"
                placeholder="e.g. Words, Rules, Tests"
                value={newUnit}
                onChange={e => setNewUnit(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white border border-[#E5E7EB] text-[#222222] focus:outline-none focus:border-[#1677B8]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowAddGoal(false)}
              className="px-3 py-1.5 rounded-lg text-xs text-[#6B7280] hover:text-[#111827]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-[#1677B8] hover:bg-[#136298] text-white text-xs font-bold shadow-2xs"
            >
              Save Goal
            </button>
          </div>
        </form>
      )}

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {state.goals.map((goal) => {
          const percentage = Math.min(100, Math.round((goal.currentProgress / goal.targetProgress) * 100));

          return (
            <div
              key={goal.id}
              className={`p-5 rounded-xl border flex flex-col justify-between transition-all shadow-2xs ${
                goal.completed
                  ? 'bg-slate-50 border-emerald-300'
                  : 'bg-white border-[#E5E7EB]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-100 text-[#6B7280] border border-[#E5E7EB]">
                    {goal.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#111827]">
                      {goal.currentProgress} / {goal.targetProgress} {goal.unit}
                    </span>
                    {goal.completed && (
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                        COMPLETED ✓
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="font-bold text-sm text-[#111827] mb-3">
                  {goal.title}
                </h3>

                {/* Progress bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] text-[#6B7280]">
                    <span>Progress</span>
                    <span className="font-mono font-bold text-[#1677B8]">{percentage}%</span>
                  </div>
                  <div className="w-full bg-[#E5E7EB] h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        goal.completed ? 'bg-emerald-600' : 'bg-[#1677B8]'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Progress Adjuster Controls */}
              <div className="mt-4 pt-3 border-t border-[#E5E7EB] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleUpdateProgress(goal.id, -1)}
                    className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 border border-[#E5E7EB] text-[#222222] font-bold text-xs flex items-center justify-center transition-colors"
                    title="Subtract 1"
                  >
                    -
                  </button>
                  <button
                    onClick={() => handleUpdateProgress(goal.id, 1)}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 border border-[#E5E7EB] text-[#222222] font-bold text-xs flex items-center justify-center transition-colors"
                    title="Add 1"
                  >
                    +1
                  </button>
                  <button
                    onClick={() => handleUpdateProgress(goal.id, 5)}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 border border-[#E5E7EB] text-[#222222] font-bold text-xs flex items-center justify-center transition-colors"
                    title="Add 5"
                  >
                    +5
                  </button>
                </div>

                <button
                  onClick={() => handleDeleteGoal(goal.id)}
                  className="p-1.5 text-[#9CA3AF] hover:text-red-600 rounded-lg transition-colors"
                  title="Delete goal"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
