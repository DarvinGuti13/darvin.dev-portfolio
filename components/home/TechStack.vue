<script setup lang="ts">
import { reactive } from 'vue'
import techstack from '~/data/techstack'
import TechWheel from '~/components/ui/TechWheel.vue'

// Estado del popover flotante
type Item = { name: string; icon: string; url?: string }
const pop = reactive({
  open: false,
  items: [] as readonly Item[],
  x: 0,
  y: 0,
  placement: 'bottom' as 'top' | 'bottom',
  size: 320,
  anchorEl: null as HTMLElement | null,   // 👈 ancla del wheel
  overlap: 0.7                            // 👈 más pegado (0.45 = se monta un poco más)
})

function computeWheelPosition(card: HTMLElement) {
  const rect = card.getBoundingClientRect()
  const vw = window.innerWidth
  const vh = window.innerHeight
  const size = pop.size
  const margin = 8

  // X centrado en el card
  let x = rect.left + rect.width / 2 - size / 2
  x = Math.max(margin, Math.min(x, vw - size - margin))

  // Intentar abajo, montando más sobre el card
  let placement: 'top' | 'bottom' = 'bottom'
  let y = rect.bottom - size * pop.overlap

  // Si no cabe abajo, ir arriba (también “montado”)
  if (y + size > vh - margin) {
    placement = 'top'
    y = rect.top - size * (1 - pop.overlap)
  }

  // Clamp vertical por seguridad
  y = Math.max(margin, Math.min(y, vh - size - margin))

  return { x: Math.round(x), y: Math.round(y), placement }
}


function openWheel(i: number, ev: MouseEvent) {
  const card =
    (ev.currentTarget as HTMLElement | null) ??
    ((ev.target as HTMLElement | null)?.closest('[data-card]') as HTMLElement | null)
  if (!card) return

  const cat = techstack[i] as (typeof techstack)[number] | undefined
  if (!cat) return

  pop.items = cat.items
  pop.anchorEl = card

  const pos = computeWheelPosition(card)
  pop.x = pos.x
  pop.y = pos.y
  pop.placement = pos.placement
  pop.open = true

  // Reposicionar al cambiar tamaño o al hacer scroll
  window.addEventListener('resize', handleReposition, { passive: true })
  window.addEventListener('scroll', handleReposition, { passive: true })
}

function handleReposition() {
  if (!pop.open || !pop.anchorEl) return
  const pos = computeWheelPosition(pop.anchorEl)
  pop.x = pos.x
  pop.y = pos.y
  pop.placement = pos.placement
}

function closeWheel() {
  pop.open = false
  pop.anchorEl = null
  window.removeEventListener('resize', handleReposition)
  window.removeEventListener('scroll', handleReposition)
}


</script>

<template>
  <section class="relative bg-white">
    <div class="mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-16">
      <h2 class="text-2xl md:text-3xl font-heading font-bold text-gray-900">
        Tech Stack
      </h2>

      <p class="mt-2 text-gray-600 md:text-lg">
        Mi stack principal. Uso diario + tecnologías que aplico según proyecto.
        </p>

      <!-- Grid de categorías -->
      <div class="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3 ">
        <button
          v-for="(cat, i) in techstack"
          :key="cat.title"
          type="button"
          data-card
          @click="(e) => openWheel(i, e)"
          class="text-left rounded-3xl overflow-hidden ring-1 ring-gray-200/60
                 bg-gradient-to-br from-gray-900 via-gray-900/90 to-gray-900/80
                 text-white p-6 md:p-7 focus:outline-none focus-visible:ring-2
                 focus-visible:ring-cyan-400 hover:shadow-md hover:-translate-y-[2px] hover:ring-gray-200"
        >
          <!-- ... -->
        <div class="flex items-center gap-4">
          <div class="h-12 w-12 rounded-2xl bg-white/10 ring-1 ring-white/15 flex items-center justify-center">
            <Icon :name="cat.icon || 'ph:star-four'" size="22" class="text-white/90" />
          </div>
          <h3 class="text-xl font-semibold drop-shadow-sm">{{ cat.title }}</h3>
        </div>
          <!-- ... -->


          <!-- “puntos” -->
          <div class="mt-5 flex gap-1.5">
            <span v-for="n in 5" :key="n" class="h-1.5 w-1.5 rounded-full"
                  :class="n <= Math.min(5, cat.items.length) ? 'bg-cyan-300' : 'bg-white/20'" />
          </div>
        </button>
      </div>
    </div>

    <!-- POPOVER flotante -->
    <Teleport to="body">
      <div v-if="pop.open">
        <!-- overlay para cerrar -->
        <div class="fixed inset-0 z-[60] bg-black/20 backdrop-blur-[1px]" @click="closeWheel" />
        <!-- contenedor del wheel -->
        <div class="fixed z-[70]" :style="{ left: pop.x + 'px', top: pop.y + 'px' }">
        <!-- Contenedor 100% transparente, sin ring -->
        <div class="rounded-3xl bg-transparent shadow-none p-2">
          <TechWheel
            :items="pop.items"
            :size="pop.size"
            :outerR="136"
            :innerR="76"
            sectorColor="#373c49"
          />
        </div>
</div>

      </div>
    </Teleport>
  </section>
</template>


