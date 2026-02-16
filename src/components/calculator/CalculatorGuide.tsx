import { useState } from 'react';
import { Calculator, BookOpen, TrendingUp, DollarSign, PieChart } from 'lucide-react';
import { calculatorSequences } from '../../data/calculator-sequences';
import CalculatorSequence from './CalculatorSequence';

const categoryIcons = {
  'time-value': TrendingUp,
  'bonds': DollarSign,
  'stocks': PieChart,
  'ratios': Calculator,
  'cash-flow': BookOpen,
};

const categoryNames = {
  'time-value': 'Time Value of Money',
  'bonds': 'Bonds',
  'stocks': 'Stocks',
  'ratios': 'Financial Ratios',
  'cash-flow': 'Cash Flow',
};

const categoryColors = {
  'time-value': 'text-accent-blue',
  'bonds': 'text-accent-green',
  'stocks': 'text-purple-400',
  'ratios': 'text-yellow-400',
  'cash-flow': 'text-orange-400',
};

export default function CalculatorGuide() {
  const [selectedSequence, setSelectedSequence] = useState(calculatorSequences[0]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(calculatorSequences.map(s => s.category)));

  const filteredSequences = selectedCategory
    ? calculatorSequences.filter(s => s.category === selectedCategory)
    : calculatorSequences;

  return (
    <div className="min-h-screen bg-bg-primary p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3 flex items-center gap-3">
            <Calculator className="w-10 h-10 text-accent-blue" />
            TI BA II Plus Calculator Guide
          </h1>
          <p className="text-text-secondary text-lg">
            Master your calculator with step-by-step animated sequences for every formula
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedCategory === null
                ? 'bg-accent-blue text-white'
                : 'bg-bg-secondary text-text-secondary hover:bg-bg-tertiary'
            }`}
          >
            All Categories
          </button>
          {categories.map(category => {
            const Icon = categoryIcons[category];
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  selectedCategory === category
                    ? 'bg-accent-blue text-white'
                    : 'bg-bg-secondary text-text-secondary hover:bg-bg-tertiary'
                }`}
              >
                <Icon className="w-4 h-4" />
                {categoryNames[category]}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sequence List */}
          <div className="lg:col-span-1 space-y-3">
            <h2 className="text-xl font-bold mb-4">Select a Sequence</h2>
            {filteredSequences.map((sequence) => {
              const Icon = categoryIcons[sequence.category];
              const isSelected = selectedSequence.id === sequence.id;

              return (
                <button
                  key={sequence.id}
                  onClick={() => setSelectedSequence(sequence)}
                  className={`w-full text-left p-4 rounded-lg transition-all ${
                    isSelected
                      ? 'bg-accent-blue text-white shadow-lg scale-105'
                      : 'bg-bg-secondary hover:bg-bg-tertiary'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Icon className={`w-5 h-5 mt-1 ${isSelected ? 'text-white' : categoryColors[sequence.category]}`} />
                    <div>
                      <h3 className="font-semibold mb-1">{sequence.name}</h3>
                      <p className={`text-sm ${isSelected ? 'text-blue-100' : 'text-text-tertiary'}`}>
                        {sequence.steps.length} steps
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Sequence Player */}
          <div className="lg:col-span-2">
            <CalculatorSequence sequence={selectedSequence} />
          </div>
        </div>

        {/* Setup Instructions */}
        <div className="mt-12 card bg-bg-secondary border-2 border-accent-blue/30">
          <h2 className="text-2xl font-bold mb-4 text-accent-blue">Essential Calculator Setup</h2>
          <p className="text-text-secondary mb-4">
            Before using any calculator sequence, make sure your calculator is set up correctly:
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="bg-accent-blue text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                1
              </span>
              <div>
                <p className="font-semibold">Set Decimal Places</p>
                <p className="text-sm text-text-tertiary">
                  Press: <span className="font-mono bg-bg-tertiary px-2 py-1 rounded">2nd FORMAT</span> → Enter <span className="font-mono bg-bg-tertiary px-2 py-1 rounded">2</span>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="bg-accent-blue text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                2
              </span>
              <div>
                <p className="font-semibold">Set Payments Per Year</p>
                <p className="text-sm text-text-tertiary">
                  Press: <span className="font-mono bg-bg-tertiary px-2 py-1 rounded">2nd P/Y</span> → Enter <span className="font-mono bg-bg-tertiary px-2 py-1 rounded">1</span> → <span className="font-mono bg-bg-tertiary px-2 py-1 rounded">ENTER</span> → Press <span className="font-mono bg-bg-tertiary px-2 py-1 rounded">↓</span> → Enter <span className="font-mono bg-bg-tertiary px-2 py-1 rounded">1</span>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="bg-accent-blue text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                3
              </span>
              <div>
                <p className="font-semibold">Clear TVM Registers (ALWAYS DO THIS FIRST!)</p>
                <p className="text-sm text-text-tertiary">
                  Press: <span className="font-mono bg-bg-tertiary px-2 py-1 rounded">2nd CLR TVM</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
