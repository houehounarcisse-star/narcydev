import { Project, Service, TechItem, EstimatorProjectType, EstimatorFeature } from '../types';
import gbepayImg from '../assets/images/gbepay_ad_official_1786444314593.jpg';
import voltImg from '../assets/images/volt_game_mockup_1786437138867.jpg';
import paymentImg from '../assets/images/payment_gateway_mockup_1786437151085.jpg';
import filaImg from '../assets/images/fila_festival_mockup_1786439150525.jpg';
import pierreEmeraudeImg from '../assets/images/pierre_emeraude_mockup_1786439171488.jpg';
import software3dDashboardImg from '../assets/images/software_3d_dashboard_1786440608039.jpg';
import mobileFintech3dImg from '../assets/images/mobile_fintech_3d_1786440623986.jpg';

export const HERO_SLIDES = [
  {
    id: 'sig-com',
    title: 'NARCY-SIG-COM',
    subtitle: 'LOGICIEL DE GESTION COMMERCIALE & TONINE',
    description: 'Logiciel intelligent de gestion de stock, caisse et facturation normalisée pour entreprises.',
    image: software3dDashboardImg,
    badge: 'LOGICIEL METIER'
  },
  {
    id: 'gbepay-fintech',
    title: 'GBÈPAY',
    subtitle: 'FINTECH & TONTINE DIGITALE',
    description: 'Plateforme mobile et web de tontine digitale et de paiements sécurisés par QR Code et Mobile Money.',
    image: gbepayImg,
    badge: 'FINTECH & MOBILE'
  },
  {
    id: 'volt-3d',
    title: 'THE VOLT',
    subtitle: 'WEB INTERACTIF 3D & GAMING',
    description: 'Applications web 3D interactives ultra-fluides avec modélisation Blender et hautes performances.',
    image: voltImg,
    badge: '3D & GAMING WEB'
  }
];

export const SOLUTIONS_CARDS = [
  {
    id: 'sol-web',
    title: 'Nos Solutions Web',
    description: 'Plateformes web d’entreprise, ERP, e-commerce et portails institutionnels haute performance.',
    icon: 'Globe',
    badge: 'Web & Cloud'
  },
  {
    id: 'sol-licences',
    title: 'Nos Licences & Logiciels',
    description: 'Progiciels métiers sur mesure (SIG-COM, Hôtellerie, Restauration & Quincaillerie).',
    icon: 'ShieldCheck',
    badge: 'Progiciels SIG'
  },
  {
    id: 'sol-mobile',
    title: 'Nos Solutions Mobiles',
    description: 'Applications iOS & Android Flutter ultra-fluides avec intégration Mobile Money et mode hors-ligne.',
    icon: 'Smartphone',
    badge: 'Flutter & Dart'
  },
  {
    id: 'sol-formations',
    title: 'Nos Diverses Formations',
    description: 'Formations pratiques en développement de logiciels, architecture cloud et sécurité web.',
    icon: 'GraduationCap',
    badge: 'Coaching & Audit'
  }
];

export const PROPOS_STEPS = [
  {
    id: 'step-1',
    title: 'Analyse minutieuse',
    description: 'Une équipe d’experts étudie de manière approfondie vos besoins et réalise une enquête auprès de vos experts métiers pour définir le cahier des charges exact.',
    icon: 'SearchCheck'
  },
  {
    id: 'step-2',
    title: 'Conception sur mesure',
    description: 'Avec vos données, nous concevons le prototype de votre système en suivant les étapes obligatoires validées par vos équipes avant le codage.',
    icon: 'PenTool'
  },
  {
    id: 'step-3',
    title: 'Implémentation rapide',
    description: 'Nos experts en ingénierie logicielle finalisent le processus en mettant en place les algorithmes et automatismes fonctionnels avec sécurité maximale.',
    icon: 'Cpu'
  }
];

