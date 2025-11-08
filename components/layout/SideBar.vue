<script setup lang="ts">
import { useSiteLinks } from '~/composables/useSiteLinks'

const { navLinks, socialLinks } = useSiteLinks()

const emit = defineEmits<{ (e: 'navigate'): void }>()
const year = new Date().getFullYear()
</script>

<template>
  <div class="flex flex-col h-full items-center py-6 overflow-y-auto">
    <!-- Avatar -->
    <div class="w-28 h-28 rounded-full overflow-hidden ring-4 ring-white/10">
      <img src="/images/profile.webp" alt="Foto de perfil" class="w-full h-full object-cover" />
    </div>

    <!-- Nombre -->
    <h1 class="mt-4 text-lg font-semibold text-white">Darvin Gutiérrez</h1>
    <!-- <p class="text-sm text-gray-400">Software Developer</p>-->

    <!-- Redes -->
    <div class="mt-4 flex gap-3">
      <a
        v-for="s in socialLinks"
        :key="s.href"
        :href="s.href"
        target="_blank"
        rel="noopener noreferrer"
        class="p-2 rounded-lg bg-white/5 hover:bg-brand-turquoise/20 transition-colors"
        :aria-label="s.title || 'Social link'"
      >
        <Icon :name="s.icon" size="18" />
      </a>
    </div>

    <!-- Divider -->
    <div class="w-4/5 h-px my-6 bg-white/10"></div>

    <!-- Menú -->
    <nav class="flex flex-col gap-2 w-full px-6 text-sm">
      <a
        v-for="l in navLinks"
        :key="l.href"
        :href="l.href"
        class="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
        @click="emit('navigate')"
      >
        <Icon :name="l.icon" size="18" />
        <span>{{ l.label }}</span>
      </a>
    </nav>

    <!-- Espaciador -->
    <div class="flex-1" />

    <!-- Footer pequeño -->
    <p class="text-xs text-gray-500 mt-6">© {{ year }} Darvin Gutiérrez</p>
  </div>
</template>

