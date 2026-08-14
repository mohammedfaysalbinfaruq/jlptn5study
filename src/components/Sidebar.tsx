import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  CheckSquare,
  Map,
  BookOpen,
  Languages,
  Layers,
  GraduationCap,
  AlertOctagon,
  RefreshCw,
  Trophy,
  Target,
  Calendar,
  Sparkles,
  Menu,
  X,
  ChevronRight,
  Flame,
  Clock,
  Search
} from 'lucide-react';
import { AppState } from '../types';

interface SidebarProps {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  state: AppState;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  state
}) => {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [mobileSearchQuery, setMobileSearchQuery] = useState('');

  // Close mobile drawer whenever activeTab changes
  const handleSelectTab = (tabId: string) => {
    onSelectTab(tabId);
    setIsMobileDrawerOpen(false);
  };

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileDrawerOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const dueSrsCount = state.srsQueue.filter(
    s => s.nextReviewDate <= state.simulatedCurrentDate
  ).length;

  const unmasteredMistakesCount = state.mistakes.filter(m => !m.mastered).length;

  const todayList = state.checklists[state.simulatedCurrentDate] || [];
  const pendingTasksCount = todayList.filter(t => !t.completed).length;

  const navItems = [
    {
      id: 'dashboard',
      label: 'Command Center',
      labelBangla: 'ড্যাশবোর্ড',
      shortLabel: 'Overview',
      icon: LayoutDashboard
    },
    {
      id: 'today',
      label: "Today's Plan",
      labelBangla: 'আজকের পরিকল্পনা',
      shortLabel: 'Today',
      icon: CheckSquare,
      badge: pendingTasksCount > 0 ? `${pendingTasksCount}` : undefined,
      badgeColor: 'bg-blue-600 text-blue-100'
    },
    {
      id: 'materials',
      label: 'Study Materials & PDFs',
      labelBangla: 'স্টাডি মেটেরিয়ালস',
      shortLabel: 'Materials',
      icon: BookOpen
    },
    {
      id: 'exam',
      label: 'Daily Short Exam',
      labelBangla: 'দৈনিক পরীক্ষা',
      shortLabel: 'Exam',
      icon: GraduationCap,
      badge: '10Q',
      badgeColor: 'bg-purple-600/40 text-purple-200 border border-purple-500/40'
    },
    {
      id: 'roadmap',
      label: '12-Week Roadmap',
      labelBangla: '১২ সপ্তাহের রোডম্যাপ',
      shortLabel: 'Roadmap',
      icon: Map,
      badge: `W${state.currentWeekNumber}`,
      badgeColor: 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/30'
    },
    {
      id: 'kanji',
      label: 'Kanji Deep Dive',
      labelBangla: 'কাঞ্জি ও মূল উপাদান',
      shortLabel: 'Kanji',
      icon: Languages
    },
    {
      id: 'vocab',
      label: 'Vocab Flashcards (SRS)',
      labelBangla: 'শব্দকোষ ফ্ল্যাশকার্ড',
      shortLabel: 'Vocab',
      icon: Layers
    },
    {
      id: 'mistakes',
      label: 'Mistake Notebook',
      labelBangla: 'ভুলের খাতা (Mistakes)',
      shortLabel: 'Mistakes',
      icon: AlertOctagon,
      badge: unmasteredMistakesCount > 0 ? `${unmasteredMistakesCount}` : undefined,
      badgeColor: 'bg-rose-600 text-rose-100'
    },
    {
      id: 'revision',
      label: 'Spaced Revision',
      labelBangla: 'রিভিশন ইঞ্জিন (SRS)',
      shortLabel: 'SRS Review',
      icon: RefreshCw,
      badge: dueSrsCount > 0 ? `${dueSrsCount} due` : undefined,
      badgeColor: 'bg-amber-600 text-amber-100'
    },
    {
      id: 'mocks',
      label: 'Mock Test Simulator',
      labelBangla: 'মক টেস্ট ট্র্যাকার',
      shortLabel: 'Mocks',
      icon: Trophy
    },
    {
      id: 'readiness',
      label: 'N5 Readiness Analytics',
      labelBangla: 'প্রস্তুতি বিশ্লেষণ',
      shortLabel: 'Readiness',
      icon: Target
    },
    {
      id: 'goals',
      label: 'Goals & Milestones',
      labelBangla: 'লক্ষ্য ও সাবগোল',
      shortLabel: 'Goals',
      icon: Sparkles
    },
    {
      id: 'calendar',
      label: 'Study Calendar',
      labelBangla: 'ক্যালেন্ডার ও সময়রেখা',
      shortLabel: 'Calendar',
      icon: Calendar
    }
  ];

  // Mobile Bottom Bar Primary Tabs (Today & Materials are always guaranteed and reachable)
  const mobilePrimaryTabs = [
    {
      id: 'today',
      label: 'Today',
      labelBangla: 'আজকের লক্ষ্য',
      icon: CheckSquare,
      badge: pendingTasksCount > 0 ? `${pendingTasksCount}` : undefined,
      badgeColor: 'bg-blue-500 text-white'
    },
    {
      id: 'materials',
      label: 'Materials',
      labelBangla: 'পিডিএফ',
      icon: BookOpen
    },
    {
      id: 'dashboard',
      label: 'Overview',
      labelBangla: 'হোম',
      icon: LayoutDashboard
    },
    {
      id: 'exam',
      label: 'Exam',
      labelBangla: 'পরীক্ষা',
      icon: GraduationCap,
      badge: '10Q',
      badgeColor: 'bg-purple-500 text-white'
    }
  ];

  const isCurrentTabInPrimary = mobilePrimaryTabs.some(t => t.id === activeTab);
  const currentActiveItem = navItems.find(i => i.id === activeTab);

  const filteredNavItems = navItems.filter(item =>
    item.label.toLowerCase().includes(mobileSearchQuery.toLowerCase()) ||
    item.labelBangla.toLowerCase().includes(mobileSearchQuery.toLowerCase())
  );

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. DESKTOP SIDEBAR (Visible on lg: screens and up, hidden on mobile)      */}
      {/* ========================================================================= */}
      <aside className="hidden lg:flex w-64 bg-white border-r border-[#E5E7EB] p-3 flex-col justify-between shrink-0 overflow-y-auto max-h-[calc(100vh-62px)]">
        <div className="space-y-1">
          <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-[#9CA3AF] flex items-center justify-between">
            <span>Navigation Hub</span>
            <span className="text-[10px] text-[#1677B8] font-mono font-semibold">13 Modules</span>
          </div>

          <nav className="space-y-0.5" aria-label="Main Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  id={`desktop-nav-${item.id}`}
                  onClick={() => handleSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all group cursor-pointer ${
                    isActive
                      ? 'bg-[#F0F7FF] text-[#1677B8] font-semibold border border-[#BAE6FD]/60'
                      : 'text-[#4B5563] hover:bg-slate-50 hover:text-[#111827]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${
                      isActive ? 'text-[#1677B8]' : 'text-[#9CA3AF] group-hover:text-[#4B5563]'
                    }`} />
                    <div className="text-left truncate">
                      <span className="block truncate">{item.label}</span>
                      <span className={`block text-[10px] font-normal truncate ${
                        isActive ? 'text-[#1677B8]/80' : 'text-[#9CA3AF]'
                      }`}>
                        {item.labelBangla}
                      </span>
                    </div>
                  </div>

                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold shrink-0 ml-1.5 ${
                      isActive
                        ? 'bg-[#1677B8] text-white'
                        : 'bg-slate-100 text-[#6B7280] border border-[#E5E7EB]'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Week Focus Quick Summary Box */}
        <div className="mt-4 p-3 rounded-lg bg-white border border-[#E5E7EB] text-[#222222] text-xs shrink-0 shadow-2xs">
          <div className="flex items-center justify-between text-[11px] text-[#6B7280] font-semibold mb-1">
            <span>Current Week</span>
            <span className="text-[#1677B8] font-mono font-bold">Week {state.currentWeekNumber} / 12</span>
          </div>
          <p className="text-[11px] text-[#6B7280] line-clamp-2 leading-relaxed">
            {state.currentWeekNumber <= 12
              ? `Minna no Nihongo Lesson ${state.currentWeekNumber * 2 - 1} & ${state.currentWeekNumber * 2}`
              : 'Final Revision Phase (Past Papers & Mock Tests)'}
          </p>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 2. MOBILE FIXED BOTTOM NAVIGATION BAR (Visible < lg, hidden on desktop)   */}
      {/* ========================================================================= */}
      <nav
        id="mobile-bottom-nav"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E5E7EB] shadow-xs px-1 py-1 pb-[max(0.35rem,env(safe-area-inset-bottom))]"
        aria-label="Mobile Bottom Navigation"
      >
        <div className="grid grid-cols-5 items-center max-w-lg mx-auto">
          {/* 1. Today's Plan (Guaranteed quick access) */}
          <button
            id="mobile-tab-today"
            onClick={() => handleSelectTab('today')}
            className={`flex flex-col items-center justify-center py-1 px-1 rounded-lg transition-all relative min-h-[48px] cursor-pointer ${
              activeTab === 'today'
                ? 'text-[#1677B8]'
                : 'text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            <div className="relative">
              <CheckSquare className={`w-5 h-5 ${activeTab === 'today' ? 'text-[#1677B8]' : 'text-[#9CA3AF]'}`} />
              {pendingTasksCount > 0 && (
                <span className="absolute -top-1.5 -right-2 px-1 py-0.2 bg-[#E53935] text-white font-bold text-[9px] rounded-full min-w-[15px] h-[15px] flex items-center justify-center shadow-xs">
                  {pendingTasksCount}
                </span>
              )}
            </div>
            <span className={`text-[10px] mt-0.5 tracking-tight ${activeTab === 'today' ? 'font-bold text-[#1677B8]' : 'text-[#6B7280]'}`}>
              Today
            </span>
          </button>

          {/* 2. Materials & PDFs (Guaranteed quick access) */}
          <button
            id="mobile-tab-materials"
            onClick={() => handleSelectTab('materials')}
            className={`flex flex-col items-center justify-center py-1 px-1 rounded-lg transition-all min-h-[48px] cursor-pointer ${
              activeTab === 'materials'
                ? 'text-[#1677B8]'
                : 'text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            <BookOpen className={`w-5 h-5 ${activeTab === 'materials' ? 'text-[#1677B8]' : 'text-[#9CA3AF]'}`} />
            <span className={`text-[10px] mt-0.5 tracking-tight ${activeTab === 'materials' ? 'font-bold text-[#1677B8]' : 'text-[#6B7280]'}`}>
              Materials
            </span>
          </button>

          {/* 3. Dashboard / Overview */}
          <button
            id="mobile-tab-dashboard"
            onClick={() => handleSelectTab('dashboard')}
            className={`flex flex-col items-center justify-center py-1 px-1 rounded-lg transition-all min-h-[48px] cursor-pointer ${
              activeTab === 'dashboard'
                ? 'text-[#1677B8]'
                : 'text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            <LayoutDashboard className={`w-5 h-5 ${activeTab === 'dashboard' ? 'text-[#1677B8]' : 'text-[#9CA3AF]'}`} />
            <span className={`text-[10px] mt-0.5 tracking-tight ${activeTab === 'dashboard' ? 'font-bold text-[#1677B8]' : 'text-[#6B7280]'}`}>
              Overview
            </span>
          </button>

          {/* 4. Daily Short Exam */}
          <button
            id="mobile-tab-exam"
            onClick={() => handleSelectTab('exam')}
            className={`flex flex-col items-center justify-center py-1 px-1 rounded-lg transition-all min-h-[48px] cursor-pointer ${
              activeTab === 'exam'
                ? 'text-[#1677B8]'
                : 'text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            <div className="relative">
              <GraduationCap className={`w-5 h-5 ${activeTab === 'exam' ? 'text-[#1677B8]' : 'text-[#9CA3AF]'}`} />
            </div>
            <span className={`text-[10px] mt-0.5 tracking-tight ${activeTab === 'exam' ? 'font-bold text-[#1677B8]' : 'text-[#6B7280]'}`}>
              Exam
            </span>
          </button>

          {/* 5. More Tabs Menu Drawer Trigger */}
          <button
            id="mobile-tab-more"
            onClick={() => setIsMobileDrawerOpen(true)}
            className={`flex flex-col items-center justify-center py-1 px-1 rounded-lg transition-all min-h-[48px] cursor-pointer relative ${
              !isCurrentTabInPrimary
                ? 'text-[#1677B8]'
                : 'text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            <div className="relative">
              <Menu className={`w-5 h-5 ${!isCurrentTabInPrimary ? 'text-[#1677B8]' : 'text-[#9CA3AF]'}`} />
              {(dueSrsCount > 0 || unmasteredMistakesCount > 0) && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#E53935] rounded-full" />
              )}
            </div>
            <span className={`text-[10px] mt-0.5 tracking-tight font-medium truncate max-w-[55px] ${!isCurrentTabInPrimary ? 'font-bold text-[#1677B8]' : 'text-[#6B7280]'}`}>
              {!isCurrentTabInPrimary && currentActiveItem ? currentActiveItem.shortLabel : 'More'}
            </span>
          </button>
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* 3. MOBILE FULL NAVIGATION SLIDE-UP DRAWER                                 */}
      {/* ========================================================================= */}
      {isMobileDrawerOpen && (
        <div
          id="mobile-navigation-modal"
          className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end bg-black/40 backdrop-blur-xs animate-fadeIn"
          onClick={() => setIsMobileDrawerOpen(false)}
        >
          <div
            className="bg-white border-t border-[#E5E7EB] rounded-t-2xl max-h-[85vh] flex flex-col shadow-xl overflow-hidden animate-slideUp text-[#222222]"
            onClick={e => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="px-5 py-4 bg-white border-b border-[#E5E7EB] flex items-center justify-between">
              <div>
                <div className="text-[11px] text-[#1677B8] font-bold uppercase tracking-wider">
                  Full Study Hub
                </div>
                <h3 className="text-base font-bold text-[#111827]">
                  All 13 Learning Modules
                </h3>
              </div>
              <button
                onClick={() => setIsMobileDrawerOpen(false)}
                className="p-2 rounded-lg bg-white hover:bg-slate-100 text-[#6B7280] hover:text-[#111827] border border-[#E5E7EB] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search filter in drawer */}
            <div className="p-3.5 border-b border-[#E5E7EB] bg-white">
              <div className="relative">
                <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter tabs (e.g. Kanji, Flashcards, Mistakes)..."
                  value={mobileSearchQuery}
                  onChange={e => setMobileSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-lg bg-white border border-[#E5E7EB] text-xs text-[#222222] placeholder-[#9CA3AF] focus:outline-none focus:border-[#1677B8]"
                />
              </div>
            </div>

            {/* Quick Metrics Bar in Mobile Menu */}
            <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 border-b border-[#E5E7EB] text-center text-xs">
              <div className="p-2 rounded-lg bg-white border border-[#E5E7EB]">
                <div className="text-[10px] text-[#6B7280] uppercase font-bold">Week</div>
                <div className="text-sm font-bold text-[#111827] font-mono">W{state.currentWeekNumber}</div>
              </div>
              <div className="p-2 rounded-lg bg-white border border-[#E5E7EB]">
                <div className="text-[10px] text-[#6B7280] uppercase font-bold">SRS Due</div>
                <div className="text-sm font-bold text-amber-700 font-mono">{dueSrsCount} Cards</div>
              </div>
              <div className="p-2 rounded-lg bg-white border border-[#E5E7EB]">
                <div className="text-[10px] text-[#6B7280] uppercase font-bold">Mistakes</div>
                <div className="text-sm font-bold text-[#E53935] font-mono">{unmasteredMistakesCount} Items</div>
              </div>
            </div>

            {/* Module Items List */}
            <div className="p-3 overflow-y-auto max-h-[50vh] space-y-1">
              {filteredNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectTab(item.id)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-lg text-xs transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#F0F7FF] text-[#1677B8] font-bold border border-[#BAE6FD]'
                        : 'bg-white text-[#222222] hover:bg-slate-50 border border-[#E5E7EB]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`p-1.5 rounded-lg ${isActive ? 'bg-[#1677B8] text-white' : 'bg-slate-100 text-[#1677B8]'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="text-left truncate">
                        <div className="font-semibold text-xs truncate text-[#111827]">{item.label}</div>
                        <div className={`text-[10px] font-normal truncate ${isActive ? 'text-[#1677B8]' : 'text-[#6B7280]'}`}>
                          {item.labelBangla}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {item.badge && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                          isActive
                            ? 'bg-[#1677B8] text-white'
                            : 'bg-slate-100 text-[#6B7280] border border-[#E5E7EB]'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                      <ChevronRight className={`w-4 h-4 ${isActive ? 'text-[#1677B8]' : 'text-[#9CA3AF]'}`} />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Close Action */}
            <div className="p-3 bg-white border-t border-[#E5E7EB] flex items-center justify-between">
              <span className="text-[11px] text-[#6B7280]">
                Exam: 6 Dec 2026 (Target 140+)
              </span>
              <button
                onClick={() => setIsMobileDrawerOpen(false)}
                className="px-4 py-2 rounded-lg bg-white hover:bg-slate-100 text-[#111827] border border-[#E5E7EB] text-xs font-semibold cursor-pointer"
              >
                Close Menu
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
