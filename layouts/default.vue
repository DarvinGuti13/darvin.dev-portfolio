<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import SideBar from '~/components/layout/SideBar.vue'

const isSidebarOpen = ref(false)
const closeSidebar = () => (isSidebarOpen.value = false)
const openSidebar  = () => (isSidebarOpen.value = true)

// Cerrar con ESC
function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape' && isSidebarOpen.value) closeSidebar()
}
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <div
    :class="[
      'flex min-h-dvh bg-white text-gray-800',
      isSidebarOpen ? 'overflow-hidden md:overflow-visible' : ''
    ]"
  >
    <!-- Sidebar -->
    <aside
      id="app-sidebar"
      :class="[
        'fixed inset-y-0 left-0 z-40 w-72 bg-sidebar text-white transition-transform duration-300',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        'md:translate-x-0' // siempre visible en >= md
      ]"
      aria-label="Sidebar de navegación"
    >
      <SideBar @navigate="closeSidebar" />
    </aside>

    <!-- Overlay (solo mobile) -->
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 z-30 bg-black/40 md:hidden"
      @click="closeSidebar"
      aria-hidden="true"
    />

    <!-- Botón menú flotante (solo mobile) -->
    <button
  type="button"
  :aria-label="isSidebarOpen ? 'Cerrar menú' : 'Abrir menú'"
  :aria-expanded="isSidebarOpen"
  aria-controls="app-sidebar"
  class="md:hidden fixed left-3 top-3 z-50 inline-flex h-10 w-10 items-center justify-center
         rounded-xl bg-[#040b14]/80 text-white backdrop-blur
         ring-1 ring-white/10 shadow-lg shadow-black/20
         transition hover:bg-[#040b14]/90 active:scale-95
         focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
  @click="isSidebarOpen = !isSidebarOpen"
>
  <Icon :name="isSidebarOpen ? 'ph:x' : 'ph:list'" size="20" />
</button>

    <!-- Contenido -->
    <div class="relative flex-1 md:ml-72">
      <!-- Página -->
      <main class="scroll-smooth overflow-x-hidden">
        <slot />
      </main>
    </div>
  </div>
</template>


