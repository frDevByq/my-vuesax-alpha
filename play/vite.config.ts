import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import Inspect from 'vite-plugin-inspect'
import mkcert from 'vite-plugin-mkcert'
import glob from 'fast-glob'
import VueMacros from 'unplugin-vue-macros/vite'
import esbuild from 'rollup-plugin-esbuild'
import {
  vsPackage,
  vsRoot,
  getPackageDependencies,
  pkgRoot,
  projRoot,
} from '@vuesax-alpha/build-utils'
import { VuesaxAlphaResolver } from '@vuesax-alpha/auto-import-resolver'

import type { Plugin } from 'vite'
import './vite.init'

const esbuildPlugin = (): Plugin =>
  ({
    ...esbuild({
      target: 'chrome64',
      include: /\.vue$/,
      loaders: {
        '.vue': 'js',
      },
    }),
    enforce: 'post',
  } as any)

export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  let { dependencies } = getPackageDependencies(vsPackage)
  dependencies = dependencies.filter((dep) => !dep.startsWith('@types/')) // exclude dts deps
  const optimizeDeps = (
    await glob(['dayjs/(locale|plugin)/*.js'], {
      cwd: path.resolve(projRoot, 'node_modules'),
    })
  ).map((dep) => dep.replace(/\\.js$/, ''))

  // 动态导入 ESM 模块
  const Icons = (await import('unplugin-icons/vite')).default
  const IconsResolver = (await import('unplugin-icons/resolver')).default

  return {
    resolve: {
      alias: [
        {
          find: /^vuesax-alpha(\/(es|lib))?$/,
          replacement: path.resolve(vsRoot, 'index.ts'),
        },
        {
          find: /^vuesax-alpha\/(es|lib)\/(.*)$/,
          replacement: `${pkgRoot}/$2`,
        },
        {
          find: /^@yqb\/my-vuesax(\/(es|lib))?$/,
          replacement: path.resolve(vsRoot, 'index.ts'),
        },
        {
          find: /^@yqb\/my-vuesax\/(es|lib)\/(.*)$/,
          replacement: `${pkgRoot}/$2`,
        },
      ],
    },
    server: {
      host: true,
      https: !!env.HTTPS,
    },
    plugins: [
      VueMacros({
        setupComponent: false,
        setupSFC: false,
        plugins: {
          vue: vue(),
          vueJsx: vueJsx(),
        },
      }),
      esbuildPlugin(),
      Components({
        include: `${__dirname}/**`,
        resolvers: [
          VuesaxAlphaResolver({ importStyle: 'sass' }),
          IconsResolver({
            prefix: 'icon',
            enabledCollections: ['lucide'],
          }),
        ],
        dts: false,
      }),
      Icons({
        autoInstall: true,
        compiler: 'vue3',
      }),
      mkcert(),
      Inspect(),
    ],

    optimizeDeps: {
      include: ['vue', '@vue/shared', ...dependencies, ...optimizeDeps],
    },
    esbuild: {
      target: 'chrome64',
    },
  }
})
