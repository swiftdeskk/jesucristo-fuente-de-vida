/**
 * Registro único de iconos.
 *
 * Sustituye a Font Awesome: en lugar de descargar una hoja de estilos y
 * varias fuentes completas desde un CDN, aquí solo se empaquetan los SVG
 * que el sitio realmente usa.
 */
import {
  ArrowRight,
  ArrowUp,
  Baby,
  Banknote,
  Book,
  BookMarked,
  BookOpen,
  Building2,
  Bus,
  CalendarDays,
  Car,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Church,
  Clock,
  Copy,
  Cross,
  DoorOpen,
  Download,
  ExternalLink,
  Eye,
  Flame,
  Footprints,
  HandCoins,
  HandHeart,
  Handshake,
  Heart,
  HeartHandshake,
  Home,
  Images,
  Info,
  Landmark,
  LayoutGrid,
  Loader2,
  Lock,
  LogOut,
  Mail,
  MapPin,
  Megaphone,
  Menu,
  Moon,
  Mountain,
  Music,
  Pencil,
  Phone,
  Plus,
  Quote,
  Rocket,
  Search,
  Send,
  Settings2,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Sun,
  Trash2,
  UploadCloud,
  UserPlus,
  Users,
  X,
  ZoomIn,
} from 'lucide-react'

/* --- Iconos de marca: lucide ya no incluye logotipos de terceros --- */

const Facebook = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.33-.04-1.55-.14-2.84-.14C12 2 10.5 3.66 10.5 6.7v2.8H8v4h2.5V22h3.5v-8.5Z" />
  </svg>
)

const Instagram = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12 2c2.72 0 3.06.01 4.12.06 1.07.05 1.8.22 2.43.46.66.26 1.22.6 1.77 1.16.56.55.9 1.11 1.16 1.77.24.63.41 1.36.46 2.43C21.99 8.94 22 9.28 22 12s-.01 3.06-.06 4.12c-.05 1.07-.22 1.8-.46 2.43a4.9 4.9 0 0 1-1.16 1.77c-.55.56-1.11.9-1.77 1.16-.63.24-1.36.41-2.43.46-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.07-.05-1.8-.22-2.43-.46a4.9 4.9 0 0 1-1.77-1.16 4.9 4.9 0 0 1-1.16-1.77c-.24-.63-.41-1.36-.46-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.07.22-1.8.46-2.43.26-.66.6-1.22 1.16-1.77.55-.56 1.11-.9 1.77-1.16.63-.24 1.36-.41 2.43-.46C8.94 2.01 9.28 2 12 2Zm0 1.8c-2.67 0-2.99.01-4.04.06-.98.04-1.5.2-1.86.34-.47.18-.8.4-1.15.75-.35.35-.57.68-.75 1.15-.14.36-.3.88-.34 1.86-.05 1.05-.06 1.37-.06 4.04s.01 2.99.06 4.04c.04.98.2 1.5.34 1.86.18.47.4.8.75 1.15.35.35.68.57 1.15.75.36.14.88.3 1.86.34 1.05.05 1.37.06 4.04.06s2.99-.01 4.04-.06c.98-.04 1.5-.2 1.86-.34.47-.18.8-.4 1.15-.75.35-.35.57-.68.75-1.15.14-.36.3-.88.34-1.86.05-1.05.06-1.37.06-4.04s-.01-2.99-.06-4.04c-.04-.98-.2-1.5-.34-1.86a3.1 3.1 0 0 0-.75-1.15 3.1 3.1 0 0 0-1.15-.75c-.36-.14-.88-.3-1.86-.34-1.05-.05-1.37-.06-4.04-.06Zm0 3.06a5.14 5.14 0 1 1 0 10.28 5.14 5.14 0 0 1 0-10.28Zm0 8.48a3.34 3.34 0 1 0 0-6.68 3.34 3.34 0 0 0 0 6.68Zm6.54-8.68a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0Z" />
  </svg>
)

const TikTok = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M16.6 5.82a4.28 4.28 0 0 1-1.06-2.82h-3.2v12.4a2.6 2.6 0 1 1-2.6-2.6c.27 0 .53.04.78.12V9.65a5.8 5.8 0 0 0-.78-.05 5.8 5.8 0 1 0 5.8 5.8V8.9a7.44 7.44 0 0 0 4.35 1.4V7.1a4.29 4.29 0 0 1-3.29-1.28Z" />
  </svg>
)

const WhatsApp = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.69 8.23-8.24 8.23Zm4.52-6.16c-.25-.13-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.41.09-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.22.25-.87.85-.87 2.07s.9 2.4 1.02 2.57c.12.16 1.75 2.67 4.25 3.74.59.26 1.06.41 1.42.52.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.19.21-.58.21-1.08.14-1.18-.06-.11-.22-.17-.47-.29Z" />
  </svg>
)

const PrayingHands = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M11 21V6.5a2 2 0 0 0-3.6-1.2L4 10.2a4 4 0 0 0-.8 2.4V17a4 4 0 0 0 4 4Z" />
    <path d="M13 21V6.5a2 2 0 0 1 3.6-1.2L20 10.2a4 4 0 0 1 .8 2.4V17a4 4 0 0 1-4 4Z" />
    <path d="M12 21v-9" />
  </svg>
)

/** Nombre usado en los archivos de datos → componente. */
const registry = {
  'arrow-right': ArrowRight,
  'arrow-up': ArrowUp,
  baby: Baby,
  banknote: Banknote,
  bible: BookMarked,
  book: Book,
  'book-open': BookOpen,
  building: Building2,
  bus: Bus,
  calendar: CalendarDays,
  car: Car,
  check: Check,
  'check-circle': CheckCircle2,
  'chevron-down': ChevronDown,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  church: Church,
  clock: Clock,
  copy: Copy,
  cross: Cross,
  'door-open': DoorOpen,
  download: Download,
  'external-link': ExternalLink,
  eye: Eye,
  facebook: Facebook,
  flame: Flame,
  'hand-coins': HandCoins,
  'hand-heart': HandHeart,
  handshake: Handshake,
  'hands-helping': HeartHandshake,
  heart: Heart,
  home: Home,
  images: Images,
  info: Info,
  instagram: Instagram,
  landmark: Landmark,
  loader: Loader2,
  lock: Lock,
  'log-out': LogOut,
  grid: LayoutGrid,
  mail: Mail,
  'map-pin': MapPin,
  megaphone: Megaphone,
  menu: Menu,
  moon: Moon,
  mountain: Mountain,
  music: Music,
  pencil: Pencil,
  phone: Phone,
  plus: Plus,
  'praying-hands': PrayingHands,
  quote: Quote,
  rocket: Rocket,
  search: Search,
  send: Send,
  settings: Settings2,
  shield: ShieldCheck,
  smartphone: Smartphone,
  sparkles: Sparkles,
  star: Star,
  sun: Sun,
  tiktok: TikTok,
  trash: Trash2,
  upload: UploadCloud,
  'user-plus': UserPlus,
  users: Users,
  walking: Footprints,
  whatsapp: WhatsApp,
  x: X,
  'zoom-in': ZoomIn,
}

/**
 * @param {{ name: string, className?: string, size?: number }} props
 */
export default function Icon({ name, className = 'size-5', ...rest }) {
  const Cmp = registry[name]
  if (!Cmp) {
    if (import.meta.env.DEV) console.warn(`[Icon] No existe el icono "${name}"`)
    return null
  }
  return <Cmp className={className} aria-hidden="true" {...rest} />
}

export { registry as iconRegistry }
