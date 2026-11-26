// Every fact here comes from the previous portfolio (th-portfolio-bice.vercel.app),
// Taha's GitHub, or details Taha confirmed. Do not add anything that is not true.
// French is the main language; English is the alternative.

export type Lang = 'fr' | 'en'
export type T = Record<Lang, string>

export const person = {
  name: 'Taha Yassine Neffai',
  email: 'tahaneffai12@gmail.com',
  github: 'https://github.com/tahaneffai',
  linkedin: 'https://www.linkedin.com/in/taha-yassine-neffai-439098231/',
  cv: '/cv-taha-neffai-fr.pdf',
} as const

export const ui = {
  skip: { fr: 'Aller au contenu', en: 'Skip to content' },
  navStack: { fr: 'Stack', en: 'Stack' },
  navWork: { fr: 'Projets', en: 'Work' },
  navRoute: { fr: 'Parcours', en: 'Journey' },
  navContact: { fr: 'Contact', en: 'Contact' },
  sayHello: { fr: 'Me contacter', en: 'Say hello' },
  langLabel: { fr: 'Langue du site', en: 'Site language' },
  marqueePause: { fr: 'Mettre le défilement en pause', en: 'Pause the ticker' },
  marqueePlay: { fr: 'Relancer le défilement', en: 'Play the ticker' },

  metaLeft: { fr: '// taha-neffai, full-stack', en: '// taha-neffai, full-stack' },
  metaRight: { fr: 'Tanger, MA', en: 'Tangier, MA' },
  role: { fr: 'Ingénieur logiciel full-stack', en: 'Full-stack software engineer' },
  badge: { fr: 'WEB • MOBILE • DESKTOP • ', en: 'WEB • MOBILE • DESKTOP • ' },
  photoCaption: { fr: "// ingénieur d'État, ENSI Tanger", en: '// state engineer, ENSI Tanger' },
  portraitAlt: {
    fr: 'Portrait illustré de Taha qui salue, un ordinateur portable à la main',
    en: 'Illustrated portrait of Taha waving, holding a laptop',
  },
  ctaContact: { fr: 'Me contacter', en: 'Get in touch' },
  ctaWork: { fr: 'Voir les projets', en: 'See the work' },
  ctaCv: { fr: 'CV (PDF)', en: 'CV (PDF, French)' },

  manifestoLabel: { fr: '// manifeste', en: '// manifesto' },
  manifestoA: { fr: 'Je construis', en: 'I build' },
  manifestoB: { fr: 'du web,', en: 'for the web,' },
  manifestoC: { fr: 'du mobile', en: 'for mobile' },
  manifestoD: { fr: 'et du desktop.', en: 'and for desktop.' },
  manifestoText: {
    fr: "Du schéma de la base de données jusqu'à l'interface, pour de vrais utilisateurs : une boutique, une gare, une flotte de taxis, un opérateur télécom.",
    en: 'From the database schema to the interface, for real users: a shop, a train station, a taxi fleet, a telecom operator.',
  },

  stackTitle: { fr: 'Avec quoi je travaille', en: 'What I work with' },
  stackNote: { fr: '// langages et outils', en: '// languages and tools' },
  workTitle: { fr: 'Projets choisis', en: 'Selected work' },
  workNote: { fr: '// faites défiler', en: '// keep scrolling' },
  routeTitle: { fr: 'Le parcours', en: 'The journey' },
  routeNote: { fr: '// études et expérience', en: '// studies and work' },
  alongside: { fr: 'En parallèle', en: 'Alongside' },
  newTab: { fr: '(nouvel onglet)', en: '(opens in a new tab)' },
  languages: { fr: 'Langues', en: 'Languages' },
  beyond: { fr: 'Au-delà du code', en: 'Beyond code' },

  contactTitleA: { fr: 'On construit', en: 'What are we' },
  contactTitleB: { fr: 'quoi ?', en: 'building?' },
  contactLead: {
    fr: 'Un projet, une question ou une collaboration ? Écrivez-moi en français, en anglais ou en arabe.',
    en: 'A project, a question or a collaboration? Write to me in French, English or Arabic.',
  },
  footer: { fr: 'Conçu et développé à Tanger.', en: 'Designed and built in Tangier.' },
} satisfies Record<string, T>

