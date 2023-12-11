<script setup lang="ts">
import InputText from '@/components/ui/InputText.vue'
import InputSwitch from 'primevue/inputswitch'
import { useRegisterStore } from '@/stores/register'

const registerStore = useRegisterStore()

// const takeKopeechka = ref<boolean>(false)
// const takeFirstmail = ref<boolean>(false)
// const checkValid = ref<boolean>(false)
// const apiKopeechka = ref<string>('')
// const apiFirstmail = ref<string>('')
</script>

<template>
    <div class="register">
        <div class="register__inner">
            <div class="register__content">
                <h3 class="register__subtitle">Kopeechka.store</h3>
                <div class="register__wrapper">
                    <div class="register__item register__item_reverse">
                        <InputSwitch v-model="registerStore.fields.kopeechka_status" />
                        <span class="register__text">Брать почты с сервиса kopeechka.store</span>
                    </div>
                    <div class="register__item" v-if="registerStore.fields.kopeechka_status === true">
                        <span class="register__text">Api ключ</span>
                        <InputText v-model:input="registerStore.fields.kopeechka_api_key" type="text" />
                    </div>
                    <div
                        class="register__item register__item_reverse"
                        v-if="registerStore.fields.kopeechka_status === true"
                    >
                        <InputSwitch v-model="registerStore.fields.kopeechka_check_valid" />
                        <span class="register__text">Проверять валидность</span>
                    </div>
                </div>
            </div>
            <div class="register__content">
                <h3 class="register__subtitle">Firstmail Limited</h3>
                <div class="register__wrapper">
                    <div class="register__item register__item_reverse">
                        <InputSwitch v-model="registerStore.fields.firstmail_limited_status" />
                        <span class="register__text">Брать почты с сервиса Firstmail Limited</span>
                    </div>
                    <div class="register__item" v-if="registerStore.fields.firstmail_limited_status === true">
                        <span class="register__text">Api ключ</span>
                        <InputText v-model:input="registerStore.fields.firstmail_limited_api_key" type="text" />
                    </div>
                    <div
                        class="register__item register__item_reverse"
                        v-if="registerStore.fields.firstmail_limited_status === true"
                    >
                        <InputSwitch v-model="registerStore.fields.firstmail_limited_check_valid" />
                        <span class="register__text">Проверять валидность</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.register {
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

    &__content {
        display: flex;
        flex-direction: column;
        gap: 28px;
    }

    &__subtitle {
        font-size: 17px;
        font-weight: 500;
        line-height: 28px;
        letter-spacing: 0.18px;
        color: #091c31;
    }

    &__wrapper {
        display: flex;
        flex-direction: column;
        gap: 24px;

        @media only screen and (max-width: 743px) and (min-width: 320px) {
            gap: 20px;
        }
    }

    // .register__item

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

.dark .register {
    &__inner {
        background-color: #091c31;
        box-shadow: none;
    }

    &__subtitle {
        color: #fff;
    }

    &__text {
        color: #fff;
    }
}
</style>
