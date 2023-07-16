//import p5 from 'p5'
//import 'p5/lib/addons/p5.sound'

//let volumeSlider: p5.Element // 音量のスライド
//let speedSlider: p5.Element // 再生速度のスライド
//let playButton: p5.Element
//let fft: p5.FFT // FFTオブジェクト
//let sound: p5.SoundFile
//const sliderWidth = 100
//let mic: p5.AudioIn // マイク入力

//let kickDetector: BeatDetect
//let snareDetector: BeatDetect
//let voiceDetector: BeatDetect

//const n = 100
//const m = 4

//const round = (num: number) => Math.round(num * 1000) / 1000

//type Grid = { u: number; v: number };

//const grids: Grid[][] = Array.from({ length: n + 2 }, () =>
//  Array.from({ length: n + 2 }, () => ({ u: 1, v: 0 }))
//)
//const next: Grid[][] = Array.from({ length: n + 2 }, () =>
//  Array.from({ length: n + 2 }, () => ({ u: 1, v: 0 }))
//)

//let dt = 3.0
//const h = 0.2
//const h2: number = h * h
//let a = 0.024
//let b = 0.078
//const Cu = 0.002
//const Cv = 0.001

//const canvas = m * n

//let isRestPeriod = false

//export const sketch = (p: p5) => {
//  const levelHistory = Array.from({ length: 10 }, () => 0)

//  p.setup = () => {
//    // p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL)
//    p.createCanvas(canvas, canvas)
//    p.background('#FFCC00')
//    p.noStroke()

//    playButton = p.createButton('Play') // 再生ボタンの定義
//    playButton.size(100, 50) // 再生ボタンの大きさを設定
//    playButton.position(100, 20) // 再生ボタンの位置を設定
//    playButton.style('background-color', p.color(30))
//    playButton.style('color', p.color(200)) // 再生ボタンの背景の色を設定
//    playButton.mousePressed(() => {
//      sound.loop()
//    }) // 再生ボタンを押した時の関数を設定

//    volumeSlider = p.createSlider(0, sliderWidth, sliderWidth / 2) // 音量のバーを設定
//    volumeSlider.position(250, 50) // 音量のバーの位置を設定

//    speedSlider = p.createSlider(0, sliderWidth, sliderWidth / 2) // 再生速度のバーを設定
//    speedSlider.position(400, 50) // 再生速度のバーの位置を設定

//    mic = new p5.AudioIn()
//    mic.start()

//    fft = new p5.FFT()
//    fft.setInput(mic)
//  }

//  p.draw = () => {
//    display() //描画処理
//    boundary() // 境界条件の処理
//    update() // 描画に関わらない処理
//    updateParams()
//    fftDo()
//  }

//  const fftDo = () => {
//    const spectrum = fft.analyze() as number[]

//    const low = spectrum.slice(0, 300)
//    const high = spectrum.slice(300, spectrum.length)

//    const lowLevel = low.reduce((pre, cur) => pre + cur, 0)
//    const highLevel = high.reduce((pre, cur) => pre + cur, 0)

//    a = round(p.map(lowLevel, 0, 10000, 0.005, 0.01))
//    b = round(p.map(highLevel, 0, 10000, 0.005, 0.025))

//    // let a = 0.024
//    // let b = 0.078

//    p.text(`a/b: ${a}/${b}`, 100, 20)

//    const volume = p.map(Number(volumeSlider.value()), 0, 100, 0, 1) // 音量の変数を定義
//    sound.setVolume(volume) // 音量を決定

//    const speed = p.map(Number(speedSlider.value()), 0, sliderWidth, 0.5, 1.5) // 再生速度の変数を定義
//    p.fill('#fff')
//    p.text(speed, 400, 30)
//    sound.rate(speed) // 再生速度を決定

//    kickDetector = new BeatDetect('kick')
//    snareDetector = new BeatDetect('snare')
//    voiceDetector = new BeatDetect('male')
//  }

//  p.preload = () => {
//    //  音源を定義する

//    sound = p.loadSound('./src/assets/planet-loop.mp3') // 音声データを読み込む
//    //  予めOpen Processingにアップロードする
//  }

//  const updateParams = () => {
//    // const spectrum = fft.analyze() as number[]
//    // const level = spectrum.reduce((pre, cur) => pre + cur, 0)
//    // const calcedLevel = p.map(level, 0, 255 * 255, 0, 1)
//    // dt = p.constrain(calcedLevel, 0, 5)


