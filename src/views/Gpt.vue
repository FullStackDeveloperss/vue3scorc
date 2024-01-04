<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue'
import InputText from '@/components/ui/InputText.vue'
import InputSwitch from 'primevue/inputswitch'
import Textarea from '@/components/ui/Textarea.vue'
import axios from 'axios'
import { reactive, onBeforeMount } from 'vue'
import { startWatch, setFields } from '@/helpers'
import type { Fields } from '@/types/gpt'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

onBeforeMount(async () => {
    try {
        const res = await axios.post('setting/get', { code: 'chat-gpt' })
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
    startWatch(fields, 'chat-gpt')
})

const fields: Fields = reactive({
    chat_gpt_api_key: '',
    chat_gpt_random_farm: true,
    chat_gpt_script_farm_by_days: false,
    chat_gpt_script_farm_day_1: ' ',
    chat_gpt_script_farm_day_2: ' ',
    chat_gpt_script_farm_day_3: ' ',
    chat_gpt_script_farm_day_4: ' ',
    chat_gpt_script_farm_day_5: ' ',
    chat_gpt_script_farm_day_6: ' ',
    chat_gpt_script_farm_day_7: ' ',
    chat_gpt_script_farm_day_8: ' ',
    chat_gpt_script_farm_day_9: ' ',
    chat_gpt_script_farm_day_10: ' ',
    chat_gpt_script_farm_day_11: ' ',
    chat_gpt_script_farm_day_12: ' ',
    chat_gpt_script_farm_day_13: ' ',
    chat_gpt_script_farm_day_14: ' ',
})
</script>

<template>
    <AppLayout>
        <div class="gpt">
            <h2 class="gpt__title title">Фарм Chat GPT</h2>
            <div class="gpt__inner">
                <div class="gpt__item">
                    <InputText v-model:input="fields.chat_gpt_api_key" type="text" placeholder="Chat GPT API key" />
                </div>

                <div class="gpt__item" v-if="fields.chat_gpt_api_key !== '' && fields.chat_gpt_api_key !== null">
                    <InputSwitch v-model="fields.chat_gpt_random_farm" />
                    <span class="gpt__text">Рандомный фарм</span>
                </div>
                <div class="gpt__item" v-if="fields.chat_gpt_api_key !== '' && fields.chat_gpt_api_key !== null">
                    <InputSwitch v-model="fields.chat_gpt_script_farm_by_days" />
                    <span class="gpt__text">Фарм дням по сценариям</span>
                </div>

                <template
                    v-if="
                        fields.chat_gpt_script_farm_by_days === true &&
                        fields.chat_gpt_api_key !== '' &&
                        fields.chat_gpt_api_key !== null
                    "
                >
                    <div class="gpt__item" v-for="index in 14" :key="index">
                        <span class="gpt__text">День {{ index }}</span>
                        <Textarea v-model:input="fields['chat_gpt_script_farm_day_' + index]" type="text" />
                    </div>
                </template>
            </div>
        </div>
    </AppLayout>
</template>

<style lang="scss" scoped>
.gpt {
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

.dark .gpt {
    &__inner {
        background-color: #091c31;
        box-shadow: none;
    }
    &__text {
        color: #fff;
    }
}
</style>
