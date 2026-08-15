export interface LinkItem {
  href: string
  label: string
}

export interface Objective {
  title: string
  description: string
}

export interface SpeciesBenefit {
  title: string
  description: string
}

export interface InstitutionContact {
  name: string
  department: string
  address: string
  phone: string
  email: string
  hours: string
}

export interface GlobalMetrics {
  treesPlanted: number
  treesGoal: number
  municipalitiesBenefited: number
  deliveryPointsActive: number
}

export interface PlantationSite {
  id: string
  species: string
  speciesType: string
  municipality: string
  quantity: number
  plantingDate: string
  coordinates: [number, number]
  photo?: string
}

export const plantations: PlantationSite[] = [
  {
    id: 'sitio-merida-paseo-montejo',
    species: 'Flamboyán',
    speciesType: 'Floral',
    municipality: 'Mérida',
    quantity: 180,
    plantingDate: '2025-05-12',
    coordinates: [20.9674, -89.6235], // TODO_OFICIAL: coordenadas exactas del sitio
    photo: '', // TODO_OFICIAL: ruta de imagen oficial
  },
  {
    id: 'sitio-valladolid-centro',
    species: 'Ciricote',
    speciesType: 'Buena sombra',
    municipality: 'Valladolid',
    quantity: 45,
    plantingDate: '2025-04-03',
    coordinates: [20.6895, -88.2019], // TODO_OFICIAL: coordenadas exactas del sitio
  },
  {
    id: 'sitio-tizimin-parque',
    species: 'Yaaxnik',
    speciesType: 'Buena sombra',
    municipality: 'Tizimín',
    quantity: 60,
    plantingDate: '2025-03-18',
    coordinates: [21.1424, -88.1503], // TODO_OFICIAL: coordenadas exactas del sitio
  },
  {
    id: 'sitio-izamal-camino-real',
    species: 'Chaká',
    speciesType: 'Floral',
    municipality: 'Izamal',
    quantity: 30,
    plantingDate: '2025-06-01',
    coordinates: [20.9328, -88.8774], // TODO_OFICIAL: coordenadas exactas del sitio
  },
  {
    id: 'sitio-progreso-calle-80',
    species: 'Uva de mar',
    speciesType: 'Barrera costera',
    municipality: 'Progreso',
    quantity: 25,
    plantingDate: '2025-02-20',
    coordinates: [21.2822, -89.6636], // TODO_OFICIAL: coordenadas exactas del sitio
  },
  {
    id: 'sitio-motul-escuela',
    species: 'Tsalam',
    speciesType: 'Buena sombra',
    municipality: 'Motul',
    quantity: 55,
    plantingDate: '2025-07-14',
    coordinates: [21.0961, -89.2826], // TODO_OFICIAL: coordenadas exactas del sitio
  },
  {
    id: 'sitio-tekax-municipio',
    species: 'Flamboyán',
    speciesType: 'Floral',
    municipality: 'Tekax',
    quantity: 90,
    plantingDate: '', // TODO_OFICIAL: fecha de siembra pendiente de confirmar
    coordinates: [20.2057, -89.2827], // TODO_OFICIAL: coordenadas exactas del sitio
  },
]

export const municipalityFilterOptions: string[] = Array.from(
  new Set(plantations.map((p) => p.municipality)),
)

export const speciesTypeFilterOptions: string[] = Array.from(
  new Set(plantations.map((p) => p.speciesType)),
)

export interface DeliveryPoint {
  id: string
  name: string
  municipality: string
  address: string
  schedule: string
  coordinates: [number, number]
  stockStatus: 'suficiente' | 'limitada' | 'agotada' // TODO_OFICIAL: stock real de cada punto
  rainySeasonDemand: 'alta' | 'baja' // TODO_OFICIAL: demanda según época de lluvias
  isNursery: boolean
}

