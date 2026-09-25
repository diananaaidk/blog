import React, { useState } from 'react';
import { FlaskConical, Atom, Sparkles, CheckCircle2, ChevronRight, Apple, Wine, Coffee, Layers } from 'lucide-react';
import { METABOLITES_DATA } from '../data/biotechData';

const getBadgeStyles = (id: string, isSelected: boolean) => {
  if (!isSelected) {
    return 'bg-slate-100 text-slate-500 border border-slate-200/70 font-semibold';
  }
  switch (id) {
    case 'acido-lactico':
      return 'bg-sky-100 text-sky-800 border border-sky-300 font-bold shadow-2xs';
    case 'acido-acetico':
      return 'bg-amber-100 text-amber-900 border border-amber-300 font-bold shadow-2xs';
    case 'etanol':
      return 'bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold shadow-2xs';
    case 'dioxido-carbono':
      return 'bg-cyan-100 text-cyan-900 border border-cyan-300 font-bold shadow-2xs';
    case 'proteinas-recombinantes':
      return 'bg-violet-100 text-violet-900 border border-violet-300 font-bold shadow-2xs';
    default:
      return 'bg-slate-100 text-slate-900 border border-slate-300 font-bold shadow-2xs';
  }
};

export const FermentationMetabolites: React.FC = () => {
  const [selectedMetabolite, setSelectedMetabolite] = useState(0);
  const current = METABOLITES_DATA[selectedMetabolite];

  return (
    <section className="py-20 bg-[#F1F5F9] border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
              <FlaskConical className="w-3.5 h-3.5 text-amber-600" />
              Bioquímica Alimentaria
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
              Metabolitos & Fermentación
            </h2>
            <p className="text-slate-600 text-sm max-w-xl mt-1.5">
              Las levaduras y bacterias transforman los azúcares y componentes de los alimentos mediante su metabolismo, liberando moléculas clave para el aroma, acidez, leudado y textura.
            </p>
          </div>

          {/* Fermentation Type Pills */}
          <div className="flex flex-wrap gap-1.5 text-xs font-semibold">
            <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-800 border border-sky-200 font-bold text-[11px]">
              Láctica (BAL)
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200 font-bold text-[11px]">
              Acética (BAA)
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-[11px]">
              Alcohólica (Levaduras)
            </span>
            <span className="px-3 py-1 rounded-full bg-violet-100 text-violet-800 border border-violet-200 font-bold text-[11px]">
              Precisión (Recombinante)
            </span>
          </div>
        </div>

        {/* Interactive Bento Metabolite Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Metabolite List Selector */}
          <div className="lg:col-span-4 space-y-2.5">
            {METABOLITES_DATA.map((item, idx) => {
              const isSelected = selectedMetabolite === idx;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedMetabolite(idx)}
                  className={`w-full p-4 rounded-2xl text-left border transition-all duration-200 flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-white shadow-md ring-2 ring-offset-1 scale-[1.01]'
                      : 'bg-white/80 border-slate-200/90 hover:bg-white hover:border-slate-300 hover:shadow-2xs'
                  }`}
                  style={{
                    borderColor: isSelected ? item.color : undefined,
                    boxShadow: isSelected ? `0 0 0 2px ${item.color}25, 0 4px 6px -1px rgba(0, 0, 0, 0.06)` : undefined,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span 
                      className="w-4 h-4 rounded-full shrink-0 shadow-xs transition-transform duration-200"
                      style={{ 
                        backgroundColor: item.color,
                        transform: isSelected ? 'scale(1.15)' : 'scale(1)'
                      }}
                    />
                    <div>
                      <h4 className="font-display font-bold text-slate-900 text-sm">
                        {item.name}
                      </h4>
                      <span className="text-[11px] font-mono text-slate-500">
                        {item.chemicalFormula}
                      </span>
                    </div>
                  </div>
                  <span className={`text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-tight transition-all duration-200 ${getBadgeStyles(item.id, isSelected)}`}>
                    {item.fermentationType}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Bento Inspector Card */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span 
                    className="w-3.5 h-3.5 rounded-full shadow-xs shrink-0"
                    style={{ backgroundColor: current.color }}
                  />
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-display text-slate-900 tracking-tight">
                    {current.name}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-lg font-mono text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200/80 shrink-0">
                    {current.chemicalFormula}
                  </span>
                </div>
                <span className="text-xs text-slate-500 font-medium block">
                  Tipo de Biotransformación: <strong className="text-slate-800">{current.fermentationType}</strong>
                </span>
              </div>

              <div className="sm:text-right shrink-0">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1">
                  Impacto en Alimento
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block shadow-2xs whitespace-nowrap">
                  Aroma, Textura & Conservación
                </span>
              </div>
            </div>

            {/* Microorganisms Producer & Chemistry Bento Sub-cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
                  <Atom className="w-3.5 h-3.5 text-violet-600" />
                  Microorganismos Productores
                </h5>
                <ul className="space-y-1.5">
                  {current.producingMicrobes.map((microbe, mIdx) => (
                    <li key={mIdx} className="text-xs text-slate-800 font-mono italic flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                      {microbe}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  Presencia en Alimentos Cotidianos
                </h5>
                <div className="flex flex-wrap gap-2">
                  {current.foodApplications.map((food, fIdx) => (
                    <span key={fIdx} className="px-2.5 py-1 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-700 shadow-2xs">
                      {food}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sensory & Technological Role in the Food Matrix */}
            <div className="p-5 rounded-2xl bg-[#FFFBEB] border border-[#FEF3C7]">
              <h5 className="text-xs font-bold uppercase tracking-wider text-[#92400E] mb-1.5">
                Rol Sensorial y Funcional en la Matriz Alimentaria:
              </h5>
              <p className="text-xs sm:text-sm text-[#78350F] leading-relaxed">
                {current.sensoryAndTechRole}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
