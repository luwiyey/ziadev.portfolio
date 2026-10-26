export type Artifact = {
  id: string;
  title: string;
  role: string;
  type: "video" | "image";
  src: string;
  tags: string[];
  preview?: string;
  liveUrl?: string;
  liveLabel?: string;
  kind?: string;
  interactiveDemo?: string;
  walkthrough?: string;
  resources?: { label: string; href: string }[];
  categoryHint?: "Websites" | "Android apps" | "Animation & 3D" | "UI & design";
  accessNote?: string;
  details?: { overview: string; tools: string[]; features: string[] };
};

export type ContactLink = {
  href: string;
  label: string;
  icon: "mail" | "resume" | "work";
  download?: boolean;
};

export const heroTitle = "ARCHITECTING CYBER REALITIES";

// Store links are public references, not claims of sole authorship or current ownership.
export const clientContributions = [
  {
    name: "Ice Guys Jewelry",
    sector: "Jewelry & custom pieces",
    platform: "Shopify",
    href: "https://iceguysjewelry.com/",
    linkLabel: "View storefront",
    note: "Collaborative storefront work; current site may have evolved.",
  },
  {
    name: "Pet Purifair",
    sector: "Pet-care retail",
    platform: "Storefront",
    href: "https://purifair.com.au/pages/pets",
    linkLabel: "Current product page",
    note: "Original client brand: Pet Purifair.",
  },
  {
    name: "HappyCap",
    sector: "Product storefront",
    platform: "Shopify",
    href: "https://gethappycap.com/",
    linkLabel: "View storefront",
    note: "",
  },
  {
    name: "chebeauty",
    sector: "Hair-care retail",
    platform: "Shopify",
    href: "https://chebeauty.com/",
    linkLabel: "View storefront",
    note: "",
  },
  {
    name: "US Fireplace Store",
    sector: "Home & hearth retail",
    platform: "Shopify",
    href: "https://usfireplacestore.com/",
    linkLabel: "View storefront",
    note: "",
  },
  {
    name: "Save Rack",
    sector: "E-commerce fulfillment",
    platform: "Business website",
    href: "https://saverack.com/",
    linkLabel: "View website",
    note: "A fulfillment-services website, not a Shopify retail store.",
  },
  {
    name: "Holistic Vybez",
    sector: "Wellness retail",
    platform: "Historical client work",
    href: "",
    linkLabel: "",
    note: "Historical contribution. The original domain no longer represents the client, so it is not linked.",
  },
];
export const heroSubtitle =
  "I build meaningful digital solutions by combining data analysis, machine learning, and creative design.";

export const proofCards = [
  {
    title: "Machine Learning Projects",
    desc: "Building AI models using Python, TensorFlow, and YOLO.",
  },
  {
    title: "Data Analytics Systems",
    desc: "Data cleaning, visualization, and predictive analysis.",
  },
  {
    title: "Creative Technology",
    desc: "User-focused systems that blend technical problem-solving with visual communication.",
  },
];

