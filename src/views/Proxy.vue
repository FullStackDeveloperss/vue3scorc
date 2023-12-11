<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue'
import axios from 'axios'
import { reactive, onBeforeMount } from 'vue'
import { startWatch, setFields } from '@/helpers'
import type { Fields } from '@/types/proxy'

onBeforeMount(async () => {
    try {
        const res = await axios.post('setting/get', { code: 'proxy' })
        const list = await axios.post('data/proxy/list', { page: 1 })
        setFields(fields, res.data.fields)
        console.log(list)
    } catch (error) {
        console.log(error)
    }
    startWatch(fields, 'proxy')
})

const fields: Fields = reactive({
    proxy_accounts_count: 1,
    proxy_max_threads: 25,
})
</script>

<template>
    <AppLayout>

    </AppLayout>
</template>

<style lang="scss" scoped></style>
