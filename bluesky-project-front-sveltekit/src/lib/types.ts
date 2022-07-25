export type LoginInfo = {
	id: string;
	name: string;
};

export interface Page<T> {
	content: T[];
	pabeable: Pageable;
	totalElements: number;
	totalPages: number;
	last: boolean;
	size: number;
	number: number;
	sort: Sort;
	first: boolean;
	numberOfElements: number;
	empty: boolean;
}

export interface Pageable {
	sort: Sort;
	offset: number;
	pageSize: number;
	pageNumber: number;
	unpaged: boolean;
	paged: boolean;
}

export interface Sort {
	empty: boolean;
	sorted: boolean;
	unsorted: boolean;
}

export interface Blog {
	idx: number;
	blogId: string;
	userId: string;
	blogArticleCategoryList?: BlogArticleCategory[];
	createdDate: string;
}

export interface BlogArticle {
	idx: number;
	blogArticleId: string;
	blogId: string;
	blogArticleCategory: BlogArticleCategory;
	blogArticleCommentList: BlogArticleComment[];
	title: string;
	content: string;
	createdDate: string;
	lastModifiedDate: string;
	userId: string;
}

export interface BlogArticleComment {
	idx: number;
	blogArticleCommentId: string;
	blogArticleId: string;
	comment: string;
	createdDate: string;
	lastModifiedDate: string;
	userId: string;
}

export interface BlogArticleCategory {
	idx: number;
	blogArticleCategoryId?: string;
	blogId: string;
	name: string;
}

export interface BlogArticlePage extends Page<BlogArticle> {}
