import React, { useState } from 'react';
import {
  Languages,
  Search,
  Maximize2,
  Minimize2,
  Atom,
  Sparkles,
  Layers,
  BookOpen,
  LayoutGrid,
  Columns,
  Eye,
  SlidersHorizontal
} from 'lucide-react';
import { AppState } from '../types';
import { KANJI_DATABASE, KanjiDetail } from '../data/kanjiDatabase';
import { KanjiVisualizer } from './KanjiVisualizer';

interface KanjiStudyViewProps {
  state: AppState;
  onUpdateState: (updater: (prev: AppState) => AppState) => void;
  onNavigateToTab: (tabId: string) => void;
}

export const KanjiStudyView: React.FC<KanjiStudyViewProps> = ({
  state,
  onUpdateState,
  onNavigateToTab
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLesson, setSelectedLesson] = useState<number | 'All'>('All');
  const [selectedKanji, setSelectedKanji] = useState<KanjiDetail>(KANJI_DATABASE[0]);
  const [isVisualizerModalOpen, setIsVisualizerModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'split' | 'grid'>('split');

  const lessons = ['All', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const filteredKanji = KANJI_DATABASE.filter(k => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      k.kanji.includes(term) ||
      k.meaningEnglish.toLowerCase().includes(term) ||
      (k.meaningBangla && k.meaningBangla.includes(term)) ||
      k.onyomi.some(o => o.toLowerCase().includes(term)) ||
      k.kunyomi.some(ku => ku.toLowerCase().includes(term)) ||
      (k.radical && (k.radical.name.toLowerCase().includes(term) || k.radical.meaning.toLowerCase().includes(term) || k.radical.character.includes(term)));

    const matchesLesson = selectedLesson === 'All' || k.lesson === selectedLesson || k.week === selectedLesson;
    return matchesSearch && matchesLesson;
  });

  const handleKanjiSelect = (item: KanjiDetail, openModalDirectly = false) => {
    setSelectedKanji(item);
    if (openModalDirectly || viewMode === 'grid') {
      setIsVisualizerModalOpen(true);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header Card with Expanded View Controls */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#6B7280] mb-1">
              <Languages className="w-3.5 h-3.5 text-[#1677B8]" />
              <span>JLPT N5 Kanji Master Database ({KANJI_DATABASE.length} Kanji)</span>
              <span>•</span>
              <span className="text-[#1677B8] font-mono font-semibold">Radicals, Phonetics & Etymologies</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight">
              Kanji Deep Dive & Constituent Radical Analysis
            </h1>
            <p className="text-xs text-[#6B7280] mt-1">
              Deconstruct every JLPT N5 Kanji into its constituent radicals (部首), sound-bearing phonetic elements, historical etymology, and authentic compound words.
            </p>
          </div>

          {/* Action Bar: View Mode Toggle & Expanded View Modal Button */}
          <div className="flex items-center gap-2.5 self-start md:self-auto flex-wrap">
            {/* Split vs Grid Layout Toggle */}
            <div className="flex items-center bg-white rounded-lg border border-[#E5E7EB] p-0.5">
              <button
                onClick={() => setViewMode('split')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  viewMode === 'split'
                    ? 'bg-[#1677B8] text-white shadow-2xs'
                    : 'text-[#6B7280] hover:text-[#111827]'
                }`}
                title="Split layout with side visualizer"
              >
                <Columns className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Split View</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-[#1677B8] text-white shadow-2xs'
                    : 'text-[#6B7280] hover:text-[#111827]'
                }`}
                title="Full grid layout with modal breakdown"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Full Grid</span>
              </button>
            </div>

            {/* Explicit Expanded View Modal Trigger */}
            <button
              onClick={() => setIsVisualizerModalOpen(true)}
              className="px-4 py-2 rounded-lg bg-[#1677B8] hover:bg-[#125F94] text-white text-xs font-bold flex items-center gap-2 shadow-2xs transition-all cursor-pointer"
            >
              <Maximize2 className="w-4 h-4" />
              <span>Expanded View for "{selectedKanji.kanji}"</span>
            </button>
          </div>
        </div>

        {/* Search & Lesson Filter */}
        <div className="mt-4 pt-4 border-t border-[#E5E7EB] flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Kanji (日, 木, 休), English meaning, On/Kun reading, or radical..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-white border border-[#E5E7EB] text-xs text-[#222222] placeholder-[#9CA3AF] focus:outline-none focus:border-[#1677B8]"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            <span className="text-[11px] text-[#6B7280] font-semibold mr-1">Lesson:</span>
            {lessons.map((les) => (
              <button
                key={les.toString()}
                onClick={() => setSelectedLesson(les)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedLesson === les
                    ? 'bg-[#1677B8] text-white font-semibold shadow-2xs'
                    : 'bg-slate-100 text-[#4B5563] hover:bg-slate-200 hover:text-[#111827]'
                }`}
              >
                {les === 'All' ? 'All Lessons' : `L${les}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      {viewMode === 'split' ? (
        /* Split Layout: 5 Cols Grid + 7 Cols Live Visualizer */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Kanji Cards List */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#6B7280] flex items-center justify-between px-1">
              <span>Select Kanji ({filteredKanji.length})</span>
              <span className="text-[10px] text-[#9CA3AF]">Click to select • Double-click to expand</span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 max-h-[640px] overflow-y-auto pr-1">
              {filteredKanji.map((item) => {
                const isSelected = selectedKanji.id === item.id;

                return (
                  <div
                    key={item.id}
                    onClick={() => handleKanjiSelect(item, false)}
                    onDoubleClick={() => handleKanjiSelect(item, true)}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center cursor-pointer transition-all relative group bg-white ${
                      isSelected
                        ? 'border-[#1677B8] bg-blue-50/50 shadow-xs ring-1 ring-[#1677B8]/30'
                        : 'border-[#E5E7EB] text-[#222222] hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {/* Quick Expand Icon Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleKanjiSelect(item, true);
                      }}
                      className="absolute top-1.5 right-1.5 p-1 rounded-md bg-white border border-[#E5E7EB] text-[#6B7280] hover:text-[#111827] opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Open in Expanded View Modal"
                    >
                      <Maximize2 className="w-3 h-3" />
                    </button>

                    <div className={`text-2xl font-black font-japanese mb-1 ${isSelected ? 'text-[#1677B8]' : 'text-[#111827]'}`}>
                      {item.kanji}
                    </div>
                    <div className={`text-[11px] font-semibold truncate max-w-full ${isSelected ? 'text-[#1677B8]' : 'text-[#222222]'}`}>
                      {item.meaningEnglish}
                    </div>
                    <div className={`text-[10px] truncate max-w-full font-japanese ${isSelected ? 'text-[#1677B8]/80' : 'text-[#6B7280]'}`}>
                      {item.onyomi[0] || item.kunyomi[0]}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Kanji Visualizer Component */}
          <div className="lg:col-span-7">
            <KanjiVisualizer
              kanji={selectedKanji}
              allKanjiList={KANJI_DATABASE}
              state={state}
              onSelectKanji={setSelectedKanji}
              onUpdateState={onUpdateState}
              onOpenExpandedModal={() => setIsVisualizerModalOpen(true)}
            />
          </div>
        </div>
      ) : (
        /* Full Grid Layout: Direct Card-to-Expanded-Modal Interaction */
        <div className="space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-[#6B7280] flex items-center justify-between px-1">
            <span>Kanji Directory ({filteredKanji.length})</span>
            <span className="text-[11px] text-[#1677B8] font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Click any Kanji for Expanded Breakdown & Radical Anatomy</span>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {filteredKanji.map((item) => {
              const isSelected = selectedKanji.id === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => handleKanjiSelect(item, true)}
                  className={`p-4 rounded-xl border flex flex-col items-center justify-center cursor-pointer transition-all relative group bg-white ${
                    isSelected
                      ? 'border-[#1677B8] bg-blue-50/50 shadow-xs ring-1 ring-[#1677B8]/30'
                      : 'border-[#E5E7EB] text-[#222222] hover:border-[#1677B8] hover:bg-slate-50'
                  }`}
                >
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5 text-[#1677B8]" />
                  </div>

                  <div className="text-3xl font-black font-japanese text-[#111827] mb-1.5 group-hover:scale-105 transition-transform">
                    {item.kanji}
                  </div>
                  <div className="text-xs font-bold text-[#111827] text-center truncate max-w-full">
                    {item.meaningEnglish}
                  </div>
                  <div className="text-[10px] text-[#1677B8] font-japanese truncate max-w-full">
                    {item.meaningBangla}
                  </div>
                  <div className="text-[10px] text-[#6B7280] font-japanese mt-1 truncate max-w-full">
                    {item.onyomi[0] || item.kunyomi[0]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Modal Visualizer Mode (Expanded Detailed Breakdown View) */}
      {isVisualizerModalOpen && (
        <KanjiVisualizer
          kanji={selectedKanji}
          allKanjiList={KANJI_DATABASE}
          state={state}
          onClose={() => setIsVisualizerModalOpen(false)}
          onSelectKanji={setSelectedKanji}
          onUpdateState={onUpdateState}
          isModal={true}
        />
      )}
    </div>
  );
};
