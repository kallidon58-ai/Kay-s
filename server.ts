import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Helper fallback generator if offline or Gemini API key is missing
function createFallbackIdea(prompt: string, category?: string, platform?: string): any {
  const cleanPrompt = prompt.trim() || 'Modern Developer Workspace';
  const id = `idea-${Date.now()}`;
  const plat = platform || 'Web / SaaS';
  const cat = category || 'Micro-SaaS';

  return {
    id,
    title: cleanPrompt.length < 20 ? cleanPrompt : 'ApexFlow Studio',
    tagline: `A modern, high-leverage ${plat} platform designed for ${cleanPrompt}`,
    category: cat,
    platform: plat,
    summary: `A purpose-built solution that directly addresses the core workflow bottlenecks in ${cleanPrompt}. It replaces scattered spreadsheets and manual back-and-forth with automated triggers and clean unified dashboards.`,
    problemStatement: `Teams and creators working in ${cleanPrompt} are plagued by disconnected tools, lack of automation, and repetitive manual operations that drain hours every week.`,
    solutionBreakdown: `An intuitive single-loop workspace combining real-time status tracking, automated stakeholder notifications, and lightweight data models designed for immediate adoption.`,
    secretSauce: `Zero friction onboarding with deep integrations into existing workflows (Slack, GitHub, Email, Stripe) and instant ROI in under 48 hours.`,
    targetAudience: `Small teams, solo operators, and agile practitioners navigating ${cleanPrompt}.`,
    mvpFeatures: [
      {
        id: `${id}-f1`,
        title: 'Core Workflow & Quick-Action Hub',
        description: 'Single-screen dashboard to capture, organize, and execute critical tasks in under 60 seconds.',
        priority: 'Must Have (P0)',
        complexity: 'Medium',
        estimatedDays: 3,
      },
      {
        id: `${id}-f2`,
        title: 'Automated Status & Webhook Sync',
        description: 'Automatic updates delivered to Slack, Email, or webhook endpoints upon key milestones.',
        priority: 'Must Have (P0)',
        complexity: 'Low',
        estimatedDays: 2,
      },
      {
        id: `${id}-f3`,
        title: 'Lightweight Data Export & Reporting',
        description: 'One-click export to CSV, PDF, or markdown summaries for stakeholder reviews.',
        priority: 'Should Have (P1)',
        complexity: 'Low',
        estimatedDays: 1,
      },
      {
        id: `${id}-f4`,
        title: 'Usage & Efficiency Analytics',
        description: 'Visual metrics displaying hours saved, completion velocity, and weekly trends.',
        priority: 'Nice to Have (P2)',
        complexity: 'Medium',
        estimatedDays: 3,
      },
    ],
    techStack: {
      frontend: plat.includes('Mobile') ? 'React Native / Expo + Tailwind' : 'React + Vite + Tailwind CSS',
      backend: 'Node.js Express / Cloudflare Workers',
      database: 'PostgreSQL with Supabase / Drizzle ORM',
      auth: 'Google & GitHub OAuth / Magic Link',
      hosting: 'Vercel / Cloud Run',
      keyLibrariesOrApis: ['Tailwind CSS', 'Lucide Icons', 'Stripe Billing API'],
    },
    monetization: {
      model: 'Tiered Subscription',
      projectedArpu: '$19 / month',
      unitEconomicsNote: 'Lightweight server architecture ensures high gross margins (>90%) with predictable hosting costs.',
      tiers: [
        {
          name: 'Starter',
          price: '$0',
          cadence: 'Forever Free',
          targetUser: 'Solo users & early testers',
          features: ['Core workspace access', 'Up to 50 active items', 'Community support'],
        },
        {
          name: 'Pro',
          price: '$19',
          cadence: 'per month',
          targetUser: 'Power users & active practitioners',
          features: ['Unlimited items & history', 'Automated webhooks & notifications', 'Priority email support', 'Advanced exports'],
        },
        {
          name: 'Team',
          price: '$49',
          cadence: 'per month',
          targetUser: 'Small teams up to 5 members',
          features: ['Team shared workspace', 'Role-based access', 'Audit log', 'Dedicated onboarding'],
        },
      ],
    },
    personas: [
      {
        role: 'Lead Operator / Founder',
        demographics: 'Fast-moving practitioner focused on efficiency and quick turnaround.',
        coreJobsToBeDone: 'Eliminate repetitive manual coordination and keep projects on schedule.',
        topFrustration: 'Legacy enterprise software that is bloated, slow, and costs thousands per seat.',
        buyingTrigger: 'When a critical deadline or client deliverable is dropped due to manual tracking.',
      },
    ],
    launchStrategy: {
      first100Users: 'Engage niche communities on Reddit, Indie Hackers, and Twitter; share early MVP screen demos and offer lifetime discounts to the first 50 signups.',
      acquisitionChannels: ['Product Hunt launch', 'Content marketing & workflow templates', 'Niche community directories'],
      mvpTimelineWeeks: 3,
      biggestRisk: 'Feature creep before validating the primary customer pain point.',
      riskMitigation: 'Stick strictly to the 3 P0 MVP features for the initial release.',
    },
    wireframeScreens: [
      {
        id: `${id}-w1`,
        name: 'Command Center',
        headline: 'Active Operations',
        description: 'Central overview of in-progress tasks and automated triggers.',
        keyActions: ['New Entry', 'Run Batch', 'Export Report'],
        mockupItems: [
          { type: 'metric', label: 'Completed This Week', value: '18 items' },
          { type: 'card', label: 'High Priority Task #1', value: 'Ready for client review · Updated 2h ago' },
          { type: 'card', label: 'Automated Webhook Sync', value: 'Slack integration active · 0 errors' },
        ],
      },
    ],
  };
}

