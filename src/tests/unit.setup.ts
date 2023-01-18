import i18n from '@/i18n';
import router from '@/router';
import { config } from '@vue/test-utils';

config.global.plugins = [i18n, router];
