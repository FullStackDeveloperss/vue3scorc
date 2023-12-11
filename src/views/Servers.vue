<script setup lang="ts">
import StatusError from '@/components/icons/StatusError.vue'
import StatusSuccess from '@/components/icons/StatusSuccess.vue'
import AppLayout from '@/components/layout/AppLayout.vue'
import Dropdown from 'primevue/dropdown'
import { ref } from 'vue'

const selectedServer = ref<string>('')
const server = ref([
	{ name: 'все' }
])
</script>

<template>
	<AppLayout>
		<div class="servers">
			<div class="servers__item">
				<h2 class="servers__title title">Сервера</h2>
				<div class="servers__dropdown">
					<Dropdown v-model="selectedServer" icon="none" :options="server" optionLabel="name" placeholder="все" unstyled
						:pt="{ root: { class: 'server__root' }, trigger: { class: 'server__trigger' }, panel: { class: 'server__panel' }, item: { class: 'server__item' }, input: { class: 'server__input' } }" />
					<span class="servers__span">Статус:</span>
				</div>
			</div>
			<div class="servers__inner">
				<div class="servers__info">
					<div class="servers__status">
						<StatusSuccess />
						<span class="servers__ip">95.217.56.247</span>
					</div>
					<span class="servers__reboot">Reboot</span>
				</div>
				<div class="servers__info">
					<div class="servers__status">
						<StatusError />
						<span class="servers__ip">95.217.56.247</span>
					</div>
					<span class="servers__reboot">Reboot Reboot zenno</span>
				</div>
				<div class="servers__info">
					<div class="servers__status">
						<StatusSuccess />
						<span class="servers__ip">95.217.56.247</span>
					</div>
					<span class="servers__reboot">Reboot</span>
				</div>
				<div class="servers__info">
					<div class="servers__status">
						<StatusError />
						<span class="servers__ip">95.217.56.247</span>
					</div>
					<span class="servers__reboot">Reboot Reboot zenno</span>
				</div>
				<div class="servers__info">
					<div class="servers__status">
						<StatusSuccess />
						<span class="servers__ip">95.217.56.247</span>
					</div>
					<span class="servers__reboot">Reboot</span>
				</div>
				<div class="servers__info">
					<div class="servers__status">
						<StatusError />
						<span class="servers__ip">95.217.56.247</span>
					</div>
					<span class="servers__reboot">Reboot Reboot zenno</span>
				</div>
				<div class="servers__info">
					<div class="servers__status">
						<StatusSuccess />
						<span class="servers__ip">95.217.56.247</span>
					</div>
					<span class="servers__reboot">Reboot</span>
				</div>
				<div class="servers__info">
					<div class="servers__status">
						<StatusError />
						<span class="servers__ip">95.217.56.247</span>
					</div>
					<span class="servers__reboot">Reboot Reboot zenno</span>
				</div>
				<div class="servers__info">
					<div class="servers__status">
						<StatusSuccess />
						<span class="servers__ip">95.217.56.247</span>
					</div>
					<span class="servers__reboot">Reboot</span>
				</div>
				<div class="servers__info">
					<div class="servers__status">
						<StatusError />
						<span class="servers__ip">95.217.56.247</span>
					</div>
					<span class="servers__reboot">Reboot Reboot zenno</span>
				</div>
				<div class="servers__info">
					<div class="servers__status">
						<StatusSuccess />
						<span class="servers__ip">95.217.56.247</span>
					</div>
					<span class="servers__reboot">Reboot</span>
				</div>
				<div class="servers__info">
					<div class="servers__status">
						<StatusError />
						<span class="servers__ip">95.217.56.247</span>
					</div>
					<span class="servers__reboot">Reboot Reboot zenno</span>
				</div>
			</div>
		</div>
	</AppLayout>
</template>

<style lang="scss">
.servers {

	&__item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 26px;

		@media only screen and (max-width: 743px) and (min-width: 320px) {
			margin-bottom: 20px;
		}
	}

	&__dropdown {
		position: relative;
	}

	&__span {
		position: absolute;
		font-family: "Inter", sans-serif;
		font-weight: 500;
		line-height: 21px;
		top: 50%;
		transform: translateY(-50%);
		left: 16px;
		color: #091C31;
	}

	&__inner {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 36px 32px 14px;
		border-radius: 24px;
		background: #fff;
		box-shadow: 0px 6px 32px 0px rgba(0, 0, 0, 0.05);
	}

	&__info {
		padding-bottom: 14px;
		display: flex;
		align-items: center;
		justify-content: space-between;

		&:not(:last-child) {
			border-bottom: 1px solid #eee;
		}

		@media only screen and (max-width: 429px) and (min-width: 320px) {
			flex-direction: column;
			align-items: flex-start;
			gap: 20px;
		}
	}

	&__status {
		display: flex;
		align-items: center;
		gap: 13px;
	}

	&__ip {
		font-family: "Inter", sans-serif;
		font-weight: 500;
		line-height: 21px;
		color: #091C31;
	}

	&__reboot {
		color: #0067D5;
	}
}

.dark .servers {
	&__span {
		color: #eee;
	}

	&__inner {
		background-color: #091C31;
		box-shadow: none;
	}

	&__info {
		&:not(:last-child) {
			border-bottom: 1px solid #1B395B;
		}
	}

	&__ip {
		color: #fff;
	}
}
</style>
