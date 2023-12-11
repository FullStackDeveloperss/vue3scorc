<script setup lang="ts">
defineProps<{ text: string }>()
</script>

<template>
	<button class="btn">
		{{ text }}
	</button>
</template>

<style lang="scss" scoped>
.btn {
	padding: 7px 16px;
	height: 44px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 10px;
	background-color: #0067D5;
	font-family: "Manrope", sans-serif;
	font-size: 15px;
	font-weight: 400;
	line-height: 22px;
	letter-spacing: 0.2px;
	color: #fff;
	transition: all .3s ease-in-out;

	&:hover {
		background-color: #1B395B;
	}

	&:focus {
		color: #0067D5;
		background-color: rgba(22, 101, 255, 0.10);
	}

	&:disabled {
		background-color: #eee;
	}
}

.dark .btn {
	&:disabled {
		color: #3C5A7B;
		background-color: #1B395B;
	}
}
</style>
