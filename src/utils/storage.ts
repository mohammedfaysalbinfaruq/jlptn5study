import {
  AppState,
  DailyChecklistItem,
  DailyExamResult,
  MistakeItem,
  MockTestRecord,
  SrsReviewItem,
  StudyLogItem,
  UserGoal,
  StudyMaterial,
  WeeklyReviewNote
} from '../types';
import { ROADMAP_WEEKS } from '../data/roadmapData';
import { KANJI_DATABASE } from '../data/kanjiDatabase';
import { VOCABULARY_DATABASE } from '../data/vocabularyDatabase';
import { STUDY_MATERIALS } from '../data/materialsDatabase';

const STORAGE_KEY = 'jlpt_n5_command_center_state_v1';

export const EXAM_DATE = '2026-12-06';
export const STUDY_START_DATE = '2026-08-16';

export function getDaysRemaining(targetDateStr: string = EXAM_DATE, currentDateStr?: string): number {
  const target = new Date(targetDateStr);
  const current = currentDateStr ? new Date(currentDateStr) : new Date();
  
  // Set both to midnight UTC for precise calendar day difference
  const targetUtc = Date.UTC(target.getFullYear(), target.getMonth(), target.getDate());
  const currentUtc = Date.UTC(current.getFullYear(), current.getMonth(), current.getDate());
  
  const diffMs = targetUtc - currentUtc;
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
}

export function calculateCurrentWeek(studyStartDateStr: string = STUDY_START_DATE, currentDateStr?: string): number {
  const start = new Date(studyStartDateStr);
  const current = currentDateStr ? new Date(currentDateStr) : new Date();
  
  const startUtc = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
  const currentUtc = Date.UTC(current.getFullYear(), current.getMonth(), current.getDate());
  
  if (currentUtc < startUtc) {
    return 1; // Before start date, default to Week 1
  }
  
  const diffDays = Math.floor((currentUtc - startUtc) / (1000 * 60 * 60 * 24));
  const weekNum = Math.floor(diffDays / 7) + 1;
  return Math.min(13, Math.max(1, weekNum)); // 1 to 12 are syllabus weeks, 13 is Final Revision
}

export function generateDefaultChecklist(weekNumber: number, dateStr: string): DailyChecklistItem[] {
  const weekData = ROADMAP_WEEKS.find(w => w.weekNumber === Math.min(12, weekNumber)) || ROADMAP_WEEKS[0];
  
  return [
    {
      id: `chk-${dateStr}-1`,
      date: dateStr,
      subject: 'Hiragana/Katakana / Review',
      taskDescription: `Master ${weekData.focusTopic.split(';')[0]} with audio pronunciation & writing sheet`,
      durationMinutes: 25,
      priority: 'High',
      completed: false,
      materialId: weekNumber <= 2 ? 'mat-hiragana-sheet' : 'mat-greetings-expressions'
    },
    {
      id: `chk-${dateStr}-2`,
      date: dateStr,
      subject: 'Grammar & Sentence Patterns',
      taskDescription: `Study ${weekData.minnaLessons}: ${weekData.grammarPoints.slice(0, 2).join(', ')}`,
      durationMinutes: 35,
      priority: 'High',
      completed: false,
      materialId: weekNumber === 1 ? 'mat-lesson1-vocab-grammar' : 'mat-lesson2-grammar'
    },
    {
      id: `chk-${dateStr}-3`,
      date: dateStr,
      subject: 'Vocabulary & Flashcards',
      taskDescription: `Learn 15 new N5 words + review SRS flashcards with Bangla/English meanings`,
      durationMinutes: 20,
      priority: 'Medium',
      completed: false
    },
    {
      id: `chk-${dateStr}-4`,
      date: dateStr,
      subject: 'Kanji Deep Dive',
      taskDescription: `Memorize 5 Kanji radicals, Kunyomi/Onyomi readings & compound words`,
      durationMinutes: 20,
      priority: 'Medium',
      completed: false,
      materialId: 'mat-kanji-part1'
    },
    {
      id: `chk-${dateStr}-5`,
      date: dateStr,
      subject: 'Daily Short Exam & Mistake Log',
      taskDescription: `Complete today's 10-question adaptive exam & review explanations`,
      durationMinutes: 15,
      priority: 'High',
      completed: false
    }
  ];
}

