<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue'
import InputText from '@/components/ui/InputText.vue'
import Textarea from '@/components/ui/Textarea.vue'
import InputSwitch from 'primevue/inputswitch'
import RadioButton from 'primevue/radiobutton'
import Slider from 'primevue/slider'
import { reactive, onBeforeMount } from 'vue'
import { startWatch, setFields } from '@/helpers'
import axios from 'axios'
import type { Fields } from '@/types/messenger'
import { useToast } from 'primevue/usetoast'

const toast = useToast()
onBeforeMount(async () => {
    try {
        const res = await axios.post('setting/get', { code: 'messenger' })
        setFields(fields, res.data.fields)
    } catch (error) {
        console.log(error)
        toast.add({
            severity: 'error',
            summary: ``,
            detail: 'Ошибка загрузки данных',
            life: 3000,
        })
    }
    startWatch(fields, 'messenger')
})

const fields: Fields = reactive({
    messenger: false,
    message_max: 0,
    message_total: 0,
    message_interval: [1, 10],
    message_check_new: 0,
    message_check_unread: 0,
    dialog_flow: false,
    dialog_flow_api_key: '',
    dialog_flow_bot_name: '',
    dialog_flow_bot_lang: '',
    message_tempate_1: '',
    message_tempate_2: '',
    message_tempate_3: '',
    message_tempate_4: '',
    message_tempate_5: '',
    message_tempate_6: '',
    message_tempate_7: '',
    write_messages_first: false,
})
</script>

<template>
    <AppLayout>
        <div class="messenger">
            <h2 class="messenger__title title">Настройка мессенджера</h2>
            <div class="messenger__inner">
                <div class="messenger__item messenger__item_reverse">
                    <InputSwitch v-model="fields.messenger" />
                    <span class="messenger__text">Включить мессенджер</span>
                </div>
                <div class="messenger__item" v-if="fields.messenger === true">
                    <span class="messenger__text">Максимально количество сообщений на человека</span>
                    <Slider v-model="fields.message_max" :min="1" :max="7" />
                </div>
                <div class="messenger__item" v-if="fields.messenger === true">
                    <span class="messenger__text">Сколько всего писать сообщений</span>
                    <Slider v-model="fields.message_total" :min="0" :max="99" />
                </div>
                <div class="messenger__item" v-if="fields.messenger === true">
                    <span class="messenger__text">Интервал</span>
                    <Slider v-model="fields.message_interval" :min="1" :max="60" :range="true" />
                </div>
                <div class="messenger__item" v-if="fields.messenger === true">
                    <span class="messenger__text">Интервал проверки новых сообщений</span>
                    <Slider v-model="fields.message_check_new" :min="1" :max="10" />
                </div>
                <div class="messenger__item" v-if="fields.messenger === true">
                    <span class="messenger__text">Сколько раз проверять непрочитанные</span>
                    <Slider v-model="fields.message_check_unread" :min="1" :max="10" />
                </div>
                <div class="messenger__item messenger__item_reverse" v-if="fields.messenger === true">
                    <InputSwitch v-model="fields.write_messages_first" />
                    <span class="messenger__text">Писать сообщения первым</span>
                </div>
<!--                <div class="messenger__item messenger__item_reverse" v-if="fields.messenger === true">-->
<!--                    <InputSwitch v-model="fields.dialog_flow" />-->
<!--                    <span class="messenger__text">DialogFlow</span>-->
<!--                </div>-->
                <div class="messenger__item" v-if="fields.dialog_flow === true">
                    <span class="messenger__text">DialogFlow API key</span>
                    <InputText v-model:input="fields.dialog_flow_api_key" type="text" />
                </div>
                <div class="messenger__item" v-if="fields.dialog_flow === true">
                    <span class="messenger__text">DialogFlow Название бота</span>
                    <InputText v-model:input="fields.dialog_flow_bot_name" type="text" />
                </div>
                <div class="messenger__item" v-if="fields.dialog_flow === true">
                    <span class="messenger__text">DialogFlow Язык общения бота</span>
                    <div class="messenger__info">
                        <div class="messenger__radio">
                            <RadioButton
                                v-model="fields.dialog_flow_bot_lang"
                                inputId="russian"
                                name="dialog_flow_bot_lang"
                                value="rus"
                            />
                            <label class="messenger__text" for="russian">Русский</label>
                        </div>
                        <div class="messenger__radio">
                            <RadioButton v-model="fields.dialog_flow_bot_lang" inputId="english" name="lang" value="eng" />
                            <label class="messenger__text" for="english">Английский</label>
                        </div>
                    </div>
                </div>
                <div class="messenger__item" v-if="fields.messenger === true">
                    <span class="messenger__text">Сообщение #1</span>
                    <Textarea v-model:input="fields.message_tempate_1" />
                </div>
                <div class="messenger__item" v-if="fields.messenger === true">
                    <span class="messenger__text">Сообщение #2</span>
                    <Textarea v-model:input="fields.message_tempate_2" />
                </div>
                <div class="messenger__item" v-if="fields.messenger === true">
                    <span class="messenger__text">Сообщение #3</span>
                    <Textarea v-model:input="fields.message_tempate_3" />
                </div>
                <div class="messenger__item" v-if="fields.messenger === true">
                    <span class="messenger__text">Сообщение #4</span>
                    <Textarea v-model:input="fields.message_tempate_4" />
                </div>
                <div class="messenger__item" v-if="fields.messenger === true">
                    <span class="messenger__text">Сообщение #5</span>
                    <Textarea v-model:input="fields.message_tempate_5" />
                </div>
                <div class="messenger__item" v-if="fields.messenger === true">
                    <span class="messenger__text">Сообщение #6</span>
                    <Textarea v-model:input="fields.message_tempate_6" />
                </div>
                <div class="messenger__item" v-if="fields.messenger === true">
                    <span class="messenger__text">Сообщение #7</span>
                    <Textarea v-model:input="fields.message_tempate_7" />
                </div>
            </div>
        </div>
    </AppLayout>
</template>

<style lang="scss" scoped>
.messenger {
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

    &__info {
        display: flex;
        align-items: center;
        gap: 20px;

        @media only screen and (max-width: 429px) and (min-width: 320px) {
            flex-direction: column;
            gap: 10px;
            align-items: flex-start;
        }
    }

    &__radio {
        display: flex;
        align-items: center;
        gap: 10px;
    }
}

.dark .messenger {
    &__inner {
        background-color: #091c31;
        box-shadow: none;
    }

    &__text {
        color: #fff;
    }
}
</style>
