import type { LayoutLoad } from './$types';

export const ssr = false;

export const load: LayoutLoad = async () => {
	return {
		session: await fetch('/api/user/loginInfo', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			}
		}).then((res) => res.json())
	};
};
