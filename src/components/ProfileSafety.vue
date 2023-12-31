<script setup lang="ts">
import ButtonMain from '@/components/ui/ButtonMain.vue'
import InputText from '@/components/ui/InputText.vue'
import Password from 'primevue/password'
import { useDark, useWindowSize } from '@vueuse/core'
import { ref } from 'vue'
import axios from 'axios'
import { useToast } from 'primevue/usetoast'

const isDark = useDark({
    valueDark: 'dark',
    valueLight: 'light',
})

const { width } = useWindowSize()

const safety = ref({
	password: '',
    password_confirmation: ''
})

const toast = useToast()

const sendingData = ref(false)
const saveNewPassword = async () => {
    sendingData.value = true
    try {
        const res = await axios.post('profile/set-password', safety.value)
    } catch (error) {
        console.log(error)
        toast.add({
            severity: 'error',
            summary: ``,
            detail: 'Ошибка загрузки данных',
            life: 3000,
        })
    }
    sendingData.value = false
}
</script>

<template>
	<form @submit.prevent="saveNewPassword" class="profile__form">
		<h3 class="profile__form-title">Безопасность</h3>
		<div class="profile__form-inner" v-if="width > 743">
			<div class="profile__form-item">
				<span class="profile__form-text">Пароль</span>
				<span class="profile__form-text">Подтверждение пароля</span>
			</div>
			<div class="profile__form-info">
				<fieldset class="profile__form-fieldset">
					<InputText v-model:input="safety.password" type="text" placeholder=""
						src="/icons/password.svg" pic="/icons/eye.svg" alt="Пароль" v-if="!isDark" />
					<InputText v-model:input="safety.password" type="text" placeholder=""
						src="/icons/password-dark.svg" pic="/icons/eye-dark.svg" alt="Пароль" v-else />
					<InputText v-model:input="safety.password_confirmation" type="password" placeholder=""
						src="/icons/password.svg" pic="/icons/eye-off.svg" alt="Пароль" v-if="!isDark" />
					<InputText v-model:input="safety.password_confirmation" type="password" placeholder=""
						src="/icons/password-dark.svg" pic="/icons/eye-off-dark.svg" alt="Пароль" v-else />
				</fieldset>
				<ButtonMain :loading="sendingData" text="Сохранить" />
			</div>
		</div>
		<div class="profile__form-info" v-else>
			<fieldset class="profile__form-fieldset">
				<div class="profile__form-label">
					<span class="profile__form-text">Пароль</span>
					<InputText v-model:input="safety.password" type="text" placeholder=""
						src="/icons/password.svg" pic="/icons/eye.svg" alt="Пароль" v-if="!isDark" />
					<InputText v-model:input="safety.password" type="text" placeholder=""
						src="/icons/password-dark.svg" pic="/icons/eye-dark.svg" alt="Пароль" v-else />
				</div>
				<div class="profile__form-label">
					<span class="profile__form-text">Подтверждение пароля</span>
					<InputText v-model:input="safety.password_confirmation" type="password" placeholder=""
						src="/icons/password.svg" pic="/icons/eye-off.svg" alt="Пароль" v-if="!isDark" />
					<InputText v-model:input="safety.password_confirmation" type="password" placeholder=""
						src="/icons/password-dark.svg" pic="/icons/eye-off-dark.svg" alt="Пароль" v-else />
				</div>
				<ButtonMain :loading="sendingData" text="Сохранить" />
			</fieldset>
		</div>
	</form>
</template>

<style lang="scss" scoped>
.profile {

	&__form {
		padding: 24px 32px 36px;
		border-radius: 24px;
		background-color: #FFF;
		box-shadow: 0px 6px 32px 0px rgba(0, 0, 0, 0.05);

		@media only screen and (max-width: 743px) and (min-width: 430px) {
			padding: 24px 32px 32px;
		}

		@media only screen and (max-width: 429px) and (min-width: 320px) {
			padding: 24px 24px 32px;
		}
	}

	&__form-inner {
		display: flex;
		justify-content: space-between;
		gap: 10px;
	}

	&__form-item {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	&__form-title {
		font-size: 17px;
		font-weight: 500;
		line-height: 28px;
		letter-spacing: 0.18px;
		color: #091C31;
		margin-bottom: 28px;
	}

	&__form-info {
		max-width: 718px;
		width: 100%;

		@media only screen and (max-width: 1279px) and (min-width: 744px) {
			max-width: 542px;
		}
	}

	&__form-fieldset {
		display: flex;
		flex-direction: column;
		gap: 20px;
		margin-bottom: 20px;

		@media only screen and (max-width: 743px) and (min-width: 320px) {
			margin-bottom: 0;
		}
	}

	&__form-text {
		height: 44px;
		display: flex;
		align-items: center;
		font-family: "Inter", sans-serif;
		font-weight: 500;
		line-height: 21px;
		color: #091C31;

		@media only screen and (max-width: 743px) and (min-width: 320px) {
			height: auto;
		}
	}

	&__form-label {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
}

.dark {
	& .profile {
		&__form {
			background-color: #091C31;
			box-shadow: none;
		}

		&__form-title {
			color: #fff;
		}

		&__form-text {
			color: #fff;
		}
	}
}
</style>
