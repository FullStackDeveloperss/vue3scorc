<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue'
import InputText from '@/components/ui/InputText.vue'
import InputSwitch from 'primevue/inputswitch'
import Slider from 'primevue/slider'
import { computed, onBeforeMount, reactive } from 'vue'
import axios from 'axios'
import { setFields, startWatch } from '@/helpers'
import type { Fields } from '@/types/sms'
import MultiSelect from 'primevue/multiselect'


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

// const selectedCountry = ref<[{ country: string; code: string}] | []>([])
const selectedCountry = computed({
    get() {
        return fields.phone_country_code.map(item => {
            return countries.find(country => country.code === item)
        })
    },
    set(val) {
        fields.phone_country_code = val.map(item => item?.code)
    },
})

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

const unselectCountry = country => {
    selectedCountry.value = selectedCountry.value.filter(item => item.code !== country.code)
}

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
                <div class="sms__item">
                    <div class="sms__dropdown">
                        <span class="dropdown__text-span">Страны:</span>

                        <MultiSelect v-model="selectedCountry"
                                     :options="countries"
                                     optionLabel="country"
                                     display="chip"
                                     placeholder="Страны: "
                                     :pt="{
                                         root: { class: 'custom-multiselect' },
                                         labelContainer: { class: 'custom-multiselect__label-container' },
                                         label: { class: 'custom-multiselect__label-list' },
                                         token: { class: 'custom-multiselect__token' },
                                         removeTokenIcon: { class: 'custom-multiselect__remove' },
                                         list: { class: 'custom-multiselect__list' },
                                         item: { class: 'custom-multiselect__item' },
                                         trigger: { class: 'custom-multiselect__trigger' },
                                         header: { class: 'custom-multiselect__header' },
                                         panel: { class: 'custom-multiselect__panel' },
                                         checkboxContainer: { class: 'custom-multiselect__checkbox-container' },

                                     }"
                        >
                        </MultiSelect>
                        <div class="custom-multiselect__label-list">
                            <div class="custom-multiselect__token" v-for="item of selectedCountry">
                                <div class="custom-multiselect__selected-value">{{ item.country }}</div>
                                <div class="custom-multiselect__selected-remove" @click="unselectCountry(item)">
                                    <svg width="14"
                                         height="14"
                                         viewBox="0 0 14 14"
                                         fill="none"
                                         xmlns="http://www.w3.org/2000/svg"
                                         class="p-icon p-multiselect-token-icon custom-multiselect__remove"
                                         aria-hidden="true"
                                         data-pc-section="removetokenicon">
                                        <g clipPath="url(#pv_icon_clip_pv_id_6)">
                                            <path fill-rule="evenodd"
                                                  clip-rule="evenodd"
                                                  d="M7 14C5.61553 14 4.26215 13.5895 3.11101 12.8203C1.95987 12.0511 1.06266 10.9579 0.532846 9.67879C0.00303296 8.3997 -0.13559 6.99224 0.134506 5.63437C0.404603 4.2765 1.07129 3.02922 2.05026 2.05026C3.02922 1.07129 4.2765 0.404603 5.63437 0.134506C6.99224 -0.13559 8.3997 0.00303296 9.67879 0.532846C10.9579 1.06266 12.0511 1.95987 12.8203 3.11101C13.5895 4.26215 14 5.61553 14 7C14 8.85652 13.2625 10.637 11.9497 11.9497C10.637 13.2625 8.85652 14 7 14ZM7 1.16667C5.84628 1.16667 4.71846 1.50879 3.75918 2.14976C2.79989 2.79074 2.05222 3.70178 1.61071 4.76768C1.16919 5.83358 1.05367 7.00647 1.27876 8.13803C1.50384 9.26958 2.05941 10.309 2.87521 11.1248C3.69102 11.9406 4.73042 12.4962 5.86198 12.7212C6.99353 12.9463 8.16642 12.8308 9.23232 12.3893C10.2982 11.9478 11.2093 11.2001 11.8502 10.2408C12.4912 9.28154 12.8333 8.15373 12.8333 7C12.8333 5.45291 12.2188 3.96918 11.1248 2.87521C10.0308 1.78125 8.5471 1.16667 7 1.16667ZM4.66662 9.91668C4.58998 9.91704 4.51404 9.90209 4.44325 9.87271C4.37246 9.84333 4.30826 9.8001 4.2544 9.74557C4.14516 9.6362 4.0838 9.48793 4.0838 9.33335C4.0838 9.17876 4.14516 9.0305 4.2544 8.92113L6.17553 7L4.25443 5.07891C4.15139 4.96832 4.09529 4.82207 4.09796 4.67094C4.10063 4.51982 4.16185 4.37563 4.26872 4.26876C4.3756 4.16188 4.51979 4.10066 4.67091 4.09799C4.82204 4.09532 4.96829 4.15142 5.07887 4.25446L6.99997 6.17556L8.92106 4.25446C9.03164 4.15142 9.1779 4.09532 9.32903 4.09799C9.48015 4.10066 9.62434 4.16188 9.73121 4.26876C9.83809 4.37563 9.89931 4.51982 9.90198 4.67094C9.90464 4.82207 9.84855 4.96832 9.74551 5.07891L7.82441 7L9.74554 8.92113C9.85478 9.0305 9.91614 9.17876 9.91614 9.33335C9.91614 9.48793 9.85478 9.6362 9.74554 9.74557C9.69168 9.8001 9.62748 9.84333 9.55669 9.87271C9.4859 9.90209 9.40996 9.91704 9.33332 9.91668C9.25668 9.91704 9.18073 9.90209 9.10995 9.87271C9.03916 9.84333 8.97495 9.8001 8.9211 9.74557L6.99997 7.82444L5.07884 9.74557C5.02499 9.8001 4.96078 9.84333 4.88999 9.87271C4.81921 9.90209 4.74326 9.91704 4.66662 9.91668Z"
                                                  fill="currentColor"></path>
                                        </g>
                                        <defs>
                                            <clipPath id="pv_icon_clip_pv_id_6">
                                                <rect width="14" height="14" fill="white"></rect>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="sms__inner" v-if="selectedCountry?.length">
                <InputText
                    v-model:input="fields.smska_net"
                    type="text"
                    placeholder="smska.net"
                />
                <InputText
                    v-model:input="fields.sms_reg"
                    type="text"
                    placeholder="smsreg"
                />
                <InputText
                    v-model:input="fields.simsms_org"
                    type="text"
                    placeholder="simsms.org"
                />
                <InputText
                    v-model:input="fields.get_sms_online"
                    type="text"
                    placeholder="GetSmsOnline"
                />
                <InputText
                    v-model:input="fields.give_sms"
                    type="text"
                    placeholder="GiveSms"
                />
                <InputText
                    v-model:input="fields.virtual_sms"
                    type="text"
                    placeholder="VirtualSms"
                />
                <InputText
                    v-model:input="fields.five_sim_sms"
                    type="text"
                    placeholder="FiveSimSms"
                />
                <InputText
                    v-model:input="fields.sms_actiwator"
                    type="text"
                    placeholder="SmsActiwator"
                />
                <InputText
                    v-model:input="fields.sms_activate"
                    type="text"
                    placeholder="SmsActivate"
                />
                <InputText
                    v-model:input="fields.text_now"
                    type="text"
                    placeholder="TextNow"
                />
                <InputText
                    v-model:input="fields.text_now_developer"
                    type="text"
                    placeholder="TextNowDeveloper"
                />
                <InputText
                    v-model:input="fields.sms_hub"
                    type="text"
                    placeholder="SmsHub"
                />
                <InputText
                    v-model:input="fields.vak_sms_com"
                    type="text"
                    placeholder="vak-sms.vom"
                />
                <InputText
                    v-model:input="fields.activation_pw"
                    type="text"
                    placeholder="Activation PW"
                />
                <InputText
                    v-model:input="fields.grizzly_sms"
                    type="text"
                    placeholder="Grizzly SMS"
                />
                <InputText
                    v-model:input="fields.dropsmsbot"
                    type="text"
                    placeholder="@dropsmsbot"
                />
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

        & + & {
            margin-top: 24px;
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
