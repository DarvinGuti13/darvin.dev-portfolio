<script setup lang="ts">
import { computed, ref } from 'vue'

type Item = { name: string; icon: string }

const props = withDefaults(defineProps<{
  items: ReadonlyArray<Item>
  size?: number
  outerR?: number
  innerR?: number
  // Color ÚNICO para todas las porciones
  sectorColor?: string
  // (opcional) escala del icono al hover
  hoverScale?: number
}>(), {
  size: 280,
  outerR: 120,
  innerR: 64,
  sectorColor: '#373c49',   
  hoverScale: 1.06,
})

const cx = computed(() => props.size / 2)
const cy = computed(() => props.size / 2)

function polarToXY(cx:number, cy:number, r:number, angleDeg:number) {
  const rad = (angleDeg - 90) * Math.PI / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}
function arcPath(startA:number, endA:number, rOuter:number, rInner:number) {
  const large = endA - startA <= 180 ? 0 : 1
  const p1 = polarToXY(cx.value, cy.value, rOuter, startA)
  const p2 = polarToXY(cx.value, cy.value, rOuter, endA)
  const p3 = polarToXY(cx.value, cy.value, rInner, endA)
  const p4 = polarToXY(cx.value, cy.value, rInner, startA)
  return [
    `M ${p1.x} ${p1.y}`,
    `A ${rOuter} ${rOuter} 0 ${large} 1 ${p2.x} ${p2.y}`,
    `L ${p3.x} ${p3.y}`,
    `A ${rInner} ${rInner} 0 ${large} 0 ${p4.x} ${p4.y}`,
    'Z'
  ].join(' ')
}

const sectors = computed(() => {
  const n = Math.max(props.items.length, 1)
  const step = 360 / n
  const iconR = (props.innerR + props.outerR) / 2
  return props.items.map((it, i) => {
    const start = i * step
    const end = (i + 1) * step
    const mid = start + step / 2
    const { x, y } = polarToXY(cx.value, cy.value, iconR, mid)
    return { it, start, end, x, y, i }
  })
})

// Colores oficiales para el ícono (currentColor)
const brandColorByName: Record<string, string> = {
  HTML5: '#E34F26',
  CSS3: '#1572B6',
  JavaScript: '#F7DF1E',
  TypeScript: '#3178C6',
  'Vue 3': '#42B883',
  'Nuxt 3': '#00DC82',
  React: '#61DAFB',
  Angular: '#DD0031',
  'Tailwind CSS': '#06B6D4',
  Python: '#3776AB',
  Django: '#092E20',
  FastAPI: '#009688',
  Laravel: '#FF2D20',
  '.NET (C#)': '#512BD4',
  'Node.js': '#339933',
  MySQL: '#4479A1',
  PostgreSQL: '#4169E1',
  'SQL Server': '#CC2927',
  Figma: '#F24E1E',
  Postman: '#FF6C37',
  Canva: '#00C4CC',
  Docker: '#2496ED',
  Git: '#F05032',
  GitHub: '#181717',
  'AWS Lambda': '#FF9900',
  'Netlify (CI/CD)': '#00C7B7',
  Jira: '#0052CC',
  'Office 365': '#EA3E23',
  Scrum: '#2795C3',
  'Gestión de Proyectos': '#475569',
}
const brandColorFor = (name: string) => brandColorByName[name] || '#0F172A'

// Hover state (índice de la porción)
const hovered = ref<number | null>(null)
</script>

<template>
  <div class="relative" :style="{ width: size + 'px', height: size + 'px' }">
    <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`" class="block">
      <!-- borde exterior sutil -->
      <circle :cx="cx" :cy="cy" :r="outerR" fill="none" stroke="rgba(2,6,23,0.06)" stroke-width="1" />

      <!-- porciones (todas mismo color) con hover -->
      <g>
        <path
          v-for="s in sectors"
          :key="s.it.name + '-sector'"
          :d="arcPath(s.start, s.end, outerR, innerR)"
          :fill="props.sectorColor"
          :fill-opacity="hovered === s.i ? 0.35 : 0.18"   
          :stroke="props.sectorColor"
          :stroke-opacity="hovered === s.i ? 0.65 : 0.35" 
          stroke-width="1"
          style="cursor: pointer"
          @mouseenter="hovered = s.i"
          @mouseleave="hovered = null"
        />
      </g>
    </svg>

    <!-- iconos -->
    <div
      v-for="s in sectors"
      :key="s.it.name + '-icon'"
      class="absolute -translate-x-1/2 -translate-y-1/2 transition-transform"
      :style="{
        left: s.x + 'px',
        top: s.y + 'px',
        transform: `translate(-50%,-50%) scale(${hovered === s.i ? props.hoverScale : 1})`
      }"
    >
      <div
        class="inline-flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-black/10"
        style="background-color: white;"
        :title="s.it.name"
      >
        <Icon :name="s.it.icon" size="20" :style="{ color: brandColorFor(s.it.name) }" />
      </div>
    </div>

    <!-- centro decorativo -->
    <div
      class="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
             h-10 w-10 rounded-full ring-1 ring-black/10"
      style="background: rgba(255,255,255,0.7);"
    />
  </div>
</template>


