import { useState } from 'react'

export default function useDelayed() {
  const [currentTimeout, setCurrentTimeout] = useState<NodeJS.Timeout | null>(
    null,
  )

  function runDelayedFn(fn: () => void, ms: number) {
    if (currentTimeout) clearTimeout(currentTimeout)
    setCurrentTimeout(setTimeout(fn, 1))
  }

  return [runDelayedFn]
}
