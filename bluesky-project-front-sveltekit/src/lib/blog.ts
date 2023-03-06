import type { Page } from '$lib/page';
import axios from 'axios';
import { writable, get } from 'svelte/store';
import { loginInfoStore } from '$lib/loginInfo';

export interface Blog {
	idx: number;
	blogId: string;
	userId: string;
	blogArticleCategoryList: BlogArticleCategory[];
	createdDate: Date;
}

export interface BlogArticleCategory {
	idx: number;
	blogArticleCategoryId: string;
	blogId: string;
	name: string;
}

export interface BlogArticle {
	idx: number;
	blogArticleId: string;
	blogId: string;
	userId: string;
	blogArticleCategory: BlogArticleCategory;
	blogArticleCommentList: BlogArticleComment[];
	title: string;
	content: string;
	createdDate: Date;
	lastModifiedDate: Date;
}

export interface BlogArticleComment {
	idx: number;
	blogArticleCommentId: string;
	blogArticleId: string;
	userId: string;
	comment: string;
	createdDate: Date;
	lastModifiedDate: Date;
}

export interface BlogArticlePage extends Page<BlogArticle> {}

export interface BlogArticleCommentPage extends Page<BlogArticleComment> {}

export const blogViewUrl = {
	list: (blogId: string) => `/blog/${blogId}/list`,
	write: (blogId: string) => `/blog/${blogId}/write`,
	view: (blogId: string, blogArticleId: string) => `/blog/${blogId}/view/${blogArticleId}`,
	modify: (blogId: string, blogArticleId: string) => `/blog/${blogId}/modify/${blogArticleId}`
};

class BlogClient {
	async create(): Promise<Blog> {
		let response = axios.post('/api/blog');
		return (await response).data;
	}

	async findByBlogId({ blogId }: Pick<Blog, 'blogId'>): Promise<Blog> {
		let response = axios.get('/api/blog/findByBlogId', { params: { blogId } });
		return (await response).data;
	}

	async findByUserId({ userId }: Pick<Blog, 'userId'>): Promise<Blog[]> {
		let response = axios.get('/api/blog/findByUserId', { params: { userId } });
		return (await response).data;
	}
}

export const blogClient = new BlogClient();

class BlogArticleClient {
	async create({
		blogId,
		title,
		content
	}: Pick<BlogArticle, 'blogId' | 'title' | 'content'>): Promise<BlogArticle> {
		let response = axios.post('/api/blog/article', {
			blogId,
			title,
			content
		});
		return (await response).data;
	}

	async findByBlogId(blogId: string, page: number = 0): Promise<BlogArticlePage> {
		let response = axios.get('/api/blog/article/findByBlogId', { params: { blogId, page } });
		return (await response).data;
	}

	async findByBlogArticleId({
		blogArticleId
	}: Pick<BlogArticle, 'blogArticleId'>): Promise<BlogArticle> {
		let response = axios.get('/api/blog/article/findByBlogArticleId', {
			params: { blogArticleId }
		});
		return (await response).data;
	}

	async update({
		blogArticleId,
		title,
		content
	}: Pick<BlogArticle, 'blogArticleId' | 'title' | 'content'>): Promise<BlogArticle> {
		let response = axios.put('/api/blog/article', {
			blogArticleId,
			title,
			content
		});
		return (await response).data;
	}

	async delete({ blogArticleId }: Pick<BlogArticle, 'blogArticleId'>) {
		let response = axios.delete('/api/blog/article', { data: { blogArticleId } });
		return (await response).data;
	}
}

export const blogArticleClient = new BlogArticleClient();

class BlogArticleCategoryClient {
	async create({
		blogId,
		name
	}: Pick<BlogArticleCategory, 'blogId' | 'name'>): Promise<BlogArticleCategory> {
		let response = axios.post('/api/blog/articleCategory', {
			blogId,
			name
		});
		return (await response).data;
	}

	async findByBlogId({
		blogId
	}: Pick<BlogArticleCategory, 'blogId'>): Promise<BlogArticleCategory> {
		let response = axios.get('/api/blog/articleCategory/findByBlogId', { params: { blogId } });
		return (await response).data;
	}

	async update({
		blogArticleCategoryId,
		name
	}: Pick<BlogArticleCategory, 'blogArticleCategoryId' | 'name'>): Promise<BlogArticleCategory> {
		let response = axios.put('/api/blog/articleCategory', {
			blogArticleCategoryId,
			name
		});
		return (await response).data;
	}

	async delete({ blogArticleCategoryId }: Pick<BlogArticleCategory, 'blogArticleCategoryId'>) {
		let response = axios.delete('/api/blog/articleCategory', { data: { blogArticleCategoryId } });
		return (await response).data;
	}
}

export const blogArticleCategoryClient = new BlogArticleCategoryClient();

class BlogArticleCommentClient {
	async create({
		blogArticleId,
		comment
	}: Pick<BlogArticleComment, 'blogArticleId' | 'comment'>): Promise<BlogArticleComment> {
		let response = axios.post('/api/blog/articleComment', {
			blogArticleId,
			comment
		});
		return (await response).data;
	}

	async findByBlogArticleId(
		blogArticleId: string,
		page: number = 0
	): Promise<BlogArticleCommentPage> {
		let response = axios.get('/api/blog/articleComment/findByBlogArticleId', {
			params: { blogArticleId, page }
		});
		return (await response).data;
	}

	async findByBlogArticleCommentId({
		blogArticleCommentId
	}: Pick<BlogArticleComment, 'blogArticleCommentId'>): Promise<BlogArticleComment> {
		let response = axios.get('/api/blog/articleComment/findByBlogArticleCommentId', {
			params: { blogArticleCommentId }
		});
		return (await response).data;
	}

	async update({
		blogArticleCommentId,
		blogArticleId,
		comment
	}: Pick<
		BlogArticleComment,
		'blogArticleCommentId' | 'blogArticleId' | 'comment'
	>): Promise<BlogArticleComment> {
		let response = axios.put('/api/blog/articleComment', {
			blogArticleCommentId,
			blogArticleId,
			comment
		});
		return (await response).data;
	}

	async delete({
		blogArticleCommentId,
		blogArticleId
	}: Pick<BlogArticleComment, 'blogArticleCommentId' | 'blogArticleId'>) {
		let response = axios.delete('/api/blog/articleComment', {
			data: { blogArticleCommentId, blogArticleId }
		});
		return (await response).data;
	}
}

export const blogArticleCommentClient = new BlogArticleCommentClient();

export const loginUserBlogListStore = writable<Blog[]>();

export const getLoginUserBlogList = async ({ userId }: Pick<Blog, 'userId'>): Promise<Blog[]> => {
	let blogList = await blogClient.findByUserId({ userId });
	loginUserBlogListStore.set(blogList);
	return blogList;
};

loginInfoStore.subscribe((value) => {
	if (value != undefined && get(loginUserBlogListStore) == undefined) {
		console.log('call', get(loginUserBlogListStore));
		getLoginUserBlogList({ userId: value.username });
	}
});
