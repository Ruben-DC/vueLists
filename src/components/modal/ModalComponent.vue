<script setup>
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';

const isModalOpen = ref(false);
const modal = ref(null);

onClickOutside(modal, () => (isModalOpen.value = false));
</script>

<template>
    <button @click="isModalOpen = true" class="open-modal-button">
        <slot name="open-button"></slot>
    </button>

    <Teleport to="#modals">
        <Transition name="modal">
            <div class="modal__background" v-if="isModalOpen" @submit.prevent="handleSubmit">
                <form ref="modal" class="modal__wrapper">
                    <header class="modal__header">
                        <h2 class="modal__title">
                            <slot name="title"></slot>
                        </h2>

                        <button class="modal__close-button" @click="isModalOpen = false">x</button>
                    </header>

                    <slot name="content"></slot>

                    <div class="modal__actions">
                        <slot name="actions">
                            <!-- <button class="modal__cancel-button" @click="isModalOpen = false">
                                Annuler
                            </button>
                            <button class="modal__submit-button" type="submit">Ajouter</button> -->
                        </slot>
                    </div>
                </form>
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
        background: lighten($color: $border-color, $amount: 0.1);
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
        gap: 10px;

        width: 400px;
        padding: 15px;
        border: 1px solid $border-color;
        border-radius: 20px;

        background: $background-color;

        header {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }
    }

    &__input {
        padding: 5px 10px;
        box-sizing: content-box;
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
            background: lighten($color: $border-color, $amount: 0.1);
        }
    }

    &__actions {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        gap: 10px;
    }
}

.modal-enter-active,
.modal-leave-active {
    transition: all 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
    transform: scale(0.8);
}
</style>
