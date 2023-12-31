<script setup>
import Toast from './ToastComponent.vue';
import { useToastStore } from '@/stores/toastStore';

const toastStore = useToastStore();
</script>

<template>
	<ol class="toasts-list">
		<TransitionGroup name="toasts">
			<Toast
				v-for="toast in toastStore.toasts"
				:key="toast.id"
				:type="toast.type"
				:title="toast.type"
				:text="toast.message"
				@delete="toastStore.removeToast(toast.id)"
			/>
		</TransitionGroup>
	</ol>
</template>

<style lang="scss" scoped>
.toasts-list {
	position: fixed;
	bottom: 20px;
	right: 20px;

	display: flex;
	flex-direction: column;
	gap: 20px;

	width: 388px;

	list-style: none;

	@media screen and (max-width: 700px) {
		top: 20px;
		left: 50%;
		transform: translateX(-50%);
		bottom: unset;
		right: unset;

		width: 95%;
	}
}

.toasts-enter-active,
.toasts-leave-active {
	transition: all 0.3s ease;
}

.toasts-enter-from {
	opacity: 0;
	transform: translateY(100px);
}

.toasts-leave-to {
	opacity: 0;
	transform: translateX(100px);
}

@media screen and (max-width: 700px) {
	.toasts-enter-from,
	.toasts-leave-to {
		opacity: 0;
		transform: translateY(-100px);
	}
}
</style>
