<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();

const isUploading = ref(false);
const files = ref();

const uploadAvatar = async (evt) => {
	files.value = evt.target.files;

	try {
		isUploading.value = true;
		if (!files.value || files.value.length === 0) {
			throw new Error('You must select an image to upload.');
		}

		const file = files.value[0];

		userStore.uploadAvatar(file);
	} catch (error) {
		alert(error.message);
	} finally {
		isUploading.value = false;
	}
};
</script>

<template>
	<div>
		<div class="avatar">
			<label
				class="avatar__label"
				:style="{ backgroundImage: `url(${userStore.avatarUrl})` }"
				for="avatar"
			>
			</label>
			<input
				style="visibility: hidden; position: absolute"
				type="file"
				id="avatar"
				accept="image/*"
				@change="uploadAvatar"
				:disabled="isUploading"
			/>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.avatar {
	border-radius: 10px;
	overflow: hidden;
	max-width: 150px;
	min-width: 65px;
	// width: 100%;

	&__label {
		background-size: cover;
		background-position: center;

		aspect-ratio: 1/1;
		width: 100%;

		display: flex;
		justify-content: center;
		align-items: center;

		border: 5px solid $background-color;
		border-radius: 10px;
		transition: all 0.2s ease-out;

		&:after {
			content: 'Changer';

			display: flex;
			justify-content: center;
			align-items: center;

			color: $text-color;
			font-size: 0.8rem;
			font-weight: 600;
			text-align: center;
			transition: all 0.2s ease-out;

			background: rgba(0, 0, 0, 0.752);
			border-radius: 5px;

			height: 100%;
			width: 100%;

			opacity: 0;
		}

		&:hover {
			&:after {
				opacity: 1;
			}

			cursor: pointer;
		}
	}
}
</style>
