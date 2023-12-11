<script setup lang="ts">
import Textarea from '@/components/ui/Textarea.vue'
import InputSwitch from 'primevue/inputswitch'
import Slider from 'primevue/slider'
import { usePostingStore } from '@/stores/posting'

const postingStore = usePostingStore()
</script>

<template>
    <div class="posting__inner">
        <div class="posting__item posting__item_reverse">
            <InputSwitch v-model="postingStore.fields.posting" />
            <span class="posting__text">Постинг</span>
        </div>
        <div class="posting__item" v-if="postingStore.fields.posting === true">
            <span class="posting__text">Количество друзей для старта</span>
            <Slider v-model="postingStore.fields.frends_for_posting_start" :min="100" :max="1000" />
        </div>
        <div class="posting__item" v-if="postingStore.fields.posting === true">
            <span class="posting__text">Текст для постов на стену</span>
            <Textarea v-model:input="postingStore.fields.text_to_posting" />
        </div>
        <div class="posting__item posting__item_reverse">
            <InputSwitch v-model="postingStore.fields.post_link_and_text_to_profile" />
            <span class="posting__text">Постить ссылку и текст в профиль</span>
        </div>
        <div class="posting__item" v-if="postingStore.fields.post_link_and_text_to_profile === true">
            <span class="posting__text">Текст для биографии</span>
            <Textarea v-model:input="postingStore.fields.text_to_bio" />
        </div>
        <div class="posting__item">
            <span class="posting__text">День старта</span>
            <Slider v-model="postingStore.fields.reposting_day_start" :min="0" :max="30" />
        </div>
        <div class="posting__item">
            <span class="posting__text">Ссылки на группы/паблики для репостов</span>
            <Textarea v-model:input="postingStore.fields.links_to_repost" />
        </div>
        <div class="posting__item">
            <span class="posting__text">RSS для постов в группы</span>
            <Textarea v-model:input="postingStore.fields.rss_links" />
        </div>
        <div class="posting__item">
            <span class="posting__text">RSS с комментариями для постов</span>
            <Textarea v-model:input="postingStore.fields.rss_with_comments" />
        </div>
        <div class="posting__item posting__item_reverse">
            <InputSwitch v-model="postingStore.fields.posting_like" />
            <span class="posting__text">Лайкать посты</span>
        </div>
        <div class="posting__item posting__item_reverse">
            <InputSwitch v-model="postingStore.fields.posting_share" />
            <span class="posting__text">Расшарить посты</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.posting {
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

.dark .posting {
    &__inner {
        background-color: #091c31;
        box-shadow: none;
    }

    &__text {
        color: #fff;
    }
}
</style>
