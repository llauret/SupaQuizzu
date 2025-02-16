import {createRouter, createWebHashHistory} from 'vue-router';

const router = createRouter({
    history: createWebHashHistory(), routes: [{
        path: '/', name: 'home', component: () => import('./views/Home.vue')
    },
        {
            path: '/question/', name: 'question', component: () => import('./views/Question.vue')
            // path: '/question/:id', name: 'question', component: () => import('./views/Question.vue')
        }
    ],
});

export default router;
