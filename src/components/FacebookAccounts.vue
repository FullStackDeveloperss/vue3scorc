<script setup lang="ts">
import ButtonIcon from '@/components/ui/ButtonIcon.vue'
import { useFacebookStore } from '@/stores/facebook'
import type { Datum } from '@/types/facebook'
import { useWindowSize } from '@vueuse/core'
import Checkbox from 'primevue/checkbox'
import { computed, ref } from 'vue'
import ArrowDown from '@/components/icons/ArrowDown.vue'

const facebookStore = useFacebookStore()

const props = defineProps<{ data: Datum[] }>()

const { width } = useWindowSize()

const selected = ref<Number[]>([])
const selectedAll = computed( {
    get() {
        return selected.value.length === props.data.length
    },
    set (value) {
        const selectedId: Number[] = []
        if (value) {
            props.data.forEach( item => {
                selectedId.push(item.id)
            })
        }

        selected.value = selectedId
    }
})

const downloadSelected = async () => {
    await facebookStore.downloadFile(selected.value.toString())
}

const removeSelected = async () => {
    await facebookStore.removeProfile(selected.value)
}
</script>

<template>
    <div class="facebook__inner" v-if="width > 743">
        <div class="facebook-table__header">
            <h3 class="facebook__inner-title">Аккаунты</h3>

            <div class="facebook-table__buttons" v-if="selected.length">
                <button class="facebook-table__btn facebook-table__btn--info" @click="downloadSelected">
                    <img src="/icons/download.svg" alt="">
                    скачать
                </button>
                <button class="facebook-table__btn facebook-table__btn--danger" @click="removeSelected">
                    <img src="/icons/delete.svg" alt="">
                    удалить
                </button>
            </div>
        </div>
        <div class="facebook__inner-table">
            <table class="facebook__table">
                <thead>
                    <tr class="facebook__table-tr">
                        <th class="facebook__table-th">
                            <Checkbox
                                v-model="selectedAll"
                                :binary="true"
                                :pt="{
                                    root: { class: 'checkbox__root' },
                                }"
                                class="facebook__table-checkbox"
                            />
                        </th>
                        <th class="facebook__table-th">№</th>
                        <th class="facebook__table-th">Аккаунт</th>
                        <th class="facebook__table-th"></th>
                        <th class="facebook__table-th">Город</th>
                        <th class="facebook__table-th">Друзей</th>
                        <th class="facebook__table-th">Дней с рег.</th>
                        <th class="facebook__table-th">Статус</th>
                        <th class="facebook__table-th">Действия</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="d in data" :key="d.id">
                        <tr class="facebook__table-tr" >
                            <td class="facebook__table-td">
                                <Checkbox
                                    v-model="selected"
                                    :value="d.id"
                                    :pt="{
                                    root: { class: 'checkbox__root' },
                                }"
                                    class="facebook__table-checkbox"
                                />
                            </td>
                            <td class="facebook__table-td">
                            <span class="facebook__table-text">
                                {{ d.id }}
                            </span>
                            </td>
                            <td class="facebook__table-td">
                                <div class="facebook__table-account">
                                    <img class="facebook__table-img" :src="d.image_url" />
                                    <span class="facebook__table-text">{{ d.data.name }}</span>
                                </div>
                            </td>
                            <td class="facebook__table-td">
                                <ArrowDown class="facebook__arrow" @click="d.showFullInfo = !d.showFullInfo" />
                            </td>
                            <td class="facebook__table-td">
                                {{ d.data.city }}
                            </td>
                            <td class="facebook__table-td">
                                {{ d.data.friends }}
                            </td>
                            <td class="facebook__table-td">
                                {{ d.data.days }}
                            </td>
                            <td class="facebook__table-td"
                                :class="d.status === 1 ? 'facebook__table-td_green' : 'facebook__table-td_red'"
                            >
                                {{ d.status === 1 ? 'Включен' : 'Выключен' }}
                            </td>
                            <td class="facebook__table-td">
                                <div class="facebook__table-btns">
                                    <ButtonIcon
                                        src="/icons/download.svg"
                                        alt="Скачать"
                                        border="none"
                                        backgroundColor="#0067D5"
                                        @click="facebookStore.downloadFile(d.id)"
                                    />
                                    <ButtonIcon
                                        src="/icons/stop.svg"
                                        alt="Остановить"
                                        border="none"
                                        backgroundColor="#0067D5"
                                        @click="facebookStore.toggleStatus(d, 0)"
                                        v-if="d.status === 1"
                                    />
                                    <ButtonIcon
                                        src="/icons/play.svg"
                                        alt="Начать"
                                        border="none"
                                        backgroundColor="#0067D5"
                                        @click="facebookStore.toggleStatus(d, 1)"
                                        v-else
                                    />
                                    <ButtonIcon
                                        src="/icons/mouse-click.svg"
                                        alt="Клик"
                                        border="none"
                                        backgroundColor="#16C050"
                                        @click="facebookStore.toggleHandMode(d)"
                                        v-if="d.hand_mode"
                                    />
                                    <ButtonIcon
                                        src="/icons/mouse-click.svg"
                                        alt="Клик"
                                        border="none"
                                        backgroundColor="#0067d5"
                                        @click="facebookStore.toggleHandMode(d)"
                                        v-else
                                    />
                                    <ButtonIcon
                                        src="/icons/delete.svg"
                                        alt="Удалить"
                                        border="none"
                                        backgroundColor="#E0281B"
                                        @click="facebookStore.removeProfile(d)"
                                    />
                                </div>
                            </td>
                        </tr>
                        <tr class="facebook__table-tr" v-show="d.showFullInfo">
                            <td class="facebook__table-td" colspan="10" >
                                <div class="user-info">
                                    <div class="user-info__item" v-for="(value, key) in d.data"><b>{{ key }}:</b> {{ value }}</div>
                                </div>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </div>
    <div class="facebook__adaptive-inner" v-else>
        <div class="facebook__adaptive-checkbox">
            <Checkbox
                v-model="selectedAll"
                :binary="true"
                :pt="{
                    root: { class: 'checkbox__root' },
                }"
                class="facebook__table-checkbox"
            />
            <span class="facebook__adaptive-text">Выбрать все</span>
        </div>
        <div class="facebook__adaptive-checkbox" v-if="selected.length">
            <div class="facebook-table__buttons" >
                <button class="facebook-table__btn facebook-table__btn--info" @click="downloadSelected">
                    <img src="/icons/download.svg" alt="">
                    скачать
                </button>
                <button class="facebook-table__btn facebook-table__btn--danger" @click="removeSelected">
                    <img src="/icons/delete.svg" alt="">
                    удалить
                </button>
            </div>
        </div>
        <div class="facebook__adaptive-acc" v-for="d in data" :key="d.id">
            <div class="facebook__adaptive-info">
                <Checkbox
                    v-model="selected"
                    :value="d.id"
                    :pt="{
                        root: { class: 'checkbox__root' },
                    }"
                    class="facebook__table-checkbox"
                />
                <div class="facebook__adaptive-account">
                    <img class="facebook__table-img" :src="d.image_url" />
                    <span class="facebook__table-text">{{ d.data.name }}</span>
                </div>
            </div>
            <div class="facebook__adaptive-content">
                <span class="facebook__adaptive-title">№</span>
                <span class="facebook__adaptive-text">{{ d.id }}</span>
            </div>
            <div class="facebook__adaptive-content">
                <span class="facebook__adaptive-title">Город</span>
                <span class="facebook__adaptive-text">{{ d.data.city }}</span>
            </div>
            <div class="facebook__adaptive-content">
                <span class="facebook__adaptive-title">Друзей</span>
                <span class="facebook__adaptive-text">{{ d.data.friends }}</span>
            </div>
            <div class="facebook__adaptive-content">
                <span class="facebook__adaptive-title">Дней с регистрации</span>
                <span class="facebook__adaptive-text">{{ d.data.days }}</span>
            </div>
            <div class="facebook__adaptive-content">
                <span class="facebook__adaptive-title">Статус</span>
                <span
                    class="facebook__adaptive-text"
                    :class="d.status === 1 ? 'facebook__adaptive-text_green' : 'facebook__adaptive-text_red'"
                    >{{ d.status === 1 ? 'Включен' : 'Выключен' }}</span
                >
            </div>
            <div class="facebook__adaptive-content facebook__adaptive-content_btns">
                <span class="facebook__adaptive-title">Действия</span>
                <div class="facebook__table-btns">
                    <ButtonIcon src="/icons/download.svg" alt="Скачать" border="none" backgroundColor="#0067D5" />
                    <ButtonIcon
                        src="/icons/stop.svg"
                        alt="Остановить"
                        border="none"
                        backgroundColor="#0067D5"
                        @click="facebookStore.toggleStatus(d, 0)"
                        v-if="d.status === 1"
                    />
                    <ButtonIcon
                        src="/icons/play.svg"
                        alt="Начать"
                        border="none"
                        backgroundColor="#0067D5"
                        @click="facebookStore.toggleStatus(d, 1)"
                        v-else
                    />
                    <ButtonIcon
                        src="/icons/mouse-click.svg"
                        alt="Клик"
                        border="none"
                        backgroundColor="#16C050"
                        @click="facebookStore.toggleHandMode(d)"
                        v-if="d.hand_mode"
                    />
                    <ButtonIcon
                        src="/icons/mouse-click.svg"
                        alt="Клик"
                        border="none"
                        backgroundColor="#0067d5"
                        @click="facebookStore.toggleHandMode(d)"
                        v-else
                    />
                    <ButtonIcon src="/icons/delete.svg" alt="Удалить" border="none" backgroundColor="#E0281B" />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
