import type { GlyphName, PuzzleArt } from "./ornaments";

// Site copy in both languages. MindMaze facts come from mindmaze.mn (EN "/" and MN "/mn").

// Tile map of Mongolia: 21 aimags + the capital on a 9×4 grid, roughly west→east / north→south.
export const aimags = [
  { id: "bol", mn: "Баян-Өлгий", en: "Bayan-Ölgii", col: 0, row: 0 },
  { id: "uvs", mn: "Увс", en: "Uvs", col: 1, row: 0 },
  { id: "khu", mn: "Хөвсгөл", en: "Khövsgöl", col: 3, row: 0 },
  { id: "bul", mn: "Булган", en: "Bulgan", col: 4, row: 0 },
  { id: "sel", mn: "Сэлэнгэ", en: "Selenge", col: 5, row: 0 },
  { id: "kho", mn: "Ховд", en: "Khovd", col: 1, row: 1 },
  { id: "zav", mn: "Завхан", en: "Zavkhan", col: 2, row: 1 },
  { id: "ark", mn: "Архангай", en: "Arkhangai", col: 3, row: 1 },
  { id: "ork", mn: "Орхон", en: "Orkhon", col: 4, row: 1 },
  { id: "dar", mn: "Дархан-Уул", en: "Darkhan-Uul", col: 5, row: 1 },
  { id: "ub", mn: "Улаанбаатар", en: "Ulaanbaatar", col: 6, row: 1 },
  { id: "khe", mn: "Хэнтий", en: "Khentii", col: 7, row: 1 },
  { id: "dor", mn: "Дорнод", en: "Dornod", col: 8, row: 1 },
  { id: "gal", mn: "Говь-Алтай", en: "Govi-Altai", col: 2, row: 2 },
  { id: "bkh", mn: "Баянхонгор", en: "Bayankhongor", col: 3, row: 2 },
  { id: "uvu", mn: "Өвөрхангай", en: "Övörkhangai", col: 4, row: 2 },
  { id: "tov", mn: "Төв", en: "Töv", col: 5, row: 2 },
  { id: "gsu", mn: "Говьсүмбэр", en: "Govisümber", col: 6, row: 2 },
  { id: "suk", mn: "Сүхбаатар", en: "Sükhbaatar", col: 7, row: 2 },
  { id: "umn", mn: "Өмнөговь", en: "Ömnögovi", col: 4, row: 3 },
  { id: "dun", mn: "Дундговь", en: "Dundgovi", col: 5, row: 3 },
  { id: "dog", mn: "Дорноговь", en: "Dornogovi", col: 6, row: 3 },
];

// TODO(MindMaze): ids of the 5 aimags you work in, e.g. ["ub", "dar"] — they light up on the map.
export const provinces: string[] = [];

// Traditional Mongolian script (U+1800 block), rendered with Noto Sans Mongolian.
export const SKY = "ᠮᠥᠩᠬᠡ ᠬᠥᠬᠡ ᠲᠩᠷᠢ"; // Мөнх хөх тэнгэр
export const MONGOL = "ᠮᠣᠩᠭᠣᠯ ᠤᠯᠤᠰ"; // Монгол улс
export const ring = "MINDMAZE • ОНЬСОН ТОГЛООМ • TRADITIONAL PUZZLES • CULTURAL HERITAGE • ";

