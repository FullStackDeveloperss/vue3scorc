<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue'
import Dropdown from 'primevue/dropdown'
import InputSwitch from 'primevue/inputswitch'
import Slider from 'primevue/slider'
import axios from 'axios'
import { computed, onBeforeMount, reactive, ref, watch } from 'vue'
import { setFields, startWatch } from '@/helpers'
import type { Fields } from '../types/checkpoint'
import MultiSelect from 'primevue/multiselect'

onBeforeMount(async () => {
    try {
        const res = await axios.post('setting/get', { code: 'checkpoint' })
        setFields(fields, res.data.fields)
    } catch (error) {
        console.log(error)
    }
    startWatch(fields, 'checkpoint')
})

const fields: Fields = reactive({
    get_phone_to_account_with_invalid_phone: false,
    should_be_friends_on_account: false,
    days_after_reg_to_get_phone: 0,
    unban_accounts_blocked_status: true,
    get_all_invalid_statuses: false,
    get_statuses: [],
})

// const selectedCheckpoint = ref<[{ name: string; value: string }]>(adaptedSelectedCheckpoints.value)
const selectedCheckpoint = computed({
    get() {
        return fields.get_statuses.map(item => {
            return checkpoint.value.find( status => status.value === item)
        });
    },
    set(val) {
        fields.get_statuses = val.map(item => item?.value);
    }
})
const checkpoint = ref([
        { value: 'no_status', name: 'нет статуса' },
        { value: 'sliv', name: 'готов к заливу рекламы' },
        { value: 'call_friends', name: 'Попросил позвонить друзьям (чекпоинт)' },
        { value: 'ADS', name: 'готов к заливу рекламы (акк на котором друзей больше 4.5к)' },
        { value: 'update', name: 'этого статуса не будет я его потом уберу нахуй' },
        { value: 'invite', name: 'живой аккаунт в процессе фарама' },
        { value: 'checkpoint', name: 'Чекпоинт (распределительный пункт)' },
        { value: 'zagruzil_selfy', name: 'Загрузил селфи' },
        { value: 'disable', name: 'Аккаунт отключен (Disable)' },
        { value: 'zagruzil_doki', name: 'Загрузил документы на аккаунт' },
        { value: 'message', name: 'Пишет сообщения' },
        { value: 'telephone', name: 'Аккаунт попросил отправить код на телефон' },
        { value: 'tapto', name: 'этот тоже утраченный статус уберу чуть позже' },
        { value: 'recaptcha', name: 'аккаунт не смог разгадать рекапчу' },
        { value: 'bad_mail', name: 'Не смог получить код с почты' },
        { value: 'bad_phone', name: 'утраченный статус' },
        { value: 'email_update', name: 'К Аккаунту не привязана почта, просит отправить код на почту' },
        { value: 'bad_pass', name: 'Неверный пароль на аккаунте' },
        { value: 'changePass', name: 'Необходимо поменять пароль на аккаунте' },
        { value: 'selfy', name: 'Селфи' },
        { value: 'selfy_not_load', name: 'Не загрузил селфи' },
        { value: 'worm', name: 'Аккаунт в процессе фарма' },
        { value: 'friends', name: 'Попросил угадать друзей при разбане' },
        { value: 'wait_aproove', name: 'Ожидаем подтверждения отправленных доков / селфи' },
        { value: 'bad_login', name: 'Неверный логин' },
        { value: 'err_send_mes_mail', name: 'Ошибка отправки запроса кода с почты для смены пароля' },
        { value: 'zrd', name: 'Запрет рекламной деятельности' },
        { value: 'zrd_plus', name: 'Прошел запрет рекламной деятельности' },
        { value: 'zrd_plus_up', name: 'Залитые акки с пройденным ЗРД' },
        { value: 'zrd_bm', name: 'Пройден ЗРД + БМ создан' },
        { value: 'ads_block', name: 'Заблокирован рекламный кабинет навсегда' },
        { value: 'zrd_plus_bm', name: 'Аккаунты с пройденным ЗРД + БМ верифицированный' },
        { value: 'bm', name: 'Аккаунты с подтвержденным БМ, ЗРД не пройден' },
        { value: 'zrd_plus_bm_not_aproove', name: 'ЗРД пройден БМ не подтвержден' },
        { value: 'worm_bm_not_aproove', name: 'Аккаунты в процессе фарма БМ не подтвержден' },
        { value: 'worm_bm_aproove', name: 'Аккаунты в процессе фарма БМ подтвержден' },
        { value: 'back_from_store', name: 'Выгрузка из магазина' },
        { value: 'incorrect_pass', name: 'Неверный пароль на аккаунте' },
        { value: 'doc_not_load', name: 'Не удалось загрузить документы' },
        { value: 'another_computer', name: 'Автозироваться на прежнем устройстве' },
        { value: 'code_not_received_to_phone', name: 'Не пришел код на телефон' },
    ],
)