export const videoArtifacts: Artifact[] = [
  {
    id: "video-01",
    title: "Residential House 3D Architectural Visualization",
    role: "Course Project - 3D architectural visualization of a residential house using SketchUp and rendering tools",
    type: "video",
    src: "/demos/video-01.mp4",
    tags: ["COURSEWORK", "ARCHVIZ"],
  },
  {
    id: "video-02",
    title: "FORDA FILO Digital Animated Cartoon",
    role: "Course Project - Character illustration and short-form animation using digital illustration applications",
    type: "video",
    src: "/demos/video-02.mp4",
    tags: ["COURSEWORK", "ANIMATION"],
  },
  {
    id: "video-03",
    title: "Enrollment Process Demo (Freshmen and Transferees)",
    role: "Course Project - Panpacific University enrollment demo in animation for freshmen and transferee applicants",
    type: "video",
    src: "/demos/video-03.mp4",
    tags: ["COURSEWORK", "ENROLLMENT"],
  },
  {
    id: "video-04",
    title: "Enrollment Process Demo (Continuing and Returning)",
    role: "Course Project - Panpacific University enrollment demo in animation for continuing and returning students",
    type: "video",
    src: "/demos/video-04.mp4",
    tags: ["COURSEWORK", "ENROLLMENT"],
  },
  {
    id: "video-05",
    title: "PSNTI RouteCalc Android App",
    role: "Course Project - Android Studio mobile application for route, distance, and fare calculation",
    type: "video",
    src: "/demos/video-05.mp4",
    tags: ["COURSEWORK", "ANDROID APP"],
  },
  {
    id: "video-06",
    title: "Neon Laser Tag Mini Game",
    role: "Personal Project - Android Studio mini game inspired by arcade-style laser tag with a neon visual theme",
    type: "video",
    src: "/demos/video-06.mp4",
    tags: ["PERSONAL", "ANDROID GAME"],
  },
  {
    id: "video-07",
    title: "ABOUT ME Animation",
    role: "Course Project - Hand-drawn FlipaClip character sketch animation introducing my identity and style",
    type: "video",
    src: "/demos/video-07.mp4",
    tags: ["COURSEWORK", "FLIPACLIP"],
  },
  {
    id: "video-08",
    title: "Why IT in Panpacific University",
    role: "Course Project - Frame-by-frame concept animation on why choose Information Technology at Panpacific University",
    type: "video",
    src: "/demos/video-08.mp4",
    tags: ["COURSEWORK", "EDUCATION"],
  },
  {
    id: "video-09",
    title: "PU Queue Web App",
    role: "Course Project - Whole-university office management system for queueing, requests, and office workflows",
    type: "video",
    src: "/demos/video-09.mp4",
    tags: ["COURSEWORK", "WEB APP"],
  },
  {
    id: "video-10",
    title: "Lingkod-Ani",
    role: "Course Project - Barangay monitoring and communication website for agriculture services",
    type: "video",
    src: "/demos/video-10.mp4",
    tags: ["COURSEWORK", "WEB APP"],
    preview: "/previews/lingkod-live.webp",
    liveUrl: "https://lingkod-ani.com/",
    accessNote:
      "The current website opens separately. The recorded walkthrough shows an earlier version. Live SMS and staff workspaces require authorized access.",
  },
];

