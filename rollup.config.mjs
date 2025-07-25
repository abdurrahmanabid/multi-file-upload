import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      exports: 'auto',
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
    }
  ],
  external: ['multer', 'express', 'fs', 'path'],
  plugins: [
    nodeResolve(),
    typescript({ tsconfig: './tsconfig.json' })
  ]
}; 