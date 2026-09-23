import React, { useState } from 'react';
import {
  X,
  Bookmark,
  Copy,
  Check,
  Code,
  Layers,
  DollarSign,
  Users,
  Compass,
  Layout,
  ExternalLink,
  ChevronRight,
  Shield,
  Clock,
  Sparkles,
  FileText,
} from 'lucide-react';
import { AppIdea, MvpFeature } from '../types';
import { RevenueCalculator } from './RevenueCalculator';
import { WireframeMockup } from './WireframeMockup';
import { FeatureSpecModal } from './FeatureSpecModal';

interface BlueprintModalProps {
  idea: AppIdea | null;
  isSaved: boolean;
  onClose: () => void;
  onToggleSave: (idea: AppIdea) => void;
}

export const BlueprintModal: React.FC<BlueprintModalProps> = ({
  idea,
  isSaved,
  onClose,
  onToggleSave,
}) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'features' | 'architecture' | 'monetization' | 'gtm' | 'wireframe'
  >('overview');
  const [copiedPrd, setCopiedPrd] = useState(false);
  const [selectedFeatureForSpec, setSelectedFeatureForSpec] = useState<MvpFeature | null>(null);

  if (!idea) return null;

  const totalDevDays = idea.mvpFeatures.reduce((acc, f) => acc + (f.estimatedDays || 0), 0);

  const handleCopyPrd = () => {
    const markdown = `# ${idea.title} - Product Requirements Document (PRD)

> ${idea.tagline}

- **Category:** ${idea.category}
- **Platform:** ${idea.platform}
- **Target Audience:** ${idea.targetAudience}
- **Estimated MVP Dev Time:** ~${totalDevDays} days

## 1. Problem Statement
${idea.problemStatement}

## 2. Solution Overview
${idea.solutionBreakdown}

## 3. The Unfair Advantage (Secret Sauce)
${idea.secretSauce}

## 4. MVP Feature Scope
${idea.mvpFeatures
  .map(
    (f, idx) =>
      `### ${idx + 1}. ${f.title} (${f.priority})
- **Complexity:** ${f.complexity} | **Est. Build:** ${f.estimatedDays} days
- **Details:** ${f.description}`
  )
  .join('\n\n')}

## 5. Recommended Architecture
- **Frontend:** ${idea.techStack.frontend}
- **Backend:** ${idea.techStack.backend}
- **Database:** ${idea.techStack.database}
- **Auth:** ${idea.techStack.auth}
- **Hosting:** ${idea.techStack.hosting}
- **APIs/Libraries:** ${idea.techStack.keyLibrariesOrApis.join(', ')}

## 6. Monetization & Pricing
- **Model:** ${idea.monetization.model}
- **Target ARPU:** ${idea.monetization.projectedArpu}
${idea.monetization.tiers
  .map(
    (t) => `### Tier: ${t.name} (${t.price} / ${t.cadence})
- Target: ${t.targetUser}
- Features: ${t.features.join(', ')}`
  )
  .join('\n')}

## 7. Go-To-Market Playbook
- **First 100 Users:** ${idea.launchStrategy.first100Users}
- **Channels:** ${idea.launchStrategy.acquisitionChannels.join(', ')}
- **Biggest Risk:** ${idea.launchStrategy.biggestRisk}
- **Risk Mitigation:** ${idea.launchStrategy.riskMitigation}
`;

    navigator.clipboard.writeText(markdown);
    setCopiedPrd(true);
    setTimeout(() => setCopiedPrd(false), 2500);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
        <div className="relative my-auto w-full max-w-5xl rounded-2xl border border-slate-700 bg-[#090e18] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-slate-800 bg-[#0c121e]">
            <div className="flex items-start justify-between gap-4">
              <div>
                {/* Unboxed metadata line */}
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5">
                  <span className="font-semibold text-indigo-400">{idea.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{idea.platform}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums text-slate-300">
                    ~{totalDevDays} days to MVP
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  {idea.title}
                </h2>
                <p className="text-sm text-slate-300 mt-1 max-w-3xl">
                  {idea.tagline}
                </p>
              </div>

              {/* Top right actions */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => onToggleSave(idea)}
                  className={`p-2 rounded-lg border border-slate-700 transition-colors ${
                    isSaved
                      ? 'bg-indigo-950/60 border-indigo-500/50 text-indigo-300'
                      : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700'
                  }`}
                  title={isSaved ? 'Remove from saved' : 'Save blueprint'}
                >
                  <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-indigo-400' : ''}`} />
                </button>

                <button
                  onClick={handleCopyPrd}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-xs font-medium text-slate-200 hover:bg-slate-700 transition-colors"
                >
                  {copiedPrd ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-emerald-300">Copied PRD</span>
                    </>
                  ) : (
                    <>
                      <FileText className="h-3.5 w-3.5" />
                      <span>Export PRD</span>
                    </>
                  )}
                </button>

                <button
                  onClick={onClose}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Sub Tabs Segmented Bar */}
            <div className="flex items-center gap-1 mt-6 border-b border-slate-800/80 overflow-x-auto pb-1 text-xs">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex items-center gap-1.5 px-3 py-2 font-medium border-b-2 transition-all whitespace-nowrap ${
                  activeTab === 'overview'
                    ? 'border-indigo-500 text-white font-semibold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Compass className="h-3.5 w-3.5" />
                <span>Overview & Problem</span>
              </button>

              <button
                onClick={() => setActiveTab('features')}
                className={`flex items-center gap-1.5 px-3 py-2 font-medium border-b-2 transition-all whitespace-nowrap ${
                  activeTab === 'features'
                    ? 'border-indigo-500 text-white font-semibold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="h-3.5 w-3.5" />
                <span>MVP Scope ({idea.mvpFeatures.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('architecture')}
                className={`flex items-center gap-1.5 px-3 py-2 font-medium border-b-2 transition-all whitespace-nowrap ${
                  activeTab === 'architecture'
                    ? 'border-indigo-500 text-white font-semibold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Code className="h-3.5 w-3.5" />
                <span>Tech Stack</span>
              </button>

              <button
                onClick={() => setActiveTab('monetization')}
                className={`flex items-center gap-1.5 px-3 py-2 font-medium border-b-2 transition-all whitespace-nowrap ${
                  activeTab === 'monetization'
                    ? 'border-indigo-500 text-white font-semibold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <DollarSign className="h-3.5 w-3.5" />
                <span>Pricing & MRR</span>
              </button>

              <button
                onClick={() => setActiveTab('gtm')}
                className={`flex items-center gap-1.5 px-3 py-2 font-medium border-b-2 transition-all whitespace-nowrap ${
                  activeTab === 'gtm'
                    ? 'border-indigo-500 text-white font-semibold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Users className="h-3.5 w-3.5" />
                <span>GTM & Personas</span>
              </button>

              <button
                onClick={() => setActiveTab('wireframe')}
                className={`flex items-center gap-1.5 px-3 py-2 font-medium border-b-2 transition-all whitespace-nowrap ${
                  activeTab === 'wireframe'
                    ? 'border-indigo-500 text-white font-semibold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layout className="h-3.5 w-3.5" />
                <span>Wireframe UI</span>
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-5 sm:p-8 overflow-y-auto flex-1 space-y-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Summary */}
                <div className="rounded-xl border border-slate-800 bg-[#0d1320] p-5">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-indigo-400 mb-2">
                    Executive Summary
                  </h4>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {idea.summary}
                  </p>
                </div>

                {/* Problem vs Solution 2-column grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-xl border border-rose-950/40 bg-rose-950/10 p-5">
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-400 block mb-2">
                      The Pain Point (Hair-on-Fire)
                    </span>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {idea.problemStatement}
                    </p>
                  </div>

                  <div className="rounded-xl border border-emerald-950/40 bg-emerald-950/10 p-5">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-2">
                      The Proposed Solution
                    </span>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {idea.solutionBreakdown}
                    </p>
                  </div>
                </div>

                {/* The Secret Sauce */}
                <div className="rounded-xl border border-indigo-950/40 bg-indigo-950/15 p-5">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 block mb-2">
                    The Secret Sauce & Unfair Wedge
                  </span>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {idea.secretSauce}
                  </p>
                </div>

                {/* Target Audience */}
                <div className="p-4 rounded-xl border border-slate-800 bg-[#0d1320] flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-400 block">Primary Target Customer</span>
                    <strong className="text-sm text-white font-semibold mt-0.5 block">
                      {idea.targetAudience}
                    </strong>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block">Target ARPU</span>
                    <strong className="text-sm font-mono tabular-nums text-emerald-400 font-semibold mt-0.5 block">
                      {idea.monetization.projectedArpu}
                    </strong>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400 pb-2">
                  <span>MVP Features prioritized by launch necessity</span>
                  <span className="font-mono tabular-nums">
                    Total: ~{totalDevDays} engineering days
                  </span>
                </div>

                <div className="space-y-3">
                  {idea.mvpFeatures.map((feat, idx) => (
                    <div
                      key={feat.id || idx}
                      className="p-4 rounded-xl border border-slate-800 bg-[#0d1422] flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-700 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs font-semibold ${
                              feat.priority.includes('P0')
                                ? 'text-rose-400'
                                : feat.priority.includes('P1')
                                ? 'text-amber-400'
                                : 'text-slate-400'
                            }`}
                          >
                            {feat.priority}
                          </span>
                          <span aria-hidden="true" className="text-slate-600">·</span>
                          <h4 className="text-sm font-bold text-white">
                            {feat.title}
                          </h4>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {feat.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                        <div className="text-right text-xs">
                          <span className="text-slate-400 block">Complexity</span>
                          <span className="text-slate-200 font-medium">{feat.complexity}</span>
                        </div>
                        <div className="text-right text-xs">
                          <span className="text-slate-400 block">Build Time</span>
                          <span className="font-mono tabular-nums text-slate-200 font-semibold">
                            ~{feat.estimatedDays}d
                          </span>
                        </div>
                        <button
                          onClick={() => setSelectedFeatureForSpec(feat)}
                          className="px-2.5 py-1.5 rounded-lg bg-indigo-950/60 border border-indigo-500/40 text-xs font-medium text-indigo-300 hover:bg-indigo-900/60 transition-colors whitespace-nowrap"
                        >
                          Expand Spec
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'architecture' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl border border-slate-800 bg-[#0d1320]">
                    <span className="text-xs font-mono uppercase text-slate-400 block mb-1">
                      Frontend Client
                    </span>
                    <p className="text-sm font-semibold text-white">
                      {idea.techStack.frontend}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-800 bg-[#0d1320]">
                    <span className="text-xs font-mono uppercase text-slate-400 block mb-1">
                      Backend Server
                    </span>
                    <p className="text-sm font-semibold text-white">
                      {idea.techStack.backend}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-800 bg-[#0d1320]">
                    <span className="text-xs font-mono uppercase text-slate-400 block mb-1">
                      Database & State
                    </span>
                    <p className="text-sm font-semibold text-white">
                      {idea.techStack.database}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-800 bg-[#0d1320]">
                    <span className="text-xs font-mono uppercase text-slate-400 block mb-1">
                      Authentication
                    </span>
                    <p className="text-sm font-semibold text-white">
                      {idea.techStack.auth}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-800 bg-[#0d1320]">
                    <span className="text-xs font-mono uppercase text-slate-400 block mb-1">
                      Hosting & Deployment
                    </span>
                    <p className="text-sm font-semibold text-white">
                      {idea.techStack.hosting}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-800 bg-[#0d1320]">
                    <span className="text-xs font-mono uppercase text-slate-400 block mb-1">
                      Key APIs & Libraries
                    </span>
                    <p className="text-xs font-mono text-indigo-300 truncate">
                      {idea.techStack.keyLibrariesOrApis.join(', ')}
                    </p>
                  </div>
                </div>

                {/* Scaffold Quickstart Snippet */}
                <div className="rounded-xl border border-slate-800 bg-[#070b12] p-4">
                  <span className="text-xs font-mono uppercase text-slate-400 block mb-2">
                    Recommended CLI Quickstart
                  </span>
                  <div className="p-3 rounded bg-[#0f172a] font-mono text-xs text-slate-200 overflow-x-auto">
                    <code>npm create vite@latest {idea.title.toLowerCase().replace(/[^a-z0-9]/g, '')} -- --template react-ts</code>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'monetization' && (
              <div className="space-y-6">
                {/* Pricing Tiers Table */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {idea.monetization.tiers.map((tier, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-xl border border-slate-800 bg-[#0d1422] flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 block">
                          {tier.name}
                        </span>
                        <div className="mt-2 flex items-baseline gap-1">
                          <span className="text-2xl font-bold font-mono tabular-nums text-white">
                            {tier.price}
                          </span>
                          <span className="text-xs text-slate-400">/{tier.cadence}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-2">
                          Target: {tier.targetUser}
                        </p>

                        <div className="mt-4 pt-3 border-t border-slate-800 space-y-2">
                          {tier.features.map((f, i) => (
                            <div key={i} className="text-xs text-slate-300 flex items-center gap-2">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                              <span>{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Interactive Revenue Simulator */}
                <RevenueCalculator monetization={idea.monetization} />
              </div>
            )}

            {activeTab === 'gtm' && (
              <div className="space-y-6">
                {/* Personas */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                    Target Customer Personas
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {idea.personas.map((persona, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-xl border border-slate-800 bg-[#0d1422] space-y-3"
                      >
                        <div>
                          <h5 className="text-base font-bold text-white">{persona.role}</h5>
                          <p className="text-xs text-slate-400 mt-0.5">{persona.demographics}</p>
                        </div>
                        <div className="text-xs space-y-1.5">
                          <p className="text-slate-300">
                            <strong className="text-slate-200">Job to be done:</strong>{' '}
                            {persona.coreJobsToBeDone}
                          </p>
                          <p className="text-slate-300">
                            <strong className="text-slate-200">Chief Frustration:</strong>{' '}
                            {persona.topFrustration}
                          </p>
                          <p className="text-slate-300">
                            <strong className="text-slate-200">Buying Trigger:</strong>{' '}
                            {persona.buyingTrigger}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* GTM Playbook */}
                <div className="p-5 rounded-xl border border-slate-800 bg-[#0d1422] space-y-4">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-indigo-400">
                    Go-To-Market & First 100 Users Strategy
                  </h4>

                  <div className="text-xs space-y-3 text-slate-300">
                    <div>
                      <strong className="text-white block mb-1">First 100 Users Playbook:</strong>
                      <p>{idea.launchStrategy.first100Users}</p>
                    </div>

                    <div>
                      <strong className="text-white block mb-1">Distribution Channels:</strong>
                      <ul className="list-disc list-inside space-y-0.5 text-slate-300">
                        {idea.launchStrategy.acquisitionChannels.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80">
                      <strong className="text-rose-300 block mb-1">Biggest Risk:</strong>
                      <p>{idea.launchStrategy.biggestRisk}</p>
                    </div>

                    <div>
                      <strong className="text-emerald-300 block mb-1">De-risking Action:</strong>
                      <p>{idea.launchStrategy.riskMitigation}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'wireframe' && (
              <div>
                <WireframeMockup
                  screens={idea.wireframeScreens}
                  appTitle={idea.title}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Feature Deep Dive Spec Modal */}
      {selectedFeatureForSpec && (
        <FeatureSpecModal
          appTitle={idea.title}
          feature={selectedFeatureForSpec}
          onClose={() => setSelectedFeatureForSpec(null)}
        />
      )}
    </>
  );
};