export const additionalProjects: Artifact[] = [
  {
    id: "routecalc-web",
    title: "PSNTI RouteCalc - Web Beta",
    role: "Personal Project - Responsive fare calculation and trip-tally web application for bus conductors",
    type: "image",
    src: "/previews/routecalc-live.webp",
    liveUrl: "https://psntiroutecalcbeta.vercel.app/",
    tags: ["PERSONAL", "WEB APP", "BETA"],
    details: {
      overview:
        "The current web-based RouteCalc experience, alongside the original Android course project retained in this gallery.",
      tools: ["React", "Vite", "Tailwind CSS"],
      features: [
        "Multi-route fare calculation",
        "Conductor-focused fare and tally workflow",
        "Responsive browser-based interface",
      ],
    },
  },
  {
    id: "library-web",
    title: "PU Library Accession System",
    role: "Personal Project - Electronic accession book for library cataloguing, record review, reporting, and backups",
    type: "image",
    src: "/previews/library-live.webp",
    liveUrl: "https://pu-library-accession.vercel.app/",
    tags: ["PERSONAL", "WEB APP", "LIBRARY"],
    details: {
      overview:
        "A library workspace designed around careful, reviewable accession records and day-to-day librarian tasks.",
      tools: ["React", "TypeScript", "Vite", "Local-first workflows"],
      features: [
        "Accession records, import and export",
        "Record review, analytics, and history",
        "Backups and optional cross-device sharing",
      ],
    },
    accessNote:
      "The public application opens in a separate tab. Use sample data only when exploring; do not enter private library records.",
  },
  {
    id: "monte-royale",
    title: "Monte Royale Internship Admission",
    role: "Sample Project - Internship admission website built with Google Apps Script",
    kind: "Internship website sample",
    type: "image",
    src: "/previews/monte-royale.svg",
    liveUrl:
      "https://script.google.com/macros/s/AKfycbwHF8UXHktwCoeB5o9iKlxguxPi4Qk3w4Pa_Sny4pox/dev",
    liveLabel: "Open restricted sample",
    tags: ["SAMPLE", "GOOGLE APPS SCRIPT"],
    accessNote:
      "This is an editor-only Google Apps Script test deployment, not a public demo. Google sign-in and script editor access are required. A public deployment is pending; the illustration above is a project cover, not an application screenshot.",
    details: {
      overview:
        "An internship admission website sample for Monte Royale. The supplied test deployment is access-restricted, so its internal workflows have not been publicly verified.",
      tools: ["Google Apps Script"],
      features: [
        "Internship admission website sample",
        "Hosted through Google Apps Script",
        "Public preview pending a published deployment",
      ],
    },
  },
  {
    id: "zia-pos",
    title: "ZiaPOS - Cafe Point-of-Sale UI",
    role: "Personal Project - Windows desktop point-of-sale interface prototype built in Visual Studio Community",
    kind: "Desktop UI prototype",
    type: "image",
    src: "/previews/zia-pos.webp",
    tags: ["PERSONAL", "C#", "WINDOWS FORMS"],
    details: {
      overview:
        "A cafe point-of-sale screen with a product menu, numeric keypad, customer-order controls, and receipt actions. Identified from the original local C# project, not guessed from the screenshot.",
      tools: ["C#", "Windows Forms", ".NET Framework 4.7.2", "Visual Studio"],
      features: [
        "Cafe product-menu layout and keypad",
        "Order-management and receipt-control interface",
        "Desktop UI prototype; transaction and database logic are not implemented in the inspected source",
      ],
    },
  },
  ...[
    {
      id: "fieldwork",
      title: "Fieldwork - The Everyday Market",
      role: "Neighborhood grocery storefront with department browsing, unit prices, search, and a sample pickup or delivery basket",
      tools: ["React", "TypeScript", "Responsive CSS", "Cart state"],
      features: [
        "Brief: make a weekly grocery shop quick to scan",
        "Design decision: practical department navigation and visible pack prices, not a lifestyle-only landing page",
        "Working search, department filters, quantity controls, and sample delivery fee",
      ],
    },
    {
      id: "morrow",
      title: "Morrow - Dog Food Store",
      role: "Product-led pet-food concept with original packaging, recipe browsing, and a sample shopping bag",
      tools: ["React", "TypeScript", "Packaging design", "CSS"],
      features: [
        "Brief: help shoppers compare recipes without unverified health claims",
        "Design decision: oversized grotesque type, warm clay, dog photography, and readable product packs",
        "Recipe filters, pack preview selection, and editable sample bag",
      ],
    },
    {
      id: "halfcourt",
      title: "Halfcourt - Sports & Court Culture",
      role: "Athletic retail concept with dramatic court photography, original merchandise illustrations, and size-aware cart interactions",
      tools: ["React", "TypeScript", "SVG", "Barlow Condensed"],
      features: [
        "Brief: get players from the brand story to the right piece of gear",
        "Design decision: condensed sports typography and orange-on-charcoal contrast rather than editorial serif styling",
        "Category filters, required apparel sizes, and distinct cart lines per size",
      ],
    },
    {
      id: "ridgeline",
      title: "Ridgeline - Find Your Pace",
      role: "Landscape-led outdoor experience concept with a trail comparison index and sample group-price planner",
      tools: ["React", "TypeScript", "Space Grotesk", "CSS"],
      features: [
        "Brief: choose an outing by distance, duration, and difficulty",
        "Design decision: a comparison index instead of a repeated card grid",
        "Difficulty filters, route selection, and a bounded group-price calculator; no real booking",
      ],
    },
    {
      id: "clearline",
      title: "Clearline - Workflow Studio",
      role: "Technical B2B landing page with an explainable request-routing simulator and a manual-effort calculator",
      tools: ["React", "TypeScript", "Rule-based routing", "CSS"],
      features: [
        "Brief: make an automation service understandable before asking for trust",
        "Design decision: a single technical typeface and visible input, rule, and review stages",
        "Local request-routing simulation and time-estimate calculator; not a connected AI model",
      ],
    },
    {
      id: "fold",
      title: "Fold - Neighborhood Bakery",
      role: "Editorial bakery landing page with a browsable seasonal menu",
      tools: ["React", "CSS", "SVG illustration"],
      features: [
        "Filterable bakery menu",
        "Original bread illustrations",
        "Responsive editorial layout",
      ],
    },
    {
      id: "northline",
      title: "Northline - Architecture Studio",
      role: "Architecture studio website with a project index and material-led visual direction",
      tools: ["React", "CSS", "SVG illustration"],
      features: [
        "Residential and commercial project filters",
        "Project-detail viewer",
        "Responsive architectural compositions",
      ],
    },
    {
      id: "good-dog",
      title: "Good Dog - Grooming Studio",
      role: "Playful pet-care website with an interactive grooming estimate",
      tools: ["React", "CSS", "SVG illustration"],
      features: [
        "Dog-size and service selections",
        "Transparent demo pricing",
        "Accessible booking-preview dialog",
      ],
    },
    {
      id: "still",
      title: "Still - Photography Portfolio",
      role: "Art-directed photography website with collections and a keyboard-accessible lightbox",
      tools: ["React", "CSS", "Original visual studies"],
      features: [
        "Filterable photographic collections",
        "Image lightbox",
        "Editorial contact and commission section",
      ],
    },
    {
      id: "forma",
      title: "Forma - Objects & Shopify Theme",
      role: "Independent homeware storefront concept with an editable Shopify Liquid theme",
      tools: ["React", "Shopify Liquid", "CSS", "JavaScript"],
      features: [
        "Interactive product filters and demo cart",
        "Original product illustrations",
        "Editable Shopify theme source; not yet installed on a Shopify store",
      ],
    },
  ].map((concept) => ({
    id: "concept-" + concept.id,
    title: concept.title,
    role: "Concept Project - " + concept.role,
    kind: "Self-initiated concept",
    type: "image" as const,
    src: "/previews/concept-" + concept.id + ".webp",
    liveUrl: "/?concept=" + concept.id,
    liveLabel: "Explore concept",
    ...(["fieldwork", "morrow", "halfcourt", "ridgeline", "clearline"].includes(
      concept.id,
    )
      ? { walkthrough: "/walkthroughs/" + concept.id + ".mp4" }
      : {}),
    tags: [
      "CONCEPT",
      "FRONTEND",
      ...(concept.id === "forma" ? ["SHOPIFY THEME"] : []),
    ],
    accessNote:
      "An independent portfolio concept for a fictional business, not commissioned client work. Demo interactions do not send bookings, take payment, or collect personal details.",
    details: {
      overview: concept.role + ".",
      tools: concept.tools,
      features: concept.features,
    },
  })),
];

