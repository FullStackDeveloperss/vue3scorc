<script setup lang="ts">
import Navbar from '@/components/layout/Navbar.vue'
import Sidebar from '@/components/layout/Sidebar.vue'
import { useRootStore } from '@/stores/root'
import { storeToRefs } from 'pinia'

const rootStore = useRootStore()
const { isCloseSidebar } = storeToRefs(rootStore)

</script>

<template>
	<div class="inner">
		<Navbar />
		<Sidebar />
		<div class="wrapper" :class="{ 'wrapper__close': isCloseSidebar }">
			<slot />
		</div>
	</div>
</template>

<style lang="scss" scoped>
.wrapper {
	padding: 96px 36px 68px 336px;
	transition: all .3s ease-in-out;
	position: relative;

	@media only screen and (max-width: 1279px) and (min-width: 1024px) {
		padding: 84px 24px 36px 324px;
	}

	@media only screen and (max-width: 1023px) and (min-width: 744px) {
		padding: 84px 24px 32px;

		&::after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, .5);
			transition: all .3s ease-in-out;
		}
	}

	@media only screen and (max-width: 743px) and (min-width: 320px) {
		padding: 80px 20px 36px 104px;
	}

	&__close {
		padding: 96px 36px 68px 154px;

		@media only screen and (max-width: 1279px) and (min-width: 1024px) {
			padding: 84px 24px 36px 108px;
		}

		@media only screen and (max-width: 1023px) and (min-width: 320px) {
			padding: 84px 24px 32px;

			&::after {
				z-index: -1;
				background-color: #f5f6f8;
			}
		}

		@media only screen and (max-width: 743px) and (min-width: 320px) {
			padding: 80px 20px 36px;
		}
	}
}

.inner {
	position: relative;
}

.dark {
	& .wrapper {
		&__close {
			@media only screen and (max-width: 1023px) and (min-width: 320px) {
				padding: 84px 24px 32px;

				&::after {
					z-index: -1;
					background-color: #122a45;
				}
			}
		}
	}
}
</style>
