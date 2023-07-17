import p5 from 'p5'
import { useRef, useEffect } from 'react'
import { Layout } from '@/components/Layout'
import { sketch } from '@/libs/turing-pattern'
import { useParams } from 'react-router-dom'

export const Music: React.FC = () => {
  const params = useParams()

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
    if (!params.id) {
      return
    }
    function getFileUrl(name: string) {
      return `/music-resource/${name}.m4a`
    }
    const url = getFileUrl(params.id)

    console.log(params.id, url)

    new p5(sketch(url), target.current)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!params.id) {
    return <div>404</div>
  }

  return (
    <Layout>
      <div ref={target} />
    </Layout>
  )
}