export const interactiveProjects: Artifact[] = [
  {
    id: "lab-budget",
    title: "Ledger - Monthly Money",
    categoryHint: "Websites",
    interactiveDemo: "budget",
    role: "Concept Project - A cash-flow workspace for reviewing expenses, recording transactions, and checking a monthly spending limit",
    tags: ["CONCEPT", "FINANCE UI", "REACT"],
  },
  {
    id: "lab-material",
    title: "Orbit Material Lab",
    categoryHint: "Animation & 3D",
    interactiveDemo: "material",
    role: "Concept Project - Interactive CSS 3D object study with color, speed, and view controls",
    tags: ["CONCEPT", "CSS 3D", "INTERACTIVE"],
  },
  {
    id: "lab-motion",
    title: "Motion Timing Studio",
    categoryHint: "Animation & 3D",
    interactiveDemo: "motion",
    role: "Concept Project - Hands-on keyframe animation study with easing, duration, and playback controls",
    tags: ["CONCEPT", "ANIMATION", "CSS KEYFRAMES"],
  },
  {
    id: "lab-design",
    title: "Palette & Type Studio",
    categoryHint: "UI & design",
    interactiveDemo: "design",
    role: "Concept Project - Interactive interface styling and text-contrast checker",
    tags: ["CONCEPT", "UI DESIGN", "ACCESSIBILITY"],
  },
  {
    id: "lab-board",
    title: "Focusboard",
    categoryHint: "Websites",
    interactiveDemo: "board",
    role: "Concept Project - A small interactive task board with add, move, and complete actions",
    tags: ["CONCEPT", "WEB APPLICATION", "PRODUCTIVITY"],
  },
].map((project) => ({
  ...project,
  type: "image" as const,
  categoryHint: project.categoryHint as Artifact["categoryHint"],
  kind: "Interactive browser concept",
  src: "/previews/" + project.id + ".svg",
  accessNote:
    "Try this demo inside the portfolio. Browser-only state resets when the viewer closes; no account, personal data, real orders, or native Android installation is involved.",
}));

