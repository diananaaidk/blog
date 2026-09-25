import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Award, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: '¿La biotecnología se limita únicamente a modificar genéticamente organismos (OGM)?',
    options: [
      'Sí, toda biotecnología requiere obligatoriamente edición CRISPR.',
      'No, la fermentación tradicional milenaria (pan, cerveza, kéfir, cacao) también es biotecnología.',
      'Solo si se utilizan bacterias termófilas de laboratorio.',
      'Depende exclusivamente de si se usan biorreactores de acero inoxidable.',
    ],
    correctIndex: 1,
    explanation: 'La biotecnología utiliza cualquier organismo, célula o enzima para transformar productos. La fermentación tradicional es una aplicación histórica directa.',
  },
  {
    id: 2,
    question: '¿Cuál es la función del Biorreactor en el trinomio Biotecnología ➔ Bioproceso ➔ Biorreactor?',
    options: [
      'Almacenar el producto final seco en polvo.',
      'Diseñar secuencias genéticas mediante computación.',
      'Brindar el equipo y entorno físico controlado (T°, pH, O₂, agitación) para escalar el cultivo biológico.',
      'Sustituir por completo a los microorganismos vivos.',
    ],
    correctIndex: 2,
    explanation: 'El biorreactor es el recipiente de ingeniería donde se controlan con extrema precisión los parámetros físico-químicos del crecimiento celular.',
  },
  {
    id: 3,
    question: 'En la fermentación del cacao, ¿qué grupo microbiano genera la reacción exotérmica que eleva la temperatura a 50°C?',
    options: [
      'Levaduras en las primeras 12 horas.',
      'Bacterias Ácido-Lácticas (BAL).',
      'Bacterias Ácido-Acéticas (BAA) al oxidar el etanol con la entrada de oxígeno.',
      'Virus bacteriófagos de la pulpa.',
    ],
    correctIndex: 2,
    explanation: 'Al voltear las semillas entra aire, y las Bacterias Ácido-Acéticas oxidan el alcohol a ácido acético en una reacción exotérmica que mata al embrión e inicia el desarrollo del aroma del chocolate.',
  },
  {
    id: 4,
    question: '¿Qué ventaja clave ofrece la proteína de leche obtenida por fermentación de precisión?',
    options: [
      'Es idéntica en funcionalidad culinaria (funde y cuaja) pero libre de lactosa, colesterol y vacas.',
      'No contiene aminoácidos.',
      'Solo sirve como colorante blanqueador.',
      'Requiere 10 veces más agua dulce que la ganadería tradicional.',
    ],
    correctIndex: 0,
    explanation: 'La fermentación de precisión permite sintetizar caseínas y beta-lactoglobulina puras con 100% de equivalencia funcional y -97% de emisiones.',
  },
  {
    id: 5,
    question: '¿Qué valioso pigmento natural azul antioxidante se extrae de la microalga Spirulina (Arthrospira)?',
    options: [
      'Clorofila B.',
      'C-Ficocianina.',
      'Beta-caroteno sintético.',
      'Licopeno hidrolizado.',
    ],
    correctIndex: 1,
    explanation: 'La C-Ficocianina es un complejo pigmento-proteico azul brillante hidrosoluble de alto valor biológico y antioxidante obtenido en fotobiorreactores.',
  },
];

export const KnowledgeQuiz: React.FC = () => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const q = QUESTIONS[currentQuestionIdx];

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === q.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIdx < QUESTIONS.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <section id="quiz" className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-800 text-xs font-bold uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-violet-600" />
            Evaluación Rápida de Comprensión
          </div>
          <h2 className="font-display font-bold text-3xl text-slate-900 tracking-tight">
            Desafío de Conocimiento Científico
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Pon a prueba tu dominio sobre los 10 puntos del resumen de biotecnología alimentaria.
          </p>
        </div>

        {/* Quiz Bento Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
          {!quizFinished ? (
            <div className="space-y-6">
              {/* Progress Indicator */}
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 border-b border-slate-100 pb-3">
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold">Pregunta {currentQuestionIdx + 1} de {QUESTIONS.length}</span>
                <span>Puntaje Actual: <strong className="text-slate-900 text-sm">{score}</strong></span>
              </div>

              {/* Question Text */}
              <h3 className="font-display font-bold text-lg sm:text-xl text-slate-900 leading-snug">
                {q.question}
              </h3>

              {/* Options */}
              <div className="space-y-3">
                {q.options.map((opt, idx) => {
                  let btnStyle = 'bg-[#F8FAFC] border-slate-200 hover:border-slate-300 hover:bg-white text-slate-800';
                  if (isAnswered) {
                    if (idx === q.correctIndex) {
                      btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold ring-2 ring-emerald-500/20';
                    } else if (idx === selectedOption) {
                      btnStyle = 'bg-rose-50 border-rose-500 text-rose-950 font-semibold ring-2 ring-rose-500/20';
                    } else {
                      btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswered}
                      className={`w-full p-4 rounded-2xl text-left border text-xs sm:text-sm transition-all flex items-center justify-between shadow-2xs ${btnStyle}`}
                    >
                      <span className="flex-1 font-medium">{opt}</span>
                      {isAnswered && idx === q.correctIndex && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />
                      )}
                      {isAnswered && idx === selectedOption && idx !== q.correctIndex && (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Next Button */}
              {isAnswered && (
                <div className="pt-2 space-y-4 animate-fadeIn">
                  <div className="p-4 rounded-2xl bg-[#F0FDF4] border border-[#DCFCE7] text-xs text-slate-700">
                    <strong className="text-emerald-900 font-bold block mb-1">Explicación Científica:</strong>
                    {q.explanation}
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleNext}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all"
                    >
                      {currentQuestionIdx < QUESTIONS.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-6 space-y-6 animate-fadeIn">
              <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
                <Award className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="font-display font-bold text-2xl text-slate-900">
                  ¡Desafío Completado!
                </h3>
                <p className="text-slate-600 text-sm">
                  Obtuviste <strong className="text-emerald-700 text-lg">{score} de {QUESTIONS.length}</strong> respuestas correctas ({Math.round((score / QUESTIONS.length) * 100)}%).
                </p>
              </div>

              <div className="p-4 bg-[#F8FAFC] rounded-2xl border border-slate-200 text-xs text-slate-600 max-w-md mx-auto">
                {score === QUESTIONS.length
                  ? '¡Excelente dominio científico de todos los bioprocesos, reactores y fermentaciones!'
                  : 'Buen recorrido conceptual. Puedes repasar los diagramas de bioprocesos para reforzar detalles.'}
              </div>

              <button
                onClick={handleRestart}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                Reiniciar Cuestionario
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
