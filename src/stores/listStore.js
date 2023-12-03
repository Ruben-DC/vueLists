import { defineStore } from 'pinia';

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

export const useListsStore = defineStore('lists', {
	state: () => ({
		lists: []
	}),

	getters: {
		getListById: (state) => (id) => {
			return state.lists.find((list) => list.id === id);
		},

		getItemById: (state) => (listId, itemId) => {
			const list = state.getListById(listId);
			return list.items.find((item) => item.id === itemId);
		},

		getItemsByListId: (state) => (listId) => {
			const list = state.getListById(listId);
			return list.items;
		},

		getNumberOfItemsByListId: (state) => (listId) => {
			const list = state.getListById(listId);
			return list.items.length;
		}
	},

	actions: {
		addList(list) {
			this.lists.push(list);
		},

		addItemToList(listId, item) {
			const list = this.getListById(listId);
			list.items.push(item);
		},

		editItemInList(listId, itemId, newItemName) {
			const list = this.getListById(listId);
			const itemIndex = list.items.findIndex((item) => item.id === itemId);

			if (itemIndex !== -1) {
				list.items[itemIndex].name = newItemName;
				list.items[itemIndex].date = Date.now();
			} else {
				console.error(`Item with id ${itemId} not found in list ${listId}`);
			}
		},

		deleteList(listId) {
			const listIndex = this.lists.findIndex((list) => list.id === listId);
			this.lists.splice(listIndex, 1);
		},

		deleteItemFromList(listId, itemId) {
			const list = this.getListById(listId);
			const itemIndex = list.items.findIndex((item) => item.id === itemId);
			list.items.splice(itemIndex, 1);
		}
	}
});
