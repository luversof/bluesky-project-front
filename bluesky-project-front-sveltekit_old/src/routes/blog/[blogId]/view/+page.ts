import { redirect, error } from '@sveltejs/kit';

import type { PageLoad } from './$types';
import { blogApi, blogViewUrl } from '$lib/blog';
export const load: PageLoad = async ({ params, fetch, session, url }) => {
	const blogArticleId = url.searchParams.get('blogArticleId');

	if (blogArticleId == null) {
		// 에러 처리
		throw redirect(303, blogViewUrl.list(params.blogId));
	}

	const blogArticleResponse = await fetch(blogApi.getBlogArticleUrl(blogArticleId), {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		}
	});

	if (blogArticleResponse.status != 200) {
		throw error(blogArticleResponse.status, 'some error?');
	}
	return {
		blogArticle: blogArticleResponse.ok && (await blogArticleResponse.json()),
		blogId: params.blogId
	};
};
