/**
 * Publicaciones del blog.
 *
 * Estos datos son el RESPALDO empaquetado: el sitio intenta cargar primero
 * `/data/posts.json` (el archivo que edita el panel /admin) y, si no existe
 * o falla, usa esta copia. Para regenerar el JSON a partir de este archivo:
 * `node scripts/export-posts.mjs`.
 */

export const categories = [
  { id: 'all', label: 'Todas', icon: 'grid' },
  { id: 'anuncios', label: 'Anuncios', icon: 'megaphone' },
  { id: 'eventos', label: 'Eventos', icon: 'calendar' },
  { id: 'devocionales', label: 'Devocionales', icon: 'book-open' },
]

/** Etiqueta en singular que se muestra en la insignia de cada tarjeta. */
export const categoryBadge = {
  anuncios: { label: 'Anuncio', icon: 'megaphone' },
  eventos: { label: 'Evento', icon: 'calendar' },
  devocionales: { label: 'Devocional', icon: 'book-open' },
}

export const defaultBlogData = {
  version: 1,
  featuredId: 'fe-en-accion-campeones',
  posts: [
    {
      id: 'fe-en-accion-campeones',
      category: 'eventos',
      image: '/images/blog/fe-en-accion-campeones.jpg',
      alt: 'Equipo Fe en Acción, campeón del Campamento Boy Scout',
      title: 'Fe en Acción: campeones del Campamento Boy Scout por decisión unánime',
      date: '1 de Agosto 2026',
      author: 'Ministerio de Jóvenes',
      readingTime: '1 min lectura',
      excerpt:
        '¡El equipo Fe en Acción se llevó el primer lugar de nuestro Campamento de Jóvenes Boy Scout, y lo hizo por decisión unánime! A lo largo de los tres días demostraron compañerismo, entrega y un espíritu de servicio que se notó en cada prueba y en cada momento de convivencia. Más allá del trofeo, celebramos lo que su nombre representa: una generación que aprendió a trabajar unida y a poner su fe en acción. Felicitaciones al equipo campeón y a cada joven que participó con todo el corazón.',
    },
    {
      id: 'campamento-boy-scout',
      category: 'eventos',
      image: '/images/blog/campamento-boy-scout.jpg',
      alt: 'Campamento de Jóvenes Boy Scout',
      title: 'Campamento de Jóvenes Boy Scout: Siempre Listos para Servir a Dios',
      date: '30 de Julio al 1 de Agosto 2026',
      author: 'Ministerio de Jóvenes',
      readingTime: '2 min lectura',
      excerpt:
        'Del 30 de julio al 1 de agosto vivimos nuestro Campamento de Jóvenes con temática Boy Scout: tres días de convivencia, aventura y búsqueda de Dios. Bajo el lema de estar «siempre listos», nuestros jóvenes fueron desafiados a mantenerse firmes en la fe, atentos a la voz del Señor y dispuestos a servir a quien lo necesite. Entre dinámicas de equipo, tiempos de enseñanza y momentos de adoración, Dios trató con cada corazón de una manera personal. Agradecemos al Señor por estos días y a cada joven, líder y familia que hizo posible este campamento.',
    },
    {
      id: 'escuelita-superheroes',
      category: 'eventos',
      image: '/images/escuelita-superheroes.jpg',
      alt: 'Jesús es mi Superhéroe - Escuelita Bíblica',
      title: '"Jesús es mi Superhéroe": Un culto especial con la Escuelita Bíblica',
      date: 'Abril 2026',
      author: 'Ministerio de Niños',
      readingTime: '2 min lectura',
      excerpt:
        'Vivimos un culto dominical muy especial junto a las profesoras y niños de nuestra Escuelita Bíblica. Con el tema "Jesús es mi Superhéroe", los pequeños se disfrazaron de sus personajes favoritos para recordar que el verdadero héroe de sus vidas es Jesucristo. Fue una tarde llena de alegría, creatividad y la presencia de Dios, donde cada niño pudo celebrar su fe de una manera única y memorable.',
    },
    {
      id: 'olimpiadas-juveniles',
      category: 'eventos',
      image: '/images/blog/olimpiadas-jovenes.jpg',
      alt: 'Olimpiadas Juveniles',
      date: '31 de Enero 2026',
      author: 'Ministerio de Jóvenes',
      title: 'Olimpiadas Juveniles: Un Día de Fe, Unidad y Diversión',
      excerpt:
        'El pasado 31 de enero realizamos nuestras Olimpiadas Juveniles, una jornada especial donde nuestros jóvenes compartieron juegos, dinámicas y momentos de compañerismo. A través de cada actividad también sembramos la Palabra de Dios, recordando cuánto nos fortalece Jesús en nuestra vida diaria.',
    },
    {
      id: 'mujeres-de-fe',
      category: 'eventos',
      image: '/images/blog/reunion-damas-abril.jpg',
      alt: 'Reunión de Damas - Mujeres de Fe',
      date: '10 de Abril 2026',
      author: 'Ministerio de Mujeres',
      title: 'Mujeres de Fe: Una noche de comunión y propósito',
      excerpt:
        'Vivimos una hermosa reunión en la que mujeres de todas las edades se unieron para compartir, adorar y escuchar la Palabra de Dios. Fue una noche llena del Espíritu Santo donde cada corazón fue tocado y renovado. Gracias a cada mujer que estuvo presente y a Dios por lo que hizo en medio de nosotras.',
    },
    {
      id: 'visita-adultos-mayores',
      category: 'eventos',
      image: '/images/visita-adultos-mayores.jpg',
      alt: 'Visita a adultos mayores',
      date: 'Abril 2026',
      author: 'Ministerio de Ayuda Social',
      title: 'Visitando a nuestros adultos mayores: amor en acción',
      excerpt:
        'Jóvenes de nuestra iglesia visitaron un hogar de adultos mayores para compartir tiempo, cariño y el amor de Cristo con quienes más lo necesitan. Fue un momento profundo de servicio y gratitud, recordándonos que honrar a los mayores es honrar a Dios. ¡Seguimos sirviendo con amor!',
    },
    {
      id: 'retiro-de-mujeres',
      category: 'eventos',
      image: '/images/blog/retiro-mujeres.jpg',
      alt: 'Retiro de Mujeres',
      date: '15 de Febrero 2026',
      author: 'Ministerio de Mujeres',
      title: 'Retiro de Mujeres: Un encuentro con Dios que transformó corazones',
      excerpt:
        'Vivimos un tiempo hermoso en nuestro Retiro de Mujeres, lleno de adoración, Palabra y comunión. Fueron días donde Dios habló a cada corazón, renovando fuerzas y afirmando propósitos. Agradecemos a Dios por cada mujer que participó y por todo lo que Él hizo en medio de nosotras.',
    },
    {
      id: 'dia-de-la-amistad',
      category: 'eventos',
      image: '/images/blog/dia-amistad.jpg',
      alt: 'Día de la Amistad',
      date: '14 de Febrero 2026',
      author: 'Ministerio de Jóvenes',
      title: 'Día de la Amistad: Celebrando el amor y la comunidad en Cristo',
      excerpt:
        'Celebramos juntos el Día de la Amistad en un ambiente lleno de alegría, gratitud y el amor de Dios. Fue un tiempo especial para fortalecer lazos, compartir en comunidad y recordar que la verdadera amistad encuentra su fundamento en Cristo. Gracias a todos los que nos acompañaron en esta hermosa celebración.',
    },
    {
      id: 'retiro-de-jovenes',
      category: 'eventos',
      image: '/images/blog/retiro-jovenes.jpg',
      alt: 'Retiro de Jóvenes',
      date: '18 Enero 2026',
      author: 'Ministerio de Jóvenes',
      title: 'Retiro de Jóvenes: Días que marcaron nuestra generación',
      excerpt:
        'Vivimos un tiempo especial en nuestro Retiro de Jóvenes, donde fuimos ministrados por la presencia de Dios, fortalecidos en la Palabra y unidos como generación. Fueron días de adoración, enseñanza y decisiones que transformaron vidas. Agradecemos a Dios por todo lo que hizo y por lo que seguirá haciendo en nuestros jóvenes.',
    },
    {
      id: 'retiro-jovenes-fin-de-semana',
      category: 'eventos',
      image: '/images/blog/post-1.jpg',
      alt: 'Retiro de Jóvenes',
      date: '18 Ene 2026',
      author: 'Ministerio de Jóvenes',
      title: 'Retiro de Jóvenes: Un Fin de Semana con Dios',
      excerpt:
        'Los jóvenes de nuestra iglesia vivieron un fin de semana inolvidable en nuestro retiro anual, donde compartimos tiempos de oración, enseñanzas bíblicas y momentos de convivencia que fortalecieron nuestra amistad y fe. Cada actividad fue una oportunidad para acercarnos más a Dios y renovar nuestro compromiso de seguirle con pasión y propósito.',
    },
    {
      id: 'cupos-ministerios',
      category: 'anuncios',
      image: '/images/blog/post-4.jpg',
      alt: 'Apertura de cupos en ministerios',
      date: '17 Ene 2026',
      author: 'Administración',
      title: 'Cupos abiertos en todos nuestros ministerios',
      excerpt:
        'Hemos abierto nuevos cupos para que puedas unirte a cualquiera de nuestros ministerios y servir con tus dones y talentos. Creemos que cada persona tiene un propósito especial dentro del cuerpo de Cristo, y este es el momento ideal para involucrarte, crecer espiritualmente y ser parte activa de lo que Dios está haciendo en nuestra iglesia.',
    },
    {
      id: 'noche-de-adoracion',
      category: 'eventos',
      image: '/images/blog/post-5.jpg',
      alt: 'Noche de adoración',
      date: '17 Ene 2026',
      author: 'Ministerio de Alabanza',
      title: 'Noche de Adoración: Un Encuentro Especial',
      excerpt:
        'Vivimos una noche gloriosa de adoración donde la presencia de Dios se manifestó de una manera especial en cada corazón. A través de la alabanza, la oración y la comunión como iglesia, experimentamos paz, restauración y un renovado deseo de buscar más del Señor. Sin duda, fue un encuentro que marcó nuestras vidas.',
    },
    {
      id: 'navidad-ninos',
      category: 'eventos',
      image: '/images/blog/post-3.jpg',
      alt: 'Navidad con los niños',
      date: '25 Dic 2025',
      author: 'Ministerio de Jóvenes',
      title: 'Jóvenes llevando alegría a los niños en Navidad',
      excerpt:
        'Nuestro Ministerio de Jóvenes visitó a varios niños para compartir regalos, sonrisas y el mensaje del amor de Jesús. Fue una jornada llena de alegría y servicio, donde pudimos bendecir a muchas familias y demostrar que pequeños actos de bondad pueden llevar esperanza y luz a quienes más lo necesitan.',
    },
    {
      id: 'fidelidad-de-dios',
      category: 'devocionales',
      image: '/images/blog/post-2.jpg',
      alt: 'Devocional',
      date: '21 Dic 2025',
      author: 'Pastor',
      title: 'La Fidelidad de Dios en Tiempos Difíciles',
      excerpt:
        'Cuando atravesamos momentos complicados, es fácil dudar, pero este devocional nos recuerda que Dios permanece fiel en todo tiempo. Aun en medio de las pruebas, Su amor nos sostiene y nos fortalece. Aprendemos a confiar plenamente en Él, sabiendo que nunca nos abandona y siempre cumple Sus promesas.',
    },
  ],
}
