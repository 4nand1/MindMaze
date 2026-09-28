import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { Burr } from "./burr";
import { MONGOL, SKY, aimags, copy, heroImage, impactNumbers, phone, provinces, type Lang } from "./content";
import { MAP, MAP_VIEWBOX } from "./mongolia-map";
import { Menu } from "./menu";
import { NavLinks } from "./nav-links";
import { Corners, Defs, Glyph, Mark, PuzzleIcon, ToonoArt, type GlyphName } from "./ornaments";
import { SlidePuzzle } from "./slide-puzzle";
import { ToonoPuzzle } from "./toono-puzzle";

type T = (typeof copy)["en"];

const GLYPH_CYCLE: GlyphName[] = ["petals", "toono", "dots", "curl"];
const HOME: Record<Lang, string> = { en: "/", mn: "/mn" };
// Keyed by the English kind so a category gets the same colour in both languages.
const KIND_TONE: Record<string, string> = {
  Interlocking: "border-butter/50 bg-butter/15 text-butter",
  Lock: "border-sky/50 bg-sky/15 text-sky",
  Disentangling: "border-jade/50 bg-jade/15 text-jade",
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

function LangSwitch({ lang }: { lang: Lang }) {
  return (
    <div className="flex rounded-full border border-navy/20 p-0.5 text-[11px] font-semibold uppercase">
      {(Object.keys(HOME) as Lang[]).map((l, i) => (
        <a
          key={l}
          href={HOME[l]}
          hrefLang={l}
          aria-current={l === lang ? "page" : undefined}
          // Transparent 8px hit area via ::before; the two badges split the seam between them.
          className={`relative min-w-10 rounded-full px-3 py-2 text-center transition before:absolute before:-inset-y-2 ${
            i === 0 ? "before:-left-2 before:right-0" : "before:left-0 before:-right-2"
          } ${l === lang ? "bg-navy text-paper" : "text-navy/70 hover:text-navy"}`}
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

// About: the statement beside a sliding puzzle of the steppe — the site's idea, playable.
function Statement({ t }: { t: T }) {
  return (
    <section id="about" className="gutter py-24 md:py-36">
      <Label n="01">{t.about}</Label>
      <div className="grid items-center gap-12 md:grid-cols-[1fr_minmax(0,28rem)] md:gap-20">
        <div>
          <h2 className="reveal headline text-[clamp(2.4rem,6vw,6rem)]">
            {t.statement.map(([text, accent]) => (
              <span key={text} className={accent ? "slant text-cobalt" : ""}>
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
            className="reveal group relative flex flex-col gap-6 rounded-sm border border-sand bg-cream p-8 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgb(20_34_75/0.35)] md:p-10"
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

// Programs: a numbered accordion; only one opens at a time (details name=).
function Programs({ t }: { t: T }) {
  return (
    <section id="programs" className="gutter py-24 md:py-36">
      <Label n="04">{t.programs.label}</Label>
      <h2 className="reveal headline max-w-4xl text-[clamp(2.2rem,5.4vw,5rem)]">
        {t.programs.title} <span className="slant text-cobalt">{t.programs.accent}</span>
      </h2>
      <div className="mt-14 border-t border-navy/15">
        {t.programs.items.map((p, i) => (
          <details key={p.title} name="programs" style={vars({ i })} className="reveal group border-b border-navy/15">
            <summary className="flex cursor-pointer items-center gap-4 py-6 md:gap-8 md:py-8">
              <span className="w-8 text-xs tracking-[0.2em] text-navy/50">0{i + 1}</span>
              <PuzzleIcon name={p.art} className="size-9 shrink-0 text-deep transition duration-300 group-hover:text-cerulean md:size-11" />
              <span className="flex-1 text-2xl font-semibold uppercase tracking-tight md:text-4xl">{p.title}</span>
              <span
                aria-hidden
                className="grid size-10 shrink-0 place-items-center rounded-full border border-navy/25 text-xl transition duration-300 group-open:rotate-45 group-open:border-butter group-open:text-butter md:size-12"
              >
                +
              </span>
            </summary>
            <div className="grid gap-6 pb-10 md:grid-cols-[1fr_20rem] md:gap-16 md:pl-[calc(2rem+2.75rem+4rem)]">
              <p className="max-w-2xl text-navy/75 md:text-lg">{p.text}</p>
              <ul className="space-y-2 text-sm">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-center gap-3">
                    <span aria-hidden className="size-1.5 rounded-full bg-gold" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

// Too small to label on the map; their names show on hover.
const SMALL_AIMAGS = ["ub", "ork", "dar", "gsu"];

// The deep-blue band: numbers that count up, and a map of Mongolia's aimags.
function Impact({ t, lang }: { t: T; lang: Lang }) {
  return (
    <section id="impact" className="sky-band gutter pb-60 pt-56 text-bone">
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
        {t.team.title} <span className="slant text-cobalt">{t.team.accent}</span>
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

function Footer({ t }: { t: T }) {
  return (
    <footer className="mt-12 overflow-clip rounded-t-[2rem] border-t border-bone/15 bg-ink text-bone md:mt-20 md:rounded-t-[3rem]">
      <div aria-hidden className="alkhan alkhan-run h-6 text-sky/25" />
      <div className="gutter">
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4 md:py-20">
          <div>
            <p className="flex items-center gap-2.5 text-sm font-bold uppercase tracking-[0.2em]">
              <Mark className="size-6 text-sky" />
              MindMaze
            </p>
            <p className="mt-5 max-w-xs text-sm text-bone/65">{t.footer.line}</p>
          </div>
          <nav aria-label="Footer">
            <p className="mb-4 text-xs uppercase tracking-[0.22em] text-bone/55">{t.menu[0]}</p>
            <ul className="space-y-2 text-sm">
              {t.nav.map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="capitalize hover:text-butter">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.22em] text-bone/55">{t.footer.contact}</p>
            <a
            href={`tel:${phone.tel}`}
            className="inline-flex h-12 items-center rounded-2xl border border-bone/20 bg-bone/5 px-[18px] text-sm hover:text-butter md:-my-2 md:h-auto md:rounded-none md:border-0 md:bg-transparent md:px-0 md:py-2"
          >
              {phone.label}
            </a>
          </div>
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.22em] text-bone/55">LearnMaze</p>
            <p className="text-sm">{t.footer.soon}</p>
          </div>
        </div>
        <div aria-hidden className="flex items-end justify-between gap-4 border-t border-bone/15 pt-10">
          <p className="headline text-outline mark-fill select-none text-[13vw] leading-[0.8]">MindMaze</p>
          <p className="mongol mb-1 whitespace-nowrap text-2xl/[1.8] text-butter md:text-4xl/[1.8]">{MONGOL}</p>
        </div>
        <div className="mt-8 flex flex-col gap-2 border-t border-bone/15 py-6 text-xs text-bone/55 md:flex-row md:justify-between">
          <p>
            © {new Date().getFullYear()} MindMaze Mongolia. {t.footer.rights}
          </p>
          <p>{t.footer.credit}</p>
        </div>
      </div>
    </footer>
  );
}
