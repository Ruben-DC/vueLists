<script setup>
import Modal from './ModalComponent.vue';
import { ref, watchEffect } from 'vue';
import { useListsStore } from '@/stores/listStore';

const props = defineProps({
	listId: Number
});

const listsStore = useListsStore();

const modalInstance = ref(null);
const itemNameInput = ref(null);
const itemName = ref('');
const handleCancel = () => {
	itemName.value = '';
	modalInstance.value.closeModal();
};

const handleSubmit = () => {
	if (!itemName.value) {
		return;
	}

	listsStore.addItemToList(props.listId, {
		name: itemName.value.trim(),
		date: Date.now(),
		id: Date.now()
	});

	itemName.value = '';
	modalInstance.value.closeModal();
};

watchEffect(() => {
	if (itemNameInput.value) {
		itemNameInput.value.focus();
	}
});
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
			<input
				class="modal__input"
				id="item-name"
				type="text"
				placeholder="Nom de l'item"
				@keyup.enter="handleSubmit"
				@keyup.escape="handleCancel"
				v-model="itemName"
				ref="itemNameInput"
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
		text-wrap: nowrap;
		text-decoration: wavy underline #00ff0000;
		transition: text-decoration 0.2s ease-out;

		&:hover {
			text-decoration: wavy underline #00ff00;
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
