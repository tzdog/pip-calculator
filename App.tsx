
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Calculator from './components/Calculator';
import MarketInsights from './components/MarketInsights';
import { TRADING_PAIRS, ACCOUNT_CURRENCIES, BASE_RATES } from './constants';
import { AccountCurrency, CalculationResult, MarketInsight } from './types';
import { getMarketInsights } from './services/geminiService';

const App: React.FC = () => {
  const [accountCurrency, setAccountCurrency] = useState<AccountCurrency>('USD');
  const [selectedPair, setSelectedPair] = useState(TRADING_PAIRS[0]);
  const [volume, setVolume] = useState<number>(1); // Standard Lots
  const [pipAmount, setPipAmount] = useState<number>(1); // Number of pips to calculate
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [insights, setInsights] = useState<MarketInsight | null>(null);
  const [loadingInsights, setLoadingInsights] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });

  const toggleDarkMode = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const calculatePipValue = useCallback(() => {
    const lotSizeUnits = 100000; // Standard lot
    const totalUnits = volume * lotSizeUnits;
    
    const rateBaseToUsd = 1 / BASE_RATES[selectedPair.base];
    const rateQuoteToUsd = 1 / BASE_RATES[selectedPair.quote];
    const currentExchangeRate = rateBaseToUsd / rateQuoteToUsd;

    let pipValueInAccountCurrency = 0;

    if (selectedPair.quote === accountCurrency) {
      pipValueInAccountCurrency = selectedPair.pipSize * totalUnits;
    } else {
      const pipValueInQuote = selectedPair.pipSize * totalUnits;
      const rateQuoteToAccount = BASE_RATES[accountCurrency] / BASE_RATES[selectedPair.quote];
      pipValueInAccountCurrency = pipValueInQuote * rateQuoteToAccount;
    }

    const totalPipValue = pipValueInAccountCurrency * pipAmount;

    setResult({
      pipValue: totalPipValue,
      lotSizeUnits: totalUnits,
      exchangeRate: currentExchangeRate,
      currency: accountCurrency
    });
  }, [accountCurrency, selectedPair, volume, pipAmount]);

  useEffect(() => {
    calculatePipValue();
  }, [calculatePipValue]);

  const fetchInsights = async () => {
    if (!result) return;
    setLoadingInsights(true);
    try {
      const singlePipValue = result.pipValue / (pipAmount || 1);
      const data = await getMarketInsights(selectedPair.symbol, singlePipValue, accountCurrency);
      setInsights(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingInsights(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, [selectedPair.symbol, accountCurrency]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-200 pb-12">
      <Header isDark={isDark} toggleDarkMode={toggleDarkMode} />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors duration-200">
              <div className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Pip Calculator</h2>
                
                <Calculator 
                  accountCurrency={accountCurrency}
                  setAccountCurrency={setAccountCurrency}
                  selectedPair={selectedPair}
                  setSelectedPair={setSelectedPair}
                  volume={volume}
                  setVolume={setVolume}
                  pipAmount={pipAmount}
                  setPipAmount={setPipAmount}
                  result={result}
                />
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 p-6 sm:p-8 transition-colors duration-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Result for {pipAmount} {pipAmount === 1 ? 'Pip' : 'Pips'}
                    </p>
                    <div className="flex items-baseline mt-2">
                      <span className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">
                        {result?.pipValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
                      </span>
                      <span className="ml-2 text-xl font-semibold text-slate-600 dark:text-slate-300">{accountCurrency}</span>
                    </div>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 italic">
                      Total value based on your trade volume and pip amount
                    </p>
                  </div>
                  
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 transition-colors duration-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">Lot Size (Units):</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-200">{result?.lotSizeUnits.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">Market Price (Est):</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-200">{result?.exchangeRate.toFixed(5)}</span>
                    </div>
                    <div className="flex justify-between text-sm border-t border-slate-100 dark:border-slate-700 pt-2">
                      <span className="text-slate-500 dark:text-slate-400">1 Pip Value:</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-200">
                        {((result?.pipValue || 0) / (pipAmount || 1)).toFixed(4)} {accountCurrency}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <MarketInsights 
              insights={insights} 
              loading={loadingInsights} 
              pair={selectedPair.symbol} 
            />
            
            <div className="bg-blue-600 dark:bg-blue-700 rounded-2xl p-6 text-white shadow-lg shadow-blue-200 dark:shadow-none transition-colors duration-200">
              <h3 className="text-lg font-bold mb-3">How to Calculate?</h3>
              <p className="text-blue-50 text-sm leading-relaxed mb-4">
                Pip Value = (1 Pip / Exchange Rate) × Lot Size × Pip Amount. 
                Our tool handles the currency conversions automatically for your account balance.
              </p>
              <button 
                onClick={() => alert("Redirecting to educational center...")}
                className="w-full bg-white/20 hover:bg-white/30 py-2 rounded-lg text-sm font-semibold transition-colors"
              >
                Detailed Guide
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;
