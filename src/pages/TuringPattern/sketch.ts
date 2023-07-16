import p5 from 'p5';
import 'p5/lib/addons/p5.sound'


// let mic: p5.AudioIn

const n = 200
const m = 4

type Grid = { u: number, v: number }

const grids: Grid[][] = Array.from({ length: n + 2 }, () => Array.from({ length: n + 2 }, () => ({ u: 1, v: 0 })));
const next: Grid[][] = Array.from({ length: n + 2 }, () => Array.from({ length: n + 2 }, () => ({ u: 1, v: 0 })));

const dt = 3.0;
const h = 0.2;
const h2: number = h * h;
const a = 0.024;
const b = 0.078;
const Cu = 0.002;
const Cv = 0.001;

export const sketch = (p: p5) => {
  p.setup = () => {
    // p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL)
    const canvas = m * n
    p.createCanvas(canvas, canvas)
    p.background("#FFCC00")
    p.noStroke()
    // mic = new p5.AudioIn()
    // mic.start()
  }

  p.draw = () => {
    display(); //描画処理
    boundary(); // 境界条件の処理
    update(); // 描画に関わらない処理
    // console.log(grids[100][100], grids[150][100])
  }

  const display = () => {
    for (let x = 1; x <= n; x++) {
      for (let y = 1; y <= n; y++) {
        const { u, v } = grids[x][y]
        p.fill(u * 255, 100, v * 255);
        // p.fill(255 - (v[i][j] - u[i][j] / 2 + 0.5) * 100, 255, 255);
        p.rect((x - 1) * m, (y - 1) * m, m, m);
      }
    }
  }

  const update = () => {
    for (let x = 1; x <= n; x++) {
      for (let y = 1; y <= n; y++) {
        const { u: currentU, v: currentV } = grids[x][y]

        const above = grids[x - 1][y]
        const below = grids[x + 1][y]
        const right = grids[x][y + 1]
        const left = grids[x][y - 1]

        const Du = (above.u + below.u + left.u + right.u - 4 * currentU) / h2;
        const Dv = (above.v + below.v + left.v + right.v - 4 * currentV) / h2;

        const f = -currentU * currentV * currentV + a * (1 - currentU);
        const g = currentU * currentV * currentV - b * currentV;

        const round = (num: number) => Math.round(num * 1000) / 1000

        next[x][y] = { u: round(currentU + (Cu * Du + f) * dt), v: round(currentV + (Cv * Dv + g) * dt) }
      }
    }

    for (let x = 1; x <= n; x++) {
      for (let y = 1; y <= n; y++) {
        grids[x][y] = next[x][y];
      }
    }
  }

  //境界条件の処理（上下と左右をつなげる）
  const boundary = () => {
    for (let i = 1; i <= n; i++) {
      grids[i][0].u = grids[i][n].u;
      grids[i][n + 1].u = grids[i][1].u;
      grids[0][i].u = grids[n][i].u;
      grids[n + 1][i].u = grids[1][i].u;

      grids[i][0].v = grids[i][n].v;
      grids[i][n + 1].v = grids[i][1].v;
      grids[0][i].v = grids[n][i].v;
      grids[n + 1][i].v = grids[1][i].v;
    }
  }

  //初期化（cキーでコール)
  const clear = () => {
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= n; j++) {
        grids[i][j] = { u: 1, v: 0 };
      }
    }
    p.redraw();
  }

  p.mousePressed = () => {
    const x = p.mouseX / m + 1;
    const y = p.mouseY / m + 1;
    console.log(x)
    console.log(y)
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= n; j++) {
        const r = Math.sqrt((x - i) * (x - i) + (y - j) * (y - j));
        if (r < 8) {
          grids[i][j] = { u: 0.6 + p.random(-0.06, 0.06), v: 0.2 + p.random(-0.02, 0.02) }
        }
      }
    }
    p.redraw();
  }

  p.keyPressed = () => {
    if (p.key == 'c') {
      clear();
    } else if (p.key == 'y') {
      p.loop();
    } else if (p.key == 'n') {
      p.noLoop();
    }
  }

}
