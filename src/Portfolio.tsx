import {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  AudioLines,
  ChartNoAxesCombined,
  Check,
  ChevronDown,
  Code2,
  Download,
  ExternalLink,
  Mail,
  Menu,
  Play,
  Search,
  X,
} from "lucide-react";
import {
  additionalProjects,
  certificates,
  clientContributions,
  contactLinks,
  imageArtifacts,
  interactiveProjects,
  journeyParagraphs,
  personalInterests,
  profileStats,
  projectHighlights,
  proofCards,
  skillGroups,
  videoArtifacts,
  type Artifact,
} from "./portfolio-content";
import "./portfolio.css";
import CredentialPreview from "./CredentialPreview";
const InteractiveLab = lazy(() => import("./concepts/InteractiveLab"));

const email = "luwiyeyz@gmail.com";
const resume = contactLinks.find((link) => link.icon === "resume")!.href;
const categories = [
  "All work",
  "Websites",
  "Landing pages",
  "Android apps",
  "Animation & 3D",
  "UI & design",
] as const;
type Category = (typeof categories)[number];
type Project = Artifact & { category: Category; color: string };
const webIds = new Set([
  "video-09",
  "video-10",
  "image-03",
  "image-06",
  "image-07",
  "image-08",
  "image-09",
  "image-10",
]);
const appIds = new Set(["video-05", "video-06"]);
const projects: Project[] = [
  ...videoArtifacts,
  ...imageArtifacts,
  ...additionalProjects,
  ...interactiveProjects,
].map((project) => {
  const category: Category =
    project.categoryHint ??
    (project.id.startsWith("concept-")
      ? "Landing pages"
      : webIds.has(project.id) || Boolean(project.liveUrl)
        ? "Websites"
        : appIds.has(project.id)
          ? "Android apps"
          : project.type === "video"
            ? "Animation & 3D"
            : "UI & design");
  return {
    ...project,
    category,
    color:
      category === "Websites"
        ? "sage"
        : category === "Android apps"
          ? "lavender"
          : category === "Animation & 3D"
            ? "peach"
            : "butter",
  };
});
const projectOrder = [
  "video-10",
  "library-web",
  "routecalc-web",
  "video-09",
  "concept-forma",
  "concept-still",
  "concept-fold",
  "concept-northline",
  "concept-good-dog",
  "monte-royale",
  "zia-pos",
];
projects.sort((a, b) => {
  const aIndex = projectOrder.indexOf(a.id);
  const bIndex = projectOrder.indexOf(b.id);
  return (aIndex < 0 ? 100 : aIndex) - (bIndex < 0 ? 100 : bIndex);
});
const preview = (project: Artifact) =>
  project.preview ??
  (project.interactiveDemo ||
  additionalProjects.some((item) => item.id === project.id)
    ? project.src
    : "/previews/" + project.id + ".webp");
const projectKind = (project: Artifact) =>
  project.kind ??
  (project.tags[0] === "PERSONAL" ? "Personal project" : "Course project");
const navItems = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#credentials", label: "Credentials" },
  { href: "#contact", label: "Contact" },
];
const webCaseStudies: Record<
  string,
  { overview: string; tools: string[]; features: string[] }
> = {
  "video-10": {
    overview:
      "A barangay agriculture platform that brings monitoring and communication into one workspace for the team.",
    tools: ["Next.js", "TypeScript", "Firebase"],
    features: [
      "Farmer records and agriculture-service monitoring",
      "SMS conversations and community alerts",
      "Shared dashboards for barangay operations",
    ],
  },
  "video-09": {
    overview:
      "A university-wide web application that organizes service requests, queues, and workflows across campus offices.",
    tools: ["Next.js", "React", "Firebase"],
    features: [
      "University office and service workflows",
      "Queueing and request management",
      "A shared place to navigate campus services",
    ],
  },
};
const orderedSkillGroups = [
  ...skillGroups.filter((group) => group.category === "Web Development"),
  ...skillGroups.filter((group) => group.category !== "Web Development"),
];

