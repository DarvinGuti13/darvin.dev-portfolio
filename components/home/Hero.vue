<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'


const appName = 'Darvin Gutiérrez'

// Palabras que rotan
const roles = ['Software Developer', 'Web Developer', 'Freelance'] as const

// Estado typewriter
const roleIndex = ref(0)
const charIndex = ref(0)
const isDeleting = ref(false)

// Palabra actual segura para TS
const currentWord = computed<string>(() => {
  const index = roleIndex.value % roles.length
  return roles[index] ?? ''
})
const displayed = computed(() => currentWord.value.slice(0, charIndex.value))

// Timings
const TYPE_SPEED = 70
const DELETE_SPEED = 45
const PAUSE_TYPED = 1100
const PAUSE_DELETED = 400

let timer: number | null = null
const tick = () => {
  const word = currentWord.value
  if (!isDeleting.value) {
    if (charIndex.value < word.length) {
      charIndex.value += 1
      timer = window.setTimeout(tick, TYPE_SPEED)
    } else {
      timer = window.setTimeout(() => {
        isDeleting.value = true
        tick()
      }, PAUSE_TYPED)
    }
  } else {
    if (charIndex.value > 0) {
      charIndex.value -= 1
      timer = window.setTimeout(tick, DELETE_SPEED)
    } else {
      roleIndex.value = (roleIndex.value + 1) % roles.length
      isDeleting.value = false
      timer = window.setTimeout(tick, PAUSE_DELETED)
    }
  }
}
onMounted(() => { timer = window.setTimeout(tick, 300) })
onBeforeUnmount(() => { if (timer) window.clearTimeout(timer) })


</script>

<template>
  <section id="home" class="relative min-h-[85vh] md:min-h-screen flex items-center text-white">
    <!-- Fondo -->
    <img src="/images/hero.webp" alt="Foto de fondo" class="absolute inset-0 w-full h-full object-cover" />
    <div class="absolute inset-0 bg-black/60" />

    <!-- Contenido alineado -->
    <div class="relative z-10 w-full mx-auto max-w-6xl px-4 md:px-6">
      <div class="md:max-w-3xl lg:max-w-4xl text-left md:-mt-6">
        <h1 class="text-4xl md:text-6xl font-heading font-bold drop-shadow-sm">
          {{ appName }}
        </h1>

        <!-- “I'm” estático + typewriter sin comillas -->
        <p class="mt-4 text-xl md:text-2xl font-medium text-white/90">
          I’m
          <span class="inline-flex items-baseline border-b-2 pb-1 border-[#2fb7b2]">
            <span class="whitespace-pre">{{ ' ' + displayed }}</span>
            <span
              class="inline-block w-[2px] h-[1.2em] ml-1 align-[-0.1em] bg-current animate-caret"
              aria-hidden="true"
            />
          </span>
        </p>

        <!-- CTAs -->
        <div class="mt-6 flex flex-wrap gap-3">
          <a
            href="#projects"
            class="inline-flex items-center rounded-xl bg-white/10 px-5 py-2.5 ring-1 ring-white/20 hover:bg-white/15"
          >
            Ver proyectos
          </a>
          <a
            href="#contact"
            class="inline-flex items-center rounded-xl bg-sidebar px-5 py-2.5 ring-1 ring-white/10 hover:brightness-110"
          >
            Contactame
          </a>
        </div>

        <!-- Accesibilidad -->
        <span class="sr-only" aria-live="polite">I’m {{ displayed }}</span>
      </div>
    </div>
  </section>
</template>