// API: Generate structured App Idea
app.post('/api/generate-idea', async (req, res) => {
  try {
    const { prompt, category, platform, audience } = req.body;

    if (!prompt && !audience) {
      return res.status(400).json({ error: 'Prompt or target audience is required.' });
    }

    if (!ai) {
      // Fallback if no API key provided
      const fallback = createFallbackIdea(prompt || audience, category, platform);
      return res.json({ idea: fallback, source: 'algorithmic' });
    }

    const systemInstruction = `You are a world-class startup founder, product strategist, and software architect.
Generate a structured, hyper-realistic, viable App Idea blueprint.
Avoid generic buzzwords. Produce concrete, actionable specs.
Output strictly JSON matching this structure:
{
  "id": "generated-string",
  "title": "Short Catchy App Name",
  "tagline": "One punchy sentence describing the core value proposition",
  "category": "Micro-SaaS" | "Mobile First" | "AI & Automation" | "Dev Tool" | "Local-First" | "Marketplace" | "Productivity",
  "platform": "Web / SaaS" | "Mobile iOS & Android" | "Cross-Platform PWA" | "Chrome Extension" | "Desktop App",
  "summary": "2-3 sentences explaining what it is",
  "problemStatement": "Specific painful problem experienced by target users",
  "solutionBreakdown": "How this app specifically solves that pain point",
  "secretSauce": "The unfair advantage, clever wedge, or unique architectural angle",
  "targetAudience": "Specific group of users",
  "mvpFeatures": [
    {
      "id": "f1",
      "title": "Feature Name",
      "description": "Clear explanation of what it does",
      "priority": "Must Have (P0)" | "Should Have (P1)" | "Nice to Have (P2)",
      "complexity": "Low" | "Medium" | "High",
      "estimatedDays": 3
    }
  ],
  "techStack": {
    "frontend": "e.g. React + Vite + Tailwind CSS",
    "backend": "e.g. Express.js / Cloudflare Workers",
    "database": "e.g. PostgreSQL with Supabase",
    "auth": "e.g. Google OAuth & Magic Links",
    "hosting": "e.g. Vercel / Cloud Run",
    "keyLibrariesOrApis": ["list of 3-4 key APIs or packages"]
  },
  "monetization": {
    "model": "Freemium" | "Tiered Subscription" | "Usage-based" | "One-Time License" | "Marketplace Take-Rate",
    "projectedArpu": "$XX / month",
    "unitEconomicsNote": "Concrete explanation of costs vs pricing and gross margins",
    "tiers": [
      {
        "name": "Tier Name",
        "price": "$XX",
        "cadence": "per month / one-time",
        "targetUser": "Who buys this tier",
        "features": ["3-4 specific features"]
      }
    ]
  },
  "personas": [
    {
      "role": "Job Title or Persona Name",
      "demographics": "Brief context",
      "coreJobsToBeDone": "What they need to accomplish",
      "topFrustration": "Their biggest daily headache",
      "buyingTrigger": "The exact moment they decide to purchase"
    }
  ],
  "launchStrategy": {
    "first100Users": "Concrete action steps to get first 100 users",
    "acquisitionChannels": ["Channel 1", "Channel 2", "Channel 3"],
    "mvpTimelineWeeks": 3,
    "biggestRisk": "The main risk",
    "riskMitigation": "How to de-risk it"
  },
  "wireframeScreens": [
    {
      "id": "w1",
      "name": "Main Screen Name",
      "headline": "Screen Headline",
      "description": "What this screen shows",
      "keyActions": ["Action 1", "Action 2"],
      "mockupItems": [
        { "type": "metric", "label": "Label", "value": "123" },
        { "type": "card", "label": "Card Title", "value": "Card Value / Status" }
      ]
    }
  ]
}`;

    const promptText = `Generate a complete, viable App Idea blueprint based on this brief:
Domain / Concept: "${prompt || 'Innovative workflow software'}"
Preferred Category: ${category || 'Best fit'}
Preferred Platform: ${platform || 'Best fit'}
Target Audience: ${audience || 'Specific niche with willingness to pay'}

Remember: be ultra-practical, realistic, and give concrete technical and monetization specs.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error('Empty response from AI model');
    }

    const parsed = JSON.parse(responseText);
    parsed.id = `ai-${Date.now()}`;
    return res.json({ idea: parsed, source: 'gemini' });
  } catch (err: any) {
    console.error('Gemini idea generation failed, using fallback:', err.message);
    const fallback = createFallbackIdea(req.body.prompt || 'Modern Web App', req.body.category, req.body.platform);
    return res.json({ idea: fallback, source: 'fallback_error', note: err.message });
  }
});

// API: Expand a specific feature into user stories and technical implementation plan
app.post('/api/expand-feature', async (req, res) => {
  try {
    const { appTitle, featureTitle, featureDescription } = req.body;

    if (!featureTitle) {
      return res.status(400).json({ error: 'featureTitle is required' });
    }

    if (!ai) {
      return res.json({
        userStories: [
          `As a user of ${appTitle || 'the app'}, I want to ${featureTitle.toLowerCase()} so that I save time on repetitive tasks.`,
          `As an admin, I want to see usage audit logs for ${featureTitle.toLowerCase()} to ensure compliance.`,
        ],
        technicalTasks: [
          'Design DB schema table and indexes',
          'Implement backend REST / GraphQL controller with validation',
          'Build responsive UI component with loading & error states',
          'Write end-to-end integration test',
        ],
        apiEndpoints: [
          `POST /api/v1/${featureTitle.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
          `GET /api/v1/${featureTitle.toLowerCase().replace(/[^a-z0-9]/g, '-')}/:id`,
        ],
      });
    }

    const promptText = `For the app "${appTitle || 'App'}", expand this feature:
Feature: "${featureTitle}"
Description: "${featureDescription || ''}"

Return JSON:
{
  "userStories": ["3 user stories in format As a [role], I want [action] so that [benefit]"],
  "technicalTasks": ["4-5 concrete engineering implementation steps"],
  "apiEndpoints": ["2-3 realistic HTTP API endpoints with verbs and paths"],
  "edgeCasesToHandle": ["2-3 tricky edge cases or failure modes"]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Serve frontend
async function setupServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AppForge server running on http://0.0.0.0:${PORT} (${isDev ? 'development' : 'production'})`);
  });
}

setupServer();
