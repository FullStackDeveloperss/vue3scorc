<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue'
import { onBeforeMount, ref } from 'vue'
import axios from 'axios'
import type { LinkItem } from '@/types/section'

onBeforeMount(async () => {
    try {
        const res = await axios.post('data/section', { type: 'job' })
        data.value = res.data
    } catch (error) {
        console.log(error)
    }
})

const data = ref<LinkItem[]>([])
</script>

<template>
    <AppLayout>
        <div class="data">
            <h2 class="data__title title">Данные</h2>
            <div class="data__wrapper">
                <RouterLink v-for="item of data" :key="item.id" :to="'/data/links/' + item.url" class="data__inner">
                    <span class="data__text">{{ item.name }}</span>
                    <span class="data__num">{{ item.total }}</span>
                </RouterLink>
            </div>
        </div>
    </AppLayout>
</template>

<style lang="scss" scoped>
.data {
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
        align-items: center;
        justify-content: space-between;
        padding: 24px 32px;
        border-radius: 24px;
        background-color: #fff;
        box-shadow: 0px 6px 32px 0px rgba(0, 0, 0, 0.05);
    }

    &__text {
        font-family: 'Inter', sans-serif;
        font-weight: 500;
        line-height: 21px;
        color: #091c31;
    }

    &__num {
        height: 24px;
        min-width: 32px;
        padding: 0 5px;
        border-radius: 12px;
        background-color: #e0281b;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Inter', sans-serif;
        font-weight: 500;
        line-height: 21px;
        color: #fff;
    }
}

.dark .data {
    &__inner {
        background-color: #091c31;
        box-shadow: none;
    }

    &__text {
        color: #fff;
    }
}
</style>
