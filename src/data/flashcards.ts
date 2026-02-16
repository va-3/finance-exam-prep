import type { Flashcard } from '../types';

export const flashcards: Flashcard[] = [
  // Chapter 2: Financial Statements
  {
    id: 'fc001',
    topicId: 'financial-statements-basics',
    formulaId: 'ch2-income',
    front: 'What is the basic income statement equation?',
    back: 'Revenue − Expenses = Income\n\nThis is the fundamental accounting definition of income, measuring financial performance over a specific period.',
    type: 'formula',
    difficulty: 'easy'
  },
  {
    id: 'fc002',
    topicId: 'financial-statements-basics',
    formulaId: 'ch2-nwc',
    front: 'How do you calculate Net Working Capital (NWC)?',
    back: 'NWC = Current Assets − Current Liabilities\n\nThis measures short-term liquidity. NWC usually grows with the firm.',
    type: 'formula',
    difficulty: 'easy'
  },
  {
    id: 'fc003',
    topicId: 'financial-statements-basics',
    front: 'What is the difference between book value and market value?',
    back: 'Book Value: Historical cost as recorded in financial statements (GAAP)\n\nMarket Value: Current price at which assets/liabilities could be bought or sold\n\nUse market value for decision-making!',
    type: 'concept',
    difficulty: 'easy'
  },
  {
    id: 'fc004',
    topicId: 'cash-flow-analysis',
    formulaId: 'ch2-ocf',
    front: 'What is the formula for Operating Cash Flow (OCF)?',
    back: 'OCF = EBIT + Depreciation − Taxes\n\nDepreciation is added back because it\'s a non-cash expense. Use current taxes, not deferred taxes.',
    type: 'formula',
    difficulty: 'medium'
  },
  {
    id: 'fc005',
    topicId: 'cash-flow-analysis',
    front: 'Why is depreciation added back when calculating cash flow?',
    back: 'Depreciation is a non-cash expense. No firm ever writes a check for "depreciation." It reduces accounting income but doesn\'t affect actual cash flow, so we add it back.',
    type: 'concept',
    difficulty: 'easy'
  },
  {
    id: 'fc006',
    topicId: 'taxes-and-marginal-rates',
    front: 'What is the difference between average and marginal tax rates?',
    back: 'Average Tax Rate = Tax Bill / Taxable Income\n\nMarginal Tax Rate = Tax on next dollar earned\n\nUse MARGINAL rate for financial decisions because decisions are incremental!',
    type: 'concept',
    difficulty: 'medium'
  },

  // Chapter 3: Ratio Analysis
  {
    id: 'fc007',
    topicId: 'liquidity-ratios',
    formulaId: 'ch3-current-ratio',
    front: 'What is the Current Ratio formula?',
    back: 'Current Ratio = Current Assets / Current Liabilities\n\nMeasures ability to pay short-term obligations. Higher is generally better for liquidity.',
    type: 'formula',
    difficulty: 'easy'
  },
  {
    id: 'fc008',
    topicId: 'liquidity-ratios',
    formulaId: 'ch3-quick-ratio',
    front: 'What is the Quick Ratio (Acid-Test)?',
    back: 'Quick Ratio = (Current Assets − Inventory) / Current Liabilities\n\nMore conservative than current ratio. Excludes inventory (least liquid current asset).',
    type: 'formula',
    difficulty: 'easy'
  },
  {
    id: 'fc009',
    topicId: 'leverage-ratios',
    formulaId: 'ch3-debt-equity',
    front: 'How do you calculate the Debt-Equity Ratio?',
    back: 'D/E Ratio = Total Debt / Total Equity\n\nMeasures financial leverage. Higher ratio = more debt = more financial risk.',
    type: 'formula',
    difficulty: 'easy'
  },
  {
    id: 'fc010',
    topicId: 'leverage-ratios',
    formulaId: 'ch3-equity-multiplier',
    front: 'What is the Equity Multiplier and how does it relate to D/E?',
    back: 'Equity Multiplier = Total Assets / Total Equity = 1 + D/E\n\nUsed in DuPont Identity. Measures financial leverage.',
    type: 'formula',
    difficulty: 'medium'
  },
  {
    id: 'fc011',
    topicId: 'efficiency-ratios',
    formulaId: 'ch3-tat',
    front: 'What does Total Asset Turnover measure?',
    back: 'TAT = Sales / Total Assets\n\nMeasures asset use efficiency. How much sales per dollar of assets. TAT < 1 is common for capital-intensive firms.',
    type: 'formula',
    difficulty: 'easy'
  },
  {
    id: 'fc012',
    topicId: 'profitability-ratios',
    formulaId: 'ch3-profit-margin',
    front: 'What is Profit Margin?',
    back: 'Profit Margin = Net Income / Sales\n\nMeasures operating efficiency. How much profit per dollar of sales.',
    type: 'formula',
    difficulty: 'easy'
  },
  {
    id: 'fc013',
    topicId: 'profitability-ratios',
    formulaId: 'ch3-roe',
    front: 'What is Return on Equity (ROE)?',
    back: 'ROE = Net Income / Total Equity\n\nTHE key performance metric for shareholders. Measures return to equity holders.',
    type: 'formula',
    difficulty: 'easy'
  },
  {
    id: 'fc014',
    topicId: 'dupont-analysis',
    formulaId: 'ch3-dupont-3',
    front: 'What is the 3-part DuPont Identity?',
    back: 'ROE = Profit Margin × Total Asset Turnover × Equity Multiplier\n\nBreaks ROE into:\n1. Operating Efficiency (PM)\n2. Asset Use Efficiency (TAT)\n3. Financial Leverage (EM)',
    type: 'formula',
    difficulty: 'hard'
  },
  {
    id: 'fc015',
    topicId: 'growth-analysis',
    formulaId: 'ch3-sustainable-growth',
    front: 'What is the Sustainable Growth Rate (SGR)?',
    back: 'SGR = (ROE × b) / (1 − ROE × b)\n\nwhere b = retention ratio\n\nMaximum growth rate while maintaining constant debt-equity ratio.',
    type: 'formula',
    difficulty: 'hard'
  },

  // Chapter 4: Time Value of Money
  {
    id: 'fc016',
    topicId: 'time-value-basics',
    front: 'Why is a dollar today worth more than a dollar tomorrow?',
    back: '3 reasons:\n1. Can be invested to earn interest\n2. Can be consumed immediately\n3. No uncertainty about receiving it',
    type: 'concept',
    difficulty: 'easy'
  },
  {
    id: 'fc017',
    topicId: 'time-value-basics',
    formulaId: 'ch4-fv-multi',
    front: 'What is the Future Value formula?',
    back: 'FV = PV × (1 + r)^t\n\nWhere:\nPV = Present Value\nr = interest rate per period\nt = number of periods',
    type: 'formula',
    difficulty: 'easy'
  },
  {
    id: 'fc018',
    topicId: 'time-value-basics',
    formulaId: 'ch4-pv-multi',
    front: 'What is the Present Value formula?',
    back: 'PV = FV / (1 + r)^t\n\nDiscounts future cash flows back to today\'s value.',
    type: 'formula',
    difficulty: 'easy'
  },
  {
    id: 'fc019',
    topicId: 'npv-decision-rule',
    formulaId: 'ch4-npv',
    front: 'What is NPV and when do you accept a project?',
    back: 'NPV = Present Value of Future Cash Flows − Initial Cost\n\nDecision Rule:\n• NPV > 0: ACCEPT\n• NPV < 0: REJECT\n• NPV = 0: Indifferent',
    type: 'concept',
    difficulty: 'medium'
  },
  {
    id: 'fc020',
    topicId: 'compounding-periods',
    formulaId: 'ch4-ear',
    front: 'How do you convert APR to EAR?',
    back: 'EAR = (1 + APR/m)^m − 1\n\nwhere m = compounding periods per year\n\nEAR accounts for compounding; APR does not.',
    type: 'formula',
    difficulty: 'medium'
  },
  {
    id: 'fc021',
    topicId: 'perpetuities-annuities',
    formulaId: 'ch4-perpetuity',
    front: 'What is a Perpetuity and its formula?',
    back: 'Perpetuity = constant cash flow forever\n\nPV = C / r\n\nExample: British consols, preferred stock',
    type: 'formula',
    difficulty: 'easy'
  },
  {
    id: 'fc022',
    topicId: 'perpetuities-annuities',
    formulaId: 'ch4-growing-perpetuity',
    front: 'What is a Growing Perpetuity?',
    back: 'PV = C / (r − g)\n\nWhere:\nC = next cash flow\ng = constant growth rate (g < r)\nr = discount rate',
    type: 'formula',
    difficulty: 'medium'
  },
  {
    id: 'fc023',
    topicId: 'perpetuities-annuities',
    formulaId: 'ch4-annuity',
    front: 'What is an Annuity?',
    back: 'Constant cash flows for a FIXED number of periods.\n\nPV = C × [(1 − 1/(1+r)^t) / r]\n\nExamples: car loans, mortgages',
    type: 'formula',
    difficulty: 'medium'
  },
  {
    id: 'fc024',
    topicId: 'loan-amortization',
    front: 'What are the 3 types of loans?',
    back: '1. Pure Discount: Single payment at maturity (T-bills)\n2. Interest-Only: Interest each period, principal at maturity (corporate bonds)\n3. Amortized: Principal + interest each period (mortgages)',
    type: 'concept',
    difficulty: 'medium'
  },

  // Chapter 5: Bonds
  {
    id: 'fc025',
    topicId: 'bond-basics',
    front: 'What are the key features of a bond?',
    back: '• Par (Face) Value: Usually $1,000\n• Coupon Rate: Annual interest rate\n• Coupon Payment: Dollar interest\n• Maturity Date: When principal is repaid\n• YTM: Market interest rate',
    type: 'definition',
    difficulty: 'easy'
  },
  {
    id: 'fc026',
    topicId: 'bond-valuation',
    formulaId: 'ch5-bond-price',
    front: 'How do you value a bond?',
    back: 'Bond Price = PV of Coupons + PV of Face Value\n\nPV of annuity (coupons) + PV of lump sum (face value)',
    type: 'formula',
    difficulty: 'medium'
  },
  {
    id: 'fc027',
    topicId: 'bond-valuation',
    front: 'When does a bond trade at premium, par, or discount?',
    back: '• Coupon > YTM → Premium (price > $1,000)\n• Coupon = YTM → Par (price = $1,000)\n• Coupon < YTM → Discount (price < $1,000)',
    type: 'concept',
    difficulty: 'medium'
  },
  {
    id: 'fc028',
    topicId: 'bond-valuation',
    front: 'What is the relationship between bond prices and interest rates?',
    back: 'INVERSE RELATIONSHIP\n\nInterest rates ↑ → Bond prices ↓\nInterest rates ↓ → Bond prices ↑',
    type: 'concept',
    difficulty: 'easy'
  },
  {
    id: 'fc029',
    topicId: 'bond-valuation',
    front: 'Which bonds have more price risk?',
    back: 'Price risk INCREASES with:\n• Longer maturity\n• Lower coupon rate\n\nLong-maturity, low-coupon bonds are most volatile!',
    type: 'concept',
    difficulty: 'medium'
  },
  {
    id: 'fc030',
    topicId: 'bond-yields',
    formulaId: 'ch5-ytm-relation',
    front: 'How is YTM related to Current Yield?',
    back: 'YTM = Current Yield + Capital Gains Yield\n\nCurrent Yield = Annual Coupon / Price\nCapital Gains Yield = Price change',
    type: 'formula',
    difficulty: 'medium'
  },
  {
    id: 'fc031',
    topicId: 'interest-rates-inflation',
    formulaId: 'ch5-fisher',
    front: 'What is the Fisher Effect?',
    back: '(1 + R) = (1 + r)(1 + h)\n\nR = nominal rate\nr = real rate\nh = inflation rate\n\nApproximation: R ≈ r + h',
    type: 'formula',
    difficulty: 'medium'
  },
  {
    id: 'fc032',
    topicId: 'interest-rates-inflation',
    front: 'What is the Term Structure of Interest Rates?',
    back: 'Relationship between time to maturity and yields (all else equal).\n\nYield Curve:\n• Normal: upward-sloping\n• Inverted: downward-sloping',
    type: 'concept',
    difficulty: 'medium'
  },

  // Chapter 6: Stocks
  {
    id: 'fc033',
    topicId: 'dividend-discount-model',
    formulaId: 'ch6-zero-growth',
    front: 'How do you value a Zero Growth Stock?',
    back: 'P₀ = Div / R\n\nJust like a perpetuity! Constant dividend forever.\n\nExample: Preferred stock',
    type: 'formula',
    difficulty: 'easy'
  },
  {
    id: 'fc034',
    topicId: 'dividend-discount-model',
    formulaId: 'ch6-constant-growth',
    front: 'What is the Gordon Growth Model?',
    back: 'P₀ = D₁ / (R − g)\n\nWhere:\nD₁ = next dividend\nR = required return\ng = constant growth rate (g < R)\n\nMost important stock valuation model!',
    type: 'formula',
    difficulty: 'medium'
  },
  {
    id: 'fc035',
    topicId: 'dividend-discount-model',
    front: 'Critical point about dividends in Gordon Model:',
    back: 'ALWAYS use D₁ (NEXT dividend), not D₀!\n\nIf given D₀, calculate:\nD₁ = D₀ × (1 + g)',
    type: 'concept',
    difficulty: 'medium'
  },
  {
    id: 'fc036',
    topicId: 'dividend-discount-model',
    formulaId: 'ch6-required-return',
    front: 'How do you find Required Return from stock price?',
    back: 'R = (D₁ / P₀) + g\n\nRequired Return = Dividend Yield + Growth Rate\n\nRearranged Gordon Growth Model',
    type: 'formula',
    difficulty: 'medium'
  },
  {
    id: 'fc037',
    topicId: 'growth-opportunities',
    formulaId: 'ch6-growth-roe',
    front: 'How do you calculate growth rate from ROE?',
    back: 'g = Retention Ratio × ROE\n\nRetention Ratio = 1 − Payout Ratio\n= (NI − Dividends) / NI',
    type: 'formula',
    difficulty: 'medium'
  },
  {
    id: 'fc038',
    topicId: 'growth-opportunities',
    front: 'What factors increase P/E ratio?',
    back: 'P/E ratio INCREASES with:\n• Higher growth rate (g)\n• Lower risk (lower R)\n\nP/E is positively related to growth, negatively related to risk.',
    type: 'concept',
    difficulty: 'medium'
  },
  {
    id: 'fc039',
    topicId: 'stock-valuation-comparables',
    formulaId: 'ch6-enterprise-value',
    front: 'What is Enterprise Value?',
    back: 'EV = Market Cap + Debt − Cash\n\nTotal value of the firm to ALL investors (debt + equity).',
    type: 'formula',
    difficulty: 'easy'
  },
  {
    id: 'fc040',
    topicId: 'stock-valuation-comparables',
    front: 'What is the difference between Common and Preferred Stock?',
    back: 'Common:\n• Voting rights\n• Residual claim\n• Variable dividends\n\nPreferred:\n• No voting rights\n• Fixed dividends\n• Priority over common\n• Cumulative dividends',
    type: 'concept',
    difficulty: 'easy'
  }
];

// Helper functions
export function getFlashcardsByTopic(topicId: string): Flashcard[] {
  return flashcards.filter(fc => fc.topicId === topicId);
}

export function getFlashcardsByType(type: 'formula' | 'concept' | 'definition' | 'calculation'): Flashcard[] {
  return flashcards.filter(fc => fc.type === type);
}

export function getFlashcardsByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): Flashcard[] {
  return flashcards.filter(fc => fc.difficulty === difficulty);
}

export function shuffleFlashcards(cards: Flashcard[]): Flashcard[] {
  const shuffled = [...cards];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
