<script lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'

const EmptyLayout = defineAsyncComponent(() => import('@/layouts/EmptyLayout.vue'))
const DefaultLayout = defineAsyncComponent(() => import('@/layouts/DefaultLayout.vue'))


export default {
    components: {
        DefaultLayout,
        EmptyLayout
    },
    setup() {
        const route = useRoute()
        const layout = computed(() => route.meta.layout || 'DefaultLayout')

        return {
            layout
        }
    }
}
</script>

<template>
    <component :is="layout" />
</template>

<style lang="scss" scoped></style>
