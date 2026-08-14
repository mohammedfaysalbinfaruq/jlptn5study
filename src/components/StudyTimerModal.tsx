import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Clock,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Check,
  Flame,
  Award,
  ArrowRight,
  PlusCircle,
  Volume2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AppState, StudyCategory, StudyLogItem } from '../types';
import { sound } from '../utils/audio';
import { calculateTotalStudyMinutes, formatTotalStudyTime, getTodayStudyMinutes } from '../utils/storage';

interface StudyTimerModalProps {
  state: AppState;
  onClose: () => void;
  onUpdateState: (updater: (prev: AppState) => AppState) => void;
}

export const StudyTimerModal: React.FC<StudyTimerModalProps> = ({
  state,
  onClose,
  onUpdateState
}) => {
  const [mode, setMode] = useState<'work' | 'break'>('work');
  const [durationMinutes, setDurationMinutes] = useState(25);
  const [secondsRemaining, setSecondsRemaining] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<StudyCategory>('Grammar');
  const [sessionNotes, setSessionNotes] = useState('');
  const [completedSessionData, setCompletedSessionData] = useState<{
    durationMinutes: number;
    category: StudyCategory;
    date: string;
  } | null>(null);

  const initialTotalSecondsRef = useRef(25 * 60);

  // Switch presets
  const handleSelectPreset = (mins: number, timerMode: 'work' | 'break') => {
    setIsActive(false);
    setMode(timerMode);
    setDurationMinutes(mins);
    setSecondsRemaining(mins * 60);
    initialTotalSecondsRef.current = mins * 60;
    setCompletedSessionData(null);
  };

  // Helper to log study session to AppState
  const logCompletedSession = (minutesToLog: number, category: StudyCategory, notes: string) => {
    if (minutesToLog <= 0) return;

    const newLog: StudyLogItem = {
      id: `log-${Date.now()}`,
      date: state.simulatedCurrentDate,
      category,
      durationMinutes: minutesToLog,
      notes: notes.trim() || `Completed ${minutesToLog}m ${category} session`
    };

    onUpdateState(prev => {
      const isNewStudyDay = !prev.studyLogs.some(l => l.date === prev.simulatedCurrentDate);
      return {
        ...prev,
        studyLogs: [...prev.studyLogs, newLog],
        streaks: {
          ...prev.streaks,
          totalStudyHours: parseFloat((prev.streaks.totalStudyHours + minutesToLog / 60).toFixed(2)),
          totalStudyDays: isNewStudyDay ? prev.streaks.totalStudyDays + 1 : prev.streaks.totalStudyDays,
          lastActiveDate: prev.simulatedCurrentDate
        }
      };
    });

    setCompletedSessionData({
      durationMinutes: minutesToLog,
      category,
      date: state.simulatedCurrentDate
    });

    if (state.settings.soundEnabled) {
      sound.playBell();
      sound.playSuccessChime();
    }

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  // Timer Tick
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining(sec => {
          if (sec <= 1) {
            // Reached completion!
            setIsActive(false);
            if (mode === 'work') {
              logCompletedSession(durationMinutes, selectedCategory, sessionNotes);
            } else {
              if (state.settings.soundEnabled) sound.playBell();
            }
            return 0;
          }
          return sec - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, secondsRemaining, mode, durationMinutes, selectedCategory, sessionNotes, state.settings.soundEnabled, state.simulatedCurrentDate]);

  const togglePlay = () => {
    if (secondsRemaining === 0) {
      // Restart if at 0
      setSecondsRemaining(durationMinutes * 60);
      initialTotalSecondsRef.current = durationMinutes * 60;
      setCompletedSessionData(null);
    }
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setSecondsRemaining(durationMinutes * 60);
    initialTotalSecondsRef.current = durationMinutes * 60;
    setCompletedSessionData(null);
  };

  // Manual Log Early if user studied at least 1 minute and wants to save
  const handleLogEarly = () => {
    const elapsedSeconds = initialTotalSecondsRef.current - secondsRemaining;
    const elapsedMinutes = Math.max(1, Math.round(elapsedSeconds / 60));
    
    setIsActive(false);
    logCompletedSession(elapsedMinutes, selectedCategory, sessionNotes);
    setSecondsRemaining(0);
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const totalSessionSecs = durationMinutes * 60;
  const elapsedSecs = totalSessionSecs - secondsRemaining;
  const progressPercentage = Math.min(100, Math.round((elapsedSecs / totalSessionSecs) * 100));

  const totalStudiedMinutes = calculateTotalStudyMinutes(state);
  const totalFormatted = formatTotalStudyTime(totalStudiedMinutes);
  const todayMinutes = getTodayStudyMinutes(state);

  const todayLogs = state.studyLogs.filter(l => l.date === state.simulatedCurrentDate);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white border border-[#E5E7EB] rounded-2xl w-full max-w-lg max-h-[92vh] flex flex-col shadow-xl overflow-hidden text-[#222222]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-[#E5E7EB] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#1677B8] text-white flex items-center justify-center shadow-2xs">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-[#111827]">
                Pomodoro Focus & Study Logger
              </h2>
              <span className="text-xs text-[#6B7280]">
                {mode === 'work' ? 'Deep Study Session • Auto-Logs to Dashboard' : 'Rest & Recovery Break'}
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

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          
          {/* Top Live Counters Banner */}
          <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-50 border border-[#E5E7EB]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#6B7280] block">Total Studied</span>
                <span className="text-sm font-extrabold text-[#111827] font-mono">{totalFormatted.formatted}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 border-l border-[#E5E7EB] pl-3">
              <div className="p-2 rounded-xl bg-blue-50 border border-blue-200 text-[#1677B8]">
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#6B7280] block">Logged Today</span>
                <span className="text-sm font-extrabold text-[#1677B8] font-mono">{todayMinutes} mins</span>
              </div>
            </div>
          </div>

          {/* Preset Buttons */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280]">
              Select Session Preset
            </div>
            <div className="grid grid-cols-4 gap-2 text-xs">
              <button
                onClick={() => handleSelectPreset(25, 'work')}
                className={`py-2 rounded-lg font-bold transition-all border cursor-pointer ${
                  durationMinutes === 25 && mode === 'work'
                    ? 'bg-[#1677B8] text-white border-[#1677B8] shadow-2xs'
                    : 'bg-white text-[#222222] border-[#E5E7EB] hover:bg-slate-50'
                }`}
              >
                25m Focus
              </button>
              <button
                onClick={() => handleSelectPreset(50, 'work')}
                className={`py-2 rounded-lg font-bold transition-all border cursor-pointer ${
                  durationMinutes === 50 && mode === 'work'
                    ? 'bg-[#1677B8] text-white border-[#1677B8] shadow-2xs'
                    : 'bg-white text-[#222222] border-[#E5E7EB] hover:bg-slate-50'
                }`}
              >
                50m Drill
              </button>
              <button
                onClick={() => handleSelectPreset(15, 'work')}
                className={`py-2 rounded-lg font-bold transition-all border cursor-pointer ${
                  durationMinutes === 15 && mode === 'work'
                    ? 'bg-[#1677B8] text-white border-[#1677B8] shadow-2xs'
                    : 'bg-white text-[#222222] border-[#E5E7EB] hover:bg-slate-50'
                }`}
              >
                15m Quick
              </button>
              <button
                onClick={() => handleSelectPreset(5, 'break')}
                className={`py-2 rounded-lg font-bold transition-all border cursor-pointer ${
                  durationMinutes === 5 && mode === 'break'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                    : 'bg-white text-[#222222] border-[#E5E7EB] hover:bg-slate-50'
                }`}
              >
                5m Break
              </button>
            </div>
          </div>

          {/* Success / Logged Confirmation Card */}
          {completedSessionData && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2 animate-fadeIn">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Session Duration Automatically Logged!</span>
              </div>
              <div className="text-xs text-[#222222]">
                Added <strong className="text-emerald-800 font-mono">+{completedSessionData.durationMinutes} minutes</strong> of {completedSessionData.category} study to your Dashboard and streak records.
              </div>
            </div>
          )}

          {/* Timer Display Ring */}
          <div className="py-7 text-center space-y-3 bg-slate-50 border border-[#E5E7EB] rounded-2xl relative overflow-hidden">
            <div className="text-6xl sm:text-7xl font-black font-mono tracking-tight text-[#111827] select-none">
              {formatTimer(secondsRemaining)}
            </div>
            
            <div className="flex items-center justify-center gap-2 text-xs text-[#6B7280]">
              <span>{progressPercentage}% Completed</span>
              <span>•</span>
              <span className="font-mono text-[#111827]">{Math.round(elapsedSecs / 60)}m / {durationMinutes}m</span>
            </div>

            {/* Progress bar */}
            <div className="w-4/5 mx-auto bg-[#E5E7EB] h-2 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  mode === 'work' ? 'bg-[#1677B8]' : 'bg-emerald-600'
                }`}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Study Subject & Notes Configuration (Work Mode) */}
          {mode === 'work' && (
            <div className="p-4 rounded-xl bg-slate-50 border border-[#E5E7EB] space-y-3 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[#222222]">
                <span className="font-semibold text-[#111827]">Study Subject Category:</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as StudyCategory)}
                  disabled={isActive}
                  className="px-3 py-1.5 rounded-lg bg-white border border-[#E5E7EB] text-[#222222] focus:outline-none focus:border-[#1677B8] cursor-pointer disabled:opacity-75"
                >
                  <option value="Grammar">Grammar Lessons (文法)</option>
                  <option value="Vocabulary">Vocabulary & SRS (語彙)</option>
                  <option value="Kanji">Kanji & Radicals (漢字)</option>
                  <option value="Reading">Reading Comprehension (読解)</option>
                  <option value="Listening">Listening Exercises (聴解)</option>
                  <option value="Hiragana">Hiragana / Katakana</option>
                  <option value="Practice">Practice Drills</option>
                </select>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Optional note: e.g., Lesson 2 particle exercises, Kanji Chapter 1"
                  value={sessionNotes}
                  onChange={(e) => setSessionNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#E5E7EB] text-xs text-[#222222] placeholder-[#9CA3AF] focus:outline-none focus:border-[#1677B8]"
                />
              </div>
            </div>
          )}

          {/* Primary Action Controls */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className={`flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-2xs transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-600 hover:bg-amber-700 text-white'
                    : 'bg-[#1677B8] hover:bg-[#136298] text-white'
                }`}
              >
                {isActive ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
                <span>{isActive ? 'Pause Timer' : secondsRemaining === 0 ? 'Restart Session' : 'Start Focus Session'}</span>
              </button>

              <button
                onClick={handleReset}
                className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#222222] border border-[#E5E7EB] transition-colors cursor-pointer"
                title="Reset Timer to Initial"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Finish & Log Early Button */}
            {mode === 'work' && elapsedSecs >= 60 && secondsRemaining > 0 && (
              <button
                onClick={handleLogEarly}
                className="w-full py-2 px-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Finish & Log Elapsed Time Early ({Math.max(1, Math.round(elapsedSecs / 60))} mins)</span>
              </button>
            )}
          </div>

          {/* Recent Study Sessions Logged Today */}
          <div className="pt-3 border-t border-[#E5E7EB] space-y-2">
            <div className="flex items-center justify-between text-xs text-[#6B7280] font-bold uppercase tracking-wider">
              <span>Today&apos;s Completed Study Logs ({todayLogs.length})</span>
              <span className="font-mono text-[#1677B8] font-normal">{todayMinutes}m total</span>
            </div>

            {todayLogs.length > 0 ? (
              <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                {todayLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-2.5 rounded-lg bg-slate-50 border border-[#E5E7EB] text-xs flex items-center justify-between"
                  >
                    <div className="min-w-0 pr-2">
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 rounded bg-white border border-[#E5E7EB] text-[#222222] text-[10px] font-semibold">
                          {log.category}
                        </span>
                        <span className="text-[#222222] truncate">{log.notes}</span>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-emerald-700 shrink-0">
                      +{log.durationMinutes}m
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-slate-50 text-center text-xs text-[#6B7280]">
                No sessions completed yet today. Start your first 25m focus block!
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
