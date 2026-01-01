
export type AccountCurrency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'AUD' | 'CAD' | 'CHF';

export interface TradingPair {
  symbol: string;
  name: string;
  pipSize: number;
  base: string;
  quote: string;
}

export interface CalculationResult {
  pipValue: number;
  lotSizeUnits: number;
  exchangeRate: number;
  currency: string;
}

export interface MarketInsight {
  analysis: string;
  volatility: 'Low' | 'Medium' | 'High';
  trend: 'Bullish' | 'Bearish' | 'Neutral';
  recommendation: string;
}
