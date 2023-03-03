import axios from 'axios';
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
		let response = axios.get('/api/bookkeeping');
		return (await response).data;
	}
}

export const bookkeepingClient = new BookkeepingClient();
