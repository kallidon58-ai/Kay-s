import React from 'react';
import { Bookmark, ArrowRight, Trash2, Download, Sparkles, FileText } from 'lucide-react';
import { AppIdea } from '../types';
import { IdeaCard } from './IdeaCard';

interface SavedViewProps {
  savedIdeas: AppIdea[];
  onSelectIdea: (idea: AppIdea) => void;
  onRemoveIdea: (idea: AppIdea, e: React.MouseEvent) => void;
  onExplore: () => void;
}

export const SavedView: React.FC<SavedViewProps> = ({
  savedIdeas,
  onSelectIdea,
  onRemoveIdea,
  onExplore,
}) => {
  const handleExportAll = () => {
    if (savedIdeas.length === 0) return;
    const jsonStr = JSON.stringify(savedIdeas, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `appforge-saved-ideas-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (savedIdeas.length === 0) {
    return (
      <div className="py-16 text-center max-w-md mx-auto space-y-4">
        <div className="mx-auto w-12 h-12 rounded-2xl bg-indigo-950/50 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
          <Bookmark className="h-6 w-6" />
        </div>
        <h2 className="text-lg font-bold text-white tracking-tight">
          No Saved Blueprints Yet
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          Bookmark promising app concepts or synthesize custom ideas with the Combinator to track, edit, and export your personal pipeline.
        </p>
        <button
          onClick={onExplore}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors"
        >
          <span>Explore Curated Blueprints</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Saved Pipeline ({savedIdeas.length})
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Your bookmarked concepts ready for PRD generation, scoping, and execution.
          </p>
        </div>

        <button
          onClick={handleExportAll}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-medium text-slate-200 hover:bg-slate-700 transition-colors"
        >
          <Download className="h-3.5 w-3.5" />
          <span>Export All (JSON)</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {savedIdeas.map((idea) => (
          <IdeaCard
            key={idea.id}
            idea={idea}
            isSaved={true}
            onSelect={onSelectIdea}
            onToggleSave={onRemoveIdea}
          />
        ))}
      </div>
    </div>
  );
};
