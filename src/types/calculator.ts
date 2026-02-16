export interface CalculatorStep {
  action: string;
  button: string;
  display: string;
  explanation?: string;
}

export interface CalculatorSequence {
  id: string;
  name: string;
  category: 'time-value' | 'bonds' | 'stocks' | 'ratios' | 'cash-flow';
  description: string;
  example: {
    problem: string;
    given: Record<string, string | number>;
    find: string;
    answer: string | number;
  };
  steps: CalculatorStep[];
  commonMistakes: string[];
}

export interface ButtonPosition {
  row: number;
  col: number;
  label: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  color?: 'default' | 'primary' | 'secondary' | 'special';
}
