import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

import type { UserInfo, Blog } from '$lib/types';

class UserInfoStore {
	constructor(public userInfo: Writable<UserInfo> = writable()) {
		this.userInfo = userInfo;
	}
}

export const userInfoStore = new UserInfoStore();

class BlogStore {
	constructor(public userBlogList: Writable<Array<Blog>> = writable([])) {
		this.userBlogList = userBlogList;
	}
}

export const blogStore = new BlogStore();

//export const userBlogList = writable([]: Blog[]);