export const imageArtifacts: Artifact[] = [
  {
    id: "image-01",
    title: "RateMyDay Mobile UI System",
    role: "Course Project - High-fidelity mobile screens for activity tracking",
    type: "image",
    src: "/artifacts/images/image-01.png",
    tags: ["COURSEWORK", "MOBILE UI"],
  },
  {
    id: "image-02",
    title: "Activity Tracker Low-Fidelity Wireframe",
    role: "Course Project - Early-stage mobile flow planning",
    type: "image",
    src: "/artifacts/images/image-02.png",
    tags: ["COURSEWORK", "WIREFRAME"],
  },
  {
    id: "image-03",
    title: "Eco-Life Website Wireframe Boards",
    role: "Course Project - Layout planning for a sustainability website",
    type: "image",
    src: "/artifacts/images/image-03.jpg",
    tags: ["COURSEWORK", "WEB WIREFRAME"],
  },
  {
    id: "image-04",
    title: "Good vs Bad Design Study",
    role: "Course Project - Visual design comparison and composition exercise",
    type: "image",
    src: "/artifacts/images/image-04.png",
    tags: ["COURSEWORK", "DESIGN"],
  },
  {
    id: "image-05",
    title: "Smart ID Wallet Product Mockup",
    role: "Course Project - Product concept rendering and presentation",
    type: "image",
    src: "/artifacts/images/image-05.png",
    tags: ["COURSEWORK", "PRODUCT"],
  },
  {
    id: "image-06",
    title: "Eco-Life Sustainability Website",
    role: "Course Project - Interface design for an environmental website, prototyped in Figma before development",
    type: "image",
    src: "/artifacts/images/image-06.jpg",
    tags: ["COURSEWORK", "WEB DESIGN"],
  },
  {
    id: "image-07",
    title: "Eco-Life Detail Screens",
    role: "Course Project - Supporting webpages and sections for the Eco-Life website experience",
    type: "image",
    src: "/artifacts/images/image-07.jpg",
    tags: ["COURSEWORK", "UI DETAIL"],
  },
  {
    id: "image-08",
    title: "AccessLearn Website",
    role: "Course Project - Inclusive learning platform website prototyped in Figma before development",
    type: "image",
    src: "/artifacts/images/image-08.png",
    tags: ["COURSEWORK", "WEB ACCESSIBILITY"],
  },
  {
    id: "image-09",
    title: "AccessLearn Website Authentication Flow",
    role: "Course Project - Supporting login and sign-up webpages for the AccessLearn website prototype",
    type: "image",
    src: "/artifacts/images/image-09.png",
    tags: ["COURSEWORK", "AUTH FLOW"],
  },
  {
    id: "image-10",
    title: "AccessLearn Website Dashboard",
    role: "Course Project - Supporting student dashboard webpage for the AccessLearn website prototype",
    type: "image",
    src: "/artifacts/images/image-10.png",
    tags: ["COURSEWORK", "DASHBOARD"],
  },
];

