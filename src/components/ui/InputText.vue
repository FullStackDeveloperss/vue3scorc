<script setup lang="ts">
import { computed, toRefs } from 'vue'

const props = defineProps<{
	input: string | number
	type: string
	placeholder?: string
	src?: string
	pic?: string
}>()

const { input, placeholder, type } = toRefs(props)

const emit = defineEmits(['update:input'])

const inputComputed = computed({
	get: () => input.value,
	set: (val) => emit('update:input', val)
})
</script>

<template>
	<label class="label">
		<img class="img" :src="src">
		<input class="input" v-model="inputComputed" :type="type" :placeholder="placeholder" />
		<img class="pic" :src="pic">
	</label>
</template>

<style lang="scss" scoped>
.label {
	position: relative;
	width: 100%;
	height: 44px;
}

.input {
	padding: 11px 46px;
	border-radius: 10px;
	border: 1px solid #BFC5CD;
	width: 100%;
	outline: none;
	background-color: transparent;
	color: #091C31;
	font-family: 'Manrope', sans-serif;
	font-size: 15px;
	font-weight: 400;
	line-height: 22px;
	letter-spacing: 0.2px;
	transition: all .3s ease-in-out;

	::placeholder {
		font-family: 'Manrope', sans-serif;
		font-size: 15px;
		font-weight: 400;
		line-height: 22px;
		letter-spacing: 0.2px;
		color: #091C31;
	}

	&:focus {
		border: 1px solid #0067D5;
		background-color: rgba(0, 103, 213, 0.10);
	}

	&:hover {
		border: 1px solid #778DA6;
	}
}

.img {
	position: absolute;
	top: 50%;
	left: 16px;
	transform: translateY(-50%);
}

.pic {
	position: absolute;
	top: 50%;
	right: 16px;
	transform: translateY(-50%);
}

.dark .input {
	color: #eee;

	::placeholder {
		color: #eee;
	}
}
</style>
