<script setup>
import List from '@/components/ListComponent.vue';
import AddListModal from '@/components/modal/AddListModal.vue';
import { useListsStore } from '@/stores/listStore';

const listsStore = useListsStore();
const lists = listsStore.getLists;
</script>

<template>
	<main class="view">
		<AddListModal />

		<div class="lists">
			<List v-for="list in lists" :key="list.id" :name="list.name" />
		</div>
	</main>
</template>

<style lang="scss" scoped>
.view {
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 20px;

	max-width: 800px;
	width: 100%;

	padding: 0 20px;
}

.lists {
	display: flex;
	flex-direction: column;
	gap: 30px;

	width: 100%;
	height: fit-content;
}
</style>
