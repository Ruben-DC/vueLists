<script setup>
import { ref } from 'vue';

const title = 'My first list';
const date = '2021-10-10';

const listItem = ref(null);

const editItem = () => {
	console.log('Edit item');
};

const handleDelete = () => {
	console.log('Delete item');
	listItem.value.classList.toggle('on-delete');
};
</script>

<template>
	<li ref="listItem" class="list__item" draggable>
		<h3 class="list__item__title">{{ title }}</h3>

		<div class="list__item__content">
			<p class="list__item__date">{{ date }}</p>
		</div>

		<div class="list__item__actions">
			<button class="list__item__button list__item__button--edit" @click="editItem">
				Edit
			</button>
			<button class="list__item__button list__item__button--delete" @click="handleDelete">
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

		&__date {
			font-size: 0.8rem;
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
