<script setup>
import { watch, onMounted, onUnmounted } from 'vue';
import { Icon } from '@iconify/vue';
import { useElementHover } from '@vueuse/core';

const props = defineProps({
	type: String,
	title: String,
	text: String
});

const isHovering = useElementHover();
watch(isHovering, (hovering) => {
	if (hovering) {
		clearTimeout();
	}
});

onMounted(() => {});

onUnmounted(() => {});
</script>

<template>
	<div class="toast" :class="props.type">
		<div class="toast__close-button">
			<Icon icon="ic:round-close" class="icon button" @click="$emit('delete')" />
		</div>

		<h3 v-if="props.title != 'info'" class="toast__title">{{ props.title }}</h3>

		<p class="toast__text">{{ props.text }}</p>
	</div>
</template>

<style lang="scss" scoped>
.toast {
	position: relative;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	gap: 10px;

	width: 100%;

	padding: 16px;
	border-radius: 10px;
	border: 1px solid $border-color;
	background: $background-color;

	&__close-button {
		position: absolute;
		top: 10px;
		right: 10px;

		display: flex;
		align-items: center;
		justify-content: center;

		border: none;
		background: none;
		color: #808080;
		cursor: pointer;

		transition: color 0.2s;

		&:hover {
			color: $text-color;
		}
	}

	&__title {
		font-size: 1.1rem;
		font-weight: 500;
	}

	&__text {
		font-size: 0.9rem;
		font-weight: 400;
	}
}

.error {
	color: $danger-text;
	border-color: $danger-background;
}

.warning {
	color: $warning-text;
	border-color: $warning-background;
}

.success {
	color: $success-text;
	border-color: $success-background;
}
</style>
