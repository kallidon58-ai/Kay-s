import React, { useState } from 'react';
import { DollarSign, TrendingUp, Users, Target, ShieldCheck } from 'lucide-react';
import { MonetizationPlan } from '../types';

interface RevenueCalculatorProps {
  monetization: MonetizationPlan;
}

export const RevenueCalculator: React.FC<RevenueCalculatorProps> = ({ monetization }) => {
  // Extract a sensible default price from tiers
  const defaultPrice = Number(
    monetization.tiers.find((t) => t.price.includes('$'))?.price.replace(/[^0-9.]/g, '') || 19
  );

  const [monthlyVisitors, setMonthlyVisitors] = useState(5000);
  const [conversionRate, setConversionRate] = useState(2.5); // %
  const [avgPrice, setAvgPrice] = useState(defaultPrice > 0 ? defaultPrice : 19);
  const [churnRate, setChurnRate] = useState(5); // % monthly churn

  const payingCustomers = Math.round(monthlyVisitors * (conversionRate / 100));
  const estimatedMrr = Math.round(payingCustomers * avgPrice);
  const estimatedArr = estimatedMrr * 12;
  const estimatedLtv = churnRate > 0 ? Math.round(avgPrice / (churnRate / 100)) : avgPrice * 24;

  return (
    <div className="rounded-xl border border-slate-800 bg-[#0c121e] p-5 sm:p-6">
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h4 className="text-sm font-bold text-white tracking-tight">
            Unit Economics & Revenue Simulator
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Model projected MRR based on traffic, conversion rate, and price point.
          </p>
        </div>
        <span className="text-xs font-mono text-slate-400">
          Model: <strong className="text-slate-200">{monetization.model}</strong>
        </span>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5">
        <div className="p-3 rounded-lg bg-[#111927] border border-slate-800">
          <span className="text-[11px] font-medium text-slate-400 block">
            Projected MRR
          </span>
          <span className="text-xl font-bold font-mono tabular-nums text-emerald-400 mt-1 block">
            ${estimatedMrr.toLocaleString()}
          </span>
        </div>

        <div className="p-3 rounded-lg bg-[#111927] border border-slate-800">
          <span className="text-[11px] font-medium text-slate-400 block">
            Annual Run Rate (ARR)
          </span>
          <span className="text-xl font-bold font-mono tabular-nums text-white mt-1 block">
            ${estimatedArr.toLocaleString()}
          </span>
        </div>

        <div className="p-3 rounded-lg bg-[#111927] border border-slate-800">
          <span className="text-[11px] font-medium text-slate-400 block">
            Paying Users
          </span>
          <span className="text-xl font-bold font-mono tabular-nums text-indigo-300 mt-1 block">
            {payingCustomers.toLocaleString()}
          </span>
        </div>

        <div className="p-3 rounded-lg bg-[#111927] border border-slate-800">
          <span className="text-[11px] font-medium text-slate-400 block">
            Est. Customer LTV
          </span>
          <span className="text-xl font-bold font-mono tabular-nums text-white mt-1 block">
            ${estimatedLtv.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Sliders Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
        <div>
          <div className="flex justify-between text-slate-300 mb-1.5">
            <span>Monthly Targeted Visitors</span>
            <span className="font-mono tabular-nums font-semibold text-white">
              {monthlyVisitors.toLocaleString()} visits
            </span>
          </div>
          <input
            type="range"
            min="500"
            max="50000"
            step="500"
            value={monthlyVisitors}
            onChange={(e) => setMonthlyVisitors(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
        </div>

        <div>
          <div className="flex justify-between text-slate-300 mb-1.5">
            <span>Free-to-Paid Conversion Rate</span>
            <span className="font-mono tabular-nums font-semibold text-white">
              {conversionRate.toFixed(1)}%
            </span>
          </div>
          <input
            type="range"
            min="0.5"
            max="8.0"
            step="0.1"
            value={conversionRate}
            onChange={(e) => setConversionRate(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
        </div>

        <div>
          <div className="flex justify-between text-slate-300 mb-1.5">
            <span>Average Subscription Price</span>
            <span className="font-mono tabular-nums font-semibold text-white">
              ${avgPrice} / mo
            </span>
          </div>
          <input
            type="range"
            min="5"
            max="120"
            step="1"
            value={avgPrice}
            onChange={(e) => setAvgPrice(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
        </div>

        <div>
          <div className="flex justify-between text-slate-300 mb-1.5">
            <span>Monthly Churn Rate</span>
            <span className="font-mono tabular-nums font-semibold text-white">
              {churnRate}% / mo
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="15"
            step="0.5"
            value={churnRate}
            onChange={(e) => setChurnRate(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
        </div>
      </div>

      {/* Economics Note */}
      {monetization.unitEconomicsNote && (
        <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-start gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
          <span>{monetization.unitEconomicsNote}</span>
        </div>
      )}
    </div>
  );
};
