/* ===== units.js — Curriculum structuré A1→B1 ===== */
window.UNITS = [
  /* ── A1 ─────────────────────────────────────────────── */
  {
    id: 'a1-1', level: 'A1', icon: '👋',
    name: { fr: 'Salutations & présentations', es: 'Saludos y presentaciones' },
    categories: ['salutations'],
    unlockAfter: null
  },
  {
    id: 'a1-2', level: 'A1', icon: '💬',
    name: { fr: 'Communication de base', es: 'Comunicación básica' },
    categories: ['communication'],
    unlockAfter: 'a1-1'
  },
  {
    id: 'a1-3', level: 'A1', icon: '🏠',
    name: { fr: 'Vie quotidienne', es: 'Vida cotidiana' },
    categories: ['vie-quotidienne'],
    unlockAfter: 'a1-2'
  },
  {
    id: 'a1-4', level: 'A1', icon: '🍽',
    name: { fr: 'Au restaurant', es: 'En el restaurante' },
    categories: ['restaurant'],
    unlockAfter: 'a1-3'
  },
  {
    id: 'a1-5', level: 'A1', icon: '🚌',
    name: { fr: 'Transport & mobilité', es: 'Transporte y movilidad' },
    categories: ['transport'],
    unlockAfter: 'a1-4'
  },
  {
    id: 'a1-6', level: 'A1', icon: '🇦🇷',
    name: { fr: 'Argentin essentiel', es: 'Francés esencial' },
    categories: ['argentin'],
    unlockAfter: 'a1-5'
  },

  /* ── A2 ─────────────────────────────────────────────── */
  {
    id: 'a2-1', level: 'A2', icon: '💼',
    name: { fr: 'Travail & bureau', es: 'Trabajo y oficina' },
    categories: ['travail'],
    unlockAfter: 'a1-6'
  },
  {
    id: 'a2-2', level: 'A2', icon: '❤️',
    name: { fr: 'Santé & bien-être', es: 'Salud y bienestar' },
    categories: ['santé'],
    unlockAfter: 'a2-1'
  },
  {
    id: 'a2-3', level: 'A2', icon: '😊',
    name: { fr: 'Émotions & sentiments', es: 'Emociones y sentimientos' },
    categories: ['émotions'],
    unlockAfter: 'a2-2'
  },
  {
    id: 'a2-4', level: 'A2', icon: '🤲',
    name: { fr: 'Collocations : Avoir & Faire', es: 'Colocaciones: Tener y Hacer' },
    categories: ['collocation-tener', 'collocation-hacer'],
    unlockAfter: 'a2-3'
  },
  {
    id: 'a2-5', level: 'A2', icon: '🗺',
    name: { fr: 'Collocations : Être & Aller', es: 'Colocaciones: Estar e Ir' },
    categories: ['collocation-estar', 'collocation-ir'],
    unlockAfter: 'a2-4'
  },
  {
    id: 'a2-6', level: 'A2', icon: '💭',
    name: { fr: 'Opinions & argumentation', es: 'Opiniones y argumentación' },
    categories: ['opinions', 'connecteurs'],
    unlockAfter: 'a2-5'
  },

  /* ── B1 ─────────────────────────────────────────────── */
  {
    id: 'b1-1', level: 'B1', icon: '🌟',
    name: { fr: 'Social & culture', es: 'Social y cultura' },
    categories: ['social'],
    unlockAfter: 'a2-6'
  },
  {
    id: 'b1-2', level: 'B1', icon: '🧠',
    name: { fr: 'Structures grammaticales', es: 'Estructuras gramaticales' },
    categories: ['grammaire'],
    unlockAfter: 'b1-1'
  },
];
