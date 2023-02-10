export interface Board {
	id?: number;
	boardId?: string;
	alias: string;
	boardActivated?: boolean;
	replyActivated?: boolean;
	commentActivated?: boolean;
	articleActivated?: boolean;
}

export interface BoardArticle {
	id?: number;
	boardArticleId?: string;
	userId?: string;
	boardId?: string;
	title: string;
	content: string;
	createdDate?: Date;
	lastMidifiedDate?: Date;
}

class BoardClient {
	async findByAlias({ alias }: Board): Promise<Board> {
		return await fetch('/api/board/findByAlias?alias=' + alias, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((response) => response.json());
	}
}

export const boardClient = new BoardClient();

class BoardArticleClient {
	async create({ boardId, title, content }: BoardArticle): Promise<BoardArticle> {
		return await fetch('/api/board/article', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				boardId,
				title,
				content
			})
		}).then((response) => response.json());
	}

	async findByBoardArticleId(boardArticleId: string): Promise<BoardArticle> {
		return await fetch('/api/board/article/findByBoardArticleId?boardArticleId=' + boardArticleId, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((response) => response.json());
	}
}

export const boardArticleClient = new BoardArticleClient();
