<script setup>
import List from '../components/ListComponent.vue';
import ListModal from '../components/modal/ListModal.vue';
</script>

<template>
    <main class="view">
        <ListModal />
        <List name="Première liste">
            <template #items> </template>
        </List>
    </main>
</template>

<style lang="scss" scoped>
.view {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 30px;

    max-width: 800px;
    width: 100%;

    padding: 0 20px;
}
</style>
