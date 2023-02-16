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
