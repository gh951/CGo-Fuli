// ★ CGO-FULI C-66 글로벌 불용문자·기피 데이터 전체
// 20개국 이름 작명 서비스 — 국가별 불용·기피 데이터

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1. 한국 불용한자 (흉한 의미: 죽음·질병·범죄) — 113자
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
window._C66_FORBID_KO = "亡死哀孤終滅敗傷痛恨哭葬枯凋零落破碎裂禍災厄凶惡毒害賊殺刑囚獄辱恥醜賤貧窮困乏飢餓患疾病疫邪魔鬼妖怪妄荒僻狂暴逆叛怨怒愁憂懼怖驚慌亂混迷惑欺詐瞞盜姦淫嫉妬傲慢惰怠驕奢浪費損虧耗竭絶斷罷廢棄遺逝歿殯棺塚墓幽冥暗癡聾盲啞跛瘡疽瘤癖";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. 만국 공통 위험 특수문자 (SQL 오류·시스템 오류)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
window._C66_DANGER = "<>;'\"(){}[]\\=`|&";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. 일본 추가 불용자 (일본 호적법 기피 한자) — 16자
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
window._C66_FORBID_JA_EXTRA = "悪癌呪屍糞姦死四鐘傘梨輸史邪亡憂";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4. 중국/대만 추가 불용자 (기피 한자) — 16자
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
window._C66_FORBID_ZH_EXTRA = "悪癌呪屍糞姦死四鐘傘梨輸史邪亡憂";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 5. 태국 — 요일별 기피 자음 (태국 전통 작명)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
window._C66_THAI_WEEKDAY = [
  {
    "day": "Sunday",
    "avoid": [
      "ศ",
      "ษ",
      "ส",
      "ห",
      "ฬ",
      "ฮ"
    ]
  },
  {
    "day": "Monday",
    "avoid": [
      "อ"
    ]
  },
  {
    "day": "Tuesday",
    "avoid": [
      "ก",
      "ข",
      "ค",
      "ฆ",
      "ง"
    ]
  },
  {
    "day": "Wednesday-Day",
    "avoid": [
      "จ",
      "ฉ",
      "ช",
      "ซ",
      "ฌ",
      "ญ"
    ]
  },
  {
    "day": "Wednesday-Night",
    "avoid": [
      "บ",
      "ป",
      "ผ",
      "ฝ",
      "พ",
      "ฟ",
      "ภ",
      "ม"
    ]
  },
  {
    "day": "Thursday",
    "avoid": [
      "ด",
      "ต",
      "ถ",
      "ท",
      "ธ",
      "น"
    ]
  },
  {
    "day": "Friday",
    "avoid": [
      "ย",
      "ร",
      "ล",
      "ว"
    ]
  },
  {
    "day": "Saturday",
    "avoid": [
      "ง",
      "ญ",
      "ณ",
      "น",
      "ม"
    ]
  }
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 6. 인도 힌두 — 나크샤트라 27개 (별자리 기반 이름 선택)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
window._C66_NAKSHATRA = [
  {
    "nak": "Ashwini",
    "syl": [
      "Chu",
      "Che",
      "Cho",
      "La"
    ]
  },
  {
    "nak": "Bharani",
    "syl": [
      "Lee",
      "Lu",
      "Le",
      "Lo"
    ]
  },
  {
    "nak": "Krittika",
    "syl": [
      "A",
      "Ee",
      "U",
      "E"
    ]
  },
  {
    "nak": "Rohini",
    "syl": [
      "O",
      "Va",
      "Vi",
      "Vu"
    ]
  },
  {
    "nak": "Mrigashira",
    "syl": [
      "Ve",
      "Vo",
      "Ka",
      "Ki"
    ]
  },
  {
    "nak": "Ardra",
    "syl": [
      "Ku",
      "Gha",
      "Ng",
      "Chha"
    ]
  },
  {
    "nak": "Punarvasu",
    "syl": [
      "Ke",
      "Ko",
      "Ha",
      "Hi"
    ]
  },
  {
    "nak": "Pushya",
    "syl": [
      "Hu",
      "He",
      "Ho",
      "Da"
    ]
  },
  {
    "nak": "Ashlesha",
    "syl": [
      "Dee",
      "Doo",
      "De",
      "Do"
    ]
  },
  {
    "nak": "Magha",
    "syl": [
      "Ma",
      "Me",
      "Mu",
      "Me"
    ]
  },
  {
    "nak": "Purva Phalguni",
    "syl": [
      "Mo",
      "Ta",
      "Tee",
      "Too"
    ]
  },
  {
    "nak": "Uttara Phalguni",
    "syl": [
      "Te",
      "To",
      "Pa",
      "Pee"
    ]
  },
  {
    "nak": "Hasta",
    "syl": [
      "Pu",
      "Sha",
      "Na",
      "Tha"
    ]
  },
  {
    "nak": "Chitra",
    "syl": [
      "Pe",
      "Po",
      "Ra",
      "Re"
    ]
  },
  {
    "nak": "Swati",
    "syl": [
      "Ru",
      "Re",
      "Ro",
      "Ta"
    ]
  },
  {
    "nak": "Visakha",
    "syl": [
      "Tee",
      "Too",
      "Te",
      "To"
    ]
  },
  {
    "nak": "Anuradha",
    "syl": [
      "Na",
      "Nee",
      "Noo",
      "Ne"
    ]
  },
  {
    "nak": "Jyeshtha",
    "syl": [
      "No",
      "Ya",
      "Yee",
      "Yoo"
    ]
  },
  {
    "nak": "Mula",
    "syl": [
      "Ye",
      "Yo",
      "Bha",
      "Bhee"
    ]
  },
  {
    "nak": "Purva Ashadha",
    "syl": [
      "Bhoo",
      "Dha",
      "Fha",
      "Dha"
    ]
  },
  {
    "nak": "Uttara Ashadha",
    "syl": [
      "Bhe",
      "Bho",
      "Ja",
      "Jee"
    ]
  },
  {
    "nak": "Shravana",
    "syl": [
      "Khee",
      "Khoo",
      "Khe",
      "Kho"
    ]
  },
  {
    "nak": "Dhanishta",
    "syl": [
      "Ga",
      "Gee",
      "Goo",
      "Ge"
    ]
  },
  {
    "nak": "Shatabhisha",
    "syl": [
      "Go",
      "Sa",
      "See",
      "Soo"
    ]
  },
  {
    "nak": "Purva Bhadrapada",
    "syl": [
      "Se",
      "So",
      "Da",
      "Dee"
    ]
  },
  {
    "nak": "Uttara Bhadrapada",
    "syl": [
      "Du",
      "Tha",
      "Jha",
      "Gna"
    ]
  },
  {
    "nak": "Revati",
    "syl": [
      "De",
      "Do",
      "Cha",
      "Che"
    ]
  }
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 7. 이슬람권 — 99미덕(알라의 속성) 이름 기반
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
window._C66_ARAB_VIRTUES = [
  {
    "ar": "الرحمن",
    "ro": "Ar-Rahman",
    "m": "The Most Merciful"
  },
  {
    "ar": "الرحيم",
    "ro": "Ar-Raheem",
    "m": "The Most Kind"
  },
  {
    "ar": "الملك",
    "ro": "Al-Malik",
    "m": "The Sovereign Lord"
  },
  {
    "ar": "القدوس",
    "ro": "Al-Quddus",
    "m": "The Holy"
  },
  {
    "ar": "السلام",
    "ro": "As-Salam",
    "m": "The Source of Peace"
  },
  {
    "ar": "المهيمن",
    "ro": "Al-Muhaymin",
    "m": "The Protector"
  },
  {
    "ar": "العزيز",
    "ro": "Al-Aziz",
    "m": "The Mighty"
  },
  {
    "ar": "الجبار",
    "ro": "Al-Jabbar",
    "m": "The Compeller"
  },
  {
    "ar": "المتكبر",
    "ro": "Al-Mutakabbir",
    "m": "The Majestic"
  },
  {
    "ar": "الخالق",
    "ro": "Al-Khaliq",
    "m": "The Creator"
  },
  {
    "ar": "البارئ",
    "ro": "Al-Bari",
    "m": "The Evolver"
  },
  {
    "ar": "المصور",
    "ro": "Al-Musawvir",
    "m": "The Fashioner"
  },
  {
    "ar": "الغفار",
    "ro": "Al-Ghaffar",
    "m": "The Forgiver"
  },
  {
    "ar": "القهار",
    "ro": "Al-Qahhar",
    "m": "The Subduer"
  },
  {
    "ar": "الوهاب",
    "ro": "Al-Wahhab",
    "m": "The Bestower"
  },
  {
    "ar": "الرزاق",
    "ro": "Al-Razzaq",
    "m": "The Provider"
  },
  {
    "ar": "الفتاح",
    "ro": "Al-Fattah",
    "m": "The Opener"
  },
  {
    "ar": "العليم",
    "ro": "Al-Alim",
    "m": "The All-Knowing"
  },
  {
    "ar": "القابض",
    "ro": "Al-Qabid",
    "m": "The Constrictor"
  },
  {
    "ar": "الباسط",
    "ro": "Al-Basit",
    "m": "The Expander"
  },
  {
    "ar": "الخافض",
    "ro": "Al-Khafid",
    "m": "The Abaser"
  },
  {
    "ar": "الرافع",
    "ro": "Al-Rafi",
    "m": "The Exalter"
  },
  {
    "ar": "المذل",
    "ro": "Al-Mudhill",
    "m": "The Giver of Dishonor"
  },
  {
    "ar": "السميع",
    "ro": "Al-Sami",
    "m": "The All-Hearing"
  },
  {
    "ar": "البصير",
    "ro": "Al-Basir",
    "m": "The All-Seeing"
  },
  {
    "ar": "الحكم",
    "ro": "Al-Hakam",
    "m": "The Judge"
  },
  {
    "ar": "العدل",
    "ro": "Al-Adl",
    "m": "The Just"
  },
  {
    "ar": "اللطيف",
    "ro": "Al-Latif",
    "m": "The Subtle One"
  },
  {
    "ar": "الخبير",
    "ro": "Al-Khabir",
    "m": "The All-Aware"
  },
  {
    "ar": "الحليم",
    "ro": "Al-Halim",
    "m": "The Forbearing"
  },
  {
    "ar": "العظيم",
    "ro": "Al-Azim",
    "m": "The Magnificent"
  },
  {
    "ar": "الغفور",
    "ro": "Al-Ghafoor",
    "m": "The All-Forgiving"
  },
  {
    "ar": "الشكور",
    "ro": "Al-Shakoor",
    "m": "The Appreciative"
  },
  {
    "ar": "العلي",
    "ro": "Al-Ali",
    "m": "The Highest"
  },
  {
    "ar": "الكبير",
    "ro": "Al-Kabeer",
    "m": "The Most Great"
  },
  {
    "ar": "الحفيظ",
    "ro": "Al-Hafiz",
    "m": "The Preserver"
  },
  {
    "ar": "المقيت",
    "ro": "Al-Muqit",
    "m": "The Sustainer"
  },
  {
    "ar": "الحسيب",
    "ro": "Al-Hasib",
    "m": "The Reckoner"
  },
  {
    "ar": "الجليل",
    "ro": "Al-Jalil",
    "m": "The Sublime One"
  },
  {
    "ar": "الكريم",
    "ro": "Al-Karim",
    "m": "The Generous One"
  },
  {
    "ar": "الرقيب",
    "ro": "Al-Raqib",
    "m": "The Watchful"
  },
  {
    "ar": "المجيب",
    "ro": "Al-Mujib",
    "m": "The Responsive"
  },
  {
    "ar": "الواسع",
    "ro": "Al-Wasi",
    "m": "The All-Engaging"
  },
  {
    "ar": "الحكيم",
    "ro": "Al-Hakim",
    "m": "The Wise"
  },
  {
    "ar": "الودود",
    "ro": "Al-Wadud",
    "m": "The Loving"
  },
  {
    "ar": "المجيد",
    "ro": "Al-Majid",
    "m": "The Most Glorious"
  },
  {
    "ar": "الشهيد",
    "ro": "Al-Shahid",
    "m": "The Witness"
  },
  {
    "ar": "الحق",
    "ro": "Al-Haqq",
    "m": "The Truth"
  },
  {
    "ar": "الوكيل",
    "ro": "Al-Wakil",
    "m": "The Trustee"
  },
  {
    "ar": "القوي",
    "ro": "Al-Qawiy",
    "m": "The Most Strong"
  },
  {
    "ar": "المتين",
    "ro": "Al-Matin",
    "m": "The Firm One"
  },
  {
    "ar": "الولي",
    "ro": "Al-Waliy",
    "m": "The Protecting Friend"
  },
  {
    "ar": "الحميد",
    "ro": "Al-Hamid",
    "m": "The Praiseworthy"
  },
  {
    "ar": "المحصي",
    "ro": "Al-Muhsi",
    "m": "The Counter"
  },
  {
    "ar": "المبدئ",
    "ro": "Al-Mubdi",
    "m": "The Originator"
  },
  {
    "ar": "المحيي",
    "ro": "Al-Muhyi",
    "m": "The Giver of Life"
  },
  {
    "ar": "المميت",
    "ro": "Al-Mumit",
    "m": "The Creator of Death"
  },
  {
    "ar": "الحي",
    "ro": "Al-Hayy",
    "m": "The Alive"
  },
  {
    "ar": "القيום",
    "ro": "Al-Qayyum",
    "m": "The Self-Subsisting"
  },
  {
    "ar": "الواجد",
    "ro": "Al-Wajid",
    "m": "The Perceiver"
  },
  {
    "ar": "الماجد",
    "ro": "Al-Majid",
    "m": "The Illustrious"
  },
  {
    "ar": "الواحد",
    "ro": "Al-Wahid",
    "m": "The Unique"
  },
  {
    "ar": "الأحد",
    "ro": "Al-Ahad",
    "m": "The One"
  },
  {
    "ar": "الصمد",
    "ro": "Al-Samad",
    "m": "The Eternal"
  },
  {
    "ar": "القادر",
    "ro": "Al-Qadir",
    "m": "The Able"
  },
  {
    "ar": "المقتدر",
    "ro": "Al-Muqtadir",
    "m": "The Powerful"
  },
  {
    "ar": "المقدم",
    "ro": "Al-Muqaddim",
    "m": "The Expediter"
  },
  {
    "ar": "الأول",
    "ro": "Al-Awwal",
    "m": "The First"
  },
  {
    "ar": "الآخر",
    "ro": "Al-Akhir",
    "m": "The Last"
  },
  {
    "ar": "الظاهر",
    "ro": "Al-Zahir",
    "m": "The Manifest"
  },
  {
    "ar": "الباطн",
    "ro": "Al-Batin",
    "m": "The Hidden"
  },
  {
    "ar": "الوالي",
    "ro": "Al-Wali",
    "m": "The Governor"
  },
  {
    "ar": "البر",
    "ro": "Al-Barr",
    "m": "The Source of All Goodness"
  },
  {
    "ar": "التواب",
    "ro": "Al-Tawwab",
    "m": "The Acceptor of Repentance"
  },
  {
    "ar": "المنتقم",
    "ro": "Al-Muntaqim",
    "m": "The Avenger"
  },
  {
    "ar": "العفو",
    "ro": "Al-Afuw",
    "m": "The Pardoner"
  },
  {
    "ar": "مالك الملك",
    "ro": "Malik-ul-Mulk",
    "m": "The Eternal Owner of Sovereignty"
  },
  {
    "ar": "ذو الجلال والإكرام",
    "ro": "Dhul-Jalal-wal-Ikram",
    "m": "The Lord of Majesty and Bounty"
  },
  {
    "ar": "المقسط",
    "ro": "Al-Muqsit",
    "m": "The Equitable"
  },
  {
    "ar": "الجامع",
    "ro": "Al-Jami",
    "m": "The Gatherer"
  },
  {
    "ar": "الغني",
    "ro": "Al-Ghani",
    "m": "The Self-Sufficient"
  },
  {
    "ar": "المغني",
    "ro": "Al-Mughni",
    "m": "The Enricher"
  },
  {
    "ar": "المانع",
    "ro": "Al-Mani",
    "m": "The Withholder"
  },
  {
    "ar": "الضار",
    "ro": "Ad-Darr",
    "m": "The Distresser"
  },
  {
    "ar": "النافع",
    "ro": "An-Nafi",
    "m": "The Propitious"
  },
  {
    "ar": "النور",
    "ro": "An-Noor",
    "m": "The Light"
  },
  {
    "ar": "الهادي",
    "ro": "Al-Hadi",
    "m": "The Guide"
  },
  {
    "ar": "البديع",
    "ro": "Al-Badi",
    "m": "The Incomparable"
  },
  {
    "ar": "الباقي",
    "ro": "Al-Baqi",
    "m": "The Everlasting"
  },
  {
    "ar": "الوارث",
    "ro": "Al-Warith",
    "m": "The Supreme Inheritor"
  },
  {
    "ar": "الرشيد",
    "ro": "Ar-Rasheed",
    "m": "The Guide to the Right Path"
  },
  {
    "ar": "الصبور",
    "ro": "As-Saboor",
    "m": "The Patient"
  }
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 8. 국가별 인기 이름 데이터베이스 (19개국)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
window._C66_NAMES = {
  "en": [
    {
      "n": "Ethan",
      "g": "M",
      "m": "strong and enduring"
    },
    {
      "n": "Liam",
      "g": "M",
      "m": "resolute protector"
    },
    {
      "n": "Noah",
      "g": "M",
      "m": "rest and peace"
    },
    {
      "n": "Oliver",
      "g": "M",
      "m": "peace of olive tree"
    },
    {
      "n": "Elijah",
      "g": "M",
      "m": "the Lord is God"
    },
    {
      "n": "James",
      "g": "M",
      "m": "supplanter and leader"
    },
    {
      "n": "Benjamin",
      "g": "M",
      "m": "son of the right hand"
    },
    {
      "n": "Lucas",
      "g": "M",
      "m": "bringer of light"
    },
    {
      "n": "Henry",
      "g": "M",
      "m": "ruler of the home"
    },
    {
      "n": "Alexander",
      "g": "M",
      "m": "defender of men"
    },
    {
      "n": "Mason",
      "g": "M",
      "m": "stone worker and builder"
    },
    {
      "n": "Michael",
      "g": "M",
      "m": "who is like God"
    },
    {
      "n": "Daniel",
      "g": "M",
      "m": "God is my judge"
    },
    {
      "n": "Jacob",
      "g": "M",
      "m": "holder of the heel"
    },
    {
      "n": "Logan",
      "g": "M",
      "m": "small hollow"
    },
    {
      "n": "Jackson",
      "g": "M",
      "m": "son of Jack"
    },
    {
      "n": "Levi",
      "g": "M",
      "m": "joined in harmony"
    },
    {
      "n": "Sebastian",
      "g": "M",
      "m": "venerable and revered"
    },
    {
      "n": "Mateo",
      "g": "M",
      "m": "gift of God"
    },
    {
      "n": "Jack",
      "g": "M",
      "m": "God is gracious"
    },
    {
      "n": "Theodore",
      "g": "M",
      "m": "gift of God"
    },
    {
      "n": "Aiden",
      "g": "M",
      "m": "little fire"
    },
    {
      "n": "Samuel",
      "g": "M",
      "m": "God has heard"
    },
    {
      "n": "Matthew",
      "g": "M",
      "m": "gift of Jehovah"
    },
    {
      "n": "Joseph",
      "g": "M",
      "m": "God will increase"
    },
    {
      "n": "Wyatt",
      "g": "M",
      "m": "brave in war"
    },
    {
      "n": "Carter",
      "g": "M",
      "m": "cart driver"
    },
    {
      "n": "Owen",
      "g": "M",
      "m": "young warrior"
    },
    {
      "n": "William",
      "g": "M",
      "m": "resolute protector"
    },
    {
      "n": "Gabriel",
      "g": "M",
      "m": "God is my strength"
    },
    {
      "n": "Isaac",
      "g": "M",
      "m": "laughter and joy"
    },
    {
      "n": "Jayden",
      "g": "M",
      "m": "thankful and grateful"
    },
    {
      "n": "Luke",
      "g": "M",
      "m": "light giving"
    },
    {
      "n": "Anthony",
      "g": "M",
      "m": "priceless and praiseworthy"
    },
    {
      "n": "Lincoln",
      "g": "M",
      "m": "lake colony"
    },
    {
      "n": "Dylan",
      "g": "M",
      "m": "son of the sea"
    },
    {
      "n": "Leo",
      "g": "M",
      "m": "lion and brave"
    },
    {
      "n": "Asher",
      "g": "M",
      "m": "happy and blessed"
    },
    {
      "n": "Christopher",
      "g": "M",
      "m": "bearer of Christ"
    },
    {
      "n": "Josiah",
      "g": "M",
      "m": "God supports"
    },
    {
      "n": "Andrew",
      "g": "M",
      "m": "strong and manly"
    },
    {
      "n": "Thomas",
      "g": "M",
      "m": "twin and leader"
    },
    {
      "n": "Joshua",
      "g": "M",
      "m": "God is salvation"
    },
    {
      "n": "Ezra",
      "g": "M",
      "m": "help and helper"
    },
    {
      "n": "Charles",
      "g": "M",
      "m": "free man"
    },
    {
      "n": "Caleb",
      "g": "M",
      "m": "faithful and wholehearted"
    },
    {
      "n": "Ryan",
      "g": "M",
      "m": "little king"
    },
    {
      "n": "Adrian",
      "g": "M",
      "m": "sea or dark one"
    },
    {
      "n": "Miles",
      "g": "M",
      "m": "soldier or merciful"
    },
    {
      "n": "Eli",
      "g": "M",
      "m": "high and ascended"
    },
    {
      "n": "Nolan",
      "g": "M",
      "m": "noble and famous"
    },
    {
      "n": "Christian",
      "g": "M",
      "m": "follower of Christ"
    },
    {
      "n": "Aaron",
      "g": "M",
      "m": "high mountain"
    },
    {
      "n": "Cameron",
      "g": "M",
      "m": "crooked river"
    },
    {
      "n": "Ezekiel",
      "g": "M",
      "m": "God strengthens"
    },
    {
      "n": "Colton",
      "g": "M",
      "m": "coal town"
    },
    {
      "n": "Axel",
      "g": "M",
      "m": "father of peace"
    },
    {
      "n": "Maverick",
      "g": "M",
      "m": "independent individual"
    },
    {
      "n": "Nicholas",
      "g": "M",
      "m": "victory of the people"
    },
    {
      "n": "Ian",
      "g": "M",
      "m": "God is gracious"
    },
    {
      "n": "Brooks",
      "g": "M",
      "m": "running stream"
    },
    {
      "n": "Wesley",
      "g": "M",
      "m": "western meadow"
    },
    {
      "n": "Waylen",
      "g": "M",
      "m": "land by the road"
    },
    {
      "n": "Silas",
      "g": "M",
      "m": "forest or woods"
    },
    {
      "n": "Hudson",
      "g": "M",
      "m": "son of Hudd"
    },
    {
      "n": "Hunter",
      "g": "M",
      "m": "pursuer or hunter"
    },
    {
      "n": "Rowan",
      "g": "M",
      "m": "little red one"
    },
    {
      "n": "Kai",
      "g": "M",
      "m": "sea or ocean"
    },
    {
      "n": "Amir",
      "g": "M",
      "m": "prince or ruler"
    },
    {
      "n": "Thiago",
      "g": "M",
      "m": "Saint James"
    },
    {
      "n": "Arthur",
      "g": "M",
      "m": "noble and bear"
    },
    {
      "n": "Xavier",
      "g": "M",
      "m": "bright and new house"
    },
    {
      "n": "Dominic",
      "g": "M",
      "m": "of the Lord"
    },
    {
      "n": "Gavin",
      "g": "M",
      "m": "white hawk"
    },
    {
      "n": "Jace",
      "g": "M",
      "m": "healer"
    },
    {
      "n": "Zane",
      "g": "M",
      "m": "God is gracious"
    },
    {
      "n": "Jude",
      "g": "M",
      "m": "praised one"
    },
    {
      "n": "Karter",
      "g": "M",
      "m": "carrier of goods"
    },
    {
      "n": "Beckett",
      "g": "M",
      "m": "beehive or cottage"
    },
    {
      "n": "August",
      "g": "M",
      "m": "magnificent and majestic"
    },
    {
      "n": "Rhett",
      "g": "M",
      "m": "advice or counsel"
    },
    {
      "n": "Declan",
      "g": "M",
      "m": "full of goodness"
    },
    {
      "n": "Micah",
      "g": "M",
      "m": "who is like God"
    },
    {
      "n": "Ayden",
      "g": "M",
      "m": "little fire"
    },
    {
      "n": "Milo",
      "g": "M",
      "m": "soldier or merciful"
    },
    {
      "n": "Caden",
      "g": "M",
      "m": "spirit of battle"
    },
    {
      "n": "Jasper",
      "g": "M",
      "m": "treasurer"
    },
    {
      "n": "Gael",
      "g": "M",
      "m": "joyful and generous"
    },
    {
      "n": "Holden",
      "g": "M",
      "m": "hollow valley"
    },
    {
      "n": "Emilio",
      "g": "M",
      "m": "rival or industrious"
    },
    {
      "n": "Maddox",
      "g": "M",
      "m": "son of Madoc"
    },
    {
      "n": "Zion",
      "g": "M",
      "m": "highest point or holy place"
    },
    {
      "n": "Judah",
      "g": "M",
      "m": "praise"
    },
    {
      "n": "Finn",
      "g": "M",
      "m": "fair or white"
    },
    {
      "n": "Malachi",
      "g": "M",
      "m": "my messenger"
    },
    {
      "n": "Jonah",
      "g": "M",
      "m": "dove or peace"
    },
    {
      "n": "Emmett",
      "g": "M",
      "m": "universal and whole"
    },
    {
      "n": "Olivia",
      "g": "F",
      "m": "olive tree and peace"
    },
    {
      "n": "Emma",
      "g": "F",
      "m": "universal and whole"
    },
    {
      "n": "Charlotte",
      "g": "F",
      "m": "free man and petite"
    },
    {
      "n": "Amelia",
      "g": "F",
      "m": "industrious and striving"
    },
    {
      "n": "Sophia",
      "g": "F",
      "m": "wisdom"
    },
    {
      "n": "Isabella",
      "g": "F",
      "m": "pledged to God"
    },
    {
      "n": "Mia",
      "g": "F",
      "m": "beloved"
    },
    {
      "n": "Evelyn",
      "g": "F",
      "m": "desired and wished for"
    },
    {
      "n": "Harper",
      "g": "F",
      "m": "harp player and artistic"
    },
    {
      "n": "Camila",
      "g": "F",
      "m": "young ceremonial attendant"
    },
    {
      "n": "Gianna",
      "g": "F",
      "m": "God is gracious"
    },
    {
      "n": "Abigail",
      "g": "F",
      "m": "my father is joy"
    },
    {
      "n": "Luna",
      "g": "F",
      "m": "moon or goddess"
    },
    {
      "n": "Ella",
      "g": "F",
      "m": "beautiful fairy"
    },
    {
      "n": "Elizabeth",
      "g": "F",
      "m": "pledged to God"
    },
    {
      "n": "Sofia",
      "g": "F",
      "m": "wisdom and intelligence"
    },
    {
      "n": "Emily",
      "g": "F",
      "m": "rival and industrious"
    },
    {
      "n": "Avery",
      "g": "F",
      "m": "ruler of elves"
    },
    {
      "n": "Mila",
      "g": "F",
      "m": "dear and gracious"
    },
    {
      "n": "Scarlett",
      "g": "F",
      "m": "bright red and vibrant"
    },
    {
      "n": "Eleanor",
      "g": "F",
      "m": "bright shining light"
    },
    {
      "n": "Madison",
      "g": "F",
      "m": "son of Matthew"
    },
    {
      "n": "Layla",
      "g": "F",
      "m": "night or dark beauty"
    },
    {
      "n": "Penelope",
      "g": "F",
      "m": "weaver and faithful"
    },
    {
      "n": "Aria",
      "g": "F",
      "m": "air or pure melody"
    },
    {
      "n": "Chloe",
      "g": "F",
      "m": "blooming young shoot"
    },
    {
      "n": "Grace",
      "g": "F",
      "m": "charm and goodness"
    },
    {
      "n": "Ellie",
      "g": "F",
      "m": "shining light"
    },
    {
      "n": "Hazel",
      "g": "F",
      "m": "hazelnut tree and wisdom"
    },
    {
      "n": "Zoey",
      "g": "F",
      "m": "life and vitality"
    },
    {
      "n": "Aurora",
      "g": "F",
      "m": "goddess of morning dawn"
    },
    {
      "n": "Lily",
      "g": "F",
      "m": "lily flower and purity"
    },
    {
      "n": "Violet",
      "g": "F",
      "m": "violet flower"
    },
    {
      "n": "Nova",
      "g": "F",
      "m": "new or bright star"
    },
    {
      "n": "Hannah",
      "g": "F",
      "m": "favor and grace"
    },
    {
      "n": "Emilia",
      "g": "F",
      "m": "rival or industrious"
    },
    {
      "n": "Zoe",
      "g": "F",
      "m": "life and vitality"
    },
    {
      "n": "Stella",
      "g": "F",
      "m": "star"
    },
    {
      "n": "Elena",
      "g": "F",
      "m": "shining light"
    },
    {
      "n": "Maya",
      "g": "F",
      "m": "water or illusion"
    },
    {
      "n": "Victoria",
      "g": "F",
      "m": "victory"
    },
    {
      "n": "Isla",
      "g": "F",
      "m": "island and serene"
    },
    {
      "n": "Ivy",
      "g": "F",
      "m": "ivy plant and fidelity"
    },
    {
      "n": "Faith",
      "g": "F",
      "m": "trust and belief"
    },
    {
      "n": "Lucy",
      "g": "F",
      "m": "light or born at dawn"
    },
    {
      "n": "Audrey",
      "g": "F",
      "m": "noble strength"
    },
    {
      "n": "Willow",
      "g": "F",
      "m": "willow tree and graceful"
    },
    {
      "n": "Bella",
      "g": "F",
      "m": "beautiful"
    },
    {
      "n": "Alice",
      "g": "F",
      "m": "noble and truthful"
    },
    {
      "n": "Clara",
      "g": "F",
      "m": "bright and clear"
    },
    {
      "n": "Cora",
      "g": "F",
      "m": "maiden and pure"
    },
    {
      "n": "Ruby",
      "g": "F",
      "m": "ruby gem and precious"
    },
    {
      "n": "Eva",
      "g": "F",
      "m": "living one"
    },
    {
      "n": "Seraphina",
      "g": "F",
      "m": "fiery and angelic"
    },
    {
      "n": "Adeline",
      "g": "F",
      "m": "noble and sweet"
    },
    {
      "n": "Iris",
      "g": "F",
      "m": "rainbow or goddess"
    },
    {
      "n": "Genevieve",
      "g": "F",
      "m": "woman of the family"
    },
    {
      "n": "Madelyn",
      "g": "F",
      "m": "high tower"
    },
    {
      "n": "Autumn",
      "g": "F",
      "m": "autumn harvest"
    },
    {
      "n": "Sadie",
      "g": "F",
      "m": "princess"
    },
    {
      "n": "Natalia",
      "g": "F",
      "m": "birthday of Christ"
    },
    {
      "n": "Naomi",
      "g": "F",
      "m": "pleasantness"
    },
    {
      "n": "Liliana",
      "g": "F",
      "m": "lily and pure"
    },
    {
      "n": "Hadley",
      "g": "F",
      "m": "heather field"
    },
    {
      "n": "Sienna",
      "g": "F",
      "m": "orange-red clay"
    },
    {
      "n": "Adalynn",
      "g": "F",
      "m": "noble and kind"
    },
    {
      "n": "Ayla",
      "g": "F",
      "m": "oak tree or moonlight"
    },
    {
      "n": "Maddie",
      "g": "F",
      "m": "high tower"
    },
    {
      "n": "Rosalie",
      "g": "F",
      "m": "rose garden"
    },
    {
      "n": "Georgia",
      "g": "F",
      "m": "farmer or earth worker"
    },
    {
      "n": "Gemma",
      "g": "F",
      "m": "precious gem"
    },
    {
      "n": "Lyla",
      "g": "F",
      "m": "night beauty"
    },
    {
      "n": "Hayden",
      "g": "F",
      "m": "hedged valley"
    },
    {
      "n": "Alivia",
      "g": "F",
      "m": "olive tree"
    },
    {
      "n": "Charlie",
      "g": "F",
      "m": "free man"
    },
    {
      "n": "Kenzie",
      "g": "F",
      "m": "light green or fair"
    },
    {
      "n": "Blair",
      "g": "F",
      "m": "field or plain"
    },
    {
      "n": "Evangeline",
      "g": "F",
      "m": "bearer of good news"
    },
    {
      "n": "Malia",
      "g": "F",
      "m": "beloved or calm sea"
    },
    {
      "n": "Reagan",
      "g": "F",
      "m": "little ruler"
    },
    {
      "n": "Finley",
      "g": "F",
      "m": "fair warrior"
    },
    {
      "n": "Valerie",
      "g": "F",
      "m": "strong and healthy"
    },
    {
      "n": "Lila",
      "g": "F",
      "m": "night beauty"
    },
    {
      "n": "Emery",
      "g": "F",
      "m": "industrious ruler"
    },
    {
      "n": "Amara",
      "g": "F",
      "m": "grace or immortal"
    },
    {
      "n": "Ember",
      "g": "F",
      "m": "spark or spark of fire"
    },
    {
      "n": "Alina",
      "g": "F",
      "m": "bright and noble"
    },
    {
      "n": "Anya",
      "g": "F",
      "m": "grace"
    },
    {
      "n": "Freya",
      "g": "F",
      "m": "noble lady"
    },
    {
      "n": "Joanna",
      "g": "F",
      "m": "God is gracious"
    },
    {
      "n": "Maeve",
      "g": "F",
      "m": "she who intoxicates"
    },
    {
      "n": "Ophelia",
      "g": "F",
      "m": "help or helper"
    },
    {
      "n": "Nora",
      "g": "F",
      "m": "honor or light"
    },
    {
      "n": "Phoebe",
      "g": "F",
      "m": "bright and shining"
    },
    {
      "n": "Talia",
      "g": "F",
      "m": "dew of God"
    },
    {
      "n": "Willa",
      "g": "F",
      "m": "resolute protection"
    }
  ],
  "de": [
    {
      "n": "Lukas",
      "g": "M",
      "m": "bringer of light"
    },
    {
      "n": "Leon",
      "g": "M",
      "m": "lion or brave"
    },
    {
      "n": "Noah",
      "g": "M",
      "m": "rest and peace"
    },
    {
      "n": "Matteo",
      "g": "M",
      "m": "gift of God"
    },
    {
      "n": "Ben",
      "g": "M",
      "m": "son of the right hand"
    },
    {
      "n": "Elias",
      "g": "M",
      "m": "the Lord is God"
    },
    {
      "n": "Finn",
      "g": "M",
      "m": "fair and white"
    },
    {
      "n": "Paul",
      "g": "M",
      "m": "small or humble"
    },
    {
      "n": "Emil",
      "g": "M",
      "m": "industrious and rival"
    },
    {
      "n": "Henry",
      "g": "M",
      "m": "ruler of the home"
    },
    {
      "n": "Luis",
      "g": "M",
      "m": "renowned warrior"
    },
    {
      "n": "Maximilian",
      "g": "M",
      "m": "greatest"
    },
    {
      "n": "Felix",
      "g": "M",
      "m": "happy and fortunate"
    },
    {
      "n": "Theo",
      "g": "M",
      "m": "gift of God"
    },
    {
      "n": "Liam",
      "g": "M",
      "m": "resolute protector"
    },
    {
      "n": "Jonas",
      "g": "M",
      "m": "dove or peace"
    },
    {
      "n": "Anton",
      "g": "M",
      "m": "priceless and praiseworthy"
    },
    {
      "n": "Jakob",
      "g": "M",
      "m": "supplanter"
    },
    {
      "n": "David",
      "g": "M",
      "m": "beloved"
    },
    {
      "n": "Oskar",
      "g": "M",
      "m": "spear of God"
    },
    {
      "n": "Milan",
      "g": "M",
      "m": "kind and gracious"
    },
    {
      "n": "Moritz",
      "g": "M",
      "m": "dark-skinned"
    },
    {
      "n": "Alexander",
      "g": "M",
      "m": "defender of men"
    },
    {
      "n": "Samuel",
      "g": "M",
      "m": "God has heard"
    },
    {
      "n": "Leo",
      "g": "M",
      "m": "lion or brave"
    },
    {
      "n": "Philipp",
      "g": "M",
      "m": "lover of horses"
    },
    {
      "n": "Linus",
      "g": "M",
      "m": "flax-colored hair"
    },
    {
      "n": "Simon",
      "g": "M",
      "m": "the listener"
    },
    {
      "n": "Rafael",
      "g": "M",
      "m": "God has healed"
    },
    {
      "n": "Mats",
      "g": "M",
      "m": "gift of Jehovah"
    },
    {
      "n": "Kian",
      "g": "M",
      "m": "ancient or king"
    },
    {
      "n": "Levin",
      "g": "M",
      "m": "dear friend"
    },
    {
      "n": "Johannes",
      "g": "M",
      "m": "God is gracious"
    },
    {
      "n": "Aaron",
      "g": "M",
      "m": "high mountain"
    },
    {
      "n": "Milo",
      "g": "M",
      "m": "soldier or merciful"
    },
    {
      "n": "Arthur",
      "g": "M",
      "m": "noble and bear"
    },
    {
      "n": "Julius",
      "g": "M",
      "m": "youthful"
    },
    {
      "n": "Vincent",
      "g": "M",
      "m": "conquering"
    },
    {
      "n": "Hannes",
      "g": "M",
      "m": "God is gracious"
    },
    {
      "n": "Konstantin",
      "g": "M",
      "m": "constant and steadfast"
    },
    {
      "n": "Malik",
      "g": "M",
      "m": "king or master"
    },
    {
      "n": "Toni",
      "g": "M",
      "m": "priceless"
    },
    {
      "n": "Jonathan",
      "g": "M",
      "m": "gift of Jehovah"
    },
    {
      "n": "Tim",
      "g": "M",
      "m": "honoring God"
    },
    {
      "n": "Oliver",
      "g": "M",
      "m": "peace of olive tree"
    },
    {
      "n": "Valentin",
      "g": "M",
      "m": "strong and healthy"
    },
    {
      "n": "Lian",
      "g": "M",
      "m": "graceful willow"
    },
    {
      "n": "Mika",
      "g": "M",
      "m": "who is like God"
    },
    {
      "n": "Carl",
      "g": "M",
      "m": "free man"
    },
    {
      "n": "Gabriel",
      "g": "M",
      "m": "God is my strength"
    },
    {
      "n": "Daniel",
      "g": "M",
      "m": "God is my judge"
    },
    {
      "n": "Bastian",
      "g": "M",
      "m": "venerable"
    },
    {
      "n": "Friedrich",
      "g": "M",
      "m": "peaceful ruler"
    },
    {
      "n": "Maxim",
      "g": "M",
      "m": "greatest"
    },
    {
      "n": "Leonard",
      "g": "M",
      "m": "brave lion"
    },
    {
      "n": "Timo",
      "g": "M",
      "m": "honoring God"
    },
    {
      "n": "Lars",
      "g": "M",
      "m": "crowned with laurel"
    },
    {
      "n": "Erik",
      "g": "M",
      "m": "eternal ruler"
    },
    {
      "n": "Nico",
      "g": "M",
      "m": "victory of the people"
    },
    {
      "n": "Jan",
      "g": "M",
      "m": "God is gracious"
    },
    {
      "n": "Till",
      "g": "M",
      "m": "ruler of the people"
    },
    {
      "n": "Fabian",
      "g": "M",
      "m": "bean grower"
    },
    {
      "n": "Christian",
      "g": "M",
      "m": "follower of Christ"
    },
    {
      "n": "Benedikt",
      "g": "M",
      "m": "blessed"
    },
    {
      "n": "Sebastian",
      "g": "M",
      "m": "revered"
    },
    {
      "n": "Niklas",
      "g": "M",
      "m": "victory of the people"
    },
    {
      "n": "Adrian",
      "g": "M",
      "m": "sea or dark one"
    },
    {
      "n": "Marc",
      "g": "M",
      "m": "warlike"
    },
    {
      "n": "Matthias",
      "g": "M",
      "m": "gift of God"
    },
    {
      "n": "Tobias",
      "g": "M",
      "m": "Jehovah is good"
    },
    {
      "n": "Florian",
      "g": "M",
      "m": "blooming flower"
    },
    {
      "n": "Dominik",
      "g": "M",
      "m": "of the Lord"
    },
    {
      "n": "Jannis",
      "g": "M",
      "m": "God is gracious"
    },
    {
      "n": "Nils",
      "g": "M",
      "m": "victory of the people"
    },
    {
      "n": "Lennard",
      "g": "M",
      "m": "brave lion"
    },
    {
      "n": "Mia",
      "g": "F",
      "m": "beloved or darling"
    },
    {
      "n": "Emilia",
      "g": "F",
      "m": "industrious and rival"
    },
    {
      "n": "Emma",
      "g": "F",
      "m": "universal and whole"
    },
    {
      "n": "Sophia",
      "g": "F",
      "m": "wisdom"
    },
    {
      "n": "Hannah",
      "g": "F",
      "m": "favor and grace"
    },
    {
      "n": "Lina",
      "g": "F",
      "m": "tender palm tree"
    },
    {
      "n": "Ella",
      "g": "F",
      "m": "beautiful fairy"
    },
    {
      "n": "Mila",
      "g": "F",
      "m": "dear and gracious"
    },
    {
      "n": "Clara",
      "g": "F",
      "m": "bright and clear"
    },
    {
      "n": "Lea",
      "g": "F",
      "m": "weary or meadow"
    },
    {
      "n": "Marie",
      "g": "F",
      "m": "star of the sea"
    },
    {
      "n": "Luisa",
      "g": "F",
      "m": "renowned warrior"
    },
    {
      "n": "Ida",
      "g": "F",
      "m": "industrious one"
    },
    {
      "n": "Leni",
      "g": "F",
      "m": "shining light"
    },
    {
      "n": "Lia",
      "g": "F",
      "m": "bearer of good news"
    },
    {
      "n": "Anna",
      "g": "F",
      "m": "grace and blessing"
    },
    {
      "n": "Charlotte",
      "g": "F",
      "m": "free man and petite"
    },
    {
      "n": "Frieda",
      "g": "F",
      "m": "peaceful ruler"
    },
    {
      "n": "Johanna",
      "g": "F",
      "m": "God is gracious"
    },
    {
      "n": "Laura",
      "g": "F",
      "m": "crowned with laurel"
    },
    {
      "n": "Nele",
      "g": "F",
      "m": "horn or noble"
    },
    {
      "n": "Amelie",
      "g": "F",
      "m": "industrious and brave"
    },
    {
      "n": "Sophie",
      "g": "F",
      "m": "wisdom and purity"
    },
    {
      "n": "Mathilda",
      "g": "F",
      "m": "mighty in battle"
    },
    {
      "n": "Lotta",
      "g": "F",
      "m": "free man"
    },
    {
      "n": "Paula",
      "g": "F",
      "m": "small and humble"
    },
    {
      "n": "Maja",
      "g": "F",
      "m": "splendor or mother"
    },
    {
      "n": "Marlene",
      "g": "F",
      "m": "star of the sea and high tower"
    },
    {
      "n": "Greta",
      "g": "F",
      "m": "pearl"
    },
    {
      "n": "Aliya",
      "g": "F",
      "m": "exalted and highest standing"
    },
    {
      "n": "Zoe",
      "g": "F",
      "m": "life and vitality"
    },
    {
      "n": "Romy",
      "g": "F",
      "m": "dew of the sea"
    },
    {
      "n": "Luna",
      "g": "F",
      "m": "moon goddess"
    },
    {
      "n": "Sarah",
      "g": "F",
      "m": "princess"
    },
    {
      "n": "Elisa",
      "g": "F",
      "m": "pledged to God"
    },
    {
      "n": "Lara",
      "g": "F",
      "m": "citadel or protection"
    },
    {
      "n": "Nora",
      "g": "F",
      "m": "honor and shining light"
    },
    {
      "n": "Merle",
      "g": "F",
      "m": "bright sea"
    },
    {
      "n": "Theresa",
      "g": "F",
      "m": "harvester"
    },
    {
      "n": "Lisa",
      "g": "F",
      "m": "pledged to God"
    },
    {
      "n": "Mira",
      "g": "F",
      "m": "peaceful world"
    },
    {
      "n": "Elena",
      "g": "F",
      "m": "shining torch"
    },
    {
      "n": "Alina",
      "g": "F",
      "m": "bright and noble"
    },
    {
      "n": "Paulina",
      "g": "F",
      "m": "little and humble"
    },
    {
      "n": "Fiona",
      "g": "F",
      "m": "white or fair"
    },
    {
      "n": "Melina",
      "g": "F",
      "m": "honey-sweet"
    },
    {
      "n": "Talea",
      "g": "F",
      "m": "noble one"
    },
    {
      "n": "Klara",
      "g": "F",
      "m": "bright and clear"
    },
    {
      "n": "Anni",
      "g": "F",
      "m": "grace and favor"
    },
    {
      "n": "Finja",
      "g": "F",
      "m": "fair and white"
    },
    {
      "n": "Juna",
      "g": "F",
      "m": "desired or moon"
    },
    {
      "n": "Malou",
      "g": "F",
      "m": "renowned warrior"
    },
    {
      "n": "Selma",
      "g": "F",
      "m": "godly helmet"
    },
    {
      "n": "Lana",
      "g": "F",
      "m": "rock or handsome"
    },
    {
      "n": "Carla",
      "g": "F",
      "m": "free woman"
    },
    {
      "n": "Martha",
      "g": "F",
      "m": "lady or mistress"
    },
    {
      "n": "Isabell",
      "g": "F",
      "m": "pledged to God"
    },
    {
      "n": "Helena",
      "g": "F",
      "m": "shining light"
    },
    {
      "n": "Lilly",
      "g": "F",
      "m": "lily flower and purity"
    },
    {
      "n": "Luise",
      "g": "F",
      "m": "renowned warrior"
    },
    {
      "n": "Pia",
      "g": "F",
      "m": "pious and honorable"
    },
    {
      "n": "Nika",
      "g": "F",
      "m": "victory of the people"
    },
    {
      "n": "Mara",
      "g": "F",
      "m": "bitter or sea"
    },
    {
      "n": "Hanna",
      "g": "F",
      "m": "favor and grace"
    },
    {
      "n": "Jule",
      "g": "F",
      "m": "youthful"
    },
    {
      "n": "Kim",
      "g": "F",
      "m": "noble chief"
    },
    {
      "n": "Tessa",
      "g": "F",
      "m": "harvester"
    },
    {
      "n": "Svea",
      "g": "F",
      "m": "sun or Swedish"
    },
    {
      "n": "Alissa",
      "g": "F",
      "m": "noble and truthful"
    },
    {
      "n": "Neele",
      "g": "F",
      "m": "horn or noble"
    },
    {
      "n": "Antonia",
      "g": "F",
      "m": "priceless"
    },
    {
      "n": "Linda",
      "g": "F",
      "m": "beautiful and soft"
    },
    {
      "n": "Nela",
      "g": "F",
      "m": "bright and noble"
    }
  ],
  "fr": [
    {
      "n": "Louis",
      "g": "M",
      "m": "famous warrior"
    },
    {
      "n": "Gabriel",
      "g": "M",
      "m": "God is my strength"
    },
    {
      "n": "Léo",
      "g": "M",
      "m": "lion or brave"
    },
    {
      "n": "Raphaël",
      "g": "M",
      "m": "God has healed"
    },
    {
      "n": "Maël",
      "g": "M",
      "m": "prince or chief"
    },
    {
      "n": "Arthur",
      "g": "M",
      "m": "noble and bear"
    },
    {
      "n": "Noah",
      "g": "M",
      "m": "rest and peace"
    },
    {
      "n": "Jules",
      "g": "M",
      "m": "youthful"
    },
    {
      "n": "Lucas",
      "g": "M",
      "m": "bringer of light"
    },
    {
      "n": "Hugo",
      "g": "M",
      "m": "mind or spirit"
    },
    {
      "n": "Liam",
      "g": "M",
      "m": "resolute protector"
    },
    {
      "n": "Ethan",
      "g": "M",
      "m": "strong and enduring"
    },
    {
      "n": "Sacha",
      "g": "M",
      "m": "defender of men"
    },
    {
      "n": "Gabin",
      "g": "M",
      "m": "of Gabium"
    },
    {
      "n": "Paul",
      "g": "M",
      "m": "small or humble"
    },
    {
      "n": "Nathan",
      "g": "M",
      "m": "gift of God"
    },
    {
      "n": "Aaron",
      "g": "M",
      "m": "high mountain"
    },
    {
      "n": "Mohamed",
      "g": "M",
      "m": "praiseworthy"
    },
    {
      "n": "Adam",
      "g": "M",
      "m": "son of the red earth"
    },
    {
      "n": "Marius",
      "g": "M",
      "m": "male or martial"
    },
    {
      "n": "Victor",
      "g": "M",
      "m": "conqueror"
    },
    {
      "n": "Martin",
      "g": "M",
      "m": "of Mars"
    },
    {
      "n": "Tom",
      "g": "M",
      "m": "twin"
    },
    {
      "n": "Eden",
      "g": "M",
      "m": "delight or paradise"
    },
    {
      "n": "Léon",
      "g": "M",
      "m": "lion"
    },
    {
      "n": "Noé",
      "g": "M",
      "m": "rest and comfort"
    },
    {
      "n": "Timéo",
      "g": "M",
      "m": "honoring God"
    },
    {
      "n": "Axel",
      "g": "M",
      "m": "father of peace"
    },
    {
      "n": "Nolan",
      "g": "M",
      "m": "noble and famous"
    },
    {
      "n": "Maxence",
      "g": "M",
      "m": "greatest"
    },
    {
      "n": "Gaspard",
      "g": "M",
      "m": "treasurer"
    },
    {
      "n": "Antoine",
      "g": "M",
      "m": "priceless"
    },
    {
      "n": "Robin",
      "g": "M",
      "m": "bright fame"
    },
    {
      "n": "Rayan",
      "g": "M",
      "m": "gates of heaven"
    },
    {
      "n": "Tiago",
      "g": "M",
      "m": "Saint James"
    },
    {
      "n": "Valentin",
      "g": "M",
      "m": "strong and healthy"
    },
    {
      "n": "Isaac",
      "g": "M",
      "m": "laughter and joy"
    },
    {
      "n": "Enzo",
      "g": "M",
      "m": "ruler of the home"
    },
    {
      "n": "Augustin",
      "g": "M",
      "m": "venerable and majestic"
    },
    {
      "n": "Amir",
      "g": "M",
      "m": "prince or ruler"
    },
    {
      "n": "Naël",
      "g": "M",
      "m": "gift of God"
    },
    {
      "n": "Mathéo",
      "g": "M",
      "m": "gift of God"
    },
    {
      "n": "Clément",
      "g": "M",
      "m": "merciful and gentle"
    },
    {
      "n": "Côme",
      "g": "M",
      "m": "order and beauty"
    },
    {
      "n": "Éliott",
      "g": "M",
      "m": "the Lord is God"
    },
    {
      "n": "Simon",
      "g": "M",
      "m": "the listener"
    },
    {
      "n": "Baptiste",
      "g": "M",
      "m": "baptist"
    },
    {
      "n": "Samuel",
      "g": "M",
      "m": "God has heard"
    },
    {
      "n": "Julien",
      "g": "M",
      "m": "youthful"
    },
    {
      "n": "Maxime",
      "g": "M",
      "m": "greatest"
    },
    {
      "n": "Gael",
      "g": "M",
      "m": "joyful and generous"
    },
    {
      "n": "Alexandre",
      "g": "M",
      "m": "defender of men"
    },
    {
      "n": "Mathis",
      "g": "M",
      "m": "gift of God"
    },
    {
      "n": "Mathieu",
      "g": "M",
      "m": "gift of Jehovah"
    },
    {
      "n": "Adrien",
      "g": "M",
      "m": "sea or dark one"
    },
    {
      "n": "Nino",
      "g": "M",
      "m": "God is gracious"
    },
    {
      "n": "Evan",
      "g": "M",
      "m": "God is gracious"
    },
    {
      "n": "Yanis",
      "g": "M",
      "m": "gift of God"
    },
    {
      "n": "Auguste",
      "g": "M",
      "m": "venerable"
    },
    {
      "n": "Kylian",
      "g": "M",
      "m": "bright-headed"
    },
    {
      "n": "Théo",
      "g": "M",
      "m": "gift of God"
    },
    {
      "n": "Jean",
      "g": "M",
      "m": "God is gracious"
    },
    {
      "n": "Charles",
      "g": "M",
      "m": "free man"
    },
    {
      "n": "Thomas",
      "g": "M",
      "m": "twin"
    },
    {
      "n": "Pierre",
      "g": "M",
      "m": "rock or stone"
    },
    {
      "n": "Nicolas",
      "g": "M",
      "m": "victory of the people"
    },
    {
      "n": "William",
      "g": "M",
      "m": "resolute protector"
    },
    {
      "n": "Guillaume",
      "g": "M",
      "m": "resolute protector"
    },
    {
      "n": "Romain",
      "g": "M",
      "m": "roman citizen"
    },
    {
      "n": "Benjamin",
      "g": "M",
      "m": "son of the right hand"
    },
    {
      "n": "Alban",
      "g": "M",
      "m": "white"
    },
    {
      "n": "Basile",
      "g": "M",
      "m": "royal or kingly"
    },
    {
      "n": "Achille",
      "g": "M",
      "m": "grief or hero"
    },
    {
      "n": "Amaury",
      "g": "M",
      "m": "work ruler"
    },
    {
      "n": "Lucien",
      "g": "M",
      "m": "light"
    },
    {
      "n": "Jade",
      "g": "F",
      "m": "jade stone or gemstone"
    },
    {
      "n": "Louise",
      "g": "F",
      "m": "famous warrior"
    },
    {
      "n": "Emma",
      "g": "F",
      "m": "universal and whole"
    },
    {
      "n": "Ambre",
      "g": "F",
      "m": "amber gemstone"
    },
    {
      "n": "Alice",
      "g": "F",
      "m": "noble and truthful"
    },
    {
      "n": "Alba",
      "g": "F",
      "m": "white or dawn"
    },
    {
      "n": "Rose",
      "g": "F",
      "m": "rose flower"
    },
    {
      "n": "Romy",
      "g": "F",
      "m": "dew of the sea"
    },
    {
      "n": "Mia",
      "g": "F",
      "m": "beloved or darling"
    },
    {
      "n": "Julia",
      "g": "F",
      "m": "youthful"
    },
    {
      "n": "Lina",
      "g": "F",
      "m": "tender palm tree"
    },
    {
      "n": "Chloé",
      "g": "F",
      "m": "blooming young shoot"
    },
    {
      "n": "Léna",
      "g": "F",
      "m": "shining torch"
    },
    {
      "n": "Léa",
      "g": "F",
      "m": "weary or meadow"
    },
    {
      "n": "Agathe",
      "g": "F",
      "m": "good and honorable"
    },
    {
      "n": "Iris",
      "g": "F",
      "m": "rainbow or goddess"
    },
    {
      "n": "Nina",
      "g": "F",
      "m": "grace or favor"
    },
    {
      "n": "Inès",
      "g": "F",
      "m": "pure and chaste"
    },
    {
      "n": "Anna",
      "g": "F",
      "m": "grace and blessing"
    },
    {
      "n": "Jeanne",
      "g": "F",
      "m": "God is gracious"
    },
    {
      "n": "Lola",
      "g": "F",
      "m": "sorrows or strong lady"
    },
    {
      "n": "Léonie",
      "g": "F",
      "m": "lioness or brave"
    },
    {
      "n": "Olivia",
      "g": "F",
      "m": "olive tree and peace"
    },
    {
      "n": "Manon",
      "g": "F",
      "m": "bitter or beloved"
    },
    {
      "n": "Juliette",
      "g": "F",
      "m": "youthful"
    },
    {
      "n": "Inaya",
      "g": "F",
      "m": "care and protection"
    },
    {
      "n": "Camille",
      "g": "F",
      "m": "young ceremonial attendant"
    },
    {
      "n": "Zoé",
      "g": "F",
      "m": "life and vitality"
    },
    {
      "n": "Adèle",
      "g": "F",
      "m": "noble and sweet"
    },
    {
      "n": "Mila",
      "g": "F",
      "m": "dear and gracious"
    },
    {
      "n": "Eléna",
      "g": "F",
      "m": "shining light"
    },
    {
      "n": "Eva",
      "g": "F",
      "m": "living one"
    },
    {
      "n": "Sarah",
      "g": "F",
      "m": "princess"
    },
    {
      "n": "Lucie",
      "g": "F",
      "m": "light or born at dawn"
    },
    {
      "n": "Margaux",
      "g": "F",
      "m": "pearl"
    },
    {
      "n": "Clara",
      "g": "F",
      "m": "bright and clear"
    },
    {
      "n": "Victoire",
      "g": "F",
      "m": "victory"
    },
    {
      "n": "Capucine",
      "g": "F",
      "m": "nasturtium flower"
    },
    {
      "n": "Sophia",
      "g": "F",
      "m": "wisdom"
    },
    {
      "n": "Luna",
      "g": "F",
      "m": "moon goddess"
    },
    {
      "n": "Mathilde",
      "g": "F",
      "m": "mighty in battle"
    },
    {
      "n": "Lana",
      "g": "F",
      "m": "rock or handsome"
    },
    {
      "n": "Louna",
      "g": "F",
      "m": "moon or loom"
    },
    {
      "n": "Mya",
      "g": "F",
      "m": "beloved"
    },
    {
      "n": "Gabrielle",
      "g": "F",
      "m": "God is my strength"
    },
    {
      "n": "Charlotte",
      "g": "F",
      "m": "free man and petite"
    },
    {
      "n": "Alya",
      "g": "F",
      "m": "exalted and noble"
    },
    {
      "n": "Alicia",
      "g": "F",
      "m": "noble and truthful"
    },
    {
      "n": "Romane",
      "g": "F",
      "m": "roman citizen"
    },
    {
      "n": "Célia",
      "g": "F",
      "m": "heavenly"
    },
    {
      "n": "Thalía",
      "g": "F",
      "m": "blooming or joyous"
    },
    {
      "n": "Noémie",
      "g": "F",
      "m": "pleasantness"
    },
    {
      "n": "Margot",
      "g": "F",
      "m": "pearl"
    },
    {
      "n": "Elise",
      "g": "F",
      "m": "pledged to God"
    },
    {
      "n": "Clémence",
      "g": "F",
      "m": "merciful and gentle"
    },
    {
      "n": "Amandine",
      "g": "F",
      "m": "lovable"
    },
    {
      "n": "Eloïse",
      "g": "F",
      "m": "healthy or wide"
    },
    {
      "n": "Mélanie",
      "g": "F",
      "m": "dark or black"
    },
    {
      "n": "Valentine",
      "g": "F",
      "m": "strong and healthy"
    },
    {
      "n": "Aurore",
      "g": "F",
      "m": "dawn goddess"
    },
    {
      "n": "Celine",
      "g": "F",
      "m": "heavenly"
    },
    {
      "n": "Laura",
      "g": "F",
      "m": "crowned with laurel"
    },
    {
      "n": "Marion",
      "g": "F",
      "m": "bitter or beloved"
    },
    {
      "n": "Océane",
      "g": "F",
      "m": "ocean"
    },
    {
      "n": "Pauline",
      "g": "F",
      "m": "little and humble"
    },
    {
      "n": "Roxane",
      "g": "F",
      "m": "bright dawn"
    },
    {
      "n": "Solène",
      "g": "F",
      "m": "solemn or dignified"
    },
    {
      "n": "Marine",
      "g": "F",
      "m": "of the sea"
    },
    {
      "n": "Justine",
      "g": "F",
      "m": "just and fair"
    },
    {
      "n": "Appoline",
      "g": "F",
      "m": "of Apollo"
    },
    {
      "n": "Constance",
      "g": "F",
      "m": "constant and steadfast"
    },
    {
      "n": "Diane",
      "g": "F",
      "m": "divine or moon goddess"
    },
    {
      "n": "Zélie",
      "g": "F",
      "m": "solemn"
    },
    {
      "n": "Héloïse",
      "g": "F",
      "m": "healthy and whole"
    }
  ],
  "it": [
    {
      "n": "Leonardo",
      "g": "M",
      "m": "brave lion"
    },
    {
      "n": "Francesco",
      "g": "M",
      "m": "free man"
    },
    {
      "n": "Alessandro",
      "g": "M",
      "m": "defender of men"
    },
    {
      "n": "Lorenzo",
      "g": "M",
      "m": "crowned with laurel"
    },
    {
      "n": "Mattia",
      "g": "M",
      "m": "gift of God"
    },
    {
      "n": "Tommaso",
      "g": "M",
      "m": "twin and leader"
    },
    {
      "n": "Gabriele",
      "g": "M",
      "m": "God is my strength"
    },
    {
      "n": "Andrea",
      "g": "M",
      "m": "strong and manly"
    },
    {
      "n": "Riccardo",
      "g": "M",
      "m": "powerful ruler"
    },
    {
      "n": "Edoardo",
      "g": "M",
      "m": "wealthy guardian"
    },
    {
      "n": "Enea",
      "g": "M",
      "m": "praiseworthy"
    },
    {
      "n": "Matteo",
      "g": "M",
      "m": "gift of God"
    },
    {
      "n": "Diego",
      "g": "M",
      "m": "supplanter or teacher"
    },
    {
      "n": "Nicolo",
      "g": "M",
      "m": "victory of the people"
    },
    {
      "n": "Federico",
      "g": "M",
      "m": "peaceful ruler"
    },
    {
      "n": "Giuseppe",
      "g": "M",
      "m": "God will increase"
    },
    {
      "n": "Antonio",
      "g": "M",
      "m": "priceless and praiseworthy"
    },
    {
      "n": "Giovanni",
      "g": "M",
      "m": "God is gracious"
    },
    {
      "n": "Pietro",
      "g": "M",
      "m": "rock or stone"
    },
    {
      "n": "Filippo",
      "g": "M",
      "m": "lover of horses"
    },
    {
      "n": "Samuele",
      "g": "M",
      "m": "God has heard"
    },
    {
      "n": "Davide",
      "g": "M",
      "m": "beloved"
    },
    {
      "n": "Michele",
      "g": "M",
      "m": "who is like God"
    },
    {
      "n": "Christian",
      "g": "M",
      "m": "follower of Christ"
    },
    {
      "n": "Emanuele",
      "g": "M",
      "m": "God is with us"
    },
    {
      "n": "Alessio",
      "g": "M",
      "m": "defender or protector"
    },
    {
      "n": "Daniele",
      "g": "M",
      "m": "God is my judge"
    },
    {
      "n": "Giacomo",
      "g": "M",
      "m": "supplanter"
    },
    {
      "n": "Raffaele",
      "g": "M",
      "m": "God has healed"
    },
    {
      "n": "Vincenzo",
      "g": "M",
      "m": "conquering"
    },
    {
      "n": "Simone",
      "g": "M",
      "m": "the listener"
    },
    {
      "n": "Salvatore",
      "g": "M",
      "m": "savior"
    },
    {
      "n": "Marco",
      "g": "M",
      "m": "of Mars"
    },
    {
      "n": "Luca",
      "g": "M",
      "m": "bringer of light"
    },
    {
      "n": "Gioele",
      "g": "M",
      "m": "Jehovah is God"
    },
    {
      "n": "Elia",
      "g": "M",
      "m": "the Lord is God"
    },
    {
      "n": "Manuel",
      "g": "M",
      "m": "God is with us"
    },
    {
      "n": "Liam",
      "g": "M",
      "m": "resolute protector"
    },
    {
      "n": "Gabriel",
      "g": "M",
      "m": "God is my strength"
    },
    {
      "n": "Samuel",
      "g": "M",
      "m": "God has heard"
    },
    {
      "n": "Thomas",
      "g": "M",
      "m": "twin"
    },
    {
      "n": "Giorgio",
      "g": "M",
      "m": "farmer or earth worker"
    },
    {
      "n": "Domenico",
      "g": "M",
      "m": "of the Lord"
    },
    {
      "n": "Rayan",
      "g": "M",
      "m": "gates of heaven"
    },
    {
      "n": "Nathan",
      "g": "M",
      "m": "gift of God"
    },
    {
      "n": "Damiano",
      "g": "M",
      "m": "to tame"
    },
    {
      "n": "Luigi",
      "g": "M",
      "m": "famous warrior"
    },
    {
      "n": "Valerio",
      "g": "M",
      "m": "strong and healthy"
    },
    {
      "n": "Alberto",
      "g": "M",
      "m": "noble and bright"
    },
    {
      "n": "Paolo",
      "g": "M",
      "m": "small or humble"
    },
    {
      "n": "Stefano",
      "g": "M",
      "m": "crown or garland"
    },
    {
      "n": "Fabio",
      "g": "M",
      "m": "bean grower"
    },
    {
      "n": "Claudio",
      "g": "M",
      "m": "lame or steadfast"
    },
    {
      "n": "Gennaro",
      "g": "M",
      "m": "born in January"
    },
    {
      "n": "Carmine",
      "g": "M",
      "m": "song or garden"
    },
    {
      "n": "Pasquale",
      "g": "M",
      "m": "born at Easter"
    },
    {
      "n": "Dino",
      "g": "M",
      "m": "little sword"
    },
    {
      "n": "Enrico",
      "g": "M",
      "m": "ruler of the home"
    },
    {
      "n": "Roberto",
      "g": "M",
      "m": "bright fame"
    },
    {
      "n": "Angelo",
      "g": "M",
      "m": "angel or messenger"
    },
    {
      "n": "Mario",
      "g": "M",
      "m": "male or martial"
    },
    {
      "n": "Fabrizio",
      "g": "M",
      "m": "craftsman"
    },
    {
      "n": "Flavio",
      "g": "M",
      "m": "golden-haired"
    },
    {
      "n": "Gianluca",
      "g": "M",
      "m": "John the bringer of light"
    },
    {
      "n": "Massimo",
      "g": "M",
      "m": "greatest"
    },
    {
      "n": "Maurizio",
      "g": "M",
      "m": "dark-skinned"
    },
    {
      "n": "Guido",
      "g": "M",
      "m": "leader or guide"
    },
    {
      "n": "Sergio",
      "g": "M",
      "m": "guardian or servant"
    },
    {
      "n": "Dario",
      "g": "M",
      "m": "possessor of good"
    },
    {
      "n": "Cesare",
      "g": "M",
      "m": "hairy or emperor"
    },
    {
      "n": "Tiziano",
      "g": "M",
      "m": "of the Titans"
    },
    {
      "n": "Manuele",
      "g": "M",
      "m": "God is with us"
    },
    {
      "n": "Moreno",
      "g": "M",
      "m": "dark-skinned"
    },
    {
      "n": "Emilio",
      "g": "M",
      "m": "rival or industrious"
    },
    {
      "n": "Sofia",
      "g": "F",
      "m": "wisdom and intelligence"
    },
    {
      "n": "Aurora",
      "g": "F",
      "m": "goddess of morning dawn"
    },
    {
      "n": "Giulia",
      "g": "F",
      "m": "youthful or downy-bearded"
    },
    {
      "n": "Ginevra",
      "g": "F",
      "m": "white wave or fair spirit"
    },
    {
      "n": "Alice",
      "g": "F",
      "m": "noble and truthful"
    },
    {
      "n": "Beatrice",
      "g": "F",
      "m": "she who brings happiness"
    },
    {
      "n": "Emma",
      "g": "F",
      "m": "universal and whole"
    },
    {
      "n": "Giorgia",
      "g": "F",
      "m": "farmer or earth worker"
    },
    {
      "n": "Vittoria",
      "g": "F",
      "m": "victory and triumph"
    },
    {
      "n": "Matilde",
      "g": "F",
      "m": "mighty in battle"
    },
    {
      "n": "Ludovica",
      "g": "F",
      "m": "famous warrior"
    },
    {
      "n": "Camilla",
      "g": "F",
      "m": "young ceremonial attendant"
    },
    {
      "n": "Chiara",
      "g": "F",
      "m": "bright and clear"
    },
    {
      "n": "Anna",
      "g": "F",
      "m": "grace and blessing"
    },
    {
      "n": "Bianca",
      "g": "F",
      "m": "white and pure"
    },
    {
      "n": "Sara",
      "g": "F",
      "m": "princess"
    },
    {
      "n": "Gaia",
      "g": "F",
      "m": "earth or joyful"
    },
    {
      "n": "Martina",
      "g": "F",
      "m": "of Mars"
    },
    {
      "n": "Nicole",
      "g": "F",
      "m": "victory of the people"
    },
    {
      "n": "Greta",
      "g": "F",
      "m": "pearl"
    },
    {
      "n": "Francesca",
      "g": "F",
      "m": "free man"
    },
    {
      "n": "Viola",
      "g": "F",
      "m": "violet flower"
    },
    {
      "n": "Noemi",
      "g": "F",
      "m": "pleasantness and grace"
    },
    {
      "n": "Marta",
      "g": "F",
      "m": "lady or mistress"
    },
    {
      "n": "Asia",
      "g": "F",
      "m": "sunrise or east"
    },
    {
      "n": "Adele",
      "g": "F",
      "m": "noble and sweet"
    },
    {
      "n": "Elena",
      "g": "F",
      "m": "shining light"
    },
    {
      "n": "Eleonora",
      "g": "F",
      "m": "bright shining light"
    },
    {
      "n": "Alessia",
      "g": "F",
      "m": "defender or protector"
    },
    {
      "n": "Rebecca",
      "g": "F",
      "m": "to bind or captivating"
    },
    {
      "n": "Margherita",
      "g": "F",
      "m": "pearl"
    },
    {
      "n": "Anita",
      "g": "F",
      "m": "grace and favor"
    },
    {
      "n": "Caterina",
      "g": "F",
      "m": "pure and chaste"
    },
    {
      "n": "Melissa",
      "g": "F",
      "m": "honeybee"
    },
    {
      "n": "Lucia",
      "g": "F",
      "m": "light or born at dawn"
    },
    {
      "n": "Cecilia",
      "g": "F",
      "m": "blind to wrinkles or steadfast"
    },
    {
      "n": "Letizia",
      "g": "F",
      "m": "joy and gladness"
    },
    {
      "n": "Rachele",
      "g": "F",
      "m": "ewe or lamb"
    },
    {
      "n": "Ambra",
      "g": "F",
      "m": "amber gemstone"
    },
    {
      "n": "Serena",
      "g": "F",
      "m": "serene and tranquil"
    },
    {
      "n": "Angelica",
      "g": "F",
      "m": "angelic or messenger"
    },
    {
      "n": "Miriam",
      "g": "F",
      "m": "sea of bitterness or beloved"
    },
    {
      "n": "Aria",
      "g": "F",
      "m": "air or pure melody"
    },
    {
      "n": "Arianna",
      "g": "F",
      "m": "most holy"
    },
    {
      "n": "Federica",
      "g": "F",
      "m": "peaceful ruler"
    },
    {
      "n": "Mia",
      "g": "F",
      "m": "beloved or darling"
    },
    {
      "n": "Benedetta",
      "g": "F",
      "m": "blessed"
    },
    {
      "n": "Flavia",
      "g": "F",
      "m": "golden-haired"
    },
    {
      "n": "Silvia",
      "g": "F",
      "m": "from the forest"
    },
    {
      "n": "Maddalena",
      "g": "F",
      "m": "high tower"
    },
    {
      "n": "Ilaria",
      "g": "F",
      "m": "cheerful and merry"
    },
    {
      "n": "Roberta",
      "g": "F",
      "m": "bright fame"
    },
    {
      "n": "Paola",
      "g": "F",
      "m": "small or humble"
    },
    {
      "n": "Laura",
      "g": "F",
      "m": "crowned with laurel"
    },
    {
      "n": "Simona",
      "g": "F",
      "m": "the listener"
    },
    {
      "n": "Valentina",
      "g": "F",
      "m": "strong and healthy"
    },
    {
      "n": "Antonia",
      "g": "F",
      "m": "priceless"
    },
    {
      "n": "Claudia",
      "g": "F",
      "m": "lame or steadfast"
    },
    {
      "n": "Erika",
      "g": "F",
      "m": "eternal ruler"
    },
    {
      "n": "Sabrina",
      "g": "F",
      "m": "from the river severn"
    },
    {
      "n": "Stefania",
      "g": "F",
      "m": "crown or garland"
    },
    {
      "n": "Daniela",
      "g": "F",
      "m": "God is my judge"
    },
    {
      "n": "Giuseppina",
      "g": "F",
      "m": "God will increase"
    },
    {
      "n": "Teresa",
      "g": "F",
      "m": "harvester"
    },
    {
      "n": "Angela",
      "g": "F",
      "m": "angel or messenger"
    },
    {
      "n": "Clara",
      "g": "F",
      "m": "bright and clear"
    },
    {
      "n": "Rosa",
      "g": "F",
      "m": "rose flower"
    },
    {
      "n": "Gemma",
      "g": "F",
      "m": "precious gem"
    },
    {
      "n": "Sonia",
      "g": "F",
      "m": "wisdom"
    },
    {
      "n": "Veronica",
      "g": "F",
      "m": "she who brings victory"
    },
    {
      "n": "Nadia",
      "g": "F",
      "m": "hope"
    },
    {
      "n": "Elisa",
      "g": "F",
      "m": "pledged to God"
    }
  ],
  "es": [
    {
      "n": "Mateo",
      "g": "M",
      "m": "gift of God"
    },
    {
      "n": "Martín",
      "g": "M",
      "m": "of Mars"
    },
    {
      "n": "Lucas",
      "g": "M",
      "m": "bringer of light"
    },
    {
      "n": "Leo",
      "g": "M",
      "m": "lion or brave"
    },
    {
      "n": "Hugo",
      "g": "M",
      "m": "mind or spirit"
    },
    {
      "n": "Alejandro",
      "g": "M",
      "m": "defender of men"
    },
    {
      "n": "Manuel",
      "g": "M",
      "m": "God is with us"
    },
    {
      "n": "Santiago",
      "g": "M",
      "m": "Saint James"
    },
    {
      "n": "Daniel",
      "g": "M",
      "m": "God is my judge"
    },
    {
      "n": "Álvaro",
      "g": "M",
      "m": "all guardian"
    },
    {
      "n": "Pablo",
      "g": "M",
      "m": "small or humble"
    },
    {
      "n": "Enzo",
      "g": "M",
      "m": "ruler of the home"
    },
    {
      "n": "Adrián",
      "g": "M",
      "m": "sea or dark one"
    },
    {
      "n": "Diego",
      "g": "M",
      "m": "supplanter or teacher"
    },
    {
      "n": "Oliver",
      "g": "M",
      "m": "peace of olive tree"
    },
    {
      "n": "Bruno",
      "g": "M",
      "m": "brown-haired"
    },
    {
      "n": "Thiago",
      "g": "M",
      "m": "Saint James"
    },
    {
      "n": "Mario",
      "g": "M",
      "m": "male or martial"
    },
    {
      "n": "David",
      "g": "M",
      "m": "beloved"
    },
    {
      "n": "Marcos",
      "g": "M",
      "m": "of Mars"
    },
    {
      "n": "Gonzalo",
      "g": "M",
      "m": "safe from battle"
    },
    {
      "n": "Javier",
      "g": "M",
      "m": "bright and new house"
    },
    {
      "n": "Izan",
      "g": "M",
      "m": "enduring"
    },
    {
      "n": "Marco",
      "g": "M",
      "m": "of Mars"
    },
    {
      "n": "Carlos",
      "g": "M",
      "m": "free man"
    },
    {
      "n": "Liam",
      "g": "M",
      "m": "resolute protector"
    },
    {
      "n": "Alex",
      "g": "M",
      "m": "defender of men"
    },
    {
      "n": "Miguel",
      "g": "M",
      "m": "who is like God"
    },
    {
      "n": "Rodrigo",
      "g": "M",
      "m": "famous ruler"
    },
    {
      "n": "Nicolás",
      "g": "M",
      "m": "victory of the people"
    },
    {
      "n": "Gabriel",
      "g": "M",
      "m": "God is my strength"
    },
    {
      "n": "Ángel",
      "g": "M",
      "m": "angel or messenger"
    },
    {
      "n": "Iker",
      "g": "M",
      "m": "visitation"
    },
    {
      "n": "Jorge",
      "g": "M",
      "m": "farmer or earth worker"
    },
    {
      "n": "Samuel",
      "g": "M",
      "m": "God has heard"
    },
    {
      "n": "Guillermo",
      "g": "M",
      "m": "resolute protector"
    },
    {
      "n": "Gael",
      "g": "M",
      "m": "joyful and generous"
    },
    {
      "n": "Youssef",
      "g": "M",
      "m": "God increases"
    },
    {
      "n": "Jaime",
      "g": "M",
      "m": "supplanter"
    },
    {
      "n": "Eric",
      "g": "M",
      "m": "eternal ruler"
    },
    {
      "n": "Ian",
      "g": "M",
      "m": "God is gracious"
    },
    {
      "n": "Adam",
      "g": "M",
      "m": "son of the red earth"
    },
    {
      "n": "Rayan",
      "g": "M",
      "m": "gates of heaven"
    },
    {
      "n": "Aitor",
      "g": "M",
      "m": "good father"
    },
    {
      "n": "Rubén",
      "g": "M",
      "m": "behold a son"
    },
    {
      "n": "Héctor",
      "g": "M",
      "m": "holding fast"
    },
    {
      "n": "Rafael",
      "g": "M",
      "m": "God has healed"
    },
    {
      "n": "Marc",
      "g": "M",
      "m": "warlike"
    },
    {
      "n": "Ismael",
      "g": "M",
      "m": "God will hear"
    },
    {
      "n": "Aaron",
      "g": "M",
      "m": "high mountain"
    },
    {
      "n": "Victor",
      "g": "M",
      "m": "conqueror"
    },
    {
      "n": "Asier",
      "g": "M",
      "m": "the beginning"
    },
    {
      "n": "Pol",
      "g": "M",
      "m": "small or humble"
    },
    {
      "n": "Jesús",
      "g": "M",
      "m": "God is salvation"
    },
    {
      "n": "Luka",
      "g": "M",
      "m": "bringer of light"
    },
    {
      "n": "Pau",
      "g": "M",
      "m": "peace"
    },
    {
      "n": "Alan",
      "g": "M",
      "m": "handsome or cheerful"
    },
    {
      "n": "Juan",
      "g": "M",
      "m": "God is gracious"
    },
    {
      "n": "Nizam",
      "g": "M",
      "m": "disciplined leader"
    },
    {
      "n": "Francisco",
      "g": "M",
      "m": "free man"
    },
    {
      "n": "Biel",
      "g": "M",
      "m": "servant of God"
    },
    {
      "n": "Nil",
      "g": "M",
      "m": "victory of the people"
    },
    {
      "n": "Joel",
      "g": "M",
      "m": "Jehovah is God"
    },
    {
      "n": "Mohamed",
      "g": "M",
      "m": "praiseworthy"
    },
    {
      "n": "Luis",
      "g": "M",
      "m": "renowned warrior"
    },
    {
      "n": "Arnau",
      "g": "M",
      "m": "eagle ruler"
    },
    {
      "n": "Max",
      "g": "M",
      "m": "greatest"
    },
    {
      "n": "Ander",
      "g": "M",
      "m": "strong and manly"
    },
    {
      "n": "Kilian",
      "g": "M",
      "m": "bright-headed"
    },
    {
      "n": "Isaac",
      "g": "M",
      "m": "laughter and joy"
    },
    {
      "n": "Unai",
      "g": "M",
      "m": "shepherd"
    },
    {
      "n": "Alfonso",
      "g": "M",
      "m": "noble and ready"
    },
    {
      "n": "Matías",
      "g": "M",
      "m": "gift of God"
    },
    {
      "n": "Fernando",
      "g": "M",
      "m": "daring traveler"
    },
    {
      "n": "Lucía",
      "g": "F",
      "m": "light or born at dawn"
    },
    {
      "n": "Sofía",
      "g": "F",
      "m": "wisdom and intelligence"
    },
    {
      "n": "Martina",
      "g": "F",
      "m": "of Mars"
    },
    {
      "n": "Valeria",
      "g": "F",
      "m": "strong and healthy"
    },
    {
      "n": "María",
      "g": "F",
      "m": "star of the sea"
    },
    {
      "n": "Julia",
      "g": "F",
      "m": "youthful"
    },
    {
      "n": "Paula",
      "g": "F",
      "m": "small or humble"
    },
    {
      "n": "Emma",
      "g": "F",
      "m": "universal and whole"
    },
    {
      "n": "Daniela",
      "g": "F",
      "m": "God is my judge"
    },
    {
      "n": "Alba",
      "g": "F",
      "m": "white or dawn"
    },
    {
      "n": "Sara",
      "g": "F",
      "m": "princess"
    },
    {
      "n": "Noa",
      "g": "F",
      "m": "rest or movement"
    },
    {
      "n": "Carmen",
      "g": "F",
      "m": "song or garden"
    },
    {
      "n": "Claudia",
      "g": "F",
      "m": "lame or steadfast"
    },
    {
      "n": "Alma",
      "g": "F",
      "m": "soul or nurturing"
    },
    {
      "n": "Valentina",
      "g": "F",
      "m": "strong and healthy"
    },
    {
      "n": "Chloe",
      "g": "F",
      "m": "blooming young shoot"
    },
    {
      "n": "Lara",
      "g": "F",
      "m": "citadel or protection"
    },
    {
      "n": "Mia",
      "g": "F",
      "m": "beloved or darling"
    },
    {
      "n": "Oliva",
      "g": "F",
      "m": "olive tree"
    },
    {
      "n": "Elena",
      "g": "F",
      "m": "shining light"
    },
    {
      "n": "Vega",
      "g": "F",
      "m": "meadow"
    },
    {
      "n": "Ainhoa",
      "g": "F",
      "m": "fertile land"
    },
    {
      "n": "Marta",
      "g": "F",
      "m": "lady or mistress"
    },
    {
      "n": "Carla",
      "g": "F",
      "m": "free woman"
    },
    {
      "n": "Inés",
      "g": "F",
      "m": "pure and chaste"
    },
    {
      "n": "Lola",
      "g": "F",
      "m": "sorrows or strong lady"
    },
    {
      "n": "Jimena",
      "g": "F",
      "m": "the listener"
    },
    {
      "n": "Laia",
      "g": "F",
      "m": "eloquent"
    },
    {
      "n": "Triana",
      "g": "F",
      "m": "three rivers"
    },
    {
      "n": "Candela",
      "g": "F",
      "m": "candle or light"
    },
    {
      "n": "Ariadna",
      "g": "F",
      "m": "most holy"
    },
    {
      "n": "Irene",
      "g": "F",
      "m": "peace"
    },
    {
      "n": "Alejandra",
      "g": "F",
      "m": "defender of men"
    },
    {
      "n": "Aitana",
      "g": "F",
      "m": "glory or peak"
    },
    {
      "n": "Manuela",
      "g": "F",
      "m": "God is with us"
    },
    {
      "n": "Clara",
      "g": "F",
      "m": "bright and clear"
    },
    {
      "n": "Rocío",
      "g": "F",
      "m": "dew"
    },
    {
      "n": "Alicia",
      "g": "F",
      "m": "noble and truthful"
    },
    {
      "n": "Adriana",
      "g": "F",
      "m": "sea or dark one"
    },
    {
      "n": "Lia",
      "g": "F",
      "m": "bearer of good news"
    },
    {
      "n": "Gala",
      "g": "F",
      "m": "old one or woman from Gaul"
    },
    {
      "n": "Zoe",
      "g": "F",
      "m": "life and vitality"
    },
    {
      "n": "Aya",
      "g": "F",
      "m": "bird or flight"
    },
    {
      "n": "Nora",
      "g": "F",
      "m": "honor and light"
    },
    {
      "n": "Ona",
      "g": "F",
      "m": "grace"
    },
    {
      "n": "Amina",
      "g": "F",
      "m": "trustworthy"
    },
    {
      "n": "Iris",
      "g": "F",
      "m": "rainbow or goddess"
    },
    {
      "n": "Celia",
      "g": "F",
      "m": "heavenly"
    },
    {
      "n": "Cloe",
      "g": "F",
      "m": "blooming young shoot"
    },
    {
      "n": "Malak",
      "g": "F",
      "m": "angel"
    },
    {
      "n": "Amira",
      "g": "F",
      "m": "princess"
    },
    {
      "n": "Saray",
      "g": "F",
      "m": "princess"
    },
    {
      "n": "Ana",
      "g": "F",
      "m": "grace and favor"
    },
    {
      "n": "Juana",
      "g": "F",
      "m": "God is gracious"
    },
    {
      "n": "Leire",
      "g": "F",
      "m": "legion"
    },
    {
      "n": "Nerea",
      "g": "F",
      "m": "my stream"
    },
    {
      "n": "Nuria",
      "g": "F",
      "m": "light of God"
    },
    {
      "n": "Lourdes",
      "g": "F",
      "m": "craggy slope"
    },
    {
      "n": "Macarena",
      "g": "F",
      "m": "blessed"
    },
    {
      "n": "Belen",
      "g": "F",
      "m": "house of bread"
    },
    {
      "n": "Blanca",
      "g": "F",
      "m": "white and pure"
    },
    {
      "n": "Paloma",
      "g": "F",
      "m": "dove or peace"
    },
    {
      "n": "Pilar",
      "g": "F",
      "m": "pillar of strength"
    },
    {
      "n": "Soledad",
      "g": "F",
      "m": "solitude"
    },
    {
      "n": "Arantxa",
      "g": "F",
      "m": "thorn bush"
    },
    {
      "n": "Mercedes",
      "g": "F",
      "m": "mercies"
    },
    {
      "n": "Dolores",
      "g": "F",
      "m": "sorrows"
    },
    {
      "n": "Isabel",
      "g": "F",
      "m": "pledged to God"
    },
    {
      "n": "Milagros",
      "g": "F",
      "m": "miracles"
    },
    {
      "n": "Esperanza",
      "g": "F",
      "m": "hope"
    },
    {
      "n": "Consuelo",
      "g": "F",
      "m": "consolation"
    },
    {
      "n": "Cristina",
      "g": "F",
      "m": "follower of Christ"
    },
    {
      "n": "Estrella",
      "g": "F",
      "m": "star"
    }
  ],
  "pt": [
    {
      "n": "Miguel",
      "g": "M",
      "m": "who is like God"
    },
    {
      "n": "Arthur",
      "g": "M",
      "m": "noble and bear"
    },
    {
      "n": "Gael",
      "g": "M",
      "m": "joyful and generous"
    },
    {
      "n": "Théo",
      "g": "M",
      "m": "gift of God"
    },
    {
      "n": "Heitor",
      "g": "M",
      "m": "holding fast"
    },
    {
      "n": "Ravi",
      "g": "M",
      "m": "sun"
    },
    {
      "n": "Davi",
      "g": "M",
      "m": "beloved"
    },
    {
      "n": "Bernardo",
      "g": "M",
      "m": "brave as a bear"
    },
    {
      "n": "Noah",
      "g": "M",
      "m": "rest and peace"
    },
    {
      "n": "Gabriel",
      "g": "M",
      "m": "God is my strength"
    },
    {
      "n": "Samuel",
      "g": "M",
      "m": "God has heard"
    },
    {
      "n": "Pedro",
      "g": "M",
      "m": "rock or stone"
    },
    {
      "n": "Anthony",
      "g": "M",
      "m": "priceless and praiseworthy"
    },
    {
      "n": "Isaac",
      "g": "M",
      "m": "laughter and joy"
    },
    {
      "n": "Lucas",
      "g": "M",
      "m": "bringer of light"
    },
    {
      "n": "Benjamin",
      "g": "M",
      "m": "son of the right hand"
    },
    {
      "n": "Matheus",
      "g": "M",
      "m": "gift of Jehovah"
    },
    {
      "n": "Joaquim",
      "g": "M",
      "m": "established by God"
    },
    {
      "n": "Rafael",
      "g": "M",
      "m": "God has healed"
    },
    {
      "n": "Enzo",
      "g": "M",
      "m": "ruler of the home"
    },
    {
      "n": "Henrique",
      "g": "M",
      "m": "ruler of the home"
    },
    {
      "n": "Murilo",
      "g": "M",
      "m": "small wall"
    },
    {
      "n": "Gustavo",
      "g": "M",
      "m": "staff of the Goths"
    },
    {
      "n": "Lucca",
      "g": "M",
      "m": "bringer of light"
    },
    {
      "n": "Lorenzo",
      "g": "M",
      "m": "crowned with laurel"
    },
    {
      "n": "Felipe",
      "g": "M",
      "m": "lover of horses"
    },
    {
      "n": "Daniel",
      "g": "M",
      "m": "God is my judge"
    },
    {
      "n": "Vitor",
      "g": "M",
      "m": "conqueror"
    },
    {
      "n": "Leonardo",
      "g": "M",
      "m": "brave lion"
    },
    {
      "n": "Yuri",
      "g": "M",
      "m": "farmer or earth worker"
    },
    {
      "n": "Eduardo",
      "g": "M",
      "m": "wealthy guardian"
    },
    {
      "n": "Luan",
      "g": "M",
      "m": "lion or moon"
    },
    {
      "n": "Cauã",
      "g": "M",
      "m": "hawk"
    },
    {
      "n": "Pietro",
      "g": "M",
      "m": "rock or stone"
    },
    {
      "n": "Augusto",
      "g": "M",
      "m": "venerable"
    },
    {
      "n": "Otávio",
      "g": "M",
      "m": "eighth"
    },
    {
      "n": "Vinícius",
      "g": "M",
      "m": "of the vine"
    },
    {
      "n": "Bryan",
      "g": "M",
      "m": "noble and strong"
    },
    {
      "n": "Guilherme",
      "g": "M",
      "m": "resolute protector"
    },
    {
      "n": "Mathias",
      "g": "M",
      "m": "gift of God"
    },
    {
      "n": "Bento",
      "g": "M",
      "m": "blessed"
    },
    {
      "n": "João",
      "g": "M",
      "m": "God is gracious"
    },
    {
      "n": "Caio",
      "g": "M",
      "m": "rejoice"
    },
    {
      "n": "Caleb",
      "g": "M",
      "m": "faithful and wholehearted"
    },
    {
      "n": "Thomas",
      "g": "M",
      "m": "twin"
    },
    {
      "n": "Bruno",
      "g": "M",
      "m": "brown-haired"
    },
    {
      "n": "Rodrigo",
      "g": "M",
      "m": "famous ruler"
    },
    {
      "n": "Vicente",
      "g": "M",
      "m": "conquering"
    },
    {
      "n": "Emanuel",
      "g": "M",
      "m": "God is with us"
    },
    {
      "n": "Yago",
      "g": "M",
      "m": "supplanter"
    },
    {
      "n": "Thiago",
      "g": "M",
      "m": "supplanter"
    },
    {
      "n": "Ruan",
      "g": "M",
      "m": "God is gracious"
    },
    {
      "n": "Rayan",
      "g": "M",
      "m": "gates of heaven"
    },
    {
      "n": "Hugo",
      "g": "M",
      "m": "mind or spirit"
    },
    {
      "n": "Diego",
      "g": "M",
      "m": "supplanter or teacher"
    },
    {
      "n": "Marcos",
      "g": "M",
      "m": "of Mars"
    },
    {
      "n": "Alexandre",
      "g": "M",
      "m": "defender of men"
    },
    {
      "n": "Renan",
      "g": "M",
      "m": "seal or mysterious"
    },
    {
      "n": "Oliver",
      "g": "M",
      "m": "peace of olive tree"
    },
    {
      "n": "Ícaro",
      "g": "M",
      "m": "follower"
    },
    {
      "n": "André",
      "g": "M",
      "m": "strong and manly"
    },
    {
      "n": "Tomás",
      "g": "M",
      "m": "twin"
    },
    {
      "n": "Liam",
      "g": "M",
      "m": "resolute protector"
    },
    {
      "n": "Francisco",
      "g": "M",
      "m": "free man"
    },
    {
      "n": "Marcelo",
      "g": "M",
      "m": "little warrior"
    },
    {
      "n": "Antônio",
      "g": "M",
      "m": "priceless"
    },
    {
      "n": "Carlos",
      "g": "M",
      "m": "free man"
    },
    {
      "n": "Ricardo",
      "g": "M",
      "m": "powerful ruler"
    },
    {
      "n": "Fernando",
      "g": "M",
      "m": "daring traveler"
    },
    {
      "n": "Luiz",
      "g": "M",
      "m": "renowned warrior"
    },
    {
      "n": "Danilo",
      "g": "M",
      "m": "God is my judge"
    },
    {
      "n": "Ítalo",
      "g": "M",
      "m": "from Italy"
    },
    {
      "n": "Sandro",
      "g": "M",
      "m": "defender of men"
    },
    {
      "n": "Douglas",
      "g": "M",
      "m": "dark river"
    },
    {
      "n": "Fabrício",
      "g": "M",
      "m": "craftsman"
    },
    {
      "n": "Helena",
      "g": "F",
      "m": "shining light"
    },
    {
      "n": "Alice",
      "g": "F",
      "m": "noble and truthful"
    },
    {
      "n": "Laura",
      "g": "F",
      "m": "crowned with laurel"
    },
    {
      "n": "Maria Alice",
      "g": "F",
      "m": "star of the sea and noble truth"
    },
    {
      "n": "Sophia",
      "g": "F",
      "m": "wisdom"
    },
    {
      "n": "Manuela",
      "g": "F",
      "m": "God is with us"
    },
    {
      "n": "Maitê",
      "g": "F",
      "m": "beloved or loved one"
    },
    {
      "n": "Liz",
      "g": "F",
      "m": "pledged to God"
    },
    {
      "n": "Cecília",
      "g": "F",
      "m": "blind to wrinkles or steadfast"
    },
    {
      "n": "Isabella",
      "g": "F",
      "m": "pledged to God"
    },
    {
      "n": "Luísa",
      "g": "F",
      "m": "famous warrior"
    },
    {
      "n": "Eloá",
      "g": "F",
      "m": "God"
    },
    {
      "n": "Valentina",
      "g": "F",
      "m": "strong and healthy"
    },
    {
      "n": "Antonella",
      "g": "F",
      "m": "priceless and praiseworthy"
    },
    {
      "n": "Heloísa",
      "g": "F",
      "m": "healthy and whole"
    },
    {
      "n": "Júlia",
      "g": "F",
      "m": "youthful"
    },
    {
      "n": "Ayla",
      "g": "F",
      "m": "oak tree or moonlight"
    },
    {
      "n": "Isadora",
      "g": "F",
      "m": "gift of Isis"
    },
    {
      "n": "Lívia",
      "g": "F",
      "m": "blue or envious"
    },
    {
      "n": "Maria Luísa",
      "g": "F",
      "m": "star of the sea and famous warrior"
    },
    {
      "n": "Lorena",
      "g": "F",
      "m": "laurel crown"
    },
    {
      "n": "Giovanna",
      "g": "F",
      "m": "God is gracious"
    },
    {
      "n": "Beatriz",
      "g": "F",
      "m": "she who brings happiness"
    },
    {
      "n": "Maria Júlia",
      "g": "F",
      "m": "star of the sea and youthful"
    },
    {
      "n": "Mariana",
      "g": "F",
      "m": "drop of the sea or beloved"
    },
    {
      "n": "Lara",
      "g": "F",
      "m": "citadel or protection"
    },
    {
      "n": "Melissa",
      "g": "F",
      "m": "honeybee"
    },
    {
      "n": "Emanuelly",
      "g": "F",
      "m": "God is with us"
    },
    {
      "n": "Ana Clara",
      "g": "F",
      "m": "grace and bright clear"
    },
    {
      "n": "Yasmin",
      "g": "F",
      "m": "jasmine flower"
    },
    {
      "n": "Sarah",
      "g": "F",
      "m": "princess"
    },
    {
      "n": "Rebeca",
      "g": "F",
      "m": "captivating or to bind"
    },
    {
      "n": "Lavínia",
      "g": "F",
      "m": "purified"
    },
    {
      "n": "Rafaela",
      "g": "F",
      "m": "God has healed"
    },
    {
      "n": "Vitória",
      "g": "F",
      "m": "victory and triumph"
    },
    {
      "n": "Isabelly",
      "g": "F",
      "m": "pledged to God"
    },
    {
      "n": "Clara",
      "g": "F",
      "m": "bright and clear"
    },
    {
      "n": "Bianca",
      "g": "F",
      "m": "white and pure"
    },
    {
      "n": "Catarina",
      "g": "F",
      "m": "pure and chaste"
    },
    {
      "n": "Larissa",
      "g": "F",
      "m": "citadel or protection"
    },
    {
      "n": "Carolina",
      "g": "F",
      "m": "free man"
    },
    {
      "n": "Letícia",
      "g": "F",
      "m": "joy and gladness"
    },
    {
      "n": "Gabriela",
      "g": "F",
      "m": "God is my strength"
    },
    {
      "n": "Milena",
      "g": "F",
      "m": "love and warmth"
    },
    {
      "n": "Amanda",
      "g": "F",
      "m": "worthy of love"
    },
    {
      "n": "Bárbara",
      "g": "F",
      "m": "foreign woman"
    },
    {
      "n": "Juliana",
      "g": "F",
      "m": "youthful"
    },
    {
      "n": "Bruna",
      "g": "F",
      "m": "brown-haired"
    },
    {
      "n": "Nicole",
      "g": "F",
      "m": "victory of the people"
    },
    {
      "n": "Camila",
      "g": "F",
      "m": "young ceremonial attendant"
    },
    {
      "n": "Natália",
      "g": "F",
      "m": "birthday of Christ"
    },
    {
      "n": "Fernanda",
      "g": "F",
      "m": "daring traveler"
    },
    {
      "n": "Alícia",
      "g": "F",
      "m": "noble and truthful"
    },
    {
      "n": "Stella",
      "g": "F",
      "m": "star"
    },
    {
      "n": "Luana",
      "g": "F",
      "m": "lion or moon"
    },
    {
      "n": "Pérola",
      "g": "F",
      "m": "pearl"
    },
    {
      "n": "Maya",
      "g": "F",
      "m": "water or illusion"
    },
    {
      "n": "Mirella",
      "g": "F",
      "m": "admirable"
    },
    {
      "n": "Gabrielly",
      "g": "F",
      "m": "God is my strength"
    },
    {
      "n": "Malu",
      "g": "F",
      "m": "renowned warrior or protector"
    },
    {
      "n": "Alana",
      "g": "F",
      "m": "precious or handsome"
    },
    {
      "n": "Rayssa",
      "g": "F",
      "m": "rose"
    },
    {
      "n": "Brenda",
      "g": "F",
      "m": "sword"
    },
    {
      "n": "Sabrina",
      "g": "F",
      "m": "from the river Severn"
    },
    {
      "n": "Priscila",
      "g": "F",
      "m": "ancient"
    },
    {
      "n": "Taís",
      "g": "F",
      "m": "beloved"
    },
    {
      "n": "Daniela",
      "g": "F",
      "m": "God is my judge"
    },
    {
      "n": "Esther",
      "g": "F",
      "m": "star"
    },
    {
      "n": "Laís",
      "g": "F",
      "m": "lion or democratic"
    },
    {
      "n": "Heloise",
      "g": "F",
      "m": "healthy and whole"
    },
    {
      "n": "Isis",
      "g": "F",
      "m": "throne or goddess"
    },
    {
      "n": "Aurora",
      "g": "F",
      "m": "goddess of morning dawn"
    },
    {
      "n": "Luna",
      "g": "F",
      "m": "moon goddess"
    },
    {
      "n": "Jade",
      "g": "F",
      "m": "jade gemstone"
    },
    {
      "n": "Iris",
      "g": "F",
      "m": "rainbow or goddess"
    }
  ],
  "nl": [
    {
      "n": "Daan",
      "g": "M",
      "m": "God is my judge"
    },
    {
      "n": "Noah",
      "g": "M",
      "m": "rest and peace"
    },
    {
      "n": "Lucas",
      "g": "M",
      "m": "bringer of light"
    },
    {
      "n": "Levi",
      "g": "M",
      "m": "joined in harmony"
    },
    {
      "n": "Mees",
      "g": "M",
      "m": "son of Talmai"
    },
    {
      "n": "Sem",
      "g": "M",
      "m": "name or renown"
    },
    {
      "n": "Liam",
      "g": "M",
      "m": "resolute protector"
    },
    {
      "n": "Milan",
      "g": "M",
      "m": "kind and gracious"
    },
    {
      "n": "Luuk",
      "g": "M",
      "m": "bringer of light"
    },
    {
      "n": "Bram",
      "g": "M",
      "m": "father of a multitude"
    },
    {
      "n": "Sam",
      "g": "M",
      "m": "God has heard"
    },
    {
      "n": "Finn",
      "g": "M",
      "m": "fair and white"
    },
    {
      "n": "James",
      "g": "M",
      "m": "supplanter and leader"
    },
    {
      "n": "Mason",
      "g": "M",
      "m": "stone worker and builder"
    },
    {
      "n": "Max",
      "g": "M",
      "m": "greatest"
    },
    {
      "n": "Hugo",
      "g": "M",
      "m": "mind or spirit"
    },
    {
      "n": "Benjamin",
      "g": "M",
      "m": "son of the right hand"
    },
    {
      "n": "Noud",
      "g": "M",
      "m": "ruler of eagles"
    },
    {
      "n": "Gijs",
      "g": "M",
      "m": "bright pledge"
    },
    {
      "n": "Julian",
      "g": "M",
      "m": "youthful"
    },
    {
      "n": "Thomas",
      "g": "M",
      "m": "twin and leader"
    },
    {
      "n": "Teun",
      "g": "M",
      "m": "priceless"
    },
    {
      "n": "Otis",
      "g": "M",
      "m": "wealthy or son of Otto"
    },
    {
      "n": "Boaz",
      "g": "M",
      "m": "swiftness and strength"
    },
    {
      "n": "Olivier",
      "g": "M",
      "m": "peace of olive tree"
    },
    {
      "n": "Mats",
      "g": "M",
      "m": "gift of Jehovah"
    },
    {
      "n": "Floris",
      "g": "M",
      "m": "blooming and prosperous"
    },
    {
      "n": "Lars",
      "g": "M",
      "m": "crowned with laurel"
    },
    {
      "n": "Ties",
      "g": "M",
      "m": "gift of God"
    },
    {
      "n": "Ruben",
      "g": "M",
      "m": "behold a son"
    },
    {
      "n": "Senn",
      "g": "M",
      "m": "true or brave"
    },
    {
      "n": "Jack",
      "g": "M",
      "m": "God is gracious"
    },
    {
      "n": "Boris",
      "g": "F",
      "m": "wolf or short"
    },
    {
      "n": "Joep",
      "g": "M",
      "m": "God will increase"
    },
    {
      "n": "Stijn",
      "g": "M",
      "m": "constant and steadfast"
    },
    {
      "n": "Thijs",
      "g": "M",
      "m": "gift of Jehovah"
    },
    {
      "n": "Jens",
      "g": "M",
      "m": "God is gracious"
    },
    {
      "n": "Cas",
      "g": "M",
      "m": "imperial or stone holder"
    },
    {
      "n": "Vince",
      "g": "M",
      "m": "conquering"
    },
    {
      "n": "Owen",
      "g": "M",
      "m": "young warrior"
    },
    {
      "n": "Tijn",
      "g": "M",
      "m": "of Mars or august"
    },
    {
      "n": "Pim",
      "g": "M",
      "m": "resolute protector"
    },
    {
      "n": "Siem",
      "g": "M",
      "m": "the listener"
    },
    {
      "n": "Jonas",
      "g": "M",
      "m": "dove or peace"
    },
    {
      "n": "Hidde",
      "g": "M",
      "m": "battle or battle protector"
    },
    {
      "n": "Sven",
      "g": "M",
      "m": "youth or young warrior"
    },
    {
      "n": "Mika",
      "g": "M",
      "m": "who is like God"
    },
    {
      "n": "Guus",
      "g": "M",
      "m": "staff of the Goths"
    },
    {
      "n": "Jude",
      "g": "M",
      "m": "praised one"
    },
    {
      "n": "Dani",
      "g": "M",
      "m": "God is my judge"
    },
    {
      "n": "Fedde",
      "g": "M",
      "m": "peaceful ruler"
    },
    {
      "n": "Luka",
      "g": "M",
      "m": "bringer of light"
    },
    {
      "n": "Sepp",
      "g": "M",
      "m": "God will increase"
    },
    {
      "n": "Adam",
      "g": "M",
      "m": "son of the red earth"
    },
    {
      "n": "Xavi",
      "g": "M",
      "m": "bright and new house"
    },
    {
      "n": "Dean",
      "g": "M",
      "m": "valley or leader"
    },
    {
      "n": "Joren",
      "g": "M",
      "m": "farmer or earth worker"
    },
    {
      "n": "Morris",
      "g": "M",
      "m": "dark-skinned"
    },
    {
      "n": "Julia",
      "g": "F",
      "m": "youthful or downy-bearded"
    },
    {
      "n": "Mila",
      "g": "F",
      "m": "dear and gracious"
    },
    {
      "n": "Emma",
      "g": "F",
      "m": "universal and whole"
    },
    {
      "n": "Nora",
      "g": "F",
      "m": "honor and shining light"
    },
    {
      "n": "Olivia",
      "g": "F",
      "m": "olive tree and peace"
    },
    {
      "n": "Sophie",
      "g": "F",
      "m": "wisdom and purity"
    },
    {
      "n": "Tess",
      "g": "F",
      "m": "harvester or guardian"
    },
    {
      "n": "Milou",
      "g": "F",
      "m": "dear and famous warrior"
    },
    {
      "n": "Zoë",
      "g": "F",
      "m": "life and vitality"
    },
    {
      "n": "Yara",
      "g": "F",
      "m": "butterfly or water nymph"
    },
    {
      "n": "Evi",
      "g": "F",
      "m": "living one or life"
    },
    {
      "n": "Saar",
      "g": "F",
      "m": "princess"
    },
    {
      "n": "Lotte",
      "g": "F",
      "m": "free man"
    },
    {
      "n": "Liv",
      "g": "F",
      "m": "life or protection"
    },
    {
      "n": "Fleur",
      "g": "F",
      "m": "flower and blooming"
    },
    {
      "n": "Anna",
      "g": "F",
      "m": "grace and blessing"
    },
    {
      "n": "Eva",
      "g": "F",
      "m": "living one or vitality"
    },
    {
      "n": "Noa",
      "g": "F",
      "m": "rest or movement"
    },
    {
      "n": "Fenna",
      "g": "F",
      "m": "peaceful guardian"
    },
    {
      "n": "Sara",
      "g": "F",
      "m": "princess"
    },
    {
      "n": "Lynn",
      "g": "F",
      "m": "waterfall or lake"
    },
    {
      "n": "Lauren",
      "g": "F",
      "m": "crowned with laurel"
    },
    {
      "n": "Nina",
      "g": "F",
      "m": "grace or favor"
    },
    {
      "n": "Maud",
      "g": "F",
      "m": "mighty in battle"
    },
    {
      "n": "Lieke",
      "g": "F",
      "m": "angelic or pure"
    },
    {
      "n": "Liva",
      "g": "F",
      "m": "life or olive tree"
    },
    {
      "n": "Elin",
      "g": "F",
      "m": "shining light"
    },
    {
      "n": "Fline",
      "g": "F",
      "m": "noble and fair"
    },
    {
      "n": "Sarah",
      "g": "F",
      "m": "princess"
    },
    {
      "n": "Loïs",
      "g": "F",
      "m": "most desirable"
    },
    {
      "n": "Roos",
      "g": "F",
      "m": "rose flower"
    },
    {
      "n": "Noor",
      "g": "F",
      "m": "honor and light"
    },
    {
      "n": "Sofia",
      "g": "F",
      "m": "wisdom"
    },
    {
      "n": "Bo",
      "g": "F",
      "m": "to live or handsome"
    },
    {
      "n": "Julie",
      "g": "F",
      "m": "youthful"
    },
    {
      "n": "Maeve",
      "g": "F",
      "m": "she who intoxicates"
    },
    {
      "n": "Benthe",
      "g": "F",
      "m": "blessed"
    },
    {
      "n": "Floor",
      "g": "F",
      "m": "blooming flower"
    },
    {
      "n": "Puck",
      "g": "F",
      "m": "mischievous fairy"
    },
    {
      "n": "Suze",
      "g": "F",
      "m": "lily flower"
    },
    {
      "n": "Juul",
      "g": "F",
      "m": "youthful"
    },
    {
      "n": "Guusje",
      "g": "F",
      "m": "staff of the Goths"
    },
    {
      "n": "Mia",
      "g": "F",
      "m": "beloved or darling"
    },
    {
      "n": "Nova",
      "g": "F",
      "m": "new or bright star"
    },
    {
      "n": "Isabella",
      "g": "F",
      "m": "pledged to God"
    },
    {
      "n": "Sterre",
      "g": "F",
      "m": "star"
    },
    {
      "n": "Amy",
      "g": "F",
      "m": "beloved"
    },
    {
      "n": "Cato",
      "g": "F",
      "m": "wise and all-knowing"
    },
    {
      "n": "Fay",
      "g": "F",
      "m": "fairy or faith"
    },
    {
      "n": "Jade",
      "g": "F",
      "m": "jade gemstone"
    },
    {
      "n": "Fenne",
      "g": "F",
      "m": "peace"
    },
    {
      "n": "Eline",
      "g": "F",
      "m": "shining light"
    },
    {
      "n": "Merel",
      "g": "F",
      "m": "blackbird"
    },
    {
      "n": "Lina",
      "g": "F",
      "m": "tender palm tree"
    },
    {
      "n": "Lana",
      "g": "F",
      "m": "rock or handsome"
    },
    {
      "n": "Kiki",
      "g": "F",
      "m": "double happiness"
    },
    {
      "n": "Demi",
      "g": "F",
      "m": "half or of Demeter"
    },
    {
      "n": "Liz",
      "g": "F",
      "m": "pledged to God"
    }
  ],
  "uk": [
    {
      "n": "Oleksandr",
      "g": "M",
      "m": "defender of men"
    },
    {
      "n": "Artem",
      "g": "M",
      "m": "healthy and safe"
    },
    {
      "n": "Maksym",
      "g": "M",
      "m": "the greatest"
    },
    {
      "n": "Bohdan",
      "g": "M",
      "m": "given by God"
    },
    {
      "n": "Matvii",
      "g": "M",
      "m": "gift of God"
    },
    {
      "n": "Dmytro",
      "g": "M",
      "m": "devoted to Demeter"
    },
    {
      "n": "Vladyslav",
      "g": "M",
      "m": "ruler of glory"
    },
    {
      "n": "Ivan",
      "g": "M",
      "m": "God is gracious"
    },
    {
      "n": "Mark",
      "g": "M",
      "m": "consecrated to Mars"
    },
    {
      "n": "Tymofii",
      "g": "M",
      "m": "honoring God"
    },
    {
      "n": "Illia",
      "g": "M",
      "m": "my God is Yahweh"
    },
    {
      "n": "Nazar",
      "g": "M",
      "m": "from Nazareth"
    },
    {
      "n": "Mykyta",
      "g": "M",
      "m": "victorious"
    },
    {
      "n": "Andrii",
      "g": "M",
      "m": "manly and brave"
    },
    {
      "n": "Danylo",
      "g": "M",
      "m": "God is my judge"
    },
    {
      "n": "Yehor",
      "g": "M",
      "m": "farmer or earth worker"
    },
    {
      "n": "Kyrylo",
      "g": "M",
      "m": "lord or master"
    },
    {
      "n": "Roman",
      "g": "M",
      "m": "citizen of Rome"
    },
    {
      "n": "Serhii",
      "g": "M",
      "m": "guardian or protector"
    },
    {
      "n": "Mykhailo",
      "g": "M",
      "m": "who is like God"
    },
    {
      "n": "Yaroslav",
      "g": "M",
      "m": "fierce and glorious"
    },
    {
      "n": "Denys",
      "g": "M",
      "m": "follower of Dionysus"
    },
    {
      "n": "Sviatoslav",
      "g": "M",
      "m": "holy glory"
    },
    {
      "n": "Taras",
      "g": "M",
      "m": "rebel or disturber"
    },
    {
      "n": "Ostap",
      "g": "M",
      "m": "steadfast and healthy"
    },
    {
      "n": "Zakhar",
      "g": "M",
      "m": "remembered by God"
    },
    {
      "n": "Arsen",
      "g": "M",
      "m": "virile and strong"
    },
    {
      "n": "Makar",
      "g": "M",
      "m": "blessed and happy"
    },
    {
      "n": "Volodymyr",
      "g": "M",
      "m": "ruler of peace"
    },
    {
      "n": "Ustym",
      "g": "M",
      "m": "just and fair"
    },
    {
      "n": "Lev",
      "g": "M",
      "m": "lion"
    },
    {
      "n": "Tymur",
      "g": "M",
      "m": "iron"
    },
    {
      "n": "Heorhii",
      "g": "M",
      "m": "farmer"
    },
    {
      "n": "Yurii",
      "g": "M",
      "m": "farmer"
    },
    {
      "n": "Stanislav",
      "g": "M",
      "m": "become glorious"
    },
    {
      "n": "Pavlo",
      "g": "M",
      "m": "small or humble"
    },
    {
      "n": "Anton",
      "g": "M",
      "m": "priceless"
    },
    {
      "n": "Kostiantyn",
      "g": "M",
      "m": "constant and firm"
    },
    {
      "n": "Oleksii",
      "g": "M",
      "m": "defender"
    },
    {
      "n": "Mykola",
      "g": "M",
      "m": "victory of the people"
    },
    {
      "n": "Hlib",
      "g": "M",
      "m": "heir of God"
    },
    {
      "n": "Rostyslav",
      "g": "M",
      "m": "growing glory"
    },
    {
      "n": "Platon",
      "g": "M",
      "m": "broad-shouldered"
    },
    {
      "n": "Demian",
      "g": "M",
      "m": "one who tames"
    },
    {
      "n": "Hennadii",
      "g": "M",
      "m": "noble-born"
    },
    {
      "n": "Severyn",
      "g": "M",
      "m": "stern and severe"
    },
    {
      "n": "Lubomyr",
      "g": "M",
      "m": "love of peace"
    },
    {
      "n": "Vsevolod",
      "g": "M",
      "m": "ruler of everything"
    },
    {
      "n": "Gordon",
      "g": "M",
      "m": "spacious fort"
    },
    {
      "n": "Radomyr",
      "g": "M",
      "m": "happy peace"
    },
    {
      "n": "Valerii",
      "g": "M",
      "m": "to be strong"
    },
    {
      "n": "Anatolii",
      "g": "M",
      "m": "from the east"
    },
    {
      "n": "Vasyl",
      "g": "M",
      "m": "royal and kingly"
    },
    {
      "n": "Petro",
      "g": "M",
      "m": "rock or stone"
    },
    {
      "n": "Stepan",
      "g": "M",
      "m": "crown or garland"
    },
    {
      "n": "Viktor",
      "g": "M",
      "m": "conqueror"
    },
    {
      "n": "Yevhen",
      "g": "M",
      "m": "well-born or noble"
    },
    {
      "n": "Oleh",
      "g": "M",
      "m": "holy or sacred"
    },
    {
      "n": "Myroslav",
      "g": "M",
      "m": "peace and glory"
    },
    {
      "n": "Boryslav",
      "g": "M",
      "m": "fighting for glory"
    },
    {
      "n": "Sofija",
      "g": "F",
      "m": "wisdom and intelligence"
    },
    {
      "n": "Anastasija",
      "g": "F",
      "m": "resurrection and new life"
    },
    {
      "n": "Anna",
      "g": "F",
      "m": "grace and favor"
    },
    {
      "n": "Veronika",
      "g": "F",
      "m": "she who brings victory"
    },
    {
      "n": "Marija",
      "g": "F",
      "m": "star of the sea and beloved"
    },
    {
      "n": "Viktorija",
      "g": "F",
      "m": "victory and triumph"
    },
    {
      "n": "Zlata",
      "g": "F",
      "m": "golden or precious gem"
    },
    {
      "n": "Solomija",
      "g": "F",
      "m": "peace and tranquility"
    },
    {
      "n": "Milana",
      "g": "F",
      "m": "kind and gracious"
    },
    {
      "n": "Darija",
      "g": "F",
      "m": "possessor of good"
    },
    {
      "n": "Alisa",
      "g": "F",
      "m": "noble and truthful"
    },
    {
      "n": "Kateryna",
      "g": "F",
      "m": "pure and chaste"
    },
    {
      "n": "Polina",
      "g": "F",
      "m": "sunlight or small"
    },
    {
      "n": "Khrystyna",
      "g": "F",
      "m": "follower of Christ"
    },
    {
      "n": "Yeva",
      "g": "F",
      "m": "living one or life"
    },
    {
      "n": "Yana",
      "g": "F",
      "m": "God is gracious"
    },
    {
      "n": "Olesja",
      "g": "F",
      "m": "girl from the forest"
    },
    {
      "n": "Kira",
      "g": "F",
      "m": "lady ruler or sun"
    },
    {
      "n": "Ksenija",
      "g": "F",
      "m": "hospitable guest"
    },
    {
      "n": "Olha",
      "g": "F",
      "m": "holy and sacred"
    },
    {
      "n": "Tetjana",
      "g": "F",
      "m": "founder and establishment"
    },
    {
      "n": "Diana",
      "g": "F",
      "m": "divine and moon goddess"
    },
    {
      "n": "Irina",
      "g": "F",
      "m": "peace and harmony"
    },
    {
      "n": "Julija",
      "g": "F",
      "m": "youthful"
    },
    {
      "n": "Marta",
      "g": "F",
      "m": "lady or mistress"
    },
    {
      "n": "Natalija",
      "g": "F",
      "m": "birthday of Christ"
    },
    {
      "n": "Olena",
      "g": "F",
      "m": "shining light"
    },
    {
      "n": "Karyna",
      "g": "F",
      "m": "pure or beloved"
    },
    {
      "n": "Anhelina",
      "g": "F",
      "m": "messenger or angel"
    },
    {
      "n": "Amina",
      "g": "F",
      "m": "trustworthy and faithful"
    },
    {
      "n": "Melanija",
      "g": "F",
      "m": "dark or black"
    },
    {
      "n": "Nadiia",
      "g": "F",
      "m": "hope and bright future"
    },
    {
      "n": "Ulyana",
      "g": "F",
      "m": "youthful hair"
    },
    {
      "n": "Zojana",
      "g": "F",
      "m": "life and vitality"
    },
    {
      "n": "Emilija",
      "g": "F",
      "m": "industrious and rival"
    },
    {
      "n": "Marharyta",
      "g": "F",
      "m": "pearl"
    },
    {
      "n": "Ivanna",
      "g": "F",
      "m": "God is gracious"
    },
    {
      "n": "Ustyna",
      "g": "F",
      "m": "just and fair"
    },
    {
      "n": "Bohdana",
      "g": "F",
      "m": "given by God"
    },
    {
      "n": "Myroslava",
      "g": "F",
      "m": "peace and glory"
    },
    {
      "n": "Vasylyna",
      "g": "F",
      "m": "royal or queenly"
    },
    {
      "n": "Stefanija",
      "g": "F",
      "m": "crown or garland"
    },
    {
      "n": "Roksolana",
      "g": "F",
      "m": "woman from Roxolani"
    },
    {
      "n": "Larysa",
      "g": "F",
      "m": "citadel or protection"
    },
    {
      "n": "Lubomyra",
      "g": "F",
      "m": "love of peace"
    },
    {
      "n": "Oleksandra",
      "g": "F",
      "m": "defender of men"
    },
    {
      "n": "Liudmyla",
      "g": "F",
      "m": "love of the people"
    },
    {
      "n": "Nina",
      "g": "F",
      "m": "grace or favor"
    },
    {
      "n": "Tamara",
      "g": "F",
      "m": "palm tree"
    },
    {
      "n": "Valerija",
      "g": "F",
      "m": "strong and healthy"
    },
    {
      "n": "Vira",
      "g": "F",
      "m": "faith and trust"
    },
    {
      "n": "Inna",
      "g": "F",
      "m": "rushing stream"
    },
    {
      "n": "Lilia",
      "g": "F",
      "m": "lily flower"
    },
    {
      "n": "Klavdija",
      "g": "F",
      "m": "steadfast and firm"
    },
    {
      "n": "Regina",
      "g": "F",
      "m": "queen"
    },
    {
      "n": "Boryslava",
      "g": "F",
      "m": "fighting for glory"
    },
    {
      "n": "Miroslava",
      "g": "F",
      "m": "peace and glory"
    }
  ],
  "ru": [
    {
      "n": "Alexander",
      "g": "M",
      "m": "defender of men"
    },
    {
      "n": "Mikhail",
      "g": "M",
      "m": "who is like God"
    },
    {
      "n": "Artem",
      "g": "M",
      "m": "healthy and safe"
    },
    {
      "n": "Maksim",
      "g": "M",
      "m": "the greatest"
    },
    {
      "n": "Daniil",
      "g": "M",
      "m": "God is my judge"
    },
    {
      "n": "Ivan",
      "g": "M",
      "m": "God is gracious"
    },
    {
      "n": "Dmitry",
      "g": "M",
      "m": "devoted to Demeter"
    },
    {
      "n": "Kirill",
      "g": "M",
      "m": "lord or master"
    },
    {
      "n": "Nikita",
      "g": "M",
      "m": "victorious"
    },
    {
      "n": "Ilya",
      "g": "M",
      "m": "my God is Yahweh"
    },
    {
      "n": "Egor",
      "g": "M",
      "m": "farmer or earth worker"
    },
    {
      "n": "Matvey",
      "g": "M",
      "m": "gift of God"
    },
    {
      "n": "Andrey",
      "g": "M",
      "m": "manly and brave"
    },
    {
      "n": "Roman",
      "g": "M",
      "m": "citizen of Rome"
    },
    {
      "n": "Vladimir",
      "g": "M",
      "m": "ruler of peace"
    },
    {
      "n": "Denis",
      "g": "M",
      "m": "follower of Dionysus"
    },
    {
      "n": "Yaroslav",
      "g": "M",
      "m": "fierce and glorious"
    },
    {
      "n": "Pavel",
      "g": "M",
      "m": "small or humble"
    },
    {
      "n": "Alexey",
      "g": "M",
      "m": "defender"
    },
    {
      "n": "Arseniy",
      "g": "M",
      "m": "virile and strong"
    },
    {
      "n": "Mark",
      "g": "M",
      "m": "consecrated to Mars"
    },
    {
      "n": "Timur",
      "g": "M",
      "m": "iron and strong"
    },
    {
      "n": "Vladislav",
      "g": "M",
      "m": "ruler of glory"
    },
    {
      "n": "Svyatoslav",
      "g": "M",
      "m": "holy glory"
    },
    {
      "n": "Timofey",
      "g": "M",
      "m": "honoring God"
    },
    {
      "n": "Georgy",
      "g": "M",
      "m": "farmer or earth worker"
    },
    {
      "n": "Nikolay",
      "g": "M",
      "m": "victory of the people"
    },
    {
      "n": "Stepan",
      "g": "M",
      "m": "crown or garland"
    },
    {
      "n": "Konstantin",
      "g": "M",
      "m": "constant and steadfast"
    },
    {
      "n": "Arthur",
      "g": "M",
      "m": "noble and bear"
    },
    {
      "n": "Viktor",
      "g": "M",
      "m": "conqueror"
    },
    {
      "n": "Anton",
      "g": "M",
      "m": "priceless"
    },
    {
      "n": "Pyotr",
      "g": "M",
      "m": "rock or stone"
    },
    {
      "n": "Lev",
      "g": "M",
      "m": "lion"
    },
    {
      "n": "Vadim",
      "g": "M",
      "m": "ruler or leader"
    },
    {
      "n": "Yury",
      "g": "M",
      "m": "farmer"
    },
    {
      "n": "Ruslan",
      "g": "M",
      "m": "lion-like hero"
    },
    {
      "n": "Svyatogor",
      "g": "M",
      "m": "sacred mountain"
    },
    {
      "n": "Oleg",
      "g": "M",
      "m": "holy and sacred"
    },
    {
      "n": "Gleb",
      "g": "M",
      "m": "heir of God"
    },
    {
      "n": "Damir",
      "g": "M",
      "m": "giver of peace"
    },
    {
      "n": "Stanislav",
      "g": "M",
      "m": "become glorious"
    },
    {
      "n": "Miroslav",
      "g": "M",
      "m": "peace and glory"
    },
    {
      "n": "Rodion",
      "g": "M",
      "m": "hero from Rhodes"
    },
    {
      "n": "Elisey",
      "g": "M",
      "m": "God is my salvation"
    },
    {
      "n": "Igor",
      "g": "M",
      "m": "warrior of thunder"
    },
    {
      "n": "Vsevolod",
      "g": "M",
      "m": "ruler of everything"
    },
    {
      "n": "Grigory",
      "g": "M",
      "m": "watchful and alert"
    },
    {
      "n": "Radmir",
      "g": "M",
      "m": "happy peace"
    },
    {
      "n": "Evgeny",
      "g": "M",
      "m": "noble and well-born"
    },
    {
      "n": "Valeriy",
      "g": "M",
      "m": "to be strong"
    },
    {
      "n": "Anatoly",
      "g": "M",
      "m": "from the east"
    },
    {
      "n": "Leonid",
      "g": "M",
      "m": "son of a lion"
    },
    {
      "n": "Rostislav",
      "g": "M",
      "m": "growing glory"
    },
    {
      "n": "Semyon",
      "g": "M",
      "m": "God has heard"
    },
    {
      "n": "Vyacheslav",
      "g": "M",
      "m": "greater glory"
    },
    {
      "n": "Svyatozar",
      "g": "M",
      "m": "holy light"
    },
    {
      "n": "Boris",
      "g": "M",
      "m": "fighter for glory"
    },
    {
      "n": "Marat",
      "g": "M",
      "m": "desired child"
    },
    {
      "n": "Fedor",
      "g": "M",
      "m": "gift of God"
    },
    {
      "n": "Zakhar",
      "g": "M",
      "m": "remembered by God"
    },
    {
      "n": "Luka",
      "g": "M",
      "m": "bringer of light"
    },
    {
      "n": "Savely",
      "g": "M",
      "m": "asked from God"
    },
    {
      "n": "David",
      "g": "M",
      "m": "beloved"
    },
    {
      "n": "Sergey",
      "g": "M",
      "m": "guardian or protector"
    },
    {
      "n": "Ignat",
      "g": "M",
      "m": "fiery passion"
    },
    {
      "n": "Filipp",
      "g": "M",
      "m": "lover of horses"
    },
    {
      "n": "Demid",
      "g": "M",
      "m": "divine judge"
    },
    {
      "n": "Vlad",
      "g": "M",
      "m": "ruler or master"
    },
    {
      "n": "Eduard",
      "g": "M",
      "m": "wealthy guardian"
    },
    {
      "n": "Tikhon",
      "g": "M",
      "m": "bringing luck"
    },
    {
      "n": "Platon",
      "g": "M",
      "m": "broad-shouldered"
    },
    {
      "n": "Demian",
      "g": "M",
      "m": "one who tames"
    },
    {
      "n": "Nazar",
      "g": "M",
      "m": "from Nazareth"
    },
    {
      "n": "Semen",
      "g": "M",
      "m": "the listener"
    },
    {
      "n": "Sofia",
      "g": "F",
      "m": "wisdom and intelligence"
    },
    {
      "n": "Maria",
      "g": "F",
      "m": "star of the sea and beloved"
    },
    {
      "n": "Anna",
      "g": "F",
      "m": "grace and blessing"
    },
    {
      "n": "Alisa",
      "g": "F",
      "m": "noble and truthful"
    },
    {
      "n": "Viktoria",
      "g": "F",
      "m": "victory and triumph"
    },
    {
      "n": "Anastasia",
      "g": "F",
      "m": "resurrection and new life"
    },
    {
      "n": "Polina",
      "g": "F",
      "m": "sunlight or small"
    },
    {
      "n": "Elizaveta",
      "g": "F",
      "m": "pledged to God"
    },
    {
      "n": "Ekaterina",
      "g": "F",
      "m": "pure and chaste"
    },
    {
      "n": "Ksenia",
      "g": "F",
      "m": "hospitable guest"
    },
    {
      "n": "Daria",
      "g": "F",
      "m": "possessor of good"
    },
    {
      "n": "Veronika",
      "g": "F",
      "m": "she who brings victory"
    },
    {
      "n": "Alexandra",
      "g": "F",
      "m": "defender of men"
    },
    {
      "n": "Valeria",
      "g": "F",
      "m": "strong and healthy"
    },
    {
      "n": "Varvara",
      "g": "F",
      "m": "foreign or mysterious"
    },
    {
      "n": "Ulyana",
      "g": "F",
      "m": "youthful hair"
    },
    {
      "n": "Alina",
      "g": "F",
      "m": "bright and noble"
    },
    {
      "n": "Margarita",
      "g": "F",
      "m": "pearl"
    },
    {
      "n": "Alona",
      "g": "F",
      "m": "shining light"
    },
    {
      "n": "Kristina",
      "g": "F",
      "m": "follower of Christ"
    },
    {
      "n": "Diana",
      "g": "F",
      "m": "divine and moon goddess"
    },
    {
      "n": "Yana",
      "g": "F",
      "m": "God is gracious"
    },
    {
      "n": "Kira",
      "g": "F",
      "m": "lady ruler or sun"
    },
    {
      "n": "Eva",
      "g": "F",
      "m": "living one or life"
    },
    {
      "n": "Elena",
      "g": "F",
      "m": "shining torch"
    },
    {
      "n": "Angelina",
      "g": "F",
      "m": "messenger or angel"
    },
    {
      "n": "Milana",
      "g": "F",
      "m": "kind and gracious"
    },
    {
      "n": "Vasilisa",
      "g": "F",
      "m": "royal or queenly"
    },
    {
      "n": "Taisia",
      "g": "F",
      "m": "wisdom or elegant"
    },
    {
      "n": "Vera",
      "g": "F",
      "m": "faith and trust"
    },
    {
      "n": "Nadezhda",
      "g": "F",
      "m": "hope and bright future"
    },
    {
      "n": "Lyubov",
      "g": "F",
      "m": "love and compassion"
    },
    {
      "n": "Olga",
      "g": "F",
      "m": "holy and sacred"
    },
    {
      "n": "Svetlana",
      "g": "F",
      "m": "bright and pure radiance"
    },
    {
      "n": "Yulia",
      "g": "F",
      "m": "youthful"
    },
    {
      "n": "Tatiana",
      "g": "F",
      "m": "founder and establishment"
    },
    {
      "n": "Natalya",
      "g": "F",
      "m": "birthday of Christ"
    },
    {
      "n": "Marina",
      "g": "F",
      "m": "woman of the sea"
    },
    {
      "n": "Irina",
      "g": "F",
      "m": "peace and harmony"
    },
    {
      "n": "Evgenia",
      "g": "F",
      "m": "noble and well-born"
    },
    {
      "n": "Mira",
      "g": "F",
      "m": "peaceful world"
    },
    {
      "n": "Zlata",
      "g": "F",
      "m": "golden or precious"
    },
    {
      "n": "Alena",
      "g": "F",
      "m": "bright torch"
    },
    {
      "n": "Karina",
      "g": "F",
      "m": "pure or beloved"
    },
    {
      "n": "Yarose",
      "g": "F",
      "m": "bright glory"
    },
    {
      "n": "Svyatoslava",
      "g": "F",
      "m": "holy glory"
    },
    {
      "n": "Violetta",
      "g": "F",
      "m": "violet flower"
    },
    {
      "n": "Inna",
      "g": "F",
      "m": "rushing stream"
    },
    {
      "n": "Olesya",
      "g": "F",
      "m": "girl from the forest"
    },
    {
      "n": "Nina",
      "g": "F",
      "m": "grace or favor"
    },
    {
      "n": "Mila",
      "g": "F",
      "m": "dear and pleasant"
    },
    {
      "n": "Lidia",
      "g": "F",
      "m": "noble woman from Lydia"
    },
    {
      "n": "Larisa",
      "g": "F",
      "m": "citadel or protection"
    },
    {
      "n": "Zoya",
      "g": "F",
      "m": "life and vitality"
    },
    {
      "n": "Antonina",
      "g": "F",
      "m": "priceless treasure"
    },
    {
      "n": "Nelli",
      "g": "F",
      "m": "shining light"
    },
    {
      "n": "Klavdia",
      "g": "F",
      "m": "steadfast and firm"
    },
    {
      "n": "Alla",
      "g": "F",
      "m": "other or master"
    },
    {
      "n": "Raisa",
      "g": "F",
      "m": "leader or relaxed"
    },
    {
      "n": "Galina",
      "g": "F",
      "m": "calm and serene sea"
    },
    {
      "n": "Tamara",
      "g": "F",
      "m": "palm tree"
    },
    {
      "n": "Lilia",
      "g": "F",
      "m": "lily flower"
    },
    {
      "n": "Maya",
      "g": "F",
      "m": "water or illusion"
    },
    {
      "n": "Inga",
      "g": "F",
      "m": "protected by Ing"
    },
    {
      "n": "Ella",
      "g": "F",
      "m": "all or bright light"
    },
    {
      "n": "Kamilla",
      "g": "F",
      "m": "ceremonial attendant"
    },
    {
      "n": "Vilena",
      "g": "F",
      "m": "freedom and peace"
    },
    {
      "n": "Roksana",
      "g": "F",
      "m": "bright dawn"
    },
    {
      "n": "Emilia",
      "g": "F",
      "m": "industrious and rival"
    },
    {
      "n": "Yaroslava",
      "g": "F",
      "m": "bright and glorious"
    },
    {
      "n": "Nika",
      "g": "F",
      "m": "victory"
    },
    {
      "n": "Mara",
      "g": "F",
      "m": "bitter or sea"
    },
    {
      "n": "Hanna",
      "g": "F",
      "m": "favor and grace"
    },
    {
      "n": "Nadia",
      "g": "F",
      "m": "hope"
    }
  ],
  "tr": [
    {
      "n": "Yusuf",
      "g": "M",
      "m": "God increases"
    },
    {
      "n": "Alperen",
      "g": "M",
      "m": "heroic dervish"
    },
    {
      "n": "Mustafa",
      "g": "M",
      "m": "the chosen one"
    },
    {
      "n": "Miraç",
      "g": "M",
      "m": "ascension to heaven"
    },
    {
      "n": "Ömer",
      "g": "M",
      "m": "long-lived or thriving"
    },
    {
      "n": "Ahmet",
      "g": "M",
      "m": "highly praised"
    },
    {
      "n": "Kerem",
      "g": "M",
      "m": "generous and noble"
    },
    {
      "n": "Eymen",
      "g": "M",
      "m": "blessed and fortunate"
    },
    {
      "n": "Ali",
      "g": "M",
      "m": "noble and exalted"
    },
    {
      "n": "Mehmet",
      "g": "M",
      "m": "praiseworthy"
    },
    {
      "n": "Hamza",
      "g": "M",
      "m": "strong or lion"
    },
    {
      "n": "Aras",
      "g": "M",
      "m": "river or bloodstock"
    },
    {
      "n": "Ayaz",
      "g": "M",
      "m": "cool breeze or dry cold"
    },
    {
      "n": "Can",
      "g": "M",
      "m": "life or soul"
    },
    {
      "n": "Emir",
      "g": "M",
      "m": "prince or commander"
    },
    {
      "n": "Yiğit",
      "g": "M",
      "m": "brave warrior"
    },
    {
      "n": "Berat",
      "g": "M",
      "m": "immunity or certificate"
    },
    {
      "n": "Barış",
      "g": "M",
      "m": "peace"
    },
    {
      "n": "Deniz",
      "g": "M",
      "m": "sea or ocean"
    },
    {
      "n": "Mert",
      "g": "M",
      "m": "manly and brave"
    },
    {
      "n": "Ozan",
      "g": "M",
      "m": "poet or bard"
    },
    {
      "n": "Enes",
      "g": "M",
      "m": "friendly or companion"
    },
    {
      "n": "Kaan",
      "g": "M",
      "m": "ruler or king"
    },
    {
      "n": "Metehan",
      "g": "M",
      "m": "great ruler or hero"
    },
    {
      "n": "Bora",
      "g": "M",
      "m": "hurricane or storm"
    },
    {
      "n": "Burak",
      "g": "M",
      "m": "lightning or horse of ascension"
    },
    {
      "n": "Eren",
      "g": "M",
      "m": "saint or wise man"
    },
    {
      "n": "Keren",
      "g": "M",
      "m": "generous"
    },
    {
      "n": "Umut",
      "g": "M",
      "m": "hope"
    },
    {
      "n": "Selim",
      "g": "M",
      "m": "safe and secure"
    },
    {
      "n": "Hasan",
      "g": "M",
      "m": "beautiful and good"
    },
    {
      "n": "Hüseyin",
      "g": "M",
      "m": "beautiful and good"
    },
    {
      "n": "Yunus",
      "g": "M",
      "m": "dolphin"
    },
    {
      "n": "Emre",
      "g": "M",
      "m": "friend or brother"
    },
    {
      "n": "Fatih",
      "g": "M",
      "m": "conqueror"
    },
    {
      "n": "İbrahim",
      "g": "M",
      "m": "father of nations"
    },
    {
      "n": "Murat",
      "g": "M",
      "m": "desire or wish"
    },
    {
      "n": "Serkan",
      "g": "M",
      "m": "noble blood"
    },
    {
      "n": "Gökhan",
      "g": "M",
      "m": "ruler of the sky"
    },
    {
      "n": "Hakan",
      "g": "M",
      "m": "emperor or ruler"
    },
    {
      "n": "Tarik",
      "g": "M",
      "m": "morning star"
    },
    {
      "n": "Volkan",
      "g": "M",
      "m": "volcano"
    },
    {
      "n": "Onur",
      "g": "M",
      "m": "honor and pride"
    },
    {
      "n": "Kamil",
      "g": "M",
      "m": "perfect and complete"
    },
    {
      "n": "Osman",
      "g": "M",
      "m": "young bustard bird"
    },
    {
      "n": "Orhan",
      "g": "M",
      "m": "khan of the city"
    },
    {
      "n": "Yasin",
      "g": "M",
      "m": "chief or rich leader"
    },
    {
      "n": "Sinan",
      "g": "M",
      "m": "spearhead"
    },
    {
      "n": "Süleyman",
      "g": "M",
      "m": "peaceful"
    },
    {
      "n": "Kadir",
      "g": "M",
      "m": "powerful"
    },
    {
      "n": "Batuhan",
      "g": "M",
      "m": "secret ruler"
    },
    {
      "n": "Doruk",
      "g": "M",
      "m": "mountain peak"
    },
    {
      "n": "Yavuz",
      "g": "M",
      "m": "resolute or stern"
    },
    {
      "n": "Oğuz",
      "g": "M",
      "m": "pure and strong man"
    },
    {
      "n": "Bilal",
      "g": "M",
      "m": "refreshing moisture"
    },
    {
      "n": "Zafer",
      "g": "M",
      "m": "victory"
    },
    {
      "n": "Kaya",
      "g": "M",
      "m": "rock"
    },
    {
      "n": "Ender",
      "g": "M",
      "m": "rare and precious"
    },
    {
      "n": "Levent",
      "g": "M",
      "m": "handsome marine sailor"
    },
    {
      "n": "Cem",
      "g": "M",
      "m": "ruler or king"
    },
    {
      "n": "Aslan",
      "g": "M",
      "m": "lion"
    },
    {
      "n": "Cengiz",
      "g": "M",
      "m": "ocean-like ruler"
    },
    {
      "n": "Kenan",
      "g": "M",
      "m": "ancient land"
    },
    {
      "n": "Harun",
      "g": "M",
      "m": "high mountain"
    },
    {
      "n": "Miran",
      "g": "M",
      "m": "peaceful leader"
    },
    {
      "n": "Utku",
      "g": "M",
      "m": "victory"
    },
    {
      "n": "Tolga",
      "g": "M",
      "m": "iron helmet"
    },
    {
      "n": "Alp",
      "g": "M",
      "m": "hero or brave"
    },
    {
      "n": "Malik",
      "g": "M",
      "m": "king or master"
    },
    {
      "n": "Efe",
      "g": "M",
      "m": "big brother or brave man"
    },
    {
      "n": "Koray",
      "g": "M",
      "m": "ember moon"
    },
    {
      "n": "Polat",
      "g": "M",
      "m": "steel or strong"
    },
    {
      "n": "Bülent",
      "g": "M",
      "m": "high and sublime"
    },
    {
      "n": "Ercan",
      "g": "M",
      "m": "brave soul"
    },
    {
      "n": "Cihan",
      "g": "M",
      "m": "universe or world"
    },
    {
      "n": "Zeynep",
      "g": "F",
      "m": "ornament of her father"
    },
    {
      "n": "Elif",
      "g": "F",
      "m": "slender and graceful or first letter"
    },
    {
      "n": "Defne",
      "g": "F",
      "m": "laurel tree"
    },
    {
      "n": "Asel",
      "g": "F",
      "m": "honey or sweet blessing"
    },
    {
      "n": "Azra",
      "g": "F",
      "m": "pure and untouched maiden"
    },
    {
      "n": "Eylül",
      "g": "F",
      "m": "september harvest"
    },
    {
      "n": "Nehir",
      "g": "F",
      "m": "river or flowing stream"
    },
    {
      "n": "Duru",
      "g": "F",
      "m": "clear and pure"
    },
    {
      "n": "Ecrin",
      "g": "F",
      "m": "reward or gift from God"
    },
    {
      "n": "Miray",
      "g": "F",
      "m": "shining like the moon"
    },
    {
      "n": "Zümra",
      "g": "F",
      "m": "noble and intelligent woman"
    },
    {
      "n": "Mina",
      "g": "F",
      "m": "heavenly light or harbor"
    },
    {
      "n": "Güneş",
      "g": "F",
      "m": "sun or bright torch"
    },
    {
      "n": "Alya",
      "g": "F",
      "m": "high heaven or nobility"
    },
    {
      "n": "Ada",
      "g": "F",
      "m": "island or serene haven"
    },
    {
      "n": "Lina",
      "g": "F",
      "m": "tender palm tree"
    },
    {
      "n": "Derin",
      "g": "F",
      "m": "deep wisdom"
    },
    {
      "n": "Melis",
      "g": "F",
      "m": "honeybee"
    },
    {
      "n": "Belen",
      "g": "F",
      "m": "sacred pass or path"
    },
    {
      "n": "Cemre",
      "g": "F",
      "m": "ember or spark of fire"
    },
    {
      "n": "Ela",
      "g": "F",
      "m": "hazel eyes"
    },
    {
      "n": "Yğmur",
      "g": "F",
      "m": "rain or abundant blessing"
    },
    {
      "n": "Almira",
      "g": "F",
      "m": "princess or moon star"
    },
    {
      "n": "Beren",
      "g": "F",
      "m": "smart and strong"
    },
    {
      "n": "Esila",
      "g": "F",
      "m": "late afternoon blessing"
    },
    {
      "n": "Dila",
      "g": "F",
      "m": "sweetheart or beloved"
    },
    {
      "n": "Buse",
      "g": "F",
      "m": "kiss or blossom"
    },
    {
      "n": "İrem",
      "g": "F",
      "m": "garden in heaven"
    },
    {
      "n": "Damla",
      "g": "F",
      "m": "water drop or pure essence"
    },
    {
      "n": "Ayla",
      "g": "F",
      "m": "halo of the moon"
    },
    {
      "n": "Selin",
      "g": "F",
      "m": "flowing water or joy"
    },
    {
      "n": "Ece",
      "g": "F",
      "m": "queen"
    },
    {
      "n": "Merve",
      "g": "F",
      "m": "sacred pebble stones"
    },
    {
      "n": "Bahar",
      "g": "F",
      "m": "spring season"
    },
    {
      "n": "Dilara",
      "g": "F",
      "m": "she who adorns the heart"
    },
    {
      "n": "Ceren",
      "g": "F",
      "m": "young gazelle"
    },
    {
      "n": "Gizem",
      "g": "F",
      "m": "mystery"
    },
    {
      "n": "Fatma",
      "g": "F",
      "m": "trustworthy and pure"
    },
    {
      "n": "Ayşe",
      "g": "F",
      "m": "living or comfortable life"
    },
    {
      "n": "Emel",
      "g": "F",
      "m": "desire or hope"
    },
    {
      "n": "Filiz",
      "g": "F",
      "m": "young sprout or shoot"
    },
    {
      "n": "Canan",
      "g": "F",
      "m": "beloved or darling"
    },
    {
      "n": "Banu",
      "g": "F",
      "m": "lady or noble woman"
    },
    {
      "n": "Demet",
      "g": "F",
      "m": "bouquet or bunch"
    },
    {
      "n": "Funda",
      "g": "F",
      "m": "heather or health plant"
    },
    {
      "n": "Gamze",
      "g": "F",
      "m": "dimple on the cheek"
    },
    {
      "n": "Gözde",
      "g": "F",
      "m": "favorite or beloved"
    },
    {
      "n": "Hatice",
      "g": "F",
      "m": "trustworthy and early born"
    },
    {
      "n": "Nisa",
      "g": "F",
      "m": "woman or lady"
    },
    {
      "n": "Leyla",
      "g": "F",
      "m": "dark night beauty"
    },
    {
      "n": "Melek",
      "g": "F",
      "m": "angel"
    },
    {
      "n": "Nuran",
      "g": "F",
      "m": "radiant light"
    },
    {
      "n": "Oya",
      "g": "F",
      "m": "lace or delicate lace decoration"
    },
    {
      "n": "Pelin",
      "g": "F",
      "m": "wormwood or protective herb"
    },
    {
      "n": "Seda",
      "g": "F",
      "m": "echo or voice"
    },
    {
      "n": "Sevgi",
      "g": "F",
      "m": "love"
    },
    {
      "n": "Sibel",
      "g": "F",
      "m": "oracle or flow"
    },
    {
      "n": "Tuğba",
      "g": "F",
      "m": "tree of heaven"
    },
    {
      "n": "Yelid",
      "g": "F",
      "m": "rose garden"
    },
    {
      "n": "Zeliha",
      "g": "F",
      "m": "water nymph"
    },
    {
      "n": "Duygu",
      "g": "F",
      "m": "feeling or emotion"
    },
    {
      "n": "Ebru",
      "g": "F",
      "m": "cloud art or marbling"
    },
    {
      "n": "Esra",
      "g": "F",
      "m": "night traveler"
    },
    {
      "n": "Gül",
      "g": "F",
      "m": "rose flower"
    },
    {
      "n": "Hande",
      "g": "F",
      "m": "smile or joy"
    },
    {
      "n": "Naz",
      "g": "F",
      "m": "coquetry or grace"
    },
    {
      "n": "Özge",
      "g": "F",
      "m": "unique and distinct"
    },
    {
      "n": "Pınar",
      "g": "F",
      "m": "water spring or fountain"
    },
    {
      "n": "Simge",
      "g": "F",
      "m": "symbol or sign"
    },
    {
      "n": "Tülin",
      "g": "F",
      "m": "mirror or light of the moon"
    },
    {
      "n": "Ülkü",
      "g": "F",
      "m": "ideal or ultimate goal"
    },
    {
      "n": "Yıldız",
      "g": "F",
      "m": "star"
    },
    {
      "n": "Zehra",
      "g": "F",
      "m": "bright and luminous flower"
    }
  ],
  "id": [
    {
      "n": "Budi",
      "g": "M",
      "m": "wisdom and character"
    },
    {
      "n": "Muhammad",
      "g": "M",
      "m": "praiseworthy"
    },
    {
      "n": "Aditya",
      "g": "M",
      "m": "the sun or first"
    },
    {
      "n": "Rian",
      "g": "M",
      "m": "little king"
    },
    {
      "n": "Agung",
      "g": "M",
      "m": "great and grand"
    },
    {
      "n": "Bagus",
      "g": "M",
      "m": "handsome and excellent"
    },
    {
      "n": "Fajar",
      "g": "M",
      "m": "dawn or morning light"
    },
    {
      "n": "Reza",
      "g": "M",
      "m": "pleasure and contentment"
    },
    {
      "n": "Eko",
      "g": "M",
      "m": "first born child"
    },
    {
      "n": "Dwi",
      "g": "M",
      "m": "second born child"
    },
    {
      "n": "Tri",
      "g": "M",
      "m": "third born child"
    },
    {
      "n": "Hendra",
      "g": "M",
      "m": "ruler or lord of rain"
    },
    {
      "n": "Guntur",
      "g": "M",
      "m": "thunder and power"
    },
    {
      "n": "Arief",
      "g": "M",
      "m": "wise and intelligent"
    },
    {
      "n": "Rizky",
      "g": "M",
      "m": "blessing and fortune"
    },
    {
      "n": "Dimas",
      "g": "M",
      "m": "younger brother or beloved"
    },
    {
      "n": "Arif",
      "g": "M",
      "m": "wise and knowledgeable"
    },
    {
      "n": "Denny",
      "g": "M",
      "m": "follower of Dionysus"
    },
    {
      "n": "Adian",
      "g": "M",
      "m": "noble and bright"
    },
    {
      "n": "Bambang",
      "g": "M",
      "m": "knight or noble soldier"
    },
    {
      "n": "Dedi",
      "g": "M",
      "m": "faithful servant"
    },
    {
      "n": "Rudy",
      "g": "M",
      "m": "famous wolf or warrior"
    },
    {
      "n": "Taufik",
      "g": "M",
      "m": "success and divine guidance"
    },
    {
      "n": "Satria",
      "g": "M",
      "m": "knight or warrior"
    },
    {
      "n": "Wawan",
      "g": "M",
      "m": "pure soul"
    },
    {
      "n": "Angga",
      "g": "M",
      "m": "body or proud posture"
    },
    {
      "n": "Faisal",
      "g": "M",
      "m": "decisive judge"
    },
    {
      "n": "Gatot",
      "g": "M",
      "m": "mighty and muscular"
    },
    {
      "n": "Surya",
      "g": "M",
      "m": "sun or bright king"
    },
    {
      "n": "Ilham",
      "g": "M",
      "m": "divine inspiration"
    },
    {
      "n": "Putra",
      "g": "M",
      "m": "son or prince"
    },
    {
      "n": "Andika",
      "g": "M",
      "m": "noble honor"
    },
    {
      "n": "Farhan",
      "g": "M",
      "m": "happy and cheerful"
    },
    {
      "n": "Hadi",
      "g": "M",
      "m": "guide or leader"
    },
    {
      "n": "Indra",
      "g": "M",
      "m": "lord of heaven"
    },
    {
      "n": "Joko",
      "g": "M",
      "m": "young unmarried man"
    },
    {
      "n": "Yusuf",
      "g": "M",
      "m": "God increases"
    },
    {
      "n": "Irfan",
      "g": "M",
      "m": "knowledge and gratitude"
    },
    {
      "n": "Gilang",
      "g": "M",
      "m": "bright and shining"
    },
    {
      "n": "Pratama",
      "g": "M",
      "m": "first or highest rank"
    },
    {
      "n": "Bayu",
      "g": "M",
      "m": "wind or life force"
    },
    {
      "n": "Bintang",
      "g": "M",
      "m": "star or radiant guiding light"
    },
    {
      "n": "Zikri",
      "g": "M",
      "m": "remembrance of God"
    },
    {
      "n": "Aldo",
      "g": "M",
      "m": "noble and old"
    },
    {
      "n": "Hafiz",
      "g": "M",
      "m": "guardian or keeper"
    },
    {
      "n": "Setya",
      "g": "M",
      "m": "loyal and faithful"
    },
    {
      "n": "Wijaya",
      "g": "M",
      "m": "victory"
    },
    {
      "n": "Kurnia",
      "g": "M",
      "m": "gift and blessing"
    },
    {
      "n": "Dharma",
      "g": "M",
      "m": "good deed or truth"
    },
    {
      "n": "Roni",
      "g": "M",
      "m": "my joy"
    },
    {
      "n": "Akbar",
      "g": "M",
      "m": "greatest and mighty"
    },
    {
      "n": "Rama",
      "g": "M",
      "m": "pleasing or Lord Rama"
    },
    {
      "n": "Kevin",
      "g": "M",
      "m": "handsome birth"
    },
    {
      "n": "Rizal",
      "g": "M",
      "m": "blessed and safe"
    },
    {
      "n": "Ibrahim",
      "g": "M",
      "m": "father of nations"
    },
    {
      "n": "Dani",
      "g": "M",
      "m": "God is my judge"
    },
    {
      "n": "Rio",
      "g": "M",
      "m": "river"
    },
    {
      "n": "Toni",
      "g": "M",
      "m": "priceless"
    },
    {
      "n": "Hassan",
      "g": "M",
      "m": "handsome and good"
    },
    {
      "n": "Reyhan",
      "g": "M",
      "m": "favored by God"
    },
    {
      "n": "Dewá",
      "g": "M",
      "m": "divine being"
    },
    {
      "n": "Panji",
      "g": "M",
      "m": "noble flag or leader"
    },
    {
      "n": "Arya",
      "g": "M",
      "m": "noble"
    },
    {
      "n": "Eka",
      "g": "M",
      "m": "first and unique"
    },
    {
      "n": "Yanto",
      "g": "M",
      "m": "man of character"
    },
    {
      "n": "Lutfi",
      "g": "M",
      "m": "gentle and kind"
    },
    {
      "n": "Zaki",
      "g": "M",
      "m": "pure and intelligent"
    },
    {
      "n": "Tirta",
      "g": "M",
      "m": "sacred water"
    },
    {
      "n": "Wira",
      "g": "M",
      "m": "hero or brave warrior"
    },
    {
      "n": "Baskoro",
      "g": "M",
      "m": "midday sun"
    },
    {
      "n": "Nugroho",
      "g": "M",
      "m": "gift from heaven"
    },
    {
      "n": "Sujatmiko",
      "g": "M",
      "m": "gentleman of fine character"
    },
    {
      "n": "Doni",
      "g": "M",
      "m": "ruler of the world"
    },
    {
      "n": "Gani",
      "g": "M",
      "m": "rich and self-sufficient"
    },
    {
      "n": "Siti",
      "g": "F",
      "m": "noble woman or lady"
    },
    {
      "n": "Aisyah",
      "g": "F",
      "m": "living and prosperous life"
    },
    {
      "n": "Lestari",
      "g": "F",
      "m": "eternal or everlasting"
    },
    {
      "n": "Putri",
      "g": "F",
      "m": "daughter or princess"
    },
    {
      "n": "Dewi",
      "g": "F",
      "m": "goddess or divine woman"
    },
    {
      "n": "Dinda",
      "g": "F",
      "m": "beloved younger sister"
    },
    {
      "n": "Intan",
      "g": "F",
      "m": "diamond or precious gem"
    },
    {
      "n": "Fitri",
      "g": "F",
      "m": "pure and chaste"
    },
    {
      "n": "Sri",
      "g": "F",
      "m": "auspicious and radiant goddess"
    },
    {
      "n": "Wulan",
      "g": "F",
      "m": "moon or beautiful light"
    },
    {
      "n": "Sari",
      "g": "F",
      "m": "essence or beautiful flower"
    },
    {
      "n": "Rani",
      "g": "F",
      "m": "queen"
    },
    {
      "n": "Nisa",
      "g": "F",
      "m": "woman or lady"
    },
    {
      "n": "Anisa",
      "g": "F",
      "m": "friendly and companionable"
    },
    {
      "n": "Mega",
      "g": "F",
      "m": "cloud or grand vision"
    },
    {
      "n": "Melati",
      "g": "F",
      "m": "jasmine flower"
    },
    {
      "n": "Ratna",
      "g": "F",
      "m": "jewel or diamond"
    },
    {
      "n": "Utami",
      "g": "F",
      "m": "first or paramount"
    },
    {
      "n": "Indah",
      "g": "F",
      "m": "beautiful and lovely"
    },
    {
      "n": "Kartika",
      "g": "F",
      "m": "shining stars"
    },
    {
      "n": "Mutiara",
      "g": "F",
      "m": "pearl or precious jewel"
    },
    {
      "n": "Rina",
      "g": "F",
      "m": "pure melody or joy"
    },
    {
      "n": "Nadia",
      "g": "F",
      "m": "hope and tender"
    },
    {
      "n": "Puspita",
      "g": "F",
      "m": "blossoming flower"
    },
    {
      "n": "Suci",
      "g": "F",
      "m": "sacred and pure"
    },
    {
      "n": "Tia",
      "g": "F",
      "m": "princess or crown"
    },
    {
      "n": "Yanti",
      "g": "F",
      "m": "beautiful lady"
    },
    {
      "n": "Agustina",
      "g": "F",
      "m": "venerable or born in August"
    },
    {
      "n": "Nia",
      "g": "F",
      "m": "purpose or bright"
    },
    {
      "n": "Sinta",
      "g": "F",
      "m": "chaste and loyal wife"
    },
    {
      "n": "Nur",
      "g": "F",
      "m": "divine light"
    },
    {
      "n": "Kusuma",
      "g": "F",
      "m": "flower of nobility"
    },
    {
      "n": "Anggraini",
      "g": "F",
      "m": "graceful and loyal queen"
    },
    {
      "n": "Laras",
      "g": "F",
      "m": "harmony and balance"
    },
    {
      "n": "Amalia",
      "g": "F",
      "m": "industrious and aspiring"
    },
    {
      "n": "Cahaya",
      "g": "F",
      "m": "light or radiance"
    },
    {
      "n": "Permata",
      "g": "F",
      "m": "precious stone"
    },
    {
      "n": "Lia",
      "g": "F",
      "m": "bearer of good news"
    },
    {
      "n": "Citra",
      "g": "F",
      "m": "image or beautiful reflection"
    },
    {
      "n": "Wati",
      "g": "F",
      "m": "woman of fine character"
    },
    {
      "n": "Widya",
      "g": "F",
      "m": "knowledge and wisdom"
    },
    {
      "n": "Zahra",
      "g": "F",
      "m": "bright shining flower"
    },
    {
      "n": "Aria",
      "g": "F",
      "m": "noble or beautiful song"
    },
    {
      "n": "Bulan",
      "g": "F",
      "m": "moon or peaceful night"
    },
    {
      "n": "Dian",
      "g": "F",
      "m": "candle or guiding light"
    },
    {
      "n": "Endah",
      "g": "F",
      "m": "beautiful and elegant"
    },
    {
      "n": "Gita",
      "g": "F",
      "m": "sacred song or hymn"
    },
    {
      "n": "Ika",
      "g": "F",
      "m": "one or unity"
    },
    {
      "n": "Maya",
      "g": "F",
      "m": "water or divine illusion"
    },
    {
      "n": "Ningsih",
      "g": "F",
      "m": "filled with love"
    },
    {
      "n": "Pratiwi",
      "g": "F",
      "m": "mother earth"
    },
    {
      "n": "Rahma",
      "g": "F",
      "m": "grace and compassion"
    },
    {
      "n": "Sukma",
      "g": "F",
      "m": "soul or pure spirit"
    },
    {
      "n": "Triana",
      "g": "F",
      "m": "third born guide"
    },
    {
      "n": "Utari",
      "g": "F",
      "m": "north star or patient"
    },
    {
      "n": "Wanda",
      "g": "F",
      "m": "wanderer or security"
    },
    {
      "n": "Yeni",
      "g": "F",
      "m": "bright and new"
    },
    {
      "n": "Zoya",
      "g": "F",
      "m": "life and loving"
    },
    {
      "n": "Karin",
      "g": "F",
      "m": "pure"
    },
    {
      "n": "Lina",
      "g": "F",
      "m": "tender palm tree"
    },
    {
      "n": "Nila",
      "g": "F",
      "m": "blue sapphire"
    },
    {
      "n": "Ratih",
      "g": "F",
      "m": "goddess of beauty"
    },
    {
      "n": "Sekar",
      "g": "F",
      "m": "royal flower"
    },
    {
      "n": "Tika",
      "g": "F",
      "m": "shining dot or drawing"
    },
    {
      "n": "Yuni",
      "g": "F",
      "m": "born in June"
    },
    {
      "n": "Zulaikha",
      "g": "F",
      "m": "brilliant beauty"
    },
    {
      "n": "Asri",
      "g": "F",
      "m": "beautiful and natural"
    },
    {
      "n": "Dina",
      "g": "F",
      "m": "day or judge"
    },
    {
      "n": "Ira",
      "g": "F",
      "m": "wisdom or watchful"
    },
    {
      "n": "Retno",
      "g": "F",
      "m": "diamond or beautiful eyes"
    }
  ],
  "ms": [
    {
      "n": "Aiman",
      "g": "M",
      "m": "faithful and lucky"
    },
    {
      "n": "Muhammad",
      "g": "M",
      "m": "praiseworthy"
    },
    {
      "n": "Amirul",
      "g": "M",
      "m": "leader or prince"
    },
    {
      "n": "Adam",
      "g": "M",
      "m": "son of the red earth"
    },
    {
      "n": "Akmal",
      "g": "M",
      "m": "perfect and complete"
    },
    {
      "n": "Haziq",
      "g": "M",
      "m": "shrewd and intelligent"
    },
    {
      "n": "Irphan",
      "g": "M",
      "m": "knowledge and gratitude"
    },
    {
      "n": "Rayyan",
      "g": "M",
      "m": "gates of heaven or lush"
    },
    {
      "n": "Syamil",
      "g": "M",
      "m": "all-encompassing or complete"
    },
    {
      "n": "Farhan",
      "g": "M",
      "m": "happy and cheerful"
    },
    {
      "n": "Afiq",
      "g": "M",
      "m": "knowledgeable or honest"
    },
    {
      "n": "Asyraf",
      "g": "M",
      "m": "most noble and honorable"
    },
    {
      "n": "Danial",
      "g": "M",
      "m": "God is my judge"
    },
    {
      "n": "Faris",
      "g": "M",
      "m": "knight or horseman"
    },
    {
      "n": "Hakimi",
      "g": "M",
      "m": "wise and judicious"
    },
    {
      "n": "Harith",
      "g": "M",
      "m": "cultivator or guardian"
    },
    {
      "n": "Idlan",
      "g": "M",
      "m": "justice or fair dealing"
    },
    {
      "n": "Izzat",
      "g": "M",
      "m": "honor and high status"
    },
    {
      "n": "Khairul",
      "g": "M",
      "m": "the best of all"
    },
    {
      "n": "Luqman",
      "g": "M",
      "m": "wise and intelligent prophet"
    },
    {
      "n": "Muaz",
      "g": "M",
      "m": "protected and defended"
    },
    {
      "n": "Nabil",
      "g": "M",
      "m": "noble and magnanimous"
    },
    {
      "n": "Najmi",
      "g": "M",
      "m": "my star or analytical"
    },
    {
      "n": "Rafiq",
      "g": "M",
      "m": "kind friend and companion"
    },
    {
      "n": "Shahrul",
      "g": "M",
      "m": "the moon"
    },
    {
      "n": "Taufiq",
      "g": "M",
      "m": "success and divine guidance"
    },
    {
      "n": "Umar",
      "g": "M",
      "m": "long-lived or thriving"
    },
    {
      "n": "Zarif",
      "g": "M",
      "m": "witty and elegant"
    },
    {
      "n": "Zikri",
      "g": "M",
      "m": "remembrance of God"
    },
    {
      "n": "Anuar",
      "g": "M",
      "m": "radiant rays of light"
    },
    {
      "n": "Azam",
      "g": "M",
      "m": "determined and resolute"
    },
    {
      "n": "Badrul",
      "g": "M",
      "m": "full moon"
    },
    {
      "n": "Fadli",
      "g": "M",
      "m": "excellent and virtuous"
    },
    {
      "n": "Fitri",
      "g": "M",
      "m": "pure and natural state"
    },
    {
      "n": "Ghazali",
      "g": "M",
      "m": "great mystic or saint"
    },
    {
      "n": "Hafiz",
      "g": "M",
      "m": "guardian or keeper"
    },
    {
      "n": "Hamdan",
      "g": "M",
      "m": "much praise"
    },
    {
      "n": "Ikram",
      "g": "M",
      "m": "honor and hospitality"
    },
    {
      "n": "Iqbal",
      "g": "M",
      "m": "prosperity and good fortune"
    },
    {
      "n": "Jamal",
      "g": "M",
      "m": "beauty and grace"
    },
    {
      "n": "Kamal",
      "g": "M",
      "m": "perfection and excellence"
    },
    {
      "n": "Latif",
      "g": "M",
      "m": "gentle and kind"
    },
    {
      "n": "Mukhriz",
      "g": "M",
      "m": "sincere or contribution"
    },
    {
      "n": "Nazri",
      "g": "M",
      "m": "my vow or dedication"
    },
    {
      "n": "Nizam",
      "g": "M",
      "m": "disciplined leader"
    },
    {
      "n": "Raziq",
      "g": "M",
      "m": "provider or feeder"
    },
    {
      "n": "Rusli",
      "g": "M",
      "m": "trusted messenger"
    },
    {
      "n": "Saiful",
      "g": "M",
      "m": "sword of justice"
    },
    {
      "n": "Shukri",
      "g": "M",
      "m": "thankful and grateful"
    },
    {
      "n": "Suffian",
      "g": "M",
      "m": "fast-walking"
    },
    {
      "n": "Tajul",
      "g": "M",
      "m": "crown or royalty"
    },
    {
      "n": "Wafi",
      "g": "M",
      "m": "loyal and faithful"
    },
    {
      "n": "Yusof",
      "g": "M",
      "m": "God increases"
    },
    {
      "n": "Zaid",
      "g": "M",
      "m": "abundance and growth"
    },
    {
      "n": "Zaim",
      "g": "M",
      "m": "leader or brigadier"
    },
    {
      "n": "Zaki",
      "g": "M",
      "m": "pure and intelligent"
    },
    {
      "n": "Zul",
      "g": "M",
      "m": "possessor of power"
    },
    {
      "n": "Firdaus",
      "g": "M",
      "m": "highest paradise garden"
    },
    {
      "n": "Faiz",
      "g": "M",
      "m": "victorious and winner"
    },
    {
      "n": "Nur",
      "g": "F",
      "m": "divine light"
    },
    {
      "n": "Aishah",
      "g": "F",
      "m": "living and prosperous life"
    },
    {
      "n": "Farah",
      "g": "F",
      "m": "joy and cheerfulness"
    },
    {
      "n": "Fatin",
      "g": "F",
      "m": "intelligent and captivating"
    },
    {
      "n": "Anis",
      "g": "F",
      "m": "friendly and companionable"
    },
    {
      "n": "Atikah",
      "g": "F",
      "m": "pure and generous lady"
    },
    {
      "n": "Amira",
      "g": "F",
      "m": "princess or prosperous leader"
    },
    {
      "n": "Balqis",
      "g": "F",
      "m": "queen of Sheba"
    },
    {
      "n": "Diana",
      "g": "F",
      "m": "divine and moon goddess"
    },
    {
      "n": "Fazira",
      "g": "F",
      "m": "pure and radiant torch"
    },
    {
      "n": "Hana",
      "g": "F",
      "m": "happiness and bliss"
    },
    {
      "n": "Husna",
      "g": "F",
      "m": "most beautiful and pious"
    },
    {
      "n": "Irdina",
      "g": "F",
      "m": "our pride or honor"
    },
    {
      "n": "Izzati",
      "g": "F",
      "m": "my honor and high status"
    },
    {
      "n": "Khadijah",
      "g": "F",
      "m": "trustworthy and pure"
    },
    {
      "n": "Latifah",
      "g": "F",
      "m": "gentle and pleasant humor"
    },
    {
      "n": "Maimunah",
      "g": "F",
      "m": "blessed and fortunate"
    },
    {
      "n": "Nadia",
      "g": "F",
      "m": "hope and tender"
    },
    {
      "n": "Najwa",
      "g": "F",
      "m": "sacred confidant or secret talk"
    },
    {
      "n": "Natasha",
      "g": "F",
      "m": "birthday of Christ"
    },
    {
      "n": "Puteri",
      "g": "F",
      "m": "daughter or princess"
    },
    {
      "n": "Rania",
      "g": "F",
      "m": "queen and gazing with intent"
    },
    {
      "n": "Sabrina",
      "g": "F",
      "m": "from the river Severn"
    },
    {
      "n": "Salma",
      "g": "F",
      "m": "peaceful and flawless health"
    },
    {
      "n": "Siti",
      "g": "F",
      "m": "noble woman or lady"
    },
    {
      "n": "Sofea",
      "g": "F",
      "m": "wisdom and purity"
    },
    {
      "n": "Syakilla",
      "g": "F",
      "m": "beautiful and elegant"
    },
    {
      "n": "Wani",
      "g": "F",
      "m": "loyal friend or breeze"
    },
    {
      "n": "Yasmin",
      "g": "F",
      "m": "jasmine flower"
    },
    {
      "n": "Zahra",
      "g": "F",
      "m": "bright and luminous flower"
    },
    {
      "n": "Adlina",
      "g": "F",
      "m": "our justice and fairness"
    },
    {
      "n": "Alia",
      "g": "F",
      "m": "exalted and highest standing"
    },
    {
      "n": "Aqilah",
      "g": "F",
      "m": "wise and intelligent"
    },
    {
      "n": "Azrina",
      "g": "F",
      "m": "loyal and protective guide"
    },
    {
      "n": "Batrisyia",
      "g": "F",
      "m": "intelligent and sharp-minded"
    },
    {
      "n": "Damia",
      "g": "F",
      "m": "blessed with wisdom"
    },
    {
      "n": "Elina",
      "g": "F",
      "m": "shining light and torch"
    },
    {
      "n": "Farzana",
      "g": "F",
      "m": "wise and highly learned"
    },
    {
      "n": "Hannani",
      "g": "F",
      "m": "my affection or mercy"
    },
    {
      "n": "Inarah",
      "g": "F",
      "m": "illumination and enlightenment"
    },
    {
      "n": "Kaisara",
      "g": "F",
      "m": "empress or noble ruler"
    },
    {
      "n": "Liyana",
      "g": "F",
      "m": "tender and palm tree"
    },
    {
      "n": "Maisarah",
      "g": "F",
      "m": "wealth and prosperity"
    },
    {
      "n": "Najiha",
      "g": "F",
      "m": "successful and victorious"
    },
    {
      "n": "Qistina",
      "g": "F",
      "m": "justice and equity"
    },
    {
      "n": "Raudhah",
      "g": "F",
      "m": "meadow of paradise"
    },
    {
      "n": "Shazwani",
      "g": "F",
      "m": "fragrant and beautiful"
    },
    {
      "n": "Syasya",
      "g": "F",
      "m": "bright and sparkling radiance"
    },
    {
      "n": "Umairah",
      "g": "F",
      "m": "living long or thriving"
    },
    {
      "n": "Zunairah",
      "g": "F",
      "m": "flower in paradise"
    },
    {
      "n": "Afifah",
      "g": "F",
      "m": "chaste and modest"
    },
    {
      "n": "Dalilah",
      "g": "F",
      "m": "guide or model"
    },
    {
      "n": "Fariha",
      "g": "F",
      "m": "happy and joyful"
    },
    {
      "n": "Insyirah",
      "g": "F",
      "m": "joy and cheerfulness"
    },
    {
      "n": "Kamilah",
      "g": "F",
      "m": "perfect and complete"
    },
    {
      "n": "Maisara",
      "g": "F",
      "m": "wealth and ease"
    },
    {
      "n": "Nabila",
      "g": "F",
      "m": "noble and generous"
    },
    {
      "n": "Safiya",
      "g": "F",
      "m": "pure and chosen friend"
    },
    {
      "n": "Wardah",
      "g": "F",
      "m": "rose flower"
    },
    {
      "n": "Zalikha",
      "g": "F",
      "m": "brilliant beauty"
    }
  ],
  "ph": [
    {
      "n": "Jose",
      "g": "M",
      "m": "God will increase"
    },
    {
      "n": "Nathaniel",
      "g": "M",
      "m": "gift of God"
    },
    {
      "n": "James",
      "g": "M",
      "m": "supplanter and leader"
    },
    {
      "n": "Gabriel",
      "g": "M",
      "m": "God is my strength"
    },
    {
      "n": "Angelo",
      "g": "M",
      "m": "angel or messenger"
    },
    {
      "n": "Daniel",
      "g": "M",
      "m": "God is my judge"
    },
    {
      "n": "Jacob",
      "g": "M",
      "m": "holder of the heel"
    },
    {
      "n": "Joshua",
      "g": "M",
      "m": "God is salvation"
    },
    {
      "n": "Ethan",
      "g": "M",
      "m": "strong and enduring"
    },
    {
      "n": "Christian",
      "g": "M",
      "m": "follower of Christ"
    },
    {
      "n": "John",
      "g": "M",
      "m": "God is gracious"
    },
    {
      "n": "Mateo",
      "g": "M",
      "m": "gift of God"
    },
    {
      "n": "Lucas",
      "g": "M",
      "m": "bringer of light"
    },
    {
      "n": "Liam",
      "g": "M",
      "m": "resolute protector"
    },
    {
      "n": "Alexander",
      "g": "M",
      "m": "defender of men"
    },
    {
      "n": "Mark",
      "g": "M",
      "m": "consecrated to Mars"
    },
    {
      "n": "Miguel",
      "g": "M",
      "m": "who is like God"
    },
    {
      "n": "Adrian",
      "g": "M",
      "m": "sea or dark one"
    },
    {
      "n": "Justin",
      "g": "M",
      "m": "just and fair"
    },
    {
      "n": "Aaron",
      "g": "M",
      "m": "high mountain"
    },
    {
      "n": "Juan",
      "g": "M",
      "m": "God is gracious"
    },
    {
      "n": "Diego",
      "g": "M",
      "m": "supplanter or teacher"
    },
    {
      "n": "Francis",
      "g": "M",
      "m": "free man"
    },
    {
      "n": "Elijah",
      "g": "M",
      "m": "the Lord is God"
    },
    {
      "n": "Kyle",
      "g": "M",
      "m": "narrow spit of land"
    },
    {
      "n": "Samuel",
      "g": "M",
      "m": "God has heard"
    },
    {
      "n": "Dominic",
      "g": "M",
      "m": "of the Lord"
    },
    {
      "n": "Matthew",
      "g": "M",
      "m": "gift of Jehovah"
    },
    {
      "n": "Jeremiah",
      "g": "M",
      "m": "God will uplift"
    },
    {
      "n": "Joaquin",
      "g": "M",
      "m": "established by God"
    },
    {
      "n": "Luis",
      "g": "M",
      "m": "renowned warrior"
    },
    {
      "n": "Carlos",
      "g": "M",
      "m": "free man"
    },
    {
      "n": "Antonio",
      "g": "M",
      "m": "priceless and praiseworthy"
    },
    {
      "n": "Rafael",
      "g": "M",
      "m": "God has healed"
    },
    {
      "n": "Rayan",
      "g": "M",
      "m": "gates of heaven"
    },
    {
      "n": "Ivan",
      "g": "M",
      "m": "God is gracious"
    },
    {
      "n": "Patrick",
      "g": "M",
      "m": "noble born"
    },
    {
      "n": "Maverick",
      "g": "M",
      "m": "independent individual"
    },
    {
      "n": "Jace",
      "g": "M",
      "m": "healer"
    },
    {
      "n": "Kael",
      "g": "M",
      "m": "slender or fair"
    },
    {
      "n": "Kenji",
      "g": "M",
      "m": "strong and second son"
    },
    {
      "n": "Zack",
      "g": "M",
      "m": "laughter or God remembers"
    },
    {
      "n": "Prince",
      "g": "M",
      "m": "royal prince or chief"
    },
    {
      "n": "Xavier",
      "g": "M",
      "m": "bright and new house"
    },
    {
      "n": "Timothy",
      "g": "M",
      "m": "honoring God"
    },
    {
      "n": "Vince",
      "g": "M",
      "m": "conquering"
    },
    {
      "n": "David",
      "g": "M",
      "m": "beloved"
    },
    {
      "n": "Michael",
      "g": "M",
      "m": "who is like God"
    },
    {
      "n": "Jovani",
      "g": "M",
      "m": "God is gracious"
    },
    {
      "n": "Manuel",
      "g": "M",
      "m": "God is with us"
    },
    {
      "n": "Ronaldo",
      "g": "M",
      "m": "ruler with counsel"
    },
    {
      "n": "Oliver",
      "g": "M",
      "m": "peace of olive tree"
    },
    {
      "n": "Paolo",
      "g": "M",
      "m": "small or humble"
    },
    {
      "n": "Reynaldo",
      "g": "M",
      "m": "wise ruler"
    },
    {
      "n": "Sandro",
      "g": "M",
      "m": "defender of men"
    },
    {
      "n": "Teodoro",
      "g": "M",
      "m": "gift of God"
    },
    {
      "n": "Vicente",
      "g": "M",
      "m": "conquering"
    },
    {
      "n": "Renato",
      "g": "M",
      "m": "born again"
    },
    {
      "n": "Angel",
      "g": "F",
      "m": "messenger of God"
    },
    {
      "n": "Maria",
      "g": "F",
      "m": "star of the sea and beloved"
    },
    {
      "n": "Princess",
      "g": "F",
      "m": "royal daughter or noble lady"
    },
    {
      "n": "Samantha",
      "g": "F",
      "m": "told by God or listener"
    },
    {
      "n": "Sophia",
      "g": "F",
      "m": "wisdom"
    },
    {
      "n": "Chloe",
      "g": "F",
      "m": "blooming young green shoot"
    },
    {
      "n": "Angela",
      "g": "F",
      "m": "angel or messenger"
    },
    {
      "n": "Andrea",
      "g": "F",
      "m": "strong and courageous"
    },
    {
      "n": "Nathalie",
      "g": "F",
      "m": "birthday of the Lord"
    },
    {
      "n": "Nicole",
      "g": "F",
      "m": "victory of the people"
    },
    {
      "n": "Christine",
      "g": "F",
      "m": "follower of Christ"
    },
    {
      "n": "Ashley",
      "g": "F",
      "m": "ash tree meadow"
    },
    {
      "n": "Hannah",
      "g": "F",
      "m": "favor and divine grace"
    },
    {
      "n": "Abigail",
      "g": "F",
      "m": "my father is joy"
    },
    {
      "n": "Isabella",
      "g": "F",
      "m": "pledged to God"
    },
    {
      "n": "Franchesca",
      "g": "F",
      "m": "free woman"
    },
    {
      "n": "Jasmine",
      "g": "F",
      "m": "fragrant jasmine flower"
    },
    {
      "n": "Marian",
      "g": "F",
      "m": "drop of the sea or beloved"
    },
    {
      "n": "Bea",
      "g": "F",
      "m": "she who brings happiness"
    },
    {
      "n": "Kylie",
      "g": "F",
      "m": "narrow spit of land"
    },
    {
      "n": "Alliah",
      "g": "F",
      "m": "exalted and highest standing"
    },
    {
      "n": "Cheska",
      "g": "F",
      "m": "free lady"
    },
    {
      "n": "Daphne",
      "g": "F",
      "m": "laurel tree"
    },
    {
      "n": "Erica",
      "g": "F",
      "m": "eternal ruler"
    },
    {
      "n": "Fiona",
      "g": "F",
      "m": "white or fair one"
    },
    {
      "n": "Gabriella",
      "g": "F",
      "m": "God is my strength"
    },
    {
      "n": "Hazel",
      "g": "F",
      "m": "hazelnut tree or wisdom"
    },
    {
      "n": "Irish",
      "g": "F",
      "m": "from Ireland"
    },
    {
      "n": "Janine",
      "g": "F",
      "m": "God is gracious"
    },
    {
      "n": "Katrina",
      "g": "F",
      "m": "pure and chaste"
    },
    {
      "n": "Lian",
      "g": "F",
      "m": "graceful willow"
    },
    {
      "n": "Mae",
      "g": "F",
      "m": "bitter or pearl"
    },
    {
      "n": "Nadine",
      "g": "F",
      "m": "hope"
    },
    {
      "n": "Patricia",
      "g": "F",
      "m": "noble woman"
    },
    {
      "n": "Queenie",
      "g": "F",
      "m": "queen or royal lady"
    },
    {
      "n": "Rhea",
      "g": "F",
      "m": "flowing stream"
    },
    {
      "n": "Stephanie",
      "g": "F",
      "m": "crown or garland"
    },
    {
      "n": "Trisha",
      "g": "F",
      "m": "noble woman"
    },
    {
      "n": "Vanessa",
      "g": "F",
      "m": "butterfly"
    },
    {
      "n": "Wendy",
      "g": "F",
      "m": "friend"
    },
    {
      "n": "Xyza",
      "g": "F",
      "m": "shining light"
    },
    {
      "n": "Yvone",
      "g": "F",
      "m": "yew wood"
    },
    {
      "n": "Zoe",
      "g": "F",
      "m": "life and vitality"
    },
    {
      "n": "Althea",
      "g": "F",
      "m": "wholesome and healer"
    },
    {
      "n": "Bianca",
      "g": "F",
      "m": "white and pure"
    },
    {
      "n": "Clarisse",
      "g": "F",
      "m": "bright and clear"
    },
    {
      "n": "Divina",
      "g": "F",
      "m": "divine and heavenly"
    },
    {
      "n": "Elaine",
      "g": "F",
      "m": "shining torch"
    },
    {
      "n": "Giselle",
      "g": "F",
      "m": "pledge or hostage"
    },
    {
      "n": "Janella",
      "g": "F",
      "m": "God is gracious"
    },
    {
      "n": "Kimberly",
      "g": "F",
      "m": "royal fortress meadow"
    },
    {
      "n": "Lorraine",
      "g": "F",
      "m": "famous army from Lotharingia"
    },
    {
      "n": "Mikaela",
      "g": "F",
      "m": "who is like God"
    },
    {
      "n": "Naomi",
      "g": "F",
      "m": "pleasantness"
    },
    {
      "n": "Precious",
      "g": "F",
      "m": "of great value"
    },
    {
      "n": "Rochelle",
      "g": "F",
      "m": "little rock"
    },
    {
      "n": "Shaina",
      "g": "F",
      "m": "beautiful"
    },
    {
      "n": "Tanya",
      "g": "F",
      "m": "fairy queen"
    },
    {
      "n": "Zariah",
      "g": "F",
      "m": "radiant shining flower"
    }
  ],
  "hi": [
    {
      "n": "Arjun",
      "g": "M",
      "m": "bright and shining"
    },
    {
      "n": "Aarav",
      "g": "M",
      "m": "peaceful sound"
    },
    {
      "n": "Vihaan",
      "g": "M",
      "m": "dawn or morning light"
    },
    {
      "n": "Vivaan",
      "g": "M",
      "m": "full of life"
    },
    {
      "n": "Reyansh",
      "g": "M",
      "m": "ray of light"
    },
    {
      "n": "Ishaan",
      "g": "M",
      "m": "lord Shiva or sun"
    },
    {
      "n": "Shaurya",
      "g": "M",
      "m": "bravery and heroism"
    },
    {
      "n": "Rudra",
      "g": "M",
      "m": "lord Shiva or mighty"
    },
    {
      "n": "Aryan",
      "g": "M",
      "m": "noble and honorable"
    },
    {
      "n": "Kabir",
      "g": "M",
      "m": "great mystic saint"
    },
    {
      "n": "Atharv",
      "g": "M",
      "m": "the first Veda"
    },
    {
      "n": "Advik",
      "g": "M",
      "m": "unique and unparalleled"
    },
    {
      "n": "Devansh",
      "g": "M",
      "m": "part of God"
    },
    {
      "n": "Aayush",
      "g": "M",
      "m": "long life"
    },
    {
      "n": "Dhruv",
      "g": "M",
      "m": "pole star or steadfast"
    },
    {
      "n": "Ansh",
      "g": "M",
      "m": "portion or part"
    },
    {
      "n": "Kavish",
      "g": "M",
      "m": "king of poets"
    },
    {
      "n": "Rohan",
      "g": "M",
      "m": "ascending or ascending light"
    },
    {
      "n": "Aman",
      "g": "M",
      "m": "peace and safety"
    },
    {
      "n": "Rayan",
      "g": "M",
      "m": "gates of paradise"
    },
    {
      "n": "Darsh",
      "g": "M",
      "m": "lord Krishna or vision"
    },
    {
      "n": "Pranav",
      "g": "M",
      "m": "sacred syllable OM"
    },
    {
      "n": "Shreyas",
      "g": "M",
      "m": "good fortune or superior"
    },
    {
      "n": "Hrithik",
      "g": "M",
      "m": "from the heart"
    },
    {
      "n": "Manav",
      "g": "M",
      "m": "human or gentleman"
    },
    {
      "n": "Yash",
      "g": "M",
      "m": "victory and glory"
    },
    {
      "n": "Aditya",
      "g": "M",
      "m": "the sun or light"
    },
    {
      "n": "Madhav",
      "g": "M",
      "m": "lord Krishna"
    },
    {
      "n": "Rishi",
      "g": "M",
      "m": "sage or seer"
    },
    {
      "n": "Kian",
      "g": "M",
      "m": "grace of God or king"
    },
    {
      "n": "Ranveer",
      "g": "M",
      "m": "hero of the battle"
    },
    {
      "n": "Sai",
      "g": "M",
      "m": "divine flower"
    },
    {
      "n": "Tushar",
      "g": "M",
      "m": "snow or purity"
    },
    {
      "n": "Ved",
      "g": "M",
      "m": "sacred knowledge"
    },
    {
      "n": "Gaurav",
      "g": "M",
      "m": "honor and pride"
    },
    {
      "n": "Nakul",
      "g": "M",
      "m": "most handsome"
    },
    {
      "n": "Samarth",
      "g": "M",
      "m": "powerful and capable"
    },
    {
      "n": "Jai",
      "g": "M",
      "m": "victory"
    },
    {
      "n": "Akarsh",
      "g": "M",
      "m": "attractive and magnetic"
    },
    {
      "n": "Hardik",
      "g": "M",
      "m": "heartfelt"
    },
    {
      "n": "Abhinav",
      "g": "M",
      "m": "fresh or innovative"
    },
    {
      "n": "Avanish",
      "g": "M",
      "m": "lord of the earth"
    },
    {
      "n": "Bhavin",
      "g": "M",
      "m": "living or winner"
    },
    {
      "n": "Chirag",
      "g": "M",
      "m": "lamp or radiant light"
    },
    {
      "n": "Darshan",
      "g": "M",
      "m": "vision or paying respect"
    },
    {
      "n": "Devendra",
      "g": "M",
      "m": "king of gods"
    },
    {
      "n": "Divyansh",
      "g": "M",
      "m": "part of divine light"
    },
    {
      "n": "Girish",
      "g": "M",
      "m": "god of mountain"
    },
    {
      "n": "Harsh",
      "g": "M",
      "m": "joy and happiness"
    },
    {
      "n": "Hemant",
      "g": "M",
      "m": "early winter"
    },
    {
      "n": "Indrajeet",
      "g": "M",
      "m": "conqueror of Indra"
    },
    {
      "n": "Jatin",
      "g": "M",
      "m": "lord Shiva"
    },
    {
      "n": "Kailash",
      "g": "M",
      "m": "sacred mountain"
    },
    {
      "n": "Karan",
      "g": "M",
      "m": "warrior or instrument"
    },
    {
      "n": "Mayank",
      "g": "M",
      "m": "moon"
    },
    {
      "n": "Nikhil",
      "g": "M",
      "m": "complete or whole"
    },
    {
      "n": "Nitin",
      "g": "M",
      "m": "master of right path"
    },
    {
      "n": "Pankaj",
      "g": "M",
      "m": "lotus flower"
    },
    {
      "n": "Parth",
      "g": "M",
      "m": "prince or Arjuna"
    },
    {
      "n": "Piyush",
      "g": "M",
      "m": "nectar or amrit"
    },
    {
      "n": "Rahul",
      "g": "M",
      "m": "conqueror of miseries"
    },
    {
      "n": "Rajesh",
      "g": "M",
      "m": "ruler of kings"
    },
    {
      "n": "Sameer",
      "g": "M",
      "m": "early morning breeze"
    },
    {
      "n": "Sanjay",
      "g": "M",
      "m": "victorious"
    },
    {
      "n": "Sarthak",
      "g": "M",
      "m": "meaningful or significant"
    },
    {
      "n": "Shiva",
      "g": "M",
      "m": "auspicious one"
    },
    {
      "n": "Siddharth",
      "g": "M",
      "m": "one who achieved goal"
    },
    {
      "n": "Suresh",
      "g": "M",
      "m": "ruler of gods"
    },
    {
      "n": "Utkarsh",
      "g": "M",
      "m": "prosperity and advancement"
    },
    {
      "n": "Vaibhav",
      "g": "M",
      "m": "richness and grandeur"
    },
    {
      "n": "Varun",
      "g": "M",
      "m": "lord of waters"
    },
    {
      "n": "Vijay",
      "g": "M",
      "m": "victory"
    },
    {
      "n": "Vikram",
      "g": "M",
      "m": "valor or brave king"
    },
    {
      "n": "Yatin",
      "g": "M",
      "m": "devotee or ascetic"
    },
    {
      "n": "Yogesh",
      "g": "M",
      "m": "god of yoga"
    },
    {
      "n": "Aadhya",
      "g": "F",
      "m": "first power or goddess Durga"
    },
    {
      "n": "Ananya",
      "g": "F",
      "m": "matchless and unique"
    },
    {
      "n": "Diya",
      "g": "F",
      "m": "lamp and radiant guide"
    },
    {
      "n": "Ira",
      "g": "F",
      "m": "wisdom or goddess Saraswati"
    },
    {
      "n": "Myra",
      "g": "F",
      "m": "beloved or admirable treasure"
    },
    {
      "n": "Riya",
      "g": "F",
      "m": "singer or graceful lady"
    },
    {
      "n": "Saisha",
      "g": "F",
      "m": "meaningful life or truth"
    },
    {
      "n": "Samaira",
      "g": "F",
      "m": "enchanting and protected"
    },
    {
      "n": "Saanvi",
      "g": "F",
      "m": "goddess Lakshmi"
    },
    {
      "n": "Aanya",
      "g": "F",
      "m": "grace and bountiful goodness"
    },
    {
      "n": "Avani",
      "g": "F",
      "m": "earth or nurturing nature"
    },
    {
      "n": "Aria",
      "g": "F",
      "m": "noble or pure melody"
    },
    {
      "n": "Ishani",
      "g": "F",
      "m": "goddess Parvati"
    },
    {
      "n": "Kavya",
      "g": "F",
      "m": "poetry or artistic vision"
    },
    {
      "n": "Kiara",
      "g": "F",
      "m": "bright and clear light"
    },
    {
      "n": "Navya",
      "g": "F",
      "m": "worth praising or fresh"
    },
    {
      "n": "Nisha",
      "g": "F",
      "m": "night or peaceful stars"
    },
    {
      "n": "Pari",
      "g": "F",
      "m": "fairy or angelic beauty"
    },
    {
      "n": "Siya",
      "g": "F",
      "m": "goddess Sita"
    },
    {
      "n": "Tara",
      "g": "F",
      "m": "star or brilliant guide"
    },
    {
      "n": "Aahana",
      "g": "F",
      "m": "first ray of the sun"
    },
    {
      "n": "Nitya",
      "g": "F",
      "m": "eternal or goddess Durga"
    },
    {
      "n": "Meera",
      "g": "F",
      "m": "prosperous devotee"
    },
    {
      "n": "Divya",
      "g": "F",
      "m": "divine brilliance"
    },
    {
      "n": "Kriti",
      "g": "F",
      "m": "work of art or creation"
    },
    {
      "n": "Tanya",
      "g": "F",
      "m": "fairy queen or of the family"
    },
    {
      "n": "Aditi",
      "g": "F",
      "m": "boundless and free"
    },
    {
      "n": "Riddhi",
      "g": "F",
      "m": "good fortune and wealth"
    },
    {
      "n": "Siddhi",
      "g": "F",
      "m": "achievement and perfection"
    },
    {
      "n": "Sneha",
      "g": "F",
      "m": "love and affection"
    },
    {
      "n": "Bhavna",
      "g": "F",
      "m": "feelings or meditation"
    },
    {
      "n": "Shreya",
      "g": "F",
      "m": "auspicious and beautiful"
    },
    {
      "n": "Pooja",
      "g": "F",
      "m": "worship and sacred ritual"
    },
    {
      "n": "Neha",
      "g": "F",
      "m": "rain or affection"
    },
    {
      "n": "Amoli",
      "g": "F",
      "m": "priceless treasure"
    },
    {
      "n": "Jiya",
      "g": "F",
      "m": "sweetheart or alive"
    },
    {
      "n": "Ishita",
      "g": "F",
      "m": "mastery and wealth"
    },
    {
      "n": "Vanya",
      "g": "F",
      "m": "gracious gift of God"
    },
    {
      "n": "Aanchal",
      "g": "F",
      "m": "protective shelter"
    },
    {
      "n": "Aarti",
      "g": "F",
      "m": "sacred prayer ceremony"
    },
    {
      "n": "Alka",
      "g": "F",
      "m": "lock of curly hair"
    },
    {
      "n": "Amrita",
      "g": "F",
      "m": "immortal nectar"
    },
    {
      "n": "Anjali",
      "g": "F",
      "m": "divine offering"
    },
    {
      "n": "Arpita",
      "g": "F",
      "m": "dedicated or offered"
    },
    {
      "n": "Asha",
      "g": "F",
      "m": "hope or desire"
    },
    {
      "n": "Barkha",
      "g": "F",
      "m": "monsoon rain"
    },
    {
      "n": "Deepa",
      "g": "F",
      "m": "guiding light lamp"
    },
    {
      "n": "Deepika",
      "g": "F",
      "m": "little light lantern"
    },
    {
      "n": "Gargi",
      "g": "F",
      "m": "ancient wise philosopher"
    },
    {
      "n": "Gayatri",
      "g": "F",
      "m": "sacred chant hymn"
    },
    {
      "n": "Geeta",
      "g": "F",
      "m": "sacred scripture song"
    },
    {
      "n": "Gitanjali",
      "g": "F",
      "m": "offering of songs"
    },
    {
      "n": "Heena",
      "g": "F",
      "m": "myrtle flower fragrance"
    },
    {
      "n": "Jyoti",
      "g": "F",
      "m": "divine flame light"
    },
    {
      "n": "Kajal",
      "g": "F",
      "m": "kohl eye ornament"
    },
    {
      "n": "Kiran",
      "g": "F",
      "m": "ray of sunlight"
    },
    {
      "n": "Lata",
      "g": "F",
      "m": "graceful creeping vine"
    },
    {
      "n": "Madhavi",
      "g": "F",
      "m": "born of honey or springtime"
    },
    {
      "n": "Malini",
      "g": "F",
      "m": "fragrant garland maker"
    },
    {
      "n": "Mamta",
      "g": "F",
      "m": "motherly unconditional love"
    },
    {
      "n": "Manju",
      "g": "F",
      "m": "snow or sweet pleasant"
    },
    {
      "n": "Nalini",
      "g": "F",
      "m": "lotus flower lily"
    },
    {
      "n": "Nandini",
      "g": "F",
      "m": "goddess Durga or daughter"
    },
    {
      "n": "Payal",
      "g": "F",
      "m": "musical anklet"
    },
    {
      "n": "Priya",
      "g": "F",
      "m": "beloved daughter"
    },
    {
      "n": "Rani",
      "g": "F",
      "m": "queen"
    },
    {
      "n": "Rashmi",
      "g": "F",
      "m": "beam of light ray"
    },
    {
      "n": "Rhea",
      "g": "F",
      "m": "graceful singer lady"
    },
    {
      "n": "Sapna",
      "g": "F",
      "m": "visionary dream"
    },
    {
      "n": "Seema",
      "g": "F",
      "m": "boundary or horizon limit"
    },
    {
      "n": "Sharda",
      "g": "F",
      "m": "goddess of learning"
    },
    {
      "n": "Swati",
      "g": "F",
      "m": "pure morning star drop"
    },
    {
      "n": "Urmila",
      "g": "F",
      "m": "enchanting waves of light"
    }
  ],
  "ar": [
    {
      "n": "Muhammad",
      "g": "M",
      "m": "praiseworthy and noble messenger"
    },
    {
      "n": "Ahmed",
      "g": "M",
      "m": "highly praised and thankful to God"
    },
    {
      "n": "Ali",
      "g": "M",
      "m": "noble and exalted in high standing"
    },
    {
      "n": "Omar",
      "g": "M",
      "m": "long-lived and eloquent leader"
    },
    {
      "n": "Zayan",
      "g": "M",
      "m": "beautiful and graceful prince"
    },
    {
      "n": "Youssef",
      "g": "M",
      "m": "God increases in beauty and power"
    },
    {
      "n": "Ibrahim",
      "g": "M",
      "m": "father of nations and kind leader"
    },
    {
      "n": "Hamza",
      "g": "M",
      "m": "strong lion and brave warrior"
    },
    {
      "n": "Zayd",
      "g": "M",
      "m": "abundance and spiritual growth"
    },
    {
      "n": "Rayyan",
      "g": "M",
      "m": "luxuriant gate of heaven"
    },
    {
      "n": "Ayaan",
      "g": "M",
      "m": "gift of God or first epoch"
    },
    {
      "n": "Mustafa",
      "g": "M",
      "m": "the chosen and pure leader"
    },
    {
      "n": "Idris",
      "g": "M",
      "m": "interpreter and studious prophet"
    },
    {
      "n": "Kareem",
      "g": "M",
      "m": "generous and bountiful heart"
    },
    {
      "n": "Bilal",
      "g": "M",
      "m": "refreshing first caller to prayer"
    },
    {
      "n": "Tariq",
      "g": "M",
      "m": "brilliant morning star"
    },
    {
      "n": "Zayn",
      "g": "M",
      "m": "beauty and graceful decoration"
    },
    {
      "n": "Anas",
      "g": "M",
      "m": "friendliness and pure affection"
    },
    {
      "n": "Farhan",
      "g": "M",
      "m": "happy and full of joy"
    },
    {
      "n": "Amir",
      "g": "M",
      "m": "prince or prosperous ruler"
    },
    {
      "n": "Faris",
      "g": "M",
      "m": "knight and insightful rider"
    },
    {
      "n": "Saif",
      "g": "M",
      "m": "sword of justice and truth"
    },
    {
      "n": "Yasin",
      "g": "M",
      "m": "chief leader or rich scholar"
    },
    {
      "n": "Kamil",
      "g": "M",
      "m": "perfect and complete without flaws"
    },
    {
      "n": "Malik",
      "g": "M",
      "m": "king and sovereign master"
    },
    {
      "n": "Nasir",
      "g": "M",
      "m": "helper and victory giver"
    },
    {
      "n": "Rashid",
      "g": "M",
      "m": "rightly guided and mature"
    },
    {
      "n": "Sami",
      "g": "M",
      "m": "elevated and sublime listener"
    },
    {
      "n": "Zaid",
      "g": "M",
      "m": "great abundance and wealth"
    },
    {
      "n": "Adan",
      "g": "M",
      "m": "garden of Eden paradise"
    },
    {
      "n": "Faisal",
      "g": "M",
      "m": "decisive judge and resolute leader"
    },
    {
      "n": "Habib",
      "g": "M",
      "m": "beloved and dear companion"
    },
    {
      "n": "Imran",
      "g": "M",
      "m": "prosperity and long population"
    },
    {
      "n": "Nabil",
      "g": "M",
      "m": "noble and magnanimous gentleman"
    },
    {
      "n": "Salim",
      "g": "M",
      "m": "safe and secure healthy soul"
    },
    {
      "n": "Zakir",
      "g": "M",
      "m": "grateful person who remembers God"
    },
    {
      "n": "Abdullah",
      "g": "M",
      "m": "servant of Allah"
    },
    {
      "n": "Abdurrahman",
      "g": "M",
      "m": "servant of the Beneficent"
    },
    {
      "n": "Abdurraheem",
      "g": "M",
      "m": "servant of the Merciful"
    },
    {
      "n": "Abdulmalik",
      "g": "M",
      "m": "servant of the Sovereign"
    },
    {
      "n": "Abdulquddus",
      "g": "M",
      "m": "servant of the Holy"
    },
    {
      "n": "Abdulsalam",
      "g": "F",
      "m": "servant of the Source of Peace"
    },
    {
      "n": "Abdulaziz",
      "g": "M",
      "m": "servant of the Almighty"
    },
    {
      "n": "Abdulkhaliq",
      "g": "M",
      "m": "servant of the Creator"
    },
    {
      "n": "Abdulwahhab",
      "g": "M",
      "m": "servant of the Bestower"
    },
    {
      "n": "Abdulrazzaq",
      "g": "M",
      "m": "servant of the Provider"
    },
    {
      "n": "Abdulalim",
      "g": "M",
      "m": "servant of the All-Knowing"
    },
    {
      "n": "Abdulkarim",
      "g": "M",
      "m": "servant of the Generous"
    },
    {
      "n": "Abdulhakim",
      "g": "M",
      "m": "servant of the Wise"
    },
    {
      "n": "Abdulhamid",
      "g": "M",
      "m": "servant of the Praiseworthy"
    },
    {
      "n": "Asad",
      "g": "M",
      "m": "lion or brave warrior"
    },
    {
      "n": "Bassam",
      "g": "M",
      "m": "smiling and cheerful"
    },
    {
      "n": "Fadi",
      "g": "M",
      "m": "savior or redeemer"
    },
    {
      "n": "Ghiath",
      "g": "M",
      "m": "succor or protector"
    },
    {
      "n": "Hani",
      "g": "M",
      "m": "happy and content"
    },
    {
      "n": "Jalal",
      "g": "M",
      "m": "majesty and glory"
    },
    {
      "n": "Khaled",
      "g": "M",
      "m": "eternal or everlasting"
    },
    {
      "n": "Luqman",
      "g": "M",
      "m": "wise scholar prophet"
    },
    {
      "n": "Mahmoud",
      "g": "M",
      "m": "praised and commendable"
    },
    {
      "n": "Marwan",
      "g": "M",
      "m": "fragrant stone tree"
    },
    {
      "n": "Nadir",
      "g": "M",
      "m": "dear or precious rare"
    },
    {
      "n": "Rami",
      "g": "M",
      "m": "archer or marksman"
    },
    {
      "n": "Saad",
      "g": "M",
      "m": "good fortune and felicity"
    },
    {
      "n": "Saeed",
      "g": "M",
      "m": "happy and prosperous"
    },
    {
      "n": "Salah",
      "g": "M",
      "m": "righteousness and goodness"
    },
    {
      "n": "Tamer",
      "g": "M",
      "m": "owner of date trees"
    },
    {
      "n": "Uthman",
      "g": "M",
      "m": "wise companion name"
    },
    {
      "n": "Waleed",
      "g": "M",
      "m": "newborn child prince"
    },
    {
      "n": "Yahya",
      "g": "M",
      "m": "God is gracious prophet"
    },
    {
      "n": "Ziyad",
      "g": "M",
      "m": "abundance and growth"
    },
    {
      "n": "Ameen",
      "g": "M",
      "m": "faithful and trustworthy"
    },
    {
      "n": "Fadel",
      "g": "M",
      "m": "virtuous and excellent"
    },
    {
      "n": "Ghassan",
      "g": "M",
      "m": "prime of youth"
    },
    {
      "n": "Haitam",
      "g": "M",
      "m": "young eagle falcon"
    },
    {
      "n": "Riyad",
      "g": "M",
      "m": "beautiful lush gardens"
    },
    {
      "n": "Aisha",
      "g": "F",
      "m": "living·prosperous·vibrant life"
    },
    {
      "n": "Mariam",
      "g": "F",
      "m": "pious·beloved·exalted star of the sea"
    },
    {
      "n": "Zainab",
      "g": "F",
      "m": "fragrant flower·ornament of the father"
    },
    {
      "n": "Khadija",
      "g": "F",
      "m": "trustworthy·pure business leader"
    },
    {
      "n": "Amira",
      "g": "F",
      "m": "princess·prosperous leader"
    },
    {
      "n": "Zara",
      "g": "F",
      "m": "beautiful flower·radiant dawn"
    },
    {
      "n": "Layla",
      "g": "F",
      "m": "night·dark exotic beauty"
    },
    {
      "n": "Inaya",
      "g": "F",
      "m": "concern·care·protection from God"
    },
    {
      "n": "Nur",
      "g": "F",
      "m": "divine light·radiance"
    },
    {
      "n": "Safa",
      "g": "F",
      "m": "purity·clarity·sacred hill"
    },
    {
      "n": "Sara",
      "g": "F",
      "m": "pure·happy·noble lady"
    },
    {
      "n": "Lina",
      "g": "F",
      "m": "tender·young palm tree·soft-hearted"
    },
    {
      "n": "Hana",
      "g": "F",
      "m": "happiness·bliss·peace of mind"
    },
    {
      "n": "Farah",
      "g": "F",
      "m": "joy·cheerfulness·celebration"
    },
    {
      "n": "Yasmin",
      "g": "F",
      "m": "jasmine flower·elegance"
    },
    {
      "n": "Malak",
      "g": "F",
      "m": "angel·divine beauty"
    },
    {
      "n": "Reem",
      "g": "F",
      "m": "white gazelle·graceful and pure"
    },
    {
      "n": "Nadia",
      "g": "F",
      "m": "hope·tender·first delicate dew drop"
    },
    {
      "n": "Salma",
      "g": "F",
      "m": "peaceful·safe·flawless health"
    },
    {
      "n": "Amal",
      "g": "F",
      "m": "hope·aspirations·bright future"
    },
    {
      "n": "Basma",
      "g": "F",
      "m": "smile·joy-bringer"
    },
    {
      "n": "Daniya",
      "g": "F",
      "m": "kind-hearted·close to people"
    },
    {
      "n": "Farida",
      "g": "F",
      "m": "unique·unparalleled gem"
    },
    {
      "n": "Ghaliya",
      "g": "F",
      "m": "precious·valuable musk scent"
    },
    {
      "n": "Habiba",
      "g": "F",
      "m": "beloved·darling"
    },
    {
      "n": "Iman",
      "g": "F",
      "m": "faith·absolute belief"
    },
    {
      "n": "Jana",
      "g": "F",
      "m": "harvest of heaven·fresh fruits"
    },
    {
      "n": "Latifa",
      "g": "F",
      "m": "gentle·kind·pleasant humor"
    },
    {
      "n": "Maha",
      "g": "F",
      "m": "wild deer eyes·beautiful eyes"
    },
    {
      "n": "Naila",
      "g": "F",
      "m": "attainer·successful achiever"
    },
    {
      "n": "Rania",
      "g": "F",
      "m": "queen·gazing with intent"
    },
    {
      "n": "Sana",
      "g": "F",
      "m": "brilliance·splendor·high mountain peak"
    },
    {
      "n": "Thana",
      "g": "F",
      "m": "praise·gratitude to God"
    },
    {
      "n": "Warda",
      "g": "F",
      "m": "rose·blossoming flower"
    },
    {
      "n": "Yara",
      "g": "F",
      "m": "small butterfly·water nymph·strength"
    },
    {
      "n": "Zahra",
      "g": "F",
      "m": "shining·luminous flower"
    },
    {
      "n": "Alia",
      "g": "F",
      "m": "exalted·highest social standing"
    },
    {
      "n": "Huda",
      "g": "F",
      "m": "right guidance·divine path"
    },
    {
      "n": "Muna",
      "g": "F",
      "m": "wishes·desires·deepest dreams"
    },
    {
      "n": "Afaf",
      "g": "F",
      "m": "chaste·virtuous and pure"
    },
    {
      "n": "Ahlam",
      "g": "F",
      "m": "witty dreamer·pleasant imagination"
    },
    {
      "n": "Asma",
      "g": "F",
      "m": "exalted·noble and prominent personality"
    },
    {
      "n": "Aya",
      "g": "F",
      "m": "miracle·divine sign from heaven"
    },
    {
      "n": "Badia",
      "g": "F",
      "m": "unprecedented·admirable talent"
    },
    {
      "n": "Dalal",
      "g": "F",
      "m": "pampered·kindness and affection"
    },
    {
      "n": "Dina",
      "g": "F",
      "m": "obedient and faithful follower"
    },
    {
      "n": "Faiza",
      "g": "F",
      "m": "victorious winner·successful achiever"
    },
    {
      "n": "Fatin",
      "g": "F",
      "m": "fascinating·intelligent and captivating"
    },
    {
      "n": "Halima",
      "g": "F",
      "m": "gentle·patient and forbearing"
    },
    {
      "n": "Ilham",
      "g": "F",
      "m": "divine intuition·inspiration"
    },
    {
      "n": "Jamilah",
      "g": "F",
      "m": "beautiful·elegant and graceful"
    },
    {
      "n": "Karimah",
      "g": "F",
      "m": "generous·noble and bountiful"
    },
    {
      "n": "Lamya",
      "g": "F",
      "m": "dark exotic lips·beautiful radiant"
    },
    {
      "n": "Lubna",
      "g": "F",
      "m": "fragrant styrax tree blossoms"
    },
    {
      "n": "Madiha",
      "g": "F",
      "m": "praiseworthy·deserving of admiration"
    },
    {
      "n": "Majida",
      "g": "F",
      "m": "glorious·noble and honorable lady"
    },
    {
      "n": "Nabila",
      "g": "F",
      "m": "noble·magnanimous and gentlemanly"
    },
    {
      "n": "Najah",
      "g": "F",
      "m": "victorious success·achievement"
    },
    {
      "n": "Nasira",
      "g": "F",
      "m": "victorious helper·protector"
    },
    {
      "n": "Ola",
      "g": "F",
      "m": "high standing·glory and nobility"
    },
    {
      "n": "Rawan",
      "g": "F",
      "m": "whispering stream of water·gentle flow"
    },
    {
      "n": "Sabah",
      "g": "F",
      "m": "bright morning dawn light"
    },
    {
      "n": "Sahar",
      "g": "F",
      "m": "mystic dawn before sunrise"
    },
    {
      "n": "Samira",
      "g": "F",
      "m": "entertaining night companion or storytel"
    },
    {
      "n": "Shadia",
      "g": "F",
      "m": "beautiful singer lady"
    },
    {
      "n": "Suhaila",
      "g": "F",
      "m": "canopus star·gentle canopy"
    },
    {
      "n": "Thuraya",
      "g": "F",
      "m": "pleiades star cluster·brilliant gem"
    },
    {
      "n": "Wafa",
      "g": "F",
      "m": "faithfulness·loyal devotion"
    },
    {
      "n": "Widad",
      "g": "F",
      "m": "love·harmony and pleasant affection"
    },
    {
      "n": "Yasmeen",
      "g": "F",
      "m": "jasmine flower elegant branch"
    },
    {
      "n": "Yumna",
      "g": "F",
      "m": "good fortune·blessed right hand"
    },
    {
      "n": "Zahira",
      "g": "F",
      "m": "shining luminous guiding star"
    },
    {
      "n": "Zakia",
      "g": "F",
      "m": "pure and highly intelligent philosopher"
    },
    {
      "n": "Zubaida",
      "g": "F",
      "m": "marigold flower cream·precious flower"
    }
  ],
  "th": [
    {
      "n": "Somchai",
      "g": "M",
      "m": "good and masculine man"
    },
    {
      "n": "Arthit",
      "g": "M",
      "m": "the sun or radiant leader"
    },
    {
      "n": "Kitti",
      "g": "M",
      "m": "renowned and honorable"
    },
    {
      "n": "Chaiyan",
      "g": "M",
      "m": "victorious and triumphant"
    },
    {
      "n": "Niran",
      "g": "M",
      "m": "eternal and steadfast"
    },
    {
      "n": "Anan",
      "g": "M",
      "m": "infinite and boundless prosperity"
    },
    {
      "n": "Pravat",
      "g": "M",
      "m": "historical or legendary figure"
    },
    {
      "n": "Somsak",
      "g": "M",
      "m": "worthy power or glorious status"
    },
    {
      "n": "Prasert",
      "g": "M",
      "m": "excellent and sublime"
    },
    {
      "n": "Thahan",
      "g": "M",
      "m": "soldierly and brave defender"
    },
    {
      "n": "Sakda",
      "g": "M",
      "m": "powerful and mighty"
    },
    {
      "n": "Boon-Nam",
      "g": "M",
      "m": "born with good fortune"
    },
    {
      "n": "Kasem",
      "g": "M",
      "m": "happiness and peace"
    },
    {
      "n": "Aroon",
      "g": "M",
      "m": "dawn or rising sun"
    },
    {
      "n": "Veera",
      "g": "M",
      "m": "brave and heroic leader"
    },
    {
      "n": "Natthanan",
      "g": "M",
      "m": "joy of the wise philosopher"
    },
    {
      "n": "Phasit",
      "g": "M",
      "m": "eloquent speech or wise words"
    },
    {
      "n": "Tanakorn",
      "g": "M",
      "m": "source of wealth"
    },
    {
      "n": "Saran",
      "g": "M",
      "m": "refuge or peaceful shield"
    },
    {
      "n": "Piyabut",
      "g": "M",
      "m": "beloved son"
    },
    {
      "n": "Chakrit",
      "g": "M",
      "m": "watchful king"
    },
    {
      "n": "Teerawat",
      "g": "M",
      "m": "philosopher of excellent behavior"
    },
    {
      "n": "Nattapong",
      "g": "M",
      "m": "lineage of wise scholars"
    },
    {
      "n": "Bhumibol",
      "g": "M",
      "m": "strength of the land"
    },
    {
      "n": "Krittapak",
      "g": "M",
      "m": "fortunate and highly skilled"
    },
    {
      "n": "Supphakorn",
      "g": "M",
      "m": "source of good deeds"
    },
    {
      "n": "Varut",
      "g": "M",
      "m": "noble and highly praised"
    },
    {
      "n": "Thanakrit",
      "g": "M",
      "m": "one who creates wealth"
    },
    {
      "n": "Jirayu",
      "g": "M",
      "m": "blessed with long life"
    },
    {
      "n": "Korakot",
      "g": "M",
      "m": "crab or protective constellation"
    },
    {
      "n": "Phuwadet",
      "g": "M",
      "m": "power of the earth"
    },
    {
      "n": "Natthapat",
      "g": "M",
      "m": "progress of the wise"
    },
    {
      "n": "Santi",
      "g": "M",
      "m": "peace"
    },
    {
      "n": "Pracha",
      "g": "M",
      "m": "people or populace"
    },
    {
      "n": "Surasak",
      "g": "M",
      "m": "mighty power"
    },
    {
      "n": "Mongkol",
      "g": "M",
      "m": "auspicious blessing"
    },
    {
      "n": "Chana",
      "g": "M",
      "m": "victory"
    },
    {
      "n": "Narong",
      "g": "M",
      "m": "battle or warrior"
    },
    {
      "n": "Piyapong",
      "g": "M",
      "m": "beloved lineage"
    },
    {
      "n": "Kriangkrai",
      "g": "M",
      "m": "victorious and powerful"
    },
    {
      "n": "Sujin",
      "g": "M",
      "m": "good and true"
    },
    {
      "n": "Wanchai",
      "g": "M",
      "m": "day of victory"
    },
    {
      "n": "Viroj",
      "g": "M",
      "m": "shining and brilliant"
    },
    {
      "n": "Sompol",
      "g": "M",
      "m": "worthy strength"
    },
    {
      "n": "Prasong",
      "g": "M",
      "m": "wish or desire"
    },
    {
      "n": "Boonmee",
      "g": "M",
      "m": "having merit or fortune"
    },
    {
      "n": "Thanawat",
      "g": "M",
      "m": "wealthy and progressive"
    },
    {
      "n": "Ratchanon",
      "g": "M",
      "m": "glorious royal descendant"
    },
    {
      "n": "Pongsakorn",
      "g": "M",
      "m": "source of the family lineage"
    },
    {
      "n": "Chayaphon",
      "g": "M",
      "m": "power of victory"
    },
    {
      "n": "Wongsakorn",
      "g": "M",
      "m": "family origin"
    },
    {
      "n": "Nattawut",
      "g": "M",
      "m": "weapon of the wise"
    },
    {
      "n": "Sarawut",
      "g": "M",
      "m": "weapon of protection"
    },
    {
      "n": "Phuri",
      "g": "M",
      "m": "wise and intelligent"
    },
    {
      "n": "Sattawat",
      "g": "M",
      "m": "one hundred years of life"
    },
    {
      "n": "Kittipot",
      "g": "M",
      "m": "famous power"
    },
    {
      "n": "Teerapat",
      "g": "M",
      "m": "philosopher of prosperity"
    },
    {
      "n": "Peeradon",
      "g": "M",
      "m": "brave brother"
    },
    {
      "n": "Attaphol",
      "g": "M",
      "m": "personal strength"
    },
    {
      "n": "Chaiwat",
      "g": "M",
      "m": "progressive victory"
    },
    {
      "n": "Malai",
      "g": "F",
      "m": "garland of flowers or beautifully woven"
    },
    {
      "n": "Anong",
      "g": "F",
      "m": "beautiful woman or graceful lady"
    },
    {
      "n": "Kanya",
      "g": "F",
      "m": "young girl or pure maiden"
    },
    {
      "n": "Siriporn",
      "g": "F",
      "m": "glorious blessing or divine grace"
    },
    {
      "n": "Sunisa",
      "g": "F",
      "m": "fair-faced or beautiful skin"
    },
    {
      "n": "Charee",
      "g": "F",
      "m": "good behavior or noble manners"
    },
    {
      "n": "Ratana",
      "g": "F",
      "m": "crystal or precious jewel"
    },
    {
      "n": "Darika",
      "g": "F",
      "m": "star or guiding night light"
    },
    {
      "n": "Phaibun",
      "g": "F",
      "m": "prosperous or flourishing destiny"
    },
    {
      "n": "Suda",
      "g": "F",
      "m": "daughter or gentle lady"
    },
    {
      "n": "Kamala",
      "g": "F",
      "m": "lotus flower or sacred beauty"
    },
    {
      "n": "Mayuree",
      "g": "F",
      "m": "peacock or elegant motion"
    },
    {
      "n": "Achara",
      "g": "F",
      "m": "angelic or beautiful angel"
    },
    {
      "n": "Buaban",
      "g": "F",
      "m": "blooming lotus or spiritual awakening"
    },
    {
      "n": "Chanthira",
      "g": "F",
      "m": "moonlight or serene glow"
    },
    {
      "n": "Pornthip",
      "g": "F",
      "m": "divine blessing or heavenly gift"
    },
    {
      "n": "Kanchana",
      "g": "F",
      "m": "gold or highly valuable"
    },
    {
      "n": "Benjamas",
      "g": "F",
      "m": "chrysanthemum flower or noble grace"
    },
    {
      "n": "Sirirat",
      "g": "F",
      "m": "glorious jewel or excellent treasure"
    },
    {
      "n": "Nutcha",
      "g": "F",
      "m": "born from a wise philosopher"
    },
    {
      "n": "Patsara",
      "g": "F",
      "m": "shining diamond or unbreakable purity"
    },
    {
      "n": "Areeya",
      "g": "F",
      "m": "noble or civilized lady"
    },
    {
      "n": "Thanyarat",
      "g": "F",
      "m": "beautiful gem of grain or bountiful harv"
    },
    {
      "n": "Nidnoi",
      "g": "F",
      "m": "little one or precious and petite"
    },
    {
      "n": "Supaporn",
      "g": "F",
      "m": "excellent blessing or pure heart"
    },
    {
      "n": "Chonlada",
      "g": "F",
      "m": "source of pure water or refreshing life"
    },
    {
      "n": "Napassorn",
      "g": "F",
      "m": "beautiful as the wide open sky"
    },
    {
      "n": "Kamonwan",
      "g": "F",
      "m": "heart pure as gold or loving soul"
    },
    {
      "n": "Wilai",
      "g": "F",
      "m": "beautiful or charming"
    },
    {
      "n": "Pimchanok",
      "g": "F",
      "m": "the lovely image of her father"
    },
    {
      "n": "Sudarat",
      "g": "F",
      "m": "excellent daughter"
    },
    {
      "n": "Kannika",
      "g": "F",
      "m": "flower or blooming"
    },
    {
      "n": "Chonthicha",
      "g": "F",
      "m": "born of the ocean"
    },
    {
      "n": "Nattamon",
      "g": "F",
      "m": "blessing of the wise"
    },
    {
      "n": "Sasithorn",
      "g": "F",
      "m": "the moon or glowing guide"
    },
    {
      "n": "Peerada",
      "g": "F",
      "m": "proud and prosperous"
    },
    {
      "n": "Supatra",
      "g": "F",
      "m": "excellent lady"
    },
    {
      "n": "Duangjai",
      "g": "F",
      "m": "heart or beloved soul"
    },
    {
      "n": "Pimpha",
      "g": "F",
      "m": "beautiful face"
    },
    {
      "n": "Wanida",
      "g": "F",
      "m": "girl or maiden"
    },
    {
      "n": "Busaba",
      "g": "F",
      "m": "flower branch"
    },
    {
      "n": "Jarunee",
      "g": "F",
      "m": "generous and graceful"
    },
    {
      "n": "Pensri",
      "g": "F",
      "m": "beauty of the full moon"
    },
    {
      "n": "Anchalee",
      "g": "F",
      "m": "greeting with respect"
    },
    {
      "n": "Boonruen",
      "g": "F",
      "m": "prosperous household"
    },
    {
      "n": "Siriwan",
      "g": "F",
      "m": "glorious complexion"
    },
    {
      "n": "Monthas",
      "g": "F",
      "m": "sacred flower"
    },
    {
      "n": "Kanyarat",
      "g": "F",
      "m": "precious beautiful girl"
    },
    {
      "n": "Phatchara",
      "g": "F",
      "m": "diamond"
    },
    {
      "n": "Apsara",
      "g": "F",
      "m": "angelic dancer or nymph"
    },
    {
      "n": "Lalita",
      "g": "F",
      "m": "charming or elegant"
    },
    {
      "n": "Prapassorn",
      "g": "F",
      "m": "brilliant and pure radiance"
    },
    {
      "n": "Nidda",
      "g": "F",
      "m": "sleep or peaceful rest"
    },
    {
      "n": "Preeda",
      "g": "F",
      "m": "joyful and content"
    },
    {
      "n": "Sinee",
      "g": "F",
      "m": "white or fair lady"
    },
    {
      "n": "Sukhon",
      "g": "F",
      "m": "fragrance"
    },
    {
      "n": "Thanya",
      "g": "F",
      "m": "fortunate and wealthy"
    },
    {
      "n": "Ubon",
      "g": "F",
      "m": "lotus water lily"
    },
    {
      "n": "Vipa",
      "g": "F",
      "m": "shining bright"
    },
    {
      "n": "Wasana",
      "g": "F",
      "m": "destiny or past merit"
    }
  ],
  "vi": [
    {
      "n": "Minh",
      "g": "M",
      "m": "밝고 총명함",
      "hj": "明"
    },
    {
      "n": "Bảo",
      "g": "M",
      "m": "귀한 보물·보배",
      "hj": "寶"
    },
    {
      "n": "Đức",
      "g": "M",
      "m": "높은 덕망·인덕",
      "hj": "德"
    },
    {
      "n": "Tuấn",
      "g": "M",
      "m": "준걸·빼어나고 수려함",
      "hj": "俊"
    },
    {
      "n": "Khôi",
      "g": "M",
      "m": "우두머리·으뜸·괴수",
      "hj": "魁"
    },
    {
      "n": "Hải",
      "g": "M",
      "m": "바다·넓고 깊은 도량",
      "hj": "海"
    },
    {
      "n": "Long",
      "g": "M",
      "m": "용룡·최고의 기상과 존엄",
      "hj": "龍"
    },
    {
      "n": "Phong",
      "g": "M",
      "m": "바람·풍파를 헤쳐 나가는 기세",
      "hj": "風"
    },
    {
      "n": "Fong",
      "g": "M",
      "m": "산봉우리·최정상",
      "hj": "峰"
    },
    {
      "n": "Thắng",
      "g": "M",
      "m": "이기다·승리와 영광",
      "hj": "勝"
    },
    {
      "n": "Công",
      "g": "M",
      "m": "공적·보람·위대한 업적",
      "hj": "功"
    },
    {
      "n": "Phước",
      "g": "M",
      "m": "복·하늘이 내린 축복",
      "hj": "福"
    },
    {
      "n": "Phúc",
      "g": "M",
      "m": "복·가문의 행복과 번창",
      "hj": "福"
    },
    {
      "n": "Ân",
      "g": "M",
      "m": "은혜·인덕과 배려",
      "hj": "恩"
    },
    {
      "n": "Khánh",
      "g": "M",
      "m": "경사스럽다·가문의 경사",
      "hj": "慶"
    },
    {
      "n": "Tấn",
      "g": "M",
      "m": "나아가다·발전·상승",
      "hj": "晉"
    },
    {
      "n": "Hoàng",
      "g": "M",
      "m": "황금빛·존귀함·왕실기상",
      "hj": "黃"
    },
    {
      "n": "Trường",
      "g": "M",
      "m": "길다·영원함·지속되는 복",
      "hj": "長"
    },
    {
      "n": "Mạnh",
      "g": "M",
      "m": "굳세다·용맹하고 강인함",
      "hj": "猛"
    },
    {
      "n": "Hùng",
      "g": "M",
      "m": "수컷웅·영웅·당당함",
      "hj": "雄"
    },
    {
      "n": "Tú",
      "g": "M",
      "m": "빼어나다·수려한 인재",
      "hj": "秀"
    },
    {
      "n": "Nam",
      "g": "M",
      "m": "남쪽·따뜻함·생명에너지",
      "hj": "南"
    },
    {
      "n": "Tùng",
      "g": "M",
      "m": "소나무·지조와 사철 푸른 절개",
      "hj": "松"
    },
    {
      "n": "Khải",
      "g": "M",
      "m": "열다·지혜를 깨우치다",
      "hj": "啓"
    },
    {
      "n": "Kiệt",
      "g": "M",
      "m": "뛰어나다·걸출한 영웅",
      "hj": "傑"
    },
    {
      "n": "Vinh",
      "g": "M",
      "m": "영화롭다·번영·최고의 명예",
      "hj": "榮"
    },
    {
      "n": "Khoa",
      "g": "M",
      "m": "품등과·과거급제·학문성취",
      "hj": "科"
    },
    {
      "n": "Khang",
      "g": "M",
      "m": "편안함·건강·안정",
      "hj": "康"
    },
    {
      "n": "Lâm",
      "g": "M",
      "m": "수풀·번창·풍요로운 조화",
      "hj": "林"
    },
    {
      "n": "Văn",
      "g": "M",
      "m": "글월·지혜·문화적 소양",
      "hj": "文"
    },
    {
      "n": "Tiến",
      "g": "M",
      "m": "나아가다·출세·전진",
      "hj": "進"
    },
    {
      "n": "Quân",
      "g": "M",
      "m": "임금·현명한 지도자",
      "hj": "君"
    },
    {
      "n": "Thịnh",
      "g": "M",
      "m": "성대하다·번창·번영",
      "hj": "盛"
    },
    {
      "n": "Duy",
      "g": "M",
      "m": "오직·하나뿐인 독보적 존재",
      "hj": "唯"
    },
    {
      "n": "Hiếu",
      "g": "M",
      "m": "효도·가정의 근본과 예절",
      "hj": "孝"
    },
    {
      "n": "Lộc",
      "g": "M",
      "m": "녹봉·재물복·자산의 축복",
      "hj": "祿"
    },
    {
      "n": "Dũng",
      "g": "M",
      "m": "날쌔다·용맹·용기",
      "hj": "勇"
    },
    {
      "n": "Liêm",
      "g": "M",
      "m": "청렴하다·곧다·정직강직",
      "hj": "廉"
    },
    {
      "n": "Việt",
      "g": "M",
      "m": "뛰어난 베트남의 기상",
      "hj": "越"
    },
    {
      "n": "Trí",
      "g": "M",
      "m": "지혜·총명·이성",
      "hj": "智"
    },
    {
      "n": "Luân",
      "g": "M",
      "m": "인륜·도리·윤리와 신뢰",
      "hj": "倫"
    },
    {
      "n": "Hưng",
      "g": "M",
      "m": "일어나다·가문을 일으켜 세움",
      "hj": "興"
    },
    {
      "n": "Thành",
      "g": "M",
      "m": "이루다·완성·대업성취",
      "hj": "成"
    },
    {
      "n": "Bách",
      "g": "M",
      "m": "측백나무·변함없는 가치",
      "hj": "栢"
    },
    {
      "n": "Bình",
      "g": "M",
      "m": "평평할평·평온함·안정",
      "hj": "平"
    },
    {
      "n": "Toàn",
      "g": "M",
      "m": "온전할전·완벽함·안전",
      "hj": "全"
    },
    {
      "n": "Chí",
      "g": "M",
      "m": "뜻·지향·원대한 목표",
      "hj": "志"
    },
    {
      "n": "Sơn",
      "g": "M",
      "m": "뫼·굳건함·흔들리지 않음",
      "hj": "山"
    },
    {
      "n": "상",
      "g": "M",
      "m": "상서롭다·복·길조",
      "hj": "祥"
    },
    {
      "n": "언",
      "g": "M",
      "m": "말씀·신용·언변지혜",
      "hj": "言"
    },
    {
      "n": "연",
      "g": "M",
      "m": "갈다·연구하다·학문성취",
      "hj": "硏"
    },
    {
      "n": "오",
      "g": "M",
      "m": "나·자아확립·주체성",
      "hj": "吾"
    },
    {
      "n": "혁",
      "g": "M",
      "m": "빛나다·성대함·명성",
      "hj": "赫"
    },
    {
      "n": "책",
      "g": "M",
      "m": "책략·지혜·방책",
      "hj": "策"
    },
    {
      "n": "직",
      "g": "M",
      "m": "곧다·정직함·강직",
      "hj": "直"
    },
    {
      "n": "중",
      "g": "M",
      "m": "가운데·중용·치우침 없음",
      "hj": "中"
    },
    {
      "n": "주",
      "g": "M",
      "m": "기둥·대들보·중추",
      "hj": "柱"
    },
    {
      "n": "일",
      "g": "M",
      "m": "하나·으뜸·시작",
      "hj": "一"
    },
    {
      "n": "재",
      "g": "M",
      "m": "재목·능력가·동량",
      "hj": "材"
    },
    {
      "n": "고",
      "g": "M",
      "m": "높고 뛰어남·숭고함",
      "hj": "高"
    },
    {
      "n": "곡",
      "g": "M",
      "m": "골짜기·풍요·포용력",
      "hj": "谷"
    },
    {
      "n": "공",
      "g": "M",
      "m": "함께·화합·상생",
      "hj": "共"
    },
    {
      "n": "관",
      "g": "M",
      "m": "너그럽고 부유함·도량",
      "hj": "寬"
    },
    {
      "n": "광",
      "g": "M",
      "m": "바르게 바로잡다·구제",
      "hj": "匡"
    },
    {
      "n": "교",
      "g": "M",
      "m": "가르치다·본받다·현명",
      "hj": "敎"
    },
    {
      "n": "구",
      "g": "M",
      "m": "구하다·모으다·탐구",
      "hj": "求"
    },
    {
      "n": "규",
      "g": "M",
      "m": "별자리·문장력·지식",
      "hj": "奎"
    },
    {
      "n": "균",
      "g": "M",
      "m": "고르다·평평함·균형",
      "hj": "均"
    },
    {
      "n": "기",
      "g": "M",
      "m": "기도하다·바라다·축원",
      "hj": "祈"
    },
    {
      "n": "노",
      "g": "M",
      "m": "힘쓰다·노력과 인내",
      "hj": "努"
    },
    {
      "n": "단",
      "g": "M",
      "m": "구분·층계·단정하고 바름",
      "hj": "段"
    },
    {
      "n": "담",
      "g": "M",
      "m": "말씀·이야기·화술",
      "hj": "談"
    },
    {
      "n": "동",
      "g": "M",
      "m": "동쪽·새로운 시작·태양",
      "hj": "東"
    },
    {
      "n": "라",
      "g": "M",
      "m": "그물·벌려놓다·포용력",
      "hj": "羅"
    },
    {
      "n": "람",
      "g": "M",
      "m": "보다·통찰력·선견지명",
      "hj": "覽"
    },
    {
      "n": "려",
      "g": "M",
      "m": "빛나고 아름답다·화려함",
      "hj": "麗"
    },
    {
      "n": "령",
      "g": "M",
      "m": "명령·아름답다·좋다·으뜸",
      "hj": "令"
    },
    {
      "n": "록",
      "g": "M",
      "m": "푸른빛·자연·싱그러움",
      "hj": "綠"
    },
    {
      "n": "론",
      "g": "M",
      "m": "말하다·도리·논리",
      "hj": "論"
    },
    {
      "n": "류",
      "g": "M",
      "m": "버드나무·유연함·부드러움",
      "hj": "柳"
    },
    {
      "n": "린",
      "g": "M",
      "m": "이웃·돌보다·덕을 베풂",
      "hj": "隣"
    },
    {
      "n": "면",
      "g": "M",
      "m": "힘쓰다·부지런함·노력",
      "hj": "勉"
    },
    {
      "n": "범",
      "g": "M",
      "m": "본보기·틀·세상의 귀감",
      "hj": "範"
    },
    {
      "n": "보",
      "g": "M",
      "m": "크다·남자의 미칭·재능",
      "hj": "甫"
    },
    {
      "n": "빈",
      "g": "M",
      "m": "빛나다·빛나고 아름다움",
      "hj": "彬"
    },
    {
      "n": "Diệu",
      "g": "F",
      "m": "오묘하고 신비로운 지혜",
      "hj": "妙"
    },
    {
      "n": "Huyền",
      "g": "F",
      "m": "심오하고 깊은 학문",
      "hj": "玄"
    },
    {
      "n": "Quỳnh",
      "g": "F",
      "m": "아름다운 옥 보석·고결함",
      "hj": "瓊"
    },
    {
      "n": "Mai",
      "g": "F",
      "m": "매화나무·고결하고 변치 않음",
      "hj": "梅"
    },
    {
      "n": "Phương",
      "g": "F",
      "m": "꽃다울방·꽃향기·인덕",
      "hj": "芳"
    },
    {
      "n": "Bích",
      "g": "F",
      "m": "푸른 벽옥·순수함과 깨끗함",
      "hj": "碧"
    },
    {
      "n": "Thu",
      "g": "F",
      "m": "가을추·은은하고 평온한 삶",
      "hj": "秋"
    },
    {
      "n": "Thảo",
      "g": "F",
      "m": "풀초·유연함과 굳센 생명력",
      "hj": "草"
    },
    {
      "n": "Châu",
      "g": "F",
      "m": "구슬주·진주 보석·귀중함",
      "hj": "珠"
    },
    {
      "n": "Cát",
      "g": "F",
      "m": "길하고 상서로움·대길",
      "hj": "吉"
    },
    {
      "n": "Tường",
      "g": "F",
      "m": "상서로울상·하늘의 축복",
      "hj": "祥"
    },
    {
      "n": "Hồng",
      "g": "F",
      "m": "붉을홍·화려함과 존귀함",
      "hj": "紅"
    },
    {
      "n": "Nhung",
      "g": "F",
      "m": "비단융·우아하고 부드러움",
      "hj": "絨"
    },
    {
      "n": "Lan",
      "g": "F",
      "m": "난초·고결하고 청초한 품격",
      "hj": "蘭"
    },
    {
      "n": "Hương",
      "g": "F",
      "m": "향기·멀리 퍼지는 좋은 명성",
      "hj": "香"
    },
    {
      "n": "Kim",
      "g": "F",
      "m": "황금·보석·부유함과 자산",
      "hj": "金"
    },
    {
      "n": "Ngân",
      "g": "F",
      "m": "은은·빛나는 보석·풍요",
      "hj": "銀"
    },
    {
      "n": "Thanh",
      "g": "F",
      "m": "푸를청·맑고 결백한 성품",
      "hj": "青"
    },
    {
      "n": "Hà",
      "g": "F",
      "m": "물하·강·막힘없는 소통",
      "hj": "河"
    },
    {
      "n": "Ý",
      "g": "F",
      "m": "뜻의·원하는 바를 달성함",
      "hj": "意"
    },
    {
      "n": "Như",
      "g": "F",
      "m": "같을여·유연하고 순탄한 삶",
      "hj": "如"
    },
    {
      "n": "Tuyết",
      "g": "F",
      "m": "눈설·순백의 깨끗함과 결백",
      "hj": "雪"
    },
    {
      "n": "My",
      "g": "F",
      "m": "아름답다·훌륭함·조화",
      "hj": "美"
    },
    {
      "n": "Trúc",
      "g": "F",
      "m": "대나무·강직함과 굳은 지조",
      "hj": "竹"
    },
    {
      "n": "Diễm",
      "g": "F",
      "m": "고울염·수려하고 아름다운 외모",
      "hj": "艷"
    },
    {
      "n": "Ánh",
      "g": "F",
      "m": "비치다·주변을 조명하는 빛",
      "hj": "映"
    },
    {
      "n": "Dương",
      "g": "F",
      "m": "태양·볕·무한한 에너지",
      "hj": "陽"
    },
    {
      "n": "Tuệ",
      "g": "F",
      "m": "슬기로울혜·지혜·총명함",
      "hj": "慧"
    },
    {
      "n": "Thục",
      "g": "F",
      "m": "맑고 정숙함·현숙한 미덕",
      "hj": "淑"
    },
    {
      "n": "Quyên",
      "g": "F",
      "m": "예쁠견·우아하고 예쁜 아가씨",
      "hj": "娟"
    },
    {
      "n": "Linh",
      "g": "F",
      "m": "신령령·영묘하고 영리함",
      "hj": "靈"
    },
    {
      "n": "Đan",
      "g": "F",
      "m": "붉을단·정성·일편단심",
      "hj": "丹"
    },
    {
      "n": "Nguyên",
      "g": "F",
      "m": "근원·넓은 벌판·도량",
      "hj": "原"
    },
    {
      "n": "Thủy",
      "g": "F",
      "m": "물수·지혜롭고 유연함",
      "hj": "水"
    },
    {
      "n": "Tiên",
      "g": "F",
      "m": "신선·초연하고 숭고함",
      "hj": "仙"
    },
    {
      "n": "Giang",
      "g": "F",
      "m": "강강·은혜의 흐름·소통",
      "hj": "江"
    },
    {
      "n": "Trâm",
      "g": "F",
      "m": "비녀잠·명문가 가문의 품격",
      "hj": "簪"
    },
    {
      "n": "Vân",
      "g": "F",
      "m": "구름운·높은 이상과 기상",
      "hj": "雲"
    },
    {
      "n": "Diệp",
      "g": "F",
      "m": "잎사귀엽·금지옥엽·귀한 존재",
      "hj": "葉"
    },
    {
      "n": "Tâm",
      "g": "F",
      "m": "마음심·중심·가장 핵심",
      "hj": "心"
    },
    {
      "n": "Vy",
      "g": "F",
      "m": "장미꽃·아름답고 수려함",
      "hj": "薇"
    },
    {
      "n": "Ny",
      "g": "F",
      "m": "아이·순수함·귀여움",
      "hj": "兒"
    },
    {
      "n": "Ly",
      "g": "F",
      "m": "오얏나무·풍성한 가문의 결실",
      "hj": "李"
    },
    {
      "n": "Thúy",
      "g": "F",
      "m": "물비취 보석·귀중하고 영롱함",
      "hj": "翠"
    },
    {
      "n": "안",
      "g": "F",
      "m": "편안하다·온화함·안정",
      "hj": "安"
    },
    {
      "n": "계",
      "g": "F",
      "m": "열다·지혜를 깨우치다",
      "hj": "啓"
    },
    {
      "n": "국",
      "g": "F",
      "m": "나라·국가·큰 터전",
      "hj": "國"
    },
    {
      "n": "근",
      "g": "F",
      "m": "무궁화·신념·사철푸름",
      "hj": "槿"
    },
    {
      "n": "길",
      "g": "F",
      "m": "길하고 상서롭다·대길",
      "hj": "吉"
    },
    {
      "n": "남",
      "g": "F",
      "m": "남쪽·따뜻함·생명에너지",
      "hj": "南"
    },
    {
      "n": "도",
      "g": "F",
      "m": "길·진리·올바른 방향",
      "hj": "道"
    },
    {
      "n": "락",
      "g": "F",
      "m": "즐겁다·안락함·행복",
      "hj": "樂"
    },
    {
      "n": "로",
      "g": "F",
      "m": "길·도정·앞길이 열리다",
      "hj": "路"
    },
    {
      "n": "리",
      "g": "F",
      "m": "이롭다·영리함·날카로움",
      "hj": "利"
    },
    {
      "n": "림",
      "g": "F",
      "m": "수풀·번창·풍요로운 조화",
      "hj": "林"
    },
    {
      "n": "만",
      "g": "F",
      "m": "가득차다·풍요·완전함",
      "hj": "滿"
    },
    {
      "n": "맹",
      "g": "F",
      "m": "우두머리·맏이·선구자",
      "hj": "孟"
    },
    {
      "n": "명",
      "g": "F",
      "m": "밝다·총명함·지혜의 빛",
      "hj": "明"
    },
    {
      "n": "무",
      "g": "F",
      "m": "우거지다·풍성·번창함",
      "hj": "茂"
    },
    {
      "n": "문",
      "g": "F",
      "m": "글월·지혜·문장력·문화",
      "hj": "文"
    },
    {
      "n": "민",
      "g": "F",
      "m": "백성·화합·온화한 기운",
      "hj": "民"
    },
    {
      "n": "박",
      "g": "F",
      "m": "순박하다·성실·근본지킴",
      "hj": "朴"
    },
    {
      "n": "본",
      "g": "F",
      "m": "근본·뿌리·바탕·초심",
      "hj": "本"
    }
  ]
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 9. 한자 이름 데이터 (일본·중국·홍콩)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
window._C66_HANJA_JA = [
  {
    "r": "ひかり",
    "hj": "光",
    "st": 6,
    "m": "빛·광명",
    "oh": "화"
  },
  {
    "r": "さくら",
    "hj": "桜",
    "st": 10,
    "m": "벚꽃·아름다움",
    "oh": "목"
  },
  {
    "r": "あおい",
    "hj": "葵",
    "st": 15,
    "m": "해바라기",
    "oh": "목"
  },
  {
    "r": "つばさ",
    "hj": "翼",
    "st": 18,
    "m": "날개·비상",
    "oh": "금"
  },
  {
    "r": "はやて",
    "hj": "疾",
    "st": 10,
    "m": "빠르다·용맹",
    "oh": "화"
  },
  {
    "r": "たくみ",
    "hj": "巧",
    "st": 5,
    "m": "솜씨·탁월함",
    "oh": "목"
  },
  {
    "r": "めぐみ",
    "hj": "恵",
    "st": 12,
    "m": "은혜·축복",
    "oh": "수"
  },
  {
    "r": "みのり",
    "hj": "実",
    "st": 8,
    "m": "결실·열매",
    "oh": "금"
  },
  {
    "r": "こころ",
    "hj": "心",
    "st": 4,
    "m": "마음·중심",
    "oh": "금"
  },
  {
    "r": "かける",
    "hj": "翔",
    "st": 12,
    "m": "높이 날다",
    "oh": "화"
  },
  {
    "r": "たいが",
    "hj": "大",
    "st": 3,
    "m": "크다·위대함",
    "oh": "화"
  },
  {
    "r": "みやび",
    "hj": "雅",
    "st": 12,
    "m": "우아하다·바르다",
    "oh": "토"
  },
  {
    "r": "はると",
    "hj": "陽",
    "st": 17,
    "m": "태양·볕",
    "oh": "화"
  },
  {
    "r": "とうや",
    "hj": "斗",
    "st": 4,
    "m": "별자리·북두칠성",
    "oh": "화"
  },
  {
    "r": "ゆう",
    "hj": "悠",
    "st": 11,
    "m": "멀다·유구함",
    "oh": "토"
  },
  {
    "r": "ひと",
    "hj": "人",
    "st": 2,
    "m": "사람·인재",
    "oh": "화"
  },
  {
    "r": "かなで",
    "hj": "奏",
    "st": 9,
    "m": "연주하다·조화",
    "oh": "목"
  },
  {
    "r": "た",
    "hj": "汰",
    "st": 8,
    "m": "씻어내다·정화",
    "oh": "수"
  },
  {
    "r": "いつき",
    "hj": "樹",
    "st": 16,
    "m": "나무·굳건함",
    "oh": "목"
  },
  {
    "r": "れん",
    "hj": "蓮",
    "st": 17,
    "m": "연꽃·순결",
    "oh": "목"
  },
  {
    "r": "ゆうま",
    "hj": "佑",
    "st": 7,
    "m": "도와주다·상생",
    "oh": "토"
  },
  {
    "r": "まこと",
    "hj": "真",
    "st": 10,
    "m": "참·진실함",
    "oh": "금"
  },
  {
    "r": "かい",
    "hj": "海",
    "st": 11,
    "m": "바다·포용력",
    "oh": "수"
  },
  {
    "r": "あさひ",
    "hj": "朝",
    "st": 12,
    "m": "아침·시작",
    "oh": "목"
  },
  {
    "r": "りく",
    "hj": "陸",
    "st": 16,
    "m": "대지·뭍",
    "oh": "토"
  },
  {
    "r": "하루",
    "hj": "春",
    "st": 9,
    "m": "봄·생명력",
    "oh": "목"
  },
  {
    "r": "ひかる",
    "hj": "輝",
    "st": 15,
    "m": "빛나다·광채",
    "oh": "화"
  },
  {
    "r": "わたる",
    "hj": "航",
    "st": 10,
    "m": "항해·전진",
    "oh": "수"
  },
  {
    "r": "ゆたか",
    "hj": "裕",
    "st": 13,
    "m": "넉넉하다·풍요",
    "oh": "금"
  },
  {
    "r": "はじめ",
    "hj": "一",
    "st": 1,
    "m": "하나·으뜸",
    "oh": "수"
  },
  {
    "r": "いち",
    "hj": "市",
    "st": 5,
    "m": "저자·도시·번창",
    "oh": "금"
  },
  {
    "r": "たけし",
    "hj": "武",
    "st": 8,
    "m": "무인·굳셈",
    "oh": "화"
  },
  {
    "r": "いちか",
    "hj": "花",
    "st": 10,
    "m": "꽃·아름다움",
    "oh": "목"
  },
  {
    "r": "あん",
    "hj": "杏",
    "st": 7,
    "m": "살구·결실",
    "oh": "목"
  },
  {
    "r": "ゆい",
    "hj": "結",
    "st": 12,
    "m": "맺다·인연",
    "oh": "목"
  },
  {
    "r": "아이",
    "hj": "愛",
    "st": 13,
    "m": "사랑·덕망",
    "oh": "화"
  },
  {
    "r": "미오",
    "hj": "美",
    "st": 9,
    "m": "아름답다",
    "oh": "목"
  },
  {
    "r": "さき",
    "hj": "咲",
    "st": 9,
    "m": "꽃이 피다·번창",
    "oh": "목"
  },
  {
    "r": "めい",
    "hj": "芽",
    "st": 11,
    "m": "싹트다·성장",
    "oh": "목"
  },
  {
    "r": "いより",
    "hj": "依",
    "st": 8,
    "m": "의지하다·신뢰",
    "oh": "토"
  },
  {
    "r": "ほのか",
    "hj": "穂",
    "st": 15,
    "m": "벼이삭·풍요",
    "oh": "목"
  },
  {
    "r": "かおり",
    "hj": "香",
    "st": 9,
    "m": "향기·덕망",
    "oh": "수"
  },
  {
    "r": "ころも",
    "hj": "衣",
    "st": 6,
    "m": "옷·보호",
    "oh": "토"
  },
  {
    "r": "あかね",
    "hj": "朱",
    "st": 6,
    "m": "붉은빛·태양",
    "oh": "화"
  },
  {
    "r": "まり",
    "hj": "莉",
    "st": 13,
    "m": "말리꽃",
    "oh": "목"
  },
  {
    "r": "ねお",
    "hj": "音",
    "st": 9,
    "m": "소리·조화",
    "oh": "토"
  },
  {
    "r": "さ나",
    "hj": "紗",
    "st": 10,
    "m": "비단실·정교함",
    "oh": "목"
  },
  {
    "r": "なな",
    "hj": "奈",
    "st": 8,
    "m": "부처님 이름·자비",
    "oh": "화"
  },
  {
    "r": "りん",
    "hj": "凛",
    "st": 15,
    "m": "의연하다·차다",
    "oh": "금"
  },
  {
    "r": "つむぎ",
    "hj": "紬",
    "st": 11,
    "m": "실을 자다·직조",
    "oh": "목"
  },
  {
    "r": "けい",
    "hj": "圭",
    "st": 6,
    "m": "홀규·상서롭다",
    "oh": "토"
  },
  {
    "r": "れん",
    "hj": "鍊",
    "st": 17,
    "m": "단련하다",
    "oh": "금"
  },
  {
    "r": "しょう",
    "hj": "祥",
    "st": 11,
    "m": "복·상서롭다",
    "oh": "토"
  },
  {
    "r": "りょう",
    "hj": "亮",
    "st": 9,
    "m": "밝다·선명함",
    "oh": "화"
  },
  {
    "r": "かな",
    "hj": "叶",
    "st": 5,
    "m": "이루어지다·화합",
    "oh": "목"
  },
  {
    "r": "りお",
    "hj": "央",
    "st": 5,
    "m": "가운데·중심",
    "oh": "토"
  },
  {
    "r": "しん",
    "hj": "新",
    "st": 13,
    "m": "새롭다·혁신",
    "oh": "금"
  },
  {
    "r": "ちひろ",
    "hj": "千",
    "st": 3,
    "m": "일천·많다",
    "oh": "금"
  },
  {
    "r": "ひろ",
    "hj": "博",
    "st": 12,
    "m": "넓다·박식함",
    "oh": "수"
  },
  {
    "r": "けんと",
    "hj": "健",
    "st": 11,
    "m": "건강함·굳셈",
    "oh": "목"
  },
  {
    "r": "そら",
    "hj": "空",
    "st": 8,
    "m": "하늘·넓은 도량",
    "oh": "토"
  },
  {
    "r": "そら",
    "hj": "昊",
    "st": 8,
    "m": "하늘·광대함",
    "oh": "화"
  },
  {
    "r": "히나타",
    "hj": "日",
    "st": 4,
    "m": "해·태양",
    "oh": "화"
  },
  {
    "r": "히나타",
    "hj": "向",
    "st": 6,
    "m": "향하다·발전",
    "oh": "수"
  },
  {
    "r": "타쿠토",
    "hj": "拓",
    "st": 9,
    "m": "넓히다·개척",
    "oh": "화"
  },
  {
    "r": "야마토",
    "hj": "和",
    "st": 8,
    "m": "화목하다·조화",
    "oh": "화"
  },
  {
    "r": "미나토",
    "hj": "湊",
    "st": 13,
    "m": "모이다·항구",
    "oh": "수"
  },
  {
    "r": "유우세이",
    "hj": "勇",
    "st": 9,
    "m": "날쌔다·용맹",
    "oh": "토"
  },
  {
    "r": "유우세이",
    "hj": "星",
    "st": 9,
    "m": "별·빛나다",
    "oh": "화"
  },
  {
    "r": "타이세이",
    "hj": "泰",
    "st": 9,
    "m": "편안하다·크다",
    "oh": "수"
  },
  {
    "r": "타이세이",
    "hj": "成",
    "st": 7,
    "m": "이루다·완성",
    "oh": "금"
  },
  {
    "r": "코우세이",
    "hj": "煌",
    "st": 13,
    "m": "빛나다·성하다",
    "oh": "화"
  },
  {
    "r": "코우세이",
    "hj": "生",
    "st": 5,
    "m": "날생·활력",
    "oh": "목"
  },
  {
    "r": "요우타",
    "hj": "太",
    "st": 4,
    "m": "클태·풍요",
    "oh": "화"
  },
  {
    "r": "슌",
    "hj": "駿",
    "st": 17,
    "m": "준마·뛰어나다",
    "oh": "화"
  },
  {
    "r": "하야토",
    "hj": "隼",
    "st": 10,
    "m": "매·용맹함",
    "oh": "금"
  },
  {
    "r": "치히로",
    "hj": "尋",
    "st": 12,
    "m": "찾다·탐구하다",
    "oh": "화"
  },
  {
    "r": "소우타",
    "hj": "聡",
    "st": 14,
    "m": "총명하다·지혜",
    "oh": "화"
  },
  {
    "r": "류우",
    "hj": "竜",
    "st": 10,
    "m": "용·비상하다",
    "oh": "토"
  },
  {
    "r": "류우세이",
    "hj": "流",
    "st": 11,
    "m": "흐르다·소통",
    "oh": "수"
  },
  {
    "r": "레이",
    "hj": "怜",
    "st": 9,
    "m": "영리하다·맑다",
    "oh": "화"
  },
  {
    "r": "레이",
    "hj": "玲",
    "st": 10,
    "m": "옥소리·영롱함",
    "oh": "금"
  },
  {
    "r": "가쿠",
    "hj": "岳",
    "st": 8,
    "m": "큰산·굳건함",
    "oh": "토"
  },
  {
    "r": "하루토",
    "hj": "晴",
    "st": 12,
    "m": "개다·맑다·선명함",
    "oh": "화"
  },
  {
    "r": "아사히",
    "hj": "旭",
    "st": 6,
    "m": "아침 해 빛나다·광명",
    "oh": "목"
  },
  {
    "r": "렌",
    "hj": "廉",
    "st": 13,
    "m": "청렴하다·곧다·정직",
    "oh": "금"
  },
  {
    "r": "소우마",
    "hj": "蒼",
    "st": 16,
    "m": "푸르다·창공·무한함",
    "oh": "목"
  },
  {
    "r": "리쿠",
    "hj": "凌",
    "st": 10,
    "m": "능가하다·우뚝 솟다",
    "oh": "수"
  },
  {
    "r": "리쿠",
    "hj": "久",
    "st": 3,
    "m": "오래다·영원함",
    "oh": "화"
  },
  {
    "r": "히나",
    "hj": "菜",
    "st": 14,
    "m": "나물·채소·성장",
    "oh": "목"
  },
  {
    "r": "사키",
    "hj": "希",
    "st": 7,
    "m": "바라다·희망·귀하다",
    "oh": "화"
  },
  {
    "r": "코하루",
    "hj": "小",
    "st": 3,
    "m": "작다·정교하다",
    "oh": "금"
  },
  {
    "r": "사나",
    "hj": "那",
    "st": 11,
    "m": "어찌·아름답다",
    "oh": "토"
  },
  {
    "r": "니코",
    "hj": "二",
    "st": 2,
    "m": "둘·조화·상생",
    "oh": "화"
  },
  {
    "r": "니코",
    "hj": "子",
    "st": 3,
    "m": "자식·순수함·현명함",
    "oh": "수"
  },
  {
    "r": "유우",
    "hj": "優",
    "st": 17,
    "m": "넉넉하다·뛰어나다",
    "oh": "토"
  },
  {
    "r": "유즈",
    "hj": "柚",
    "st": 9,
    "m": "유자나무·결실·향기",
    "oh": "목"
  },
  {
    "r": "하루카",
    "hj": "遥",
    "st": 17,
    "m": "멀다·아득히 높다",
    "oh": "화"
  },
  {
    "r": "스즈",
    "hj": "鈴",
    "st": 13,
    "m": "방울·맑은 소리·명성",
    "oh": "금"
  },
  {
    "r": "스즈",
    "hj": "涼",
    "st": 12,
    "m": "서늘하다·맑다",
    "oh": "수"
  },
  {
    "r": "유카",
    "hj": "由",
    "st": 5,
    "m": "말미암다·근본",
    "oh": "토"
  },
  {
    "r": "유카",
    "hj": "佳",
    "st": 8,
    "m": "아름답다·좋다",
    "oh": "목"
  },
  {
    "r": "코토",
    "hj": "琴",
    "st": 13,
    "m": "거문고·예술재능",
    "oh": "금"
  },
  {
    "r": "코토",
    "hj": "乃",
    "st": 2,
    "m": "곧·이에·순리",
    "oh": "화"
  },
  {
    "r": "아야",
    "hj": "彩",
    "st": 11,
    "m": "채색·화려함·예술성",
    "oh": "금"
  },
  {
    "r": "아야",
    "hj": "綾",
    "st": 14,
    "m": "비단·정교하고 귀함",
    "oh": "금"
  },
  {
    "r": "미사",
    "hj": "沙",
    "st": 8,
    "m": "모래·여과·맑음",
    "oh": "수"
  },
  {
    "r": "마이",
    "hj": "舞",
    "st": 14,
    "m": "춤추다·예술재능·비상",
    "oh": "화"
  },
  {
    "r": "나오",
    "hj": "直",
    "st": 8,
    "m": "곧다·정직함·강직",
    "oh": "목"
  },
  {
    "r": "나오",
    "hj": "緒",
    "st": 14,
    "m": "실마리·이어지다",
    "oh": "금"
  },
  {
    "r": "리에",
    "hj": "理",
    "st": 12,
    "m": "이치·다스리다",
    "oh": "화"
  },
  {
    "r": "모모",
    "hj": "桃",
    "st": 10,
    "m": "복숭아나무·결실·화평",
    "oh": "목"
  },
  {
    "r": "모모",
    "hj": "百",
    "st": 6,
    "m": "일백·풍부함·가득참",
    "oh": "수"
  },
  {
    "r": "카나에",
    "hj": "鼎",
    "st": 13,
    "m": "솥·정립하다·안정",
    "oh": "화"
  },
  {
    "r": "시오리",
    "hj": "詩",
    "st": 13,
    "m": "시·문장력·감수성",
    "oh": "금"
  },
  {
    "r": "시오리",
    "hj": "織",
    "st": 18,
    "m": "짜다·조직력·직조",
    "oh": "금"
  }
];

window._C66_HANJA_ZH = [
  {
    "r": "jun",
    "hj": "俊",
    "st": 9,
    "m": "준걸·뛰어남",
    "oh": "목"
  },
  {
    "r": "jia",
    "hj": "佳",
    "st": 8,
    "m": "아름다움·훌륭함",
    "oh": "목"
  },
  {
    "r": "jian",
    "hj": "健",
    "st": 11,
    "m": "굳셈·건강·강인함",
    "oh": "목"
  },
  {
    "r": "qian",
    "hj": "謙",
    "st": 17,
    "m": "겸손함·덕망",
    "oh": "목"
  },
  {
    "r": "qing",
    "hj": "慶",
    "st": 15,
    "m": "경사스러움·축복",
    "oh": "목"
  },
  {
    "r": "gao",
    "hj": "高",
    "st": 10,
    "m": "높고 뛰어남·숭고함",
    "oh": "목"
  },
  {
    "r": "kuan",
    "hj": "寬",
    "st": 15,
    "m": "너그럽고 부유함·도량",
    "oh": "목"
  },
  {
    "r": "hao",
    "hj": "浩",
    "st": 11,
    "m": "넓고 클호·광대함",
    "oh": "수"
  },
  {
    "r": "han",
    "hj": "瀚",
    "st": 20,
    "m": "넓고큰바다한·무한함",
    "oh": "수"
  },
  {
    "r": "hong",
    "hj": "洪",
    "st": 10,
    "m": "큰물홍·넓고 풍요로움",
    "oh": "수"
  },
  {
    "r": "bo",
    "hj": "博",
    "st": 12,
    "m": "넓다·박식함·풍부함",
    "oh": "수"
  },
  {
    "r": "ming",
    "hj": "明",
    "st": 8,
    "m": "밝다·총명함·지혜",
    "oh": "화"
  },
  {
    "r": "hui",
    "hj": "輝",
    "st": 15,
    "m": "빛나다·광채·찬란함",
    "oh": "화"
  },
  {
    "r": "chen",
    "hj": "晨",
    "st": 11,
    "m": "새벽·시작의 광명",
    "oh": "화"
  },
  {
    "r": "xu",
    "hj": "旭",
    "st": 6,
    "m": "아침해빛나다·새로운 기상",
    "oh": "목"
  },
  {
    "r": "zhi",
    "hj": "智",
    "st": 12,
    "m": "지혜·총명·이성",
    "oh": "화"
  },
  {
    "r": "rui",
    "hj": "睿",
    "st": 14,
    "m": "공경할예·깊은 지혜",
    "oh": "금"
  },
  {
    "r": "ze",
    "hj": "澤",
    "st": 17,
    "m": "은혜택·연못·윤택함",
    "oh": "수"
  },
  {
    "r": "yu",
    "hj": "宇",
    "st": 6,
    "m": "집·우주·거대한 도량",
    "oh": "토"
  },
  {
    "r": "xuan",
    "hj": "軒",
    "st": 10,
    "m": "수레헌·높고 당당한 기상",
    "oh": "토"
  },
  {
    "r": "zi",
    "hj": "梓",
    "st": 11,
    "m": "가래나무·가문의 기둥·재목",
    "oh": "목"
  },
  {
    "r": "han",
    "hj": "涵",
    "st": 12,
    "m": "젖을함·포용력·깊은 학문",
    "oh": "수"
  },
  {
    "r": "yi",
    "hj": "奕",
    "st": 9,
    "m": "클혁·아름답고 당당함",
    "oh": "목"
  },
  {
    "r": "yi",
    "hj": "懿",
    "st": 22,
    "m": "아름다울의·정숙·고결함",
    "oh": "토"
  },
  {
    "r": "xin",
    "hj": "欣",
    "st": 8,
    "m": "기쁠신·활력·행복",
    "oh": "목"
  },
  {
    "r": "xin",
    "hj": "馨",
    "st": 20,
    "m": "향기형·멀리 퍼지는 덕망",
    "oh": "금"
  },
  {
    "r": "zi",
    "hj": "子",
    "st": 3,
    "m": "자식·순수함·인재의 근본",
    "oh": "수"
  },
  {
    "r": "ran",
    "hj": "然",
    "st": 12,
    "m": "그러할란·자연스러움·상생",
    "oh": "화"
  },
  {
    "r": "ting",
    "hj": "婷",
    "st": 12,
    "m": "예쁠정·우아하고 날씬함",
    "oh": "화"
  },
  {
    "r": "ya",
    "hj": "雅",
    "st": 12,
    "m": "우아하다·바르다·고결함",
    "oh": "목"
  },
  {
    "r": "wen",
    "hj": "文",
    "st": 4,
    "m": "글월·지혜·문화적 소양",
    "oh": "수"
  },
  {
    "r": "wu",
    "hj": "武",
    "st": 8,
    "m": "무인·굳셈·용맹과 결단력",
    "oh": "화"
  },
  {
    "r": "bin",
    "hj": "彬",
    "st": 11,
    "m": "빛나다·빛나고 아름다움",
    "oh": "목"
  },
  {
    "r": "xiang",
    "hj": "祥",
    "st": 11,
    "m": "상서롭다·복·길조",
    "oh": "목"
  },
  {
    "r": "kai",
    "hj": "凱",
    "st": 12,
    "m": "개선가·승리와 기쁨",
    "oh": "목"
  },
  {
    "r": "jie",
    "hj": "傑",
    "st": 12,
    "m": "뛰어나다·걸출함·영웅",
    "oh": "목"
  },
  {
    "r": "heng",
    "hj": "恒",
    "st": 10,
    "m": "항상·지조·흔들리지 않음",
    "oh": "목"
  },
  {
    "r": "cheng",
    "hj": "誠",
    "st": 14,
    "m": "정성·진실함·신뢰",
    "oh": "토"
  },
  {
    "r": "sheng",
    "hj": "聖",
    "st": 13,
    "m": "성스럽다·위대한 지혜",
    "oh": "토"
  },
  {
    "r": "sheng",
    "hj": "盛",
    "st": 12,
    "m": "성대하다·번창·번영",
    "oh": "금"
  },
  {
    "r": "wei",
    "hj": "偉",
    "st": 11,
    "m": "훌륭하다·클위·위대함",
    "oh": "토"
  },
  {
    "r": "wei",
    "hj": "衛",
    "st": 16,
    "m": "지킬위·보호·안정",
    "oh": "토"
  },
  {
    "r": "tian",
    "hj": "天",
    "st": 4,
    "m": "하늘·광대한 기상",
    "oh": "화"
  },
  {
    "r": "an",
    "hj": "安",
    "st": 6,
    "m": "편안하다·온화함·안정",
    "oh": "토"
  },
  {
    "r": "yuan",
    "hj": "源",
    "st": 14,
    "m": "근원·물줄기·무한한 복",
    "oh": "목"
  },
  {
    "r": "yun",
    "hj": "允",
    "st": 4,
    "m": "진실하다·허락하다·신뢰",
    "oh": "목"
  },
  {
    "r": "ren",
    "hj": "仁",
    "st": 4,
    "m": "어진마음·사랑·덕망",
    "oh": "목"
  },
  {
    "r": "yin",
    "hj": "寅",
    "st": 11,
    "m": "동방·인정많음·당당함",
    "oh": "목"
  },
  {
    "r": "yi",
    "hj": "一",
    "st": 1,
    "m": "하나·으뜸·독보적 존재",
    "oh": "목"
  },
  {
    "r": "zheng",
    "hj": "正",
    "st": 5,
    "m": "바르다·정직·정의",
    "oh": "목"
  },
  {
    "r": "zhu",
    "hj": "柱",
    "st": 9,
    "m": "기둥·대들보·중추",
    "oh": "목"
  },
  {
    "r": "lin",
    "hj": "林",
    "st": 8,
    "m": "수풀·번창·풍요로운 조화",
    "oh": "목"
  },
  {
    "r": "kang",
    "hj": "康",
    "st": 11,
    "m": "편안함·건강·안정",
    "oh": "화"
  },
  {
    "r": "ning",
    "hj": "寧",
    "st": 14,
    "m": "편안하다·아늑함·화평",
    "oh": "화"
  },
  {
    "r": "da",
    "hj": "達",
    "st": 16,
    "m": "통달하다·성공",
    "oh": "화"
  },
  {
    "r": "dun",
    "hj": "敦",
    "st": 12,
    "m": "도타우다·두터움·신의",
    "oh": "화"
  },
  {
    "r": "liang",
    "hj": "亮",
    "st": 9,
    "m": "밝다·깨끗함·총명",
    "oh": "화"
  },
  {
    "r": "li",
    "hj": "理",
    "st": 12,
    "m": "다스릴리·이치·보석",
    "oh": "화"
  },
  {
    "r": "lin",
    "hj": "臨",
    "st": 17,
    "m": "임하다·다스리다·지도력",
    "oh": "화"
  },
  {
    "r": "yang",
    "hj": "陽",
    "st": 17,
    "m": "볕·태양·무한한 양기",
    "oh": "화"
  },
  {
    "r": "rong",
    "hj": "榮",
    "st": 14,
    "m": "영화롭다·번영·최고명예",
    "oh": "화"
  },
  {
    "r": "ying",
    "hj": "映",
    "st": 9,
    "m": "비치다·주변을 조명하다",
    "oh": "화"
  },
  {
    "r": "yu",
    "hj": "煜",
    "st": 13,
    "m": "빛나다·귀하다·불꽃",
    "oh": "화"
  },
  {
    "r": "long",
    "hj": "隆",
    "st": 17,
    "m": "높다·성하다·지극히 번창",
    "oh": "화"
  },
  {
    "r": "jing",
    "hj": "晶",
    "st": 12,
    "m": "맑다·수정·선명한 광채",
    "oh": "화"
  },
  {
    "r": "zhen",
    "hj": "貞",
    "st": 9,
    "m": "곧다·정숙함·올바름",
    "oh": "화"
  },
  {
    "r": "zhao",
    "hj": "照",
    "st": 13,
    "m": "비추다·밝다·천하를 조명",
    "oh": "화"
  },
  {
    "r": "chan",
    "hj": "燦",
    "st": 17,
    "m": "빛나다·선명함·영광",
    "oh": "화"
  },
  {
    "r": "chang",
    "hj": "昌",
    "st": 8,
    "m": "창성하다·빛나다·번영",
    "oh": "화"
  },
  {
    "r": "che",
    "hj": "哲",
    "st": 10,
    "m": "밝다·지혜롭다·지혜의 근본",
    "oh": "화"
  },
  {
    "r": "xian",
    "hj": "炫",
    "st": 9,
    "m": "빛나다·밝다·눈부신 명성",
    "oh": "화"
  },
  {
    "r": "xian",
    "hj": "顯",
    "st": 23,
    "m": "나타나다·드러나다·입신양명",
    "oh": "화"
  },
  {
    "r": "xiong",
    "hj": "雄",
    "st": 12,
    "m": "수컷웅·영웅·당당한 기상",
    "oh": "목"
  },
  {
    "r": "wei",
    "hj": "威",
    "st": 9,
    "m": "위엄위·권위·명성",
    "oh": "토"
  },
  {
    "r": "hao",
    "hj": "昊",
    "st": 8,
    "m": "하늘·넓고 크다·광대함",
    "oh": "화"
  },
  {
    "r": "huan",
    "hj": "煥",
    "st": 13,
    "m": "빛나다·불꽃·빛나는 업적",
    "oh": "화"
  },
  {
    "r": "xiao",
    "hj": "曉",
    "st": 16,
    "m": "새벽·밝다·깨닫다",
    "oh": "화"
  },
  {
    "r": "xun",
    "hj": "薰",
    "st": 20,
    "m": "향풀·향기롭다·선한 영향",
    "oh": "화"
  },
  {
    "r": "yan",
    "hj": "彥",
    "st": 9,
    "m": "선비언·덕망과 학문",
    "oh": "목"
  },
  {
    "r": "qi",
    "hj": "祺",
    "st": 13,
    "m": "길할기·상서롭다·상길",
    "oh": "목"
  },
  {
    "r": "kun",
    "hj": "坤",
    "st": 8,
    "m": "땅곤·대지·포용력",
    "oh": "토"
  },
  {
    "r": "ji",
    "hj": "基",
    "st": 11,
    "m": "터·근본·흔들리지 않는 기반",
    "oh": "토"
  },
  {
    "r": "shuo",
    "hj": "碩",
    "st": 14,
    "m": "크다·클석·묵직한 덕망",
    "oh": "토"
  },
  {
    "r": "gui",
    "hj": "圭",
    "st": 6,
    "m": "서옥·홀규·상서로운 관직",
    "oh": "토"
  },
  {
    "r": "jun",
    "hj": "峻",
    "st": 10,
    "m": "높고 가파르다·엄숙·기상",
    "oh": "토"
  },
  {
    "r": "xuan",
    "hj": "宣",
    "st": 9,
    "m": "베풀다·널리 알리다·인덕",
    "oh": "토"
  },
  {
    "r": "ying",
    "hj": "瑛",
    "st": 14,
    "m": "옥빛·빛나는 옥",
    "oh": "토"
  },
  {
    "r": "zhou",
    "hj": "周",
    "st": 8,
    "m": "두루주·치밀함·조화",
    "oh": "금"
  },
  {
    "r": "lei",
    "hj": "磊",
    "st": 15,
    "m": "돌무더기뢰·당당하고 솔직함",
    "oh": "토"
  },
  {
    "r": "tao",
    "hj": "陶",
    "st": 16,
    "m": "질그릇도·도야하다·성숙",
    "oh": "토"
  },
  {
    "r": "mo",
    "hj": "墨",
    "st": 15,
    "m": "먹묵·학문과 깊은 지혜",
    "oh": "수"
  },
  {
    "r": "quan",
    "hj": "全",
    "st": 6,
    "m": "온전할전·완벽함·안정",
    "oh": "수"
  },
  {
    "r": "cheng",
    "hj": "城",
    "st": 10,
    "m": "성곽·가문을 지키는 방패",
    "oh": "토"
  },
  {
    "r": "ye",
    "hj": "野",
    "st": 11,
    "m": "들야·넓은 영토와 도량",
    "oh": "토"
  },
  {
    "r": "yao",
    "hj": "堯",
    "st": 12,
    "m": "요임금요·성인의 덕망",
    "oh": "토"
  },
  {
    "r": "yao",
    "hj": "曜",
    "st": 18,
    "m": "빛날요·천체의 빛·광명",
    "oh": "토"
  },
  {
    "r": "yin",
    "hj": "垠",
    "st": 9,
    "m": "지경은·끝없는 터전",
    "oh": "토"
  },
  {
    "r": "gang",
    "hj": "剛",
    "st": 10,
    "m": "굳세다·강인함·의지",
    "oh": "금"
  },
  {
    "r": "jing",
    "hj": "京",
    "st": 8,
    "m": "서울·높고 큼",
    "oh": "금"
  },
  {
    "r": "gao",
    "hj": "皐",
    "st": 11,
    "m": "언덕·연못가·안정",
    "oh": "금"
  },
  {
    "r": "guang",
    "hj": "廣",
    "st": 15,
    "m": "넓다·포용력·광대함",
    "oh": "금"
  },
  {
    "r": "qi",
    "hj": "琪",
    "st": 13,
    "m": "아름다운 옥",
    "oh": "금"
  },
  {
    "r": "nan",
    "hj": "男",
    "st": 7,
    "m": "사내·아들·굳건함",
    "oh": "금"
  },
  {
    "r": "duan",
    "hj": "端",
    "st": 14,
    "m": "단정하다·끝·바름",
    "oh": "금"
  },
  {
    "r": "lin",
    "hj": "璘",
    "st": 16,
    "m": "옥빛 광채",
    "oh": "금"
  },
  {
    "r": "ma",
    "hj": "馬",
    "st": 10,
    "m": "말·역동성·추진력",
    "oh": "금"
  },
  {
    "r": "wan",
    "hj": "萬",
    "st": 15,
    "m": "일만·영원함·풍요",
    "oh": "금"
  },
  {
    "r": "min",
    "hj": "敏",
    "st": 11,
    "m": "민첩하고 영리함",
    "oh": "금"
  },
  {
    "r": "ban",
    "hj": "班",
    "st": 10,
    "m": "반열·나누다",
    "oh": "금"
  },
  {
    "r": "bang",
    "hj": "邦",
    "st": 11,
    "m": "나라·국토",
    "oh": "금"
  },
  {
    "r": "bei",
    "hj": "裵",
    "st": 14,
    "m": "성씨·옷 긴 모양·화려함",
    "oh": "금"
  },
  {
    "r": "bai",
    "hj": "白",
    "st": 5,
    "m": "희다·결백함·순수",
    "oh": "금"
  },
  {
    "r": "bu",
    "hj": "步",
    "st": 7,
    "m": "걸음·진보·전진",
    "oh": "금"
  },
  {
    "r": "feng",
    "hj": "峰",
    "st": 10,
    "m": "산봉우리·최정상",
    "oh": "금"
  },
  {
    "r": "fu",
    "hj": "富",
    "st": 12,
    "m": "부유하다·풍요·자산",
    "oh": "금"
  },
  {
    "r": "fen",
    "hj": "分",
    "st": 4,
    "m": "나누다·명분·확실함",
    "oh": "금"
  },
  {
    "r": "shang",
    "hj": "商",
    "st": 11,
    "m": "장사·헤아리다·지혜",
    "oh": "금"
  },
  {
    "r": "xu",
    "hj": "序",
    "st": 7,
    "m": "차례·질서·정돈",
    "oh": "금"
  },
  {
    "r": "shi",
    "hj": "石",
    "st": 5,
    "m": "돌·단단함·굳건함",
    "oh": "금"
  },
  {
    "r": "xian",
    "hj": "仙",
    "st": 5,
    "m": "신선·초연함·숭고함",
    "oh": "금"
  },
  {
    "r": "shuo",
    "hj": "說",
    "st": 14,
    "m": "말하다·설명·언변지혜",
    "oh": "금"
  },
  {
    "r": "cheng",
    "hj": "成",
    "st": 7,
    "m": "이루다·완성·대업",
    "oh": "금"
  },
  {
    "r": "xiao",
    "hj": "小",
    "st": 3,
    "m": "작다·정교함·치밀함",
    "oh": "금"
  },
  {
    "r": "shao",
    "hj": "少",
    "st": 4,
    "m": "젊다·소령·활력",
    "oh": "금"
  },
  {
    "r": "song",
    "hj": "松",
    "st": 8,
    "m": "소나무·지조·절개",
    "oh": "금"
  },
  {
    "r": "xiu",
    "hj": "秀",
    "st": 7,
    "m": "빼어나다·수려함·천재",
    "oh": "금"
  },
  {
    "r": "shi",
    "hj": "市",
    "st": 5,
    "m": "저자·도시·번창",
    "oh": "금"
  },
  {
    "r": "xin",
    "hj": "辛",
    "st": 7,
    "m": "매우 신·새롭다·개혁",
    "oh": "금"
  },
  {
    "r": "xin",
    "hj": "心",
    "st": 4,
    "m": "마음·중심·핵심",
    "oh": "금"
  },
  {
    "r": "er",
    "hj": "兒",
    "st": 8,
    "m": "아이·순수함·생명력",
    "oh": "금"
  },
  {
    "r": "yan",
    "hj": "雁",
    "st": 12,
    "m": "기러기·신의·협동",
    "oh": "금"
  },
  {
    "r": "ru",
    "hj": "如",
    "st": 6,
    "m": "같다·유연함·순리",
    "oh": "금"
  },
  {
    "r": "yin",
    "hj": "銀",
    "st": 14,
    "m": "은 보석·빛나다·가치",
    "oh": "금"
  },
  {
    "r": "zai",
    "hj": "宰",
    "st": 10,
    "m": "재상·다스리다·지도자",
    "oh": "금"
  },
  {
    "r": "zu",
    "hj": "祖",
    "st": 10,
    "m": "할아버지·근본",
    "oh": "금"
  },
  {
    "r": "zhong",
    "hj": "鍾",
    "st": 17,
    "m": "쇠북·모으다·기념",
    "oh": "금"
  },
  {
    "r": "zhu",
    "hj": "珠",
    "st": 11,
    "m": "구슬·진주",
    "oh": "금"
  },
  {
    "r": "zhen",
    "hj": "鎭",
    "st": 18,
    "m": "진압하다·안정시키다",
    "oh": "금"
  },
  {
    "r": "jiang",
    "hj": "江",
    "st": 7,
    "m": "강·흐름·소통",
    "oh": "수"
  },
  {
    "r": "jing",
    "hj": "鏡",
    "st": 19,
    "m": "거울·모범·성찰",
    "oh": "수"
  },
  {
    "r": "qiao",
    "hj": "橋",
    "st": 16,
    "m": "다리·연결·화합",
    "oh": "수"
  },
  {
    "r": "qiu",
    "hj": "丘",
    "st": 5,
    "m": "언덕·마을·터전",
    "oh": "수"
  },
  {
    "r": "ju",
    "hj": "菊",
    "st": 14,
    "m": "국화·절개·고결",
    "oh": "수"
  },
  {
    "r": "quan",
    "hj": "權",
    "st": 22,
    "m": "권세·저울추·균형",
    "oh": "수"
  },
  {
    "r": "jin",
    "hj": "斤",
    "st": 4,
    "m": "도끼·단단함·의지",
    "oh": "수"
  },
  {
    "r": "qi",
    "hj": "奇",
    "st": 8,
    "m": "기이하다·뛰어남·천재성",
    "oh": "수"
  },
  {
    "r": "na",
    "hj": "娜",
    "st": 10,
    "m": "아리땁다·유연·우아",
    "oh": "수"
  },
  {
    "r": "dun",
    "hj": "頓",
    "st": 13,
    "m": "조아리다·갑자기·혁신",
    "oh": "수"
  },
  {
    "r": "luo",
    "hj": "羅",
    "st": 20,
    "m": "그물·포용·방대한 도량",
    "oh": "수"
  },
  {
    "r": "luo",
    "hj": "洛",
    "st": 10,
    "m": "강 이름·낙하·윤택",
    "oh": "수"
  },
  {
    "r": "lan",
    "hj": "蘭",
    "st": 23,
    "m": "난초·화평·순결",
    "oh": "수"
  },
  {
    "r": "lu",
    "hj": "露",
    "st": 20,
    "m": "이슬·순수·맑은 영혼",
    "oh": "수"
  },
  {
    "r": "lu",
    "hj": "祿",
    "st": 13,
    "m": "녹봉·복·자산",
    "oh": "수"
  },
  {
    "r": "lun",
    "hj": "論",
    "st": 15,
    "m": "논하다·의리·논리",
    "oh": "수"
  },
  {
    "r": "lou",
    "hj": "樓",
    "st": 15,
    "m": "다락·높은 집·성공",
    "oh": "수"
  },
  {
    "r": "li",
    "hj": "李",
    "st": 7,
    "m": "오얏나무·자두·결실",
    "oh": "수"
  },
  {
    "r": "lin",
    "hj": "鱗",
    "st": 23,
    "m": "비늘·보호·안정",
    "oh": "수"
  },
  {
    "r": "ma",
    "hj": "麻",
    "st": 11,
    "m": "삼·직조·조화",
    "oh": "수"
  },
  {
    "r": "man",
    "hj": "滿",
    "st": 14,
    "m": "가득 차다·완성",
    "oh": "수"
  },
  {
    "r": "bo",
    "hj": "波",
    "st": 9,
    "m": "물결·흐름·추진력",
    "oh": "수"
  },
  {
    "r": "pan",
    "hj": "潘",
    "st": 16,
    "m": "성씨·소용돌이·확장",
    "oh": "수"
  },
  {
    "r": "fan",
    "hj": "範",
    "st": 15,
    "m": "본보기·규범·귀감",
    "oh": "수"
  },
  {
    "r": "bian",
    "hj": "邊",
    "st": 22,
    "m": "가·끝·무한한 영토",
    "oh": "수"
  },
  {
    "r": "fu",
    "hj": "福",
    "st": 14,
    "m": "복·번창·축복",
    "oh": "수"
  },
  {
    "r": "ben",
    "hj": "本",
    "st": 5,
    "m": "근본·가치·초심",
    "oh": "수"
  },
  {
    "r": "feng",
    "hj": "奉",
    "st": 8,
    "m": "받들다·공헌·헌신",
    "oh": "수"
  },
  {
    "r": "bin",
    "hj": "賓",
    "st": 18,
    "m": "손님·귀빈·명예",
    "oh": "수"
  },
  {
    "r": "bing",
    "hj": "氷",
    "st": 5,
    "m": "얼음·깨끗함·결백",
    "oh": "수"
  },
  {
    "r": "shui",
    "hj": "水",
    "st": 4,
    "m": "물·지혜·유연함",
    "oh": "수"
  },
  {
    "r": "yuan",
    "hj": "淵",
    "st": 12,
    "m": "못·깊고 넓음·통찰",
    "oh": "수"
  },
  {
    "r": "yun",
    "hj": "雲",
    "st": 12,
    "m": "구름·높은 기상·이상",
    "oh": "수"
  },
  {
    "r": "hai",
    "hj": "海",
    "st": 11,
    "m": "바다·포용력·광대",
    "oh": "수"
  },
  {
    "r": "run",
    "hj": "潤",
    "st": 16,
    "m": "윤택하다·부유함",
    "oh": "수"
  },
  {
    "r": "ting",
    "hj": "廷",
    "st": 7,
    "m": "조정·곧음·당당함",
    "oh": "수"
  },
  {
    "r": "zheng",
    "hj": "政",
    "st": 9,
    "m": "정사·바르게 다스리다",
    "oh": "수"
  },
  {
    "r": "he",
    "hj": "河",
    "st": 9,
    "m": "물하·운하·소통",
    "oh": "수"
  },
  {
    "r": "xuan",
    "hj": "玄",
    "st": 5,
    "m": "검을현·심오한 지혜",
    "oh": "수"
  }
];

window._C66_HANJA_HK = [
  {
    "r": "gwong",
    "hj": "光",
    "st": 6,
    "m": "빛·광명·가문의 명예",
    "oh": "화"
  },
  {
    "r": "zeon",
    "hj": "俊",
    "st": 9,
    "m": "준걸·뛰어남·수려함",
    "oh": "목"
  },
  {
    "r": "gai",
    "hj": "啓",
    "st": 11,
    "m": "열다·지혜를 깨우치다",
    "oh": "목"
  },
  {
    "r": "zi",
    "hj": "梓",
    "st": 11,
    "m": "가래나무·가문의 기둥·재목",
    "oh": "목"
  },
  {
    "r": "hin",
    "hj": "軒",
    "st": 10,
    "m": "수레헌·당당하고 높은 기상",
    "oh": "토"
  },
  {
    "r": "hou",
    "hj": "浩",
    "st": 11,
    "m": "넓고 클호·광대함",
    "oh": "수"
  },
  {
    "r": "jin",
    "hj": "賢",
    "st": 15,
    "m": "어진 인재·현명함·덕망",
    "oh": "토"
  },
  {
    "r": "ga",
    "hj": "家",
    "st": 10,
    "m": "집가·가문의 중심·화합",
    "oh": "화"
  },
  {
    "r": "long",
    "hj": "朗",
    "st": 11,
    "m": "밝다·쾌활함·태양의 기운",
    "oh": "화"
  },
  {
    "r": "hei",
    "hj": "禧",
    "st": 17,
    "m": "복·상서로움·하늘의 축복",
    "oh": "토"
  },
  {
    "r": "lok",
    "hj": "樂",
    "st": 15,
    "m": "즐겁다·안락함·행복의 근본",
    "oh": "목"
  },
  {
    "r": "bok",
    "hj": "博",
    "st": 12,
    "m": "넓다·박식함·풍부한 학문",
    "oh": "수"
  },
  {
    "r": "goi",
    "hj": "凱",
    "st": 12,
    "m": "개선가·승리와 기쁨·영광",
    "oh": "목"
  },
  {
    "r": "git",
    "hj": "傑",
    "st": 12,
    "m": "뛰어나다·걸출함·영웅의 기상",
    "oh": "목"
  },
  {
    "r": "paak",
    "hj": "柏",
    "st": 10,
    "m": "측백나무·사철 푸른 지조·절개",
    "oh": "목"
  },
  {
    "r": "ngai",
    "hj": "毅",
    "st": 15,
    "m": "굳세다·강인함·타협 없는 의지",
    "oh": "목"
  },
  {
    "r": "gin",
    "hj": "健",
    "st": 11,
    "m": "굳셈·건강·강건함",
    "oh": "목"
  },
  {
    "r": "fung",
    "hj": "鋒",
    "st": 15,
    "m": "칼끝봉·예리한 결단력·추진력",
    "oh": "금"
  },
  {
    "r": "coek",
    "hj": "卓",
    "st": 8,
    "m": "높이 솟다·탁월함·으뜸",
    "oh": "목"
  },
  {
    "r": "naam",
    "hj": "南",
    "st": 9,
    "m": "남쪽·따뜻함·생명에너지",
    "oh": "화"
  },
  {
    "r": "jyu",
    "hj": "宇",
    "st": 6,
    "m": "집·우주·광대한 도량",
    "oh": "토"
  },
  {
    "r": "sing",
    "hj": "晟",
    "st": 11,
    "m": "밝게 빛나다·태양의 광채",
    "oh": "화"
  },
  {
    "r": "jiu",
    "hj": "耀",
    "st": 20,
    "m": "빛나다·가문과 조상을 빛내다",
    "oh": "화"
  },
  {
    "r": "zung",
    "hj": "宗",
    "st": 8,
    "m": "마루·근본·조상의 뿌리",
    "oh": "토"
  },
  {
    "r": "man",
    "hj": "文",
    "st": 4,
    "m": "글월·지혜·문화적 소양",
    "oh": "수"
  },
  {
    "r": "laap",
    "hj": "立",
    "st": 5,
    "m": "세우다·창조·기반확립",
    "oh": "화"
  },
  {
    "r": "san",
    "hj": "新",
    "st": 13,
    "m": "새롭다·혁신·진취성",
    "oh": "금"
  },
  {
    "r": "zi",
    "hj": "志",
    "st": 7,
    "m": "뜻·지향·원대한 목표",
    "oh": "화"
  },
  {
    "r": "gwok",
    "hj": "國",
    "st": 11,
    "m": "나라·국가·큰 터전",
    "oh": "목"
  },
  {
    "r": "ming",
    "hj": "明",
    "st": 8,
    "m": "밝다·총명함·통찰력",
    "oh": "화"
  },
  {
    "r": "fai",
    "hj": "輝",
    "st": 15,
    "m": "빛나다·광채·영광스러운 삶",
    "oh": "화"
  },
  {
    "r": "lung",
    "hj": "龍",
    "st": 16,
    "m": "용룡·최고의 권위와 기상",
    "oh": "토"
  },
  {
    "r": "zung",
    "hj": "頌",
    "st": 13,
    "m": "칭송하다·우러러봄·기념",
    "oh": "목"
  },
  {
    "r": "sing",
    "hj": "承",
    "st": 8,
    "m": "이를승·올바른 계승",
    "oh": "수"
  },
  {
    "r": "dou",
    "hj": "道",
    "st": 16,
    "m": "길·진리·바른 방향",
    "oh": "목"
  },
  {
    "r": "wai",
    "hj": "偉",
    "st": 11,
    "m": "훌륭하다·위대함·큰 인재",
    "oh": "토"
  },
  {
    "r": "leon",
    "hj": "倫",
    "st": 10,
    "m": "인륜·도리·윤리와 신뢰",
    "oh": "토"
  },
  {
    "r": "hang",
    "hj": "恒",
    "st": 10,
    "m": "항상·한결같은 지조",
    "oh": "목"
  },
  {
    "r": "jat",
    "hj": "逸",
    "st": 15,
    "m": "편안·뛰어남·초연함",
    "oh": "토"
  },
  {
    "r": "jyu",
    "hj": "裕",
    "st": 13,
    "m": "넉넉하다·풍요·자산의 축복",
    "oh": "금"
  },
  {
    "r": "cing",
    "hj": "晴",
    "st": 12,
    "m": "개다·맑다·선명하고 화창함",
    "oh": "화"
  },
  {
    "r": "dung",
    "hj": "彤",
    "st": 7,
    "m": "붉다·정성·일편단심의 마음",
    "oh": "화"
  },
  {
    "r": "ji",
    "hj": "綺",
    "st": 14,
    "m": "아름다운 비단 광채·수려함",
    "oh": "목"
  },
  {
    "r": "jau",
    "hj": "柔",
    "st": 9,
    "m": "부드럽다·유연함·화합",
    "oh": "목"
  },
  {
    "r": "sai",
    "hj": "茜",
    "st": 12,
    "m": "푸르고 화려한 식물·개화",
    "oh": "목"
  },
  {
    "r": "jiu",
    "hj": "瑤",
    "st": 15,
    "m": "아름다운 영롱한 옥·보석",
    "oh": "금"
  },
  {
    "r": "zi",
    "hj": "芷",
    "st": 10,
    "m": "지초·향기로운 풀·인덕",
    "oh": "목"
  },
  {
    "r": "kei",
    "hj": "琪",
    "st": 13,
    "m": "아름다운 보석 옥·존귀함",
    "oh": "금"
  },
  {
    "r": "lam",
    "hj": "琳",
    "st": 13,
    "m": "영롱하고 고결한 옥",
    "oh": "금"
  },
  {
    "r": "jyut",
    "hj": "玥",
    "st": 9,
    "m": "하늘이 내린 신성한 신주",
    "oh": "금"
  },
  {
    "r": "jin",
    "hj": "欣",
    "st": 8,
    "m": "기쁠흔·활력·행복",
    "oh": "목"
  },
  {
    "r": "man",
    "hj": "雯",
    "st": 12,
    "m": "구름무늬민·상서로운 구름",
    "oh": "수"
  },
  {
    "r": "sam",
    "hj": "心",
    "st": 4,
    "m": "마음심·중심·핵심",
    "oh": "금"
  },
  {
    "r": "jyu",
    "hj": "瑜",
    "st": 14,
    "m": "아름다운 보석 옥",
    "oh": "금"
  },
  {
    "r": "man",
    "hj": "敏",
    "st": 11,
    "m": "민첩하고 영리함",
    "oh": "금"
  },
  {
    "r": "pui",
    "hj": "佩",
    "st": 8,
    "m": "찰패·옥을 차듯 고결함",
    "oh": "금"
  },
  {
    "r": "wai",
    "hj": "蔚",
    "st": 17,
    "m": "울창할울·무성함·번창",
    "oh": "목"
  },
  {
    "r": "jyun",
    "hj": "婉",
    "st": 11,
    "m": "순종할완·우아하고 온화함",
    "oh": "토"
  },
  {
    "r": "wa",
    "hj": "華",
    "st": 14,
    "m": "빛날화·화려함·번영",
    "oh": "화"
  },
  {
    "r": "jing",
    "hj": "瑩",
    "st": 15,
    "m": "맑고 투명한 옥빛",
    "oh": "목"
  },
  {
    "r": "sz",
    "hj": "詩",
    "st": 13,
    "m": "시시·문장력·감수성",
    "oh": "금"
  },
  {
    "r": "mei",
    "hj": "美",
    "st": 9,
    "m": "아름답다·훌륭함",
    "oh": "목"
  },
  {
    "r": "bou",
    "hj": "寶",
    "st": 20,
    "m": "보배보·귀중함·자산",
    "oh": "금"
  },
  {
    "r": "suk",
    "hj": "淑",
    "st": 12,
    "m": "맑고 정숙함·인덕",
    "oh": "수"
  },
  {
    "r": "wai",
    "hj": "慧",
    "st": 15,
    "m": "슬기로울혜·지혜",
    "oh": "화"
  },
  {
    "r": "zing",
    "hj": "貞",
    "st": 9,
    "m": "곧다·정숙함·지조",
    "oh": "화"
  },
  {
    "r": "ting",
    "hj": "婷",
    "st": 12,
    "m": "예쁠정·우아한 자태",
    "oh": "화"
  },
  {
    "r": "ngaa",
    "hj": "雅",
    "st": 12,
    "m": "우아하다·바르다·고결함",
    "oh": "목"
  },
  {
    "r": "zing",
    "hj": "靜",
    "st": 16,
    "m": "고요할정·신중함·안정",
    "oh": "금"
  },
  {
    "r": "ji",
    "hj": "儀",
    "st": 15,
    "m": "거동의·올바른 법도",
    "oh": "금"
  },
  {
    "r": "jyut",
    "hj": "悅",
    "st": 11,
    "m": "기쁘고 즐거움",
    "oh": "금"
  },
  {
    "r": "ji",
    "hj": "依",
    "st": 8,
    "m": "의지하다·신뢰",
    "oh": "토"
  },
  {
    "r": "ling",
    "hj": "玲",
    "st": 10,
    "m": "보석의 맑은 소리",
    "oh": "목"
  },
  {
    "r": "ho",
    "hj": "可",
    "st": 5,
    "m": "옳다·가능하다",
    "oh": "토"
  },
  {
    "r": "gin",
    "hj": "堅",
    "st": 11,
    "m": "굳다·단단함",
    "oh": "토"
  },
  {
    "r": "ging",
    "hj": "景",
    "st": 12,
    "m": "경치·클경",
    "oh": "토"
  },
  {
    "r": "gwan",
    "hj": "坤",
    "st": 8,
    "m": "땅곤·대지",
    "oh": "토"
  },
  {
    "r": "gwo",
    "hj": "菓",
    "st": 14,
    "m": "과실·열매",
    "oh": "토"
  },
  {
    "r": "gok",
    "hj": "郭",
    "st": 15,
    "m": "성곽·둘레",
    "oh": "토"
  },
  {
    "r": "gei",
    "hj": "磯",
    "st": 17,
    "m": "물가돌·정착",
    "oh": "토"
  },
  {
    "r": "gei",
    "hj": "紀",
    "st": 9,
    "m": "벼리·벼슬기",
    "oh": "토"
  },
  {
    "r": "zaam",
    "hj": "湛",
    "st": 13,
    "m": "맑다·깊다",
    "oh": "토"
  },
  {
    "r": "dou",
    "hj": "嶋",
    "st": 14,
    "m": "섬도·터전",
    "oh": "토"
  },
  {
    "r": "lok",
    "hj": "落",
    "st": 15,
    "m": "떨어지다·마을",
    "oh": "토"
  },
  {
    "r": "leng",
    "hj": "嶺",
    "st": 17,
    "m": "고개·산맥",
    "oh": "토"
  },
  {
    "r": "mou",
    "hj": "戊",
    "st": 5,
    "m": "다섯째천간·무성함",
    "oh": "토"
  },
  {
    "r": "man",
    "hj": "岷",
    "st": 8,
    "m": "산이름민·굳건함",
    "oh": "토"
  },
  {
    "r": "paak",
    "hj": "栢",
    "st": 10,
    "m": "측백나무·사철푸름",
    "oh": "토"
  },
  {
    "r": "bik",
    "hj": "璧",
    "st": 18,
    "m": "둥근옥·완벽함",
    "oh": "토"
  },
  {
    "r": "sing",
    "hj": "城",
    "st": 10,
    "m": "성곽·보호체계",
    "oh": "토"
  },
  {
    "r": "zau",
    "hj": "岫",
    "st": 8,
    "m": "산동굴·포용력",
    "oh": "토"
  },
  {
    "r": "ngaam",
    "hj": "巖",
    "st": 23,
    "m": "바위암·굳건함",
    "oh": "토"
  },
  {
    "r": "joeng",
    "hj": "央",
    "st": 5,
    "m": "가운데·중심",
    "oh": "토"
  },
  {
    "r": "je",
    "hj": "野",
    "st": 11,
    "m": "들야·넓은도량",
    "oh": "토"
  },
  {
    "r": "zin",
    "hj": "筵",
    "st": 13,
    "m": "대자리·연회",
    "oh": "토"
  },
  {
    "r": "jim",
    "hj": "艶",
    "st": 19,
    "m": "고울염·아름다움",
    "oh": "토"
  }
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 10. 사주 오행 충돌·조화 한자
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
var SAJU_NAME_CONFLICT = {
  '목': {
    good: ['木','林','樹','草','春','仁','生','東','青','翠','楠','梅','松','竹','柳','桂'],
    bad:  ['金','鐵','剛','鋒','刃','斧','鑄','銀','鍛'],
    goodReason: '목(木) 오행 한자는 일간 에너지를 강화합니다',
    badReason:  '금(金) 오행 한자는 목극토→금극목으로 에너지 충돌'
  },
  '화': {
    good: ['火','炎','光','明','南','赤','日','燦','熙','煥','昇','炫'],
    bad:  ['水','海','江','河','淸','泳','洋','澤','潤'],
    goodReason: '화(火) 오행 한자는 일간 에너지와 조화',
    badReason:  '수(水) 오행 한자는 수극화로 직접 충돌'
  },
  '토': {
    good: ['土','地','山','岳','重','厚','信','誠','中','坤'],
    bad:  ['木','林','樹','草','春','仁'],
    goodReason: '토(土) 오행 한자는 안정·신뢰 에너지 강화',
    badReason:  '목(木) 오행 한자는 목극토로 에너지 충돌'
  },
  '금': {
    good: ['金','銀','鐵','剛','義','西','白','秋','鍾','鎬'],
    bad:  ['火','炎','光','明','南','赤'],
    goodReason: '금(金) 오행 한자는 강인함·의리 에너지 강화',
    badReason:  '화(火) 오행 한자는 화극금으로 에너지 충돌'
  },
  '수': {
    good: ['水','海','江','河','智','北','黑','玄','潤','澤'],
    bad:  ['土','地','山','岳','重','坤'],
    goodReason: '수(水) 오행 한자는 지혜·깊이 에너지 강화',
    badReason:  '토(土) 오행 한자는 토극수로 에너지 충돌'
  }
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 11. 국가별 통합 불용 매핑
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
window._C66_FORBID = {
  ko: window._C66_FORBID_KO,
  zh: window._C66_FORBID_KO + window._C66_FORBID_ZH_EXTRA,
  ja: window._C66_FORBID_KO + window._C66_FORBID_JA_EXTRA,
  hk: window._C66_FORBID_KO + window._C66_FORBID_ZH_EXTRA,
  vi: window._C66_FORBID_KO,
  // 영어권·기타: 한자 불용 해당없음, 특수문자(_C66_DANGER)만 적용
  en: '', de: '', fr: '', it: '', es: '', pt: '',
  nl: '', uk: '', ru: '', tr: '', id: '', ms: '',
  ph: '', hi: '', ar: '', th: ''
};

window._c66ForbidFor = function(country) {
  return (window._C66_FORBID && window._C66_FORBID[country]) || '';
};

/* ★C-68: 파일 밖(다른 스크립트)에서 접근할 수 있도록 window 에 노출 보장 */
(function(){
  try{
    var _n=['_C66_FORBID_KO','_C66_DANGER','_C66_FORBID_JA_EXTRA','_C66_FORBID_ZH_EXTRA',
            '_C66_THAI_WEEKDAY','_C66_NAKSHATRA','_C66_ARAB_VIRTUES','_C66_NAMES',
            '_C66_HANJA_JA','_C66_HANJA_ZH','_C66_HANJA_HK','_C66_FORBID'];
    for(var i=0;i<_n.length;i++){
      try{ if(window[_n[i]]===undefined && typeof eval(_n[i])!=='undefined') window[_n[i]]=eval(_n[i]); }catch(e){}
    }
    window._C66_GLOBAL_READY = true;
    try{ document.dispatchEvent(new Event('c66:ready')); }catch(e){}
  }catch(e){}
})();
