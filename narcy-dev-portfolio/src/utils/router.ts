import { SectionId } from '../types';

export interface RouteState {
  view: 'main' | 'privacy';
  privacyType?: 'gbepay' | 'general';
  sectionId: SectionId;
  projectSlug?: string | null;
}

export const SECTION_ROUTES: Record<SectionId, { path: string; hash: string; title: string }> = {
  home: { path: '/accueil', hash: '#accueil', title: 'NarcyDev — Studio Software & Mobile | Accueil' },
  about: { path: '/apropos', hash: '#apropos', title: 'NarcyDev — À Propos de Narcisse HOUEHOU' },
  services: { path: '/services', hash: '#services', title: 'NarcyDev — Nos Services & Expertises Logicielles' },
  projects: { path: '/projets', hash: '#projets', title: 'NarcyDev — Nos Réalisations & Portfolio' },
  estimator: { path: '/estimateur', hash: '#estimateur', title: 'NarcyDev — Estimateur de Devis Dynamique' },
  contact: { path: '/contact', hash: '#contact', title: 'NarcyDev — Contact & Prise de Rendez-vous' }
};

export const PATH_TO_SECTION: Record<string, SectionId> = {
  '/': 'home',
  '/accueil': 'home',
  '/home': 'home',
  '#accueil': 'home',
  '#home': 'home',

  '/apropos': 'about',
  '/about': 'about',
  '#apropos': 'about',
  '#about': 'about',

  '/services': 'services',
  '#services': 'services',

  '/projets': 'projects',
  '/projects': 'projects',
  '#projets': 'projects',
  '#projects': 'projects',

  '/estimateur': 'estimator',
  '/estimator': 'estimator',
  '#estimateur': 'estimator',
  '#estimator': 'estimator',

  '/contact': 'contact',
  '#contact': 'contact'
};

/**
 * Parses current URL (pathname or hash) to determine active section, privacy page, or deep linked project
 */
export function getRouteStateFromUrl(): RouteState {
  const hash = window.location.hash.toLowerCase();
  const pathname = window.location.pathname.toLowerCase().replace(/\/$/, '');
  const targetUrl = (hash || pathname || '/').toLowerCase();

  // Check 1: Privacy Standalone Pages (/privacy/gbepay, /privacy/general or #privacy/gbepay, #privacy/general)
  if (targetUrl.includes('privacy/gbepay') || targetUrl.includes('politique/gbepay')) {
    return {
      view: 'privacy',
      privacyType: 'gbepay',
      sectionId: 'home',
      projectSlug: null
    };
  }

  if (targetUrl.includes('privacy/general') || targetUrl.includes('privacy') || targetUrl.includes('politique')) {
    return {
      view: 'privacy',
      privacyType: 'general',
      sectionId: 'home',
      projectSlug: null
    };
  }

  // Check 2: Project Deep Links (/projets/:slug or #projets/:slug)
  const projectDeepLinkRegex = /(?:\/projets\/|\/projects\/|#projets\/|#projects\/)([a-z0-9-]+)/i;
  const match = targetUrl.match(projectDeepLinkRegex);
  if (match && match[1]) {
    const slug = match[1];
    return {
      view: 'main',
      sectionId: 'projects',
      projectSlug: slug
    };
  }

  // Check 3: Standard Section Routes
  if (hash && PATH_TO_SECTION[hash]) {
    return { view: 'main', sectionId: PATH_TO_SECTION[hash], projectSlug: null };
  }

  const cleanPath = pathname === '' ? '/' : pathname;
  if (PATH_TO_SECTION[cleanPath]) {
    return { view: 'main', sectionId: PATH_TO_SECTION[cleanPath], projectSlug: null };
  }

  // Fallback match for subpaths
  for (const [key, section] of Object.entries(PATH_TO_SECTION)) {
    if (key !== '/' && (cleanPath.endsWith(key) || hash === key)) {
      return { view: 'main', sectionId: section, projectSlug: null };
    }
  }

  return { view: 'main', sectionId: 'home', projectSlug: null };
}

/**
 * Backward compatible getSectionFromUrl
 */
export function getSectionFromUrl(): SectionId {
  return getRouteStateFromUrl().sectionId;
}

/**
 * Updates URL path without reloading page using history API
 */
export function updateUrlForSection(sectionId: SectionId, push: boolean = true) {
  const route = SECTION_ROUTES[sectionId] || SECTION_ROUTES.home;
  const targetPath = route.path;

  if (route.title) {
    document.title = route.title;
  }

  const currentPath = window.location.pathname;
  const currentHash = window.location.hash;

  if (currentPath !== targetPath && currentHash !== route.hash) {
    if (push) {
      window.history.pushState({ sectionId }, '', targetPath);
    } else {
      window.history.replaceState({ sectionId }, '', targetPath);
    }
  }
}

/**
 * Updates URL path for project deep links (e.g. /projets/gbepay)
 */
export function updateUrlForProject(slug: string | null, push: boolean = true) {
  if (!slug) {
    updateUrlForSection('projects', push);
    return;
  }

  const targetPath = `/projets/${slug}`;
  document.title = `NarcyDev — Projet ${slug.toUpperCase()}`;

  const currentPath = window.location.pathname;
  if (currentPath !== targetPath) {
    if (push) {
      window.history.pushState({ projectSlug: slug }, '', targetPath);
    } else {
      window.history.replaceState({ projectSlug: slug }, '', targetPath);
    }
  }
}

/**
 * Updates URL path for privacy standalone pages
 */
export function updateUrlForPrivacy(type: 'gbepay' | 'general', push: boolean = true) {
  const targetPath = `/privacy/${type}`;
  document.title = type === 'gbepay'
    ? 'NarcyDev — Politique de Confidentialité GbèPay'
    : 'NarcyDev — Mentions Légales & Confidentialité';

  const currentPath = window.location.pathname;
  if (currentPath !== targetPath) {
    if (push) {
      window.history.pushState({ privacyType: type }, '', targetPath);
    } else {
      window.history.replaceState({ privacyType: type }, '', targetPath);
    }
  }
}
