import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Mark } from "../ornaments";
import { RANGES, SECTIONS, getDashboard, type Dashboard, type Range, type Share } from "./data";

// ponytail: not protected yet — add sign-in (Cloudflare Access or Clerk) before real data lands here.
export const metadata: Metadata = {
  title: "Админ — MindMaze",
  robots: { index: false, follow: false },
};

const num = (n: number) => Math.round(n).toLocaleString("en-US");
const pct = (n: number) => `${Math.round(n * 100)}%`;
const dur = (s: number) => `${Math.floor(s / 60)} мин ${Math.round(s % 60)} сек`;
const clock = (s: number) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, "0")}`;
const day = (d: Date) => `${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
const stamp = (d: Date) => `${day(d)} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ range?: string }> }) {
  const requested = (await searchParams).range;
  const range: Range = requested && requested in RANGES ? (requested as Range) : "30d";
  const d = await getDashboard(range);

  return (
    <div className="min-h-svh bg-paper text-navy">
      <header className="border-b border-navy/10 bg-cream">
        <div className="gutter flex h-16 items-center justify-between gap-4">
          <p className="flex items-center gap-2.5 text-sm font-bold uppercase tracking-[0.14em]">
            <Mark className="size-5 text-cobalt" />
            MindMaze <span className="font-medium normal-case tracking-normal text-navy/55">· Админ</span>
          </p>
          <Link href="/" className="rounded-full border border-navy/20 px-4 py-2 text-sm transition hover:bg-navy hover:text-paper">
            Сайт руу ↗
          </Link>
        </div>
      </header>

      <main className="gutter space-y-6 py-8 md:py-10">
        {d.demo && (
          <p className="rounded-2xl border border-gold/60 bg-butter/50 px-5 py-4 text-sm">
            <b>Жишээ өгөгдөл.</b> Tracking болон өгөгдлийн сан хараахан холбогдоогүй тул доорх тоонууд жишээ. Холбогдмогц энд жинхэнэ тоо гарна.
          </p>
        )}

        {/* One filter row: the date range scopes everything below. */}
        <nav aria-label="Хугацаа" className="flex flex-wrap items-center gap-2">
          {(Object.keys(RANGES) as Range[]).map((r) => (
            <a
              key={r}
              href={`?range=${r}`}
              aria-current={r === range ? "page" : undefined}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                r === range ? "bg-navy text-paper" : "border border-navy/15 bg-cream hover:border-navy/40"
              }`}
            >
              Сүүлийн {RANGES[r]}
            </a>
          ))}
          <span className="ml-auto flex items-center gap-2 text-sm text-navy/70">
            <span className="relative flex size-2.5">
              <span className="absolute inset-0 rounded-full bg-[#2e7d4f]/60 motion-safe:animate-ping" />
              <span className="relative size-2.5 rounded-full bg-[#2e7d4f]" />
            </span>
            Одоо сайтад <b className="text-navy">{d.liveNow}</b> хүн
          </span>
        </nav>

        <Kpis d={d} />

        <Card title="Өдөр тутмын зочид" note={`Сүүлийн ${RANGES[range]}`}>
          <Columns data={d.daily} />
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card title="Хэсэг бүрт хүрсэн зочид" note="Нүүрнээс доош гүйлгэсэн хувь">
            <Bars data={d.reach} />
          </Card>
          <Card title="Хаанаас ирсэн" note="Зочдын хувь">
            <Bars data={d.sources} />
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card title="Төхөөрөмж">
            <Bars data={d.devices} />
          </Card>
          <Card title="Хэл">
            <Bars data={d.languages} />
          </Card>
          <Card title="Улс">
            <Bars data={d.countries} />
          </Card>
        </div>

        <Card title="Хэн хэр удаан байсан" note="Сүүлийн зочид">
          <Table
            head={["Зочин", "Эхэлсэн", "Хугацаа", "Хүрсэн хэсэг", "Эх сурвалж", "Төхөөрөмж", "Улс", "Хэл", "Оньсого"]}
            rows={d.sessions.map((s) => [
              s.who ? <b key="w">{s.who}</b> : <span key="w" className="text-navy/60">Зочин {s.id}</span>,
              stamp(s.startedAt),
              clock(s.seconds),
              `${SECTIONS[s.reached - 1]} (${s.reached}/${SECTIONS.length})`,
              s.source,
              s.device,
              s.country,
              s.lang,
              s.solved ? "✓ Тайлсан" : "—",
            ])}
          />
        </Card>

        <Card
          title="Бүртгэлүүд"
          note={`${d.registrations.length} бүртгэл`}
          action={
            <a href="/admin/export" className="rounded-full bg-navy px-4 py-2 text-sm font-medium text-paper transition hover:bg-deep">
              CSV татах ↓
            </a>
          }
        >
          <Table
            head={["Огноо", "Төрөл", "Нэр", "И-мэйл", "Дэлгэрэнгүй"]}
            rows={d.registrations.map((r) => [
              stamp(r.createdAt),
              <span key="k" className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${r.kind === "Семинар" ? "bg-butter" : "bg-sky/60"}`}>
                {r.kind}
              </span>,
              r.name,
              r.email,
              r.detail,
            ])}
          />
        </Card>
      </main>
    </div>
  );
}

function Card({ title, note, action, children }: { title: string; note?: string; action?: ReactNode; children: ReactNode }) {
  return (
    <section className="rounded-3xl border border-sand bg-cream p-5 md:p-7">
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          {note && <p className="text-sm text-[#5d6f80]">{note}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

// Stat tiles: value + change vs the previous period (arrow + text, never colour alone).
function Kpis({ d }: { d: Dashboard }) {
  const tiles = [
    { label: "Зочид", value: num(d.kpis.visitors), cur: d.kpis.visitors, prev: d.prev.visitors },
    { label: "Хуудас үзэлт", value: num(d.kpis.pageviews), cur: d.kpis.pageviews, prev: d.prev.pageviews },
    { label: "Дундаж хугацаа", value: dur(d.kpis.avgSeconds), cur: d.kpis.avgSeconds, prev: d.prev.avgSeconds },
    { label: "Бүртгүүлсэн", value: num(d.kpis.registrations), cur: d.kpis.registrations, prev: d.prev.registrations },
    { label: "Оньсого тайлсан", value: pct(d.kpis.solveRate), cur: d.kpis.solveRate, prev: d.prev.solveRate },
  ];
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
      {tiles.map((t) => {
        const change = t.prev ? (t.cur - t.prev) / t.prev : 0;
        const up = change >= 0;
        return (
          <div key={t.label} className="rounded-3xl border border-sand bg-cream p-5">
            <p className="text-sm text-[#5d6f80]">{t.label}</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">{t.value}</p>
            <p className={`mt-2 text-sm font-medium ${up ? "text-[#2e7d4f]" : "text-[#b3412e]"}`}>
              {up ? "▲" : "▼"} {Math.abs(Math.round(change * 100))}%{" "}
              <span className="font-normal text-[#5d6f80]">өмнөх үеэс</span>
            </p>
          </div>
        );
      })}
    </div>
  );
}

// Column chart in plain HTML: one series, one colour, hover/focus readout per day,
// labels only on the peak and the latest day, and a table view for the numbers.
function Columns({ data }: { data: Dashboard["daily"] }) {
  const peak = Math.max(...data.map((d) => d.visitors));
  const top = Math.ceil(peak / 50) * 50;
  const last = data.length - 1;
  const peakAt = data.findIndex((d) => d.visitors === peak);
  return (
    <>
      <div className="relative h-60 pl-10">
        {[0, top / 2, top].map((t) => (
          <div key={t} className="absolute inset-x-0 border-t border-navy/10" style={{ bottom: `${(t / top) * 100}%` }}>
            <span className="absolute -top-2 left-0 text-[11px] tabular-nums text-[#5d6f80]">{t}</span>
          </div>
        ))}
        <div className="absolute inset-y-0 left-10 right-0 flex items-end gap-[2px]">
          {data.map((d, i) => (
            <div
              key={i}
              tabIndex={0}
              aria-label={`${day(d.date)}: ${d.visitors} зочин`}
              className="group relative flex h-full flex-1 items-end justify-center outline-none"
            >
              <div
                className="w-full max-w-6 rounded-t-[4px] bg-cobalt transition-colors group-hover:bg-navy group-focus-visible:bg-navy"
                style={{ height: `${(d.visitors / top) * 100}%` }}
              />
              {(i === last || i === peakAt) && (
                <span
                  className="absolute text-[11px] font-semibold tabular-nums group-hover:hidden"
                  style={{ bottom: `calc(${(d.visitors / top) * 100}% + 4px)` }}
                >
                  {d.visitors}
                </span>
              )}
              <span className="pointer-events-none absolute bottom-full z-10 mb-1 hidden whitespace-nowrap rounded-lg bg-navy px-2.5 py-1.5 text-xs text-paper group-hover:block group-focus-visible:block">
                <b>{d.visitors}</b> зочин · {day(d.date)}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2 flex justify-between pl-10 text-[11px] tabular-nums text-[#5d6f80]">
        <span>{day(data[0].date)}</span>
        <span>{day(data[Math.floor(last / 2)].date)}</span>
        <span>{day(data[last].date)}</span>
      </div>
      <details className="mt-4 text-sm">
        <summary className="cursor-pointer text-[#5d6f80] hover:text-navy">Хүснэгтээр харах</summary>
        <div className="mt-3 grid grid-cols-3 gap-x-6 gap-y-1 tabular-nums sm:grid-cols-5 lg:grid-cols-8">
          {data.map((d, i) => (
            <span key={i}>
              {day(d.date)} — <b>{d.visitors}</b>
            </span>
          ))}
        </div>
      </details>
    </>
  );
}

// Horizontal bars: one colour, value at the bar tip.
function Bars({ data }: { data: Share[] }) {
  return (
    <ul className="space-y-3">
      {data.map((s) => (
        <li key={s.label} className="grid grid-cols-[7.5rem_1fr_3rem] items-center gap-3 text-sm">
          <span className="truncate">{s.label}</span>
          <span className="h-3 rounded-r-[4px] bg-cobalt" style={{ width: `${s.value}%` }} />
          <span className="text-right font-semibold tabular-nums">{s.value}%</span>
        </li>
      ))}
    </ul>
  );
}

function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="-mx-5 overflow-x-auto px-5 md:-mx-7 md:px-7">
      <table className="w-full min-w-[44rem] text-left text-sm">
        <thead>
          <tr className="border-b border-navy/15 text-[#5d6f80]">
            {head.map((h) => (
              <th key={h} scope="col" className="whitespace-nowrap py-2 pr-4 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-navy/10 last:border-0">
              {r.map((c, j) => (
                <td key={j} className="whitespace-nowrap py-3 pr-4 tabular-nums">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
