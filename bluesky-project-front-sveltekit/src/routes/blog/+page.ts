import { redirect, error } from '@sveltejs/kit';

import type { PageLoad } from './$types';
import { blogViewUrl, blogApi } from '$lib/blog';
import type { BlogArticle } from '$lib/types';

export const load: PageLoad = async ({ fetch, session }) => {
	console.log('TEST!22~, session.loginInfo : ', JSON.stringify(session.loginInfo));
	if (session.loginInfo == null) {
		console.log('is not logged in');

		throw redirect(307, '/login');
	}
	// const response = await fetch(blogApi.getUserBlogListUrl(), {
	// 	method: 'GET',
	// 	headers: {
	// 		'Content-Type': 'application/json',
	// 		Accept: 'application/json'
	// 	}
	// });
	// const userBlogList = await response.json();

	// if (userBlogList.length > 0) {
	// 	// 첫번째 blog로 무조건 이동
	// 	throw redirect(303, blogViewUrl.list(userBlogList[0].blogId));
	// }

	// // 블로그 생성 메뉴로 이동
	// throw redirect(303, blogViewUrl.create());
	return {};
};
