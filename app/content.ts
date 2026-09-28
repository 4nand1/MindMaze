import type { GlyphName, PuzzleArt } from "./ornaments";

// Site copy in both languages. MindMaze facts come from mindmaze.mn (EN "/" and MN "/mn").

// Mongolia's 21 aimags + the capital. Shapes live in mongolia-map.ts.
export const aimags = [
  { id: "bol", mn: "Баян-Өлгий", en: "Bayan-Ölgii" },
  { id: "uvs", mn: "Увс", en: "Uvs" },
  { id: "khu", mn: "Хөвсгөл", en: "Khövsgöl" },
  { id: "bul", mn: "Булган", en: "Bulgan" },
  { id: "sel", mn: "Сэлэнгэ", en: "Selenge" },
  { id: "kho", mn: "Ховд", en: "Khovd" },
  { id: "zav", mn: "Завхан", en: "Zavkhan" },
  { id: "ark", mn: "Архангай", en: "Arkhangai" },
  { id: "ork", mn: "Орхон", en: "Orkhon" },
  { id: "dar", mn: "Дархан-Уул", en: "Darkhan-Uul" },
  { id: "ub", mn: "Улаанбаатар", en: "Ulaanbaatar" },
  { id: "khe", mn: "Хэнтий", en: "Khentii" },
  { id: "dor", mn: "Дорнод", en: "Dornod" },
  { id: "gal", mn: "Говь-Алтай", en: "Govi-Altai" },
  { id: "bkh", mn: "Баянхонгор", en: "Bayankhongor" },
  { id: "uvu", mn: "Өвөрхангай", en: "Övörkhangai" },
  { id: "tov", mn: "Төв", en: "Töv" },
  { id: "gsu", mn: "Говьсүмбэр", en: "Govisümber" },
  { id: "suk", mn: "Сүхбаатар", en: "Sükhbaatar" },
  { id: "umn", mn: "Өмнөговь", en: "Ömnögovi" },
  { id: "dun", mn: "Дундговь", en: "Dundgovi" },
  { id: "dog", mn: "Дорноговь", en: "Dornogovi" },
];

// TODO(MindMaze): ids of the 5 aimags you work in, e.g. ["ub", "dar"] — they light up on the map.
export const provinces: string[] = [];

// Traditional Mongolian script (U+1800 block), rendered with Noto Sans Mongolian.
export const SKY = "ᠮᠥᠩᠬᠡ ᠬᠥᠬᠡ ᠲᠩᠷᠢ"; // Мөнх хөх тэнгэр
export const MONGOL = "ᠮᠣᠩᠭᠣᠯ ᠤᠯᠤᠰ"; // Монгол улс

