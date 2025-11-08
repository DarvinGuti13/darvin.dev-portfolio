<script setup lang="ts">
import { reactive, computed, ref, onMounted } from 'vue'
import { useSiteLinks } from '~/composables/useSiteLinks'

const { email, emailHref, phoneDisplay, phoneHref, makeWaLink } = useSiteLinks()

type Form = {
  name: string
  from: string
  subject: string
  message: string
  honey?: string          // anti-spam (campo oculto)
  since?: number | null   // anti-bot (latencia mínima)
}

const form = reactive<Form>({
  name: '',
  from: '',
  subject: '',
  message: '',
  honey: '',
  since: null
})

const touched = reactive({ name: false, from: false, subject: false, message: false })
const sending = ref(false)
const sent = ref<null | 'ok' | 'err'>(null)

onMounted(() => (form.since = Date.now()))

const errors = computed(() => {
  const e: Record<string, string> = {}
  if (!form.name.trim()) e.name = 'Requerido'
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.from)) e.from = 'Email inválido'
  if (!form.subject.trim()) e.subject = 'Requerido'
  if (!form.message.trim()) e.message = 'Requerido'      // ❗ sin mínimo ni máximo
  if (form.honey?.length) e.honey = 'Spam detectado'
  if (form.since && Date.now() - form.since < 1500) e.since = 'Muy rápido (posible bot)'
  return e
})
const isValid = computed(() => Object.keys(errors.value).length === 0)

function onKeydown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'enter') {
    e.preventDefault()
    onSubmit()
  }
}

function resetSoft() {
  form.name = ''
  form.from = ''
  form.subject = ''
  form.message = ''
  form.honey = ''
  form.since = Date.now()
  touched.name = touched.from = touched.subject = touched.message = false
}

async function onSubmit() {
  touched.name = touched.from = touched.subject = touched.message = true
  sent.value = null
  if (!isValid.value) return
  if (form.honey) return

  sending.value = true
  try {
    const resp = await fetch('/.netlify/functions/sendContactEmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        email: form.from,
        subject: form.subject,
        message: form.message,
        honey: form.honey,
        since: form.since
      })
    })
    const json = await resp.json()
    if (!resp.ok || !json?.success) throw new Error(json?.error || 'Error')
    sent.value = 'ok'
    resetSoft()
  } catch (e) {
    console.error(e)
    sent.value = 'err'
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <section class="bg-white">
    <div class="mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-16">
      <header class="max-w-3xl">
        <h2 class="text-2xl md:text-3xl font-heading font-bold text-gray-900">
          Contact
        </h2>
        <p class="mt-2 text-gray-600">
          Cuentame tu idea y te respondo con una propuesta clara (alcance, tiempos y costo).
        </p>
      </header>

      <div class="mt-8 grid gap-10 md:grid-cols-2">
        <!-- Formulario -->
        <form
          class="group rounded-3xl bg-white ring-1 ring-gray-100 p-6 md:p-8 relative overflow-hidden"
          @submit.prevent="onSubmit"
          @keydown="onKeydown"
          novalidate
        >
          <!-- halo decorativo -->
          <div
            aria-hidden="true"
            class="pointer-events-none absolute -inset-px rounded-[1.6rem] bg-[radial-gradient(1200px_400px_at_10%_-10%,rgba(4,11,20,0.06),transparent)]"
          />

          <!-- honeypots -->
          <input v-model="form.honey" type="text" class="hidden" tabindex="-1" autocomplete="off" />
          <input v-model="form.since" type="hidden" />

          <!-- banners -->
          <div v-if="sent === 'ok'" class="mb-4 rounded-xl bg-green-50 text-green-800 px-4 py-3 text-sm">
            !Mensaje enviado correctamente!. Te contactare en breve. 
          </div>
          <div v-if="sent === 'err'" class="mb-4 rounded-xl bg-red-50 text-red-800 px-4 py-3 text-sm">
            No se pudo enviar. Escribime directo a <a :href="emailHref" class="underline">{{ email }}</a>.
          </div>

          <div class="grid gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Nombre</label>
              <input
                v-model.trim="form.name"
                @blur="touched.name = true"
                type="text"
                required
                autocomplete="name"
                class="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-[#040b14]/30"
                placeholder="Tu nombre"
                aria-describedby="err-name"
              />
              <p id="err-name" v-if="touched.name && errors.name" class="mt-1 text-xs text-red-600">{{ errors.name }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <input
                v-model.trim="form.from"
                @blur="touched.from = true"
                type="email"
                inputmode="email"
                required
                autocomplete="email"
                class="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-[#040b14]/30"
                placeholder="tu@correo.com"
                aria-describedby="err-from"
              />
              <p id="err-from" v-if="touched.from && errors.from" class="mt-1 text-xs text-red-600">{{ errors.from }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Asunto</label>
              <input
                v-model.trim="form.subject"
                @blur="touched.subject = true"
                type="text"
                required
                class="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-[#040b14]/30"
                placeholder="Quiero hablar sobre…"
                aria-describedby="err-subject"
              />
              <p id="err-subject" v-if="touched.subject && errors.subject" class="mt-1 text-xs text-red-600">{{ errors.subject }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Mensaje</label>
              <textarea
                v-model="form.message"
                @blur="touched.message = true"
                rows="6"
                required
                class="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-[#040b14]/30"
                placeholder="Contame del proyecto, objetivos, plazos y/o links de referencia…"
                aria-describedby="err-message"
              ></textarea>
              <p id="err-message" v-if="touched.message && errors.message" class="mt-1 text-xs text-red-600">{{ errors.message }}</p>
            </div>
          </div>

          <div class="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              :disabled="sending || !isValid"
              class="inline-flex items-center gap-2 rounded-xl bg-[#040b14] px-5 py-2.5 text-white transition enabled:hover:opacity-90 disabled:opacity-60"
            >
              <Icon name="ph:paper-plane-tilt" size="18" />
              {{ sending ? 'Enviando…' : 'Enviar' }}
            </button>
          </div>

          <!-- Accesibilidad -->
          <p class="sr-only" aria-live="polite">
            {{ sending ? 'Enviando mensaje' : (isValid ? 'Formulario listo para enviar' : 'Hay errores en el formulario') }}
          </p>
        </form>

        <!-- Datos de contacto / confianza -->
        <aside class="rounded-3xl bg-white ring-1 ring-gray-100 p-6 md:p-8">
          <h3 class="text-lg font-semibold text-gray-900">Trabajemos juntos</h3>

          <ul class="mt-5 space-y-3 text-gray-700">
            <li class="flex items-center gap-3">
              <Icon name="ph:envelope" size="18" class="text-gray-500" />
              <a :href="emailHref" class="hover:underline">{{ email }}</a>
            </li>
            <li class="flex items-center gap-3">
              <Icon name="ph:device-mobile" size="18" class="text-gray-500" />
              <a :href="phoneHref" class="hover:underline">{{ phoneDisplay }}</a>
            </li>
            <li class="flex items-center gap-3">
              <Icon name="ph:whatsapp-logo" size="18" class="text-gray-500" />
              <a
                :href="makeWaLink('¡Hola Darvin! Me gustaría cotizar un proyecto web.')"
                target="_blank"
                class="hover:underline"
              >WhatsApp</a>
            </li>
          </ul>

          <p class="mt-6 text-xs text-gray-500">
            Al enviar, aceptás ser contactado por email o WhatsApp con fines de cotización. Sin spam.
          </p>
        </aside>
      </div>
    </div>
  </section>
</template>


