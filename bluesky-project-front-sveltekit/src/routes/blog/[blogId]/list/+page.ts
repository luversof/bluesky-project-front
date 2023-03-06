import type { PageLoad } from './$types';
import { blogClient, blogArticleClient } from '$lib/blog';

export const load: PageLoad = ({ params, url }) => {
	let page = Number(url.searchParams.get('page'));
	return {
		blog: blogClient.findByBlogId({ blogId: params.blogId }),
		blogArticlePage: blogArticleClient.findByBlogId(params.blogId, page == 0 ? 0 : page - 1)
	};
};
