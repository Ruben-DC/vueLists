<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();

const isUploading = ref(false);
const files = ref();

const uploadBanner = async (evt) => {
	files.value = evt.target.files;

	try {
		isUploading.value = true;
		if (!files.value || files.value.length === 0) {
			throw new Error('You must select an image to upload.');
		}

		const file = files.value[0];

		userStore.uploadBanner(file);
	} catch (error) {
		alert(error.message);
	} finally {
		isUploading.value = false;
	}
};
</script>

<template>
	<div class="banner">
		<label
			class="banner__label"
			:style="{ backgroundImage: `url(${userStore.bannerUrl})` }"
			for="banner"
		>
		</label>
		<input
			style="visibility: hidden; position: absolute"
			type="file"
			id="banner"
			accept="image/*"
			@change="uploadBanner"
			:disabled="isUploading"
		/>
	</div>
</template>

<style lang="scss" scoped>
.banner {
	aspect-ratio: 600/200;
	width: 100%;

	border-radius: 10px;
	overflow: hidden;

	background-color: #6b2626;

	&__label {
		background-size: cover;
		background-position: center;

		aspect-ratio: 1/1;
		width: 100%;
		height: 100%;

		display: flex;
		justify-content: center;
		align-items: center;

		border-radius: 7px;
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
