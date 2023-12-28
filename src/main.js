import './assets/styles/index.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import router from './router';
import App from './App.vue';
import { plugin, defaultConfig } from '@formkit/vue';
import config from '@/utils/formkit.config.js';

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(router);
app.use(plugin, defaultConfig(config));

app.mount('#app');