export const projectHighlights = [
  {
    title:
      "Student Information Systems and Advanced Calculators (CCC112, CCC123, OOP134)",
    desc: "Developed student information systems to automate administrative processes and manage data efficiently. Designed advanced calculators for complex mathematical operations with user-friendly interfaces.",
  },
  {
    title: "Environment Website (HCI122)",
    desc: "Designed and prototyped an interactive website promoting environmental awareness, with usability and accessibility considerations using Figma.",
  },
  {
    title: "Mini Grocery System and Fruit Grocery Database (CCC123, CCC124)",
    desc: "Built a beginner POS system for inventory and sales, and created an MS Access database to track fruit inventory and pricing.",
  },
  {
    title: "Philippine Junior Data Science Challenge 2023",
    desc: "Developed client segmentation strategies for underserved areas and recommended targeted products and next-best actions as a Top 15 qualifier.",
  },
  {
    title: "Car Insurance Analysis (Onyx August Data Challenge)",
    desc: "Analyzed a 32k+ row dataset using Power BI and delivered actionable insights recognized by global professionals.",
  },
  {
    title: "COVID-19 OWID Dataset Analysis (UP Statistical Society Challenge)",
    desc: "Performed data wrangling, visualization, and regression analysis in Python, then presented findings in a clear narrative format.",
  },
  {
    title: "Flipkart Dataset Analysis (SIDHI Hackathon)",
    desc: "Cleaned and analyzed e-commerce data with Python and delivered insights using a visually structured data poster.",
  },
  {
    title: "Wind Turbine Object Detection Model",
    desc: "Trained a YOLOv8 model on a large dataset and achieved 89.6% accuracy in wind turbine detection.",
  },
];

export const skillGroups = [
  {
    category: "Programming",
    items: ["Python", "Java", "JavaScript", "C# (Beginner)", "PHP", "SQL"],
  },
  {
    category: "Web Development",
    items: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Angular",
      "Next.js",
      "Tailwind CSS",
      "Node.js",
      "Firebase",
    ],
  },
  {
    category: "3D & Frontend Systems",
    items: [
      "Three.js",
      "CSS animation",
      "Framer Motion",
      "Responsive design",
      "Accessible interfaces",
    ],
  },
  {
    category: "Data & AI",
    items: [
      "Pandas",
      "NumPy",
      "scikit-learn",
      "TensorFlow",
      "Jupyter",
      "Power BI",
      "Tableau",
      "Excel",
      "MySQL",
      "PostgreSQL",
      "Microsoft Access",
    ],
  },
  {
    category: "Automation",
    items: [
      "Python scripting",
      "Selenium",
      "Requests",
      "Google Apps Script",
      "API integration",
    ],
  },
  {
    category: "E-commerce",
    items: [
      "Shopify",
      "Liquid theme development",
      "Product & collection layouts",
      "Cart interfaces",
      "Storefront styling",
    ],
  },
  {
    category: "Applied AI & engineering",
    items: [
      "YOLOv8",
      "Object detection",
      "Machine learning",
      "AI-assisted development",
      "Prompt iteration",
      "Human review & validation",
    ],
  },
  {
    category: "Creative Tools",
    items: [
      "Blender",
      "Figma",
      "Canva",
      "SketchUp",
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Adobe Lightroom",
      "DaVinci Resolve",
      "Mobile Illustration Apps",
    ],
  },
  {
    category: "Delivery & collaboration",
    items: [
      "Git",
      "GitHub",
      "Vercel",
      "Vite",
      "TypeScript checks",
      "Browser testing",
    ],
  },
];

