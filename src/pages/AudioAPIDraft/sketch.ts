import p5 from 'p5';
import "p5/lib/addons/p5.sound"



export const sketch = (p: p5) => {
  let mic: p5.AudioIn

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL)
    p.noStroke()
    mic = new p5.AudioIn()
    mic.start()
  }

  p.draw = () => {
    p.background(150)
    p.lights()
    p.fill(255, 255, 255)
    p.ellipse(200, 200, mic.getLevel() * 10000)
  }

}
