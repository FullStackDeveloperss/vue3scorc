<script setup lang="ts">
defineProps<{
	src: string,
	alt: string,
	border: string,
	backgroundColor: string,
}>()
</script>

<template>
	<button class="btn" :style="[{ border: border }, { backgroundColor: backgroundColor }]">
		<img class="btn__img" :src="src" :alt="alt">
	</button>
</template>

<style lang="scss" scoped>
.btn {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 16px;
	width: 44px;
	height: 44px;
	border-radius: 10px;
}
</style>
