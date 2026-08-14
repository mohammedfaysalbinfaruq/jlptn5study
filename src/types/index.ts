export type StudyCategory =
  | 'Hiragana'
  | 'Katakana'
  | 'Vocabulary'
  | 'Grammar'
  | 'Kanji'
  | 'Reading'
  | 'Listening'
  | 'Speaking'
  | 'Writing'
  | 'Practice'
  | 'Mock Test'
  | 'Answer Key'
  | 'Revision';

export type MaterialType = 'PDF' | 'AUDIO' | 'NOTES' | 'VOCAB_LIST' | 'GRAMMAR_SHEET';

export interface StudyMaterial {
  id: string;
  name: string;
  title: string;
  category: StudyCategory;
  type: MaterialType;
  tier?: 'Core' | 'Supplementary' | 'Practice' | 'Mock';
  week?: number;
  assignedWeek: number; // 1 to 12 (or 13 for Revision Phase)
  chapterLesson?: string;
  pageRange?: string;
  totalPages?: number;
  sourceFile: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
  summary: string;
  contentSnippet?: string;
  sections?: {
    id: string;
    title: string;
    page: number;
    completed: boolean;
  }[];
  personalNotes?: string;
}

export interface DailyChecklistItem {
  id: string;
  date: string;
  subject: string;
  taskDescription: string;
  durationMinutes: number;
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
  materialId?: string;
  pageRange?: string;
}

export interface ExamQuestion {
  id: string;
  category: StudyCategory;
  week: number;
  lesson?: number;
  questionText: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  explanationBangla?: string;
  sourceLesson?: string;
  passage?: string;
  audioSim?: string;
  starPosition?: number;
}

export type Question = ExamQuestion;

export interface DailyExamResult {
  id: string;
  date: string;
  week: number;
  totalQuestions: number;
  correctCount: number;
  scorePercentage: number;
  timeTakenSeconds: number;
  categoryBreakdown: Record<string, { correct: number; total: number }>;
  mistakeQuestionIds: string[];
}

export interface MistakeItem {
  id: string;
  questionId: string;
  questionText: string;
  category: StudyCategory | string;
  userWrongAnswer: string;
  correctAnswer: string;
  explanation: string;
  explanationBangla?: string;
  dateAdded: string;
  frequency: number;
  mastered: boolean;
  lastTested?: string;
  sourceLesson?: string;
}

export interface SrsReviewItem {
  id: string;
  title: string;
  category: StudyCategory;
  stage: number; // 1 to 5
  lastReviewed: string;
  nextReviewDate: string;
  intervalDays: number;
  consecutiveCorrect: number;
  sourceMaterial?: string;
}

export interface MockTestRecord {
  id: string;
  title: string;
  dateTaken: string;
  sectionScores: {
    languageKnowledgeVocab: number;
    languageKnowledgeGrammarReading: number;
    listening: number;
  };
  totalScore: number;
  maxScore: number;
  passed: boolean;
  timeTakenMinutes: number;
  notes?: string;
}

export interface StudyLogItem {
  id: string;
  date: string;
  category: StudyCategory;
  durationMinutes: number;
  notes?: string;
}

export interface UserGoal {
  id: string;
  title: string;
  category: string;
  currentProgress: number;
  targetProgress: number;
  unit: string;
  completed: boolean;
}

export interface WeeklyReviewNote {
  weekNumber: number;
  dateCompleted: string;
  hoursStudied: number;
  questionsAnswered: number;
  avgDailyScore: number;
  retroNotes: string;
  confidenceScore: number;
}

export interface RoadmapWeek {
  weekNumber: number;
  startDate: string;
  endDate: string;
  title: string;
  phase: 'Learning' | 'Consolidation' | 'Revision & Mocks';
  goals: string[];
  studyAreas: string[];
  grammarPoints: string[];
  vocabularyTopics: string[];
  kanjiTopics?: string[];
  speakingListeningFocus: string;
  suggestedMaterialIds: string[];
  needsManualMappingNotice?: boolean;
  focusTopic?: string;
  minnaLessons?: string;
  vocabularyTarget?: number;
  kanjiTarget?: number;
  assignedPdf?: string;
  mockTestRecommended?: boolean;
}

export type WeekPlan = RoadmapWeek;

export interface KanjiItem {
  id: number;
  kanji: string;
  strokes: number;
  onyomi: string[];
  kunyomi: string[];
  meaningBangla: string;
  meaningEnglish: string;
  meaning?: string;
  category?: string;
  radical: {
    character: string;
    name: string;
    meaning: string;
  };
  radicals?: string;
  phoneticElement?: {
    element: string;
    sound: string;
    explanation: string;
  };
  etymology: string;
  examples: {
    word: string;
    reading: string;
    meaningBangla: string;
    meaningEnglish: string;
  }[];
  week: number;
  lesson: number;
}

export interface VocabItem {
  id: string;
  japanese: string;
  kanji?: string;
  romaji: string;
  meaningEnglish: string;
  meaningBangla: string;
  category: StudyCategory;
  week: number;
  lesson?: number;
  srsStage: number;
  nextReviewDate?: string;
  intervalDays?: number;
  correctCount: number;
  incorrectCount: number;
  exampleSentence?: {
    japanese: string;
    english: string;
    bangla: string;
  };
}

export interface AppState {
  simulatedCurrentDate: string; // YYYY-MM-DD
  examDate: string; // "2026-12-06"
  studyStartDate: string; // "2026-08-16"
  currentWeekNumber: number;
  checklists: Record<string, DailyChecklistItem[]>;
  examResults: DailyExamResult[];
  srsQueue: SrsReviewItem[];
  mistakes: MistakeItem[];
  mockTests: MockTestRecord[];
  materials: StudyMaterial[];
  studyLogs: StudyLogItem[];
  goals: UserGoal[];
  weeklyReviews: WeeklyReviewNote[];
  streaks: {
    currentStreak: number;
    longestStreak: number;
    totalStudyDays: number;
    totalStudyHours: number;
    lastActiveDate: string;
  };
  settings: {
    soundEnabled: boolean;
    remindersEnabled: boolean;
    reminderTime: string;
    dailyQuestionCount: number;
    pomodoroWorkMinutes: number;
    pomodoroBreakMinutes: number;
  };
}
