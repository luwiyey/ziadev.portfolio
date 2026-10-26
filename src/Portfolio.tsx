import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  ArrowDown, ArrowDownRight, ArrowLeft, ArrowRight, ArrowUp, ArrowUpRight,
  AudioLines, ChartNoAxesCombined, Check, ChevronDown, Code2, Download,
  ExternalLink, Mail, Menu, Play, Search, Sparkles, X,
} from 'lucide-react';
import {
  certificates, contactLinks, heroSubtitle, imageArtifacts, journeyParagraphs,
  profileStats, projectHighlights, proofCards, skillGroups, videoArtifacts,
  type Artifact,
} from './portfolio-content';
import './portfolio.css';

const email = 'luwiyeyz@gmail.com';
const resume = contactLinks.find(link => link.icon === 'resume')!.href;
const categories = ['All work', 'Websites', 'Android apps', 'Animation & 3D', 'UI & design'] as const;
type Category = typeof categories[number];
type Project = Artifact & { category: Category; color: string };
const webIds = new Set(['video-09', 'video-10', 'image-03', 'image-06', 'image-07', 'image-08', 'image-09', 'image-10']);
const appIds = new Set(['video-05', 'video-06']);
const projects: Project[] = [...videoArtifacts, ...imageArtifacts].map(project => {
  const category: Category = webIds.has(project.id) ? 'Websites' : appIds.has(project.id)
    ? 'Android apps' : project.type === 'video' ? 'Animation & 3D' : 'UI & design';
  return {
    ...project, category,
    color: category === 'Websites' ? 'sage' : category === 'Android apps' ? 'lavender'
      : category === 'Animation & 3D' ? 'peach' : 'butter',
  };
});
const projectOrder = ['video-10', 'video-09', 'image-08', 'image-06', 'video-05', 'video-06'];
projects.sort((a, b) => {
  const aIndex = projectOrder.indexOf(a.id);
  const bIndex = projectOrder.indexOf(b.id);
  return (aIndex < 0 ? 100 : aIndex) - (bIndex < 0 ? 100 : bIndex);
});
const preview = (project: Artifact) => '/previews/' + project.id + '.webp';
const navItems = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#credentials', label: 'Credentials' },
  { href: '#contact', label: 'Contact' },
];

function SectionHeading({ number, label, title, accent, children }: {
  number: string; label: string; title: string; accent: string; children?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow"><span>{number}</span> {label}</p>
        <h2>{title} <em>{accent}</em><span className="heading-dot">.</span></h2>
      </div>
      {children && <div className="section-description">{children}</div>}
    </div>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (project: Project) => void }) {
  return (
    <article className="project-card">
      <button className={'project-visual ' + project.color} onClick={() => onOpen(project)}
        aria-label={'View ' + project.title}>
        <div className="project-topline">
          <span>{project.category}</span>
          <span>{project.type === 'video' ? <><Play size={12} /> Video demo</> : 'Design preview'}</span>
        </div>
        <div className={'project-image-wrap ' + (project.type === 'video' ? 'video-poster' : '')}>
          <img src={preview(project)} alt={project.title + ' preview'} loading="lazy" decoding="async"
            width="960" height="600" />
          {project.type === 'video' && <span className="play-circle"><Play size={20} fill="currentColor" /></span>}
        </div>
        <span className="project-open"><ArrowUpRight size={22} /></span>
      </button>
      <div className="project-caption">
        <div>
          <p className="project-kind">{project.tags[0] === 'PERSONAL' ? 'Personal project' : 'Course project'}</p>
          <h3><button onClick={() => onOpen(project)}>{project.title}</button></h3>
        </div>
        <ArrowUpRight size={20} aria-hidden="true" />
      </div>
      <p className="project-summary">{project.role.replace(/^(Course|Personal) Project - /, '')}</p>
    </article>
  );
}

