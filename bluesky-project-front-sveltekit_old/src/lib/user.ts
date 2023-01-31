import { get, writable } from 'svelte/store';

import { base, assets } from '$app/paths';

import { page } from '$app/stores';

export interface LoginInfo {
	id: string;
	name: string;
}

export const loginInfo = writable<LoginInfo>();

export const getLoginInfo = async (): Promise<LoginInfo> => {
	console.log('TEST222 : ', get(page).url.origin);

	const userInfoResponse = await fetch(get(page).url.origin + '/api/user/loginInfo', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		}
	});

	if (userInfoResponse.status == 200) {
		loginInfo.update(await userInfoResponse.json());
	} else {
	}

	return get(loginInfo);
};
