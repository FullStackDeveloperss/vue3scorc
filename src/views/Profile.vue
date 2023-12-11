<script setup lang="ts">
import ProfileData from '@/components/ProfileData.vue'
import ProfileSafety from '@/components/ProfileSafety.vue'
import ProfileSettings from '@/components/ProfileSettings.vue'
import ProfileValue from '@/components/ProfileValue.vue'
import AppLayout from '@/components/layout/AppLayout.vue'
</script>

<template>
	<AppLayout>
		<div class="profile">
			<h2 class="profile__title title">Профиль</h2>
			<div class="profile__content">
				<ProfileData />
				<ProfileSafety />
				<ProfileSettings />
				<ProfileValue />
			</div>
		</div>
	</AppLayout>
</template>

<style lang="scss" scoped>
.profile {

	&__title {
		margin-bottom: 24px;
	}

	&__content {
		display: flex;
		flex-direction: column;
		gap: 36px;

		@media only screen and (max-width: 1279px) and (min-width: 744px) {
			gap: 24px;
		}

		@media only screen and (max-width: 743px) and (min-width: 320px) {
			gap: 20px;
		}
	}
}
</style>
