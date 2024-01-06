<script setup lang="ts">
import DashboardCard from "@/components/DashboardCard.vue";
import DashboardStatisticAccounts from "@/components/DashboardStatisticAccounts.vue";
import DashboardStatisticActive from "@/components/DashboardStatisticActive.vue";
import DashboardStatisticMain from "@/components/DashboardStatisticMain.vue";
import DashboardStatusRows from "@/components/DashboardStatusRows.vue";
import AppLayout from "@/components/layout/AppLayout.vue";
import type { Dashboard } from "@/types/dashboard";
import type { ProxyDashboard } from "@/types/proxy";
import type { Date } from "@/types/general";
import { useWindowSize } from "@vueuse/core";
import axios from "axios";
import Dropdown from "primevue/dropdown";
import { onBeforeMount, ref } from "vue";
import { useToast } from 'primevue/usetoast'

const { width } = useWindowSize();

const dashboard = ref<Dashboard | null>(null);
const dashboardProxy = ref<ProxyDashboard | null>(null)
const selectedDate = ref<string>("");
const dates = ref<Date[]>([{ name: "Сегодня" }]);

const toast = useToast()

const getDashboardInfo = async () => {
  try {
    const res = await axios.post("stats/info");
    const resProxy = await axios.post("data/proxy/list");
    dashboard.value = res.data;
    dashboardProxy.value = resProxy.data;
  } catch (error) {
    console.log(error);
      toast.add({
          severity: 'error',
          summary: ``,
          detail: 'Ошибка загрузки данных',
          life: 3000,
      })
  }
};

setInterval(() => getDashboardInfo(), 10000);

const getKeitaroData = async () => {
    try {
        // const res = await axios.post("");
        keitaroData.value = false
    } catch (error) {
        console.log(error);
        toast.add({
            severity: 'error',
            summary: ``,
            detail: 'Ошибка загрузки данных',
            life: 3000,
        })
    }
}
onBeforeMount(() => {
    getDashboardInfo()
    getKeitaroData()
});
const keitaroData = ref()
</script>

<template>
  <AppLayout>
    <div class="dashboard">
      <h2 class="dashboard__title title">Дашборд</h2>
      <Dropdown
        v-model="selectedDate"
        icon="none"
        :options="dates"
        optionLabel="name"
        placeholder="Сегодня"
        unstyled
        :pt="{
          root: { class: 'date__root' },
          trigger: { class: 'date__trigger' },
          panel: { class: 'date__panel' },
          item: { class: 'date__item' },
          input: { class: 'date__input' },
        }"
      />
    </div>
    <DashboardStatisticMain v-if="keitaroData"/>
    <div class="dashboard__content">
      <DashboardCard
        src="/icons/all-proxy.svg"
        alt="всего прокси"
        :num="dashboardProxy?.total"
        text="всего прокси"
        class="dashboard__grid"
      />
      <DashboardCard
        src="/icons/valid-proxy.svg"
        alt="валидных прокси"
        :num="dashboardProxy?.total_valid"
        text="валидных прокси"
        class="dashboard__grid"
      />
      <DashboardCard
        src="/icons/delete-proxy.svg"
        alt="отлетело прокси"
        :num="dashboardProxy?.total_invalid"
        text="отлетело прокси"
        class="dashboard__grid"
      />
      <DashboardCard
        src="/icons/all-accounts.svg"
        alt="всего аккаунтов"
        :num="dashboard?.total_profiles"
        text="всего аккаунтов"
        class="dashboard__grid"
      />
      <DashboardCard
        src="/icons/valid-accounts.svg"
        alt="валидных аккаунтов"
        :num="dashboard?.valid"
        text="валидных аккаунтов"
        class="dashboard__grid"
      />
      <DashboardCard
        src="/icons/delete-accounts.svg"
        alt="отлетело аккаунтов"
        :num="dashboard?.invalid"
        text="отлетело аккаунтов"
        class="dashboard__grid"
      />
<!--      <DashboardStatisticAccounts class="dashboard__grid" v-if="width > 1279" />-->
<!--      <DashboardStatisticActive class="dashboard__grid" v-if="width > 1279" />-->
    </div>
<!--    <div class="dashboard__item" v-if="width < 1280">-->
<!--      <DashboardStatisticAccounts class="dashboard__info" />-->
<!--      <DashboardStatisticActive class="dashboard__info" />-->
<!--    </div>-->
    <div class="dashboard__status" v-if="dashboard?.statuses">
      <h3 class="dashboard__status-title">Статусы</h3>
      <ul class="dashboard__status-list">
        <DashboardStatusRows :statuses="dashboard?.statuses" />
      </ul>
    </div>
  </AppLayout>
</template>

<style lang="scss" scoped>
.dashboard {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 36px;

  @media only screen and (max-width: 1279px) and (min-width: 1024px) {
    margin-bottom: 24px;
  }

  @media only screen and (max-width: 1023px) and (min-width: 320px) {
    margin-bottom: 20px;
  }

  &__content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 36px 24px;
    margin: 39px 0 36px;

    @media only screen and (max-width: 1279px) and (min-width: 744px) {
      gap: 24px 20px;
      margin: 24px 0;
    }

    @media only screen and (max-width: 743px) and (min-width: 320px) {
      grid-template-columns: repeat(1, 1fr);
      gap: 24px;
      margin: 20px 0;
    }
  }

  &__item {
    margin-bottom: 24px;
    display: flex;
    gap: 22px;
    width: 100%;

    @media only screen and (max-width: 1023px) and (min-width: 744px) {
      flex-direction: column;
      gap: 24px;
    }

    @media only screen and (max-width: 743px) and (min-width: 320px) {
      flex-direction: column;
      gap: 20px;
    }
  }

  &__info {
    width: 100%;
  }

  &__status {
    padding: 24px 32px 36px;
    border-radius: 24px;
    background-color: #fff;
    box-shadow: 0px 6px 32px 0px rgba(0, 0, 0, 0.05);
  }

  &__status-title {
    font-size: 17px;
    font-weight: 500;
    line-height: 28px;
    letter-spacing: 0.18px;
    color: #091c31;
    margin-bottom: 36px;
  }

  &__status-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__grid:nth-child(7) {
    grid-column: 1/3;
  }
}

.dark {
  & .dashboard {
    &__status {
      background-color: #091c31;
      box-shadow: none;
    }

    &__status-title {
      color: #fff;
    }
  }
}
</style>
