import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";

export default {
  input: 'src/main.tsx',
  output: {
    file: 'dist/bundle.js'
  },
  plugins: [
    typescript(),
    resolve(),
    commonjs(),
    terser()
  ]
}
