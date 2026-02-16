import type { Topic } from '../types';

// 23 Topics ordered by prerequisites for optimal learning path

export const topics: Topic[] = [
  // Chapter 2: Financial Statements and Cash Flow
  {
    id: 'financial-statements-basics',
    name: 'Financial Statements Basics',
    chapter: 2,
    description: 'Understanding balance sheets, income statements, and basic accounting principles',
    prerequisites: [],
    formulas: ['ch2-income', 'ch2-nwc'],
    learningObjectives: [
      'Understand the information provided by financial statements',
      'Differentiate between book and market values',
      'Know the balance sheet identity',
      'Understand the income statement structure'
    ],
    difficulty: 'basic',
    estimatedTime: 45
  },
  {
    id: 'cash-flow-analysis',
    name: 'Cash Flow Analysis',
    chapter: 2,
    description: 'Calculating and interpreting operating cash flow and free cash flow',
    prerequisites: ['financial-statements-basics'],
    formulas: ['ch2-ocf', 'ch2-cf-firm'],
    learningObjectives: [
      'Grasp the difference between accounting income and cash flow',
      'Calculate operating cash flow',
      'Understand cash flow to creditors and stockholders',
      'Apply the fundamental cash flow identity'
    ],
    difficulty: 'intermediate',
    estimatedTime: 60
  },
  {
    id: 'taxes-and-marginal-rates',
    name: 'Taxes and Marginal Rates',
    chapter: 2,
    description: 'Tax calculations and the difference between average and marginal tax rates',
    prerequisites: ['financial-statements-basics'],
    formulas: [],
    learningObjectives: [
      'Know the difference between average and marginal tax rates',
      'Calculate tax liability using marginal rates',
      'Understand why marginal rates matter for decisions'
    ],
    difficulty: 'basic',
    estimatedTime: 30
  },

  // Chapter 3: Financial Statement Analysis
  {
    id: 'liquidity-ratios',
    name: 'Liquidity Ratios',
    chapter: 3,
    description: 'Short-term solvency ratios: current ratio, quick ratio, cash ratio',
    prerequisites: ['financial-statements-basics'],
    formulas: ['ch3-current-ratio', 'ch3-quick-ratio'],
    learningObjectives: [
      'Calculate and interpret liquidity ratios',
      'Understand when firms face liquidity problems',
      'Compare liquidity across companies'
    ],
    difficulty: 'basic',
    estimatedTime: 40
  },
  {
    id: 'leverage-ratios',
    name: 'Leverage Ratios',
    chapter: 3,
    description: 'Long-term solvency: debt-equity, equity multiplier, debt ratio',
    prerequisites: ['financial-statements-basics'],
    formulas: ['ch3-debt-equity', 'ch3-equity-multiplier'],
    learningObjectives: [
      'Calculate and interpret leverage ratios',
      'Understand financial risk from debt',
      'Recognize the relationship between leverage ratios'
    ],
    difficulty: 'basic',
    estimatedTime: 40
  },
  {
    id: 'efficiency-ratios',
    name: 'Efficiency Ratios',
    chapter: 3,
    description: 'Asset turnover ratios: inventory, receivables, total asset turnover',
    prerequisites: ['financial-statements-basics'],
    formulas: ['ch3-tat', 'ch3-inventory-turnover', 'ch3-receivables-turnover', 'ch3-days-sales'],
    learningObjectives: [
      'Calculate asset utilization ratios',
      'Interpret turnover and days measures',
      'Understand efficiency in operations'
    ],
    difficulty: 'intermediate',
    estimatedTime: 50
  },
  {
    id: 'profitability-ratios',
    name: 'Profitability Ratios',
    chapter: 3,
    description: 'Profit margin, ROA, ROE, and EBITDA margin',
    prerequisites: ['financial-statements-basics'],
    formulas: ['ch3-profit-margin', 'ch3-roa', 'ch3-roe'],
    learningObjectives: [
      'Calculate profitability measures',
      'Understand the difference between ROA and ROE',
      'Interpret profit margins'
    ],
    difficulty: 'basic',
    estimatedTime: 45
  },
  {
    id: 'dupont-analysis',
    name: 'DuPont Identity',
    chapter: 3,
    description: 'Breaking down ROE into profit margin, asset turnover, and leverage',
    prerequisites: ['profitability-ratios', 'efficiency-ratios', 'leverage-ratios'],
    formulas: ['ch3-dupont-3'],
    learningObjectives: [
      'Understand the DuPont decomposition of ROE',
      'Apply the 3-part DuPont Identity',
      'Analyze what drives ROE performance'
    ],
    difficulty: 'advanced',
    estimatedTime: 60
  },
  {
    id: 'market-value-ratios',
    name: 'Market Value Ratios',
    chapter: 3,
    description: 'P/E ratio, market-to-book, enterprise value',
    prerequisites: ['profitability-ratios'],
    formulas: ['ch3-pe-ratio', 'ch3-market-book'],
    learningObjectives: [
      'Calculate market valuation ratios',
      'Interpret P/E and M/B ratios',
      'Understand enterprise value'
    ],
    difficulty: 'intermediate',
    estimatedTime: 40
  },
  {
    id: 'financial-planning',
    name: 'Financial Planning Models',
    chapter: 3,
    description: 'Percent-of-sales method and external financing needed',
    prerequisites: ['financial-statements-basics', 'profitability-ratios'],
    formulas: ['ch3-efn'],
    learningObjectives: [
      'Apply the percentage of sales approach',
      'Calculate external financing needed',
      'Build pro forma statements'
    ],
    difficulty: 'advanced',
    estimatedTime: 75
  },
  {
    id: 'growth-analysis',
    name: 'Growth and Financing',
    chapter: 3,
    description: 'Internal and sustainable growth rates',
    prerequisites: ['financial-planning', 'profitability-ratios'],
    formulas: ['ch3-internal-growth', 'ch3-sustainable-growth'],
    learningObjectives: [
      'Calculate internal growth rate',
      'Calculate sustainable growth rate',
      'Understand determinants of growth'
    ],
    difficulty: 'advanced',
    estimatedTime: 60
  },

  // Chapter 4: Discounted Cash Flow Valuation
  {
    id: 'time-value-basics',
    name: 'Time Value of Money Basics',
    chapter: 4,
    description: 'Future value, present value, and the fundamental principle',
    prerequisites: [],
    formulas: ['ch4-fv-single', 'ch4-pv-single', 'ch4-fv-multi', 'ch4-pv-multi'],
    learningObjectives: [
      'Understand why a dollar today is worth more than a dollar tomorrow',
      'Calculate future value with compound interest',
      'Calculate present value with discounting',
      'Solve for N or r given other variables'
    ],
    difficulty: 'basic',
    estimatedTime: 60
  },
  {
    id: 'npv-decision-rule',
    name: 'Net Present Value',
    chapter: 4,
    description: 'NPV calculation and investment decision rules',
    prerequisites: ['time-value-basics'],
    formulas: ['ch4-npv'],
    learningObjectives: [
      'Calculate NPV for single and multiple cash flows',
      'Apply the NPV decision rule',
      'Understand why NPV is the gold standard'
    ],
    difficulty: 'intermediate',
    estimatedTime: 45
  },
  {
    id: 'compounding-periods',
    name: 'Compounding and EAR',
    chapter: 4,
    description: 'Multiple compounding periods and effective annual rates',
    prerequisites: ['time-value-basics'],
    formulas: ['ch4-ear'],
    learningObjectives: [
      'Calculate future value with multiple compounding periods',
      'Convert APR to EAR',
      'Understand continuous compounding'
    ],
    difficulty: 'intermediate',
    estimatedTime: 50
  },
  {
    id: 'perpetuities-annuities',
    name: 'Perpetuities and Annuities',
    chapter: 4,
    description: 'Valuing streams of cash flows: perpetuities and annuities',
    prerequisites: ['time-value-basics'],
    formulas: ['ch4-perpetuity', 'ch4-growing-perpetuity', 'ch4-annuity', 'ch4-growing-annuity'],
    learningObjectives: [
      'Value perpetuities and growing perpetuities',
      'Value annuities and growing annuities',
      'Distinguish between ordinary and annuity due'
    ],
    difficulty: 'intermediate',
    estimatedTime: 75
  },
  {
    id: 'loan-amortization',
    name: 'Loan Types and Amortization',
    chapter: 4,
    description: 'Pure discount, interest-only, and amortized loans',
    prerequisites: ['perpetuities-annuities'],
    formulas: ['ch4-annuity'],
    learningObjectives: [
      'Understand different loan types',
      'Calculate loan payments',
      'Build amortization schedules',
      'Distinguish principal from interest payments'
    ],
    difficulty: 'intermediate',
    estimatedTime: 60
  },

  // Chapter 5: Bond Valuation
  {
    id: 'bond-basics',
    name: 'Bond Features and Terminology',
    chapter: 5,
    description: 'Bond characteristics: coupon, maturity, face value, YTM',
    prerequisites: ['time-value-basics'],
    formulas: [],
    learningObjectives: [
      'Understand bond indentures and features',
      'Know important bond terminology',
      'Understand bond ratings and their importance'
    ],
    difficulty: 'basic',
    estimatedTime: 40
  },
  {
    id: 'bond-valuation',
    name: 'Bond Valuation',
    chapter: 5,
    description: 'Pricing bonds using present value of cash flows',
    prerequisites: ['bond-basics', 'perpetuities-annuities'],
    formulas: ['ch5-bond-price', 'ch5-zero-coupon'],
    learningObjectives: [
      'Calculate bond prices',
      'Understand relationship between price and YTM',
      'Value zero-coupon bonds',
      'Recognize premium vs discount bonds'
    ],
    difficulty: 'intermediate',
    estimatedTime: 70
  },
  {
    id: 'bond-yields',
    name: 'Bond Yields and Returns',
    chapter: 5,
    description: 'YTM, current yield, and total returns',
    prerequisites: ['bond-valuation'],
    formulas: ['ch5-current-yield', 'ch5-ytm-relation'],
    learningObjectives: [
      'Calculate yield to maturity',
      'Distinguish current yield from YTM',
      'Understand capital gains yield'
    ],
    difficulty: 'intermediate',
    estimatedTime: 50
  },
  {
    id: 'interest-rates-inflation',
    name: 'Interest Rates and Inflation',
    chapter: 5,
    description: 'Fisher Effect, real vs nominal rates, term structure',
    prerequisites: ['bond-valuation'],
    formulas: ['ch5-fisher'],
    learningObjectives: [
      'Apply the Fisher Effect',
      'Distinguish real from nominal rates',
      'Understand the term structure of interest rates',
      'Interpret yield curves'
    ],
    difficulty: 'intermediate',
    estimatedTime: 55
  },

  // Chapter 6: Stock Valuation
  {
    id: 'dividend-discount-model',
    name: 'Dividend Discount Model',
    chapter: 6,
    description: 'Valuing stocks: zero growth, constant growth, differential growth',
    prerequisites: ['perpetuities-annuities'],
    formulas: ['ch6-zero-growth', 'ch6-constant-growth', 'ch6-required-return'],
    learningObjectives: [
      'Apply the dividend discount model',
      'Value zero growth stocks',
      'Apply the Gordon growth model',
      'Calculate required return from stock price'
    ],
    difficulty: 'intermediate',
    estimatedTime: 70
  },
  {
    id: 'growth-opportunities',
    name: 'Growth and Stock Value',
    chapter: 6,
    description: 'How growth opportunities affect stock value',
    prerequisites: ['dividend-discount-model', 'profitability-ratios'],
    formulas: ['ch6-growth-roe', 'ch6-pe-growth'],
    learningObjectives: [
      'Understand how ROE drives growth',
      'Calculate sustainable growth',
      'Understand P/E ratios and growth',
      'Value stocks with differential growth'
    ],
    difficulty: 'advanced',
    estimatedTime: 65
  },
  {
    id: 'stock-valuation-comparables',
    name: 'Comparables and Market Ratios',
    chapter: 6,
    description: 'Using P/E, EV/EBITDA, and other multiples for valuation',
    prerequisites: ['dividend-discount-model', 'market-value-ratios'],
    formulas: ['ch6-enterprise-value'],
    learningObjectives: [
      'Value stocks using P/E multiples',
      'Calculate enterprise value',
      'Apply EV/EBITDA ratios',
      'Understand preferred stock features'
    ],
    difficulty: 'intermediate',
    estimatedTime: 50
  }
];

// Create a dependency map for quick lookups
export const topicDependencies = new Map<string, string[]>(
  topics.map(t => [t.id, t.prerequisites])
);

// Get all topics that depend on a given topic
export function getTopicsDependingOn(topicId: string): Topic[] {
  return topics.filter(t => t.prerequisites.includes(topicId));
}

// Get optimal learning order (topological sort)
export function getOptimalLearningOrder(): Topic[] {
  const visited = new Set<string>();
  const result: Topic[] = [];

  function visit(topicId: string) {
    if (visited.has(topicId)) return;

    const topic = topics.find(t => t.id === topicId);
    if (!topic) return;

    // Visit prerequisites first
    topic.prerequisites.forEach(prereq => visit(prereq));

    visited.add(topicId);
    result.push(topic);
  }

  // Visit all topics
  topics.forEach(topic => visit(topic.id));

  return result;
}

// Get topics by chapter
export function getTopicsByChapter(chapter: number): Topic[] {
  return topics.filter(t => t.chapter === chapter);
}

// Get topics by difficulty
export function getTopicsByDifficulty(difficulty: 'basic' | 'intermediate' | 'advanced'): Topic[] {
  return topics.filter(t => t.difficulty === difficulty);
}
