
import { TradingPair } from './types';

export const TRADING_PAIRS: TradingPair[] = [
  // Majors
  { symbol: 'EURUSD', name: 'Euro / US Dollar', pipSize: 0.0001, base: 'EUR', quote: 'USD' },
  { symbol: 'GBPUSD', name: 'British Pound / US Dollar', pipSize: 0.0001, base: 'GBP', quote: 'USD' },
  { symbol: 'USDJPY', name: 'US Dollar / Japanese Yen', pipSize: 0.01, base: 'USD', quote: 'JPY' },
  { symbol: 'AUDUSD', name: 'Australian Dollar / US Dollar', pipSize: 0.0001, base: 'AUD', quote: 'USD' },
  { symbol: 'USDCAD', name: 'US Dollar / Canadian Dollar', pipSize: 0.0001, base: 'USD', quote: 'CAD' },
  { symbol: 'USDCHF', name: 'US Dollar / Swiss Franc', pipSize: 0.0001, base: 'USD', quote: 'CHF' },
  { symbol: 'NZDUSD', name: 'NZ Dollar / US Dollar', pipSize: 0.0001, base: 'NZD', quote: 'USD' },

  // Minors
  { symbol: 'EURGBP', name: 'Euro / British Pound', pipSize: 0.0001, base: 'EUR', quote: 'GBP' },
  { symbol: 'EURAUD', name: 'Euro / Australian Dollar', pipSize: 0.0001, base: 'EUR', quote: 'AUD' },
  { symbol: 'EURJPY', name: 'Euro / Japanese Yen', pipSize: 0.01, base: 'EUR', quote: 'JPY' },
  { symbol: 'GBPJPY', name: 'British Pound / Japanese Yen', pipSize: 0.01, base: 'GBP', quote: 'JPY' },
  { symbol: 'AUDJPY', name: 'Australian Dollar / Japanese Yen', pipSize: 0.01, base: 'AUD', quote: 'JPY' },
  { symbol: 'CADJPY', name: 'Canadian Dollar / Japanese Yen', pipSize: 0.01, base: 'CAD', quote: 'JPY' },
  { symbol: 'CHFJPY', name: 'Swiss Franc / Japanese Yen', pipSize: 0.01, base: 'CHF', quote: 'JPY' },
  { symbol: 'GBPAUD', name: 'British Pound / Australian Dollar', pipSize: 0.0001, base: 'GBP', quote: 'AUD' },
  { symbol: 'EURNZD', name: 'Euro / NZ Dollar', pipSize: 0.0001, base: 'EUR', quote: 'NZD' },
  { symbol: 'AUDNZD', name: 'Australian Dollar / NZ Dollar', pipSize: 0.0001, base: 'AUD', quote: 'NZD' },

  // Exotics
  { symbol: 'USDMXN', name: 'US Dollar / Mexican Peso', pipSize: 0.0001, base: 'USD', quote: 'MXN' },
  { symbol: 'USDZAR', name: 'US Dollar / South African Rand', pipSize: 0.0001, base: 'USD', quote: 'ZAR' },
  { symbol: 'USDTRY', name: 'US Dollar / Turkish Lira', pipSize: 0.0001, base: 'USD', quote: 'TRY' },
  { symbol: 'USDHKD', name: 'US Dollar / Hong Kong Dollar', pipSize: 0.0001, base: 'USD', quote: 'HKD' },
  { symbol: 'USDSGD', name: 'US Dollar / Singapore Dollar', pipSize: 0.0001, base: 'USD', quote: 'SGD' },
  { symbol: 'USDNOK', name: 'US Dollar / Norwegian Krone', pipSize: 0.0001, base: 'USD', quote: 'NOK' },
  { symbol: 'USDSEK', name: 'US Dollar / Swedish Krona', pipSize: 0.0001, base: 'USD', quote: 'SEK' },

  // Metals
  { symbol: 'XAUUSD', name: 'Gold / US Dollar', pipSize: 0.01, base: 'XAU', quote: 'USD' },
  { symbol: 'XAGUSD', name: 'Silver / US Dollar', pipSize: 0.01, base: 'XAG', quote: 'USD' },
  { symbol: 'XPTUSD', name: 'Platinum / US Dollar', pipSize: 0.01, base: 'XPT', quote: 'USD' },
  { symbol: 'XPDUSD', name: 'Palladium / US Dollar', pipSize: 0.01, base: 'XPD', quote: 'USD' },

  // Cryptocurrencies
  { symbol: 'BTCUSD', name: 'Bitcoin / US Dollar', pipSize: 1.0, base: 'BTC', quote: 'USD' },
  { symbol: 'ETHUSD', name: 'Ethereum / US Dollar', pipSize: 0.1, base: 'ETH', quote: 'USD' },
  { symbol: 'LTCUSD', name: 'Litecoin / US Dollar', pipSize: 0.01, base: 'LTC', quote: 'USD' },
];

export const ACCOUNT_CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF'] as const;

/**
 * Simulated base rates relative to USD (1 USD = X Currency)
 * These are used to calculate cross-rates and pip values in the selected account currency.
 */
export const BASE_RATES: Record<string, number> = {
  // Fiat
  'USD': 1,
  'EUR': 0.92,
  'GBP': 0.79,
  'JPY': 151.20,
  'AUD': 1.52,
  'CAD': 1.35,
  'CHF': 0.90,
  'NZD': 1.66,
  'MXN': 16.45,
  'ZAR': 18.60,
  'TRY': 32.10,
  'HKD': 7.82,
  'SGD': 1.34,
  'NOK': 10.70,
  'SEK': 10.60,

  // Metals (Values in Oz per 1 USD, roughly)
  'XAU': 0.00042, // ~2380 USD/oz
  'XAG': 0.035,   // ~28.5 USD/oz
  'XPT': 0.00105, // ~950 USD/oz
  'XPD': 0.00098, // ~1020 USD/oz

  // Crypto (Values in Coin per 1 USD)
  'BTC': 0.000015, // ~66,000 USD
  'ETH': 0.00029,  // ~3,400 USD
  'LTC': 0.012,    // ~83 USD
};
