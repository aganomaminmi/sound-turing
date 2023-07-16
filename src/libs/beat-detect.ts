import p5 from 'p5'

export class BeatDetect {
  freq1: number
  freq2: number
  time: number
  threshold: number
  minThreshold: number
  decayRate: number
  minThresholdRate: number
  holdTime: number
  marginThresholdTime: number
  marginThreshold: number

  constructor(mode: number | string = 'kick', freq2?: number) {
    if (freq2 && !isNaN(Number(mode))) {
      this.freq1 = mode as number
      this.freq2 = freq2
    } else {
      if (mode == 'snare') {
        this.freq1 = 2000
        this.freq2 = 6000
      } else if (mode == 'male') {
        this.freq1 = 200
        this.freq2 = 2000
      } else {
        // mode == "kick"
        this.freq1 = 20
        this.freq2 = 40
      }
    }

    this.time = 0
    this.threshold = 0
    this.minThreshold = 0

    this.decayRate = 0.01
    this.minThresholdRate = 0.8

    this.holdTime = 45
    this.marginThresholdTime = 10
    this.marginThreshold = 0.06
  }

  public update(fft: p5.FFT) {
    const e = fft.getEnergy(this.freq1, this.freq2)
    const level = e / 255.0 || 0.0
    let isBeat = false
    if (level > this.threshold && level > this.minThreshold) {
      this.threshold = level * 1.05
      this.minThreshold = Math.max(this.minThreshold, level * this.minThresholdRate)
      if (this.time > this.marginThresholdTime) {
        isBeat = true
      }
      this.time = 0
    } else {
      if (this.time == this.marginThresholdTime) {
        this.threshold -= this.marginThreshold
      }
      this.time += 1
      if (this.time > this.holdTime) {
        this.threshold -= this.decayRate
      }
    }
    return { threshold: this.threshold, level: level, isBeat: isBeat }
  }
}
