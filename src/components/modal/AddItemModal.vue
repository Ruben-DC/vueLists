<script setup>
import Modal from './ModalComponent.vue';
import { ref } from 'vue';

const modalInstance = ref(null);
const handleCancel = () => {
	modalInstance.value.closeModal();
};

const handleSubmit = () => {
	modalInstance.value.closeModal();
};
</script>

<template>
	<Modal ref="modalInstance">
		<template #open-button>
			<button class="modal__open-button" @click="modalInstance.openModal">
				Ajouter item
			</button>
		</template>

		<template #title> Ajouter un item </template>

		<template #content>
			<label for="item-name">Nom de l'item</label>
			<input class="modal__input" id="item-name" type="text" placeholder="Nom de la liste" />

			<label for="item-description">Description de l'item</label>
			<textarea
				class="modal__input"
				id="item-description"
				placeholder="Description de la liste"
			></textarea>
		</template>

		<template #actions>
			<button class="modal__cancel-button" @click="handleCancel">Annuler</button>
			<button class="modal__submit-button" @click="handleSubmit">Ajouter</button>
		</template>
	</Modal>
</template>

<style lang="scss" scoped>
textarea {
	resize: vertical;
}
.modal {
	&__open-button {
		text-decoration: wavy underline #00ff0000;
		transition: text-decoration 0.2s ease-out;

		&:hover {
			text-decoration: wavy underline #00ff00;
		}
	}

	&__input {
		padding: 5px 10px;

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
