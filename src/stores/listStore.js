import { defineStore } from 'pinia';

export const useListsStore = defineStore('lists', {
	state: () => ({
		lists: []
	}),
	getters: {
		getLists: (state) => state.lists
	},
	actions: {
		addList(list) {
			this.lists.push(list);
		}
		// removeList(list) {
		//     this.lists.splice(this.lists.indexOf(list), 1);
		// },
		// updateList(list, newList) {
		//     this.lists[this.lists.indexOf(list)] = newList;
		// },
		// clearLists() {
		//     this.lists = [];
		// },
		// loadLists() {
		//     this.lists = JSON.parse(localStorage.getItem('lists')) || [];
		// },
		// saveLists() {
		//     localStorage.setItem('lists', JSON.stringify(this.lists));
		// },
		// clearAndSaveLists() {
		//     this.clearLists();
		//     this.saveLists();
		// },
	}
});
