import type { Fields } from '@/types/posting'
import { defineStore } from 'pinia'
import { reactive } from 'vue'
import axios from 'axios'
import { setFields, startWatch } from '@/helpers'

export const usePostingStore = defineStore(
    'posting',
    () => {
        const fields: Fields = reactive({
            posting: false,
            frends_for_posting_start: 100,
            text_to_posting: '',
            rss_links: '',
            rss_with_comments: '',
            text_to_bio: '',
            groups_of_group_field: '',
            text_input_field: '',
            pictures_folder_path: '',
            post_link_and_text_to_profile: false,
            reposting_day_start: 1,
            links_to_repost: '',
            posting_like: false,
            posting_share: false,
            like_to_post: false,
            comment_to_post_status: false,
            comment_to_post: '',
            post_to_dating_group: false,
            post_to_dating_group_day_start: 1,
        })

        const initWatch = () => {
            startWatch(fields, 'templates-auto-control')
        }

        const getData = async () => {
            try {
                const res = await axios.post('setting/get', { code: 'posting' })
                setFields(fields, res.data.fields)
            } catch (error) {
                console.log(error)
            }
        }

        return { fields, getData, initWatch }
    },
    { persist: true },
)