const en = {
  nav: [
    ["#about", "about"],
    ["#puzzle", "puzzle"],
    ["#games", "games"],
    ["#impact", "impact"],
    ["#team", "team"],
    ["#contact", "contact"],
  ] as [string, string][],
  studio: ["mindmaze mongolia", "оньсон тоглоом", "learnmaze — coming soon"],
  menu: ["Menu", "Close"] as [string, string],
  hero: {
    badge: "LearnMaze — coming soon",
    tagline: "Mongolian traditional puzzles",
    skip: "skip",
    hint: "Tap the rings to align the toono",
    solved: "Solved — look up.",
    ringLabel: "Turn ring",
    title: "Mongolian heritage,",
    accent: "one puzzle at a time.",
    lead: "MindMaze is a cultural anchor promoting Mongolian cultural heritage and cognitive exercises with traditional puzzle games.",
    sky: "Мөнх хөх тэнгэр — the eternal blue sky",
  },
  about: "About us",
  // Words in `true` chunks light up in sky blue.
  statement: [
    ["We revive", false],
    ["traditional puzzles", true],
    ["to build", false],
    ["critical minds.", true],
  ] as [string, boolean][],
  burr: {
    label: "The puzzle",
    title: "Piece by",
    accent: "piece.",
    text: "Traditional puzzles train focus and critical thinking — one piece at a time.",
    caption: "Зургаан модны оньс — six-piece wooden puzzle",
  },
  why: {
    label: "Why MindMaze",
    title: "Cultural heritage,",
    accent: "modern learning.",
    items: [
      {
        title: "Why?",
        glyph: "dots" as GlyphName,
        text: "MindMaze was established to share and promote the educational values of Mongolian Traditional Puzzles. MindMaze team aims to mitigate the short attention span caused by the heavy usage of digital platforms among children with the puzzles and encourage asynchronous learning, scalable lessons, and support urban youth who are already digitally active.",
      },
      {
        title: "Importance",
        glyph: "curl" as GlyphName,
        text: "Founded with the mission to revive traditional Mongolian games while fostering critical thinking, MindMaze combines cultural heritage with modern educational principles and redefines how cultural practices can serve as tools for modern learning.",
      },
    ],
  },
  // General Mongolian puzzle heritage (mongolianstore.com, amicusmongolia.com, ikon.mn) —
  // swap for the puzzles MindMaze teaches with.
  games: {
    label: "Traditional puzzles",
    title: "Games our",
    accent: "ancestors played.",
    intro: "Carved from wood and bone, Mongolian puzzles lock, interlock and untangle — tests of logic, patience and dexterity.",
    items: [
      { art: "burr" as PuzzleArt, name: "Зургаан модны оньс", en: "Six-piece puzzle", kind: "Interlocking", text: "Six notched wooden sticks lock into a single star — take it apart, then find the way back." },
      { art: "turtle" as PuzzleArt, name: "Шүтээн", en: "The turtle puzzle", kind: "Interlocking", text: "A carved turtle that comes apart piece by piece and goes back together." },
      { art: "lock" as PuzzleArt, name: "Оньсон цоож", en: "Puzzle lock", kind: "Lock", text: "A lock with a secret — find the hidden way to open it." },
      { art: "rings" as PuzzleArt, name: "Бөгж нийлүүлэх", en: "Link the rings", kind: "Disentangling", text: "Join the rings — or separate them — while following the rules." },
      { art: "holes" as PuzzleArt, name: "Есөн нүх", en: "Nine holes", kind: "Disentangling", text: "A disentangling game named for its nine holes — free the loop without cutting anything." },
      { art: "knot" as PuzzleArt, name: "Чөдрийн зангилаа", en: "Hobble knot", kind: "Disentangling", text: "A disentangling game named after the hobble tied on a horse's legs." },
    ],
  },
  impact: {
    label: "Implementation",
    units: ["provinces", "schools", "youth"],
    map: "5 of Mongolia's 21 aimags",
    mapAll: "Mongolia's 21 aimags and the capital",
  },
  team: {
    label: "Meet our team",
    title: "The people",
    accent: "behind the maze.",
    leadsLabel: "Chapter & school leads",
    core: [
      { name: "Anujin Ulziidelger", role: "Founder & President" },
      { name: "Erkhem Ganzorig", role: "Chief Technology Officer" },
      { name: "Nomu-Luun Olonbayar", role: "Director of Management" },
      { name: "Goomaral Amarbayar", role: "Editor in Chief" },
    ],
    leads: [
      { name: "Dulguun Uuganbaatar", role: "UW Chapter Leader" },
      { name: "Ichinbat Erkhembayar", role: "School administrator" },
      { name: "Munkhdalai Batbayar", role: "School administrator" },
      { name: "Bujinlkham Delgersaikhan", role: "School administrator" },
    ],
  },
  contact: { label: "Contact", title: "Let's solve it", accent: "together." },
  footer: {
    line: "Mongolian traditional puzzles — Монгол уламжлалт оньсон тоглоом.",
    contact: "Contact",
    soon: "Coming soon",
    rights: "All rights reserved.",
    credit: "Hero photo via Unsplash",
  },
};

