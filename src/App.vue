<script setup>
import { RouterView } from 'vue-router';
import Header from '@/layouts/HeaderLayout.vue';
import ToastsList from '@/components/ToastsList.vue';
import { SpeedInsights } from '@vercel/speed-insights/vue';
</script>

<template>
	<Header />

	<main>
		<RouterView />
	</main>

	<SpeedInsights />

	<ToastsList />
</template>

<style lang="scss">
main {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	width: 100%;

	overflow: hidden;
}
</style>
