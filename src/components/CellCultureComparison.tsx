import React, { useState } from 'react';
import { Sprout, HeartPulse, Sparkles } from 'lucide-react';
import { RadialBacterialColonyAnimation } from './RadialBacterialColonyAnimation';

export const CellCultureComparison: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'animal' | 'plant'>('animal');

  return (
    <section id="cultivo-celular" className="relative py-20 bg-[#F1F5F9] border-t border-slate-200 overflow-hidden">
      {/* Background Radial Cell Colony 1 (#FFD1D1 - Rose/Pink) on the top right */}
      <div className="absolute top-4 -right-12 sm:right-4 sm:top-6 lg:right-12 lg:top-8 w-72 h-72 sm:w-96 sm:h-96 pointer-events-none z-0 opacity-80 select-none">
        <RadialBacterialColonyAnimation color="#FFD1D1" />
      </div>

      {/* Background Radial Cell Colony 2 (#D1F5FF - Cyan/Ice Blue) on the bottom left with larger radius */}
      <div className="absolute -bottom-16 -left-16 sm:-bottom-20 sm:-left-10 lg:-bottom-24 lg:left-0 w-80 h-80 sm:w-[28rem] sm:h-[28rem] lg:w-[34rem] lg:h-[34rem] pointer-events-none z-0 opacity-85 select-none">
        <RadialBacterialColonyAnimation color="#D1F5FF" radiusScale={1.35} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-50 border border-purple-200/80 text-purple-900 text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Diferenciación Conceptual</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-3">
            Cultivo Celular: Células Animales vs Tejidos Vegetales
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Es crucial distinguir biológicamente el cultivo de células animales (destinado a carne cultivada mediante diferenciación de músculo y grasa) del cultivo de células y tejidos vegetales (fitomoléculas y micropropagación).
          </p>
        </div>

        {/* Side-by-Side Bento Grid Comparison Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          
          {/* ANIMAL CELL CULTURE CARD */}
          <div 
            onClick={() => setActiveTab('animal')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveTab('animal'); }}
            className={`rounded-3xl p-6 sm:p-8 border transition-all duration-300 flex flex-col justify-between cursor-pointer group ${
              activeTab === 'animal' 
                ? 'bg-[#FFF5F7] border-rose-300 shadow-lg ring-2 ring-rose-400/30 scale-[1.01]' 
                : 'bg-white border-slate-200/90 hover:border-rose-200 hover:shadow-md hover:bg-slate-50/50 opacity-80 hover:opacity-100'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold shadow-sm transition-transform duration-300 group-hover:scale-105 ${
                    activeTab === 'animal' ? 'bg-rose-600 text-white' : 'bg-rose-100 text-rose-600'
                  }`}>
                    <HeartPulse className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-slate-900 group-hover:text-rose-950 transition-colors">
                      Células Animales (Carne Cultivada)
                    </h3>
                    <span className="text-xs text-rose-700 font-semibold">
                      Células satélite, mioblastos y adipocitos
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 mb-6 leading-relaxed">
                Consiste en aislar células madre musculares de un animal y nutrirlas en un biorreactor con aminoácidos y factores de crecimiento. Se multiplican exponencialmente y luego se diferencian en <strong>fibras musculares (miotubos)</strong> y <strong>tejido graso</strong>.
              </p>

              {/* Biological Features Bento Micro-cards */}
              <div className="space-y-3">
                <div className="p-4 bg-white rounded-2xl border border-slate-200/80 text-xs space-y-1 shadow-2xs">
                  <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wider text-slate-500">
                    Comportamiento en Cultivo:
                  </span>
                  <span className="text-slate-700 leading-relaxed block">
                    Son células dependientes de anclaje que requieren microportadores o andamios porosos 3D (scaffolds) para organizarse en cortes cárnicos masticables.
                  </span>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-slate-200/80 text-xs space-y-1 shadow-2xs">
                  <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wider text-slate-500">
                    Medio de Cultivo:
                  </span>
                  <span className="text-slate-700 leading-relaxed block">
                    Control estricto a 37.0°C, pH 7.2-7.4 y osmolaridad fisiológica, libre de suero animal (serum-free media).
                  </span>
                </div>

                <div className="p-4 bg-rose-100/70 rounded-2xl border border-rose-200 text-xs text-rose-950 font-medium">
                  <strong className="block text-rose-900 font-bold mb-1 uppercase tracking-wider text-[10px]">
                    Aplicación Principal en Alimentos:
                  </strong>
                  Producción de hamburguesas, nuggets y cortes de carne vacuna, pollo, cerdo o pescado sin sacrificio animal.
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-rose-200/60 flex items-center justify-between text-xs text-rose-800 font-semibold">
              <span>96% menor uso de agua</span>
              <span>Cero antibióticos profilácticos</span>
            </div>
          </div>

          {/* PLANT CELL CULTURE CARD */}
          <div 
            onClick={() => setActiveTab('plant')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveTab('plant'); }}
            className={`rounded-3xl p-6 sm:p-8 border transition-all duration-300 flex flex-col justify-between cursor-pointer group ${
              activeTab === 'plant' 
                ? 'bg-[#F0FDF4] border-emerald-300 shadow-lg ring-2 ring-emerald-400/30 scale-[1.01]' 
                : 'bg-white border-slate-200/90 hover:border-emerald-200 hover:shadow-md hover:bg-slate-50/50 opacity-80 hover:opacity-100'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold shadow-sm transition-transform duration-300 group-hover:scale-105 ${
                    activeTab === 'plant' ? 'bg-emerald-600 text-white' : 'bg-emerald-100 text-emerald-600'
                  }`}>
                    <Sprout className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-slate-900 group-hover:text-emerald-950 transition-colors">
                      Células & Tejidos Vegetales
                    </h3>
                    <span className="text-xs text-emerald-700 font-semibold">
                      Callos totipotentes y suspensión celular
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 mb-6 leading-relaxed">
                Aprovecha la <strong>totipotencia</strong> de las células vegetales (capacidad de una sola célula de regenerar una planta completa o sintetizar metabolitos de la planta madre) mediante inducción de callos o cultivo en suspensión líquida.
              </p>

              {/* Biological Features Bento Micro-cards */}
              <div className="space-y-3">
                <div className="p-4 bg-white rounded-2xl border border-slate-200/80 text-xs space-y-1 shadow-2xs">
                  <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wider text-slate-500">
                    Comportamiento en Cultivo:
                  </span>
                  <span className="text-slate-700 leading-relaxed block">
                    Células con pared celular rígida de celulosa. Pueden crecer en suspensión líquida libre en biorreactores sin requerir andamiajes adherentes complejos.
                  </span>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-slate-200/80 text-xs space-y-1 shadow-2xs">
                  <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wider text-slate-500">
                    Medio de Cultivo:
                  </span>
                  <span className="text-slate-700 leading-relaxed block">
                    Medio Murashige & Skoog (MS) con sales minerales, sacarosa y fitohormonas (auxinas y citoquininas) a 24-26°C.
                  </span>
                </div>

                <div className="p-4 bg-emerald-100/70 rounded-2xl border border-emerald-200 text-xs text-emerald-950 font-medium">
                  <strong className="block text-emerald-900 font-bold mb-1 uppercase tracking-wider text-[10px]">
                    Aplicación Principal en Alimentos:
                  </strong>
                  Síntesis de bioactivos de cacao, vainillina natural, resveratrol, pigmentos flavonoides y micropropagación de cultivos de élite.
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-emerald-200/60 flex items-center justify-between text-xs text-emerald-800 font-semibold">
              <span>Producción continua todo el año</span>
              <span>Cero pesticidas y microplásticos</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

