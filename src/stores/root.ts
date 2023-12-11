import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRootStore = defineStore(
	'root',
	() => {
		const isCloseSidebar = ref<boolean>(true)

		return { isCloseSidebar }
	},
	{ persist: true }
)
