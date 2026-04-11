import React, { useState, useEffect, useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  Float, 
  PerspectiveCamera, 
  MeshDistortMaterial, 
  MeshWobbleMaterial, 
  Environment,
  ContactShadows,
  Stars,
  Points,
  PointMaterial,
  useScroll as useThreeScroll
} from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, MotionConfig } from 'motion/react';
import { 
  Terminal, 
  Mail, 
  Box,
  Cpu,
  BrainCircuit,
  Bot,
  BarChart3,
  Globe,
  Zap,
  Activity,
  Shield,
  Code,
  X,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

type ExperienceMode = 'full' | 'simple';

const EXPERIENCE_MODE_KEY = 'zia.experienceMode';
const HERO_ACTION_BASE_CLASS =
  "inline-flex min-h-[4.5rem] w-full items-center justify-center rounded-full border-2 px-10 py-5 text-center text-base font-black uppercase tracking-[0.2em] transition-all duration-300 sm:w-auto sm:min-w-[17rem] sm:text-lg";
const HERO_ACTION_FILLED_CLASS =
  `${HERO_ACTION_BASE_CLASS} border-primary bg-primary text-background-dark shadow-2xl shadow-primary/30 hover:-translate-y-1 hover:scale-[1.02]`;

const isLikelyMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const narrowScreen = window.matchMedia('(max-width: 900px)').matches;
  const lowThreadCount = typeof navigator !== 'undefined' && navigator.hardwareConcurrency <= 4;
  return coarsePointer || narrowScreen || lowThreadCount;
};

const getExperienceModeFromQuery = (): ExperienceMode | null => {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const mode = params.get('mode');
  if (mode === 'full' || mode === 'simple') return mode;
  if (params.get('perf') === '1') return 'simple';
  if (params.get('perf') === '0') return 'full';
  return null;
};

const getInitialExperienceMode = (): ExperienceMode => {
  const queryMode = getExperienceModeFromQuery();
  if (queryMode) return queryMode;

  if (typeof window !== 'undefined') {
    const storedMode = window.localStorage.getItem(EXPERIENCE_MODE_KEY);
    if (storedMode === 'full' || storedMode === 'simple') return storedMode;
  }
  return 'simple';
};

// --- 3D Background Components ---

const ParticleField = ({ scrollYProgress, particleCount }: { scrollYProgress: any; particleCount: number }) => {
  const points = useMemo(() => {
    const p = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      p[i * 3] = (Math.random() - 0.5) * 50;
      p[i * 3 + 1] = (Math.random() - 0.5) * 50;
      p[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return p;
  }, [particleCount]);

  const ref = useRef<THREE.Points>(null);
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -10]);
  const parallaxRotation = useTransform(scrollYProgress, [0, 1], [0, Math.PI]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.05 + parallaxRotation.get() * 0.2;
      ref.current.rotation.x = state.clock.elapsedTime * 0.03;
      ref.current.position.y = parallaxY.get();
    }
  });

  return (
    <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#06f9f9"
        size={0.1}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

const DataStream = ({ position, color, scrollYProgress }: { position: [number, number, number], color: string, scrollYProgress: any }) => {
  const ref = useRef<THREE.Mesh>(null);
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -20]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = ((state.clock.elapsedTime * 2 + position[1] + parallaxY.get()) % 20) - 10;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={[0.02, 2, 0.02]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} transparent opacity={0.5} />
    </mesh>
  );
};

const Scene = ({ performanceMode, isMobileDevice }: { performanceMode: boolean; isMobileDevice: boolean }) => {
  const { scrollYProgress } = useScroll();
  const rotationX = useTransform(scrollYProgress, [0, 1], [Math.PI / 8, -Math.PI / 8]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -2]);
  const groupRef = useRef<THREE.Group>(null);
  const secondaryPoints = useMemo(() => {
    const count = performanceMode ? 300 : isMobileDevice ? 600 : 1000;
    const points = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      points[i] = (Math.random() - 0.5) * 100;
    }
    return points;
  }, [performanceMode, isMobileDevice]);
  const dataStreams = useMemo(() => {
    const count = performanceMode ? 10 : isMobileDevice ? 22 : 40;
    return Array.from({ length: count }).map((_, i) => ({
      key: i,
      position: [
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
      ] as [number, number, number],
      color: i % 2 === 0 ? "#06f9f9" : "#a855f7",
    }));
  }, [performanceMode, isMobileDevice]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = rotationX.get();
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Stars radius={100} depth={50} count={performanceMode ? 600 : isMobileDevice ? 1500 : 3000} factor={6} saturation={0} fade speed={2} />
      <ParticleField scrollYProgress={scrollYProgress} particleCount={performanceMode ? 600 : isMobileDevice ? 1200 : 2000} />
      
      {/* Multiple Particle Layers for Depth */}
      <Points positions={secondaryPoints}>
        <PointMaterial transparent color="#a855f7" size={0.05} sizeAttenuation={true} depthWrite={false} blending={THREE.AdditiveBlending} />
      </Points>

      {/* Cinematic Grid System */}
      <group position-y={gridY.get()}>
        <gridHelper args={[200, 100, "#06f9f9", "#051515"]} position={[0, -10, 0]} />
        <gridHelper args={[200, 100, "#a855f7", "#150515"]} position={[0, 10, 0]} rotation={[Math.PI, 0, 0]} />
      </group>
      
      {/* Data Streams */}
      {dataStreams.map((stream) => (
        <DataStream 
          key={stream.key} 
          position={stream.position} 
          color={stream.color} 
          scrollYProgress={scrollYProgress}
        />
      ))}

      {!performanceMode && !isMobileDevice && (
        <EffectComposer>
          <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.9} height={500} intensity={2.5} />
          <Noise opacity={0.08} />
          <Vignette eskil={false} offset={0.1} darkness={1.2} />
          <ChromaticAberration offset={new THREE.Vector2(0.002, 0.002)} />
        </EffectComposer>
      )}
      {!performanceMode && isMobileDevice && (
        <EffectComposer>
          <Bloom luminanceThreshold={0.15} luminanceSmoothing={0.9} height={300} intensity={1.4} />
          <Noise opacity={0.03} />
        </EffectComposer>
      )}
    </group>
  );
};

