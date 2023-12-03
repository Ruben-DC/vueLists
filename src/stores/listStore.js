import { defineStore } from 'pinia';
import { ref } from 'vue';

/**
 * @property {Object} list
 * @property {string} name
 * @property {string} description
 * @property {Object[]} items
 * @property {Date} id
 *
 * @property {Object{}} items.item
 * @property {string} items.item.name
 * @property {string} items.item.date
 * @property {string} items.item.id
 */

export const useListsStore = defineStore(
	'lists',
	() => {
		const lists = ref([]);

		const getListById = (id) => {
			return lists.value.find((list) => list.id === id);
		};

		const getItemsByListId = (listId) => {
			const list = getListById(listId);
			return list.items;
		};

		const getNumberOfItemsByListId = (listId) => {
			const list = getListById(listId);
			return list.items.length;
		};

		const addList = (list) => {
			lists.value.push(list);
		};

		const addItemToList = (listId, item) => {
			const list = getListById(listId);
			list.items.push(item);
		};

		const editItemInList = (listId, itemId, newItemName) => {
			const list = getListById(listId);
			const itemIndex = list.items.findIndex((item) => item.id === itemId);

			if (itemIndex !== -1) {
				list.items[itemIndex].name = newItemName;
				list.items[itemIndex].date = Date.now();
			} else {
				console.error(`Item with id ${itemId} not found in list ${listId}`);
			}
		};

		const deleteList = (listId) => {
			const listIndex = lists.value.findIndex((list) => list.id === listId);
			lists.value.splice(listIndex, 1);
		};

		const deleteItemFromList = (listId, itemId) => {
			const list = getListById(listId);
			const itemIndex = list.items.findIndex((item) => item.id === itemId);
			list.items.splice(itemIndex, 1);
		};

		return {
			lists,
			getItemsByListId,
			getNumberOfItemsByListId,
			addList,
			addItemToList,
			editItemInList,
			deleteList,
			deleteItemFromList
		};
	},
	{ persist: true }
);
