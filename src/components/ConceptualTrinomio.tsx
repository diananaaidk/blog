import React, { useState } from 'react';
import { 
  Dna, 
  Layers, 
  Cpu, 
  FlaskConical, 
  RotateCw, 
  Thermometer, 
  Activity, 
  Wind, 
  Droplets, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Info,
  Sparkles,
  Wheat,
  ShieldCheck,
  PackageCheck,
  Scale
} from 'lucide-react';
import { BIOPROCESS_STEPS, BIOREACTOR_PARAMETERS } from '../data/biotechData';

export const ConceptualTrinomio: React.FC = () => {
  const [activePillar, setActivePillar] = useState<'biotech' | 'bioprocess' | 'bioreactor'>('biotech');
  const [selectedProcessStep, setSelectedProcessStep] = useState(0);
  const [selectedParamIndex, setSelectedParamIndex] = useState(0);
  const [scaleLevel, setScaleLevel] = useState<'lab' | 'pilot' | 'industrial'>('pilot');

  const currentStep = BIOPROCESS_STEPS[selectedProcessStep];
  const currentParam = BIOREACTOR_PARAMETERS[selectedParamIndex];

  return (
    <section id="trinomio" className="py-20 bg-slate-50 border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Dna className="w-3.5 h-3.5 text-emerald-600" />
            Fundamentos & Arquitectura Científica
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-4">
            El Trinomio Biotecnológico en Alimentos
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Comprender cómo la ciencia transforma los alimentos requiere dominar la relación indivisible entre el principio activo (<strong className="text-emerald-700">Biotecnología</strong>), el flujo de transformación (<strong className="text-sky-700">Bioproceso</strong>) y el entorno físico donde ocurre (<strong className="text-violet-700">Biorreactor</strong>).
          </p>
        </div>

        {/* 3-Pillar Interactive Switcher Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 max-w-5xl mx-auto">
          {/* Pillar 1: Biotecnología */}
          <button
            onClick={() => setActivePillar('biotech')}
            className={`p-5 rounded-3xl text-left border transition-all relative overflow-hidden ${
              activePillar === 'biotech'
                ? 'bg-white border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                : 'bg-white/80 border-slate-200 hover:bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shadow-sm">
                01
              </span>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                activePillar === 'biotech' ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                Agente Biológico
              </span>
            </div>
            <h3 className="font-display font-bold text-slate-900 text-base mb-1">
              1. Biotecnología
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Organismos, enzimas y células como motores de transformación alimentaria.
            </p>
          </button>

          {/* Pillar 2: Bioproceso */}
          <button
            onClick={() => setActivePillar('bioprocess')}
            className={`p-5 rounded-3xl text-left border transition-all relative overflow-hidden ${
              activePillar === 'bioprocess'
                ? 'bg-white border-sky-500 shadow-md ring-2 ring-sky-500/20'
                : 'bg-white/80 border-slate-200 hover:bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="w-8 h-8 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xs shadow-sm">
                02
              </span>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                activePillar === 'bioprocess' ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                Flujo de Operación
              </span>
            </div>
            <h3 className="font-display font-bold text-slate-900 text-base mb-1">
              2. Bioproceso
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Materia prima ➔ Transformación biológica ➔ Separación ➔ Purificación.
            </p>
          </button>

          {/* Pillar 3: Biorreactor */}
          <button
            onClick={() => setActivePillar('bioreactor')}
            className={`p-5 rounded-3xl text-left border transition-all relative overflow-hidden ${
              activePillar === 'bioreactor'
                ? 'bg-white border-violet-500 shadow-md ring-2 ring-violet-500/20'
                : 'bg-white/80 border-slate-200 hover:bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="w-8 h-8 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center font-bold text-xs shadow-sm">
                03
              </span>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                activePillar === 'bioreactor' ? 'bg-violet-500 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                Ambiente de Control
              </span>
            </div>
            <h3 className="font-display font-bold text-slate-900 text-base mb-1">
              3. Biorreactor
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              El equipo de alta precisión que escala el crecimiento de laboratorio a fábrica.
            </p>
          </button>
        </div>

        {/* Dynamic Pillar Content Views */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          
          {/* PILLAR 1: BIOTECNOLOGÍA DETALLADA */}
          {activePillar === 'biotech' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
                
                {/* Left Column: Core Definition, Functional Vectors & Key Clarification */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      Concepto Fundamental
                    </div>
                    
                    <h3 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 tracking-tight">
                      ¿Qué es la Biotecnología en Alimentos?
                    </h3>
                    
                    <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                      La biotecnología utiliza <strong>organismos vivos, células, microorganismos, enzimas o componentes biológicos</strong> para desarrollar o modificar productos y procesos. En la industria agroalimentaria, permite transformar materias primas agrícolas y producir ingredientes con atributos sensoriales y nutricionales de alto valor: <strong>sabor, aroma, textura, inocuidad y densidad biológica</strong>.
                    </p>

                    {/* 3 Strategic Functional Vectors */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
                        <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                          Transformación
                        </span>
                        <p className="text-xs text-slate-600 leading-snug">
                          Conversión biológica de azúcares y matrices en sabores y texturas complejas.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
                        <span className="text-[11px] font-bold text-sky-800 uppercase tracking-wider block mb-1">
                          Biofabricación
                        </span>
                        <p className="text-xs text-slate-600 leading-snug">
                          Síntesis celular directa de proteínas puras (caseína, ovalbúmina, colágeno).
                        </p>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
                        <span className="text-[11px] font-bold text-violet-800 uppercase tracking-wider block mb-1">
                          Conservación
                        </span>
                        <p className="text-xs text-slate-600 leading-snug">
                          Preservación e inocuidad natural mediante acidificación y bacteriocinas.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Clarification Callout Box */}
                  <div className="p-4 sm:p-4.5 rounded-2xl bg-amber-50/90 border border-amber-200/90 text-amber-950 text-xs sm:text-sm flex items-start gap-3 shadow-2xs">
                    <div className="w-8 h-8 rounded-xl bg-amber-200/80 text-amber-900 flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                      <Info className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                      <strong className="font-bold text-amber-950 text-xs sm:text-sm block">
                        Idea Clave de Clarificación:
                      </strong>
                      <p className="text-amber-900/90 text-xs sm:text-sm leading-relaxed">
                        La biotecnología <em>no significa únicamente modificar genéticamente organismos (OGM)</em>. La fermentación tradicional milenaria (pan de masa madre, kéfir, cerveza, yogur, cacao) es biotecnología pura aplicada por la humanidad desde hace miles de años.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column: Comparative Evolution Cards (5 Columns) */}
                <div className="lg:col-span-5 p-5 sm:p-6 rounded-3xl bg-slate-50/80 border border-slate-200 flex flex-col justify-between space-y-3.5">
                  <div className="flex items-center justify-between pb-1">
                    <h4 className="font-bold text-slate-900 text-xs font-display uppercase tracking-wider">
                      Evolución Tecnológica
                    </h4>
                    <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                      3 Eras de Innovación
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5 hover:border-amber-300 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-lg">
                        Fermentación Tradicional
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono font-medium">Milenaria</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed pt-0.5">
                      Uso de consorcios microbianos silvestres o levaduras para transformar matrices completas (harina a pan, leche a yogur, mosto a vino).
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5 hover:border-violet-300 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-violet-800 bg-violet-100/80 px-2.5 py-0.5 rounded-lg">
                        Fermentación de Precisión
                      </span>
                      <span className="text-[10px] text-violet-600 font-mono font-medium">Siglo XXI</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed pt-0.5">
                      Microorganismos programados como "fábricas celulares" para secretar moléculas específicas (caseína, ovalbúmina, quimosina pura) sin presencia animal.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5 hover:border-rose-300 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-rose-800 bg-rose-100/80 px-2.5 py-0.5 rounded-lg">
                        Agricultura Celular
                      </span>
                      <span className="text-[10px] text-rose-600 font-mono font-medium">In Vitro</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed pt-0.5">
                      Multiplicación y diferenciación directa de células madre musculares y adiposas animales en biorreactores sobre andamios texturizados.
                    </p>
                  </div>
                </div>

              </div>

              {/* 5 Core Pillars of Modern Food Biotech Applications */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  5 Aplicaciones Centrales de la Biotecnología Alimentaria
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  <div className="p-3 bg-white rounded-lg border border-slate-200 hover:border-emerald-300 transition-all">
                    <span className="text-xs font-bold text-emerald-700 block mb-1">01. Fermentación</span>
                    <span className="text-xs text-slate-600">Levaduras y bacterias para aromas y texturas.</span>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-slate-200 hover:border-violet-300 transition-all">
                    <span className="text-xs font-bold text-violet-700 block mb-1">02. Precisión</span>
                    <span className="text-xs text-slate-600">Microorganismos como biofábricas de caseína y albúmina.</span>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-slate-200 hover:border-rose-300 transition-all">
                    <span className="text-xs font-bold text-rose-700 block mb-1">03. Cultivo Celular</span>
                    <span className="text-xs text-slate-600">Carne y tejidos cultivados in vitro sin sacrificio.</span>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-slate-200 hover:border-sky-300 transition-all">
                    <span className="text-xs font-bold text-sky-700 block mb-1">04. Proteínas Nuevas</span>
                    <span className="text-xs text-slate-600">Microalgas como Spirulina ricas en ficocianina.</span>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-slate-200 hover:border-amber-300 transition-all">
                    <span className="text-xs font-bold text-amber-700 block mb-1">05. Biorreactores</span>
                    <span className="text-xs text-slate-600">Escalado industrial con control paramétrico total.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PILLAR 2: BIOPROCESO DETALLADO (INTERACTIVE STEPPER & BIOLOGICAL SYSTEMS) */}
          {activePillar === 'bioprocess' && (
            <div id="bioprocesos" className="space-y-7 animate-fadeIn">
              <div>
                {/* Header with Cohesive Typographic Hierarchy */}
                <div className="mb-6 space-y-2.5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-bold uppercase tracking-wider border border-sky-200/60">
                    <Layers className="w-3.5 h-3.5 text-sky-600" />
                    Flujo Operacional del Bioproceso
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 tracking-tight">
                    De la Materia Prima al Producto Final
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
                    Un <strong className="font-semibold text-slate-800">bioproceso</strong> es un conjunto de operaciones controladas que aprovecha la maquinaria metabólica de organismos vivos para transformar sustratos simples en ingredientes alimentarios de alto valor.
                  </p>
                </div>

                {/* Interactive Stage Progress Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 my-6">
                  {BIOPROCESS_STEPS.map((step, idx) => {
                    const isSelected = selectedProcessStep === idx;
                    return (
                      <button
                        key={step.id}
                        onClick={() => setSelectedProcessStep(idx)}
                        className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'bg-sky-50 border-sky-500 ring-2 ring-sky-500/20 shadow-sm'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            step.phase === 'upstream'
                              ? 'bg-amber-100 text-amber-800'
                              : step.phase === 'bioconversion'
                              ? 'bg-violet-100 text-violet-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {step.phase === 'upstream' ? 'Upstream' : step.phase === 'bioconversion' ? 'Conversión' : 'Downstream'}
                          </span>
                          <span className="font-mono text-xs font-bold text-slate-400">
                            0{step.stepNumber}
                          </span>
                        </div>
                        <p className="text-xs font-bold text-slate-800 line-clamp-2">
                          {step.title}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Step Detailed Inspection Panel */}
                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <span 
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold font-display"
                          style={{ backgroundColor: currentStep.color }}
                        >
                          {currentStep.stepNumber}
                        </span>
                        <div>
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                            Paso {currentStep.stepNumber} de {BIOPROCESS_STEPS.length}
                          </span>
                          <h4 className="text-xl font-bold text-slate-900 font-display">
                            {currentStep.title}
                          </h4>
                        </div>
                      </div>

                      <p className="text-slate-700 text-sm leading-relaxed">
                        {currentStep.fullDesc}
                      </p>

                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-600">
                        <strong className="text-slate-900 font-semibold">Detalle Químico / Celular: </strong>
                        {currentStep.scientificDetail}
                      </div>
                    </div>

                    {/* Critical Control Parameters for this step */}
                    <div className="w-full md:w-80 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                      <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-sky-600" />
                        Variables Críticas de Control
                      </h5>
                      <ul className="space-y-1.5">
                        {currentStep.criticalParameters.map((param, pIdx) => (
                          <li key={pIdx} className="text-xs font-medium text-slate-700 flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{param}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Biological Systems Matrix Table (Directly from Document Page 2) */}
                <div className="mt-8">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                    <FlaskConical className="w-4 h-4 text-violet-600" />
                    Sistemas Biológicos en la Industria Alimentaria (Matriz del Documento)
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-700 border border-slate-200 rounded-xl overflow-hidden">
                      <thead className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200">
                        <tr>
                          <th className="py-3 px-4">Producto Alimentario</th>
                          <th className="py-3 px-4">Bioproceso Aplicado</th>
                          <th className="py-3 px-4">Sistema Biológico Clave</th>
                          <th className="py-3 px-4">Objetivo Tecnológico</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 bg-white">
                        <tr className="hover:bg-slate-50">
                          <td className="py-3 px-4 font-bold text-amber-900 flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
                            Chocolate
                          </td>
                          <td className="py-3 px-4">Fermentación del cacao</td>
                          <td className="py-3 px-4 font-semibold text-slate-900">Levaduras y bacterias (BAL/BAA)</td>
                          <td className="py-3 px-4 text-slate-600">Desarrollo de aroma, sabor y reducción de amargor</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="py-3 px-4 font-bold text-violet-900 flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-violet-600" />
                            Proteínas de leche
                          </td>
                          <td className="py-3 px-4">Fermentación de precisión</td>
                          <td className="py-3 px-4 font-semibold text-slate-900">Microorganismos biofábrica (Levaduras/Hongos)</td>
                          <td className="py-3 px-4 text-slate-600">Caseína y beta-lactoglobulina idéntica sin vacas</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="py-3 px-4 font-bold text-rose-900 flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
                            Carne cultivada
                          </td>
                          <td className="py-3 px-4">Cultivo celular & Ingeniería de tejidos</td>
                          <td className="py-3 px-4 font-semibold text-slate-900">Células animales (satélite y mioblastos)</td>
                          <td className="py-3 px-4 text-slate-600">Tejido muscular y adiposo sin sacrificio animal</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="py-3 px-4 font-bold text-sky-900 flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-sky-600" />
                            Yogur & Kéfir
                          </td>
                          <td className="py-3 px-4">Fermentación láctica</td>
                          <td className="py-3 px-4 font-semibold text-slate-900">Bacterias ácido-lácticas (Lactobacillus, Streptococcus)</td>
                          <td className="py-3 px-4 text-slate-600">Coagulación ácida, cremosidad y conservación natural</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="py-3 px-4 font-bold text-emerald-900 flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                            Pan
                          </td>
                          <td className="py-3 px-4">Fermentación alcohólica</td>
                          <td className="py-3 px-4 font-semibold text-slate-900">Levaduras (Saccharomyces cerevisiae)</td>
                          <td className="py-3 px-4 text-slate-600">Liberación de CO₂ para leudado alveolar y volumen</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PILLAR 3: BIORREACTORES Y PARÁMETROS DE CONTROL (SECCIÓN 4) */}
          {activePillar === 'bioreactor' && (
            <div id="biorreactores" className="space-y-6 animate-fadeIn">
              {/* Top Row: Bioreactor Simulation (Left) & Control Variables Selector (Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                
                {/* Left Column: Interactive 3D/SVG Bioreactor Schematic */}
                <div className="lg:col-span-6 p-6 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 text-white relative overflow-hidden shadow-xl border border-slate-800 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-900/60 text-violet-300 text-xs font-semibold border border-violet-700/50">
                      <Cpu className="w-3.5 h-3.5" />
                      Biorreactor Industrial Automatizado
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 font-semibold bg-slate-800/70 px-2.5 py-0.5 rounded-lg border border-slate-700/60">
                      Escala: {scaleLevel === 'lab' ? '1 L (Lab)' : scaleLevel === 'pilot' ? '50 L (Piloto)' : '50,000 L (Planta)'}
                    </span>
                  </div>

                  {/* SVG Bioreactor Vessel with Animated Agitator and Sensor Points */}
                  <div className="relative h-60 sm:h-64 flex items-center justify-center my-2">
                    <svg viewBox="0 0 300 320" className="w-full h-full max-h-64">
                      {/* Vessel Outer Shell & Cooling Jacket */}
                      <rect x="70" y="40" width="160" height="220" rx="40" fill="#1e293b" stroke="#475569" strokeWidth="4" />
                      <rect x="62" y="60" width="8" height="180" rx="4" fill="#38bdf8" opacity="0.8" />
                      <rect x="230" y="60" width="8" height="180" rx="4" fill="#38bdf8" opacity="0.8" />

                      {/* Liquid Broth / Culture Medium */}
                      <path d="M74 120 Q150 115 226 120 L226 220 Q226 256 150 256 Q74 256 74 220 Z" fill="#0284c7" opacity="0.35" />

                      {/* Motor Head */}
                      <rect x="130" y="10" width="40" height="30" rx="4" fill="#64748b" stroke="#94a3b8" strokeWidth="2" />
                      {/* Central Agitator Shaft */}
                      <line x1="150" y1="40" x2="150" y2="220" stroke="#cbd5e1" strokeWidth="4" />
                      {/* Impeller Blades (Rushton Turbine) */}
                      <g className="animate-spin" style={{ transformOrigin: '150px 180px', animationDuration: '4s' }}>
                        <rect x="110" y="176" width="80" height="8" rx="2" fill="#38bdf8" />
                        <rect x="146" y="140" width="8" height="80" rx="2" fill="#38bdf8" />
                      </g>

                      {/* Sparger / Oxygen Bubble Inoculator */}
                      <circle cx="150" cy="235" r="4" fill="#06b6d4" />
                      {/* Rising Oxygen Micro-Bubbles */}
                      <circle cx="135" cy="210" r="3" fill="#38bdf8" opacity="0.7" className="animate-pulse" />
                      <circle cx="165" cy="190" r="2.5" fill="#38bdf8" opacity="0.6" className="animate-pulse" />
                      <circle cx="140" cy="150" r="3" fill="#38bdf8" opacity="0.8" className="animate-pulse" />
                      <circle cx="160" cy="130" r="2" fill="#38bdf8" opacity="0.5" className="animate-pulse" />

                      {/* Pt100 Temperature Probe (Red) */}
                      <line x1="90" y1="40" x2="90" y2="160" stroke="#f43f5e" strokeWidth="3" />
                      <circle cx="90" cy="160" r="4" fill="#f43f5e" />

                      {/* pH Glass Electrode (Purple) */}
                      <line x1="210" y1="40" x2="210" y2="170" stroke="#a855f7" strokeWidth="3" />
                      <circle cx="210" cy="170" r="4" fill="#a855f7" />

                      {/* Dissolved Oxygen Optical Probe (Cyan) */}
                      <line x1="110" y1="40" x2="110" y2="190" stroke="#06b6d4" strokeWidth="3" />
                      <circle cx="110" cy="190" r="4" fill="#06b6d4" />
                    </svg>

                    {/* Interactive Hotspot Tooltips */}
                    <div className="absolute bottom-1.5 left-2 right-2 text-[10px] sm:text-[11px] text-slate-300 bg-slate-800/90 px-3 py-1.5 rounded-xl backdrop-blur border border-slate-700/80 text-center font-medium flex items-center justify-center gap-2 flex-wrap">
                      <span>🔵 Impulsor</span>
                      <span className="text-slate-600">|</span>
                      <span>🔴 Sonda T°</span>
                      <span className="text-slate-600">|</span>
                      <span>🟣 Sensor pH</span>
                      <span className="text-slate-600">|</span>
                      <span>🔷 Sparger O₂</span>
                    </div>
                  </div>

                  {/* Scale Switcher */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
                    <span className="text-slate-400 font-medium">Escalado Industrial:</span>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => setScaleLevel('lab')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          scaleLevel === 'lab' ? 'bg-violet-600 text-white shadow-sm' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        1L Lab
                      </button>
                      <button
                        onClick={() => setScaleLevel('pilot')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          scaleLevel === 'pilot' ? 'bg-violet-600 text-white shadow-sm' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        50L Piloto
                      </button>
                      <button
                        onClick={() => setScaleLevel('industrial')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          scaleLevel === 'industrial' ? 'bg-violet-600 text-white shadow-sm' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        50,000L Industrial
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Column: 6 Control Parameters Quick Matrix Selector */}
                <div className="lg:col-span-6 flex flex-col justify-between p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-50 text-violet-700 text-xs font-bold uppercase tracking-wider mb-2.5 border border-violet-200/60">
                      <Cpu className="w-3.5 h-3.5 text-violet-600" />
                      Parámetros Críticos de Control
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 tracking-tight leading-tight">
                      Control Preciso de Variables Operativas
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm mt-1.5 leading-relaxed">
                      Condiciones biológicas idóneas para maximizar la síntesis y prevenir estrés celular:
                    </p>
                  </div>

                  {/* 6 Parameter Quick Grid Selector */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {BIOREACTOR_PARAMETERS.map((param, pIdx) => {
                      const isSel = selectedParamIndex === pIdx;
                      return (
                        <button
                          key={param.id}
                          onClick={() => setSelectedParamIndex(pIdx)}
                          className={`p-3 rounded-2xl text-left border transition-all duration-200 flex flex-col justify-between min-h-[76px] cursor-pointer group ${
                            isSel
                              ? 'bg-violet-50/80 border-violet-500 shadow-sm ring-2 ring-violet-400/20 text-violet-950'
                              : 'bg-slate-50/60 border-slate-200/90 text-slate-700 hover:bg-white hover:border-slate-300 hover:shadow-2xs'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-1.5">
                            <span className={`text-xs leading-snug font-bold ${isSel ? 'text-violet-950' : 'text-slate-800'}`}>
                              {param.name}
                            </span>
                            <span 
                              className="w-2.5 h-2.5 rounded-full shrink-0 mt-0.5 transition-transform group-hover:scale-110 shadow-2xs" 
                              style={{ backgroundColor: param.color }}
                            />
                          </div>
                          <span className="text-[11px] text-slate-500 font-mono block mt-1">
                            {param.unit}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Bottom Row: Elongated, Full-Width Parameter Detailed Spec Card */}
              <div className="w-full rounded-3xl bg-white border border-slate-200 p-6 sm:p-7 shadow-sm space-y-5">
                
                {/* Header of the Selected Parameter */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div className="flex items-start sm:items-center gap-3.5">
                    <div 
                      className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-sm"
                      style={{ backgroundColor: currentParam.color }}
                    >
                      {currentParam.id === 'temperatura' && <Thermometer className="w-5 h-5" />}
                      {currentParam.id === 'ph' && <Activity className="w-5 h-5" />}
                      {currentParam.id === 'agitacion' && <RotateCw className="w-5 h-5" />}
                      {currentParam.id === 'oxigeno' && <Wind className="w-5 h-5" />}
                      {currentParam.id === 'nutrientes' && <Droplets className="w-5 h-5" />}
                      {currentParam.id === 'tiempo' && <Clock className="w-5 h-5" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h4 className="text-xl sm:text-2xl font-bold text-slate-900 font-display tracking-tight">
                          {currentParam.name}
                        </h4>
                        <span className="text-xs font-mono font-bold bg-slate-100 text-slate-800 px-2.5 py-0.5 rounded-lg border border-slate-200">
                          {currentParam.unit}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                        {currentParam.description}
                      </p>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 shrink-0 self-start sm:self-center">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Control en Bucle Cerrado (PID)</span>
                  </div>
                </div>

                {/* Elongated Side-by-Side Bento Information Panels */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Indispensable Role */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col space-y-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs shrink-0">
                        !
                      </div>
                      <span className="text-slate-900 font-bold text-xs uppercase tracking-wider">
                        ¿Por qué es indispensable?
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pt-0.5">
                      {currentParam.importance}
                    </p>
                  </div>

                  {/* Optimal Range & Control Mechanism */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col space-y-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-violet-100 text-violet-800 flex items-center justify-center font-bold text-xs shrink-0">
                        <Activity className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-slate-900 font-bold text-xs uppercase tracking-wider">
                        Rango Óptimo y Mecanismo de Control
                      </span>
                    </div>
                    
                    <div className="space-y-2 pt-0.5">
                      <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-900 font-mono">
                        {currentParam.optimalRange}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {currentParam.controlMechanism}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};