const ExperienceToggle = ({
  mode,
  onChange,
}: {
  mode: ExperienceMode;
  onChange: (mode: ExperienceMode) => void;
}) => (
  <div className="fixed left-1/2 -translate-x-1/2 bottom-4 md:bottom-6 z-[120] rounded-2xl border border-white/15 bg-background-dark/80 backdrop-blur-xl p-2">
    <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] px-2 pb-2 text-slate-400">
      Experience
    </div>
    <div className="flex gap-2">
      <button
        onClick={() => onChange('simple')}
        className={`px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-colors ${
          mode === 'simple'
            ? 'bg-primary text-background-dark border-primary'
            : 'bg-white/5 text-slate-300 border-white/15'
        }`}
      >
        Simple
      </button>
      <button
        onClick={() => onChange('full')}
        className={`px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-colors ${
          mode === 'full'
            ? 'bg-primary text-background-dark border-primary'
            : 'bg-white/5 text-slate-300 border-white/15'
        }`}
      >
        Full
      </button>
    </div>
  </div>
);

// --- UI Components ---

const TextScramble = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "!<>-_\\/[]{}=+*^?#________";

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(prev => 
        text.split("").map((char, index) => {
          if (index < iteration) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayText}</span>;
};

const HologramCard = ({
  children,
  className = "",
  noGlow = false,
  compactGlow = false,
}: {
  children: React.ReactNode;
  className?: string;
  noGlow?: boolean;
  compactGlow?: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setGlowPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`relative group ${className}`}
    >
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${glowPos.x}px ${glowPos.y}px, rgba(6, 249, 249, 0.1), transparent 40%)`
        }}
      />
      {!noGlow && (
        <div
          className={`absolute bg-gradient-to-r from-primary to-accent-purple rounded-3xl transition duration-1000 group-hover:duration-200 ${
            compactGlow
              ? '-inset-[1px] blur-[4px] opacity-12 group-hover:opacity-20'
              : '-inset-0.5 blur opacity-20 group-hover:opacity-40'
          }`}
        ></div>
      )}
      <div className="relative bg-surface-dark/60 backdrop-blur-2xl rounded-3xl border border-white/10 p-8 overflow-hidden">
        {/* Scanline Effect */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
        {children}
      </div>
    </div>
  );
};

const HUDElement = ({ className = "" }: { className?: string }) => (
  <div className={`hidden md:block absolute pointer-events-none opacity-20 font-mono text-[8px] uppercase tracking-widest ${className}`}>
    <div className="flex flex-col gap-1">
      <div className="flex justify-between gap-4">
        <span>LAT: 34.0522 N</span>
        <span>LNG: 118.2437 W</span>
      </div>
      <div className="h-[1px] w-full bg-white/20" />
      <div className="flex justify-between">
        <span>ALT: 4500M</span>
        <span>SPD: 0.85M</span>
      </div>
    </div>
  </div>
);

const GlitchText = ({ text }: { text: string }) => {
  return (
    <div className="relative inline-block">
      <span className="relative z-10">{text}</span>
      <motion.span 
        animate={{ 
          x: [0, -2, 2, -1, 0],
          opacity: [0, 0.5, 0.2, 0.5, 0]
        }}
        transition={{ repeat: Infinity, duration: 0.2, repeatDelay: 3 }}
        className="absolute inset-0 z-0 text-primary blur-[2px] translate-x-1"
      >
        {text}
      </motion.span>
      <motion.span 
        animate={{ 
          x: [0, 2, -2, 1, 0],
          opacity: [0, 0.5, 0.2, 0.5, 0]
        }}
        transition={{ repeat: Infinity, duration: 0.2, repeatDelay: 3.1 }}
        className="absolute inset-0 z-0 text-accent-purple blur-[2px] -translate-x-1"
      >
        {text}
      </motion.span>
    </div>
  );
};

const Badge = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest ${className}`}
  >
    {children}
  </motion.div>
);

const SectionTitle = ({ title, subtitle }: { title: string, subtitle?: string }) => {
  const [isInView, setIsInView] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      onViewportEnter={() => setIsInView(true)}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="mb-16 space-y-4"
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false }}
        className="flex items-center gap-4"
      >
        <div className="h-[1px] w-12 bg-primary" />
        <span className="text-xs font-black text-primary uppercase tracking-[0.3em]">
          {isInView ? <TextScramble text="System.Initialize()" /> : "System.Initialize()"}
        </span>
      </motion.div>
      <motion.h2 
        initial={{ opacity: 0, x: -50, skewX: -10 }}
        whileInView={{ opacity: 1, x: 0, skewX: 0 }}
        viewport={{ once: false }}
        transition={{ type: "spring", stiffness: 100 }}
        className="text-5xl md:text-8xl font-black tracking-tighter uppercase"
      >
        {isInView ? <TextScramble text={title} /> : title}
      </motion.h2>
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 max-w-2xl text-lg leading-relaxed border-l-2 border-white/10 pl-6"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

