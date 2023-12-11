<script setup lang="ts">
import Slider from 'primevue/slider'
import { useRegisterStore } from '@/stores/register'

const registerStore = useRegisterStore()
</script>

<template>
	<div class="register">
		<div class="register__inner">
			<h3 class="register__subtitle">Сайты</h3>
			<div class="register__item">
				<span class="register__text">Сколько сайтов посещать перед заходом на форму регистрации</span>
				<Slider v-model="registerStore.fields.visit_sites" :min="0" :max="48" :range="true" />
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.register {

	&__inner {
		padding: 24px 32px 36px;
		border-radius: 24px;
		background-color: #fff;
		box-shadow: 0px 6px 32px 0px rgba(0, 0, 0, 0.05);
	}

	&__subtitle {
		font-size: 17px;
		font-weight: 500;
		line-height: 28px;
		letter-spacing: 0.18px;
		color: #091C31;
		margin-bottom: 28px;
	}

	&__item {
		display: flex;
		align-items: center;
		gap: 20px;

		@media only screen and (max-width: 429px) and (min-width: 320px) {
			flex-direction: column;
			gap: 10px;
			align-items: flex-start;
		}
	}

	&__text {
		font-family: "Inter", sans-serif;
		font-weight: 500;
		line-height: 21px;
		color: #091C31;
	}
}

.dark .register {
	&__inner {
		background-color: #091C31;
		box-shadow: none;
	}

	&__subtitle {
		color: #fff;
	}

	&__text {
		color: #fff;
	}
}
</style>
