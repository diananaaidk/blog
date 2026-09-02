import React, { useState, useEffect } from 'react';
import { 
  Dna, 
  FlaskConical, 
  Utensils, 
  BookOpen, 
  Layers, 
  CircleDot, 
  Award, 
  Menu, 
  X, 
  ArrowRight,
  Zap
} from 'lucide-react';

interface NavbarProps {
  onOpenGlossary: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenGlossary }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      if (totalScroll > 0) {
        setScrollProgress((currentScroll / totalScroll) * 100);
      }

      setIsScrolled(currentScroll > 20);

      // Check sections for active state
      const sections = ['hero', 'trinomio', 'cultivo-celular', 'alimentos-showcase', 'quiz'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -76;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const navItems = [
    { 
      id: 'trinomio', 
      label: 'Trinomio', 
      icon: Dna, 
      color: 'emerald',
      activeBg: 'bg-emerald-500/10 text-emerald-900 border-emerald-500/30'
    },
    { 
      id: 'cultivo-celular', 
      label: 'Células', 
      icon: CircleDot, 
      color: 'rose',
      activeBg: 'bg-rose-500/10 text-rose-900 border-rose-500/30'
    },
    { 
      id: 'alimentos-showcase', 
      label: 'Alimentos', 
      icon: Utensils, 
      color: 'violet',
      activeBg: 'bg-violet-500/10 text-violet-900 border-violet-500/30'
    },
    { 
      id: 'quiz', 
      label: 'Quiz', 
      icon: Award, 
      color: 'amber',
      activeBg: 'bg-amber-500/10 text-amber-900 border-amber-500/30'
    }
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-none px-3 sm:px-6 pt-2 sm:pt-3">
        {/* Dynamic Glowing Floating Dock Container */}
        <div className={`max-w-7xl mx-auto rounded-3xl pointer-events-auto transition-all duration-300 border ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-xl shadow-xl shadow-slate-900/5 border-slate-200/80 ring-1 ring-slate-900/5' 
            : 'bg-white/95 backdrop-blur-lg shadow-md border-slate-200/90'
        }`}>
          
          {/* Real-time Cybernetic Progress Glow Line */}
          <div className="h-[2px] w-full bg-slate-100 rounded-t-3xl overflow-hidden relative">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 via-sky-500 via-violet-500 to-amber-500 transition-all duration-150 ease-out shadow-[0_0_8px_rgba(16,185,129,0.6)]"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>

          <div className="px-3.5 sm:px-5 lg:px-6">
            <div className="relative flex items-center justify-between lg:justify-center h-14 sm:h-16">
              
              {/* Desktop Unified Center Cluster: Brand Logo + Menu Dock */}
              <div className="hidden lg:flex items-center gap-6 xl:gap-8">
                {/* Brand Logo & Trinomio Concept Identity */}
                <button 
                  onClick={() => scrollTo('hero')} 
                  className="flex items-center space-x-3 text-left group focus:outline-none py-1 flex-shrink-0"
                >
                  <div className="relative">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-sky-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 group-hover:shadow-emerald-500/40 transition-all duration-300">
                      <Dna className="w-5 h-5 text-emerald-50 group-hover:rotate-12 transition-transform duration-300" />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full animate-pulse" />
                  </div>
                  
                  <div className="flex items-center">
                    <span className="font-display font-black text-slate-900 text-lg sm:text-xl tracking-tight leading-none group-hover:text-emerald-700 transition-colors">
                      Biotecnología
                    </span>
                  </div>
                </button>

                {/* Vertical Subtle Separator */}
                <div className="w-[1px] h-6 bg-slate-200/90" />

                {/* Strategic Innovative Desktop Navigation - Capsule Dock */}
                <div className="flex items-center space-x-1 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/90 shadow-2xs">
                  <nav className="flex items-center space-x-1">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeSection === item.id;
                      
                      // Active icon styles & glows
                      let iconActiveStyles = 'text-slate-400 group-hover:text-slate-700';
                      let iconBadgeStyles = 'bg-slate-200/60 text-slate-500';
                      let textActiveStyles = 'text-slate-600 group-hover:text-slate-900 font-medium';

                      if (isActive) {
                        textActiveStyles = 'text-slate-900 font-extrabold';
                        if (item.color === 'emerald') {
                          iconActiveStyles = 'text-emerald-600 scale-110 drop-shadow-[0_0_8px_rgba(16,185,129,0.7)]';
                          iconBadgeStyles = 'bg-emerald-100 text-emerald-700 shadow-xs ring-1 ring-emerald-400/40';
                        } else if (item.color === 'rose') {
                          iconActiveStyles = 'text-rose-600 scale-110 drop-shadow-[0_0_8px_rgba(244,63,94,0.7)]';
                          iconBadgeStyles = 'bg-rose-100 text-rose-700 shadow-xs ring-1 ring-rose-400/40';
                        } else if (item.color === 'violet') {
                          iconActiveStyles = 'text-violet-600 scale-110 drop-shadow-[0_0_8px_rgba(139,92,246,0.7)]';
                          iconBadgeStyles = 'bg-violet-100 text-violet-700 shadow-xs ring-1 ring-violet-400/40';
                        } else if (item.color === 'sky') {
                          iconActiveStyles = 'text-sky-600 scale-110 drop-shadow-[0_0_8px_rgba(14,165,233,0.7)]';
                          iconBadgeStyles = 'bg-sky-100 text-sky-700 shadow-xs ring-1 ring-sky-400/40';
                        } else if (item.color === 'amber') {
                          iconActiveStyles = 'text-amber-600 scale-110 drop-shadow-[0_0_8px_rgba(245,158,11,0.7)]';
                          iconBadgeStyles = 'bg-amber-100 text-amber-700 shadow-xs ring-1 ring-amber-400/40';
                        }
                      }

                      return (
                        <button
                          key={item.id}
                          onClick={() => scrollTo(item.id)}
                          className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs transition-all duration-200 group ${
                            isActive
                              ? 'bg-white shadow-xs border border-slate-200/90 text-slate-900'
                              : 'hover:bg-white/70 text-slate-600'
                          }`}
                        >
                          {/* Illuminated Icon Container */}
                          <div className={`w-5 h-5 rounded-lg flex items-center justify-center transition-all duration-300 ${iconBadgeStyles}`}>
                            <Icon className={`w-3.5 h-3.5 transition-all duration-300 ${iconActiveStyles}`} />
                          </div>
                          
                          <span className={`transition-colors duration-200 ${textActiveStyles}`}>{item.label}</span>
                        </button>
                      );
                    })}
                  </nav>

                  {/* Subtle Divider */}
                  <div className="w-[1px] h-5 bg-slate-300/80 mx-1 self-center" />

                  {/* Integrated Strategic Action: Glossary Trigger */}
                  <button
                    onClick={onOpenGlossary}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/90 hover:bg-white text-slate-800 hover:text-sky-700 text-xs font-bold transition-all duration-200 shadow-2xs border border-slate-200/80 group"
                    title="Abrir Glosario Biotecnológico"
                  >
                    <div className="w-5 h-5 rounded-lg bg-sky-50 text-sky-600 group-hover:bg-sky-100 flex items-center justify-center transition-colors">
                      <BookOpen className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                    </div>
                    <span>Glosario</span>
                  </button>
                </div>
              </div>

              {/* Mobile / Tablet View: Left Brand Logo */}
              <button 
                onClick={() => scrollTo('hero')} 
                className="flex lg:hidden items-center space-x-3 text-left group focus:outline-none py-1"
              >
                <div className="relative">
                  <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-sky-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
                    <Dna className="w-4 h-4 text-emerald-50" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
                </div>
                
                <span className="font-display font-black text-slate-900 text-lg tracking-tight leading-none">
                  Biotecnología
                </span>
              </button>

              {/* Mobile / Tablet Menu Toggle Button */}
              <div className="flex lg:hidden items-center space-x-2">
                <button
                  onClick={onOpenGlossary}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-2xl text-slate-700 bg-slate-100/90 hover:bg-slate-200 text-xs font-bold transition-colors border border-slate-200/80"
                  title="Glosario"
                >
                  <BookOpen className="w-3.5 h-3.5 text-sky-600" />
                  <span className="hidden xs:inline">Glosario</span>
                </button>

                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2.5 rounded-2xl bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 transition-colors focus:outline-none border border-slate-200/80"
                  aria-label="Abrir menú"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5 text-slate-900" /> : <Menu className="w-5 h-5 text-slate-900" />}
                </button>
              </div>

            </div>
          </div>

          {/* Strategic Mobile Drawer (Categorized, Elegant & Modern) */}
          {mobileMenuOpen && (
            <div className="lg:hidden bg-white/95 backdrop-blur-2xl border-t border-slate-200/90 rounded-b-3xl px-4 pt-3 pb-6 shadow-2xl animate-fadeIn space-y-3.5 max-h-[80vh] overflow-y-auto">
              
              {/* Category: Fundamentos */}
              <div>
                <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-widest px-2 block mb-1.5">
                  Fundamentos
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => scrollTo('trinomio')}
                    className={`flex items-center gap-2 p-2.5 rounded-2xl text-xs font-bold transition-all ${
                      activeSection === 'trinomio'
                        ? 'bg-emerald-50 text-emerald-900 border border-emerald-300 shadow-2xs'
                        : 'bg-slate-50/90 text-slate-700 hover:bg-slate-100 border border-slate-200/60'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <Dna className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <div className="leading-tight">Trinomio</div>
                      <div className="text-[9px] text-slate-400 font-normal">Agente & Proceso</div>
                    </div>
                  </button>

                  <button
                    onClick={() => scrollTo('cultivo-celular')}
                    className={`flex items-center gap-2 p-2.5 rounded-2xl text-xs font-bold transition-all ${
                      activeSection === 'cultivo-celular'
                        ? 'bg-rose-50 text-rose-900 border border-rose-300 shadow-2xs'
                        : 'bg-slate-50/90 text-slate-700 hover:bg-slate-100 border border-slate-200/60'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                      <CircleDot className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <div className="leading-tight">Células</div>
                      <div className="text-[9px] text-slate-400 font-normal">Animal & Vegetal</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Category: Aplicaciones & Casos */}
              <div>
                <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-widest px-2 block mb-1.5">
                  Casos de Aplicación
                </span>
                <button
                  onClick={() => scrollTo('alimentos-showcase')}
                  className={`w-full flex items-center justify-between p-2.5 rounded-2xl text-xs font-bold transition-all ${
                    activeSection === 'alimentos-showcase'
                      ? 'bg-violet-50 text-violet-900 border border-violet-300 shadow-2xs'
                      : 'bg-slate-50/90 text-slate-700 hover:bg-slate-100 border border-slate-200/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center shrink-0">
                      <Utensils className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <div className="leading-tight">Alimentos del Mañana</div>
                      <div className="text-[9px] text-slate-400 font-normal">Carne, Espirulina, Lácteos, Huevos, Cacao</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-violet-600 font-extrabold bg-violet-100/90 px-2.5 py-1 rounded-xl">
                    5 Casos
                  </span>
                </button>
              </div>

              {/* Category: Práctica & Interacción */}
              <div>
                <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-widest px-2 block mb-1.5">
                  Interacción & Práctica
                </span>
                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={() => scrollTo('quiz')}
                    className={`flex items-center gap-2 p-2.5 rounded-2xl text-xs font-bold transition-all ${
                      activeSection === 'quiz'
                        ? 'bg-amber-50 text-amber-900 border border-amber-300 shadow-2xs'
                        : 'bg-slate-50/90 text-slate-700 hover:bg-slate-100 border border-slate-200/60'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                      <Award className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <div className="leading-tight">Quiz</div>
                      <div className="text-[9px] text-amber-700 font-normal">5 Preguntas</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Mobile Bottom Quick Actions */}
              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenGlossary();
                  }}
                  className="w-full py-2.5 rounded-2xl border border-slate-200 bg-white text-slate-800 text-xs font-bold flex items-center justify-center gap-2 shadow-2xs hover:bg-slate-50 transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5 text-sky-600" />
                  <span>Glosario Biotecnológico</span>
                </button>
              </div>

            </div>
          )}
        </div>
      </header>
    </>
  );
};
