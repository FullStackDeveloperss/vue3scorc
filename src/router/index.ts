import { useUserStore } from '@/stores/user'
import Dashboard from '@/views/Dashboard.vue'
import { storeToRefs } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import { useWindowSize } from '@vueuse/core'
import { useRootStore } from '@/stores/root'
const { width } = useWindowSize();

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'dashboard',
			component: Dashboard,
		},
		{
			path: '/login',
			name: 'login',
			component: () => import('@/views/Login.vue'),
			meta: {
				layout: 'EmptyLayout'
			}
		},
		{
			path: '/profile',
			name: 'profile',
			component: () => import('@/views/Profile.vue'),
		},
		{
			path: '/facebook',
			name: 'facebook',
			component: () => import('@/views/Facebook.vue'),
		},
		{
			path: '/autofill',
			name: 'autofill',
			component: () => import('@/views/Autofill.vue'),
		},
		{
			path: '/servers',
			name: 'servers',
			component: () => import('@/views/Servers.vue'),
		},
		{
			path: '/farm',
			name: 'farm',
			component: () => import('@/views/Farm.vue'),
		},
		{
			path: '/gpt',
			name: 'gpt',
			component: () => import('@/views/Gpt.vue'),
		},
		{
			path: '/posting',
			name: 'posting',
			component: () => import('@/views/Posting.vue'),
		},
		{
			path: '/checkpoint',
			name: 'checkpoint',
			component: () => import('@/views/Checkpoint.vue'),
		},
		{
			path: '/zrd',
			name: 'zrd',
			component: () => import('@/views/Zrd.vue'),
		},
		{
			path: '/inviter',
			name: 'inviter',
			component: () => import('@/views/Inviter.vue'),
		},
		{
			path: '/public',
			name: 'public',
			component: () => import('@/views/Public.vue'),
		},
		{
			path: '/messenger',
			name: 'messenger',
			component: () => import('@/views/Messenger.vue'),
		},
		{
			path: '/autoserver',
			name: 'autoserver',
			component: () => import('@/views/Autoserver.vue'),
		},
		{
			path: '/register',
			name: 'register',
			component: () => import('@/views/Register.vue'),
		},
		{
			path: '/sms',
			name: 'sms',
			component: () => import('@/views/Sms.vue'),
		},
		{
			path: '/alerts',
			name: 'alerts',
			component: () => import('@/views/Alerts.vue'),
		},
		{
			path: '/data/links',
			name: 'links',
			component: () => import('@/views/Data/Links.vue'),
		},
		{
			path: '/data/groups',
			name: 'groups',
			component: () => import('@/views/Data/Groups.vue'),
		},
		{
			path: '/data/personal',
			name: 'personal',
			component: () => import('@/views/Data/Personal.vue'),
		},
		{
			path: '/data/links/:id',
			name: 'posts',
			component: () => import('@/views/Data/Posts.vue'),
		},
		{
			path: '/data/profiles',
			name: 'profiles',
			component: () => import('@/views/Data/Profiles.vue'),
		},
		{
			path: '/data/sites',
			name: 'sites',
			component: () => import('@/views/Data/Sites.vue'),
		},
		{
			path: '/data/spam',
			name: 'spam',
			component: () => import('@/views/Data/Spam.vue'),
		},
		{
			path: '/data/users',
			name: 'users',
			component: () => import('@/views/Data/Users.vue'),
		},
		{
			path: '/data/cookies',
			name: 'data',
			component: () => import('@/views/Data/Cookies.vue'),
		},
		{
			path: '/proxy',
			name: 'proxy',
			component: () => import('@/views/Proxy.vue'),
		},
		{
			path: '/reg/links',
			name: 'reg-links',
			component: () => import('@/views/Reg/Links.vue'),
		},
		{
			path: '/reg/links/:id',
			name: 'reg-links-item',
			component: () => import('@/views/Reg/RegItem.vue'),
		},
		{
			path: '/reg/cookies',
			name: 'reg-cookies',
			component: () => import('@/views/Reg/Cookies.vue'),
		},
		{
			path: '/reg/sites',
			name: 'reg-sites',
			component: () => import('@/views/Reg/Sites.vue'),
		},
		{
			path: '/reg/agents',
			name: 'agents',
			component: () => import('@/views/Reg/Agents.vue'),
		},
		{
			path: '/reg/cities',
			name: 'cities',
			component: () => import('@/views/Reg/Cities.vue'),
		},
		{
			path: '/reg/email',
			name: 'email',
			component: () => import('@/views/Reg/Email.vue'),
		},
		{
			path: '/reg/names',
			name: 'names',
			component: () => import('@/views/Reg/Names.vue'),
		},
		{
			path: '/reg/surnames',
			name: 'surnames',
			component: () => import('@/views/Reg/Surnames.vue'),
		},
		{
			path: '/:pathMatch(.*)*',
			name: '404',
			component: () => import('@/views/NotFound.vue'),
		},
	],
})

router.beforeEach((to, from, next) => {
	const userStore = useUserStore()
	const { user } = storeToRefs(userStore)
	console.log('log', user.value)
	const publicView = ['/login']
	const authRequired = !publicView.includes(to.path)
	if (authRequired && !user.value) {
		next('/login')
	} else {
		next()
	}

	if (width.value < 1024 && from.name !== 'login') {
		const rootStore = useRootStore()
		const { isCloseSidebar } = storeToRefs(rootStore)
		isCloseSidebar.value = true
	}
})

export default router
