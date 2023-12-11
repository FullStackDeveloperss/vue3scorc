<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue'
import Dropdown from 'primevue/dropdown'
import InputSwitch from 'primevue/inputswitch'
import Slider from 'primevue/slider'
import axios from 'axios'
import { ref, reactive, onBeforeMount, watch } from 'vue'
import { startWatch, setFields } from '@/helpers'
import type { Fields } from '../types/checkpoint'

onBeforeMount(async () => {
    try {
        const res = await axios.post('setting/get', { code: 'checkpoint' })
        setFields(fields, res.data.fields)
    } catch (error) {
        console.log(error)
    }
    startWatch(fields, 'checkpoint')
})

const fields: Fields = reactive({
    get_phone_to_account_with_invalid_phone: false,
    should_be_friends_on_account: false,
    days_after_reg_to_get_phone: 0,
    unban_accounts_blocked_status: true,
    get_all_invalid_statuses: false,
    get_statuses: [],
})

const selectedCheckpoint = ref<{ name: string; value: string }>({ name: '', value: '' })
const checkpoint = ref([{ name: 'Запрет рекламной деятельности', value: 'zrd' }])

watch(selectedCheckpoint, () => {
    fields.get_statuses = [selectedCheckpoint.value.value]
})
</script>

<template>
    <AppLayout>
        <div class="checkpoint">
            <h2 class="checkpoint__title title">Настройки чекпоинта</h2>
        </div>
        <div class="checkpoint__inner">
            <div class="checkpoint__item checkpoint__item_reverse">
                <InputSwitch v-model="fields.get_phone_to_account_with_invalid_phone" />
                <span class="checkpoint__text">Получать номер телефона аккаунтам слетевшим на телефон</span>
            </div>
            <div class="checkpoint__item checkpoint__item_reverse">
                <InputSwitch
                    v-model="fields.should_be_friends_on_account"
                    v-if="fields.get_phone_to_account_with_invalid_phone === true"
                />
                <span class="checkpoint__text">Должны ли быть друзья на аккаунте</span>
            </div>
            <div class="checkpoint__item checkpoint__item_reverse">
                <InputSwitch v-model="fields.unban_accounts_blocked_status" />
                <span class="checkpoint__text"
                    >Получать номер телефона аккаунтам в статусе: "Заблокирован рекламный кабинет навсегда"</span
                >
            </div>
            <div class="checkpoint__item" v-if="fields.get_phone_to_account_with_invalid_phone === true">
                <span class="checkpoint__text">Дней с момента регистрации</span>
                <Slider v-model="fields.days_after_reg_to_get_phone" :min="0" :max="100" />
            </div>
            <div class="checkpoint__item checkpoint__item_reverse">
                <InputSwitch v-model="fields.get_all_invalid_statuses" />
                <span class="checkpoint__text">Брать все невалидные статусы</span>
            </div>
            <Dropdown
                v-model="selectedCheckpoint"
                icon="none"
                :options="checkpoint"
                optionLabel="name"
                placeholder="Брать статусы"
                unstyled
                :pt="{
                    root: { class: 'checkpoints__root' },
                    trigger: { class: 'checkpoints__trigger' },
                    panel: { class: 'checkpoints__panel' },
                    item: { class: 'checkpoints__item' },
                    input: { class: 'checkpoints__input' },
                }"
            />
        </div>
    </AppLayout>
</template>

<style lang="scss" scoped>
.checkpoint {
    &__title {
        margin-bottom: 24px;

        @media only screen and (max-width: 743px) and (min-width: 320px) {
            margin-bottom: 20px;
        }
    }

    &__inner {
        display: flex;
        flex-direction: column;
        gap: 24px;
        padding: 24px 32px 36px;
        border-radius: 24px;
        background-color: #fff;
        box-shadow: 0px 6px 32px 0px rgba(0, 0, 0, 0.05);

        @media only screen and (max-width: 743px) and (min-width: 320px) {
            gap: 20px;
        }
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

        &_reverse {
            @media only screen and (max-width: 429px) and (min-width: 320px) {
                flex-direction: column-reverse;
            }
        }
    }

    &__text {
        font-family: 'Inter', sans-serif;
        font-weight: 500;
        line-height: 21px;
        color: #091c31;
    }
}

.dark .checkpoint {
    &__inner {
        background-color: #091c31;
        box-shadow: none;
    }

    &__text {
        color: #fff;
    }
}
</style>
