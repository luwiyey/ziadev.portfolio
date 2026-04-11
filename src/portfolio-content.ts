export type Artifact = {
  id: string;
  title: string;
  role: string;
  type: 'video' | 'image';
  src: string;
  tags: string[];
};

export type ContactLink = {
  href: string;
  label: string;
  icon: 'mail' | 'resume' | 'work';
  download?: boolean;
};

export const heroTitle = 'ARCHITECTING CYBER REALITIES';
export const heroSubtitle =
  'I build meaningful digital solutions by combining data analysis, machine learning, and creative design.';

export const proofCards = [
  {
    title: 'Machine Learning Projects',
    desc: 'Building AI models using Python, TensorFlow, and YOLO.',
  },
  {
    title: 'Data Analytics Systems',
    desc: 'Data cleaning, visualization, and predictive analysis.',
  },
  {
    title: 'Creative Technology',
    desc: 'User-focused systems that blend technical problem-solving with visual communication.',
  },
];

export const videoArtifacts: Artifact[] = [
  {
    id: 'video-01',
    title: 'Residential House 3D Architectural Visualization',
    role: 'Course Project - 3D architectural visualization of a residential house using SketchUp and rendering tools',
    type: 'video',
    src: '/artifacts/videos/video-01.mp4',
    tags: ['COURSEWORK', 'ARCHVIZ'],
  },
  {
    id: 'video-02',
    title: 'FORDA FILO Digital Animated Cartoon',
    role: 'Course Project - Character illustration and short-form animation using digital illustration applications',
    type: 'video',
    src: '/artifacts/videos/video-02.mp4',
    tags: ['COURSEWORK', 'ANIMATION'],
  },
  {
    id: 'video-03',
    title: 'Enrollment Process Demo (Freshmen and Transferees)',
    role: 'Course Project - Panpacific University enrollment demo in animation for freshmen and transferee applicants',
    type: 'video',
    src: '/artifacts/videos/video-03.mp4',
    tags: ['COURSEWORK', 'ENROLLMENT'],
  },
  {
    id: 'video-04',
    title: 'Enrollment Process Demo (Continuing and Returning)',
    role: 'Course Project - Panpacific University enrollment demo in animation for continuing and returning students',
    type: 'video',
    src: '/artifacts/videos/video-04.mp4',
    tags: ['COURSEWORK', 'ENROLLMENT'],
  },
  {
    id: 'video-05',
    title: 'PSNTI RouteCalc Android App',
    role: 'Course Project - Android Studio mobile application for route, distance, and fare calculation',
    type: 'video',
    src: '/artifacts/videos/video-05.mp4',
    tags: ['COURSEWORK', 'ANDROID APP'],
  },
  {
    id: 'video-06',
    title: 'Neon Laser Tag Mini Game',
    role: 'Personal Project - Android Studio mini game inspired by arcade-style laser tag with a neon visual theme',
    type: 'video',
    src: '/artifacts/videos/video-06.mp4',
    tags: ['PERSONAL', 'ANDROID GAME'],
  },
  {
    id: 'video-07',
    title: 'ABOUT ME Animation',
    role: 'Course Project - Hand-drawn FlipaClip character sketch animation introducing my identity and style',
    type: 'video',
    src: '/artifacts/videos/video-07.mp4',
    tags: ['COURSEWORK', 'FLIPACLIP'],
  },
  {
    id: 'video-08',
    title: 'Why IT in Panpacific University',
    role: 'Course Project - Frame-by-frame concept animation on why choose Information Technology at Panpacific University',
    type: 'video',
    src: '/artifacts/videos/video-08.mp4',
    tags: ['COURSEWORK', 'EDUCATION'],
  },
  {
    id: 'video-09',
    title: 'PU Queue Web App',
    role: 'Course Project - Whole-university office management system for queueing, requests, and office workflows',
    type: 'video',
    src: '/artifacts/videos/video-09.mp4',
    tags: ['COURSEWORK', 'WEB APP'],
  },
  {
    id: 'video-10',
    title: 'Lingkod-Ani',
    role: 'Course Project - Barangay monitoring and communication website for agriculture services',
    type: 'video',
    src: '/artifacts/videos/video-10.mp4',
    tags: ['COURSEWORK', 'WEB APP'],
  },
];

