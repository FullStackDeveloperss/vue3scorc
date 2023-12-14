<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue'
import Textarea from '@/components/ui/Textarea.vue'
import InputSwitch from 'primevue/inputswitch'
import axios from 'axios'
import { reactive, onBeforeMount } from 'vue'
import { startWatch, setFields } from '@/helpers'
import type { Fields } from '@/types/public'

onBeforeMount(async () => {
    try {
        const res = await axios.post('setting/get', { code: 'inviter_public' })
        setFields(fields, res.data.fields)
    } catch (error) {
        console.log(error)
    }
    startWatch(fields, 'inviter_public')
})

const fields: Fields = reactive({
    inviter_public: '',
    inviter_public_link: '',
    inviter_public_invite_text: '',
    inviter_repost_links: '',
})

// const inviterPublic = ref<boolean>(false)
// const linkPublic = ref<string>('')
// const textPublic = ref<string>('')
// const linkGroup = ref<string>('')
</script>

<template>
    <AppLayout>
        <div class="public">
            <h2 class="public__title title">Настройка инвайтера</h2>
            <div class="public__inner">
                <div class="public__item public__item_reverse">
                    <InputSwitch v-model="fields.inviter_public" />
                    <span class="public__text">Инвайтер в паблик</span>
                </div>
                <div class="public__item">
                    <span class="public__text">Ссылка на паблик</span>
                    <Textarea v-model:input="fields.inviter_public_link" />
                </div>
                <div class="public__item">
                    <span class="public__text">Текст приглашения в паблик</span>
                    <Textarea v-model:input="fields.inviter_public_invite_text" />
                </div>
                <div class="public__item">
                    <span class="public__text">Ссылки на группы и приглашения</span>
                    <Textarea v-model:input="fields.inviter_repost_links" />
                </div>
            </div>
        </div>
    </AppLayout>
</template>

<style lang="scss" scoped>
.public {
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

.dark .public {
    &__inner {
        background-color: #091c31;
        box-shadow: none;
    }

    &__text {
        color: #fff;
    }
}
</style>
