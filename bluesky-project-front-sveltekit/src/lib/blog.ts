import type { Blog, BlogArticle } from '$lib/types';

/**
 * 로그인한 유저의 blog인지 확인
 * @param blogList
 * @param blogId
 * @returns
 */
export function isUserBlog(blogList: Array<Blog>, blogId: string): boolean {
	if (blogList == null || blogId == null) {
		return false;
	}

	for (const blog of blogList) {
		if (blogId == blog.blogId) {
			return true;
		}
	}
	return false;
}

/**
 * blog view url
 */
class BlogViewUrl {
	create(): string {
		return '/blog/create';
	}
	list(blogId: string): string {
		return '/blog/' + blogId + '/list';
	}
	view({ blogId, blogArticleId }: BlogArticle) {
		return '/blog/' + blogId + '/view?articleId=' + blogArticleId;
	}
}
export const blogViewUrl: BlogViewUrl = new BlogViewUrl();

/**
 * blog api url
 */
class BlogApiUrl {
	userBlogList(): string {
		return '/api/blog/userBlogList';
	}

	blogArticleListPage(blogId: string): string {
		return '/api/blogArticle/search/findByBlogId/' + blogId;
	}

	postBlogArticle(): string {
		return '/api/blogArticle';
	}
}
export const blogApiUrl: BlogApiUrl = new BlogApiUrl();

export async function writeBlogArticle({ blogId, title, content }: BlogArticle) {
	return fetch('/api/blogArticle', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({
			blogId: blogId,
			title: title,
			content: content
		})
	});
}
