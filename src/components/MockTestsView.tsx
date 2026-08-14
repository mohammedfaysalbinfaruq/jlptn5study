import React, { useState } from 'react';
import {
  Trophy,
  Plus,
  CheckCircle2,
  XCircle,
  Clock,
  BookOpen,
  TrendingUp,
  BarChart3,
  Calendar,
  AlertTriangle
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { AppState, MockTestRecord, StudyMaterial } from '../types';
import { sound } from '../utils/audio';

interface MockTestsViewProps {
  state: AppState;
  onUpdateState: (updater: (prev: AppState) => AppState) => void;
  onOpenPdf: (material: StudyMaterial) => void;
}

export const MockTestsView: React.FC<MockTestsViewProps> = ({
  state,
  onUpdateState,
  onOpenPdf
}) => {
  const [showLogForm, setShowLogForm] = useState(false);
  const [testTitle, setTestTitle] = useState('Official JLPT N5 Sample Test 1');
  const [testDate, setTestDate] = useState(state.simulatedCurrentDate);
  const [vocabScore, setVocabScore] = useState(48);
  const [grammarReadingScore, setGrammarReadingScore] = useState(45);
  const [listeningScore, setListeningScore] = useState(44);
  const [timeTaken, setTimeTaken] = useState(105);
  const [notes, setNotes] = useState('');

  const totalScore = vocabScore + grammarReadingScore + listeningScore;
  const isPassed = totalScore >= 80 && vocabScore >= 19 && grammarReadingScore >= 19 && listeningScore >= 19;

  const handleSaveMockRecord = (e: React.FormEvent) => {
    e.preventDefault();

    const newRecord: MockTestRecord = {
      id: `mock-${Date.now()}`,
      title: testTitle,
      dateTaken: testDate,
      sectionScores: {
        languageKnowledgeVocab: Number(vocabScore),
        languageKnowledgeGrammarReading: Number(grammarReadingScore),
        listening: Number(listeningScore)
      },
      totalScore,
      maxScore: 180,
      passed: isPassed,
      timeTakenMinutes: Number(timeTaken),
      notes: notes.trim()
    };

    onUpdateState(prev => ({
      ...prev,
      mockTests: [...prev.mockTests, newRecord],
      goals: prev.goals.map(g => {
        if (g.category === 'Mock Test') {
          return {
            ...g,
            currentProgress: prev.mockTests.length + 1,
            completed: prev.mockTests.length + 1 >= g.targetProgress
          };
        }
        return g;
      })
    }));

    sound.playSuccessChime();
    setShowLogForm(false);
    setNotes('');
  };

  // Mock test materials from state
  const mockMaterials = state.materials.filter(m => m.category === 'Mock Test');

  // Chart data
  const chartData = state.mockTests.map((t, idx) => ({
    name: `Test ${idx + 1}`,
    total: t.totalScore,
    vocab: t.sectionScores.languageKnowledgeVocab,
    grammarReading: t.sectionScores.languageKnowledgeGrammarReading,
    listening: t.sectionScores.listening,
    target: 140
  }));

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Top Header Card */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#6B7280] mb-1">
              <Trophy className="w-3.5 h-3.5 text-[#1677B8]" />
              <span>Full-Length Examination Simulator</span>
              <span>•</span>
              <span className="font-mono text-[#1677B8] font-semibold">Official 180-Point Format</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight">
              Official JLPT N5 Mock Tests & Score Analytics
            </h1>
            <p className="text-xs text-[#6B7280] mt-1">
              Track your sectional scores across Language Knowledge (60), Grammar & Reading (60), and Listening (60). Pass benchmark: 80/180 • Personal Target: 140+/180.
            </p>
          </div>

          <button
            onClick={() => setShowLogForm(!showLogForm)}
            className="px-4 py-2 rounded-lg bg-[#1677B8] hover:bg-[#136298] text-white text-xs font-bold shadow-2xs flex items-center gap-1.5 self-start md:self-auto transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Log Mock Exam Score</span>
          </button>
        </div>
      </div>

      {/* Log Mock Test Modal Form */}
      {showLogForm && (
        <form onSubmit={handleSaveMockRecord} className="p-5 rounded-xl bg-slate-50 border border-[#E5E7EB] space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-[#111827] uppercase tracking-wider">
            <span>Log Official Mock Exam Results</span>
            <span className={`px-2 py-0.5 rounded font-mono ${isPassed ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
              Estimated: {totalScore} / 180 ({isPassed ? 'PASSED' : 'NOT PASSED'})
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="text-[#6B7280] block mb-1">Test Title:</label>
              <input
                type="text"
                value={testTitle}
                onChange={e => setTestTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white border border-[#E5E7EB] text-[#222222] focus:outline-none focus:border-[#1677B8]"
                required
              />
            </div>

            <div>
              <label className="text-[#6B7280] block mb-1">Date Taken:</label>
              <input
                type="date"
                value={testDate}
                onChange={e => setTestDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white border border-[#E5E7EB] text-[#222222] focus:outline-none focus:border-[#1677B8]"
                required
              />
            </div>

            <div>
              <label className="text-[#6B7280] block mb-1">Total Time Taken (Minutes):</label>
              <input
                type="number"
                min="30"
                max="180"
                value={timeTaken}
                onChange={e => setTimeTaken(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-white border border-[#E5E7EB] text-[#222222] focus:outline-none focus:border-[#1677B8]"
              />
            </div>
          </div>

          {/* Section Scores */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
            <div className="p-3 rounded-lg bg-white border border-[#E5E7EB]">
              <label className="text-[#6B7280] font-semibold block mb-1">
                1. Language Knowledge (Vocab) / 60:
              </label>
              <input
                type="number"
                min="0"
                max="60"
                value={vocabScore}
                onChange={e => setVocabScore(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-[#E5E7EB] text-[#111827] font-mono font-bold"
              />
            </div>

            <div className="p-3 rounded-lg bg-white border border-[#E5E7EB]">
              <label className="text-[#6B7280] font-semibold block mb-1">
                2. Grammar & Reading / 60:
              </label>
              <input
                type="number"
                min="0"
                max="60"
                value={grammarReadingScore}
                onChange={e => setGrammarReadingScore(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-[#E5E7EB] text-[#111827] font-mono font-bold"
              />
            </div>

            <div className="p-3 rounded-lg bg-white border border-[#E5E7EB]">
              <label className="text-[#6B7280] font-semibold block mb-1">
                3. Listening (聴解) / 60:
              </label>
              <input
                type="number"
                min="0"
                max="60"
                value={listeningScore}
                onChange={e => setListeningScore(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-[#E5E7EB] text-[#111827] font-mono font-bold"
              />
            </div>
          </div>

          <div>
            <label className="text-[#6B7280] block mb-1 text-xs">Test Notes / Confusing Areas:</label>
            <input
              type="text"
              placeholder="e.g. Struggled on reading passage timing; need to review listening fast audio"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-white border border-[#E5E7EB] text-xs text-[#222222] placeholder-[#9CA3AF] focus:outline-none focus:border-[#1677B8]"
            />
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowLogForm(false)}
              className="px-3 py-1.5 rounded-lg text-xs text-[#6B7280] hover:text-[#111827]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-[#1677B8] hover:bg-[#136298] text-white text-xs font-bold shadow-2xs"
            >
              Save Exam Record
            </button>
          </div>
        </form>
      )}

      {/* Progress Chart if mock tests exist */}
      {chartData.length > 0 && (
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-[#111827] uppercase tracking-wider">
              <TrendingUp className="w-4 h-4 text-[#1677B8]" />
              <span>Score Progression vs Target (140 / 180)</span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" stroke="#6B7280" textAnchor="end" fontSize={11} />
                <YAxis stroke="#6B7280" domain={[0, 180]} fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E5E7EB', borderRadius: 8, color: '#111827', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Line type="monotone" dataKey="total" stroke="#1677B8" strokeWidth={3} name="Total Score" />
                <Line type="monotone" dataKey="target" stroke="#DC2626" strokeDasharray="5 5" strokeWidth={2} name="140+ Target" />
                <Line type="monotone" dataKey="vocab" stroke="#2563EB" strokeWidth={1.5} name="Vocab (60)" />
                <Line type="monotone" dataKey="grammarReading" stroke="#7C3AED" strokeWidth={1.5} name="Grammar/Reading (60)" />
                <Line type="monotone" dataKey="listening" stroke="#059669" strokeWidth={1.5} name="Listening (60)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Mock Test Documents & History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Recommended Official Mock Tests */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 space-y-4 shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-bold text-[#111827] uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-[#1677B8]" />
            <span>Official JLPT N5 Sample Papers</span>
          </div>

          <div className="space-y-3">
            {mockMaterials.map((mockMat) => (
              <div
                key={mockMat.id}
                onClick={() => onOpenPdf(mockMat)}
                className="p-4 rounded-xl bg-slate-50 border border-[#E5E7EB] hover:border-[#1677B8] hover:bg-white cursor-pointer transition-all flex items-center justify-between gap-3 group"
              >
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-[#6B7280] mb-1">
                    <span className="px-2 py-0.5 rounded bg-white text-[#1677B8] border border-[#E5E7EB] font-medium">
                      Week {mockMat.assignedWeek} Mock
                    </span>
                    <span>•</span>
                    <span>{mockMat.pageRange}</span>
                  </div>
                  <h4 className="font-bold text-sm text-[#111827] group-hover:text-[#1677B8] transition-colors">
                    {mockMat.name}
                  </h4>
                  <p className="text-xs text-[#6B7280] line-clamp-2 mt-0.5">
                    {mockMat.summary}
                  </p>
                </div>

                <span className="text-xs text-[#1677B8] font-semibold shrink-0 group-hover:translate-x-1 transition-transform">
                  Open →
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* History of Taken Mocks */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 space-y-4 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-bold text-[#111827] uppercase tracking-wider">
            <span>Completed Mock Test Records ({state.mockTests.length})</span>
          </div>

          <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
            {state.mockTests.length > 0 ? (
              state.mockTests.map((record) => (
                <div
                  key={record.id}
                  className="p-4 rounded-xl bg-slate-50 border border-[#E5E7EB] space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#111827] text-sm">{record.title}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      record.passed ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-red-50 text-red-800 border-red-200'
                    }`}>
                      {record.passed ? 'PASSED ✓' : 'FAILED ✗'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[#6B7280] text-[11px]">
                    <span>Date: {record.dateTaken}</span>
                    <span>Time: {record.timeTakenMinutes} min</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center pt-1 font-mono text-[#111827]">
                    <div className="p-2 rounded bg-white border border-[#E5E7EB]">
                      <div className="text-[10px] text-[#6B7280] font-sans">Vocab</div>
                      <div className="font-bold text-[#1677B8]">{record.sectionScores.languageKnowledgeVocab}/60</div>
                    </div>
                    <div className="p-2 rounded bg-white border border-[#E5E7EB]">
                      <div className="text-[10px] text-[#6B7280] font-sans">Grammar</div>
                      <div className="font-bold text-purple-700">{record.sectionScores.languageKnowledgeGrammarReading}/60</div>
                    </div>
                    <div className="p-2 rounded bg-white border border-[#E5E7EB]">
                      <div className="text-[10px] text-[#6B7280] font-sans">Listening</div>
                      <div className="font-bold text-emerald-700">{record.sectionScores.listening}/60</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between font-bold text-[#111827] pt-1">
                    <span>Total Score:</span>
                    <span className="text-[#1677B8] font-mono text-sm">{record.totalScore} / 180</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center bg-slate-50 rounded-xl border border-[#E5E7EB] text-xs text-[#6B7280]">
                No mock test records saved yet. Complete a paper and click &ldquo;Log Mock Exam Score&rdquo;!
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
