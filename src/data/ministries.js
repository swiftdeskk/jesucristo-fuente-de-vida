/** Los cinco ministerios, con el detalle completo de la página Ministerios. */

export const ministries = [
  {
    id: 'ninos',
    icon: 'baby',
    name: 'Niños',
    title: 'Ministerio de Niños',
    short:
      'Formando la fe de los más pequeños con amor, enseñanza bíblica y actividades divertidas que los acercan a Jesús.',
    desc: 'Formando la fe de los más pequeños con amor, enseñanza bíblica y actividades divertidas que los acercan a Jesús desde temprana edad.',
    image: '/images/ministerios/ninos.jpg',
    accent: 'brand',
    features: [
      'Escuelita Bíblica Sabatina',
      'Actividades recreativas y educativas',
      'Campamentos y retiros infantiles',
      'Memorización de versículos',
    ],
    scheduleLabel: 'Horarios:',
    schedule: [{ strong: 'Sábado:', text: '10:00 AM - Escuelita Bíblica' }],
  },
  {
    id: 'jovenes',
    icon: 'rocket',
    name: 'Jóvenes',
    title: 'Ministerio de Jóvenes',
    short:
      'Preparando a la nueva generación para un encuentro real con Cristo y desarrollando líderes del mañana.',
    desc: 'Preparando a la nueva generación para un encuentro real con Cristo y desarrollando líderes comprometidos con el reino de Dios.',
    image: '/images/ministerios/jovenes.jpg',
    accent: 'iris',
    features: [
      'Reuniones semanales dinámicas',
      'Discipulado y mentorías',
      'Retiros y conferencias juveniles',
      'Eventos evangelísticos',
    ],
    scheduleLabel: 'Horarios:',
    schedule: [{ strong: 'Sábado:', text: '4:00 PM - Reunión de Jóvenes' }],
  },
  {
    id: 'alabanza',
    icon: 'music',
    name: 'Alabanza',
    title: 'Ministerio de Alabanza',
    short:
      'Adorando a Dios en espíritu y en verdad, llevando su presencia a través de la música y el canto congregacional.',
    desc: 'Adorando a Dios en espíritu y en verdad, llevando su presencia a través de la música y el canto congregacional en cada servicio.',
    image: '/images/ministerios/alabanza.jpg',
    accent: 'gold',
    features: [
      'Coro de voces',
      'Equipo de músicos e instrumentistas',
      'Ensayos y capacitación musical',
      'Adoración en todos los servicios',
    ],
    scheduleLabel: 'Ensayos y servicios:',
    schedule: [
      { strong: '', text: 'Los tiempos de ensayo y ministración se establecen y comunican cada semana.' },
    ],
  },
  {
    id: 'ayuda-social',
    icon: 'hands-helping',
    name: 'Ayuda Social',
    title: 'Ministerio de Ayuda Social',
    short:
      'Extendiendo el amor de Cristo a los más necesitados mediante acciones concretas de servicio y apoyo.',
    desc: 'Extendiendo el amor de Cristo a los más necesitados mediante acciones concretas de servicio, apoyo y solidaridad con nuestra comunidad.',
    image: '/images/visita-adultos-mayores.jpg',
    accent: 'emerald',
    features: [
      'Distribución de alimentos',
      'Visitas a hogares necesitados',
      'Apoyo a familias en crisis',
      'Campañas de donación',
    ],
    scheduleLabel: 'Jornadas sociales:',
    schedule: [
      {
        strong: '',
        text: 'Cada semana se coordinan las actividades según las necesidades de la comunidad.',
      },
    ],
  },
  {
    id: 'encargados',
    icon: 'shield',
    name: 'Encargados',
    title: 'Ministerio de Encargados',
    short:
      'Líderes comprometidos con el orden, la seguridad y el bienestar de cada persona que visita nuestra iglesia.',
    desc: 'Líderes comprometidos con el orden, la seguridad y el bienestar de cada persona que visita nuestra iglesia, sirviendo con excelencia.',
    image: '/images/ministerios/encargados.jpg',
    accent: 'rose',
    features: [
      'Recepción y bienvenida',
      'Orden en los servicios',
      'Seguridad del templo',
      'Asistencia a visitantes',
    ],
    scheduleLabel: 'Servicio:',
    schedule: [{ strong: 'Sábado:', text: '6:00 PM - Servicio general' }],
  },
]

export const ministriesIntro = {
  title: 'Sirviendo Juntos en la Obra de Dios',
  text: 'En nuestra iglesia creemos que cada persona tiene dones y talentos únicos que Dios le ha dado para servir. Nuestros ministerios son espacios donde puedes descubrir tu llamado, desarrollar tus habilidades y hacer una diferencia en la vida de otros mientras creces espiritualmente.',
  verse: {
    text: '"Cada uno según el don que ha recibido, minístrelo a los otros, como buenos administradores de la multiforme gracia de Dios."',
    ref: '— 1 Pedro 4:10',
  },
}
