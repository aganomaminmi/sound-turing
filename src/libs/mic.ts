export default class Mic {
  context: AudioContext
  analayzer: AnalyserNode
  stream?: MediaStream
  input?: MediaStreamAudioSourceNode
  processor?: ScriptProcessorNode
  spectrum?: Uint8Array
  res: number
  constructor() {
    this.context = new AudioContext();
    this.spectrum = new Uint8Array()
    this.analayzer = this.context.createAnalyser()
    this.res = 0
  }

  public static async init() {
    const mic = new Mic()
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false })

    mic.input = mic.context.createMediaStreamSource(stream)
    mic.input.connect(mic.analayzer)

    mic.processor = mic.context.createScriptProcessor(1024 * 2, 1, 1)
    mic.analayzer.connect(mic.processor)
    mic.processor.connect(mic.context.destination)
    mic.processor.onaudioprocess = () => {
      if (!mic.analayzer) { return }
      mic.spectrum = new Uint8Array(mic.analayzer.frequencyBinCount)
      mic.analayzer.getByteFrequencyData(mic.spectrum)
      mic.res = mic.spectrum.reduce((a, b) => Math.max(a, b))
    }
    return mic

  }

  getLevel() {
    return this.res
  }

  public async close() {
    await this.context.close()
  }
}
