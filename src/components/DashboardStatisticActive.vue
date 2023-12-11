<script setup lang="ts">
import Chart from 'primevue/chart'
import { onMounted, ref } from 'vue'

const chartData = ref()
const chartOptions = ref()

const setChartData = () => {
	return {
		labels: ['добавлено в друзья', 'сообщения'],
		datasets: [
			{
				data: [540, 325],
				backgroundColor: ['#66B9FF', '#0067D5'],
				borderWidth: 0
			}
		],
	}
}

const setChartOptions = () => {
	return {
		plugins: {
			legend: {
				position: 'bottom',
				maxWidth: 260,
				labels: {
					boxWidth: 12,
					boxHeight: 12,
					usePointStyle: true,
					color: '#3C5A7B',
					font: {
						family: "'Manrope', sans-serif",
						size: 13,
						weight: 400,
					}
				}
			},
		}
	}
}

onMounted(() => {
	chartData.value = setChartData()
	chartOptions.value = setChartOptions()
})
</script>

<template>
	<div class="statistic__active">
		<h3 class="statistic__title">Статистика активности</h3>
		<Chart type="doughnut" :data="chartData" :options="chartOptions" :pt="{ root: { class: 'doughnut__root' } }" />
	</div>
</template>

<style lang="scss" scoped>
.statistic {
	&__active {
		padding: 24px 32px 36px;
		border-radius: 24px;
		background: #fff;
		box-shadow: 0px 6px 32px 0px rgba(0, 0, 0, 0.05);
	}

	&__title {
		font-size: 17px;
		font-style: normal;
		font-weight: 500;
		letter-spacing: 0.18px;
		color: #091C31;
		margin-bottom: 35px;
	}
}

.dark .statistic {
	&__active {
		background-color: #091C31;
		box-shadow: none;
	}

	&__title {
		color: #fff;
	}
}
</style>
