import { ExamQuestion } from '../types';

export const QUESTIONS_DATABASE: ExamQuestion[] = [
  // 1. Kanji Reading (Moji/Goi Mondai 1)
  {
    id: 'q-001',
    category: 'Kanji',
    week: 1,
    lesson: 1,
    questionText: 'あした <ruby>何時<rt>なんじ</rt></ruby>に <ruby>大学<rt>・・</rt></ruby>へ 行きますか。',
    options: ['だいがく', 'たいがく', 'おおがく', 'だいかく'],
    correctOptionIndex: 0,
    explanation: '「大学」is read as だいがく (daigaku), meaning University/College. (大 = だい, 学 = がく).',
    explanationBangla: '「大学」শব্দের সঠিক রিডিং হলো だいがく (বিশ্ববিদ্যালয়)।'
  },
  {
    id: 'q-002',
    category: 'Kanji',
    week: 1,
    lesson: 1,
    questionText: 'あの <ruby>人<rt>・</rt></ruby>は だれですか。',
    options: ['ひと', 'おとこ', 'おんな', 'かた'],
    correctOptionIndex: 0,
    explanation: '「人」as a standalone word is read as ひと (hito), meaning person.',
    explanationBangla: 'একক শব্দ হিসেবে「人」এর কুন্যোমি উচ্চারণ হলো ひと (মানুষ/ব্যক্তি)।'
  },
  {
    id: 'q-003',
    category: 'Kanji',
    week: 1,
    lesson: 1,
    questionText: 'わたしは <ruby>日本<rt>・・</rt></ruby>の くるまが すきです。',
    options: ['にほん', 'にっぽん', 'にほんご', 'にっほん'],
    correctOptionIndex: 0,
    explanation: '「日本」is standardly read as にほん (nihon) or にっぽん (nippon). Here にほん is the standard choice.',
    explanationBangla: '「日本」এর সাধারণ উচ্চারণ にほん (জাপান)।'
  },
  {
    id: 'q-004',
    category: 'Kanji',
    week: 2,
    lesson: 2,
    questionText: 'つくえの うえに <ruby>本<rt>・</rt></ruby>が あります。',
    options: ['ほん', 'ぼん', 'ぽん', 'き'],
    correctOptionIndex: 0,
    explanation: '「本」is read as ほん (hon), meaning book.',
    explanationBangla: '「本」এর উচ্চারণ ほん (বই)।'
  },
  {
    id: 'q-005',
    category: 'Kanji',
    week: 2,
    lesson: 2,
    questionText: 'まいあさ <ruby>新聞<rt>・・</rt></ruby>を よみます。',
    options: ['しんぶん', 'しんもん', 'じんぶん', 'しぶん'],
    correctOptionIndex: 0,
    explanation: '「新聞」is read as しんぶん (shinbun), meaning newspaper. (新 = しん, 聞 = ぶん).',
    explanationBangla: '「新聞」এর উচ্চারণ しんぶん (সংবাদপত্র)।'
  },
  {
    id: 'q-006',
    category: 'Kanji',
    week: 2,
    lesson: 2,
    questionText: 'この <ruby>時計<rt>・・</rt></ruby>は たかいです。',
    options: ['とけい', 'じけい', 'ときけい', 'どけい'],
    correctOptionIndex: 0,
    explanation: '「時計」is read as とけい (tokei), meaning watch or clock.',
    explanationBangla: '「時計」এর উচ্চারণ とけい (ঘড়ি)।'
  },
  {
    id: 'q-007',
    category: 'Kanji',
    week: 3,
    lesson: 4,
    questionText: '<ruby>今<rt>・</rt></ruby>、なんじですか。',
    options: ['いま', 'きょう', 'あさ', 'ひる'],
    correctOptionIndex: 0,
    explanation: '「今」is read as いま (ima), meaning now.',
    explanationBangla: '「今」এর অর্থ এবং সঠিক উচ্চারণ হলো いま (এখন)।'
  },
  {
    id: 'q-008',
    category: 'Kanji',
    week: 3,
    lesson: 4,
    questionText: '<ruby>毎朝<rt>・・</rt></ruby> 6じに おきます。',
    options: ['まいあさ', 'まいばん', 'まいひる', 'まいちょう'],
    correctOptionIndex: 0,
    explanation: '「毎朝」is read as まいあさ (maiasa), meaning every morning.',
    explanationBangla: '「毎朝」এর উচ্চারণ まいあさ (প্রতিদিন সকাল)।'
  },
  {
    id: 'q-009',
    category: 'Kanji',
    week: 3,
    lesson: 5,
    questionText: '<ruby>電車<rt>・・</rt></ruby>で かいしゃへ 行きます。',
    options: ['でんしゃ', 'でんしゃあ', 'てんしゃ', 'でんちゃ'],
    correctOptionIndex: 0,
    explanation: '「電車」is read as でんしゃ (densha), meaning electric train.',
    explanationBangla: '「電車」এর উচ্চারণ でんしゃ (বৈদ্যুতিক ট্রেন)।'
  },
  {
    id: 'q-010',
    category: 'Kanji',
    week: 3,
    lesson: 5,
    questionText: '<ruby>友達<rt>・・</rt></ruby>と えいがを みました。',
    options: ['ともだち', 'ゆうだち', 'ともたち', 'ゆうじん'],
    correctOptionIndex: 0,
    explanation: '「友達」is read as ともだち (tomodachi), meaning friend.',
    explanationBangla: '「友達」এর উচ্চারণ ともだち (বন্ধু)।'
  },
  {
    id: 'q-011',
    category: 'Kanji',
    week: 5,
    lesson: 8,
    questionText: 'あの やまは <ruby>高い<rt>・・</rt></ruby>です。',
    options: ['たかい', 'ひくい', 'あかるい', 'ながい'],
    correctOptionIndex: 0,
    explanation: '「高い」is read as たかい (takai), meaning tall or expensive.',
    explanationBangla: '「高い」উচ্চারণ たかい (উঁচু / দামী)।'
  },
  {
    id: 'q-012',
    category: 'Kanji',
    week: 5,
    lesson: 8,
    questionText: '京都は <ruby>古い<rt>・・</rt></ruby> まちです。',
    options: ['ふるい', 'あたらしい', 'ひろい', 'ちいさい'],
    correctOptionIndex: 0,
    explanation: '「古い」is read as ふるい (furui), meaning old (for inanimate things).',
    explanationBangla: '「古い」উচ্চারণ ふるい (পুরাতন)।'
  },
  {
    id: 'q-013',
    category: 'Kanji',
    week: 6,
    lesson: 10,
    questionText: 'つくえの <ruby>下<rt>・</rt></ruby>に ねこが います。',
    options: ['した', 'うえ', 'なか', 'まえ'],
    correctOptionIndex: 0,
    explanation: '「下」is read as した (shita), meaning under / below.',
    explanationBangla: '「下」উচ্চারণ した (নিচে)।'
  },
  {
    id: 'q-014',
    category: 'Kanji',
    week: 6,
    lesson: 10,
    questionText: 'ぎんこうの <ruby>前<rt>・</rt></ruby>に くるまが あります。',
    options: ['まえ', 'うしろ', 'みぎ', 'ひだり'],
    correctOptionIndex: 0,
    explanation: '「前」is read as まえ (mae), meaning in front of / before.',
    explanationBangla: '「前」উচ্চারণ まえ (সামনে)।'
  },
  {
    id: 'q-015',
    category: 'Kanji',
    week: 7,
    lesson: 11,
    questionText: 'きょうしつに がくせいが <ruby>五人<rt>・・</rt></ruby> います。',
    options: ['ごにん', 'ごじん', 'いつにん', 'ごり'],
    correctOptionIndex: 0,
    explanation: '「五人」is read as ごにん (gonin), meaning 5 people.',
    explanationBangla: '「五人」উচ্চারণ ごにん (৫ জন ব্যক্তি)।'
  },

  // 2. Grammar Particle Selection (Mondai 1 Bunpou)
  {
    id: 'q-016',
    category: 'Grammar',
    week: 1,
    lesson: 1,
    questionText: 'わたし（　　）マイク・ミラーです。',
    options: ['は', 'が', 'を', 'に'],
    correctOptionIndex: 0,
    explanation: 'Topic marker particle は (pronounced wa) is used after the subject/topic: わたしは マイク・ミラーです。',
    explanationBangla: 'বিষয়বস্তু বা টপিক নির্দেশ করতে は (উচ্চারণ ওয়া) বসে।'
  },
  {
    id: 'q-017',
    category: 'Grammar',
    week: 1,
    lesson: 1,
    questionText: 'ミラーさんは アメリカじんです。スミスさん（　　）アメリカじんです。',
    options: ['も', 'は', 'の', 'か'],
    correctOptionIndex: 0,
    explanation: 'Particle も means "also / too". Smith-san is ALSO an American.',
    explanationBangla: '“ও / এছাড়াও” বোঝাতে も বসে (স্মিথ সাহেবও আমেরিকান)।'
  },
  {
    id: 'q-018',
    category: 'Grammar',
    week: 1,
    lesson: 1,
    questionText: 'これは だれ（　　）かばんですか。',
    options: ['の', 'は', 'も', 'と'],
    correctOptionIndex: 0,
    explanation: 'Possessive particle の connects two nouns: だれの かばん (whose bag).',
    explanationBangla: 'মালিকানা বোঝাতে বিশেষ্যের মাঝে の পার্টিকেল বসে।'
  },
  {
    id: 'q-019',
    category: 'Grammar',
    week: 2,
    lesson: 2,
    questionText: '（　　）ほんは わたしのです。',
    options: ['この', 'これ', 'ここ', 'こちら'],
    correctOptionIndex: 0,
    explanation: 'Before a noun (ほん), demonstrative adjective この must be used. これ cannot precede a noun directly.',
    explanationBangla: 'বিশেষ্য (ほん) এর পূর্বে সরাসরি この বসে।'
  },
  {
    id: 'q-020',
    category: 'Grammar',
    week: 2,
    lesson: 3,
    questionText: 'おてあらいは（　　）ですか。あそこです。',
    options: ['どこ', 'だれ', 'なん', 'いくら'],
    correctOptionIndex: 0,
    explanation: 'Asking for place/location requires どこ (Where).',
    explanationBangla: 'স্থান সম্পর্কে জানতে どこ (কোথায়) ব্যবহৃত হয়।'
  },
  {
    id: 'q-021',
    category: 'Grammar',
    week: 3,
    lesson: 4,
    questionText: 'まいあさ 7じ（　　）おきます。',
    options: ['に', 'で', 'を', 'へ'],
    correctOptionIndex: 0,
    explanation: 'Specific specific clock time takes particle に (7時に).',
    explanationBangla: 'নির্দিষ্ট সময়ের সাথে に পার্টিকেল বসে।'
  },
  {
    id: 'q-022',
    category: 'Grammar',
    week: 3,
    lesson: 4,
    questionText: 'かいしゃは 9じ（　　）5じ（　　）です。',
    options: ['から／まで', 'に／で', 'へ／から', 'まで／から'],
    correctOptionIndex: 0,
    explanation: 'From ... to ... is expressed by から ... まで.',
    explanationBangla: '...হতে ...পর্যন্ত বোঝাতে から এবং まで বসে।'
  },
  {
    id: 'q-023',
    category: 'Grammar',
    week: 3,
    lesson: 5,
    questionText: 'きょう とうきょう（　　）行きます。',
    options: ['へ', 'を', 'で', 'が'],
    correctOptionIndex: 0,
    explanation: 'Destination of motion verbs (いきます/きます/かえります) is marked by へ (pronounced e) or に.',
    explanationBangla: 'গমন ক্রিয়াপদের গন্তব্যের ক্ষেত্রে দিক নির্দেশক へ বা に বসে।'
  },
  {
    id: 'q-024',
    category: 'Grammar',
    week: 3,
    lesson: 5,
    questionText: 'えきから うちまで あるいて（　　）かえりました。',
    options: ['（なし）', 'で', 'に', 'を'],
    correctOptionIndex: 0,
    explanation: 'あるいて (on foot) does not take any particle like で. It is used as an adverb alone.',
    explanationBangla: 'あるいて (পায়ে হেঁটে) শব্দের পর কোনো পার্টিকেল বসে না।'
  },
  {
    id: 'q-025',
    category: 'Grammar',
    week: 4,
    lesson: 6,
    questionText: 'あさごはん（　　）パンを たべました。',
    options: ['に', 'で', 'へ', 'を'],
    correctOptionIndex: 0,
    explanation: 'Using に for meal purpose/setting: あさごはんに (for breakfast).',
    explanationBangla: 'খাবারের উপলক্ষ বোঝাতে に ব্যবহৃত হয় (সকালের নাস্তায়)।'
  },
  {
    id: 'q-026',
    category: 'Grammar',
    week: 4,
    lesson: 6,
    questionText: 'レストラン（　　）ひるごはんを たべます。',
    options: ['で', 'に', 'へ', 'を'],
    correctOptionIndex: 0,
    explanation: 'Action location particle で is used where an active action occurs.',
    explanationBangla: 'যে স্থানে কোনো কাজ সম্পন্ন হয়, সেখানে で পার্টিকেল বসে।'
  },
  {
    id: 'q-027',
    category: 'Grammar',
    week: 5,
    lesson: 8,
    questionText: 'にほんの たべものは おいしいです（　　）、たかいです。',
    options: ['が', 'から', 'そして', 'でも'],
    correctOptionIndex: 0,
    explanation: 'Contrastive conjunction が (but/however) joins two clauses: delicious BUT expensive.',
    explanationBangla: 'বিপরীতমুখী ভাব প্রকাশের জন্য বাক্যাংশের মাঝে が (কিন্তু) বসে।'
  },
  {
    id: 'q-028',
    category: 'Grammar',
    week: 5,
    lesson: 9,
    questionText: 'わたしは クラシックおんがく（　　）すきです。',
    options: ['が', 'を', 'に', 'で'],
    correctOptionIndex: 0,
    explanation: 'Adjectives expressing likes/dislikes (すき/きらい/じょうず/へた) mark their object with が.',
    explanationBangla: 'পছন্দ, অপছন্দ বা দক্ষতার ক্ষেত্রে অবজেক্টের পর が পার্টিকেল বসে।'
  },
  {
    id: 'q-029',
    category: 'Grammar',
    week: 6,
    lesson: 10,
    questionText: 'へやに テレビ（　　）ベッド（　　）が あります。',
    options: ['や／など', 'と／と', 'も／も', 'から／まで'],
    correctOptionIndex: 0,
    explanation: 'Non-exhaustive listing of items is marked by や and followed by など (and things like...).',
    explanationBangla: 'উদাহরণমূলক অপূর্ণাঙ্গ তালিকার ক্ষেত্রে や এবং শেষে など বসে।'
  },
  {
    id: 'q-030',
    category: 'Grammar',
    week: 7,
    lesson: 12,
    questionText: 'ひこうきは でんしゃ（　　）はやいです。',
    options: ['より', 'ほど', 'から', 'まで'],
    correctOptionIndex: 0,
    explanation: 'Comparative pattern N1 は N2 より Adj: Airplane is faster THAN train.',
    explanationBangla: 'তুলনায় “অপেক্ষা / চেয়ে” বোঝাতে より বসে।'
  },

  // 3. Star Word Ordering (Mondai 2 Bun no Kumitate ★)
  {
    id: 'q-031',
    category: 'Grammar',
    week: 4,
    lesson: 6,
    questionText: 'わたしは　昨日　____　____　★　____　買い物を しました。',
    starPosition: 3,
    options: ['デパートで', '友達', 'と', 'いっしょに'],
    correctOptionIndex: 2, // Arrangement: 友達(2) と(3) いっしょに(4) デパートで(1) -> 3rd position is 4 (いっしょに) or 友達 と デパートで いっしょに
    explanation: 'Correct sentence arrangement: わたしは 昨日 【友達】 【と】 【いっしょに★】 【デパートで】 買い物を しました。 The ★ is in the 3rd spot: いっしょに.',
    explanationBangla: 'সঠিক বাক্য গঠন: わたしは 昨日 友達 と ★いっしょに デパートで 買い物を しました। স্টার (★) স্থানে いっしょに বসবে।'
  },
  {
    id: 'q-032',
    category: 'Grammar',
    week: 6,
    lesson: 10,
    questionText: 'つくえの　____　____　★　____　あります。',
    starPosition: 3,
    options: ['うえに', 'ほん', 'が', 'さんさつ'],
    correctOptionIndex: 2,
    explanation: 'Correct sentence: つくえの 【うえに】 【ほん】 【が★】 【さんさつ】 あります。(Or ほんが さんさつ うえに). Standard: うえに ほん が★ さんさつ あります。',
    explanationBangla: 'সঠিক বিন্যাস: つくえの うえに ほん ★が さんさつ あります।'
  },
  {
    id: 'q-033',
    category: 'Grammar',
    week: 9,
    lesson: 14,
    questionText: 'すみませんが、　____　____　★　____　ください。',
    starPosition: 3,
    options: ['まどを', 'あけて', 'ちょっと', 'てつだって'],
    correctOptionIndex: 1,
    explanation: 'Correct arrangement: すみませんが、 【ちょっと】 【まどを】 【あけて★】 【てつだって】 ください or 【ちょっと】 【てつだって】 【まどを★】 【あけて】 ください。',
    explanationBangla: 'সঠিক বাক্য গঠন অনুযায়ী ৩ নম্বর স্থানে あけて বসবে।'
  },
  {
    id: 'q-034',
    category: 'Grammar',
    week: 10,
    lesson: 17,
    questionText: 'あしたは　____　____　★　____　なりません。',
    starPosition: 3,
    options: ['びょういんへ', 'いかなければ', '9じに', 'はやく'],
    correctOptionIndex: 1,
    explanation: 'Correct arrangement: あしたは 【9じに】 【はやく】 【びょういんへ★】 【いかなければ】 なりません。',
    explanationBangla: 'বাধ্যবাধকতার বাক্য বিন্যাস: びょういんへ ৩ নম্বর স্টার স্থানে বসবে।'
  },
  {
    id: 'q-035',
    category: 'Grammar',
    week: 11,
    lesson: 19,
    questionText: 'わたしは　____　____　★　____　あります。',
    starPosition: 3,
    options: ['ふじさんに', 'いちど', 'のぼった', 'ことが'],
    correctOptionIndex: 2,
    explanation: 'Correct arrangement: わたしは 【いちど】 【ふじさんに】 【のぼった★】 【ことが】 あります。(Vた ことが あります pattern).',
    explanationBangla: 'অভিজ্ঞতা প্রকাশের ফর্মুলা: いちど ふじさんに ★のぼった ことが あります।'
  },

  // 4. Vocabulary Context (Goi Contextual Usage)
  {
    id: 'q-036',
    category: 'Vocabulary',
    week: 2,
    lesson: 2,
    questionText: 'えんぴつで　字を　____。',
    options: ['かきます', 'ききます', 'のみます', 'たべます'],
    correctOptionIndex: 0,
    explanation: 'With a pencil (えんぴつで), you write characters: 字を かきます。',
    explanationBangla: 'পেন্সিল দিয়ে লেখা (かきます) হয়।'
  },
  {
    id: 'q-037',
    category: 'Vocabulary',
    week: 4,
    lesson: 6,
    questionText: 'こうえんで　しゃしんを　____。',
    options: ['とりました', 'のみました', 'よみました', 'あいました'],
    correctOptionIndex: 0,
    explanation: 'Taking a photo is しゃしんを とります (とりました in past tense).',
    explanationBangla: 'ছবি তোলার ক্ষেত্রে しゃしんを とります ব্যবহৃত হয়।'
  },
  {
    id: 'q-038',
    category: 'Vocabulary',
    week: 5,
    lesson: 8,
    questionText: 'この　おちゃは　____　おいしいです。',
    options: ['とても', 'あまり', 'ぜんぜん', 'すこし'],
    correctOptionIndex: 0,
    explanation: 'In positive sentence expressing enthusiasm, とても (very) fits best. (あまり and ぜんぜん require negative verbs/adjectives).',
    explanationBangla: 'ইতিবাচক বাক্যে জোর দিতে とても (খুবই) বসে।'
  },
  {
    id: 'q-039',
    category: 'Vocabulary',
    week: 6,
    lesson: 11,
    questionText: 'りんごを　____　かいました。',
    options: ['みっつ', 'さんまい', 'さんほん', 'さんだい'],
    correctOptionIndex: 0,
    explanation: 'Apples (apples are spherical/general objects) are counted using general counter みっつ (3 items).',
    explanationBangla: 'আপেল গণনার ক্ষেত্রে সাধারণ কাউন্টার みっつ (৩টি) প্রযোজ্য।'
  },
  {
    id: 'q-040',
    category: 'Vocabulary',
    week: 8,
    lesson: 13,
    questionText: 'のどが　かわきましたから、みずが　____です。',
    options: ['ほしい', 'すき', 'たかい', 'じょうず'],
    correctOptionIndex: 0,
    explanation: 'Because I am thirsty (のどが かわきました), I want water (みずが ほしいです).',
    explanationBangla: 'তৃষ্ণার্ত হলে পানি চাওয়া বোঝাতে みずが ほしいです ব্যবহৃত হয়।'
  },

  // 5. Reading Comprehension (Dokkai)
  {
    id: 'q-041',
    category: 'Reading',
    week: 4,
    lesson: 6,
    questionText: `【よんで こたえてください】
サントスさんは 毎朝 7時に 起きます。あさごはんを 食べて、8時に うちを 出ます。
バスで 会社へ 行きます。会社は 8時半から 5時までです。
きのうは 友達と レストランで ばんごはんを 食べました。

質問：サントスさんは 何で 会社へ 行きますか。`,
    options: ['バスで', 'でんしゃで', 'くるまで', 'あるいて'],
    correctOptionIndex: 0,
    explanation: 'Passage explicitly states:「バスで 会社へ 行きます。」(He goes to company by bus).',
    explanationBangla: 'অনুচ্ছেদে স্পষ্টভাবে বলা আছে: তিনি বাসে করে (バスで) অফিসে যান।'
  },
  {
    id: 'q-042',
    category: 'Reading',
    week: 7,
    lesson: 10,
    questionText: `【よんで こたえてください】
田中さんの へやには 机と ベッドが あります。
机の 上に パソコンと 本が あります。机の 下に かばんが あります。
へやの 中に テレビは ありません。

質問：机の 下に 何が ありますか。`,
    options: ['かばん', 'パソコン', 'ほん', 'テレビ'],
    correctOptionIndex: 0,
    explanation: 'The text states:「机の 下に かばんが あります。」(Under the desk there is a bag).',
    explanationBangla: 'টেবিলের নিচে ব্যাগ (かばん) রয়েছে।'
  },
  {
    id: 'q-043',
    category: 'Reading',
    week: 9,
    lesson: 14,
    questionText: `【メールの メッセージ】
ワンさんへ
あしたの 日曜日に いっしょに 海へ 行きませんか。
えきの 前で 9時に あいましょう。
くるまで 行きますから、べんとうと のみものを もって きてください。
水着（みずぎ）も わすれないでください。
山田より

質問：ワンさんは 何を もって 行かなければなりませんか。`,
    options: ['べんとう、のみもの、水着', 'くるま、水着、おかね', 'パソコン、ほん、べんとう', 'きっぷ、しゃしん、のみもの'],
    correctOptionIndex: 0,
    explanation: 'Yamada asks Wang to bring lunchbox, drinks (べんとうと のみもの), and swimming suit (水着も わすれないでください).',
    explanationBangla: 'ওয়ানকে সাথে করে লাঞ্চ বক্স, পানীয় ও সাঁতারের পোশাক নিয়ে যেতে বলা হয়েছে।'
  },

  // 6. Listening Audio Simulation Script Questions (Choukai)
  {
    id: 'q-044',
    category: 'Listening',
    week: 3,
    lesson: 4,
    questionText: `【ちょうかい スクリプト】
男の人：すみません、この としょかんは 何時までですか。
女の人：ごご 6時までです。
男の人：土曜日も あいていますか。
女の人：はい、土曜日は 5時までです。日曜日は やすみです。

質問：図書館は 日曜日に 何時まで あいていますか。`,
    options: ['あいていません（休みです）', '6時まで', '5時まで', '7時まで'],
    correctOptionIndex: 0,
    explanation: 'The woman said「日曜日は やすみです。」which means the library is closed on Sunday.',
    explanationBangla: 'মহিলাটি বলেছিলেন রবিবার লাইব্রেরি বন্ধ থাকে (やすみです)।'
  },
  {
    id: 'q-045',
    category: 'Listening',
    week: 5,
    lesson: 8,
    questionText: `【ちょうかい スクリプト】
男の人：木村さん、その かばんは あたらしいですね。どこで かいましたか。
女の人：きのう デパートで かいました。
男の人：いくらでしたか。
女の人：3,000えんでした。とても やすかったです。

質問：木村さんのかばんは いくらでしたか。`,
    options: ['3,000えん', '300えん', '13,000えん', '30,000えん'],
    correctOptionIndex: 0,
    explanation: 'Kimura clearly stated「3,000えんでした」(It was 3,000 yen).',
    explanationBangla: 'কিমুরা সান স্পষ্টভাবে বলেছিলেন যে ব্যাগটির দাম ৩,০০০ ইয়েন ছিল।'
  }
];

export function getExamQuestionsByWeek(weekNumber: number, count: number = 10): ExamQuestion[] {
  // Return questions up to the current week, biased towards the current week
  const eligible = QUESTIONS_DATABASE.filter(q => q.week <= weekNumber);
  const shuffled = [...eligible].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export function getAdaptiveExamQuestions(
  currentWeek: number,
  mistakeQuestionIds: string[],
  count: number = 10
): ExamQuestion[] {
  // Find questions the user previously made mistakes on
  const mistakeQuestions = QUESTIONS_DATABASE.filter(q => mistakeQuestionIds.includes(q.id));
  
  // Find regular questions for the current and prior weeks
  const regularQuestions = QUESTIONS_DATABASE.filter(
    q => q.week <= currentWeek && !mistakeQuestionIds.includes(q.id)
  );

  const selectedMistakes = mistakeQuestions.slice(0, Math.floor(count * 0.4)); // 40% weak areas
  const remainingCount = count - selectedMistakes.length;
  const selectedRegular = [...regularQuestions]
    .sort(() => Math.random() - 0.5)
    .slice(0, remainingCount);

  return [...selectedMistakes, ...selectedRegular].sort(() => Math.random() - 0.5);
}
