import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'motion/react'

/**
 * Cifra que cuenta desde 0 cuando entra en pantalla, una sola vez.
 *
 * El número real siempre está en el DOM dentro de un `sr-only`: la animación
 * es decorativa y se marca `aria-hidden`, así que un lector de pantalla (o
 * cualquier situación donde la animación no llegue a dispararse) anuncia
 * siempre el valor correcto y nunca un "0".
 */
export default function Counter({ value, duration = 2, prefix = '', suffix = '', className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.floor(v)),
    })
    return () => controls.stop()
  }, [inView, value, duration])

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{`${prefix}${value}${suffix}`}</span>
      <span aria-hidden="true">
        {prefix}
        {display}
        {suffix}
      </span>
    </span>
  )
}
