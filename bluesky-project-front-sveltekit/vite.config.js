import { sveltekit } from '@sveltejs/kit/vite';
import { build } from 'vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	server: {
		proxy: {
			'/api': {
				target: 'http://localhost:8084/',
				changeOrigin: true
			}
		}
	}
	// build: {
	// 	chunkSizeWarningLimit: 2000
	// }
};

export default config;
