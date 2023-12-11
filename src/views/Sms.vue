<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue'
import InputText from '@/components/ui/InputText.vue'
import Dropdown from 'primevue/dropdown'
import InputSwitch from 'primevue/inputswitch'
import Slider from 'primevue/slider'
import { ref, watch } from 'vue'
import axios from 'axios'
import { reactive, onBeforeMount } from 'vue'
import { startWatch, setFields } from '@/helpers'
import type { Fields } from '@/types/sms'

onBeforeMount(async () => {
    try {
        const res = await axios.post('setting/get', { code: 'sms-services' })
        setFields(fields, res.data.fields)
    } catch (error) {
        console.log(error)
    }
    startWatch(fields, 'sms-services')
})

const fields: Fields = reactive({
    activation_pw: '',
    dropsmsbot: '',
    five_sim_sms: '',
    generate_phone: false,
    get_sms_online: '',
    give_sms: '',
    grizzly_sms: '',
    how_long_wait_sms: 1,
    phone_country_code: [],
    simsms_org: '',
    sms_activate: '403b3c6d7b24A0537123339427fe967d',
    sms_actiwator: '',
    sms_hub: '',
    sms_reg: '',
    smska_net: '',
    take_phone_by_ip: false,
    text_now: '',
    text_now_developer: '',
    use_phone_multiple_times_for_reg: false,
    use_phone_multiple_times_for_unlock: true,
    vak_sms_com: '',
    virtual_sms: '',
})

