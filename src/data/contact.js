/** Contenido de la página Contacto. */

export const contactCards = [
  {
    icon: 'map-pin',
    title: 'Visítanos',
    lines: ['Av. Lima 185, Huaral 15202', 'Lima, Perú'],
    action: {
      label: 'Ver en Google Maps',
      href: 'https://maps.app.goo.gl/1WagWdjYSPv3ym5F7',
      external: true,
      icon: 'external-link',
    },
  },
  {
    icon: 'phone',
    title: 'Llámanos',
    link: { label: '+51 981 419 472', href: 'tel:+51981419472' },
    note: 'Lun - Vie: 9:00 AM - 5:00 PM',
  },
  {
    icon: 'whatsapp',
    title: 'WhatsApp',
    link: { label: '+51 981 419 472', href: 'https://wa.me/51981419472', external: true },
    action: {
      label: 'Enviar Mensaje',
      href: 'https://wa.me/51981419472',
      external: true,
      icon: 'send',
    },
  },
  {
    icon: 'mail',
    title: 'Email',
    link: { label: 'iglesia.jcfv@gmail.com', href: 'mailto:iglesia.jcfv@gmail.com' },
    note: 'Respondemos lo antes posible',
  },
]

export const formFeatures = [
  'Respuesta en menos de 24 horas',
  'Atención personalizada',
  'Confidencialidad garantizada',
]

export const subjectOptions = [
  { value: '', label: 'Selecciona un asunto' },
  { value: 'informacion', label: 'Información General' },
  { value: 'visita', label: 'Quiero Visitar la Iglesia' },
  { value: 'ministerio', label: 'Unirme a un Ministerio' },
  { value: 'consejeria', label: 'Solicitar Consejería' },
  { value: 'evento', label: 'Consulta sobre Eventos' },
  { value: 'otro', label: 'Otro' },
]

export const directions = [
  {
    icon: 'car',
    title: 'En Auto',
    text: 'Estacionamiento disponible. Busca "Iglesia Jesucristo Fuente de Vida" en Waze o Google Maps.',
  },
  {
    icon: 'bus',
    title: 'En Transporte Público',
    text: 'Las líneas de transporte Trompito Santa Inés, Turismo Garcilazo y Nuevo Trompo pasan cerca. Desciende en la esquina del Coliseo Campeones de Huaral y camina dos cuadras.',
  },
  {
    icon: 'walking',
    title: 'A Pie',
    text: 'Desde la Plaza de Armas de Huaral, camina por la Av. Lima hacia el este y sigue recto hasta el n.º 185, donde está la iglesia; son unos 10 minutos a pie.',
  },
]

export const attentionSchedule = [
  { day: 'Lunes - Viernes', time: '9:00 AM - 5:00 PM', note: 'Oficina administrativa' },
  { day: 'Sábado', time: '9:00 AM - 6:00 PM', note: 'Solo con cita previa' },
  { day: 'Domingo', time: '9:00 AM - 9:00 PM', note: 'Días de culto' },
]
