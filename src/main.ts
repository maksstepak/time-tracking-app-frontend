import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import i18n from './i18n';
import { registerGlobalComponents } from './plugins/global-components';

import './assets/main.scss';

import AuthenticationManager from './utils/AuthenticationManager';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);

registerGlobalComponents(app);

AuthenticationManager.initialize();

app.mount('#app');