const selectedCountry = ref<{ country: string; code: string }>({ country: 'Россия', code: '0' })
const countries = [
    { country: 'Россия', code: '0' },
    { country: 'Украина', code: '1' },
    { country: 'Казахстан', code: '2' },
    { country: 'Китай', code: '3' },
    { country: 'Филиппины', code: '4' },
    { country: 'Мьянма', code: '5' },
    { country: 'Индонезия', code: '6' },
    { country: 'Малайзия', code: '7' },
    { country: 'Кения', code: '8' },
    { country: 'Танзания', code: '9' },
    { country: 'Вьетнам', code: '10' },
    { country: 'Кыргызстан', code: '11' },
    { country: 'США (виртуальные)', code: '12' },
    { country: 'Израиль', code: '13' },
    { country: 'Гонконг', code: '14' },
    { country: 'Польша', code: '15' },
    { country: 'Англия', code: '16' },
    { country: 'Мадагаскар', code: '17' },
    { country: 'Дем. Конго', code: '18' },
    { country: 'Нигерия', code: '19' },
    { country: 'Египет', code: '21' },
    { country: 'Индия', code: '22' },
    { country: 'Ирландия', code: '23' },
    { country: 'Камбоджа', code: '24' },
    { country: 'Лаос', code: '25' },
    { country: 'Гаити', code: '26' },
    { country: 'Кот дИвуар', code: '27' },
    { country: 'Гамбия', code: '28' },
    { country: 'Сербия', code: '29' },
    { country: 'Йемен', code: '30' },
    { country: 'ЮАР', code: '31' },
    { country: 'Румыния', code: '32' },
    { country: 'Колумбия', code: '33' },
    { country: 'Эстония', code: '34' },
    { country: 'Азербайджан', code: '35' },
    { country: 'Канада', code: '36' },
    { country: 'Марокко', code: '37' },
    { country: 'Гана', code: '38' },
    { country: 'Аргентина', code: '39' },
    { country: 'Узбекистан', code: '40' },
    { country: 'Камерун', code: '41' },
    { country: 'Чад', code: '42' },
    { country: 'Германия', code: '43' },
    { country: 'Литва', code: '44' },
    { country: 'Хорватия', code: '45' },
    { country: 'Швеция', code: '46' },
    { country: 'Ирак', code: '47' },
    { country: 'Нидерланды', code: '48' },
    { country: 'Латвия', code: '49' },
    { country: 'Австрия', code: '50' },
    { country: 'Беларусь', code: '51' },
    { country: 'Таиланд', code: '52' },
    { country: 'Сауд. Аравия', code: '53' },
    { country: 'Мексика', code: '54' },
    { country: 'Тайвань', code: '55' },
    { country: 'Испания', code: '56' },
    { country: 'Иран', code: '57' },
    { country: 'Алжир', code: '58' },
    { country: 'Бангладеш', code: '60' },
    { country: 'Сенегал', code: '61' },
    { country: 'Турция', code: '62' },
    { country: 'Чехия', code: '63' },
    { country: 'Шри-Ланка', code: '64' },
    { country: 'Перу', code: '65' },
    { country: 'Пакистан', code: '66' },
    { country: 'Новая Зеландия', code: '67' },
    { country: 'Гвинея', code: '68' },
    { country: 'Мали', code: '69' },
    { country: 'Венесуэла', code: '70' },
    { country: 'Эфиопия', code: '71' },
    { country: 'Монголия', code: '72' },
    { country: 'Бразилия', code: '73' },
    { country: 'Афганистан', code: '74' },
    { country: 'Уганда', code: '75' },
    { country: 'Ангола', code: '76' },
    { country: 'Кипр', code: '77' },
    { country: 'Франция', code: '78' },
    { country: 'Папуа-Новая Гвинея', code: '79' },
    { country: 'Мозамбик', code: '80' },
    { country: 'Непал', code: '81' },
    { country: 'Бельгия', code: '82' },
    { country: 'Болгария', code: '83' },
    { country: 'Венгрия', code: '84' },
    { country: 'Молдова', code: '85' },
    { country: 'Италия', code: '86' },
    { country: 'Парагвай', code: '87' },
    { country: 'Гондурас', code: '88' },
    { country: 'Тунис', code: '89' },
    { country: 'Никарагуа', code: '90' },
    { country: 'Тимор-Лесте', code: '91' },
    { country: 'Боливия', code: '92' },
    { country: 'Коста Рика', code: '93' },
    { country: 'Гватемала', code: '94' },
    { country: 'ОАЭ', code: '95' },
    { country: 'Зимбабве', code: '96' },
    { country: 'Пуэрто-Рико', code: '97' },
    { country: 'Судан', code: '98' },
    { country: 'Того', code: '99' },
    { country: 'Кувейт', code: '100' },
    { country: 'Сальвадор', code: '101' },
    { country: 'Ливия', code: '102' },
    { country: 'Ямайка', code: '103' },
    { country: 'Тринидад и Тобаго', code: '104' },
    { country: 'Эквадор', code: '105' },
    { country: 'Свазиленд', code: '106' },
    { country: 'Оман', code: '107' },
    { country: 'Босния и Герцеговина', code: '108' },
    { country: 'Доминиканская Республика', code: '109' },
    { country: 'Сирия', code: '110' },
    { country: 'Катар', code: '111' },
    { country: 'Панама', code: '112' },
    { country: 'Куба', code: '113' },
    { country: 'Мавритания', code: '114' },
    { country: 'Сьерра-Леоне', code: '115' },
    { country: 'Иордания', code: '116' },
    { country: 'Португалия', code: '117' },
    { country: 'Барбадос', code: '118' },
    { country: 'Бурунди', code: '119' },
    { country: 'Бенин', code: '120' },
    { country: 'Бруней', code: '121' },
    { country: 'Багамы', code: '122' },
    { country: 'Ботсвана', code: '123' },
    { country: 'Доминика', code: '126' },
    { country: 'Гренада', code: '127' },
    { country: 'Грузия', code: '128' },
    { country: 'Греция', code: '129' },
    { country: 'Гвинея-Бисау', code: '130' },
    { country: 'Гайана', code: '131' },
    { country: 'Коморы', code: '133' },
    { country: 'Сент-Китс и Невис', code: '134' },
    { country: 'Либерия', code: '135' },
    { country: 'Лесото', code: '136' },
    { country: 'Малави', code: '137' },
    { country: 'Намибия', code: '138' },
    { country: 'Нигер', code: '139' },
    { country: 'Руанда', code: '140' },
    { country: 'Суринам', code: '142' },
    { country: 'Таджикистан', code: '143' },
    { country: 'Бахрейн', code: '145' },
    { country: 'Реюньон', code: '146' },
    { country: 'Замбия', code: '147' },
    { country: 'Армения', code: '148' },
    { country: 'Сомали', code: '149' },
    { country: 'Конго', code: '150' },
    { country: 'Буркина-Фасо', code: '152' },
    { country: 'Ливан', code: '153' },
    { country: 'Габон', code: '154' },
    { country: 'Албания', code: '155' },
    { country: 'Маврикий', code: '157' },
    { country: 'Бутан', code: '158' },
    { country: 'Мальдивы', code: '159' },
    { country: 'Туркменистан', code: '161' },
    { country: 'Экваториальная Гвинея', code: '167' },
    { country: 'Антигуа и Барбуда', code: '169' },
    { country: 'Дания', code: '172' },
    { country: 'Норвегия', code: '174' },
    { country: 'Австралия', code: '175' },
    { country: 'Эритрея', code: '176' },
    { country: 'Южный Судан', code: '177' },
    { country: 'Сан-Томе и Принсипи', code: '178' },
    { country: 'Аруба', code: '179' },
    { country: 'Монтсеррат', code: '180' },
    { country: 'Ангилья', code: '181' },
    { country: 'Северная Македония', code: '183' },
    { country: 'Республика Сейшелы', code: '184' },
    { country: 'Новая Каледония', code: '185' },
    { country: 'Кабо-Верде', code: '186' },
    { country: 'США', code: '187' },
    { country: 'Палестина', code: '188' },
    { country: 'Фиджи', code: '189' },
    { country: 'Южная Корея', code: '190' },
    { country: 'Западная Сахара', code: '192' },
]

watch(selectedCountry, async () => {
    const code: string = selectedCountry.value.code
    const codes: string[] = [code]
    fields.phone_country_code = codes
})
</script>

