/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Search, Filter, Sparkles, Layers, ArrowRight, Check } from 'lucide-react';
import { AppIdea, AppCategory, AppPlatform } from './types';
import { CURATED_IDEAS } from './data/curatedIdeas';
import { Header } from './components/Header';
import { IdeaCard } from './components/IdeaCard';
import { BlueprintModal } from './components/BlueprintModal';
import { CombinatorView } from './components/CombinatorView';
import { ValidationChecker } from './components/ValidationChecker';
import { SavedView } from './components/SavedView';
import { NewIdeaModal } from './components/NewIdeaModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<'explore' | 'combinator' | 'validator' | 'saved'>('explore');
  const [ideas, setIdeas] = useState<AppIdea[]>(() => {
    try {
      const stored = localStorage.getItem('appforge_ideas');
      if (stored) {
        const parsed = JSON.parse(stored);
        // Merge with curated ideas ensuring no duplicates
        const existingIds = new Set(parsed.map((i: AppIdea) => i.id));
        const combined = [...parsed, ...CURATED_IDEAS.filter((c) => !existingIds.has(c.id))];
        return combined;
      }
    } catch (e) {
      console.error('Error loading stored ideas', e);
    }
    return CURATED_IDEAS;
  });

  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('appforge_saved_ids');
      return stored ? JSON.parse(stored) : ['pulsesync-standup'];
    } catch {
      return ['pulsesync-standup'];
    }
  });

  const [selectedIdea, setSelectedIdea] = useState<AppIdea | null>(null);
  const [isNewIdeaModalOpen, setIsNewIdeaModalOpen] = useState(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');

  // Persistence
  useEffect(() => {
    try {
      localStorage.setItem('appforge_ideas', JSON.stringify(ideas));
    } catch (e) {
      console.error('Failed to save ideas', e);
    }
  }, [ideas]);

  useEffect(() => {
    try {
      localStorage.setItem('appforge_saved_ids', JSON.stringify(savedIds));
    } catch (e) {
      console.error('Failed to save savedIds', e);
    }
  }, [savedIds]);

  const handleToggleSave = (idea: AppIdea, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSavedIds((prev) =>
      prev.includes(idea.id) ? prev.filter((id) => id !== idea.id) : [...prev, idea.id]
    );
  };

  const handleIdeaCreated = (newIdea: AppIdea) => {
    setIdeas((prev) => [newIdea, ...prev]);
    // Auto-save user generated ideas
    setSavedIds((prev) => (prev.includes(newIdea.id) ? prev : [newIdea.id, ...prev]));
    setSelectedIdea(newIdea);
  };

  // Filtered list
  const filteredIdeas = ideas.filter((idea) => {
    const matchesSearch =
      searchQuery === '' ||
      idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.targetAudience.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.problemStatement.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || idea.category === selectedCategory;

    const matchesPlatform =
      selectedPlatform === 'all' || idea.platform === selectedPlatform;

    return matchesSearch && matchesCategory && matchesPlatform;
  });

  const savedIdeas = ideas.filter((i) => savedIds.includes(i.id));

  const categories = [
    { label: 'All Categories', value: 'all' },
    { label: 'Micro-SaaS', value: 'Micro-SaaS' },
    { label: 'Mobile First', value: 'Mobile First' },
    { label: 'Local-First', value: 'Local-First' },
    { label: 'AI & Automation', value: 'AI & Automation' },
    { label: 'Dev Tool', value: 'Dev Tool' },
    { label: 'Productivity', value: 'Productivity' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Bar Contract (3 Zones) */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedIds.length}
        onOpenNewIdea={() => setIsNewIdeaModalOpen(true)}
      />

      {/* Main Viewport Container (Desktop baseline: 1200px max-width) */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {activeTab === 'explore' && (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-800/80">
              <div className="max-w-2xl">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  App Making Ideas & Blueprints
                </h1>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  Engineered product blueprints for indie hackers and developers. Every concept is complete with verified pain points, prioritized MVP scopes, technical architectures, and unit economics.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0 text-xs text-slate-400">
                <span className="font-mono tabular-nums text-white font-semibold text-sm">
                  {filteredIdeas.length}
                </span>
                <span>Active Blueprints</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <button
                  onClick={() => setActiveTab('combinator')}
                  className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
                >
                  Spin Combinator →
                </button>
              </div>
            </div>

            {/* Filter Controls Bar (Interactive Segmented Buttons) */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Category Segmented Control */}
              <div className="flex items-center gap-1 overflow-x-auto p-1 bg-[#0e1524] rounded-xl border border-slate-800 text-xs">
                {categories.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setSelectedCategory(c.value)}
                    className={`px-3 py-1.5 font-medium rounded-lg transition-colors whitespace-nowrap ${
                      selectedCategory === c.value
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              {/* Search & Platform Filter */}
              <div className="flex items-center gap-3">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search blueprints & niches..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-[#0e1524] pl-9 pr-3.5 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <select
                  value={selectedPlatform}
                  onChange={(e) => setSelectedPlatform(e.target.value)}
                  className="rounded-xl border border-slate-800 bg-[#0e1524] px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
                >
                  <option value="all">All Form Factors</option>
                  <option value="Web / SaaS">Web / SaaS</option>
                  <option value="Mobile iOS & Android">Mobile iOS & Android</option>
                  <option value="Cross-Platform PWA">Cross-Platform PWA</option>
                  <option value="Chrome Extension">Chrome Extension</option>
                  <option value="Desktop App">Desktop App</option>
                </select>
              </div>
            </div>

            {/* Ideas Grid */}
            {filteredIdeas.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredIdeas.map((idea) => (
                  <IdeaCard
                    key={idea.id}
                    idea={idea}
                    isSaved={savedIds.includes(idea.id)}
                    onSelect={(selected) => setSelectedIdea(selected)}
                    onToggleSave={handleToggleSave}
                  />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center max-w-sm mx-auto space-y-3">
                <p className="text-sm text-slate-400">
                  No blueprints found matching your filter criteria.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedPlatform('all');
                  }}
                  className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 underline"
                >
                  Reset all filters
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'combinator' && (
          <CombinatorView onIdeaGenerated={handleIdeaCreated} />
        )}

        {activeTab === 'validator' && <ValidationChecker />}

        {activeTab === 'saved' && (
          <SavedView
            savedIdeas={savedIdeas}
            onSelectIdea={(idea) => setSelectedIdea(idea)}
            onRemoveIdea={handleToggleSave}
            onExplore={() => setActiveTab('explore')}
          />
        )}
      </main>

      {/* Blueprint Inspector Modal */}
      {selectedIdea && (
        <BlueprintModal
          idea={selectedIdea}
          isSaved={savedIds.includes(selectedIdea.id)}
          onClose={() => setSelectedIdea(null)}
          onToggleSave={(idea) => handleToggleSave(idea)}
        />
      )}

      {/* Primary CTA Generator Modal */}
      <NewIdeaModal
        isOpen={isNewIdeaModalOpen}
        onClose={() => setIsNewIdeaModalOpen(false)}
        onCreated={handleIdeaCreated}
      />

      {/* Clean, Non-ornamental Footer */}
      <footer className="w-full border-t border-slate-800/80 bg-[#070b12] py-6 mt-16 text-xs text-slate-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            AppForge Studio · Built for founders, indie hackers, and software engineers.
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('explore')}
              className="hover:text-slate-400 transition-colors"
            >
              Blueprints
            </button>
            <button
              onClick={() => setActiveTab('combinator')}
              className="hover:text-slate-400 transition-colors"
            >
              Combinator
            </button>
            <button
              onClick={() => setActiveTab('validator')}
              className="hover:text-slate-400 transition-colors"
            >
              Validation Rubric
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
