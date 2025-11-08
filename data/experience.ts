export default [
{
company: 'Proyectos Freelance',
role: 'Desarrollador Full-Stack',
period: '2024 — Presente',
location: 'Costa Rica',
summary:
'Construcción de sitios y mini–apps con Nuxt/Vue y backends Django simples para integraciones y lógica. Despliegues, optimización y soporte evolutivo.',
bullets: [
'Frontends con Nuxt 3 + Tailwind y buenas prácticas de accesibilidad.',
'Integración de APIs REST, auth básica y CI/CD (Netlify).',
'Mejoras de rendimiento (Lighthouse 90+).'
],
tech: ['Nuxt 3', 'Vue 3', 'Tailwind', 'MySQL']
},
{
company: 'FUNREAD (Práctica Profesional)',
role: 'Backend Developer',
period: '2024',
location: 'Universida de Costa Rica (UCR) ',
summary:
'API en Django para app educativa gamificada. Endpoints, base de datos y conexión con frontend React.',
bullets: [
'Diseño de modelo de datos y endpoints CRUD.',
'Autenticación, paginación y manejo de errores.',
'Consumo desde React vía Axios.'
],
tech: ['Django', 'DRF', 'MySQL', 'React', 'Axios']
}
] as const
