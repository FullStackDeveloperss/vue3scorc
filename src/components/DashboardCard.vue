<script setup lang="ts">
defineProps<{
	src: string,
	num: number | undefined,
	text: string,
	alt: string,
}>()
</script>

<template>
	<div class="dashboard__card">
		<img class="dashboard__card-img" :src="src" :alt="alt">
		<div class="dashboard__card-item">
			<span class="dashboard__card-num">{{ num }}</span>
			<span class="dashboard__card-text">{{ text }}</span>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.dashboard {

	&__card {
		padding: 30px 30px 32px;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		border-radius: 24px;
		background-color: #fff;
		box-shadow: 0px 6px 32px 0px rgba(0, 0, 0, 0.05);

		@media only screen and (max-width: 743px) and (min-width: 320px) {
			padding: 30px 48px 30px 30px;
			flex-direction: row-reverse;
			justify-content: space-between;
			align-items: center;
			text-align: start;
		}
	}

	&__card-img {
		margin-bottom: 18px;
		width: 48px;
		height: 48px;

		@media only screen and (max-width: 743px) and (min-width: 320px) {
			margin-bottom: 0;
		}
	}

	&__card-item {
		display: flex;
		flex-direction: column;
	}

	&__card-num {
		font-size: 48px;
		font-weight: 600;
		line-height: 56px;
		letter-spacing: -0.03px;
		color: #091C31;
	}

	&__card-text {
		font-size: 17px;
		font-weight: 500;
		line-height: 28px;
		letter-spacing: 0.18px;
	}
}

.dark .dashboard {
	&__card {
		background-color: #091C31;
		box-shadow: none;
	}

	&__card-num {
		color: #fff;
	}

	&__card-text {
		color: #778DA6;
	}
}
</style>