function SectionHeading({
  number,
  label,
  title,
  accent,
  children,
}: {
  number: string;
  label: string;
  title: string;
  accent: string;
  children?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">
          <span>{number}</span> {label}
        </p>
        <h2>
          {title} <em>{accent}</em>
          <span className="heading-dot">.</span>
        </h2>
      </div>
      {children && <div className="section-description">{children}</div>}
    </div>
  );
}

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (project: Project) => void;
}) {
  const caseStudy = project.details ?? webCaseStudies[project.id];
  return (
    <article className="project-card">
      <button
        className={"project-visual " + project.color}
        onClick={() => onOpen(project)}
        aria-label={"View " + project.title}
      >
        <div className="project-topline">
          <span>
            {project.interactiveDemo
              ? "Interactive lab"
              : project.id.startsWith("concept-")
                ? "Independent concept"
                : project.liveUrl
                  ? "Web application"
                  : project.category}
          </span>
          <span>
            {project.interactiveDemo ? (
              <>
                <Play size={12} /> Try it here
              </>
            ) : project.accessNote?.startsWith("This is an editor-only") ? (
              "Restricted sample"
            ) : project.liveUrl ? (
              <>
                <ExternalLink size={12} />{" "}
                {project.id.startsWith("concept-")
                  ? "Interactive demo"
                  : "Website preview"}
              </>
            ) : project.type === "video" ? (
              <>
                <Play size={12} /> Video demo
              </>
            ) : (
              "Project preview"
            )}
          </span>
        </div>
        <div
          className={
            "project-image-wrap " +
            (project.type === "video" ? "video-poster" : "")
          }
        >
          <img
            src={preview(project)}
            alt={project.title + " preview"}
            loading="lazy"
            decoding="async"
            width="960"
            height="600"
          />
          {project.type === "video" && (
            <span className="play-circle">
              <Play size={20} fill="currentColor" />
            </span>
          )}
        </div>
        <span className="project-open">
          <ArrowUpRight size={22} />
        </span>
      </button>
      <div className="project-caption">
        <div>
          <p className="project-kind">{projectKind(project)}</p>
          <h3>
            <button onClick={() => onOpen(project)}>{project.title}</button>
          </h3>
        </div>
        <ArrowUpRight size={20} aria-hidden="true" />
      </div>
      <p className="project-summary">
        {project.role.replace(
          /^(Course|Personal|Sample|Concept) Project - /,
          "",
        )}
      </p>
      {(project.interactiveDemo || project.id.startsWith("concept-")) && (
        <button
          className="project-live-link in-page-demo"
          onClick={() => onOpen(project)}
        >
          Try inside portfolio <Play size={14} />
        </button>
      )}
      {project.liveUrl && (
        <a
          className="project-live-link"
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {project.liveLabel ?? "Visit live website"} <ArrowUpRight size={15} />
        </a>
      )}
      {caseStudy && (
        <div className="project-focus">
          <span>
            {caseStudy.tools.length
              ? caseStudy.tools.join(" / ")
              : "Queues / Requests / Office workflows"}
          </span>
          <button onClick={() => onOpen(project)}>
            Explore the project <ArrowRight size={14} />
          </button>
        </div>
      )}
    </article>
  );
}

