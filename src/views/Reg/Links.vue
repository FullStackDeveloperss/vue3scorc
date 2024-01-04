<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue'
import { onBeforeMount, ref } from 'vue'
import axios from 'axios'
import type { LinkItem } from '@/types/section'
import { useToast } from 'primevue/usetoast'

const toast = useToast()
onBeforeMount(async () => {
    try {
        const res = await axios.post('data/section', { type: 'reg' })
        data.value = res.data
    } catch (error) {
        console.log(error)
        toast.add({
            severity: 'error',
            summary: ``,
            detail: 'Ошибка загрузки данных',
            life: 3000,
        })
    }
})

const data = ref<LinkItem[]>([])
</script>

<template>
    <AppLayout>
        <div class="reg">
            <h2 class="reg__title title">Данные</h2>
            <div class="reg__wrapper">
                <RouterLink v-for="item of data" :key="item.id" :to="'/reg/links/' + item.url" class="reg__inner">
                    <span class="reg__text">{{ item.name }}</span>
                    <span class="reg__num">{{ item.total }}</span>
                </RouterLink>
            </div>
        </div>
    </AppLayout>
</template>

<style lang="scss" scoped>
.reg {
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
        background-color: #16c050;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Inter', sans-serif;
        font-weight: 500;
        line-height: 21px;
        color: #fff;
    }
}

.dark .reg {
    &__inner {
        background-color: #091c31;
        box-shadow: none;
    }

    &__text {
        color: #fff;
    }
}
</style>
