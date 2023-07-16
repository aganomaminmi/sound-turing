import { useState } from 'react'

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false)
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {open && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            position: 'fixed',
            backgroundColor: 'black',
            padding: '20px',
            inset: '0',
            gap: '4px',
          }}
        >
          <a
            href="/music/one-more-time"
            style={{
              padding: '8px 12px',
              borderBottom: '1px solid white',
              color: 'white',
            }}
          >
            One More Time
          </a>
          <a
            href="/music/digital-love"
            style={{
              padding: '8px 12px',
              borderBottom: '1px solid white',
              color: 'white',
            }}
          >
            Digital Love
          </a>
          <a
            href="/music/voyager"
            style={{
              padding: '8px 12px',
              borderBottom: '1px solid white',
              color: 'white',
            }}
          >
            Voyager
          </a>
          <a
            href="/music/something-about-us"
            style={{
              padding: '8px 12px',
              borderBottom: '1px solid white',
              color: 'white',
            }}
          >
            Something about us
          </a>
          <a
            href="/music/face-to-face"
            style={{
              padding: '8px 12px',
              borderBottom: '1px solid white',
              color: 'white',
            }}
          >
            Face to face
          </a>
          <a
            href="/music/planet-loop"
            style={{
              padding: '8px 12px',
              borderBottom: '1px solid white',
              color: 'white',
            }}
          >
            Planet loop
          </a>
        </div>
      )}
      <main
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexGrow: 1,
        }}
      >
        {children}
      </main>
      <footer
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '60px',
          position: 'sticky',
          bottom: 0,
        }}
      >
        <button
          onClick={() => setOpen(!open)}
          style={{
            borderRadius: '999px',
            width: '40px',
            height: '40px',
            border: '5px solid cyan',
            appearance: 'none',
            zIndex: '1000',
          }}
        ></button>
      </footer>
    </div>
  )
}
