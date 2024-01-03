<script setup lang="ts">
import ArrowDown from '@/components/icons/ArrowDown.vue'
import ButtonMain from '@/components/ui/ButtonMain.vue'
import InputText from '@/components/ui/InputText.vue'
import { useDark } from '@vueuse/core'
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import Dropdown from 'primevue/dropdown'
import { computed, onBeforeMount, ref, watch } from 'vue'
import axios from 'axios'
import { useToast } from 'primevue/usetoast'
import { storeToRefs } from 'pinia'
import { useFacebookStore } from '@/stores/facebook'
import Toast from 'primevue/toast'

const facebookStore = useFacebookStore()
const { filterByStatus } = storeToRefs(facebookStore)

onBeforeMount(async () => {
    const responseStatus = await axios.post('stats/info')
    const { valid, invalid } = responseStatus.data.statuses

    statuses.value = [...valid, ...invalid].map((item) => ({
        name: item.text,
        value: item.status,
    }))

    validStatuses.value = [...valid].map((item) => ({
        name: item.text,
        value: item.status,
    }))
})

const validStatuses = ref([])
const statuses = ref([])

const selectedGeo = ref<string>('')
const geo = ref([
	{ name: 'UA' }
])

const selectedNowStatus = ref<string>('')
const nowStatus = computed(() => statuses.value.filter((item) => item.value !== selectedNewStatus.value))

const selectedNewStatus = ref<string>('')
const newStatus = ref([
	{ name: 'готов к заливу', value: '' }
])

const logi = ref('')

const toast = useToast()
const changeStatus = async () => {
    if (!selectedNewStatus.value || !selectedNewStatus.value) {
        toast.add({
            severity: 'info',
            summary: ``,
            detail: 'Заполните необходимые поля',
            life: 3000,
        })

        return false
    }

    const res = await axios.post('facebook/mass-change-status', {
        status_from: selectedNowStatus.value.value,
        status_to: selectedNewStatus.value.value,
    })
}
</script>

<template>
	<Accordion :activeIndex="1">
		<AccordionTab :pt="{
            headerAction: { class: 'accordion__headeraction' },
             content: { class: 'accordion__content' },
                root: { class: 'accordion__tab' },
            }"
        >
			<template #header>
				<div class="facebook__item">
					<h3 class="facebook__subtitle">Дополнительно</h3>
					<button class="facebook__btn">
						<ArrowDown class="facebook__arrow" />
					</button>
				</div>
			</template>
			<div class="facebook__add">
				<div class="facebook__add-filter">
					<span class="facebook__add-text">Фильтр</span>
					<div class="facebook__add-item">
						<div class="facebook__add-dropdown">
                            <Dropdown
                                v-model="filterByStatus"
                                @change="facebookStore.getFacebookData"
                                icon="none"
                                :options="validStatuses"
                                optionLabel="name"
                                placeholder="чекпоинт"
								unstyled
								:pt="{
                                    root: { class: 'status__root' },
                                    trigger: { class: 'status__trigger' },
                                    panel: { class: 'status__panel' },
                                    item: { class: 'status__item' },
                                    input: { class: 'status__input' },
                                    wrapper: { style: {
                                         maxHeight: '200px',
                                            overflow: 'auto',
                                        },
                                    },
                                }"
                            />
							<span class="facebook__add-span">Статус:</span>
						</div>

					</div>
				</div>
