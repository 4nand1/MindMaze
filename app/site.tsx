import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { Burr } from "./burr";
import { MONGOL, SKY, aimags, copy, heroImage, impactNumbers, phone, provinces, ring, type Lang } from "./content";
import { Menu } from "./menu";
import { Corners, Defs, Glyph, Mark, PuzzleIcon, ToonoArt, type GlyphName } from "./ornaments";
import { ToonoPuzzle } from "./toono-puzzle";

type T = (typeof copy)["en"];

const GLYPH_CYCLE: GlyphName[] = ["petals", "toono", "dots", "curl"];
const HOME: Record<Lang, string> = { en: "/", mn: "/mn" };

// CSS custom props for staggered / counting animations in globals.css.
const vars = (v: Record<string, number>) => Object.fromEntries(Object.entries(v).map(([k, n]) => [`--${k}`, n])) as CSSProperties;

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("");

function Label({ n, children }: { n: string; children: ReactNode }) {
  return (
    <p className="reveal mb-10 flex items-center gap-3 border-b border-current/15 pb-4 text-xs font-medium uppercase tracking-[0.22em] md:mb-14">
      <Mark className="size-3.5" />
      <span className="opacity-70">
        {n} — {children}
      </span>
    </p>
  );
}

export function Site({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return (
    <div lang={lang}>
      <Defs />
      <div aria-hidden className="progress" />
      <Header t={t} lang={lang} />
      <main className="overflow-x-clip">
        <Hero t={t} />
        <div aria-hidden className="alkhan alkhan-run h-8 text-deep/30" />
        <Statement t={t} />
        <Puzzle t={t} />
        <Why t={t} />
        <Games t={t} />
        <Impact t={t} lang={lang} />
        <Team t={t} />
        <Contact t={t} />
      </main>
      <Footer t={t} />
    </div>
  );
}

function LangSwitch({ lang }: { lang: Lang }) {
  return (
    <div className="flex rounded-full border border-navy/20 p-0.5 text-[11px] font-semibold uppercase">
      {(Object.keys(HOME) as Lang[]).map((l) => (
        <a
          key={l}
          href={HOME[l]}
          hrefLang={l}
          aria-current={l === lang ? "page" : undefined}
          className={`rounded-full px-2.5 py-1 transition ${l === lang ? "bg-navy text-paper" : "text-navy/70 hover:text-navy"}`}
        >
          {l}
        </a>
      ))}
    </div>
  );
}

function Header({ t, lang }: { t: T; lang: Lang }) {
  return (
    <header className="nav fixed inset-x-0 top-0 z-50">
      <div className="gutter flex h-16 items-center justify-between gap-3 sm:gap-6 md:h-20">
        <a href="#top" className="flex items-center gap-2.5 py-2 text-sm font-bold uppercase tracking-[0.14em] sm:tracking-[0.2em]">
          <Mark className="size-6 text-cobalt" />
          MindMaze
        </a>
        <nav aria-label="Main" className="hidden gap-5 text-sm lg:flex">
          {t.nav.map(([href, label]) => (
            <a key={href} href={href} className="px-1 py-2 text-navy/70 decoration-cerulean underline-offset-8 transition hover:text-navy hover:underline">
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-5">
          <p className="hidden text-right text-[11px] font-semibold leading-tight xl:block">
            {t.studio[0]}
            <br />
            {t.studio[1]}
            <br />
            <span className="font-normal text-navy/55">{t.studio[2]}</span>
          </p>
          <LangSwitch lang={lang} />
          <Menu links={t.nav} labels={t.menu} />
        </div>
      </div>
    </header>
  );
}

// Pinned scene: MIND ◯ MAZE. Solve the toono (or just scroll) to fly up into the eternal blue sky.
function Hero({ t }: { t: T }) {
  return (
    <section id="top" className="hero-scene">
      <div className="hero-stage">
        <div className="hero-card">
          <div className="h-photo">
            <div className="h-photo-inner">
              <Image src={heroImage.src} alt={heroImage.alt} fill preload sizes="100vw" className="object-cover" />
            </div>
            <div className="h-shade absolute inset-0 bg-linear-to-t from-ink/80 via-ink/25 to-transparent" />
          </div>
          <ToonoPuzzle label={t.hero.ringLabel} hint={t.hero.hint} solved={t.hero.solved}>
            <ToonoArt ring={ring} spokes={false} className="absolute inset-0 size-full" />
          </ToonoPuzzle>
          <h1 aria-label="MindMaze" className="h-words headline lowercase text-navy">
            <span className="h-mind">
              <span className="in-l">mind</span>
            </span>
            <span className="h-maze">
              <span className="in-r">maze</span>
            </span>
          </h1>
          <div aria-hidden className="bar bar-top">
            <div />
          </div>
          <div className="bar bar-bot">
            <div>
              <div className="credits">
                <p className="hidden sm:block">{t.hero.tagline}</p>
                <a href="#about" className="skip -mr-2 ml-auto px-2 py-3">
                  {t.hero.skip} ↓
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="after-iris gutter flex flex-col justify-end bg-ink pb-12 pt-28 text-bone md:pb-16">
          <p className="mb-8 inline-flex w-fit items-center gap-3 rounded-full border border-bone/30 bg-ink/30 px-4 py-2 text-sm backdrop-blur-md">
            <span className="size-2.5 rounded-full bg-gold" />
            {t.hero.badge}
          </p>
          <div className="flex items-end gap-5 md:gap-8">
            <p lang="mn-Mong" title={t.hero.sky} className="mongol hidden whitespace-nowrap text-3xl/[1.8] text-gold sm:block md:text-5xl/[1.8]">
              {SKY}
            </p>
            <h2 className="headline text-[clamp(2.4rem,6vw,6.5rem)]">
              {t.hero.title}
              <br />
              <span className="slant text-gold">{t.hero.accent}</span>
            </h2>
          </div>
          <p className="mt-10 max-w-2xl border-t border-bone/25 pt-6 text-bone/90 md:text-lg">{t.hero.lead}</p>
        </div>
      </div>
    </section>
  );
}

// dari-style statement: pinned, each word lights up as you scroll.
function Statement({ t }: { t: T }) {
  const words = t.statement.flatMap(([text, accent]) => text.split(" ").map((w) => ({ w, accent })));
  return (
    <section id="about" className="st-scene">
      <div className="st-stage gutter">
        <Label n="01">{t.about}</Label>
        <p className="headline slant text-[clamp(2.6rem,8vw,8.5rem)]">
          {words.map(({ w, accent }, i) => (
            <span key={i} className={`st-word ${accent ? "text-cobalt" : ""}`} style={vars({ i })}>
              {w}{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}

// Pinned 3D scene: a six-piece wooden puzzle assembles itself as you scroll.
function Puzzle({ t }: { t: T }) {
  return (
    <section id="puzzle" className="burr-scene">
      <div className="burr-stage">
        <div aria-hidden className="burr-glow absolute inset-0 -z-10" />
        <Burr fallback={<PuzzleIcon name="burr" className="burr-canvas p-[18%] text-deep/50" />} />
        <div className="gutter relative w-full">
          <div className="max-w-[22rem]">
          <Label n="02">{t.burr.label}</Label>
          <h2 className="reveal headline text-[clamp(2.4rem,5.2vw,4.5rem)]">
            {t.burr.title}
            <br />
            <span className="slant text-cobalt">{t.burr.accent}</span>
          </h2>
          <p className="reveal mt-6 text-navy/70 md:text-lg">{t.burr.text}</p>
          </div>
        </div>
        <p className="absolute bottom-8 right-5 text-[11px] uppercase tracking-[0.22em] text-navy/55 md:right-12">{t.burr.caption}</p>
      </div>
    </section>
  );
}

function Why({ t }: { t: T }) {
  return (
    <section id="why" className="px-3 md:px-6">
      <div className="expand sky-card relative isolate mx-auto max-w-[96rem] overflow-hidden rounded-[2rem] px-5 py-20 text-bone md:rounded-[3rem] md:px-16 md:py-28">
        <Label n="03">{t.why.label}</Label>
        <h2 className="reveal headline max-w-4xl text-[clamp(2.2rem,5.4vw,5rem)]">
          {t.why.title} <span className="slant text-sky">{t.why.accent}</span>
        </h2>
        <div className="mt-16">
          {t.why.items.map((p, i) => (
            <article key={p.title} className="reveal grid items-center gap-10 border-t border-bone/15 py-14 md:grid-cols-[1fr_18rem] md:gap-16 md:py-20">
              <div>
                <p className="text-xs tracking-[0.25em] text-bone/50">0{i + 1}</p>
                <h3 className="mt-3 flex items-center gap-3 text-3xl font-semibold md:text-4xl">
                  <span className="size-3.5 rounded-full border-2 border-sky" />
                  {p.title}
                </h3>
                <p className="mt-6 max-w-2xl text-bone/75 md:text-lg">{p.text}</p>
              </div>
              <Glyph name={p.glyph} className="pillar-glyph mx-auto size-52 md:size-72" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// dari-style grid of line drawings: the traditional puzzles themselves.
function Games({ t }: { t: T }) {
  return (
    <section id="games" className="gutter py-24 md:py-36">
      <Label n="04">{t.games.label}</Label>
      <div className="grid gap-8 md:grid-cols-2 md:items-end">
        <h2 className="reveal headline text-[clamp(2.2rem,6vw,5.5rem)]">
          {t.games.title}
          <br />
          <span className="slant text-cobalt">{t.games.accent}</span>
        </h2>
        <p className="reveal max-w-md text-navy/70 md:justify-self-end md:text-lg">{t.games.intro}</p>
      </div>
      <div className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {t.games.items.map((g, i) => (
          <article
            key={g.name}
            style={vars({ i })}
            className="reveal group relative flex flex-col gap-6 rounded-sm border border-sand bg-cream p-8 transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgb(20_34_75/0.35)] md:p-10"
          >
            <Corners className="m-3 size-9 text-navy/25 transition duration-500 group-hover:text-cerulean" />
            <div className="flex items-start justify-between gap-4">
              <PuzzleIcon name={g.art} className="size-16 text-deep transition duration-700 group-hover:rotate-12 group-hover:text-cerulean" />
              <span className="rounded-full bg-butter px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-navy">{g.kind}</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold">{g.name}</h3>
              <p className="mt-1 text-sm text-cobalt">{g.en}</p>
            </div>
            <p className="text-navy/70">{g.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

// The deep-blue band: numbers that count up, and a tile map of Mongolia.
function Impact({ t, lang }: { t: T; lang: Lang }) {
  const other = copy[lang === "en" ? "mn" : "en"];
  return (
    <section id="impact" className="sky-band gutter pb-60 pt-56 text-bone">
      <Label n="05">{t.impact.label}</Label>
      <dl className="border-t border-bone/15">
        {impactNumbers.map((s, i) => (
          <div key={i} style={vars({ i })} className="reveal flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b border-bone/15 py-6 md:py-8">
            <dt className="ml-auto pb-2 text-right">
              <span className="headline block text-2xl md:text-5xl">{t.impact.units[i]}</span>
              <span className="mt-1 block text-sm text-sky md:text-base">{other.impact.units[i]}</span>
            </dt>
            <dd className="headline order-first text-[clamp(4.5rem,15vw,15rem)] leading-[0.8] tabular-nums">
              <span className="sr-only">
                {s.n}
                {s.suffix}
              </span>
              <span aria-hidden className="count" style={vars({ to: s.n })} />
              <span aria-hidden className="slant text-butter">
                {s.suffix}
              </span>
            </dd>
          </div>
        ))}
      </dl>
      <figure className="mt-20">
        <div className="mx-auto grid max-w-5xl grid-cols-9 gap-1 md:gap-2">
          {aimags.map((a) => {
            const on = provinces.includes(a.id);
            return (
              <div
                key={a.id}
                title={a[lang]}
                style={{ gridColumn: a.col + 1, gridRow: a.row + 1, ...vars({ i: a.col }) }}
                className={`reveal relative grid aspect-square place-items-center rounded-md border p-1 text-center ${
                  on ? "border-butter bg-butter text-navy" : "border-bone/20 text-bone/70"
                }`}
              >
                <span className="hidden text-[11px] font-medium leading-tight md:block lg:text-xs">{a[lang]}</span>
                {a.id === "ub" && <span aria-hidden className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-gold md:right-2 md:top-2" />}
              </div>
            );
          })}
        </div>
        <figcaption className="mx-auto mt-6 flex max-w-5xl items-center gap-3 text-sm text-bone/60">
          {provinces.length > 0 && <span aria-hidden className="size-3 rounded-sm bg-butter" />}
          {provinces.length > 0 ? t.impact.map : t.impact.mapAll}
        </figcaption>
      </figure>
    </section>
  );
}

function Team({ t }: { t: T }) {
  return (
    <section id="team" className="gutter py-24 md:py-36">
      <Label n="06">{t.team.label}</Label>
      <h2 className="reveal headline max-w-4xl text-[clamp(2.2rem,5.4vw,5rem)]">
        {t.team.title} <span className="slant text-cobalt">{t.team.accent}</span>
      </h2>
      <div className="mt-14 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {t.team.core.map((m, i) => (
          <figure key={m.name} style={vars({ i })} className="reveal group">
            <div className="sky-card relative grid aspect-[4/5] place-items-center overflow-hidden rounded-[1.75rem] text-bone">
              <Glyph
                name={GLYPH_CYCLE[i % GLYPH_CYCLE.length]}
                className="absolute size-[135%] opacity-40 transition duration-1000 group-hover:rotate-90 group-hover:opacity-70"
              />
              <Corners className="m-3 size-8 text-bone/50" />
              <span className="headline slant relative text-6xl md:text-7xl">{initials(m.name)}</span>
            </div>
            <figcaption className="mt-4">
              <p className="font-semibold md:text-lg">{m.name}</p>
              <p className="text-sm text-navy/60">{m.role}</p>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="mt-20 grid gap-6 md:grid-cols-[16rem_1fr]">
        <p className="text-xs uppercase tracking-[0.22em] text-navy/60">{t.team.leadsLabel}</p>
        <ul className="border-t border-navy/15">
          {t.team.leads.map((l, i) => (
            <li key={l.name} style={vars({ i })} className="reveal flex items-baseline justify-between gap-6 border-b border-navy/15 py-5">
              <span className="text-xl font-medium md:text-2xl">{l.name}</span>
              <span className="text-right text-sm text-navy/60">{l.role}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Contact({ t }: { t: T }) {
  return (
    <section id="contact" className="px-3 md:px-6">
      <div className="expand sky-card relative isolate mx-auto grid min-h-[80svh] max-w-[96rem] place-items-center overflow-hidden rounded-[2rem] px-6 py-24 text-center text-bone md:rounded-[3rem]">
        <ToonoArt className="pointer-events-none absolute left-1/2 top-1/2 -z-10 w-[120vmin] -translate-x-1/2 -translate-y-1/2 text-bone/10" />
        <Corners className="m-4 size-12 text-bone/50 md:m-6 md:size-16" />
        <div className="max-w-4xl">
          <p className="reveal text-xs uppercase tracking-[0.22em] text-bone/70">07 — {t.contact.label}</p>
          <h2 className="reveal headline mt-8 text-[clamp(2.6rem,7vw,7rem)]">
            {t.contact.title} <span className="slant text-butter">{t.contact.accent}</span>
          </h2>
          <a
            href={`tel:${phone.tel}`}
            className="reveal mt-12 inline-flex items-center gap-3 rounded-full bg-butter px-7 py-4 font-semibold text-navy transition hover:bg-bone"
          >
            {phone.label} <span aria-hidden>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer({ t }: { t: T }) {
  return (
    <footer className="sky-footer gutter overflow-x-clip pt-52 text-bone">
      <div className="grid gap-12 pb-16 sm:grid-cols-3">
        <div>
          <p className="flex items-center gap-2.5 text-sm font-bold uppercase tracking-[0.2em]">
            <Mark className="size-6 text-sky" />
            MindMaze
          </p>
          <p className="mt-5 max-w-xs text-sm text-bone/65">{t.footer.line}</p>
        </div>
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.22em] text-bone/55">{t.footer.contact}</p>
          <a href={`tel:${phone.tel}`} className="-my-2 inline-block py-2 text-sm hover:text-butter">
            {phone.label}
          </a>
        </div>
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.22em] text-bone/55">LearnMaze</p>
          <p className="text-sm">{t.footer.soon}</p>
        </div>
      </div>
      <div aria-hidden className="alkhan alkhan-run h-8 text-bone/20" />
      <div aria-hidden className="flex items-end justify-between gap-4 pt-10">
        <p className="headline text-outline mark-fill select-none text-[13vw] leading-[0.8]">MindMaze</p>
        <p className="mongol mb-1 whitespace-nowrap text-2xl/[1.8] text-butter md:text-4xl/[1.8]">{MONGOL}</p>
      </div>
      <div className="mt-8 flex flex-col gap-2 border-t border-bone/15 py-6 text-xs text-bone/55 md:flex-row md:justify-between">
        <p>
          © {new Date().getFullYear()} MindMaze Mongolia. {t.footer.rights}
        </p>
        <p>{t.footer.credit}</p>
      </div>
    </footer>
  );
}
