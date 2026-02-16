import type { Topic } from '../types/content';

export const mockTopics: Topic[] = [
  {
    id: 'balance-sheet-basics',
    name: 'Balance Sheet Basics',
    chapter: 2,
    difficulty: 'beginner',
    prerequisites: [],
    learnContent: {
      explanation: `A balance sheet is a financial statement that shows what a company owns (assets) and what it owes (liabilities), plus the owners' stake (equity).

The fundamental equation is: Assets = Liabilities + Equity

This equation must always balance. If a company has $100,000 in assets and $30,000 in liabilities, then equity must be $70,000.`,
      analogy: `Think of a balance sheet like a personal finance snapshot. On one side, you list everything you own: your house, car, savings account (assets). On the other side, you list what you owe: mortgage, car loan, credit card debt (liabilities). What's left over is your net worth (equity).

Just like your personal net worth can increase or decrease, a company's equity changes based on profitability and financial decisions.`,
      workedExample: {
        problem: 'ABC Company has total assets of $500,000 and total liabilities of $180,000. What is the total equity?',
        solution: 'Using the accounting equation: Assets = Liabilities + Equity',
        steps: [
          'Start with the accounting equation: Assets = Liabilities + Equity',
          'Rearrange to solve for equity: Equity = Assets - Liabilities',
          'Substitute the values: Equity = $500,000 - $180,000',
          'Calculate: Equity = $320,000',
        ],
        answer: '$320,000',
      },
    },
    practiceProblems: [
      {
        id: 'bs-p1',
        question: 'If a company has assets of $250,000 and equity of $150,000, what are its liabilities?',
        type: 'calculation',
        difficulty: 'easy',
        hint: 'Use the equation: Assets = Liabilities + Equity. Rearrange to solve for liabilities.',
        solution: 'Assets = Liabilities + Equity\nLiabilities = Assets - Equity\nLiabilities = $250,000 - $150,000 = $100,000',
        correctAnswer: 100000,
      },
      {
        id: 'bs-p2',
        question: 'Which of the following is NOT an asset?',
        type: 'multiple-choice',
        difficulty: 'easy',
        options: ['Cash', 'Accounts Receivable', 'Accounts Payable', 'Inventory'],
        solution: 'Accounts Payable is a liability (money owed to suppliers), not an asset. Assets are things the company owns.',
        correctAnswer: 'Accounts Payable',
      },
    ],
    masterQuestions: [
      {
        id: 'bs-m1',
        type: 'calculation',
        question: 'A company has current assets of $80,000, fixed assets of $220,000, current liabilities of $50,000, and long-term debt of $120,000. What is the total equity?',
        correctAnswer: 130000,
        explanation: 'Total Assets = $80,000 + $220,000 = $300,000. Total Liabilities = $50,000 + $120,000 = $170,000. Equity = $300,000 - $170,000 = $130,000',
      },
      {
        id: 'bs-m2',
        type: 'multiple-choice',
        question: 'If total assets increase by $50,000 and liabilities increase by $30,000, by how much does equity change?',
        options: ['$20,000 increase', '$30,000 increase', '$50,000 increase', '$80,000 increase'],
        correctAnswer: '$20,000 increase',
        explanation: 'Change in Equity = Change in Assets - Change in Liabilities = $50,000 - $30,000 = $20,000 increase',
      },
    ],
  },
  {
    id: 'income-statement-basics',
    name: 'Income Statement Basics',
    chapter: 2,
    difficulty: 'beginner',
    prerequisites: [],
    learnContent: {
      explanation: `The income statement (also called Profit & Loss statement) shows a company's financial performance over a period of time.

It follows this structure:
- Revenue (sales)
- Less: Cost of Goods Sold (COGS)
- Equals: Gross Profit
- Less: Operating Expenses
- Equals: Operating Income (EBIT)
- Less: Interest and Taxes
- Equals: Net Income

Net Income is the "bottom line" - what the company earned after all expenses.`,
      analogy: `Think of the income statement like tracking your monthly finances. You start with your paycheck (revenue), subtract what you spent on groceries and bills (expenses), and what's left is your savings for the month (net income).

If you earned $5,000 but spent $4,200, your "net income" is $800. Companies do the same calculation, just on a larger scale.`,
      workedExample: {
        problem: 'XYZ Corp has revenue of $1,000,000, COGS of $400,000, operating expenses of $300,000, interest expense of $50,000, and a tax rate of 25%. What is the net income?',
        solution: 'Calculate step-by-step through the income statement',
        steps: [
          'Gross Profit = Revenue - COGS = $1,000,000 - $400,000 = $600,000',
          'Operating Income (EBIT) = Gross Profit - Operating Expenses = $600,000 - $300,000 = $300,000',
          'EBT = EBIT - Interest = $300,000 - $50,000 = $250,000',
          'Taxes = EBT × Tax Rate = $250,000 × 0.25 = $62,500',
          'Net Income = EBT - Taxes = $250,000 - $62,500 = $187,500',
        ],
        answer: '$187,500',
      },
    },
    practiceProblems: [
      {
        id: 'is-p1',
        question: 'If revenue is $500,000 and COGS is $300,000, what is gross profit?',
        type: 'calculation',
        difficulty: 'easy',
        hint: 'Gross Profit = Revenue - Cost of Goods Sold',
        solution: 'Gross Profit = $500,000 - $300,000 = $200,000',
        correctAnswer: 200000,
      },
      {
        id: 'is-p2',
        question: 'Which expense is deducted LAST when calculating net income?',
        type: 'multiple-choice',
        difficulty: 'medium',
        options: ['Cost of Goods Sold', 'Operating Expenses', 'Interest Expense', 'Taxes'],
        solution: 'Taxes are the last expense deducted. The order is: Revenue - COGS - Operating Expenses - Interest - Taxes = Net Income',
        correctAnswer: 'Taxes',
      },
    ],
    masterQuestions: [
      {
        id: 'is-m1',
        type: 'calculation',
        question: 'A company has revenue of $800,000, COGS of $320,000, operating expenses of $240,000, interest of $40,000, and tax rate of 30%. What is net income?',
        correctAnswer: 140000,
        explanation: 'Gross Profit = $480,000. EBIT = $240,000. EBT = $200,000. Taxes = $60,000. Net Income = $140,000',
      },
      {
        id: 'is-m2',
        type: 'multiple-choice',
        question: 'EBIT is also known as:',
        options: ['Gross Profit', 'Operating Income', 'Net Income', 'Revenue'],
        correctAnswer: 'Operating Income',
        explanation: 'EBIT (Earnings Before Interest and Taxes) is the same as Operating Income',
      },
    ],
  },
  {
    id: 'net-working-capital',
    name: 'Net Working Capital',
    chapter: 2,
    difficulty: 'intermediate',
    prerequisites: ['balance-sheet-basics'],
    learnContent: {
      explanation: `Net Working Capital (NWC) measures a company's short-term financial health and operational efficiency.

Formula: NWC = Current Assets - Current Liabilities

- Current Assets: Cash, accounts receivable, inventory (converted to cash within 1 year)
- Current Liabilities: Accounts payable, short-term debt (due within 1 year)

Positive NWC means the company can pay its short-term obligations. Negative NWC may indicate liquidity problems.`,
      formula: {
        id: 'nwc-formula',
        name: 'Net Working Capital',
        formula: 'NWC = Current Assets - Current Liabilities',
        variables: [
          { symbol: 'NWC', meaning: 'Net Working Capital' },
          { symbol: 'Current Assets', meaning: 'Assets convertible to cash within 1 year' },
          { symbol: 'Current Liabilities', meaning: 'Obligations due within 1 year' },
        ],
        example: {
          problem: 'Calculate NWC with current assets of $150,000 and current liabilities of $90,000',
          solution: 'NWC = $150,000 - $90,000 = $60,000',
          steps: ['Identify current assets: $150,000', 'Identify current liabilities: $90,000', 'Subtract: $150,000 - $90,000 = $60,000'],
          answer: '$60,000',
        },
        calculatorSequence: [],
        chapter: 2,
      },
      analogy: `Think of NWC like the cash cushion in your checking account. If you have $2,000 in your account and bills totaling $1,200 due this month, your "working capital" is $800.

This $800 cushion gives you flexibility to handle unexpected expenses. Similarly, companies need positive NWC to operate smoothly without running out of cash.`,
      workedExample: {
        problem: 'A company has cash of $30,000, accounts receivable of $50,000, inventory of $70,000, accounts payable of $40,000, and short-term notes payable of $25,000. Calculate NWC.',
        solution: 'Sum current assets and current liabilities separately, then subtract.',
        steps: [
          'Current Assets = Cash + A/R + Inventory = $30,000 + $50,000 + $70,000 = $150,000',
          'Current Liabilities = A/P + Notes Payable = $40,000 + $25,000 = $65,000',
          'NWC = Current Assets - Current Liabilities = $150,000 - $65,000',
          'NWC = $85,000',
        ],
        answer: '$85,000',
      },
    },
    practiceProblems: [
      {
        id: 'nwc-p1',
        question: 'Current assets are $200,000 and current liabilities are $120,000. What is NWC?',
        type: 'calculation',
        difficulty: 'easy',
        hint: 'NWC = Current Assets - Current Liabilities',
        solution: 'NWC = $200,000 - $120,000 = $80,000',
        correctAnswer: 80000,
      },
      {
        id: 'nwc-p2',
        question: 'If NWC increases from $50,000 to $75,000, what does this indicate?',
        type: 'multiple-choice',
        difficulty: 'medium',
        options: [
          'Improved short-term liquidity',
          'Decreased profitability',
          'Increased long-term debt',
          'Lower revenue',
        ],
        solution: 'An increase in NWC means the company has more current assets relative to current liabilities, improving its ability to meet short-term obligations.',
        correctAnswer: 'Improved short-term liquidity',
      },
    ],
    masterQuestions: [
      {
        id: 'nwc-m1',
        type: 'calculation',
        question: 'At year-end, current assets are $180,000 and current liabilities are $95,000. If current assets were $160,000 and current liabilities were $90,000 at the beginning of the year, what is the change in NWC?',
        correctAnswer: 15000,
        explanation: 'NWC(end) = $180,000 - $95,000 = $85,000. NWC(start) = $160,000 - $90,000 = $70,000. Change = $85,000 - $70,000 = $15,000',
      },
      {
        id: 'nwc-m2',
        type: 'multiple-choice',
        question: 'Which of the following would DECREASE net working capital?',
        options: [
          'Collecting accounts receivable',
          'Purchasing inventory with cash',
          'Paying off accounts payable with cash',
          'Selling inventory for cash',
        ],
        correctAnswer: 'Paying off accounts payable with cash',
        explanation: 'Paying A/P with cash decreases both current assets (cash) and current liabilities (A/P), but the net effect is a decrease in NWC',
      },
    ],
  },
];