export const exploringSkills = [
  "LLM-powered applications",
  "Retrieval-augmented generation (RAG)",
  "AI workflow automation",
  "n8n",
  "Automated end-to-end tests",
];

export const designCollections: Artifact[] = [
  {
    id: "design-infographics",
    title: "Information, Illustrated",
    kind: "Academic visual-design collection",
    role: "Course Project - Infographics translating educational topics into illustrated visual hierarchies",
    type: "image",
    src: "/design-work/infographics.webp",
    preview: "/design-work/infographics-cover.webp",
    categoryHint: "UI & design",
    tags: ["COURSEWORK", "INFOGRAPHICS", "VISUAL COMMUNICATION"],
    details: {
      overview:
        "A collected presentation of academic infographic work. The focus is visual communication: grouping information, balancing illustration with type, and guiding the reader through a topic.",
      tools: ["Digital layout", "Illustration", "Visual hierarchy"],
      features: [
        "Educational poster compositions",
        "Topic-specific color and illustration",
        "Full presentation board available to inspect",
      ],
    },
    accessNote:
      "Presentation board supplied by Zia. Shown as visual-design work, not a web application or independently verified medical guidance.",
  },
  {
    id: "design-posters",
    title: "Messages with a Point of View",
    kind: "Academic poster collection",
    role: "Course Project - Poster compositions for technology, community, environment, and educational themes",
    type: "image",
    src: "/design-work/posters.webp",
    preview: "/design-work/posters-cover.webp",
    categoryHint: "UI & design",
    tags: ["COURSEWORK", "POSTER DESIGN", "COMPOSITION"],
    details: {
      overview:
        "A selection of one-time academic outputs brought together in a presentation board. Each poster uses a different visual vocabulary to support its subject and intended audience.",
      tools: ["Digital composition", "Typography", "Visual storytelling"],
      features: [
        "Campaign and educational poster formats",
        "Subject-led art direction",
        "Full presentation board available to inspect",
      ],
    },
  },
  {
    id: "design-invitation",
    title: "A Love Letter - Invitation Website",
    kind: "Canva invitation design",
    role: "Personal Project - A romantic invitation website study using a photo-strip composition, layered florals, and burgundy accents",
    type: "image",
    src: "/design-work/canva-invitation.webp",
    preview: "/design-work/canva-invitation-cover.webp",
    categoryHint: "UI & design",
    tags: ["DESIGN", "CANVA", "INVITATION WEBSITE"],
    resources: [
      {
        label: "Open the invitation website",
        href: "https://theylikeboss.my.canva.site/you-are-invited/",
      },
    ],
    accessNote:
      "Preview of the supplied published Canva invitation. Design work is shown here; photographs and depicted people are not presented as my photography clients.",
  },
  {
    id: "design-nest",
    title: "Nest & Next - Virtual Assistance",
    kind: "Canva website prototype",
    role: "Concept Project - A service-business website design exploring a warm visual identity and a structured client journey",
    type: "image",
    src: "/design-work/canva-nest.webp",
    categoryHint: "UI & design",
    tags: ["CONCEPT", "CANVA", "WEBSITE DESIGN"],
    resources: [
      {
        label: "Open the Canva source",
        href: "https://www.canva.com/design/DAHMXBTUsmI/3-P-g1WhgLInAzfTat28uA/edit",
      },
    ],
    accessNote:
      "A screenshot of the supplied Canva website preview. This is a design prototype with placeholder copy, not a fully developed service website. The source may require Canva access.",
    details: {
      overview:
        "A virtual-assistance service website study centered on a nest-and-next visual concept, discovery-call path, and service hierarchy.",
      tools: ["Canva", "Website prototyping", "Visual hierarchy"],
      features: [
        "Warm brown and cream art direction",
        "Service and process section planning",
        "In-portfolio screenshot preview",
      ],
    },
  },
  {
    id: "design-lara",
    title: "Lara Loraine Sulit - VA Portfolio",
    kind: "Canva website design",
    role: "Personal Project - A virtual-assistant portfolio design with service-led navigation and a warm, professional visual identity",
    type: "image",
    src: "/design-work/canva-lara.webp",
    categoryHint: "UI & design",
    tags: ["DESIGN", "CANVA", "PORTFOLIO"],
    resources: [
      {
        label: "Open the Canva source",
        href: "https://www.canva.com/design/DAHRH8zrmjQ/x3kNXx2wRI27xCPjHHTuZg/edit",
      },
    ],
    accessNote:
      "Preview of the supplied Canva design, not a coded website or a claim that I provide the services described in this person's portfolio. Canva may require sign-in for the source.",
  },
  {
    id: "design-student-id",
    title: "Northridge - Student Identity Layout",
    kind: "Privacy-safe layout study",
    role: "Personal Project - Burgundy and cream student-card design with a clear identity hierarchy",
    type: "image",
    src: "/design-work/student-id-redacted.svg",
    categoryHint: "UI & design",
    tags: ["DESIGN", "CANVA", "IDENTITY LAYOUT"],
    accessNote:
      "Privacy-safe portfolio reconstruction of the supplied Canva layout. Real student names, identifiers, signatures, and the original source link are withheld. This preview is not a usable identification document.",
    details: {
      overview:
        "A student-card layout study combining an institutional header, portrait area, prominent name hierarchy, and secondary administrative details. The portfolio redraw preserves the overall visual direction without publishing personal information.",
      tools: ["Canva", "Typography", "Layout"],
      features: [
        "Burgundy, cream, and gold visual system",
        "Clear information hierarchy",
        "Privacy-safe presentation with identifying fields removed",
      ],
    },
  },
];

