<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import type { ProjectRO } from '~/types/project'

interface Links { demo?: string; repo?: string }

const props = defineProps<{
  open: boolean
  project?: ProjectRO | null
}>()
const emit = defineEmits<{ (e: 'close'): void }>()

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
}
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="fixed inset-0 z-[100] flex items-start md:items-center justify-center">
      <!-- overlay -->
      <div class="absolute inset-0 bg-black/60 backdrop-blur-[2px]" @click="emit('close')" />

      <!-- modal (más delgado) -->
      <div
        role="dialog" aria-modal="true"
        class="relative mx-4 my-6 md:my-10 w-full md:w-[760px]
          max-h-[90vh] overflow-y-auto overscroll-contain
          rounded-2xl ring-1 ring-white/10 bg-slate-950 text-white shadow-2xl scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent"
      >
        <!-- header con cover -->
        <div class="relative">
          <img
            :src="project?.cover"
            :alt="project?.title"
            class="w-full aspect-[16/8] object-cover "
          />
          <button
            class="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full
                   bg-white/15 hover:bg-white/25 ring-1 ring-white/20"
            aria-label="Cerrar" @click="emit('close')">
            ✕
          </button>
        </div>

        <!-- contenido -->
        <div class="p-6 md:p-7">

            <!-- badges -->
          <div class="flex items-center gap-2">
            <span v-if="project?.type" class="text-[11px] px-2 py-0.5 rounded-full bg-cyan-500/10 ring-1 ring-cyan-500/30 text-cyan-300">
              {{ project?.type }}
            </span>
            <span v-if="project?.role" class="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/30 text-emerald-300">
              {{ project?.role }}
            </span>
          </div>
          
          <h3 class="mt-2 text-2xl font-semibold">{{ project?.title }}</h3>
          <p class="mt-2 text-slate-300 leading-relaxed">
            {{ project?.summary }}
          </p>

          <!-- Tecnologías -->
          <div v-if="project?.tech?.length" class="mt-6">
            <h4 class="text-sm font-semibold uppercase tracking-wide text-slate-300">Tecnologías utilizadas</h4>
            <ul class="mt-2 flex flex-wrap gap-2">
              <li v-for="t in project.tech" :key="t"
                  class="text-[11px] px-2.5 py-1 rounded-full bg-white/5 ring-1 ring-white/10">
                {{ t }}
              </li>
            </ul>
          </div>

          <!-- Características -->
          <div v-if="project?.features?.length" class="mt-6">
            <h4 class="text-sm font-semibold uppercase tracking-wide text-slate-300">Características principales</h4>
            <ul class="mt-2 list-disc ps-5 space-y-1 text-slate-200 text-sm">
              <li v-for="f in project.features" :key="f">{{ f }}</li>
            </ul>
          </div>

          <!-- Desafíos -->
          <div v-if="project?.challenges" class="mt-6">
            <h4 class="text-sm font-semibold uppercase tracking-wide text-slate-300">Desafíos</h4>
            <p class="mt-2 text-sm text-slate-200 leading-relaxed">{{ project.challenges }}</p>
          </div>

          <!-- Aprendizajes -->
          <div v-if="project?.learnings" class="mt-6">
            <h4 class="text-sm font-semibold uppercase tracking-wide text-slate-300">Aprendizajes</h4>
            <p class="mt-2 text-sm text-slate-200 leading-relaxed">{{ project.learnings }}</p>
          </div>

          <!-- CTA -->
          <div class="mt-7 flex flex-wrap gap-4">
            <a v-if="project?.links?.demo" :href="project.links.demo" target="_blank" rel="noopener"
               class="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-4 py-2 text-sm ring-1 ring-cyan-400/30 hover:bg-cyan-500">
              <Icon name="ph:globe" size="16" /> Sitio web oficial
              <Icon name="ph:arrow-up-right" size="14" />
            </a>
            <a v-if="project?.links?.repo" :href="project.links.repo" target="_blank" rel="noopener"
               class="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm ring-1 ring-white/15 hover:bg-white/15">
              <Icon name="ph:github-logo" size="16" /> Ver código
              <Icon name="ph:arrow-up-right" size="14" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

