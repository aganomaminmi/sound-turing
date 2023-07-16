import p5 from 'p5'
import 'p5/lib/addons/p5.sound'

let playButton: p5.Element // 再生ボタン
let volumeSlider: p5.Element // 音量のスライド
let speedSlider: p5.Element // 再生速度のスライド
let fft: p5.FFT // FFTオブジェクト
let sound: p5.SoundFile

const sliderWidth = 100

export const sketch = (p: p5) => {

  p.setup = () => { // 全体の設定
    console.log(sliderWidth)

    p.createCanvas(p.windowWidth, p.windowHeight)

    playButton = p.createButton('Play') // 再生ボタンの定義
    playButton.position(100, 20)    // 再生ボタンの位置を設定
    playButton.style('background-color', p.color(30))// 再生ボタンの位置を設定
    playButton.style('padding', '10px, 20px')// 再生ボタンの位置を設定
    playButton.style('color', p.color(200))   // 再生ボタンの背景の色を設定
    playButton.mousePressed(playStop)// 再生ボタンを押した時の関数を設定

    volumeSlider = p.createSlider(0, sliderWidth, sliderWidth / 2)// 音量のバーを設定
    volumeSlider.position(250, 50)// 音量のバーの位置を設定

    speedSlider = p.createSlider(0, sliderWidth, sliderWidth / 2)// 再生速度のバーを設定
    speedSlider.position(400, 50)// 再生速度のバーの位置を設定

    fft = new p5.FFT()// FFTを設定


  }

  p.draw = () => {
    const width = p.width
    const height = p.height

    p.background(50)

    const spectrum = fft.analyze() as number[]
    p.noStroke()

    for (let i = 0; i < spectrum.length; i++) {
      p.fill(255, 255 * i / spectrum.length, 0)
      const x = p.map(i, 0, spectrum.length, 0, width)
      const h = -height + p.map(spectrum[i], 0, 255, height, 0)
      p.rect(x + 50, height, width / spectrum.length, h)
    }

    const volume = p.map(Number(volumeSlider.value()), 0, 100, 0, 1) // 音量の変数を定義
    sound.setVolume(volume) // 音量を決定

    const speed = p.map(Number(speedSlider.value()), 0, sliderWidth, 0.5, 2) // 再生速度の変数を定義
    p.fill('#fff')
    p.text(speed, 400, 30)
    sound.rate(speed) // 再生速度を決定

  }


  p.preload = () => {  //  音源を定義する

    sound = p.loadSound('./src/assets/planet-loop.mp3') // 音声データを読み込む
    //  予めOpen Processingにアップロードする
  }

  const playStop = () => { // 音源を再生・停止する

    if (sound.isPlaying()) { // 音源が再生している時
      sound.pause() //  音源を停止する
      playButton.html('Pause') // ボタンを停止に変える
    }

    else { // 音源が停止している時
      sound.loop() // 音源を再生する
      playButton.html('Play') //  ボタンを再生に変える
    }

  }
}
