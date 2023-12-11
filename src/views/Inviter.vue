<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue'
import Textarea from '@/components/ui/Textarea.vue'
import InputSwitch from 'primevue/inputswitch'
import Slider from 'primevue/slider'
import { reactive, onBeforeMount, watch } from 'vue'
import axios from 'axios'
import { startWatch, setFields } from '@/helpers'
import type { Fields } from '@/types/inviter'

const fields: Fields = reactive({
    inviter: '',
    day_to_start_inviter: 1,
    check_white_list_names: '',
    check_black_list_names: '',
    inviter_geo: '',
    groups_for_parsing_target_audience: '',
})

onBeforeMount(async () => {
    try {
        const res = await axios.post('setting/get', { code: 'general' })
        setFields(fields, res.data.fields)
    } catch (error) {
        console.log(error)
    }
    startWatch(fields, 'general')
})

// const inviter = ref<boolean>(false)
// const dayInviter = ref<number | number[]>()
// const whiteList = ref<boolean>(false)
// const blackList = ref<boolean>(false)
// const geo = ref<string>('')
// const group = ref<string>('')
</script>

<template>
    <AppLayout>
        <div class="inviter">
            <h2 class="inviter__title title">Настройка инвайтера</h2>
            <div class="inviter__inner">
                <div class="inviter__item inviter__item_reverse">
                    <InputSwitch v-model="fields.inviter" />
                    <span class="inviter__text">Инвайтер</span>
                </div>
                <div class="inviter__item">
                    <span class="inviter__text">На какой день запускать инвайтер</span>
                    <Slider v-model="fields.day_to_start_inviter" :min="1" :max="10" />
                </div>
                <div class="inviter__item inviter__item_reverse">
                    <InputSwitch v-model="fields.check_white_list_names" />
                    <span class="inviter__text">Проверять White list имен</span>
                </div>
                <div class="inviter__item inviter__item_reverse">
                    <InputSwitch v-model="fields.check_black_list_names" />
                    <span class="inviter__text">Проверять Black list имен</span>
                </div>
                <div class="inviter__item">
                    <span class="inviter__text">Гео</span>
                    <Textarea v-model:input="fields.inviter_geo" />
                </div>
                <div class="inviter__item">
                    <span class="inviter__text">Группы для парсинга целевой аудитории</span>
                    <Textarea v-model:input="fields.groups_for_parsing_target_audience" />
                </div>
            </div>
        </div>
    </AppLayout>
</template>

<style lang="scss" scoped>
.inviter {
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

.dark .inviter {
    &__inner {
        background-color: #091c31;
        box-shadow: none;
    }

    &__text {
        color: #fff;
    }
}
</style>