export type Project = {
  id: string
  name: string
  context?: T
  platform: T
  color: string
  year?: string
  summary: T
  details: T
  stack: string[]
  image: { base: string; widths: number[]; width: number; height: number; alt: T; tall?: boolean }
  links: { label: T; href: string }[]
}

const github: T = { fr: 'Code sur GitHub', en: 'Code on GitHub' }

export const projects: Project[] = [
  {
    id: 'optique',
    name: 'Optical Center Management',
    context: { fr: 'Freelance, pour un opticien à Tanger', en: 'Freelance, for an optician in Tangier' },
    platform: { fr: 'Desktop, 100 % hors ligne', en: 'Desktop, fully offline' },
    color: 'var(--color-lime)',
    summary: {
      fr: 'Une application desktop qui gère toute la boutique, sans internet.',
      en: 'A desktop app that runs the whole shop, without internet.',
    },
    details: {
      fr: 'Fiches clients et ordonnances, stock de montures et de verres, factures automatiques, et un tableau de bord avec les ventes. Les données restent sur le poste de la boutique.',
      en: 'Client records and prescriptions, frame and lens stock, automatic invoices, and a dashboard with sales figures. Data stays on the shop computer.',
    },
    stack: ['Electron', 'React', 'SQLite', 'Material UI', 'Vite'],
    image: {
      base: 'optical',
      widths: [800, 1400],
      width: 1400,
      height: 833,
      alt: {
        fr: "Tableau de bord de l'application d'optique : clients favoris, nombre de clients, livraisons et revenus",
        en: 'Optical center app dashboard with favourite clients, client count, deliveries and revenue',
      },
    },
    links: [],
  },
  {
    id: 'trainsight',
    name: 'TrainSight',
    context: { fr: 'Stage ONCF, 2025', en: 'ONCF internship, 2025' },
    platform: { fr: 'Mobile, réalité augmentée', en: 'Mobile, augmented reality' },
    color: 'var(--color-mint)',
    summary: {
      fr: 'Une application de réalité augmentée pour les voyageurs de la gare de Tanger.',
      en: 'An augmented reality app for travellers at Tangier station.',
    },
    details: {
      fr: "On pointe la caméra et on voit les horaires des trains, les quais et le chemin vers les services (cafés, guichets), placés dans la gare réelle. L'app propose aussi une carte interactive des gares du Maroc.",
      en: 'Point the camera to see train times, platforms and the way to services such as cafés and ticket counters, placed in the real station. The app also has an interactive map of Moroccan stations.',
    },
    stack: ['Flutter', 'Dart', 'Unity 3D', 'ARCore', 'Node.js', 'Express', 'PostgreSQL', 'Google Maps API'],
    image: {
      base: 'trainsight',
      widths: [480],
      width: 480,
      height: 1000,
      alt: {
        fr: "Écran d'accueil de TrainSight sur un téléphone Android : carte interactive, AR et street view",
        en: 'TrainSight home screen on an Android phone with interactive map, AR and street view options',
      },
      tall: true,
    },
    links: [{ label: github, href: 'https://github.com/tahaneffai/Ra-stage' }],
  },
  {
    id: 'obc',
    name: 'Taxi OBC',
    platform: { fr: 'Web, Django', en: 'Web, Django' },
    color: 'var(--color-butter)',
    year: '2025',
    summary: {
      fr: 'Une application web qui simule l’ordinateur de bord d’un taxi.',
      en: 'A web app that simulates a taxi on-board computer.',
    },
    details: {
      fr: 'Courses suivies en temps réel avec un prix mis à jour toutes les 5 secondes, cartes interactives Leaflet centrées sur Tanger, lecteur multimédia, et un tableau de bord avec les statistiques des courses et la gestion des chauffeurs.',
      en: 'Live trip tracking with the fare updated every 5 seconds, interactive Leaflet maps centred on Tangier, a media player, and a dashboard with trip statistics and driver management.',
    },
    stack: ['Django', 'Python', 'Tailwind CSS', 'Leaflet.js', 'SQLite', 'JavaScript'],
    image: {
      base: 'obc',
      widths: [800, 1400],
      width: 1400,
      height: 715,
      alt: {
        fr: "Écran d'accueil de Taxi OBC System avec les boutons Media, Courses et Dashboard et un chronomètre",
        en: 'Taxi OBC System home screen with Media, Courses and Dashboard buttons and a trip timer',
      },
    },
    links: [{ label: github, href: 'https://github.com/tahaneffai/taxi-obc-project' }],
  },
  {
    id: 'marina',
    name: 'Marina Bowls',
    platform: { fr: 'Web, menu digital', en: 'Web, digital menu' },
    color: 'var(--color-peach)',
    summary: {
      fr: 'Un menu responsive que les clients ouvrent sur leur propre téléphone.',
      en: 'A responsive menu that customers open on their own phone.',
    },
    details: {
      fr: 'Catégories claires, photos, ingrédients et prix, pensés pour être parcourus vite sur tous les écrans.',
      en: 'Clear categories, photos, ingredients and prices, designed to be quick to browse on any screen.',
    },
    stack: ['React', 'Next.js', 'HTML', 'CSS'],
    image: {
      base: 'menu',
      widths: [560, 900],
      width: 900,
      height: 1535,
      alt: { fr: 'Menu digital Marina Bowls sur un écran de téléphone', en: 'Marina Bowls digital menu on a phone screen' },
      tall: true,
    },
    links: [
      { label: { fr: 'Ouvrir le menu en ligne', en: 'Open the live menu' }, href: 'https://marina-bowls-menu.vercel.app/' },
      { label: github, href: 'https://github.com/tahaneffai/marina-bowls-menu' },
    ],
  },
]

