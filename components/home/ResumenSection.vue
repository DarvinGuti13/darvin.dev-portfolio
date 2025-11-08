<script setup lang="ts">
import experience from '~/data/experience';
import education from '~/data/education';
</script>

<template>
  <section id="resumen" class="bg-white">
    <div class="mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-16">
      <!-- Título + línea de valor -->
      <div class="flex items-baseline justify-between gap-4">
        <h2 class="text-2xl md:text-3xl font-heading font-bold text-gray-900">
          Resumen
        </h2>

        <a
          href="/cv/Darvin-Gutierrez-CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Abrir CV completo en una nueva pestaña"
          class="hidden sm:inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700
                font-semibold group"
        >
          <span class="underline decoration-transparent group-hover:decoration-current">
            Full Resumen
          </span>
          <Icon name="ph:arrow-up-right" size="18"
                class="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>

      <p class="mt-2 text-gray-600 md:text-lg text-justify">
        Desarrollo soluciones web enfocadas en performance, UX y mantenibilidad.
        Me gusta crear productos claros, rápidos y pensados para negocio: integraciones limpias, APIs bien estructuradas y frontends que se sienten fluidos.
      </p>

      <div class="mt-8 grid gap-12 md:grid-cols-2">
        <!-- Columna izquierda: Perfil + Educación -->
        <div class="space-y-10">
          <!-- Perfil Profesional (card) -->
          <section
            aria-labelledby="perfil-title"
            class="rounded-3xl bg-white/90 backdrop-blur-sm shadow-[0_10px_30px_rgba(0,0,0,0.06)] ring-1 ring-gray-100 p-6 md:p-7"
          >
            <h3 id="perfil-title" class="text-lg font-semibold text-gray-900">
              Perfil Profesional
            </h3>
            <p class="mt-2 text-gray-700 leading-relaxed text-justify">
              Mi enfoque es simple: software claro, rápido y fácil de mantener.
            </p>

            <!-- Highlights cortos (vende beneficios) -->
            <ul class="mt-4 grid gap-2 text-sm text-gray-700">
              <li class="flex items-start gap-2">
                <Icon name="ph:check-circle" class="mt-0.5 shrink-0 text-emerald-500" size="18" />
                Sitios Web rápidos y accesibles (buen performance web).
              </li>
              <li class="flex items-start gap-2">
                <Icon name="ph:check-circle" class="mt-0.5 shrink-0 text-emerald-500" size="18" />
                APIs REST bien diseñadas e integradas a servicios externos. 
              </li>
              <li class="flex items-start gap-2">
                <Icon name="ph:check-circle" class="mt-0.5 shrink-0 text-emerald-500" size="18" />
                Entregas iterativas con comunicación clara y feedback constante.
              </li>
            </ul>
          </section>

          <!-- Educación (timeline card) -->
          <section
            aria-labelledby="edu-title"
            class="rounded-3xl bg-white/90 backdrop-blur-sm shadow-[0_10px_30px_rgba(0,0,0,0.06)] ring-1 ring-gray-100 p-6 md:p-7"
          >
            <h3 id="edu-title" class="text-lg font-semibold text-gray-900">Educación</h3>

            <ol class="relative mt-5 ps-6">
              <li
                v-for="(e, i) in education"
                :key="i"
                class="mb-8 ms-2"
              >
                <!-- Bullet del timeline -->
                <span
                  class="absolute -start-[9px] mt-1 flex h-4 w-4 items-center justify-center rounded-full bg-white ring-2 ring-gray-900/90"
                >
                  <span class="h-2 w-2 rounded-full bg-gray-900/90"></span>
                </span>

                <h4 class="text-base font-semibold text-gray-900">{{ e.degree }}</h4>
                <p class="text-sm italic text-gray-600">{{ e.institution }}</p>
                <p class="text-sm text-gray-600">{{ e.period }}</p>
                <p class="mt-2 text-sm text-gray-700 leading-relaxed text-justify">{{ e.description }}</p>
              </li>
            </ol>
          </section>
        </div>

        <!-- Columna derecha: Experiencia (cards en timeline) -->
        <div
          aria-labelledby="exp-title"
          class="rounded-3xl bg-white/90 backdrop-blur-sm shadow-[0_10px_30px_rgba(0,0,0,0.06)] ring-1 ring-gray-100 p-6 md:p-7"
        >
          <h3 id="exp-title" class="text-lg font-semibold text-gray-900">Experiencia Profesional</h3>

          <ol class="relative mt-5 ps-6">
            <li v-for="(exp, i) in experience" :key="i" class="mb-10 ms-2">
              <!-- Bullet del timeline -->
              <span
                class="absolute -start-[9px] mt-1 flex h-4 w-4 items-center justify-center rounded-full bg-white ring-2 ring-gray-900/90"
              >
                <span class="h-2 w-2 rounded-full bg-gray-900/90"></span>
              </span>

              <div class="group rounded-2xl ring-1 ring-gray-100 bg-white/70 p-4 hover:bg-white hover:shadow-md transition">
                <h4 class="text-base font-semibold text-gray-900">
                  {{ exp.role }} · <span class="text-gray-600">{{ exp.company }}</span>
                </h4>
                <p class="text-sm text-gray-600">{{ exp.period }} — {{ exp.location }}</p>

                <p class="mt-2 text-sm text-gray-700 leading-relaxed text-justify">
                  {{ exp.summary }}
                </p>

                <ul v-if="exp.bullets?.length" class="mt-2 list-disc ps-5 text-gray-700 text-sm">
                  <li v-for="b in exp.bullets" :key="b">{{ b }}</li>
                </ul>

                <ul v-if="exp.tech?.length" class="mt-3 flex flex-wrap gap-2">
                  <li
                    v-for="t in exp.tech"
                    :key="t"
                    class="text-[11px] px-2.5 py-1 rounded-full bg-gray-900/5 text-gray-800 ring-1 ring-gray-900/10
                           hover:bg-gray-900/10 transition"
                  >
                    {{ t }}
                  </li>
                </ul>
              </div>
            </li>
          </ol>
                      <!-- Enlace a CV solo en mobile -->
            <div class="mt-4 sm:hidden">
              <a
                href="/cv/Darvin-Gutierrez-CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir CV completo en una nueva pestaña"
                class="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-semibold"
              >
                <span class="underline decoration-transparent hover:decoration-current">Full Resumen</span>
                <Icon name="ph:arrow-up-right" size="18"
                class="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
        </div>
      </div>
    </div>
  </section>
</template>

