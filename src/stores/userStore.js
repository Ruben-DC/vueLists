import { defineStore } from 'pinia';
import { ref } from 'vue';
import { supabase } from '@/utils/supabase';
import { useAuthStore } from './authStore';
import { useToastStore } from './toastStore';

export const useUserStore = defineStore('user', () => {
	const user = ref(null);
	const username = ref(null);
	const arobase = ref(null);
	const email = ref(null);
	const website = ref(null);
	const bio = ref(null);

	const avatarUrl = ref(null);
	const bannerUrl = ref(null);

	const createdAt = ref(null);
	const lastUpdate = ref(null);

	const authStore = useAuthStore();
	const toastStore = useToastStore();

	const getUser = async () => {
		if (authStore.isLoggedIn()) {
			try {
				const { data, error, status } = await supabase
					.from('profiles')
					.select(`*`)
					.eq('id', authStore.session.id)
					.single();

				if (error && status !== 406) throw error;

				if (data) {
					user.value = data;
					username.value = data.username;
					arobase.value = data.arobase;
					email.value = data.email;
					website.value = data.website;
					bio.value = data.bio;

					createdAt.value = data.created_at;
					lastUpdate.value = data.updated_at;

					getAvatarUrl();
					getBannerUrl();
				}
			} catch (error) {
				console.error('Error getting user: ', error.message);
			}
		}
	};

	const getAvatarUrl = async () => {
		try {
			const { data, error } = await supabase.storage
				.from('avatars')
				.download(user.value.avatar_url);
			if (error) throw error;
			avatarUrl.value = URL.createObjectURL(data);
		} catch (error) {
			console.error('Error downloading image: ', error.message);
		}
	};

	const getBannerUrl = async () => {
		try {
			const { data, error } = await supabase.storage
				.from('avatars')
				.download(user.value.profile_banner_url);
			if (error) throw error;
			bannerUrl.value = URL.createObjectURL(data);
		} catch (error) {
			console.error('Error downloading image: ', error.message);
		}
	};

	const updateUser = async (data) => {
		try {
			const updatedData = Object.fromEntries(
				Object.entries(data).filter(([_, v]) => v != null)
			);

			const { error } = await supabase
				.from('profiles')
				.update(updatedData)
				.eq('id', authStore.session.id);

			updateStore();

			if (error) {
				throw error;
			}
			toastStore.addToast('Mise à jour effectuée !', 'success');
		} catch (error) {
			toastStore.addToast(error.message, 'error');
		}
	};

	const updateStore = async () => {
		await getUser();
	};

	return {
		user,
		username,
		arobase,
		email,
		website,
		bio,

		avatarUrl,
		bannerUrl,
		createdAt,
		lastUpdate,

		getUser,
		getBannerUrl,
		updateUser
	};
});
