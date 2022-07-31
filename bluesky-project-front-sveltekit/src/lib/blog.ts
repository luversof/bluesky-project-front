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
		return '/blog/' + blogId + '/view?blogArticleId=' + blogArticleId;
	}
}
export const blogViewUrl: BlogViewUrl = new BlogViewUrl();

/**
 * blog api url
 */
class BlogApi {
	blogApiUrlPrefix: string = '/api/blog';
	blogArticleApiUrlPrefix: string = '/api/blogArticle';

	getUserBlogListUrl(): string {
		return this.blogApiUrlPrefix + '/userBlogList';
	}

	getBlogArticleListPageUrl(blogId: string): string {
		return this.blogArticleApiUrlPrefix + '/search/findByBlogId/' + blogId;
	}

	postBlogArticleUrl(): string {
		return this.blogArticleApiUrlPrefix;
	}

	getBlogArticleUrl(blogArticleId: string): string {
		return this.blogArticleApiUrlPrefix + '/' + blogArticleId;
	}

	async writeBlogArticle({ blogId, title, content }: BlogArticle) {
		return fetch(this.postBlogArticleUrl(), {
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

	async getBlogArticle({ blogArticleId }: BlogArticle) {
		if (blogArticleId == null) {
			return null;
		}
		return fetch(this.getBlogArticleUrl(blogArticleId), {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			}
		});
	}
}
export const blogApi: BlogApi = new BlogApi();