<!--				<div class="facebook__add-import">
					<span class="facebook__add-text facebook__add-text_add">Импорт аккаунтов из логов</span>
					<div class="facebook__add-content">
						<InputText v-model:input="logi" type="text" class="facebook__add-input" alt="Логи" src="/icons/paperclip.svg"
							placeholder="Логи" v-if="!isDark" />
						<InputText v-model:input="logi" type="text" class="facebook__add-input" alt="Логи"
							src="/icons/paperclip-dark.svg" placeholder="Логи" v-else />
						<button class="facebook__add-btn">
							<img class="facebook__add-img" src="/icons/upload.svg" alt="Импортировать">
							<span>Импортировать</span>
						</button>
					</div>
				</div>-->
				<div class="facebook__add-status">
					<span class="facebook__add-text facebook__add-text_add">Изменить статус</span>
					<div class="facebook__add-down">
						<div class="facebook__add-content">
							<div class="facebook__add-items">
								<div class="facebook__add-dropdown">
									<Dropdown v-model="selectedNowStatus"
                                              icon="none"
                                              :options="nowStatus"
                                              optionLabel="name"
                                              placeholder="текущий статус"
                                              unstyled
                                              :pt="{
                                                  root: { class: 'now__root' },
                                                  trigger: { class: 'now__trigger' },
                                                  panel: { class: 'now__panel' },
                                                  item: { class: 'now__item' },
                                                  input: { class: 'now__input' },
                                                  wrapper: { style: {
                                                      maxHeight: '200px',
                                                    overflow: 'auto',
                                                },
                                            },
                                        }"
                                    />
									<span class="facebook__add-span">Текущий статус:</span>
								</div>
								<div class="facebook__add-dropdown">
									<Dropdown v-model="selectedNewStatus"
                                              icon="none"
                                              :options="statuses"
                                              optionLabel="name"
                                              placeholder="новый статус"
                                              unstyled
                                              :pt="{
                                                  root: { class: 'new__root' },
                                                  trigger: { class: 'new__trigger' },
                                                  panel: { class: 'new__panel' },
                                                  item: { class: 'new__item' },
                                                  input: { class: 'new__input' },
                                                  wrapper: {style: {
                                                      maxHeight: '200px',
                                                    overflow: 'auto',
                                                },
                                            },
                                        }"
                                    />
									<span class="facebook__add-span">Новый статус:</span>
								</div>
							</div>
                            <Toast />
							<ButtonMain text="Изменить" class="facebook__add-edit" @click="changeStatus" />
						</div>
					</div>
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
        color: #091c31;
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

	&__inner-item {
		display: flex;
		justify-content: space-between;
		margin-bottom: 25px;
	}

	&__inner-btn {
		width: 24px;
		height: 24px;
	}

	&__add-filter {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 32px;

		@media only screen and (max-width: 829px) and (min-width: 320px) {
			flex-direction: column;
			align-items: flex-start;
			gap: 20px;
			margin-bottom: 20px;
		}
	}

	&__add-text {
        font-family: 'Inter', sans-serif;
		font-style: normal;
		font-weight: 500;
		line-height: 21px;
        color: #091c31;

		&_add {
			transform: translateY(10px);
		}
	}

	&__add-item {
		display: flex;
		align-items: center;
		gap: 24px;
		max-width: 718px;
		width: 100%;

		@media only screen and (max-width: 1439px) and (min-width: 430px) {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
		}

		@media only screen and (max-width: 1100px) and (min-width: 830px) {
			max-width: 550px;
		}

		@media only screen and (max-width: 829px) and (min-width: 320px) {
			max-width: 100%;
		}

		@media only screen and (max-width: 429px) and (min-width: 320px) {
			flex-direction: column;
			align-items: flex-start;
			gap: 20px;
		}
	}

	&__add-down {
		max-width: 718px;
		width: 100%;

		@media only screen and (max-width: 1100px) and (min-width: 830px) {
			max-width: 550px;
		}

		@media only screen and (max-width: 829px) and (min-width: 320px) {
			max-width: 100%;
		}
	}

	&__add-dropdown {
		position: relative;

		@media only screen and (max-width: 429px) and (min-width: 320px) {
			width: 100%;
		}
	}

	&__add-span {
		position: absolute;
        font-family: 'Inter', sans-serif;
		font-weight: 500;
		line-height: 21px;
		top: 50%;
		transform: translateY(-50%);
		left: 8px;
        color: #091c31;

		@media only screen and (max-width: 1439px) and (min-width: 320px) {
			display: none;
		}
	}

	&__add-import {
		display: flex;
		justify-content: space-between;
		margin-bottom: 32px;

		@media only screen and (max-width: 829px) and (min-width: 320px) {
			flex-direction: column;
			gap: 20px;
			margin-bottom: 20px;
		}
	}

	&__add-content {
		max-width: 718px;
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 12px;

		@media only screen and (max-width: 1100px) and (min-width: 830px) {
			max-width: 550px;
		}

		@media only screen and (max-width: 829px) and (min-width: 320px) {
			max-width: 100%;
			width: 100vw;
		}
	}

	&__add-input {
		max-width: 718px;

		@media only screen and (max-width: 829px) and (min-width: 320px) {
			max-width: 100%;
		}
	}

	&__add-btn {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 7px 16px;
		width: 174px;
		height: 44px;
		justify-content: center;
		border-radius: 10px;
        background-color: #0067d5;
        font-family: 'Manrope', sans-serif;
		font-size: 15px;
		font-weight: 400;
		line-height: 22px;
		letter-spacing: 0.2px;
		color: #fff;

		@media only screen and (max-width: 829px) and (min-width: 320px) {
			width: 100%;
		}
	}

	&__add-items {
		display: flex;
		align-items: center;
		gap: 24px;
		max-width: 718px;
		width: 100%;

		@media only screen and (max-width: 1439px) and (min-width: 430px) {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
		}

		@media only screen and (max-width: 829px) and (min-width: 320px) {
			max-width: 100%;
            display: flex;
            flex-wrap: wrap;
		}

		@media only screen and (max-width: 429px) and (min-width: 320px) {
			flex-direction: column;
			align-items: flex-start;
			gap: 20px;

            .facebook__add-dropdown {
                width: 100%;
            }
		}
	}

	&__add-status {
		display: flex;
		justify-content: space-between;

		@media only screen and (max-width: 829px) and (min-width: 320px) {
			flex-direction: column;
			gap: 20px;
			width: 100%;
		}
	}

	&__add-edit {
		width: 104px;

		@media only screen and (max-width: 829px) and (min-width: 320px) {
			width: 100%;
		}
	}
    &__arrow {
        color: #000;
    }
}

:deep(.now__input, .new__input) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

:deep(.new__input) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

:deep(.status__input) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

:deep(.now__trigger) {
    flex-shrink: 0;
}
:deep(.status__trigger) {
    flex-shrink: 0;
}
:deep(.status__trigger) {
    flex-shrink: 0;
}

.dark .facebook {

	&__subtitle {
		color: #fff;
	}

	&__add-text {
		color: #fff;
	}

	&__add-span {
		color: #eee;
	}
}
</style>
