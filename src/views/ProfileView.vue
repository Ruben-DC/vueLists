<script setup>
import { ref, watch } from 'vue';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();
const isLoading = ref(false);

const updateUser = async (data) => {
	try {
		isLoading.value = true;
		await userStore.updateUser(data);
		isLoading.value = false;
	} catch (error) {
		console.log(error);
		isLoading.value = false;
	}
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
		placeholders.value.bio = newVal.bio || 'Dites-nous en plus sur vous';
	},

	{ immediate: true }
);

const greatArobase = (node) => {
	const regex = /^@[A-Za-z0-9]+$/;
	return regex.test(node.value);
};
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
				:validation-rules="{ greatArobase }"
				validation="greatArobase"
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

			<FormKit
				type="submit"
				name="submit"
				:label="isLoading ? '...' : 'Enregistrer'"
				:input-class="
					isLoading
						? 'submit__input submit__input--disabled'
						: 'submit__input submit__input--enabled'
				"
				:disabled="isLoading"
			/>
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

// .toast-enter-active,
// .toast-leave-active {
// 	transition: all 3s;
// }

// // .toast-enter-from {
// // 	opacity: 0;
// // 	transform: translateY(-400px);
// // }
// .toast-leave-to {
// 	opacity: 0;
// 	transform: translateX(400px);
// }
</style>
