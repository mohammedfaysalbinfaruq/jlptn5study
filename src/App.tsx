import React, { useState, useEffect } from 'react';
import { AppState, DailyExamResult, MistakeItem, StudyMaterial } from './types';
import { loadAppState, saveAppState, calculateCurrentWeek, STUDY_START_DATE } from './utils/storage';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { TodayView } from './components/TodayView';
import { RoadmapView } from './components/RoadmapView';
import { MaterialsView } from './components/MaterialsView';
import { KanjiStudyView } from './components/KanjiStudyView';
import { VocabSrsView } from './components/VocabSrsView';
import { MistakeNotebookView } from './components/MistakeNotebookView';
import { RevisionView } from './components/RevisionView';
import { MockTestsView } from './components/MockTestsView';
import { ReadinessView } from './components/ReadinessView';
import { GoalsView } from './components/GoalsView';
import { CalendarView } from './components/CalendarView';
import { DailyExamModal } from './components/DailyExamModal';
import { PdfReaderModal } from './components/PdfReaderModal';
import { StudyTimerModal } from './components/StudyTimerModal';
import { RemindersModal } from './components/RemindersModal';
import { WeeklyReviewModal } from './components/WeeklyReviewModal';

export default function App() {
  const [state, setState] = useState<AppState>(loadAppState);
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Modal states
  const [isExamModalOpen, setIsExamModalOpen] = useState(false);
  const [isTimerModalOpen, setIsTimerModalOpen] = useState(false);
  const [isRemindersModalOpen, setIsRemindersModalOpen] = useState(false);
  const [isWeeklyReviewModalOpen, setIsWeeklyReviewModalOpen] = useState(false);
  const [activePdfMaterial, setActivePdfMaterial] = useState<StudyMaterial | null>(null);

  // Sync state to local storage whenever state changes
  useEffect(() => {
    saveAppState(state);
  }, [state]);

  // Ensure currentWeekNumber stays synced when simulated date changes
  useEffect(() => {
    const computedWeek = calculateCurrentWeek(STUDY_START_DATE, state.simulatedCurrentDate);
    if (computedWeek !== state.currentWeekNumber) {
      setState(prev => ({
        ...prev,
        currentWeekNumber: computedWeek
      }));
    }
  }, [state.simulatedCurrentDate, state.currentWeekNumber]);

  // Exam result handler
  const handleSaveExamResult = (result: DailyExamResult, newMistakes: MistakeItem[]) => {
    setState(prev => {
      // Remove any previous exam record for the same date if retaken
      const filteredResults = prev.examResults.filter(e => e.date !== result.date);

      // Merge new mistakes into existing mistakes
      const updatedMistakes = [...prev.mistakes];
      newMistakes.forEach(nm => {
        const existingIdx = updatedMistakes.findIndex(m => m.questionId === nm.questionId);
        if (existingIdx >= 0) {
          updatedMistakes[existingIdx] = nm;
        } else {
          updatedMistakes.push(nm);
        }
      });

      return {
        ...prev,
        examResults: [...filteredResults, result],
        mistakes: updatedMistakes,
        streaks: {
          ...prev.streaks,
          lastActiveDate: prev.simulatedCurrentDate,
          totalStudyDays: prev.streaks.lastActiveDate !== prev.simulatedCurrentDate
            ? prev.streaks.totalStudyDays + 1
            : prev.streaks.totalStudyDays
        }
      };
    });
  };

  // Material update handler (notes, completed sections)
  const handleUpdateMaterial = (updated: StudyMaterial) => {
    setState(prev => ({
      ...prev,
      materials: prev.materials.map(m => m.id === updated.id ? updated : m)
    }));
    setActivePdfMaterial(updated);
  };

  return (
    <div className="min-h-screen bg-white text-[#222222] flex flex-col font-sans selection:bg-[#1677B8] selection:text-white">
      {/* Top Universal Command Header */}
      <Header
        state={state}
        onUpdateState={setState}
        onOpenTimer={() => setIsTimerModalOpen(true)}
        onOpenReminders={() => setIsRemindersModalOpen(true)}
        onOpenWeeklyReview={() => setIsWeeklyReviewModalOpen(true)}
        onNavigateToTab={setActiveTab}
      />

      {/* Main Layout Area: Sidebar + Scrollable View */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden w-full max-w-full">
        {/* Navigation Sidebar (Desktop Sidebar + Mobile Fixed Bottom Bar) */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          state={state}
        />

        {/* Content Canvas */}
        <main className="flex-1 p-3 sm:p-6 lg:p-8 pb-24 lg:pb-8 overflow-y-auto overflow-x-hidden min-w-0 w-full max-h-[calc(100vh-62px)]">
          {activeTab === 'dashboard' && (
            <DashboardView
              state={state}
              onUpdateState={setState}
              onNavigateToTab={setActiveTab}
              onOpenExam={() => setIsExamModalOpen(true)}
              onOpenPdf={(mat) => setActivePdfMaterial(mat)}
              onOpenTimer={() => setIsTimerModalOpen(true)}
            />
          )}

          {activeTab === 'today' && (
            <TodayView
              state={state}
              onUpdateState={setState}
              onOpenExam={() => setIsExamModalOpen(true)}
              onOpenPdf={(mat) => setActivePdfMaterial(mat)}
              onOpenTimer={() => setIsTimerModalOpen(true)}
              onNavigateToTab={setActiveTab}
            />
          )}

          {activeTab === 'roadmap' && (
            <RoadmapView
              state={state}
              onUpdateState={setState}
              onOpenPdf={(mat) => setActivePdfMaterial(mat)}
              onOpenExam={() => setIsExamModalOpen(true)}
            />
          )}

          {activeTab === 'materials' && (
            <MaterialsView
              state={state}
              onOpenPdf={(mat) => setActivePdfMaterial(mat)}
              onUpdateState={setState}
            />
          )}

          {activeTab === 'kanji' && (
            <KanjiStudyView
              state={state}
              onUpdateState={setState}
              onNavigateToTab={setActiveTab}
            />
          )}

          {activeTab === 'vocab' && (
            <VocabSrsView
              state={state}
              onUpdateState={setState}
            />
          )}

          {activeTab === 'exam' && (
            <div className="space-y-6 max-w-7xl mx-auto pb-10">
              <TodayView
                state={state}
                onUpdateState={setState}
                onOpenExam={() => setIsExamModalOpen(true)}
                onOpenPdf={(mat) => setActivePdfMaterial(mat)}
                onOpenTimer={() => setIsTimerModalOpen(true)}
                onNavigateToTab={setActiveTab}
              />
            </div>
          )}

          {activeTab === 'mistakes' && (
            <MistakeNotebookView
              state={state}
              onUpdateState={setState}
              onOpenExam={() => setIsExamModalOpen(true)}
            />
          )}

          {activeTab === 'revision' && (
            <RevisionView
              state={state}
              onUpdateState={setState}
            />
          )}

          {activeTab === 'mocks' && (
            <MockTestsView
              state={state}
              onUpdateState={setState}
              onOpenPdf={(mat) => setActivePdfMaterial(mat)}
            />
          )}

          {activeTab === 'readiness' && (
            <ReadinessView
              state={state}
              onNavigateToTab={setActiveTab}
            />
          )}

          {activeTab === 'goals' && (
            <GoalsView
              state={state}
              onUpdateState={setState}
            />
          )}

          {activeTab === 'calendar' && (
            <CalendarView
              state={state}
              onUpdateState={setState}
            />
          )}
        </main>
      </div>

      {/* Global Modals */}
      {isExamModalOpen && (
        <DailyExamModal
          state={state}
          onClose={() => setIsExamModalOpen(false)}
          onSaveResult={handleSaveExamResult}
        />
      )}

      {activePdfMaterial && (
        <PdfReaderModal
          material={activePdfMaterial}
          onClose={() => setActivePdfMaterial(null)}
          onUpdateMaterial={handleUpdateMaterial}
        />
      )}

      {isTimerModalOpen && (
        <StudyTimerModal
          state={state}
          onClose={() => setIsTimerModalOpen(false)}
          onUpdateState={setState}
        />
      )}

      {isRemindersModalOpen && (
        <RemindersModal
          state={state}
          onClose={() => setIsRemindersModalOpen(false)}
          onUpdateState={setState}
        />
      )}

      {isWeeklyReviewModalOpen && (
        <WeeklyReviewModal
          state={state}
          onClose={() => setIsWeeklyReviewModalOpen(false)}
          onUpdateState={setState}
        />
      )}
    </div>
  );
}
