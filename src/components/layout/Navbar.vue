<script setup lang="ts">
import Logout from '@/components/icons/Logout.vue'
import Menu from '@/components/icons/Menu.vue'
import Settings from '@/components/icons/Settings.vue'
import { useRootStore } from '@/stores/root'
import { useUserStore } from '@/stores/user'
import type { Lang } from '@/types/general'
import { useDark, useToggle } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import Dropdown from 'primevue/dropdown'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()

const isDark = useDark({
    valueDark: 'dark',
    valueLight: 'light',
})

const toggleDark = useToggle(isDark)

const rootStore = useRootStore()
const { isCloseSidebar } = storeToRefs(rootStore)

const selectedLng = ref<string>('')
const lngs = ref<Lang[]>([
	{ name: 'русский' }
])

const logout = (): void => {
	userStore.logout()
	router.push('/login')
}
</script>

<template>
	<div class="navbar" :class="{ 'navbar__close': isCloseSidebar }">
		<button class="navbar__btn" @click="isCloseSidebar = !isCloseSidebar">
			<Menu class="navbar__img" />
		</button>
		<div class="navbar__right">
			<div class="navbar__right-content">
				<Dropdown v-model="selectedLng" icon="none" :options="lngs" optionLabel="name" placeholder="русский" unstyled
					:pt="{ root: { class: 'dropdown__root' }, trigger: { class: 'dropdown__trigger' }, panel: { class: 'dropdown__panel' }, item: { class: 'dropdown__item' }, input: { class: 'dropdown__input' } }" />
				<span class="navbar__right-item">Язык:</span>
			</div>
			<RouterLink to="/profile" class="navbar__btn">
				<Settings class="navbar__icon" />
			</RouterLink>
			<button class="navbar__btn">
				<Logout class="navbar__img" @click="logout()" />
			</button>
		</div>
	</div>
</template>

<style lang="scss">
.navbar {
	position: absolute;
	margin-left: 300px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 24px;
	height: 60px;
	width: calc(100% - 300px);
	border-bottom: 1px solid #EEE;
	background-color: #F8F9FB;
	transition: all .3s ease-in-out;
	z-index: 10;

	@media only screen and (max-width: 743px) and (min-width: 320px) {
		margin-left: 0;
		width: 100%;
        position: fixed;
	}

	&__close {
        position: absolute;
		margin-left: 118px;
		width: calc(100% - 118px);

		@media only screen and (max-width: 1279px) and (min-width: 1024px) {
			margin-left: 84px;
			width: calc(100% - 84px);
		}

		@media only screen and (max-width: 1023px) and (min-width: 320px) {
			margin-left: 0;
			width: 100%;
		}
	}

	&__btn {
		width: 24px;
		height: 24px;
	}

	&__right {
		display: flex;
		align-items: center;
		gap: 16px;
	}

	&__right-content {
		position: relative;
	}

	&__right-item {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: 12px;
		font-size: 13px;
		font-weight: 700;
		line-height: normal;
		letter-spacing: normal;
		color: #091C31;
	}
}

.dark {
	& .navbar {
		background-color: #1B395B;
		border-bottom: 1px solid #3C5A7B;

		&__img path {
			stroke: #778DA6;
		}

		&__icon path {
			stroke: #778DA6;
		}

		&__right-item {
			color: #eee;
		}
	}
}
</style>
