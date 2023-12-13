<script setup lang="ts">

import Sidebar from '@/components/layout/Sidebar.vue'
import Navbar from '@/components/layout/Navbar.vue'
import { useRootStore } from '@/stores/root'
import { storeToRefs } from 'pinia'

const rootStore = useRootStore()
const { isCloseSidebar } = storeToRefs(rootStore)
</script>

<template>
    <div class="inner">
        <Navbar />
        <Sidebar />
        <div class="wrapper" :class="{ 'wrapper__close': isCloseSidebar }">
            <RouterView/>
        </div>
    </div>
</template>

<style scoped lang="scss">

</style>