export const deliveryPoints: DeliveryPoint[] = [
  {
    id: 'vivero-merida-xmatkuil',
    name: 'Vivero Xmatkuil',
    municipality: 'Mérida',
    address: 'Calle 21 s/n, Xmatkuil', // TODO_OFICIAL: dirección oficial del vivero
    schedule: 'Lunes a viernes 8:00 a 15:00 hrs', // TODO_OFICIAL: horario oficial
    coordinates: [20.7967, -89.683], // TODO_OFICIAL: coordenadas exactas del vivero
    stockStatus: 'suficiente',
    rainySeasonDemand: 'alta',
    isNursery: true,
  },
  {
    id: 'vivero-tizimin-ramon',
    name: 'Vivero Ramón Osorio',
    municipality: 'Tizimín',
    address: 'Km 3 carretera a Panabá', // TODO_OFICIAL: dirección oficial del vivero
    schedule: '', // TODO_OFICIAL: horario oficial del vivero
    coordinates: [21.1346, -88.1588], // TODO_OFICIAL: coordenadas exactas del vivero
    stockStatus: 'limitada',
    rainySeasonDemand: 'alta',
    isNursery: true,
  },
  {
    id: 'centro-entrega-motul',
    name: 'Centro de Entrega Motul',
    municipality: 'Motul',
    address: 'Calle 18 Centro', // TODO_OFICIAL: dirección oficial del punto
    schedule: 'Lunes y jueves 9:00 a 14:00 hrs', // TODO_OFICIAL: horario oficial
    coordinates: [21.0958, -89.2842], // TODO_OFICIAL: coordenadas exactas del punto
    stockStatus: 'agotada',
    rainySeasonDemand: 'baja',
    isNursery: false,
  },
  {
    id: 'centro-entrega-izamal',
    name: 'Centro de Entrega Izamal',
    municipality: 'Izamal',
    address: 'Calle 24 s/n, colonia Centro', // TODO_OFICIAL: dirección oficial del punto
    schedule: 'Martes a sábado 9:00 a 13:00 hrs', // TODO_OFICIAL: horario oficial
    coordinates: [20.9307, -88.8763], // TODO_OFICIAL: coordenadas exactas del punto
    stockStatus: 'suficiente',
    rainySeasonDemand: 'baja',
    isNursery: false,
  },
]

export const requestorTypes = ['escuela', 'ayuntamiento', 'sociedad'] as const

export type RequestorType = (typeof requestorTypes)[number]

export interface RequestorField {
  key: string
  label: string
  required: boolean
}

export const requestorFieldMap: Record<RequestorType, RequestorField[]> = {
  escuela: [
    {
      key: 'escuelaNombre',
      label: 'Nombre de la escuela',
      required: true,
    },
    { key: 'nivelEducativo', label: 'Nivel educativo', required: true },
    { key: 'cct', label: 'Clave de Centro de Trabajo (CCT)', required: true },
    { key: 'municipio', label: 'Municipio', required: true },
    {
      key: 'directorResponsable',
      label: 'Director(a) responsable',
      required: true,
    },
    {
      key: 'cantidadEstimada',
      label: 'Cantidad estimada de árboles',
      required: true,
    },
  ],
  ayuntamiento: [
    {
      key: 'ayuntamientoNombre',
      label: 'Nombre del ayuntamiento / comité',
      required: true,
    },
    { key: 'municipio', label: 'Municipio', required: true },
    {
      key: 'autoridadResponsable',
      label: 'Autoridad responsable',
      required: true,
    },
    {
      key: 'cantidadEstimada',
      label: 'Cantidad estimada de árboles',
      required: true,
    },
  ],
  sociedad: [
    {
      key: 'nombrePersona',
      label: 'Nombre de la persona',
      required: true,
    },
    {
      key: 'organizacion',
      label: 'Organización / colectivo (opcional)',
      required: false,
    },
    { key: 'telefono', label: 'Teléfono de contacto', required: true },
    { key: 'correo', label: 'Correo electrónico', required: true },
    { key: 'municipio', label: 'Municipio', required: true },
    {
      key: 'predioComunidad',
      label: 'Predio o comunidad donde se sembrará',
      required: true,
    },
    {
      key: 'cantidadEstimada',
      label: 'Cantidad estimada de árboles',
      required: true,
    },
  ],
}

