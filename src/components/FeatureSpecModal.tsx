import React, { useState, useEffect } from 'react';
import { X, Code, CheckCircle, AlertTriangle, ArrowRight, Loader2 } from 'lucide-react';
import { MvpFeature } from '../types';

interface FeatureSpecModalProps {
  appTitle: string;
  feature: MvpFeature | null;
  onClose: () => void;
}

interface ExpandedSpec {
  userStories: string[];
  technicalTasks: string[];
  apiEndpoints: string[];
  edgeCasesToHandle?: string[];
}

export const FeatureSpecModal: React.FC<FeatureSpecModalProps> = ({
  appTitle,
  feature,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);
  const [spec, setSpec] = useState<ExpandedSpec | null>(null);

  useEffect(() => {
    if (!feature) {
      setSpec(null);
      return;
    }

    let isMounted = true;
    setLoading(true);

    fetch('/api/expand-feature', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        appTitle,
        featureTitle: feature.title,
        featureDescription: feature.description,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setSpec(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Feature expansion failed:', err);
        if (isMounted) {
          // Fallback spec
          setSpec({
            userStories: [
              `As a core user of ${appTitle}, I want to use ${feature.title.toLowerCase()} so I can resolve blockers instantly.`,
              `As an administrator, I want to audit ${feature.title.toLowerCase()} events for reliability.`,
            ],
            technicalTasks: [
              'Define database schema and relations for ' + feature.title,
              'Build REST controller with rate limiting and payload validation',
              'Create UI state management with optimistic updates',
              'Write automated end-to-end integration tests',
            ],
            apiEndpoints: [
              `POST /api/v1/${feature.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
              `GET /api/v1/${feature.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}/:id`,
            ],
            edgeCasesToHandle: [
              'Network disconnect during submission',
              'Duplicate payload race conditions',
            ],
          });
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [feature, appTitle]);

  if (!feature) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl rounded-xl border border-slate-700 bg-[#0d131f] p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-400">
              Technical Feature Spec
            </span>
            <h3 className="text-lg font-bold text-white mt-0.5">
              {feature.title}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {feature.description}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-4 max-h-[70vh] overflow-y-auto space-y-5">
          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center text-slate-400 gap-3">
              <Loader2 className="h-6 w-6 animate-spin text-indigo-400" />
              <span className="text-xs">Generating engineering spec & user stories...</span>
            </div>
          ) : spec ? (
            <>
              {/* User Stories */}
              <div>
                <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                  User Stories
                </h4>
                <div className="space-y-1.5">
                  {spec.userStories.map((story, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded bg-[#131b2c] border border-slate-800/80 text-xs text-slate-300"
                    >
                      {story}
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Tasks */}
              <div>
                <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Code className="h-3.5 w-3.5 text-indigo-400" />
                  Implementation Tasks
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {spec.technicalTasks.map((task, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 p-2 rounded bg-[#101726] border border-slate-800/80"
                    >
                      <span className="font-mono text-slate-500 font-semibold">{i + 1}.</span>
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* API Endpoints */}
              <div>
                <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  API Contracts
                </h4>
                <div className="space-y-1.5">
                  {spec.apiEndpoints.map((endpoint, i) => (
                    <div
                      key={i}
                      className="px-3 py-2 rounded bg-slate-900 border border-slate-800 font-mono text-xs text-indigo-300"
                    >
                      {endpoint}
                    </div>
                  ))}
                </div>
              </div>

              {/* Edge cases */}
              {spec.edgeCasesToHandle && spec.edgeCasesToHandle.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="h-3.5 w-3.5" />
                    Edge Cases & Guardrails
                  </h4>
                  <ul className="space-y-1 text-xs text-slate-400 list-disc list-inside">
                    {spec.edgeCasesToHandle.map((ec, i) => (
                      <li key={i}>{ec}</li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          ) : null}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
