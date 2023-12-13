<script setup lang="ts">
defineProps<{
	src: string,
	alt: string,
	border: string,
	backgroundColor: string,
}>()
</script>

<template>
	<button :alt="alt" class="btn" :style="[{ border: border }, { backgroundColor: backgroundColor }]">
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
    position: relative;

    &[tooltip]:hover:after {
        content: attr(alt);
        position: absolute;
        top: 105%;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 6px;
        background: rgba(0,0,0, .5);
        font-size: 12px;
        color: #fff;
        line-height: 1.3;
        max-width: 150px;
        width: max-content;
        padding: 5px 10px;
    }
}
</style>