const mn: typeof en = {
  nav: [
    ["#about", "бидний тухай"],
    ["#puzzle", "оньс"],
    ["#games", "тоглоомууд"],
    ["#impact", "хэрэгжилт"],
    ["#team", "баг"],
    ["#contact", "холбоо барих"],
  ],
  studio: ["mindmaze mongolia", "traditional puzzles", "learnmaze — тун удахгүй"],
  menu: ["Цэс", "Хаах"],
  hero: {
    badge: "LearnMaze — тун удахгүй",
    tagline: "Монгол уламжлалт оньсон тоглоом",
    skip: "алгасах",
    hint: "Цагирагуудыг дарж тоононы хээг тааруул",
    solved: "Тайллаа — дээшээ хар.",
    ringLabel: "Цагираг эргүүлэх",
    title: "Өвөг дээдсийн ухаан,",
    accent: "оньс бүрт.",
    lead: "MindMaze нь уламжлалт оньсон тоглоомуудаар дамжуулан Монголын соёлын өвийг сурталчлан таниулж, оюуны чадавхыг хөгжүүлэх соёлын тулгуур төв юм.",
    sky: "Мөнх хөх тэнгэр",
  },
  about: "Бидний тухай",
  statement: [
    ["Бид", false],
    ["уламжлалт оньсыг", true],
    ["сэргээж,", false],
    ["сэтгэх ухааныг", true],
    ["хөгжүүлнэ.", false],
  ],
  burr: {
    label: "Оньс",
    title: "Хэсэг",
    accent: "хэсгээр.",
    text: "Уламжлалт оньсон тоглоом анхаарал төвлөрөл, сэтгэн бодох чадварыг хэсэг бүрээр хөгжүүлнэ.",
    caption: "Зургаан модны оньс",
  },
  why: {
    label: "Яагаад MindMaze",
    title: "Соёлын өв,",
    accent: "орчин үеийн боловсрол.",
    items: [
      {
        title: "Яагаад?",
        glyph: "dots",
        text: "MindMaze нь Монголын уламжлалт оньсон тоглоомуудын үнэ цэнийг түгээн сурталчлах, хүүхдийн анхаарал төвлөрөх чадварыг сайжруулах, өнөө үеийн хүүхэд, залууст тохиромжтой аргаар сургалтын чанарыг сайжруулах зорилгоор байгуулагдсан билээ.",
      },
      {
        title: "Ач холбогдол",
        glyph: "curl",
        text: "Монголын уламжлалт тоглоомуудыг сэргээн хөгжүүлэхийн зэрэгцээ сэтгэн бодох чадварыг хөгжүүлэх зорилготой MindMaze нь соёлын өвийг орчин үеийн боловсролтой уялдуулан, уламжлалт тоглоомыг суралцах шинэ хэлбэр болгон хөгжүүлж байна.",
      },
    ],
  },
  games: {
    label: "Уламжлалт оньсон тоглоом",
    title: "Өвөг дээдсийн",
    accent: "тоглоом.",
    intro: "Мод, ясаар урласан монгол оньсон тоглоом түгжигдэж, холбогдож, салдаг — логик, тэвчээр, гарын уран чадварыг сорьдог.",
    items: [
      { art: "burr", name: "Зургаан модны оньс", en: "Six-piece puzzle", kind: "Холбоос", text: "Ховилтой зургаан мод нэг од болж түгжигдэнэ — салгаад, буцаан угсрах замаа ол." },
      { art: "turtle", name: "Шүтээн", en: "The turtle puzzle", kind: "Холбоос", text: "Хэсэг хэсгээрээ задарч, эргэн угсрагддаг яст мэлхийн сийлбэр." },
      { art: "lock", name: "Оньсон цоож", en: "Puzzle lock", kind: "Цоож", text: "Нууцтай цоож — онгойлгох далд аргыг нь ол." },
      { art: "rings", name: "Бөгж нийлүүлэх", en: "Link the rings", kind: "Салгах", text: "Дүрмээ баримтлан бөгжнүүдийг холбох, эсвэл салгах." },
      { art: "holes", name: "Есөн нүх", en: "Nine holes", kind: "Салгах", text: "Есөн нүхтэй салгах тоглоом — юу ч таслалгүй гогцоог чөлөөл." },
      { art: "knot", name: "Чөдрийн зангилаа", en: "Hobble knot", kind: "Салгах", text: "Морины чөдрөөс нэрээ авсан салгах тоглоом." },
    ],
  },
  impact: {
    label: "Хэрэгжилт",
    units: ["аймаг", "сургууль", "багачууд"],
    map: "Монголын 21 аймгаас 5",
    mapAll: "Монголын 21 аймаг, нийслэл",
  },
  team: {
    label: "Манай баг",
    title: "Оньсны цаадах",
    accent: "хүмүүс.",
    leadsLabel: "Салбарын ахлагчид",
    core: [
      { name: "Анужин Өлзийдэлгэр", role: "Үүсгэн байгуулагч" },
      { name: "Эрхэм Ганзориг", role: "Технологийн мэргэжилтэн" },
      { name: "Ному-Луун Олонбаяр", role: "UI & UX, Менежмент хариуцсан дарга" },
      { name: "Гоомарал Амарбаяр", role: "Салбар хариуцсан дарга" },
    ],
    leads: [
      { name: "Дөлгөөн Ууганбаатар", role: "Вашингтоны их сургуулийн салбарын ахлагч" },
      { name: "Ичинбат Эрхэмбаяр", role: "Салбар хариуцсан ахлагч" },
      { name: "Мөнхдалай Батбаяр", role: "Салбар хариуцсан ахлагч" },
      { name: "Бүжинлхам Дэлгэрсайхан", role: "Салбар хариуцсан ахлагч" },
    ],
  },
  contact: { label: "Холбоо барих", title: "Хамтдаа", accent: "тайлъя." },
  footer: {
    line: "Монгол уламжлалт оньсон тоглоом — Mongolian traditional puzzles.",
    contact: "Холбоо барих",
    soon: "Тун удахгүй",
    rights: "Бүх эрх хуулиар хамгаалагдсан.",
    credit: "Нүүр зураг: Unsplash",
  },
};

export const copy = { en, mn };
export type Lang = keyof typeof copy;

export const impactNumbers = [
  { n: 5, suffix: "" },
  { n: 12, suffix: "" },
  { n: 5000, suffix: "+" },
];

// mindmaze.mn lists no email yet (its email line reads "margaash boly"), so only the phone is shown.
export const phone = { label: "(+976) 95850420", tel: "+97695850420" };

// ponytail: the only photo, hotlinked from Unsplash — move to /public before launch.
export const heroImage = {
  src: "https://images.unsplash.com/photo-1575415868394-e3b78f3e9b3f?w=2400&q=80&fm=jpg",
  alt: "White gers on the golden steppe under a clear blue sky",
};
