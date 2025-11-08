<script setup lang="ts">
import { ref } from 'vue'
import type { ProjectRO } from '~/types/project'

interface Links { demo?: string; repo?: string }
interface Project {
  slug: string
  title: string
  summary: string
  cover: string
  tech: readonly string[]
  links?: Links
}

const props = defineProps<{ project: ProjectRO }>()
const emit = defineEmits<{ (e: 'preview', p: ProjectRO): void }>()


// Imagen con fallback
const imgSrc = ref(props.project.cover)
function onImgError() { imgSrc.value = '/images/fallback-cover.jpg' }
</script>

<template>
  <article
    class="group relative rounded-3xl overflow-hidden bg-white/80 backdrop-blur-sm
           ring-1 ring-gray-100 hover:ring-gray-200 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]
           transition-all cursor-pointer"
    @click="emit('preview', project)"
  >
    <!-- Imagen (usa contain para logos, cámbialo a cover si tus portadas son fotos) -->
    <div class="relative">
      <img
        :src="imgSrc" :alt="project.title"
        class="w-full aspect-[4/3] md:aspect-video object-contain bg-white p-2
               transition-transform duration-300 group-hover:scale-[1.01]"
        loading="lazy" @error="onImgError"
      />
    </div>

    <!-- Contenido -->
    <div class="relative z-20 p-5 md:p-6">
      <h3 class="text-lg md:text-[1.15rem] font-semibold text-gray-900 tracking-tight">
        {{ project.title }}
      </h3>
      <p class="mt-2 text-sm text-gray-700 leading-relaxed line-clamp-3 min-h-[3.5rem]">
        {{ project.summary }}
      </p>

      <ul class="mt-3 flex flex-wrap gap-2">
        <li v-for="t in project.tech" :key="t"
            class="text-[11px] px-2.5 py-1 rounded-full bg-gray-900/5 text-gray-800 ring-1 ring-gray-900/10">
          {{ t }}
        </li>
      </ul>

      <!-- Enlaces (no propagan el click, así no cierran/abren modal) -->
      <div class="mt-4 flex items-center gap-5 text-sm">
        <a v-if="project.links?.demo" :href="project.links.demo" target="_blank" rel="noopener"
           class="inline-flex items-center gap-1.5 text-cyan-700 hover:text-cyan-800"
           @click.stop>
          <Icon name="ph:globe" size="16" /> Sitio web oficial
          <Icon name="ph:arrow-up-right" size="14" class="opacity-80" />
        </a>

        <a v-if="project.links?.repo" :href="project.links.repo" target="_blank" rel="noopener"
           class="inline-flex items-center gap-1.5 text-gray-700 hover:text-gray-900"
           @click.stop>
          <Icon name="ph:github-logo" size="16" /> Repo
          <Icon name="ph:arrow-up-right" size="14" class="opacity-70" />
        </a>
      </div>
    </div>
  </article>
</template>



