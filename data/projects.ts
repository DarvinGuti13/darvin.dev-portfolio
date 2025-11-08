import type { ProjectRO } from '~/types/project';

const projects: readonly ProjectRO[] = [
  {
    slug: 'guanacaste-transfers',
    title: 'Guanacaste Transfers & Tours',
    summary:
      'Sitio oficial para una empresa de transporte y tours en Guanacaste. Desarrollado con Nuxt 3, Tailwind y desplegado en Netlify, enfocado en rendimiento (Lighthouse 90+) y generación de contactos via WhatsApp y Email.',
    cover: '/images/guanacaste.png',
    tech: ['Nuxt 3', 'Tailwind', 'CI/CD', 'Resend API'],
    links: { demo: 'https://guanacastetransfersandtours.com' },
    official: true,
    type: 'Cliente',
    role: 'Full-stack',
    features: [
      'Landing responsive con hero, tours y sección de contacto',
      'Formularios con validación y enlaces a WhatsApp/Email',
      'Galería de tours optimizada (snap-scroll, mobile-first)',
      'SEO on-page (títulos/meta/OG) y sitemap',
      'CI/CD con Netlify desde GitHub'
    ],
    challenges:
      'Unificar contenido visual y mantener tiempos de carga bajos en móvil (imágenes responsivas, lazy-loading, CSS limpio).',
    learnings:
      'Optimización en Nuxt 3, componentes reutilizables y pipeline automatizado con Netlify.'
  }
] as const

export default projects

