import p5 from 'p5';
import "p5/lib/addons/p5.sound"


const RADIUS = 30;
let mic: p5.AudioIn

export const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL)
    p.noStroke()
    mic = new p5.AudioIn()
    mic.start()
  }

  p.draw = () => {
    p.background(150)
    p.lights()
    p.rotateY(45)
    const level = mic.getLevel()
    for (let x = -RADIUS * 4; x <= RADIUS * 4; x += RADIUS * 2) {
      const colorValue = level * 255 // 音量を取得
      for (let y = -RADIUS * 4; y <= RADIUS * 4; y += RADIUS * 2) {
        for (let z = -RADIUS * 4; z <= RADIUS * 4; z += RADIUS * 2) {
          const r = 1 + level * 100 
          createBall(x * r, y * r, z * r, colorValue)
        }
      }
    }
  }
  /**
   * 球体を指定の座標に作成する。
   *
   * @param {number} x x座標
   * @param {number} y y座標
   * @param {number} z z座標
   * @param {number} color 色
   */
  const createBall = (x: number, y: number, z: number, color: number) => {
    p.push()
    p.translate(x, y, z).fill(p.color(color)).sphere(RADIUS)
    p.pop()
  }

}
