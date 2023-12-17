<script setup>
import { RouterView } from 'vue-router';
import Header from '@/layouts/HeaderLayout.vue';
import { SpeedInsights } from '@vercel/speed-insights/vue';
</script>

<template>
	<Header />

	<main>
		<RouterView />
	</main>

	<SpeedInsights />
</template>

<style lang="scss">
main {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	width: 100%;
}
</style>
