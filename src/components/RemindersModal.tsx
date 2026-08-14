import React, { useState } from 'react';
import {
  X,
  Bell,
  CheckCircle2,
  Clock,
  Volume2,
  VolumeX,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { AppState } from '../types';
import { sound } from '../utils/audio';

interface RemindersModalProps {
  state: AppState;
  onClose: () => void;
  onUpdateState: (updater: (prev: AppState) => AppState) => void;
}

export const RemindersModal: React.FC<RemindersModalProps> = ({
  state,
  onClose,
  onUpdateState
}) => {
  const [enabled, setEnabled] = useState(state.settings.remindersEnabled);
  const [reminderTime, setReminderTime] = useState(state.settings.reminderTime || '20:00');
  const [soundEnabled, setSoundEnabled] = useState(state.settings.soundEnabled);
  const [dailyQuestionCount, setDailyQuestionCount] = useState(state.settings.dailyQuestionCount || 10);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    onUpdateState(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        remindersEnabled: enabled,
        reminderTime,
        soundEnabled,
        dailyQuestionCount: Number(dailyQuestionCount)
      }
    }));

    sound.playCorrect();
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white border border-[#E5E7EB] rounded-2xl w-full max-w-md p-6 shadow-xl space-y-5 text-[#222222]">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1677B8] text-white flex items-center justify-center shadow-2xs">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#111827]">
                Daily Study Reminders & Settings
              </h2>
              <span className="text-xs text-[#6B7280]">
                Habit and sound configurations
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

        {/* Form Options */}
        <div className="space-y-3 text-xs">
          
          {/* Daily Reminder Toggle */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-[#E5E7EB] flex items-center justify-between">
            <div>
              <div className="font-bold text-[#111827]">Daily Study Reminder Alert</div>
              <div className="text-[#6B7280] text-[11px]">Notify on schedule for daily check-in</div>
            </div>
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
              className="w-4 h-4 accent-[#1677B8] rounded cursor-pointer"
            />
          </div>

          {/* Reminder Time */}
          {enabled && (
            <div className="p-3.5 rounded-xl bg-slate-50 border border-[#E5E7EB] flex items-center justify-between">
              <div>
                <div className="font-bold text-[#111827]">Scheduled Daily Study Time</div>
                <div className="text-[#6B7280] text-[11px]">Best time to review before bed</div>
              </div>
              <input
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="px-2.5 py-1 rounded-lg bg-white border border-[#E5E7EB] text-[#222222] font-mono text-xs focus:outline-none focus:border-[#1677B8]"
              />
            </div>
          )}

          {/* Sound Toggle */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-[#E5E7EB] flex items-center justify-between">
            <div>
              <div className="font-bold text-[#111827]">Sound Effects & Speech Chimes</div>
              <div className="text-[#6B7280] text-[11px]">Synthesizer audio feedback for quizzes</div>
            </div>
            <input
              type="checkbox"
              checked={soundEnabled}
              onChange={(e) => setSoundEnabled(e.target.checked)}
              className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
            />
          </div>

          {/* Daily Exam Question Count */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-[#E5E7EB] flex items-center justify-between">
            <div>
              <div className="font-bold text-[#111827]">Daily Short Exam Question Count</div>
              <div className="text-[#6B7280] text-[11px]">Number of adaptive drills per day</div>
            </div>
            <select
              value={dailyQuestionCount}
              onChange={(e) => setDailyQuestionCount(Number(e.target.value))}
              className="px-2.5 py-1 rounded-lg bg-white border border-[#E5E7EB] text-[#222222] text-xs focus:outline-none focus:border-[#1677B8]"
            >
              <option value="5">5 Questions (Quick)</option>
              <option value="10">10 Questions (Standard)</option>
              <option value="15">15 Questions (Intense)</option>
              <option value="20">20 Questions (Mastery)</option>
            </select>
          </div>

        </div>

        {/* Save Button */}
        <div className="pt-2">
          <button
            onClick={handleSave}
            className="w-full py-2.5 rounded-lg bg-[#1677B8] hover:bg-[#136298] text-white font-bold text-xs shadow-2xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isSaved ? 'Preferences Saved ✓' : 'Save Preferences'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
