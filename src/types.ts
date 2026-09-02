export interface BioprocessStep {
  id: string;
  stepNumber: number;
  title: string;
  shortDesc: string;
  fullDesc: string;
  phase: 'upstream' | 'bioconversion' | 'downstream';
  icon: string;
  criticalParameters: string[];
  scientificDetail: string;
  color: string;
}

export interface BioreactorParameter {
  id: string;
  name: string;
  unit: string;
  icon: string;
  description: string;
  importance: string;
  optimalRange: string;
  controlMechanism: string;
  color: string;
}

export interface MetaboliteInfo {
  id: string;
  name: string;
  chemicalFormula: string;
  producingMicrobes: string[];
  foodApplications: string[];
  sensoryAndTechRole: string;
  fermentationType: 'Láctica' | 'Alcohólica' | 'Acética' | 'Precisión';
  color: string;
}

export interface ShowcaseApplication {
  id: string;
  title: string;
  badge: string;
  tagline: string;
  colorTheme: {
    primary: string;
    border: string;
    lightBg: string;
    text: string;
    accent: string;
  };
  summary: string;
  keyInnovation: string;
  steps?: {
    step: number;
    title: string;
    description: string;
    techDetail: string;
  }[];
  biologicalSystem: string;
  biotechnologies: string[];
  advantages: string[];
  challenges: string[];
  technicalData: {
    label: string;
    value: string;
  }[];
}

export interface BioprocessSimulationPreset {
  id: string;
  name: string;
  targetProduct: string;
  organism: string;
  defaultTemp: number;
  minTemp: number;
  maxTemp: number;
  optTemp: number;
  defaultPh: number;
  minPh: number;
  maxPh: number;
  optPh: number;
  defaultAgitation: number;
  optAgitation: number;
  defaultOxygen: number;
  optOxygen: number;
  batchDurationHours: number;
  color: string;
  unitOutput: string;
  resourceSavings: {
    waterSavedPercent: number;
    landSavedPercent: number;
    emissionsSavedPercent: number;
  };
}

export interface GlossaryTerm {
  term: string;
  category: 'Genética & Células' | 'Bioprocesos & Reactores' | 'Alimentos & Fermentación' | 'Sustentabilidad';
  definition: string;
  context: string;
}
