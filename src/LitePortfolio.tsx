import React, { useMemo, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import {
  Activity,
  BarChart3,
  Bot,
  ChevronRight,
  Code,
  ExternalLink,
  Globe,
  Mail,
  Play,
} from 'lucide-react';

import {
  aboutLog,
  certificates,
  contactLinks,
  heroSubtitle,
  imageArtifacts,
  journeyParagraphs,
  profileStats,
  projectHighlights,
  proofCards,
  skillGroups,
  type Artifact,
  videoArtifacts,
} from './portfolio-content';
import type { ExperienceMode } from './experience-mode';

type LitePortfolioProps = {
  experienceMode: ExperienceMode;
  isMobileDevice: boolean;
};

const HERO_ACTION_BASE_CLASS =
  'inline-flex min-h-[4rem] w-full items-center justify-center rounded-full border-2 border-primary bg-primary px-8 py-4 text-center text-sm font-black uppercase tracking-[0.18em] text-background-dark transition-transform duration-300 hover:-translate-y-1 sm:w-auto sm:min-w-[15rem]';

const iconMap = {
  mail: Mail,
  resume: ExternalLink,
  work: ChevronRight,
};

function LiteSectionTitle({
  eyebrow,
  title,
  subtitle,
  experienceMode = 'simple',
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  experienceMode?: ExperienceMode;
}) {
  const isCompanyMode = experienceMode === 'company';

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className={`h-px w-12 ${isCompanyMode ? 'bg-white/20' : 'bg-primary'}`} />
        <p
          className={`text-[11px] font-black uppercase tracking-[0.32em] ${
            isCompanyMode ? 'text-sky-200' : 'text-primary'
          }`}
        >
          {eyebrow}
        </p>
      </div>
      <h2 className="text-4xl font-black uppercase tracking-tight text-white sm:text-5xl">{title}</h2>
      {subtitle ? (
        <p className={`max-w-3xl text-base leading-relaxed ${isCompanyMode ? 'text-slate-300' : 'text-slate-300'}`}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function LiteCard({
  children,
  className = '',
  experienceMode = 'simple',
}: {
  children: React.ReactNode;
  className?: string;
  experienceMode?: ExperienceMode;
}) {
  const isCompanyMode = experienceMode === 'company';

  return (
    <div
      className={`rounded-[2rem] border p-6 backdrop-blur-xl ${
        isCompanyMode
          ? 'border-white/8 bg-[linear-gradient(180deg,rgba(14,22,31,0.9)_0%,rgba(7,11,18,0.94)_100%)] shadow-[0_24px_80px_rgba(2,6,23,0.3)]'
          : 'border-white/10 bg-[linear-gradient(180deg,rgba(18,28,32,0.92)_0%,rgba(8,14,17,0.96)_100%)] shadow-[0_24px_80px_rgba(0,0,0,0.28)]'
      } ${className}`}
    >
      {children}
    </div>
  );
}

function ArtifactPlaceholder({
  project,
  onPreview,
  experienceMode = 'simple',
}: {
  project: Artifact;
  onPreview: () => void;
  experienceMode?: ExperienceMode;
}) {
  const isCompanyMode = experienceMode === 'company';

  return (
    <button
      type="button"
      onClick={onPreview}
      className={`group flex h-full min-h-[15rem] w-full flex-col items-center justify-center gap-4 rounded-[1.5rem] border p-6 text-center transition-colors ${
        isCompanyMode
          ? 'border-white/10 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),transparent_48%),linear-gradient(180deg,rgba(11,18,27,0.94)_0%,rgba(7,12,20,1)_100%)] hover:border-sky-300/40'
          : 'border-primary/20 bg-[radial-gradient(circle_at_top,rgba(6,249,249,0.12),transparent_55%),linear-gradient(180deg,rgba(5,12,14,0.92)_0%,rgba(5,9,11,1)_100%)] hover:border-primary/45'
      }`}
    >
      <div
        className={`flex size-14 items-center justify-center rounded-full border ${
          isCompanyMode
            ? 'border-sky-300/25 bg-sky-300/10 text-sky-200'
            : 'border-primary/30 bg-primary/10 text-primary'
        }`}
      >
        <Play className="size-6" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-white">{project.title}</p>
        <p className={`text-sm leading-relaxed ${isCompanyMode ? 'text-slate-300' : 'text-slate-400'}`}>
          Tap to load the video preview only when you need it.
        </p>
      </div>
    </button>
  );
}

function LiteArtifactCard({
  project,
  experienceMode = 'simple',
}: {
  project: Artifact;
  experienceMode?: ExperienceMode;
}) {
  const [loadVideo, setLoadVideo] = useState(false);
  const isCompanyMode = experienceMode === 'company';

  return (
    <LiteCard className="h-full" experienceMode={experienceMode}>
      <div className="mb-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] ${
              isCompanyMode
                ? 'border-sky-300/20 bg-sky-300/10 text-sky-200'
                : 'border-primary/20 bg-primary/10 text-primary'
            }`}
          >
            {tag}
          </span>
        ))}
      </div>

      <div
        className={`mb-6 overflow-hidden rounded-[1.5rem] border ${
          isCompanyMode ? 'border-white/8 bg-slate-950/40' : 'border-white/10 bg-black/30'
        }`}
      >
        {project.type === 'image' ? (
          <img
            src={project.src}
            alt={project.title}
            loading="lazy"
            className="aspect-[16/10] w-full object-contain bg-black/30"
          />
        ) : loadVideo ? (
          <video
            src={project.src}
            controls
            muted
            playsInline
            preload="metadata"
            className="aspect-[16/10] w-full bg-black object-contain"
          />
        ) : (
          <ArtifactPlaceholder
            project={project}
            onPreview={() => setLoadVideo(true)}
            experienceMode={experienceMode}
          />
        )}
      </div>

      <div className="space-y-3">
        <h3 className="text-2xl font-black uppercase tracking-tight text-white">{project.title}</h3>
        <p className={`text-sm leading-relaxed ${isCompanyMode ? 'text-slate-300' : 'text-slate-400'}`}>
          {project.role}
        </p>
      </div>
    </LiteCard>
  );
}

function ArtifactGroup({
  title,
  subtitle,
  items,
  experienceMode = 'simple',
}: {
  title: string;
  subtitle: string;
  items: Artifact[];
  experienceMode?: ExperienceMode;
}) {
  if (items.length === 0) {
    return null;
  }

  const isCompanyMode = experienceMode === 'company';

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-2xl font-black uppercase tracking-tight text-white">{title}</h3>
        <p className={`max-w-3xl text-sm leading-relaxed ${isCompanyMode ? 'text-slate-300' : 'text-slate-400'}`}>
          {subtitle}
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
          >
            <LiteArtifactCard project={item} experienceMode={experienceMode} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default function LitePortfolio({ experienceMode, isMobileDevice }: LitePortfolioProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });
  const isCompanyMode = experienceMode === 'company';
  const isCreativeLite = experienceMode === 'simple';

  const groupedArtifacts = useMemo(() => {
    const animationIds = new Set(['video-01', 'video-02', 'video-03', 'video-04', 'video-07', 'video-08']);
    const appIds = new Set(['video-05', 'video-06', 'image-01', 'image-02']);
    const webIds = new Set(['video-09', 'video-10', 'image-03', 'image-06', 'image-07', 'image-08', 'image-09', 'image-10']);
    const designIds = new Set(['image-04', 'image-05']);
    const allArtifacts = [...videoArtifacts, ...imageArtifacts];

    return {
      animation: allArtifacts.filter((artifact) => animationIds.has(artifact.id)),
      apps: allArtifacts.filter((artifact) => appIds.has(artifact.id)),
      web: allArtifacts.filter((artifact) => webIds.has(artifact.id)),
      design: allArtifacts.filter((artifact) => designIds.has(artifact.id)),
    };
  }, []);

  const pageClassName = isCompanyMode
    ? 'bg-[#07111a] text-white selection:bg-sky-300/30 selection:text-sky-50'
    : 'bg-background-dark text-white selection:bg-primary/30 selection:text-primary';

  const backdropGradientClassName = isCompanyMode
    ? 'absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.14),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(20,184,166,0.16),transparent_30%),linear-gradient(180deg,#0c1520_0%,#071018_100%)]'
    : 'absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(6,249,249,0.12),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.12),transparent_28%),linear-gradient(180deg,#071014_0%,#05090b_100%)]';

  const backdropPatternClassName = isCompanyMode
    ? 'absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.03)_0%,transparent_28%,transparent_72%,rgba(255,255,255,0.03)_100%),radial-gradient(circle,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100%_100%,26px_26px] opacity-35'
    : 'absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30';

  const navClassName = isCompanyMode
    ? 'fixed top-0 z-50 w-full border-b border-white/8 bg-[#09131c]/84 backdrop-blur-xl'
    : 'fixed top-0 z-50 w-full border-b border-white/5 bg-background-dark/75 backdrop-blur-xl';

  const emailButtonClassName = isCompanyMode
    ? 'rounded-full border border-white/10 bg-white/5 px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white transition-colors hover:border-sky-300/40 hover:bg-sky-300/12 hover:text-sky-50'
    : 'rounded-full border border-white/10 bg-white/5 px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white transition-colors hover:border-primary hover:bg-primary hover:text-background-dark';

  const heroBadgeClassName = isCompanyMode
    ? 'inline-flex items-center gap-2 rounded-full border border-sky-300/20 bg-sky-300/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-sky-100'
    : 'inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-primary';

  const notePanelClassName = isCompanyMode
    ? 'rounded-[1.5rem] border border-sky-300/15 bg-sky-300/8 p-5'
    : 'rounded-[1.5rem] border border-primary/15 bg-primary/8 p-5';

  const statCardClassName = isCompanyMode
    ? 'rounded-[1.5rem] border border-white/8 bg-white/[0.04] p-5'
    : 'rounded-[1.5rem] border border-white/10 bg-white/5 p-5';

  const secondaryNoteClassName = isCompanyMode
    ? 'rounded-[1.5rem] border border-white/8 bg-slate-950/30 p-5 text-sm leading-relaxed text-slate-300'
    : 'rounded-[1.5rem] border border-white/10 bg-black/20 p-5 text-sm leading-relaxed text-slate-300';

  const proofIconClassName = isCompanyMode ? 'text-sky-200' : 'text-primary';
  const modeLabel = isCompanyMode
    ? 'Company Presentation Mode'
    : isCreativeLite
      ? 'Lite Creative Mode'
      : 'Loading Immersive Mode';
  const heroBadgeLabel = isCompanyMode ? 'Company-Ready Lightweight Portfolio' : 'Mobile-Optimized Creative Portfolio';
  const performanceLabel = isCompanyMode ? 'Presentation Note' : 'Performance Note';
  const performanceCopy = isCompanyMode
    ? 'This version keeps the same projects and story, but uses a calmer professional backdrop, lighter visuals, and on-demand media loading for smoother browsing.'
    : 'This version keeps the same portfolio content but loads much less on mobile. Videos stay unloaded until tapped, and the 3D scene is kept out of the initial phone bundle.';
  const deviceCopy = isCompanyMode
    ? isMobileDevice
      ? 'You are seeing the company-ready lightweight presentation tuned for smoother performance and a calmer employer-facing look.'
      : 'This company-ready presentation is ideal when you want to share the portfolio with recruiters, hiring managers, or clients in a cleaner format.'
    : isMobileDevice
      ? 'You are seeing the lighter creative experience tuned for smoother phone performance.'
      : 'This lighter creative experience is also available on desktop whenever you want a cleaner, faster portfolio view.';

  return (
    <div className={pageClassName}>
      <motion.div className="fixed top-0 left-0 right-0 z-[90] h-1 origin-left bg-primary" style={{ scaleX }} />

      <div className="fixed inset-0 pointer-events-none opacity-100">
        <div className={backdropGradientClassName} />
        <div className={backdropPatternClassName} />
      </div>

      <nav className={navClassName}>
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-primary text-background-dark">
              <Code className="size-5" />
            </div>
            <div>
              <p className="text-lg font-black uppercase tracking-tight">ZIA.DEV</p>
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-500">
                {modeLabel}
              </p>
            </div>
          </div>
          <a
            href="mailto:luwiyeyz@gmail.com"
            className={emailButtonClassName}
          >
            Email Me
          </a>
        </div>
      </nav>

      <main className="relative z-10">
        <section className="px-6 pt-32 pb-20 md:pt-40">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
              <LiteCard className="overflow-hidden" experienceMode={experienceMode}>
                <div className="space-y-8">
                  <div className={heroBadgeClassName}>
                    <Activity className="size-4" />
                    {heroBadgeLabel}
                  </div>
                  <div className="space-y-5">
                    <h1 className="max-w-5xl text-5xl font-black uppercase leading-[0.88] tracking-tight sm:text-6xl lg:text-8xl">
                      {isCompanyMode ? (
                        <>
                          Software, Data, and Design <span className="text-primary">Portfolio</span>
                        </>
                      ) : (
                        <>
                          Architecting <span className="text-primary">Cyber</span> Realities
                        </>
                      )}
                    </h1>
                    <p className="max-w-2xl text-lg leading-relaxed text-slate-300">{heroSubtitle}</p>
                  </div>
                  <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                    {contactLinks.map(({ href, label, download }) => {
                      const Icon = iconMap[download ? 'resume' : label === 'View Projects' ? 'work' : 'mail'];
                      return (
                        <a key={label} href={href} download={download} className={HERO_ACTION_BASE_CLASS}>
                          <Icon className="mr-3 size-4" />
                          {label}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </LiteCard>

              <LiteCard className="h-full" experienceMode={experienceMode}>
                <div className="space-y-6">
                  <div className={notePanelClassName}>
                    <p
                      className={`text-[11px] font-black uppercase tracking-[0.28em] ${
                        isCompanyMode ? 'text-sky-100' : 'text-primary'
                      }`}
                    >
                      {performanceLabel}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300">
                      {performanceCopy}
                    </p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {profileStats.map((stat) => (
                      <div key={stat.label} className={statCardClassName}>
                        <p className="text-4xl font-black text-primary">{stat.value}</p>
                        <p className="mt-2 text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className={secondaryNoteClassName}>
                    {deviceCopy}
                  </div>
                </div>
              </LiteCard>
            </div>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto max-w-7xl space-y-10">
            <LiteSectionTitle
              eyebrow={isCompanyMode ? 'Professional Snapshot' : 'Proof Layer'}
              title="Core Strengths"
              subtitle={
                isCompanyMode
                  ? 'The same technical focus areas from the immersive portfolio, reframed in a cleaner company-facing presentation.'
                  : 'The same technical focus areas from the immersive portfolio, presented in a lighter creative layout.'
              }
              experienceMode={experienceMode}
            />
            <div className="grid gap-6 md:grid-cols-3">
              {[Bot, BarChart3, Globe].map((Icon, index) => (
                <motion.div
                  key={proofCards[index].title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <LiteCard className="h-full" experienceMode={experienceMode}>
                    <Icon
                      className={`mb-6 size-11 ${
                        index === 1 ? (isCompanyMode ? 'text-sky-200' : 'text-violet-400') : proofIconClassName
                      }`}
                    />
                    <h3 className="text-2xl font-black uppercase tracking-tight text-white">{proofCards[index].title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-slate-400">{proofCards[index].desc}</p>
                  </LiteCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="px-6 py-16">
          <div className="mx-auto max-w-7xl space-y-14">
            <LiteSectionTitle
              eyebrow={isCompanyMode ? 'Selected Work' : 'Artifact Index'}
              title="Digital Artifacts"
              subtitle="Selected course projects and self-initiated builds across animation, Android applications, web systems, dashboards, and visual design."
              experienceMode={experienceMode}
            />

            <ArtifactGroup
              title="Animation and Visual Storytelling"
              subtitle="Animated demos, educational concepts, and visualization pieces that communicate ideas through motion and digital media."
              items={groupedArtifacts.animation}
              experienceMode={experienceMode}
            />
            <ArtifactGroup
              title="Android Apps and Interactive Builds"
              subtitle="Mobile interfaces, Android Studio applications, and interactive work designed for hands-on user use."
              items={groupedArtifacts.apps}
              experienceMode={experienceMode}
            />
            <ArtifactGroup
              title="Websites and Platform Systems"
              subtitle="Figma-first prototypes and developed web platforms for campus systems, learning tools, sustainability, and barangay services."
              items={groupedArtifacts.web}
              experienceMode={experienceMode}
            />
            <ArtifactGroup
              title="Design Studies and Concepts"
              subtitle="Visual studies and concept explorations that shaped later interface and product work."
              items={groupedArtifacts.design}
              experienceMode={experienceMode}
            />
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto max-w-7xl space-y-10">
            <LiteSectionTitle
              eyebrow={isCompanyMode ? 'Portfolio Highlights' : 'Highlight Set'}
              title="Project Highlights"
              subtitle="A broader set of coursework, design builds, analytics work, and competition outputs."
              experienceMode={experienceMode}
            />
            <div className="grid gap-6 md:grid-cols-2">
              {projectHighlights.map((item) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <LiteCard className="h-full" experienceMode={experienceMode}>
                    <h3 className="text-xl font-black uppercase tracking-tight text-white">{item.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-slate-400">{item.desc}</p>
                  </LiteCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto max-w-5xl space-y-10">
            <LiteSectionTitle
              eyebrow="Credentials"
              title={isCompanyMode ? 'Professional Credentials' : 'Neural Credentials'}
              subtitle="TESDA certification and verified technical competency."
              experienceMode={experienceMode}
            />
            {certificates.map((certificate) => (
              <LiteCard key={certificate.title} experienceMode={experienceMode}>
                <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-center">
                  <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/30">
                    <img src={certificate.file} alt={certificate.title} loading="lazy" className="w-full object-contain" />
                  </div>
                  <div className="space-y-4">
                    <p className="text-[11px] font-black uppercase tracking-[0.28em] text-primary">{certificate.issuer}</p>
                    <h3 className="text-3xl font-black uppercase tracking-tight text-white">{certificate.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-400">
                      Verified technical competency with documented certification supporting practical technology skills.
                    </p>
                    <a
                      href={certificate.file}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-primary"
                    >
                      <ExternalLink className="size-4" />
                      Open Credential
                    </a>
                  </div>
                </div>
              </LiteCard>
            ))}
          </div>
        </section>

        <section id="stack" className="px-6 py-16">
          <div className="mx-auto max-w-7xl space-y-10">
            <LiteSectionTitle
              eyebrow={isCompanyMode ? 'Capability Map' : 'Stack Registry'}
              title="Skills and Interests"
              subtitle="Organized by capability area so the lighter portfolio still keeps the same technical depth."
              experienceMode={experienceMode}
            />
            <div className="space-y-6">
              {skillGroups.map((group) => (
                <LiteCard key={group.category} experienceMode={experienceMode}>
                  <h3 className="text-2xl font-black uppercase tracking-tight text-primary">{group.category}</h3>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {group.items.map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-black uppercase tracking-[0.08em] text-slate-200"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </LiteCard>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="px-6 py-16">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <LiteCard className="p-4" experienceMode={experienceMode}>
              <img
                src="/profile/profile.jpg"
                alt="Zia Mariano"
                loading="lazy"
                className="aspect-square w-full rounded-[1.5rem] object-contain bg-black/30"
              />
            </LiteCard>
            <LiteCard experienceMode={experienceMode}>
              <p className="text-[11px] font-black uppercase tracking-[0.28em] text-primary">
                {isCompanyMode ? 'Profile' : 'Profile.Initialize()'}
              </p>
              <h2 className="mt-5 text-4xl font-black uppercase leading-tight tracking-tight text-white sm:text-5xl">
                {isCompanyMode ? (
                  <>
                    I Build <span className="text-primary">Thoughtful Digital Systems</span>.
                  </>
                ) : (
                  <>
                    I AM A <span className="text-primary">CREATIVE TECHNOLOGIST</span>.
                  </>
                )}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-300">{aboutLog}</p>
              <div className="mt-8 flex flex-wrap gap-6">
                {profileStats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-4xl font-black text-primary">{stat.value}</p>
                    <p className="mt-2 text-[10px] font-black uppercase tracking-[0.24em] text-slate-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </LiteCard>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto max-w-5xl space-y-10">
            <LiteSectionTitle
              eyebrow={isCompanyMode ? 'Professional Journey' : 'Journey Log'}
              title={isCompanyMode ? 'Creative to Technical Journey' : 'Creative to Technical'}
              subtitle="From creative media to IT, data analytics, and machine learning."
              experienceMode={experienceMode}
            />
            <LiteCard experienceMode={experienceMode}>
              <div className="space-y-5">
                {journeyParagraphs.map((paragraph) => (
                  <p key={paragraph} className="text-lg leading-relaxed text-slate-300">
                    {paragraph}
                  </p>
                ))}
              </div>
            </LiteCard>
          </div>
        </section>

        <section id="contact" className="px-6 pt-16 pb-24">
          <div className="mx-auto max-w-7xl space-y-12">
            <LiteCard className="text-center" experienceMode={experienceMode}>
              <p className="text-[11px] font-black uppercase tracking-[0.28em] text-primary">
                {isCompanyMode ? 'Contact' : 'Contact.Sync()'}
              </p>
              <h2 className="mt-5 text-5xl font-black uppercase tracking-tight text-white sm:text-6xl">
                Let&apos;s <span className="text-primary">{isCompanyMode ? 'Connect' : 'Sync'}</span>
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-slate-300">
                Ready to explore projects, collaborations, and opportunities in software, data, AI, and design.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
                {contactLinks.map(({ href, label, icon, download }) => {
                  const Icon = iconMap[icon];

                  return (
                    <a
                      key={label}
                      href={href}
                      download={download}
                      className={HERO_ACTION_BASE_CLASS}
                    >
                      <Icon className="mr-3 size-4" />
                      {label}
                    </a>
                  );
                })}
              </div>
            </LiteCard>

            <div className="flex flex-col gap-5 border-t border-white/10 pt-8 text-[10px] font-black uppercase tracking-[0.28em] text-slate-500 md:flex-row md:items-center md:justify-between">
              <p>
                Copyright 2026 Zia Louise Mariano.{' '}
                {isCompanyMode ? 'Company presentation mode active.' : 'Mobile-optimized creative mode active.'}
              </p>
              <div className="flex flex-wrap justify-center gap-6 md:justify-end">
                <a href="#work" className="transition-colors hover:text-white">Work</a>
                <a href="/resume/BigDataMARIANO_RESUME.pdf" download className="transition-colors hover:text-white">Resume</a>
                <a href="mailto:luwiyeyz@gmail.com" className="transition-colors hover:text-white">Email</a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
