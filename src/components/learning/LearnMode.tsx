import { useState } from 'react';
import { ArrowRight, CheckCircle, Lightbulb } from 'lucide-react';
import { Topic } from '../../types/content';
import { useProgressStore } from '../../store/progressStore';

interface LearnModeProps {
  topic: Topic;
  onComplete: () => void;
}

export default function LearnMode({ topic, onComplete }: LearnModeProps) {
  const { markLearnComplete } = useProgressStore();
  const [currentSection, setCurrentSection] = useState<'explanation' | 'formula' | 'analogy' | 'example'>('explanation');

  const handleComplete = () => {
    markLearnComplete(topic.id);
    onComplete();
  };

  const sections = [
    { id: 'explanation', label: 'Explanation', icon: Lightbulb },
    ...(topic.learnContent.formula ? [{ id: 'formula' as const, label: 'Formula', icon: CheckCircle }] : []),
    { id: 'analogy', label: 'Analogy', icon: Lightbulb },
    { id: 'example', label: 'Example', icon: CheckCircle },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
              topic.chapter === 2 ? 'bg-blue-500' :
              topic.chapter === 3 ? 'bg-green-500' :
              topic.chapter === 4 ? 'bg-purple-500' :
              topic.chapter === 5 ? 'bg-orange-500' :
              'bg-pink-500'
            }`}>
              Chapter {topic.chapter}
            </div>
            <div className="px-3 py-1 rounded-full text-xs font-semibold text-white bg-slate-700">
              {topic.difficulty}
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            {topic.name}
          </h1>
          <p className="text-slate-400">
            Learn the fundamentals before practicing
          </p>
        </div>

        {/* Section Navigation */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setCurrentSection(section.id)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
                currentSection === section.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 mb-8">
          {/* Explanation Section */}
          {currentSection === 'explanation' && (
            <div className="prose prose-invert max-w-none">
              <div className="flex items-start gap-3 mb-4">
                <Lightbulb className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4">Explanation</h2>
                  <p className="text-slate-300 text-lg leading-relaxed whitespace-pre-wrap">
                    {topic.learnContent.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Formula Section */}
          {currentSection === 'formula' && topic.learnContent.formula && (
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">Formula</h2>
              <div className="bg-slate-900/50 rounded-lg p-6 mb-6">
                <div className="text-center mb-4">
                  <p className="text-3xl font-mono text-blue-400">
                    {topic.learnContent.formula.formula}
                  </p>
                </div>
                <div className="border-t border-slate-700 pt-4">
                  <h3 className="text-sm font-semibold text-slate-400 uppercase mb-3">
                    Variables
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {topic.learnContent.formula.variables.map((v, idx) => (
                      <div key={idx} className="flex gap-3 items-start">
                        <span className="font-mono text-blue-400 font-semibold">
                          {v.symbol}
                        </span>
                        <span className="text-slate-300">=</span>
                        <span className="text-slate-300">{v.meaning}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Calculator Sequence */}
              {topic.learnContent.formula.calculatorSequence.length > 0 && (
                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-300 mb-4">
                    TI BA II Plus Calculator Steps
                  </h3>
                  <div className="space-y-2">
                    {topic.learnContent.formula.calculatorSequence.map((step, idx) => (
                      <div key={idx} className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 font-semibold text-sm">
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-slate-300 mb-1">{step.action}</p>
                          <div className="flex gap-2 items-center">
                            <code className="px-2 py-1 bg-slate-900 rounded text-blue-400 text-sm font-mono">
                              {step.button}
                            </code>
                            {step.display && (
                              <>
                                <ArrowRight className="w-4 h-4 text-slate-500" />
                                <span className="text-slate-400 text-sm">
                                  Display: {step.display}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Analogy Section */}
          {currentSection === 'analogy' && (
            <div>
              <div className="flex items-start gap-3">
                <Lightbulb className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4">Real-World Analogy</h2>
                  <p className="text-slate-300 text-lg leading-relaxed whitespace-pre-wrap">
                    {topic.learnContent.analogy}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Example Section */}
          {currentSection === 'example' && (
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">Worked Example</h2>

              {/* Problem */}
              <div className="bg-slate-900/50 rounded-lg p-6 mb-4">
                <h3 className="text-sm font-semibold text-slate-400 uppercase mb-2">
                  Problem
                </h3>
                <p className="text-slate-200 text-lg">
                  {topic.learnContent.workedExample.problem}
                </p>
              </div>

              {/* Solution Steps */}
              <div className="bg-slate-900/50 rounded-lg p-6 mb-4">
                <h3 className="text-sm font-semibold text-slate-400 uppercase mb-3">
                  Solution Steps
                </h3>
                <div className="space-y-3">
                  {topic.learnContent.workedExample.steps.map((step, idx) => (
                    <div key={idx} className="flex gap-3 items-start">
                      <div className="w-7 h-7 rounded-full bg-green-600 text-white flex items-center justify-center flex-shrink-0 font-semibold text-sm">
                        {idx + 1}
                      </div>
                      <p className="text-slate-300 pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Answer */}
              <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6">
                <h3 className="text-sm font-semibold text-green-400 uppercase mb-2">
                  Answer
                </h3>
                <p className="text-2xl font-bold text-green-300">
                  {topic.learnContent.workedExample.answer}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Complete Button */}
        <div className="flex justify-end">
          <button
            onClick={handleComplete}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold rounded-xl transition-all hover:scale-105 flex items-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            Mark as Complete
          </button>
        </div>
      </div>
    </div>
  );
}
