import React from 'react';
import { Sparkles, Bookmark, Shuffle } from 'lucide-react';

interface HeaderProps {
  activeTab: 'explore' | 'combinator' | 'validator' | 'saved';
  setActiveTab: (tab: 'explore' | 'combinator' | 'validator' | 'saved') => void;
  savedCount: number;
  onOpenNewIdea: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  onOpenNewIdea,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#090d16]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element Brand Zone */}
        <button
          onClick={() => setActiveTab('explore')}
          className="text-left font-bold text-lg tracking-tight text-white transition-opacity hover:opacity-90 focus:outline-none"
        >
          AppForge
        </button>

        {/* Zone 2: 4 clean text navigation links */}
        <nav className="flex items-center gap-1 sm:gap-6 text-sm font-medium">
          <button
            onClick={() => setActiveTab('explore')}
            className={`whitespace-nowrap transition-colors ${
              activeTab === 'explore'
                ? 'text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Blueprints
          </button>
          <button
            onClick={() => setActiveTab('combinator')}
            className={`whitespace-nowrap transition-colors ${
              activeTab === 'combinator'
                ? 'text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Combinator
          </button>
          <button
            onClick={() => setActiveTab('validator')}
            className={`whitespace-nowrap transition-colors ${
              activeTab === 'validator'
                ? 'text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Validator
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'saved'
                ? 'text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Saved</span>
            {savedCount > 0 && (
              <span className="text-xs font-mono tabular-nums text-indigo-400 font-semibold">
                ({savedCount})
              </span>
            )}
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenNewIdea}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-500 whitespace-nowrap"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Generate Idea</span>
          </button>
        </div>
      </div>
    </header>
  );
};
