import type { PageLoad } from './$types';
import { blogApi } from '$lib/blog';

export const load: PageLoad = async ({ params, fetch }) => {
	const blogArticlePageResponse = await fetch(blogApi.getBlogArticleListPageUrl(params.blogId), {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		}
	});

	return {
		blogArticlePage: blogArticlePageResponse.ok && (await blogArticlePageResponse.json())
	};
};