export const NARCY_OFFERS = [
  {
    id: 'narcy-fintech-mobile',
    tag: 'FINTECH & MOBILE',
    title: 'Applications Mobiles & Tontine Digitale',
    description: "Conception d'applications cross-platform (Android/iOS) fluides avec Flutter & Supabase. Intégration de transferts P2P et gestion automatisée de tontines.",
    example: 'Projets comme GbèPay.',
    projectId: 'gbepay',
    iconName: 'Smartphone',
    image: gbepayImg
  },
  {
    id: 'narcy-web-event',
    tag: 'WEB & ÉVÉNEMENTIEL',
    title: 'Plateformes Web & Solutions Événementielles',
    description: 'Déploiement de sites web institutionnels et événementiels complets, sécurisés et optimisés, hébergés sur des infrastructures Cloud modernes.',
    example: "Plateforme du Festival de l'Igname Labôkô (FILA).",
    projectId: 'fila-festival',
    iconName: 'Globe',
    image: filaImg
  },
  {
    id: 'narcy-api-payment',
    tag: 'API & PAIEMENT',
    title: 'Intégration de Passerelles de Paiement',
    description: "Connexion sécurisée d'API de paiement locales et internationales (KKiaPay, FedaPay, Stripe) pour collecter des fonds ou gérer des transactions en ligne.",
    example: "Solution déployée pour l'Association PIERRE EMERAUDE.",
    projectId: 'pierre-emeraude',
    iconName: 'CreditCard',
    image: pierreEmeraudeImg
  },
  {
    id: 'narcy-interactive-3d',
    tag: 'INTERACTIF & 3D',
    title: 'Prototypage, Jeux Web & Assets 3D',
    description: "Développement d'expériences web interactives sur Canvas/Phaser.js, jeux en temps réel et modélisation 3D pour des besoins spécifiques.",
    example: 'MVP interactif THE VOLT: BLACKOUT.',
    projectId: 'volt-blackout',
    iconName: 'Gamepad2',
    image: voltImg
  }
];

export const ROMAS_OFFERS = NARCY_OFFERS;

export const TESTIMONIALS = [
  {
    id: 't-1',
    name: 'Dr. K. Lawson',
    role: 'Directeur Général, West Africa Tech',
    text: 'Narcy Dev a conçu notre progiciel de gestion avec une réactivité exceptionnelle. Les paiements Mobile Money sont fluides et 100% sécurisés.',
    stars: 5
  },
  {
    id: 't-2',
    name: 'Mme S. Tossou',
    role: 'Fondatrice, Festival FILA',
    text: 'La plateforme de billetterie en ligne réalisée par Narcy Dev a géré plus de 10 000 transactions en quelques jours sans le moindre ralentissement !',
    stars: 5
  },
  {
    id: 't-3',
    name: 'M. A. Mensah',
    role: 'Responsable Réseau, FinTontine',
    text: 'Une maîtrise parfaite de Flutter et de l’intégration MTN MoMo. Je recommande vivement pour tous vos projets d’ingénierie logicielle.',
    stars: 5
  }
];

export const HERO_TITLES = [
  'Architecte Software & Mobile',
  'Développeur Flutter & Dart',
  'Expert Intégration Fintech & MoMo',
  'Concepteur de Jeux HTML5/Phaser'
];

export const TECH_STACK: TechItem[] = [
  { name: 'Flutter', category: 'Mobile', icon: 'Smartphone', color: '#02569B' },
  { name: 'Dart', category: 'Language', icon: 'Code', color: '#0175C2' },
  { name: 'Python', category: 'Backend', icon: 'Terminal', color: '#3776AB' },
  { name: 'JavaScript', category: 'Frontend', icon: 'FileCode', color: '#F7DF1E' },
  { name: 'TypeScript', category: 'Language', icon: 'Code2', color: '#3178C6' },
  { name: 'Supabase', category: 'Backend', icon: 'Database', color: '#3ECF8E' },
  { name: 'PostgreSQL', category: 'Database', icon: 'Server', color: '#4169E1' },
  { name: 'TailwindCSS', category: 'Styling', icon: 'Palette', color: '#06B6D4' },
  { name: 'Phaser.js', category: 'Gamedev', icon: 'Gamepad2', color: '#FFCC00' },
  { name: 'KKiaPay / FedaPay', category: 'Fintech', icon: 'CreditCard', color: '#0D47A1' },
  { name: 'MTN MoMo API', category: 'Telecom', icon: 'Smartphone', color: '#FFCC00' }
];

