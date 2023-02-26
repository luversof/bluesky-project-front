export interface Page<T> {
	content: T[];
	first: boolean;
	hasContent: boolean;
	last: boolean;
	number: number;
	numberOfElements: number;
	size: number;
	totalElements: number;
	totalPages: number;
	// pabeable: Pageable;
	// sort: Sort;
	// empty: boolean;
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
