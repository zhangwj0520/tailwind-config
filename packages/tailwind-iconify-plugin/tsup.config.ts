import type { Options } from 'tsup';
import { defineConfig } from 'tsup';

import * as lib from './package.json';

// https://paka.dev/npm/tsup@8.0.2/api
export default defineConfig((options: Options) => {
  const year = new Date().getFullYear();
  const banner = `// ${lib.name} v${lib.version} Copyright (c) ${year} ${lib.author.name} and contributors`;

  const { watch } = options;
  const isDev = Boolean(watch);
  return {
    entry: ['src/index.ts'], // 入口
    format: ['cjs'],
    dts: true,
    splitting: true,
    minify: !isDev,
    sourcemap: isDev,
    clean: true,
    target: 'es2022',
    banner: {
      js: banner,
    },
  };
});
