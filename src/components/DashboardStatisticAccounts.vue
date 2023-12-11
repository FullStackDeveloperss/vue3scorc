<script setup lang="ts">
import BarChart from '@/components/icons/BarChart.vue'
import LineChart from '@/components/icons/LineChart.vue'
import Chart from 'primevue/chart'
import TabPanel from 'primevue/tabpanel'
import TabView from 'primevue/tabview'
import { onMounted, ref } from 'vue'

const chartDataBar = ref()
const chartOptionsBar = ref()

const setChartDataBar = () => {
	return {
		labels: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'],
		datasets: [
			{
				label: 'валидных',
				data: [9, 59, 80, 81, 56, 55, 40],
				borderColor: '#16C050',
				backgroundColor: '#16C050',
				borderWidth: 1.5,
			},
			{
				label: 'отлетело',
				data: [28, 48, 40, 19, 86, 27, 90],
				borderColor: '#E0281B',
				backgroundColor: '#E0281B',
				borderWidth: 1.5
			}
		]
	}
}
const setChartOptionsBar = () => {
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
				boxWidth: 250,
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
				},
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

const chartDataLine = ref()
const chartOptionsLine = ref()

const setChartDataLine = () => {
	return {
		labels: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'],
		datasets: [
			{
				label: 'валидных',
				data: [9, 59, 80, 81, 56, 55, 40],
				borderColor: '#16C050',
				backgroundColor: '#16C050',
				pointStyle: false,
				borderWidth: 1.5,
			},
			{
				label: 'отлетело',
				data: [28, 48, 40, 19, 86, 27, 90],
				borderColor: '#E0281B',
				backgroundColor: '#E0281B',
				pointStyle: false,
				borderWidth: 1.5
			}
		]
	}
}
const setChartOptionsLine = () => {
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
	chartDataBar.value = setChartDataBar()
	chartOptionsBar.value = setChartOptionsBar()
	chartDataLine.value = setChartDataLine()
	chartOptionsLine.value = setChartOptionsLine()
})

</script>

<template>
	<div class="statistic__accounts">
		<h3 class="statistic__title">Статистика аккаунтов</h3>
		<TabView :pt="{ root: { class: 'tabview__root' }, nav: { class: 'tabview__nav' } }">
			<TabPanel>
				<template #header>
					<div class="statistic__btn">
						<BarChart class="statistic__img" />
					</div>
				</template>
				<Chart type="bar" :data="chartDataBar" :options="chartOptionsBar"
					:pt="{ root: { class: 'bar__root' }, canvas: { class: 'bar__canvas' } }" />
			</TabPanel>
			<TabPanel>
				<template #header>
					<div class="statistic__btn">
						<LineChart class="statistic__img" />
					</div>
				</template>
				<Chart type="line" :data="chartDataLine" :options="chartOptionsLine"
					:pt="{ root: { class: 'acc__root' }, canvas: { class: 'acc__canvas' } }" />
			</TabPanel>
		</TabView>
	</div>
</template>

<style lang="scss" scoped>
.statistic {
	&__accounts {
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

		@media only screen and (max-width: 429px) and (min-width: 320px) {
			margin-bottom: 63px;
		}
	}

	&__btn {
		width: 28px;
		height: 28px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
	}
}

.dark {
	& .statistic {
		&__accounts {
			background-color: #091C31;
			box-shadow: none;
		}

		&__title {
			color: #fff;
		}

		&__btn {
			background-color: #091C31;
		}
	}
}
</style>
