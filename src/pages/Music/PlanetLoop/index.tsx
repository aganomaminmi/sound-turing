import p5 from 'p5'
import { useRef, useEffect } from 'react'
import { Layout } from '@/components/Layout'
import { sketch } from '@/libs/turing-pattern'

export const PlanetLoop = () => {
  const target = useRef<HTMLDivElement>(null)
  const isFirst = useRef<boolean>(true)

  useEffect(() => {
    if (!target.current || target.current?.hasChildNodes()) {
      return
    }
    if (isFirst.current) {
      isFirst.current = false
    } else {
      return
    }
    new p5(sketch('/music-resource/planet-loop.mp3'), target.current)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout>
      <div ref={target} />
    </Layout>
  )
}
