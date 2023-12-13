<script setup lang="ts">
import Alerts from '@/components/icons/Alerts.vue'
import Autofill from '@/components/icons/Autofill.vue'
import ChatGPT from '@/components/icons/ChatGPT.vue'
import Checkpoint from '@/components/icons/Checkpoint.vue'
import IconDashboard from '@/components/icons/Dashboard.vue'
import Data from '@/components/icons/Data.vue'
import Facebook from '@/components/icons/Facebook.vue'
import Farm from '@/components/icons/Farm.vue'
import Inviter from '@/components/icons/Inviter.vue'
import InviterToPublics from '@/components/icons/InviterToPublics.vue'
import Messenger from '@/components/icons/Messenger.vue'
import Posting from '@/components/icons/Posting.vue'
import Proxy from '@/components/icons/Proxy.vue'
import Register from '@/components/icons/Register.vue'
import SMSService from '@/components/icons/SMSService.vue'
import ServerAutomation from '@/components/icons/ServerAutomation.vue'
import Servers from '@/components/icons/Servers.vue'
import ZRD from '@/components/icons/ZRD.vue'
import { useRootStore } from '@/stores/root'
import { useDark } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { useFacebookStore } from '@/stores/facebook'
import type { Date } from '@/types/general'
import axios from 'axios'
import type { Dashboard } from "@/types/dashboard";

const isDark = useDark({
    valueDark: 'dark',
    valueLight: 'light',
})

const dashboard = ref<Dashboard | null>(null);

const getDashboardInfo = async () => {
    try {
        const res = await axios.post("stats/info");
        dashboard.value = res.data;
    } catch (error) {
        console.log(error);
    }
};

onMounted(() => {
    console.log(321)
    getDashboardInfo()
})

const rootStore = useRootStore()
const { isCloseSidebar } = storeToRefs(rootStore)
</script>

