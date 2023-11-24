<script setup>
import Modal from './ModalComponent.vue';
import { ref } from 'vue';

const handleCancel = () => {
	modalInstance.value.closeModal();
};

const handleSubmit = () => {
	modalInstance.value.closeModal();
};

const modalInstance = ref(null);
</script>

<template>
	<Modal ref="modalInstance">
		<template #open-button> Ajouter une liste </template>

		<template #title> Ajouter une liste </template>

		<template #content>
			<form></form>
		</template>

		<template #actions>
			<button class="modal__cancel-button" @click="handleCancel">Annuler</button>
			<button class="modal__submit-button" @click="handleSubmit">Ajouter</button>
		</template>
	</Modal>
</template>

<style lang="scss" scoped>
.modal {
	&__input {
		padding: 5px 10px;

		border: 1px solid $border-color;
		border-radius: 5px;

		transition: all 0.2s ease-out;
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
}
</style>
