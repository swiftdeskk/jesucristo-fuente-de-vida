/** Contenido de la página de Inicio. */

export const hero = {
  title: 'Bienvenido a Tu Casa Espiritual',
  verse: {
    text: '"Jesús le dijo: Yo soy el camino, la verdad y la vida"',
    ref: '— Juan 14:6',
  },
  description: 'Un lugar donde todas las generaciones encuentran vida abundante en Cristo',
  image: '/images/hero-iglesia.jpg',
}

export const schedule = [
  {
    icon: 'sun',
    title: 'Culto Dominical',
    time: '10:30 AM & 7:00 PM',
    desc: 'Alabanza, adoración y predicación de la Palabra de Dios',
  },
  {
    icon: 'users',
    title: 'Reunión de Jóvenes',
    time: 'Sábado 4:00 PM',
    desc: 'Comunión y edificación para la nueva generación',
  },
  {
    icon: 'book-open',
    title: 'Escuelita Bíblica',
    time: 'Sábado 10:00 AM',
    desc: 'Enseñanza bíblica para niños y adolescentes con amor',
  },
]

export const aboutCards = [
  {
    icon: 'heart',
    title: 'Nuestra Misión',
    text: 'Compartir el amor de Cristo con todas las generaciones, formando discípulos que transformen sus familias y comunidades a través del evangelio.',
  },
  {
    icon: 'eye',
    title: 'Nuestra Visión',
    text: 'Ser una iglesia multigeneracional donde cada persona encuentre en Jesucristo la fuente de vida abundante, creciendo en fe y sirviendo con amor.',
  },
  {
    icon: 'bible',
    title: 'Nuestros Valores',
    text: 'Fe en Cristo, Amor genuino, Integridad bíblica, Comunidad familiar, Servicio desinteresado y Adoración sincera.',
  },
]

/** Cifras de la sección "Actualidad" de Nosotros, mostradas también en Inicio. */
export const stats = [
  { value: 100, suffix: '', label: 'Asistentes por culto', prefix: '' },
  { value: 8, suffix: '', label: 'Anexos activos', prefix: '' },
  { value: 5, suffix: '', label: 'Ministerios', prefix: '' },
  { value: 2, suffix: '', label: 'Cultos dominicales', prefix: '' },
]

export const anexos = [
  {
    zone: 'Zona Norte - Santa Rosa',
    items: [
      { name: 'Los Jardines', status: 'Activo' },
      { name: 'Doña Cecilia', status: 'Activo' },
      { name: 'Santa Anita', status: 'Activo' },
      { name: '9 de Octubre', status: 'Activo' },
    ],
  },
  {
    zone: 'Zona Sur',
    items: [
      { name: 'La Poza San Martín', status: 'Activo' },
      { name: 'Estrella de la Mañana', status: 'Activo' },
      { name: 'Macatón', status: 'Activo' },
      { name: 'Túpac Amaru', status: 'Activo' },
    ],
  },
]

export const testimonials = [
  {
    text: '"Llegué a esta iglesia buscando respuestas y encontré una familia. El amor de Cristo se siente en cada culto y mi vida ha sido transformada completamente."',
    name: 'María González',
    role: 'Miembro desde 2022',
    initial: 'M',
  },
  {
    text: '"Como joven, encontré un lugar donde puedo crecer espiritualmente y servir a Dios. Los líderes son inspiradores y el compañerismo es genuino."',
    name: 'Carlos Pérez',
    role: 'Ministerio de Jóvenes',
    initial: 'C',
  },
  {
    text: '"Mis hijos aman la Escuelita Bíblica y yo he crecido muchísimo en mi fe. Esta iglesia es un verdadero regalo de Dios para mi familia."',
    name: 'Ana Rodríguez',
    role: 'Miembro desde 2020',
    initial: 'A',
  },
]
