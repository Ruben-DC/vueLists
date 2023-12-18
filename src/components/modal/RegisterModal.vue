<script setup>
import Modal from './ModalComponent.vue';
import { ref, watchEffect } from 'vue';

const modalInstance = ref(null);
const usernameInput = ref(null);
const username = ref('');
const password = ref('');

const handleCancel = () => {
	username.value = '';
	modalInstance.value.closeModal();
};

const handleRegister = async () => {
	console.log(`registering ${username.value}`);
};

watchEffect(() => {
	if (usernameInput.value) {
		usernameInput.value.focus();
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
			<label for="userName">Nom d'utilisateur</label>
			<input
				class="modal__input"
				id="userName"
				type="text"
				placeholder="nom d'utilisateur"
				@keyup.enter="handleRegister"
				@keyup.escape="handleCancel"
				v-model="username"
				ref="usernameInput"
			/>

			<label for="password">Mot de passe</label>
			<input
				class="modal__input"
				id="password"
				type="password"
				v-model="password"
				placeholder="mot de passe"
				@keyup.enter="handleRegister"
				@keyup.escape="handleCancel"
			/>
		</template>

		<template #actions>
			<button class="modal__cancel-button" @click="handleCancel">Annuler</button>
			<button class="modal__submit-button" @click="handleRegister">Créer le compte</button>
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
</style>
