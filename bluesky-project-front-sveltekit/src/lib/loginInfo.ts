import { getStores, navigating, page, updated } from '$app/stores';

import { writable } from 'svelte/store';

interface LoginInfo {
	login: boolean;
	username?: string;
	authorities?: any;
	principalName?: string;
}

export const loginInfoStore = writable<LoginInfo>();

export const getLoginInfo = async (): Promise<LoginInfo> => {
	let loginInfoPromise = await fetch('/api/user/loginInfo', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		}
	}).then((response) => response.json());

	loginInfoStore.set(loginInfoPromise);

	return loginInfoPromise;
};
