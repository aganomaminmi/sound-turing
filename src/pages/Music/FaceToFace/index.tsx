import p5 from 'p5'
import { useRef, useEffect } from 'react'
import { Layout } from '@/components/Layout'
import { sketch } from '@/libs/turing-pattern'

export const FaceToFace = () => {
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
    new p5(sketch('/music-resource/face_to_face.m4a'), target.current)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout>
      <div ref={target} />
    </Layout>
  )
}
