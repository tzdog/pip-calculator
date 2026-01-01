
import React from 'react';
import { TRADING_PAIRS, ACCOUNT_CURRENCIES } from '../constants';
import { AccountCurrency, TradingPair, CalculationResult } from '../types';

interface CalculatorProps {
  accountCurrency: AccountCurrency;
  setAccountCurrency: (c: AccountCurrency) => void;
  selectedPair: TradingPair;
  setSelectedPair: (p: TradingPair) => void;
  volume: number;
  setVolume: (v: number) => void;
  pipAmount: number;
  setPipAmount: (v: number) => void;
  result: CalculationResult | null;
}

const Calculator: React.FC<CalculatorProps> = ({
  accountCurrency,
  setAccountCurrency,
  selectedPair,
  setSelectedPair,
  volume,
  setVolume,
  pipAmount,
  setPipAmount,
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Account Currency */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Account Currency</label>
          <div className="relative">
            <select
              value={accountCurrency}
              onChange={(e) => setAccountCurrency(e.target.value as AccountCurrency)}
              className="w-full pl-4 pr-10 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-700 dark:text-white font-medium outline-none"
            >
              {ACCOUNT_CURRENCIES.map((cur) => (
                <option key={cur} value={cur}>{cur}</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 dark:text-slate-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Trading Instrument */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Trading Instrument</label>
          <div className="relative">
            <select
              value={selectedPair.symbol}
              onChange={(e) => {
                const pair = TRADING_PAIRS.find(p => p.symbol === e.target.value);
                if (pair) setSelectedPair(pair);
              }}
              className="w-full pl-4 pr-10 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-700 dark:text-white font-medium outline-none"
            >
              {TRADING_PAIRS.map((pair) => (
                <option key={pair.symbol} value={pair.symbol}>{pair.symbol} ({pair.name})</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 dark:text-slate-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Volume */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Volume (Lots)</label>
          <div className="relative">
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-700 dark:text-white font-medium outline-none"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">
              Size
            </div>
          </div>
          <div className="flex gap-2 mt-2 flex-wrap">
            {[0.01, 0.1, 1, 10].map((val) => (
              <button
                key={val}
                onClick={() => setVolume(val)}
                className={`text-xs px-3 py-1 rounded-full border transition-all ${
                  volume === val 
                  ? 'bg-blue-600 border-blue-600 text-white shadow-sm' 
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-blue-300 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                {val} {val === 1 ? 'Lot' : 'Lots'}
              </button>
            ))}
          </div>
        </div>

        {/* Pip Amount */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Pip Amount</label>
          <div className="relative">
            <input
              type="number"
              min="1"
              step="1"
              value={pipAmount}
              onChange={(e) => setPipAmount(parseFloat(e.target.value) || 1)}
              className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-700 dark:text-white font-medium outline-none"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">
              Pips
            </div>
          </div>
          <div className="flex gap-2 mt-2 flex-wrap">
            {[1, 10, 50, 100].map((val) => (
              <button
                key={val}
                onClick={() => setPipAmount(val)}
                className={`text-xs px-3 py-1 rounded-full border transition-all ${
                  pipAmount === val 
                  ? 'bg-blue-600 border-blue-600 text-white shadow-sm' 
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-blue-300 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                {val} Pips
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
