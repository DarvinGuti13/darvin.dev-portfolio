// data/techstack.ts
export type TechItem = {
  readonly name: string
  readonly icon: string
}

export type TechCategory = {
  readonly title: string
  readonly icon: string
  readonly items: readonly TechItem[]
}

const techstack = [
  {
    title: 'Frontend',
    icon: 'ph:code-bold',
    items: [
      { name: 'HTML5',        icon: 'simple-icons:html5' },
      { name: 'CSS3',         icon: 'simple-icons:css3' },
      { name: 'JavaScript',   icon: 'simple-icons:javascript' },
      { name: 'TypeScript',   icon: 'simple-icons:typescript' },
      { name: 'Vue 3',        icon: 'simple-icons:vuedotjs' },
      { name: 'Nuxt 3',       icon: 'simple-icons:nuxtdotjs' },
      { name: 'React',        icon: 'simple-icons:react' },
      { name: 'Angular',      icon: 'simple-icons:angular' },
      { name: 'Tailwind CSS', icon: 'simple-icons:tailwindcss' },
    ],
  },

  {
    title: 'Backend',
    icon: 'mdi:server-outline',
    items: [
      { name: 'Python',    icon: 'simple-icons:python' },
      { name: 'Django',    icon: 'simple-icons:django' },
      { name: 'FastAPI',   icon: 'simple-icons:fastapi' },
      { name: 'Laravel',   icon: 'simple-icons:laravel' },
      { name: '.NET (C#)', icon: 'simple-icons:dotnet' },
      { name: 'Node.js',   icon: 'simple-icons:nodedotjs' },
    ],
  },

  {
    title: 'Metodologías y Gestión',
    icon: 'ph:kanban',
    items: [
      { name: 'Scrum',                 icon: 'simple-icons:scrumalliance' },
      { name: 'Office 365',            icon: 'simple-icons:microsoftoffice' },
      { name: 'Gestión de Proyectos',  icon: 'ph:clipboard-text' },
      { name: 'Jira',                  icon: 'simple-icons:jira' },
    ],
  },

  {
    title: 'Bases de Datos',
    icon: 'ph:database',
    items: [
      { name: 'MySQL',        icon: 'simple-icons:mysql' },
      { name: 'PostgreSQL',   icon: 'simple-icons:postgresql' },
      { name: 'SQL Server',   icon: 'simple-icons:microsoftsqlserver' },
    ],
  },

  {
    title: 'Herramientas y Ecosistema',
    icon: 'ph:wrench',
    items: [
      { name: 'Figma',   icon: 'simple-icons:figma' },
      { name: 'Postman', icon: 'simple-icons:postman' },
      { name: 'Canva',   icon: 'simple-icons:canva' },
    ],
  },

  {
    title: 'Infraestructura y despliegue',
    icon: 'ph:gear-six',
    items: [
      { name: 'Docker',           icon: 'simple-icons:docker' },
      { name: 'Git',              icon: 'simple-icons:git' },
      { name: 'GitHub',           icon: 'simple-icons:github' },
      { name: 'AWS Lambda',       icon: 'simple-icons:awslambda' },
      { name: 'Netlify (CI/CD)',  icon: 'simple-icons:netlify' },
    ],
  },
] as const satisfies readonly TechCategory[]

export default techstack



