import { defineStore } from 'pinia';
import { ref } from 'vue';
import { supabase } from '@/utils/supabase';
import { useToastStore } from './toastStore';

export const useAuthStore = defineStore('auth', () => {
	const toastStore = useToastStore();
	const session = ref(null);

	const isLoggedIn = () => !!session.value;

	const signUp = async (email, password) => {
		try {
			const { error } = await supabase.auth.signUp({
				email: email,
				password: password
			});

			if (error) throw error;
			toastStore.addToast('Check your email for the confirmation link', 'success');
		} catch (error) {
			toastStore.addToast(error.message, 'error');
		}
	};

	const logIn = async (email, password) => {
		try {
			const { session, error } = await supabase.auth.signInWithPassword({
				email: email,
				password: password
			});
			if (error) throw error;
			toastStore.addToast('Logged in !');
			return session;
		} catch (error) {
			console.warn(error);
			toastStore.addToast(error.message, 'warning');
		}
	};

	const signOut = async () => {
		try {
			const { error } = await supabase.auth.signOut();

			if (error) throw error;
			toastStore.addToast('Logged out !');
		} catch (error) {
			console.warn(error);
		}
	};

	return {
		session,
		isLoggedIn,
		signUp,
		logIn,
		signOut
	};
});
