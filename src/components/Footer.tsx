import React from 'react';
import { Dna, Heart, Sparkles, BookOpen, Layers, ShieldCheck, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand & Overview */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-sky-500 to-violet-600 flex items-center justify-center text-white font-bold">
                <Dna className="w-5 h-5" />
              </div>
              <div>
                <span className="font-display font-bold text-white text-lg tracking-tight block">
                  Biotecnología
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              <span className="block font-bold text-white mb-2">Integrantes</span>
              Diana Paola Servin Lemus<br />
              Eloradana Nefertiri Mendoza Garcia<br />
              Diana Lorena Valdes Pedraza
            </p>

            {/* 6 Core Biotech Colors Palette */}
            <div className="pt-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block mb-2">
                Paleta Cromática de la Biotecnología:
              </span>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-[#10B981]" title="Verde Bio / Clorofila" />
                <span className="w-4 h-4 rounded-full bg-[#0284C7]" title="Azul Biorreactor / Ciencia" />
                <span className="w-4 h-4 rounded-full bg-[#06B6D4]" title="Cian Ficocianina / Algas" />
                <span className="w-4 h-4 rounded-full bg-[#8B5CF6]" title="Violeta Genómico / ADN" />
                <span className="w-4 h-4 rounded-full bg-[#F59E0B]" title="Ámbar Fermentación" />
                <span className="w-4 h-4 rounded-full bg-[#F43F5E]" title="Coral Cultivo Celular" />
                <span className="w-4 h-4 rounded-full bg-[#B45309]" title="Cacao / Chocolate" />
              </div>
            </div>
          </div>

          {/* Col 2: The 10 Sections Index */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-display mb-3">
              Contenido
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>01. ¿Qué es la Biotecnología?</li>
              <li>02. Fermentación & Metabolitos</li>
              <li>03. Diagrama de Bioprocesos</li>
              <li>04. Parámetros de Biorreactores</li>
              <li>05. Células Animales vs Vegetales</li>
              <li>06. Carne Cultivada (6 Etapas)</li>
              <li>07. Leche sin Vaca (Precisión)</li>
              <li>08. Spirulina en Fotobiorreactores</li>
              <li>09. Proteínas de Huevo sin Aves</li>
              <li>10. Cacao & Sucesión Microbiana</li>
            </ul>
          </div>

          {/* Col 3: Navigation & Quick Jump */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-display mb-3">
              Navegación Rápida
            </h4>
            <div className="space-y-2 text-xs">
              <a href="#trinomio" className="block text-slate-400 hover:text-emerald-400 transition-colors">
                ➔ El Trinomio Biotecnológico
              </a>
              <a href="#bioprocesos" className="block text-slate-400 hover:text-sky-400 transition-colors">
                ➔ Flujo de Bioprocesos & Biorreactores
              </a>
              <a href="#cultivo-celular" className="block text-slate-400 hover:text-rose-400 transition-colors">
                ➔ Cultivo Animal vs Vegetal
              </a>
              <a href="#alimentos-showcase" className="block text-slate-400 hover:text-violet-400 transition-colors">
                ➔ Los 5 Alimentos del Mañana
              </a>
              <a href="#quiz" className="block text-slate-400 hover:text-teal-400 transition-colors">
                ➔ Desafío de Comprensión
              </a>
            </div>

            <div className="pt-4">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-all"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                Volver arriba
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Biotecnología Alimentaria - Experiencia Inmersiva. Basado en el documento técnico oficial.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Precisión Científica Garantizada
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