<template>
	<div >
        <perfect-scrollbar class="sidebar" :class="{ 'sidebar__close': isCloseSidebar }">
            <div class="sidebar__logo" v-if="!isDark">
                <img v-if="!isCloseSidebar" src="/images/logo-dashboard.png" width="228" height="46">
                <img v-else src="/images/logo-dashboard-close.png" width="46" height="46">
            </div>
            <div class="sidebar__logo" v-else>
                <img v-if="!isCloseSidebar" src="/images/logo-dashboard-dark.png" width="228" height="46">
                <img v-else src="/images/logo-dashboard-close.png" width="46" height="46">
            </div>
            <nav class="sidebar__main">
                <ul class="sidebar__main-list sidebar__list">
                    <li class="sidebar__main-item sidebar__item">
                        <RouterLink to="/" class="sidebar__main-link sidebar__link">
                            <IconDashboard class="sidebar__main-icon sidebar__icon" />
                            <span class="sidebar__main-text sidebar__text">Дашборд</span>
                        </RouterLink>
                    </li>
                    <li class="sidebar__main-item sidebar__item">
                        <RouterLink to="/facebook" class="sidebar__main-link sidebar__main-link_facebook sidebar__link">
                            <div class="sidebar__main-info">
                                <Facebook class="sidebar__main-icon sidebar__icon" />
                                <span class="sidebar__main-text sidebar__text">Facebook</span>
                            </div>
                            <div class="sidebar__main-item">
                                <div class="sidebar__main-nums">
								<span class="sidebar__main-num sidebar__main-num_red">
                                    {{ dashboard ? dashboard?.total_profiles - dashboard?.valid : 0 }}
                                </span>
                                    <span class="sidebar__main-num sidebar__main-num_green">{{ dashboard?.valid || 0 }}</span>
                                </div>
                            </div>
                        </RouterLink>
                    </li>
                    <li class="sidebar__main-item sidebar__item">
                        <RouterLink to="/autofill" class="sidebar__main-link sidebar__link">
                            <Autofill class="sidebar__main-icon sidebar__icon" />
                            <span class="sidebar__main-text sidebar__text">Автозалив</span>
                        </RouterLink>
                    </li>
                </ul>
            </nav>
            <nav class="sidebar__work">
                <h3 class="sidebar__work-title sidebar__title">Настройка работы</h3>
                <div class="sidebar__work-content sidebar__content">
                    <ul class="sidebar__work-list sidebar__list">
                        <li class="sidebar__work-item sidebar__item">
                            <RouterLink to="/farm" class="sidebar__work-link sidebar__link">
                                <Farm class="sidebar__work-icon sidebar__icon" />
                                <span class="sidebar__work-text sidebar__text">Фарм</span>
                            </RouterLink>
                        </li>
                        <li class="sidebar__work-item sidebar__item">
                            <RouterLink to="/gpt" class="sidebar__work-link sidebar__link">
                                <ChatGPT class="sidebar__work-icon sidebar__icon" />
                                <span class="sidebar__work-text sidebar__text">Chat GPT</span>
                            </RouterLink>
                        </li>
                        <li class="sidebar__work-item sidebar__item">
                            <RouterLink to="/posting" class="sidebar__work-link sidebar__link">
                                <Posting class="sidebar__work-icon sidebar__icon" />
                                <span class="sidebar__work-text sidebar__text">Постинг</span>
                            </RouterLink>
                        </li>
                        <li class="sidebar__work-item sidebar__item">
                            <RouterLink to="/checkpoint" class="sidebar__work-link sidebar__link">
                                <Checkpoint class="sidebar__work-icon sidebar__icon" />
                                <span class="sidebar__work-text sidebar__text">Чекпоинт</span>
                            </RouterLink>
                        </li>
                        <li class="sidebar__work-item sidebar__item">
                            <RouterLink to="/zrd" class="sidebar__work-link sidebar__link">
                                <ZRD class="sidebar__work-icon sidebar__icon" />
                                <span class="sidebar__work-text sidebar__text">ЗРД</span>
                            </RouterLink>
                        </li>
                        <li class="sidebar__work-item sidebar__item">
                            <RouterLink to="/inviter" class="sidebar__work-link sidebar__link">
                                <Inviter class="sidebar__work-icon sidebar__icon" />
                                <span class="sidebar__work-text sidebar__text">Инвайтер</span>
                            </RouterLink>
                        </li>
                        <li class="sidebar__work-item sidebar__item">
                            <RouterLink to="/public" class="sidebar__work-link sidebar__link">
                                <InviterToPublics class="sidebar__work-icon sidebar__icon" />
                                <span class="sidebar__work-text sidebar__text">Инвайтер в паблики</span>
                            </RouterLink>
                        </li>
                        <li class="sidebar__work-item sidebar__item">
                            <RouterLink to="/messenger" class="sidebar__work-link sidebar__link">
                                <Messenger class="sidebar__work-icon sidebar__icon" />
                                <span class="sidebar__work-text sidebar__text">Мессенджер</span>
                            </RouterLink>
                        </li>
                        <li class="sidebar__work-item sidebar__item">
                            <RouterLink to="/data/links" class="sidebar__work-link sidebar__link">
                                <Data class="sidebar__work-icon sidebar__icon" />
                                <span class="sidebar__work-text sidebar__text">Данные для работы</span>
                            </RouterLink>
                        </li>
                        <li class="sidebar__work-item sidebar__item">
                            <RouterLink to="/autoserver" class="sidebar__work-link sidebar__link">
                                <ServerAutomation class="sidebar__work-icon sidebar__icon" />
                                <span class="sidebar__work-text sidebar__text">Автоматизация сервера</span>
                            </RouterLink>
                        </li>
                        <li class="sidebar__work-item sidebar__item">
                            <RouterLink to="/servers" class="sidebar__work-link sidebar__link">
                                <Servers class="sidebar__work-icon sidebar__icon" />
                                <span class="sidebar__work-text sidebar__text">Сервера</span>
                            </RouterLink>
                        </li>
                    </ul>
                </div>
            </nav>
            <nav class="sidebar__register">
                <h3 class="sidebar__register-title sidebar__title">Настройка регистрации</h3>
                <div class="sidebar__register-content sidebar__content">
                    <ul class="sidebar__register-list sidebar__list">
                        <li class="sidebar__register-item sidebar__item">
                            <RouterLink to="/register" class="sidebar__register-link sidebar__link">
                                <Register class="sidebar__register-icon sidebar__icon" />
                                <span class="sidebar__register-text sidebar__text">Регистрация</span>
                            </RouterLink>
                        </li>
                        <li class="sidebar__register-item sidebar__item">
                            <RouterLink to="/sms" class="sidebar__register-link sidebar__link">
                                <SMSService class="sidebar__register-icon sidebar__icon" />
                                <span class="sidebar__register-text sidebar__text">SMS сервисы</span>
                            </RouterLink>
                        </li>
                        <li class="sidebar__register-item sidebar__item">
                            <RouterLink to="/alerts" class="sidebar__register-link sidebar__link">
                                <Alerts class="sidebar__register-icon sidebar__icon" />
                                <span class="sidebar__register-text sidebar__text">Оповещения</span>
                            </RouterLink>
                        </li>
                        <li class="sidebar__register-item sidebar__item">
                            <RouterLink to="/proxy" class="sidebar__register-link sidebar__link">
                                <Proxy class="sidebar__register-icon sidebar__icon" />
                                <span class="sidebar__register-text sidebar__text">Прокси</span>
                            </RouterLink>
                        </li>
                        <li class="sidebar__register-item sidebar__item">
                            <RouterLink to="/reg/links" class="sidebar__register-link sidebar__link">
                                <Data class="sidebar__register-icon sidebar__icon" />
                                <span class="sidebar__register-text sidebar__text">Данные для регистрации</span>
                            </RouterLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </perfect-scrollbar>

	</div>
