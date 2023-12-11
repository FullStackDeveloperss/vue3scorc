<script setup lang="ts">
import StatusSuccess from '@/components/icons/StatusSuccess.vue'
import type { Statuses } from '@/types/dashboard'
import StatusError from './icons/StatusError.vue'

defineProps<{ statuses: Statuses }>()
</script>

<template>
	<li class="dashboard__status-item" v-for="status in statuses.valid" :key="status.status">
		<div class="dashboard__status-info">
			<div class="dashboard__status-img">
				<StatusSuccess />
			</div>
			<span class="dashboard__status-text">{{ status.text }}</span>
		</div>
		<span class="dashboard__status-num">{{ status.counter }}</span>
	</li>
	<li class="dashboard__status-item" v-for="status in statuses.invalid" :key="status.status">
		<div class="dashboard__status-info">
			<div class="dashboard__status-img">
				<StatusError />
			</div>
			<span class="dashboard__status-text">{{ status.text }}</span>
		</div>
		<span class="dashboard__status-num">{{ status.counter }}</span>
	</li>
</template>

<style lang="scss" scoped>
.dashboard {

	&__status-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 16px;
		gap: 10px;
		border-bottom: 1px solid #eee;

		&:last-child {
			border-bottom: none;
			padding-bottom: 0;
		}
	}

	&__status-info {
		display: flex;
		align-items: center;
		gap: 13px;
	}

	&__status-img {
		width: 24px;
		height: 24px;
	}

	&__status-text {
		color: #091C31;

		@media only screen and (max-width: 743px) and (min-width: 430px) {
			max-width: 320px;
		}

		@media only screen and (max-width: 429px) and (min-width: 320px) {
			max-width: 150px;
		}
	}

	&__status-num {
		font-family: 'Inter', sans-serif;
		font-weight: 500;
		line-height: 21px;
		width: 60px;
		text-align: end;
	}
}

.dark .dashboard {
	&__status-item {
		border-bottom: 1px solid #1B395B;

		&:last-child {
			border-bottom: none;
			padding-bottom: 0;
		}
	}

	&__status-text {
		color: #fff;
	}
}
</style>
