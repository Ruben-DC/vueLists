<script setup>
// import { ref, watch, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import LoginModal from '../components/modal/LoginModal.vue';
import SignUpModal from '../components/modal/SignUpModal.vue';
import UserProfile from '../components/UserProfile.vue';
import { useAuthStore } from '@/stores/authStore';
import { useUserStore } from '@/stores/userStore';

const authStore = useAuthStore();
const userStore = useUserStore();
</script>

<template>
	<header>
		<h1><RouterLink to="/">Listes</RouterLink></h1>

		<ul v-if="authStore.isLoggedIn()">
			<li>
				<UserProfile class="user" />
			</li>
		</ul>

		<ul v-else>
			<li><LoginModal /></li>
			<li><SignUpModal /></li>
		</ul>
	</header>
</template>

<style lang="scss" scoped>
header {
	display: flex;
	justify-content: space-between;

	width: 100%;
	min-height: 95px;
	padding: 30px 50px;
	background: $background-color;

	ul {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 30px;

		li p {
			font-size: 0.8rem;
			font-family: 'Poppins', sans-serif;
			letter-spacing: 0px;
		}

		li :hover {
			cursor: pointer;
		}
	}

	.nav {
		li {
			padding: 5px 7px;
			border-radius: 5px;

			transition: all 0.15s ease-out;

			&:hover {
				background: $hover-grey;
			}

			a {
				display: flex;
				gap: 7px;
				flex-wrap: nowrap;

				color: $text-color;
				text-decoration: none;
			}
		}
	}
}
</style>
