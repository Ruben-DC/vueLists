<script setup>
// import { RouterLink } from 'vue-router'
</script>

<template>
    <header>
        <h1>Listes</h1>

        <ul>
            <!-- <li><RouterLink to="/">Accueil</RouterLink></li> -->
            <!-- <li><RouterLink to="/mes-listes">Mes listes</RouterLink></li> -->
            <!-- <li><RouterLink to="/creer-liste">Créer une liste</RouterLink></li> -->
        </ul>
    </header>
</template>

<style lang="scss" scoped>
header {
    display: flex;
    justify-content: space-between;

    width: 100%;
    height: 80px;
    padding: 30px 50px;
    background: $background-color;

    ul {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 30px;

        li:hover {
            cursor: pointer;
            text-decoration: wavy underline;
        }
    }
}
</style>
