<script setup lang="ts">
import { useSiteLinks } from '~/composables/useSiteLinks'
const { email, emailHref, phoneDisplay, phoneHref, makeWaLink } = useSiteLinks()

const profile = {
  name: '¡Hola! soy Darvin Gutiérrez',
  headline: 'Fullstack Developer',
  summary:
    'Transformo ideas en soluciones web robustas y escalables. Combinando la potencia de Django + REST en el backend y frontend moderno con Vue.js / React.js, creando interfaces rápidas y bien diseñadas. Mi enfoque es desarrollar productos que no solo funcionen, sino que se sientan fluidos, intuitivos y pensados para el usuario.',
  photo: '/images/Profile.jpg',
  location: 'Costa Rica'
}

// Servicios 
const services = [
  {
    icon: 'ph:globe-hemisphere-west',
    title: 'Sitios web',
    blurb: 'Landing pages rápidas, claras y optimizadas.'
  },
  {
    icon: 'ph:plugs-connected',
    title: 'Integración de APIs',
    blurb: 'Conecto tu web con servicios externos (pagos, email, reservas, etc).'
  },
  {
  icon: 'ph:code-simple',
  title: 'Desarrollo a medida',
  blurb: 'Construyo funcionalidades específicas según lo que tu negocio necesita.'
  },
  {
    icon: 'ph:bag',
    title: 'E-commerce / Reservas',
    blurb: 'Checkout simple e intuitivo para mejorar ventas y conversiones.'
  },
  {
    icon: 'ph:rocket',
    title: 'Rendimiento y Velocidad',
    blurb: 'Optimizo carga, imágenes y assets para que tu web se sienta rápida.'
  },
  {
    icon: 'ph:wrench',
    title: 'Mantenimiento evolutivo',
    blurb: 'Actualizaciones, mejoras y soporte continuo.'
  }
] as const
</script>

<template>
  <section class="bg-white">
    <div class="mx-auto max-w-6xl px-4 md:px-6 py-10 md:py-14">
      <h2 class="text-2xl md:text-3xl font-heading font-bold text-gray-900">About</h2>

      <div class="mt-8 grid gap-8 md:grid-cols-12 md:items-start">
        <!-- Foto estable (evita saltos) -->
        <div class="md:col-span-4">
          <div class="rounded-3xl overflow-hidden ring-1 ring-black/10">
            <img
              :src="profile.photo"
              alt="Foto de {{ profile.name }}"
              class="block w-full object-cover"
              style="aspect-ratio: 3/4; min-height: 360px;"
              loading="eager"
              fetchpriority="high"
            />
          </div>

          <!-- Badges con vida -->
          <div class="mt-4 flex flex-wrap gap-2">
            <span
              class="relative isolate inline-flex items-center gap-2 text-xs rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 ring-1 ring-emerald-100 hover:shadow-sm transition"
            >
              <!-- dot animado -->
              <span class="relative flex h-2.5 w-2.5">
                <span class="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
                <span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
              </span>
              Disponible freelance
            </span>
            
             <span
              class="relative isolate inline-flex items-center gap-2 text-xs rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 ring-1 ring-emerald-100 hover:shadow-sm transition"
            >
              <!-- dot animado -->
              <span class="relative flex h-2.5 w-2.5">
                <span class="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
                <span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
              </span>
              Abierto a ofertas laborales
            </span>

            <span
              class="inline-flex items-center text-xs rounded-full bg-indigo-50 text-indigo-700 px-3 py-1 ring-1 ring-indigo-100 hover:brightness-110 transition"
            >
              Respuesta &lt; 24h
            </span>
            
          </div>
        </div>

        <!-- Col derecha ordenada -->
        <div class="md:col-span-8">
          <div class="space-y-6">
            <!-- Título + resumen -->
            <div class="space-y-3">
              <h3 class="text-xl md:text-2xl font-heading font-semibold text-gray-900">
                {{ profile.name }} · <span class="text-gray-600">{{ profile.headline }}</span>
              </h3>
              <p class="text-gray-700 text-justify leading-relaxed">
                {{ profile.summary }}
              </p>
            </div>

            <!-- Contacto en 2 columnas -->
            <div class="grid gap-3 sm:grid-cols-2">
              <div class="rounded-xl ring-1 ring-gray-100 bg-white p-3 flex items-start gap-3">
                <Icon name="ph:map-pin" size="18" class="text-gray-500 mt-0.5" />
                <div class="min-w-0">
                  <p class="text-xs text-gray-500">Ubicación</p>
                  <p class="text-sm font-medium text-gray-800 truncate">{{ profile.location }}</p>
                </div>
              </div>
              <a :href="emailHref" class="rounded-xl ring-1 ring-gray-100 bg-white p-3 hover:bg-gray-50 flex items-start gap-3">
                <Icon name="ph:envelope" size="18" class="text-gray-500 mt-0.5" />
                <div class="min-w-0">
                  <p class="text-xs text-gray-500">Email</p>
                  <p class="text-sm font-medium text-gray-800 truncate">{{ email }}</p>
                </div>
              </a>
              <a :href="phoneHref" class="rounded-xl ring-1 ring-gray-100 bg-white p-3 hover:bg-gray-50 flex items-start gap-3">
                <Icon name="ph:device-mobile" size="18" class="text-gray-500 mt-0.5" />
                <div class="min-w-0">
                  <p class="text-xs text-gray-500">Teléfono</p>
                  <p class="text-sm font-medium text-gray-800 truncate">{{ phoneDisplay }}</p>
                </div>
              </a>
              <a
                :href="makeWaLink('¡Hola Darvin! Me gustaría cotizar un proyecto.')"
                target="_blank"
                class="rounded-xl ring-1 ring-gray-100 bg-white p-3 hover:bg-gray-50 flex items-start gap-3"
              >
                <Icon name="ph:whatsapp-logo" size="18" class="text-gray-500 mt-0.5" />
                <div class="min-w-0">
                  <p class="text-xs text-gray-500">WhatsApp</p>
                  <p class="text-sm font-medium text-gray-800 truncate">Escríbeme ahora</p>
                </div>
              </a>
            </div>

            <!-- Servicios como mini-cards -->
            <div class="space-y-2">
              <p class="text-sm font-semibold text-gray-800">Servicios</p>

              <ul class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <li
                  v-for="s in services"
                  :key="s.title"
                  class="group rounded-2xl ring-1 ring-gray-100 bg-white p-4 transition
                         hover:shadow-md hover:-translate-y-[2px] hover:ring-gray-200"
                >
                  <div class="flex items-start gap-3">
                    <span
                      class="inline-flex h-10 w-10 items-center justify-center rounded-xl ring-1 ring-gray-200
                             bg-gradient-to-br from-white to-gray-50 group-hover:from-white group-hover:to-gray-100 transition"
                    >
                      <Icon :name="s.icon" size="20" class="text-gray-700" />
                    </span>
                    <div class="min-w-0">
                      <h4 class="text-sm font-semibold text-gray-900">{{ s.title }}</h4>
                      <p class="mt-1 text-xs text-gray-600 leading-relaxed">
                        {{ s.blurb }}
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>