export const SERVICES: Service[] = [
  {
    id: 'mobile-web',
    title: 'Développement Mobile & Web',
    iconName: 'Smartphone',
    description: 'Conception d’applications Android/iOS ultra-fluides avec Flutter & Dart, et sites web corporate d’entreprise réactifs et performants.',
    tags: ['Flutter', 'Dart', 'React', 'iOS & Android', 'Architecture Clean'],
    accentColor: 'yellow'
  },
  {
    id: 'api-fintech',
    title: 'Solutions Fintech & Intégration Paiement',
    iconName: 'CreditCard',
    description: 'Intégration des moyens de paiement régionaux et internationaux : MTN Mobile Money (MoMo), Moov, KKiaPay, FedaPay, Stripe & systèmes de tontine.',
    tags: ['KKiaPay', 'FedaPay', 'MTN MoMo', 'Stripe', 'Tontine Digitale'],
    accentColor: 'cyan'
  },
  {
    id: 'gamedev-3d',
    title: 'Prototypage & Applications Web Interactives',
    iconName: 'Gamepad2',
    description: 'Développement de jeux événementiels HTML5 (Phaser.js/WebGL), animations 3D Blender et plateformes interactives à forte valeur ajoutée.',
    tags: ['Phaser 3', 'Canvas HTML5', 'Blender 3D', '60 FPS', 'Gamification'],
    accentColor: 'violet'
  },
  {
    id: 'consulting-formations',
    title: 'Formations & Conseil Technique',
    iconName: 'Cpu',
    description: 'Accompagnement d’entreprises dans le choix d’architectures logicielles, audits de sécurité web & mobile, et formations d’équipes sur mesure.',
    tags: ['Audit Sécurité', 'PostgreSQL', 'Architecture Cloud', 'Coaching Dev'],
    accentColor: 'yellow'
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'gbepay',
    slug: 'gbepay',
    title: 'GbèPay',
    subtitle: 'Application mobile fintech & gestion de tontine digitale',
    category: 'fintech',
    categoryLabel: 'Fintech & Mobile',
    tags: ['Flutter', 'Supabase', 'KKiaPay', 'MTN MoMo', 'Dart'],
    image: gbepayImg,
    description: 'GbèPay est une application mobile novatrice qui digitalise les tontines traditionnelles, permet les transferts instantanés entre particuliers et simplifie le paiement marchand par QR Code.',
    keyFeatures: [
      'Gestion automatisée des cotisations tontinières et tirages au sort',
      'Intégration directe des API MTN Mobile Money et Moov Money',
      'Notifications push instantanées et génération de reçus PDF',
      'Mode hors-ligne synchronisé avec cryptage AES-256'
    ],
    techStack: ['Flutter 3.x', 'Dart', 'Supabase Realtime', 'KKiaPay SDK', 'PostgreSQL', 'TailwindCSS'],
    liveUrl: 'https://gbepay1.ai.studio',
    githubUrl: 'https://github.com/houehounarcisse/gbepay',
    featured: true,
    metrics: [
      { label: 'Utilisateurs', value: '25k+' },
      { label: 'Transactions', value: '150k+' },
      { label: 'Disponibilité', value: '99.9%' }
    ]
  },
  {
    id: 'fila-festival',
    slug: 'fila',
    title: 'Festival Igname Labôkô (FILA)',
    subtitle: 'Plateforme web événementielle officielle & billetterie en ligne',
    category: 'web',
    categoryLabel: 'Web Corporate & Événementiel',
    tags: ['React', 'KKiaPay', 'FedaPay', 'TailwindCSS', 'Node.js'],
    image: filaImg,
    description: 'Site web officiel du Festival de l’Igname de Labôkô (FILA). La plateforme permet la réservation et l’achat de pass d’entrée par Mobile Money, le programme des festivités et l’espace exposants.',
    keyFeatures: [
      'Billetterie en ligne intégrée avec génération de QR Codes sécurisés',
      'Paiement instantané par KKiaPay / FedaPay (MTN MoMo, Moov, Carte)',
      'Espace exposants et catalogue d’activités culturelles interactif',
      'Interface responsive haute performance adaptée aux mobiles'
    ],
    techStack: ['React 19', 'TailwindCSS', 'KKiaPay API', 'FedaPay API', 'Express.js'],
    liveUrl: 'https://filaglz.netlify.app',
    featured: true,
    metrics: [
      { label: 'Billets vendus', value: '10k+' },
      { label: 'Temps de réponse', value: '< 150ms' }
    ]
  },
  {
    id: 'pierre-emeraude',
    slug: 'pierre-emeraude',
    title: 'Association PIERRE EMERAUDE',
    subtitle: 'Système web institutionnel & plateforme de dons en ligne',
    category: 'web',
    categoryLabel: 'Web Institutionnel & Paiement',
    tags: ['React', 'FedaPay', 'KKiaPay', 'TailwindCSS', 'PostgreSQL'],
    image: pierreEmeraudeImg,
    description: 'Système d’information et portail web pour l’Association PIERRE EMERAUDE. Intègre la présentation des projets d’entraide, la gestion des membres et un module de collecte de dons sécurisé.',
    keyFeatures: [
      'Module de collecte de dons par Mobile Money et Carte Bancaire',
      'Tableau de bord de suivi des cotisations et reçus fiscaux automatisés',
      'Gestion des adhérents et calendrier des actions sociales',
      'Design épuré corporate conforme aux normes d’accessibilité'
    ],
    techStack: ['React', 'Node.js', 'FedaPay SDK', 'KKiaPay SDK', 'PostgreSQL'],
    liveUrl: 'https://pierreemeraude.netlify.app',
    featured: true,
    metrics: [
      { label: 'Fonds collectés', value: '100% sécurisés' },
      { label: 'Disponibilité', value: '100%' }
    ]
  },
  {
    id: 'volt-blackout',
    slug: 'the-volt',
    title: 'THE VOLT: BLACKOUT',
    subtitle: 'Application web dynamique HTML5 & expérience interactive Phaser 3',
    category: 'game',
    categoryLabel: 'Applications Web Interactives & Jeux',
    tags: ['Phaser 3', 'Canvas HTML5', 'JavaScript', 'WebAudio', 'Blender'],
    image: voltImg,
    description: 'Une application web d’action arcade au style rétro-cyberpunk tournant à 60 FPS fluides sur tous les navigateurs. Intègre un classement mondial en direct synchronisé en temps réel.',
    keyFeatures: [
      'Moteur physique 2D optimisé pour mobile et desktop',
      'Classement mondial des joueurs en direct synchronisé sur base de données',
      'Effets visuels réactifs et bande-son adaptative WebAudio',
      'Interface dynamique avec intégration d’éléments 3D Blender'
    ],
    techStack: ['Phaser 3.60', 'HTML5 Canvas', 'TypeScript', 'Supabase DB', 'Blender'],
    liveUrl: 'https://volt-blackout.narcy.dev',
    githubUrl: 'https://github.com/houehounarcisse/volt-blackout',
    featured: true,
    metrics: [
      { label: 'Performance', value: '60 FPS' },
      { label: 'Joueurs', value: '12k+' }
    ]
  }
];

