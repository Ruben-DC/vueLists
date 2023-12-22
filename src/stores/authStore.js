import { defineStore } from 'pinia';
import { ref } from 'vue';
import { supabase } from '@/utils/supabase';

export const useAuthStore = defineStore('auth', () => {
	const session = ref(null);

	const isLoggedIn = () => !!session.value;

	const signUp = async (email, password) => {
		try {
			const { error } = await supabase.auth.signUp({
				email: email,
				password: password
			});

			if (error) throw error;
		} catch (error) {
			alert(error);
		}
	};

	const logIn = async (email, password) => {
		try {
			const { session, error } = await supabase.auth.signInWithPassword({
				email: email,
				password: password
			});
			if (error) throw error;
			return session;
		} catch (error) {
			alert(error);
		}
	};

	const signOut = async () => {
		try {
			const { error } = await supabase.auth.signOut();

			if (error) throw error;
		} catch (error) {
			alert(error);
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
