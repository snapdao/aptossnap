import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'snapkit',
      formats: ['es'],
      fileName: 'index'
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'semantic-ui-react'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDom',
          'semantic-ui-react': 'SemanticUiReact'
        }
      }
    }
  }
})
