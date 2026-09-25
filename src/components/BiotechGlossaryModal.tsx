import React, { useState } from 'react';
import { X, Search, BookOpen, Tag } from 'lucide-react';
import { GLOSSARY_TERMS } from '../data/biotechData';

interface BiotechGlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BiotechGlossaryModal: React.FC<BiotechGlossaryModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Todos');

  if (!isOpen) return null;

  const categories = ['Todos', 'Genética & Células', 'Bioprocesos & Reactores', 'Alimentos & Fermentación', 'Sustentabilidad'];

  const filteredTerms = GLOSSARY_TERMS.filter((term) => {
    const matchesSearch = term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          term.definition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = activeCategory === 'Todos' || term.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-3xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-[#F8FAFC]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold shadow-sm">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-slate-900 text-lg">
                Glosario de Biotecnología Alimentaria
              </h3>
              <p className="text-xs text-slate-500">
                10 Conceptos técnicos clave del documento oficial
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className="p-4 border-b border-slate-100 bg-white space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar término (ej. Andamiaje, Ficocianina, BAA, Upstream)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 text-xs focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                  activeCategory === cat
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Glossary Terms List */}
        <div className="p-5 overflow-y-auto space-y-3.5 flex-1 bg-[#F8FAFC]">
          {filteredTerms.length > 0 ? (
            filteredTerms.map((term, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-display font-bold text-slate-900 text-base">
                    {term.term}
                  </h4>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600">
                    {term.category}
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {term.definition}
                </p>
                <div className="text-[11px] text-sky-900 bg-sky-50 p-2.5 rounded-xl border border-sky-100">
                  <strong className="font-semibold">Contexto Alimentario: </strong>
                  {term.context}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-slate-400 text-xs">
              No se encontraron términos para "{searchQuery}".
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-white flex justify-between items-center text-xs text-slate-500">
          <span>Total: {filteredTerms.length} términos</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
