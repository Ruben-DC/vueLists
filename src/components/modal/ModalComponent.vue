<script setup>
import CrossIcon from '@/components/icons/CrossIcon.vue';
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';

const isModalOpen = ref(false);
const modal = ref(null);

const openModal = () => (isModalOpen.value = true);
const closeModal = () => (isModalOpen.value = false);
defineExpose({ openModal, closeModal, isModalOpen });

onClickOutside(modal, () => closeModal());
</script>

<template>
	<slot name="open-button"> </slot>

	<Teleport to="#modals">
		<Transition name="modal">
			<div class="modal__background" v-if="isModalOpen">
				<div ref="modal" class="modal__wrapper" @keydown.escape="closeModal">
					<header class="modal__header">
						<h2 class="modal__title">
							<slot name="title">Titre de la modale</slot>
						</h2>

						<button class="modal__close-button" @click="closeModal">
							<CrossIcon />
						</button>
					</header>

					<slot name="content"></slot>

					<div class="modal__actions">
						<slot name="actions"></slot>
					</div>
				</div>
			</div>
		</Transition>
	</Teleport>
</template>

<style lang="scss" scoped>
.open-modal-button {
	padding: 5px 10px;

	color: $text-color;
	border: 1px solid $border-color;
	border-radius: 5px;

	transition: all 0.2s ease-out;

	&:hover {
		background: $hover-grey;
	}
}

.modal {
	&__background {
		position: absolute;
		top: 0;
		left: 0;

		display: flex;
		justify-content: center;
		align-items: center;

		height: 100vh;
		width: 100vw;

		background: #000000b7;
	}

	&__wrapper {
		display: flex;
		flex-direction: column;
		gap: 20px;

		width: 400px;
		padding: 20px;
		border: 1px solid $border-color;
		border-radius: 15px;

		background: $background-color;
	}

	&__header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	&__close-button {
		display: flex;
		justify-content: center;
		align-items: center;

		width: 30px;
		height: 30px;
		border: 1px solid $border-color;
		border-radius: 5px;

		transition: all 0.2s ease-out;

		&:hover {
			background: $hover-grey;
		}
	}

	&__actions {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		gap: 20px;
	}
}

.modal-enter-active,
.modal-leave-active {
	transition: all 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
	opacity: 0;
	transform: scale(1.1);
}
</style>
