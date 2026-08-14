import { StudyMaterial } from '../types';

export const STUDY_MATERIALS: StudyMaterial[] = [
  {
    id: 'mat-hiragana-sheet',
    name: 'Hiragana Sheet & Pronunciation Guide',
    title: 'হিরাগানা চার্ট ও দীর্ঘ উচ্চারণ বিধি (Hiragana & Pronunciation)',
    category: 'Hiragana',
    type: 'PDF',
    assignedWeek: 1,
    chapterLesson: 'Basics - Hiragana',
    pageRange: 'Pages 4, 6, 7, 9-12, 15',
    totalPages: 10,
    sourceFile: 'Uploaded N5 Japanese Study Material',
    status: 'In Progress',
    summary: 'Complete 46 Basic Hiragana characters, Dakuon (tenten), Handakuon (maru), Yoon combinations (kya, kyu, kyo), double consonants (っ), and long vowels (う/お).',
    contentSnippet: `あ (a) い (i) う (u) え (e) お (o)
か (ka) き (ki) く (ku) け (ke) こ (ko)
さ (sa) し (shi) す (su) せ (se) そ (so)
た (ta) ち (chi) つ (tsu) て (te) と (to)
な (na) に (ni) ぬ (nu) ね (ne) の (no)
は (ha) ひ (hi) ふ (fu) へ (he) ほ (ho)
ま (ma) み (mi) む (mu) め (me) も (mo)
や (ya) ゆ (yu) よ (yo)
ら (ra) り (ri) る (ru) れ (re) ろ (ro)
わ (wa) を (o) ん (n)

Dakuon & Handakuon:
が(ga) ぎ(gi) ぐ(gu) げ(ge) ご(go)
ざ(za) じ(ji) ず(zu) ぜ(ze) ぞ(zo)
だ(da) ぢ(ji) づ(zu) で(de) ど(do)
ば(ba) び(bi) ぶ(bu) べ(be) ぼ(bo)
ぱ(pa) ぴ(pi) ぷ(pu) ぺ(pe) ぽ(po)

Pronunciation Rules:
1. っ (Sokuon): Double consonant stop (e.g., おっと, にっき, きって).
2. ん (Hatsuon): Nasal sound before different consonants (はんたい, えんぴつ).
3. Long vowels: おばあさん (grandmother) vs おばさん (aunt); おじいさん (grandfather) vs おじさん (uncle).`,
    sections: [
      { id: 'h-1', title: 'Basic 46 Hiragana Characters', page: 4, completed: true },
      { id: 'h-2', title: 'Hiragana Stroke Orders & Writing Sheet', page: 6, completed: true },
      { id: 'h-3', title: 'Dakuon (Tenten) & Handakuon (Maru)', page: 12, completed: false },
      { id: 'h-4', title: 'Combination Characters (Yoon: kya, kyu, kyo)', page: 13, completed: false },
      { id: 'h-5', title: 'Long Vowels & Special Pronunciations', page: 15, completed: false }
    ],
    personalNotes: 'Focus on distinguishing between は (ha/wa) and を (o), and master stroke orders for な, ね, ぬ.'
  },
  {
    id: 'mat-greetings-expressions',
    name: 'Some Japanese Expressions & Daily Greetings',
    title: 'জাপানি নিত্যদিনের অভিবাদন ও শিষ্টাচার (Daily Expressions)',
    category: 'Speaking',
    type: 'PDF',
    assignedWeek: 1,
    chapterLesson: 'Everyday Expressions & Classroom Japanese',
    pageRange: 'Pages 16, 142-143',
    totalPages: 4,
    sourceFile: 'Uploaded N5 Japanese Study Material',
    status: 'In Progress',
    summary: '30+ Essential conversational expressions including time-of-day greetings, gratitude, apologies, leaving/returning home, and polite business manners.',
    contentSnippet: `• おはようございます (Good morning - polite)
• こんにちは (Good afternoon / Hello)
• こんばんは (Good evening)
• おやすみなさい (Good night)
• ありがとうございます (Thank you very much)
• どういたしまして (You are welcome)
• さようなら (Goodbye)
• じゃ、また (See you again)
• はじめまして (How do you do? / First meeting)
• どうぞ よろしく おねがいします (Pleased to meet you)
• いただきます (Said before eating)
• ごちそうさまでした (Said after eating)
• すみません (Excuse me / Sorry)
• ごめんなさい (I'm sorry)
• いってきます (I'm leaving / off to work)
• いってらっしゃい (Take care / Go and come back)
• ただいま (I'm home)
• おかえりなさい (Welcome home)
• おつかれさまでした (Thank you for your hard work)
• お大事に (おだいじに - Take care / Get well soon)`,
    sections: [
      { id: 'e-1', title: 'Daily Greeting Routine', page: 16, completed: true },
      { id: 'e-2', title: 'Eating & Household Etiquette', page: 16, completed: false },
      { id: 'e-3', title: 'Polite Expressions & Apologies', page: 142, completed: false }
    ]
  },
  {
    id: 'mat-numbers-time',
    name: 'Numbers, Time, Days & Dates Master Reference',
    title: 'সংখ্যা, সময়, বার ও তারিখ গণনা (Counters & Calendar)',
    category: 'Vocabulary',
    type: 'VOCAB_LIST',
    week: 1,
    assignedWeek: 1,
    chapterLesson: 'Basic Counting & Appendices',
    pageRange: 'Pages 1, 99-104',
    totalPages: 6,
    sourceFile: 'Uploaded N5 Japanese Study Material',
    status: 'Not Started',
    summary: 'Counting 1–100,000, Hours (〜時), Minutes (〜分: fun/pun exceptions), Days of Week (〜曜日), Month days (1st to 31st with all irregular readings like ついたち, ふつか, みっか, よっか, はつか).',
    contentSnippet: `1. Numbers:
1 (いち), 2 (に), 3 (さん), 4 (よん/し), 5 (ご), 6 (ろく), 7 (なな/しち), 8 (はち), 9 (きゅう/く), 10 (じゅう)
100 (ひゃく), 1,000 (せん), 10,000 (いちまん)

2. Time:
何時 (なんじ), 1時 (いちじ), 4時 (よじ - Irregular!), 7時 (しちじ), 9時 (くじ - Irregular!)
Minutes (分): 1分 (いっぷん), 2分 (にふん), 3分 (さんぷん), 4分 (よんぷん), 5分 (ごふん), 6分 (ろっぷん), 7分 (ななふん), 8分 (はっぷん), 9分 (きゅうふん), 10分 (じゅっぷん/じっぷん), 15分 (じゅうごふん), 30分 (さんじゅっぷん / はん)

3. Days of the Week:
日曜日 (にちようび), 月曜日 (げつようび), 火曜日 (かようび), 水曜日 (すいようび), 木曜日 (もくようび), 金曜日 (きんようび), 土曜日 (どようび)

4. Irregular Days of Month:
1日 (ついたち), 2日 (ふつか), 3日 (みっか), 4日 (よっか), 5日 (いつか), 6日 (むいか), 7日 (なのか), 8日 (ようか), 9日 (ここのか), 10日 (とおか), 14日 (じゅうよっか), 20日 (はつか), 24日 (にじゅうよっか)`,
    sections: [
      { id: 'num-1', title: 'Numbers 1 to 100,000', page: 99, completed: false },
      { id: 'num-2', title: 'Telling Time (Hours & Minutes Exceptions)', page: 101, completed: false },
      { id: 'num-3', title: 'Days of the Month (1st-31st Irregularities)', page: 101, completed: false }
    ]
  },
  {
    id: 'mat-lesson1-vocab-grammar',
    name: 'Lesson 1 — Identity, Nationality, Occupations & Particles',
    title: 'Lesson 1: আত্মপরিচয়, পেশা, N1 は N2 です / じゃありません',
    category: 'Grammar',
    type: 'PDF',
    assignedWeek: 1,
    chapterLesson: 'Minna no Nihongo Lesson 1',
    pageRange: 'Pages 17-20',
    totalPages: 4,
    sourceFile: 'Uploaded N5 Japanese Study Material',
    status: 'In Progress',
    summary: 'Covers self-introduction, country suffixes (〜じん), honorific 〜さん, question particle か, particle も (also), and genitive の (possessive/belonging).',
    contentSnippet: `Core Grammar Patterns:
1. N1 は N2 です (N1 is N2):
   わたしは マイク・ミラーです。(I am Mike Miller.)
   わたしは エンジニアです。(I am an engineer.)

2. N1 は N2 じゃありません / ではありません (N1 is not N2):
   サントスさんは がくせい じゃありません。(Mr. Santos is not a student.)
   わたしは いしゃ じゃありません。(I am not a doctor.)

3. N1 は N2 ですか (Is N1 N2?):
   ミラーさんは アメリカじん ですか。(Is Mr. Miller American?)
   ...はい、アメリカじんです。(Yes, he is American.)
   ...いいえ、アメリカじんじゃありません。(No, he is not American.)

4. N も (Also / Too):
   ミラーさんは かいしゃいんです。グプタさんも かいしゃいんです。(Mr. Miller is a company employee. Mr. Gupta is also a company employee.)

5. N1 の N2 (Possession / Affiliation):
   ミラーさんは IMCの しゃいんです。(Mr. Miller is an employee of IMC.)
   わたしは さくらだいがくの がくせいです。(I am a student of Sakura University.)`,
    sections: [
      { id: 'l1-1', title: 'Lesson 1 Vocabulary List', page: 17, completed: true },
      { id: 'l1-2', title: 'Rule 1: N1 は N2 です', page: 18, completed: true },
      { id: 'l1-3', title: 'Rule 2: N1 は N2 じゃありません', page: 19, completed: false },
      { id: 'l1-4', title: 'Rule 3: Question Particle か', page: 19, completed: false },
      { id: 'l1-5', title: 'Rule 4 & 5: Particles も and の', page: 19, completed: false }
    ]
  },
  {
    id: 'mat-katakana-sheet',
    name: 'Katakana Sheet & Loanword Practice',
    title: 'কাতাকানা চার্ট ও বিদেশী শব্দ পাঠ (Katakana Mastery)',
    category: 'Katakana',
    type: 'PDF',
    assignedWeek: 2,
    chapterLesson: 'Basics - Katakana',
    pageRange: 'Pages 5, 8, 9, 14',
    totalPages: 6,
    sourceFile: 'Uploaded N5 Japanese Study Material',
    status: 'Not Started',
    summary: '46 Katakana characters, writing stroke order, special foreign loanword phonetic adaptations (コーヒー, テレビ, コンピューター, etc.).',
    contentSnippet: `ア (a) イ (i) ウ (u) エ (e) オ (o)
カ (ka) キ (ki) ク (ku) ケ (ke) コ (ko)
サ (sa) シ (shi) ス (su) セ (se) ソ (so)
タ (ta) チ (chi) ツ (tsu) テ (te) ト (to)
ナ (na) ニ (ni) ヌ (nu) ネ (ne) ノ (no)
ハ (ha) ヒ (hi) フ (fu) ヘ (he) ホ (ho)
マ (ma) ミ (mi) ム (mu) メ (me) モ (mo)
ヤ (ya) ユ (yu) ヨ (yo)
ラ (ra) リ (ri) ル (ru) レ (re) ロ (ro)
ワ (wa) ヲ (o) ン (n)

Common Katakana Words:
• カメラ (Camera) • テレビ (Television) • ラジオ (Radio)
• コンピューター (Computer) • ノート (Notebook) • カード (Card)
• シャープペンシル (Mechanical pencil) • チョコレート (Chocolate)
• コーヒー (Coffee) • タクシー (Taxi) • バス (Bus)`,
    sections: [
      { id: 'k-1', title: 'Basic Katakana 46 Characters', page: 5, completed: false },
      { id: 'k-2', title: 'Katakana Stroke Practice', page: 8, completed: false },
      { id: 'k-3', title: 'Katakana Dakuon & Combinations', page: 14, completed: false }
    ]
  },
  {
    id: 'mat-lesson2-grammar',
    name: 'Lesson 2 — Demonstratives: これ, それ, あれ & この, その, あの',
    title: 'Lesson 2: বস্তু নির্দেশক শব্দ ও কার কার মালিকানা (Things & Ownership)',
    category: 'Grammar',
    type: 'PDF',
    assignedWeek: 2,
    chapterLesson: 'Minna no Nihongo Lesson 2',
    pageRange: 'Pages 21-23',
    totalPages: 3,
    sourceFile: 'Uploaded N5 Japanese Study Material',
    status: 'Not Started',
    summary: 'Demonstrative pronouns (これ/それ/あれ), demonstrative adjectives (この/その/あの + N), asking whose it is (だれの N), alternative questions (S1 か S2 か), and confirmation そうですか.',
    contentSnippet: `1. これ / それ / あれ (Pronouns - standalone):
   これ: Close to speaker (এটা)
   それ: Close to listener (ওটা)
   あれ: Far from both speaker and listener (ঐটা)
   Example: それは じしょですか。(Is that a dictionary?)

2. この / その / あの + Noun (Must be followed by Noun):
   このほんは わたしのです。(This book is mine.)
   あのかたは どなたですか。(Who is that person over there?)

3. そうです / そうじゃありません / ちがいます:
   はい、そうです。(Yes, that's right.)
   いいえ、ちがいます。(No, that's wrong.)

4. S1 か S2 か (Alternative choice):
   これは「9」ですか、「7」ですか。(Is this a '9' or a '7'?)

5. N1 の N2 (Belonging):
   あれは だれの かばんですか。(Whose bag is that?)
   ...さとうさんの かばんです。(It is Ms. Sato's bag.)`,
    sections: [
      { id: 'l2-1', title: 'Lesson 2 Vocabulary', page: 21, completed: false },
      { id: 'l2-2', title: 'これ / それ / あれ vs この / その / あの', page: 22, completed: false },
      { id: 'l2-3', title: 'S1 か S2 か & そうですか Usage', page: 23, completed: false }
    ]
  },
  {
    id: 'mat-lesson3-grammar',
    name: 'Lesson 3 — Locations: ここ, そこ, あそこ, どこ & こちら, そちら',
    title: 'Lesson 3: স্থান ও দিক নির্দেশক শব্দ (Places, Directions, Prices)',
    category: 'Grammar',
    type: 'PDF',
    assignedWeek: 2,
    chapterLesson: 'Minna no Nihongo Lesson 3',
    pageRange: 'Pages 24-26',
    totalPages: 3,
    sourceFile: 'Uploaded N5 Japanese Study Material',
    status: 'Not Started',
    summary: 'Places (ここ, そこ, あそこ, どこ), polite directions (こちら, そちら, あちら, どちら), sentence pattern N1 は Place です, and asking price (いくら).',
    contentSnippet: `1. Place Demonstratives:
   ここ: Here (এই স্থান)
   そこ: There near you (ঐ স্থান)
   あそこ: Over there (ঐ দূরবর্তী স্থান)
   どこ: Where? (কোথায়?)

2. Polite Direction Equivalents:
   こちら (This way / here)
   そちら (That way / there)
   あちら (That way over there)
   どちら (Which way / where)

3. Sentence Patterns:
   おてあらいは あそこです。(The restroom is over there.)
   でんわは 2かいです。(The telephone is on the 2nd floor.)
   かいしゃは どちらですか。(Which company do you work for? / Where is your company?)
   これは どこの コンピューターですか。(Where was this computer made? / Which company's computer is this?)
   ...にほんの コンピューターです。(It's a Japanese computer.)
   この靴は いくらですか。(How much are these shoes?)`,
    sections: [
      { id: 'l3-1', title: 'Lesson 3 Vocabulary', page: 24, completed: false },
      { id: 'l3-2', title: 'Place Sentence Patterns & Ko-So-A-Do Table', page: 25, completed: false },
      { id: 'l3-3', title: 'Polite Prefix お〜 (お国, お手洗い)', page: 26, completed: false }
    ]
  },
  {
    id: 'mat-kanji-part1',
    name: 'Basic Kanji Part 1 (Kanji 1–35)',
    title: 'বেসিক কাঞ্জি পার্ট ১ (সংখ্যা, প্রকৃতি, সময়, মানুষ ১–৩৫)',
    category: 'Kanji',
    type: 'PDF',
    assignedWeek: 3,
    chapterLesson: 'Basic Kanji Book N5 (Chapter 1–2)',
    pageRange: 'Pages 117-121',
    totalPages: 5,
    sourceFile: 'Uploaded N5 Japanese Study Material',
    status: 'Not Started',
    summary: 'Numbers 1–10 (一, 二, 三, 四, 五, 六, 七, 八, 九, 十), 100 (百), 1000 (千), 10,000 (万), Elements & Days (日, 月, 火, 水, 木, 金, 土, 山, 川, 田), Time & Direction (年, 上, 下, 中, 半, 分), People (人, 子, 女, 男, 目).',
    sections: [
      { id: 'k1-1', title: 'Nature & Weekday Kanji (山, 川, 田, 日, 月, 火, 水)', page: 117, completed: false },
      { id: 'k1-2', title: 'Elements & Numbers 1–4 (木, 金, 土, 一, 二, 三, 四)', page: 118, completed: false },
      { id: 'k1-3', title: 'Numbers 5–10 & 100 (五, 六, 七, 八, 九, 十, 百)', page: 119, completed: false },
      { id: 'k1-4', title: 'Thousands, Years & Positions (千, 万, 円, 年, 上, 下, 中)', page: 120, completed: false },
      { id: 'k1-5', title: 'Half, Division, People & Body (半, 分, 人, 子, 女, 男, 目)', page: 121, completed: false }
    ]
  },
  {
    id: 'mat-lesson4-grammar',
    name: 'Lesson 4 — Time, Verbs, and Particles に, から, まで, と',
    title: 'Lesson 4: সময়, ক্রিয়াপদের কাল ও চার পার্টিকেল (Time & Tenses)',
    category: 'Grammar',
    type: 'PDF',
    assignedWeek: 3,
    chapterLesson: 'Minna no Nihongo Lesson 4',
    pageRange: 'Pages 27-30',
    totalPages: 4,
    sourceFile: 'Uploaded N5 Japanese Study Material',
    status: 'Not Started',
    summary: 'Verb tenses (ます, ません, ました, ませんでした), Time particle に, Duration bounds から & まで, and Conjunction と.',
    contentSnippet: `1. Verb Tense Matrix:
   Present/Future Positive: おきます (I wake up / will wake up)
   Present/Future Negative: おきません (I do not / will not wake up)
   Past Positive: おきました (I woke up)
   Past Negative: おきませんでした (I did not wake up)

2. Time Particle に:
   6時半に おきます。(I wake up at 6:30.)
   7月2日に 日本へ きました。(I came to Japan on July 2nd.)
   Note: Do NOT use に with relative time words (きょう, あした, きのう, まいあさ).

3. から (From) & まで (Until/To):
   9時から 5時まで はたらきます。(I work from 9:00 to 5:00.)
   ぎんこうは 9時から 3時までです。(The bank is open from 9 to 3.)

4. と (And):
   ぎんこうの やすみは どようびと にちようびです。(Bank holidays are Saturday and Sunday.)`,
    sections: [
      { id: 'l4-1', title: 'Lesson 4 Vocabulary List', page: 27, completed: false },
      { id: 'l4-2', title: 'Verb Polite Forms (Past & Negative)', page: 28, completed: false },
      { id: 'l4-3', title: 'Time Particle に & から〜まで', page: 29, completed: false }
    ]
  },
  {
    id: 'mat-lesson5-grammar',
    name: 'Lesson 5 — Motion Verbs, Direction Particle へ & Means で',
    title: 'Lesson 5: গমন ক্রিয়া, দিক নির্দেশক へ ও মাধ্যম で (Motion & Commute)',
    category: 'Grammar',
    type: 'PDF',
    assignedWeek: 3,
    chapterLesson: 'Minna no Nihongo Lesson 5',
    pageRange: 'Pages 31-33',
    totalPages: 3,
    sourceFile: 'Uploaded N5 Japanese Study Material',
    status: 'Not Started',
    summary: 'Movement verbs (いきます, きます, かえります) with destination particle へ, total negation どこ「へ」も いきません, transport means with で, companion with と, and exception あるいて (on foot).',
    contentSnippet: `1. N(Place) へ いきます / きます / かえります:
   とうきょうへ いきます。(I will go to Tokyo.)
   日本へ きました。(I came to Japan.)
   うちへ かえります。(I return home.)

2. Total Negation with どこも / なにも / だれも:
   どこ「へ」も いきません。(I am not going anywhere.)
   なにも たべません。(I will not eat anything.)
   だれも きませんでした。(Nobody came.)

3. N(Vehicle) で (By means of):
   でんしゃで いきます。(I go by train.)
   タクシーで きました。(I came by taxi.)
   Exception: あるいて (on foot, no で needed) -> えきから あるいて かえりました。(I walked home from the station.)

4. N(Person) と (With someone):
   かぞくと 日本へ きました。(I came to Japan with my family.)
   ひとりで とうきょうへ いきます。(I will go to Tokyo alone.)`,
    sections: [
      { id: 'l5-1', title: 'Lesson 5 Vocabulary', page: 31, completed: false },
      { id: 'l5-2', title: 'Destination へ and Means で', page: 32, completed: false },
      { id: 'l5-3', title: 'Companions と and Total Negation', page: 33, completed: false }
    ]
  },
  {
    id: 'mat-lesson8-grammar',
    name: 'Lesson 8 — Adjectives (い-Adjectives & な-Adjectives)',
    title: 'Lesson 8: জাপানি বিশেষণ ও তাদের রূপান্তর (Adjective Mastery)',
    category: 'Grammar',
    type: 'PDF',
    assignedWeek: 5,
    chapterLesson: 'Minna no Nihongo Lesson 8',
    pageRange: 'Pages 39-41, 51-55',
    totalPages: 6,
    sourceFile: 'Uploaded N5 Japanese Study Material',
    status: 'Not Started',
    summary: 'Classification of い-adj and な-adj, noun modification, adjective negations (〜くない vs 〜じゃありません), contrastive が (but), and degree adverbs とても & あまり.',
    contentSnippet: `1. Types of Adjectives:
   い-Adjective: Ends in い (たかい, さむい, おいしい, あたらしい, etc.)
   な-Adjective: Uses な before noun (しんせつ[な], きれい[な], べんり[な], 有名[な], etc.)

2. Conjugations:
   い-adj Negative: Remove い -> add くない (たかい -> たかくない)
   い-adj Past: Remove い -> add かった (たかい -> たかかった)
   い-adj Past Neg: Remove い -> add くなかった (たかい -> たかくなかった)
   Exception: いい -> よくない -> よかった -> よくなかった

   な-adj Negative: add じゃありません (しんせつ -> しんせつじゃありません)
   な-adj Past: add でした (しんせつ -> しんせつでした)
   な-adj Past Neg: add じゃありませんでした (しんせつ -> しんせつじゃありませんでした)

3. Noun Modification:
   富士山は 高い 山です。(Mt. Fuji is a tall mountain.)
   ワット先生は 親切な 先生です。(Mr. Watt is a kind teacher.)

4. Sentence Connectors:
   〜が、〜 (But/However): 日本の食べ物は おいしいですが、たかいです。(Japanese food is delicious, but expensive.)
   とても (Very, used in positive): とても さむいです。(Very cold)
   あまり (Not very, used in negative): あまり さむくないです。(Not so cold)`,
    sections: [
      { id: 'l8-1', title: 'Adjectives Vocabulary (22 な-adj & Core い-adj)', page: 39, completed: false },
      { id: 'l8-2', title: 'い-adj vs な-adj Conjugation Rules', page: 40, completed: false },
      { id: 'l8-3', title: 'Adjective Modifiers & Contrastive が', page: 41, completed: false }
    ]
  },
  {
    id: 'mat-lesson9-grammar',
    name: 'Lesson 9 — Preference, Ability & Reasons: すき, じょうず, わかります, から',
    title: 'Lesson 9: পছন্দ, দক্ষতা, কারণ ও অবজেক্টে が এর ব্যবহার',
    category: 'Grammar',
    type: 'PDF',
    assignedWeek: 5,
    chapterLesson: 'Minna no Nihongo Lesson 9',
    pageRange: 'Pages 42-44, 58-62',
    totalPages: 6,
    sourceFile: 'Uploaded N5 Japanese Study Material',
    status: 'Not Started',
    summary: 'Special verbs/adjectives taking が instead of を for their objects (あります, わかります, すき, きらい, じょうず, へた), stating reasons with 〜から, and asking why with どうして.',
    contentSnippet: `1. Object marked with が:
   わたしは イタリアりょうりが すきです。(I like Italian cuisine.)
   わたしは 日本語が わかります。(I understand Japanese.)
   わたしは 車が あります。(I have a car.)
   ミラーさんは ピアノが じょうずです。(Mr. Miller is skilled at piano.)

2. Reason Connector 〜から:
   じかんが ありませんから、しんぶんを よみません。(Because I don't have time, I don't read the newspaper.)

3. Asking Why with どうして:
   どうして あさ しんぶんを よみませんか。(Why don't you read the newspaper in the morning?)
   ...じかんが ありませんから。(Because I don't have time.)`,
    sections: [
      { id: 'l9-1', title: 'Lesson 9 Vocabulary', page: 42, completed: false },
      { id: 'l9-2', title: 'Object Particle が with Potential/Emotive Terms', page: 43, completed: false },
      { id: 'l9-3', title: 'Degree Adverbs (よく, だいたい, すこし, ぜんぜん)', page: 44, completed: false }
    ]
  },
  {
    id: 'mat-lesson10-grammar',
    name: 'Lesson 10 — Existence: あります vs います & Spatial Positions',
    title: 'Lesson 10: অবস্থান, প্রাণী/বস্তুর স্থায়িত্ব ও অবস্থান সূচক পদ',
    category: 'Grammar',
    type: 'PDF',
    assignedWeek: 6,
    chapterLesson: 'Minna no Nihongo Lesson 10',
    pageRange: 'Pages 45-47, 63-67',
    totalPages: 6,
    sourceFile: 'Uploaded N5 Japanese Study Material',
    status: 'Not Started',
    summary: 'Inanimate existence あります vs Animate います, location particles Place に N が あります/います vs N は Place に あります/います, relative spatial positions (うえ, した, まえ, うしろ, なか, そと, となり, ちかく, あいだ), and exhaustive vs non-exhaustive listing (と vs や...など).',
    sections: [
      { id: 'l10-1', title: 'Lesson 10 Vocabulary', page: 45, completed: false },
      { id: 'l10-2', title: 'あります vs います and Location Patterns', page: 46, completed: false },
      { id: 'l10-3', title: 'Spatial Postpositions and や / など', page: 47, completed: false }
    ]
  },
  {
    id: 'mat-lesson11-grammar',
    name: 'Lesson 11 — Japanese Counters & Quantity Expressions',
    title: 'Lesson 11: জাপানি গণক শব্দ ও পরিমাপক (Counters & Frequency)',
    category: 'Grammar',
    type: 'PDF',
    assignedWeek: 6,
    chapterLesson: 'Minna no Nihongo Lesson 11',
    pageRange: 'Pages 48-51, 68-73',
    totalPages: 6,
    sourceFile: 'Uploaded N5 Japanese Study Material',
    status: 'Not Started',
    summary: 'Counting objects with ひとつ〜とお, people (ひとり, ふたり, 〜にん), flat objects (〜まい), machines/vehicles (〜だい), frequency (1か月に 2かい), and duration (〜じかん, 〜かげつ, 〜ねん).',
    sections: [
      { id: 'l11-1', title: 'General & Specific Counters List', page: 48, completed: false },
      { id: 'l11-2', title: 'Counter Placement in Sentences', page: 50, completed: false },
      { id: 'l11-3', title: 'Period Frequency & だけ Limitation', page: 51, completed: false }
    ]
  },
  {
    id: 'mat-lesson12-grammar',
    name: 'Lesson 12 — Comparisons & Superlatives (より, どちらが, いちばん)',
    title: 'Lesson 12: তুলনা ও শ্রেষ্ঠত্ব প্রকাশ (Comparative & Superlative)',
    category: 'Grammar',
    type: 'PDF',
    assignedWeek: 7,
    chapterLesson: 'Minna no Nihongo Lesson 12',
    pageRange: 'Pages 52-55, 74-79',
    totalPages: 6,
    sourceFile: 'Uploaded N5 Japanese Study Material',
    status: 'Not Started',
    summary: 'Comparing two nouns (N1 は N2 より Adj です), choosing between two options (N1 と N2 と どちらが Adj ですか → N1 の ほうが Adj です), and superlative choice among a group (N1 [の なかで] なにがいちばん Adj ですか).',
    sections: [
      { id: 'l12-1', title: 'Lesson 12 Vocabulary', page: 52, completed: false },
      { id: 'l12-2', title: 'Comparatives with より and どちらが', page: 54, completed: false },
      { id: 'l12-3', title: 'Superlatives with いちばん', page: 55, completed: false }
    ]
  },
  {
    id: 'mat-lesson13-grammar',
    name: 'Lesson 13 — Desires & Purpose of Motion (ほしい, 〜たい, 〜に行く)',
    title: 'Lesson 13: চাওয়া-পাওয়া ও উদ্দেশ্যমূলক গমনাগমন (Wishes & Purpose)',
    category: 'Grammar',
    type: 'PDF',
    assignedWeek: 9,
    chapterLesson: 'Minna no Nihongo Lesson 13',
    pageRange: 'Pages 56-58, 80-84',
    totalPages: 6,
    sourceFile: 'Uploaded N5 Japanese Study Material',
    status: 'Not Started',
    summary: 'Desiring objects with N が ほしいです, desiring to do actions with Verb-stem + たいです, and moving with purpose Place へ V-stem / N に 行きます/来ます/帰ります.',
    sections: [
      { id: 'l13-1', title: 'Lesson 13 Vocabulary', page: 56, completed: false },
      { id: 'l13-2', title: 'Desires: ほしい vs 〜たいです', page: 57, completed: false },
      { id: 'l13-3', title: 'Motion with Purpose: 〜に いきます', page: 58, completed: false }
    ]
  },
  {
    id: 'mat-lesson14-grammar',
    name: 'Lesson 14 — Verb Groups & Te-form (て形) Conjugation Rules',
    title: 'Lesson 14: ক্রিয়াপদের ৩টি গ্রুপ ও তে-ফরম (Te-Form Engine)',
    category: 'Grammar',
    type: 'PDF',
    assignedWeek: 9,
    chapterLesson: 'Minna no Nihongo Lesson 14',
    pageRange: 'Pages 59-63, 85-91',
    totalPages: 7,
    sourceFile: 'Uploaded N5 Japanese Study Material',
    status: 'Not Started',
    summary: 'Group 1 (Godan), Group 2 (Ichidan), and Group 3 (Irregular) classifications. Rules for converting to Te-form (〜って, 〜んで, 〜いて, 〜いで, 〜して), requests with 〜てください, present progressive 〜ています, and offers with 〜ましょうか.',
    sections: [
      { id: 'l14-1', title: 'Group 1, 2, 3 Verb Identification', page: 61, completed: false },
      { id: 'l14-2', title: 'Te-form Transformation Matrix', page: 61, completed: false },
      { id: 'l14-3', title: '〜てください, 〜ています, 〜ましょうか', page: 62, completed: false }
    ]
  },
  {
    id: 'mat-lesson15-grammar',
    name: 'Lesson 15 — Permission, Prohibition & Continuing State (〜てもいい, 〜てはいけない)',
    title: 'Lesson 15: অনুমতি, নিষেধ ও দীর্ঘস্থায়ী অবস্থা',
    category: 'Grammar',
    type: 'PDF',
    assignedWeek: 10,
    chapterLesson: 'Minna no Nihongo Lesson 15',
    pageRange: 'Pages 64-66, 92-94',
    totalPages: 5,
    sourceFile: 'Uploaded N5 Japanese Study Material',
    status: 'Not Started',
    summary: 'Asking and giving permission (〜ても いいですか / 〜ても いいです), strictly prohibiting (〜ては いけません), and describing habitual / persistent states (けっこんしています, すんでいます, もっています, しっています).',
    sections: [
      { id: 'l15-1', title: 'Lesson 15 Vocabulary', page: 64, completed: false },
      { id: 'l15-2', title: 'Permission & Prohibition Patterns', page: 65, completed: false },
      { id: 'l15-3', title: 'Special Persistent State 〜ています Verbs', page: 65, completed: false }
    ]
  },
  {
    id: 'mat-lesson16-grammar',
    name: 'Lesson 16 — Sequential Actions & Adjective Te-forms (V1て V2, V1てから V2)',
    title: 'Lesson 16: ধারাবাহিক কর্মকাণ্ড ও বিশেষণের সংযোগ',
    category: 'Grammar',
    type: 'PDF',
    assignedWeek: 10,
    chapterLesson: 'Minna no Nihongo Lesson 16',
    pageRange: 'Pages 67-70, 95-99',
    totalPages: 6,
    sourceFile: 'Uploaded N5 Japanese Study Material',
    status: 'Not Started',
    summary: 'Connecting multiple actions sequentially with V1て, V2て, V3ます; doing V2 strictly after finishing V1 with V1てから V2; connecting adjectives (い-adj -> くて, な-adj -> で); and topic-attribute pattern N1 は N2 が Adj.',
    sections: [
      { id: 'l16-1', title: 'Lesson 16 Vocabulary', page: 67, completed: false },
      { id: 'l16-2', title: 'Sequential Verbs & Adjective Te-form', page: 69, completed: false },
      { id: 'l16-3', title: 'V1てから V2 & Attribute Descriptions', page: 70, completed: false }
    ]
  },
  {
    id: 'mat-lesson17-grammar',
    name: 'Lesson 17 — Nai-form (ない形) & Negative Requests / Obligations',
    title: 'Lesson 17: নাই-ফরম, নিষেধ, বাধ্যবাধকতা ও ছাড়',
    category: 'Grammar',
    type: 'PDF',
    assignedWeek: 10,
    chapterLesson: 'Minna no Nihongo Lesson 17',
    pageRange: 'Pages 71-73, 100-106',
    totalPages: 7,
    sourceFile: 'Uploaded N5 Japanese Study Material',
    status: 'Not Started',
    summary: 'Conjugating to Nai-form (ない形), polite negative requests (〜ないで ください), necessity/obligation (〜なければ なりません), lack of obligation (〜なくても いいです), and deadline particle までに.',
    sections: [
      { id: 'l17-1', title: 'Lesson 17 Vocabulary', page: 71, completed: false },
      { id: 'l17-2', title: 'Nai-form Conjugation Rules', page: 72, completed: false },
      { id: 'l17-3', title: 'Obligation & Permission (なければ / なくてもいい)', page: 72, completed: false }
    ]
  },
  {
    id: 'mat-lesson18-grammar',
    name: 'Lesson 18 — Dictionary Form (辞書形), Ability & Hobbies',
    title: 'Lesson 18: ডিকশনারি ফরম, সামর্থ্য, শখ ও পূর্ববর্তী সময়সূচী',
    category: 'Grammar',
    type: 'PDF',
    assignedWeek: 10,
    chapterLesson: 'Minna no Nihongo Lesson 18',
    pageRange: 'Pages 74-77, 107-112',
    totalPages: 7,
    sourceFile: 'Uploaded N5 Japanese Study Material',
    status: 'Not Started',
    summary: 'Conjugating verbs to Dictionary Form (辞書形), expressing ability (〜ことが できます), stating hobbies (わたしの しゅみは 〜ことです), and sequential time before (V-dic / Nの / Time + まえに).',
    sections: [
      { id: 'l18-1', title: 'Lesson 18 Vocabulary', page: 74, completed: false },
      { id: 'l18-2', title: 'Dictionary Form Conjugation Rules', page: 75, completed: false },
      { id: 'l18-3', title: 'Ability (〜ことができます) & 〜まえに', page: 75, completed: false }
    ]
  },
  {
    id: 'mat-lesson19-grammar',
    name: 'Lesson 19 — Ta-form (た形), Past Experience & Becoming (〜たことがある, 〜たり〜たり)',
    title: 'Lesson 19: তা-ফরম, পূর্ব অভিজ্ঞতা, বিভিন্ন কাজ ও অবস্থান্তর',
    category: 'Grammar',
    type: 'PDF',
    assignedWeek: 11,
    chapterLesson: 'Minna no Nihongo Lesson 19',
    pageRange: 'Pages 78-80, 113-118',
    totalPages: 6,
    sourceFile: 'Uploaded N5 Japanese Study Material',
    status: 'Not Started',
    summary: 'Ta-form (た形) past inflection, expressing past life experiences with Vた ことが あります, representative non-chronological actions with 〜たり〜たり します, and change of state (〜くなります / 〜になります).',
    sections: [
      { id: 'l19-1', title: 'Lesson 19 Vocabulary', page: 78, completed: false },
      { id: 'l19-2', title: 'Ta-form Conjugation & Experience Pattern', page: 79, completed: false },
      { id: 'l19-3', title: '〜たり〜たり & Change of State (なります)', page: 79, completed: false }
    ]
  },
  {
    id: 'mat-lesson20-grammar',
    name: 'Lesson 20 — Plain Style (普通形) & Casual Japanese Conversation',
    title: 'Lesson 20: চলিত রীতি বা প্লেইন ফরম (Casual Conversational Style)',
    category: 'Grammar',
    type: 'PDF',
    assignedWeek: 11,
    chapterLesson: 'Minna no Nihongo Lesson 20',
    pageRange: 'Pages 81-83, 119-123',
    totalPages: 6,
    sourceFile: 'Uploaded N5 Japanese Study Material',
    status: 'Not Started',
    summary: 'Polite (丁寧形) vs Plain style (普通形) conversion matrix for Verbs, い-Adjectives, な-Adjectives, and Nouns in all 4 tenses; dropping particles in casual conversation; and casual conjunction けど.',
    sections: [
      { id: 'l20-1', title: 'Lesson 20 Vocabulary', page: 81, completed: false },
      { id: 'l20-2', title: 'Polite vs Plain Transformation Table', page: 82, completed: false },
      { id: 'l20-3', title: 'Casual Dialogue Mechanics', page: 83, completed: false }
    ]
  },
  {
    id: 'mat-lesson21-grammar',
    name: 'Lesson 21 — Thoughts, Quotes & Predictions (〜と思う, 〜と言う, 〜でしょう)',
    title: 'Lesson 21: মতামত, উক্তি ও সম্ভাবনা প্রকাশ (Thoughts & Quotes)',
    category: 'Grammar',
    type: 'PDF',
    assignedWeek: 11,
    chapterLesson: 'Minna no Nihongo Lesson 21',
    pageRange: 'Pages 84-87, 124-128',
    totalPages: 6,
    sourceFile: 'Uploaded N5 Japanese Study Material',
    status: 'Not Started',
    summary: 'Expressing personal opinions with Plain Form + と 思います (I think that...), direct and indirect quotes with Plain Form + と 言いました, and probabilistic predictions with Plain Form + でしょう.',
    sections: [
      { id: 'l21-1', title: 'Lesson 21 Vocabulary', page: 84, completed: false },
      { id: 'l21-2', title: 'Thoughts & Opinions (〜と 思います)', page: 86, completed: false },
      { id: 'l21-3', title: 'Quotes and Probability (〜でしょう)', page: 86, completed: false }
    ]
  },
  {
    id: 'mat-lesson22-grammar',
    name: 'Lesson 22 — Noun Modification Clauses (連体修飾)',
    title: 'Lesson 22: বাক্য দ্বারা বিশেষ্যের বর্ণনা (Noun Modifying Clauses)',
    category: 'Grammar',
    type: 'PDF',
    assignedWeek: 11,
    chapterLesson: 'Minna no Nihongo Lesson 22',
    pageRange: 'Pages 88-90, 129-131',
    totalPages: 4,
    sourceFile: 'Uploaded N5 Japanese Study Material',
    status: 'Not Started',
    summary: 'Modifying nouns with short form verb phrases (e.g. わたしが 作った ケーキ, 日本へ 行く 人, ミラーさんが すんでいた うち), and time/errand appointments (〜時間 / 約束 / 用事).',
    sections: [
      { id: 'l22-1', title: 'Lesson 22 Vocabulary', page: 88, completed: false },
      { id: 'l22-2', title: 'Noun Modification Clause Grammar', page: 89, completed: false },
      { id: 'l22-3', title: 'Time / Promise / Errand Constructions', page: 90, completed: false }
    ]
  },
  {
    id: 'mat-lesson23-grammar',
    name: 'Lesson 23 — Temporal & Inevitable Conditionals (〜とき, 〜と)',
    title: 'Lesson 23: যখন...তখন (〜とき) ও যদি/তাহলে প্রাকৃতিক সংযোগ (〜と)',
    category: 'Grammar',
    type: 'PDF',
    assignedWeek: 12,
    chapterLesson: 'Minna no Nihongo Lesson 23',
    pageRange: 'Pages 91-94, 132-135',
    totalPages: 6,
    sourceFile: 'Uploaded N5 Japanese Study Material',
    status: 'Not Started',
    summary: 'Actions when something occurs with 〜とき (using V-dic before action, V-ta after action), natural / mechanical result with V-dic + と (ボタンを押すと、おつりが出ます), and movement across path (道 を わたります).',
    sections: [
      { id: 'l23-1', title: 'Lesson 23 Vocabulary', page: 91, completed: false },
      { id: 'l23-2', title: '〜とき Temporal Clauses', page: 93, completed: false },
      { id: 'l23-3', title: 'V-dic + と Inevitable Result & Path を', page: 94, completed: false }
    ]
  },
  {
    id: 'mat-lesson24-grammar',
    name: 'Lesson 24 — Giving & Receiving Actions (〜てあげる, 〜てもらう, 〜てくれる)',
    title: 'Lesson 24: কাজ করে দেওয়া ও নেওয়ার সৌজন্য প্রকাশ (Giving & Receiving Favors)',
    category: 'Grammar',
    type: 'PDF',
    assignedWeek: 12,
    chapterLesson: 'Minna no Nihongo Lesson 24',
    pageRange: 'Pages 95-96, 136-138',
    totalPages: 4,
    sourceFile: 'Uploaded N5 Japanese Study Material',
    status: 'Not Started',
    summary: 'Giving items/favors to others (あげます / 〜てあげます), receiving items/favors from others (もらいます / 〜てもらいます), and someone giving to me or my in-group (くれます / 〜てくれます).',
    sections: [
      { id: 'l24-1', title: 'Lesson 24 Vocabulary', page: 95, completed: false },
      { id: 'l24-2', title: 'くれます vs あげます / もらいます', page: 95, completed: false },
      { id: 'l24-3', title: 'Vて あげます / もらいます / くれます', page: 95, completed: false }
    ]
  },
  {
    id: 'mat-lesson25-grammar',
    name: 'Lesson 25 — Hypothetical Conditionals & Concessives (〜たら, 〜ても)',
    title: 'Lesson 25: শর্তযুক্ত বাক্য (〜たら) ও সত্ত্বেও (〜ても)',
    category: 'Grammar',
    type: 'PDF',
    assignedWeek: 12,
    chapterLesson: 'Minna no Nihongo Lesson 25',
    pageRange: 'Pages 97-98, 139-141',
    totalPages: 4,
    sourceFile: 'Uploaded N5 Japanese Study Material',
    status: 'Not Started',
    summary: 'Conditional if/when with Plain Past + ら (Vたら, Aかったら, Na/N だったら), concessive even if with Te-form + も (Vても, Aくても, Na/N でも), and adverbs もし & いくら.',
    sections: [
      { id: 'l25-1', title: 'Lesson 25 Vocabulary', page: 97, completed: false },
      { id: 'l25-2', title: 'Conditional 〜たら Rules', page: 97, completed: false },
      { id: 'l25-3', title: 'Concessive 〜ても (Even if...) Rules', page: 98, completed: false }
    ]
  },
  {
    id: 'mat-interview-demo',
    name: 'Japanese Interview Demo Q&A Script',
    title: 'জাপানি ইন্টারভিউ প্র্যাকটিস স্ক্রিপ্ট (Speaking & Interview Questions)',
    category: 'Speaking',
    type: 'PDF',
    assignedWeek: 9,
    chapterLesson: 'Speaking Challenge & NAT/JLPT Oral Prep',
    pageRange: 'Pages 133-135',
    totalPages: 3,
    sourceFile: 'Uploaded N5 Japanese Study Material',
    status: 'Not Started',
    summary: '25 Standard interview questions & responses: self introduction (自己紹介), age, birthplace, family members, reasons for studying Japanese, hobby, and JLPT/study plans.',
    sections: [
      { id: 'iv-1', title: 'Self-Introduction & Entry Greeting', page: 133, completed: false },
      { id: 'iv-2', title: 'Personal Background & Reasons for Japan', page: 134, completed: false },
      { id: 'iv-3', title: 'Study Habits & Future Ambitions', page: 135, completed: false }
    ]
  },
  {
    id: 'mat-modeltest-1',
    name: 'Official JLPT N5 Model Mock Test 1',
    title: 'JLPT N5 ফুল মডেল মক টেস্ট ১ (Vocabulary + Grammar + Reading + Listening)',
    category: 'Mock Test',
    type: 'PDF',
    assignedWeek: 4,
    chapterLesson: 'Full Mock Test 1 with Answer Key & Script',
    pageRange: 'Complete Set (Vocabulary 35 Qs, Grammar/Reading 32 Qs, Listening 24 Qs)',
    totalPages: 48,
    sourceFile: 'Official JLPT N5 Problem Book',
    status: 'Not Started',
    summary: 'Full JLPT N5 simulation test with exact timing: Language Knowledge (25m), Grammar & Reading (50m), Listening (30m), complete with official audio scripts and answer explanations.',
    sections: [
      { id: 'mt1-1', title: 'Language Knowledge (Moji/Goi) - 35 Questions', page: 1, completed: false },
      { id: 'mt1-2', title: 'Grammar & Reading Comprehension - 32 Questions', page: 11, completed: false },
      { id: 'mt1-3', title: 'Listening Comprehension Simulation with Audio Script', page: 28, completed: false }
    ]
  },
  {
    id: 'mat-modeltest-2',
    name: 'Official JLPT N5 Model Mock Test 2',
    title: 'JLPT N5 ফুল মডেল মক টেস্ট ২ (Comprehensive N5 Exam)',
    category: 'Mock Test',
    type: 'PDF',
    assignedWeek: 8,
    chapterLesson: 'Full Mock Test 2',
    pageRange: 'Complete Set',
    totalPages: 45,
    sourceFile: 'Official JLPT N5 Problem Book',
    status: 'Not Started',
    summary: 'Comprehensive mid-way assessment evaluating grammar mastery, vocabulary recall, reading speed, and auditory comprehension.',
    sections: [
      { id: 'mt2-1', title: 'Language Knowledge (Vocabulary)', page: 1, completed: false },
      { id: 'mt2-2', title: 'Grammar & Reading', page: 15, completed: false },
      { id: 'mt2-3', title: 'Listening Questions', page: 30, completed: false }
    ]
  },
  {
    id: 'mat-modeltest-3',
    name: 'Official JLPT N5 Model Mock Test 3',
    title: 'JLPT N5 ফুল মডেল মক টেস্ট ৩ (Final Stage Exam Simulation)',
    category: 'Mock Test',
    type: 'PDF',
    assignedWeek: 11,
    chapterLesson: 'Full Mock Test 3',
    pageRange: 'Complete Set',
    totalPages: 45,
    sourceFile: 'Official JLPT N5 Problem Book',
    status: 'Not Started',
    summary: 'Full length test simulation for week 11 benchmarking preparation readiness before final review.',
    sections: [
      { id: 'mt3-1', title: 'Vocabulary & Kanji', page: 1, completed: false },
      { id: 'mt3-2', title: 'Grammar Star Arrangement & Reading', page: 12, completed: false },
      { id: 'mt3-3', title: 'Listening Test', page: 26, completed: false }
    ]
  }
];