export function getDefaultInitialState(): AppState {
  const todayStr = '2026-08-16'; // Aligned with Study Start Date
  const currentWeek = calculateCurrentWeek(STUDY_START_DATE, todayStr);

  const initialGoals: UserGoal[] = [
    {
      id: 'g-main',
      title: 'Pass JLPT N5 with 140+ / 180 score',
      category: 'Overall',
      currentProgress: 15,
      targetProgress: 100,
      unit: '% Readiness',
      completed: false
    },
    {
      id: 'g-hiragana',
      title: 'Master all 46 Hiragana & 46 Katakana characters',
      category: 'Hiragana/Katakana',
      currentProgress: 70,
      targetProgress: 92,
      unit: 'Characters',
      completed: false
    },
    {
      id: 'g-vocab',
      title: 'Memorize 700+ Essential JLPT N5 Vocabulary',
      category: 'Vocabulary',
      currentProgress: 85,
      targetProgress: 700,
      unit: 'Words',
      completed: false
    },
    {
      id: 'g-grammar',
      title: 'Complete Minna no Nihongo Lessons 1 to 25 Grammar Rules',
      category: 'Grammar',
      currentProgress: 3,
      targetProgress: 25,
      unit: 'Lessons',
      completed: false
    },
    {
      id: 'g-kanji',
      title: 'Master 110 JLPT N5 Kanji with Radicals & Compounds',
      category: 'Kanji',
      currentProgress: 18,
      targetProgress: 110,
      unit: 'Kanji',
      completed: false
    },
    {
      id: 'g-mocks',
      title: 'Complete 3 Full-Length Timed Mock Exams',
      category: 'Mock Test',
      currentProgress: 0,
      targetProgress: 3,
      unit: 'Tests',
      completed: false
    }
  ];

  const initialChecklist = generateDefaultChecklist(currentWeek, todayStr);

  const initialSrsItems: SrsReviewItem[] = [
    {
      id: 'srs-1',
      title: 'Lesson 1 Grammar: N1 は N2 です / じゃありません',
      category: 'Grammar',
      stage: 1,
      lastReviewed: '2026-08-15',
      nextReviewDate: '2026-08-16',
      intervalDays: 1,
      consecutiveCorrect: 1,
      sourceMaterial: 'Lesson 1 Minna Grammar'
    },
    {
      id: 'srs-2',
      title: 'Basic Greetings: おはよう, いただきます, すみません',
      category: 'Vocabulary',
      stage: 2,
      lastReviewed: '2026-08-13',
      nextReviewDate: '2026-08-16',
      intervalDays: 3,
      consecutiveCorrect: 2,
      sourceMaterial: 'Daily Expressions PDF'
    },
    {
      id: 'srs-3',
      title: 'Nature Kanji: 日, 月, 木, 山, 川 (Sun, Moon, Tree, Mountain, River)',
      category: 'Kanji',
      stage: 1,
      lastReviewed: '2026-08-15',
      nextReviewDate: '2026-08-16',
      intervalDays: 1,
      consecutiveCorrect: 1,
      sourceMaterial: 'Kanji Chapter 1'
    }
  ];

  const initialMistakes: MistakeItem[] = [
    {
      id: 'mst-1',
      questionId: 'q-018',
      questionText: 'これは だれ（　　）かばんですか。',
      category: 'Grammar',
      userWrongAnswer: 'は',
      correctAnswer: 'の',
      explanation: 'Possessive particle の connects two nouns (だれの かばん = whose bag).',
      explanationBangla: 'মালিকানা বোঝাতে বিশেষ্যের মাঝে の পার্টিকেল বসে।',
      dateAdded: '2026-08-15',
      frequency: 1,
      mastered: false,
      lastTested: '2026-08-15'
    }
  ];

  return {
    simulatedCurrentDate: todayStr,
    examDate: EXAM_DATE,
    studyStartDate: STUDY_START_DATE,
    currentWeekNumber: currentWeek,
    checklists: {
      [todayStr]: initialChecklist
    },
    examResults: [
      {
        id: 'res-init-1',
        date: '2026-08-15',
        week: 1,
        totalQuestions: 10,
        correctCount: 8,
        scorePercentage: 80,
        timeTakenSeconds: 320,
        categoryBreakdown: {
          Kanji: { correct: 3, total: 3 },
          Vocabulary: { correct: 3, total: 4 },
          Grammar: { correct: 2, total: 3 }
        },
        mistakeQuestionIds: ['q-018']
      }
    ],
    srsQueue: initialSrsItems,
    mistakes: initialMistakes,
    mockTests: [],
    materials: STUDY_MATERIALS,
    studyLogs: [
      {
        id: 'log-1',
        date: '2026-08-15',
        category: 'Hiragana',
        durationMinutes: 45,
        notes: 'Practiced basic Hiragana stroke orders and dakuon marks'
      },
      {
        id: 'log-2',
        date: '2026-08-15',
        category: 'Grammar',
        durationMinutes: 50,
        notes: 'Covered Minna Lesson 1 rules 1-5'
      }
    ],
    goals: initialGoals,
    weeklyReviews: [],
    streaks: {
      currentStreak: 2,
      longestStreak: 2,
      totalStudyDays: 2,
      totalStudyHours: 2.5,
      lastActiveDate: '2026-08-15'
    },
    settings: {
      soundEnabled: true,
      remindersEnabled: true,
      reminderTime: '20:00',
      dailyQuestionCount: 10,
      pomodoroWorkMinutes: 25,
      pomodoroBreakMinutes: 5
    }
  };
}

