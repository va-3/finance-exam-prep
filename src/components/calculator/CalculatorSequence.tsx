import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, SkipForward, SkipBack } from 'lucide-react';
import type { CalculatorSequence as CalculatorSequenceType } from '../../types/calculator';
import CalculatorVisual from './CalculatorVisual';

interface CalculatorSequenceProps {
  sequence: CalculatorSequenceType;
}

export default function CalculatorSequence({ sequence }: CalculatorSequenceProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1500); // ms per step

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setTimeout(() => {
      if (currentStep < sequence.steps.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        setIsPlaying(false);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, sequence.steps.length, speed]);

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);
  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };
  const handleNext = () => {
    if (currentStep < sequence.steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };
  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const step = sequence.steps[currentStep];

  return (
    <div className="space-y-6">
      {/* Example Problem */}
      <div className="card">
        <h3 className="text-xl font-bold mb-3">{sequence.name}</h3>
        <p className="text-text-secondary mb-4">{sequence.description}</p>

        <div className="bg-bg-primary rounded-lg p-4 space-y-2">
          <p className="font-semibold text-accent-blue-light">Example Problem:</p>
          <p className="text-text-primary">{sequence.example.problem}</p>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-sm text-text-tertiary mb-2">Given:</p>
              {Object.entries(sequence.example.given).map(([key, value]) => (
                <div key={key} className="text-sm">
                  <span className="text-accent-blue">{key}:</span> {value}
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm text-text-tertiary mb-2">Find:</p>
              <p className="text-sm text-accent-green">{sequence.example.find}</p>
              <p className="text-xl font-bold text-accent-green-light mt-2">
                {sequence.example.answer}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Calculator Visual */}
      <CalculatorVisual
        highlightedButton={step.button}
        displayText={step.display}
      />

      {/* Current Step Display */}
      <div className="card">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-accent-blue-light">
            Step {currentStep + 1} of {sequence.steps.length}
          </h4>
          <span className="text-sm text-text-tertiary">
            {Math.round((currentStep / (sequence.steps.length - 1)) * 100)}% Complete
          </span>
        </div>

        <div className="progress-bar mb-4">
          <div
            className="progress-fill"
            style={{ width: `${(currentStep / (sequence.steps.length - 1)) * 100}%` }}
          />
        </div>

        <div className="space-y-2">
          <p className="text-lg font-semibold">{step.action}</p>
          <p className="text-text-secondary">
            Press: <span className="font-mono bg-bg-tertiary px-2 py-1 rounded">{step.button}</span>
          </p>
          <p className="text-text-tertiary text-sm">
            Display: <span className="font-mono">{step.display}</span>
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={handlePrev}
          disabled={currentStep === 0}
          className="p-3 bg-bg-secondary rounded-lg hover:bg-bg-tertiary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <SkipBack className="w-5 h-5" />
        </button>

        <button
          onClick={handleReset}
          className="p-3 bg-bg-secondary rounded-lg hover:bg-bg-tertiary transition-all"
        >
          <RotateCcw className="w-5 h-5" />
        </button>

        {!isPlaying ? (
          <button
            onClick={handlePlay}
            disabled={currentStep === sequence.steps.length - 1}
            className="p-4 bg-accent-blue rounded-lg hover:bg-accent-blue-light disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Play className="w-6 h-6" />
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="p-4 bg-accent-red rounded-lg hover:bg-accent-red-light transition-all"
          >
            <Pause className="w-6 h-6" />
          </button>
        )}

        <button
          onClick={handleNext}
          disabled={currentStep === sequence.steps.length - 1}
          className="p-3 bg-bg-secondary rounded-lg hover:bg-bg-tertiary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <SkipForward className="w-5 h-5" />
        </button>

        {/* Speed Control */}
        <select
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="ml-4 px-3 py-2 bg-bg-secondary rounded-lg text-text-primary border border-bg-tertiary hover:border-accent-blue transition-all"
        >
          <option value={3000}>Slow</option>
          <option value={1500}>Normal</option>
          <option value={750}>Fast</option>
        </select>
      </div>

      {/* Common Mistakes */}
      {sequence.commonMistakes.length > 0 && (
        <div className="card bg-accent-red/10 border border-accent-red/30">
          <h4 className="font-semibold text-accent-red mb-3 flex items-center gap-2">
            <span>⚠️</span> Common Mistakes to Avoid
          </h4>
          <ul className="space-y-2">
            {sequence.commonMistakes.map((mistake, idx) => (
              <li key={idx} className="text-text-secondary text-sm flex items-start gap-2">
                <span className="text-accent-red mt-1">•</span>
                <span>{mistake}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