function ProjectDialog({ project, onClose, onNavigate }: {
  project: Project; onClose: () => void; onNavigate: (direction: number) => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog?.showModal();
    closeRef.current?.focus();
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, []);

  return (
    <dialog ref={dialogRef} className="project-dialog" aria-labelledby="project-dialog-title"
      onCancel={onClose} onClick={event => {
        if (event.target === event.currentTarget) onClose();
      }}>
      <div className="dialog-surface">
        <div className="dialog-toolbar">
          <span className="eyebrow">{project.category}</span>
          <button ref={closeRef} className="icon-button" onClick={onClose} aria-label="Close project"><X /></button>
        </div>
        <div className={'dialog-media ' + project.color}>
          {project.type === 'video' ? playing ? (
            <video key={project.src} src={project.src} poster={preview(project)} controls autoPlay playsInline
              preload="none" aria-label={project.title}>
              Your browser cannot play this video. <a href={project.src}>Open the video</a>.
            </video>
          ) : (
            <button className="dialog-video-preview" onClick={() => setPlaying(true)} aria-label={'Play ' + project.title}>
              <img src={preview(project)} alt={project.title + ' video preview'} />
              <span className="dialog-play"><Play size={24} fill="currentColor" /> Play demo</span>
            </button>
          ) : <img src={project.src} alt={project.title} />}
        </div>
        <div className="dialog-copy">
          <p className="eyebrow">{project.tags[0] === 'PERSONAL' ? 'Personal project' : 'Course project'}</p>
          <h2 id="project-dialog-title">{project.title}</h2>
          <p>{project.role.replace(/^(Course|Personal) Project - /, '')}.</p>
          <div className="dialog-bottom">
            <div className="tag-list">{project.tags.slice(1).map(tag => <span key={tag}>{tag}</span>)}</div>
            <a className="text-link" href={project.src} target="_blank" rel="noreferrer">Open original <ExternalLink size={15} /></a>
          </div>
        </div>
        <div className="dialog-pagination">
          <button onClick={() => onNavigate(-1)}><ArrowLeft size={16} /> Previous project</button>
          <button onClick={() => onNavigate(1)}>Next project <ArrowRight size={16} /></button>
        </div>
      </div>
    </dialog>
  );
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState<Category>('All work');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Project | null>(null);
  const [copied, setCopied] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const copyTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const filteredProjects = projects.filter(project =>
    (category === 'All work' || project.category === category) &&
    (project.title + ' ' + project.role + ' ' + project.category).toLowerCase().includes(query.trim().toLowerCase())
  );
  const visibleProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6);

  useEffect(() => {
    document.title = 'Zia Louise Mariano | Software, Data & Design';
    return () => { if (copyTimeout.current) clearTimeout(copyTimeout.current); };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
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
    const index = filteredProjects.findIndex(project => project.id === selected.id);
    setSelected(filteredProjects[(index + direction + filteredProjects.length) % filteredProjects.length]);
  }

  return (
    <div className="portfolio">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Zia Mariano, back to top">zia<span>m.</span><span className="wordmark-star">*</span></a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map(item => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        <div className="header-actions">
          <a className="resume-link" href={resume} download>Resume <ArrowUpRight size={16} /></a>
          <button className="menu-toggle icon-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        <nav id="mobile-nav" className={'mobile-nav ' + (menuOpen ? 'is-open' : '')} aria-label="Mobile navigation" inert={!menuOpen}>
          {navItems.map(item => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}<ArrowUpRight size={20} /></a>)}
          <a href={'mailto:' + email} onClick={() => setMenuOpen(false)}>Email me <Mail size={20} /></a>
        </nav>
      </header>

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-topline"><span className="eyebrow"><span className="status-dot" /> Software / Data / Design</span><span className="eyebrow hero-location">Based in the Philippines <span className="tiny-star">*</span></span></div>
          <div className="hero-art" aria-hidden="true">
            <div className="art-brackets">{'{ }'}<span>turning ideas into interfaces</span></div>
            <div className="art-chart"><ChartNoAxesCombined size={64} strokeWidth={1.4} /><span>curiosity + data</span></div>
            <div className="art-flower"><svg viewBox="0 0 120 120"><path d="M60 6 70 36 96 18 84 48 116 51 88 67 108 92 77 85 71 116 57 88 29 105 37 75 6 69 35 55 17 28 47 37Z" fill="currentColor" /><circle cx="60" cy="61" r="10" fill="#f5f3ed" /></svg></div>
            <div className="art-note">A creative mind.<br />An analytical eye.<ArrowDownRight size={25} /></div>
            <div className="art-orbit"><Sparkles size={30} strokeWidth={1.5} /><span>made with intention</span></div>
          </div>
          <div className="hero-intro"><p>Hello, I&apos;m Zia.<br />I connect creative thinking<br />with technical problem-solving.</p><ArrowDownRight size={42} strokeWidth={1.2} /></div>
          <h1 id="hero-title" className="hero-name"><span>Zia Louise</span><em>Mariano<span className="name-period">.</span></em></h1>
          <div className="hero-bottom">
            <p>{heroSubtitle}</p>
            <div className="hero-cta">
              <a className="button button-dark" href="#work">View projects <ArrowDownRight size={17} /></a>
              <a className="button button-dark" href={resume} download>Download resume <Download size={16} /></a>
              <a className="button button-dark" href={'mailto:' + email}>Email me <ArrowUpRight size={17} /></a>
            </div>
          </div>
          <div className="hero-footnote"><span className="eyebrow">A selection of ideas, experiments & things I&apos;ve built</span><a className="eyebrow" href="#work">Scroll to explore <ArrowDown size={14} /></a></div>
        </section>

        <section id="work" className="work-section section-shell">
          <SectionHeading number="01" label="The portfolio" title="Selected" accent="work">
            <p>Practical systems. Playful experiments.<br />A little of both, always with a purpose.</p>
          </SectionHeading>
          <div className="work-controls">
            <div className="filter-list" role="group" aria-label="Filter projects by category">
              {categories.map(item => <button key={item} aria-pressed={category === item}
                className={category === item ? 'active' : ''} onClick={() => chooseCategory(item)}>{item}
                <span>{item === 'All work' ? projects.length : projects.filter(p => p.category === item).length}</span></button>)}
            </div>
            <label className="project-search"><Search size={17} /><input ref={searchRef} value={query}
              onChange={event => { setQuery(event.target.value); setShowAll(true); }} placeholder="Find a project" aria-label="Search projects" />
              {query && <button onClick={() => { setQuery(''); searchRef.current?.focus(); }} aria-label="Clear search"><X size={15} /></button>}
            </label>
          </div>
          <div className="results-meta" aria-live="polite"><span>{String(filteredProjects.length).padStart(2, '0')} projects{category !== 'All work' ? ' / ' + category : ' / course & personal work'}</span><span>Click any project to explore <ArrowUpRight size={13} /></span></div>
          <div className="project-grid">
            {visibleProjects.map(project => <ProjectCard key={project.id} project={project} onOpen={setSelected} />)}
          </div>
          {!filteredProjects.length && <div className="empty-state"><Search size={30} /><h3>No projects found.</h3><p>Try a different search or browse another category.</p><button className="button button-dark" onClick={() => { setQuery(''); setCategory('All work'); }}>Show all projects <ArrowRight size={16} /></button></div>}
          {!showAll && filteredProjects.length > 6 && <div className="view-all"><button className="button button-outline" onClick={() => setShowAll(true)}>Explore all {projects.length} projects <ArrowDown size={18} /></button><p>Websites, Android apps, animation, 3D & interface design.</p></div>}
          {showAll && filteredProjects.length > 6 && <div className="view-all"><a className="text-link" href="#work" onClick={() => { setShowAll(false); setCategory('All work'); setQuery(''); }}>Back to selected work <ArrowUp size={15} /></a></div>}
        </section>

        <section id="about" className="about-section">
          <div className="section-shell">
            <p className="eyebrow light-eyebrow"><span>02</span> A little about me</p>
            <div className="about-grid">
              <div className="about-portrait"><img src="/previews/profile.webp" alt="Zia Louise Mariano" width="640" height="640" loading="lazy" decoding="async" /><span>Zia Louise Mariano <ArrowDownRight size={18} /></span></div>
              <div className="about-copy"><h2>A creative mind.<br />A <em>technical</em> side.</h2><p className="about-lead">I enjoy combining analytical thinking with creative design to build meaningful digital solutions.</p>
                {journeyParagraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
                <div className="about-stats">{profileStats.map(stat => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label === 'Years.Exp' ? 'Years of creative & technical work' : 'Projects & experiments'}</span></div>)}</div>
                <a className="text-link" href={resume} download>Get to know my background <Download size={16} /></a>
              </div>
            </div>
            <div className="strengths-grid">{proofCards.map((card, index) => {
              const Icon = [Code2, ChartNoAxesCombined, AudioLines][index];
              return <div key={card.title}><Icon size={26} strokeWidth={1.5} /><h3>{card.title}</h3><p>{card.desc}</p></div>;
            })}</div>
          </div>
        </section>

        <section id="skills" className="skills-section section-shell">
          <SectionHeading number="03" label="Tools of the trade" title="Skills &" accent="interests"><p>The tools I use to turn questions into insights<br />and ideas into something you can use.</p></SectionHeading>
          <div className="skills-list">{skillGroups.map((group, index) => <div className="skill-row" key={group.category}><span className="skill-number">0{index + 1}</span><h3>{group.category}</h3><div className="tag-list">{group.items.map(item => <span key={item}>{item}</span>)}</div></div>)}</div>
        </section>

        <section className="highlights-section section-shell" id="highlights">
          <SectionHeading number="04" label="Beyond the gallery" title="More things" accent="I've built"><p>Coursework, data challenges, and experiments<br />that helped shape the way I work.</p></SectionHeading>
          <div className="highlights-list">{projectHighlights.map((item, index) => <details className="highlight-item" key={item.title}><summary><span className="highlight-index">{String(index + 1).padStart(2, '0')}</span><h3>{item.title}</h3><span className="highlight-expand"><ChevronDown size={20} /></span></summary><p>{item.desc}</p></details>)}</div>
        </section>

        <section id="credentials" className="credentials-section">
          <div className="section-shell">
            <SectionHeading number="05" label="Learning, always" title="A little" accent="proof"><p>Certification and verified technical competency.</p></SectionHeading>
            {certificates.map(certificate => <article className="credential-card" key={certificate.title}>
              <a className="credential-preview" href={certificate.file} target="_blank" rel="noreferrer" aria-label={'Open ' + certificate.title}><img src="/previews/tesda.webp" alt={certificate.title} width="1000" height="700" loading="lazy" decoding="async" /><span>View credential <ArrowUpRight size={17} /></span></a>
              <div className="credential-copy"><p className="eyebrow">{certificate.issuer} / {certificate.date}</p><h3>{certificate.title}</h3><p>A record of training and assessed technical competency, alongside hands-on project work.</p><a className="text-link" href={certificate.file} target="_blank" rel="noreferrer">Open credential <ExternalLink size={16} /></a></div>
            </article>)}
          </div>
        </section>

        <section id="contact" className="contact-section section-shell">
          <p className="eyebrow"><span>06</span> Have something in mind?</p>
          <div className="contact-heading"><h2>Let&apos;s make<br />something <em>matter.</em></h2><a className="contact-arrow" href={'mailto:' + email} aria-label="Email Zia"><ArrowUpRight strokeWidth={1} /></a></div>
          <div className="contact-details"><p>For opportunities in software, data, AI, and design.<br />I&apos;d love to hear what you&apos;re working on.</p><div className="email-actions"><a className="contact-email" href={'mailto:' + email}>{email}<ArrowUpRight size={20} /></a><button className="copy-email" onClick={copyEmail}>{copied ? <Check size={14} /> : <Mail size={14} />}{copied ? 'Copied!' : 'Copy email'}</button><span role="status" className="copy-status">{copied ? 'Email address copied.' : copyError ? 'Please select the email address above to copy it.' : ''}</span></div></div>
          <a className="button button-dark contact-resume" href={resume} download>Download my resume <Download size={17} /></a>
        </section>
      </main>

      <footer className="site-footer section-shell"><div className="footer-top"><a className="wordmark" href="#top">zia<span>m.</span><span className="wordmark-star">*</span></a><nav aria-label="Footer navigation">{navItems.map(item => <a href={item.href} key={item.href}>{item.label}</a>)}</nav><a className="text-link" href="#top">Back to top <ArrowUp size={16} /></a></div><div className="footer-bottom"><p>&copy; {new Date().getFullYear()} Zia Louise Mariano</p><span>Built with curiosity. Made with care.</span><a href="./original.html">Original 3D portfolio <ArrowUpRight size={13} /></a><span>v1.0.0</span></div></footer>
      {selected && <ProjectDialog key={selected.id} project={selected} onClose={() => setSelected(null)} onNavigate={navigateProject} />}
    </div>
  );
}
