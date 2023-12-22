<script setup>
import Modal from './ModalComponent.vue';
import { ref, watchEffect } from 'vue';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();

const modalInstance = ref(null);
const emailInput = ref(null);
const email = ref('');
const password = ref('');

const clearModal = () => {
	email.value = '';
	password.value = '';
	modalInstance.value.closeModal();
};

const handleCancel = () => {
	clearModal();
};

const signUp = async () => {
	authStore.signUp(email.value, password.value);

	clearModal();
};

watchEffect(() => {
	if (emailInput.value) {
		emailInput.value.focus();
	}
});
</script>

<template>
	<Modal ref="modalInstance">
		<template #open-button>
			<button class="modal__open-button" @click="modalInstance.openModal">Inscription</button>
		</template>

		<template #title> Inscription </template>

		<template #content>
			<form @submit.prevent="signUp" @keyup.escape="handleCancel">
				<label for="email">Email</label>
				<input
					@keyup.enter="signUp"
					v-model="email"
					id="email"
					type="text"
					placeholder="Email"
					ref="emailInput"
					class="modal__input"
				/>

				<label for="password">Mot de passe</label>
				<input
					@keyup.enter="signUp"
					v-model="password"
					id="password"
					type="password"
					placeholder="Mot de passe"
					class="modal__input"
				/>
			</form>
		</template>

		<template #actions>
			<button class="modal__cancel-button" @click="handleCancel">Annuler</button>
			<button class="modal__submit-button" @click="signup">Créer le compte</button>
		</template>
	</Modal>
</template>

<style lang="scss" scoped>
.modal {
	&__open-button {
		text-wrap: nowrap;
		text-decoration: wavy underline #00ff0000;
		transition: text-decoration 0.2s ease-out;

		&:hover {
			text-decoration: wavy underline #00ccff;
		}
	}

	&__input {
		padding: 5px 10px;
		line-height: 1rem;

		border-radius: 5px;
		color: $text-color;
	}

	&__submit-button,
	&__cancel-button {
		padding: 7px 15px;

		border: 1px solid $border-color;
		border-radius: 5px;

		transition: all 0.2s ease-out;
	}

	&__submit-button {
		background: $text-color;
		color: $background-color;
	}

	&__cancel-button:hover {
		background: $hover-grey;
	}
}

form {
	display: flex;
	flex-direction: column;
	gap: 20px;

	width: 100%;
}
</style>
