import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

import type { UserInfo } from '$lib/user';
import type { Blog } from '$lib/blog';

class UserInfoStore {
	constructor(public userInfo: WriteAble<UserInfo> = writable()) {
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
