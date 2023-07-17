import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HelloReact from './pages/HelloReact'
import { AudioAPI } from './pages/AudioAPI'
import { AudioAPIDraft } from './pages/AudioAPIDraft'
import { TuringPattern } from './pages/TuringPattern'
import { TuringSound } from './pages/TuringSound'
import { FFTPage } from './pages/FFT'
import { DigitalLove } from './pages/Music/DigitalLove'
import { OneMoreTime } from './pages/Music/OneMoreTime'
import { SomethingAboutUs } from './pages/Music/SomethingAboutUs'
import { Voyager } from './pages/Music/Voyager'
import { FaceToFace } from './pages/Music/FaceToFace'
import { PlanetLoop } from './pages/Music/PlanetLoop'
import { Music } from './pages/Music'


export const RoutesProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HelloReact />} />
        <Route path="/audio-api" element={<AudioAPI />} />
        <Route path="/audio-api-draft" element={<AudioAPIDraft />} />
        <Route path="/turing" element={<TuringPattern />} />
        <Route path="/turing-sound" element={<TuringSound />} />
        <Route path="/fft" element={<FFTPage />} />
        <Route path="/music" >
          <Route path=":id" element={<Music />} />
          <Route path="digital-love" element={<DigitalLove />} />
          <Route path="one-more-time" element={<OneMoreTime />} />
          <Route path="voyager" element={<Voyager />} />
          <Route path="something-about-us" element={<SomethingAboutUs />} />
          <Route path="face-to-face" element={<FaceToFace />} />
          <Route path="planet-loop" element={<PlanetLoop />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
