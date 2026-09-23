import React from 'react';
import { Bookmark, ArrowUpRight, Clock, Layers, Sparkles } from 'lucide-react';
import { AppIdea } from '../types';

interface IdeaCardProps {
  idea: AppIdea;
  isSaved: boolean;
  onSelect: (idea: AppIdea) => void;
  onToggleSave: (idea: AppIdea, e: React.MouseEvent) => void;
}

export const IdeaCard: React.FC<IdeaCardProps> = ({
  idea,
  isSaved,
  onSelect,
  onToggleSave,
}) => {
  const totalMvpDays = idea.mvpFeatures.reduce((acc, f) => acc + (f.estimatedDays || 0), 0);
  const p0Count = idea.mvpFeatures.filter((f) => f.priority.includes('P0')).length;

  return (
    <div
      onClick={() => onSelect(idea)}
      className="group relative flex flex-col justify-between rounded-xl border border-slate-800 bg-[#0f1523]/80 p-5 transition-all duration-200 hover:border-slate-700 hover:bg-[#131b2e] hover:shadow-lg cursor-pointer"
    >
      <div>
        {/* Top metadata unboxed text line (Zero-Pill Discipline) */}
        <div className="flex items-center justify-between gap-2 text-xs text-slate-400 mb-2.5">
          <div className="flex items-center gap-1.5 truncate">
            <span className="font-medium text-indigo-400">{idea.category}</span>
            <span aria-hidden="true">·</span>
            <span>{idea.platform}</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-500 truncate">{idea.monetization.model}</span>
          </div>

          <button
            onClick={(e) => onToggleSave(idea, e)}
            className={`p-1 rounded transition-colors ${
              isSaved
                ? 'text-indigo-400 hover:text-indigo-300'
                : 'text-slate-500 hover:text-slate-300'
            }`}
            title={isSaved ? 'Remove from saved' : 'Save idea'}
            aria-label="Save idea"
          >
            <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-indigo-400' : ''}`} />
          </button>
        </div>

        {/* Title */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-bold tracking-tight text-white group-hover:text-indigo-300 transition-colors">
            {idea.title}
          </h3>
          <ArrowUpRight className="h-4 w-4 text-slate-600 opacity-0 group-hover:opacity-100 group-hover:text-slate-300 transition-all shrink-0 mt-1" />
        </div>

        {/* Tagline */}
        <p className="mt-1 text-sm text-slate-300 font-medium leading-snug line-clamp-2">
          {idea.tagline}
        </p>

        {/* Short Summary */}
        <p className="mt-2.5 text-xs text-slate-400 leading-relaxed line-clamp-2">
          {idea.summary}
        </p>
      </div>

      <div className="mt-5 pt-3 border-t border-slate-800/80">
        {/* Bottom Specs: Unboxed clean metadata */}
        <div className="flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5 text-slate-500" />
            <span className="font-mono tabular-nums text-slate-300">{p0Count}</span>
            <span>core P0s</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-slate-500" />
            <span className="font-mono tabular-nums text-slate-300">~{totalMvpDays}</span>
            <span>dev days</span>
          </div>

          <div className="text-right font-mono tabular-nums text-slate-300 font-medium truncate max-w-[110px]">
            {idea.monetization.projectedArpu}
          </div>
        </div>
      </div>
    </div>
  );
};
