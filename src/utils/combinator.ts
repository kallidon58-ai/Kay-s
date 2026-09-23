import { AppIdea, AppCategory, AppPlatform } from '../types';

export const AUDIENCES = [
  'Solo Indie Hackers & Creators',
  'Remote Engineering Managers',
  'Freelance Designers & Consultants',
  'B2B Sales Development Reps',
  'Boutique Coffee Shops & Cafes',
  'Airbnb & Vacation Rental Hosts',
  'Gym Owners & Personal Trainers',
  'Busy Working Parents',
  'College Students & Researchers',
  'Real Estate Agents & Brokers',
  'Pet Owners & Veterinary Clinics',
  'Local Tradespeople & Handymen',
];

export const DOMAINS = [
  'Tax & Invoicing Friction',
  'Meeting Notes & Action Items',
  'Kitchen & Pantry Food Waste',
  'Client Onboarding & Contracts',
  'Customer Video Testimonials',
  'Daily Habit & Momentum Tracking',
  'Team Standups & Blocker Triage',
  'Cold Outreach Personalization',
  'Local Equipment & Skill Sharing',
  'Subscription & SaaS Creep',
  'Visitor Badging & Front-Desk Log',
  'Codebase Architecture Visualizer',
];

export const PLATFORMS: AppPlatform[] = [
  'Web / SaaS',
  'Mobile iOS & Android',
  'Cross-Platform PWA',
  'Chrome Extension',
  'Desktop App',
];

export const TWISTS = [
  'Local-First & 100% Offline (No Cloud)',
  'Voice Memo & Audio-First Workflow',
  'Zero-Hardware (Runs in any browser)',
  'Automated 2-Way Sync with GitHub/Linear/Slack',
  'Instant Camera / OCR / Document Scan',
  'One-Time Lifetime Pricing (No Subscriptions)',
  'End-to-End Encrypted & Private',
  'Gamified Streaks & Micro-Pledges',
];

