<script setup lang="ts">
import { computed, toRefs } from 'vue'

const props = defineProps<{
	input: string
}>()

const { input } = toRefs(props)

const emit = defineEmits(['update:input'])

const inputComputed = computed({
	get: () => input.value,
	set: (val) => emit('update:input', val)
})
</script>

<template>
	<label class="label">
		<textarea v-model="inputComputed" class="textarea"></textarea>
	</label>
</template>

<style lang="scss" scoped>
.label {
	width: 100%;
}

.textarea {
	padding: 11px 16px;
	border-radius: 10px;
	border: 1px solid #BFC5CD;
	width: 100%;
	height: 140px;
	outline: none;
	resize: none;
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

.dark .textarea {
	color: #eee;

	::placeholder {
		color: #eee;
	}
}
</style>