// Journey steps, oldest first.
export type Bar = {
  id: string
  kind: 'study' | 'work'
  start: number
  end?: number // no end = milestone (only the year is known)
  when: T
  title: T
  place: string
  detail?: T
}

export const bars: Bar[] = [
  {
    id: 'bac',
    kind: 'study',
    start: 2019 + 8 / 12,
    end: 2020 + 7 / 12,
    when: { fr: 'sept. 2019 – juil. 2020', en: 'Sep 2019 – Jul 2020' },
    title: { fr: 'Baccalauréat, Sciences physiques', en: 'Baccalaureate, Physical Sciences' },
    place: 'RAWAFID, Oued Zem',
  },
  {
    id: 'licence',
    kind: 'study',
    start: 2020 + 8 / 12,
    end: 2023 + 6 / 12,
    when: { fr: 'sept. 2020 – juin 2023', en: 'Sep 2020 – Jun 2023' },
    title: {
      fr: 'Licence, Développement web et réseaux télécoms',
      en: "Bachelor's degree, Web Development and Telecom Networks",
    },
    place: 'Vinci, Rabat',
  },
  {
    id: 'ensi',
    kind: 'study',
    start: 2023 + 8 / 12,
    end: 2026 + 7 / 12,
    when: { fr: '2023 – 2026', en: '2023 – 2026' },
    title: {
      fr: "Diplôme d'ingénieur d'État, Génie informatique et réseaux télécoms",
      en: 'State Engineering degree, Computer Engineering and Telecom Networks',
    },
    place: 'ENSI Tanger',
  },
  {
    id: 'oncf',
    kind: 'work',
    start: 2025.5,
    when: { fr: '2025', en: '2025' },
    title: { fr: 'Stage, développement logiciel', en: 'Software development internship' },
    place: 'ONCF',
    detail: {
      fr: "TrainSight, application Flutter en réalité augmentée pour la gare de Tanger.",
      en: 'TrainSight, a Flutter augmented reality app for Tangier station.',
    },
  },
  {
    id: 'pfe',
    kind: 'work',
    start: 2026 + 2 / 12,
    end: 2026 + 7 / 12,
    when: { fr: 'mars – juil. 2026', en: 'Mar – Jul 2026' },
    title: { fr: 'Projet de fin d’études, ingénieur full-stack', en: 'Final-year project, full-stack engineer' },
    place: 'BSP Corp, pour IAM Maroc Telecom',
    detail: {
      fr: 'Applications métier sur Zoho Creator (Deluge) et un tableau de bord KPI en React.',
      en: 'Business apps on Zoho Creator (Deluge) and a React KPI dashboard.',
    },
  },
]

