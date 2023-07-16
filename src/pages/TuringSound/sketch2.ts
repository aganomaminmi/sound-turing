import { BeatDetect } from '@/libs/beat-detect'
import p5 from 'p5'
import 'p5/lib/addons/p5.sound'

let volumeSlider: p5.Element // 音量のスライド
let speedSlider: p5.Element // 再生速度のスライド
let playButton: p5.Element
let fft: p5.FFT // FFTオブジェクト
let sound: p5.SoundFile
const sliderWidth = 100
let kickDetector: BeatDetect

const n = 100
const m = 4

const round = (num: number) => Math.round(num * 1000) / 1000

type Grid = { u: number; v: number };

const grids: Grid[][] = Array.from({ length: n + 2 }, () =>
  Array.from({ length: n + 2 }, () => ({ u: 1, v: 0 }))
)
const next: Grid[][] = Array.from({ length: n + 2 }, () =>
  Array.from({ length: n + 2 }, () => ({ u: 1, v: 0 }))
)

let dt = 3.0
const h = 0.2
const h2: number = h * h
let a = 0.024
let b = 0.078
const Cu = 0.002
const Cv = 0.001

const canvas = m * n


export const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(canvas, canvas)
    p.background('#FFCC00')
    p.noStroke()

    playButton = p.createButton('Play')
    playButton.position(p.windowWidth - 80, p.windowHeight - 44)
    playButton.style('background-color', p.color(30))
    playButton.style('font', '18px')
    playButton.style('border', 'none')
    playButton.style('border-radius', '20px')
    playButton.style('padding', '8px 16px')
    playButton.style('z-index', '9999')
    playButton.style('color', p.color(200))
    playButton.mousePressed(() => {
      togglePlay()
    })

    volumeSlider = p.createSlider(0, sliderWidth, sliderWidth / 2)
    volumeSlider.position(p.windowWidth - 150, p.windowHeight - 130)

    speedSlider = p.createSlider(0, sliderWidth, sliderWidth / 2)
    speedSlider.position(p.windowWidth - 150, p.windowHeight - 100)


    fft = new p5.FFT()

    kickDetector = new BeatDetect('kick')
  }


  p.draw = () => {
    display() //描画処理
    boundary() // 境界条件の処理
    update() // 描画に関わらない処理
    fftDo()
  }

  const fftDo = () => {
    fft.analyze()

    const low = fft.getEnergy(10, 300)
    const high = fft.getEnergy(300, 20000)

    a = round(p.map(low, 0, 255, 0.01, 0.03))
    b = round(p.map(high, 0, 255, 0.05, 0.12))

    const targetVol = fft.getEnergy(10, 20000)
    const level = p.map(
      targetVol,
      0,
      200,
      0,
      4
    )
    const highWeight = p.map(high, 0, 225, 0, 0.3)
    dt = p.constrain(round(level * (1 + highWeight)), 0, 5)

    const kick = kickDetector.update(fft)
    if (kick.isBeat) {
      mutation(p.random(0, canvas), p.random(0, canvas))
    }

    const volume = p.map(Number(volumeSlider.value()), 0, 100, 0, 1) // 音量の変数を定義
    sound.setVolume(volume) // 音量を決定
    const speed = p.map(Number(speedSlider.value()), 0, sliderWidth, 0.5, 1.5) // 再生速度の変数を定義
    sound.rate(speed) // 再生速度を決定
  }

  p.preload = () => {

    // sound = p.loadSound('./src/assets/planet-loop.mp3') // 音声データを読み込む
    sound = p.loadSound('./src/assets/degital_love.m4a') // 音声データを読み込む
    // sound = p.loadSound('./src/assets/one_more_time.m4a') // 音声データを読み込む
  }

  const display = () => {
    for (let x = 1; x <= n; x++) {
      for (let y = 1; y <= n; y++) {
        const { u, v } = grids[x][y]
        // p.fill(u * 255, 100, v * 255)
        p.fill(255 - (p.constrain(p.map(v - u / 2, 0, 0.5, 0, 225), 0, 255)), 255, 255)
        p.rect((x - 1) * m, (y - 1) * m, m, m)
      }
    }
    p.fill(0)
    p.textSize(16)
    p.text(`dt: ${dt}`, 10, 20)
    p.text(`a / b: ${a} / ${b}`, 100, 20)
  }

  const update = () => {
    for (let x = 1; x <= n; x++) {
      for (let y = 1; y <= n; y++) {
        const { u: currentU, v: currentV } = grids[x][y]

        const above = grids[x - 1][y]
        const below = grids[x + 1][y]
        const right = grids[x][y + 1]
        const left = grids[x][y - 1]

        const Du = (above.u + below.u + left.u + right.u - 4 * currentU) / h2
        const Dv = (above.v + below.v + left.v + right.v - 4 * currentV) / h2

        const f = -currentU * currentV * currentV + a * (1 - currentU)
        const g = currentU * currentV * currentV - b * currentV

        next[x][y] = {
          u: round(currentU + (Cu * Du + f) * dt),
          v: round(currentV + (Cv * Dv + g) * dt),
        }
      }
    }

    for (let x = 1; x <= n; x++) {
      for (let y = 1; y <= n; y++) {
        grids[x][y] = next[x][y]
      }
    }
  }

  //境界条件の処理（上下と左右をつなげる）
  const boundary = () => {
    for (let i = 1; i <= n; i++) {
      grids[i][0].u = grids[i][n].u
      grids[i][n + 1].u = grids[i][1].u
      grids[0][i].u = grids[n][i].u
      grids[n + 1][i].u = grids[1][i].u

      grids[i][0].v = grids[i][n].v
      grids[i][n + 1].v = grids[i][1].v
      grids[0][i].v = grids[n][i].v
      grids[n + 1][i].v = grids[1][i].v
    }
  }

  //初期化（cキーでコール)
  const clear = () => {
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= n; j++) {
        grids[i][j] = { u: 1, v: 0 }
      }
    }
    p.redraw()
  }

  p.mousePressed = () => {
    mutation(p.mouseX, p.mouseY)
  }

  const mutation = (_x: number, _y: number) => {
    const x = _x / m + 1
    const y = _y / m + 1
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= n; j++) {
        const r = Math.sqrt((x - i) * (x - i) + (y - j) * (y - j))
        if (r < 4) {
          grids[i][j] = {
            // u: 0.6 + p.random(-0.06, 0.06),
            // v: 0.2 + p.random(-0.02, 0.02),
            u: 0,
            v: 1,
          }
        }
      }
    }
    p.redraw()

  }

  p.keyPressed = () => {
    if (p.key == 'c') {
      clear()
    } else if (p.key == 'y') {
      p.loop()
    } else if (p.key == 'n') {
      p.noLoop()
    }

    if (p.keyCode === 32) {
      togglePlay()

    }

  }

  const togglePlay = () => {
    if (sound.isPlaying()) {
      sound.pause()
      playButton.html('Play')
    } else {
      sound.loop()
      playButton.html('Pause')
    }
  }
}
