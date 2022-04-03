import { createRouter, createWebHistory } from 'vue-router'
import About from '@/views/About.vue'
import Reminders from '@/views/Reminders.vue'
import Note from '@/views/Note.vue'
import HealthStatus from '@/views/HealthStatus.vue'
import NotFound from '@/views/NotFound.vue'
import Login from '@/components/Login.vue'
import Landing from '@/components/Landing.vue'
import QuickAccess from "@/views/QuickAccess.vue";
import { getAuth, onAuthStateChanged} from "firebase/auth"

function isAuthenticated(to) {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (!user && to.name !== 'Login') {
            alert("You have not logged into your account.");
            return {
                path: "/login",
                name: "Login",
                component: Login
            }
        }
    })
}

const routes = [
    {
        path: "/",
        name: "Landing",
        component: Landing
    },
    {
        path: "/login",
        name: "Login",
        component: Login
    },
    {
        path: "/about",
        name: "About",
        component: About,
        beforeEnter: [isAuthenticated]
    },
    {
        path: '/reminders',
        name: 'Reminders',
        component: Reminders,
        beforeEnter: [isAuthenticated]
    },
    {
        path: '/note',
        name: 'Note',
        component: Note,
        beforeEnter: [isAuthenticated]
    },
    {
        path: '/graph',
        name: 'Graph',
        component: HealthStatus,
        beforeEnter: [isAuthenticated]
    },
    {
        path: '/links',
        name: 'Links',
        component: QuickAccess,
        beforeEnter: [isAuthenticated]
    },
    {
        path: '/:catchAll(.*)',
        name:'NotFound',
        component: NotFound,
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router