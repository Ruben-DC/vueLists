<script setup>
import { RouterView } from 'vue-router'
import Header from '@/layouts/HeaderLayout.vue'
</script>

<template>
    <Header />

    <main>
        <RouterView />
    </main>
</template>

<style lang="scss">
main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
}
</style>
