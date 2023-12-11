<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue'
import InputText from '@/components/ui/InputText.vue'
import type { Fields } from '@/types/autofill'
import axios from 'axios'
import InputSwitch from 'primevue/inputswitch'
import Slider from 'primevue/slider'
import { onBeforeMount, reactive } from 'vue'
import { startWatch, setFields } from '@/helpers'

onBeforeMount(async () => {
    try {
        const res = await axios.post('setting/get', { code: 'autoupload' })
        setFields(field, res.data.fields)
    } catch (error) {
        console.log(error)
    }
    startWatch(field, 'autoupload')
})

const field: Fields = reactive({
    dolphin_transfer_accountes: false,
    dolphin_token: '',
    dolphin_farm_days_to_transfer: 92,
    dolphin_have_friends_to_transfer: 0,
    dolphin_fixer_enable: false,
    dolphin_threads: 10,
    dolphin_delete_from_farm_on_transfer: false,
    dolphin_turnoff_farm_on_transfer: false,
    creative_folder_path: 'sdf',
    cards_list: '',
    company_for_import: '',
})
</script>

<template>
    <AppLayout>
        <div class="fill">
            <h2 class="fill__title title">Автозалив</h2>
            <div class="fill__inner">
                <div class="fill__item fill__item_reverse">
                    <InputSwitch v-model="field.dolphin_transfer_accountes" />
                    <span class="fill__text">Передавать аккаунты в Dolphin</span>
                </div>
                <InputText v-model:input="field.dolphin_token" type="text" placeholder="Токен Dolphin" />
                <div class="fill__item">
                    <span class="fill__text">Сколько дней фарма</span>
                    <Slider v-model="field.dolphin_farm_days_to_transfer" :min="0" :max="99" />
                </div>
                <div class="fill__item">
                    <span class="fill__text">Сколько друзей должно быть</span>
                    <Slider v-model="field.dolphin_have_friends_to_transfer" :min="0" :max="9999" />
                </div>
                <div class="fill__item fill__item_reverse">
                    <InputSwitch v-model="field.dolphin_fixer_enable" />
                    <span class="fill__text">Брать аккаунты с Dolphin</span>
                </div>
                <div class="fill__item">
                    <span class="fill__text">Потоки</span>
                    <Slider v-model="field.dolphin_threads" :min="0" :max="99" />
                </div>
                <div class="fill__item fill__item_reverse">
                    <InputSwitch v-model="field.dolphin_delete_from_farm_on_transfer" />
                    <span class="fill__text">Удалять из фарма при переносе в Dolphin</span>
                </div>
                <div class="fill__item fill__item_reverse">
                    <InputSwitch v-model="field.dolphin_turnoff_farm_on_transfer" />
                    <span class="fill__text">Выключать фарм при переносе в Dolphin</span>
                </div>
            </div>
        </div>
    </AppLayout>
</template>

<style lang="scss" scoped>
.fill {
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

.dark .fill {
    &__inner {
        background-color: #091c31;
        box-shadow: none;
    }

    &__text {
        color: #fff;
    }
}
</style>
