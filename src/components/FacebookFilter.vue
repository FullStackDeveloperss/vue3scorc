<script setup lang="ts">
import InputText from '@/components/ui/InputText.vue'
import { useFacebookStore } from '@/stores/facebook'
import { storeToRefs } from 'pinia'
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import Checkbox from 'primevue/checkbox'
import ArrowDown from './icons/ArrowDown.vue'

const facebookStore = useFacebookStore()
const { filterBy } = storeToRefs(facebookStore)
</script>

<template>
	<Accordion :activeIndex="1">
		<AccordionTab :pt="{ headerAction: { class: 'accordion__headeraction' }, content: { class: 'accordion__content' }, }">
			<template #header>
				<div class="facebook__item">
					<h3 class="facebook__subtitle">Фильтр</h3>
					<button class="facebook__btn">
						<ArrowDown class="facebook__arrow" />
					</button>
				</div>
			</template>
			<div class="facebook__inner-checkbox">
				<div class="facebook__inner-info">
					<Checkbox v-model="filterBy.eaab_token" :binary="true" @change="facebookStore.getFacebookData" :pt="{
						root: { class: 'checkbox__root' }
					}" />
					<label class="facebook__inner-text">EEAB Tokens</label>
				</div>
				<div class="facebook__inner-info">
					<Checkbox v-model="filterBy.fp" :binary="true" @change="facebookStore.getFacebookData" :pt="{
						root: { class: 'checkbox__root' }
					}" />
					<label class="facebook__inner-text" for="fp">FP</label>
				</div>
				<div class="facebook__inner-info">
					<Checkbox v-model="filterBy.avatar" :binary="true" @change="facebookStore.getFacebookData" :pt="{
						root: { class: 'checkbox__root' }
					}" />
					<label class="facebook__inner-text" for="avatar">Аватарка</label>
				</div>
				<div class="facebook__inner-info">
					<Checkbox v-model="filterBy.mail" :binary="true" @change="facebookStore.getFacebookData" :pt="{
						root: { class: 'checkbox__root' }
					}" />
					<label class="facebook__inner-text" for="filter">Почта</label>
				</div>
				<div class="facebook__inner-info">
					<Checkbox v-model="filterBy.no_mail" :binary="true" @change="facebookStore.getFacebookData" :pt="{
						root: { class: 'checkbox__root' }
					}" />
					<label class="facebook__inner-text" for="withoutMail">Без почты</label>
				</div>
				<div class="facebook__inner-info">
					<Checkbox v-model="filterBy.cookies" :binary="true" @change="facebookStore.getFacebookData" :pt="{
						root: { class: 'checkbox__root' }
					}" />
					<label class="facebook__inner-text" for="cookies">Cookies</label>
				</div>
			</div>
			<div class="facebook__inner-search">
				<div class="facebook__inner-search_left">
					<div class="facebook__inner-info">
						<Checkbox v-model="filterBy.launched" :binary="true" @change="facebookStore.getFacebookData" :pt="{
							root: { class: 'checkbox__root' }
						}" />
						<label class="facebook__inner-text facebook__inner-text_much" for="numS">Количество запусков</label>
					</div>
					<InputText v-model:input="filterBy.launched_count" @change="facebookStore.getFacebookData" type="number"
						class="facebook__inner-input facebook__inner-input_start" />
				</div>
				<div class="facebook__inner-search_right">
					<div class="facebook__inner-info">
						<Checkbox v-model="filterBy.search_by_login" :binary="true" @change="facebookStore.getFacebookData" :pt="{
							root: { class: 'checkbox__root' }
						}" />
						<label class="facebook__inner-text facebook__inner-text_add" for="searchL">Поиск по логину</label>
					</div>
					<InputText v-model:input="filterBy.search_by_login_query" @change="facebookStore.getFacebookData" type="text"
						class="facebook__inner-input facebook__inner-input_search" />
				</div>
			</div>
		</AccordionTab>
	</Accordion>
</template>

<style lang="scss" scoped>
.facebook {

	&__subtitle {
		font-size: 17px;
		font-weight: 500;
		line-height: 28px;
		letter-spacing: 0.18px;
		color: #091C31;
	}

	&__item {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	&__btn {
		width: 24px;
		height: 24px;
	}

	&__inner-checkbox {
		display: flex;
		align-items: center;
		gap: 16px;
		margin-bottom: 25px;

		@media only screen and (max-width: 743px) and (min-width: 320px) {
			flex-wrap: wrap;
			align-items: flex-start;
		}
	}

	&__inner-info {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	&__inner-text {
		color: #091C31;
		cursor: pointer;

		&_add {
			width: 133px;
		}

		&_much {
			width: 172px;
		}
	}

	&__inner-input {
		gap: 0;

		&_start {
			width: 141px;

			@media only screen and (max-width: 743px) and (min-width: 320px) {
				width: 100%;
			}
		}

		&_search {
			max-width: 719px;
		}
	}

	&__inner-search {
		display: flex;
		align-items: center;
		gap: 28px;

		@media only screen and (max-width: 743px) and (min-width: 320px) {
			flex-direction: column;
			align-items: flex-start;
			gap: 20px;
		}

		&_left {
			width: 100%;
			max-width: 335px;
			display: flex;
			align-items: center;
			gap: 12px;

			@media only screen and (max-width: 743px) and (min-width: 320px) {
				max-width: 100%;
				flex-direction: column;
				align-items: flex-start;
				gap: 13px;
			}
		}

		&_right {
			width: 100%;
			display: flex;
			align-items: center;
			gap: 12px;

			@media only screen and (max-width: 743px) and (min-width: 320px) {
				flex-direction: column;
				align-items: flex-start;
				gap: 13px;
			}
		}
	}

    &__arrow {
        color: #000;
    }
}

.dark .facebook {
	&__subtitle {
		color: #fff;
	}

	&__inner-text {
		color: #fff;
	}
}
</style>

