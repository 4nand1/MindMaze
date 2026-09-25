// Admin dashboard data.
// ponytail: tracking + a database aren't connected yet, so getDashboard returns clearly labelled
// demo data (demo: true). Replace its body with real queries once the database exists —
// the page only depends on the Dashboard shape below.

export const RANGES = { "7d": "7 хоног", "30d": "30 хоног", "90d": "90 хоног" } as const;
export type Range = keyof typeof RANGES;
const DAYS: Record<Range, number> = { "7d": 7, "30d": 30, "90d": 90 };

// Page sections in scroll order (the reach funnel).
export const SECTIONS = ["Нүүр", "Бидний тухай", "3D оньс", "Яагаад", "Тоглоомууд", "Хэрэгжилт", "Баг", "Холбоо барих"];

export type Share = { label: string; value: number }; // value = % of visitors
export type Kpis = { visitors: number; pageviews: number; avgSeconds: number; registrations: number; solveRate: number };

export type Session = {
  id: string;
  who: string | null; // name once the visitor registered, otherwise anonymous
  startedAt: Date;
  seconds: number;
  reached: number; // how many of SECTIONS they scrolled to
  source: string;
  device: string;
  country: string;
  lang: "MN" | "EN";
  solved: boolean; // solved the toono puzzle
};

export type Registration = { name: string; email: string; kind: "LearnMaze" | "Семинар"; detail: string; createdAt: Date };

export type Dashboard = {
  demo: boolean;
  range: Range;
  kpis: Kpis;
  prev: Kpis; // same-length period before, for deltas
  liveNow: number;
  daily: { date: Date; visitors: number }[];
  reach: Share[];
  sources: Share[];
  devices: Share[];
  languages: Share[];
  countries: Share[];
  sessions: Session[];
  registrations: Registration[];
};

export async function getDashboard(range: Range): Promise<Dashboard> {
  return demo(range);
}

// Seeded so the demo renders identically on every request.
const rng = (seed: number) => () => (seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296;

function demo(range: Range): Dashboard {
  const rand = rng(7);
  const days = DAYS[range];
  const DAY = 86_400_000;
  const today = new Date(new Date().setHours(0, 0, 0, 0));
  const visitorsOn = (i: number) => {
    const weekend = [0, 6].includes(new Date(today.getTime() - i * DAY).getDay());
    const spike = i % 17 === 3 ? 60 : 0; // a Facebook post now and then
    return Math.round((58 - i * 0.25) * (weekend ? 0.7 : 1) + spike + rand() * 18);
  };
  const daily = Array.from({ length: days }, (_, k) => {
    const i = days - 1 - k;
    return { date: new Date(today.getTime() - i * DAY), visitors: visitorsOn(i) };
  });
  const sum = daily.reduce((s, d) => s + d.visitors, 0);
  const prevSum = Array.from({ length: days }, (_, k) => visitorsOn(days + k)).reduce((s, v) => s + v, 0);
  const kpisFor = (total: number, lift: number): Kpis => ({
    visitors: Math.round(total * 0.82),
    pageviews: Math.round(total * 1.46),
    avgSeconds: Math.round(164 * lift),
    registrations: Math.round(total * 0.028 * lift),
    solveRate: 0.34 * lift,
  });

  const sources = ["Facebook", "Facebook", "Facebook", "Шууд", "Шууд", "Google", "Instagram"];
  const sessions: Session[] = Array.from({ length: 14 }, (_, i) => {
    const reached = 1 + Math.floor(rand() * SECTIONS.length);
    return {
      id: `#${Math.floor(rand() * 65536).toString(16).padStart(4, "0")}`,
      who: i === 2 || i === 9 ? `Жишээ хэрэглэгч ${i === 2 ? 1 : 2}` : null,
      startedAt: new Date(Date.now() - (i * 23 + rand() * 20) * 60_000),
      seconds: Math.round(20 + rand() * 60 * reached * 1.3),
      reached,
      source: sources[Math.floor(rand() * sources.length)],
      device: rand() < 0.72 ? "Утас" : rand() < 0.85 ? "Компьютер" : "Таблет",
      country: rand() < 0.88 ? "Монгол" : "АНУ",
      lang: rand() < 0.8 ? "MN" : "EN",
      solved: rand() < 0.34 + reached * 0.04,
    };
  });

  const registrations: Registration[] = Array.from({ length: 8 }, (_, i) =>
    i % 3 === 1
      ? {
          name: `Жишээ багш ${i + 1}`,
          email: `teacher${i + 1}@example.mn`,
          kind: "Семинар",
          detail: `Жишээ сургууль №${i + 4} · ${["Дархан-Уул", "Орхон", "Сэлэнгэ"][i % 3]} · ${24 + i * 3} хүүхэд`,
          createdAt: new Date(Date.now() - (i * 1.7 + 0.2) * DAY),
        }
      : {
          name: `Жишээ хэрэглэгч ${i + 1}`,
          email: `user${i + 1}@example.mn`,
          kind: "LearnMaze",
          detail: "Хүлээлгийн жагсаалт",
          createdAt: new Date(Date.now() - (i * 1.7 + 0.2) * DAY),
        },
  );

  return {
    demo: true,
    range,
    kpis: kpisFor(sum, 1),
    prev: kpisFor(prevSum, 0.9),
    liveNow: 3,
    daily,
    reach: SECTIONS.map((label, i) => ({ label, value: [100, 78, 61, 52, 44, 37, 29, 21][i] })),
    sources: [
      { label: "Facebook", value: 46 },
      { label: "Шууд", value: 23 },
      { label: "Google", value: 16 },
      { label: "Instagram", value: 9 },
      { label: "Бусад", value: 6 },
    ],
    devices: [
      { label: "Утас", value: 72 },
      { label: "Компьютер", value: 24 },
      { label: "Таблет", value: 4 },
    ],
    languages: [
      { label: "Монгол", value: 81 },
      { label: "Англи", value: 19 },
    ],
    countries: [
      { label: "Монгол", value: 87 },
      { label: "АНУ", value: 5 },
      { label: "Өмнөд Солонгос", value: 3 },
      { label: "Япон", value: 2 },
      { label: "Бусад", value: 3 },
    ],
    sessions,
    registrations,
  };
}
