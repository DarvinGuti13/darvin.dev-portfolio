<script setup lang="ts">
import ProjectCard from '~/components/projects/ProjectCard.vue'
import ProjectPreview from '~/components/projects/ProjectPreview.vue'
import projects from '~/data/projects'
import type { ProjectRO } from '~/types/project'

const open = ref(false)
const selected = ref<ProjectRO | null>(null)

function openPreview(p: ProjectRO) {
  selected.value = p
  open.value = true
}
function closePreview() { open.value = false; selected.value = null }
</script>

<template>
  <section class="mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-16">
    <h2 class="text-2xl md:text-3xl font-heading font-bold text-gray-900">Projects</h2>

    <div class="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <ProjectCard v-for="p in projects" :key="p.slug" :project="p" @preview="openPreview" />
    </div>

    <ProjectPreview :open="open" :project="selected" @close="closePreview" />
  </section>
</template>


