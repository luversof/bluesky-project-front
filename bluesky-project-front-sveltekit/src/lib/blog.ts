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
	list(blogId?: string): string {
		if (blogId == null) {
			return '/blog';
		}
		return '/blog/' + blogId + '/list';
	}

	view({ blogId, blogArticleId }: BlogArticle) {
		return '/blog/' + blogId + '/view?blogArticleId=' + blogArticleId;
	}

	modify({ blogId, blogArticleId }: BlogArticle) {
		return '/blog/' + blogId + '/modify?blogArticleId=' + blogArticleId;
	}
}
export const blogViewUrl: BlogViewUrl = new BlogViewUrl();

/**
 * blog api url
 */
class BlogApi {
	blogApiUrlPrefix = '/api/blog';
	blogArticleApiUrlPrefix = '/api/blogArticle';

	getUserBlogListUrl() {
		return this.blogApiUrlPrefix + '/userBlogList';
	}

	getBlogArticleListPageUrl(blogId: string) {
		return this.blogArticleApiUrlPrefix + '/search/findByBlogId/' + blogId;
	}

	postBlogArticleUrl() {
		return this.blogArticleApiUrlPrefix;
	}

	getBlogArticleUrl(blogArticleId: string) {
		return this.blogArticleApiUrlPrefix + '/' + blogArticleId;
	}

	putBlogArticleUrl(blogArticleId: string) {
		return this.blogArticleApiUrlPrefix + '/' + blogArticleId + '?_method=PUT';
	}

	deleteBlogArticleUrl(blogArticleId: string) {
		return this.blogArticleApiUrlPrefix + '/' + blogArticleId + '?_method=DELETE';
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

	async modifyBlogArticle({ blogId, blogArticleId, title, content }: BlogArticle) {
		if (blogArticleId == null) {
			throw new Error('not exist blogArticleId');
		}
		return fetch(this.putBlogArticleUrl(blogArticleId), {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				blogId: blogId,
				blogArticleId: blogArticleId,
				title: title,
				content: content
			})
		});
	}

	async deleteBlogArticle({ blogArticleId }: BlogArticle) {
		if (blogArticleId == null) {
			throw new Error('not exist blogArticleId');
		}
		return fetch(this.deleteBlogArticleUrl(blogArticleId), {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			}
		});
	}
}
export const blogApi: BlogApi = new BlogApi();
