// ~/types/project.ts
export interface Links { demo?: string; repo?: string }

export interface Project {
  slug: string
  title: string
  summary: string
  cover: string
  tech: readonly string[]
  links?: Links
  official?: boolean

  // extras para el modal
  type?: 'Cliente' | 'Personal' | 'Académico'
  role?: string
  features?: readonly string[]
  challenges?: string
  learnings?: string
}

// Un Project marcado como readonly completo (ideal para datos estáticos)
export type ProjectRO = Readonly<Project>
