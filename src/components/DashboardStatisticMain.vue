<script setup lang="ts">
import Chart from 'primevue/chart'
import { onMounted, ref } from 'vue'

const chartData = ref()
const chartOptions = ref()

const setChartData = () => {
	return {
		labels: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'],
		datasets: [
			{
				label: 'уники',
				data: [9, 59, 80, 81, 56, 55, 40],
				borderColor: '#0067D5',
				backgroundColor: '#0067D5',
				pointStyle: false,
				borderWidth: 1.5,
			},
			{
				label: 'доход',
				data: [28, 48, 40, 19, 86, 27, 90],
				borderColor: '#16C050',
				backgroundColor: '#16C050',
				pointStyle: false,
				borderWidth: 1.5
			}
		]
	}
}
const setChartOptions = () => {
	return {
		maintainAspectRatio: false,
		aspectRatio: 0.6,
		responsive: true,
		interaction: {
			intersect: false,
		},
		options: {

		},
		plugins: {
			legend: {
				position: 'bottom',
				labels: {
					boxWidth: 15,
					boxHeight: 1,
					color: '#3C5A7B',
					font: {
						family: "'Manrope', sans-serif",
						size: 13,
						weight: 400,
					}
				}
			},
		},
		scales: {
			y: {
				grid: {
					drawTicks: false,
				},
				border: {
					display: false
				},
				ticks: {
					font: {
						family: "'Manrope', sans-serif",
						size: 13,
						weight: 400,
					},
					color: '#3C5A7B'
				}
			},
			x: {
				grid: {
					display: false,
				},
				border: {
					display: false,
				},
				ticks: {
					font: {
						family: "'Manrope', sans-serif",
						size: 13,
						weight: 400,
					},
					color: '#3C5A7B'
				},
			},
		},
	}
}

onMounted(() => {
	chartData.value = setChartData()
	chartOptions.value = setChartOptions()
})
</script>

<template>
	<div class="statistic__main">
		<div class="statistic__main-info">
			<div class="statistic__main-item">
				<span class="statistic__main-text">хиты</span>
				<span class="statistic__main-number">119 689</span>
			</div>
			<div class="statistic__main-item">
				<span class="statistic__main-text">уники</span>
				<span class="statistic__main-number statistic__main-number_blue">61 356</span>
			</div>
			<div class="statistic__main-item">
				<span class="statistic__main-text">конверсии</span>
				<span class="statistic__main-number">350</span>
			</div>
			<div class="statistic__main-item">
				<span class="statistic__main-text">EPC</span>
				<span class="statistic__main-number">0.0059</span>
			</div>
			<div class="statistic__main-item">
				<span class="statistic__main-text">доход</span>
				<span class="statistic__main-number statistic__main-number_green">$600.17</span>
			</div>
		</div>
		<div class="statistic__main-wrapper">
			<Chart type="line" :data="chartData" :options="chartOptions" :pt="{ canvas: { class: 'line__canvas' } }" />
			<span class="statistic__main-name statistic__main-name_blue">уники</span>
			<span class="statistic__main-name statistic__main-name_green">доход</span>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.statistic {

	&__main {
		padding: 24px 41px 36px;
		border-radius: 24px;
		background: #fff;
		box-shadow: 0px 6px 32px 0px rgba(0, 0, 0, 0.05);
	}

	&__main-wrapper {
		position: relative;
	}

	&__main-info {
		display: flex;
		gap: 114px;
		margin-bottom: 50px;

		@media only screen and (max-width: 1279px) and (min-width: 744px) {
			gap: 0;
			justify-content: space-between;
			margin-bottom: 48px;
		}

		@media only screen and (max-width: 743px) and (min-width: 320px) {
			gap: 8px 38px;
			flex-wrap: wrap;
			margin-bottom: 24px;
		}
	}

	&__main-item {
		display: flex;
		flex-direction: column;
	}

	&__main-text {
		font-size: 17px;
		font-weight: 500;
		line-height: 28px;
		letter-spacing: 0.18px;
	}

	&__main-number {
		font-size: 27px;
		font-weight: 600;
		line-height: 40px;
		letter-spacing: -0.01px;
		color: #091C31;

		&_blue {
			color: #0067D5;
		}

		&_green {
			color: #16C050;
		}
	}

	&__main-name {
		padding: 0 7px;
		height: 24px;
		font-size: 13px;
		line-height: 20px;
		letter-spacing: 0.22px;
		color: #fff;
		border-radius: 6px;
		position: absolute;
		top: 40%;

		&_blue {
			background-color: #0067D5;
			left: -45px;
			transform: rotate(-90deg);
		}

		&_green {
			background-color: #16C050;
			right: -45px;
			transform: rotate(90deg);
		}
	}
}

.dark .statistic {
	&__main {
		background-color: #091C31;
		box-shadow: none;
	}

	&__main-number {
		color: #fff;

		&_blue {
			color: #0067D5;
		}

		&_green {
			color: #16C050;
		}
	}

	&__main-text {
		color: #778DA6;
	}
}
</style>
