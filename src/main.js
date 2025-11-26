import {createApp} from 'vue'
import App from './App.vue'
import './styles/style.scss'
import {router} from './router.js'

import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import {aliases, mdi} from 'vuetify/iconsets/mdi-svg'

const lightTheme = {
    dark: false,
    colors: {
        background: '#fef8ec',
        primary: '#214f23',
    }
}

const vuetify = createVuetify({
    theme: {
        defaultTheme: 'lightTheme',
        themes: {lightTheme}
    },
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi
        },
    },
})

createApp(App)
    .use(router)
    .use(vuetify)
    .mount('#app')
