<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue'
import { onBeforeMount, reactive } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { setFields } from '@/helpers'
import type { SectionData } from '@/types/section'

const route = useRoute()

onBeforeMount(async () => {
    try {
        const res = await axios.post('data/list', { page: 1, section: 'reg', url: route.params.id })
        setFields(data, res.data)
    } catch (error) {
        console.log(error)
    }
})

const data: SectionData = reactive({
    current_page: 1,
    data: [],
    per_page: 10,
    section_name: '',
    sort: 'created_at',
    sort_order: 'desc',
    total: 0,
    total_page: 1,
})
</script>

<template>
    <AppLayout>
        <div>{{ data.section_name }}</div>
        <div>
            <div v-if="data.total > 0">
                {{ data.total }}
            </div>
            <div v-else>нет данных</div>
        </div>
    </AppLayout>
</template>

<style lang="scss" scoped></style>
