// import { fileURLToPath, URL } from 'node:url'
import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			// eslint-disable-next-line no-undef
			'@': path.resolve(__dirname, './src')
		}
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@use "@/assets/styles/colors.scss" as *;`
			}
		}
	}
});
