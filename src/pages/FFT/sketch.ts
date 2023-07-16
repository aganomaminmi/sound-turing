/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import p5 from 'p5'
import 'p5/lib/addons/p5.sound'

let mic: p5.AudioIn // マイク入力
let fft: p5.FFT // FFTオブジェクト
let spectrum: number[] // パワースペクトル

export const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(400, 300)

    // マイク入力のセットアップ
    mic = new p5.AudioIn()
    mic.start()

    // FFTのセットアップ
    const fftSize = 1024
    fft = new p5.FFT(0.8, fftSize)

    // パワースペクトルの配列を初期化
    spectrum = new Array(p.width)
  }

  p.draw = () => {
    p.background(0)

    // 音声データの処理
    const waveform = mic.getLevel()
    fft.waveform(waveform)

    // FFTの実行とパワースペクトルの計算
    const bins = fft.linAverages(p.width)
    for (let i = 0; i < p.width; i++) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      spectrum[i] = bins[i]
    }

    // パワースペクトルの表示
    p.noFill()
    p.stroke('#ffffff')
    p.beginShape()
    for (let i = 0; i < spectrum.length; i++) {
      const x = p.map(i, 0, spectrum.length, 0, p.width)
      const y = p.map(spectrum[i], 0, 255, p.height, 0)
      p.vertex(x, y)
    }
    p.endShape()
  }
}
