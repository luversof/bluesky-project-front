import { get } from 'svelte/store';
import type { UserInfo } from '$lib/types';

import { userInfoStore } from '$lib/store';
const { userInfo } = userInfoStore;

// export async function getUserInfo(): UserInfo | null {
// 	const userInfoResponse = await fetch('/api/user/loginInfo', {
// 		method: 'GET',
// 		headers: {
// 			'Content-Type': 'application/json',
// 			Accept: 'application/json'
// 		}
// 	});

// 	var result = null;
// 	if (userInfoResponse.status == 200) {
// 		result = await userInfoResponse.json();
// 	} else {
// 	}
// 	if (result != null) {
// 		userInfo.set(result);
// 	}

// 	return get(userInfo);
// }

class UserApi {
	async getLoginInfo() {
		return fetch('/api/user/loginInfo', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			}
		});
	}
}

export const userApi: UserApi = new UserApi();