export const imageArtifacts: Artifact[] = [
  {
    id: 'image-01',
    title: 'RateMyDay Mobile UI System',
    role: 'Course Project - High-fidelity mobile screens for activity tracking',
    type: 'image',
    src: '/artifacts/images/image-01.png',
    tags: ['COURSEWORK', 'MOBILE UI'],
  },
  {
    id: 'image-02',
    title: 'Activity Tracker Low-Fidelity Wireframe',
    role: 'Course Project - Early-stage mobile flow planning',
    type: 'image',
    src: '/artifacts/images/image-02.png',
    tags: ['COURSEWORK', 'WIREFRAME'],
  },
  {
    id: 'image-03',
    title: 'Eco-Life Website Wireframe Boards',
    role: 'Course Project - Layout planning for a sustainability website',
    type: 'image',
    src: '/artifacts/images/image-03.jpg',
    tags: ['COURSEWORK', 'WEB WIREFRAME'],
  },
  {
    id: 'image-04',
    title: 'Good vs Bad Design Study',
    role: 'Course Project - Visual design comparison and composition exercise',
    type: 'image',
    src: '/artifacts/images/image-04.png',
    tags: ['COURSEWORK', 'DESIGN'],
  },
  {
    id: 'image-05',
    title: 'Smart ID Wallet Product Mockup',
    role: 'Course Project - Product concept rendering and presentation',
    type: 'image',
    src: '/artifacts/images/image-05.png',
    tags: ['COURSEWORK', 'PRODUCT'],
  },
  {
    id: 'image-06',
    title: 'Eco-Life Sustainability Website',
    role: 'Course Project - Interface design for an environmental website, prototyped in Figma before development',
    type: 'image',
    src: '/artifacts/images/image-06.jpg',
    tags: ['COURSEWORK', 'WEB DESIGN'],
  },
  {
    id: 'image-07',
    title: 'Eco-Life Detail Screens',
    role: 'Course Project - Supporting webpages and sections for the Eco-Life website experience',
    type: 'image',
    src: '/artifacts/images/image-07.jpg',
    tags: ['COURSEWORK', 'UI DETAIL'],
  },
  {
    id: 'image-08',
    title: 'AccessLearn Website',
    role: 'Course Project - Inclusive learning platform website prototyped in Figma before development',
    type: 'image',
    src: '/artifacts/images/image-08.png',
    tags: ['COURSEWORK', 'WEB ACCESSIBILITY'],
  },
  {
    id: 'image-09',
    title: 'AccessLearn Website Authentication Flow',
    role: 'Course Project - Supporting login and sign-up webpages for the AccessLearn website prototype',
    type: 'image',
    src: '/artifacts/images/image-09.png',
    tags: ['COURSEWORK', 'AUTH FLOW'],
  },
  {
    id: 'image-10',
    title: 'AccessLearn Website Dashboard',
    role: 'Course Project - Supporting student dashboard webpage for the AccessLearn website prototype',
    type: 'image',
    src: '/artifacts/images/image-10.png',
    tags: ['COURSEWORK', 'DASHBOARD'],
  },
];

export const projectHighlights = [
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
];

export const skillGroups = [
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
];

export const contactLinks: ContactLink[] = [
  {
    href: 'mailto:luwiyeyz@gmail.com',
    label: 'Email Me',
    icon: 'mail',
  },
  {
    href: '/resume/BigDataMARIANO_RESUME.pdf',
    label: 'Download Resume',
    icon: 'resume',
    download: true,
  },
  {
    href: '#work',
    label: 'View Projects',
    icon: 'work',
  },
];

export const profileStats = [
  { value: '03+', label: 'Years.Exp' },
  { value: '15+', label: 'Projects' },
];

export const aboutLead = 'I AM A CREATIVE TECHNOLOGIST.';
export const aboutLog =
  '[LOG]: I enjoy combining analytical thinking with creative design to build meaningful digital solutions across software, data analytics, and machine learning projects.';

export const journeyParagraphs = [
  'I began my career in creative media and storytelling, then transitioned into Information Technology where I discovered a strong passion for data analytics, machine learning, and software development.',
  'My work combines analytical thinking, technical problem solving, and creative design to deliver practical and meaningful digital solutions.',
];

export const certificates = [
  {
    title: 'TESDA National Certificate',
    issuer: 'TESDA',
    date: '2024',
    file: '/certificates/tesda.png',
    type: 'image' as const,
  },
];
