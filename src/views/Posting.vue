<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue'
import PostingMain from '@/components/PostingMain.vue'
import PostingOnGroups from '@/components/PostingOnGroups.vue'
import { usePostingStore } from '@/stores/posting'
import { onMounted } from 'vue'

const postingStore = usePostingStore()

onMounted(async () => {
    await postingStore.getData()
    postingStore.initWatch()
})
</script>

<template>
    <AppLayout>
        <div class="posting">
            <h2 class="posting__title title">Настройка постинга</h2>
            <div class="posting__wrapper">
                <PostingMain />
                <PostingOnGroups />
            </div>
        </div>
    </AppLayout>
</template>

<style lang="scss" scoped>
.posting {
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
