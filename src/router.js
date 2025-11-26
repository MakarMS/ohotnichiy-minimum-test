import {createRouter, createWebHistory} from 'vue-router'
import Home from './components/Home.vue'
import {ymHit} from "@utils/ym.js";

const routes = [
    {path: '/', component: Home},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.afterEach((to) => {
    ymHit(to.fullPath, {title: document.title});
});

export default router