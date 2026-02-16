import type { ButtonPosition } from '../../types/calculator';

interface CalculatorVisualProps {
  highlightedButton?: string;
  displayText?: string;
}

// TI BA II Plus button layout
const buttons: ButtonPosition[] = [
  // Row 1
  { row: 1, col: 1, label: '2nd', secondaryLabel: '', color: 'secondary' },
  { row: 1, col: 2, label: 'CLR TVM', secondaryLabel: 'FV', color: 'default' },
  { row: 1, col: 3, label: 'CLR WORK', secondaryLabel: 'PV', color: 'default' },
  { row: 1, col: 4, label: 'RECALL', secondaryLabel: 'PMT', color: 'default' },
  { row: 1, col: 5, label: 'STO', secondaryLabel: 'CPT', color: 'default' },

  // Row 2
  { row: 2, col: 1, label: 'N', color: 'primary' },
  { row: 2, col: 2, label: 'I/Y', color: 'primary' },
  { row: 2, col: 3, label: 'PV', color: 'primary' },
  { row: 2, col: 4, label: 'PMT', color: 'primary' },
  { row: 2, col: 5, label: 'FV', color: 'primary' },

  // Row 3
  { row: 3, col: 1, label: 'P/Y', secondaryLabel: 'BGN', color: 'default' },
  { row: 3, col: 2, label: 'C/Y', secondaryLabel: 'SET', color: 'default' },
  { row: 3, col: 3, label: 'ICONV', secondaryLabel: 'AMRT', color: 'default' },
  { row: 3, col: 4, label: 'DATA', secondaryLabel: 'PROFIT', color: 'default' },
  { row: 3, col: 5, label: 'BOND', secondaryLabel: 'DEP', color: 'default' },

  // Row 4
  { row: 4, col: 1, label: 'CF', color: 'special' },
  { row: 4, col: 2, label: 'NPV', color: 'special' },
  { row: 4, col: 3, label: 'IRR', color: 'special' },
  { row: 4, col: 4, label: 'FORMAT', secondaryLabel: 'MEM', color: 'default' },
  { row: 4, col: 5, label: 'DATE', secondaryLabel: 'QUIT', color: 'default' },

  // Row 5 - Numbers
  { row: 5, col: 1, label: '7', secondaryLabel: 'x√y', color: 'default' },
  { row: 5, col: 2, label: '8', secondaryLabel: '1/x', color: 'default' },
  { row: 5, col: 3, label: '9', secondaryLabel: '%', color: 'default' },
  { row: 5, col: 4, label: '÷', color: 'default' },
  { row: 5, col: 5, label: '↑', color: 'default' },

  // Row 6
  { row: 6, col: 1, label: '4', secondaryLabel: 'yx', color: 'default' },
  { row: 6, col: 2, label: '5', secondaryLabel: 'LN', color: 'default' },
  { row: 6, col: 3, label: '6', secondaryLabel: 'e^x', color: 'default' },
  { row: 6, col: 4, label: '×', color: 'default' },
  { row: 6, col: 5, label: '↓', color: 'default' },

  // Row 7
  { row: 7, col: 1, label: '1', secondaryLabel: 'x²', color: 'default' },
  { row: 7, col: 2, label: '2', secondaryLabel: '√x', color: 'default' },
  { row: 7, col: 3, label: '3', secondaryLabel: 'STO', color: 'default' },
  { row: 7, col: 4, label: '-', color: 'default' },
  { row: 7, col: 5, label: 'CPT', color: 'primary' },

  // Row 8
  { row: 8, col: 1, label: '0', secondaryLabel: 'RCL', color: 'default' },
  { row: 8, col: 2, label: '.', secondaryLabel: '', color: 'default' },
  { row: 8, col: 3, label: '+/-', secondaryLabel: '', color: 'default' },
  { row: 8, col: 4, label: '+', color: 'default' },
  { row: 8, col: 5, label: '=', color: 'primary' },
];

export default function CalculatorVisual({ highlightedButton, displayText }: CalculatorVisualProps) {
  const getButtonColor = (button: ButtonPosition, isHighlighted: boolean) => {
    if (isHighlighted) {
      return 'bg-yellow-400 border-yellow-500 shadow-lg shadow-yellow-500/50 scale-110';
    }

    switch (button.color) {
      case 'primary':
        return 'bg-accent-blue text-white border-accent-blue-light';
      case 'secondary':
        return 'bg-purple-600 text-white border-purple-500';
      case 'special':
        return 'bg-accent-green text-white border-accent-green-light';
      default:
        return 'bg-bg-tertiary text-text-primary border-gray-600';
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Calculator Body */}
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-6 shadow-2xl">
        {/* Display */}
        <div className="bg-gray-700 rounded-lg p-4 mb-6 border-2 border-gray-600">
          <div className="text-right text-2xl font-mono text-green-400 h-10 flex items-center justify-end">
            {displayText || '0.'}
          </div>
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-5 gap-2">
          {buttons.map((button, idx) => {
            const isHighlighted = highlightedButton?.toLowerCase().includes(button.label.toLowerCase()) ?? false;

            return (
              <button
                key={idx}
                className={`
                  relative h-12 rounded-md border-2
                  font-semibold text-sm
                  transition-all duration-300
                  ${getButtonColor(button, isHighlighted)}
                  hover:brightness-110
                  active:scale-95
                `}
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <span className="text-xs leading-none">{button.label}</span>
                  {button.secondaryLabel && (
                    <span className="text-[8px] text-gray-400 leading-none mt-0.5">
                      {button.secondaryLabel}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Brand */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-400 font-semibold">TEXAS INSTRUMENTS</p>
          <p className="text-sm text-gray-300 font-bold">BA II PLUS</p>
        </div>
      </div>
    </div>
  );
}
