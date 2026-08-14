export interface KanjiDetail {
  id: number;
  kanji: string;
  strokes: number;
  onyomi: string[]; // e.g. ["サン"]
  kunyomi: string[]; // e.g. ["やま"]
  meaningBangla: string; // "পাহাড়, পর্বত"
  meaningEnglish: string; // "Mountain"
  radical: {
    character: string; // "山"
    name: string; // "やま (Mountain radical)"
    meaning: string; // "Represents towering terrain"
  };
  phoneticElement?: {
    element: string;
    sound: string;
    explanation: string;
  };
  etymology: string; // "Pictograph representing three mountain peaks rising together in nature."
  examples: {
    word: string;
    reading: string;
    meaningBangla: string;
    meaningEnglish: string;
  }[];
  week: number;
  lesson: number;
}

export const KANJI_DATABASE: KanjiDetail[] = [
  {
    id: 1,
    kanji: '山',
    strokes: 3,
    onyomi: ['サン', 'ザン'],
    kunyomi: ['やま'],
    meaningBangla: 'পাহাড়, পর্বত',
    meaningEnglish: 'Mountain',
    radical: { character: '山', name: 'やま (yama)', meaning: 'Mountain' },
    etymology: 'Pictograph depicting three rising mountain peaks.',
    examples: [
      { word: '山', reading: 'やま', meaningBangla: 'পাহাড়', meaningEnglish: 'Mountain' },
      { word: '富士山', reading: 'ふじさん', meaningBangla: 'ফুজি পাহাড়', meaningEnglish: 'Mt. Fuji' },
      { word: '火山', reading: 'かざん', meaningBangla: 'আগ্নেয়গিরি', meaningEnglish: 'Volcano' },
      { word: '登山', reading: 'とざん', meaningBangla: 'পাহাড়ে আরোহণ', meaningEnglish: 'Mountain climbing' }
    ],
    week: 3,
    lesson: 1
  },
  {
    id: 2,
    kanji: '川',
    strokes: 3,
    onyomi: ['セン'],
    kunyomi: ['かわ', 'がわ'],
    meaningBangla: 'নদী',
    meaningEnglish: 'River, stream',
    radical: { character: '巛 / 川', name: 'かわ (kawa)', meaning: 'River' },
    etymology: 'Pictograph of water flowing between two curving river banks.',
    examples: [
      { word: '川', reading: 'かわ', meaningBangla: 'নদী', meaningEnglish: 'River' },
      { word: '山川さん', reading: 'やまかわさん', meaningBangla: 'মিস্টার ইয়ামাকাওয়া', meaningEnglish: 'Mr. Yamakawa' },
      { word: 'インダス川', reading: 'インダスがわ', meaningBangla: 'সিন্ধু নদী', meaningEnglish: 'Indus River' }
    ],
    week: 3,
    lesson: 1
  },
  {
    id: 3,
    kanji: '田',
    strokes: 5,
    onyomi: ['デン'],
    kunyomi: ['た', 'だ'],
    meaningBangla: 'ধান ক্ষেত, ফসলি জমি',
    meaningEnglish: 'Rice field, paddy',
    radical: { character: '田', name: 'た (ta)', meaning: 'Rice field' },
    etymology: 'Pictograph of a cultivated rice field divided into four distinct plots by footpaths.',
    examples: [
      { word: '山田さん', reading: 'やまださん', meaningBangla: 'মিস্টার ইয়ামাদা', meaningEnglish: 'Mr. Yamada' },
      { word: '水田', reading: 'すいでん', meaningBangla: 'জলাবদ্ধ ধানের জমি', meaningEnglish: 'Wet rice field' },
      { word: '油田', reading: 'ゆでん', meaningBangla: 'তেল খনি / ক্ষেত্র', meaningEnglish: 'Oil field' }
    ],
    week: 3,
    lesson: 1
  },
  {
    id: 4,
    kanji: '日',
    strokes: 4,
    onyomi: ['ニチ', 'ジツ'],
    kunyomi: ['ひ', 'び', 'か'],
    meaningBangla: 'সূর্য, দিন, তারিখ',
    meaningEnglish: 'Sun, day, Japan',
    radical: { character: '日', name: 'ひ (hi)', meaning: 'Sun, day' },
    etymology: 'Pictograph of the sun disk with a radiant spot or line inside.',
    examples: [
      { word: '日曜日', reading: 'にちようび', meaningBangla: 'রবিবার', meaningEnglish: 'Sunday' },
      { word: '日本', reading: 'にほん', meaningBangla: 'জাপান', meaningEnglish: 'Japan' },
      { word: '休日', reading: 'きゅうじつ', meaningBangla: 'ছুটির দিন', meaningEnglish: 'Holiday' },
      { word: '三日', reading: 'みっか', meaningBangla: '৩য় তারিখ', meaningEnglish: '3rd day of month' }
    ],
    week: 3,
    lesson: 1
  },
  {
    id: 5,
    kanji: '月',
    strokes: 4,
    onyomi: ['ゲツ', 'ガツ'],
    kunyomi: ['つき'],
    meaningBangla: 'চাঁদ, মাস',
    meaningEnglish: 'Moon, month',
    radical: { character: '月', name: 'つき (tsuki)', meaning: 'Moon' },
    etymology: 'Pictograph representing a crescent moon with glowing atmospheric bands.',
    examples: [
      { word: '月曜日', reading: 'げつようび', meaningBangla: 'সোমবার', meaningEnglish: 'Monday' },
      { word: '一月', reading: 'いちがつ', meaningBangla: 'জানুয়ারি', meaningEnglish: 'January' },
      { word: '一か月', reading: 'いっかげつ', meaningBangla: 'এক মাস', meaningEnglish: 'One month' },
      { word: '今月', reading: 'こんげつ', meaningBangla: 'এই মাস', meaningEnglish: 'This month' }
    ],
    week: 3,
    lesson: 1
  },
  {
    id: 6,
    kanji: '火',
    strokes: 4,
    onyomi: ['カ'],
    kunyomi: ['ひ', 'ほ'],
    meaningBangla: 'আগুন',
    meaningEnglish: 'Fire',
    radical: { character: '火 / 灬', name: 'ひ (hi)', meaning: 'Fire' },
    etymology: 'Pictograph of leaping flames rising from a combustion source.',
    examples: [
      { word: '火曜日', reading: 'かようび', meaningBangla: 'মঙ্গলবার', meaningEnglish: 'Tuesday' },
      { word: '火山', reading: 'かざん', meaningBangla: 'আগ্নেয়গিরি', meaningEnglish: 'Volcano' },
      { word: '火事', reading: 'かじ', meaningBangla: 'অগ্নিকাণ্ড', meaningEnglish: 'Fire incident' },
      { word: '花火', reading: 'はなび', meaningBangla: 'আতশবাজি', meaningEnglish: 'Fireworks' }
    ],
    week: 3,
    lesson: 1
  },
  {
    id: 7,
    kanji: '水',
    strokes: 4,
    onyomi: ['スイ'],
    kunyomi: ['みず'],
    meaningBangla: 'পানি, জল',
    meaningEnglish: 'Water',
    radical: { character: '水 / 氵', name: 'みず (mizu)', meaning: 'Water' },
    etymology: 'Pictograph of a central stream of running water with splashing droplets.',
    examples: [
      { word: '水', reading: 'みず', meaningBangla: 'পানি', meaningEnglish: 'Water' },
      { word: '水曜日', reading: 'すいようび', meaningBangla: 'বুধবার', meaningEnglish: 'Wednesday' },
      { word: '水力', reading: 'すいりょく', meaningBangla: 'জলবিদ্যুৎ / পানির শক্তি', meaningEnglish: 'Water power' },
      { word: '水道', reading: 'すいどう', meaningBangla: 'পানি সরবরাহ ব্যবস্থা', meaningEnglish: 'Waterworks' }
    ],
    week: 3,
    lesson: 1
  },
  {
    id: 8,
    kanji: '木',
    strokes: 4,
    onyomi: ['モク', 'ボク'],
    kunyomi: ['き', 'こ'],
    meaningBangla: 'গাছ, কাঠ',
    meaningEnglish: 'Tree, wood',
    radical: { character: '木', name: 'き (ki)', meaning: 'Tree, wood' },
    etymology: 'Pictograph showing a tree with branches above and roots spreading downward.',
    examples: [
      { word: '木', reading: 'き', meaningBangla: 'গাছ', meaningEnglish: 'Tree' },
      { word: '木曜日', reading: 'もくようび', meaningBangla: 'বৃহস্পতিবার', meaningEnglish: 'Thursday' }
    ],
    week: 3,
    lesson: 2
  },
  {
    id: 9,
    kanji: '金',
    strokes: 8,
    onyomi: ['キン', 'コン'],
    kunyomi: ['かね', 'かな'],
    meaningBangla: 'টাকা, সোনা, ধাতু',
    meaningEnglish: 'Gold, money, metal',
    radical: { character: '金', name: 'かね (kane)', meaning: 'Metal, gold' },
    etymology: 'Depicts nuggets of precious metals covered deep underground.',
    examples: [
      { word: 'お金', reading: 'おかね', meaningBangla: 'টাকা / অর্থ', meaningEnglish: 'Money' },
      { word: '金曜日', reading: 'きんようび', meaningBangla: 'শুক্রবার', meaningEnglish: 'Friday' },
      { word: '金魚', reading: 'きんぎょ', meaningBangla: 'গোল্ডফিশ', meaningEnglish: 'Goldfish' }
    ],
    week: 3,
    lesson: 2
  },
  {
    id: 10,
    kanji: '土',
    strokes: 3,
    onyomi: ['ド', 'ト'],
    kunyomi: ['つち'],
    meaningBangla: 'মাটি, ভূমি',
    meaningEnglish: 'Soil, earth, land',
    radical: { character: '土', name: 'つち (tsuchi)', meaning: 'Earth' },
    etymology: 'Pictograph of a sprout shooting out of a mound of soil.',
    examples: [
      { word: '土', reading: 'つち', meaningBangla: 'মাটি', meaningEnglish: 'Soil / Earth' },
      { word: '土曜日', reading: 'どようび', meaningBangla: 'শনিবার', meaningEnglish: 'Saturday' },
      { word: '土地', reading: 'とち', meaningBangla: 'জমি / ভূখণ্ড', meaningEnglish: 'Land / Plot' }
    ],
    week: 3,
    lesson: 2
  },
  {
    id: 11,
    kanji: '一',
    strokes: 1,
    onyomi: ['イチ', 'イツ'],
    kunyomi: ['ひと', 'ひと.つ'],
    meaningBangla: 'এক',
    meaningEnglish: 'One',
    radical: { character: '一', name: 'いち (ichi)', meaning: 'One' },
    etymology: 'A single horizontal line representing the basic unit one.',
    examples: [
      { word: '一つ', reading: 'ひとつ', meaningBangla: 'একটি (বস্তু)', meaningEnglish: 'One thing' },
      { word: '一人', reading: 'ひとり', meaningBangla: 'একজন মানুষ', meaningEnglish: 'One person' },
      { word: '一日', reading: 'ついたち / いちにち', meaningBangla: '১ম তারিখ / একদিন', meaningEnglish: '1st of month / 1 day' }
    ],
    week: 3,
    lesson: 2
  },
  {
    id: 12,
    kanji: '二',
    strokes: 2,
    onyomi: ['ニ', 'ジ'],
    kunyomi: ['ふた', 'ふた.つ'],
    meaningBangla: 'দুই',
    meaningEnglish: 'Two',
    radical: { character: '二', name: 'に (ni)', meaning: 'Two' },
    etymology: 'Two horizontal lines representing the number two.',
    examples: [
      { word: '二つ', reading: 'ふたつ', meaningBangla: 'দুইটি', meaningEnglish: 'Two things' },
      { word: '二人', reading: 'ふたり', meaningBangla: 'দুজন', meaningEnglish: 'Two people' },
      { word: '二月', reading: 'にがつ', meaningBangla: 'ফেব্রুয়ারি', meaningEnglish: 'February' },
      { word: '二日', reading: 'ふつか', meaningBangla: '২য় তারিখ', meaningEnglish: '2nd day of month' }
    ],
    week: 3,
    lesson: 2
  },
  {
    id: 13,
    kanji: '三',
    strokes: 3,
    onyomi: ['サン'],
    kunyomi: ['み', 'みっ.つ'],
    meaningBangla: 'তিন',
    meaningEnglish: 'Three',
    radical: { character: '一', name: 'いち (ichi)', meaning: 'One' },
    etymology: 'Three horizontal strokes denoting heaven, earth, and mankind.',
    examples: [
      { word: '三つ', reading: 'みっつ', meaningBangla: 'তিনটি', meaningEnglish: 'Three things' },
      { word: '三人', reading: 'さんにん', meaningBangla: 'তিনজন', meaningEnglish: 'Three people' },
      { word: '三日', reading: 'みっか', meaningBangla: '৩য় তারিখ', meaningEnglish: '3rd day of month' }
    ],
    week: 3,
    lesson: 2
  },
  {
    id: 14,
    kanji: '四',
    strokes: 5,
    onyomi: ['シ'],
    kunyomi: ['よ', 'よっ.つ', 'よん'],
    meaningBangla: 'চার',
    meaningEnglish: 'Four',
    radical: { character: '囗', name: 'くにがまえ (kunigamae)', meaning: 'Enclosure' },
    etymology: 'Depicts breath escaping through nostrils / enclosure with two internal lines.',
    examples: [
      { word: '四つ', reading: 'よっつ', meaningBangla: 'চারটি', meaningEnglish: 'Four things' },
      { word: '四人', reading: 'よにん', meaningBangla: 'চারজন', meaningEnglish: 'Four people' },
      { word: '四月', reading: 'しがつ', meaningBangla: 'এপ্রিল', meaningEnglish: 'April' },
      { word: '四日', reading: 'よっか', meaningBangla: '৪র্থ তারিখ', meaningEnglish: '4th day of month' }
    ],
    week: 3,
    lesson: 2
  },
  {
    id: 15,
    kanji: '五',
    strokes: 4,
    onyomi: ['ゴ'],
    kunyomi: ['いつ', 'いつ.つ'],
    meaningBangla: 'পাঁচ',
    meaningEnglish: 'Five',
    radical: { character: '二', name: 'に (ni)', meaning: 'Two' },
    etymology: 'Ancient tally sticks crossing in the center denoting 5.',
    examples: [
      { word: '五つ', reading: 'いつつ', meaningBangla: 'পাঁচটি', meaningEnglish: 'Five things' },
      { word: '五人', reading: 'ごにん', meaningBangla: 'পাঁচজন', meaningEnglish: 'Five people' },
      { word: '五月', reading: 'ごがつ', meaningBangla: 'মে', meaningEnglish: 'May' },
      { word: '五日', reading: 'いつか', meaningBangla: '৫ম তারিখ', meaningEnglish: '5th day of month' }
    ],
    week: 3,
    lesson: 2
  },
  {
    id: 16,
    kanji: '六',
    strokes: 4,
    onyomi: ['ロク', 'リク'],
    kunyomi: ['む', 'むっ.つ', 'むい'],
    meaningBangla: 'ছয়',
    meaningEnglish: 'Six',
    radical: { character: '八', name: 'はち (hachi)', meaning: 'Eight' },
    etymology: 'Pictograph depicting a small dwelling or tent shelter shape.',
    examples: [
      { word: '六つ', reading: 'むっつ', meaningBangla: 'ছয়টি', meaningEnglish: 'Six things' },
      { word: '六人', reading: 'ろくにん', meaningBangla: 'ছয়জন', meaningEnglish: 'Six people' },
      { word: '六日', reading: 'むいか', meaningBangla: '৬ষ্ঠ তারিখ', meaningEnglish: '6th day of month' }
    ],
    week: 3,
    lesson: 2
  },
  {
    id: 17,
    kanji: '七',
    strokes: 2,
    onyomi: ['シチ'],
    kunyomi: ['なな', 'なな.つ', 'なの'],
    meaningBangla: 'সাত',
    meaningEnglish: 'Seven',
    radical: { character: '一', name: 'いち (ichi)', meaning: 'One' },
    etymology: 'Symbol of a line slashed through another, denoting an incision or cutting point.',
    examples: [
      { word: '七つ', reading: 'ななつ', meaningBangla: 'সাতটি', meaningEnglish: 'Seven things' },
      { word: '七人', reading: 'しちにん / ななにん', meaningBangla: 'সাতজন', meaningEnglish: 'Seven people' },
      { word: '七日', reading: 'なのか', meaningBangla: '৭ম তারিখ', meaningEnglish: '7th day of month' }
    ],
    week: 3,
    lesson: 2
  },
  {
    id: 18,
    kanji: '八',
    strokes: 2,
    onyomi: ['ハチ'],
    kunyomi: ['や', 'やっ.つ', 'よう'],
    meaningBangla: 'আট',
    meaningEnglish: 'Eight',
    radical: { character: '八', name: 'はち (hachi)', meaning: 'Eight' },
    etymology: 'Two curved strokes dividing away from each other (division/multiplication).',
    examples: [
      { word: '八つ', reading: 'やっつ', meaningBangla: 'আটটি', meaningEnglish: 'Eight things' },
      { word: '八人', reading: 'はちにん', meaningBangla: 'আটজন', meaningEnglish: 'Eight people' },
      { word: '八日', reading: 'ようか', meaningBangla: '৮ম তারিখ', meaningEnglish: '8th day of month' },
      { word: '八百屋', reading: 'やおや', meaningBangla: 'সবজির দোকান', meaningEnglish: 'Greengrocer' }
    ],
    week: 3,
    lesson: 2
  },
  {
    id: 19,
    kanji: '九',
    strokes: 2,
    onyomi: ['キュウ', 'ク'],
    kunyomi: ['ここの', 'ここの.つ'],
    meaningBangla: 'নয়',
    meaningEnglish: 'Nine',
    radical: { character: '乙', name: 'おつ (otsu)', meaning: 'Second' },
    etymology: 'Pictograph of a bent elbow and forearm representing numerical extreme.',
    examples: [
      { word: '九つ', reading: 'ここのつ', meaningBangla: 'নয়টি', meaningEnglish: 'Nine things' },
      { word: '九人', reading: 'きゅうにん / くにん', meaningBangla: 'নয়জন', meaningEnglish: 'Nine people' },
      { word: '九月', reading: 'くがつ', meaningBangla: 'সেপ্টেম্বর', meaningEnglish: 'September' },
      { word: '九日', reading: 'ここのか', meaningBangla: '৯ম তারিখ', meaningEnglish: '9th day of month' }
    ],
    week: 3,
    lesson: 2
  },
  {
    id: 20,
    kanji: '十',
    strokes: 2,
    onyomi: ['ジュウ', 'ジッ'],
    kunyomi: ['とお', 'と'],
    meaningBangla: 'দশ',
    meaningEnglish: 'Ten',
    radical: { character: '十', name: 'じゅう (juu)', meaning: 'Ten' },
    etymology: 'A horizontal and vertical cross representing total completion of decimal digits.',
    examples: [
      { word: '十', reading: 'とお', meaningBangla: 'দশটি', meaningEnglish: 'Ten things' },
      { word: '十人', reading: 'じゅうにん', meaningBangla: 'দশজন', meaningEnglish: 'Ten people' },
      { word: '十日', reading: 'とおか', meaningBangla: '১০ম তারিখ', meaningEnglish: '10th day of month' },
      { word: '十分な', reading: 'じゅうぶんな', meaningBangla: 'যথেষ্ট', meaningEnglish: 'Sufficient' }
    ],
    week: 3,
    lesson: 2
  },
  {
    id: 21,
    kanji: '百',
    strokes: 6,
    onyomi: ['ヒャク', 'ビャク', 'ピャク'],
    kunyomi: ['もも'],
    meaningBangla: 'শত, একশত',
    meaningEnglish: 'Hundred',
    radical: { character: '白', name: 'しろ (shiro)', meaning: 'White' },
    etymology: 'Combination of 一 (one) above 白 (white/thumb), symbolizing 100.',
    examples: [
      { word: '百', reading: 'ひゃく', meaningBangla: 'একশত', meaningEnglish: 'Hundred' },
      { word: '三百', reading: 'さんびゃく', meaningBangla: 'তিনশত', meaningEnglish: '300' },
      { word: '六百', reading: 'ろっぴゃく', meaningBangla: 'ছয়শত', meaningEnglish: '600' },
      { word: '八百', reading: 'はっぴゃく', meaningBangla: 'আটশত', meaningEnglish: '800' }
    ],
    week: 3,
    lesson: 2
  },
  {
    id: 22,
    kanji: '千',
    strokes: 3,
    onyomi: ['セン', 'ゼン'],
    kunyomi: ['ち'],
    meaningBangla: 'হাজার',
    meaningEnglish: 'Thousand',
    radical: { character: '十', name: 'じゅう (juu)', meaning: 'Ten' },
    phoneticElement: { element: '人', sound: 'sen', explanation: 'Symbolizes multiple people totaling 1000' },
    etymology: 'A human figure (人) marked with a slash denoting multiplication to one thousand.',
    examples: [
      { word: '千', reading: 'せん', meaningBangla: 'হাজার', meaningEnglish: 'Thousand' },
      { word: '二千', reading: 'にせん', meaningBangla: 'দুই হাজার', meaningEnglish: '2,000' },
      { word: '三千', reading: 'さんぜん', meaningBangla: 'তিন হাজার', meaningEnglish: '3,000' }
    ],
    week: 3,
    lesson: 2
  },
  {
    id: 23,
    kanji: '万',
    strokes: 3,
    onyomi: ['マン', 'バン'],
    kunyomi: ['よろず'],
    meaningBangla: 'দশ হাজার',
    meaningEnglish: 'Ten thousand',
    radical: { character: '一', name: 'いち (ichi)', meaning: 'One' },
    etymology: 'Originally a scorpion pictograph symbol for myriad, later adapted to mean 10,000.',
    examples: [
      { word: '一万', reading: 'いちまん', meaningBangla: '১০ হাজার', meaningEnglish: '10,000' },
      { word: '万国', reading: 'ばんこく', meaningBangla: 'সকল দেশ', meaningEnglish: 'All nations' },
      { word: '万年筆', reading: 'まんねんひつ', meaningBangla: 'ফাউন্টেন পেন', meaningEnglish: 'Fountain pen' }
    ],
    week: 3,
    lesson: 2
  },
  {
    id: 24,
    kanji: '円',
    strokes: 4,
    onyomi: ['エン'],
    kunyomi: ['まる.い'],
    meaningBangla: 'ইয়েন (জাপানি মুদ্রা), গোল/বৃত্ত',
    meaningEnglish: 'Yen, round, circle',
    radical: { character: '冂', name: 'けいがまえ (keigamae)', meaning: 'Upside down box' },
    etymology: 'Represents a circular enclosure, later adopted as the unit of currency (Yen).',
    examples: [
      { word: '百円', reading: 'ひゃくえん', meaningBangla: '১০০ ইয়েন', meaningEnglish: '100 Yen' },
      { word: '円高', reading: 'えんだか', meaningBangla: 'শক্তিশালী ইয়েন', meaningEnglish: 'Strong Yen' }
    ],
    week: 3,
    lesson: 2
  },
  {
    id: 25,
    kanji: '年',
    strokes: 6,
    onyomi: ['ネン'],
    kunyomi: ['とし'],
    meaningBangla: 'বছর, সাল, বয়স',
    meaningEnglish: 'Year, age',
    radical: { character: '干', name: 'かん (kan)', meaning: 'Dry shield' },
    etymology: 'Originally depicted carrying ripe grains on one\'s back, representing the annual harvest cycle.',
    examples: [
      { word: '今年', reading: 'ことし', meaningBangla: 'এই বছর', meaningEnglish: 'This year' },
      { word: '去年', reading: 'きょねん', meaningBangla: 'গত বছর', meaningEnglish: 'Last year' },
      { word: '来年', reading: 'らいねん', meaningBangla: 'আগামী বছর', meaningEnglish: 'Next year' },
      { word: '毎年', reading: 'まいとし', meaningBangla: 'প্রতি বছর', meaningEnglish: 'Every year' }
    ],
    week: 3,
    lesson: 2
  },
  {
    id: 26,
    kanji: '上',
    strokes: 3,
    onyomi: ['ジョウ', 'ショウ'],
    kunyomi: ['うえ', 'あ.がる', 'のぼ.る'],
    meaningBangla: 'উপরে, উঠা',
    meaningEnglish: 'Up, above, top',
    radical: { character: '一', name: 'いち (ichi)', meaning: 'One' },
    etymology: 'An indicator line above a horizontal base plane, pointing upwards.',
    examples: [
      { word: '上', reading: 'うえ', meaningBangla: 'উপরে', meaningEnglish: 'Above / on' },
      { word: '上がる', reading: 'あがる', meaningBangla: 'উপরে ওঠা', meaningEnglish: 'To go up' },
      { word: '上下', reading: 'じょうげ', meaningBangla: 'উপর-নিচ', meaningEnglish: 'Up and down' }
    ],
    week: 3,
    lesson: 2
  },
  {
    id: 27,
    kanji: '下',
    strokes: 3,
    onyomi: ['カ', 'ゲ'],
    kunyomi: ['した', 'さ.がる', 'くだ.る'],
    meaningBangla: 'নিচে, নামা',
    meaningEnglish: 'Down, below, under',
    radical: { character: '一', name: 'いち (ichi)', meaning: 'One' },
    etymology: 'An indicator mark below a horizontal base plane, pointing downwards.',
    examples: [
      { word: '下', reading: 'した', meaningBangla: 'নিচে', meaningEnglish: 'Below / under' },
      { word: '下がる', reading: 'さがる', meaningBangla: 'নিচে নামা', meaningEnglish: 'To go down' },
      { word: '地下鉄', reading: 'ちかてつ', meaningBangla: 'পাতাল ট্রেন', meaningEnglish: 'Subway' }
    ],
    week: 3,
    lesson: 2
  },
  {
    id: 28,
    kanji: '中',
    strokes: 4,
    onyomi: ['チュウ'],
    kunyomi: ['なか'],
    meaningBangla: 'ভেতরে, মধ্য, মাঝে',
    meaningEnglish: 'Inside, middle, center',
    radical: { character: '丨', name: 'ぼう (bou)', meaning: 'Stick' },
    etymology: 'A stick piercing squarely through the center of a target box.',
    examples: [
      { word: '中', reading: 'なか', meaningBangla: 'ভেতরে', meaningEnglish: 'Inside' },
      { word: '一日中', reading: 'いちにちじゅう', meaningBangla: 'সারাদিন ধরে', meaningEnglish: 'All day long' },
      { word: '中学', reading: 'ちゅうがく', meaningBangla: 'মিডেল স্কুল', meaningEnglish: 'Middle school' }
    ],
    week: 3,
    lesson: 2
  },
  {
    id: 29,
    kanji: '半',
    strokes: 5,
    onyomi: ['ハン'],
    kunyomi: ['なか.ば'],
    meaningBangla: 'অর্ধেক, সাড়ে (সময়)',
    meaningEnglish: 'Half, middle',
    radical: { character: '十', name: 'じゅう (juu)', meaning: 'Ten' },
    etymology: 'A cow (牛) divided into two equal parts (八) by a cut down the middle.',
    examples: [
      { word: '半分', reading: 'はんぶん', meaningBangla: 'অর্ধেক', meaningEnglish: 'Half' },
      { word: '五時半', reading: 'ごじはん', meaningBangla: 'সাড়ে ৫ টা', meaningEnglish: 'Half past 5' },
      { word: '半年', reading: 'はんとし', meaningBangla: 'অর্ধবছর (৬ মাস)', meaningEnglish: 'Half a year' }
    ],
    week: 3,
    lesson: 2
  },
  {
    id: 30,
    kanji: '分',
    strokes: 4,
    onyomi: ['フン', 'ブン', 'プン'],
    kunyomi: ['わ.ける', 'わ.かる'],
    meaningBangla: 'মিনিট, ভাগ করা, বোঝা',
    meaningEnglish: 'Minute, part, understand',
    radical: { character: '刀', name: 'かたな (katana)', meaning: 'Knife' },
    etymology: 'A knife (刀) splitting something into parts (八).',
    examples: [
      { word: '五分', reading: 'ごふん', meaningBangla: '৫ মিনিট', meaningEnglish: '5 minutes' },
      { word: '分かる', reading: 'わかる', meaningBangla: 'বুঝতে পারা', meaningEnglish: 'To understand' },
      { word: '分ける', reading: 'わける', meaningBangla: 'ভাগ করা', meaningEnglish: 'To divide' }
    ],
    week: 3,
    lesson: 2
  },
  {
    id: 31,
    kanji: '人',
    strokes: 2,
    onyomi: ['ジン', 'ニン'],
    kunyomi: ['ひと'],
    meaningBangla: 'মানুষ, ব্যক্তি',
    meaningEnglish: 'Person, human',
    radical: { character: '人', name: 'ひと (hito)', meaning: 'Person' },
    etymology: 'Pictograph of a walking human being seen from the side, standing on two legs.',
    examples: [
      { word: '人', reading: 'ひと', meaningBangla: 'ব্যক্তি / মানুষ', meaningEnglish: 'Person' },
      { word: '日本人', reading: 'にほんじん', meaningBangla: 'জাপানিজ', meaningEnglish: 'Japanese person' },
      { word: '一人', reading: 'ひとり', meaningBangla: 'একজন', meaningEnglish: 'One person' },
      { word: '二人', reading: 'ふたり', meaningBangla: 'দুজন', meaningEnglish: 'Two people' }
    ],
    week: 3,
    lesson: 2
  },
  {
    id: 32,
    kanji: '子',
    strokes: 3,
    onyomi: ['シ', 'ス'],
    kunyomi: ['こ'],
    meaningBangla: 'বাচ্চা, সন্তান',
    meaningEnglish: 'Child',
    radical: { character: '子', name: 'こ (ko)', meaning: 'Child' },
    etymology: 'Pictograph of a baby with head and open arms.',
    examples: [
      { word: '子供', reading: 'こども', meaningBangla: 'বাচ্চা / সন্তান', meaningEnglish: 'Child / children' },
      { word: '女の子', reading: 'おんなのこ', meaningBangla: 'মেয়ে বাচ্চা', meaningEnglish: 'Girl' },
      { word: '男の子', reading: 'おとこのこ', meaningBangla: 'ছেলে বাচ্চা', meaningEnglish: 'Boy' }
    ],
    week: 3,
    lesson: 2
  },
  {
    id: 33,
    kanji: '女',
    strokes: 3,
    onyomi: ['ジョ', 'ニョ'],
    kunyomi: ['おんな', 'め'],
    meaningBangla: 'মহিলা, নারী',
    meaningEnglish: 'Woman, female',
    radical: { character: '女', name: 'おんな (onna)', meaning: 'Woman' },
    etymology: 'Pictograph of a kneeling graceful woman crossing her arms.',
    examples: [
      { word: '女の人', reading: 'おんなのひと', meaningBangla: 'মহিলা', meaningEnglish: 'Woman' },
      { word: '女性', reading: 'じょせい', meaningBangla: 'নারী / ফিমেল', meaningEnglish: 'Female' },
      { word: '男女', reading: 'だんじょ', meaningBangla: 'নারী ও পুরুষ', meaningEnglish: 'Men and women' }
    ],
    week: 3,
    lesson: 2
  },
  {
    id: 34,
    kanji: '男',
    strokes: 7,
    onyomi: ['ダン', 'ナン'],
    kunyomi: ['おとこ'],
    meaningBangla: 'পুরুষ, ছেলে',
    meaningEnglish: 'Man, male',
    radical: { character: '田', name: 'た (ta)', meaning: 'Rice field' },
    phoneticElement: { element: '力', sound: 'chikara', explanation: 'Strength applied in rice fields' },
    etymology: 'Combines 田 (rice field) and 力 (strength/labor), indicating men working in the fields.',
    examples: [
      { word: '男の人', reading: 'おとこのひと', meaningBangla: 'পুরুষ ব্যক্তি', meaningEnglish: 'Man' },
      { word: '男子', reading: 'だんし', meaningBangla: 'ছেলে বাচ্চা / তরুণ', meaningEnglish: 'Boy' },
      { word: '男性', reading: 'だんせい', meaningBangla: 'পুরুষ', meaningEnglish: 'Male' }
    ],
    week: 3,
    lesson: 2
  },
  {
    id: 35,
    kanji: '目',
    strokes: 5,
    onyomi: ['モク', 'ボク'],
    kunyomi: ['め', 'ま'],
    meaningBangla: 'চোখ',
    meaningEnglish: 'Eye',
    radical: { character: '目', name: 'め (me)', meaning: 'Eye' },
    etymology: 'Pictograph of an eye with pupil inside.',
    examples: [
      { word: '目', reading: 'め', meaningBangla: 'চোখ', meaningEnglish: 'Eye' },
      { word: '目薬', reading: 'めぐすり', meaningBangla: 'চোখের ড্রপ', meaningEnglish: 'Eye drops' },
      { word: '一日目', reading: 'いちにちめ', meaningBangla: 'প্রথম দিন', meaningEnglish: 'First day' }
    ],
    week: 3,
    lesson: 2
  },
  {
    id: 36,
    kanji: '口',
    strokes: 3,
    onyomi: ['コウ', 'ク'],
    kunyomi: ['くち'],
    meaningBangla: 'মুখ, প্রবেশ পথ',
    meaningEnglish: 'Mouth, opening, gate',
    radical: { character: '口', name: 'くち (kuchi)', meaning: 'Mouth' },
    etymology: 'Pictograph of an open human mouth.',
    examples: [
      { word: '口', reading: 'くち', meaningBangla: 'মুখ', meaningEnglish: 'Mouth' },
      { word: '入口', reading: 'いりぐち', meaningBangla: 'প্রবেশ পথ', meaningEnglish: 'Entrance' },
      { word: '出口', reading: 'でぐち', meaningBangla: 'বের হওয়ার পথ', meaningEnglish: 'Exit' },
      { word: '人口', reading: 'じんこう', meaningBangla: 'জনসংখ্যা', meaningEnglish: 'Population' }
    ],
    week: 5,
    lesson: 3
  },
  {
    id: 37,
    kanji: '耳',
    strokes: 6,
    onyomi: ['ジ'],
    kunyomi: ['みみ'],
    meaningBangla: 'কান',
    meaningEnglish: 'Ear',
    radical: { character: '耳', name: 'みみ (mimi)', meaning: 'Ear' },
    etymology: 'Pictograph of a human ear capturing sound waves.',
    examples: [
      { word: '耳', reading: 'みみ', meaningBangla: 'কান', meaningEnglish: 'Ear' }
    ],
    week: 5,
    lesson: 3
  },
  {
    id: 38,
    kanji: '手',
    strokes: 4,
    onyomi: ['シュ'],
    kunyomi: ['て', 'た'],
    meaningBangla: 'হাত',
    meaningEnglish: 'Hand',
    radical: { character: '手 / 扌', name: 'て (te)', meaning: 'Hand' },
    etymology: 'Pictograph of an open hand showing 5 fingers and the palm.',
    examples: [
      { word: '手', reading: 'て', meaningBangla: 'হাত', meaningEnglish: 'Hand' },
      { word: '上手な', reading: 'じょうずな', meaningBangla: 'দক্ষ', meaningEnglish: 'Skillful / good at' },
      { word: '下手な', reading: 'へたな', meaningBangla: 'অদক্ষ', meaningEnglish: 'Unskillful / poor at' },
      { word: '右手', reading: 'みぎて', meaningBangla: 'ডান হাত', meaningEnglish: 'Right hand' },
      { word: '手紙', reading: 'てがみ', meaningBangla: 'চিঠি', meaningEnglish: 'Letter' }
    ],
    week: 5,
    lesson: 3
  },
  {
    id: 39,
    kanji: '足',
    strokes: 7,
    onyomi: ['ソク'],
    kunyomi: ['あし', 'た.りる'],
    meaningBangla: 'পা, যথেষ্ট হওয়া',
    meaningEnglish: 'Foot, leg, sufficient',
    radical: { character: '足', name: 'あし (ashi)', meaning: 'Foot' },
    etymology: 'Pictograph showing knee, calf, and foot planted firmly on the ground.',
    examples: [
      { word: '足', reading: 'あし', meaningBangla: 'পা', meaningEnglish: 'Foot / Leg' },
      { word: '足りる', reading: 'たりる', meaningBangla: 'যথেষ্ট হওয়া', meaningEnglish: 'To be sufficient' },
      { word: '一足', reading: 'いっそく', meaningBangla: 'এক জোড়া জুতা', meaningEnglish: 'One pair of shoes' }
    ],
    week: 5,
    lesson: 3
  },
  {
    id: 40,
    kanji: '力',
    strokes: 2,
    onyomi: ['リョク', 'リキ'],
    kunyomi: ['ちから'],
    meaningBangla: 'শক্তি, ক্ষমতা',
    meaningEnglish: 'Power, strength',
    radical: { character: '力', name: 'ちから (chikara)', meaning: 'Power' },
    etymology: 'Pictograph of a flexing arm tendon or an ancient plowing tool requiring exertion.',
    examples: [
      { word: '力', reading: 'ちから', meaningBangla: 'শক্তি', meaningEnglish: 'Power' },
      { word: '水力', reading: 'すいりょく', meaningBangla: 'পানির শক্তি', meaningEnglish: 'Hydraulic power' },
      { word: '体力', reading: 'たいりょく', meaningBangla: 'শারীরিক শক্তি', meaningEnglish: 'Physical strength' }
    ],
    week: 5,
    lesson: 3
  },
  {
    id: 41,
    kanji: '父',
    strokes: 4,
    onyomi: ['フ'],
    kunyomi: ['ちち', 'とう'],
    meaningBangla: 'বাবা',
    meaningEnglish: 'Father',
    radical: { character: '父', name: 'ちち (chichi)', meaning: 'Father' },
    etymology: 'Pictograph of a hand holding a stick or axe, the symbol of patriarchal authority.',
    examples: [
      { word: '父', reading: 'ちち', meaningBangla: 'বাবা (নিজের)', meaningEnglish: '(My) father' },
      { word: 'お父さん', reading: 'おとうさん', meaningBangla: 'বাবা (অন্যের/আদরে)', meaningEnglish: 'Father' },
      { word: '父母', reading: 'ふぼ', meaningBangla: 'পিতা-মাতা', meaningEnglish: 'Parents' }
    ],
    week: 5,
    lesson: 3
  },
  {
    id: 42,
    kanji: '母',
    strokes: 5,
    onyomi: ['ボ'],
    kunyomi: ['はは', 'かあ'],
    meaningBangla: 'মা',
    meaningEnglish: 'Mother',
    radical: { character: '毋', name: 'なかれ (nakare)', meaning: 'Mother' },
    etymology: 'Pictograph of a kneeling woman with two dots indicating nourishing breasts.',
    examples: [
      { word: '母', reading: 'はは', meaningBangla: 'মা (নিজের)', meaningEnglish: '(My) mother' },
      { word: 'お母さん', reading: 'おかあさん', meaningBangla: 'মা (অন্যের/আদরে)', meaningEnglish: 'Mother' },
      { word: '母国', reading: 'ぼこく', meaningBangla: 'মাতৃভূমি / স্বদেশ', meaningEnglish: 'Motherland' }
    ],
    week: 5,
    lesson: 3
  },
  {
    id: 43,
    kanji: '先',
    strokes: 6,
    onyomi: ['セン'],
    kunyomi: ['さき', 'ま.ず'],
    meaningBangla: 'আগে, সামনে, অতীত',
    meaningEnglish: 'Before, ahead, previous',
    radical: { character: '儿', name: 'ひとあし (hitoashi)', meaning: 'Human legs' },
    etymology: 'A foot (止) walking ahead of a person (儿), leading into the future.',
    examples: [
      { word: '先生', reading: 'せんせい', meaningBangla: 'শিক্ষক', meaningEnglish: 'Teacher' },
      { word: '先月', reading: 'せんげつ', meaningBangla: 'গত মাস', meaningEnglish: 'Last month' },
      { word: '先週', reading: 'せんしゅう', meaningBangla: 'গত সপ্তাহ', meaningEnglish: 'Last week' },
      { word: 'お先に', reading: 'おさきに', meaningBangla: 'আগে আগে (চলে যাওয়া)', meaningEnglish: 'Pardon me for leaving first' }
    ],
    week: 5,
    lesson: 3
  },
  {
    id: 44,
    kanji: '生',
    strokes: 5,
    onyomi: ['セイ', 'ショウ'],
    kunyomi: ['い.きる', 'う.まれる', 'なま'],
    meaningBangla: 'জন্ম নেওয়া, জীবিত থাকা, কাঁচা',
    meaningEnglish: 'Life, birth, raw',
    radical: { character: '生', name: 'うまれる (umareru)', meaning: 'Life, birth' },
    etymology: 'A plant bud sprouting up fresh out of the soil.',
    examples: [
      { word: '生まれる', reading: 'うまれる', meaningBangla: 'জন্ম হওয়া', meaningEnglish: 'To be born' },
      { word: '先生', reading: 'せんせい', meaningBangla: 'শিক্ষক', meaningEnglish: 'Teacher' },
      { word: '学生', reading: 'がくせい', meaningBangla: 'ছাত্র/ছাত্রী', meaningEnglish: 'Student' },
      { word: '生きる', reading: 'いきる', meaningBangla: 'বেঁচে থাকা', meaningEnglish: 'To live' }
    ],
    week: 5,
    lesson: 3
  },
  {
    id: 45,
    kanji: '学',
    strokes: 8,
    onyomi: ['ガク'],
    kunyomi: ['まな.ぶ'],
    meaningBangla: 'শেখা, অধ্যয়ন করা',
    meaningEnglish: 'Study, learning, science',
    radical: { character: '子', name: 'こ (ko)', meaning: 'Child' },
    etymology: 'A child (子) studying under a roof with hands passing down knowledge.',
    examples: [
      { word: '大学', reading: 'だいがく', meaningBangla: 'বিশ্ববিদ্যালয়', meaningEnglish: 'University' },
      { word: '学校', reading: 'がっこう', meaningBangla: 'স্কুল', meaningEnglish: 'School' },
      { word: '学生', reading: 'がくせい', meaningBangla: 'ছাত্র', meaningEnglish: 'Student' },
      { word: '学ぶ', reading: 'まなぶ', meaningBangla: 'শেখা', meaningEnglish: 'To study' }
    ],
    week: 5,
    lesson: 3
  },
  {
    id: 46,
    kanji: '校',
    strokes: 10,
    onyomi: ['コウ'],
    kunyomi: [],
    meaningBangla: 'স্কুল, বিদ্যালয়',
    meaningEnglish: 'School, exam',
    radical: { character: '木', name: 'き (ki)', meaning: 'Tree, wood' },
    phoneticElement: { element: '交', sound: 'kou', explanation: 'Intersection / meeting of students' },
    etymology: 'Wooden structure (木) where people meet and exchange ideas (交).',
    examples: [
      { word: '学校', reading: 'がっこう', meaningBangla: 'বিদ্যালয়', meaningEnglish: 'School' },
      { word: '校長', reading: 'こうちょう', meaningBangla: 'প্রধান শিক্ষক / প্রিন্সিপাল', meaningEnglish: 'Principal' },
      { word: '小学校', reading: 'しょうがっこう', meaningBangla: 'প্রাইমারী স্কুল', meaningEnglish: 'Elementary school' }
    ],
    week: 5,
    lesson: 3
  },
  {
    id: 47,
    kanji: '友',
    strokes: 4,
    onyomi: ['ユウ'],
    kunyomi: ['とも'],
    meaningBangla: 'বন্ধু',
    meaningEnglish: 'Friend',
    radical: { character: '又', name: 'また (mata)', meaning: 'Again, right hand' },
    etymology: 'Two hands reaching out clasping each other in alliance and friendship.',
    examples: [
      { word: '友だち', reading: 'ともだち', meaningBangla: 'বন্ধু', meaningEnglish: 'Friend' },
      { word: '友人', reading: 'ゆうじん', meaningBangla: 'বন্ধু (ভদ্র রূপ)', meaningEnglish: 'Friend' }
    ],
    week: 5,
    lesson: 3
  },
  {
    id: 48,
    kanji: '本',
    strokes: 5,
    onyomi: ['ホン'],
    kunyomi: ['もと'],
    meaningBangla: 'বই, মূল, ভিত্তি',
    meaningEnglish: 'Book, origin, main',
    radical: { character: '木', name: 'き (ki)', meaning: 'Tree' },
    etymology: 'A tree (木) with a horizontal line marking its root base (origin).',
    examples: [
      { word: '本', reading: 'ほん', meaningBangla: 'বই', meaningEnglish: 'Book' },
      { word: '日本', reading: 'にほん', meaningBangla: 'জাপান (সূর্যের উৎস)', meaningEnglish: 'Japan' },
      { word: '本屋', reading: 'ほんや', meaningBangla: 'বইয়ের দোকান', meaningEnglish: 'Bookstore' },
      { word: '一本', reading: 'いっぽん', meaningBangla: 'একটি লম্বা জিনিস', meaningEnglish: '1 long cylindrical object' }
    ],
    week: 5,
    lesson: 3
  },
  {
    id: 49,
    kanji: '毎',
    strokes: 6,
    onyomi: ['マイ'],
    kunyomi: ['ごと'],
    meaningBangla: 'প্রতি, প্রত্যেক',
    meaningEnglish: 'Every',
    radical: { character: '毋', name: 'なかれ (nakare)', meaning: 'Mother' },
    etymology: 'A mother (母) wearing a hair ornament, constantly bearing children every time.',
    examples: [
      { word: '毎日', reading: 'まいにち', meaningBangla: 'প্রতিদিন', meaningEnglish: 'Every day' },
      { word: '毎月', reading: 'まいつき', meaningBangla: 'প্রতিমাস', meaningEnglish: 'Every month' },
      { word: '毎年', reading: 'まいとし', meaningBangla: 'প্রতিবছর', meaningEnglish: 'Every year' },
      { word: '毎朝', reading: 'まいあさ', meaningBangla: 'প্রতিসকাল', meaningEnglish: 'Every morning' }
    ],
    week: 5,
    lesson: 3
  },
  {
    id: 50,
    kanji: '何',
    strokes: 7,
    onyomi: ['カ'],
    kunyomi: ['なに', 'なん'],
    meaningBangla: 'কী? কত?',
    meaningEnglish: 'What, how many',
    radical: { character: '亻', name: 'にんべん (ninben)', meaning: 'Person' },
    phoneticElement: { element: '可', sound: 'ka', explanation: 'Asking / querying voice' },
    etymology: 'A person (亻) carrying a burden asking what it is.',
    examples: [
      { word: '何', reading: 'なに / なん', meaningBangla: 'কী?', meaningEnglish: 'What?' },
      { word: '何時', reading: 'なんじ', meaningBangla: 'কয়টা?', meaningEnglish: 'What time?' },
      { word: '何人', reading: 'なんにん', meaningBangla: 'কয়জন?', meaningEnglish: 'How many people?' },
      { word: '何か', reading: 'なにか', meaningBangla: 'কিছু একটা', meaningEnglish: 'Something' }
    ],
    week: 5,
    lesson: 3
  },
  {
    id: 51,
    kanji: '前',
    strokes: 9,
    onyomi: ['ゼン'],
    kunyomi: ['まえ'],
    meaningBangla: 'সামনে, পূর্বে, আগে',
    meaningEnglish: 'In front, before, previous',
    radical: { character: '刂', name: 'りっとう (rittou)', meaning: 'Sword' },
    etymology: 'A boat moving forward across water with paddles trimming in front.',
    examples: [
      { word: '前', reading: 'まえ', meaningBangla: 'সামনে / আগে', meaningEnglish: 'In front / before' },
      { word: '三日前', reading: 'みっかまえ', meaningBangla: 'তিনদিন আগে', meaningEnglish: '3 days ago' },
      { word: '午前', reading: 'ごぜん', meaningBangla: 'সকাল (AM)', meaningEnglish: 'Morning (AM)' },
      { word: '駅前', reading: 'えきまえ', meaningBangla: 'স্টেশনের সামনে', meaningEnglish: 'In front of station' }
    ],
    week: 6,
    lesson: 4
  },
  {
    id: 52,
    kanji: '後',
    strokes: 9,
    onyomi: ['ゴ', 'コウ'],
    kunyomi: ['のち', 'うし.ろ', 'あと'],
    meaningBangla: 'পেছনে, পরে',
    meaningEnglish: 'Behind, after, later',
    radical: { character: '彳', name: 'ぎょうにんべん (gyouninben)', meaning: 'Step, walk' },
    etymology: 'Walking slowly with tied feet (幺) trailing behind others.',
    examples: [
      { word: '後ろ', reading: 'うしろ', meaningBangla: 'পেছনে', meaningEnglish: 'Behind' },
      { word: '後で', reading: 'あとで', meaningBangla: 'পরে', meaningEnglish: 'Later / after' },
      { word: '午後', reading: 'ごご', meaningBangla: 'বিকাল (PM)', meaningEnglish: 'Afternoon (PM)' }
    ],
    week: 6,
    lesson: 4
  },
  {
    id: 53,
    kanji: '外',
    strokes: 5,
    onyomi: ['ガイ', 'ゲ'],
    kunyomi: ['そと', 'ほか', 'はず.す'],
    meaningBangla: 'বাইরে, বিদেশ',
    meaningEnglish: 'Outside, foreign, other',
    radical: { character: '夕', name: 'ゆうべ (yuube)', meaning: 'Evening' },
    phoneticElement: { element: 'ト', sound: 'boku', explanation: 'Divination outside regular boundaries' },
    etymology: 'Casting divination bones in the evening beyond village borders.',
    examples: [
      { word: '外', reading: 'そと', meaningBangla: 'বাইরে', meaningEnglish: 'Outside' },
      { word: '外国', reading: 'がいこく', meaningBangla: 'বিদেশ', meaningEnglish: 'Foreign country' },
      { word: '外国人', reading: 'がいこくじん', meaningBangla: 'বিদেশি ব্যক্তি', meaningEnglish: 'Foreigner' }
    ],
    week: 6,
    lesson: 4
  },
  {
    id: 54,
    kanji: '左',
    strokes: 5,
    onyomi: ['サ'],
    kunyomi: ['ひだり'],
    meaningBangla: 'বামদিক, বামহাত',
    meaningEnglish: 'Left',
    radical: { character: '工', name: 'たくみ (takumi)', meaning: 'Craft' },
    etymology: 'A left hand holding a carpenter\'s square tool (工).',
    examples: [
      { word: '左', reading: 'ひだり', meaningBangla: 'বামদিক', meaningEnglish: 'Left' },
      { word: '左手', reading: 'ひだりて', meaningBangla: 'বামহাত', meaningEnglish: 'Left hand' },
      { word: '左右', reading: 'さゆう', meaningBangla: 'বাম ও ডান', meaningEnglish: 'Left and right' }
    ],
    week: 6,
    lesson: 4
  },
  {
    id: 55,
    kanji: '右',
    strokes: 5,
    onyomi: ['ウ', 'ユウ'],
    kunyomi: ['みぎ'],
    meaningBangla: 'ডানদিক, ডানহাত',
    meaningEnglish: 'Right',
    radical: { character: '口', name: 'くち (kuchi)', meaning: 'Mouth' },
    etymology: 'A right hand bringing food to the mouth (口).',
    examples: [
      { word: '右', reading: 'みぎ', meaningBangla: 'ডানদিক', meaningEnglish: 'Right' },
      { word: '右手', reading: 'みぎて', meaningBangla: 'ডানহাত', meaningEnglish: 'Right hand' }
    ],
    week: 6,
    lesson: 4
  },
  {
    id: 56,
    kanji: '東',
    strokes: 8,
    onyomi: ['トウ'],
    kunyomi: ['ひがし'],
    meaningBangla: 'পূর্বদিক',
    meaningEnglish: 'East',
    radical: { character: '木', name: 'き (ki)', meaning: 'Tree' },
    etymology: 'The sun (日) rising directly behind a tree (木) in the east.',
    examples: [
      { word: '東', reading: 'ひがし', meaningBangla: 'পূর্বদিক', meaningEnglish: 'East' },
      { word: '東京', reading: 'とうきょう', meaningBangla: 'টোকিও (পূর্ব রাজধানী)', meaningEnglish: 'Tokyo' },
      { word: '東口', reading: 'ひがしぐち', meaningBangla: 'পূর্ব গেট', meaningEnglish: 'East exit' }
    ],
    week: 6,
    lesson: 4
  },
  {
    id: 57,
    kanji: '西',
    strokes: 6,
    onyomi: ['セイ', 'サイ'],
    kunyomi: ['にし'],
    meaningBangla: 'পশ্চিম',
    meaningEnglish: 'West',
    radical: { character: '覀', name: 'にし (nishi)', meaning: 'West' },
    etymology: 'Pictograph of a bird resting in its nest at sunset in the west.',
    examples: [
      { word: '西', reading: 'にし', meaningBangla: 'পশ্চিম', meaningEnglish: 'West' },
      { word: '西口', reading: 'にしぐち', meaningBangla: 'পশ্চিম গেট', meaningEnglish: 'West exit' },
      { word: '西洋', reading: 'せいよう', meaningBangla: 'পশ্চিমা দেশগুলো', meaningEnglish: 'The West / Western' }
    ],
    week: 6,
    lesson: 4
  },
  {
    id: 58,
    kanji: '南',
    strokes: 9,
    onyomi: ['ナン'],
    kunyomi: ['みなみ'],
    meaningBangla: 'দক্ষিণ',
    meaningEnglish: 'South',
    radical: { character: '十', name: 'じゅう (juu)', meaning: 'Ten' },
    etymology: 'Pictograph of a tropical bronze bell or vegetation thriving in the warm south.',
    examples: [
      { word: '南', reading: 'みなみ', meaningBangla: 'দক্ষিণ', meaningEnglish: 'South' },
      { word: '南口', reading: 'みなみぐち', meaningBangla: 'দক্ষিণ গেট', meaningEnglish: 'South exit' },
      { word: '東南', reading: 'とうなん', meaningBangla: 'দক্ষিণ-পূর্ব', meaningEnglish: 'Southeast' }
    ],
    week: 6,
    lesson: 4
  },
  {
    id: 59,
    kanji: '北',
    strokes: 5,
    onyomi: ['ホク'],
    kunyomi: ['きた'],
    meaningBangla: 'উত্তর',
    meaningEnglish: 'North',
    radical: { character: '匕', name: 'ひ (hi)', meaning: 'Spoon' },
    etymology: 'Two people standing back-to-back turning away from the icy northern wind.',
    examples: [
      { word: '北', reading: 'きた', meaningBangla: 'উত্তর', meaningEnglish: 'North' },
      { word: '北口', reading: 'きたぐち', meaningBangla: 'উত্তর গেট', meaningEnglish: 'North exit' },
      { word: '南北', reading: 'なんぼく', meaningBangla: 'উত্তর-দক্ষিণ', meaningEnglish: 'North and south' }
    ],
    week: 6,
    lesson: 4
  },
  {
    id: 60,
    kanji: '名',
    strokes: 6,
    onyomi: ['メイ', 'ミョウ'],
    kunyomi: ['な'],
    meaningBangla: 'নাম, বিখ্যাত',
    meaningEnglish: 'Name, reputation',
    radical: { character: '口', name: 'くち (kuchi)', meaning: 'Mouth' },
    etymology: 'Speaking (口) one\'s identity in the dark evening (夕) to be recognized.',
    examples: [
      { word: '名前', reading: 'なまえ', meaningBangla: 'নাম', meaningEnglish: 'Name' },
      { word: '有名', reading: 'ゆうめい', meaningBangla: 'বিখ্যাত', meaningEnglish: 'Famous' },
      { word: '１０名', reading: 'じゅうめい', meaningBangla: '১০ জন', meaningEnglish: '10 people' }
    ],
    week: 6,
    lesson: 4
  },
  {
    id: 61,
    kanji: '牛',
    strokes: 4,
    onyomi: ['ギュウ'],
    kunyomi: ['うし'],
    meaningBangla: 'গরু',
    meaningEnglish: 'Cow, bull, beef',
    radical: { character: '牛', name: 'うし (ushi)', meaning: 'Cow' },
    etymology: 'Pictograph of a horned bull\'s head from above.',
    examples: [
      { word: '牛', reading: 'うし', meaningBangla: 'গরু', meaningEnglish: 'Cow' },
      { word: '牛肉', reading: 'ぎゅうにく', meaningBangla: 'গরুর মাংস', meaningEnglish: 'Beef' },
      { word: '牛乳', reading: 'ぎゅうにゅう', meaningBangla: 'দুধ', meaningEnglish: 'Milk' },
      { word: '牛丼', reading: 'ぎゅうどん', meaningBangla: 'বিফ বাউল', meaningEnglish: 'Beef bowl' }
    ],
    week: 6,
    lesson: 5
  },
  {
    id: 62,
    kanji: '馬',
    strokes: 10,
    onyomi: ['バ'],
    kunyomi: ['うま', 'ま'],
    meaningBangla: 'ঘোড়া',
    meaningEnglish: 'Horse',
    radical: { character: '馬', name: 'うま (uma)', meaning: 'Horse' },
    etymology: 'Pictograph of a standing horse showing head, mane, back, tail, and four legs.',
    examples: [
      { word: '馬', reading: 'うま', meaningBangla: 'ঘোড়া', meaningEnglish: 'Horse' },
      { word: '馬車', reading: 'ばしゃ', meaningBangla: 'ঘোড়ার গাড়ি', meaningEnglish: 'Horse carriage' }
    ],
    week: 6,
    lesson: 5
  },
  {
    id: 63,
    kanji: '魚',
    strokes: 11,
    onyomi: ['ギョ'],
    kunyomi: ['さかな', 'うお'],
    meaningBangla: 'মাছ',
    meaningEnglish: 'Fish',
    radical: { character: '魚', name: 'うお (uo)', meaning: 'Fish' },
    etymology: 'Pictograph of a swimming fish with head, scales, and fin tail.',
    examples: [
      { word: '魚', reading: 'さかな', meaningBangla: 'মাছ', meaningEnglish: 'Fish' },
      { word: '金魚', reading: 'きんぎょ', meaningBangla: 'গোল্ডফিশ', meaningEnglish: 'Goldfish' },
      { word: '人魚', reading: 'にんぎょ', meaningBangla: 'জলপরী', meaningEnglish: 'Mermaid' }
    ],
    week: 6,
    lesson: 5
  },
  {
    id: 64,
    kanji: '貝',
    strokes: 7,
    onyomi: ['バイ'],
    kunyomi: ['かい'],
    meaningBangla: 'শামুক, ঝিনুক, খোলস',
    meaningEnglish: 'Shellfish, clam',
    radical: { character: '貝', name: 'かい (kai)', meaning: 'Shell' },
    etymology: 'Pictograph of a cowrie sea shell, the ancient standard of wealth/currency.',
    examples: [
      { word: '貝', reading: 'かい', meaningBangla: 'ঝিনুক / শামুক', meaningEnglish: 'Shellfish' }
    ],
    week: 6,
    lesson: 5
  },
  {
    id: 65,
    kanji: '雨',
    strokes: 8,
    onyomi: ['ウ'],
    kunyomi: ['あめ', 'あま'],
    meaningBangla: 'বৃষ্টি',
    meaningEnglish: 'Rain',
    radical: { character: '雨', name: 'あめ (ame)', meaning: 'Rain' },
    etymology: 'Water drops falling down from heaven clouds under sky.',
    examples: [
      { word: '雨', reading: 'あめ', meaningBangla: 'বৃষ্টি', meaningEnglish: 'Rain' },
      { word: '大雨', reading: 'おおあめ', meaningBangla: 'ভারী বৃষ্টি', meaningEnglish: 'Heavy rain' }
    ],
    week: 6,
    lesson: 5
  },
  {
    id: 66,
    kanji: '天',
    strokes: 4,
    onyomi: ['テン'],
    kunyomi: ['あまつ', 'あめ'],
    meaningBangla: 'আকাশ, স্বর্গ',
    meaningEnglish: 'Heaven, sky',
    radical: { character: '大', name: 'だい (dai)', meaning: 'Big' },
    etymology: 'A human person (大) with a line spanning across above their head symbolizing the heavens.',
    examples: [
      { word: '天気', reading: 'てんき', meaningBangla: 'আবহাওয়া', meaningEnglish: 'Weather' },
      { word: '天国', reading: 'てんごく', meaningBangla: 'স্বর্গ', meaningEnglish: 'Paradise / Heaven' }
    ],
    week: 6,
    lesson: 5
  },
  {
    id: 67,
    kanji: '気',
    strokes: 6,
    onyomi: ['キ', 'ケ'],
    kunyomi: ['いき'],
    meaningBangla: 'আত্মা, অনুভূতি, শক্তি, বাতাস',
    meaningEnglish: 'Spirit, mind, mood, air',
    radical: { character: '气', name: 'きがまえ (kigamae)', meaning: 'Steam, breath' },
    etymology: 'Vapor and steam rising from cooking grain, representing invisible life force.',
    examples: [
      { word: '元気', reading: 'げんき', meaningBangla: 'সুস্থ / প্রাণবন্ত', meaningEnglish: 'Healthy / fine' },
      { word: '天気', reading: 'てんき', meaningBangla: 'আবহাওয়া', meaningEnglish: 'Weather' },
      { word: '気持ち', reading: 'きもち', meaningBangla: 'অনুভূতি', meaningEnglish: 'Feeling' },
      { word: '気をつける', reading: 'きをつける', meaningBangla: 'সতর্ক থাকা', meaningEnglish: 'To take care' }
    ],
    week: 6,
    lesson: 5
  },
  {
    id: 68,
    kanji: '車',
    strokes: 7,
    onyomi: ['シャ'],
    kunyomi: ['くるま'],
    meaningBangla: 'গাড়ি, যান',
    meaningEnglish: 'Car, vehicle, wheel',
    radical: { character: '車', name: 'くるま (kuruma)', meaning: 'Car' },
    etymology: 'Top-down pictograph of a wooden chariot with wheels and axle.',
    examples: [
      { word: '車', reading: 'くるま', meaningBangla: 'গাড়ী', meaningEnglish: 'Car' },
      { word: '電車', reading: 'でんしゃ', meaningBangla: 'ট্রেন', meaningEnglish: 'Electric train' },
      { word: '自動車', reading: 'じどうしゃ', meaningBangla: 'অটোমোবাইল / মোটরগাড়ি', meaningEnglish: 'Automobile' },
      { word: '自転車', reading: 'じてんしゃ', meaningBangla: 'সাইকেল', meaningEnglish: 'Bicycle' }
    ],
    week: 6,
    lesson: 5
  },
  {
    id: 69,
    kanji: '門',
    strokes: 8,
    onyomi: ['モン'],
    kunyomi: ['かど'],
    meaningBangla: 'দরজা, প্রবেশদ্বার, গেট',
    meaningEnglish: 'Gate, entrance',
    radical: { character: '門', name: 'もん (mon)', meaning: 'Gate' },
    etymology: 'Pictograph of a traditional two-winged swinging courtyard gate.',
    examples: [
      { word: '門', reading: 'もん', meaningBangla: 'গেট / ফটক', meaningEnglish: 'Gate' },
      { word: '専門', reading: 'せんもん', meaningBangla: 'বিশেষজ্ঞতা / মেজর বিষয়', meaningEnglish: 'Specialty' }
    ],
    week: 6,
    lesson: 5
  },
  {
    id: 70,
    kanji: '午',
    strokes: 4,
    onyomi: ['ゴ'],
    kunyomi: ['うま'],
    meaningBangla: 'দুপুর, মধ্যাহ্ন',
    meaningEnglish: 'Noon, sign of the horse',
    radical: { character: '十', name: 'じゅう (juu)', meaning: 'Ten' },
    etymology: 'Represents the sun reaching the central meridian point at noon.',
    examples: [
      { word: '午前', reading: 'ごぜん', meaningBangla: 'সকাল (AM)', meaningEnglish: 'Morning / A.M.' },
      { word: '午後', reading: 'ごご', meaningBangla: 'বিকাল (PM)', meaningEnglish: 'Afternoon / P.M.' }
    ],
    week: 6,
    lesson: 5
  },
  {
    id: 71,
    kanji: '大',
    strokes: 3,
    onyomi: ['ダイ', 'タイ'],
    kunyomi: ['おお', 'おお.きい'],
    meaningBangla: 'বড়, বিশাল',
    meaningEnglish: 'Big, large, great',
    radical: { character: '大', name: 'だい (dai)', meaning: 'Big' },
    etymology: 'Pictograph of an adult human spreading both arms and legs wide.',
    examples: [
      { word: '大きい', reading: 'おおきい', meaningBangla: 'বড়', meaningEnglish: 'Big' },
      { word: '大学', reading: 'だいがく', meaningBangla: 'বিশ্ববিদ্যালয়', meaningEnglish: 'University' },
      { word: '大人', reading: 'おとな', meaningBangla: 'প্রাপ্তবয়স্ক', meaningEnglish: 'Adult' }
    ],
    week: 6,
    lesson: 6
  },
  {
    id: 72,
    kanji: '小',
    strokes: 3,
    onyomi: ['ショウ'],
    kunyomi: ['ちい.さい', 'こ', 'お'],
    meaningBangla: 'ছোট',
    meaningEnglish: 'Small, little',
    radical: { character: '小', name: 'しょう (shou)', meaning: 'Small' },
    etymology: 'Splitting something tiny into even smaller fine particles.',
    examples: [
      { word: '小さい', reading: 'ちいさい', meaningBangla: 'ছোট', meaningEnglish: 'Small' },
      { word: '小学校', reading: 'しょうがっこう', meaningBangla: 'প্রাইমারী স্কুল', meaningEnglish: 'Elementary school' },
      { word: '小川', reading: 'おがわ', meaningBangla: 'ছোট নদী', meaningEnglish: 'Stream / brook' }
    ],
    week: 6,
    lesson: 6
  },
  {
    id: 73,
    kanji: '高',
    strokes: 10,
    onyomi: ['コウ'],
    kunyomi: ['たか.い', 'たか'],
    meaningBangla: 'উঁচু, দামী',
    meaningEnglish: 'Tall, high, expensive',
    radical: { character: '高', name: 'たかい (takai)', meaning: 'Tall' },
    etymology: 'Pictograph of a multi-storied watchtower built on high foundations.',
    examples: [
      { word: '高い', reading: 'たかい', meaningBangla: 'উঁচু / দামী', meaningEnglish: 'Expensive / tall' },
      { word: '高校生', reading: 'こうこうせい', meaningBangla: 'হাইস্কুল ছাত্র', meaningEnglish: 'High school student' }
    ],
    week: 6,
    lesson: 6
  },
  {
    id: 74,
    kanji: '安',
    strokes: 6,
    onyomi: ['アン'],
    kunyomi: ['やす.い'],
    meaningBangla: 'সস্তা, নিরাপদ, শান্ত',
    meaningEnglish: 'Cheap, safe, calm',
    radical: { character: '宀', name: 'うかんむり (ukanmuri)', meaning: 'Roof' },
    etymology: 'A woman (女) peacefully resting safely under a household roof (宀).',
    examples: [
      { word: '安い', reading: 'やすい', meaningBangla: 'সস্তা', meaningEnglish: 'Cheap' },
      { word: '安心する', reading: 'あんしんする', meaningBangla: 'নিশ্চিন্ত হওয়া', meaningEnglish: 'To feel relieved' },
      { word: '安全', reading: 'あんぜん', meaningBangla: 'নিরাপদ', meaningEnglish: 'Safe' }
    ],
    week: 6,
    lesson: 6
  },
  {
    id: 75,
    kanji: '新',
    strokes: 13,
    onyomi: ['シン'],
    kunyomi: ['あたら.しい', 'あら.た'],
    meaningBangla: 'নতুন',
    meaningEnglish: 'New, fresh',
    radical: { character: '斤', name: 'おの (ono)', meaning: 'Axe' },
    etymology: 'Using an axe (斤) to cut fresh firewood (木) standing in place (立).',
    examples: [
      { word: '新しい', reading: 'あたらしい', meaningBangla: 'নতুন', meaningEnglish: 'New' },
      { word: '新聞', reading: 'しんぶん', meaningBangla: 'সংবাদপত্র', meaningEnglish: 'Newspaper' },
      { word: '新幹線', reading: 'しんかんせん', meaningBangla: 'বুলেট ট্রেন', meaningEnglish: 'Bullet train' }
    ],
    week: 6,
    lesson: 6
  },
  {
    id: 76,
    kanji: '古',
    strokes: 5,
    onyomi: ['コ'],
    kunyomi: ['ふる.い'],
    meaningBangla: 'পুরাতন',
    meaningEnglish: 'Old, ancient',
    radical: { character: '口', name: 'くち (kuchi)', meaning: 'Mouth' },
    etymology: 'Tales passed orally through the mouth (口) over ten (十) generations.',
    examples: [
      { word: '古い', reading: 'ふるい', meaningBangla: 'পুরাতন', meaningEnglish: 'Old' },
      { word: '中古車', reading: 'ちゅうこしゃ', meaningBangla: 'ব্যবহৃত পুরাতন গাড়ি', meaningEnglish: 'Secondhand car' }
    ],
    week: 6,
    lesson: 6
  },
  {
    id: 77,
    kanji: '長',
    strokes: 8,
    onyomi: ['チョウ'],
    kunyomi: ['なが.い'],
    meaningBangla: 'লম্বা, দীর্ঘ, প্রধান',
    meaningEnglish: 'Long, leader, chief',
    radical: { character: '長', name: 'ながい (nagai)', meaning: 'Long' },
    etymology: 'Depicts an elder with long flowing hair supported by a cane.',
    examples: [
      { word: '長い', reading: 'ながい', meaningBangla: 'লম্বা / দীর্ঘ', meaningEnglish: 'Long' },
      { word: '社長', reading: 'しゃちょう', meaningBangla: 'কোম্পানি প্রেসিডেন্ট', meaningEnglish: 'Company president' },
      { word: '校長', reading: 'こうちょう', meaningBangla: 'প্রিন্সিপাল', meaningEnglish: 'Principal' }
    ],
    week: 6,
    lesson: 6
  },
  {
    id: 78,
    kanji: '多',
    strokes: 6,
    onyomi: ['タ'],
    kunyomi: ['おお.い'],
    meaningBangla: 'অনেক, প্রচুর',
    meaningEnglish: 'Many, frequent, much',
    radical: { character: '夕', name: 'ゆうべ (yuube)', meaning: 'Evening' },
    etymology: 'Piling multiple pieces of evening meat (夕) upon each other to show abundance.',
    examples: [
      { word: '多い', reading: 'おおい', meaningBangla: 'অনেক / প্রচুর', meaningEnglish: 'Many / much' },
      { word: '多少', reading: 'たしょう', meaningBangla: 'কমবেশি / কিছুটা', meaningEnglish: 'Somewhat / more or less' }
    ],
    week: 6,
    lesson: 6
  },
  {
    id: 79,
    kanji: '少',
    strokes: 4,
    onyomi: ['ショウ'],
    kunyomi: ['すく.ない', 'すこ.し'],
    meaningBangla: 'কম, অল্প',
    meaningEnglish: 'Few, little',
    radical: { character: '小', name: 'しょう (shou)', meaning: 'Small' },
    etymology: 'Derived from 小 (small) with an extra slash to emphasize a minimal remaining fraction.',
    examples: [
      { word: '少ない', reading: 'すくない', meaningBangla: 'কম', meaningEnglish: 'Few' },
      { word: '少し', reading: 'すこし', meaningBangla: 'একটু / অল্প', meaningEnglish: 'A little' },
      { word: '少年', reading: 'しょうねん', meaningBangla: 'কিশোর বালক', meaningEnglish: 'Boy' }
    ],
    week: 6,
    lesson: 6
  },
  {
    id: 80,
    kanji: '早',
    strokes: 6,
    onyomi: ['ソウ', 'サッ'],
    kunyomi: ['はや.い', 'はや'],
    meaningBangla: 'দ্রুত, তাড়াতাড়ি, ভোরে',
    meaningEnglish: 'Early, fast',
    radical: { character: '日', name: 'ひ (hi)', meaning: 'Sun' },
    etymology: 'The sun (日) just emerging above the horizon plants (十) in the early morning.',
    examples: [
      { word: '早い', reading: 'はやい', meaningBangla: 'তাড়াতাড়ি / দ্রুত', meaningEnglish: 'Early / fast' },
      { word: '早朝', reading: 'そうちょう', meaningBangla: 'ভোরবেলা', meaningEnglish: 'Early morning' }
    ],
    week: 6,
    lesson: 6
  },
  {
    id: 81,
    kanji: '行',
    strokes: 6,
    onyomi: ['コウ', 'ギョウ'],
    kunyomi: ['い.く', 'ゆ.く', 'おこな.う'],
    meaningBangla: 'যাওয়া, অনুষ্ঠিত করা',
    meaningEnglish: 'Go, conduct, act',
    radical: { character: '行', name: 'ぎょう (gyou)', meaning: 'To go' },
    etymology: 'Pictograph of a four-way street intersection representing movement and going.',
    examples: [
      { word: '行く', reading: 'いく', meaningBangla: 'যাওয়া', meaningEnglish: 'To go' },
      { word: '行います', reading: 'おこないます', meaningBangla: 'অনুষ্ঠিত করা / সম্পাদন করা', meaningEnglish: 'To conduct' },
      { word: '銀行', reading: 'ぎんこう', meaningBangla: 'ব্যাংক', meaningEnglish: 'Bank' }
    ],
    week: 7,
    lesson: 7
  },
  {
    id: 82,
    kanji: '来',
    strokes: 7,
    onyomi: ['ライ', 'タイ'],
    kunyomi: ['く.る', 'きた.る'],
    meaningBangla: 'আসা, আগামী',
    meaningEnglish: 'Come, next, future',
    radical: { character: '木', name: 'き (ki)', meaning: 'Tree' },
    etymology: 'Originally a pictograph of ripening ears of wheat brought in from afar.',
    examples: [
      { word: '来る', reading: 'くる', meaningBangla: 'আসা', meaningEnglish: 'To come' },
      { word: '来年', reading: 'らいねん', meaningBangla: 'আগামী বছর', meaningEnglish: 'Next year' },
      { word: '来週', reading: 'らいしゅう', meaningBangla: 'আগামী সপ্তাহ', meaningEnglish: 'Next week' }
    ],
    week: 7,
    lesson: 7
  },
  {
    id: 83,
    kanji: '食',
    strokes: 9,
    onyomi: ['ショク', 'ジキ'],
    kunyomi: ['た.べる', 'く.う'],
    meaningBangla: 'খাওয়া, খাদ্য',
    meaningEnglish: 'Eat, food, meal',
    radical: { character: '食 / 飠', name: 'しょく (shoku)', meaning: 'Eat, food' },
    etymology: 'A covered bowl of steaming food served with a spoon.',
    examples: [
      { word: '食べる', reading: 'たべる', meaningBangla: 'খাওয়া', meaningEnglish: 'To eat' },
      { word: '食堂', reading: 'しょくどう', meaningBangla: 'ক্যান্টিন / ডাইনিং', meaningEnglish: 'Cafeteria' },
      { word: '外食する', reading: 'がいしょくする', meaningBangla: 'বাইরে খাওয়া', meaningEnglish: 'Eat out' }
    ],
    week: 7,
    lesson: 7
  },
  {
    id: 84,
    kanji: '見',
    strokes: 7,
    onyomi: ['ケン'],
    kunyomi: ['み.る', 'み.せる'],
    meaningBangla: 'দেখা, দেখানো',
    meaningEnglish: 'See, look, visible',
    radical: { character: '見', name: 'みる (miru)', meaning: 'See' },
    etymology: 'An eye (目) sitting on human legs (儿), focusing on observation.',
    examples: [
      { word: '見る', reading: 'みる', meaningBangla: 'দেখা', meaningEnglish: 'To see' },
      { word: '見せる', reading: 'みせる', meaningBangla: 'দেখানো', meaningEnglish: 'To show' },
      { word: '見学', reading: 'けんがく', meaningBangla: 'পরিদর্শন করা', meaningEnglish: 'Study tour / visit' }
    ],
    week: 7,
    lesson: 7
  },
  {
    id: 85,
    kanji: '入',
    strokes: 2,
    onyomi: ['ニュウ'],
    kunyomi: ['はい.る', 'い.れる'],
    meaningBangla: 'প্রবেশ করা, ঢোকানো',
    meaningEnglish: 'Enter, insert',
    radical: { character: '入', name: 'いる (iru)', meaning: 'Enter' },
    etymology: 'A wedge entering into an opening or fissure.',
    examples: [
      { word: '入る', reading: 'はいる', meaningBangla: 'প্রবেশ করা', meaningEnglish: 'To enter' },
      { word: '入れる', reading: 'いれる', meaningBangla: 'ঢোকানো', meaningEnglish: 'To put in' },
      { word: '入口', reading: 'いりぐち', meaningBangla: 'প্রবেশ পথ', meaningEnglish: 'Entrance' }
    ],
    week: 7,
    lesson: 7
  },
  {
    id: 86,
    kanji: '出',
    strokes: 5,
    onyomi: ['シュツ', 'スイ'],
    kunyomi: ['で.る', 'だ.す'],
    meaningBangla: 'বের হওয়া, জমা দেওয়া',
    meaningEnglish: 'Exit, leave, submit',
    radical: { character: '凵', name: 'かんにょう (kannyou)', meaning: 'Open box' },
    etymology: 'Sprouts emerging out one above the other from a ground container.',
    examples: [
      { word: '出る', reading: 'でる', meaningBangla: 'বের হওয়া', meaningEnglish: 'To exit / leave' },
      { word: '出す', reading: 'だす', meaningBangla: 'জমা দেওয়া / বের করা', meaningEnglish: 'To submit / take out' },
      { word: '出口', reading: 'でぐち', meaningBangla: 'বের হওয়ার গেট', meaningEnglish: 'Exit' }
    ],
    week: 7,
    lesson: 7
  },
  {
    id: 87,
    kanji: '立',
    strokes: 5,
    onyomi: ['リツ', 'リュウ'],
    kunyomi: ['た.つ', 'た.てる'],
    meaningBangla: 'দাঁড়ানো',
    meaningEnglish: 'Stand up, establish',
    radical: { character: '立', name: 'たつ (tatsu)', meaning: 'Stand' },
    etymology: 'Pictograph of a person standing upright firmly on the ground surface.',
    examples: [
      { word: '立つ', reading: 'たつ', meaningBangla: 'দাঁড়ানো', meaningEnglish: 'To stand' },
      { word: '国立大学', reading: 'こくりつだいがく', meaningBangla: 'জাতীয় বিশ্ববিদ্যালয়', meaningEnglish: 'National university' }
    ],
    week: 7,
    lesson: 7
  },
  {
    id: 88,
    kanji: '書',
    strokes: 10,
    onyomi: ['ショ'],
    kunyomi: ['か.く'],
    meaningBangla: 'লেখা, গ্রন্থ',
    meaningEnglish: 'Write, book',
    radical: { character: '曰', name: 'いわく (iwaku)', meaning: 'Say' },
    etymology: 'A hand holding a writing brush (聿) recording words upon an open slate.',
    examples: [
      { word: '書く', reading: 'かく', meaningBangla: 'লেখা', meaningEnglish: 'To write' },
      { word: '読書', reading: 'どくしょ', meaningBangla: 'বই পড়া', meaningEnglish: 'Reading books' },
      { word: '辞書', reading: 'じしょ', meaningBangla: 'অভিধান', meaningEnglish: 'Dictionary' }
    ],
    week: 7,
    lesson: 7
  },
  {
    id: 89,
    kanji: '言',
    strokes: 7,
    onyomi: ['ゲン', 'ゴン'],
    kunyomi: ['い.う', 'こと'],
    meaningBangla: 'বলা, কথা, ভাষা',
    meaningEnglish: 'Say, speech, word',
    radical: { character: '言', name: 'ことば (kotoba)', meaning: 'Word, speech' },
    etymology: 'A flute or sound organ vibrating from mouth, expressing articulate speech.',
    examples: [
      { word: '言う', reading: 'いう', meaningBangla: 'বলা', meaningEnglish: 'To say' },
      { word: '言語', reading: 'げんご', meaningBangla: 'ভাষা', meaningEnglish: 'Language' },
      { word: '言葉', reading: 'ことば', meaningBangla: 'শব্দ / কথা', meaningEnglish: 'Words / speech' }
    ],
    week: 7,
    lesson: 7
  },
  {
    id: 90,
    kanji: '飲',
    strokes: 12,
    onyomi: ['イン'],
    kunyomi: ['の.む'],
    meaningBangla: 'পান করা, পানীয়',
    meaningEnglish: 'Drink',
    radical: { character: '食', name: 'しょく (shoku)', meaning: 'Eat' },
    etymology: 'Food/drink vessel (食) with an open throat (欠) gulping fluid down.',
    examples: [
      { word: '飲む', reading: 'のむ', meaningBangla: 'পান করা', meaningEnglish: 'To drink' },
      { word: '飲み物', reading: 'のみもの', meaningBangla: 'পানীয়', meaningEnglish: 'Beverage / drink' }
    ],
    week: 7,
    lesson: 7
  },
  {
    id: 91,
    kanji: '話',
    strokes: 13,
    onyomi: ['ワ'],
    kunyomi: ['はな.す', 'はなし'],
    meaningBangla: 'কথা বলা, কথোপকথন, গল্প',
    meaningEnglish: 'Talk, conversation, story',
    radical: { character: '言', name: 'ことば (kotoba)', meaning: 'Speech' },
    phoneticElement: { element: '舌', sound: 'shita', explanation: 'Tongue' },
    etymology: 'Using speech (言) and tongue (舌) to share stories with others.',
    examples: [
      { word: '話す', reading: 'はなす', meaningBangla: 'কথা বলা', meaningEnglish: 'To talk' },
      { word: '電話', reading: 'でんわ', meaningBangla: 'টেলিফোন', meaningEnglish: 'Telephone' },
      { word: '会話', reading: 'かいわ', meaningBangla: 'কথোপকথন', meaningEnglish: 'Conversation' }
    ],
    week: 8,
    lesson: 8
  },
  {
    id: 92,
    kanji: '読',
    strokes: 14,
    onyomi: ['ドク', 'トク'],
    kunyomi: ['よ.む'],
    meaningBangla: 'পড়া, পাঠ করা',
    meaningEnglish: 'Read',
    radical: { character: '言', name: 'ことば (kotoba)', meaning: 'Speech' },
    phoneticElement: { element: '売', sound: 'doku', explanation: 'Selling / reciting syllables out loud' },
    etymology: 'Using words (言) to decipher written text and explain meanings.',
    examples: [
      { word: '読む', reading: 'よむ', meaningBangla: 'পড়া', meaningEnglish: 'To read' },
      { word: '読書', reading: 'どくしょ', meaningBangla: 'বই পড়া', meaningEnglish: 'Reading' }
    ],
    week: 8,
    lesson: 8
  },
  {
    id: 93,
    kanji: '語',
    strokes: 14,
    onyomi: ['ゴ'],
    kunyomi: ['かた.る'],
    meaningBangla: 'ভাষা, বলা, গল্প বলা',
    meaningEnglish: 'Language, word, discourse',
    radical: { character: '言', name: 'ことば (kotoba)', meaning: 'Speech' },
    phoneticElement: { element: '吾', sound: 'go', explanation: 'Self' },
    etymology: 'Speaking (言) one\'s own (吾) thoughts in an orderly language.',
    examples: [
      { word: '日本語', reading: 'にほんご', meaningBangla: 'জাপানিজ ভাষা', meaningEnglish: 'Japanese language' },
      { word: '英語', reading: 'えいご', meaningBangla: 'ইংরেজি ভাষা', meaningEnglish: 'English language' },
      { word: '外国語', reading: 'がいこくご', meaningBangla: 'বিদেশি ভাষা', meaningEnglish: 'Foreign language' }
    ],
    week: 8,
    lesson: 8
  },
  {
    id: 94,
    kanji: '間',
    strokes: 12,
    onyomi: ['カン', 'ケン'],
    kunyomi: ['あいだ', 'ま'],
    meaningBangla: 'মধ্যে, সময়কাল, ব্যবধান',
    meaningEnglish: 'Interval, space, between, time',
    radical: { character: '門', name: 'もん (mon)', meaning: 'Gate' },
    etymology: 'The sunlight (日) shining through the gap between double gate doors (門).',
    examples: [
      { word: '間', reading: 'あいだ', meaningBangla: 'মাঝখানে / মধ্যে', meaningEnglish: 'Between' },
      { word: '一年間', reading: 'いちねんかん', meaningBangla: 'এক বছর সময়কাল', meaningEnglish: 'For one year' },
      { word: '時間に間に合う', reading: 'まにあう', meaningBangla: 'সময়মতো পৌঁছানো', meaningEnglish: 'To be in time' }
    ],
    week: 8,
    lesson: 8
  },
  {
    id: 95,
    kanji: '聞',
    strokes: 14,
    onyomi: ['ブン', 'モン'],
    kunyomi: ['き.く', 'き.こえる'],
    meaningBangla: 'শোনা, শুনতে পাওয়া',
    meaningEnglish: 'Hear, listen, ask',
    radical: { character: '耳', name: 'みみ (mimi)', meaning: 'Ear' },
    phoneticElement: { element: '門', sound: 'mon', explanation: 'Gate' },
    etymology: 'Pressing one\'s ear (耳) against a door (門) to listen attentively.',
    examples: [
      { word: '聞く', reading: 'きく', meaningBangla: 'শোনা / জিজ্ঞাসা করা', meaningEnglish: 'To listen / ask' },
      { word: '聞こえる', reading: 'きこえる', meaningBangla: 'শুনতে পাওয়া', meaningEnglish: 'To be heard' },
      { word: '新聞', reading: 'しんぶん', meaningBangla: 'সংবাদপত্র', meaningEnglish: 'Newspaper' }
    ],
    week: 8,
    lesson: 8
  },
  {
    id: 96,
    kanji: '買',
    strokes: 12,
    onyomi: ['バイ'],
    kunyomi: ['か.う'],
    meaningBangla: 'কেনা, ক্রয় করা',
    meaningEnglish: 'Buy, purchase',
    radical: { character: '貝', name: 'かい (kai)', meaning: 'Shell / money' },
    etymology: 'Exchanging money/shells (貝) over a counter grid (罒) to purchase goods.',
    examples: [
      { word: '買う', reading: 'かう', meaningBangla: 'কেনা', meaningEnglish: 'To buy' },
      { word: '買い物', reading: 'かいもの', meaningBangla: 'কেনাকাটা', meaningEnglish: 'Shopping' }
    ],
    week: 8,
    lesson: 8
  },
  {
    id: 97,
    kanji: '休',
    strokes: 6,
    onyomi: ['キュウ'],
    kunyomi: ['やす.む', 'やす.まる'],
    meaningBangla: 'বিশ্রাম নেওয়া, ছুটি',
    meaningEnglish: 'Rest, holiday, vacation',
    radical: { character: '亻', name: 'にんべん (ninben)', meaning: 'Person' },
    etymology: 'A person (亻) leaning comfortably against a tree (木) to take a rest.',
    examples: [
      { word: '休む', reading: 'やすむ', meaningBangla: 'বিশ্রাম নেওয়া', meaningEnglish: 'To rest' },
      { word: '休み', reading: 'やすみ', meaningBangla: 'ছুটি', meaningEnglish: 'Holiday / break' },
      { word: '休日', reading: 'きゅうじつ', meaningBangla: 'ছুটির দিন', meaningEnglish: 'Day off' },
      { word: '夏休み', reading: 'なつやすみ', meaningBangla: 'গ্রীষ্মের ছুটি', meaningEnglish: 'Summer vacation' }
    ],
    week: 8,
    lesson: 8
  },
  {
    id: 98,
    kanji: '時',
    strokes: 10,
    onyomi: ['ジ'],
    kunyomi: ['とき'],
    meaningBangla: 'সময়, ঘণ্টা (-টা বাজে)',
    meaningEnglish: 'Time, hour, o\'clock',
    radical: { character: '日', name: 'ひ (hi)', meaning: 'Sun, day' },
    phoneticElement: { element: '寺', sound: 'ji', explanation: 'Temple clock tracking daily bells' },
    etymology: 'Tracking the sun\'s position (日) alongside temple bells (寺) to mark the hour.',
    examples: [
      { word: '四時', reading: 'よじ', meaningBangla: '৪টা বাজে', meaningEnglish: '4 o\'clock' },
      { word: '一時間', reading: 'いちじかん', meaningBangla: '১ ঘণ্টা', meaningEnglish: '1 hour' },
      { word: '時計', reading: 'とけい', meaningBangla: 'ঘড়ি', meaningEnglish: 'Clock / watch' },
      { word: '時', reading: 'とき', meaningBangla: 'সময় (যখন)', meaningEnglish: 'When / time' }
    ],
    week: 8,
    lesson: 8
  },
  {
    id: 99,
    kanji: '週',
    strokes: 11,
    onyomi: ['シュウ'],
    kunyomi: [],
    meaningBangla: 'সপ্তাহ',
    meaningEnglish: 'Week',
    radical: { character: '辶', name: 'しんにょう (shinnyou)', meaning: 'Road, movement' },
    phoneticElement: { element: '周', sound: 'shuu', explanation: 'Circuit / cycle' },
    etymology: 'A cycle (周) that completes its movement (辶) in 7 days.',
    examples: [
      { word: '一週間', reading: 'いっしゅうかん', meaningBangla: '১ সপ্তাহ', meaningEnglish: 'One week' },
      { word: '今週', reading: 'こんしゅう', meaningBangla: 'এই সপ্তাহ', meaningEnglish: 'This week' },
      { word: '来週', reading: 'らいしゅう', meaningBangla: 'আগামী সপ্তাহ', meaningEnglish: 'Next week' },
      { word: '先週', reading: 'せんしゅう', meaningBangla: 'গত সপ্তাহ', meaningEnglish: 'Last week' }
    ],
    week: 8,
    lesson: 8
  },
  {
    id: 100,
    kanji: '道',
    strokes: 12,
    onyomi: ['ドウ', 'トウ'],
    kunyomi: ['みち'],
    meaningBangla: 'রাস্তা, পথ, পদ্ধতি',
    meaningEnglish: 'Road, path, way',
    radical: { character: '辶', name: 'しんにょう (shinnyou)', meaning: 'Movement, walk' },
    phoneticElement: { element: '首', sound: 'dou', explanation: 'Head / leader guiding road' },
    etymology: 'Moving forward (辶) by following where one\'s head/eyes (首) point.',
    examples: [
      { word: '道', reading: 'みち', meaningBangla: 'রাস্তা', meaningEnglish: 'Road / path' },
      { word: '水道', reading: 'すいどう', meaningBangla: 'জল সরবরাহের পদ্ধতি', meaningEnglish: 'Water supply' },
      { word: '書道', reading: 'しょどう', meaningBangla: 'ক্যালিগ্রাফি', meaningEnglish: 'Calligraphy' }
    ],
    week: 8,
    lesson: 8
  },
  {
    id: 101,
    kanji: '今',
    strokes: 4,
    onyomi: ['コン', 'キン'],
    kunyomi: ['いま'],
    meaningBangla: 'এখন, বর্তমান',
    meaningEnglish: 'Now, present',
    radical: { character: '人', name: 'ひと (hito)', meaning: 'Person' },
    etymology: 'An enclosure containing the present immediate instant.',
    examples: [
      { word: '今', reading: 'いま', meaningBangla: 'এখন', meaningEnglish: 'Now' },
      { word: '今月', reading: 'こんげつ', meaningBangla: 'এই মাস', meaningEnglish: 'This month' },
      { word: '今年', reading: 'ことし', meaningBangla: 'এই বছর', meaningEnglish: 'This year' },
      { word: '今日', reading: 'きょう', meaningBangla: 'আজ', meaningEnglish: 'Today' }
    ],
    week: 8,
    lesson: 8
  },
  {
    id: 102,
    kanji: '会',
    strokes: 6,
    onyomi: ['カイ', 'エ'],
    kunyomi: ['あ.う'],
    meaningBangla: 'দেখা করা, সাক্ষাৎ, মিলন',
    meaningEnglish: 'Meet, party, association',
    radical: { character: '人', name: 'ひと (hito)', meaning: 'Person' },
    etymology: 'People gathered together under one roof assembling collaboratively.',
    examples: [
      { word: '会います', reading: 'あいます', meaningBangla: 'দেখা করা', meaningEnglish: 'To meet' },
      { word: '会社', reading: 'かいしゃ', meaningBangla: 'কোম্পানি', meaningEnglish: 'Company' },
      { word: '会話', reading: 'かいわ', meaningBangla: 'কথোপকথন', meaningEnglish: 'Conversation' },
      { word: '会議', reading: 'かいぎ', meaningBangla: 'মিটিং', meaningEnglish: 'Meeting' }
    ],
    week: 8,
    lesson: 8
  },
  {
    id: 103,
    kanji: '社',
    strokes: 7,
    onyomi: ['シャ'],
    kunyomi: ['やしろ'],
    meaningBangla: 'প্রতিষ্ঠান, সমাজ, মন্দির',
    meaningEnglish: 'Company, shrine, society',
    radical: { character: '礻', name: 'しめすへん (shimesuhen)', meaning: 'Altar, spirit' },
    phoneticElement: { element: '土', sound: 'sha', explanation: 'Earth altar sacred ground' },
    etymology: 'An altar (礻) erected on sacred earth (土) where society assembles.',
    examples: [
      { word: '会社', reading: 'かいしゃ', meaningBangla: 'কোম্পানি', meaningEnglish: 'Company' },
      { word: '社員', reading: 'しゃいん', meaningBangla: 'কর্মচারী', meaningEnglish: 'Employee' },
      { word: '社会', reading: 'しゃかい', meaningBangla: 'সমাজ', meaningEnglish: 'Society' },
      { word: '社長', reading: 'しゃちょう', meaningBangla: 'কোম্পানি প্রেসিডেন্ট', meaningEnglish: 'Company president' },
      { word: '神社', reading: 'じんじゃ', meaningBangla: 'শিন্তো মন্দির', meaningEnglish: 'Shinto shrine' }
    ],
    week: 8,
    lesson: 8
  },
  {
    id: 104,
    kanji: '店',
    strokes: 8,
    onyomi: ['テン'],
    kunyomi: ['みせ'],
    meaningBangla: 'দোকান',
    meaningEnglish: 'Shop, store',
    radical: { character: '广', name: 'まだれ (madare)', meaning: 'Building' },
    phoneticElement: { element: '占', sound: 'ten', explanation: 'Fortune teller\'s stall / occupied booth' },
    etymology: 'A covered booth (广) where goods are presented and sold.',
    examples: [
      { word: '店', reading: 'みせ', meaningBangla: 'দোকান', meaningEnglish: 'Store / shop' },
      { word: '店員', reading: 'てんいん', meaningBangla: 'দোকান কর্মচারী', meaningEnglish: 'Store clerk' },
      { word: '売店', reading: 'ばいてん', meaningBangla: 'বিক্রয় কেন্দ্র / স্টল', meaningEnglish: 'Kiosk / stall' }
    ],
    week: 8,
    lesson: 8
  },
  {
    id: 105,
    kanji: '駅',
    strokes: 14,
    onyomi: ['エキ'],
    kunyomi: [],
    meaningBangla: 'স্টেশন (রেলওয়ে)',
    meaningEnglish: 'Station',
    radical: { character: '馬', name: 'うま (uma)', meaning: 'Horse' },
    phoneticElement: { element: '尺', sound: 'eki', explanation: 'Measuring distance between relay posts' },
    etymology: 'Relay post stations where post horses (馬) were changed along transport routes.',
    examples: [
      { word: '駅', reading: 'えき', meaningBangla: 'স্টেশন', meaningEnglish: 'Train station' },
      { word: '駅前', reading: 'えきまえ', meaningBangla: 'স্টেশনের সামনে', meaningEnglish: 'In front of station' },
      { word: '駅長', reading: 'えきちょう', meaningBangla: 'স্টেশন মাস্টার', meaningEnglish: 'Station master' }
    ],
    week: 8,
    lesson: 8
  },
  {
    id: 106,
    kanji: '花',
    strokes: 7,
    onyomi: ['カ'],
    kunyomi: ['はな'],
    meaningBangla: 'ফুল',
    meaningEnglish: 'Flower, blossom',
    radical: { character: '艹', name: 'くさかんむり (kusakanmuri)', meaning: 'Grass, flora' },
    phoneticElement: { element: '化', sound: 'ka', explanation: 'Transforming into flower' },
    etymology: 'Flora (艹) transforming (化) and blooming into radiant colored petals.',
    examples: [
      { word: '花', reading: 'はな', meaningBangla: 'ফুল', meaningEnglish: 'Flower' },
      { word: '花見', reading: 'はなみ', meaningBangla: 'চেরী ফুল দেখার উৎসব', meaningEnglish: 'Cherry blossom viewing' },
      { word: '花火', reading: 'はなび', meaningBangla: 'আতশবাজি', meaningEnglish: 'Fireworks' },
      { word: '花屋', reading: 'はなや', meaningBangla: 'ফুলের দোকান', meaningEnglish: 'Flower shop' }
    ],
    week: 8,
    lesson: 8
  },
  {
    id: 107,
    kanji: '国',
    strokes: 8,
    onyomi: ['コク'],
    kunyomi: ['くに'],
    meaningBangla: 'দেশ, রাষ্ট্র',
    meaningEnglish: 'Country, nation',
    radical: { character: '囗', name: 'くにがまえ (kunigamae)', meaning: 'Enclosure' },
    phoneticElement: { element: '玉', sound: 'koku', explanation: 'Jewel / territory guarded' },
    etymology: 'A kingdom\'s precious jewel territory (玉) protected within fortified border walls (囗).',
    examples: [
      { word: '国', reading: 'くに', meaningBangla: 'দেশ', meaningEnglish: 'Country' },
      { word: '外国', reading: 'がいこく', meaningBangla: 'বিদেশ', meaningEnglish: 'Foreign country' },
      { word: '中国', reading: 'ちゅうごく', meaningBangla: 'চীন', meaningEnglish: 'China' },
      { word: 'お国', reading: 'おくにと', meaningBangla: 'দেশ (শ্রদ্ধাভরে)', meaningEnglish: 'Your country' }
    ],
    week: 8,
    lesson: 8
  },
  {
    id: 108,
    kanji: '白',
    strokes: 5,
    onyomi: ['ハク', 'ビャク'],
    kunyomi: ['しろ', 'しろ.い'],
    meaningBangla: 'সাদা',
    meaningEnglish: 'White',
    radical: { character: '白', name: 'しろ (shiro)', meaning: 'White' },
    etymology: 'Pictograph of a sun beam ray or a polished white grain of rice.',
    examples: [
      { word: '白い', reading: 'しろい', meaningBangla: 'সাদা', meaningEnglish: 'White' },
      { word: '白書', reading: 'はくしょ', meaningBangla: 'অফিসিয়াল রিপোর্ট / শ্বেতপত্র', meaningEnglish: 'White paper' },
      { word: '真っ白', reading: 'まっしろ', meaningBangla: 'তুষার শুভ্র সাদা', meaningEnglish: 'Pure white' }
    ],
    week: 8,
    lesson: 8
  },
  {
    id: 109,
    kanji: '空',
    strokes: 8,
    onyomi: ['クウ'],
    kunyomi: ['そら', 'あ.く', 'から'],
    meaningBangla: 'আকাশ, খালি',
    meaningEnglish: 'Sky, empty, air',
    radical: { character: '穴', name: 'あな (ana)', meaning: 'Cave, hole' },
    phoneticElement: { element: '工', sound: 'kuu', explanation: 'Craft / hollow space' },
    etymology: 'A cave hollowed out (穴) opening into the vast empty expanse of the open sky.',
    examples: [
      { word: '空', reading: 'そら', meaningBangla: 'আকাশ', meaningEnglish: 'Sky' },
      { word: '空気', reading: 'くうき', meaningBangla: 'বাতাস / বায়ু', meaningEnglish: 'Air / atmosphere' },
      { word: '大空', reading: 'おおぞら', meaningBangla: 'বিশাল আকাশ', meaningEnglish: 'Big sky' },
      { word: '空港', reading: 'くうこう', meaningBangla: 'বিমানবন্দর', meaningEnglish: 'Airport' }
    ],
    week: 8,
    lesson: 8
  },
  {
    id: 110,
    kanji: '電',
    strokes: 13,
    onyomi: ['デン'],
    kunyomi: [],
    meaningBangla: 'বিদ্যুৎ',
    meaningEnglish: 'Electricity, lightning',
    radical: { character: '雨', name: 'あめ (ame)', meaning: 'Rain' },
    etymology: 'Lightning flashing downward through storm rain clouds (雨).',
    examples: [
      { word: '電気', reading: 'でんき', meaningBangla: 'বিদ্যুৎ / বাতি', meaningEnglish: 'Electricity / light' },
      { word: '電話', reading: 'でんわ', meaningBangla: 'টেলিফোন', meaningEnglish: 'Telephone' },
      { word: '電車', reading: 'でんしゃ', meaningBangla: 'ট্রেন', meaningEnglish: 'Electric train' },
      { word: '電池', reading: 'でんち', meaningBangla: 'ব্যাটারি', meaningEnglish: 'Battery' }
    ],
    week: 8,
    lesson: 8
  }
];
