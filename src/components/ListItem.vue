<script setup>
import { ref } from 'vue';
import { useListsStore } from '../stores/listStore';

const props = defineProps({
	name: String,
	date: Number,
	listId: Number,
	itemId: Number
});

const newName = ref(props.name);

const formatDate = (date) => {
	const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
	return new Date(date).toLocaleDateString('fr-FR', options).replace(/\//g, '/');
};

const uploadDate = formatDate(props.date);

const listsStore = useListsStore();
const isEditing = ref(false);
const editItem = () => {
	isEditing.value = false;

	listsStore.editItemInList(props.listId, props.itemId, newName.value);
};

const handleDelete = () => {
	console.log('Delete item');
	listsStore.deleteItemFromList(props.listId, props.itemId);
};
</script>

<template>
	<li ref="listItem" class="list__item" draggable>
		<div class="list__item__content">
			<input
				type="text"
				v-if="isEditing"
				v-model="newName"
				@keyup.enter="editItem"
				class="list__item__title__input"
			/>
			<h3 v-else class="list__item__title">{{ props.name }}</h3>

			<p class="list__item__date">{{ uploadDate }}</p>
		</div>

		<div class="list__item__actions">
			<button
				v-if="isEditing"
				@click="editItem"
				class="list__item__button list__item__button--edit"
			>
				Valider
			</button>

			<button
				v-else
				@click="isEditing = true"
				class="list__item__button list__item__button--edit"
			>
				Editer
			</button>

			<button
				class="list__item__button list__item__button--delete"
				v-if="isEditing"
				@click="isEditing = false"
			>
				Annuler
			</button>

			<button
				class="list__item__button list__item__button--delete"
				v-else
				@click="handleDelete"
			>
				Delete
			</button>
		</div>
	</li>
</template>

<style lang="scss" scoped>
.list {
	&__item {
		position: relative;

		display: flex;
		flex-direction: row;
		gap: 30px;
		justify-content: space-between;
		align-items: center;

		background: $background-color;
		border: $border-color solid 1px;
		border-radius: 10px;
		padding: 15px 20px;

		// cursor: grab;

		&__content {
			display: flex;
			flex-direction: column;
			gap: 5px;
			line-height: 1.3;
		}

		&__date {
			font-size: 0.7rem;
			font-style: italic;
		}

		&__actions {
			display: flex;
			flex-direction: row;
			align-items: center;
			gap: 10px;
		}

		&__button {
			color: $text-color;
			transition: text-decoration 0.2s ease-out;

			&--edit {
				text-decoration: wavy underline #ffa50000;

				&:hover {
					text-decoration: wavy underline #ffa500;
				}
			}

			&--delete {
				z-index: 1;
				text-decoration: wavy underline #ff000000;

				&:hover {
					text-decoration: wavy underline #ff0000;
				}
			}
		}
	}
}
</style>