function ProjectDialog({
  project,
  onClose,
  onNavigate,
}: {
  project: Project;
  onClose: () => void;
  onNavigate: (direction: number) => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [playing, setPlaying] = useState(false);
  const [embedded, setEmbedded] = useState(project.id.startsWith("concept-"));
  const demoRef = useRef<HTMLIFrameElement>(null);
  const caseStudy = project.details ?? webCaseStudies[project.id];

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog?.showModal();
    closeRef.current?.focus();
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    const escapeFromDemo = (event: MessageEvent) => {
      if (
        event.origin === window.location.origin &&
        event.source === demoRef.current?.contentWindow &&
        event.data?.type === "zia:close-demo"
      )
        onClose();
    };
    window.addEventListener("message", escapeFromDemo);
    return () => window.removeEventListener("message", escapeFromDemo);
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      className={"project-dialog" + (embedded ? " has-embedded-demo" : "")}
      aria-labelledby="project-dialog-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="dialog-surface">
        <div className="dialog-toolbar">
          <span className="eyebrow">{project.category}</span>
          <button
            ref={closeRef}
            className="project-close"
            onClick={onClose}
            aria-label="Close project"
          >
            <X size={18} /> Close preview
          </button>
        </div>
        <div
          className={
            "dialog-media " +
            project.color +
            (project.interactiveDemo || embedded ? " is-interactive" : "")
          }
        >
          {project.interactiveDemo ? (
            <Suspense
              fallback={
                <p className="lab-loading">Opening interactive demo...</p>
              }
            >
              <InteractiveLab demo={project.interactiveDemo} />
            </Suspense>
          ) : embedded && project.liveUrl ? (
            <iframe
              ref={demoRef}
              className="embedded-concept"
              src={project.liveUrl + "&embed=1"}
              title={project.title + " interactive website demo"}
              sandbox="allow-scripts allow-same-origin allow-popups"
            />
          ) : project.type === "video" ? (
            playing ? (
              <video
                key={project.src}
                src={project.src}
                poster={preview(project)}
                controls
                autoPlay
                playsInline
                preload="none"
                aria-label={project.title}
              >
                Your browser cannot play this video.{" "}
                <a href={project.src}>Open the video</a>.
              </video>
            ) : (
              <button
                className="dialog-video-preview"
                onClick={() => setPlaying(true)}
                aria-label={"Play " + project.title}
              >
                <img
                  src={preview(project)}
                  alt={project.title + " video preview"}
                />
                <span className="dialog-play">
                  <Play size={24} fill="currentColor" /> Play demo
                </span>
              </button>
            )
          ) : (
            <img src={project.src} alt={project.title} />
          )}
        </div>
        <div className="dialog-copy">
          <p className="eyebrow">{projectKind(project)}</p>
          <h2 id="project-dialog-title">{project.title}</h2>
          <p>
            {project.role.replace(
              /^(Course|Personal|Sample|Concept) Project - /,
              "",
            )}
            .
          </p>
          {project.id.startsWith("concept-") && (
            <button
              className="text-link embedded-toggle"
              onClick={() => setEmbedded(!embedded)}
            >
              {embedded ? "Show project cover" : "Try inside portfolio"}{" "}
              <Play size={15} />
            </button>
          )}
          {project.liveUrl && (
            <a
              className="button button-dark dialog-live-link"
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.liveLabel ?? "Visit live website"}{" "}
              <ArrowUpRight size={17} />
            </a>
          )}
          {project.accessNote && (
            <p className="project-access-note">{project.accessNote}</p>
          )}
          {caseStudy && (
            <div className="case-study">
              <h3>The project</h3>
              <p>{caseStudy.overview}</p>
              <h3>What it covers</h3>
              <ul>
                {caseStudy.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              {caseStudy.tools.length > 0 && (
                <>
                  <h3>Built with</h3>
                  <div className="tag-list">
                    {caseStudy.tools.map((tool) => (
                      <span key={tool}>{tool}</span>
                    ))}
                  </div>
                </>
              )}
              {!project.details && (
                <p className="case-context">
                  Developed as a course project. The recorded demo shows the
                  application in use.
                </p>
              )}
            </div>
          )}
          <div className="dialog-bottom">
            <div className="tag-list">
              {project.tags.slice(1).map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            {!project.interactiveDemo && (
              <a className="text-link" href={project.src} download>
                Download {project.type === "video" ? "demo" : "image"}{" "}
                <Download size={15} />
              </a>
            )}
          </div>
        </div>
        <div className="dialog-pagination">
          <button onClick={() => onNavigate(-1)}>
            <ArrowLeft size={16} /> Previous project
          </button>
          <button onClick={() => onNavigate(1)}>
            Next project <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState<Category>("All work");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Project | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<
    (typeof certificates)[number] | null
  >(null);
  const [copied, setCopied] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [motionPaused, setMotionPaused] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const copyTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const filteredProjects = projects.filter(
    (project) =>
      (category === "All work" || project.category === category) &&
      (
        project.title +
        " " +
        project.role +
        " " +
        project.category +
        " " +
        ((project.details ?? webCaseStudies[project.id])?.tools.join(" ") ?? "")
      )
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  const visibleProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, 6);

  useEffect(() => {
    document.title = "Zia Louise Mariano | Web Developer";
    return () => {
      if (copyTimeout.current) clearTimeout(copyTimeout.current);
    };
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => {
      hero.classList.toggle("is-offscreen", !entry.isIntersecting);
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setCopyError(false);
      if (copyTimeout.current) clearTimeout(copyTimeout.current);
      copyTimeout.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopyError(true);
    }
  }

  function chooseCategory(next: Category) {
    setCategory(next);
    setShowAll(true);
  }

  function navigateProject(direction: number) {
    if (!selected) return;
    const index = filteredProjects.findIndex(
      (project) => project.id === selected.id,
    );
    setSelected(
      filteredProjects[
        (index + direction + filteredProjects.length) % filteredProjects.length
      ],
    );
  }

  return (
    <div className="portfolio">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <a
          className="wordmark"
          href="#top"
          aria-label="Zia Mariano, back to top"
        >
          zia<span>m.</span>
          <span className="wordmark-star">*</span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <a className="resume-link" href={resume} download>
            Resume <ArrowUpRight size={16} />
          </a>
          <button
            className="menu-toggle icon-button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        <nav
          id="mobile-nav"
          className={"mobile-nav " + (menuOpen ? "is-open" : "")}
          aria-label="Mobile navigation"
          inert={!menuOpen}
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
              <ArrowUpRight size={20} />
            </a>
          ))}
          <a href={"mailto:" + email} onClick={() => setMenuOpen(false)}>
            Email me <Mail size={20} />
          </a>
        </nav>
      </header>

      <main id="main">
        <section
          ref={heroRef}
          className={"hero" + (motionPaused ? " motion-paused" : "")}
          id="top"
          aria-labelledby="hero-title"
        >
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-topline">
            <span className="eyebrow">
              <span className="status-dot" /> Web developer / Creative thinker
            </span>
            <span className="eyebrow hero-location">
              Based in the Philippines <span className="tiny-star">*</span>
            </span>
          </div>
          <div className="hero-art" aria-hidden="true">
            {personalInterests.map((interest) => (
              <img
                key={interest.id}
                className={"interest-object interest-" + interest.id}
                src={"/interests/" + interest.id + ".webp"}
                alt=""
                width="480"
                height="480"
                decoding="async"
              />
            ))}
          </div>
          <div className="hero-intro">
            <p>
              Web applications.
              <br />A creative eye.
              <br />A mind for how things work.
            </p>
            <ArrowDownRight size={42} strokeWidth={1.2} />
          </div>
          <h1 id="hero-title" className="hero-name">
            <span>Zia Louise</span>
            <em>
              Mariano<span className="name-period">.</span>
            </em>
          </h1>
          <div className="hero-bottom">
            <p>
              I build websites and web applications for everyday workflows,
              combining development with a background in data and visual design.
            </p>
            <div className="hero-cta">
              <a className="button button-dark" href="#work">
                View projects <ArrowDownRight size={17} />
              </a>
              <a className="button button-dark" href={resume} download>
                Download resume <Download size={16} />
              </a>
              <a className="button button-dark" href={"mailto:" + email}>
                Email me <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
          <div className="hero-footnote">
            <span className="eyebrow">
              React / Next.js / TypeScript / Firebase
            </span>
            <button
              className="motion-toggle"
              onClick={() => setMotionPaused(!motionPaused)}
              aria-pressed={motionPaused}
            >
              {motionPaused ? "Resume icon motion" : "Pause icon motion"}
            </button>
            <a className="eyebrow" href="#work">
              Explore my web projects <ArrowDown size={14} />
            </a>
          </div>
        </section>

        <section id="work" className="work-section section-shell">
          <SectionHeading
            number="01"
            label="Web development first"
            title="Selected"
            accent="work"
          >
            <p>
              Live web applications, independent business concepts, and creative
              experiments. Explore the details or open a website directly.
            </p>
          </SectionHeading>
          <div className="client-work" id="client-work">
            <div className="client-work-intro">
              <p className="eyebrow">Client work / team contributions</p>
              <h3>
                Real stores.
                <br />
                <em>Shared effort.</em>
              </h3>
              <p>
                I helped my supervisor's team create websites for these clients.
                These are collaborative contributions, not solo builds; the
                current sites may have changed since my involvement.
              </p>
              <div className="brand-mosaic" aria-label="Client brands">
                <div className="brand-tile brand-purifair">
                  <span>PET</span>
                  <img
                    src="/brands/purifair.svg"
                    alt="Purifair"
                    loading="lazy"
                  />
                </div>
                <div className="brand-tile brand-happycap">
                  <span aria-hidden="true" className="cap-mark" />
                  <strong>HappyCap</strong>
                </div>
                <div className="brand-tile brand-chebeauty">
                  <img
                    src="/brands/chebeauty.svg"
                    alt="chebeauty"
                    loading="lazy"
                  />
                </div>
                <div className="brand-tile brand-fireplace">
                  <img
                    src="/brands/fireplace.webp"
                    alt="US Fireplace Store"
                    loading="lazy"
                  />
                </div>
                <div className="brand-tile brand-saverack">
                  <img
                    src="/brands/saverack.webp"
                    alt="Save Rack"
                    loading="lazy"
                  />
                </div>
                <div className="brand-tile brand-holistic">
                  <span className="holistic-sun" aria-hidden="true">
                    *
                  </span>
                  <strong>
                    HOLISTIC
                    <br />
                    <em>VYBEZ</em>
                  </strong>
                </div>
              </div>
            </div>
            <div className="client-work-list">
              {clientContributions.map((client, index) => (
                <article key={client.name}>
                  <span className="client-index">0{index + 1}</span>
                  <div>
                    <p className="project-kind">
                      {client.sector} / {client.platform}
                    </p>
                    <h4>{client.name}</h4>
                    <p className="client-role">
                      Collaborative website contribution under my supervisor.
                    </p>
                    {client.note && (
                      <p className="client-note">{client.note}</p>
                    )}
                  </div>
                  {client.href && (
                    <a
                      href={client.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={client.linkLabel + ": " + client.name}
                    >
                      <ArrowUpRight size={21} />
                      <span>{client.linkLabel}</span>
                    </a>
                  )}
                </article>
              ))}
            </div>
          </div>
          <div className="gallery-intro">
            <p className="eyebrow">
              Applications, studies & independent concepts
            </p>
            <p>
              Browse the work below. Fictional business demos are labeled as
              concepts.
            </p>
          </div>
          <div className="work-controls">
            <div
              className="filter-list"
              role="group"
              aria-label="Filter projects by category"
            >
              {categories.map((item) => (
                <button
                  key={item}
                  aria-pressed={category === item}
                  className={category === item ? "active" : ""}
                  onClick={() => chooseCategory(item)}
                >
                  {item}
                  <span>
                    {item === "All work"
                      ? projects.length
                      : projects.filter((p) => p.category === item).length}
                  </span>
                </button>
              ))}
            </div>
            <label className="project-search">
              <Search size={17} />
              <input
                ref={searchRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setShowAll(true);
                }}
                placeholder="Find a project"
                aria-label="Search projects"
              />
              {query && (
                <button
                  onClick={() => {
                    setQuery("");
                    searchRef.current?.focus();
                  }}
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}
            </label>
          </div>
          <div className="results-meta" aria-live="polite">
            <span>
              {String(filteredProjects.length).padStart(2, "0")} projects
              {category !== "All work"
                ? " / " + category
                : " / applications, coursework & concepts"}
            </span>
            <span>
              Click any project to explore <ArrowUpRight size={13} />
            </span>
          </div>
          <div className="project-grid">
            {visibleProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpen={setSelected}
              />
            ))}
          </div>
          {!filteredProjects.length && (
            <div className="empty-state">
              <Search size={30} />
              <h3>No projects found.</h3>
              <p>Try a different search or browse another category.</p>
              <button
                className="button button-dark"
                onClick={() => {
                  setQuery("");
                  setCategory("All work");
                }}
              >
                Show all projects <ArrowRight size={16} />
              </button>
            </div>
          )}
          {!showAll && filteredProjects.length > 6 && (
            <div className="view-all">
              <button
                className="button button-outline"
                onClick={() => setShowAll(true)}
              >
                Explore all {projects.length} projects <ArrowDown size={18} />
              </button>
              <p>Websites, Android apps, animation, 3D & interface design.</p>
            </div>
          )}
          {showAll && filteredProjects.length > 6 && (
            <div className="view-all">
              <a
                className="text-link"
                href="#work"
                onClick={() => {
                  setShowAll(false);
                  setCategory("All work");
                  setQuery("");
                }}
              >
                Back to selected work <ArrowUp size={15} />
              </a>
            </div>
          )}
        </section>

        <section id="about" className="about-section">
          <div className="section-shell">
            <p className="eyebrow light-eyebrow">
              <span>02</span> A little about me
            </p>
            <div className="about-grid">
              <div className="about-portrait">
                <img
                  src="/previews/profile.webp"
                  alt="Zia Louise Mariano"
                  width="640"
                  height="640"
                  loading="lazy"
                  decoding="async"
                />
                <span>
                  Zia Louise Mariano <ArrowDownRight size={18} />
                </span>
              </div>
              <div className="about-copy">
                <h2>
                  Web developer.
                  <br />
                  <em>Creative thinker.</em>
                </h2>
                <p className="about-lead">
                  I build web applications with an eye for design and an
                  interest in the workflows behind the screen.
                </p>
                {journeyParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <div className="about-stats">
                  {profileStats.map((stat) => (
                    <div key={stat.label}>
                      <strong>{stat.value}</strong>
                      <span>
                        {stat.label === "Years.Exp"
                          ? "Years of creative & technical work"
                          : "Projects & experiments"}
                      </span>
                    </div>
                  ))}
                </div>
                <a className="text-link" href={resume} download>
                  Get to know my background <Download size={16} />
                </a>
              </div>
            </div>
            <div className="strengths-grid">
              {proofCards.map((card, index) => {
                const Icon = [Code2, ChartNoAxesCombined, AudioLines][index];
                return (
                  <div key={card.title}>
                    <Icon size={26} strokeWidth={1.5} />
                    <h3>{card.title}</h3>
                    <p>{card.desc}</p>
                  </div>
                );
              })}
            </div>
            <div className="personal-note">
              <p className="eyebrow">Away from the keyboard</p>
              <h3>
                Curious about <em>more than code.</em>
              </h3>
              <p>
                I love exploring, photography, writing, drawing, painting, and
                building things. Add dogs, a little shopping, pasta, fresh
                bread, fruit, and vegetable salads to the mix. Thinking things
                through and finding the logic is part of the fun, too.
              </p>
              <ul className="interest-labels">
                {personalInterests.map((interest) => (
                  <li key={interest.id}>{interest.label}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="skills" className="skills-section section-shell">
          <SectionHeading
            number="03"
            label="Tools of the trade"
            title="Skills &"
            accent="interests"
          >
            <p>
              The tools I use to turn questions into insights
              <br />
              and ideas into something you can use.
            </p>
          </SectionHeading>
          <div className="skills-list">
            {orderedSkillGroups.map((group, index) => (
              <div className="skill-row" key={group.category}>
                <span className="skill-number">0{index + 1}</span>
                <h3>{group.category}</h3>
                <div className="tag-list">
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="highlights-section section-shell" id="highlights">
          <SectionHeading
            number="04"
            label="Beyond the gallery"
            title="More things"
            accent="I've built"
          >
            <p>
              Coursework, data challenges, and experiments
              <br />
              that helped shape the way I work.
            </p>
          </SectionHeading>
          <div className="highlights-list">
            {projectHighlights.map((item, index) => (
              <details className="highlight-item" key={item.title}>
                <summary>
                  <span className="highlight-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{item.title}</h3>
                  <span className="highlight-expand">
                    <ChevronDown size={20} />
                  </span>
                </summary>
                <p>{item.desc}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="credentials" className="credentials-section">
          <div className="section-shell">
            <SectionHeading
              number="05"
              label="Learning, always"
              title="A little"
              accent="proof"
            >
              <p>Certification and verified technical competency.</p>
            </SectionHeading>
            {certificates.map((certificate) => (
              <article className="credential-card" key={certificate.title}>
                <button
                  className="credential-preview"
                  onClick={() => setSelectedCertificate(certificate)}
                  aria-label={"Preview " + certificate.title}
                >
                  <img
                    src="/previews/tesda.webp"
                    alt={certificate.title}
                    width="1000"
                    height="700"
                    loading="lazy"
                    decoding="async"
                  />
                  <span>
                    View credential <ArrowUpRight size={17} />
                  </span>
                </button>
                <div className="credential-copy">
                  <p className="eyebrow">
                    {certificate.issuer} / {certificate.date}
                  </p>
                  <h3>{certificate.title}</h3>
                  <p>
                    A record of training and assessed technical competency,
                    alongside hands-on project work.
                  </p>
                  <button
                    className="text-link credential-open"
                    onClick={() => setSelectedCertificate(certificate)}
                  >
                    Preview credential <ExternalLink size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="contact-section section-shell">
          <p className="eyebrow">
            <span>06</span> Have something in mind?
          </p>
          <div className="contact-heading">
            <h2>
              Let&apos;s make
              <br />
              something <em>matter.</em>
            </h2>
            <a
              className="contact-arrow"
              href={"mailto:" + email}
              aria-label="Email Zia"
            >
              <ArrowUpRight strokeWidth={1} />
            </a>
          </div>
          <div className="contact-details">
            <p>
              I&apos;m looking for web developer opportunities.
              <br />
              Let&apos;s talk about your team and what you&apos;re building.
            </p>
            <div className="email-actions">
              <a className="contact-email" href={"mailto:" + email}>
                {email}
                <ArrowUpRight size={20} />
              </a>
              <button className="copy-email" onClick={copyEmail}>
                {copied ? <Check size={14} /> : <Mail size={14} />}
                {copied ? "Copied!" : "Copy email"}
              </button>
              <span role="status" className="copy-status">
                {copied
                  ? "Email address copied."
                  : copyError
                    ? "Please select the email address above to copy it."
                    : ""}
              </span>
            </div>
          </div>
          <a
            className="button button-dark contact-resume"
            href={resume}
            download
          >
            Download my resume <Download size={17} />
          </a>
        </section>
      </main>

      <footer className="site-footer section-shell">
        <div className="footer-top">
          <a className="wordmark" href="#top">
            zia<span>m.</span>
            <span className="wordmark-star">*</span>
          </a>
          <nav aria-label="Footer navigation">
            {navItems.map((item) => (
              <a href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <a className="text-link" href="#top">
            Back to top <ArrowUp size={16} />
          </a>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Zia Louise Mariano</p>
          <span>Built with curiosity. Made with care.</span>
          <a href="./original.html">
            Original 3D portfolio <ArrowUpRight size={13} />
          </a>
          <span>v1.0.0</span>
        </div>
      </footer>
      {selected && (
        <ProjectDialog
          key={selected.id}
          project={selected}
          onClose={() => setSelected(null)}
          onNavigate={navigateProject}
        />
      )}
      {selectedCertificate && (
        <CredentialPreview
          certificate={selectedCertificate}
          onClose={() => setSelectedCertificate(null)}
        />
      )}
    </div>
  );
}