export const institution = {
  name: 'Secretaría de Desarrollo Sustentable',
  shortName: 'SDS',
  programName: 'Renacimiento Verde',
  state: 'Gobierno del Estado de Yucatán',
}

export const hero = {
  kicker: institution.state,
  title: 'Renacimiento Verde',
  subtitle:
    'Estrategia estatal para visibilizar la reforestación, promover la transparencia comunitaria sobre los árboles sembrados y facilitar la solicitud y entrega de especies nativas a ayuntamientos, escuelas y sociedad civil.',
}

export const navLinks: LinkItem[] = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#que-es', label: '¿Qué es?' },
  { href: '#objetivos', label: 'Objetivos' },
  { href: '#beneficios', label: 'Especies nativas' },
]

export const accessibilityLinks: LinkItem[] = [
  { href: '#accesibilidad', label: 'Accesibilidad' },
  { href: '#aviso-privacidad', label: 'Aviso de Privacidad' },
]

export const about = {
  title: '¿Qué es Renacimiento Verde?',
  body: [
    `Es la estrategia de reforestación estatal impulsada por la ${institution.name} (${institution.shortName}) del ${institution.state}. Su propósito es visibilizar cada árbol sembrado con transparencia, acercar especies nativas a la comunidad y fortalecer la cobertura vegetal mediante la participación ciudadana e institucional.`,
    'Busca integrar la evidencia de los avances en un espacio público, confiable y de fácil acceso para toda la ciudadanía.',
  ],
}

export const objectives: Objective[] = [
  {
    title: 'Visibilizar la reforestación',
    description:
      'Reportar de forma transparente los avances del programa y el impacto ambiental de cada árbol sembrado.',
  },
  {
    title: 'Promover la participación comunitaria',
    description:
      'Involucrar a ayuntamientos, escuelas y sociedad civil en la solicitud, cuidado y seguimiento de los árboles.',
  },
  {
    title: 'Facilitar el acceso a especies nativas',
    description:
      'Entregar especies locales adecuadas al clima yucateco mediante puntos de entrega claros y sencillos.',
  },
  {
    title: 'Fortalecer la cobertura vegetal',
    description:
      'Contribuir a la conservación de la biodiversidad y a la mitigación del cambio climático en el estado.',
  },
]

export const speciesBenefits: SpeciesBenefit[] = [
  {
    title: 'Resiliencia al clima local',
    description:
      'Las especies nativas están adaptadas al clima y suelo de Yucatán, lo que favorece su supervivencia y un riego eficiente.',
  },
  {
    title: 'Biodiversidad y hábitat',
    description:
      'Atraen y sostienen fauna nativa como aves, insectos polinizadores y especies endémicas de la región.',
  },
  {
    title: 'Sombra y confort urbano',
    description:
      'Reducen el calor en espacios públicos y escolares, mejorando la calidad de vida de las comunidades.',
  },
  {
    title: 'Conservación del suelo y el agua',
    description:
      'Sus raíces ayudan a prevenir la erosión y a captar agua de lluvia, favoreciendo la recarga natural.',
  },
]

export const contact: InstitutionContact = {
  name: institution.name,
  department: 'Dirección de Renacimiento Verde', // TODO_OFICIAL: confirmar dirección responsable
  address: '', // TODO_OFICIAL: dirección oficial de la SDS
  phone: '', // TODO_OFICIAL: teléfono de contacto oficial
  email: '', // TODO_OFICIAL: correo institucional oficial
  hours: '', // TODO_OFICIAL: horario de atención oficial
}

export const footer = {
  copyright: `${institution.state} — ${institution.programName}`,
}

export const metrics: GlobalMetrics = {
  treesPlanted: 12500, // TODO_OFICIAL: cifra real de árboles sembrados
  treesGoal: 50000, // TODO_OFICIAL: meta estatal de siembra
  municipalitiesBenefited: 45, // TODO_OFICIAL: municipios beneficiados
  deliveryPointsActive: 18, // TODO_OFICIAL: puntos de entrega activos
}
