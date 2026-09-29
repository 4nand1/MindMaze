import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { Burr } from "./burr";
import { SKY, aimags, copy, heroImage, impactNumbers, phone, provinces, type Lang } from "./content";
import { MAP, MAP_VIEWBOX } from "./mongolia-map";
import { LangSwitch } from "./lang-switch";
import { Menu } from "./menu";
import { NavLinks } from "./nav-links";
import { Corners, Defs, Glyph, Mark, PuzzleIcon, ToonoArt, type GlyphName } from "./ornaments";
import { SlidePuzzle } from "./slide-puzzle";
import { ToonoPuzzle } from "./toono-puzzle";

type T = (typeof copy)["en"];

const GLYPH_CYCLE: GlyphName[] = ["petals", "toono", "dots", "curl"];
// Keyed by the English kind so a category gets the same colour in both languages.
const KIND_TONE: Record<string, string> = {
  Interlocking: "border-amber/50 bg-amber/10 text-amber",
  Lock: "border-deep/40 bg-deep/10 text-deep",
  Disentangling: "border-[#1f7a52]/40 bg-[#1f7a52]/10 text-[#1f7a52]",
};

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
        <Marquee t={t} />
        {/* One nav target for the 3D puzzle and the games grid below it. */}
        <div id="puzzles">
          <Puzzle t={t} />
          <Games t={t} />
        </div>
        <Why t={t} />
        <Programs t={t} />
        <Impact t={t} lang={lang} />
        <Team t={t} />
      </main>
      <Footer t={t} />
    </div>
  );
}