//    // const snareVol = spectrum.slice(600, 700).reduce((pre, cur) => pre + cur, 0),
//    // const targetVol = fft.getEnergy(20, 60)
//    // const level = p.map(
//    //   targetVol,
//    //   130,
//    //   230,
//    //   0,
//    //   5
//    // )
//    const targetVol = fft.getEnergy(3500, 20000)
//    const level = p.map(
//      targetVol,
//      0,
//      255,
//      0,
//      5
//    )
//    dt = p.constrain(round(level), 0, 5)

//    const energy = fft.getEnergy(10, 40)
//    const r = p.map(energy, 0, 255, 0, 100)
//    p.fill(0)
//    p.ellipse(200, 200, r)
//    if (energy > 180) {
//      if (!isRestPeriod) {
//        isRestPeriod = true
//        setTimeout(() => {
//          isRestPeriod = false

//        }, 1000)
//        mutation(p.random(0, canvas), p.random(0, canvas))

//      }
//    }

//    // levelHistory.shift()
//    // levelHistory.push(calcedLevel)
//    // const smoothLevel =
//    //   levelHistory.reduce((prev, cur) => prev + cur, 0) / levelHistory.length
//    // dt = round(Math.min(smoothLevel, 5))

//    p.fill(0)
//    p.textSize(16)
//    p.text(`dt: ${dt}`, 10, 20)
//  }

//  const display = () => {
//    for (let x = 1; x <= n; x++) {
//      for (let y = 1; y <= n; y++) {
//        const { u, v } = grids[x][y]
//        p.fill(u * 255, 100, v * 255)
//        // p.fill(255 - (v[i][j] - u[i][j] / 2 + 0.5) * 100, 255, 255);
//        p.rect((x - 1) * m, (y - 1) * m, m, m)
//      }
//    }
//  }

//  const update = () => {
//    for (let x = 1; x <= n; x++) {
//      for (let y = 1; y <= n; y++) {
//        const { u: currentU, v: currentV } = grids[x][y]

//        const above = grids[x - 1][y]
//        const below = grids[x + 1][y]
//        const right = grids[x][y + 1]
//        const left = grids[x][y - 1]

//        const Du = (above.u + below.u + left.u + right.u - 4 * currentU) / h2
//        const Dv = (above.v + below.v + left.v + right.v - 4 * currentV) / h2

//        const f = -currentU * currentV * currentV + a * (1 - currentU)
//        const g = currentU * currentV * currentV - b * currentV

//        next[x][y] = {
//          u: round(currentU + (Cu * Du + f) * dt),
//          v: round(currentV + (Cv * Dv + g) * dt),
//        }
//      }
//    }

//    for (let x = 1; x <= n; x++) {
//      for (let y = 1; y <= n; y++) {
//        grids[x][y] = next[x][y]
//      }
//    }
//  }

//  //境界条件の処理（上下と左右をつなげる）
//  const boundary = () => {
//    for (let i = 1; i <= n; i++) {
//      grids[i][0].u = grids[i][n].u
//      grids[i][n + 1].u = grids[i][1].u
//      grids[0][i].u = grids[n][i].u
//      grids[n + 1][i].u = grids[1][i].u

//      grids[i][0].v = grids[i][n].v
//      grids[i][n + 1].v = grids[i][1].v
//      grids[0][i].v = grids[n][i].v
//      grids[n + 1][i].v = grids[1][i].v
//    }
//  }

//  //初期化（cキーでコール)
//  const clear = () => {
//    for (let i = 1; i <= n; i++) {
//      for (let j = 1; j <= n; j++) {
//        grids[i][j] = { u: 1, v: 0 }
//      }
//    }
//    p.redraw()
//  }

//  p.mousePressed = () => {
//    mutation(p.mouseX, p.mouseY)
//  }

//  const mutation = (_x: number, _y: number) => {
//    const x = _x / m + 1
//    const y = _y / m + 1
//    for (let i = 1; i <= n; i++) {
//      for (let j = 1; j <= n; j++) {
//        const r = Math.sqrt((x - i) * (x - i) + (y - j) * (y - j))
//        if (r < 4) {
//          grids[i][j] = {
//            // u: 0.6 + p.random(-0.06, 0.06),
//            // v: 0.2 + p.random(-0.02, 0.02),
//            u: 0,
//            v: 1,
//          }
//        }
//      }
//    }
//    p.redraw()

//  }

//  p.keyPressed = () => {
//    if (p.key == 'c') {
//      clear()
//    } else if (p.key == 'y') {
//      p.loop()
//    } else if (p.key == 'n') {
//      p.noLoop()
//    }
//  }
//}