table {
    max-width: 100%;
}
.user-info {
    display: flex;
    flex-direction: column;
    gap: 10px 20px;

    &__item {
        //width: min(300px);
        color: #091c31;
        font-size: 16px;
        line-height: 1.2;
    }
}
.facebook {
    &__inner {
        padding: 24px 32px 36px;
        border-radius: 24px;
        background: #fff;
        box-shadow: 0px 6px 32px 0px rgba(0, 0, 0, 0.05);
    }

    &__inner-table {
        @media only screen and (max-width: 1023px) and (min-width: 744px) {
            max-width: 1023px;
            overflow-x: scroll;
        }
    }

    &__inner-title {
        font-size: 17px;
        font-weight: 500;
        line-height: 28px;
        letter-spacing: 0.18px;
        color: #091c31;
    }

    &__inner-btn {
        width: 24px;
        height: 24px;
    }

    &__table {
        table-layout: auto;
        white-space: normal;
        border: none;
        border-spacing: 0;
        min-width: 100%;
        border-collapse: collapse;
    }

    &__table-checkbox {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &__table-text {
        color: #091c31;
    }

    &__table-tr {
        height: auto;
        background-color: transparent;
    }

    &__table-th {
        font-family: 'Inter', sans-serif;
        font-weight: 500;
        line-height: 21px;
        color: #091c31;
        text-align: start;
        padding: 0 17px 17px 0;
        border-bottom: 1px solid #eee;

        &:last-child {
            text-align: center;
        }
    }

    &__table-td {
        color: #091c31;
        padding: 16px 8px 16px 0;
        border-bottom: 1px solid #eee;

        &_green {
            color: #16c050;
        }

        &_red {
            color: #e0281b;
        }
    }

    &__table-account {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    &__table-img {
        object-fit: cover;
        width: 44px;
        height: 44px;
        border-radius: 8px;
    }

    &__table-btns {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 9px;
    }
}

.facebook {
    &__adaptive-inner {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    &__adaptive-checkbox {
        padding: 24px;
        border-radius: 24px;
        background: #fff;
        box-shadow: 0px 6px 32px 0px rgba(0, 0, 0, 0.05);
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;
    }

    &__adaptive-acc {
        padding: 24px 24px 8px;
        border-radius: 24px;
        background: #fff;
        box-shadow: 0px 6px 32px 0px rgba(0, 0, 0, 0.05);
        gap: 10px;
        width: 100%;
    }

    &__adaptive-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &__adaptive-item {
        display: flex;
        align-items: center;
        gap: 22px;
    }

    &__adaptive-account {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    &__adaptive-content {
        padding: 16px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;

        &:not(:last-child) {
            border-bottom: 1px solid #eee;
        }

        &_btns {
            @media only screen and (max-width: 379px) and (min-width: 320px) {
                flex-direction: column;
                gap: 20px;
            }
        }
    }

    &__adaptive-title {
        font-family: 'Inter', sans-serif;
        font-weight: 500;
        line-height: 21px;
        color: #091c31;
        text-align: start;
    }

    &__adaptive-text {
        color: #091c31;
        text-align: end;

        &_green {
            color: #16c050;
        }

        &_red {
            color: #e0281b;
        }
    }
}

.facebook-table {
    &__header {
        display: flex;
        align-items: center;
        gap: 30px;
        margin-bottom: 25px;
    }

    &__buttons {
        display: flex;
        gap: 10px;
    }
    &__btn {
        font-size: 14px;
        line-height: 1;
        color: #fff;
        border-radius: 6px;
        padding: 3px 10px;
        display: flex;
        gap: 5px;
        align-items: center;

        &--info {
            background: #0067d5;
        }

        &--danger {
            background: #e0281b;
        }
    }
}

.dark .facebook {
    &__inner {
        background-color: #091c31;
        box-shadow: none;
    }

    &__inner-title {
        color: #fff;
    }

    &__table-text {
        color: #fff;
    }

    &__table-th {
        color: #fff;
        border-bottom: 1px solid #1b395b;
    }

    &__table-td {
        color: #fff;
        border-bottom: 1px solid #1b395b;

        &_green {
            color: #16c050;
        }

        &_red {
            color: #e0281b;
        }
    }
}

.dark .facebook {
    &__adaptive-checkbox {
        background-color: #091c31;
        box-shadow: none;
    }

    &__adaptive-acc {
        background-color: #091c31;
        box-shadow: none;
    }

    &__adaptive-content {
        &:not(:last-child) {
            border-bottom: 1px solid #1b395b;
        }
    }

    &__adaptive-title {
        color: #fff;
    }

    &__adaptive-text {
        color: #fff;

        &_green {
            color: #16c050;
        }

        &_red {
            color: #e0281b;
        }
    }
}
</style>
