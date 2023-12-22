import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { useAuthStore } from '../stores/authStore';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView
		},

		{
			path: '/profile',
			name: 'profile',
			component: () => import('../views/ProfileView.vue'),
			meta: {
				needsAuth: true
			}
		}
	]
});

router.beforeEach((to, from, next) => {
	const authStore = useAuthStore();

	if (to.meta.needsAuth) {
		if (authStore.isLoggedIn()) {
			return next();
		} else {
			return next('/');
		}
	}

	return next();
});

export default router;
