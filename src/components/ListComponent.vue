<script setup>
import ListItem from './ListItem.vue';
import AddItemModal from './modal/AddItemModal.vue';
import { ref, watchEffect } from 'vue';

import { useListsStore } from '../stores/listStore';

const props = defineProps({
	name: String,
	description: String,
	listId: Number
});

const listsStore = useListsStore();
const items = listsStore.getItemsByListId(props.listId);
const itemsCount = ref(listsStore.getNumberOfItemsByListId(props.listId));

watchEffect(() => {
	itemsCount.value = listsStore.getNumberOfItemsByListId(props.listId);
});

const itemsList = ref(null);
const toggleList = () => {
	itemsList.value.classList.toggle('hide');
};

const handleDelete = () => {
	listsStore.deleteList(props.listId);
};
</script>

<template>
	<div class="list__container">
		<header class="list__header">
			<div @click="toggleList" class="list__infos">
				<h2 class="list__name">{{ props.name }}</h2>

				<p class="list__items-counter">{{ itemsCount }} items</p>
				<p class="list__description">{{ props.description }}</p>
			</div>

			<div class="list__header__actions">
				<AddItemModal :listId="props.listId" />

				<button
					@click="handleDelete"
					class="list__header__actions__button list__header__actions--delete"
				>
					Delete
				</button>
			</div>
		</header>

		<ul class="list__items hide" ref="itemsList">
			<slot name="items">
				<ListItem
					v-for="item in items"
					:name="item.name"
					:date="item.date"
					:itemId="item.id"
					:listId="props.listId"
					:key="item.id"
				/>
			</slot>
		</ul>
	</div>
</template>

<style lang="scss" scoped>
.list {
	&__container {
		width: 100%;
		overflow: hidden;

		border-left: #ffffff19 solid 1px;
	}

	&__header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		// gap: 40px;

		width: 100%;
		padding: 20px;

		&__actions {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-self: flex-end;
			gap: 10px;

			height: 100%;

			&__button {
				color: $text-color;
				text-wrap: nowrap;
			}

			&--delete {
				transition: text-decoration 0.2s ease-out;
				text-decoration: wavy underline #ff000000;

				&:hover {
					text-decoration: wavy underline #ff0000;
				}
			}
		}
	}

	&__infos {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 10px;

		cursor: pointer;
	}

	&__name {
		width: 100%;
		text-wrap: wrap;
		overflow: hidden;

		user-select: none;
	}

	&__items-counter {
		user-select: none;
	}

	&__description {
		line-height: 1.2;
	}

	&__items {
		display: flex;
		flex-direction: column;
		gap: 10px;

		width: 100%;
		height: auto;
		max-height: 100vh;
		padding: 0px 20px;
		overflow: hidden;

		transition: all 0.2s ease-in-out;

		&.hide {
			max-height: 0px;
		}
	}
}
</style>
