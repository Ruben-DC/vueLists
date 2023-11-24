<script setup>
import Modal from './ModalComponent.vue';
</script>

<template>
    <Modal>
        <template #open-button> Ajouter une liste </template>

        <template #title> Ajouter une liste </template>

        <template #content>
            <label for="list-name">Nom de la liste</label>
            <input class="modal__input" id="list-name" type="text" placeholder="Nom de la liste" />
        </template>

        <template #actions>
            <button class="modal__cancel-button">Annuler</button>
            <button class="modal__submit-button" type="submit">Ajouter</button>
        </template>
    </Modal>
</template>

<style lang="scss" scoped>
.modal {
    &__input {
        line-height: 1.3rem;
    }

    &__submit-button,
    &__cancel-button {
        padding: 5px 10px;

        border: 1px solid $border-color;
        border-radius: 5px;

        transition: all 0.2s ease-out;
    }

    &__submit-button {
        background: $text-color;
        color: $background-color;
    }
}
</style>
