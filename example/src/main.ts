import { createApp } from 'vue';
import { Theme } from '@sui/ui';
import App from './app.vue';
import 'virtual:uno.css';

const app = createApp(App);

app.use(Theme);

app.mount('#app');