function Header({ t, lang }: { t: T; lang: Lang }) {
  return (
    <header className="nav fixed inset-x-0 top-0 z-50">
      <div className="gutter flex h-16 items-center justify-between gap-3 sm:gap-6 md:h-20">
        <a
          href="#top"
          className="-mx-3 flex min-h-12 min-w-12 items-center gap-2.5 px-3 py-2 text-sm font-bold uppercase tracking-[0.14em] sm:tracking-[0.2em]"
        >
          <Mark className="size-6 text-cobalt" />
          MindMaze
        </a>
        <NavLinks links={t.nav} />
        <div className="flex items-center gap-4 sm:gap-5">
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
              <Image src={heroImage.src} alt={heroImage.alt} fill preload sizes="100vw" className="photo-skeleton object-cover" />
            </div>
            <div className="h-shade absolute inset-0 bg-linear-to-t from-ink/80 via-ink/25 to-transparent" />
          </div>
          <ToonoPuzzle label={t.hero.ringLabel} hint={t.hero.hint} solved={t.hero.solved}>
            <ToonoArt ring={t.ring} spokes={false} className="absolute inset-0 size-full" />
          </ToonoPuzzle>
          <h1 aria-label="MindMaze" className="h-words headline lowercase text-bone">
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

// About: the statement beside a sliding puzzle of the steppe — the site's idea, playable.
function Statement({ t }: { t: T }) {
  return (
    <section id="about" className="gutter py-24 md:py-36">
      <Label n="01">{t.about}</Label>
      <div className="grid items-center gap-12 md:grid-cols-[1fr_minmax(0,28rem)] md:gap-20">
        <div>
          <h2 className="reveal headline text-[clamp(2.4rem,6vw,6rem)]">
            {t.statement.map(([text, accent]) => (
              <span key={text} className={accent ? "slant text-saffron" : ""}>
                {text}{" "}
              </span>
            ))}
          </h2>
          <p className="reveal mt-8 max-w-xl text-navy/70 md:text-lg">{t.aboutText}</p>
        </div>
        <div className="reveal">
          <SlidePuzzle src={heroImage.square} labels={t.slide} />
        </div>
      </div>
    </section>
  );
}

// A band of puzzle names running sideways. Two copies so the loop is seamless.
function Marquee({ t }: { t: T }) {
  const run = (
    <div className="flex shrink-0 items-center">
      {t.games.items.map((g) => (
        <span key={g.name} className="flex items-center">
          <span className="headline px-6 text-[clamp(2rem,5vw,4.5rem)] md:px-10">{g.name}</span>
          <Mark className="size-6 shrink-0 text-gold md:size-8" />
        </span>
      ))}
    </div>
  );
  return (
    <div aria-hidden className="overflow-hidden border-y border-navy/10 py-6 md:py-8">
      <div className="marquee flex w-max">
        {run}
        {run}
      </div>
    </div>
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
        <div className="mt-16 grid gap-4 md:grid-cols-2">
          {t.why.items.map((p, i) => (
            <article
              key={p.title}
              style={vars({ i })}
              className="reveal group relative isolate flex flex-col overflow-hidden rounded-[1.75rem] border border-bone/15 bg-bone/5 p-7 transition duration-300 hover:border-sky/40 hover:bg-bone/10 md:p-10"
            >
              <Glyph name={p.glyph} className="pillar-glyph absolute -right-16 -top-16 -z-10 size-64 opacity-25 md:size-80" />
              <p className="headline text-7xl text-sky/30 md:text-8xl">0{i + 1}</p>
              <h3 className="mt-6 text-sm font-semibold uppercase tracking-[0.22em] text-sky">{p.title}</h3>
              <p className="mt-3 text-2xl font-semibold leading-snug md:text-3xl">{p.short}</p>
              <ul className="mt-8 flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <li key={tag} className="rounded-full border border-bone/20 px-3.5 py-1.5 text-sm text-bone/85">
                    {tag}
                  </li>
                ))}
              </ul>
              <details className="mt-auto pt-8">
                <summary className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-sky hover:text-bone">
                  {t.why.more} <span aria-hidden>+</span>
                </summary>
                <p className="pt-4 text-bone/70">{p.text}</p>
              </details>
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
    <section id="games" className="gutter pb-24 pt-12 md:pb-36 md:pt-16">
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
            className="reveal group relative flex flex-col gap-6 rounded-sm border border-sand bg-cream p-8 transition duration-300 hover:-translate-y-1 hover:border-cerulean/60 hover:shadow-[0_24px_48px_-24px_rgb(79_184_232/0.35)] md:p-10"
          >
            <Corners className="m-3 size-9 text-navy/25 transition duration-300 group-hover:text-cerulean" />
            <div className="flex items-start justify-between gap-4">
              <PuzzleIcon name={g.art} className="size-16 text-deep transition duration-300 group-hover:rotate-12 group-hover:text-cerulean" />
              <span className={`rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] ${KIND_TONE[copy.en.games.items[i].kind]}`}>
                {g.kind}
              </span>
            </div>
            <div>
              <h3 className="text-2xl font-bold">{g.name}</h3>
              {g.en && <p className="mt-1 text-sm text-cobalt">{g.en}</p>}
            </div>
            <p className="text-navy/70">{g.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

// Programs as a maze route: one right-angled path runs down the page and every program is a stop on it.
// The path draws itself and each stop lights up as you reach it (globals.css: .route-*).
function Programs({ t }: { t: T }) {
  return (
    <section id="programs" className="gutter py-24 md:py-36">
      <Label n="04">{t.programs.label}</Label>
      <h2 className="reveal headline max-w-4xl text-[clamp(2.2rem,5.4vw,5rem)]">
        {t.programs.title} <span className="slant text-saffron">{t.programs.accent}</span>
      </h2>
      <ol className="mt-16 md:mt-24">
        {t.programs.items.map((p, i) => {
          const left = i % 2 === 0;
          return (
            <li key={p.title} className="group grid grid-cols-[3rem_1fr] gap-x-5 md:grid-cols-[1fr_6rem_1fr] md:gap-x-0">
              <div aria-hidden className="relative md:col-start-2 md:row-start-1">
                <span className="route-line absolute inset-x-0 top-6 bottom-0 mx-auto w-px bg-navy/25 group-last:hidden" />
                <span
                  className={`absolute top-6 hidden h-px w-[calc(50%+3rem)] bg-navy/25 md:block ${left ? "right-1/2" : "left-1/2"}`}
                />
                <span className="route-stop headline relative mx-auto grid size-12 place-items-center border border-navy/30 bg-paper text-lg">
                  0{i + 1}
                </span>
              </div>
              <article
                className={`reveal pb-16 md:row-start-1 md:pb-28 ${left ? "md:col-start-1 md:pr-12 md:text-right" : "md:col-start-3 md:pl-12"}`}
              >
                <div className={`flex items-center gap-4 ${left ? "md:flex-row-reverse" : ""}`}>
                  <PuzzleIcon name={p.art} className="size-10 shrink-0 text-deep md:size-12" />
                  <h3 className="headline text-3xl md:text-5xl">{p.title}</h3>
                </div>
                <p className="mt-5 text-navy/75 md:text-lg">{p.text}</p>
                <ul className={`mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-navy/85 ${left ? "md:justify-end" : ""}`}>
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-2">
                      <span aria-hidden className="size-1.5 bg-gold" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

// Too small to label on the map; their names show on hover.
const SMALL_AIMAGS = ["ub", "ork", "dar", "gsu"];

// The deep-blue band: numbers that count up, and a map of Mongolia's aimags.
function Impact({ t, lang }: { t: T; lang: Lang }) {
  return (
    <section id="impact" className="sky-band gutter pb-40 pt-40 text-bone md:pb-60 md:pt-56">
      <Label n="05">{t.impact.label}</Label>
      <dl className="border-t border-bone/15">
        {impactNumbers.map((s, i) => (
          <div key={i} style={vars({ i })} className="reveal flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b border-bone/15 py-6 md:py-8">
            <dt className="ml-auto pb-2 text-right">
              <span className="headline block text-2xl md:text-5xl">{t.impact.units[i]}</span>
              {lang === "mn" && <span className="mt-1 block text-sm text-sky md:text-base">{copy.en.impact.units[i]}</span>}
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
        <svg viewBox={MAP_VIEWBOX} role="img" aria-label={provinces.length > 0 ? t.impact.map : t.impact.mapAll} className="reveal mx-auto w-full max-w-5xl">
          {aimags.map((a) => (
            <path
              key={a.id}
              d={MAP[a.id].d}
              fillRule="evenodd"
              className={`aimag ${provinces.includes(a.id) ? "fill-butter" : "fill-bone/5"}`}
            >
              <title>{a[lang]}</title>
            </path>
          ))}
          {aimags
            .filter((a) => !SMALL_AIMAGS.includes(a.id))
            .map((a) => (
              <text key={a.id} x={MAP[a.id].c[0]} y={MAP[a.id].c[1]} className="aimag-label hidden md:block">
                {a[lang]}
              </text>
            ))}
          <circle cx={MAP.ub.c[0]} cy={MAP.ub.c[1]} r="6" className="fill-gold" />
        </svg>
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
        {t.team.title} <span className="slant text-saffron">{t.team.accent}</span>
      </h2>
      <div className="mt-14 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {t.team.core.map((m, i) => (
          <figure key={m.name} style={vars({ i })} className="reveal group">
            <div className="sky-card relative grid aspect-[4/5] place-items-center overflow-hidden rounded-[1.75rem] text-bone">
              <Glyph
                name={GLYPH_CYCLE[i % GLYPH_CYCLE.length]}
                className="absolute size-[135%] opacity-40 transition duration-500 group-hover:rotate-90 group-hover:opacity-70"
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

// Compact footer: brand, links and contact on one band, legal line underneath.
function Footer({ t }: { t: T }) {
  return (
    <footer className="overflow-clip bg-navy text-bone">
      <div aria-hidden className="alkhan alkhan-run h-5 text-gold/40" />
      <div className="gutter">
        <div className="grid gap-8 py-10 md:grid-cols-[1fr_auto_auto] md:items-center md:gap-12 md:py-12">
          <div>
            <p className="flex items-center gap-2.5 text-sm font-bold uppercase tracking-[0.2em]">
              <Mark className="size-6 text-gold" />
              MindMaze
            </p>
            <p className="mt-2 text-sm text-bone/65">
              {t.footer.line} <span className="text-butter">LearnMaze — {t.footer.soon.toLowerCase()}</span>
            </p>
          </div>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
              {t.nav.map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="inline-block py-2 capitalize text-bone/80 transition hover:text-butter">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a
            href={`tel:${phone.tel}`}
            aria-label={`${t.footer.contact}: ${phone.label}`}
            className="inline-flex h-11 w-fit items-center rounded-full bg-gold px-5 text-sm font-semibold text-ink transition hover:bg-butter"
          >
            {phone.label}
          </a>
        </div>
        <div className="flex flex-col gap-1 border-t border-bone/15 py-5 text-xs text-bone/55 md:flex-row md:justify-between">
          <p>
            © {new Date().getFullYear()} MindMaze Mongolia. {t.footer.rights}
          </p>
          <p>{t.footer.credit}</p>
        </div>
      </div>
    </footer>
  );
}