export function generateCombinatorIdea(
  audience: string,
  domain: string,
  platform: AppPlatform,
  twist: string
): AppIdea {
  const cleanAudience = audience.split('&')[0].trim();
  const cleanDomain = domain.replace(' Friction', '').replace(' Creep', '').trim();
  
  const id = `idea-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  
  // Category determination
  let category: AppCategory = 'Micro-SaaS';
  if (platform === 'Mobile iOS & Android') category = 'Mobile First';
  else if (twist.includes('Local-First')) category = 'Local-First';
  else if (domain.includes('Codebase') || twist.includes('GitHub')) category = 'Dev Tool';
  else if (domain.includes('Sharing')) category = 'Marketplace';
  else if (domain.includes('Habit') || domain.includes('Standup')) category = 'Productivity';

  // Title generation
  const prefixes = ['Focus', 'Hyper', 'Swift', 'Clear', 'Pulse', 'Stack', 'Omni', 'Vanguard', 'Loop', 'Forge'];
  const suffixes = ['Flow', 'Sync', 'Pilot', 'Craft', 'Desk', 'Radar', 'Shield', 'Vault', 'Kit', 'Hub'];
  const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  const title = `${randomPrefix}${randomSuffix}`;

  return {
    id,
    title,
    tagline: `The ${twist.toLowerCase().replace(' &', '')} tool for ${cleanAudience.toLowerCase()} to master ${cleanDomain.toLowerCase()}`,
    category,
    platform,
    summary: `A high-leverage ${platform} solution purpose-built for ${audience}. It eliminates the pains of ${domain} by utilizing ${twist.toLowerCase()}, giving users rapid execution without the bloated setup of generic enterprise tools.`,
    problemStatement: `${audience} currently waste hours juggling manual spreadsheets, disjointed chat apps, or expensive legacy platforms when handling ${domain.toLowerCase()}. This results in dropped tasks, missed revenue, and cognitive fatigue.`,
    solutionBreakdown: `${title} replaces cumbersome workflows with a focused, streamlined interface built around ${twist.toLowerCase()}. Users complete their core workflow in under 90 seconds.`,
    secretSauce: `Our competitive edge: ${twist}. By avoiding heavy cloud dependencies or slow manual forms, we provide 10x faster workflow speeds tailored specifically to ${cleanAudience.toLowerCase()}.`,
    targetAudience: audience,
    mvpFeatures: [
      {
        id: `${id}-f1`,
        title: `Core ${cleanDomain} Express Workflow`,
        description: `Streamlined interface allowing users to capture and resolve items in under 60 seconds.`,
        priority: 'Must Have (P0)',
        complexity: 'Medium',
        estimatedDays: 4,
      },
      {
        id: `${id}-f2`,
        title: `Automated Summary & Smart Export`,
        description: `Generate clean shareable reports or direct webhooks to existing team tools.`,
        priority: 'Must Have (P0)',
        complexity: 'Low',
        estimatedDays: 2,
      },
      {
        id: `${id}-f3`,
        title: `${twist.split('(')[0].trim()} Engine`,
        description: `Native implementation of ${twist.toLowerCase()} ensuring high responsiveness and zero friction.`,
        priority: 'Must Have (P0)',
        complexity: 'Medium',
        estimatedDays: 4,
      },
      {
        id: `${id}-f4`,
        title: `Notification & Digest Bot`,
        description: `Automated daily or weekly updates keeping all stakeholders aligned.`,
        priority: 'Should Have (P1)',
        complexity: 'Low',
        estimatedDays: 2,
      },
      {
        id: `${id}-f5`,
        title: `Analytics & Trend Insights`,
        description: `Historical breakdown showing hours and dollars saved over time.`,
        priority: 'Nice to Have (P2)',
        complexity: 'Medium',
        estimatedDays: 3,
      },
    ],
    techStack: {
      frontend: platform.includes('Mobile') ? 'React Native / Expo + NativeWind' : 'React + Vite + Tailwind CSS',
      backend: 'Express.js / Cloudflare Workers API',
      database: twist.includes('Local-First') ? 'Client-side IndexedDB (Dexie.js) + SQLite' : 'PostgreSQL with Supabase / Drizzle',
      auth: twist.includes('Local-First') ? 'None required (100% private offline)' : 'Google OAuth & Magic Link',
      hosting: 'Vercel / Cloud Run',
      keyLibrariesOrApis: ['Tailwind CSS', 'Lucide React', 'Stripe Billing'],
    },
    monetization: {
      model: twist.includes('Lifetime') ? 'One-Time License' : 'Tiered Subscription',
      projectedArpu: twist.includes('Lifetime') ? '$29 lifetime' : '$19 / month',
      unitEconomicsNote: 'Lightweight architecture with ultra-low compute overhead provides healthy 85–95% gross margins.',
      tiers: [
        {
          name: 'Starter / Solo',
          price: twist.includes('Lifetime') ? '$29' : '$12',
          cadence: twist.includes('Lifetime') ? 'one-time purchase' : 'per month',
          targetUser: `Individual ${cleanAudience.toLowerCase()}`,
          features: ['Core workflow engine', 'Up to 50 active items', 'Standard exports'],
        },
        {
          name: 'Professional / Pro',
          price: twist.includes('Lifetime') ? '$69' : '$29',
          cadence: twist.includes('Lifetime') ? 'one-time purchase' : 'per month',
          targetUser: `Power users & growing teams`,
          features: ['Unlimited items & history', 'Priority processing', 'Webhook & team integrations', 'Direct priority support'],
        },
      ],
    },
    personas: [
      {
        role: `Typical ${cleanAudience}`,
        demographics: `High-urgency practitioner striving for speed and simplicity.`,
        coreJobsToBeDone: `Handle ${domain.toLowerCase()} with zero friction and maximum reliability.`,
        topFrustration: `Clunky, slow legacy software that requires 20 clicks for a simple 10-second action.`,
        buyingTrigger: `Frustration from losing an important lead, record, or deadline in an old manual system.`,
      },
    ],
    launchStrategy: {
      first100Users: `Target niche communities where ${cleanAudience.toLowerCase()} congregate (specialized subreddits, Discord groups, and directories); offer 50 beta access passes.`,
      acquisitionChannels: ['Product Hunt & Hacker News', 'Targeted cold Twitter/X DMs with a 30s screen demo', 'SEO comparison pages ("X Alternative")'],
      mvpTimelineWeeks: 3,
      biggestRisk: 'Over-engineering features before verifying user willingness to pay.',
      riskMitigation: 'Build the core single-loop workflow first; charge early beta users a discounted price to validate willingness to pay.',
    },
    wireframeScreens: [
      {
        id: `${id}-w1`,
        name: 'Main Workspace',
        headline: `${title} Central Command`,
        description: `Streamlined overview designed specifically for ${cleanAudience.toLowerCase()}.`,
        keyActions: ['New Action Item', 'Run Sync', 'Export Summary'],
        mockupItems: [
          { type: 'metric', label: 'Items Resolved This Week', value: '24 Tasks' },
          { type: 'card', label: `Active ${cleanDomain} Record #1`, value: 'Pending stakeholder review · Priority High' },
          { type: 'card', label: `Active ${cleanDomain} Record #2`, value: 'Resolved automatically via integration' },
        ],
      },
    ],
  };
}
