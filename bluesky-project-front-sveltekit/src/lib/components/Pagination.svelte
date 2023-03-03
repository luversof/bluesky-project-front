<script lang="ts">
	import type { Page } from '$lib/page';
	export let page: Page<any>;

	// 전체 페이지는 어떻게 보여줘야 하는가?

	// totalElements: 전체 글 수
	// totalPages: 전체 페이지 수
	// number: 현재 페이지 (Spring Page는 0부터 시작하는게 문제...)
	// first: 첫페이지 여부
	// last: 마지막 페이지 여부

	// 아 막상 계산하려니 구찮다. 전엔 잘만 했는데...
	let pageSize = 10;

	// 전체 page가 pageSize보다 적으면 모두 출력하면 그만임
	let startPage: number;
	let endPage: number;
	// 현재 페이지 기준 노출할 페이지는 어떻게 계산할까?
	// 현재 페이지를 기준으로 시작 ~ 끝을 계산
	// 현재 페이지가 2이면  0 ~ 9
	// 현재 페이지가 12이면 10 ~ 19
	startPage = Math.floor(page.number / pageSize) * pageSize;
	endPage = Math.ceil((page.number + 1) / 10) * pageSize - 1;

	// console.log('startPage : ' + startPage + ', endPage : ' + endPage);

	if (endPage >= page.totalPages) {
		endPage = page.totalPages - 1;
	}

	// console.log('startPage : ' + startPage + ', endPage : ' + endPage);

	let pageList: number[] = [];
	for (let i = startPage; i <= endPage; i++) {
		pageList.push(i);
	}

	// console.log('pageList : ', pageList);
</script>

<div class="flex ">
	{#each pageList as pageNumber}
		{#if pageNumber == page.number}
			<button
				class="items-center px-4 py-2 mx-1 rounded-md sm:flex bg-blue-500 dark:bg-blue-500 text-white dark:text-gray-200"
			>
				{pageNumber + 1}
			</button>
		{:else}
			<a href="?page={pageNumber + 1}">
				<button
					class="items-center px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md sm:flex dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200"
				>
					{pageNumber + 1}
				</button>
			</a>
		{/if}
	{/each}
</div>
