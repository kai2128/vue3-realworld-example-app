import { fileURLToPath, URL } from 'url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import analyzer from 'rollup-plugin-analyzer'
import istanbul from 'vite-plugin-istanbul'
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      src: fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    vue(),
    analyzer({ summaryOnly: true }),
    istanbul({
      include: 'src/*',
      exclude: ['node_modules'],
      extension: ['.js', '.ts', '.vue'],
      /**
       * This allows us to omit the INSTRUMENT_BUILD env variable when running the production build via
       * npm run build.
       * More details below.
       */
      requireEnv: false,
      /**
       * If forceBuildInstrument is set to true, this will add coverage instrumentation to the
       * built dist files and allow the reporter to collect coverage from the (built files).
       * However, when forceBuildInstrument is set to true, it will not collect coverage from
       * running against the dev server: e.g. npm run dev.
       *
       * To allow collecting coverage from running cypress against the dev server as well as the
       * preview server (built files), we use an env variable, INSTRUMENT_BUILD, to set
       * forceBuildInstrument to true when running against the preview server via the
       * instrument-build npm script.
       *
       * When you run `npm run build`, the INSTRUMENT_BUILD env variable is omitted from the npm
       * script which will result in forceBuildInstrument being set to false, ensuring your
       * dist/built files for production do not include coverage instrumentation code.
       */
      forceBuildInstrument: Boolean(process.env.INSTRUMENT_BUILD)
    }),
  ],
})
