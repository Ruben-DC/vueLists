<script setup>
import Modal from './ModalComponent.vue';
import { ref, watchEffect } from 'vue';
import { useListsStore } from '@/stores/listStore';

const listsStore = useListsStore();

const listName = ref('');

const modalInstance = ref(null);
const handleCancel = () => {
	modalInstance.value.closeModal();
	listName.value = '';
};

const handleSubmit = () => {
	modalInstance.value.closeModal();
	listsStore.addList({ name: listName.value });
	listName.value = '';
};

const listNameInput = ref(null);
const focusInput = () => listNameInput.value.focus();

watchEffect(() => {
	if (modalInstance.value.isModalOpen.value) {
		modalInstance.value.isModalOpen.value ? focusInput() : null;
	}
});
</script>

<template>
	<Modal ref="modalInstance">
		<template #open-button>
			<button class="modal__open-button" @click="modalInstance.openModal">
				Ajouter une liste
			</button>
		</template>

		<template #title> Ajouter une liste </template>

		<template #content>
			<label for="list-name">Nom de la liste</label>
			<input
				class="modal__input"
				id="list-name"
				type="text"
				placeholder="Nom de la liste"
				v-model="listName"
				ref="listNameInput"
			/>
		</template>

		<template #actions>
			<button class="modal__cancel-button" @click="handleCancel">Annuler</button>
			<button class="modal__submit-button" @click="handleSubmit">Ajouter</button>
		</template>
	</Modal>
</template>

<style lang="scss" scoped>
.modal {
	&__open-button {
		padding: 5px 10px;

		color: $text-color;
		border: 1px solid $border-color;
		border-radius: 5px;

		transition: all 0.2s ease-out;

		&:hover {
			background: $hover-grey;
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
