<script setup lang="ts">
import RegisterFill from '@/components/RegisterFill.vue'
import RegisterFriends from '@/components/RegisterFriends.vue'
import RegisterMail from '@/components/RegisterMail.vue'
import RegisterPosts from '@/components/RegisterPosts.vue'
import RegisterSex from '@/components/RegisterSex.vue'
import RegisterSites from '@/components/RegisterSites.vue'
import AppLayout from '@/components/layout/AppLayout.vue'
import InputText from '@/components/ui/InputText.vue'
import Dropdown from 'primevue/dropdown'
import InputSwitch from 'primevue/inputswitch'
import Slider from 'primevue/slider'
import { ref, watch } from 'vue'

import { useRegisterStore } from '@/stores/register'
import { onMounted } from 'vue'

const registerStore = useRegisterStore()

onMounted(async () => {
    await registerStore.getData()
    registerStore.initWatch()
})

// const laying = ref<number>(1)
// const stream = ref<number>(1)
// const amountAccounts = ref<any>()
// const timeRegister = ref<number[]>([0, 10])
// const registerAround = ref<boolean>(false)
// const rebindTel = ref<boolean>(false)
// const rebindMail = ref<boolean>(false)
// const getTel = ref<boolean>(false)
// const registerMail = ref<boolean>(false)

const selectedWay = ref<{ name: string; value: string }>({ name: '', value: '' })
const ways = ref([
    { name: 'На мобильные ЮА на телефон', value: 'by_mobile_ua_phone' },
    { name: 'Через официальную прилу на запросах', value: 'by_official_app_queries' },
    { name: 'Регистрация на десктопную версию Facebook', value: 'by_phone' },
    { name: 'Оф прилу + веб', value: 'by_app_web' },
])

watch(selectedWay, () => {
    registerStore.fields.reg_way = selectedWay.value.value
})
</script>

<template>
    <AppLayout>
        <div class="register">
            <h2 class="register__title title">Регистрация</h2>
            <div class="register__wrapper">
                <div class="register__inner">
                    <div class="register__item">
                        <span class="register__text">Отлежка</span>
                        <Slider v-model="registerStore.fields.account_pause_after_registr" :min="1" :max="48" />
                    </div>
                    <div class="register__item">
                        <span class="register__text">Потоки</span>
                        <Slider v-model="registerStore.fields.reg_threads_count" :min="1" :max="99" />
                    </div>
                    <div class="register__item">
                        <InputText
                            v-model:input="registerStore.fields.reg_accounts_per_day"
                            type="number"
                            placeholder="Количество аккаунтов"
                        />
                    </div>
                    <div class="register__item" v-if="registerStore.fields.reg_around_the_clock === false">
                        <span class="register__text">Время регистрации</span>
                        <Slider v-model="registerStore.fields.reg_time_range" :min="0" :max="24" :range="true" />
                    </div>
                    <div class="register__item register__item_reverse">
                        <InputSwitch v-model="registerStore.fields.reg_around_the_clock" />
                        <span class="register__item">Регистрировать круглосуточно</span>
                    </div>
                    <div class="register__item">
                        <div class="register__dropdown">
                            <span class="register__text-span">Способ регистрации:</span>
                            <Dropdown
                                v-model="selectedWay"
                                icon="none"
                                :options="ways"
                                optionLabel="name"
                                placeholder="На мобильные ЮА на телефон"
                                unstyled
                                :pt="{
                                    root: { class: 'way__root' },
                                    trigger: { class: 'way__trigger' },
                                    panel: { class: 'way__panel' },
                                    item: { class: 'way__item' },
                                    input: { class: 'way__input' },
                                }"
                            />
                        </div>
                    </div>
                    <div class="register__item register__item_reverse">
                        <InputSwitch v-model="registerStore.fields.relink_to_service_phone" />
                        <span class="register__item">Перепривязывать на номер с сервиса</span>
                    </div>
                    <div class="register__item register__item_reverse">
                        <InputSwitch v-model="registerStore.fields.relink_to_email" />
                        <span class="register__item">Перепривязывать на почту</span>
                    </div>
                    <div class="register__item register__item_reverse">
                        <InputSwitch v-model="registerStore.fields.get_phone_on_reg_ban" />
                        <span class="register__item"
                            >Получать номер телефона при бане аккаунта в момент регистрации</span
                        >
                    </div>
                    <div class="register__item register__item_reverse">
                        <InputSwitch v-model="registerStore.fields.register_to_my_emails" />
                        <span class="register__item">Регистрировать на свои почты</span>
                    </div>
                </div>
                <RegisterMail />
                <RegisterFill />
                <RegisterPosts />
                <RegisterFriends />
                <RegisterSites />
                <RegisterSex />
            </div>
        </div>
    </AppLayout>
</template>

<style lang="scss" scoped>
.register {
    &__title {
        margin-bottom: 24px;

        @media only screen and (max-width: 743px) and (min-width: 320px) {
            margin-bottom: 20px;
        }
    }

    &__wrapper {
        display: flex;
        flex-direction: column;
        gap: 24px;

        @media only screen and (max-width: 743px) and (min-width: 320px) {
            gap: 20px;
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

    &__dropdown {
        position: relative;
        width: 100%;
    }

    &__text-span {
        position: absolute;
        font-family: 'Inter', sans-serif;
        font-weight: 500;
        line-height: 21px;
        top: 50%;
        transform: translateY(-50%);
        left: 16px;
        color: #091c31;

        @media only screen and (max-width: 1439px) and (min-width: 320px) {
            display: none;
        }
    }
}

.dark .register {
    &__inner {
        background-color: #091c31;
        box-shadow: none;
    }

    &__text {
        color: #fff;
    }

    &__text-span {
        color: #fff;
    }
}
</style>
