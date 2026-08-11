export type SectionId = 'home' | 'about' | 'services' | 'projects' | 'estimator' | 'contact';

export type ProjectCategory = 'all' | 'fintech' | 'mobile' | 'game' | 'web';

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  categoryLabel: string;
  tags: string[];
  image: string;
  description: string;
  keyFeatures: string[];
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  metrics?: { label: string; value: string }[];
}

export interface Service {
  id: string;
  title: string;
  iconName: string;
  description: string;
  tags: string[];
  accentColor: 'yellow' | 'cyan' | 'violet';
}

export interface TechItem {
  name: string;
  category: string;
  icon: string;
  color: string;
}

export interface EstimatorFeature {
  id: string;
  name: string;
  description: string;
  baseDays: number;
  baseCostEur: number;
  icon: string;
}

export interface EstimatorProjectType {
  id: string;
  name: string;
  description: string;
  multiplier: number;
  baseDays: number;
  icon: string;
}

export interface ToastMessage {
  id: string;
  text: string;
  type?: 'success' | 'info';
}