</template>

<style lang="scss">
.sidebar {
	position: fixed;
	height: 100%;
	background-color: #F8F9FB;
	border-right: 1px solid #EEE;
	max-width: 300px;
	width: 100%;
	padding: 32px;
	overflow-y: auto;
	overflow-x: hidden;
	transition: all .3s ease-in-out;
	z-index: 10;

	@media only screen and (max-width: 1279px) and (min-width: 1024px) {
		padding: 16px;
	}

	@media only screen and (max-width: 743px) and (min-width: 320px) {
		position: absolute;
		transform: translateY(60px);
		max-width: 100%;
		padding: 20px 10px;
		min-height: 100vh;
	}

	&__close {
		max-width: 118px;

		@media only screen and (max-width: 1279px) and (min-width: 1024px) {
			max-width: 84px;
		}

		@media only screen and (max-width: 1023px) and (min-width: 744px) {
			transform: translateX(-300px);
			max-width: 0;
		}

		@media only screen and (max-width: 743px) and (min-width: 320px) {
			transform: translate(-100%, 60px);
			max-width: 0;
		}

		& .sidebar__text {
			display: none;
		}

		& .sidebar__title {
			display: none;
		}

		& .sidebar__main {
			margin-bottom: 0;
		}

		& .sidebar__work {
			margin-bottom: 0;
		}

		& .sidebar__link {
			gap: 0;
			width: 54px;
			padding: 0 16px;

			@media only screen and (max-width: 1279px) and (min-width: 1024px) {
				width: 52px;
			}
		}

		& .sidebar__main-nums {
			display: none;
		}

		& .sidebar__main-info {
			gap: 0;
		}
	}

	&__main-link {
		&_facebook {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
	}

	&__main-info {
		display: flex;
		align-items: center;
		gap: 16px;
	}

	&__main-nums {
		display: flex;
		align-items: center;
		gap: 2px;
	}

	&__main-num {
		padding: 1px 6px;
		font-size: 12px;
		line-height: 18px;
		letter-spacing: 0.24px;
		color: #fff;
		border-radius: 100px;

		&_red {
			background-color: #E0281B;
		}

		&_green {
			background-color: #16C050;
		}
	}

	&__logo {
		display: flex;
		justify-content: center;
		margin-bottom: 32px;

		@media only screen and (max-width: 743px) and (min-width: 320px) {
			display: none;
		}
	}

	&__main {
		margin-bottom: 12px;
	}

	&__list {
		display: flex;
		flex-direction: column;
	}

	&__link {
		padding: 0 12px 0 16px;
		display: flex;
		align-items: center;
		gap: 16px;
		width: 100%;
		height: 40px;
		border-radius: 30px;
		transition: all .3s ease-in-out;

		& path {
			transition: all .3s ease-in-out;
		}

		&:hover {
			background-color: #eee;
			color: #1B395B;
		}

		&:hover path {
			stroke: #1B395B;
		}
	}

	&__text {
		font-size: 13px;
		line-height: 20px;
		letter-spacing: 0.22px;
	}

	&__title {
		font-size: 13px;
		font-weight: 700;
		line-height: normal;
		letter-spacing: normal;
		color: #1B395B;
		margin-bottom: 6px;
		padding: 0 6px;
	}

	&__work {
		margin-bottom: 12px;
	}
}

.dark .sidebar {
	background-color: #1B395B;
	border-right: 1px solid #3C5A7B;

	&__item {
		color: #778DA6;
	}

	&__title {
		color: #778DA6;
	}

	&__link {
		&:hover {
			background-color: #1B395B;
			color: #fff;
		}

		&:hover path {
			stroke: #fff;
		}
	}
}
</style>
