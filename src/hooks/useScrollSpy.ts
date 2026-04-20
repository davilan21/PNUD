import { useEffect, useState } from 'react'

export function useScrollSpy(ids: string[], rootMargin = '-40% 0px -40% 0px') {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const observers = ids.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { rootMargin }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [ids, rootMargin])

  return active
}
