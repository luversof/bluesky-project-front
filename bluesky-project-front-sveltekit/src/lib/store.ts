import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

import type { Blog } from '$lib/types';

class BlogStore {
	constructor(public userBlogList: Writable<Array<Blog>> = writable([])) {
		this.userBlogList = userBlogList;
	}
}

export const blogStore = new BlogStore();

//export const userBlogList = writable([]: Blog[]);