const en = {
  nav: [
    ["#about", "about"],
    ["#puzzles", "puzzles"],
    ["#why", "why us"],
    ["#programs", "programs"],
    ["#impact", "impact"],
    ["#team", "team"],
  ] as [string, string][],
  studio: ["mindmaze mongolia", "traditional puzzles", "learnmaze — coming soon"],
  ring: "MINDMAZE • TRADITIONAL PUZZLES • CULTURAL HERITAGE • MONGOLIA • ",
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
    sky: "The eternal blue sky",
  },
  about: "About us",
  // Words in `true` chunks are set in the accent colour.
  statement: [
    ["We revive", false],
    ["traditional puzzles", true],
    ["to build", false],
    ["critical minds.", true],
  ] as [string, boolean][],
  aboutText: "Every puzzle starts with a single move. Slide the tiles and put the steppe back together — the same patience and logic our ancestors trained with wood and bone.",
  slide: { hint: "Tap a tile next to the gap", moves: "Moves", solved: "Solved in {n} moves!", reset: "Start over", tile: "Tile" },
  burr: {
    label: "Traditional puzzles",
    title: "Piece by",
    accent: "piece.",
    text: "Traditional puzzles train focus and critical thinking — one piece at a time.",
    caption: "Six-piece wooden puzzle",
  },
  why: {
    label: "Why MindMaze",
    title: "Cultural heritage,",
    accent: "modern learning.",
    more: "Read more",
    items: [
      {
        title: "Why?",
        glyph: "dots" as GlyphName,
        short: "Screens shrink attention spans. Puzzles grow them back.",
        tags: ["Focus over scrolling", "Learn at your own pace", "Made for digital natives"],
        text: "MindMaze was established to share and promote the educational values of Mongolian Traditional Puzzles. MindMaze team aims to mitigate the short attention span caused by the heavy usage of digital platforms among children with the puzzles and encourage asynchronous learning, scalable lessons, and support urban youth who are already digitally active.",
      },
      {
        title: "Importance",
        glyph: "curl" as GlyphName,
        short: "Our heritage, rebuilt as a tool for modern learning.",
        tags: ["Reviving traditional games", "Critical thinking", "Culture × education"],
        text: "Founded with the mission to revive traditional Mongolian games while fostering critical thinking, MindMaze combines cultural heritage with modern educational principles and redefines how cultural practices can serve as tools for modern learning.",
      },
    ],
  },
  // General Mongolian puzzle heritage (mongolianstore.com, amicusmongolia.com, ikon.mn) —
  // swap for the puzzles MindMaze teaches with.
  games: {
    title: "Games our",
    accent: "ancestors played.",
    intro: "Carved from wood and bone, Mongolian puzzles lock, interlock and untangle — tests of logic, patience and dexterity.",
    items: [
      { art: "burr" as PuzzleArt, name: "Six-piece puzzle", en: "", kind: "Interlocking", text: "Six notched wooden sticks lock into a single star — take it apart, then find the way back." },
      { art: "turtle" as PuzzleArt, name: "The turtle puzzle", en: "", kind: "Interlocking", text: "A carved turtle that comes apart piece by piece and goes back together." },
      { art: "lock" as PuzzleArt, name: "Puzzle lock", en: "", kind: "Lock", text: "A lock with a secret — find the hidden way to open it." },
      { art: "rings" as PuzzleArt, name: "Link the rings", en: "", kind: "Disentangling", text: "Join the rings — or separate them — while following the rules." },
      { art: "holes" as PuzzleArt, name: "Nine holes", en: "", kind: "Disentangling", text: "A disentangling game named for its nine holes — free the loop without cutting anything." },
      { art: "knot" as PuzzleArt, name: "Hobble knot", en: "", kind: "Disentangling", text: "A disentangling game named after the hobble tied on a horse's legs." },
    ],
  },
  // TODO(MindMaze): draft from the facts on this page — confirm the programs and their details.
  programs: {
    label: "Programs",
    title: "How we",
    accent: "teach.",
    items: [
      {
        art: "burr" as PuzzleArt,
        title: "School workshops",
        text: "Hands-on puzzle lessons with our partner schools. Students hear the story behind each puzzle, then solve it with their own hands.",
        points: ["12 partner schools", "5 aimags", "Run by trained school leads"],
      },
      {
        art: "rings" as PuzzleArt,
        title: "LearnMaze",
        text: "Our upcoming digital platform: self-paced puzzle lessons that fit into a screen-heavy day instead of competing with it.",
        points: ["Learn at your own pace", "Scalable lessons", "Coming soon"],
      },
      {
        art: "knot" as PuzzleArt,
        title: "University chapters",
        text: "Student-led chapters bring Mongolian puzzles to campuses abroad, starting with the University of Washington.",
        points: ["UW chapter", "Student leaders", "Mongolian diaspora"],
      },
      {
        art: "lock" as PuzzleArt,
        title: "Puzzle events",
        text: "Open sessions and friendly competitions where families and friends solve traditional puzzles together.",
        points: ["Open sessions", "Competitions", "All ages"],
      },
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
  footer: {
    line: "Mongolian traditional puzzles.",
    contact: "Contact",
    soon: "Coming soon",
    rights: "All rights reserved.",
    credit: "Hero photo: C Cai via Unsplash",
  },
};

const mn: typeof en = {
  nav: [
    ["#about", "бидний тухай"],
    ["#puzzles", "оньсон тоглоом"],
    ["#why", "яагаад бид"],
    ["#programs", "хөтөлбөр"],
    ["#impact", "хэрэгжилт"],
    ["#team", "баг"],
  ],
  studio: ["mindmaze mongolia", "оньсон тоглоом", "learnmaze — тун удахгүй"],
  ring: "MINDMAZE • ОНЬСОН ТОГЛООМ • СОЁЛЫН ӨВ • МОНГОЛ • ",
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
  aboutText: "Оньс бүр нэг алхмаас эхэлдэг. Хэсгүүдийг гулсуулж, тал нутгийн зургийг эвлүүлээрэй — өвөг дээдсийн маань мод, ясаар дадлагажуулсан тэр л тэвчээр, логик.",
  slide: { hint: "Хоосон нүдний хажуух хэсэг дээр дар", moves: "Алхам", solved: "{n} алхмаар тайллаа!", reset: "Дахин эхлэх", tile: "Хэсэг" },
  burr: {
    label: "Уламжлалт оньсон тоглоом",
    title: "Хэсэг",
    accent: "хэсгээр.",
    text: "Уламжлалт оньсон тоглоом анхаарал төвлөрөл, сэтгэн бодох чадварыг хэсэг бүрээр хөгжүүлнэ.",
    caption: "Зургаан модны оньс",
  },
  why: {
    label: "Яагаад MindMaze",
    title: "Соёлын өв,",
    accent: "орчин үеийн боловсрол.",
    more: "Дэлгэрэнгүй",
    items: [
      {
        title: "Яагаад?",
        glyph: "dots",
        short: "Дэлгэц анхаарлыг богиносгодог. Оньс түүнийг эргүүлэн сэргээнэ.",
        tags: ["Гүйлгэхээс илүү төвлөрөл", "Өөрийн хурдаар суралцах", "Дижитал үеийнхэнд зориулсан"],
        text: "MindMaze нь Монголын уламжлалт оньсон тоглоомуудын үнэ цэнийг түгээн сурталчлах, хүүхдийн анхаарал төвлөрөх чадварыг сайжруулах, өнөө үеийн хүүхэд, залууст тохиромжтой аргаар сургалтын чанарыг сайжруулах зорилгоор байгуулагдсан билээ.",
      },
      {
        title: "Ач холбогдол",
        glyph: "curl",
        short: "Соёлын өвөө орчин үеийн суралцах хэрэгсэл болгоно.",
        tags: ["Уламжлалт тоглоомыг сэргээх", "Сэтгэн бодох чадвар", "Соёл × боловсрол"],
        text: "Монголын уламжлалт тоглоомуудыг сэргээн хөгжүүлэхийн зэрэгцээ сэтгэн бодох чадварыг хөгжүүлэх зорилготой MindMaze нь соёлын өвийг орчин үеийн боловсролтой уялдуулан, уламжлалт тоглоомыг суралцах шинэ хэлбэр болгон хөгжүүлж байна.",
      },
    ],
  },
  games: {
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
  programs: {
    label: "Хөтөлбөр",
    title: "Бид хэрхэн",
    accent: "заадаг вэ.",
    items: [
      {
        art: "burr",
        title: "Сургуулийн сургалт",
        text: "Хамтрагч сургуулиуддаа оньсон тоглоомын дадлагат хичээл заадаг. Сурагчид оньс бүрийн түүхийг сонсоод, өөрсдийн гараар тайлдаг.",
        points: ["12 хамтрагч сургууль", "5 аймаг", "Бэлтгэгдсэн ахлагчид удирдана"],
      },
      {
        art: "rings",
        title: "LearnMaze",
        text: "Удахгүй нээгдэх цахим платформ: дэлгэцтэй өдөр тутамд өрсөлдөх бус, түүнд багтах өөрийн хурдаар үзэх оньсны хичээлүүд.",
        points: ["Өөрийн хурдаар", "Өргөжих боломжтой хичээл", "Тун удахгүй"],
      },
      {
        art: "knot",
        title: "Их сургуулийн салбарууд",
        text: "Оюутнуудын удирддаг салбарууд монгол оньсыг гадаадын их сургуулиудад түгээж байна. Эхнийх нь Вашингтоны их сургууль.",
        points: ["UW салбар", "Оюутан ахлагчид", "Гадаад дахь монголчууд"],
      },
      {
        art: "lock",
        title: "Оньсны арга хэмжээ",
        text: "Гэр бүл, найз нөхөд хамтдаа уламжлалт оньс тайлдаг нээлттэй уулзалт, нөхөрсөг тэмцээнүүд.",
        points: ["Нээлттэй уулзалт", "Тэмцээн", "Бүх насныхан"],
      },
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
  footer: {
    line: "Монгол уламжлалт оньсон тоглоом — Mongolian traditional puzzles.",
    contact: "Холбоо барих",
    soon: "Тун удахгүй",
    rights: "Бүх эрх хуулиар хамгаалагдсан.",
    credit: "Нүүр зураг: C Cai, Unsplash",
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
  src: "https://images.unsplash.com/photo-1760776679643-0e28cbcd4214?w=2400&q=80&fm=jpg",
  alt: "Traditional white gers on a vast green steppe beside a winding river",
  // Square crop for the sliding puzzle; CSS backgrounds load straight from Unsplash.
  square: "https://images.unsplash.com/photo-1760776679643-0e28cbcd4214?w=1200&h=1200&fit=crop&crop=bottom&q=80&fm=jpg",
};
