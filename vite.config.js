import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import path from 'path'

export default defineConfig({
    plugins: [
        vue(),
        vuetify({
            styles: {
                configFile: './src/styles/settings.scss'
            },
            autoImport: true
        })
    ],

    server: {
        host: '0.0.0.0',
        port: 5173, // можешь убрать, если не нужно фиксировать
    },

    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@styles': path.resolve(__dirname, 'src/styles'),
            '@images': path.resolve(__dirname, 'src/assets/images'),
            '@stores': path.resolve(__dirname, 'src/stores'),
            '@data': path.resolve(__dirname, 'src/data'),
            '@utils': path.resolve(__dirname, 'src/utils'),
        },
    },
})
