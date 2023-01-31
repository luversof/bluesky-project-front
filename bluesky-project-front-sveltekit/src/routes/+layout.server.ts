import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	return {
		session: await fetch('http://gate.api.bluesky.local/_check/authentication', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			}
		}).then((res) => res.json())
	};
};
