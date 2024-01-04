<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue'
import InputText from '@/components/ui/InputText.vue'
import InputSwitch from 'primevue/inputswitch'
import Slider from 'primevue/slider'
import axios from 'axios'
import { onBeforeMount, reactive } from 'vue'
import { startWatch, setFields } from '@/helpers'
import type { Fields } from '@/types/zrd'
import { useToast } from 'primevue/usetoast'

const toast = useToast()
onBeforeMount(async () => {
    try {
        const res = await axios.post('setting/get', { code: 'zrd' })
        setFields(fields, res.data.fields)
    } catch (error) {
        toast.add({
            severity: 'error',
            summary: ``,
            detail: 'Ошибка загрузки данных',
            life: 3000,
        })
    }
    startWatch(fields, 'zrd')
})

const fields: Fields = reactive({
    ads_get_token_status: false,
    ads_get_token_day_start: 0,
    ads_get_phone: false,
    ads_try_create_BM: false,
    frequency_zrd_check: 6,
    create_only_FP: false,
    pass_only_zrd: false,
    get_docs_from_diasPro: false,
    draw_docs_by_soft: false,
    docs_from_folder: '',
    background_path: '',
    zrd_checker: true,
    zrd_checker_threads: 1,
})
</script>

<template>
    <AppLayout>
        <div class="zrd">
            <h2 class="zrd__title title">Настройки ЗРД</h2>
            <div class="zrd__inner">
                <div class="zrd__item zrd__item_reverse">
                    <InputSwitch v-model="fields.ads_get_token_status" />
                    <span class="zrd__text">Проходить ЗРД (Получать токен ЕААВ)</span>
                </div>
                <div class="zrd__item">
                    <span class="zrd__text">День старта</span>
                    <Slider v-model="fields.ads_get_token_day_start" :min="0" :max="30" />
                </div>
                <div class="zrd__item">
                    <span class="zrd__text">Как часто проверять проход ЗРД</span>
                    <Slider v-model="fields.frequency_zrd_check" :min="0" :max="24" />
                </div>
                <div class="zrd__item zrd__item_reverse">
                    <InputSwitch v-model="fields.zrd_checker" />
                    <span class="zrd__text">ZRD Checker</span>
                </div>
                <div class="zrd__item" v-if="fields.zrd_checker === true">
                    <span class="zrd__text">ZRD Checker потоки</span>
                    <Slider v-model="fields.zrd_checker_threads" :min="1" :max="99" />
                </div>
                <div class="zrd__item zrd__item_reverse">
                    <InputSwitch v-model="fields.pass_only_zrd" />
                    <span class="zrd__text">Проходит только ЗРД</span>
                </div>
                <div class="zrd__item zrd__item_reverse">
                    <InputSwitch v-model="fields.ads_get_phone" />
                    <span class="zrd__text">Получать номер</span>
                </div>
                <div class="zrd__item zrd__item_reverse">
                    <InputSwitch v-model="fields.ads_try_create_BM" />
                    <span class="zrd__text">Пробовать создать БМ</span>
                </div>
                <div class="zrd__item zrd__item_reverse">
                    <InputSwitch v-model="fields.create_only_FP" />
                    <span class="zrd__text">Создавать только ФП</span>
                </div>
                <div class="zrd__item zrd__item_reverse">
                    <InputSwitch v-model="fields.get_docs_from_diasPro" />
                    <span class="zrd__text">Брать доки с dias.pro</span>
                </div>
                <div class="zrd__item zrd__item_reverse">
                    <InputSwitch v-model="fields.draw_docs_by_soft" />
                    <span class="zrd__text">Отрисовывать доки софтом</span>
                </div>
                <InputText
                    v-model:input="fields.docs_from_folder"
                    type="text"
                    placeholder="Брать доки из своей папки"
                />
                <InputText
                    v-model:input="fields.background_path"
                    type="text"
                    placeholder="Устанавливать свои фоны (необходимо разрешение 1500х1500)"
                />
            </div>
        </div>
    </AppLayout>
</template>

<style lang="scss" scoped>
.zrd {
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

.dark .zrd {
    &__inner {
        background-color: #091c31;
        box-shadow: none;
    }

    &__text {
        color: #fff;
    }
}
</style>
