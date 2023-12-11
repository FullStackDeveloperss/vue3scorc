import { defineStore } from 'pinia'
import { reactive } from 'vue'
import axios from 'axios'
import { setFields, startWatch } from '@/helpers'
import type { Fields } from '@/types/autoserver'

export const useAutoserverStore = defineStore(
    'autoserver',
    () => {
        const fields: Fields = reactive({
            remove_invalid_accounts: true,
            server_auto_reboot: true,
            servert_auto_reboot_at: 2,
            template_auto_update: true,
            template_chat_bot: true,
            template_checkpoint: true,
            template_registrator: true,
            template_spam_bot: true,
            template_worm: true,
            template_worm_bm: true,
        })

        const initWatch = () => {
            startWatch(fields, 'templates-auto-control')
        }

        const getData = async () => {
            try {
                const res = await axios.post('setting/get', { code: 'templates-auto-control' })
                setFields(fields, res.data.fields)
            } catch (error) {
                console.log(error)
            }
        }

        return { fields, getData, initWatch }
    },
    { persist: true },
)
