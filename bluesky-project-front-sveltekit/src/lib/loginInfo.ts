import axios from 'axios';

import { writable } from 'svelte/store';

export type LoginInfo = {
	login: boolean;
	username: string;
	authorities: any;
	principalName: string;
};

export const loginInfoStore = writable<LoginInfo>();

export const getLoginInfo = async (): Promise<LoginInfo> => {
	let loginInfo = (await axios.get('/api/user/loginInfo')).data;
	loginInfoStore.set(loginInfo);
	return loginInfo;
};
