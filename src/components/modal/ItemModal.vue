<script setup>
import Modal from './ModalComponent.vue';
</script>

<template>
    <Modal>
        <template #open-button> Ajouter </template>

        <template #title> Ajouter un item </template>

        <template #content>
            <label for="item-name">Nom de l'item</label>
            <input class="modal__input" id="item-name" type="text" placeholder="Nom de la liste" />
        </template>

        <template #submit> Ajouter </template>
    </Modal>
</template>

<style lang="scss" scoped>
.modal {
    &__input {
        line-height: 1.3rem;
    }
}
</style>