export interface EstimatorOption {
  id: string;
  name: string;
  description: string;
  priceFcfa: number;
  days: number;
  iconName: string;
}

export interface EstimatorProjectTypeNew {
  id: string;
  name: string;
  description: string;
  baseFcfa: number;
  baseDays: number;
  icon: string;
}

export const ESTIMATOR_TYPES_EXACT: EstimatorProjectTypeNew[] = [
  {
    id: 'mobile-fintech',
    name: 'Application Mobile / Fintech',
    description: 'Application iOS & Android avec Flutter, ergonomie premium et gestion en temps réel',
    baseFcfa: 150000,
    baseDays: 10,
    icon: 'Smartphone'
  },
  {
    id: 'web-corporate',
    name: 'Site Web Institutionnel / Événementiel',
    description: 'Site d’entreprise ou événementiel complet, rapide, sécurisé et hébergé sur le cloud',
    baseFcfa: 80000,
    baseDays: 5,
    icon: 'Globe'
  },
  {
    id: 'platform-momo',
    name: 'Plateforme avec Intégration Paiement MoMo',
    description: 'Portail web/mobile relié aux guichets MTN MoMo, Moov Money et cartes bancaires',
    baseFcfa: 100000,
    baseDays: 7,
    icon: 'CreditCard'
  },
  {
    id: 'web-interactive-3d',
    name: 'Expérience Web Interactive / Jeu HTML5',
    description: 'Canvas interactif 60 FPS, mini-jeu Phaser 3 ou rendu 3D Blender sur-mesure',
    baseFcfa: 120000,
    baseDays: 8,
    icon: 'Gamepad2'
  }
];

export const ESTIMATOR_OPTIONS_EXACT: EstimatorOption[] = [
  {
    id: 'domain-hosting',
    name: 'Nom de domaine & Hébergement 1 an',
    description: 'Achat de domaine (.com/.bj) + serveur Cloud SSD sécurisé avec certificat SSL',
    priceFcfa: 15000,
    days: 1,
    iconName: 'Server'
  },
  {
    id: 'momo-api',
    name: 'Intégration API Paiement MoMo (KKiaPay/FedaPay)',
    description: 'Passerelle automatisée pour recevoir des paiements par Mobile Money et cartes',
    priceFcfa: 25000,
    days: 2,
    iconName: 'CreditCard'
  },
  {
    id: 'admin-panel',
    name: 'Panel d’Administration / Back-office',
    description: 'Tableau de bord de gestion des utilisateurs, statistiques, stocks et contenus',
    priceFcfa: 40000,
    days: 3,
    iconName: 'LayoutDashboard'
  },
  {
    id: 'design-3d',
    name: 'Design / Asset 3D sur-mesure',
    description: 'Création de graphismes vectoriels, maquettes Figma et assets 3D optimisés',
    priceFcfa: 30000,
    days: 2,
    iconName: 'Sparkles'
  }
];

export const PROFILE_INFO = {
  name: 'Narcisse HOUEHOU',
  brandName: 'Narcy Dev',
  tagline: 'Solutions Software, Mobile & Architectures Fintech',
  email: 'houehounarcisse@gmail.com',
  phone: '+229 01 44 68 05 51',
  location: 'Cotonou, Bénin & International Remote',
  github: 'https://github.com/houehounarcisse-star',
  comeup: 'https://comeup.com/@narcydev',
  whatsapp: 'https://wa.me/22944680551?text=Bonjour%20Narcy%20Dev,%20j%27aimerais%20discuter%20d%27un%20projet',
  experienceYears: '5+',
  completedProjects: '35+',
  clientSatisfaction: '100%'
};

