<script setup lang="ts">
import InputSwitch from 'primevue/inputswitch'
import Slider from 'primevue/slider'
import { useAutoserverStore } from '@/stores/autoserver'

const autoserverStore = useAutoserverStore()
</script>

<template>
    <div class="auto">
        <div class="auto__inner">
            <h3 class="auto__subtitle">Общие настройки</h3>
            <div class="auto__wrapper">
                <div class="auto__item auto__item_reverse">
                    <InputSwitch v-model="autoserverStore.fields.remove_invalid_accounts" />
                    <span class="auto__text">Удалять невалидные аккаунты</span>
                </div>
                <div class="auto__item auto__item_reverse">
                    <InputSwitch v-model="autoserverStore.fields.template_auto_update" />
                    <span class="auto__text">Автоматически обновлять шаблоны</span>
                </div>
                <div class="auto__item auto__item_reverse">
                    <InputSwitch v-model="autoserverStore.fields.server_auto_reboot" />
                    <span class="auto__text">Автоматически перезагружать сервер</span>
                </div>

                <div class="posting__item" v-if="autoserverStore.fields.server_auto_reboot === true">
                    <span class="posting__text">День старта</span>
                    <Slider v-model="autoserverStore.fields.servert_auto_reboot_at" :min="1" :max="24" />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.auto {
    &__inner {
        padding: 24px 32px 36px;
        border-radius: 24px;
        background-color: #fff;
        box-shadow: 0px 6px 32px 0px rgba(0, 0, 0, 0.05);
    }

    &__subtitle {
        font-size: 17px;
        font-weight: 500;
        line-height: 28px;
        letter-spacing: 0.18px;
        color: #091c31;
        margin-bottom: 28px;
    }

    &__wrapper {
        display: flex;
        flex-direction: column;
        gap: 24px;

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

.dark .auto {
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
