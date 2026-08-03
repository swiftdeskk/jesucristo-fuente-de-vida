/** Datos globales de la iglesia. Un solo lugar para cambiarlos en todo el sitio. */

export const site = {
  name: 'Jesucristo Fuente de Vida',
  fullName: 'Jesucristo Fuente de Vida para Todas las Generaciones',
  tagline: 'Para Todas las Generaciones',
  url: 'https://jesucristofuentedevida.org',
  description:
    'Una iglesia comprometida con predicar el evangelio de Jesucristo a todas las generaciones.',
  address: {
    line1: 'Av. Lima 185, Huaral 15202',
    line2: 'Lima, Perú',
    full: 'Av. Lima 185, Huaral 15202, Lima, Perú',
    mapsUrl: 'https://maps.app.goo.gl/1WagWdjYSPv3ym5F7',
  },
  phone: {
    display: '+51 981 419 472',
    tel: '+51981419472',
    whatsapp: '51981419472',
  },
  email: 'iglesia.jcfv@gmail.com',
  office: {
    days: 'Martes a domingo',
    hours: '9:00 AM – 1:00 PM | 3:00 PM – 10:00 PM',
  },
  formspree: 'https://formspree.io/f/xkovbvqg',
}

export const whatsappLink = (mensaje) =>
  `https://wa.me/${site.phone.whatsapp}${mensaje ? `?text=${encodeURIComponent(mensaje)}` : ''}`

export const socials = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/jesucristofuentedevidahuaral',
    icon: 'facebook',
  },
  { name: 'Instagram', href: 'https://www.instagram.com/somosjfdvg/', icon: 'instagram' },
  { name: 'TikTok', href: 'https://www.tiktok.com/@somosjfdvg', icon: 'tiktok' },
]

/* Facebook no va en la barra principal: vive en el pie, y Blog ya enlaza a
   él. Siete entradas es el máximo que cabe cómodo en una laptop. */
export const navLinks = [
  { label: 'Inicio', to: '/' },
  { label: 'Quiénes Somos', to: '/nosotros' },
  { label: 'Soy Nuevo', to: '/nuevos' },
  { label: 'Ministerios', to: '/ministerios' },
  { label: 'Blog', to: '/blog' },
  { label: 'Donaciones', to: '/donaciones' },
  { label: 'Contacto', to: '/contacto' },
]

export const footerLinks = {
  rapidos: {
    title: 'Enlaces Rápidos',
    items: [
      { label: 'Quiénes Somos', to: '/nosotros' },
      { label: 'Ministerios', to: '/ministerios' },
      { label: 'Anexos', to: '/#anexos' },
      { label: 'Blog', to: '/blog' },
    ],
  },
  recursos: {
    title: 'Recursos',
    items: [
      { label: 'Soy Nuevo', to: '/nuevos' },
      { label: 'Donaciones', to: '/donaciones' },
      { label: 'Facebook', to: '/facebook' },
      { label: 'Contacto', to: '/contacto' },
    ],
  },
}

/** Mapas embebidos, uno por página (se conservan los tres originales). */
export const maps = {
  home: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3909.7635669498286!2d-77.2185934240372!3d-11.49697233190986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91068b551f061d85%3A0x3de02b02bf81fb89!2sIglesia%20Cristiana%20Jesucristo%20Fuente%20De%20Vida%20Para%20Todas%20Las%20Generaciones!5e0!3m2!1ses-419!2spe!4v1768841606537!5m2!1ses-419!2spe',
  nuevos:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d977.4412614358586!2d-77.21617376236566!3d-11.496865786052823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91068b551f061d85%3A0x3de02b02bf81fb89!2sIglesia%20Cristiana%20Jesucristo%20Fuente%20De%20Vida%20Para%20Todas%20Las%20Generaciones!5e0!3m2!1ses-419!2spe!4v1768859128097!5m2!1ses-419!2spe',
  contacto:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13150.710450653272!2d-77.23029412043329!3d-11.499418719542621!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91068b551f061d85%3A0x3de02b02bf81fb89!2sIglesia%20Cristiana%20Jesucristo%20Fuente%20De%20Vida%20Para%20Todas%20Las%20Generaciones!5e0!3m2!1ses-419!2spe!4v1768876722148!5m2!1ses-419!2spe',
}
