import type { PageLoad } from './$types';
import { blogArticleClient } from '$lib/blog';

export const load: PageLoad = ({ params }) => {
	return blogArticleClient.findByBlogArticleId({ blogArticleId: params.blogArticleId });
};
