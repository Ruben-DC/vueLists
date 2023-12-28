<script setup>
import { ref, watch } from 'vue';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();

const updateUser = async (data) => {
	userStore.updateUser(data);
};

const placeholders = ref({
	username: "nom d'utilisateur",
	arobase: 'arobase',
	website: 'site web',
	bio: 'bio'
});

watch(
	userStore,
	(newVal) => {
		placeholders.value.username = newVal.username || "nom d'utilisateur";
		placeholders.value.arobase = newVal.arobase || 'arobase';
		placeholders.value.website = newVal.website || 'site web';
		placeholders.value.bio = newVal.bio || 'bio';
	},

	{ immediate: true }
);
</script>

<template>
	<main class="view">
		<h1>Mon profil</h1>

		<FormKit type="form" :actions="false" @submit="updateUser">
			<FormKit
				type="text"
				name="username"
				label="nom d'utilisateur"
				label-class="label"
				:placeholder="placeholders.username"
			/>

			<FormKit
				type="text"
				name="arobase"
				label="Votre arobase"
				:placeholder="placeholders.arobase"
				validation="starts_with:@"
				validation-visibility="live"
			/>

			<FormKit
				type="text"
				name="website"
				label="site web"
				:placeholder="placeholders.website"
			/>

			<FormKit
				type="textarea"
				name="bio"
				label="bio"
				input-class="formkit__textarea"
				:placeholder="placeholders.bio"
			/>

			<FormKit type="submit" name="submit" label="enregistrer" input-class="submit__input" />
		</FormKit>
	</main>
</template>

<style lang="scss" scoped>
.view {
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 50px;

	max-width: 800px;
	width: 100%;
	height: auto;

	padding: 0 20px 70px 20px;
}

.form-section {
	&__row {
		display: flex;
		flex-direction: row;
		gap: 20px;
	}

	&__column {
		display: flex;
		flex-direction: column;
		gap: 20px;
		width: 100%;
	}
}

// .avatar {
// 	&__outer {
// 		aspect-ratio: 1;
// 		width: 150px;
// 		height: 150px;
// 	}

// 	&__wrapper {
// 		width: 100%;
// 		height: 150px;
// 	}

// 	&__inner {
// 		width: 100%;
// 		height: 100%;
// 	}

// 	&__input {
// 		width: 100%;
// 		height: 100%;
// 	}

// 	&__preview {
// 		flex: 0 0 150px;

// 		width: 150px;
// 		height: 150px;
// 		background-size: cover;
// 		background-position: center;
// 		border-radius: 10px;
// 	}
// }
</style>
