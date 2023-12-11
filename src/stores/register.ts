import { defineStore } from 'pinia'
import { reactive } from 'vue'
import axios from 'axios'
import { setFields, startWatch } from '@/helpers'
import type { Fields } from '@/types/register'

export const useRegisterStore = defineStore(
    'register',
    () => {
        const fields: Fields = reactive({
            account_pause_after_registr: 14,
            add_friends_count: [1, 48],
            add_friends_status: true,
            brides_bay_photo: false,
            create_db_tables: false,
            fill_by_current_ip: false,
            fill_info: true,
            firstmail_limited_api_key: '',
            firstmail_limited_check_valid: false,
            firstmail_limited_status: true,
            gender_choose: false,
            gender_type: 'female',
            get_phone_on_reg_ban: true,
            kopeechka_api_key: 'fbe7bebf8b69dbf7db4840b050bb09f4',
            kopeechka_check_valid: true,
            kopeechka_status: true,
            post_count: [0, 10],
            reg_accounts_per_day: 1,
            reg_around_the_clock: false,
            reg_threads_count: 20,
            reg_time_range: [0, 24],
            reg_way: 'by_app_web',
            reger_status: true,
            register_to_my_emails: true,
            relink_to_email: false,
            relink_to_service_phone: false,
            text_to_education: '',
            text_to_work: '',
            visit_sites: [0, 48],
        })

        const initWatch = () => {
            startWatch(fields, 'accounts')
        }

        const getData = async () => {
            try {
                const res = await axios.post('setting/get', { code: 'accounts' })
                setFields(fields, res.data.fields)
            } catch (error) {
                console.log(error)
            }
        }

        return { fields, getData, initWatch }
    },
    { persist: true },
)
