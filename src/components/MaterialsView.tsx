import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Search,
  CheckCircle2,
  Circle,
  FileText,
  Filter,
  Plus,
  ExternalLink,
  ChevronRight,
  Layers,
  Sparkles,
  Award,
  Check,
  Clock,
  Flame,
  ArrowRight,
  Bookmark,
  Compass
} from 'lucide-react';
import { AppState, StudyCategory, StudyMaterial } from '../types';

interface MaterialsViewProps {
  state: AppState;
  onOpenPdf: (material: StudyMaterial) => void;
  onUpdateState: (updater: (prev: AppState) => AppState) => void;
}

export const MaterialsView: React.FC<MaterialsViewProps> = ({
  state,
  onOpenPdf,
  onUpdateState
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTier, setSelectedTier] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedWeek, setSelectedWeek] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [lastReadMaterialId, setLastReadMaterialId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const savedId = localStorage.getItem('jlpt_last_read_material_id');
      if (savedId && state.materials.some(m => m.id === savedId)) {
        setLastReadMaterialId(savedId);
      } else {
        // Default to first in-progress or week material
        const activeMat = state.materials.find(m => m.assignedWeek === state.currentWeekNumber) || state.materials[0];
        if (activeMat) setLastReadMaterialId(activeMat.id);
      }
    } catch {
      // ignore
    }
  }, [state.materials, state.currentWeekNumber]);

  const tiers = ['All', 'Core', 'Supplementary', 'Practice', 'Mock'];
  const categories = ['All', 'Grammar', 'Vocabulary', 'Kanji', 'Hiragana', 'Katakana', 'Speaking', 'Mock Test'];
  const statusOptions = ['All', 'In Progress', 'Completed', 'Not Started'];

  const filteredMaterials = state.materials.filter(mat => {
    const matchesSearch =
      mat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mat.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (mat.chapterLesson && mat.chapterLesson.toLowerCase().includes(searchTerm.toLowerCase()));

    const effectiveTier = mat.tier || (mat.category === 'Mock Test' ? 'Mock' : mat.category === 'Grammar' || mat.category === 'Hiragana' || mat.category === 'Kanji' ? 'Core' : 'Supplementary');

    const matchesTier =
      selectedTier === 'All' ||
      mat.tier === selectedTier ||
      (selectedTier === 'Core' && effectiveTier === 'Core') ||
      (selectedTier === 'Revision' && (mat.assignedWeek >= 13 || mat.category === 'Revision'));

    const matchesCategory =
      selectedCategory === 'All' || mat.category === selectedCategory;

    const matchesWeek =
      selectedWeek === 'All' || mat.assignedWeek.toString() === selectedWeek;

    const completedSections = mat.sections ? mat.sections.filter(s => s.completed).length : 0;
    const totalSections = mat.sections ? mat.sections.length : 0;
    const calculatedStatus = totalSections > 0
      ? (completedSections === totalSections ? 'Completed' : completedSections > 0 ? 'In Progress' : 'Not Started')
      : mat.status;

    const matchesStatus =
      selectedStatus === 'All' || calculatedStatus === selectedStatus;

    return matchesSearch && matchesTier && matchesCategory && matchesWeek && matchesStatus;
  });

  const getTierBadge = (tier?: string, cat?: string) => {
    const effectiveTier = tier || (cat === 'Mock Test' ? 'Mock' : cat === 'Grammar' ? 'Core' : 'Supplementary');
    switch (effectiveTier) {
      case 'Core':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Supplementary':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Practice':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Mock':
        return 'bg-red-50 text-[#E53935] border-red-200';
      default:
        return 'bg-slate-100 text-[#4B5563] border-slate-200';
    }
  };

  const getEstimatedMinutes = (mat: StudyMaterial) => {
    if (mat.totalPages) return Math.min(60, Math.max(15, mat.totalPages * 8));
    if (mat.sections && mat.sections.length > 0) return Math.min(60, mat.sections.length * 10);
    return 30;
  };

  const lastReadMaterial = lastReadMaterialId ? state.materials.find(m => m.id === lastReadMaterialId) : null;

  const handleOpenMaterial = (mat: StudyMaterial) => {
    try {
      localStorage.setItem('jlpt_last_read_material_id', mat.id);
      setLastReadMaterialId(mat.id);
    } catch {
      // ignore
    }
    onOpenPdf(mat);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      {/* "Continue where you left off" Quick Banner */}
      {lastReadMaterial && (
        <div className="bg-gradient-to-r from-blue-50/80 via-white to-slate-50 border border-blue-200/80 rounded-2xl p-5 shadow-2xs transition-all hover:border-[#1677B8] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#1677B8] text-white flex items-center justify-center shrink-0 shadow-2xs">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#1677B8]">
                  📖 Continue where you left off
                </span>
                <span className="text-xs text-[#9CA3AF]">•</span>
                <span className="text-xs font-mono text-[#6B7280]">
                  {lastReadMaterial.assignedWeek >= 13 ? 'Revision Phase' : `Week ${lastReadMaterial.assignedWeek}`}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#111827] mt-0.5">
                {lastReadMaterial.name}
              </h3>
              <p className="text-xs text-[#6B7280] line-clamp-1">
                {lastReadMaterial.chapterLesson || lastReadMaterial.title} • {lastReadMaterial.pageRange || 'Section Reference'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleOpenMaterial(lastReadMaterial)}
              className="px-4 py-2.5 rounded-xl bg-[#1677B8] hover:bg-[#136298] text-white text-xs font-bold transition-all shadow-2xs flex items-center gap-2 cursor-pointer group"
            >
              <span>Continue Reading</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      )}

      {/* Main Library Explorer Header */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 sm:p-6 shadow-2xs space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#6B7280] mb-1">
              <BookOpen className="w-3.5 h-3.5 text-[#1677B8]" />
              <span>JLPT N5 Digital Study Library</span>
              <span>•</span>
              <span className="font-mono text-[#1677B8] font-bold">{state.materials.length} Curated Study Materials</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight">
              Study Materials & Digital Textbooks
            </h1>
            <p className="text-xs text-[#6B7280] mt-1">
              Clean digital textbook reading mode, structured grammar explanations, vocabulary cards, and interactive section checklists.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="px-3.5 py-2 rounded-xl bg-slate-50 border border-[#E5E7EB] text-center">
              <span className="text-[10px] uppercase font-bold text-[#6B7280] block">Completed</span>
              <span className="text-sm font-bold font-mono text-emerald-700">
                {state.materials.filter(m => m.status === 'Completed' || (m.sections && m.sections.every(s => s.completed))).length} / {state.materials.length}
              </span>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-slate-50 border border-[#E5E7EB] text-center">
              <span className="text-[10px] uppercase font-bold text-[#6B7280] block">Current Focus</span>
              <span className="text-sm font-bold font-mono text-[#1677B8]">
                Week {state.currentWeekNumber}
              </span>
            </div>
          </div>
        </div>

        {/* Search & Fast Filters */}
        <div className="pt-4 border-t border-[#E5E7EB] space-y-3">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by material title, grammar rule, topic, kanji chapter, or particle..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-[#E5E7EB] text-xs text-[#222222] placeholder-[#9CA3AF] focus:outline-none focus:border-[#1677B8] transition-colors"
              />
            </div>

            {/* Week Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#6B7280] whitespace-nowrap">Week:</span>
              <select
                value={selectedWeek}
                onChange={(e) => setSelectedWeek(e.target.value)}
                className="px-3 py-2.5 rounded-xl bg-white border border-[#E5E7EB] text-xs text-[#222222] focus:outline-none focus:border-[#1677B8] cursor-pointer"
              >
                <option value="All">All Weeks (1–12+)</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map(w => (
                  <option key={w} value={w.toString()}>Week {w}</option>
                ))}
                <option value="13">Week 13 (Revision Phase)</option>
              </select>
            </div>

            {/* Status Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#6B7280] whitespace-nowrap">Status:</span>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2.5 rounded-xl bg-white border border-[#E5E7EB] text-xs text-[#222222] focus:outline-none focus:border-[#1677B8] cursor-pointer"
              >
                {statusOptions.map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Classification Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs text-[#6B7280] whitespace-nowrap mr-1">Classification:</span>
            {tiers.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTier(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedTier === t
                    ? 'bg-[#1677B8] text-white shadow-2xs'
                    : 'bg-slate-100 text-[#4B5563] hover:bg-slate-200 hover:text-[#111827]'
                }`}
              >
                {t === 'All' ? 'All Materials' : `${t} Material`}
              </button>
            ))}
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#1677B8] text-white shadow-2xs font-semibold'
                    : 'bg-white text-[#6B7280] hover:text-[#111827] hover:bg-slate-50 border border-[#E5E7EB]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Materials Cards Library Grid */}
      {filteredMaterials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMaterials.map((mat) => {
            const completedSections = mat.sections ? mat.sections.filter(s => s.completed).length : 0;
            const totalSections = mat.sections ? mat.sections.length : 0;
            const progressPercent = totalSections > 0
              ? Math.round((completedSections / totalSections) * 100)
              : mat.status === 'Completed' ? 100 : mat.status === 'In Progress' ? 40 : 0;
            const isComplete = progressPercent === 100;
            const effectiveTier = mat.tier || (mat.category === 'Mock Test' ? 'Mock' : mat.category === 'Grammar' ? 'Core' : 'Supplementary');
            const estimatedMinutes = getEstimatedMinutes(mat);

            return (
              <div
                key={mat.id}
                onClick={() => handleOpenMaterial(mat)}
                className={`rounded-2xl border p-5 flex flex-col justify-between cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-md group bg-white ${
                  mat.assignedWeek === state.currentWeekNumber
                    ? 'border-[#1677B8] ring-1 ring-[#1677B8]/25 shadow-2xs'
                    : 'border-[#E5E7EB] hover:border-[#1677B8]'
                }`}
              >
                <div className="space-y-3">
                  {/* Card Top Badges */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${getTierBadge(effectiveTier, mat.category)}`}>
                        {effectiveTier}
                      </span>
                      <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-slate-100 text-[#4B5563] border border-[#E5E7EB]">
                        {mat.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-[#1677B8] font-semibold">
                        {mat.assignedWeek >= 13 ? 'Revision Phase' : `Week ${mat.assignedWeek}`}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isComplete
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : progressPercent > 0
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : 'bg-slate-100 text-[#6B7280] border border-slate-200'
                        }`}
                      >
                        {isComplete ? 'Completed' : progressPercent > 0 ? 'In Progress' : 'Not Started'}
                      </span>
                    </div>
                  </div>

                  {/* Titles */}
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-[#111827] group-hover:text-[#1677B8] transition-colors line-clamp-2">
                      {mat.name}
                    </h3>
                    <h4 className="text-xs text-[#6B7280] font-medium line-clamp-1 mt-0.5">
                      {mat.chapterLesson || mat.title}
                    </h4>
                  </div>

                  {/* Summary */}
                  <p className="text-xs text-[#4B5563] line-clamp-2 leading-relaxed">
                    {mat.summary}
                  </p>

                  {/* Progress Bar */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-[11px] text-[#6B7280]">
                      <span className="font-medium">Progress</span>
                      <span className="font-mono font-bold text-[#111827]">{progressPercent}%</span>
                    </div>
                    <div className="w-full bg-[#E5E7EB] h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          isComplete ? 'bg-emerald-600' : 'bg-[#1677B8]'
                        }`}
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Footer Meta & Button */}
                <div className="mt-4 pt-3 border-t border-[#E5E7EB] space-y-2.5 text-xs">
                  <div className="flex items-center justify-between text-[11px] text-[#6B7280]">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#1677B8]" />
                      <span>{estimatedMinutes} min study</span>
                    </div>
                    <span className="font-mono text-[#111827] font-medium">
                      {mat.pageRange || 'Reference notes'}
                    </span>
                  </div>

                  <div className="w-full py-2 px-3 rounded-xl bg-slate-50 group-hover:bg-[#1677B8] group-hover:text-white border border-[#E5E7EB] group-hover:border-[#1677B8] text-[#1677B8] font-bold flex items-center justify-center gap-1.5 transition-all text-xs">
                    <span>{progressPercent > 0 ? 'Continue Reading' : 'Start Reading'}</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center bg-white border border-[#E5E7EB] rounded-2xl space-y-3">
          <BookOpen className="w-8 h-8 text-[#9CA3AF] mx-auto" />
          <h3 className="text-base font-bold text-[#111827]">No study materials found</h3>
          <p className="text-xs text-[#6B7280] max-w-sm mx-auto">
            Try adjusting your search query, week selection, or classification filter to find what you need.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedTier('All');
              setSelectedCategory('All');
              setSelectedWeek('All');
              setSelectedStatus('All');
            }}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#222222] text-xs font-semibold cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

