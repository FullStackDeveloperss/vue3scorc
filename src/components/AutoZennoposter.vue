<script setup lang="ts">
import InputSwitch from 'primevue/inputswitch'
import { useAutoserverStore } from '@/stores/autoserver'

const autoserverStore = useAutoserverStore()
</script>

<template>
    <div class="auto">
        <div class="auto__inner">
            <h3 class="auto__subtitle">Автоматическое управление шаблонами в Zennoposter</h3>
            <div class="auto__wrapper">
                <div class="auto__item auto__item_reverse">
                    <InputSwitch v-model="autoserverStore.fields.template_registrator" />
                    <span class="auto__text">Регистратор</span>
                </div>
                <div class="auto__item auto__item_reverse">
                    <InputSwitch v-model="autoserverStore.fields.template_worm" />
                    <span class="auto__text">Worm</span>
                </div>
                <div class="auto__item auto__item_reverse">
                    <InputSwitch v-model="autoserverStore.fields.template_worm_bm" />
                    <span class="auto__text">Worm BM</span>
                </div>
                <div class="auto__item auto__item_reverse">
                    <InputSwitch v-model="autoserverStore.fields.template_spam_bot" />
                    <span class="auto__text">Spam Bot</span>
                </div>
                <div class="auto__item auto__item_reverse">
                    <InputSwitch v-model="autoserverStore.fields.template_chat_bot" />
                    <span class="auto__text">Chat Bot</span>
                </div>
                <div class="auto__item auto__item_reverse">
                    <InputSwitch v-model="autoserverStore.fields.template_checkpoint" />
                    <span class="auto__text">Checkpoint</span>
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
            gap: 10px;
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
