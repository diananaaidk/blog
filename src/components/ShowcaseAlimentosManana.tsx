import React, { useState } from 'react';
import { 
  HeartPulse, 
  Sparkles, 
  Sun, 
  Egg, 
  Coffee, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Layers, 
  Dna, 
  ShieldCheck, 
  Activity, 
  ChevronRight,
  Droplets,
  Wind,
  Flame,
  Zap,
  Thermometer,
  Clock,
  FlaskConical,
  Microscope,
  Info
} from 'lucide-react';
import { SHOWCASE_APPLICATIONS } from '../data/biotechData';

interface CacaoPhaseDetail {
  title: string;
  duration: string;
  organism: string;
  species: string[];
  aeration: string;
  tempRange: string;
  phRange: string;
  biochemicalReaction: string;
  sensoryImpact: string;
  color: string;
}

const CACAO_PHASES_DATA: Record<'yeast' | 'bal' | 'baa', CacaoPhaseDetail> = {
  yeast: {
    title: 'Fase 1: Fermentación Alcohólica (Levaduras)',
    duration: '0 a 24 horas',
    organism: 'Levaduras Anaerobias Facultativas',
    species: ['Saccharomyces cerevisiae', 'Hanseniaspora guilliermondii', 'Pichia kluyveri'],
    aeration: 'Anaeróbica estricta (baba compacta)',
    tempRange: '25°C ➔ 35°C',
    phRange: 'pH 3.6 (Pulpa ácida rica en cítrico)',
    biochemicalReaction: 'Azúcares simples (Glucosa + Fructosa) ➔ Etanol + CO₂ + Consumo de pectina y ácido cítrico.',
    sensoryImpact: 'Licuación de la pulpa mucilaginosa que drena líquidos; síntesis inicial de ésteres frutales (acetato de isoamilo y etilo).',
    color: '#78350F',
  },
  bal: {
    title: 'Fase 2: Fermentación Láctica (Bacterias Ácido-Lácticas)',
    duration: '24 a 72 horas',
    organism: 'Bacterias Ácido-Lácticas (BAL)',
    species: ['Lactiplantibacillus plantarum', 'Lactobacillus fermentum', 'Leuconostoc mesenteroides'],
    aeration: 'Microaerofílica (primeros drenajes de pulpa)',
    tempRange: '35°C ➔ 42°C',
    phRange: 'pH 3.8 ➔ 4.5',
    biochemicalReaction: 'Azúcares residuales + Ácido cítrico ➔ Ácido láctico + Diacetilo + CO₂.',
    sensoryImpact: 'Regulación de la acidez de la masa, despolimerización del mucílago e incremento de la porosidad del lote.',
    color: '#0284C7',
  },
  baa: {
    title: 'Fase 3: Oxidación Acética & Muerte del Embrión (BAA)',
    duration: '72 a 120+ horas',
    organism: 'Bacterias Ácido-Acéticas (BAA)',
    species: ['Acetobacter pasteurianus', 'Acetobacter aceti', 'Gluconobacter oxydans'],
    aeration: 'Aeróbica intensa (estimulada por volteo del cajón)',
    tempRange: '45°C ➔ 50°C (Pico Exotérmico)',
    phRange: 'pH 4.8 ➔ 5.5',
    biochemicalReaction: 'Etanol + O₂ ➔ Ácido Acético + H₂O + Calor (+493 kJ/mol).',
    sensoryImpact: 'El ácido acético y la temperatura de 50°C matan el embrión; liberan proteasas y polifenoloxidasas que crean los precursores aromáticos esenciales del chocolate.',
    color: '#DC2626',
  }
};

const BEAN_TO_BAR_STEPS = [
  { step: '01', title: 'Fruto de Cacao', detail: 'Mazorcas maduras cosechadas a mano' },
  { step: '02', title: 'Semillas + Pulpa', detail: 'Mucílago rico en azúcares (15%)' },
  { step: '03', title: 'Fermentación Microbiana', detail: 'Tríada Levaduras ➔ BAL ➔ BAA en cajón', isBio: true },
  { step: '04', title: 'Secado Solar', detail: 'Humedad reducida de 60% a <7%' },
  { step: '05', title: 'Tostado Maillard', detail: 'Desarrollo de pirazinas aromáticas (120-140°C)' },
  { step: '06', title: 'Molienda & Conchado', detail: 'Liberación de manteca y micronización' },
  { step: '07', title: 'Chocolate Fino', detail: 'Tableta atemperada con textura sedosa', isFinal: true },
];

