import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Printer, Search, Calculator, BookOpen } from 'lucide-react';
import type { Formula, Chapter } from '../../types';

interface FormulaSheetProps {
  formulas: Formula[];
  chapters: Chapter[];
}

const chapterColors = {
  2: { bg: 'bg-blue-50', border: 'border-blue-300', text: 'text-blue-900', badge: 'bg-blue-200' },
  3: { bg: 'bg-green-50', border: 'border-green-300', text: 'text-green-900', badge: 'bg-green-200' },
  4: { bg: 'bg-purple-50', border: 'border-purple-300', text: 'text-purple-900', badge: 'bg-purple-200' },
  5: { bg: 'bg-orange-50', border: 'border-orange-300', text: 'text-orange-900', badge: 'bg-orange-200' },
  6: { bg: 'bg-pink-50', border: 'border-pink-300', text: 'text-pink-900', badge: 'bg-pink-200' },
} as const;

export function FormulaSheet({ formulas, chapters }: FormulaSheetProps) {
  const [expandedFormulas, setExpandedFormulas] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChapter, setSelectedChapter] = useState<number | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | 'all'>('all');

  const toggleFormula = (formulaId: string) => {
    setExpandedFormulas((prev) => {
      const next = new Set(prev);
      if (next.has(formulaId)) {
        next.delete(formulaId);
      } else {
        next.add(formulaId);
      }
      return next;
    });
  };

  const expandAll = () => {
    setExpandedFormulas(new Set(formulas.map((f) => f.id)));
  };

  const collapseAll = () => {
    setExpandedFormulas(new Set());
  };

  const handlePrint = () => {
    window.print();
  };

  // Filter formulas
  const filteredFormulas = formulas.filter((formula) => {
    const matchesSearch =
      searchQuery === '' ||
      formula.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      formula.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      formula.formula.toLowerCase().includes(searchQuery.toLowerCase()) ||
      formula.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesChapter = selectedChapter === 'all' || formula.chapter === selectedChapter;
    const matchesDifficulty = selectedDifficulty === 'all' || formula.difficulty === selectedDifficulty;

    return matchesSearch && matchesChapter && matchesDifficulty;
  });

  // Group formulas by chapter
  const formulasByChapter = filteredFormulas.reduce((acc, formula) => {
    if (!acc[formula.chapter]) {
      acc[formula.chapter] = [];
    }
    acc[formula.chapter].push(formula);
    return acc;
  }, {} as Record<number, Formula[]>);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between print:hidden">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Formula Sheet</h1>
          <p className="text-gray-600 mt-1">Quick reference for all finance formulas</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={expandAll}
            className="px-4 py-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold transition-colors flex items-center gap-2"
          >
            <ChevronDown className="w-4 h-4" />
            Expand All
          </button>
          <button
            onClick={collapseAll}
            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition-colors flex items-center gap-2"
          >
            <ChevronUp className="w-4 h-4" />
            Collapse All
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            Print
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 space-y-4 print:hidden">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search formulas, tags, or descriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Chapters</option>
            {chapters.map((chapter) => (
              <option key={chapter.number} value={chapter.number}>
                Chapter {chapter.number}: {chapter.title}
              </option>
            ))}
          </select>

          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Difficulties</option>
            <option value="basic">Basic</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <p>
            Showing {filteredFormulas.length} of {formulas.length} formulas
          </p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Clear search
            </button>
          )}
        </div>
      </div>

      {/* Print Header */}
      <div className="hidden print:block text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Finance Formulas Reference Sheet</h1>
        <p className="text-gray-600 mt-2">Chapters 2-6</p>
      </div>

      {/* Formulas by Chapter */}
      <div className="space-y-8">
        {chapters
          .filter((chapter) => formulasByChapter[chapter.number]?.length > 0)
          .map((chapter) => {
            const chapterFormulas = formulasByChapter[chapter.number] || [];
            const colors = chapterColors[chapter.number as keyof typeof chapterColors];

            return (
              <div key={chapter.number} className="break-inside-avoid">
                <div className={`${colors.bg} ${colors.border} border-l-4 rounded-lg p-6`}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className={`text-2xl font-bold ${colors.text}`}>
                        Chapter {chapter.number}: {chapter.title}
                      </h2>
                      <p className="text-gray-600 mt-1">
                        {chapterFormulas.length} formula{chapterFormulas.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                    <span className={`${colors.badge} px-4 py-2 rounded-full text-sm font-semibold ${colors.text}`}>
                      Ch. {chapter.number}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {chapterFormulas.map((formula) => {
                      const isExpanded = expandedFormulas.has(formula.id);

                      return (
                        <motion.div
                          key={formula.id}
                          initial={false}
                          className="bg-white rounded-lg border border-gray-200 overflow-hidden break-inside-avoid"
                        >
                          {/* Formula Header */}
                          <button
                            onClick={() => toggleFormula(formula.id)}
                            className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors print:hover:bg-white"
                          >
                            <div className="flex items-center gap-3 flex-1">
                              <div className={`w-8 h-8 rounded-full ${colors.badge} flex items-center justify-center flex-shrink-0`}>
                                {formula.category === 'calculation' ? (
                                  <Calculator className="w-4 h-4" />
                                ) : (
                                  <BookOpen className="w-4 h-4" />
                                )}
                              </div>
                              <div className="text-left flex-1">
                                <h3 className="font-semibold text-gray-900">{formula.name}</h3>
                                <p className="text-sm text-gray-600 font-mono">{formula.formula}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                  formula.difficulty === 'basic' ? 'bg-green-100 text-green-800' :
                                  formula.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {formula.difficulty}
                                </span>
                                <motion.div
                                  animate={{ rotate: isExpanded ? 180 : 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="print:hidden"
                                >
                                  <ChevronDown className="w-5 h-5 text-gray-400" />
                                </motion.div>
                              </div>
                            </div>
                          </button>

                          {/* Formula Details */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="print:!block print:!h-auto print:!opacity-100"
                              >
                                <div className="px-4 pb-4 space-y-4 border-t border-gray-200">
                                  {/* Description */}
                                  <div className="pt-4">
                                    <p className="text-sm text-gray-700">{formula.description}</p>
                                  </div>

                                  {/* Variables */}
                                  {formula.variables.length > 0 && (
                                    <div>
                                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Variables:</h4>
                                      <div className="grid grid-cols-2 gap-2">
                                        {formula.variables.map((variable) => (
                                          <div
                                            key={variable.symbol}
                                            className="flex items-start gap-2 text-sm"
                                          >
                                            <span className="font-mono font-bold text-gray-900 min-w-[3rem]">
                                              {variable.symbol}
                                            </span>
                                            <div>
                                              <p className="text-gray-900 font-medium">{variable.name}</p>
                                              <p className="text-gray-600 text-xs">{variable.description}</p>
                                              {variable.units && (
                                                <p className="text-gray-500 text-xs italic">({variable.units})</p>
                                              )}
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {/* Example */}
                                  {formula.example && (
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                      <h4 className="text-sm font-semibold text-blue-900 mb-2">Example:</h4>
                                      <p className="text-sm text-blue-800 mb-2">{formula.example.problem}</p>
                                      <div className="bg-white rounded p-2 text-sm font-mono text-gray-900">
                                        {formula.example.solution}
                                      </div>
                                    </div>
                                  )}

                                  {/* Tags */}
                                  {formula.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                      {formula.tags.map((tag) => (
                                        <span
                                          key={tag}
                                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium"
                                        >
                                          {tag}
                                        </span>
                                      ))}
                                    </div>
                                  )}

                                  {/* Related Formulas */}
                                  {formula.relatedFormulas && formula.relatedFormulas.length > 0 && (
                                    <div>
                                      <h4 className="text-sm font-semibold text-gray-900 mb-1">Related Formulas:</h4>
                                      <p className="text-sm text-gray-600">
                                        {formula.relatedFormulas.join(', ')}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {/* Empty State */}
      {filteredFormulas.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Search className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 mb-1">No formulas found</h3>
          <p className="text-gray-600">Try adjusting your filters or search query</p>
        </div>
      )}

      {/* Print Styles */}
      <style>{`
        @media print {
          @page {
            margin: 1cm;
            size: A4;
          }

          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }

          .print\\:hidden {
            display: none !important;
          }

          .print\\:block {
            display: block !important;
          }

          .break-inside-avoid {
            break-inside: avoid;
          }

          .space-y-8 > * {
            margin-bottom: 1rem;
          }

          button {
            pointer-events: none;
          }
        }
      `}</style>
    </div>
  );
}
