import React from 'react';
import { WireframeScreen } from '../types';
import { Layout, CheckCircle2, ChevronRight, Activity, Bell, Search, Plus } from 'lucide-react';

interface WireframeMockupProps {
  screens: WireframeScreen[];
  appTitle: string;
}

export const WireframeMockup: React.FC<WireframeMockupProps> = ({ screens, appTitle }) => {
  const [activeScreenIndex, setActiveScreenIndex] = React.useState(0);

  if (!screens || screens.length === 0) {
    return (
      <div className="rounded-lg border border-slate-800 bg-[#0d131f] p-8 text-center text-sm text-slate-400">
        No interactive wireframes available for this idea.
      </div>
    );
  }

  const currentScreen = screens[activeScreenIndex] || screens[0];

  return (
    <div className="flex flex-col gap-4">
      {/* Screen selector tabs */}
      {screens.length > 1 && (
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg w-fit">
          {screens.map((s, idx) => (
            <button
              key={s.id || idx}
              onClick={() => setActiveScreenIndex(idx)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeScreenIndex === idx
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
      )}

      {/* Simulated Device / Browser Frame */}
      <div className="rounded-xl border border-slate-700/80 bg-[#080c14] shadow-2xl overflow-hidden">
        {/* Browser Top Window Chrome */}
        <div className="flex items-center justify-between border-b border-slate-800/90 bg-[#0f1523] px-4 py-2.5 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80 inline-block" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80 inline-block" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <span className="ml-2 font-mono text-[11px] text-slate-500 truncate max-w-[200px]">
              app.{appTitle.toLowerCase().replace(/[^a-z0-9]/g, '')}.internal
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-500">
            <Search className="h-3.5 w-3.5" />
            <Bell className="h-3.5 w-3.5" />
            <div className="h-4 w-4 rounded-full bg-indigo-500/20 border border-indigo-500/40" />
          </div>
        </div>

        {/* Screen Internal Content */}
        <div className="p-5 sm:p-6">
          {/* Header area */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
            <div>
              <h4 className="text-base font-bold text-white tracking-tight">
                {currentScreen.headline}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {currentScreen.description}
              </p>
            </div>

            {currentScreen.keyActions && currentScreen.keyActions.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                {currentScreen.keyActions.map((action, i) => (
                  <button
                    key={i}
                    className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                      i === 0
                        ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                        : 'bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {i === 0 && <Plus className="h-3 w-3 inline mr-1" />}
                    {action}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Screen Items Grid / List */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentScreen.mockupItems.map((item, idx) => {
              if (item.type === 'metric') {
                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded-lg border border-slate-800 bg-[#0f172a]/60"
                  >
                    <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
                      {item.label}
                    </span>
                    <span className="text-lg font-bold font-mono tabular-nums text-white mt-1 block">
                      {item.value}
                    </span>
                  </div>
                );
              }

              if (item.type === 'table_row' || item.type === 'card') {
                return (
                  <div
                    key={idx}
                    className="col-span-full p-3.5 rounded-lg border border-slate-800/80 bg-[#101726]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="h-2 w-2 rounded-full bg-indigo-400 shrink-0" />
                      <span className="text-xs font-semibold text-slate-200">
                        {item.label}
                      </span>
                    </div>
                    {item.value && (
                      <span className="text-xs text-slate-400 font-mono tabular-nums">
                        {item.value}
                      </span>
                    )}
                  </div>
                );
              }

              if (item.type === 'input') {
                return (
                  <div key={idx} className="col-span-full">
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">
                      {item.label}
                    </label>
                    <div className="px-3 py-2 rounded border border-slate-700 bg-slate-900 text-xs font-mono text-slate-300">
                      {item.value || 'Tap to enter value...'}
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={idx}
                  className="p-3 rounded border border-slate-800 text-xs text-slate-300"
                >
                  <span className="font-semibold text-white block">{item.label}</span>
                  {item.detail && <span className="text-slate-400 text-[11px]">{item.detail}</span>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