export const alongside = {
  title: { fr: 'Développeur freelance', en: 'Freelance developer' },
  detail: {
    fr: 'Application desktop Electron, React et SQLite pour un opticien à Tanger : clients, ordonnances, stock et facturation, entièrement hors ligne.',
    en: 'Electron, React and SQLite desktop app for an optician in Tangier: clients, prescriptions, stock and billing, fully offline.',
  },
} satisfies Record<string, T>

export const skills: { ref: string; domain: T; desc: T; parts: string[] }[] = [
  { ref: 'A', desc: { fr: 'Interfaces React et TypeScript, responsives, rapides et accessibles.', en: 'React and TypeScript interfaces that are responsive, fast and accessible.' }, domain: { fr: 'Frontend', en: 'Frontend' }, parts: ['React', 'TypeScript', 'JavaScript', 'Next.js', 'Angular', 'Tailwind CSS', 'HTML/CSS'] },
  { ref: 'B', desc: { fr: 'APIs REST avec Node.js et Express, Django ou Flask.', en: 'REST APIs with Node.js and Express, Django or Flask.' }, domain: { fr: 'Backend', en: 'Backend' }, parts: ['Node.js', 'Express', 'Django', 'Flask', 'Python', 'REST APIs'] },
  { ref: 'C', desc: { fr: 'Flutter pour le mobile, Electron pour le desktop, y compris hors ligne.', en: 'Flutter for mobile, Electron for desktop, offline included.' }, domain: { fr: 'Mobile et desktop', en: 'Mobile and desktop' }, parts: ['Flutter', 'Dart', 'Electron'] },
  { ref: 'D', desc: { fr: 'Bases SQL et NoSQL, et tableaux de bord KPI.', en: 'SQL and NoSQL databases, and KPI dashboards.' }, domain: { fr: 'Données', en: 'Data' }, parts: ['PostgreSQL', 'SQL', 'SQLite', 'MongoDB', 'Firebase', 'Entity Framework', 'Power BI'] },
  { ref: 'E', desc: { fr: 'Applications métier sur Zoho Creator, scriptées en Deluge.', en: 'Business apps on Zoho Creator, scripted in Deluge.' }, domain: { fr: 'Plateformes low-code', en: 'Low-code platforms' }, parts: ['Zoho Creator', 'Deluge'] },
  { ref: 'F', desc: { fr: 'Git, CI/CD, Docker, et travail en équipe en Agile/Scrum.', en: 'Git, CI/CD, Docker, and teamwork in Agile/Scrum.' }, domain: { fr: 'Outils et méthodes', en: 'Tools and methods' }, parts: ['Git', 'GitHub Actions', 'Docker', 'Azure DevOps', 'Jira', 'Agile/Scrum', 'CI/CD'] },
]

export const languages: { name: T; level: T }[] = [
  { name: { fr: 'Arabe', en: 'Arabic' }, level: { fr: 'Courant', en: 'Fluent' } },
  { name: { fr: 'Français', en: 'French' }, level: { fr: 'Courant', en: 'Fluent' } },
  { name: { fr: 'Anglais', en: 'English' }, level: { fr: 'Courant', en: 'Fluent' } },
  { name: { fr: 'Espagnol', en: 'Spanish' }, level: { fr: 'Débutant', en: 'Beginner' } },
]

export const beyondCode: T = {
  fr: 'Affiches et flyers, montage de courtes vidéos promotionnelles, et maquettes d’interfaces web et mobile sur Figma.',
  en: 'Flyers and posters, editing short promo videos, and web and mobile interface mockups in Figma.',
}
