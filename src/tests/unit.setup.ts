import i18n from '@/i18n';
import { registerGlobalComponents } from '@/plugins/global-components';
import router from '@/router';
import { config } from '@vue/test-utils';

config.global.plugins = [i18n, router, registerGlobalComponents];
