<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue'
import axios from 'axios'
import { reactive, onBeforeMount, ref } from 'vue'
import { startWatch, setFields } from '@/helpers'
import type { Fields } from '@/types/proxy'
import Paginator from 'primevue/paginator'
import Slider from 'primevue/slider'

const proxyList = reactive({
    current_page: 1,
    total_page: 1,
    per_page: 100,
    total: 39,
    total_valid: 37,
    total_invalid: 2,
    sort: "created_at",
    sort_order: "desc",
    data: [
        {
            id: '',
            proxy: '',
            valid: ''
        }
    ]
})
const fields: Fields = reactive({
    proxy_accounts_count: 1,
    proxy_max_threads: 25,
})

onBeforeMount(async () => {
    try {
        const res = await axios.post('setting/get', { code: 'proxy' })
        const list = await axios.post('data/proxy/list', { page: 1 })
        setFields(fields, res.data.fields)
        setFields(proxyList, list.data)
    } catch (error) {
        console.log(error)
    }
    startWatch(fields, 'proxy')
})


const changePage = () => {

}

</script>

<template>
    <AppLayout>
        <h2 class="title reg-links__title">Прокси
            (<span class="valid">{{ proxyList.total_valid }}</span>
            |
            <span class="invalid">{{ proxyList.total_invalid }}</span>)
        </h2>

        <div class="proxy__inner">
            <div class="proxy__settings">
                <span class="proxy__settings-label">Выключать систему если валидных прокси меньше {{ fields.proxy_max_threads }}</span>
                <Slider v-model="fields.proxy_max_threads" :min="1" :max="99" />
            </div>
        </div>

        <div class="proxy__table table__wrapper">
            <table class="table">
                <thead>
                <tr>
                    <th class="table__cell--head">#</th>
                    <th class="table__cell--head">Значение</th>
                    <th class="table__cell--head">Статус</th>
                </tr>
                </thead>
                <tbody>
                <tr class="table__row" v-for="row of proxyList.data">
                    <td class="table__cell">{{ row?.id }}</td>
                    <td class="table__cell">{{ row?.proxy }}</td>
                    <td class="table__cell">
                        <div class="proxy__status proxy__status--valid" v-if="row?.valid">Валидный</div>
                        <div class="proxy__status proxy__status--invalid" v-else>Невалидный</div>
                    </td>
                </tr>
                </tbody>
            </table>
            <Paginator
                :rows="proxyList.per_page"
                :totalRecords="proxyList.total"
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

        .valid {
            color: #16C050;
        }

        .invalid {
            color: #E0281B;
        }
    }
}


.proxy {
    &__inner {
        display: flex;
        flex-direction: column;
        gap: 24px;
        padding: 24px 32px 36px;
        border-radius: 24px;
        background-color: #fff;
        box-shadow: 0px 6px 32px 0px rgba(0, 0, 0, 0.05);
    }
    &__table {
        margin-top: 24px;
    }

    &__settings {
        display: flex;
        align-items: center;
        gap: 20px;

        &-label {
            font-family: "Inter", sans-serif;
            font-weight: 500;
            line-height: 21px;
            color: #091c31;
            width: calc(45% - 10px);
        }
    }
}

.proxy__status {
    color: #fff;
    font-size: 14px;
    line-height: 1.2;
    border-radius: 6px;
    text-align: center;
    padding: 3px 5px;

    &--valid {
        background: #16C050;
    }

    &--invalid {
        background: #E0281B;
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

        &:last-child {
            width: 120px;
        }
    }
}
</style>