</script>

<template>
    <AppLayout>
        <div class="checkpoint">
            <h2 class="checkpoint__title title">Настройки чекпоинта</h2>
        </div>
        <div class="checkpoint__inner">
            <div class="checkpoint__item checkpoint__item_reverse">
                <InputSwitch v-model="fields.get_phone_to_account_with_invalid_phone" />
                <span class="checkpoint__text">Получать номер телефона аккаунтам слетевшим на телефон</span>
            </div>
            <div class="checkpoint__item checkpoint__item_reverse">
                <InputSwitch
                    v-model="fields.should_be_friends_on_account"
                    v-if="fields.get_phone_to_account_with_invalid_phone === true"
                />
                <span class="checkpoint__text">Должны ли быть друзья на аккаунте</span>
            </div>
            <div class="checkpoint__item checkpoint__item_reverse">
                <InputSwitch v-model="fields.unban_accounts_blocked_status" />
                <span class="checkpoint__text"
                >Получать номер телефона аккаунтам в статусе: "Заблокирован рекламный кабинет навсегда"</span
                >
            </div>
            <div class="checkpoint__item" v-if="fields.get_phone_to_account_with_invalid_phone === true">
                <span class="checkpoint__text">Дней с момента регистрации</span>
                <Slider v-model="fields.days_after_reg_to_get_phone" :min="0" :max="100" />
            </div>
            <div class="checkpoint__item checkpoint__item_reverse">
                <InputSwitch v-model="fields.get_all_invalid_statuses" />
                <span class="checkpoint__text">Брать все невалидные статусы</span>
            </div>
            <MultiSelect
                v-model="selectedCheckpoint"
                :options="checkpoint"
                optionLabel="name"
                placeholder="Брать статусы"
                :maxSelectedLabels="2"
                unstyled
                :pt="{
                    root: { class: 'checkpoints__root' },
                    trigger: { class: 'checkpoints__trigger' },
                    wrapper: { style: 'max-height: 300px; overflow: auto;' },
                    panel: { class: 'checkpoints__panel' },
                    item: { class: 'checkpoints__item' },
                    input: { class: 'checkpoints__input' },
                }"
            />
        </div>
    </AppLayout>
</template>

<style lang="scss" scoped>
.checkpoint {
    &__title {
        margin-bottom: 24px;

        @media only screen and (max-width: 743px) and (min-width: 320px) {
            margin-bottom: 20px;
        }
    }

    &__inner {
        display: flex;
        flex-direction: column;
        gap: 24px;
        padding: 24px 32px 36px;
        border-radius: 24px;
        background-color: #fff;
        box-shadow: 0px 6px 32px 0px rgba(0, 0, 0, 0.05);

        @media only screen and (max-width: 743px) and (min-width: 320px) {
            gap: 20px;
        }
    }

    &__item {
        display: flex;
        align-items: center;
        gap: 20px;

        @media only screen and (max-width: 429px) and (min-width: 320px) {
            flex-direction: column;
            gap: 10px;
            align-items: flex-start;
        }

        &_reverse {
            @media only screen and (max-width: 429px) and (min-width: 320px) {
                flex-direction: column-reverse;
            }
        }
    }

    &__text {
        font-family: 'Inter', sans-serif;
        font-weight: 500;
        line-height: 21px;
        color: #091c31;
    }
}

.dark .checkpoint {
    &__inner {
        background-color: #091c31;
        box-shadow: none;
    }

    &__text {
        color: #fff;
    }
}
</style>