type Artifact = {
  id: string;
  title: string;
  role: string;
  type: 'video' | 'image';
  src: string;
  tags: string[];
};

const ArtifactCard = ({
  project,
  index,
  variant,
}: {
  project: Artifact;
  index: number;
  variant: 'videoGrid' | 'imageCarousel';
}) => {
  const [hasMediaError, setHasMediaError] = useState(false);
  const [isPortraitVideo, setIsPortraitVideo] = useState(false);
  const isImageCarousel = variant === 'imageCarousel';

  return (
    <motion.div 
      initial={isImageCarousel ? { opacity: 0, rotateY: 45, scale: 0.8 } : { opacity: 0, x: 200, rotateY: -45, scale: 0.8 }}
      whileInView={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
      viewport={{ once: !isImageCarousel, margin: "-50px" }}
      transition={{ 
        type: "spring", 
        stiffness: 40, 
        damping: 12,
        delay: index * 0.15,
        duration: 1
      }}
      whileHover={
        isImageCarousel
          ? { scale: 1.1, rotateY: 15, z: 100, boxShadow: "0 0 50px rgba(6, 249, 249, 0.35)" }
          : undefined
      }
      className={`perspective-2000 ${isImageCarousel ? 'flex-shrink-0 w-80 md:w-[360px]' : ''}`}
    >
      <HologramCard className="group cursor-pointer hover:scale-[1.02] transition-transform duration-500">
        <div className="aspect-[16/10] w-full bg-slate-900/50 relative rounded-2xl overflow-hidden mb-8 border border-white/5">
          {!hasMediaError && project.type === 'image' && (
            <img 
              className="object-contain w-full h-full transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100 bg-black/30" 
              src={project.src} 
              alt={project.title}
              loading="lazy"
              onError={() => setHasMediaError(true)}
              referrerPolicy="no-referrer"
            />
          )}
          {!hasMediaError && project.type === 'video' && (
            <video
              className={`w-full h-full transition-transform duration-1000 ease-out opacity-80 group-hover:opacity-100 ${
                isPortraitVideo ? 'object-contain' : 'object-cover group-hover:scale-110'
              }`}
              src={project.src}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              onLoadedMetadata={(event) => {
                const videoEl = event.currentTarget;
                setIsPortraitVideo(videoEl.videoHeight > videoEl.videoWidth);
              }}
              onError={() => setHasMediaError(true)}
            />
          )}
          {hasMediaError && (
            <div className="w-full h-full flex items-center justify-center text-center px-6">
              <p className="text-[11px] font-mono text-slate-400">
                Add file:
                <br />
                <span className="text-primary">{project.src}</span>
              </p>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-transparent to-transparent" />
          {!hasMediaError && isImageCarousel && (
            <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(6,249,249,0.06)_50%,transparent_100%)] bg-[length:100%_4px] opacity-70 pointer-events-none animate-scan" />
          )}
        </div>
        <div className="space-y-4">
          <div className="flex gap-2">
            {project.tags.map((tag: string, i: number) => (
              <span key={i} className={`text-[9px] font-black px-2 py-1 rounded tracking-widest uppercase ${i === 0 ? 'bg-primary text-background-dark' : 'bg-white/5 text-slate-400'}`}>
                {tag}
              </span>
            ))}
          </div>
          <h4 className="text-3xl font-black tracking-tighter group-hover:text-primary transition-colors uppercase">{project.title}</h4>
          <p className="text-sm text-slate-500 font-mono tracking-tight">{project.role}</p>
        </div>
      </HologramCard>
    </motion.div>
  );
};

const ParallaxSection = ({ children, id, className = "" }: { children: React.ReactNode, id?: string, className?: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <motion.section 
      ref={ref} 
      id={id} 
      style={{ y }} 
      className={className}
    >
      {children}
    </motion.section>
  );
};

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div 
      className="fixed top-0 left-0 size-6 border border-primary rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:flex items-center justify-center"
      animate={{ 
        x: position.x - 12, 
        y: position.y - 12,
        scale: isPointer ? 2 : 1,
        rotate: isPointer ? 45 : 0
      }}
      transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
    >
      <div className="size-1 bg-primary rounded-full" />
    </motion.div>
  );
};

