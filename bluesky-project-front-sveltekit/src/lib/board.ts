import type { Page } from '$lib/page';
import axios from 'axios';

export interface Board {
	id: number;
	boardId: string;
	alias: string;
	boardActivated: boolean;
	replyActivated: boolean;
	commentActivated: boolean;
	articleActivated: boolean;
}

export interface BoardArticle {
	id: number;
	boardArticleId: string;
	userId: string;
	boardId: string;
	title: string;
	content: string;
	createdDate: Date;
	lastMidifiedDate: Date;
}

export interface BoardArticlePage extends Page<BoardArticle> {}

export const boardViewUrl = {
	list: (boardAlias: string) => `/board/${boardAlias}/list`,
	write: (boardAlias: string) => `/board/${boardAlias}/write`,
	view: (boardAlias: string, boardArticleId: string) =>
		`/board/${boardAlias}/view/${boardArticleId}`,
	modify: (boardAlias: string, boardArticleId: string) =>
		`/board/${boardAlias}/modify/${boardArticleId}`
};

class BoardClient {
	async findByAlias({ alias }: Pick<Board, 'alias'>): Promise<Board> {
		let response = axios.get('/api/board/findByAlias?alias=' + alias);
		return (await response).data;
	}
}

export const boardClient = new BoardClient();

class BoardArticleClient {
	async create({
		boardId,
		title,
		content
	}: Pick<BoardArticle, 'boardId' | 'title' | 'content'>): Promise<BoardArticle> {
		let response = axios.post('/api/board/article', {
			boardId,
			title,
			content
		});
		return (await response).data;
	}

	async findByBoardArticleId({
		boardArticleId
	}: Pick<BoardArticle, 'boardArticleId'>): Promise<BoardArticle> {
		let response = axios.get('/api/board/article/findByBoardArticleId', {
			params: { boardArticleId }
		});
		return (await response).data;
	}

	async findByBoardAlias(boardAlias: string, page: number = 0): Promise<BoardArticlePage> {
		let response = axios.get('/api/board/article/findByBoardAlias', {
			params: { boardAlias, page }
		});
		return (await response).data;
	}

	async modify({
		boardArticleId,
		boardId,
		title,
		content
	}: Pick<
		BoardArticle,
		'boardArticleId' | 'boardId' | 'title' | 'content'
	>): Promise<BoardArticle> {
		let response = axios.put('/api/board/article', {
			boardArticleId,
			boardId,
			title,
			content
		});
		return (await response).data;
	}

	async delete({ boardArticleId }: Pick<BoardArticle, 'boardArticleId'>) {
		let response = axios.delete('/api/board/article', { data: { boardArticleId } });
		return (await response).data;
	}
}

export const boardArticleClient = new BoardArticleClient();
