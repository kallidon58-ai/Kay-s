export type AppCategory =
  | 'Micro-SaaS'
  | 'Mobile First'
  | 'AI & Automation'
  | 'Dev Tool'
  | 'Local-First'
  | 'Marketplace'
  | 'Productivity';

export type AppPlatform =
  | 'Web / SaaS'
  | 'Mobile iOS & Android'
  | 'Desktop App'
  | 'Chrome Extension'
  | 'Cross-Platform PWA';

export interface MvpFeature {
  id: string;
  title: string;
  description: string;
  priority: 'Must Have (P0)' | 'Should Have (P1)' | 'Nice to Have (P2)';
  complexity: 'Low' | 'Medium' | 'High';
  estimatedDays: number;
}

export interface PricingTier {
  name: string;
  price: string;
  cadence: string;
  targetUser: string;
  features: string[];
}

export interface MonetizationPlan {
  model: 'Freemium' | 'Tiered Subscription' | 'Usage-based' | 'One-Time License' | 'Marketplace Take-Rate';
  projectedArpu: string;
  tiers: PricingTier[];
  unitEconomicsNote: string;
}

export interface UserPersona {
  role: string;
  demographics: string;
  coreJobsToBeDone: string;
  topFrustration: string;
  buyingTrigger: string;
}

export interface TechStackConfig {
  frontend: string;
  backend: string;
  database: string;
  auth: string;
  hosting: string;
  keyLibrariesOrApis: string[];
}

export interface WireframeScreen {
  id: string;
  name: string;
  headline: string;
  description: string;
  keyActions: string[];
  mockupItems: Array<{
    type: 'metric' | 'table_row' | 'card' | 'input' | 'button' | 'badge';
    label: string;
    value?: string;
    detail?: string;
  }>;
}

export interface AppIdea {
  id: string;
  title: string;
  tagline: string;
  category: AppCategory;
  platform: AppPlatform;
  summary: string;
  problemStatement: string;
  solutionBreakdown: string;
  secretSauce: string;
  targetAudience: string;
  mvpFeatures: MvpFeature[];
  techStack: TechStackConfig;
  monetization: MonetizationPlan;
  personas: UserPersona[];
  launchStrategy: {
    first100Users: string;
    acquisitionChannels: string[];
    mvpTimelineWeeks: number;
    biggestRisk: string;
    riskMitigation: string;
  };
  wireframeScreens: WireframeScreen[];
  savedAt?: string;
  notes?: string;
}

export interface CombinatorSelection {
  audience: string;
  industry: string;
  platform: AppPlatform;
  twist: string;
}