export const contactLinks: ContactLink[] = [
  {
    href: "mailto:luwiyeyz@gmail.com",
    label: "Email Me",
    icon: "mail",
  },
  {
    href: "/resume/BigDataMARIANO_RESUME.pdf",
    label: "Download Resume",
    icon: "resume",
    download: true,
  },
  {
    href: "#work",
    label: "View Projects",
    icon: "work",
  },
];

export const profileStats = [
  { value: "03+", label: "Years.Exp" },
  { value: "15+", label: "Projects" },
];

export const aboutLead = "I AM A CREATIVE TECHNOLOGIST.";
export const aboutLog =
  "[LOG]: I enjoy combining analytical thinking with creative design to build meaningful digital solutions across software, data analytics, and machine learning projects.";

export const journeyParagraphs = [
  "I began my career in creative media and storytelling, then transitioned into Information Technology where I discovered a strong passion for data analytics, machine learning, and software development.",
  "My work combines analytical thinking, technical problem solving, and creative design to deliver practical and meaningful digital solutions.",
];

export const certificates = [
  {
    title: "TESDA National Certificate",
    issuer: "TESDA",
    date: "2024",
    file: "/certificates/tesda.png",
    type: "image" as const,
  },
];

export const personalInterests = [
  { id: "shopping", label: "Shopping" },
  { id: "exploring", label: "Exploring" },
  { id: "pasta", label: "Pasta" },
  { id: "bread", label: "Fresh bread" },
  { id: "fruit", label: "Fruit" },
  { id: "salad", label: "Vegetable salads" },
  { id: "dogs", label: "Dogs" },
  { id: "photography", label: "Photography" },
  { id: "writing", label: "Writing" },
  { id: "painting", label: "Drawing & painting" },
  { id: "building", label: "Building things" },
  { id: "thinking", label: "Thinking & logic" },
  { id: "computer", label: "Computers & development" },
  { id: "networking", label: "Networking & systems" },
];
