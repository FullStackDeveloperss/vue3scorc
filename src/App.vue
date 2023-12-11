<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useUserStore } from './stores/user'

const userStore = useUserStore()

const { user } = storeToRefs(userStore)

onMounted(() => {
  user.value
})
</script>

<template>
  <RouterView />
</template>

<style lang="scss" scoped></style>
