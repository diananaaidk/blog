import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ConceptualTrinomio } from './components/ConceptualTrinomio';
import { FermentationMetabolites } from './components/FermentationMetabolites';
import { CellCultureComparison } from './components/CellCultureComparison';
import { ShowcaseAlimentosManana } from './components/ShowcaseAlimentosManana';
import { KnowledgeQuiz } from './components/KnowledgeQuiz';
import { CommentsArea } from './components/CommentsArea';
import { BiotechGlossaryModal } from './components/BiotechGlossaryModal';
import { Footer } from './components/Footer'; 

export default function App() {
  const [glossaryOpen, setGlossaryOpen] = useState(false);

  const scrollToExplore = () => {
    const el = document.getElementById('trinomio');
    if (el) {
      const yOffset = -76;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-emerald-100 selection:text-emerald-900">
      {/* Sticky Top Navigation */}
      <Navbar
        onOpenGlossary={() => setGlossaryOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* Section 1: Inmersive Hero Banner */}
        <HeroSection onExplore={scrollToExplore} />

        {/* Section 2: Fundamentos & El Trinomio Biotecnológico (Pillars 1, 2, 3) */}
        <ConceptualTrinomio />

        {/* Section 3: Metabolitos y Fermentación Clásica vs Moderna */}
        <FermentationMetabolites />

        {/* Section 4: Cultivo Celular: Animales vs Vegetales */}
        <CellCultureComparison />

        {/* Section 5: Los 5 Alimentos del Mañana (Showcase) */}
        <ShowcaseAlimentosManana />

        {/* Section 6: Desafío de Comprensión Científica */}
        <KnowledgeQuiz />

        {/* Section 6: Desafío de Comprensión Científica */}
        <CommentsArea />

      </main>

      {/* Glossary Modal */}
      <BiotechGlossaryModal
        isOpen={glossaryOpen}
        onClose={() => setGlossaryOpen(false)}
      />

      {/* Scientific Footer */}
      <Footer />
    </div>
  );
}
