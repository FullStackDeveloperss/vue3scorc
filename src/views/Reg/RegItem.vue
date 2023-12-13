<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue'
import { onBeforeMount, reactive } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { setFields } from '@/helpers'
import type { SectionData } from '@/types/section'
import Paginator from 'primevue/paginator'

const route = useRoute()

const fetchData = async (options: any)  => {
    try {
        const res = await axios.post('data/list', options)
        setFields(data, res.data)
    } catch (error) {
        console.log(error)
    }
}

onBeforeMount(async () => {
    fetchData({ page: 1, section: 'reg', url: route.params.id })
})


const changePage = (updatedPage: any) => {
    data.current_page = updatedPage.page + 1
    fetchData({ page: data.current_page, section: 'reg', url: route.params.id })

}
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
        <h2 class="title reg-links__title">{{ data.section_name }} ({{ data.total }})</h2>
        <div class="table__wrapper">
            <table class="table">
                <thead>
                <tr>
                    <th class="table__cell--head">#</th>
                    <th class="table__cell--head">Значение</th>
                </tr>
                </thead>
                <tbody>
                <tr class="table__row" v-for="row of data.data">
                    <td class="table__cell" v-for="cell of row">{{ cell }}</td>
                </tr>
                </tbody>
            </table>
            <Paginator
                :rows="data.per_page"
                :totalRecords="data.total"
                @page="changePage"
                :pt="{
                root: { class: 'paginator__root reg-links__paginator' },
            }"
            ></Paginator>
        </div>

    </AppLayout>
</template>

<style lang="scss" scoped>
.reg-links {
    &__title {
        margin-bottom: 24px;
    }
}

:deep(.reg-links__paginator) {
    margin-top: 24px;
}
.table {
    table-layout: auto;
    white-space: normal;
    border: none;
    border-spacing: 0;
    min-width: 100%;
    border-collapse: collapse;
    text-align: left;

    &__wrapper {
        padding: 24px 32px 36px;
        border-radius: 24px;
        background: #fff;
        box-shadow: 0px 6px 32px 0px rgba(0, 0, 0, 0.05);
    }

    &__row {
        &:hover {
            background: #f5f6f8;
            cursor: pointer;
        }
    }

    &__cell {
        color: #091c31;
        padding: 16px 8px 16px;
        border-bottom: 1px solid #eee;

        &--head {
            font-family: "Inter", sans-serif;
            font-weight: 500;
            line-height: 21px;
            color: #091c31;
            text-align: start;
            padding: 0 17px 17px 8px;
            border-bottom: 1px solid #eee;
        }

        &:first-child {
            width: 150px;
        }
    }
}

.dark {
    .table {
        &__wrapper {
            background: #091c31;
        }

        &__cell {
            color: #fff;

            &--head {
                color: #fff;
            }
        }

        &__row:hover {
            background: #122a45;
        }
    }
}
</style>