const SystemBoot = ({ onComplete }: { onComplete: () => void }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const allLogs = [
    "INITIALIZING NEURAL LINK...",
    "ESTABLISHING SECURE PROTOCOLS...",
    "LOADING 3D TECH SPACE...",
    "SYNCING DIGITAL ARTIFACTS...",
    "SYSTEM READY."
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < allLogs.length) {
        setLogs(prev => [...prev, allLogs[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 1000);
      }
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      exit={{ opacity: 0, scale: 1.1 }}
      className="fixed inset-0 z-[10000] bg-background-dark flex items-center justify-center p-10 font-mono"
    >
      <div className="max-w-md w-full space-y-4">
        <div className="flex items-center gap-4 mb-8">
          <Terminal className="text-primary size-8 animate-pulse" />
          <h1 className="text-2xl font-black tracking-tighter uppercase">ZIA.OS v1.0.0</h1>
        </div>
        <div className="space-y-2">
          {logs.map((log, i) => (
            <div key={i} className="flex gap-4 text-[10px] tracking-[0.2em]">
              <span className="text-primary">[OK]</span>
              <span className="text-slate-400">{log}</span>
            </div>
          ))}
        </div>
        <div className="pt-8">
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.5, ease: "linear" }}
              className="h-full bg-primary"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const HackerOverlay = () => {
  const [code, setCode] = useState<string[]>([]);
  
  useEffect(() => {
    const chars = "0123456789ABCDEF<>[]{}/\\|!@#$%^&*()_+";
    const generateLine = () => Array.from({ length: 20 }).map(() => chars[Math.floor(Math.random() * chars.length)]).join("");
    
    const interval = setInterval(() => {
      setCode(prev => [generateLine(), ...prev.slice(0, 30)]);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none opacity-[0.03] font-mono text-[8px] overflow-hidden z-[5]">
      <div className="flex gap-4 p-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="flex flex-col">
            {code.map((line, j) => <span key={j}>{line}</span>)}
          </div>
        ))}
      </div>
    </div>
  );
};

const ScannerLine = () => (
  <motion.div 
    animate={{ top: ["0%", "100%", "0%"] }}
    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    className="fixed left-0 right-0 h-[1px] bg-primary/20 shadow-[0_0_15px_rgba(6,249,249,0.5)] z-[60] pointer-events-none"
  />
);

const CertificateCarousel = () => {
  const [selectedCertificate, setSelectedCertificate] = useState<null | {
    title: string;
    issuer: string;
    date: string;
    file: string;
    type: 'image' | 'pdf';
  }>(null);

  const certificates: Array<{
    title: string;
    issuer: string;
    date: string;
    file: string;
    type: 'image' | 'pdf';
  }> = [
    { title: "TESDA National Certificate", issuer: "TESDA", date: "2024", file: "/certificates/tesda.png", type: 'image' },
  ];

  return (
    <section className="py-40 px-6 max-w-7xl mx-auto relative">
      <SectionTitle title="Neural Credentials" subtitle="TESDA certification and verified technical competency." />
      
      <div className="grid grid-cols-1 gap-10 pb-10 max-w-3xl mx-auto">
        {certificates.map((cert, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 80, rotateX: 20, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 90, damping: 16, delay: i * 0.12 }}
            whileHover={{
              scale: 1.03,
              rotateZ: -1.5,
              boxShadow: "0 0 40px rgba(6, 249, 249, 0.22)"
            }}
            className="relative group cursor-pointer"
            onClick={() => setSelectedCertificate(cert)}
          >
            <HologramCard className="h-[420px] p-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent-purple/10" />
              {cert.type === 'image' ? (
                <img
                  src={cert.file}
                  alt={cert.title}
                  className="w-full h-full object-contain bg-black/40 opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-black/40 px-8 text-center">
                  <Box className="size-16 text-primary" />
                  <p className="font-mono text-sm text-slate-300 uppercase tracking-[0.2em]">TESDA NC Document</p>
                  <p className="text-xs text-slate-400 max-w-md">
                    Click to preview this certificate in-app or open the original PDF.
                  </p>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-background-dark to-transparent">
                <Badge className="mb-4">{cert.date}</Badge>
                <h4 className="text-2xl font-black uppercase tracking-tighter mb-1">{cert.title}</h4>
                <p className="text-xs font-mono text-primary">{cert.issuer}</p>
              </div>
              <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(6,249,249,0.05)_50%,transparent_100%)] bg-[length:100%_4px] animate-scan" />
            </HologramCard>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-8 bg-background-dark/90 backdrop-blur-xl"
            onClick={() => setSelectedCertificate(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
              className="w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <HologramCard className="p-0 overflow-hidden">
                <div className="p-4 md:p-6 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="size-2 bg-primary rounded-full animate-pulse" />
                    <div>
                      <h4 className="text-sm md:text-base font-black uppercase tracking-widest text-primary">
                        {selectedCertificate.title}
                      </h4>
                      <p className="text-[10px] md:text-xs font-mono text-slate-400">
                        {selectedCertificate.issuer} - {selectedCertificate.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={selectedCertificate.file}
                      target="_blank"
                      rel="noreferrer"
                      className="size-9 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                      aria-label="Open certificate file"
                    >
                      <ExternalLink className="size-4 text-slate-300" />
                    </a>
                    <button
                      onClick={() => setSelectedCertificate(null)}
                      className="size-9 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                      aria-label="Close certificate preview"
                    >
                      <X className="size-5 text-slate-300" />
                    </button>
                  </div>
                </div>
                <div className="bg-black/50 max-h-[78vh] overflow-auto">
                  {selectedCertificate.type === 'pdf' ? (
                    <iframe
                      src={selectedCertificate.file}
                      title={selectedCertificate.title}
                      className="w-full h-[78vh] border-0"
                    />
                  ) : (
                    <img
                      src={selectedCertificate.file}
                      alt={selectedCertificate.title}
                      className="w-full h-auto object-contain"
                    />
                  )}
                </div>
              </HologramCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const HackerConsole = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const messages = [
    "ACCESSING CORE...",
    "BYPASSING FIREWALL...",
    "DECRYPTING DATA...",
    "UPLOADING PAYLOAD...",
    "CONNECTION SECURE",
    "ROOT ACCESS GRANTED",
    "TRACING IP...",
    "ENCRYPTING PACKETS..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs(prev => [messages[Math.floor(Math.random() * messages.length)], ...prev.slice(0, 5)]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden md:block fixed bottom-10 left-10 z-[60] pointer-events-none font-mono text-[8px] text-primary/40 space-y-1">
      {logs.map((log, i) => (
        <div key={i} className="flex gap-2">
          <span>{new Date().toLocaleTimeString()}</span>
          <span>{log}</span>
        </div>
      ))}
    </div>
  );
};

type FullPortfolioProps = {
  experienceMode: ExperienceMode;
  isMobileDevice: boolean;
};

export default function FullPortfolio({
  experienceMode,
  isMobileDevice,
}: FullPortfolioProps) {
  const performanceMode = experienceMode === 'simple';
  const [isBooted, setIsBooted] = useState(performanceMode);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    window.localStorage.setItem(EXPERIENCE_MODE_KEY, experienceMode);
    if (experienceMode === 'simple') setIsBooted(true);
  }, [experienceMode]);

  const videoArtifacts: Artifact[] = useMemo(() => {
    return [
      {
        id: 'video-01',
        title: 'Residential House 3D Architectural Visualization',
        role: 'Course Project - 3D architectural visualization of a residential house using SketchUp and rendering tools',
        type: 'video' as const,
        src: '/artifacts/videos/video-01.mp4',
        tags: ['COURSEWORK', 'ARCHVIZ'],
      },
      {
        id: 'video-02',
        title: 'FORDA FILO Digital Animated Cartoon',
        role: 'Course Project - Character illustration and short-form animation using digital illustration applications',
        type: 'video' as const,
        src: '/artifacts/videos/video-02.mp4',
        tags: ['COURSEWORK', 'ANIMATION'],
      },
      {
        id: 'video-03',
        title: 'Enrollment Process Demo (Freshmen and Transferees)',
        role: 'Course Project - Panpacific University enrollment demo in animation for freshmen and transferee applicants',
        type: 'video' as const,
        src: '/artifacts/videos/video-03.mp4',
        tags: ['COURSEWORK', 'ENROLLMENT'],
      },
      {
        id: 'video-04',
        title: 'Enrollment Process Demo (Continuing and Returning)',
        role: 'Course Project - Panpacific University enrollment demo in animation for continuing and returning students',
        type: 'video' as const,
        src: '/artifacts/videos/video-04.mp4',
        tags: ['COURSEWORK', 'ENROLLMENT'],
      },
      {
        id: 'video-05',
        title: 'PSNTI RouteCalc Android App',
        role: 'Course Project - Android Studio mobile application for route, distance, and fare calculation',
        type: 'video' as const,
        src: '/artifacts/videos/video-05.mp4',
        tags: ['COURSEWORK', 'ANDROID APP'],
      },
      {
        id: 'video-06',
        title: 'Neon Laser Tag Mini Game',
        role: 'Personal Project - Android Studio mini game inspired by arcade-style laser tag with a neon visual theme',
        type: 'video' as const,
        src: '/artifacts/videos/video-06.mp4',
        tags: ['PERSONAL', 'ANDROID GAME'],
      },
      {
        id: 'video-07',
        title: 'ABOUT ME Animation',
        role: 'Course Project - Hand-drawn FlipaClip character sketch animation introducing my identity and style',
        type: 'video' as const,
        src: '/artifacts/videos/video-07.mp4',
        tags: ['COURSEWORK', 'FLIPACLIP'],
      },
      {
        id: 'video-08',
        title: 'Why IT in Panpacific University',
        role: 'Course Project - Frame-by-frame concept animation on why choose Information Technology at Panpacific University',
        type: 'video' as const,
        src: '/artifacts/videos/video-08.mp4',
        tags: ['COURSEWORK', 'EDUCATION'],
      },
      {
        id: 'video-09',
        title: 'PU Queue Web App',
        role: 'Course Project - Whole-university office management system for queueing, requests, and office workflows',
        type: 'video' as const,
        src: '/artifacts/videos/video-09.mp4',
        tags: ['COURSEWORK', 'WEB APP'],
      },
      {
        id: 'video-10',
        title: 'Lingkod-Ani',
        role: 'Course Project - Barangay monitoring and communication website for agriculture services',
        type: 'video' as const,
        src: '/artifacts/videos/video-10.mp4',
        tags: ['COURSEWORK', 'WEB APP'],
      },
    ];
  }, []);

  const imageArtifacts: Artifact[] = useMemo(() => {
    return [
      {
        id: 'image-01',
        title: 'RateMyDay Mobile UI System',
        role: 'Course Project - High-fidelity mobile screens for activity tracking',
        type: 'image' as const,
        src: '/artifacts/images/image-01.png',
        tags: ['COURSEWORK', 'MOBILE UI'],
      },
      {
        id: 'image-02',
        title: 'Activity Tracker Low-Fidelity Wireframe',
        role: 'Course Project - Early-stage mobile flow planning',
        type: 'image' as const,
        src: '/artifacts/images/image-02.png',
        tags: ['COURSEWORK', 'WIREFRAME'],
      },
      {
        id: 'image-03',
        title: 'Eco-Life Website Wireframe Boards',
        role: 'Course Project - Layout planning for a sustainability website',
        type: 'image' as const,
        src: '/artifacts/images/image-03.jpg',
        tags: ['COURSEWORK', 'WEB WIREFRAME'],
      },
      {
        id: 'image-04',
        title: 'Good vs Bad Design Study',
        role: 'Course Project - Visual design comparison and composition exercise',
        type: 'image' as const,
        src: '/artifacts/images/image-04.png',
        tags: ['COURSEWORK', 'DESIGN'],
      },
      {
        id: 'image-05',
        title: 'Smart ID Wallet Product Mockup',
        role: 'Course Project - Product concept rendering and presentation',
        type: 'image' as const,
        src: '/artifacts/images/image-05.png',
        tags: ['COURSEWORK', 'PRODUCT'],
      },
      {
        id: 'image-06',
        title: 'Eco-Life Sustainability Website',
        role: 'Course Project - Interface design for an environmental website, prototyped in Figma before development',
        type: 'image' as const,
        src: '/artifacts/images/image-06.jpg',
        tags: ['COURSEWORK', 'WEB DESIGN'],
      },
      {
        id: 'image-07',
        title: 'Eco-Life Detail Screens',
        role: 'Course Project - Supporting webpages and sections for the Eco-Life website experience',
        type: 'image' as const,
        src: '/artifacts/images/image-07.jpg',
        tags: ['COURSEWORK', 'UI DETAIL'],
      },
      {
        id: 'image-08',
        title: 'AccessLearn Website',
        role: 'Course Project - Inclusive learning platform website prototyped in Figma before development',
        type: 'image' as const,
        src: '/artifacts/images/image-08.png',
        tags: ['COURSEWORK', 'WEB ACCESSIBILITY'],
      },
      {
        id: 'image-09',
        title: 'AccessLearn Website Authentication Flow',
        role: 'Course Project - Supporting login and sign-up webpages for the AccessLearn website prototype',
        type: 'image' as const,
        src: '/artifacts/images/image-09.png',
        tags: ['COURSEWORK', 'AUTH FLOW'],
      },
      {
        id: 'image-10',
        title: 'AccessLearn Website Dashboard',
        role: 'Course Project - Supporting student dashboard webpage for the AccessLearn website prototype',
        type: 'image' as const,
        src: '/artifacts/images/image-10.png',
        tags: ['COURSEWORK', 'DASHBOARD'],
      },
    ];
  }, []);

  const contactLinks = [
    {
      href: 'mailto:luwiyeyz@gmail.com',
      label: 'Email Me',
      icon: Mail,
    },
    {
      href: '/resume/BigDataMARIANO_RESUME.pdf',
      label: 'Download Resume',
      icon: ExternalLink,
      download: true,
    },
    {
      href: '#work',
      label: 'View Projects',
      icon: ChevronRight,
    },
  ];

  return (
    <MotionConfig reducedMotion={performanceMode ? "always" : "never"}>
    <div className={`bg-background-dark text-white font-display selection:bg-primary/30 selection:text-primary overflow-x-clip ${performanceMode ? '' : 'cursor-none'} ${performanceMode ? 'simple-mode' : ''}`}>
      {performanceMode && (
        <style>{`
          .simple-mode * {
            animation-duration: 0s !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0s !important;
          }
        `}</style>
      )}
      <AnimatePresence>
        {!isBooted && <SystemBoot onComplete={() => setIsBooted(true)} />}
      </AnimatePresence>
      
      {!performanceMode && <HackerOverlay />}
      {!performanceMode && <ScannerLine />}
      {!performanceMode && <HackerConsole />}
      {!performanceMode && <CustomCursor />}
      {/* 3D Background */}
      <div className={`fixed inset-0 z-0 pointer-events-none overflow-hidden transition-opacity duration-1000 ${isBooted ? 'opacity-100' : 'opacity-0'}`}>
        <Canvas
          shadows={!performanceMode}
          dpr={performanceMode ? (isMobileDevice ? [0.5, 0.8] : [0.75, 1]) : (isMobileDevice ? [0.75, 1.25] : [1, 2])}
          style={{ width: '100vw', height: '100vh', display: 'block' }}
          gl={{
            antialias: !performanceMode,
            powerPreference: performanceMode ? "low-power" : "high-performance",
          }}
          performance={{ min: 0.5 }}
        >
          <Suspense fallback={null}>
            <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={50} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <Scene performanceMode={performanceMode} isMobileDevice={isMobileDevice} />
            {!performanceMode && <Environment preset="city" />}
            {!performanceMode && <ContactShadows position={[0, -4.5, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />}
          </Suspense>
        </Canvas>
      </div>

      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-primary z-[100] origin-left" style={{ scaleX }} />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 glass-nav border-b border-white/5 transition-opacity duration-1000 ${isBooted ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="size-8 bg-primary rounded flex items-center justify-center rotate-3 group-hover:rotate-12 transition-transform">
              <Terminal className="text-background-dark size-5" />
            </div>
            <h1 className="text-xl font-black tracking-tighter uppercase">ZIA.DEV</h1>
          </motion.div>
          
          <div className="hidden md:flex items-center gap-10">
            {['Work', 'Stack', 'About', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-[10px] font-black uppercase tracking-[0.3em] hover:text-primary transition-colors">
                {item}
              </a>
            ))}
          </div>

          <a
            href="mailto:luwiyeyz@gmail.com"
            className="px-6 py-2 bg-white/5 border border-white/10 text-white font-black rounded-full text-[10px] uppercase tracking-widest hover:bg-primary hover:text-background-dark transition-all"
          >
            Email Me
          </a>
        </div>
      </nav>

      <main className={`relative z-10 transition-opacity duration-1000 ${isBooted ? 'opacity-100' : 'opacity-0'}`}>
        {/* Section 1: Hero - Scale Zoom Transition */}
        <section className="min-h-screen flex items-center justify-center px-6 pt-32 md:pt-36 relative">
          <HUDElement className="top-40 left-10" />
          <HUDElement className="bottom-40 right-10" />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-center space-y-10"
          >
            <Badge>
              <Activity className="size-3" />
              <TextScramble text="Neural Link Established" />
            </Badge>
            <h2 className="text-5xl md:text-7xl lg:text-[10rem] font-black leading-[0.85] tracking-tighter max-w-6xl mx-auto uppercase">
              ARCHITECTING <GlitchText text="CYBER" /> REALITIES
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-mono">
              I build meaningful digital solutions by combining data analysis, machine learning, and creative design.
            </p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6"
            >
              <a
                href="#work"
                className={HERO_ACTION_FILLED_CLASS}
              >
                View Projects
              </a>
              <a
                href="/resume/BigDataMARIANO_RESUME.pdf"
                download
                className={HERO_ACTION_FILLED_CLASS}
              >
                Download Resume
              </a>
              <a
                href="mailto:luwiyeyz@gmail.com"
                className={HERO_ACTION_FILLED_CLASS}
              >
                Email Me
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* Section 2: Proof - Elastic Pop-up Transition */}
        <ParallaxSection className="py-40 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: <Bot className="size-12 text-primary" />, title: "Machine Learning Projects", desc: "Building AI models using Python, TensorFlow, and YOLO." },
              { icon: <BarChart3 className="size-12 text-accent-purple" />, title: "Data Analytics Systems", desc: "Data cleaning, visualization, and predictive analysis." },
              { icon: <Code className="size-12 text-primary" />, title: "Creative Technology", desc: "User-focused systems that blend technical problem-solving with visual communication." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 100, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  type: "spring", 
                  stiffness: 100, 
                  damping: 15, 
                  delay: i * 0.2 
                }}
              >
                <HologramCard className="h-full">
                  <div className="mb-8 group-hover:rotate-12 transition-transform">{item.icon}</div>
                  <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed font-mono text-sm">{item.desc}</p>
                </HologramCard>
              </motion.div>
            ))}
          </div>
        </ParallaxSection>

        {/* Section 3: Work - Skew Reveal Transition */}
        <ParallaxSection id="work" className="py-40 px-6 max-w-7xl mx-auto">
          <SectionTitle 
            title="Digital Artifacts" 
            subtitle="Selected course projects and self-initiated builds across animation, Android applications, web systems, dashboards, and visual design." 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
            {videoArtifacts.slice(0, 4).map((p, i) => (
              <ArtifactCard key={p.id} project={p} index={i} variant="videoGrid" />
            ))}
          </div>
          <div className="flex gap-10 overflow-x-auto no-scrollbar pb-20 perspective-2000 mb-16">
            {imageArtifacts.slice(0, 5).map((p, i) => (
              <ArtifactCard key={p.id} project={p} index={i} variant="imageCarousel" />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
            {videoArtifacts.slice(4, 8).map((p, i) => (
              <ArtifactCard key={p.id} project={p} index={i} variant="videoGrid" />
            ))}
          </div>
          <div className="flex gap-10 overflow-x-auto no-scrollbar pb-20 perspective-2000 mb-16">
            {imageArtifacts.slice(5, 10).map((p, i) => (
              <ArtifactCard key={p.id} project={p} index={i} variant="imageCarousel" />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {videoArtifacts.slice(8, 10).map((p, i) => (
              <ArtifactCard key={p.id} project={p} index={i} variant="videoGrid" />
            ))}
          </div>
          <div className="mt-20">
            <SectionTitle
              title="Project Highlights"
              subtitle="A broader set of coursework, design builds, analytics work, and competition outputs."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Student Information Systems and Advanced Calculators (CCC112, CCC123, OOP134)',
                  desc: 'Developed student information systems to automate administrative processes and manage data efficiently. Designed advanced calculators for complex mathematical operations with user-friendly interfaces.',
                },
                {
                  title: 'Environment Website (HCI122)',
                  desc: 'Designed and prototyped an interactive website promoting environmental awareness, with usability and accessibility considerations using Figma.',
                },
                {
                  title: 'Mini Grocery System and Fruit Grocery Database (CCC123, CCC124)',
                  desc: 'Built a beginner POS system for inventory and sales, and created an MS Access database to track fruit inventory and pricing.',
                },
                {
                  title: 'Philippine Junior Data Science Challenge 2023',
                  desc: 'Developed client segmentation strategies for underserved areas and recommended targeted products and next-best actions as a Top 15 qualifier.',
                },
                {
                  title: 'Car Insurance Analysis (Onyx August Data Challenge)',
                  desc: 'Analyzed a 32k+ row dataset using Power BI and delivered actionable insights recognized by global professionals.',
                },
                {
                  title: 'COVID-19 OWID Dataset Analysis (UP Statistical Society Challenge)',
                  desc: 'Performed data wrangling, visualization, and regression analysis in Python, then presented findings in a clear narrative format.',
                },
                {
                  title: 'Flipkart Dataset Analysis (SIDHI Hackathon)',
                  desc: 'Cleaned and analyzed e-commerce data with Python and delivered insights using a visually structured data poster.',
                },
                {
                  title: 'Wind Turbine Object Detection Model',
                  desc: 'Trained a YOLOv8 model on a large dataset and achieved 89.6% accuracy in wind turbine detection.',
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <HologramCard className="h-full">
                    <h4 className="text-xl font-black uppercase tracking-tight mb-4">{item.title}</h4>
                    <p className="text-slate-400 text-sm font-mono leading-relaxed">{item.desc}</p>
                  </HologramCard>
                </motion.div>
              ))}
            </div>
          </div>
        </ParallaxSection>

        {/* Section: Certificates - 3D Carousel */}
        <CertificateCarousel />

        {/* Section 4: Stack - Bento Grid Reveal */}
        <ParallaxSection id="stack" className="py-40 px-6 max-w-7xl mx-auto">
          <SectionTitle title="Skills & Interests" subtitle="Organized by core capability areas for clear technical depth." />
          <div className="space-y-10">
            {[
              {
                category: 'Programming',
                items: ['Python', 'Java', 'JavaScript', 'C# (Beginner)', 'PHP', 'SQL'],
              },
              {
                category: 'Web Development',
                items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Angular', 'Next.js', 'Tailwind CSS', 'Node.js', 'Firebase'],
              },
              {
                category: '3D & Frontend Systems',
                items: ['Three.js', 'Framer Motion'],
              },
              {
                category: 'Data & AI',
                items: ['Pandas', 'NumPy', 'scikit-learn', 'TensorFlow', 'Jupyter', 'Power BI', 'Tableau', 'Excel', 'MySQL', 'PostgreSQL', 'Microsoft Access'],
              },
              {
                category: 'Automation',
                items: ['Selenium', 'Requests'],
              },
              {
                category: 'Creative Tools',
                items: ['Blender', 'Adobe Photoshop', 'Adobe Illustrator', 'Adobe Lightroom', 'DaVinci Resolve', 'Mobile Illustration Apps'],
              },
            ].map((group, groupIndex) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: groupIndex * 0.08 }}
              >
                <HologramCard className="p-8">
                  <h3 className="text-2xl font-black uppercase tracking-tighter mb-6 text-primary">{group.category}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {group.items.map((tech) => (
                      <div
                        key={tech}
                        className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm md:text-base font-black uppercase tracking-wide text-slate-200"
                      >
                        {tech}
                      </div>
                    ))}
                  </div>
                </HologramCard>
              </motion.div>
            ))}
          </div>
        </ParallaxSection>

        {/* Section 5: About - Split Screen Reveal */}
        <ParallaxSection id="about" className="py-40 px-6 max-w-7xl mx-auto overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center gap-24">
            <motion.div 
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex-1"
            >
              <HologramCard className="p-4">
                <img 
                  src="/profile/profile.jpg"
                  className="w-full aspect-square object-contain bg-black/30 rounded-2xl grayscale hover:grayscale-0 transition-all duration-1000"
                  alt="Zia Mariano"
                />
              </HologramCard>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex-1 space-y-10"
            >
              <Badge>Profile.Initialize()</Badge>
              <h3 className="text-6xl font-black leading-tight uppercase tracking-tighter">I AM A <span className="italic text-primary">CREATIVE TECHNOLOGIST</span>.</h3>
              <p className="text-slate-400 text-xl leading-relaxed font-mono">
                [LOG]: I enjoy combining analytical thinking with creative design to build meaningful digital solutions across software, data analytics, and machine learning projects.
              </p>
              <div className="flex gap-12">
                <div>
                  <p className="text-5xl font-black text-primary">03+</p>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Years.Exp</p>
                </div>
                <div>
                  <p className="text-5xl font-black text-primary">15+</p>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Projects</p>
                </div>
              </div>
            </motion.div>
          </div>
        </ParallaxSection>

        {/* Section: Journey Log */}
        <ParallaxSection className="py-40 px-6 max-w-7xl mx-auto">
          <SectionTitle
            title="Journey Log"
            subtitle="From creative media to IT, data analytics, and machine learning."
          />
          <HologramCard>
            <p className="text-slate-300 text-lg leading-relaxed font-mono">
              I began my career in creative media and storytelling, then transitioned into Information Technology where I discovered a strong passion for data analytics, machine learning, and software development.
            </p>
            <p className="text-slate-400 text-lg leading-relaxed font-mono mt-6">
              My work combines analytical thinking, technical problem solving, and creative design to deliver practical and meaningful digital solutions.
            </p>
          </HologramCard>
        </ParallaxSection>

        {/* Section 6: Footer - Slam Reveal */}
        <ParallaxSection id="contact" className="py-40 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100 }}
            className="space-y-16"
          >
            <div className="space-y-6">
              <h2 className="text-7xl md:text-[12rem] font-black tracking-tighter uppercase leading-none">LET'S <span className="text-primary italic">SYNC</span></h2>
              <p className="text-slate-400 text-2xl font-mono">[SYSTEM]: Ready to take your project to the next dimension?</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8">
              {contactLinks.map(({ href, label, icon: Icon, download }) => (
                <motion.a 
                  key={label}
                  href={href}
                  download={download}
                  aria-label={label}
                  whileHover={{ y: -10, scale: 1.1 }}
                  className="size-20 rounded-3xl bg-surface-dark/60 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:text-primary hover:border-primary/50 transition-all shadow-2xl"
                >
                  <Icon className="size-10" />
                </motion.a>
              ))}
            </div>
            
            <div className="pt-32 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-slate-500 uppercase tracking-[0.4em] font-black">
              <p>Copyright 2026 Zia Louise Mariano. All Systems Operational.</p>
              <div className="flex gap-10">
                <a href="#work" className="hover:text-white transition-colors">Work</a>
                <a href="/resume/BigDataMARIANO_RESUME.pdf" download className="hover:text-white transition-colors">Resume</a>
                <a href="mailto:luwiyeyz@gmail.com" className="hover:text-white transition-colors">Email</a>
              </div>
            </div>
          </motion.div>
        </ParallaxSection>
      </main>
    </div>
    </MotionConfig>
  );
}







