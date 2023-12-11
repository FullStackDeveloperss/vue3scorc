<script setup lang="ts">
import InputText from '@/components/ui/InputText.vue'
import Textarea from '@/components/ui/Textarea.vue'
import InputSwitch from 'primevue/inputswitch'
import Slider from 'primevue/slider'
import { usePostingStore } from '@/stores/posting'

const postingStore = usePostingStore()

// const putLike = ref<boolean>(false)
// const writeComment = ref<boolean>(false)
// const putPosts = ref<boolean>(false)
// const writeGroups = ref<string>('')
// const writeText = ref<string>('')
// const roadToImages = ref<string>('')
// const textComment = ref<string>('')
// const dayPosts = ref<number>(0)
</script>

<template>
    <div class="posting">
        <div class="posting__inner">
            <h3 class="posting__subtitle">Постинг/Комментирование постов в группах</h3>
            <div class="posting__wrapper">
                <div class="posting__item posting__item_reverse">
                    <InputSwitch v-model="postingStore.fields.like_to_post" />
                    <span class="posting__text">Ставить лайк посту</span>
                </div>
                <div class="posting__item posting__item_reverse">
                    <InputSwitch v-model="postingStore.fields.comment_to_post_status" />
                    <span class="posting__text">Писать комментарий под постом</span>
                </div>
                <div class="posting__item" v-if="postingStore.fields.comment_to_post_status === true">
                    <span class="posting__text">Текст для комментариев</span>
                    <Textarea v-model:input="postingStore.fields.comment_to_post" />
                </div>
                <div class="posting__item posting__item_reverse">
                    <InputSwitch v-model="postingStore.fields.post_to_dating_group" />
                    <span class="posting__text">Делать посты в группах для знакомств</span>
                </div>
                <div class="posting__item" v-if="postingStore.fields.post_to_dating_group === true">
                    <span class="posting__text">День старта</span>
                    <Slider v-model="postingStore.fields.post_to_dating_group_day_start" :min="0" :max="30" />
                </div>
                <div class="posting__item">
                    <span class="posting__text">Поле для ввода пачки групп </span>
                    <Textarea v-model:input="postingStore.fields.groups_of_group_field" />
                </div>
                <div class="posting__item">
                    <span class="posting__text">Поле для ввода текста</span>
                    <Textarea v-model:input="postingStore.fields.text_input_field" />
                </div>
                <InputText
                    v-model:input="postingStore.fields.pictures_folder_path"
                    type="text"
                    placeholder="Путь к папке с картинками"
                />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.posting {
    &__inner {
        padding: 24px 32px 36px;
        border-radius: 24px;
        background-color: #fff;
        box-shadow: 0px 6px 32px 0px rgba(0, 0, 0, 0.05);
    }

    &__wrapper {
        display: flex;
        flex-direction: column;
        gap: 24px;

        @media only screen and (max-width: 743px) and (min-width: 320px) {
            gap: 20px;
        }
    }

    &__subtitle {
        font-size: 17px;
        font-weight: 500;
        line-height: 28px;
        letter-spacing: 0.18px;
        color: #091c31;
        margin-bottom: 28px;
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

    &__subtitle {
        color: #fff;
    }

    &__text {
        color: #fff;
    }
}
</style>
