import React, { useState } from 'react';
import {
  Shuffle,
  Sparkles,
  ArrowRight,
  Layers,
  Wand2,
  Users,
  Compass,
  Cpu,
  Smartphone,
  Loader2,
} from 'lucide-react';
import {
  AUDIENCES,
  DOMAINS,
  PLATFORMS,
  TWISTS,
  generateCombinatorIdea,
} from '../utils/combinator';
import { AppIdea, AppPlatform } from '../types';

interface CombinatorViewProps {
  onIdeaGenerated: (idea: AppIdea) => void;
}

export const CombinatorView: React.FC<CombinatorViewProps> = ({ onIdeaGenerated }) => {
  const [selectedAudience, setSelectedAudience] = useState(AUDIENCES[0]);
  const [selectedDomain, setSelectedDomain] = useState(DOMAINS[0]);
  const [selectedPlatform, setSelectedPlatform] = useState<AppPlatform>(PLATFORMS[0]);
  const [selectedTwist, setSelectedTwist] = useState(TWISTS[0]);
  const [isSpinning, setIsSpinning] = useState(false);

  // Custom prompt generator
  const [customPrompt, setCustomPrompt] = useState('');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  const handleSpinSlots = () => {
    setIsSpinning(true);
    let count = 0;
    const interval = setInterval(() => {
      setSelectedAudience(AUDIENCES[Math.floor(Math.random() * AUDIENCES.length)]);
      setSelectedDomain(DOMAINS[Math.floor(Math.random() * DOMAINS.length)]);
      setSelectedPlatform(PLATFORMS[Math.floor(Math.random() * PLATFORMS.length)]);
      setSelectedTwist(TWISTS[Math.floor(Math.random() * TWISTS.length)]);
      count++;
      if (count > 6) {
        clearInterval(interval);
        setIsSpinning(false);
      }
    }, 80);
  };

  const handleSynthesize = () => {
    const synthesized = generateCombinatorIdea(
      selectedAudience,
      selectedDomain,
      selectedPlatform,
      selectedTwist
    );
    onIdeaGenerated(synthesized);
  };

  const handleGenerateAi = async (promptOverride?: string) => {
    const textToUse = promptOverride || customPrompt;
    if (!textToUse.trim()) return;

    setIsGeneratingAi(true);
    try {
      const res = await fetch('/api/generate-idea', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToUse,
          platform: selectedPlatform,
        }),
      });
      const data = await res.json();
      if (data.idea) {
        onIdeaGenerated(data.idea);
      }
    } catch (err) {
      console.error('AI generation error, generating algorithmic blueprint:', err);
      const fallback = generateCombinatorIdea(
        selectedAudience,
        textToUse,
        selectedPlatform,
        selectedTwist
      );
      onIdeaGenerated(fallback);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const samplePrompts = [
    'Audio-first habit tracker for busy founders',
    'Local-first invoice generator for freelance designers',
    'Real-time equipment rental for indie filmmakers',
    'Sub-lease contract redlining tool for college students',
  ];

  return (
    <div className="space-y-10">
      {/* Hero Intro */}
      <div className="max-w-3xl">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          The Idea Combinator & App Incubator
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
          Break out of founder’s block. Combine high-urgency audiences, acute pain points, platforms, and technological wedges to synthesize defensible software blueprints.
        </p>
      </div>

      {/* 4-Slot Combinator Matrix */}
      <div className="rounded-2xl border border-slate-700/80 bg-[#0d1424] p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <Layers className="h-4 w-4 text-indigo-400" />
              <span>Modular Opportunity Matrix</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Lock in specific parameters or randomize to discover unconventional intersections.
            </p>
          </div>

          <button
            onClick={handleSpinSlots}
            disabled={isSpinning}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 hover:text-white hover:bg-slate-700 transition-all ${
              isSpinning ? 'opacity-50 cursor-not-allowed animate-pulse' : ''
            }`}
          >
            <Shuffle className={`h-3.5 w-3.5 ${isSpinning ? 'animate-spin' : ''}`} />
            <span>Shuffle All Wheels</span>
          </button>
        </div>

        {/* The 4 Wheels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Wheel 1: Target Audience */}
          <div className="p-4 rounded-xl border border-slate-800 bg-[#10192b] space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-indigo-400" />
              1. Target Audience
            </span>
            <select
              value={selectedAudience}
              onChange={(e) => setSelectedAudience(e.target.value)}
              className="w-full bg-[#0b101c] border border-slate-700 rounded-lg p-2.5 text-xs font-semibold text-white focus:outline-none focus:border-indigo-500"
            >
              {AUDIENCES.map((aud) => (
                <option key={aud} value={aud}>
                  {aud}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-400">High-intent niche buyer</p>
          </div>

          {/* Wheel 2: Problem / Domain */}
          <div className="p-4 rounded-xl border border-slate-800 bg-[#10192b] space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Compass className="h-3.5 w-3.5 text-emerald-400" />
              2. Pain Point / Domain
            </span>
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="w-full bg-[#0b101c] border border-slate-700 rounded-lg p-2.5 text-xs font-semibold text-white focus:outline-none focus:border-indigo-500"
            >
              {DOMAINS.map((dom) => (
                <option key={dom} value={dom}>
                  {dom}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-400">Acute weekly bottleneck</p>
          </div>

          {/* Wheel 3: Platform */}
          <div className="p-4 rounded-xl border border-slate-800 bg-[#10192b] space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Smartphone className="h-3.5 w-3.5 text-amber-400" />
              3. Platform / Form
            </span>
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value as AppPlatform)}
              className="w-full bg-[#0b101c] border border-slate-700 rounded-lg p-2.5 text-xs font-semibold text-white focus:outline-none focus:border-indigo-500"
            >
              {PLATFORMS.map((plat) => (
                <option key={plat} value={plat}>
                  {plat}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-400">Native delivery format</p>
          </div>

          {/* Wheel 4: Secret Sauce / Twist */}
          <div className="p-4 rounded-xl border border-slate-800 bg-[#10192b] space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Cpu className="h-3.5 w-3.5 text-indigo-400" />
              4. Unfair Advantage
            </span>
            <select
              value={selectedTwist}
              onChange={(e) => setSelectedTwist(e.target.value)}
              className="w-full bg-[#0b101c] border border-slate-700 rounded-lg p-2.5 text-xs font-semibold text-white focus:outline-none focus:border-indigo-500"
            >
              {TWISTS.map((tw) => (
                <option key={tw} value={tw}>
                  {tw}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-400">Architectural wedge</p>
          </div>
        </div>

        {/* Synthesize Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
          <div className="text-xs text-slate-300">
            <span className="text-slate-400">Selected Intersection:</span>{' '}
            <strong className="text-white">{selectedPlatform}</strong> for{' '}
            <strong className="text-indigo-300">{selectedAudience}</strong> addressing{' '}
            <strong className="text-emerald-300">{selectedDomain}</strong> with{' '}
            <strong className="text-amber-300">{selectedTwist}</strong>.
          </div>

          <button
            onClick={handleSynthesize}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg transition-all hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-500 whitespace-nowrap shrink-0"
          >
            <span>Synthesize Full Blueprint</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* AI Custom Prompt Generator */}
      <div className="rounded-2xl border border-slate-800 bg-[#090e18] p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2">
          <Wand2 className="h-4 w-4 text-indigo-400" />
          <h2 className="text-base font-bold text-white tracking-tight">
            Custom Idea Synthesizer
          </h2>
        </div>
        <p className="text-xs text-slate-400">
          Have an inkling or half-baked problem statement? Type any raw thought to generate a complete product specification with user stories, technical architecture, and pricing.
        </p>

        <div className="flex flex-col sm:flex-row gap-2.5">
          <input
            type="text"
            placeholder="e.g. WhatsApp payment reminder bot for freelance wedding photographers..."
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleGenerateAi();
            }}
            className="flex-1 rounded-xl border border-slate-700 bg-[#0e1422] px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
          />

          <button
            onClick={() => handleGenerateAi()}
            disabled={isGeneratingAi || !customPrompt.trim()}
            className={`flex items-center justify-center gap-2 rounded-xl bg-slate-800 border border-slate-700 px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-slate-700 whitespace-nowrap ${
              isGeneratingAi || !customPrompt.trim() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isGeneratingAi ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin text-indigo-400" />
                <span>Architecting...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
                <span>Generate Blueprint</span>
              </>
            )}
          </button>
        </div>

        {/* Quick starter chips */}
        <div className="pt-2">
          <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block mb-2">
            Or try one of these prompts:
          </span>
          <div className="flex flex-wrap gap-2">
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCustomPrompt(p);
                  handleGenerateAi(p);
                }}
                className="text-xs text-slate-400 hover:text-indigo-300 hover:underline transition-colors text-left"
              >
                "{p}"
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
