import type { Page } from '$lib/page';

export type Board = {
	id: number;
	boardId: string;
	alias: string;
	boardActivated: boolean;
	replyActivated: boolean;
	commentActivated: boolean;
	articleActivated: boolean;
};

export type BoardArticle = {
	id: number;
	boardArticleId: string;
	userId: string;
	boardId: string;
	title: string;
	content: string;
	createdDate: Date;
	lastMidifiedDate: Date;
};

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
		return fetch('/api/board/findByAlias?alias=' + alias, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((response) => response.json());
	}
}

export const boardClient = new BoardClient();

class BoardArticleClient {
	async create({
		boardId,
		title,
		content
	}: Pick<BoardArticle, 'boardId' | 'title' | 'content'>): Promise<BoardArticle> {
		return fetch('/api/board/article', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
				// Accept: 'application/json'
			},
			body: JSON.stringify({
				boardId,
				title,
				content
			})
		}).then((response) => response.json());
	}

	async findByBoardArticleId({
		boardArticleId
	}: Pick<BoardArticle, 'boardArticleId'>): Promise<BoardArticle> {
		console.log('findByBoardArticleId : ', boardArticleId);
		return fetch('/api/board/article/findByBoardArticleId?boardArticleId=' + boardArticleId, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((response) => response.json());
	}

	async findByBoardAlias(boardAlias: string, page: number = 0): Promise<BoardArticlePage> {
		return fetch('/api/board/article/findByBoardAlias?boardAlias=' + boardAlias + '&page=' + page, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((response) => response.json());
	}

	async delete({ boardArticleId, userId }: Pick<BoardArticle, 'boardArticleId' | 'userId'>) {
		return fetch('/api/board/article', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ boardArticleId, userId })
		}).then((response) => response.json());
	}
}

export const boardArticleClient = new BoardArticleClient();
