import React, { useState } from 'react';
import {
  RefreshCw,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Sparkles,
  Calendar,
  Layers,
  Search,
  Filter
} from 'lucide-react';
import { AppState, SrsReviewItem, StudyCategory } from '../types';
import { sound } from '../utils/audio';

interface RevisionViewProps {
  state: AppState;
  onUpdateState: (updater: (prev: AppState) => AppState) => void;
}

export const RevisionView: React.FC<RevisionViewProps> = ({
  state,
  onUpdateState
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<StudyCategory>('Grammar');
  const [newSource, setNewSource] = useState('');
  const [tabFilter, setTabFilter] = useState<'due' | 'upcoming' | 'all'>('due');

  const today = state.simulatedCurrentDate;

  const dueItems = state.srsQueue.filter(s => s.nextReviewDate <= today);
  const upcomingItems = state.srsQueue.filter(s => s.nextReviewDate > today);

  const displayItems =
    tabFilter === 'due'
      ? dueItems
      : tabFilter === 'upcoming'
      ? upcomingItems
      : state.srsQueue;

  const handleReviewAction = (itemId: string, action: 'advance' | 'reset' | 'snooze') => {
    onUpdateState(prev => {
      const updatedQueue = prev.srsQueue.map(item => {
        if (item.id === itemId) {
          let nextStage = item.stage;
          let interval = item.intervalDays;
          let streak = item.consecutiveCorrect;

          if (action === 'advance') {
            nextStage = Math.min(5, item.stage + 1);
            streak += 1;
            // 1 -> 3 -> 7 -> 14 -> 30 days
            const intervals = [1, 1, 3, 7, 14, 30];
            interval = intervals[nextStage] || 30;
            if (prev.settings.soundEnabled) sound.playSuccessChime();
          } else if (action === 'reset') {
            nextStage = 1;
            interval = 1;
            streak = 0;
            if (prev.settings.soundEnabled) sound.playIncorrect();
          } else if (action === 'snooze') {
            interval = 2;
          }

          // Calculate next date
          const nextDateObj = new Date(prev.simulatedCurrentDate);
          nextDateObj.setDate(nextDateObj.getDate() + interval);
          const nextDateStr = nextDateObj.toISOString().split('T')[0];

          return {
            ...item,
            stage: nextStage,
            intervalDays: interval,
            consecutiveCorrect: streak,
            lastReviewed: prev.simulatedCurrentDate,
            nextReviewDate: nextDateStr
          };
        }
        return item;
      });

      return {
        ...prev,
        srsQueue: updatedQueue
      };
    });
  };

  const handleAddSrsItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: SrsReviewItem = {
      id: `srs-custom-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      stage: 1,
      lastReviewed: state.simulatedCurrentDate,
      nextReviewDate: state.simulatedCurrentDate,
      intervalDays: 1,
      consecutiveCorrect: 0,
      sourceMaterial: newSource.trim() || 'Custom Note'
    };

    onUpdateState(prev => ({
      ...prev,
      srsQueue: [...prev.srsQueue, newItem]
    }));

    setNewTitle('');
    setNewSource('');
    setShowAddForm(false);
    sound.playCorrect();
  };

  const handleDeleteItem = (itemId: string) => {
    onUpdateState(prev => ({
      ...prev,
      srsQueue: prev.srsQueue.filter(s => s.id !== itemId)
    }));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Top Header Card */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#6B7280] mb-1">
              <RefreshCw className="w-3.5 h-3.5 text-[#1677B8]" />
              <span>Spaced Repetition Schedule (1, 3, 7, 14, 30 Days)</span>
              <span>•</span>
              <span className="font-mono text-[#1677B8] font-semibold">{dueItems.length} Due for Recall Today</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight">
              Spaced Revision Command Engine
            </h1>
            <p className="text-xs text-[#6B7280] mt-1">
              Reinforces high-yield grammar patterns, confusing particles, and kanji at calculated forgetting curve intervals.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-3 py-1.5 rounded-lg bg-[#1677B8] hover:bg-[#136298] text-white text-xs font-semibold flex items-center gap-1 transition-colors shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Revision Item</span>
            </button>

            <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-[#E5E7EB]">
              <button
                onClick={() => setTabFilter('due')}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                  tabFilter === 'due' ? 'bg-[#1677B8] text-white shadow-2xs' : 'text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                Due Today ({dueItems.length})
              </button>
              <button
                onClick={() => setTabFilter('upcoming')}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                  tabFilter === 'upcoming' ? 'bg-slate-100 text-[#4B5563] shadow-2xs' : 'text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                Upcoming ({upcomingItems.length})
              </button>
              <button
                onClick={() => setTabFilter('all')}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                  tabFilter === 'all' ? 'bg-[#1677B8] text-white shadow-2xs' : 'text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                All ({state.srsQueue.length})
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Srs Item Form */}
      {showAddForm && (
        <form onSubmit={handleAddSrsItem} className="p-4 rounded-xl bg-slate-50 border border-[#E5E7EB] space-y-3">
          <div className="text-xs font-bold text-[#111827] uppercase tracking-wider">
            Schedule New Topic / Grammar for Spaced Revision
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <input
                type="text"
                placeholder="Topic / Grammar point (e.g. て-form rules, 〜てください, に vs で location rules)"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white border border-[#E5E7EB] text-xs text-[#222222] placeholder-[#9CA3AF] focus:outline-none focus:border-[#1677B8]"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as StudyCategory)}
                className="px-2 py-2 rounded-lg bg-white border border-[#E5E7EB] text-xs text-[#222222] focus:outline-none"
              >
                <option value="Grammar">Grammar</option>
                <option value="Vocabulary">Vocabulary</option>
                <option value="Kanji">Kanji</option>
                <option value="Reading">Reading</option>
                <option value="Listening">Listening</option>
              </select>

              <input
                type="text"
                placeholder="Source Material"
                value={newSource}
                onChange={(e) => setNewSource(e.target.value)}
                className="px-3 py-2 rounded-lg bg-white border border-[#E5E7EB] text-xs text-[#222222] placeholder-[#9CA3AF] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1.5 rounded-lg text-xs text-[#6B7280] hover:text-[#111827]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-[#1677B8] hover:bg-[#136298] text-white text-xs font-semibold"
            >
              Schedule in Queue
            </button>
          </div>
        </form>
      )}

      {/* SRS Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayItems.length > 0 ? (
          displayItems.map((item) => {
            const isDue = item.nextReviewDate <= today;

            return (
              <div
                key={item.id}
                className={`p-5 rounded-xl border flex flex-col justify-between transition-all ${
                  isDue
                    ? 'bg-white border-[#1677B8]/40 shadow-xs ring-1 ring-[#1677B8]/20'
                    : 'bg-white border-[#E5E7EB] shadow-2xs'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-100 text-[#4B5563] border border-[#E5E7EB]">
                      {item.category}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-[#1677B8] font-bold">
                        Stage {item.stage} / 5
                      </span>
                      {isDue ? (
                        <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold">
                          DUE TODAY
                        </span>
                      ) : (
                        <span className="text-[11px] text-[#6B7280] font-mono">
                          In {Math.max(1, Math.ceil((new Date(item.nextReviewDate).getTime() - new Date(today).getTime()) / (1000 * 3600 * 24)))} days
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="font-bold text-sm text-[#111827] leading-relaxed">
                    {item.title}
                  </h3>

                  <div className="text-[11px] text-[#6B7280] flex items-center justify-between">
                    <span>Source: <span className="text-[#222222]">{item.sourceMaterial || 'N5 Syllabus'}</span></span>
                    <span>Consecutive: <span className="text-emerald-700 font-mono font-bold">{item.consecutiveCorrect}x</span></span>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-4 pt-3 border-t border-[#E5E7EB] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleReviewAction(item.id, 'advance')}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1 transition-colors shadow-2xs"
                      title="Advance to next SRS stage (longer interval)"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Remembered (+1)</span>
                    </button>
                    <button
                      onClick={() => handleReviewAction(item.id, 'reset')}
                      className="px-2.5 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-800 border border-red-200 text-xs font-medium transition-colors"
                      title="Reset to Stage 1 (Review tomorrow)"
                    >
                      Forgot (1d)
                    </button>
                    <button
                      onClick={() => handleReviewAction(item.id, 'snooze')}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#4B5563] text-xs transition-colors"
                      title="Snooze 2 days"
                    >
                      Snooze
                    </button>
                  </div>

                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="p-1.5 text-[#9CA3AF] hover:text-[#E53935] rounded-lg"
                    title="Remove from queue"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="md:col-span-2 p-12 text-center bg-white border border-[#E5E7EB] rounded-xl space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 mx-auto flex items-center justify-center text-xl border border-amber-200">
              🎉
            </div>
            <h3 className="font-bold text-[#111827] text-sm">All Spaced Revisions Up-To-Date!</h3>
            <p className="text-xs text-[#6B7280] max-w-sm mx-auto">
              Your memory intervals are on track. New items will automatically appear when their review dates arrive.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
