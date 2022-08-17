import type { LayoutLoad } from './$types';
import { blogStore } from '$lib/store';
const { userBlogList } = blogStore;

import { blogApi } from '$lib/blog';

export const load: LayoutLoad = async ({ fetch, session }) => {
	if (session.loginInfo != null) {
		const userBlogListResponse = await fetch(blogApi.getUserBlogListUrl(), {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			}
		});

		userBlogList.set(await userBlogListResponse.json());
	}

	return {};
};
