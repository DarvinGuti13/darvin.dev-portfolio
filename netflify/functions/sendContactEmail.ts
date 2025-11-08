// netlify/functions/sendContactEmail.ts
import { Resend } from 'Resend'
import type { Handler } from '@netlify/functions'

const resend = new Resend(process.env.RESEND_API_KEY)

// Opcional: restringí a tu dominio en prod
const ALLOW_ORIGIN = '*'

export const handler: Handler = async (event) => {
  // Preflight CORS
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders(), body: '' }
  }

  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, headers: corsHeaders(), body: 'Method Not Allowed' }
    }

    const body = safeJson(event.body)
    const name = clean(body.name)
    const email = clean(body.email)
    const subject = clean(body.subject)
    const message = clean(body.message)
    const honey = clean(body.honey)
    const since = Number(body.since ?? 0)

    // Anti-spam básicos
    if (honey) return json(400, { success: false, error: 'Spam detectado' })
    if (since && Date.now() - since < 1500)
      return json(400, { success: false, error: 'Demasiado rápido (posible bot)' })

    if (!name || !email || !subject || !message) {
      return json(400, { success: false, error: 'Faltan campos' })
    }

    const when = new Date().toLocaleString('es-CR', { timeZone: 'America/Costa_Rica' })
    const referer = event.headers['referer'] || ''
    const ua = event.headers['user-agent'] || ''

    const html = `
      <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial; max-width:680px;margin:0 auto;">
        <h2 style="color:#0f172a;margin:0 0 12px;">Nuevo mensaje – Portafolio</h2>
        <p style="margin:0 0 12px;color:#334155;">${escapeHtml(when)}</p>
        <div style="background:#f1f5f9;padding:16px;border-radius:10px;margin:12px 0;">
          <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          ${referer ? `<p><strong>Origen:</strong> ${escapeHtml(referer)}</p>` : ''}
        </div>
        <div style="background:#fff;padding:16px;border:1px solid #e5e7eb;border-radius:10px;">
          <h3 style="margin:0 0 8px;">Asunto</h3>
          <p style="margin:0 0 12px;">${escapeHtml(subject)}</p>
          <h3 style="margin:0 0 8px;">Mensaje</h3>
          <pre style="white-space:pre-wrap;margin:0;">${escapeHtml(message)}</pre>
        </div>
        <p style="margin-top:16px;color:#64748b;font-size:12px;">UA: ${escapeHtml(ua)}</p>
      </div>
    `

    const { data, error } = await resend.emails.send({
      // Mientras verificás dominio, usá onboarding@resend.dev
      from: 'Darvin Portfolio <onboarding@resend.dev>',
      to: ['darvinjafet13@gmail.com'], // Cambiá al correo destino que prefieras
      replyTo: email,
      subject: `Nuevo mensaje – ${subject} (de ${name})`,
      html
    })

    if (error) {
      console.error('[Resend] Error:', error)
      return json(500, { success: false, error: error.message })
    }

    return json(200, { success: true, data })
  } catch (err: any) {
    console.error('[Function] Error:', err)
    return json(500, { success: false, error: 'Error interno' })
  }
}

// Helpers
function json(statusCode: number, body: any) {
  return { statusCode, headers: corsHeaders(), body: JSON.stringify(body) }
}
function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': ALLOW_ORIGIN,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  }
}
function safeJson(body?: string | null) {
  try { return JSON.parse(body || '{}') } catch { return {} }
}
function clean(s?: string) {
  return (s || '').toString().trim()
}
function escapeHtml(str: string) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
}
