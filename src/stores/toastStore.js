import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useToastStore = defineStore('toast', () => {
	const toasts = ref([]);

	const addToast = (message, type = 'info') => {
		const id = Date.now();
		if (message === 'duplicate key value violates unique constraint "profiles_arobase_key"') {
			message = 'arobase déjà utilisé';
		}
		toasts.value.push({ id, message, type });

		console.log(toasts.value);

		setTimeout(() => {
			toasts.value = toasts.value.filter((toast) => toast.id !== id);
		}, 3000);
	};

	const removeToast = (id) => {
		toasts.value = toasts.value.filter((toast) => toast.id !== id);
	};

	// const pauseToast = (id, isHovering) => {

	// };

	return {
		toasts,
		addToast,
		removeToast
	};
});
