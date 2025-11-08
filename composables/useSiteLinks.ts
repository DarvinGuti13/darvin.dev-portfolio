// composables/useSiteLinks.ts
export type NavLink = { label: string; icon: string; href: string }
export type SocialLink = { icon: string; href: string; title?: string }

const EMAIL = 'darvinjafet13@gmail.com'
const PHONE_E164 = '+50662044488'            
const PHONE_DISPLAY = '(+506) 6204 4488'      

const navLinks: Readonly<NavLink[]> = [
  { label: 'Home',       icon: 'ph:house',                href: '#home' },
  { label: 'About',      icon: 'ph:user',                 href: '#about' },
  { label: 'Tech Stack', icon: 'ph:toolbox',              href: '#techstack' },
  { label: 'Resume',     icon: 'ph:identification-card',  href: '#resumen' },
  { label: 'Projects',   icon: 'ph:folder',               href: '#projects' },
  { label: 'Contact',    icon: 'ph:envelope',             href: '#contact' }
] as const

const socialLinks: Readonly<SocialLink[]> = [
  { icon: 'ph:github-logo',   href: 'https://github.com/DarvinGuti13', title: 'GitHub' },
  { icon: 'ph:linkedin-logo', href: 'https://www.linkedin.com/in/darvin-gutierrez-altamirano-b733b3255/', title: 'LinkedIn' },
  { icon: 'ph:instagram-logo',href: 'https://www.instagram.com/darvin_guti13/', title: 'Instagram' }
] as const

function telHref(numE164: string) {
  return `tel:${numE164.replace(/\s+/g, '')}`
}
function emailHref(addr: string) {
  return `mailto:${addr}`
}
function makeWaLink(message: string) {
  // usa wa.me con número sin '+'
  const num = PHONE_E164.replace(/^\+/, '')
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`
}

export function useSiteLinks() {
  return {
    // contacto
    email: EMAIL,
    emailHref: emailHref(EMAIL),
    phoneDisplay: PHONE_DISPLAY,
    phoneHref: telHref(PHONE_E164),
    makeWaLink,

    // navegación y redes (nuevo)
    navLinks,
    socialLinks,
  }
}
