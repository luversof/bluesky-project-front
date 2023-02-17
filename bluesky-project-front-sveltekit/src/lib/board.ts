import type { Page } from '$lib/page';

export type Board = {
	id?: number;
	boardId?: string;
	alias: string;
	boardActivated?: boolean;
	replyActivated?: boolean;
	commentActivated?: boolean;
	articleActivated?: boolean;
};

export type BoardArticle = {
	id?: number;
	boardArticleId?: string;
	userId?: string;
	boardId?: string;
	title?: string;
	content?: string;
	createdDate?: Date;
	lastMidifiedDate?: Date;
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
	findByAlias({ alias }: Board): Promise<Board> {
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
	create({ boardId, title, content }: BoardArticle): Promise<BoardArticle> {
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

	findByBoardArticleId({ boardArticleId }: BoardArticle): Promise<BoardArticle> {
		console.log('findByBoardArticleId : ', boardArticleId);
		return fetch('/api/board/article/findByBoardArticleId?boardArticleId=' + boardArticleId, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((response) => response.json());
	}

	findByBoardAlias(boardAlias: string, page: number = 0): Promise<BoardArticlePage> {
		return fetch('/api/board/article/findByBoardAlias?boardAlias=' + boardAlias + '&page=' + page, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((response) => response.json());
	}

	delete({ boardArticleId, userId }: BoardArticle) {
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
