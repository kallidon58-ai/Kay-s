import React, { useState } from 'react';
import { X, Sparkles, Wand2, Shuffle, Loader2, ArrowRight } from 'lucide-react';
import { AppCategory, AppPlatform, AppIdea } from '../types';
import { PLATFORMS, AUDIENCES, generateCombinatorIdea } from '../utils/combinator';

interface NewIdeaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (idea: AppIdea) => void;
}

export const NewIdeaModal: React.FC<NewIdeaModalProps> = ({
  isOpen,
  onClose,
  onCreated,
}) => {
  const [prompt, setPrompt] = useState('');
  const [category, setCategory] = useState<AppCategory>('Micro-SaaS');
  const [platform, setPlatform] = useState<AppPlatform>('Web / SaaS');
  const [audience, setAudience] = useState(AUDIENCES[0]);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (!prompt.trim() && !audience) return;

    setLoading(true);
    try {
      const res = await fetch('/api/generate-idea', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt.trim(),
          category,
          platform,
          audience,
        }),
      });

      const data = await res.json();
      if (data.idea) {
        onCreated(data.idea);
        onClose();
        return;
      }
    } catch (err) {
      console.error('Generation failed, using fallback:', err);
    } finally {
      setLoading(false);
    }

    // Algorithmic fallback
    const idea = generateCombinatorIdea(
      audience,
      prompt || 'Workflow Automation',
      platform,
      'Automated 2-Way Sync'
    );
    onCreated(idea);
    onClose();
  };

  const handleRollRandom = () => {
    const randomAud = AUDIENCES[Math.floor(Math.random() * AUDIENCES.length)];
    const randomPlat = PLATFORMS[Math.floor(Math.random() * PLATFORMS.length)];
    const idea = generateCombinatorIdea(
      randomAud,
      'Meeting Follow-ups & Action Items',
      randomPlat,
      'Voice Memo & Audio-First Workflow'
    );
    onCreated(idea);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-700 bg-[#0c121e] p-6 shadow-2xl space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-indigo-400" />
            <h3 className="text-base font-bold text-white tracking-tight">
              Synthesize New App Blueprint
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              What problem or concept would you like to solve?
            </label>
            <input
              type="text"
              placeholder="e.g. Asynchronous code review notes for remote mobile teams..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-[#101726] px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Platform
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value as AppPlatform)}
                className="w-full rounded-xl border border-slate-700 bg-[#101726] p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                {PLATFORMS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as AppCategory)}
                className="w-full rounded-xl border border-slate-700 bg-[#101726] p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Micro-SaaS">Micro-SaaS</option>
                <option value="Mobile First">Mobile First</option>
                <option value="AI & Automation">AI & Automation</option>
                <option value="Dev Tool">Dev Tool</option>
                <option value="Local-First">Local-First</option>
                <option value="Productivity">Productivity</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Target Customer Niche
            </label>
            <select
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-[#101726] p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              {AUDIENCES.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            onClick={handleRollRandom}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-300 hover:text-white transition-colors"
          >
            <Shuffle className="h-3.5 w-3.5" />
            <span>Random Spin</span>
          </button>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-indigo-600 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors"
          >
            {loading ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Synthesizing...</span>
              </>
            ) : (
              <>
                <span>Generate Blueprint</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
