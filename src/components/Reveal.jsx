import { motion } from 'motion/react'

/**
 * Entrada al hacer scroll.
 *
 * Deliberadamente contenida: 10 px de desplazamiento y medio segundo. Una
 * animación se nota cuando acompaña la lectura, no cuando la interrumpe; los
 * desenfoques y los rebotes en cada tarjeta cansan a la tercera sección.
 */

const offsets = {
  up: { y: 10, x: 0 },
  down: { y: -10, x: 0 },
  left: { y: 0, x: -14 },
  right: { y: 0, x: 14 },
  none: { y: 0, x: 0 },
}

export const easeOut = [0.22, 1, 0.36, 1]

export function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.5,
  once = true,
  amount = 0.2,
  className,
  as = 'div',
  ...rest
}) {
  const { x, y } = offsets[direction] ?? offsets.up
  const Tag = motion[as] ?? motion.div

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: easeOut }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/** Contenedor que escalona la entrada de sus hijos `<StaggerItem>`. */
export function Stagger({
  children,
  className,
  delay = 0,
  step = 0.06,
  once = true,
  amount = 0.12,
  as = 'div',
  ...rest
}) {
  const Tag = motion[as] ?? motion.div

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: step, delayChildren: delay } },
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export function StaggerItem({ children, className, direction = 'up', as = 'div', ...rest }) {
  const { x, y } = offsets[direction] ?? offsets.up
  const Tag = motion[as] ?? motion.div

  return (
    <Tag
      className={className}
      variants={{
        hidden: { opacity: 0, x, y },
        show: { opacity: 1, x: 0, y: 0, transition: { duration: 0.5, ease: easeOut } },
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
