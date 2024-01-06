<script setup lang="ts">

import AppLayout from '@/components/layout/AppLayout.vue'
import Dropdown from 'primevue/dropdown'
import { ref } from 'vue'
import IconFriends from '@/components/icons/IconFriends.vue'
import IconMessage from '@/components/icons/IconMessage.vue'
import IconDays from '@/components/icons/IconDays.vue'
import IconStar from '@/components/icons/IconStar.vue'

const selectedCount = ref({ name: 'Топ 15', value: 15 })
const countOptions = ref([
    { name: 'Топ 15', value: 15 },
    { name: 'Топ 30', value: 30 },
    { name: 'Топ 45', value: 45 },
    { name: 'Топ 60', value: 60 },
])
</script>

<template>
    <AppLayout>
        <div class="section__header">
            <h2 class="title top-account__title">Топ аккаунты</h2>
            <Dropdown
                v-model="selectedCount"
                icon="none"
                :options="countOptions"
                optionLabel="name"
                placeholder=""
                unstyled
                :pt="{
                    root: { class: 'date__root' },
                    trigger: { class: 'date__trigger' },
                    panel: { class: 'date__panel' },
                    item: { class: 'date__item' },
                    input: { class: 'date__input' },
                }"
            />

        </div>
        <div class="account__list">
            <div v-for="item of 3" class="account__item account__item--big">
                <div class="account__order">
                    <div class="account__order-icon">
                        <IconStar />
                    </div>
                    <div class="account__order-value">{{ item }}</div>
                </div>
                <img class="account__avatar" src="https://placehold.co/340x340?text=avatar" alt="">
                <div class="account__data">
                    <h3 class="account__name">Аня Боброва</h3>
                    <div class="account__info">
                        <div class="account__info-item">
                            <div class="account__info-icon">
                                <IconFriends />
                            </div>
                            <div class="account__info-value">450 друзей</div>
                        </div>
                        <div class="account__info-item">
                            <div class="account__info-icon">
                                <IconMessage />
                            </div>
                            <div class="account__info-value">150 сообщений отправлено</div>
                        </div>
                        <div class="account__info-item">
                            <div class="account__info-icon">
                                <IconDays />
                            </div>
                            <div class="account__info-value">56 дней с регистрации</div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-for="item of 12" class="account__item">
                <div class="account__order">
                    <div class="account__order-icon">
                        <IconStar />
                    </div>
                    <div class="account__order-value">{{ item + 3 }}</div>
                </div>
                <img class="account__avatar" src="https://placehold.co/340x340?text=avatar" alt="">
                <div class="account__data">
                    <h3 class="account__name">Аня Боброва</h3>
                    <div class="account__info">
                        <div class="account__info-item">
                            <div class="account__info-icon">
                                <IconFriends />
                            </div>
                            <div class="account__info-value">450 друзей</div>
                        </div>
                        <div class="account__info-item">
                            <div class="account__info-icon">
                                <IconMessage />
                            </div>
                            <div class="account__info-value">150 сообщений отправлено</div>
                        </div>
                        <div class="account__info-item">
                            <div class="account__info-icon">
                                <IconDays />
                            </div>
                            <div class="account__info-value">56 дней с регистрации</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>

<style scoped lang="scss">
.account {
    &__list {
        display: flex;
        flex-wrap: wrap;
        gap: 24px;
    }

    &__item {
        border-radius: 24px;
        background: #FFF;
        box-shadow: 0px 6px 32px 0px rgba(0, 0, 0, 0.05);
        width: calc((100% - 72px) / 4);
        overflow: hidden;
        position: relative;
    }

    &__avatar {
        width: 100%;
        aspect-ratio: 1;
        object-fit: cover;
    }

    &__order {
        position: absolute;
        top: 13px;
        right: 11px;
    }

    &__order-icon {
        width: 52px;
        height: 50px;
        color: #3C5A7B;
    }

    &__order-value {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #FFF;
        font-size: 17px;
        font-weight: 500;
        line-height: 1;
        letter-spacing: 0.18px;
    }

    &__data {
        padding: 13px 12px 20px;
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    &__name {
        color: #091C31;
        font-size: 17px;
        font-weight: 500;
        line-height: 28px;
        letter-spacing: 0.18px;
    }
    &__info {
        display: flex;
        flex-direction: column;
        gap: 3px;
    }
    &__info-item {
        display: flex;
        gap: 7px;
    }
    &__info-value {
        color: #778DA6;
        font-size: 13px;
        font-weight: 700;
        line-height: normal;
    }

    &__info-icon {
        width: 14px;
        height: 14px;

        svg {
            max-width: 100%;
        }
    }
}
@media only screen and (min-width: 560px) {
    .account {
        &__item {
            &--big {
                width: calc((100% - 48px) / 3);

                .account__order-icon {
                    width: 69px;
                    height: 67px;
                    color: #0067D5;
                }

                .account__order-value {
                    font-size: 23px;
                }

                .account__data {
                    padding: 10px 16px 27px;
                    gap: 10px;
                }

                .account__name {
                    font-size: 23px;
                    font-weight: 600;
                    line-height: 36px;
                    letter-spacing: 0.12px;
                }

                .account__info {
                    gap: 7px;
                }

                .account__info-value {
                    font-size: 15px;
                    font-weight: 500;
                    line-height: 21px;
                    letter-spacing: 0.2px;
                    font-family: "Inter";
                }

                .account__info-icon {
                    width: 20px;
                    height: 20px;
                }

            }
        }
    }
}
@media only screen and (min-width: 1024px) {
    .account {
        &__item {
            &--big {
                width: calc((100% - 48px) / 3);
            }
        }
    }
}
@media only screen and (max-width: 1024px) {
    .account {
        &__item {
            width: calc((100% - 48px) / 3);
        }
    }
}

@media only screen and (max-width: 743px) {
    .account {
        &__item {
            width: calc((100% - 24px) / 2);
        }
    }
}

@media only screen and (max-width: 560px) {
    .account {
        &__list {
            gap: 15px;
        }

        &__item {
            width: 100%;
        }

        &__order-icon {
            width: 69px;
            height: 67px;
            color: #0067D5;
        }

        &__name {
            font-size: 23px;
            line-height: 36px;
            letter-spacing: 0.12px;
        }

        &__data {
            gap: 10px;
            padding: 10px 16px 25px;
        }

        &__info {
            gap: 7px;
        }

        &__info-icon {
            width: 20px;
            height: 20px;
        }

        &__info-value {
            font-size: 15px;
            line-height: 21px;
            letter-spacing: 0.2px;
        }
    }

    .top-account__title {
        font-size: 23px;
        line-height: 36px;
        letter-spacing: 0.12px;
    }
}
</style>