export const ShowcaseAlimentosManana: React.FC = () => {
  const [activeAppIndex, setActiveAppIndex] = useState(0);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [cacaoMicrobeTab, setCacaoMicrobeTab] = useState<'yeast' | 'bal' | 'baa'>('yeast');
  const [eggFunctionTab, setEggFunctionTab] = useState<'foam' | 'texture' | 'emulsion'>('foam');
  const [activeBeanStep, setActiveBeanStep] = useState<number | null>(null);

  const currentApp = SHOWCASE_APPLICATIONS[activeAppIndex];

  return (
    <section id="alimentos-showcase" className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-50 border border-violet-200/80 text-violet-900 text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-violet-600" />
            <span>Showcase de Casos Prácticos</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-3">
            Los 5 Alimentos del Mañana
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Explora las 5 aplicaciones estrella de la biotecnología alimentaria moderna, desde carne cultivada y lácteos sin vacas hasta fotobiorreactores de Spirulina y el secreto microbiano del chocolate.
          </p>
        </div>

        {/* 5 Application Star Cards / Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 mb-8">
          {SHOWCASE_APPLICATIONS.map((app, idx) => {
            const isSel = activeAppIndex === idx;
            return (
              <button
                key={app.id}
                onClick={() => {
                  setActiveAppIndex(idx);
                  setActiveStepIndex(0);
                }}
                className={`p-4 rounded-2xl text-left border transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                  isSel
                    ? 'bg-white shadow-md ring-2 ring-offset-1 scale-[1.02]'
                    : 'bg-[#F8FAFC] border-slate-200/80 hover:bg-white hover:border-slate-300 hover:shadow-2xs'
                }`}
                style={{
                  borderColor: isSel ? app.colorTheme.primary : undefined,
                }}
              >
                <div className="flex items-center justify-between mb-2.5">
                  <span 
                    className="w-3.5 h-3.5 rounded-full shadow-2xs"
                    style={{ backgroundColor: app.colorTheme.primary }}
                  />
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-700">
                    0{idx + 1}
                  </span>
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-slate-900 line-clamp-1">
                    {app.title}
                  </h4>
                  <span className="text-[11px] text-slate-500 line-clamp-1 mt-0.5 font-medium">
                    {app.badge}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Interactive Showcase Deep Dive Panel */}
        <div className="bg-white rounded-3xl p-6 sm:p-9 border border-slate-200/90 shadow-sm relative overflow-hidden space-y-8">
          
          {/* Top Banner with Badge and Color Accent */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="space-y-2.5 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span 
                  className="text-xs font-bold px-3 py-1 rounded-full text-white shadow-2xs inline-flex items-center gap-1.5"
                  style={{ backgroundColor: currentApp.colorTheme.primary }}
                >
                  <FlaskConical className="w-3.5 h-3.5" />
                  {currentApp.badge}
                </span>
                <span className="text-xs font-semibold text-slate-600 bg-slate-100/80 px-2.5 py-1 rounded-full border border-slate-200/60">
                  {currentApp.biologicalSystem}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 tracking-tight">
                {currentApp.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
                {currentApp.tagline}
              </p>
            </div>

            {/* Quick Metrics Bar with Enhanced Design */}
            <div className="grid grid-cols-2 gap-2.5 w-full lg:w-auto">
              {currentApp.technicalData.map((data, dIdx) => (
                <div 
                  key={dIdx} 
                  className="p-3 rounded-xl bg-slate-50/90 border border-slate-200/80 text-left min-w-[145px] hover:border-slate-300 transition-colors shadow-2xs"
                >
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block mb-1">
                    {data.label}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-900 font-display block leading-snug">
                    {data.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic Component depending on the active case */}

          {/* 1. CARNE CULTIVADA (STEPPER INTERACTIVO DE 6 ETAPAS) */}
          {currentApp.id === 'carne-cultivada' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-rose-600" />
                  <span>Proceso Paso a Paso de Producción (6 Etapas del Documento)</span>
                </h4>
                
                {/* 6-step clickable timeline */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-4">
                  {currentApp.steps?.map((st, sIdx) => {
                    const isStepSel = activeStepIndex === sIdx;
                    return (
                      <button
                        key={sIdx}
                        onClick={() => setActiveStepIndex(sIdx)}
                        className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                          isStepSel
                            ? 'bg-rose-50/90 border-rose-400 shadow-xs ring-2 ring-rose-400/30'
                            : 'bg-white border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/60'
                        }`}
                      >
                        <span className="text-[10px] font-bold text-rose-600 block mb-1">
                          Etapa 0{st.step}
                        </span>
                        <p className="text-xs font-bold text-slate-800 line-clamp-2">
                          {st.title}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* Active Step Detailed Card */}
                {currentApp.steps && (
                  <div className="p-5 sm:p-6 rounded-2xl bg-rose-50/60 border border-rose-200/80 shadow-2xs space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                        0{currentApp.steps[activeStepIndex].step}
                      </span>
                      <h5 className="font-bold text-slate-900 text-base font-display">
                        {currentApp.steps[activeStepIndex].title}
                      </h5>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {currentApp.steps[activeStepIndex].description}
                    </p>
                    <div className="text-xs text-slate-700 bg-white/90 p-3.5 rounded-xl border border-rose-200/70 shadow-2xs mt-2">
                      <strong className="text-rose-950 font-bold">Detalle Biotecnológico: </strong>
                      {currentApp.steps[activeStepIndex].techDetail}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 2. PROTEÍNA DE LECHE SIN VACA (FÁBRICA MICROBIANA INTERACTIVA) */}
          {currentApp.id === 'proteina-leche' && (
            <div className="space-y-6">
              {/* Conceptual Microbial Factory Flow */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                  <Dna className="w-3.5 h-3.5 text-violet-600" />
                  <span>La "Fábrica Biológica" de Fermentación de Precisión</span>
                </h4>

                <div className="p-5 rounded-2xl bg-gradient-to-r from-violet-50/90 via-purple-50/80 to-indigo-50/90 border border-violet-200/80 shadow-2xs">
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs font-bold text-slate-800">
                    <div className="p-3 bg-white rounded-xl border border-violet-200 shadow-2xs text-center">
                      <span className="text-violet-600 block text-lg mb-0.5">🧬</span>
                      <span>Gen de Interés</span>
                      <span className="text-[10px] text-slate-500 block font-normal mt-0.5">ADN caseína bovina</span>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-violet-200 shadow-2xs text-center">
                      <span className="text-violet-600 block text-lg mb-0.5">🦠</span>
                      <span>Microorganismo</span>
                      <span className="text-[10px] text-slate-500 block font-normal mt-0.5">Levadura hospedera</span>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-violet-200 shadow-2xs text-center">
                      <span className="text-violet-600 block text-lg mb-0.5">⚙️</span>
                      <span>Biorreactor</span>
                      <span className="text-[10px] text-slate-500 block font-normal mt-0.5">Nutrición & Cultivo</span>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-violet-200 shadow-2xs text-center">
                      <span className="text-violet-600 block text-lg mb-0.5">🧪</span>
                      <span>Proteína</span>
                      <span className="text-[10px] text-slate-500 block font-normal mt-0.5">Secreción pura</span>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-violet-200 shadow-2xs text-center">
                      <span className="text-violet-600 block text-lg mb-0.5">✨</span>
                      <span>Purificación</span>
                      <span className="text-[10px] text-slate-500 block font-normal mt-0.5">0% ADN residual</span>
                    </div>

                    <div className="p-3 bg-emerald-600 text-white rounded-xl shadow-2xs text-center">
                      <span className="block text-lg mb-0.5">🥛</span>
                      <span>Ingrediente Puro</span>
                      <span className="text-[10px] text-emerald-100 block font-normal mt-0.5">100% molecular</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 6 Steps timeline selector for Milk */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Detalle de las 6 Fases
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-3">
                  {currentApp.steps?.map((st, sIdx) => (
                    <button
                      key={sIdx}
                      onClick={() => setActiveStepIndex(sIdx)}
                      className={`p-2.5 rounded-xl text-left border text-xs transition-all cursor-pointer ${
                        activeStepIndex === sIdx
                          ? 'bg-violet-100 border-violet-500 font-bold text-violet-950 shadow-2xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>0{st.step}. {st.title}</span>
                    </button>
                  ))}
                </div>
                {currentApp.steps && (
                  <div className="p-4 rounded-xl bg-violet-50/70 border border-violet-200/80 text-xs text-slate-700 space-y-1">
                    <strong className="text-violet-950 font-bold text-sm block">
                      {currentApp.steps[activeStepIndex].title}
                    </strong>
                    <p className="text-slate-700">{currentApp.steps[activeStepIndex].description}</p>
                    <span className="block text-[11px] text-violet-900/80 font-medium pt-1">
                      {currentApp.steps[activeStepIndex].techDetail}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 3. SPIRULINA EN FOTOBIORREACTORES (FOTOBIOLOGÍA & FICOCIANINA) */}
          {currentApp.id === 'spirulina-fotobiorreactores' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5 text-cyan-600" />
                  <span>Ecuación de Fototransformación en Sistemas Cerrados</span>
                </h4>

                {/* Photosynthesis interactive formula card */}
                <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-50/90 via-teal-50/80 to-emerald-50/90 border border-cyan-200/80 shadow-2xs">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-cyan-900 uppercase tracking-wide">
                        Entradas Fotoquímicas:
                      </span>
                      <p className="text-sm sm:text-base font-bold font-display text-slate-900">
                        Luz (Fotones 620-680nm) + Agua + CO₂ + Sales Nutrientes
                      </p>
                    </div>

                    <ArrowRight className="w-6 h-6 text-cyan-600 shrink-0 hidden md:block" />

                    <div className="space-y-1">
                      <span className="text-xs font-bold text-emerald-900 uppercase tracking-wide">
                        Biorreacción:
                      </span>
                      <p className="text-sm sm:text-base font-bold font-display text-slate-900">
                        Arthrospira en Fotobiorreactor Tubular
                      </p>
                    </div>

                    <ArrowRight className="w-6 h-6 text-cyan-600 shrink-0 hidden md:block" />

                    <div className="space-y-1">
                      <span className="text-xs font-bold text-blue-900 uppercase tracking-wide">
                        Productos de Valor:
                      </span>
                      <p className="text-sm sm:text-base font-bold font-display text-slate-900">
                        65% Biomasa Proteica + C-Ficocianina Azul + O₂ Puro
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Special features of Spirulina */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 shadow-2xs">
                  <span className="text-cyan-700 font-bold text-xs uppercase tracking-wider block mb-1">
                    01. Fotoautotrofia
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    Utiliza la luz como única fuente de energía para sintetizar aminoácidos esenciales a partir de carbono inorgánico.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 shadow-2xs">
                  <span className="text-teal-700 font-bold text-xs uppercase tracking-wider block mb-1">
                    02. Sistema Axénico Tubular
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    Cultivo cerrado en tubos de borosilicato que evita el polvo, metales pesados o patógenos de estanques abiertos.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 shadow-2xs">
                  <span className="text-blue-700 font-bold text-xs uppercase tracking-wider block mb-1">
                    03. C-Ficocianina Pura
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    Pigmento natural hidrosoluble azul zafiro con capacidad antioxidante y antiinflamatoria de alta demanda alimentaria.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 4. PROTEÍNAS DE HUEVO (FUNCIONALIDAD TÉCNICA SIN GALLINAS) */}
          {currentApp.id === 'proteinas-huevo' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                  <Egg className="w-3.5 h-3.5 text-amber-600" />
                  <span>Módulos de Funcionalidad Técnica en Alimentos</span>
                </h4>

                {/* 3 Functionality Tabs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-4">
                  <button
                    onClick={() => setEggFunctionTab('foam')}
                    className={`p-3.5 rounded-xl text-center border text-xs font-bold transition-all cursor-pointer ${
                      eggFunctionTab === 'foam'
                        ? 'bg-amber-100/80 border-amber-500 text-amber-950 shadow-2xs ring-2 ring-amber-400/20'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white'
                    }`}
                  >
                    1. Formación de Espuma (Merengues)
                  </button>
                  <button
                    onClick={() => setEggFunctionTab('texture')}
                    className={`p-3.5 rounded-xl text-center border text-xs font-bold transition-all cursor-pointer ${
                      eggFunctionTab === 'texture'
                        ? 'bg-amber-100/80 border-amber-500 text-amber-950 shadow-2xs ring-2 ring-amber-400/20'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white'
                    }`}
                  >
                    2. Modificación de Textura (Gelificación)
                  </button>
                  <button
                    onClick={() => setEggFunctionTab('emulsion')}
                    className={`p-3.5 rounded-xl text-center border text-xs font-bold transition-all cursor-pointer ${
                      eggFunctionTab === 'emulsion'
                        ? 'bg-amber-100/80 border-amber-500 text-amber-950 shadow-2xs ring-2 ring-amber-400/20'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white'
                    }`}
                  >
                    3. Estabilización de Emulsiones
                  </button>
                </div>

                {/* Interactive Functional Demo Card */}
                <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 shadow-2xs">
                  {eggFunctionTab === 'foam' && (
                    <div className="space-y-2">
                      <h5 className="font-bold text-amber-950 font-display text-sm sm:text-base">
                        Espumabilidad & Capacidad de Atrapamiento de Aire:
                      </h5>
                      <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
                        La <strong>ovalbúmina recombinante</strong> se desnaturaliza parcialmente en la interfase aire-agua durante el batido mecánico, formando una película viscoelástica continua que atrapa microburbujas con más de un <strong>600% de sobrebatido</strong> estable sin sinéresis.
                      </p>
                    </div>
                  )}
                  {eggFunctionTab === 'texture' && (
                    <div className="space-y-2">
                      <h5 className="font-bold text-amber-950 font-display text-sm sm:text-base">
                        Termocoagulación y Elasticidad en Repostería:
                      </h5>
                      <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
                        Al calentarse entre 62°C y 70°C, las cadenas polipeptídicas despliegan sus puentes disulfuro y forman una <strong>red de gel tridimensional irreversible</strong> que otorga firmeza a bizcochos, soufflés y pastas sin necesidad de aditivos artificiales.
                      </p>
                    </div>
                  )}
                  {eggFunctionTab === 'emulsion' && (
                    <div className="space-y-2">
                      <h5 className="font-bold text-amber-950 font-display text-sm sm:text-base">
                        Estabilización de Fases Hidrofóbicas / Lipídicas:
                      </h5>
                      <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
                        Posee regiones anfipáticas (hidrofílicas y lipofílicas simultáneas) que rodean las gotas de aceite en aderezos y mayonesas vegetales, impidiendo la coalescencia y separación de fases.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 5. CACAO Y CHOCOLATE (SUCESIÓN MICROBIANA Y TABLA INTERACTIVA DE LOS 3 MICROORGANISMOS) */}
          {currentApp.id === 'cacao-chocolate' && (
            <div className="space-y-7 animate-fadeIn">
              
              {/* Top Selector for the 3 Microorganism Phases */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <Coffee className="w-3.5 h-3.5 text-[#78350F]" />
                    <span>Los 3 Microorganismos Activos en la Fermentación del Cacao</span>
                  </h4>
                  <span className="text-[11px] font-medium text-[#5C2406] bg-[#F7EFE9] px-2.5 py-0.5 rounded-md border border-[#DFC8B7] hidden sm:inline-block">
                    Selecciona una fase para ver su cinética y bioquímica
                  </span>
                </div>

                {/* 3 Active Microorganisms Interactive Tabs */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-4">
                  
                  {/* FASE 1: LEVADURAS */}
                  <button
                    onClick={() => setCacaoMicrobeTab('yeast')}
                    className={`p-4 rounded-2xl text-left border transition-all duration-200 cursor-pointer ${
                      cacaoMicrobeTab === 'yeast'
                        ? 'bg-[#F7EFE9] border-[#78350F] ring-2 ring-[#78350F]/25 shadow-sm scale-[1.01]'
                        : 'bg-white border-slate-200/90 hover:border-[#DFC8B7] hover:bg-[#FAF5F0]/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wide text-[#5C2406] bg-[#EDE0D4] px-2.5 py-0.5 rounded-full border border-[#D7C0AE]">
                        Fase 1 (0 - 24h)
                      </span>
                      <span className="text-[10px] font-semibold text-[#78350F]">25-35°C</span>
                    </div>
                    <h5 className="font-bold text-slate-900 text-sm font-display">
                      Levaduras (Saccharomyces)
                    </h5>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Condiciones anaerobias: fermentan azúcares de la pulpa a alcohol y CO₂.
                    </p>
                  </button>

                  {/* FASE 2: BAL */}
                  <button
                    onClick={() => setCacaoMicrobeTab('bal')}
                    className={`p-4 rounded-2xl text-left border transition-all duration-200 cursor-pointer ${
                      cacaoMicrobeTab === 'bal'
                        ? 'bg-sky-50/90 border-sky-500 ring-2 ring-sky-400/30 shadow-sm scale-[1.01]'
                        : 'bg-white border-slate-200/90 hover:border-sky-200 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wide text-sky-900 bg-sky-100/90 px-2.5 py-0.5 rounded-full border border-sky-200/80">
                        Fase 2 (24 - 72h)
                      </span>
                      <span className="text-[10px] font-semibold text-slate-500">35-42°C</span>
                    </div>
                    <h5 className="font-bold text-slate-900 text-sm font-display">
                      Bacterias Ácido-Lácticas (BAL)
                    </h5>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Transforman azúcares residuales y ácido cítrico en ácido láctico.
                    </p>
                  </button>

                  {/* FASE 3: BAA */}
                  <button
                    onClick={() => setCacaoMicrobeTab('baa')}
                    className={`p-4 rounded-2xl text-left border transition-all duration-200 cursor-pointer ${
                      cacaoMicrobeTab === 'baa'
                        ? 'bg-rose-50/90 border-rose-500 ring-2 ring-rose-400/30 shadow-sm scale-[1.01]'
                        : 'bg-white border-slate-200/90 hover:border-rose-200 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wide text-rose-900 bg-rose-100/90 px-2.5 py-0.5 rounded-full border border-rose-200/80">
                        Fase 3 (72 - 120h)
                      </span>
                      <span className="text-[10px] font-semibold text-rose-600 font-bold">48-50°C (Pico)</span>
                    </div>
                    <h5 className="font-bold text-slate-900 text-sm font-display">
                      Bacterias Ácido-Acéticas (BAA)
                    </h5>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Oxidan el alcohol a ácido acético (T° sube a 50°C, desactivando el embrión).
                    </p>
                  </button>
                </div>

                {/* Deep-Dive Biochemical & Kinetic Interactive Drawer */}
                {(() => {
                  const phase = CACAO_PHASES_DATA[cacaoMicrobeTab];
                  return (
                    <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#FAF5F0] via-[#F5EBE1] to-[#EFE2D6] border border-[#D7C0AE] shadow-2xs space-y-4 animate-fadeIn">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#D7C0AE]/70">
                        <div className="flex items-center gap-2.5">
                          <span 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: phase.color }}
                          />
                          <h5 className="font-display font-bold text-base text-[#3F1A06]">
                            {phase.title}
                          </h5>
                        </div>
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#EDE0D4] text-[#5C2406] border border-[#D7C0AE] self-start sm:self-auto">
                          Duración: {phase.duration}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="p-3 bg-white/95 rounded-xl border border-[#E8D9CC] shadow-2xs">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                            Ambiente & Aireación:
                          </span>
                          <span className="text-xs font-semibold text-slate-900 mt-0.5 block">
                            {phase.aeration}
                          </span>
                        </div>
                        <div className="p-3 bg-white/95 rounded-xl border border-[#E8D9CC] shadow-2xs">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                            Evolución Térmica:
                          </span>
                          <span className="text-xs font-semibold text-[#78350F] mt-0.5 block">
                            {phase.tempRange}
                          </span>
                        </div>
                        <div className="p-3 bg-white/95 rounded-xl border border-[#E8D9CC] shadow-2xs">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                            Curva de pH:
                          </span>
                          <span className="text-xs font-semibold text-slate-900 mt-0.5 block">
                            {phase.phRange}
                          </span>
                        </div>
                      </div>

                      <div className="p-3.5 bg-white/95 rounded-xl border border-[#E8D9CC] space-y-1.5 shadow-2xs">
                        <div className="flex items-center gap-2">
                          <Microscope className="w-3.5 h-3.5 text-[#78350F] shrink-0" />
                          <span className="text-xs font-bold text-[#3F1A06] uppercase tracking-wide">
                            Reacción Bioquímica Fundamental:
                          </span>
                        </div>
                        <p className="text-xs text-[#3F1A06] font-mono bg-[#F7EFE9] p-2 rounded-lg border border-[#D7C0AE]">
                          {phase.biochemicalReaction}
                        </p>
                        <p className="text-xs text-slate-700 leading-relaxed pt-1">
                          <strong className="text-slate-900 font-semibold">Impacto en el grano y sabor: </strong>
                          {phase.sensoryImpact}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-600">
                        <span className="font-bold text-[#5C2406]">Especies dominantes:</span>
                        {phase.species.map((sp, sIdx) => (
                          <span key={sIdx} className="px-2 py-0.5 bg-white rounded-md border border-[#D7C0AE] italic text-[#3F1A06]">
                            {sp}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Bean-to-Chocolate Process Flow Bar (Refined Pipeline UI) */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF5F0]/70 border border-[#DFC8B7] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#5C2406] text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#78350F]" />
                    <span>Flujo Completo del Grano a la Tableta</span>
                  </span>
                  <span className="text-[11px] text-[#78350F] font-medium">
                    Paso a paso industrial
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                  {BEAN_TO_BAR_STEPS.map((item, bIdx) => {
                    const isSelected = activeBeanStep === bIdx;
                    return (
                      <div
                        key={bIdx}
                        onClick={() => setActiveBeanStep(isSelected ? null : bIdx)}
                        className={`p-3 rounded-xl border text-center transition-all cursor-pointer relative flex flex-col justify-between min-h-[90px] ${
                          item.isFinal
                            ? 'bg-[#3E1A04] text-white border-[#2A1002] shadow-2xs'
                            : item.isBio
                            ? 'bg-[#EDE0D4] border-[#D7C0AE] text-[#3E1A04] ring-1 ring-[#78350F]/30 font-bold shadow-2xs'
                            : isSelected
                            ? 'bg-white border-[#78350F] ring-2 ring-[#78350F]/20 shadow-2xs'
                            : 'bg-white border-[#DFC8B7]/70 hover:border-[#78350F]/60'
                        }`}
                      >
                        <span className={`text-[10px] font-bold block mb-1 ${
                          item.isFinal ? 'text-[#D7C0AE]' : item.isBio ? 'text-[#78350F]' : 'text-slate-400'
                        }`}>
                          {item.step}
                        </span>
                        <h6 className={`text-xs font-bold leading-tight ${
                          item.isFinal ? 'text-white' : 'text-slate-900'
                        }`}>
                          {item.title}
                        </h6>
                        <span className={`text-[10px] line-clamp-1 mt-1 block ${
                          item.isFinal ? 'text-[#EDE0D4]' : 'text-slate-500'
                        }`}>
                          {item.detail}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* Bottom Grid: Advantages vs Current Industry Challenges */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-6 border-t border-slate-100">
            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-3 shadow-2xs">
              <h5 className="text-xs font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>Ventajas & Sostenibilidad</span>
              </h5>
              <ul className="space-y-2">
                {currentApp.advantages.map((adv, aIdx) => (
                  <li key={aIdx} className="text-xs text-emerald-950 flex items-start gap-2.5 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-3 shadow-2xs">
              <h5 className="text-xs font-bold text-amber-950 uppercase tracking-wider flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px] shadow-2xs">
                  <AlertCircle className="w-3.5 h-3.5" />
                </div>
                <span>Desafíos Técnicos Actuales</span>
              </h5>
              <ul className="space-y-2">
                {currentApp.challenges.map((ch, cIdx) => (
                  <li key={cIdx} className="text-xs text-amber-950 flex items-start gap-2.5 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <span>{ch}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
