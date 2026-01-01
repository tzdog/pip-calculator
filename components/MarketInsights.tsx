
import React from 'react';
import { MarketInsight } from '../types';

interface MarketInsightsProps {
  insights: MarketInsight | null;
  loading: boolean;
  pair: string;
}

const MarketInsights: React.FC<MarketInsightsProps> = ({ insights, loading, pair }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 transition-colors duration-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white">Smart Insights</h3>
        <div className="flex items-center space-x-1">
          <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">AI Analysis Live</span>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4 animate-pulse">
          <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-3/4"></div>
          <div className="h-20 bg-slate-100 dark:bg-slate-800 rounded w-full"></div>
          <div className="grid grid-cols-2 gap-2">
            <div className="h-8 bg-slate-100 dark:bg-slate-800 rounded"></div>
            <div className="h-8 bg-slate-100 dark:bg-slate-800 rounded"></div>
          </div>
        </div>
      ) : insights ? (
        <div className="space-y-4">
          <div>
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">Market Outlook: {pair}</span>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
              "{insights.analysis}"
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl transition-colors duration-200">
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase block">Volatility</span>
              <span className={`text-sm font-bold ${
                insights.volatility === 'High' ? 'text-red-600 dark:text-red-400' : 
                insights.volatility === 'Medium' ? 'text-amber-600 dark:text-amber-400' : 'text-green-600 dark:text-green-400'
              }`}>
                {insights.volatility}
              </span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl transition-colors duration-200">
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase block">Trend</span>
              <span className={`text-sm font-bold ${
                insights.trend === 'Bullish' ? 'text-green-600 dark:text-green-400' : 
                insights.trend === 'Bearish' ? 'text-red-600 dark:text-red-400' : 'text-slate-600 dark:text-slate-400'
              }`}>
                {insights.trend}
              </span>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-900/50 p-3 rounded-xl transition-colors duration-200">
            <span className="text-[10px] font-bold text-blue-400 dark:text-blue-500 uppercase block mb-1">Pro Recommendation</span>
            <p className="text-xs text-blue-800 dark:text-blue-200 font-medium">
              {insights.recommendation}
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-sm text-slate-400 dark:text-slate-600">Select a pair to see AI insights</p>
        </div>
      )}
    </div>
  );
};

export default MarketInsights;
