<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue'
import axios, { type AxiosResponse } from 'axios'
import { computed, onBeforeMount, reactive, ref } from 'vue'
import { setFields, startWatch } from '@/helpers'
import type { Fields } from '@/types/proxy'
import Paginator from 'primevue/paginator'
import Slider from 'primevue/slider'
import ArrowDown from '@/components/icons/ArrowDown.vue'
import ButtonIcon from '@/components/ui/ButtonIcon.vue'
import InputSwitch from 'primevue/inputswitch'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import StatusError from '@/components/icons/StatusError.vue'
import ButtonMain from '@/components/ui/ButtonMain.vue'
import { useFile } from '@/composables/file'

const proxyList = reactive({
    current_page: 1,
    total_page: 1,
    per_page: 100,
    total: 39,
    total_valid: 37,
    total_invalid: 2,
    sort: 'created_at',
    sort_order: 'desc',
    data: [
        {
            id: '',
            proxy: '',
            valid: '',
        },
    ],
})
const fields: Fields = reactive({
    proxy_accounts_count: 1,
    proxy_max_threads: 25,
})

const getDataFromApi = async () => {
    try {
        const res = await axios.post('setting/get', { code: 'proxy' })
        const list = await axios.post('data/proxy/list', { page: 1 })
        setFields(fields, res.data.fields)
        setFields(proxyList, list.data)
    } catch (error) {
        console.log(error)
        toast.add({
            severity: 'error',
            summary: ``,
            detail: 'Ошибка загрузки данных',
            life: 3000,
        })
    }
}

onBeforeMount(async () => {
    getDataFromApi()
    startWatch(fields, 'proxy')
})

const openedProxyWarning = ref(true)

const downloadValid = ref(false)

const { downloadFile, inputFile, uploadingProgress, loading, uploadFile } = useFile()

const downloadHandler = () => {
    downloadFile('proxies.csv', {
        data: { valid: downloadValid ? 'valid' : 'all' },
        url: 'data/proxy/download',
        onError(error: Error) {
            toast.add({
                severity: 'error',
                summary: `Ошибка`,
                detail: error.message,
            })
        },
    })
}

const removeAllProxy = async () => {
    try {
        await axios.post('proxy/remove-all')
        await getDataFromApi()
    } catch (error) {
        toast.add({
            severity: 'error',
            summary: `Ошибка`,
            detail: 'Не удалось удалить',
        })
    }
}


const upload = reactive({
    proxy_format: '',
    proxy_file: null,
})

const toast = useToast()


const uploadHandler = async () => {
    loading.value = true

    uploadFile('proxy/upload', {
        file: file.value,
        async onSuccess(response: AxiosResponse) {
            const { proxies, rows, message } = response.data

            toast.add({
                severity: 'success',
                summary: message,
                detail: `Всего прокси: ${proxies}
                     Всего строк: ${rows}`,
            })

            await getDataFromApi()
        },
        onError(error: Error) {
            toast.add({
                severity: 'error',
                summary: `Ошибка`,
                detail: error.message,
            })
        },
        callback() {
            if (inputFile.value) {
                inputFile.value.value = ''
            }

            file.value = null
        }
    })
}

const file = ref<File | null>(null)

const selectFile = () => {
    const files = inputFile.value?.files
    if (files?.length) {
        file.value = files[0]
    }
}
const cancelFile = () => {
    if (inputFile.value) {
        inputFile.value.value = ''
    }
}
</script>

<template>
    <AppLayout>
        <div class="section__header">
            <h2 class="title reg-links__title">Прокси
                (<span class="valid">{{ proxyList.total_valid }}</span>
                |
                <span class="invalid">{{ proxyList.total_invalid }}</span>)
            </h2>
            <div class="section__header-panel">
                <div class="switch-wrapper">
                    <span>выгружать только валидные?</span>
                    <InputSwitch v-model="downloadValid" />
                </div>
                <ButtonIcon src="/icons/download.svg"
                            alt="Скачать"
                            tooltip
                            border="none"
                            backgroundColor="#0067D5"
                            @click="downloadHandler"
                />
                <Toast />
                <ButtonIcon src="/icons/delete.svg"
                            alt="Удалить все"
                            tooltip
                            border="none"
                            backgroundColor="#E0281B"
                            @click="removeAllProxy"
                />
            </div>
        </div>

        <div class="proxy-import">
            <div class="proxy-import__top"
                 :class="{ 'proxy-import__top--opened': openedProxyWarning }"
                 @click="openedProxyWarning = !openedProxyWarning">
                Импрот прокси
                <ArrowDown class="proxy-import__arrow" />
            </div>
            <form class="proxy-import__main"
                  :class="{ 'proxy-import__main--opened': openedProxyWarning }"
                  @submit.prevent="">
                <div class="proxy-import__description">
                    <p>Допустимые форматы прокси:</p>
                    <p>Ссылку для реконекта указывать нельзя!</p>
                    <p>login:pass@ip:port <br> ip:port</p>
                    <p>
                        Если прокси socks5 то необходимо указать протокол socks5:// <br>
                        socks5://login:pass@ip:port <br>
                        socks5://ip:port
                    </p>
                </div>
                <div class="upload">
                    <div class="upload__head">
                        <input type='file' accept=".txt" hidden @change="selectFile" ref="inputFile" />
                        <ButtonIcon src="/icons/upload.svg"
                                    alt="Скачать"
                                    border="none"
                                    backgroundColor="#0067D5"
                                    @click="($refs.inputFile as HTMLDivElement).click()" />
                        <span v-if="file" class="upload__file-name">{{ file?.name }}</span>
                        <StatusError v-if="file" @click="cancelFile" />
                    </div>
                    <div v-if="file" class="upload__progress"></div>
                    <ButtonMain v-if="file" text="Загрузить" :loading="loading" @click="uploadHandler" />
                </div>
            </form>
        </div>

        <div class="proxy__inner">
            <div class="proxy__settings">
                <span class="proxy__settings-label">
                    Выключать систему если валидных прокси меньше {{ fields.proxy_max_threads }}
                </span>
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
                :pt="{
                    root: { class: 'paginator__root reg-links__paginator' },
                }"
            ></Paginator>
        </div>
    </AppLayout>
</template>

<style lang="scss" scoped>

.upload {
    padding: 10px 20px 20px;

    &__head {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    &__file-name {
        font-size: 13px;
        line-height: 1.2;
        color: #fff;
    }

    &__progress {
        margin-top: 24px;
    }


}

.switch-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13px;
    line-height: 1.2;

    span {
        max-width: 120px;
    }
}

.reg-links {
    &__title {
        .valid {
            color: #16C050;
        }

        .invalid {
            color: #E0281B;
        }
    }
}

.proxy-import {
    margin-bottom: 24px;
    background: #0797e1;
    border-radius: 24px;
    overflow: hidden;

    &__top {
        padding: 10px 20px;
        color: #fff;
        cursor: pointer;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;

        &--opened .proxy-import__arrow {
            transform: rotate(180deg);
        }
    }

    &__main {
        max-height: 0;
        transition: .3s;


        &--opened {
            border-top: 1px solid #eee;
            max-height: 500px;
            padding-bottom: 20px;
        }
    }

    &__description {
        padding: 10px 20px 20px;
        color: #fff;

        p:not(:first-child) {
            margin-top: 20px;
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

.dark {
    .proxy {
        &__inner {
            background: #091c31;
        }

        &__table {
            background: #091c31;
        }

        &__settings-label {
            color: #fff;
        }
    }

    .table {
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
