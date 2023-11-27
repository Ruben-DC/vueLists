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
		}
	}
});
