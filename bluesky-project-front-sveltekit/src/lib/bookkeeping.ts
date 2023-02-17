// 무엇을 클래스로 정의해야 좋을까?
// 일단 api를 호출하는 것들을 만들고 그것들을 묶어서 관리하면 좋을 것 같다.

export type Bookkeeping = {
	idx: number;
	bookkeepingId: string;
	userId: string;
	name?: string;
	baseDate: number;
};

class BookkeepingClient {
	async get(): Promise<Bookkeeping> {
		return fetch('/api/bookkeeping', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			}
		}).then((response) => response.json());
	}
}

export const bookkeepingClient = new BookkeepingClient();
