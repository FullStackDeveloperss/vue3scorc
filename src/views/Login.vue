<script setup lang="ts">
import ButtonMain from '@/components/ui/ButtonMain.vue'
import InputText from '@/components/ui/InputText.vue'
import { useUserStore } from '@/stores/user'
import type { Form } from '@/types/general'
import { useDark } from '@vueuse/core'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isDark = useDark({
    valueDark: 'dark',
    valueLight: 'light',
})

const userStore = useUserStore()

const form = ref<Form>({
	login: '',
	password: ''
})

const submitHandler = async (): Promise<void> => {
	try {
		await userStore.login({
			login: form.value.login,
			password: form.value.password
		})
		router.push('/')
	} catch (error) {
		console.log(error)
	}

}
</script>

<template>
	<div class="auth">
		<div class="auth__inner">
			<img class="auth__img" src="/images/logo.png" alt="Логотип" v-if="!isDark">
			<img class="auth__img" src="/images/logo-dark.png" alt="Логотип" v-else>
			<h2 class="auth__title">Авторизация</h2>
			<form class="auth__form" @submit.prevent="submitHandler">
				<fieldset class="auth__fieldset">
					<InputText v-model:input="form.login" type="text" placeholder="Логин" src="/icons/user.svg" alt="Логин"
						v-if="!isDark" />
					<InputText v-model:input="form.login" type="text" placeholder="Логин" src="/icons/user-dark.svg" alt="Логин"
						v-else />
					<InputText v-model:input="form.password" type="password" placeholder="Пароль" src="/icons/password.svg"
						alt="Пароль" v-if="!isDark" />
					<InputText v-model:input="form.password" type="password" placeholder="Пароль" src="/icons/password-dark.svg"
						alt="Пароль" v-else />
				</fieldset>
				<ButtonMain type="submit" to="/" text="Войти" class="auth__btn" />
			</form>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.auth {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	margin: auto;
	max-width: 640px;
	max-height: 520px;
	height: 100%;
	width: 100%;
	background-color: #fff;
	border-radius: 24px;
	box-shadow: 0px 6px 32px 0px rgba(0, 0, 0, 0.05);

	@media only screen and (max-width: 743px) and (min-width: 320px) {
		background-color: transparent;
		border-radius: 0;
		box-shadow: none;
	}

	&__inner {
		width: 100%;
		padding: 60px 80px 80px;

		@media only screen and (max-width: 743px) and (min-width: 320px) {
			padding: 0 20px;
		}
	}

	&__img {
		margin: 0 auto 40px;

		@media only screen and (max-width: 429px) and (min-width: 320px) {
			margin: 0 auto 30px;
		}
	}

	&__title {
		font-size: 27px;
		font-style: normal;
		font-weight: 600;
		line-height: 40px;
		letter-spacing: -0.01px;
		text-align: center;
		margin-bottom: 60px;

		@media only screen and (max-width: 429px) and (min-width: 320px) {
			margin-bottom: 40px;
		}
	}

	&__fieldset {
		display: flex;
		flex-direction: column;
		gap: 12px;
		margin-bottom: 36px;
	}

	&__btn {
		width: 100%;
	}
}

.dark .auth {
	background-color: #091C31;
	box-shadow: none;
}
</style>