export function loadAppState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = getDefaultInitialState();
      saveAppState(initial);
      return initial;
    }
    const parsed: AppState = JSON.parse(raw);
    
    // Merge any missing fields or updated materials
    if (!parsed.materials || parsed.materials.length === 0) {
      parsed.materials = STUDY_MATERIALS;
    }
    return parsed;
  } catch (err) {
    console.error('Failed to load state from localStorage:', err);
    return getDefaultInitialState();
  }
}

export function saveAppState(state: AppState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Failed to save state to localStorage:', err);
  }
}

export function calculateTotalStudyMinutes(state: AppState): number {
  const loggedMinutes = state.studyLogs.reduce((acc, log) => acc + (log.durationMinutes || 0), 0);
  const streakMinutes = Math.round((state.streaks.totalStudyHours || 0) * 60);
  return Math.max(loggedMinutes, streakMinutes);
}

export function formatTotalStudyTime(totalMinutes: number): { hours: number; minutes: number; formatted: string } {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours === 0) {
    return { hours, minutes, formatted: `${minutes}m` };
  }
  return {
    hours,
    minutes,
    formatted: minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`
  };
}

export function getTodayStudyMinutes(state: AppState): number {
  return state.studyLogs
    .filter(log => log.date === state.simulatedCurrentDate)
    .reduce((acc, log) => acc + (log.durationMinutes || 0), 0);
}

export function calculateReadiness(state: AppState): {
  overallScore: number;
  components: {
    dailyExams: number;
    checklist: number;
    spacedRevision: number;
    syllabusMastery: number;
    mockTests: number;
  };
  strengths: string[];
  weaknesses: string[];
  statusLabel: 'Strong' | 'Improving' | 'Needs Attention';
} {
  // 1. Daily Exam performance (Weight 30%)
  const recentExams = state.examResults.slice(-7);
  const avgExamScore = recentExams.length > 0
    ? recentExams.reduce((acc, ex) => acc + ex.scorePercentage, 0) / recentExams.length
    : 70;

  // 2. Daily Checklist completion (Weight 20%)
  const todayList = state.checklists[state.simulatedCurrentDate] || [];
  const completedCount = todayList.filter(c => c.completed).length;
  const checklistScore = todayList.length > 0 ? (completedCount / todayList.length) * 100 : 50;

  // 3. Spaced Repetition compliance (Weight 15%)
  const dueCount = state.srsQueue.filter(s => s.nextReviewDate <= state.simulatedCurrentDate).length;
  const reviewedCount = state.srsQueue.filter(s => s.stage >= 3).length;
  const srsScore = state.srsQueue.length > 0
    ? Math.min(100, Math.round((reviewedCount / state.srsQueue.length) * 100 + (dueCount === 0 ? 30 : 0)))
    : 60;

  // 4. Syllabus & Material Progress (Weight 15%)
  const totalSections = state.materials.reduce((acc, m) => acc + (m.sections ? m.sections.length : 1), 0);
  const completedSections = state.materials.reduce((acc, m) => {
    return acc + (m.sections ? m.sections.filter(s => s.completed).length : (m.status === 'Completed' ? 1 : 0));
  }, 0);
  const syllabusScore = totalSections > 0 ? Math.round((completedSections / totalSections) * 100) : 20;

  // 5. Mock Tests performance (Weight 20%)
  const mockScore = state.mockTests.length > 0
    ? state.mockTests.reduce((acc, m) => acc + (m.totalScore / 180) * 100, 0) / state.mockTests.length
    : 65; // Baseline expected target

  // Weighted overall calculation
  const overall = Math.round(
    avgExamScore * 0.30 +
    checklistScore * 0.20 +
    srsScore * 0.15 +
    syllabusScore * 0.15 +
    mockScore * 0.20
  );

  const strengths: string[] = [];
  const weaknesses: string[] = [];

  if (avgExamScore >= 80) strengths.push('High accuracy on daily question drills');
  else if (avgExamScore < 65) weaknesses.push('Daily short exam accuracy needs refinement');

  if (srsScore >= 75) strengths.push('Consistent spaced repetition retention');
  else weaknesses.push('Pending vocabulary/grammar SRS flashcard backlog');

  if (syllabusScore >= 60) strengths.push('On track with 12-week roadmap milestones');
  else weaknesses.push('Chapter reading & section checklist progress behind target');

  if (state.mistakes.filter(m => !m.mastered).length > 5) {
    weaknesses.push(`Mistake Notebook has ${state.mistakes.filter(m => !m.mastered).length} unmastered errors`);
  } else {
    strengths.push('Clean mistake notebook management');
  }

  let statusLabel: 'Strong' | 'Improving' | 'Needs Attention' = 'Improving';
  if (overall >= 75) statusLabel = 'Strong';
  else if (overall < 60) statusLabel = 'Needs Attention';

  return {
    overallScore: Math.min(100, Math.max(10, overall)),
    components: {
      dailyExams: Math.round(avgExamScore),
      checklist: Math.round(checklistScore),
      spacedRevision: Math.round(srsScore),
      syllabusMastery: Math.round(syllabusScore),
      mockTests: Math.round(mockScore)
    },
    strengths,
    weaknesses,
    statusLabel
  };
}

export function isDayFullStudyDay(
  checklistItems: DailyChecklistItem[],
  examResult?: DailyExamResult
): boolean {
  if (!examResult) return false;
  if (!checklistItems || checklistItems.length === 0) return false;
  return checklistItems.every(t => t.completed);
}

export function calculateCategoryBreakdownProgress(state: AppState): {
  vocabulary: { completed: number; target: number; percentage: number };
  grammar: { completed: number; target: number; percentage: number };
  kanji: { completed: number; target: number; percentage: number };
  reading: { completed: number; target: number; percentage: number };
  listening: { completed: number; target: number; percentage: number };
  consistency: number;
  averageExamScore: number;
  revisionCompletionRate: number;
  mockPerformance: number;
} {
  // Vocabulary: target 700 words
  const vocabLearned = Math.min(700, 85 + (state.currentWeekNumber - 1) * 55 + state.srsQueue.filter(s => s.category === 'Vocabulary' && s.stage >= 2).length * 10);
  const vocabPct = Math.min(100, Math.round((vocabLearned / 700) * 100));

  // Grammar: target 25 Lessons (or 48 grammar points)
  const grammarLessons = Math.min(25, 2 + (state.currentWeekNumber - 1) * 2);
  const grammarPct = Math.min(100, Math.round((grammarLessons / 25) * 100));

  // Kanji: target 110 Kanji
  const kanjiMastered = Math.min(110, 18 + (state.currentWeekNumber - 1) * 8 + KANJI_DATABASE.filter(k => k.week <= state.currentWeekNumber).length);
  const kanjiPct = Math.min(100, Math.round((kanjiMastered / 110) * 100));

  // Reading: based on exam reading accuracy + materials
  const readingSections = state.materials.filter(m => m.category === 'Reading' || m.category === 'Practice');
  const readingDone = readingSections.reduce((acc, m) => acc + (m.sections ? m.sections.filter(s => s.completed).length : (m.status === 'Completed' ? 1 : 0)), 0);
  const readingTotal = Math.max(1, readingSections.reduce((acc, m) => acc + (m.sections ? m.sections.length : 1), 0));
  const readingPct = Math.min(100, Math.round((readingDone / readingTotal) * 100) || 45);

  // Listening: based on listening practice and dialogue expressions
  const listeningMat = state.materials.filter(m => m.category === 'Speaking' || m.category === 'Listening');
  const listeningDone = listeningMat.reduce((acc, m) => acc + (m.sections ? m.sections.filter(s => s.completed).length : (m.status === 'Completed' ? 1 : 0)), 0);
  const listeningTotal = Math.max(1, listeningMat.reduce((acc, m) => acc + (m.sections ? m.sections.length : 1), 0));
  const listeningPct = Math.min(100, Math.round((listeningDone / listeningTotal) * 100) || 50);

  // Consistency
  const consistency = Math.min(100, Math.round((state.streaks.totalStudyDays / Math.max(1, (state.currentWeekNumber * 7))) * 100) || 85);

  // Average Daily Exam score
  const avgExam = state.examResults.length > 0
    ? Math.round(state.examResults.reduce((acc, e) => acc + e.scorePercentage, 0) / state.examResults.length)
    : 80;

  // Revision Completion: items reviewed vs total in queue
  const dueItems = state.srsQueue.filter(s => s.nextReviewDate <= state.simulatedCurrentDate).length;
  const reviewedItems = state.srsQueue.filter(s => s.stage >= 2).length;
  const revisionRate = state.srsQueue.length > 0
    ? Math.min(100, Math.round(((state.srsQueue.length - dueItems + reviewedItems) / (state.srsQueue.length * 2)) * 100))
    : 80;

  // Mock Performance
  const mockPerf = state.mockTests.length > 0
    ? Math.round(state.mockTests.reduce((acc, m) => acc + (m.totalScore / m.maxScore) * 100, 0) / state.mockTests.length)
    : 72;

  return {
    vocabulary: { completed: vocabLearned, target: 700, percentage: vocabPct },
    grammar: { completed: grammarLessons, target: 25, percentage: grammarPct },
    kanji: { completed: kanjiMastered, target: 110, percentage: kanjiPct },
    reading: { completed: readingDone, target: readingTotal, percentage: readingPct },
    listening: { completed: listeningDone, target: listeningTotal, percentage: listeningPct },
    consistency,
    averageExamScore: avgExam,
    revisionCompletionRate: revisionRate,
    mockPerformance: mockPerf
  };
}

export function calculateDailyPerformanceScore(
  checklistItems: DailyChecklistItem[],
  todayExamResult?: DailyExamResult
): number {
  const completedTasks = checklistItems.filter(c => c.completed).length;
  const checklistPercentage = checklistItems.length > 0 ? (completedTasks / checklistItems.length) * 100 : 0;
  
  if (!todayExamResult) {
    return Math.round(checklistPercentage * 0.5); // only checklist contribution so far
  }
  
  const examPercentage = todayExamResult.scorePercentage;
  return Math.round(checklistPercentage * 0.5 + examPercentage * 0.5);
}
