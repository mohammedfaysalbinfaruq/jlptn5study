export interface WeekPlan {
  weekNumber: number;
  startDate: string;
  endDate: string;
  title: string;
  phase: 'Learning' | 'Consolidation' | 'Revision & Mocks';
  focusTopic: string;
  minnaLessons: string;
  vocabularyTarget: string;
  kanjiTarget: string;
  assignedPdf: string;
  mockTestRecommended?: string;
  goals: string[];
  studyAreas: string[];
  grammarPoints: string[];
  vocabularyTopics: string[];
  kanjiTopics?: string[];
  speakingListeningFocus: string;
  suggestedMaterialIds: string[];
  needsManualMappingNotice?: boolean;
}

export const JLPT_START_DATE = '2026-08-16';
export const JLPT_EXAM_DATE = '2026-12-06';

export const ROADMAP_WEEKS: WeekPlan[] = [
  {
    weekNumber: 1,
    startDate: '2026-08-16',
    endDate: '2026-08-22',
    title: 'WEEK 1 — HIRAGANA + BASIC VOCABULARY',
    phase: 'Learning',
    focusTopic: 'Master 46 Basic Hiragana characters, Dakuon & Greetings',
    minnaLessons: 'Lesson 1 Introduction',
    vocabularyTarget: '50 Basic Greetings & Numbers',
    kanjiTarget: 'Hiragana writing sheet',
    assignedPdf: '01_Hiragana_Katakana_Charts.pdf',
    goals: [
      'Master 46 Basic Hiragana characters, Dakuon (tenten) & Handakuon (maru)',
      'Learn correct pronunciation, long vowels (長音), double consonants (っ), and ん usage',
      'Hiragana writing practice and stroke orders',
      'Basic N5 vocabulary (Lesson 1-2 words)',
      'Basic greetings & everyday expressions (おはよう, こんにちは, ありがとうございます, etc.)',
      'Simple Japanese sentence structure (N1 は N2 です)',
      'Light listening and sound recognition'
    ],
    studyAreas: ['Hiragana', 'Basic Vocabulary', 'Greetings', 'Pronunciation', 'Basic Listening', 'Revision'],
    grammarPoints: ['は (wa) topic marker', 'です (desu)', 'Lesson 1 Grammar Patterns'],
    vocabularyTopics: ['Numbers 1–100', 'Months & Days of the Week', 'Essential Greetings & Classroom Japanese'],
    speakingListeningFocus: 'Daily self-introduction (はじめまして、わたしは〜です。どうぞよろしく)',
    suggestedMaterialIds: ['mat-hiragana-sheet', 'mat-greetings-expressions', 'mat-numbers-time', 'mat-lesson1-vocab-grammar']
  },
  {
    weekNumber: 2,
    startDate: '2026-08-23',
    endDate: '2026-08-29',
    title: 'WEEK 2 — KATAKANA + BASIC GRAMMAR',
    phase: 'Learning',
    focusTopic: 'Master 46 Katakana characters + Demonstratives (これ/それ/あれ)',
    minnaLessons: 'Lessons 2 & 3',
    vocabularyTarget: '70 Katakana & Daily Objects',
    kanjiTarget: 'Katakana writing sheet',
    assignedPdf: '01_Hiragana_Katakana_Charts.pdf',
    goals: [
      'Master 46 Basic Katakana characters + Combinations (キャ, シュ, etc.)',
      'Katakana reading & foreign loanword recognition',
      'Katakana writing practice',
      'Basic N5 Grammar (Lesson 2 & 3)',
      'Basic particles mastery: です, ます, は, が, を, の, に, で, も',
      'Demonstratives: これ, それ, あれ, どれ, このN, そのN, あのN, どのN, ここ, そこ, あそこ, どこ, こちら, そちら, あちら, どちら',
      'Simple sentence formation & daily listening'
    ],
    studyAreas: ['Katakana', 'Demonstratives (Ko-So-A-Do)', 'Particles (は, が, を, の, に, で, も)', 'Vocabulary', 'Listening'],
    grammarPoints: ['これ/それ/あれ', 'この/その/あの + N', 'N1 の N2', 'そうです / そうじゃありません / ちがいます', 'S1 か S2 か', 'ここ/そこ/あそこ/どこ', 'こちら/そちら/あちら/どちら', 'N1 は Place です', 'Place に N が あります/います'],
    vocabularyTopics: ['Classroom objects, Stationery, Personal items, Places, Facilities, Currency (〜えん)'],
    speakingListeningFocus: 'Asking where things/locations are and identifying ownership',
    suggestedMaterialIds: ['mat-katakana-sheet', 'mat-lesson2-grammar', 'mat-lesson3-grammar', 'mat-ko-so-a-do-chart']
  },
  {
    weekNumber: 3,
    startDate: '2026-08-30',
    endDate: '2026-09-05',
    title: 'WEEK 3 — KANJI + GRAMMAR EXPANSION',
    phase: 'Learning',
    focusTopic: 'Kanji 1–35 (Numbers, Nature, Time) + Motion Verbs',
    minnaLessons: 'Lessons 4 & 5',
    vocabularyTarget: '60 Motion & Time Words',
    kanjiTarget: 'Kanji 1–35 (日, 月, 木, 山, 川...)',
    assignedPdf: '02_Basic_N5_Kanji_Radicals.pdf',
    goals: [
      'Begin N5 Kanji (Characters 1–35: Numbers, Nature, Calendar, People, Directions)',
      'Learn Kanji through practical vocabulary compounds (e.g. 富士山, 日曜日, 一日中)',
      'Expand grammar with motion verbs and time markers (Lesson 4 & 5)',
      'Build sentences with time particles: に, から, まで, と',
      'Existence verbs: あります (inanimate) vs います (animate)',
      'Speaking & pronunciation practice'
    ],
    studyAreas: ['Kanji 1–35', 'Time & Dates', 'Motion Verbs (いきます, きます, かえります)', 'Particles に, で, と, から, まで', 'Listening', 'Speaking'],
    grammarPoints: ['いま 〜じ 〜ふんです', 'Vます / Vません / Vました / Vませんでした', 'N(time) に V', 'N1 から N2 まで', 'N1 と N2', 'N(Place) へ いきます/きます/かえります', 'どこ「へ」も いきません', 'N(Vehicle) で いきます', 'N(person) と V', 'いつ'],
    vocabularyTopics: ['Time durations, Calendar days (ついたち, ふつか...), Transportation (でんしゃ, バス, ひこうき...)'],
    speakingListeningFocus: 'Describing daily routines, commute methods, and schedule times',
    suggestedMaterialIds: ['mat-kanji-part1', 'mat-lesson4-grammar', 'mat-lesson5-grammar', 'mat-dates-calendar']
  },
  {
    weekNumber: 4,
    startDate: '2026-09-06',
    endDate: '2026-09-12',
    title: 'WEEK 4 — SENTENCE BUILDING + CONSOLIDATION',
    phase: 'Consolidation',
    focusTopic: 'Review Lessons 1–5, Particle Combo Rules & Assessment Test 1',
    minnaLessons: 'Consolidation Lessons 1–5',
    vocabularyTarget: 'Recap 150 Core Words',
    kanjiTarget: 'Review Kanji 1–35 Mastery',
    assignedPdf: '03_Minna_Grammar_Notes_1_to_5.pdf',
    mockTestRecommended: 'Weekly Assessment Test 1',
    goals: [
      'Strengthen & consolidate all fundamentals from Weeks 1–3',
      'Hiragana & Katakana speed recall revision',
      'Vocabulary & Kanji revision (Kanji 1–35 mastery)',
      'Grammar consolidation: Sentence building & error analysis',
      'Shadowing listening exercises',
      'Regular target: 5–10 Japanese sentences written & spoken daily',
      'Comprehensive Weekly Assessment Test 1'
    ],
    studyAreas: ['Consolidation', 'Sentence Building', 'Shadowing', 'Sentence Analysis', 'Weekly Test 1'],
    grammarPoints: ['Review of Lessons 1–5 Particles & Verb Conjugations', 'Particles combo: には, では, とは', 'Star arrangement grammar synthesis'],
    vocabularyTopics: ['Full Week 1–3 Vocab Recap, Time Expressions, Expressions Sheet'],
    speakingListeningFocus: 'Constructing and speaking 5–10 coherent Japanese sentences daily about personal routines',
    suggestedMaterialIds: ['mat-rony-shortnotes', 'mat-grammar-roll', 'mat-modeltest-1', 'mat-sample-official-1']
  },
  {
    weekNumber: 5,
    startDate: '2026-09-13',
    endDate: '2026-09-19',
    title: 'WEEK 5 — TENSE + ADJECTIVES + QUESTION WORDS',
    phase: 'Learning',
    focusTopic: 'い-adjectives & な-adjectives, Conjugations & Question Words',
    minnaLessons: 'Lessons 8 & 9',
    vocabularyTarget: '40 Adjectives (Taste, Weather, Feelings)',
    kanjiTarget: 'Kanji 36–70 (Adjective & People Kanji)',
    assignedPdf: '04_N5_Adjectives_and_Grammar.pdf',
    goals: [
      'Master Japanese Adjectives: い-adjectives vs な-adjectives (Lesson 8 & 9)',
      'Adjective conjugations: Present, Negative, Past, Past Negative (〜くない, 〜かった, 〜じゃありません, 〜でした)',
      'Connecting adjectives with 〜くて and 〜で',
      'Question words deep dive: どこ, いつ, なに, だれ, どう, どんな',
      'Vocabulary: Time, Numbers, Places, Daily activities',
      'Begin structured N5 reading passage analysis'
    ],
    studyAreas: ['Adjectives (い/な)', 'Question Words', 'Verb Tenses', 'Reading Comprehension Intro', 'Kanji 36–70'],
    grammarPoints: ['Noun は な-adj[な] です / い-adj(〜い) です', '〜が、〜 (Contrastive)', 'とても / あまり (Adverbial modification)', 'どう / どんな', 'N が あります/わかります/すきです/きらいです/じょうずです/へたです', '〜から (Because)', 'どうして'],
    vocabularyTopics: ['Adjectives of taste, weather, emotion, quality; Foods, Sports, Music, Hobbies'],
    speakingListeningFocus: 'Expressing likes, dislikes, abilities, and reasoning with から',
    suggestedMaterialIds: ['mat-lesson8-grammar', 'mat-lesson9-grammar', 'mat-kanji-part2', 'mat-vocab-adjectives']
  },
  {
    weekNumber: 6,
    startDate: '2026-09-20',
    endDate: '2026-09-26',
    title: 'WEEK 6 — DAILY-LIFE JAPANESE',
    phase: 'Learning',
    focusTopic: 'Location Postpositions (上/下/前/後) + Japanese Counters',
    minnaLessons: 'Lessons 10 & 11',
    vocabularyTarget: '50 Family & Household Items',
    kanjiTarget: 'Kanji 71–110 (Direction & Action Kanji)',
    assignedPdf: '05_Daily_Life_Vocab_and_Counters.pdf',
    goals: [
      'Objects and Locations with あります/います (Lesson 10 & 11)',
      'Counters in Japanese: ひとつ/ふたつ, 〜にん, 〜だい, 〜まい, 〜かい, 〜じかん, 〜ほん, 〜ひき, 〜さつ',
      'Daily-life topics: Family, Food, School, Shopping, Time, Transportation, Weather, Daily routine',
      'Listening situations: Restaurant ordering, Train station, Shopping, Simple dialogue',
      'Kanji 71–110 expansion'
    ],
    studyAreas: ['Location Postpositions (うえ, した, まえ, うしろ, なか, となり, ちかく, あいだ)', 'Counters (助数詞)', 'Daily Situations', 'Kanji 71–110'],
    grammarPoints: ['Place に N が あります/います', 'N1 (thing/place) の N2 (position) に', 'N1 や N2 (など)', 'Quantifier (number/counter) + Verb', 'Quantifier (period) に 〜かい V', 'Quantifier だけ / Noun だけ'],
    vocabularyTopics: ['Family terms (my family vs others: 父/お父さん, 母/お母さん, 兄/お兄さん, etc.)', 'Furniture, Rooms, Animals, Food & Drinks'],
    speakingListeningFocus: 'Real dialogue practice: Restaurant ordering (ご注文は？これをお願いします), Store inquiries',
    suggestedMaterialIds: ['mat-lesson10-grammar', 'mat-lesson11-grammar', 'mat-kanji-part3', 'mat-vocab-counters-family']
  },
  {
    weekNumber: 7,
    startDate: '2026-09-27',
    endDate: '2026-10-03',
    title: 'WEEK 7 — READING + GRAMMAR MIX',
    phase: 'Learning',
    focusTopic: 'Comparatives & Superlatives (より, どちらが, いちばん) + Short Reading',
    minnaLessons: 'Lesson 12',
    vocabularyTarget: '45 Seasons & Weather Terms',
    kanjiTarget: 'Reading Passages & Kanji Compounds',
    assignedPdf: '06_N5_Reading_Comprehension_Guide.pdf',
    mockTestRecommended: 'Weekly Assessment Test 2',
    goals: [
      'Comparative & Superlative Structures (Lesson 12)',
      'Noun + より + Adj / N1 と N2 と どちらが / いちばん Adj',
      'Short N5 reading passages with information retrieval (notices, menus, timetables)',
      'Grammar revision & sentence analysis without overloading new items',
      'Weekly Assessment Test 2'
    ],
    studyAreas: ['Comparisons (より, どちらが, いちばん)', 'Reading Passages', 'Vocabulary Revision', 'Listening Comprehension', 'Weekly Test 2'],
    grammarPoints: ['N1 は N2 より Adj です', 'N1 と N2 と どちらが Adj ですか → N1 の ほうが Adj です', 'N1 [の なかで] なに/どこ/だれ/いつ が いちばん Adj ですか', 'Past tense of Adjectives & Nouns'],
    vocabularyTopics: ['Seasons (はる, なつ, あき, ふゆ), Weather, Travel terms, Festival expressions'],
    speakingListeningFocus: 'Comparing preferences (e.g., 肉と魚と どちらが好きですか)',
    suggestedMaterialIds: ['mat-lesson12-grammar', 'mat-practice-test-set1', 'mat-reading-notices']
  },
  {
    weekNumber: 8,
    startDate: '2026-10-04',
    endDate: '2026-10-10',
    title: 'WEEK 8 — CONSOLIDATION & MID-WAY MOCK',
    phase: 'Consolidation',
    focusTopic: 'Mid-Way Diagnostic Mock Exam & Particle Matrix Review',
    minnaLessons: 'Review Lessons 1–12',
    vocabularyTarget: 'All 400 Core Words to Date',
    kanjiTarget: 'All 110 N5 Kanji Complete',
    assignedPdf: '07_Midway_Mock_Exam_Diagnostic.pdf',
    mockTestRecommended: 'Full Timed Mid-Way Mock Exam',
    goals: [
      'Major revision week across all Lessons 1–12, Kanji 1–110, and Particle rules',
      'Intensive Grammar reference review',
      'Deep review of previously learned vocabulary & counter anomalies',
      'Listening comprehension drills with official scripts',
      'Mini Mock Test Assessment (Timed 45 mins)'
    ],
    studyAreas: ['Major Consolidation', 'All Kanji 1–110', 'Particles Deep Review', 'Mini Mock Test', 'Error Analysis'],
    grammarPoints: ['Particle distinction matrix (は vs が, に vs で, へ vs に, を vs が)', 'Adjective & Noun full conjugation matrices'],
    vocabularyTopics: ['High-frequency N5 vocabulary list, Opposite Adjectives (反対の言葉)'],
    speakingListeningFocus: 'Full self-introduction & recounting weekend activities',
    suggestedMaterialIds: ['mat-grammar-part1-particles', 'mat-n5-kanji-complete', 'mat-mock-test-midway', 'mat-listening-scripts-vol1']
  },
  {
    weekNumber: 9,
    startDate: '2026-10-11',
    endDate: '2026-10-17',
    title: 'WEEK 9 — VOCABULARY + GRAMMAR DEEP REVIEW & VERB FORMS',
    phase: 'Learning',
    focusTopic: 'Desire (〜たい/ほしい) + The Master Te-form (て形) Conjugations',
    minnaLessons: 'Lessons 13 & 14',
    vocabularyTarget: '50 Action Verbs & Daily Activities',
    kanjiTarget: 'Verb Compound Kanji',
    assignedPdf: '08_Te_Form_Conjugation_Mastery.pdf',
    goals: [
      'Desire expressions: 〜たいです, 〜たくないです, N が ほしいです (Lesson 13)',
      'Motion with purpose: Place へ V(stem) に 行きます/来ます/帰ります',
      'Te-form (て形) mastery: Group 1 (五段), Group 2 (一段), Group 3 (サ変・カ変) rules (Lesson 14)',
      'Te-form sentence patterns: 〜てください, 〜ています (continuous), 〜ましょうか',
      'Daily 2-minute Speaking Challenge (My Family, My Day, My Hobbies, Food)',
      'Vocabulary flashcards & rapid recall'
    ],
    studyAreas: ['Te-form (て形)', 'Desire (〜たい / ほしい)', 'Purpose (〜に行く)', 'Daily Speaking Challenge', 'Vocabulary Flashcards'],
    grammarPoints: ['N が ほしいです', 'V-stem + たいです', 'Place へ V-stem に いきます', 'Group 1/2/3 て-form rules', 'Vて ください', 'Vて います', 'V-stem ましょうか'],
    vocabularyTopics: ['Action verbs, Activities, Daily routine, Free-time activities'],
    speakingListeningFocus: '2-minute spontaneous speaking challenge on selected daily topic',
    suggestedMaterialIds: ['mat-lesson13-grammar', 'mat-lesson14-grammar', 'mat-te-form-rules', 'mat-speaking-prompts']
  },
  {
    weekNumber: 10,
    startDate: '2026-10-18',
    endDate: '2026-10-24',
    title: 'WEEK 10 — KANJI + LISTENING INTENSIVE & ADVANCED PATTERNS',
    phase: 'Learning',
    focusTopic: 'Nai-form (ない形) + Dictionary form (辞書形) + Obligations',
    minnaLessons: 'Lessons 15–18',
    vocabularyTarget: '60 Health, Rules & Public Signs',
    kanjiTarget: 'Listening Script Kanji',
    assignedPdf: '09_Nai_and_Dict_Forms_Grammar.pdf',
    goals: [
      'Permission & Prohibition: 〜てもいいです, 〜てはいけません, 〜ています (state/job/marriage) (Lesson 15)',
      'Sequential actions: V1て、V2て、V3ます and V1てから V2 (Lesson 16)',
      'Nai-form (ない形) & rules: 〜ないでください, 〜なければなりません, 〜なくてもいいです (Lesson 17)',
      'Dictionary form (辞書形): 〜ことができます, 趣味は〜ことです, 〜まえに (Lesson 18)',
      'Kanji recognition speed drills',
      'Active Mistake Notebook maintenance with targeted error reviews'
    ],
    studyAreas: ['Nai-form (ない形)', 'Dictionary Form (辞書形)', 'Sequential & Conditional', 'Listening Intensive', 'Mistake Notebook Focus'],
    grammarPoints: ['Vても いいですか', 'Vては いけません', 'V1てから V2', 'N1 は N2 が Adj', 'どうやって', 'どの N', 'Vないで ください', 'Vなければ なりません', 'Vなくても いいです', 'V(dic) ことが できます', 'わたしの しゅみは V(dic) ことです', 'V(dic) / Nの / Time まえに'],
    vocabularyTopics: ['Health & Sickness (びょうき, くすり, ねつ), Actions, Rules & Regulations'],
    speakingListeningFocus: 'Listening comprehension under exam time conditions & speaking requests',
    suggestedMaterialIds: ['mat-lesson15-grammar', 'mat-lesson16-grammar', 'mat-lesson17-grammar', 'mat-lesson18-grammar', 'mat-mistake-notebook-core']
  },
  {
    weekNumber: 11,
    startDate: '2026-10-25',
    endDate: '2026-10-31',
    title: 'WEEK 11 — FULL MOCK TEST WEEK',
    phase: 'Consolidation',
    focusTopic: 'Ta-form (た形), Plain Form (普通形) & Timed Full Mock Exams',
    minnaLessons: 'Lessons 19–22',
    vocabularyTarget: '60 Expressions & Connectors',
    kanjiTarget: 'Speed Mock Kanji Recognition',
    assignedPdf: '10_Full_Length_Mock_Exam_1.pdf',
    mockTestRecommended: 'Full JLPT N5 Mock Exam Series 1',
    goals: [
      'Ta-form (た形) past & experience: 〜たことがあります, 〜たり〜たりします, 〜くなります/〜になります (Lesson 19)',
      'Plain style & Informal conversation: 普通形 (Plain Form) (Lesson 20)',
      'Thoughts & Quotes: 〜と 思います, 〜と 言いました, 〜でしょう (Lesson 21)',
      'Noun Modification (連体修飾): わたしが 作った ケーキ, 日本へ 行く 人 (Lesson 22)',
      'Complete Full N5 Mock Tests (Vocabulary, Grammar, Reading, Listening)',
      'Strict time management & error analysis for every section'
    ],
    studyAreas: ['Full Mock Tests', 'Ta-form & Plain Form', 'Noun Modification', 'Time Management', 'Targeted Revision Mapping'],
    grammarPoints: ['Vた ことが あります', 'Vたり、Vたり します', 'い-adj(〜く) / な-adj(〜に) / Nに なります', 'Plain Form (普通形) for Verbs/Adjectives/Nouns', 'Plain Form + と おもいます', 'Plain Form + と いいました', 'Plain Form + でしょう', 'Noun Modification clauses'],
    vocabularyTopics: ['Thoughts, Opinions, Weather forecasts, Modifying clauses vocabulary'],
    speakingListeningFocus: 'Mock listening test stamina (30 mins full session) & error diagnosis',
    suggestedMaterialIds: ['mat-lesson19-grammar', 'mat-lesson20-grammar', 'mat-lesson21-grammar', 'mat-lesson22-grammar', 'mat-full-mock-series']
  },
  {
    weekNumber: 12,
    startDate: '2026-11-01',
    endDate: '2026-11-07',
    title: 'WEEK 12 — FINAL STRUCTURED LEARNING CONSOLIDATION',
    phase: 'Consolidation',
    focusTopic: 'Conditionals (〜たら, 〜ても) + Giving & Receiving (あげる/もらう/くれる)',
    minnaLessons: 'Lessons 23–25 (Syllabus Complete)',
    vocabularyTarget: '50 Complex Sentences Vocab',
    kanjiTarget: 'All N5 Kanji Review',
    assignedPdf: '11_Conditionals_and_Giving_Receiving.pdf',
    mockTestRecommended: 'Full JLPT N5 Mock Exam Series 2',
    goals: [
      'Conditionals & Interactions: 〜とき (When), V(dic) と (Inevitably/Naturally) (Lesson 23)',
      'Giving & Receiving actions: 〜てあげます, 〜てもらいます, 〜てくれます (Lesson 24)',
      'Conditionals: 〜たら (If/When), 〜ても (Even if) (Lesson 25)',
      'Finish all remaining essential N5 Minna no Nihongo syllabus',
      'Final comprehensive error analysis before transitioning to Exam Prep Phase'
    ],
    studyAreas: ['Conditionals (〜とき, 〜と, 〜たら, 〜ても)', 'Giving & Receiving (授受表現)', 'Final Syllabus Completion', 'Consolidated Mock Test'],
    grammarPoints: ['V(dic)/V(た)/V(ない)/Adj/Nの + とき', 'V(dic) と 〜', 'Vて あげます/もらいます/くれます', 'Vたら / Aかったら / Na・N だったら', 'Vても / Aくても / Na・N でも', 'もし / いくら'],
    vocabularyTopics: ['Directions (交差点, 信号, 角, 橋), Actions, Favors, Advice'],
    speakingListeningFocus: 'Complex sentence understanding and dialogue comprehension',
    suggestedMaterialIds: ['mat-lesson23-grammar', 'mat-lesson24-grammar', 'mat-lesson25-grammar', 'mat-comprehensive-review']
  },
  {
    weekNumber: 13,
    startDate: '2026-11-08',
    endDate: '2026-12-06',
    title: '🔥 REVISION + PRACTICE + FULL MOCK TESTS (FINAL EXAM PREPARATION PHASE)',
    phase: 'Revision & Mocks',
    focusTopic: 'Intensive Weak-Point Repair, Star Sentences (★) & Final Mock Sim',
    minnaLessons: 'Final Sprint Revision',
    vocabularyTarget: 'All 800+ Vocabulary Fast-Recall',
    kanjiTarget: 'All 110 Kanji Lightning Drill',
    assignedPdf: '12_Final_Sprint_Official_Practice_Test.pdf',
    mockTestRecommended: 'Official JLPT N5 Simulation Exams',
    goals: [
      'NO NEW MATERIAL introduced — Strict focus on high-yield mastery',
      '1. Daily revision of high-priority weak areas and Mistake Notebook',
      '2. Rapid vocabulary & Kanji recall (Flashcards, meaning-to-kanji drills)',
      '3. Particle accuracy drills (は vs が, に vs で, へ vs に, を vs が, と vs や)',
      '4. Star sentence ordering (★) speed and accuracy strategies',
      '5. Reading comprehension speed & key-point extraction (Menus, flyers, notes)',
      '6. Full timed JLPT N5 Mock Tests every weekend',
      '7. Exam Day Simulation: 6 December 2026 Readiness 100%'
    ],
    studyAreas: ['Mistake Notebook Overhaul', 'Speed Vocabulary Recall', 'Particle Drills', 'Star Word Arrangement ★', 'Reading Speed', 'Full Mock Simulations'],
    grammarPoints: ['Complete 48 Grammar Rules synthesis', 'All Verb Conjugation Rapid Fire', 'All Sentence Connectors'],
    vocabularyTopics: ['All 800+ N5 core vocabulary items, 110 Kanji compounds, 22 Essential Categories'],
    speakingListeningFocus: 'Full speed listening section drills and confidence boosting',
    suggestedMaterialIds: ['mat-mock-test-series-all', 'mat-mistake-notebook-core', 'mat-official-exam-prep', 'mat-n5-mastery-checklist']
  }
];

export function getWeekForDate(dateStr: string): WeekPlan {
  const target = new Date(dateStr);
  const start = new Date(JLPT_START_DATE);

  if (target < start) {
    return ROADMAP_WEEKS[0];
  }

  const diffTime = target.getTime() - start.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const weekIdx = Math.floor(diffDays / 7);

  if (weekIdx >= 12) {
    // Return final revision phase
    return ROADMAP_WEEKS[12];
  }
  return ROADMAP_WEEKS[weekIdx] || ROADMAP_WEEKS[ROADMAP_WEEKS.length - 1];
}

export function getDaysLeft(currentDateStr: string, targetDateStr = JLPT_EXAM_DATE): number {
  const current = new Date(currentDateStr);
  const target = new Date(targetDateStr);
  const diffTime = target.getTime() - current.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
}
