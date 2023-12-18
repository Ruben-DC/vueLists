<script setup>
import { RouterLink } from 'vue-router';
import LoginModal from '../components/modal/LoginModal.vue';
import RegisterModal from '../components/modal/RegisterModal.vue';
</script>

<template>
	<header>
		<h1><RouterLink to="/">Listes</RouterLink></h1>

		<ul>
			<!-- <li><RouterLink to="/">Accueil</RouterLink></li> -->
			<!-- <li><RouterLink to="/mes-listes">Mes listes</RouterLink></li> -->
			<!-- <li><RouterLink to="/creer-liste">Créer une liste</RouterLink></li> -->
		</ul>

		<ul>
			<li><LoginModal /></li>
			<li><RegisterModal /></li>
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
