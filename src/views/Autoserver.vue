<script setup lang="ts">
import AutoSettings from '@/components/AutoSettings.vue'
import AutoZennoposter from '@/components/AutoZennoposter.vue'
import AppLayout from '@/components/layout/AppLayout.vue'
import { useAutoserverStore } from '@/stores/autoserver'
import { onMounted } from 'vue'

const autoserverStore = useAutoserverStore()

onMounted(async () => {
    await autoserverStore.getData()
    autoserverStore.initWatch()
})
</script>

<template>
    <AppLayout>
        <div class="auto">
            <h2 class="auto__title title">Автоматизация сервера</h2>
            <div class="auto__wrapper">
                <AutoZennoposter />
                <AutoSettings />
            </div>
        </div>
    </AppLayout>
</template>

<style lang="scss" scoped>
.auto {
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
}
</style>
