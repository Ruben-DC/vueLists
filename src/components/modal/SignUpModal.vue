<script setup>
import Modal from './ModalComponent.vue';
import { ref, watchEffect } from 'vue';
import { supabase } from '../../lib/supabaseClient';

const modalInstance = ref(null);
const emailInput = ref(null);
const email = ref('');
const password = ref('');

const handleCancel = () => {
	email.value = '';
	modalInstance.value.closeModal();
};

const handleRegister = async () => {
	console.log(`registering ${email.value}`);

	try {
		const { data, error } = await supabase.auth.signUp({
			email: email.value,
			password: password.value
		});

		if (error) {
			throw error;
		}

		console.log(data);

		email.value = '';
		modalInstance.value.closeModal();
	} catch (error) {
		console.log(error);
	}
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
			<label for="email">Email</label>
			<input
				class="modal__input"
				id="email"
				type="text"
				placeholder="Email"
				@keyup.enter="handleRegister"
				@keyup.escape="handleCancel"
				v-model="email"
				ref="emailInput"
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