<template>
    <AppLayout>
        <div class="sms">
            <h2 class="sms__title title">SMS Сервисы</h2>
            <div class="sms__inner">
                <div class="sms__item sms__item_reverse">
                    <InputSwitch v-model="fields.take_phone_by_ip" />
                    <span class="sms__text">Брать телефон исходя из ip адреса</span>
                </div>
                <div class="sms__item">
                    <span class="sms__text">Время ожидания смс</span>
                    <Slider v-model="fields.how_long_wait_sms" :min="1" :max="20" />
                </div>
                <div class="sms__item sms__item_reverse">
                    <InputSwitch v-model="fields.use_phone_multiple_times_for_reg" />
                    <span class="sms__text">Использовать один номер несколько раз для регистрации</span>
                </div>
                <div class="sms__item sms__item_reverse">
                    <InputSwitch v-model="fields.use_phone_multiple_times_for_unlock" />
                    <span class="sms__text">Использовать один номер несколько раз для разблокировки</span>
                </div>
                <div class="sms__item sms__item_reverse">
                    <InputSwitch v-model="fields.generate_phone" />
                    <span class="sms__text">Генерировать телефон</span>
                </div>
                <InputText
                    v-model:input="fields.smska_net"
                    type="text"
                    placeholder="smska.net"
                    v-if="fields.take_phone_by_ip === true"
                />
                <InputText
                    v-model:input="fields.sms_reg"
                    type="text"
                    placeholder="smsreg"
                    v-if="fields.take_phone_by_ip === true"
                />
                <InputText
                    v-model:input="fields.simsms_org"
                    type="text"
                    placeholder="simsms.org"
                    v-if="fields.take_phone_by_ip === true"
                />
                <InputText
                    v-model:input="fields.get_sms_online"
                    type="text"
                    placeholder="GetSmsOnline"
                    v-if="fields.take_phone_by_ip === true"
                />
                <InputText
                    v-model:input="fields.give_sms"
                    type="text"
                    placeholder="GiveSms"
                    v-if="fields.take_phone_by_ip === true"
                />
                <InputText
                    v-model:input="fields.virtual_sms"
                    type="text"
                    placeholder="VirtualSms"
                    v-if="fields.take_phone_by_ip === true"
                />
                <InputText
                    v-model:input="fields.five_sim_sms"
                    type="text"
                    placeholder="FiveSimSms"
                    v-if="fields.take_phone_by_ip === true"
                />
                <InputText
                    v-model:input="fields.sms_actiwator"
                    type="text"
                    placeholder="SmsActiwator"
                    v-if="fields.take_phone_by_ip === true"
                />
                <InputText
                    v-model:input="fields.sms_activate"
                    type="text"
                    placeholder="SmsActivate"
                    v-if="fields.take_phone_by_ip === true"
                />
                <InputText
                    v-model:input="fields.text_now"
                    type="text"
                    placeholder="TextNow"
                    v-if="fields.take_phone_by_ip === true"
                />
                <InputText
                    v-model:input="fields.text_now_developer"
                    type="text"
                    placeholder="TextNowDeveloper"
                    v-if="fields.take_phone_by_ip === true"
                />
                <InputText
                    v-model:input="fields.sms_hub"
                    type="text"
                    placeholder="SmsHub"
                    v-if="fields.take_phone_by_ip === true"
                />
                <InputText
                    v-model:input="fields.vak_sms_com"
                    type="text"
                    placeholder="vak-sms.vom"
                    v-if="fields.take_phone_by_ip === true"
                />
                <InputText
                    v-model:input="fields.activation_pw"
                    type="text"
                    placeholder="Activation PW"
                    v-if="fields.take_phone_by_ip === true"
                />
                <InputText
                    v-model:input="fields.grizzly_sms"
                    type="text"
                    placeholder="Grizzly SMS"
                    v-if="fields.take_phone_by_ip === true"
                />
                <InputText
                    v-model:input="fields.dropsmsbot"
                    type="text"
                    placeholder="@dropsmsbot"
                    v-if="fields.take_phone_by_ip === true"
                />
                <div class="sms__item">
                    <div class="sms__dropdown">
                        <span class="sms__text-span">Страна:</span>
                        <Dropdown
                            v-model="selectedCountry"
                            icon="none"
                            :options="countries"
                            optionLabel="country"
                            placeholder="Россия"
                            unstyled
                            :pt="{
                                root: { class: 'country__root' },
                                trigger: { class: 'country__trigger' },
                                panel: { class: 'country__panel' },
                                wrapper: { class: 'country__wrapper', style: 'max-height: 300px; overflow: auto;' },
                                item: { class: 'country__item' },
                                input: { class: 'country__input' },
                            }"
                        />
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>

<style lang="scss" scoped>
.sms {
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

    &__dropdown {
        position: relative;
        width: 100%;
    }

    &__text-span {
        position: absolute;
        font-family: 'Inter', sans-serif;
        font-weight: 500;
        line-height: 21px;
        top: 50%;
        transform: translateY(-50%);
        left: 16px;
        color: #091c31;

        @media only screen and (max-width: 1439px) and (min-width: 320px) {
            display: none;
        }
    }
}

.dark .sms {
    &__inner {
        background-color: #091c31;
        box-shadow: none;
    }

    &__text {
        color: #fff;
    }

    &__text-span {
        color: #fff;
    }
}
</style>
