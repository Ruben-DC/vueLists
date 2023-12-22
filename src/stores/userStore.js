import { defineStore } from 'pinia';
import { ref } from 'vue';
import { supabase } from '@/utils/supabase';
import { useAuthStore } from './authStore';

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
					// getBannerUrl();
				}
			} catch (error) {
				alert(error);
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
		getBannerUrl
	};
});
