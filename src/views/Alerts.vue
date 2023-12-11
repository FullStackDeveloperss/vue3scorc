<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue'
import InputText from '@/components/ui/InputText.vue'
import InputSwitch from 'primevue/inputswitch'
import axios from 'axios'
import { reactive, onBeforeMount } from 'vue'
import { startWatch, setFields } from '@/helpers'
import type { Fields } from '@/types/alerts'

onBeforeMount(async () => {
    try {
        const res = await axios.post('setting/get', { code: 'notifications' })
        setFields(fields, res.data.fields)
    } catch (error) {
        console.log(error)
    }
    startWatch(fields, 'notifications')
})

const fields: Fields = reactive({
    logs_to_db_status: true,
    logs_to_telegram_chat_id: '',
    logs_to_telegram_status: true,
    logs_to_telegram_token: '',
    telegram_chat_bot_status: true,
    telegram_reger_status: true,
    telegram_worm_status: true,
    tg_chat_bot_api_token: '',
    tg_chat_bot_chat_id: '',
    tg_reger_api_token: '',
    tg_reger_chat_id: '',
    tg_worm_api_token: '',
    tg_worm_chat_id: '',
})

// const writeLogi = ref<boolean>(false)
// const sendTelegram = ref<boolean>(false)
// const alertReg = ref<boolean>(false)
// const alertWorm = ref<boolean>(false)
// const alertBot = ref<boolean>(false)
// const tokenTelegram = ref<string>('')
// const idTelegram = ref<string>('')
// const tokenReg = ref<string>('')
// const idReg = ref<string>('')
// const tokenWorm = ref<string>('')
// const idWorm = ref<string>('')
// const tokenBot = ref<string>('')
// const idBot = ref<string>('')
</script>

<template>
    <AppLayout>
        <div class="alerts">
            <h2 class="alerts__title title">Telegram</h2>
            <div class="alerts__inner">
                <div class="alerts__item alerts__item_reverse">
                    <InputSwitch v-model="fields.logs_to_db_status" />
                    <span class="alerts__text">Писать логи в БД</span>
                </div>
                <div class="alerts__item alerts__item_reverse">
                    <InputSwitch v-model="fields.logs_to_telegram_status" />
                    <span class="alerts__text">Отправлять все логи в телегу</span>
                </div>
                <div class="alerts__item" v-if="fields.logs_to_telegram_status === true">
                    <span class="alerts__text">Токен</span>
                    <InputText v-model:input="fields.logs_to_telegram_token" type="text" />
                </div>
                <div class="alerts__item" v-if="fields.logs_to_telegram_status === true">
                    <span class="alerts__text">Чат id</span>
                    <InputText v-model:input="fields.logs_to_telegram_chat_id" type="text" />
                </div>
                <div class="alerts__item alerts__item_reverse">
                    <InputSwitch v-model="fields.telegram_reger_status" />
                    <span class="alerts__text">Оповещения по регеру</span>
                </div>
                <div class="alerts__item" v-if="fields.telegram_reger_status === true">
                    <span class="alerts__text">Токен</span>
                    <InputText v-model:input="fields.tg_reger_api_token" type="text" />
                </div>
                <div class="alerts__item" v-if="fields.telegram_reger_status === true">
                    <span class="alerts__text">Чат id</span>
                    <InputText v-model:input="fields.tg_reger_chat_id" type="text" />
                </div>
                <div class="alerts__item alerts__item_reverse">
                    <InputSwitch v-model="fields.telegram_worm_status" />
                    <span class="alerts__text">Оповещения по worm</span>
                </div>
                <div class="alerts__item" v-if="fields.telegram_worm_status === true">
                    <span class="alerts__text">Токен</span>
                    <InputText v-model:input="fields.tg_worm_api_token" type="text" />
                </div>
                <div class="alerts__item" v-if="fields.telegram_worm_status === true">
                    <span class="alerts__text">Чат id</span>
                    <InputText v-model:input="fields.tg_worm_chat_id" type="text" />
                </div>
                <div class="alerts__item alerts__item_reverse">
                    <InputSwitch v-model="fields.telegram_chat_bot_status" />
                    <span class="alerts__text">Оповещения для чат бота</span>
                </div>
                <div class="alerts__item" v-if="fields.telegram_chat_bot_status === true">
                    <span class="alerts__text">Токен</span>
                    <InputText v-model:input="fields.tg_chat_bot_api_token" type="text" />
                </div>
                <div class="alerts__item" v-if="fields.telegram_chat_bot_status === true">
                    <span class="alerts__text">Чат id</span>
                    <InputText v-model:input="fields.tg_chat_bot_chat_id" type="text" />
                </div>
            </div>
        </div>
    </AppLayout>
</template>

<style lang="scss" scoped>
.alerts {
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

.dark .alerts {
    &__inner {
        background-color: #091c31;
        box-shadow: none;
    }

    &__text {
        color: #fff;
    }
}
</style>
