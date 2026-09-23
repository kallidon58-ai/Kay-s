import React, { useState } from 'react';
import {
  ShieldAlert,
  CheckSquare,
  Square,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  TrendingUp,
  Award,
} from 'lucide-react';

export const ValidationChecker: React.FC = () => {
  const [urgency, setUrgency] = useState(4); // 1-5
  const [willingnessToPay, setWillingnessToPay] = useState(4); // 1-5
  const [distributionClarity, setDistributionClarity] = useState(3); // 1-5
  const [buildSimplicity, setBuildSimplicity] = useState(4); // 1-5
  const [retentionMoat, setRetentionMoat] = useState(3); // 1-5

  const [actions, setActions] = useState<{ id: string; text: string; done: boolean }[]>([
    { id: 'a1', text: 'Conduct 5 user discovery calls with target users without mentioning your solution', done: false },
    { id: 'a2', text: 'Verify if prospective users currently pay for alternative software or consultants', done: false },
    { id: 'a3', text: 'Set up a 1-page pre-launch landing page with an email capture form', done: false },
    { id: 'a4', text: 'Secure 3 verbal pre-commitments or discounted pre-orders before writing code', done: false },
    { id: 'a5', text: 'List the 3 highest-leverage acquisition channels where users naturally congregate', done: false },
  ]);

  const toggleAction = (id: string) => {
    setActions((prev) =>
      prev.map((a) => (a.id === id ? { ...a, done: !a.done } : a))
    );
  };

  // Calculate score out of 100
  const rawScore = (urgency + willingnessToPay + distributionClarity + buildSimplicity + retentionMoat) * 4;
  const checklistBonus = actions.filter((a) => a.done).length * 2;
  const totalScore = Math.min(100, rawScore + checklistBonus);

  let statusLabel = 'Strong Viability — High Indie Success Probability';
  let statusColor = 'text-emerald-400';
  let advice = 'The problem appears acute and monetizable with straightforward distribution. Focus on shipping the single core loop within 2 weeks and acquiring your first 10 paying customers manually.';

  if (totalScore < 50) {
    statusLabel = 'High Hazard — Critical Validation Gaps Detected';
    statusColor = 'text-rose-400';
    advice = 'Do not write code yet. Interview 10 target buyers to confirm whether this is a real burning pain point or just a mild annoyance they will never pay for.';
  } else if (totalScore < 75) {
    statusLabel = 'Moderate Potential — Solid Concept Requiring Distribution Wedge';
    statusColor = 'text-amber-400';
    advice = 'The core idea is promising, but make sure you have a clear unfair distribution channel (e.g. app store directory, niche forum, or influencer partnership) before building complex secondary features.';
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          App Idea Validation Rubric
        </h1>
        <p className="mt-2 text-sm text-slate-300 leading-relaxed">
          Stress-test your app concept against the five fatal pitfalls of indie software. Grade your idea honestly to expose blind spots before writing a single line of code.
        </p>
      </div>

      {/* Score Summary Box */}
      <div className="rounded-2xl border border-slate-700/80 bg-[#0d1424] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1">
            Calculated Viability Index
          </span>
          <div className="flex items-baseline gap-3">
            <span className="text-4xl sm:text-5xl font-extrabold font-mono tabular-nums text-white">
              {totalScore}
            </span>
            <span className="text-slate-500 text-sm">/ 100</span>
          </div>
          <p className={`text-sm font-bold mt-2 ${statusColor}`}>
            {statusLabel}
          </p>
          <p className="text-xs text-slate-300 mt-1 max-w-lg leading-relaxed">
            {advice}
          </p>
        </div>

        <div className="p-4 rounded-xl border border-slate-800 bg-[#10192c] w-full md:w-64 space-y-2 text-xs">
          <div className="flex justify-between text-slate-400">
            <span>Core Score:</span>
            <span className="font-mono tabular-nums text-white">{rawScore}/100</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Validation Tasks:</span>
            <span className="font-mono tabular-nums text-emerald-400">+{checklistBonus} pts</span>
          </div>
          <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
            Scores $\ge 75$ indicate viable software ready for MVP build.
          </div>
        </div>
      </div>

      {/* 5 Vectors Sliders */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-white tracking-tight">
          The 5 Vital Dimensions
        </h2>

        <div className="space-y-3">
          {/* Vector 1 */}
          <div className="p-4 rounded-xl border border-slate-800 bg-[#0f1627] space-y-2">
            <div className="flex justify-between items-center text-xs">
              <div>
                <strong className="text-white text-sm block">1. Pain Point Urgency (Hair on Fire)</strong>
                <span className="text-slate-400">Are people actively searching or hacking workarounds together right now?</span>
              </div>
              <span className="font-mono text-sm font-bold text-indigo-400">{urgency}/5</span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              value={urgency}
              onChange={(e) => setUrgency(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>Mild nice-to-have (Vitamin)</span>
              <span>Acute revenue blocker (Painkiller)</span>
            </div>
          </div>

          {/* Vector 2 */}
          <div className="p-4 rounded-xl border border-slate-800 bg-[#0f1627] space-y-2">
            <div className="flex justify-between items-center text-xs">
              <div>
                <strong className="text-white text-sm block">2. Willingness & Ability to Pay</strong>
                <span className="text-slate-400">Does the target user have discretionary budget or business authority to swipe a card?</span>
              </div>
              <span className="font-mono text-sm font-bold text-indigo-400">{willingnessToPay}/5</span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              value={willingnessToPay}
              onChange={(e) => setWillingnessToPay(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>Frugal consumers expecting free</span>
              <span>Businesses with clear positive ROI</span>
            </div>
          </div>

          {/* Vector 3 */}
          <div className="p-4 rounded-xl border border-slate-800 bg-[#0f1627] space-y-2">
            <div className="flex justify-between items-center text-xs">
              <div>
                <strong className="text-white text-sm block">3. Distribution Wedge & Organic Reach</strong>
                <span className="text-slate-400">Do you know exactly where to find the first 100 users without paid ads?</span>
              </div>
              <span className="font-mono text-sm font-bold text-indigo-400">{distributionClarity}/5</span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              value={distributionClarity}
              onChange={(e) => setDistributionClarity(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>No audience, crowded generic market</span>
              <span>Niche directory / clear community wedge</span>
            </div>
          </div>

          {/* Vector 4 */}
          <div className="p-4 rounded-xl border border-slate-800 bg-[#0f1627] space-y-2">
            <div className="flex justify-between items-center text-xs">
              <div>
                <strong className="text-white text-sm block">4. MVP Build Simplicity (Speed to Market)</strong>
                <span className="text-slate-400">Can the core value proposition be delivered in a 14-day development sprint?</span>
              </div>
              <span className="font-mono text-sm font-bold text-indigo-400">{buildSimplicity}/5</span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              value={buildSimplicity}
              onChange={(e) => setBuildSimplicity(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>6+ months of complex backend infra</span>
              <span>Can ship working v1 in 10–14 days</span>
            </div>
          </div>

          {/* Vector 5 */}
          <div className="p-4 rounded-xl border border-slate-800 bg-[#0f1627] space-y-2">
            <div className="flex justify-between items-center text-xs">
              <div>
                <strong className="text-white text-sm block">5. Switching Cost & Retention Moat</strong>
                <span className="text-slate-400">Once adopted, will customers stick around or churn after 30 days?</span>
              </div>
              <span className="font-mono text-sm font-bold text-indigo-400">{retentionMoat}/5</span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              value={retentionMoat}
              onChange={(e) => setRetentionMoat(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>One-off disposable utility</span>
              <span>Embedded daily workflow & data store</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pre-Code Action Checklist */}
      <div className="rounded-2xl border border-slate-800 bg-[#0a0f1c] p-6 sm:p-8 space-y-4">
        <h2 className="text-base font-bold text-white tracking-tight">
          Pre-Code Founder Checklist
        </h2>
        <p className="text-xs text-slate-400">
          Check off validation actions as you complete them to increase confidence and viability:
        </p>

        <div className="space-y-2.5">
          {actions.map((act) => (
            <button
              key={act.id}
              onClick={() => toggleAction(act.id)}
              className="w-full p-3 rounded-xl border border-slate-800 bg-[#0e1526] flex items-center gap-3 text-left hover:border-slate-700 transition-colors"
            >
              {act.done ? (
                <CheckSquare className="h-4 w-4 text-emerald-400 shrink-0" />
              ) : (
                <Square className="h-4 w-4 text-slate-500 shrink-0" />
              )}
              <span
                className={`text-xs ${
                  act.done ? 'line-through text-slate-500' : 'text-slate-200'
                }`}
              >
                {act.text}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
