import {createApp} from 'vue'
import App from './App.vue'
import './styles/style.scss'
import {router} from './router.js'

import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import {aliases, mdi} from 'vuetify/iconsets/mdi-svg'
import {createPinia} from 'pinia'

const lightTheme = {
    dark: false,
    colors: {
        background: '#fef8ec',
        surface: '#ffffff',
        primary: '#214f23',
        secondary: '#d87645',
        error: '#d9534f',
        warning: '#f6b700',
        success: '#2e7d32',
        info: '#1976d2',
    },
}

const vuetify = createVuetify({
    theme: {
        defaultTheme: 'lightTheme',
        themes: {lightTheme},
    },
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
})

const pinia = createPinia()

createApp(App)
    .use(router)
    .use(vuetify)
    .use(pinia)
    .mount('#app')
