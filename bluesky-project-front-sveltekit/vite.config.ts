import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
	server: {
		proxy: {
			'/api': {
				target: 'http://gate.web.bluesky.local',
				//target: 'http://dev.bluesky.local:40122',
				changeOrigin: true,
				secure: false
			},
			'/login': {
				target: 'http://gate.web.bluesky.local',
				changeOrigin: true
			},
			'/oauth2': {
				target: 'http://gate.web.bluesky.local',
				changeOrigin: true
			}
		}
	}
};

export default config;
