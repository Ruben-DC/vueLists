<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import { useUserStore } from '@/stores/userStore';
import { onClickOutside } from '@vueuse/core';
import { Icon } from '@iconify/vue';

const authStore = useAuthStore();
const signOut = async () => {
	await authStore.signOut();
};

const userStore = useUserStore();

const profile = ref();
const isOpen = ref(false);
onClickOutside(profile, () => (isOpen.value = false));
</script>

<template>
	<div class="profile" ref="profile">
		<div
			v-if="userStore.avatarUrl"
			:style="{ backgroundImage: `url(${userStore.avatarUrl})` }"
			alt="user avatar"
			class="profile__avatar"
			@click="isOpen = !isOpen"
		/>

		<div v-if="isOpen" class="profile__menu">
			<p class="arobase">{{ userStore.arobase }}</p>

			<ul class="profile__menu-list" @click="isOpen = !isOpen">
				<RouterLink to="/profile">
					<li>
						<p>Mon profil</p>
						<Icon icon="solar:user-linear" />
					</li>
				</RouterLink>

				<RouterLink to="/">
					<li>
						<p>Mes listes</p>
						<Icon icon="solar:list-linear" />
					</li>
				</RouterLink>

				<li @click="signOut" class="signout">
					<p>Déconnexion</p>
					<Icon icon="solar:logout-2-linear" />
				</li>
			</ul>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.profile {
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 10px;

	&__avatar {
		background-size: cover;
		background-position: center;

		aspect-ratio: 1/1;
		width: 45px;
		height: 45px;

		border-radius: 7px;
		border: 1px solid $border-color;
		object-fit: cover;

		cursor: pointer;

		transition: all 0.2s ease-out;

		&:hover {
			border: 4px solid #ffffff35;
		}
	}

	&__menu {
		position: absolute;
		top: calc(100% + 10px);
		right: 0;

		display: flex;
		flex-direction: column;
		gap: 10px;

		width: 250px;
		padding: 5px;

		background: $background-color-2;
		border: 1px solid $border-color;
		border-radius: 7px;

		.arobase {
			margin: 20px 0 10px;

			font-size: 0.8rem;
			color: $text-color;
			text-align: center;
		}

		&-list {
			display: flex;
			flex-direction: column;

			li {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				flex-wrap: none;

				font-size: 0.9rem;
				padding: 10px 15px;
				border-radius: 3px;

				user-select: none;
				cursor: pointer;
				transition: all 0.1s ease-out;

				&:hover {
					background: $hover-grey;
				}

				&.signout {
					color: $danger-text;

					&:hover {
						background: $danger-background;
					}
				}
			}
		}
	}
}
</style>
