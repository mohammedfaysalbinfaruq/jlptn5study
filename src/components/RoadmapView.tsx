import React, { useState } from 'react';
import {
  Map,
  CheckCircle2,
  Circle,
  Clock,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Play,
  Layers,
  Sparkles,
  Edit3,
  Calendar,
  Languages
} from 'lucide-react';
import { AppState, RoadmapWeek, StudyMaterial } from '../types';
import { ROADMAP_WEEKS } from '../data/roadmapData';

interface RoadmapViewProps {
  state: AppState;
  onUpdateState: (updater: (prev: AppState) => AppState) => void;
  onOpenPdf: (material: StudyMaterial) => void;
  onOpenExam: () => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  state,
  onUpdateState,
  onOpenPdf,
  onOpenExam
}) => {
  const [expandedWeek, setExpandedWeek] = useState<number>(state.currentWeekNumber);
  const [editingWeek, setEditingWeek] = useState<number | null>(null);

  const handleSetActiveWeek = (weekNum: number) => {
    onUpdateState(prev => ({
      ...prev,
      currentWeekNumber: weekNum
    }));
  };

  const toggleWeekExpand = (weekNum: number) => {
    setExpandedWeek(prev => (prev === weekNum ? -1 : weekNum));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Top Header Card */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#6B7280] mb-1">
              <Map className="w-3.5 h-3.5 text-[#1677B8]" />
              <span>Full N5 Syllabus & Timeline</span>
              <span>•</span>
              <span className="font-mono text-[#1677B8] font-semibold">12 Weeks + Final Revision Phase</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight">
              12-Week Strategic Roadmap to 6 December 2026
            </h1>
            <p className="text-xs text-[#6B7280] mt-1">
              Structured week-by-week curriculum mapped directly to Minna no Nihongo Lessons 1–25, Kanji 1–110, Katakana, and official mock exams.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-lg border border-[#E5E7EB] self-start md:self-auto shadow-2xs">
            <div>
              <div className="text-[10px] uppercase font-bold text-[#6B7280]">Active Position</div>
              <div className="text-sm font-bold text-[#1677B8] font-mono">Week {state.currentWeekNumber} of 12</div>
            </div>
          </div>
        </div>
      </div>

      {/* Roadmap Timeline */}
      <div className="space-y-4">
        {ROADMAP_WEEKS.map((week) => {
          const isCurrent = state.currentWeekNumber === week.weekNumber;
          const isExpanded = expandedWeek === week.weekNumber;
          const isPast = state.currentWeekNumber > week.weekNumber;

          // Find mapped study materials for this week
          const linkedMaterials = state.materials.filter(m => m.assignedWeek === week.weekNumber);

          return (
            <div
              key={week.weekNumber}
              className={`rounded-xl border transition-all bg-white ${
                isCurrent
                  ? 'border-[#1677B8] ring-1 ring-[#1677B8]/20 shadow-xs'
                  : 'border-[#E5E7EB] hover:border-slate-300'
              }`}
            >
              {/* Week Header Row */}
              <div
                onClick={() => toggleWeekExpand(week.weekNumber)}
                className="p-4 sm:p-5 flex items-center justify-between gap-3 cursor-pointer select-none"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 ${
                    isCurrent
                      ? 'bg-[#1677B8] text-white'
                      : isPast
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-slate-100 text-[#4B5563]'
                  }`}>
                    {isPast ? <CheckCircle2 className="w-5 h-5" /> : `W${week.weekNumber}`}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-[#111827] truncate">
                        {week.title}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-[#4B5563] font-mono border border-[#E5E7EB]">
                        {week.minnaLessons}
                      </span>
                      {isCurrent && (
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-blue-50 text-[#1677B8] border border-blue-200">
                          Active Week
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#6B7280] truncate mt-0.5">
                      {week.focusTopic}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {!isCurrent && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSetActiveWeek(week.weekNumber);
                      }}
                      className="hidden sm:inline-flex text-[11px] px-2.5 py-1 rounded-lg bg-white hover:bg-slate-50 text-[#1677B8] border border-[#E5E7EB] font-medium transition-colors"
                    >
                      Set as Active
                    </button>
                  )}
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-[#6B7280]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#6B7280]" />
                  )}
                </div>
              </div>

              {/* Expanded Week Details */}
              {isExpanded && (
                <div className="px-4 sm:px-5 pb-5 pt-2 border-t border-[#E5E7EB] space-y-4 text-xs">
                  
                  {/* Focus Topics & Grammar Rules Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-3.5 rounded-lg bg-slate-50/50 border border-[#E5E7EB]">
                      <div className="font-bold text-[#111827] mb-2 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        <span>Core Grammar Points</span>
                      </div>
                      <ul className="space-y-1 text-[#4B5563]">
                        {week.grammarPoints.map((gp, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-amber-600 font-bold">•</span>
                            <span className="text-[#222222]">{gp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3.5 rounded-lg bg-slate-50/50 border border-[#E5E7EB]">
                      <div className="font-bold text-[#111827] mb-2 flex items-center gap-1.5">
                        <Languages className="w-3.5 h-3.5 text-[#1677B8]" />
                        <span>Vocabulary & Kanji Targets</span>
                      </div>
                      <div className="space-y-2 text-[#4B5563]">
                        <div>
                          <span className="text-[#6B7280] text-[11px]">Vocabulary:</span>
                          <p className="font-medium text-[#222222]">{week.vocabularyTarget}</p>
                        </div>
                        <div>
                          <span className="text-[#6B7280] text-[11px]">Kanji Set:</span>
                          <p className="font-medium text-[#222222]">{week.kanjiTarget}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-lg bg-slate-50/50 border border-[#E5E7EB] flex flex-col justify-between">
                      <div>
                        <div className="font-bold text-[#111827] mb-2 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-[#1677B8]" />
                          <span>Primary PDF Reference</span>
                        </div>
                        <p className="text-[#222222] font-medium">{week.assignedPdf}</p>
                        {week.mockTestRecommended && (
                          <div className="mt-2 text-purple-700 text-[11px] font-semibold">
                            🏆 Recommended: {week.mockTestRecommended}
                          </div>
                        )}
                      </div>

                      <div className="mt-3 flex items-center gap-2">
                        {linkedMaterials.length > 0 && (
                          <button
                            onClick={() => onOpenPdf(linkedMaterials[0])}
                            className="w-full py-1.5 rounded-lg bg-[#1677B8] hover:bg-[#125F94] text-white font-semibold text-xs flex items-center justify-center gap-1 shadow-xs"
                          >
                            <BookOpen className="w-3 h-3" />
                            <span>Read Week Material</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Connected Study Materials for this week */}
                  {linkedMaterials.length > 0 && (
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] mb-2">
                        Assigned Study Documents ({linkedMaterials.length})
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {linkedMaterials.map((mat) => (
                          <div
                            key={mat.id}
                            onClick={() => onOpenPdf(mat)}
                            className="p-2.5 rounded-lg bg-white hover:bg-slate-50 border border-[#E5E7EB] cursor-pointer flex items-center justify-between transition-colors group"
                          >
                            <div className="min-w-0 pr-2">
                              <span className="font-semibold text-[#111827] group-hover:text-[#1677B8] block truncate">
                                {mat.name}
                              </span>
                              <span className="text-[11px] text-[#6B7280]">
                                {mat.pageRange} • {mat.category}
                              </span>
                            </div>
                            <span className="text-[11px] text-[#1677B8] font-semibold group-hover:translate-x-0.5 transition-transform shrink-0">
                              Open →
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Post-Week 12: Final Revision & Exam Preparation Phase */}
      <div className="p-5 rounded-xl bg-white border border-[#E5E7EB] shadow-2xs space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-lg">
            🎌
          </div>
          <div>
            <h3 className="text-base font-bold text-[#111827]">
              Phase 2: Final Intensive Revision & Full Exam Simulation
            </h3>
            <p className="text-xs text-[#6B7280]">
              Post-Week 12 until 6 December 2026: Intensive past-paper timing drills, listening practice, and mistake notebook elimination.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="p-3 rounded-lg bg-slate-50/60 border border-[#E5E7EB]">
            <div className="font-bold text-[#111827] mb-1">Full Mock Tests</div>
            <p className="text-[#6B7280]">Complete Mock Tests 1, 2, and 3 under strict official exam time limits.</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-50/60 border border-[#E5E7EB]">
            <div className="font-bold text-[#111827] mb-1">Mistake Notebook Scrub</div>
            <p className="text-[#6B7280]">Re-test every previously failed question until error frequency reaches zero.</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-50/60 border border-[#E5E7EB]">
            <div className="font-bold text-[#111827] mb-1">Speed & Particle Check</div>
            <p className="text-[#6B7280]">Speed drills for 48 Grammar Rules and particle confusion (は vs が, に vs で vs へ).</p>
          </div>
        </div>
      </div>
    </div>
  );
};
